define(function (require) {
    'use strict';


    // Load any app-specific modules
    // with a relative require call,
    // like:

    var print = require('app/print'),
        helper = require('app/helpers'),
        cases = require('app/cases');


    cases.add();


    /*
     *  Start modifying the DOM
     */

    require(['domReady!'], function () {

        print('domReady');

    });



});
