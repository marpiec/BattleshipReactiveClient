module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['spec'],
        browsers: ['Chrome'],
        files: [
            'node_modules/immutable/dist/immutable.js',
            'testTmp/**/*.js'
        ]
    });
};