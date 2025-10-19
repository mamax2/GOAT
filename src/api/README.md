# PHP Backend (JWT) for Angular/Ionic — GOAT

## Quick start (MAMP)

1. Open **MAMP** > Start servers. Default MySQL: host `localhost`, port `8889`, user `root`, pass `root`.
2. Create DB & tables (via phpMyAdmin or MySQL shell):
   - Import `schema.sql`, or run queries from it.
3. Copy `.env.example` to `.env` and adjust values if needed.
4. Install dependencies:
   ```bash
   cd THIS_FOLDER
   composer install
   ```
5. Run local PHP server (for API only):
   ```bash
   php -S localhost:8000
   ```
