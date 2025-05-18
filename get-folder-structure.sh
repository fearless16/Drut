#!/bin/bash

# Recursively print directory structure, skipping node_modules and hidden files/folders
print_tree() {
    local indent="$2"
    local dir
    for dir in "$1"/*; do
        [ -d "$dir" ] || continue
        base=$(basename "$dir")
        [[ "$base" == "node_modules" || "$base" == .* ]] && continue
        echo "${indent}├── $base"
        print_tree "$dir" "$indent│   "
    done
}

echo "."
print_tree "." ""
