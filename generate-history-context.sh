#!/bin/bash

echo "🛠️  Generating History Context structure..."

# Create context & hook
mkdir -p src/context
touch src/context/HistoryContext.tsx
touch tests/context/HistoryContext.test.ts

mkdir -p src/hooks
touch src/hooks/useHistory.ts

# Create components
mkdir -p src/components/History
touch src/components/History/HistoryList.tsx
touch src/components/History/HistoryItem.tsx
touch tests/components/HistoryList.test.tsx

# Create page
mkdir -p src/pages
touch src/pages/HistoryPage.tsx
mkdir -p tests/pages
touch tests/pages/HistoryPage.test.tsx

echo "✅ Folders & files created."
