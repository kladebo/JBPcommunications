/*global define: false, Promise: false */

define(function (require) {
    'use strict';
    
    
    // Load any app-specific modules
    // with a relative require call,
    // like:
    
    var print = require('app/print'),
        helper = require('app/helpers');






    /*
     *  Start modifying the DOM
     */

    require(['domReady!'], function () {

        print('domReady');



    });



});
