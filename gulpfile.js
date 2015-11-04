var gulp = require('gulp');
var bower = require('gulp-bower');
var ts = require('gulp-typescript');
var merge = require('merge2');
var concat = require("gulp-concat");
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jasmine = require('gulp-jasmine');
var clean = require('gulp-clean');

// HTML
gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('release'))
});


gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('release/scripts-libs/'))
});




gulp.task('scripts', [], function () {

    var tsResult = gulp.src(['app/scripts/**/*.ts*', 'app/scripts/libs.d/**/*.ts'])
        .pipe(ts({
            "module": "amd",
            "noImplicitAny": true,
            "removeComments": true,
            "preserveConstEnums": true,
            "sourceMap": true,
            "declaration": true,
            "target": "ES3",
            "jsx": "React",
            sortOutput: true,
            gulpConcat: true,
            gulpSourcemaps: true,
            noExternalResolve: true,
            typescript: require('typescript')
        }));


    return merge([
        tsResult.dts.pipe(concat('main.d.ts')).pipe(gulp.dest('release/scripts')),
        tsResult.js.pipe(concat('main.js')).pipe(gulp.dest('release/scripts'))
    ]);
});


gulp.task('styles', function () {
    gulp.src('app/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('release/styles'));
});



gulp.task('test', ['scripts'], function () {
    return gulp.src('release/scripts/test/**/*.js')
        .pipe(jasmine());
});


// Static server
gulp.task('browser-sync', ['scripts'], function() {
    browserSync.init({
        server: {
            baseDir: "./release/"
        }
    });
});

gulp.task('clean', function() {
    return merge([
        gulp.src('.tmp', {read: false}).pipe(clean()),
        gulp.src('release', {read: false}).pipe(clean())]);
});

gulp.task('default', ['html', 'bower', 'scripts', 'styles']);

gulp.task('server', ['default', 'browser-sync']);