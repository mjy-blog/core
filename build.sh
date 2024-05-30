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


# build articles

rm -rf articles
git clone --recursive "${ARTICLES_GIT_REPOSITORY_URL:?}" articles
(cd articles && sh build.sh)
rm -rf 'src/app/_articles'
cp -r articles/out 'src/app/_articles'
rm -rf public/posts
[ ! -d src/app/_articles/public ] || mv src/app/_articles/public public/posts


# build theme

rm -rf theme
git clone --recursive "${THEME_GIT_REPOSITORY_URL:?}" theme
(cd theme && sh build.sh)
rm -rf 'src/app/_theme'
cp -r theme/out 'src/app/_theme'


# build

npm i
npm run build
