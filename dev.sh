#!/bin/sh

set -e

cd "$(dirname "$0")"


# build articles

(cd articles && git pull && git submodule update --init && sh build.sh)
rm -rf 'src/app/_articles'
cp -r articles/out 'src/app/_articles'


# build theme

(cd theme && git pull && git submodule update --init && sh build.sh)
rm -rf 'src/app/_theme'
cp -r theme/out 'src/app/_theme'


# build

npm run build
