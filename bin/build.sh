#!/bin/bash

# Compile SCSS files
cd src/css
for input_file in *.scss
do
  output_file="../../www/css/${input_file/scss/css}"
  scss --force --no-cache --sourcemap=none $input_file $output_file
done
cd -

# Compile JSX files
jsx --no-cache-dir src/js www/js
