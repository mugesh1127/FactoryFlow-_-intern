
import React, { useState } from 'react'
import { Users, Plus, Search, Pencil, Trash2, X } from 'lucide-react'

const initialEmployees = [
  { id: 'EMP-001', name: 'Arun Kumar', role: 'Production Manager', department: 'Production', email: 'arun@factory.com', status: 'Active' },
  { id: 'EMP-002', name: 'Priya Sharma', role: 'Quality Inspector', department: 'Quality Control', email: 'priya@factory.com', status: 'Active' },
  { id: 'EMP-003', name: 'Rahul Das', role: 'Machine Operator', department: 'Manufacturing', email: 'rahul@factory.com', status: 'Active' },
  { id: 'EMP-004', name: 'Sneha R', role: 'Inventory Manager', department: 'Inventory', email: 'sneha@factory.com', status: 'Inactive' },
  { id: 'EMP-005', name: 'Vijay Kumar', role: 'Technician', department: 'Maintenance', email: 'vijay@factory.com', status: 'Active' }
]

function Employees() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    role: '',
    department: 'Production',
    email: '',
    status: 'Active'
  })

  const filteredEmployees = employees.filter(employee =>
    [employee.id, employee.name, employee.role, employee.department, employee.email]
      .join(' ').toLowerCase().includes(search.toLowerCase())
  )

  const openForm = (employee = null) => {
    setEditingId(employee?.id || null)
    setForm(employee ? {
      name: employee.name,
      role: employee.role,
      department: employee.department,
      email: employee.email,
      status: employee.status
    } : {
      name: '',
      role: '',
      department: 'Production',
      email: '',
      status: 'Active'
    })
    setShowForm(true)
  }

  const saveEmployee = (e) => {
    e.preventDefault()

    if (editingId) {
      setEmployees(employees.map(employee =>
        employee.id === editingId ? { ...employee, ...form } : employee
      ))
    } else {
      setEmployees([...employees, {
        ...form,
        id: `EMP-${Date.now().toString().slice(-5)}`
      }])
    }

    setShowForm(false)
  }

  const deleteEmployee = (id) => {
    if (window.confirm('Delete this employee?')) {
      setEmployees(employees.filter(employee => employee.id !== id))
    }
  }

  const activeCount = employees.filter(employee => employee.status === 'Active').length

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">HUMAN RESOURCES</p>
          <h1>Employees</h1>
          <p className="page-subtitle">Manage factory staff and department information.</p>
        </div>
        <button className="primary-button" onClick={() => openForm()}>
          <Plus size={17} /> Add Employee
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Users size={22} /></div>
          <p>Total Employees</p>
          <div className="stat-bottom"><h2>{employees.length}</h2></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Users size={22} /></div>
          <p>Active Employees</p>
          <div className="stat-bottom"><h2>{activeCount}</h2></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Users size={22} /></div>
          <p>Inactive Employees</p>
          <div className="stat-bottom"><h2>{employees.length - activeCount}</h2></div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Employee Directory</h3>
            <p>Factory workforce information</p>
          </div>
          <div className="search-box">
            <Search size={17} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search employees..."
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id}>
                  <td className="order-id">{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.department}</td>
                  <td>{employee.email}</td>
                  <td>
                    <span className={`status-badge ${employee.status === 'Active' ? 'completed' : 'pending'}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button title="Edit employee" onClick={() => openForm(employee)}><Pencil size={16} /></button>
                      <button title="Delete employee" onClick={() => deleteEmployee(employee.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr><td colSpan="7" style={{ textAlign: 'center' }}>No employees found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <form className="modal-form" onSubmit={saveEmployee}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Employee' : 'Add Employee'}</h2>
              <button type="button" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>

            <label>Employee Name</label>
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

            <label>Job Role</label>
            <input required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />

            <label>Department</label>
            <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
              <option>Production</option>
              <option>Quality Control</option>
              <option>Manufacturing</option>
              <option>Inventory</option>
              <option>Maintenance</option>
              <option>Administration</option>
            </select>

            <label>Email Address</label>
            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

            <label>Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button className="primary-button submit-button" type="submit">
              {editingId ? 'Update Employee' : 'Save Employee'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Employees
