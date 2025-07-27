<?php
header('Content-Type: application/json');

$host = 'serwer2506560.home.pl';
$dbname = '39913988_pamiec';
$username = '39913988_pamiec';
$password = 'nQn3xC2q';
$apiKey = 'WZ0c_6M+';

$input = json_decode(file_get_contents('php://input'), true);
$key = $input['api_key'] ?? '';
$action = $input['action'] ?? '';
$table = $input['table'] ?? '';

if ($key !== $apiKey) {
    echo json_encode(['error' => 'Invalid API Key']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($action === 'get') {
        $stmt = $pdo->query("SELECT * FROM `$table`");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(['error' => 'Unsupported action']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed', 'details' => $e->getMessage()]);
}
?>
