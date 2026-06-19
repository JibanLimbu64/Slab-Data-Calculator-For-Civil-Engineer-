<?php
header('Content-Type: application/json');

// 1. Database Connection Configuration
$host = "localhost";
$db_user = "root"; // Change to your DB username
$db_pass = "";     // Change to your DB password
$db_name = "aether_db";

$conn = new mysqli($host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection breakdown."]);
    exit();
}

// 2. Handle POST Request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['username'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    // 3. Server-Side Password Match Validation
    if ($password !== $confirm_password) {
        echo json_encode(["success" => false, "message" => "त्रुटि: पासवर्डहरू मेल खाएनन्!"]);
        exit();
    }

    if (strlen($password) < 8) {
        echo json_encode(["success" => false, "message" => "पासवर्ड कम्तिमा ८ अक्षरको हुनुपर्छ।"]);
        exit();
    }

    // 4. Check if Phone Number is Already Registered
    $check_stmt = $conn->prepare("SELECT id FROM users WHERE phone_number = ?");
    $check_stmt->bind_param("s", $phone);
    $check_stmt->execute();
    $check_stmt->store_result();
    
    if ($check_stmt->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "यो मोबाइल नम्बर पहिले नै दर्ता भइसकेको छ।"]);
        $check_stmt->close();
        exit();
    }
    $check_stmt->close();

    // 5. Hash Password and Insert Securely Using Prepared Statements
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO users (username, phone_number, password_hash) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $phone, $hashed_password);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "साइन अप सफल! प्रोफाइल डेटा सुरक्षित गरियो।"]);
    } else {
        echo json_encode(["success" => false, "message" => "प्रणाली त्रुटि: खाता सिर्जना गर्न सकिएन।"]);
    }

    $stmt->close();
}
$conn->close();
?>