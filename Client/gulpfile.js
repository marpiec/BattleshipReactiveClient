var gulp = require('gulp');
var bower = require('gulp-bower');
var ts = require('gulp-typescript');
var merge = require('merge2');
//var order = require("gulp-order");
var concat = require("gulp-concat");
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


// HTML
gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('release'))
});


gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('release/scripts-libs/'))
});

gulp.task('preprocess-scripts', function () {


    var module = function(dir, name) {
        return gulp
            .src("app/"+dir+"/**/*.ts*")
            .pipe(concat(name + ".tsx"))
            .pipe(gulp.dest('.tmp/'+dir+'/'));
    };

    return merge([
        gulp.src('app/scripts/main/main.ts')
            .pipe(gulp.dest('.tmp/scripts/main/')),
        module("scripts/main/calculator", "calculator"),
        module("scripts/main/login", "login")]);
});


gulp.task('scripts', ['preprocess-scripts'], function () {

    //var tsProject = ts.createProject('.tmp/scripts/tsconfig.json', {
    //    gulpConcat: true,
    //    gulpSourcemaps: true,
    //    noExternalResolve: true,
    //    typescript: require('typescript')
    //});

    //var tsResult = tsProject.src()
      //  .pipe(ts(tsProject));
    var tsResult = gulp.src(['.tmp/scripts/**/*.ts*', 'app/scripts/libs.d/**/*.ts'])
        .pipe(ts({
            "module": "amd",
            "noImplicitAny": true,
            "removeComments": true,
            "preserveConstEnums": true,
            "sourceMap": true,
            "declaration": true,
            "target": "ES3",
            "jsx": "React",
            gulpConcat: true,
            gulpSourcemaps: true,
            noExternalResolve: true,
            typescript: require('typescript')
        }));


    return merge([
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/scripts'))
    ]);
});


gulp.task('styles', function () {
    gulp.src('app/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('release/styles'));
});






// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./release/"
        }
    });
});

gulp.task('default', ['html', 'bower', 'scripts', 'styles']);

gulp.task('server', ['default', 'browser-sync']);