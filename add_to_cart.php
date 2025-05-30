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

$data = json_decode(file_get_contents('php://input'), true);

$user_id = $data['user_id'];
$product_id = $data['product_id'];
$name = $data['name'];
$price = $data['price'];
$image = $data['image'];
$specs = $data['specs'];
$condition = $data['condition'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO cart (user_id, product_id, name, price, image, specs, `condition`) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("isdsdss", $user_id, $product_id, $name, $price, $image, $specs, $condition);

// Execute the statement
if ($stmt->execute()) {
    $response = [
        'status' => 'success',
        'message' => 'Item added to cart successfully!',
        'cart_item' => [
            'id' => $product_id,
            'name' => $name,
            'price' => $price,
            'image' => $image,
            'specs' => $specs,
            'condition' => $condition
        ]
    ];
    echo json_encode($response);
} else {
    $response = [
        'status' => 'error',
        'message' => 'Error: ' . $stmt->error
    ];
    echo json_encode($response);
}

$stmt->close();
$conn->close();
?>