var gulp = require('gulp'),
    to5 = require('gulp-6to5'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('to5', function(){
    return gulp.src('../src/**/*')
    .pipe(to5())
    .pipe(uglify())
    .pipe(rename(function(path){
        path.basename+='-es5';
    })).pipe(gulp.dest('../dist'));
});

gulp.task('dist', function(){
    return gulp.src('../src/**/*')
    //.pipe(uglify())
    .pipe(gulp.dest('../dist'));
});

gulp.task('default',['dist','to5']);
