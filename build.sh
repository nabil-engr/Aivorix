#!/usr/bin/env bash
set -euo pipefail
pushd client/aivorix-web >/dev/null
npm install
npm run build:prod
popd >/dev/null
node scripts/copy-client-to-api.mjs
dotnet restore Aivorix.sln
dotnet build Aivorix.sln -c Release
echo "Build complete."
