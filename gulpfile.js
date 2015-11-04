var gulp = require('gulp');
var bower = require('gulp-bower');
var ts = require('gulp-typescript');
var merge = require('merge2');
var concat = require("gulp-concat");
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jasmine = require('gulp-jasmine');
var clean = require('gulp-clean');

var config = {
    bowerDir: './bower_components'
};

// HTML
gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('release'))
});


gulp.task('bower', function() {
    var min = "";
    return gulp.src([
        "bower_components/react/react"+min+".js",
        "bower_components/jquery/dist/jquery"+min+".js"
    ]).pipe(concat('libs.js')).pipe(gulp.dest('release/scripts/'))
});


gulp.task('scripts', [], function () {

    var tsResult = gulp.src(['app/scripts/main/**/*.ts*', 'app/scripts/libs.d/**/*.ts'])
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

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('release/fonts'));
});

gulp.task('clean', function() {
    return merge([
        gulp.src('.tmp', {read: false}).pipe(clean()),
        gulp.src('release', {read: false}).pipe(clean())]);
});

gulp.task('default', ['html', 'bower', 'scripts', 'styles', 'icons']);

gulp.task('server', ['default', 'browser-sync']);