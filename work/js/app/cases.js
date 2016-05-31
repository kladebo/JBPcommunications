
define(['underscore'], function (_) {
    'use strict';


    var Example = {
        init: function () {
            _.each({
                one: 1,
                two: 2,
                three: 3
            }, alert);

            //console.log(k);
        },
        klaas: function () {
            console.log(_.uniq([1, 2, 1, 4, 1, 3]));
        },
        jan: function () {
            require(['text!tpl/bla.html!strip'], function (html) {
                require(['domReady!'], function () {
                    var frag = document.createDocumentFragment(),
                        wrapper = document.createElement('div');
                    
                    frag.appendChild(wrapper);
                    wrapper.innerHTML = html;
                    document.body.appendChild(frag);
                });
            });



        }
    };

    return Example;
});
