#!/bin/bash

# install required node scripts:
# npm install --global typescript rollup csso-cli

cd "$(dirname $0)"
rm -rf built/* dist/*
rollup --config

mkdir -p dist/theme/effect/

# generate css
for file in src/css/skin/*.css; do
	cat src/css/layout/index.css "$file" | sed -e '/html/,/}/d' > dist/theme/$(basename $file)
done;

for file in dist/theme/*.css; do
	csso -o "${file/\.css/.min.css}" "$file"
done;

cp src/css/effect/* dist/theme/effect/
for file in dist/theme/effect/*.css; do
	csso -o "${file/\.css/.min.css}" "$file"
done;
