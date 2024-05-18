#!/usr/bin/env sh

# abort on errors
set -e

# navigate into the build output directory
cd dist

if [ -n "$(git status --porcelain)" ]; then
    git add -A
    git commit -m 'deploy'
fi

git push -f git@github.com:chenhom/todo-list.git master:gh-pages

cd -