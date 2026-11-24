
import React from 'react'
import {
  ClipboardList,
  Factory,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

const productionData = [
  { day: 'Mon', orders: 35 },
  { day: 'Tue', orders: 48 },
  { day: 'Wed', orders: 42 },
  { day: 'Thu', orders: 65 },
  { day: 'Fri', orders: 58 },
  { day: 'Sat', orders: 75 },
  { day: 'Sun', orders: 68 }
]

const recentOrders = [
  { id: 'ORD-1001', customer: 'Acme Industries', product: 'Steel Components', quantity: 500, status: 'In Progress' },
  { id: 'ORD-1002', customer: 'Global Manufacturing', product: 'Metal Sheets', quantity: 300, status: 'Completed' },
  { id: 'ORD-1003', customer: 'Prime Engineering', product: 'Industrial Bolts', quantity: 1200, status: 'Pending' },
  { id: 'ORD-1004', customer: 'Tech Solutions', product: 'Machine Parts', quantity: 250, status: 'In Progress' }
]

const stats = [
  { title: 'Total Orders', value: '248', change: '+12.5%', icon: ClipboardList, color: 'blue' },
  { title: 'Production Output', value: '1,840', change: '+8.2%', icon: Factory, color: 'purple' },
  { title: 'Inventory Items', value: '1,256', change: '-2.4%', icon: Package, color: 'orange' },
  { title: 'Active Employees', value: '86', change: '+4.6%', icon: Users, color: 'green' }
]

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="page-subtitle">
            Monitor your factory operations and production performance.
          </p>
        </div>
        <div className="date-label">
          <Clock size={16} />
          Factory Overview
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div className="stat-card" key={stat.title}>
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={22} />
              </div>
              <p>{stat.title}</p>
              <div className="stat-bottom">
                <h2>{stat.value}</h2>
                <span className={stat.change.startsWith('+') ? 'positive' : 'negative'}>
                  {stat.change.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {stat.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="dashboard-grid">
        <div className="panel production-panel">
          <div className="panel-header">
            <div>
              <h3>Production Overview</h3>
              <p>Weekly production performance</p>
            </div>
            <span className="panel-tag">This Week</span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={productionData}>
                <defs>
                  <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9edf5" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={3} fill="url(#productionGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel status-panel">
          <div className="panel-header">
            <div>
              <h3>Production Status</h3>
              <p>Current workflow status</p>
            </div>
          </div>

          <div className="status-item">
            <div className="status-symbol blue"><Factory size={19} /></div>
            <div className="status-details">
              <strong>In Production</strong>
              <span>12 active orders</span>
            </div>
            <strong>12</strong>
          </div>

          <div className="status-item">
            <div className="status-symbol green"><CheckCircle size={19} /></div>
            <div className="status-details">
              <strong>Completed</strong>
              <span>Ready for delivery</span>
            </div>
            <strong>28</strong>
          </div>

          <div className="status-item">
            <div className="status-symbol orange"><Clock size={19} /></div>
            <div className="status-details">
              <strong>Pending</strong>
              <span>Awaiting processing</span>
            </div>
            <strong>8</strong>
          </div>

          <div className="status-item">
            <div className="status-symbol red"><AlertTriangle size={19} /></div>
            <div className="status-details">
              <strong>Delayed</strong>
              <span>Requires attention</span>
            </div>
            <strong>3</strong>
          </div>
        </div>
      </div>

      <div className="panel orders-panel">
        <div className="panel-header">
          <div>
            <h3>Recent Orders</h3>
            <p>Latest factory order activities</p>
          </div>
          <a href="/orders" className="view-all">
            View All <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
