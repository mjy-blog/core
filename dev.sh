#!/bin/sh

set -e

cd "$(dirname "$0")"


# clean previous build and prepare current build

rm -rf out
cp -r template out
(cd out && npm i)


# build articles

(cd articles && sh build.sh)
cp -r articles/out out/src/app/_articles
[ ! -d out/src/app/_articles/public ] || mv out/src/app/_articles/public out/public/posts
[ ! -f out/src/app/_theme/init.sh ] || (cd out && sh src/app/_articles/init.sh)


# build theme

(cd theme && sh build.sh)
cp -r theme/out out/src/app/_theme
[ ! -d out/src/app/_theme/public ] || mv out/src/app/_theme/public out/public/theme
[ ! -f out/src/app/_theme/init.sh ] || (cd out && sh src/app/_theme/init.sh)

# build

MJY_BLOG_DATA_PATH="$(pwd)/out/src/app/_articles/index.json" npm run build
(cd out && npx next build)

# for github pages

touch out/out/.nojekyll
