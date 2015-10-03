var gulp = require('gulp');
var bower = require('gulp-bower');
var ts = require('gulp-typescript');
var merge = require('merge2');
var browserSync = require('browser-sync').create();


// HTML
gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('release'))
});


gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('release/scripts-libs/'))
});


gulp.task('scripts', function () {

    var tsProject = ts.createProject('app/scripts/tsconfig.json', {
        gulpConcat: true,
        gulpSourcemaps: true,
        noExternalResolve: true,
        typescript: require('typescript')
    });

    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/scripts'))
    ]);
});




// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./release/"
        }
    });
});

gulp.task('default', ['html', 'bower', 'scripts']);

gulp.task('server', ['default', 'browser-sync']);