set -euo pipefail

# Clean out conflicting MUI/E Emotion versions (if any)
npm remove @mui/material @mui/system @mui/icons-material @mui/x-date-pickers @emotion/react @emotion/styled || true

# Install versions that are compatible together (MUI v5 + X Date Pickers v7)
npm install --save-exact \
  @mui/material@5.15.14 \
  @mui/system@5.15.14 \
  @mui/icons-material@5.15.14 \
  @mui/x-date-pickers@7.6.2 \
  @emotion/react@11.13.3 \
  @emotion/styled@11.13.0

# Install the other packages your code requires
npm install --save-exact \
  react-dropzone@14.2.3 \
  dayjs@1.11.13 \
  js-cookie@3.0.5 \
  dompurify@3.1.6 \
  formik@2.4.6 \
  yup@1.4.0
