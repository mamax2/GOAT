<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

use Firebase\JWT\JWT;

$r = $_GET['r'] ?? '';

if ($r === 'signup' && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = json_decode(file_get_contents('php://input'), true) ?? [];
  $email = trim((string)($body['email'] ?? ''));
  $pass  = (string)($body['password'] ?? '');

  if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($pass) < 6) {
    json(['error' => 'Invalid email/password (min 6 chars)'], 422);
  }

  $pdo = db();
  $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
  $stmt->execute([$email]);
  if ($stmt->fetch()) {
    json(['error' => 'Email already exists'], 409);
  }

  $hash = password_hash($pass, PASSWORD_DEFAULT);
  $pdo->prepare('INSERT INTO users(email, password_hash) VALUES (?, ?)')->execute([$email, $hash]);
  $userId = (int)$pdo->lastInsertId();

  $token = JWT::encode([
    'sub' => $userId,
    'email' => $email,
    'iat' => time(),
    'exp' => time() + 60*60*24*7 // 7 days
  ], env_or('JWT_SECRET', 'CHANGE_ME_SUPER_LONG_SECRET'), 'HS256');

  json(['token' => $token, 'user' => ['id' => $userId, 'email' => $email]], 201);
}

if ($r === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = json_decode(file_get_contents('php://input'), true) ?? [];
  $email = trim((string)($body['email'] ?? ''));
  $pass  = (string)($body['password'] ?? '');

  $pdo = db();
  $stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE email = ?');
  $stmt->execute([$email]);
  $u = $stmt->fetch();
  if (!$u || !password_verify($pass, $u['password_hash'])) {
    json(['error' => 'Invalid credentials'], 401);
  }

  $token = JWT::encode([
    'sub' => (int)$u['id'],
    'email' => $email,
    'iat' => time(),
    'exp' => time() + 60*60*24*7
  ], env_or('JWT_SECRET', 'CHANGE_ME_SUPER_LONG_SECRET'), 'HS256');

  json(['token' => $token, 'user' => ['id' => (int)$u['id'], 'email' => $email]]);
}

json(['error' => 'Not found'], 404);
