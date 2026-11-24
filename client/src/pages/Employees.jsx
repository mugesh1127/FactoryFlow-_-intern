
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    role: "",
    department: "",
    email: "",
    phone: ""
  };

  const [form, setForm] = useState(emptyForm);

  const loadEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
      setError("");
    } catch (err) {
      setError("Unable to load employees. Check the server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
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
      if (editingId) {
        await updateEmployee(editingId, form);
      } else {
        await addEmployee(form);
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save employee.");
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);

    setForm({
      name: employee.name,
      role: employee.role,
      department: employee.department || "",
      email: employee.email || "",
      phone: employee.phone || ""
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await deleteEmployee(id);
      await loadEmployees();
    } catch (err) {
      setError("Unable to delete employee.");
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
          <h1>Employees</h1>
          <p>Manage factory employee information.</p>
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
          Add Employee
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <div className="content-card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="6">No employees found.</td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.role}</td>
                      <td>{employee.department || "-"}</td>
                      <td>{employee.email || "-"}</td>
                      <td>{employee.phone || "-"}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="secondary-button"
                            onClick={() => handleEdit(employee)}
                            title="Edit employee"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            className="danger-button"
                            onClick={() => handleDelete(employee.id)}
                            title="Delete employee"
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
              <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

              <button type="button" onClick={closeForm}>
                <X size={20} />
              </button>
            </div>

            <label>Employee Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            />

            <label>Department</label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <button type="submit" className="primary-button">
              {editingId ? "Update Employee" : "Save Employee"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Employees;
