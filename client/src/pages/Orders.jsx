
import React, { useState } from 'react'
import { Plus, Search, Eye, Pencil, Trash2, X } from 'lucide-react'

const initialOrders = [
  { id: 'ORD-1001', customer: 'Acme Industries', product: 'Steel Components', quantity: 500, deadline: '2026-11-28', status: 'In Progress' },
  { id: 'ORD-1002', customer: 'Global Manufacturing', product: 'Metal Sheets', quantity: 300, deadline: '2026-11-25', status: 'Completed' },
  { id: 'ORD-1003', customer: 'Prime Engineering', product: 'Industrial Bolts', quantity: 1200, deadline: '2026-11-30', status: 'Pending' },
  { id: 'ORD-1004', customer: 'Tech Solutions', product: 'Machine Parts', quantity: 250, deadline: '2026-12-02', status: 'In Progress' }
]

function Orders() {
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    customer: '',
    product: '',
    quantity: '',
    deadline: '',
    status: 'Pending'
  })

  const filteredOrders = orders.filter(order =>
    [order.id, order.customer, order.product, order.status]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const openForm = (order = null) => {
    setEditingId(order?.id || null)
    setForm(order ? {
      customer: order.customer,
      product: order.product,
      quantity: order.quantity,
      deadline: order.deadline,
      status: order.status
    } : {
      customer: '',
      product: '',
      quantity: '',
      deadline: '',
      status: 'Pending'
    })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingId) {
      setOrders(orders.map(order =>
        order.id === editingId ? { ...order, ...form, quantity: Number(form.quantity) } : order
      ))
    } else {
      setOrders([...orders, {
        ...form,
        id: `ORD-${Date.now().toString().slice(-6)}`,
        quantity: Number(form.quantity)
      }])
    }

    setShowForm(false)
  }

  const deleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== id))
    }
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">MANAGEMENT</p>
          <h1>Orders</h1>
          <p className="page-subtitle">Manage and track customer orders.</p>
        </div>
        <button className="primary-button" onClick={() => openForm()}>
          <Plus size={17} /> Create Order
        </button>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>All Orders</h3>
            <p>{orders.length} orders registered</p>
          </div>
          <div className="search-box">
            <Search size={17} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search orders..."
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity.toLocaleString()}</td>
                  <td>{order.deadline}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button title="View order" onClick={() => window.alert(`${order.id}\nCustomer: ${order.customer}\nProduct: ${order.product}`)}>
                        <Eye size={16} />
                      </button>
                      <button title="Edit order" onClick={() => openForm(order)}>
                        <Pencil size={16} />
                      </button>
                      <button title="Delete order" onClick={() => deleteOrder(order.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Order' : 'Create New Order'}</h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>

            <label>Customer Name</label>
            <input required value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} />

            <label>Product Name</label>
            <input required value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} />

            <label>Quantity</label>
            <input required type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />

            <label>Deadline</label>
            <input required type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />

            <label>Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <button className="primary-button submit-button" type="submit">
              {editingId ? 'Update Order' : 'Save Order'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Orders
