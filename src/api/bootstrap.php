<?php
declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dot = Dotenv::createImmutable(__DIR__);
if (file_exists(__DIR__ . '/.env')) {
  $dot->load();
}

/**
 * Simple CORS for Ionic dev (8100/8101). Adjust as needed.
 */
$allowedOrigins = [
  'http://localhost:8100',
  'http://localhost:8101',
  'http://127.0.0.1:8100',
  'http://127.0.0.1:8101',
  // add your domains here (production, previews, etc.)
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $allowedOrigins, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
} else {
  header('Access-Control-Allow-Origin: *'); // fallback in dev
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

function env_or(string $key, ?string $default = null): ?string {
  return $_ENV[$key] ?? $default;
}

function db(): PDO {
  static $pdo = null;
  if ($pdo === null) {
    $dsn = env_or('DB_DSN', 'mysql:host=127.0.0.1;port=8889;dbname=goat;charset=utf8mb4');
    $user = env_or('DB_USER', 'root');
    $pass = env_or('DB_PASS', 'root');
    $pdo = new PDO($dsn, $user, $pass, [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
  }
  return $pdo;
}

function json($data, int $code = 200): void {
  http_response_code($code);
  header('Content-Type: application/json');
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

function auth_user_id(): int {
  $h = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
  if (!preg_match('/Bearer\s+(.+)$/i', $h, $m)) {
    json(['error' => 'Missing token'], 401);
  }
  $secret = env_or('JWT_SECRET', 'CHANGE_ME_SUPER_LONG_SECRET');
  try {
    $payload = JWT::decode($m[1], new Key($secret, 'HS256'));
    return (int)$payload->sub;
  } catch (Throwable $e) {
    json(['error' => 'Invalid token'], 401);
  }
}
