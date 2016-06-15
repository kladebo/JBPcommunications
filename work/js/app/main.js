define(function (require) {
    'use strict';


    // Load any app-specific modules
    // with a relative require call,
    // like:

    var print = require('app/print'),
        helper = require('app/helpers'),
        cases = require('app/cases'),
        card = require('app/card'),
        endless = require('app/endless');



    //   setTimeout(function(){
//    cases.addLogos();
    //    },20);
//    cases.addCases();

    card.add({
        text: 'KKlaas de Boer',
        img: 'img/hiscox__01.png'
    }).then(function (template) {
        require(['domReady!'], function () {
            document.getElementById('cards').appendChild(template);
        });
    });


    /*
     *  Start modifying the DOM
     */

    require(['domReady!'], function () {

        print('domReady', cases);
        
        endless.checkScroll();

    });



});
