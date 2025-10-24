set -euo pipefail
docker compose down --remove-orphans
docker compose build --no-cache web
docker compose up -d
docker compose logs -f web
