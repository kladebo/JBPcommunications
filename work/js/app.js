(function () {
    'use strict';
    // For any third party dependencies, like jQuery, place them in the lib folder.

    // Configure loading modules from the lib directory,
    // except for 'app' ones, which are in a sibling
    // directory.

    requirejs.config({
        baseUrl: 'js/lib',

        paths: {
            tpl: ['../../../work/html'],
            app: [
                '../app',
                '../../../work/js/app'],
            main: [
                '../app/main.min',
                '../../../work/js/app/main'],
            domReady: [
                //'//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min',
                'domReady.min'],
            text: [
                //'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.3/underscore-min',
                'text'],
            promise: [
                //'//cdnjs.cloudflare.com/ajax/libs/es6-promise/3.2.1/es6-promise.min',
                'es6-promise.min'],
            underscore: [
                //'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.3/underscore-min',
                'underscore-min']
        },


        // Remember: only use shim config for non-AMD scripts,
        // scripts that do not already call define(). The shim
        // config will not work correctly if used on AMD scripts,
        // in particular, the exports and init config will not
        // be triggered, and the deps config will be confusing
        // for those cases.
        shim: {
            underscore: {
                exports: '_'
            }
        }
    });

    // Start loading the main app file. Put all of
    // your application logic in there.
    requirejs(['main']);
}());
