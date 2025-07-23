#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'www.intellify.co.za' > CNAME
touch .nojekyll

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/Intellify-Cloud/intellify master:gh-pages

cd -