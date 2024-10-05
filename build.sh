#!/bin/sh

set -e

cd "$(dirname "$0")"


# env

load_env_file() {
  ENV_FILE_PATH="$1"

  if [ -f "$ENV_FILE_PATH" ]; then
    . "$(pwd)/$ENV_FILE_PATH"
  fi
}

load_env_file .env
if [ "$NODE_ENV" = "production" ]; then
  load_env_file .env.production
  load_env_file .env.prod
else
  load_env_file .env.development
  load_env_file .env.dev
fi
load_env_file .env.local
if [ "$NODE_ENV" = "production" ]; then
  load_env_file .env.local.prod
  load_env_file .env.local.production
  load_env_file .env.prod.local
  load_env_file .env.production.local
else
  load_env_file .env.local.dev
  load_env_file .env.local.development
  load_env_file .env.dev.local
  load_env_file .env.development.local
fi


# clean previous build and prepare current build

rm -rf out
cp -r template out
(cd out && npm i)
rm -rf articles
rm -rf theme


# build articles

git clone --recursive "${ARTICLES_GIT_REPOSITORY_URL:?}" articles
(cd articles && sh build.sh)
cp -r articles/out out/src/app/_articles
[ ! -d out/src/app/_articles/public ] || mv out/src/app/_articles/public out/public/posts
[ ! -f out/src/app/_theme/init.sh ] || (cd out && sh src/app/_articles/init.sh)


# build theme

git clone --recursive "${THEME_GIT_REPOSITORY_URL:?}" theme
(cd theme && sh build.sh)
cp -r theme/out out/src/app/_theme
[ ! -d out/src/app/_theme/public ] || mv out/src/app/_theme/public out/public/theme
[ ! -f out/src/app/_theme/init.sh ] || (cd out && sh src/app/_theme/init.sh)

# build

MJY_BLOG_DATA_PATH="$(pwd)/out/src/app/_articles/index.json" npm run build
(cd out && npx next build)

# for github pages

touch out/out/.nojekyll
