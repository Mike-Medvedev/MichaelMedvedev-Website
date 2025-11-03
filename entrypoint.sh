#!/bin/sh
sed -i "s|__BASE_URL__|${BASE_URL}|g" /app/client/config.js
exec "$@"