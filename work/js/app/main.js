define(function (require) {
    'use strict';


    // Load any app-specific modules
    // with a relative require call,
    // like:

    var print = require('app/print'),
        helper = require('app/helpers'),
        cases = require('app/cases');



 //   setTimeout(function(){
        cases.addLogos();
//    },20);
    cases.addCases();

    /*
     *  Start modifying the DOM
     */

    require(['domReady!'], function () {

        print('domReady',cases);

    });



});
