define(['underscore'], function (_) {
    'use strict';

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    var Example = {
        init: function () {
            _.each({
                three: 3
            }, alert);
        },
        create: function (data) {
            console.log(data);

            _.each(data.cases, function (mycase) {
                require(['text!tpl/' + mycase.src + '!strip'], function (html) {
                    require(['domReady!'], function () {
                        var frag = document.createDocumentFragment(),
                            wrapper = document.createElement('div'),
                            tpl = _.template(html, {
                                variable: 'data'
                            })({
                                name: mycase.label,
                                iets: mycase.src,
                                nogiets: function () {
                                    var k = [];
                                    _.each(mycase.keywords, function (item) {
                                        //console.log(item.keyword);
                                        k.push(item.keyword);
                                    });
                                    return k;
                                }().join(' - '),
                                weeriets: function () {
                                    var k = [];
                                    _.each(mycase.keywords, function (item) {
                                        k.push(item.type.join(', '));
                                    });
                                    return k;
                                }().join(', ')




                            });

                        frag.appendChild(wrapper);

                        wrapper.innerHTML = tpl;
                        // wrapper.innerHTML = tpl({name:mycase.label});
                        document.body.appendChild(frag);
                    });
                });
            });




        }
    };

    return Example;
});
