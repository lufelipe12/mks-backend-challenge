#!/bin/sh
>&2 echo "Starting server..."
npm run typeorm:cli -- migration:run && npm run start:dev