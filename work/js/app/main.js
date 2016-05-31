

define(function (require) {
    'use strict';


    // Load any app-specific modules
    // with a relative require call,
    // like:

    var print = require('app/print'),
        helper = require('app/helpers'),
        cases = require('app/cases');
    
    
    

    helper.getJSON('js/data/cases.min.json').then(function (response) {
        //console.log("Success!", response);
        return response;
    }, function (error) {
        console.error("Failed!", error);
    }).then(function (response) {
        print(response);
        cases.create(response);

        //document.getElementById('section-img').children[0].appendChild(guiPictures.createPicture(data_pictures));
    });


    /*
     *  Start modifying the DOM
     */

    require(['domReady!'], function () {

        print('domReady');

    });



});
