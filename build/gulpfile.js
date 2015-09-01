var gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('to5', function(){
    return gulp.src('../src/**/*')
    .pipe(babel({modules:'umd'}))
    .pipe(uglify())
    .pipe(rename(function(path){
        path.basename+='-es5';
    })).pipe(gulp.dest('../dist'));
});

gulp.task('dist', function(){
    return gulp.src('../src/**/*')
    .pipe(gulp.dest('../dist'));
});

gulp.task('copy-to-test-folder', ['to5'], function(){
    return gulp.src('../dist/**/*')
    .pipe(gulp.dest('../test'));
})

gulp.task('default',['dist','to5','copy-to-test-folder']);
