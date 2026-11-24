
import React, { useState } from 'react'
import { Package, Plus, Search, Pencil, Trash2, X, AlertTriangle } from 'lucide-react'

const initialItems = [
  { id: 'INV-001', name: 'Steel Rods', category: 'Raw Materials', quantity: 450, unit: 'kg', minimum: 100 },
  { id: 'INV-002', name: 'Aluminium Sheets', category: 'Raw Materials', quantity: 85, unit: 'kg', minimum: 100 },
  { id: 'INV-003', name: 'Industrial Bolts', category: 'Components', quantity: 1200, unit: 'pcs', minimum: 300 },
  { id: 'INV-004', name: 'Machine Parts', category: 'Finished Goods', quantity: 250, unit: 'pcs', minimum: 50 },
  { id: 'INV-005', name: 'Copper Wire', category: 'Raw Materials', quantity: 40, unit: 'kg', minimum: 75 }
]

function Inventory() {
  const [items, setItems] = useState(initialItems)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    category: 'Raw Materials',
    quantity: '',
    unit: 'pcs',
    minimum: ''
  })

  const filteredItems = items.filter(item =>
    [item.id, item.name, item.category].join(' ').toLowerCase().includes(search.toLowerCase())
  )

  const openForm = (item = null) => {
    setEditingId(item?.id || null)
    setForm(item ? {
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      minimum: item.minimum
    } : {
      name: '',
      category: 'Raw Materials',
      quantity: '',
      unit: 'pcs',
      minimum: ''
    })
    setShowForm(true)
  }

  const saveItem = (e) => {
    e.preventDefault()
    const newItem = {
      ...form,
      quantity: Number(form.quantity),
      minimum: Number(form.minimum)
    }

    if (editingId) {
      setItems(items.map(item => item.id === editingId ? { ...item, ...newItem } : item))
    } else {
      setItems([...items, {
        ...newItem,
        id: `INV-${Date.now().toString().slice(-5)}`
      }])
    }

    setShowForm(false)
  }

  const deleteItem = (id) => {
    if (window.confirm('Delete this inventory item?')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const lowStock = items.filter(item => item.quantity <= item.minimum).length

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">RESOURCES</p>
          <h1>Inventory</h1>
          <p className="page-subtitle">Manage raw materials, components and finished goods.</p>
        </div>
        <button className="primary-button" onClick={() => openForm()}>
          <Plus size={17} /> Add Item
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Package size={22} /></div>
          <p>Total Items</p>
          <div className="stat-bottom"><h2>{items.length}</h2></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><AlertTriangle size={22} /></div>
          <p>Low Stock Items</p>
          <div className="stat-bottom"><h2>{lowStock}</h2></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Package size={22} /></div>
          <p>Total Units</p>
          <div className="stat-bottom"><h2>{items.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()}</h2></div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Inventory Items</h3>
            <p>View and update stock levels</p>
          </div>
          <div className="search-box">
            <Search size={17} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inventory..." />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Minimum Stock</th>
                <th>Stock Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id}>
                  <td className="order-id">{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity} {item.unit}</td>
                  <td>{item.minimum} {item.unit}</td>
                  <td>
                    <span className={`status-badge ${item.quantity <= item.minimum ? 'pending' : 'completed'}`}>
                      {item.quantity <= item.minimum ? 'Low Stock' : 'Available'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button title="Edit item" onClick={() => openForm(item)}><Pencil size={16} /></button>
                      <button title="Delete item" onClick={() => deleteItem(item.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr><td colSpan="7" style={{ textAlign: 'center' }}>No inventory items found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <form className="modal-form" onSubmit={saveItem}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Inventory Item' : 'Add Inventory Item'}</h2>
              <button type="button" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <label>Item Name</label>
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <label>Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option>Raw Materials</option>
              <option>Components</option>
              <option>Finished Goods</option>
            </select>
            <label>Quantity</label>
            <input required type="number" min="0" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
            <label>Unit</label>
            <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}>
              <option>pcs</option>
              <option>kg</option>
              <option>litres</option>
              <option>boxes</option>
            </select>
            <label>Minimum Stock Level</label>
            <input required type="number" min="0" value={form.minimum} onChange={e => setForm({ ...form, minimum: e.target.value })} />
            <button className="primary-button submit-button" type="submit">Save Item</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Inventory
