
INSERT INTO employees (name, role, department, email)
VALUES
('Arun Kumar', 'Manager', 'Production', 'arun@example.com'),
('Priya', 'Operator', 'Assembly', 'priya@example.com'),
('Rahul', 'Technician', 'Maintenance', 'rahul@example.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO inventory (item_name, category, quantity, unit, reorder_level)
VALUES
('Steel Sheets', 'Raw Material', 500, 'kg', 100),
('Bolts', 'Components', 1000, 'pieces', 200),
('Motor Units', 'Components', 50, 'units', 10)
ON CONFLICT DO NOTHING;

INSERT INTO orders (order_number, customer_name, product_name, quantity, status, due_date)
VALUES
('ORD-1001', 'ABC Industries', 'Steel Frames', 100, 'In Progress', CURRENT_DATE + INTERVAL '7 days'),
('ORD-1002', 'XYZ Manufacturing', 'Motor Assemblies', 50, 'Pending', CURRENT_DATE + INTERVAL '10 days')
ON CONFLICT (order_number) DO NOTHING;
