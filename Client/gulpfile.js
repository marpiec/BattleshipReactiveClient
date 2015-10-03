var gulp = require('gulp');
var bower = require('gulp-bower');
var ts = require('gulp-typescript');
var merge = require('merge2');


gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('lib/'))
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


gulp.task('default', ['scripts']);