module.exports = function(config) {
    config.set({      
        frameworks: ['mocha', 'chai', 'karma-typescript'],
        browsers: ['ChromeHeadless', 'Firefox' ],
        preprocessors: {
            "../src/**/*.ts": "karma-typescript",
            "../tests/**/*.ts": "karma-typescript"
        },
        files: [
            { 
                pattern: "../src/**/*.ts",
            },
            { 
                pattern: "../tests/**/*.ts",
            },
        ],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless'],
            }
        },
        plugins : [
            'karma-mocha', 
            'karma-chai',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-typescript',
            'karma-mocha-reporter'
        ],
        reporters: ['progress', 'karma-typescript'],
        karmaTypescriptConfig: {            
            compilerOptions: {
                target: "ES2020",
                alwaysStrict: true,
                module: "UMD",
                strict: true,
                sourceMap: true,
                moduleResolution: 'node',
                skipLibCheck: true
            },
            exclude: [
                "**/node_modules",            
            ]
         }
    });
};