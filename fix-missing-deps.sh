set -euo pipefail

# Install exactly these versions (known-good with React 18 / MUI v5)
npm install --save-exact \
  axios@1.7.7 \
  notistack@3.0.1 \
  socket.io-client@4.7.5
