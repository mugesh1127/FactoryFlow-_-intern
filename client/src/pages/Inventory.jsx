
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory
} from "../services/api";

function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    item_name: "",
    category: "",
    quantity: "",
    unit: "",
    minimum_stock: 10
  };

  const [form, setForm] = useState(emptyForm);

  const loadInventory = async () => {
    try {
      const response = await getInventory();
      setItems(response.data);
      setError("");
    } catch (err) {
      setError("Unable to load inventory. Check the server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
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
        quantity: Number(form.quantity),
        minimum_stock: Number(form.minimum_stock)
      };

      if (editingId) {
        await updateInventory(editingId, data);
      } else {
        await addInventory(data);
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await loadInventory();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save inventory item.");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      item_name: item.item_name,
      category: item.category || "",
      quantity: item.quantity,
      unit: item.unit || "",
      minimum_stock: item.minimum_stock
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await deleteInventory(id);
      await loadInventory();
    } catch (err) {
      setError("Unable to delete inventory item.");
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
          <h1>Inventory</h1>
          <p>Monitor factory materials and stock levels.</p>
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
          Add Item
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <div className="content-card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Minimum Stock</th>
                  <th>Stock Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="7">No inventory items found.</td>
                  </tr>
                ) : (
                  items.map((item) => {
                    const lowStock =
                      Number(item.quantity) <= Number(item.minimum_stock);

                    return (
                      <tr key={item.id}>
                        <td>{item.item_name}</td>
                        <td>{item.category || "-"}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit || "-"}</td>
                        <td>{item.minimum_stock}</td>
                        <td>
                          <span className={lowStock ? "stock-low" : "status"}>
                            {lowStock ? "Low Stock" : "Available"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="secondary-button"
                              onClick={() => handleEdit(item)}
                              title="Edit item"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              className="danger-button"
                              onClick={() => handleDelete(item.id)}
                              title="Delete item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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
              <h2>{editingId ? "Edit Inventory" : "Add Inventory Item"}</h2>

              <button type="button" onClick={closeForm}>
                <X size={20} />
              </button>
            </div>

            <label>Item Name</label>
            <input
              name="item_name"
              value={form.item_name}
              onChange={handleChange}
              required
            />

            <label>Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
            />

            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              min="0"
              value={form.quantity}
              onChange={handleChange}
              required
            />

            <label>Unit</label>
            <input
              name="unit"
              value={form.unit}
              onChange={handleChange}
              placeholder="e.g. kg, pieces, litres"
            />

            <label>Minimum Stock</label>
            <input
              type="number"
              name="minimum_stock"
              min="0"
              value={form.minimum_stock}
              onChange={handleChange}
              required
            />

            <button type="submit" className="primary-button">
              {editingId ? "Update Item" : "Save Item"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Inventory;
