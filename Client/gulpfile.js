var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');


gulp.task('scripts', function () {

    var tsProject = ts.createProject('src/scripts/tsconfig.json', {
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