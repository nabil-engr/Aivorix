$ErrorActionPreference = "Stop"

function Assert-CommandSucceeded {
    param([Parameter(Mandatory)][string]$Step)

    if ($LASTEXITCODE -ne 0) {
        throw "$Step failed with exit code $LASTEXITCODE."
    }
}

Push-Location client/aivorix-web
try {
    npm install
    Assert-CommandSucceeded "npm install"

    npm run build:prod
    Assert-CommandSucceeded "Angular production build"
}
finally {
    Pop-Location
}

node scripts/copy-client-to-api.mjs
Assert-CommandSucceeded "Client asset copy"

dotnet restore Aivorix.sln
Assert-CommandSucceeded ".NET restore"

dotnet build Aivorix.sln -c Release --no-restore
Assert-CommandSucceeded ".NET Release build"

Write-Host "Build complete."
