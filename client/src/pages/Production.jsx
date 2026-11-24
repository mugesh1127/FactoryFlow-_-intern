
import React, { useState } from 'react'
import { Factory, Plus, Clock, CheckCircle, AlertTriangle, X } from 'lucide-react'

const initialTasks = [
  { id: 'PRD-001', product: 'Steel Components', order: 'ORD-1001', quantity: 500, completed: 320, status: 'In Progress', priority: 'High' },
  { id: 'PRD-002', product: 'Metal Sheets', order: 'ORD-1002', quantity: 300, completed: 300, status: 'Completed', priority: 'Medium' },
  { id: 'PRD-003', product: 'Industrial Bolts', order: 'ORD-1003', quantity: 1200, completed: 450, status: 'In Progress', priority: 'High' },
  { id: 'PRD-004', product: 'Machine Parts', order: 'ORD-1004', quantity: 250, completed: 0, status: 'Pending', priority: 'Low' }
]

function Production() {
  const [tasks, setTasks] = useState(initialTasks)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    product: '',
    order: '',
    quantity: '',
    priority: 'Medium'
  })

  const updateStatus = (id, status) => {
    setTasks(tasks.map(task => task.id === id ? {
      ...task,
      status,
      completed: status === 'Completed' ? task.quantity : task.completed
    } : task))
  }

  const addTask = (e) => {
    e.preventDefault()
    setTasks([...tasks, {
      ...form,
      id: `PRD-${Date.now().toString().slice(-5)}`,
      quantity: Number(form.quantity),
      completed: 0,
      status: 'Pending'
    }])
    setForm({ product: '', order: '', quantity: '', priority: 'Medium' })
    setShowForm(false)
  }

  const completed = tasks.filter(task => task.status === 'Completed').length
  const active = tasks.filter(task => task.status === 'In Progress').length
  const pending = tasks.filter(task => task.status === 'Pending').length

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OPERATIONS</p>
          <h1>Production</h1>
          <p className="page-subtitle">Monitor manufacturing tasks and production progress.</p>
        </div>
        <button className="primary-button" onClick={() => setShowForm(true)}>
          <Plus size={17} /> Add Task
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Factory size={22} /></div>
          <p>Total Tasks</p>
          <div className="stat-bottom"><h2>{tasks.length}</h2></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><CheckCircle size={22} /></div>
          <p>Completed</p>
          <div className="stat-bottom"><h2>{completed}</h2></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Clock size={22} /></div>
          <p>In Progress</p>
          <div className="stat-bottom"><h2>{active}</h2></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><AlertTriangle size={22} /></div>
          <p>Pending</p>
          <div className="stat-bottom"><h2>{pending}</h2></div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Production Tasks</h3>
            <p>Track current manufacturing activities</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Product</th>
                <th>Order ID</th>
                <th>Progress</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td className="order-id">{task.id}</td>
                  <td>{task.product}</td>
                  <td>{task.order}</td>
                  <td>
                    <strong>{task.completed}/{task.quantity}</strong>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${Math.min(100, task.completed / task.quantity * 100)}%` }}></div>
                    </div>
                  </td>
                  <td>{task.priority}</td>
                  <td>
                    <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <select value={task.status} onChange={e => updateStatus(task.id, e.target.value)}>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <form className="modal-form" onSubmit={addTask}>
            <div className="modal-header">
              <h2>New Production Task</h2>
              <button type="button" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <label>Product Name</label>
            <input required value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} />
            <label>Order ID</label>
            <input required value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} />
            <label>Quantity</label>
            <input required type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
            <label>Priority</label>
            <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <button className="primary-button submit-button" type="submit">Create Task</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Production
