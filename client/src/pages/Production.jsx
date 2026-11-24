
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
  getProduction,
  addProduction,
  updateProduction,
  deleteProduction,
  getOrders,
  getEmployees
} from "../services/api";

function Production() {
  const [tasks, setTasks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    task_name: "",
    order_id: "",
    assigned_to: "",
    status: "Pending",
    progress: 0,
    start_date: "",
    due_date: ""
  };

  const [form, setForm] = useState(emptyForm);

  const loadData = async () => {
    try {
      const [taskResponse, orderResponse, employeeResponse] =
        await Promise.all([
          getProduction(),
          getOrders(),
          getEmployees()
        ]);

      setTasks(taskResponse.data);
      setOrders(orderResponse.data);
      setEmployees(employeeResponse.data);
      setError("");
    } catch (err) {
      setError("Unable to load production data. Check the server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...form,
        order_id: form.order_id || null,
        assigned_to: form.assigned_to || null,
        progress: Number(form.progress)
      };

      if (editingId) {
        await updateProduction(editingId, data);
      } else {
        await addProduction(data);
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save production task.");
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);

    setForm({
      task_name: task.task_name,
      order_id: task.order_id || "",
      assigned_to: task.assigned_to || "",
      status: task.status,
      progress: task.progress,
      start_date: task.start_date
        ? task.start_date.slice(0, 10)
        : "",
      due_date: task.due_date
        ? task.due_date.slice(0, 10)
        : ""
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await deleteProduction(id);
      await loadData();
    } catch (err) {
      setError("Unable to delete production task.");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Production</h1>
          <p>Track factory production tasks and progress.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setEditingId(null);
            setForm(emptyForm);
            setShowForm(true);
          }}
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading production tasks...</p>
      ) : (
        <div className="content-card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Order</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan="7">No production tasks found.</td>
                  </tr>
                ) : (
                  tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.task_name}</td>
                      <td>{task.order_number || "-"}</td>
                      <td>{task.employee_name || "-"}</td>
                      <td>
                        <span className="status">{task.status}</span>
                      </td>
                      <td>
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${task.progress}%`
                            }}
                          />
                        </div>
                        {task.progress}%
                      </td>
                      <td>
                        {task.due_date
                          ? task.due_date.slice(0, 10)
                          : "-"}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="secondary-button"
                            onClick={() => handleEdit(task)}
                            title="Edit task"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            className="danger-button"
                            onClick={() => handleDelete(task.id)}
                            title="Delete task"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h2>{editingId ? "Edit Task" : "Add Production Task"}</h2>

              <button type="button" onClick={closeForm}>
                <X size={20} />
              </button>
            </div>

            <label>Task Name</label>
            <input
              name="task_name"
              value={form.task_name}
              onChange={handleChange}
              required
            />

            <label>Related Order</label>
            <select
              name="order_id"
              value={form.order_id}
              onChange={handleChange}
            >
              <option value="">No order selected</option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.order_number}
                </option>
              ))}
            </select>

            <label>Assign Employee</label>
            <select
              name="assigned_to"
              value={form.assigned_to}
              onChange={handleChange}
            >
              <option value="">Unassigned</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>

            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <label>Progress (%)</label>
            <input
              type="number"
              name="progress"
              min="0"
              max="100"
              value={form.progress}
              onChange={handleChange}
              required
            />

            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
            />

            <label>Due Date</label>
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
            />

            <button type="submit" className="primary-button">
              {editingId ? "Update Task" : "Save Task"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Production;
