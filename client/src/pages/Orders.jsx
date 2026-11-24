
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder
} from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    order_number: "",
    customer: "",
    product: "",
    quantity: "",
    status: "Pending",
    due_date: ""
  };

  const [form, setForm] = useState(emptyForm);

  const loadOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
      setError("");
    } catch (err) {
      setError("Unable to load orders. Check the server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
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
        quantity: Number(form.quantity)
      };

      if (editingId) {
        await updateOrder(editingId, data);
      } else {
        await addOrder(data);
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save order.");
    }
  };

  const handleEdit = (order) => {
    setEditingId(order.id);
    setForm({
      order_number: order.order_number,
      customer: order.customer,
      product: order.product,
      quantity: order.quantity,
      status: order.status,
      due_date: order.due_date
        ? order.due_date.slice(0, 10)
        : ""
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      await deleteOrder(id);
      await loadOrders();
    } catch (err) {
      setError("Unable to delete order.");
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
          <h1>Orders</h1>
          <p>Manage customer orders and their status.</p>
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
          Add Order
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="content-card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7">No orders found.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.order_number}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td>{order.quantity}</td>
                      <td>
                        <span className="status">{order.status}</span>
                      </td>
                      <td>
                        {order.due_date
                          ? order.due_date.slice(0, 10)
                          : "-"}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="secondary-button"
                            onClick={() => handleEdit(order)}
                            title="Edit order"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            className="danger-button"
                            onClick={() => handleDelete(order.id)}
                            title="Delete order"
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
              <h2>{editingId ? "Edit Order" : "Add New Order"}</h2>

              <button type="button" onClick={closeForm}>
                <X size={20} />
              </button>
            </div>

            <label>Order Number</label>
            <input
              name="order_number"
              value={form.order_number}
              onChange={handleChange}
              required
            />

            <label>Customer Name</label>
            <input
              name="customer"
              value={form.customer}
              onChange={handleChange}
              required
            />

            <label>Product</label>
            <input
              name="product"
              value={form.product}
              onChange={handleChange}
              required
            />

            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              required
            />

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

            <label>Due Date</label>
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
            />

            <button type="submit" className="primary-button">
              {editingId ? "Update Order" : "Save Order"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Orders;
