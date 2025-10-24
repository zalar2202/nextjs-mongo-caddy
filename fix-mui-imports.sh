set -euo pipefail
# Update any v13-appRouter import to v14-appRouter
find app -type f \( -name "layout.js" -o -name "layout.jsx" -o -name "layout.tsx" \) -print0 \
  | xargs -0 sed -i -E 's|@mui/material-nextjs/v13-appRouter|@mui/material-nextjs/v14-appRouter|g'
