
import { useState } from "react";
import { Download, FileText, TrendingUp, Package, Users } from "lucide-react";

function Reports() {
  const [period, setPeriod] = useState("This Month");

  const reports = [
    {
      title: "Order Summary",
      description: "Overview of total and completed orders",
      value: "128",
      icon: FileText
    },
    {
      title: "Production Report",
      description: "Production tasks and completion status",
      value: "86%",
      icon: TrendingUp
    },
    {
      title: "Inventory Report",
      description: "Available stock and low-stock items",
      value: "245",
      icon: Package
    },
    {
      title: "Employee Report",
      description: "Total employees in the factory",
      value: "32",
      icon: Users
    }
  ];

  const downloadReport = (title) => {
    const content = [
      "FactoryFlow - " + title,
      "Report Period: " + period,
      "Generated Date: " + new Date().toLocaleDateString(),
      "",
      "This is a sample report. Live database data will be connected later."
    ].join("\n");

    const file = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = title.replaceAll(" ", "_") + ".txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>View and download factory performance reports.</p>
        </div>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="filter-select"
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="stats-grid">
        {reports.map((report, index) => {
          const Icon = report.icon;

          return (
            <div className="stat-card" key={index}>
              <div className="stat-icon">
                <Icon size={22} />
              </div>

              <h2>{report.value}</h2>
              <h3>{report.title}</h3>
              <p>{report.description}</p>

              <button
                className="primary-button"
                onClick={() => downloadReport(report.title)}
              >
                <Download size={16} />
                Download
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reports;
