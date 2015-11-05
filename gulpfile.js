var gulp = require('gulp');
var bower = require('gulp-bower');
var ts = require('gulp-typescript');
var merge = require('merge2');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jasmine = require('gulp-jasmine');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');


var appDir = function(path) {return './app/' + path};
var bowerDir = function(path) {return './bower_components/' + path};
var releaseDir = function(path) {return './release/' + path};


gulp.task('bower', function() {
  return bower()
});

// HTML
gulp.task('html', ['bower'], function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest(releaseDir('')))
});


gulp.task('scripts-libs', ['bower'], function() {
    var min = '';
    return gulp.src([
        bowerDir('react/react'+min+'.js'),
        bowerDir('jquery/dist/jquery'+min+'.js'),
        bowerDir('bootstrap-sass/assets/javascripts/bootstrap'+min+'.js')
    ]).pipe(concat('libs.js')).pipe(gulp.dest(releaseDir('scripts/')))
});


gulp.task('scripts', ['bower'], function () {

    var tsResult = gulp.src([appDir('scripts/main/**/*.ts*'), appDir('scripts/libs.d/**/*.ts')])
        .pipe(ts({
            'module': 'amd',
            'noImplicitAny': true,
            'removeComments': true,
            'preserveConstEnums': true,
            'sourceMap': true,
            'declaration': true,
            'target': 'ES3',
            'jsx': 'React',
            sortOutput: true,
            gulpConcat: true,
            gulpSourcemaps: true,
            noExternalResolve: true,
            typescript: require('typescript')
        }));


    return merge([
        tsResult.dts.pipe(concat('main.d.ts')).pipe(gulp.dest(releaseDir('scripts'))),
        tsResult.js.pipe(concat('main.js')).pipe(gulp.dest(releaseDir('scripts')))
    ]);
});


gulp.task('styles', ['bower'], function () {
    gulp.src(appDir('styles/**/*.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(releaseDir('styles')));
});

// HTML
gulp.task('fonts', function() {
    return gulp.src([bowerDir('font-awesome/fonts/*')])
        .pipe(gulp.dest(releaseDir('fonts')))
});


gulp.task('test', ['scripts'], function () {
    return gulp.src(releaseDir('scripts/test/**/*.js'))
        .pipe(jasmine());
});


// Static server
gulp.task('browser-sync', ['scripts'], function() {
    browserSync.init({
        server: {
            baseDir: releaseDir('')
        }
    });

    gulp.watch(appDir('**/*.ts*'), ['scripts']);
    gulp.watch(appDir('**/*.scss'), ['styles']);
    gulp.watch(appDir('**/*.html'), ['html']);
    gulp.watch(appDir('**/*.html')).on('change', browserSync.reload);
});


gulp.task('clean', function() {
    return merge([
        gulp.src('.tmp', {read: false}).pipe(clean()),
        gulp.src('release', {read: false}).pipe(clean())]);
});

gulp.task('default', ['html', 'scripts-libs', 'scripts', 'styles', 'fonts']);

gulp.task('server', ['default', 'browser-sync']);