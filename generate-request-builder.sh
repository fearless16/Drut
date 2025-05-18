#!/bin/bash

mkdir -p src/components/RequestBuilder
touch src/components/RequestBuilder/RequestBuilder.tsx
touch src/components/RequestBuilder/MethodSelector.tsx
touch src/components/RequestBuilder/UrlInput.tsx
touch src/components/RequestBuilder/HeaderEditor.tsx
touch src/components/RequestBuilder/BodyEditor.tsx
touch src/components/RequestBuilder/SendButton.tsx

mkdir -p src/hooks
touch src/hooks/useRequestForm.ts

echo "RequestBuilder scaffold generated 🍆"
