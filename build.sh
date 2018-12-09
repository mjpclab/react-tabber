#!/bin/bash

# install required node scripts:
# npm install --global typescript rollup uglify

cd "$(dirname $0)"
rm -rf src/built/* dist/*
tsc
rollup --config

# generate css
mkdir -p dist/theme/

cat src/css/layout/index.css src/css/skin/gray.css > dist/theme/gray.css
for file in dist/theme/*.css; do
	uglify -c -s "$file" -o "${file/\.css/.min.css}"
done;
