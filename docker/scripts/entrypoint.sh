#!/bin/sh
# docker/scripts/entrypoint.sh

set -e

echo "Starting LogiFin Frontend..."
echo "Environment: ${APP_ENV:-local}"

# Execute the main command
exec "$@"
