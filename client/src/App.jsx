
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Production from './pages/Production'
import Inventory from './pages/Inventory'
import Employees from './pages/Employees'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="production" element={<Production />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="employees" element={<Employees />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
