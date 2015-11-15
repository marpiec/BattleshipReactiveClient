module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['spec'],
        browsers: ['PhantomJS'],
        files: [
            'node_modules/immutable/dist/immutable.js',
            'testTmp/**/*.js'
        ]
    });
};