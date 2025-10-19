<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$uid = auth_user_id();
$pdo = db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $stmt = $pdo->prepare('SELECT id, title, done, created_at FROM items WHERE user_id = ? ORDER BY id DESC');
  $stmt->execute([$uid]);
  json($stmt->fetchAll());
}

if ($method === 'POST') {
  $body = json_decode(file_get_contents('php://input'), true) ?? [];
  $title = trim((string)($body['title'] ?? ''));
  if ($title === '') json(['error' => 'Title required'], 422);
  $pdo->prepare('INSERT INTO items(user_id, title) VALUES (?, ?)')->execute([$uid, $title]);
  $id = (int)$pdo->lastInsertId();
  json(['id' => $id, 'title' => $title, 'done' => 0], 201);
}

if ($method === 'PATCH') {
  parse_str($_SERVER['QUERY_STRING'] ?? '', $q);
  $id = (int)($q['id'] ?? 0);
  if ($id <= 0) json(['error' => 'Invalid id'], 422);
  $body = json_decode(file_get_contents('php://input'), true) ?? [];
  $fields = []; $params = [];
  if (array_key_exists('title', $body)) { $fields[] = 'title = ?'; $params[] = (string)$body['title']; }
  if (array_key_exists('done',  $body)) { $fields[] = 'done  = ?';  $params[] = (int)$body['done']; }
  if (!$fields) json(['error' => 'No fields'], 422);
  $params[] = $uid; $params[] = $id;
  $sql = 'UPDATE items SET ' . implode(', ', $fields) . ' WHERE user_id = ? AND id = ?';
  $pdo->prepare($sql)->execute($params);
  json(['ok' => true]);
}

if ($method === 'DELETE') {
  parse_str($_SERVER['QUERY_STRING'] ?? '', $q);
  $id = (int)($q['id'] ?? 0);
  if ($id <= 0) json(['error' => 'Invalid id'], 422);
  $pdo->prepare('DELETE FROM items WHERE user_id = ? AND id = ?')->execute([$uid, $id]);
  json(['ok' => true]);
}

json(['error' => 'Not found'], 404);
