#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git add -A
git commit -m 'deploy'

git push -f git@github.com:chenhom/todo-list.git master:gh-pages

cd -