<?php
header('Content-Type: application/json');

// Database Connection Configuration
$host = "localhost";
$db_user = "root"; 
$db_pass = "";     
$db_name = "aether_db";

$conn = new mysqli($host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection breakdown."]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        echo json_encode(["success" => false, "message" => "त्रुटि: सबै क्षेत्रहरू भर्नुहोस्!"]);
        exit();
    }

    // 1. Search for the account using the Username
    $stmt = $conn->prepare("SELECT password_hash FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // 2. Verify if the incoming password matches the signup hash
        if (password_verify($password, $user['password_hash'])) {
            // SUCCESS MATCH
            echo json_encode([
                "success" => true, 
                "message" => "लॉगइन सफल! स्वागत छ, " . htmlspecialchars($username)
            ]);
        } else {
            // FAILED MATCH (Wrong Password)
            echo json_encode(["success" => false, "message" => "त्रुटि: पासकी वा प्रयोगकर्ता नाम मिलेन!"]);
        }
    } else {
        // FAILED MATCH (Username doesn't exist)
        echo json_encode(["success" => false, "message" => "त्रुटि: पासकी वा प्रयोगकर्ता नाम मिलेन!"]);
    }

    $stmt->close();
}
$conn->close();
// Checkpoint 1: Find the user account
if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    // Checkpoint 2: Verify the signup password hash matches
    if (password_verify($password, $user['password_hash'])) {
        // SUCCESS: Username exists AND password matches!
        echo json_encode([
            "success" => true, 
            "message" => "लॉगइन सफल! स्वागत छ, " . htmlspecialchars($username)
        ]);
    } else {
        // FAILURE: Username exists, but the password is wrong
        echo json_encode(["success" => false, "message" => "त्रुटि: पासकी वा प्रयोगकर्ता नाम मिलेन!"]);
    }
} else {
    // FAILURE: Username does not exist in the database at all
    echo json_encode(["success" => false, "message" => "त्रुटि: पासकी वा प्रयोगकर्ता नाम मिलेन!"]);
}
?>