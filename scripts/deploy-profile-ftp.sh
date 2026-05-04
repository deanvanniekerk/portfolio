#!/usr/bin/env bash
set -euo pipefail

if [[ -f ".dev.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source ".dev.env"
  set +a
fi

DIST_DIR="dist"

required_vars=(
  FTP_HOST
  FTP_USER
  FTP_PASSWORD
  FTP_REMOTE_DIR
)

for var_name in "${required_vars[@]}"; do
  if [[ -z "${!var_name:-}" ]]; then
    echo "Missing $var_name."
    echo "Add it to .dev.env or export it before running: npm run deploy:profile"
    exit 1
  fi
done

echo "Building profile page..."
npm run build

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Build output not found at $DIST_DIR"
  exit 1
fi

echo "Uploading $DIST_DIR to ftp://$FTP_HOST/$FTP_REMOTE_DIR"

while IFS= read -r -d '' file; do
  relative_path="${file#$DIST_DIR/}"
  remote_url="ftp://$FTP_HOST/$FTP_REMOTE_DIR/$relative_path"

  echo "Uploading $relative_path"
  curl --fail --silent --show-error --ftp-create-dirs \
    --user "$FTP_USER:$FTP_PASSWORD" \
    --upload-file "$file" \
    "$remote_url"
done < <(find "$DIST_DIR" -type f -print0)

echo "Profile page deployed."
