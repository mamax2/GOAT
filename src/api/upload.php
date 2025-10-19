<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Optional: protect upload with JWT
// $uid = auth_user_id();

$uploadDir = __DIR__ . '/' . (env_or('UPLOAD_DIR', 'uploads'));
if (!is_dir($uploadDir)) {
  @mkdir($uploadDir, 0775, true);
}

if (!isset($_FILES['file'])) {
  json(['error' => 'No file'], 400);
}

$ext = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
$allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'];
if (!in_array($ext, $allowed, true)) {
  json(['error' => 'Invalid file type'], 415);
}

$filename = 'file-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
$target = $uploadDir . '/' . $filename;

if (!move_uploaded_file($_FILES['file']['tmp_name'], $target)) {
  json(['error' => 'Upload failed'], 500);
}

$base = rtrim(env_or('BASE_URL', 'http://localhost:8000'), '/');
$url = $base . '/' . trim(env_or('UPLOAD_DIR', 'uploads'), '/') . '/' . $filename;

json(['url' => $url], 201);
