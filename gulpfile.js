var replace = require('gulp-replace');
var argv = require('yargs').argv;
var gulp = require('gulp');
var rename = require("gulp-rename");
var clean = require('gulp-clean');

//Get previous name of module from package.json
var pckg = require('./package.json');
var oldName = pckg.name;   
var name = (argv.name === undefined) ? 'abl-payment-summary' : argv.name;

gulp.task('new', ['js', 'css'], function(){
  gulp.src(['webpack.config.js', 'package.json'])
    .pipe(replace(oldName, name))
    .pipe(gulp.dest('./'), {overwrite: true});
});


gulp.task('js', function(){
  gulp.src(['src/*.js'])
    .pipe(replace(oldName, name))
    .pipe(rename({basename: name}))
    .pipe(gulp.dest('src/'), {overwrite: true});
});

gulp.task('css', function(){
  gulp.src(['src/*.css'])
    .pipe(rename({basename: name}))
    .pipe(gulp.dest('src/'), {overwrite: true});
});

gulp.task('generate', ['new'], function () {
    return gulp.src(['src/' + oldName + '.*', 'dst/*'], {read: false})
        .pipe(clean());
});