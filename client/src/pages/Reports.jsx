
import { useEffect, useState } from "react";
import {
  getOrders,
  getProduction,
  getInventory,
  getEmployees
} from "../services/api";

function Reports() {
  const [report, setReport] = useState({
    orders: [],
    production: [],
    inventory: [],
    employees: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        const [orders, production, inventory, employees] =
          await Promise.all([
            getOrders(),
            getProduction(),
            getInventory(),
            getEmployees()
          ]);

        setReport({
          orders,
          production,
          inventory,
          employees
        });
      } catch (err) {
        setError("Unable to load report data. Check the server connection.");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const completedOrders = report.orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const pendingOrders = report.orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedTasks = report.production.filter(
    (task) => task.status === "Completed"
  ).length;

  const totalStock = report.inventory.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  function downloadReport() {
    const content = `
FACTORYFLOW - FACTORY REPORT

Total Orders: ${report.orders.length}
Completed Orders: ${completedOrders}
Pending Orders: ${pendingOrders}

Total Production Tasks: ${report.production.length}
Completed Production Tasks: ${completedTasks}

Total Inventory Items: ${report.inventory.length}
Total Stock Quantity: ${totalStock}

Total Employees: ${report.employees.length}
`;

    const blob = new Blob([content], {
      type: "text/plain"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "FactoryFlow-Report.txt";
    link.click();

    URL.revokeObjectURL(url);
  }

  if (loading) {
    return <div className="page"><p>Loading reports...</p></div>;
  }

  if (error) {
    return <div className="page"><p>{error}</p></div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Factory performance and operational summary</p>
        </div>

        <button className="btn-primary" onClick={downloadReport}>
          Download Report
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <h2>{report.orders.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed Orders</h3>
          <h2>{completedOrders}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending Orders</h3>
          <h2>{pendingOrders}</h2>
        </div>

        <div className="stat-card">
          <h3>Production Tasks</h3>
          <h2>{report.production.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <h2>{completedTasks}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Stock</h3>
          <h2>{totalStock}</h2>
        </div>

        <div className="stat-card">
          <h3>Inventory Items</h3>
          <h2>{report.inventory.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Employees</h3>
          <h2>{report.employees.length}</h2>
        </div>
      </div>
    </div>
  );
}

export default Reports;
