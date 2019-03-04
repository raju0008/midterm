const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
//define a task to compile sass and run autoprefixer and cssnano
gulp.task('sass', function(){
  const plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano()
  ]
  return gulp
  .src('scss/**/*.scss')// source of any sass files
  .pipe(sass())//run the sass compiler on the source
  .pipe(gulp.dest('css'))//destination for the compiled css file
  .pipe(postcss(plugins))//apply the postCss plugins
  .pipe(gulp.dest('./css/min'))// path to output the minified css file
  .pipe(browserSync.stream())//run the browsersync stream
})
gulp.task('default', function(){

  browserSync.init({ server: './' })

  gulp.watch('scss/**/*.scss', gulp.series('sass'))

  gulp.watch('*.html').on('change', browserSync.reload)
})