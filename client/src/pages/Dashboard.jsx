
import { useEffect, useState } from "react";
import {
  ClipboardList,
  Factory,
  Package,
  Users
} from "lucide-react";
import { getDashboard, getOrders } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [dashboardResponse, ordersResponse] = await Promise.all([
          getDashboard(),
          getOrders()
        ]);

        setStats(dashboardResponse.data);
        setOrders(ordersResponse.data.slice(0, 5));
      } catch (err) {
        setError("Unable to load dashboard data. Check the server and database connection.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="page-container">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="page-container">{error}</div>;
  }

  const cards = [
    {
      title: "Total Orders",
      value: stats.orders.total,
      icon: ClipboardList
    },
    {
      title: "Production Tasks",
      value: stats.production.total,
      icon: Factory
    },
    {
      title: "Inventory Items",
      value: stats.inventory.total,
      icon: Package
    },
    {
      title: "Employees",
      value: stats.employees.total,
      icon: Users
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to FactoryFlow Management System.</p>
        </div>
      </div>

      <div className="stats-grid">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div className="stat-card" key={index}>
              <div className="stat-icon">
                <Icon size={22} />
              </div>

              <h2>{card.value}</h2>
              <h3>{card.title}</h3>
            </div>
          );
        })}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Completed Orders</h3>
          <h2>{stats.orders.completed}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending Orders</h3>
          <h2>{stats.orders.pending}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed Production</h3>
          <h2>{stats.production.completed}</h2>
        </div>

        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <h2>{stats.inventory.low_stock}</h2>
        </div>
      </div>

      <div className="content-card">
        <h2>Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.order_number}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <span className="status">{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
