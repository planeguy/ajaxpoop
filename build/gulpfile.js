var gulp = require('gulp'),
    to5 = require('gulp-6to5'),
    uglify = require('gulp-uglify');

gulp.task('to5', function(){
    return gulp.src('../src/**/*')
    .pipe(to5())
    .pipe(uglify())
    .pipe(gulp.dest('../dist/es5'));
});

gulp.task('dist', function(){
    return gulp.src('../src/**/*')
    //.pipe(uglify())
    .pipe(gulp.dest('../dist'));
});

gulp.task('default',['dist','to5']);
