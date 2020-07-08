const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const cssToJs = require('gulp-css-to-js');
const merge2 = require('merge2');
const zip = require('gulp-zip');



exports.bookmarklet = function() {
  return merge2(
    src([
      'src/lib/jquery.js',
      'src/lib/toast.js',
      'src/lib/localforage.js',
      'src/lib/lodash.js',
      'src/lib/sbd.js',
      'src/lib/similarity.js',
      'src/lib/clustering.js',
      'src/nearest.js',
      'src/clientutils.js',
      'src/baggy.js',
      'src/bookmarklet.js',
    ])
      .pipe(babel())
      .pipe(uglify()),
    src([
      'src/lib/toast.css',
    ])
      .pipe(cssToJs())
  )
    .pipe(concat('bookmarklet.min.js'))
    .pipe(dest('web/public/'));
}


exports.extension = function() {
  return src([
    'src/**',
  ])
    .pipe(zip('baggy-latest.zip'))
    .pipe(dest('web/public/'));
}