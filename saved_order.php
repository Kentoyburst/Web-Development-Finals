<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "timehaven";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Prepare order data
$order_id = $data['orderId'];
$user_id = 1; // You should get this from session
$customer_data = json_encode($data['customer']);
$items_data = json_encode($data['items']);
$subtotal = $data['subtotal'];
$order_date = $data['orderDate'];

// Insert into orders table
$stmt = $conn->prepare("INSERT INTO orders (order_id, user_id, customer_data, items, subtotal, order_date) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sisdss", $order_id, $user_id, $customer_data, $items_data, $subtotal, $order_date);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>