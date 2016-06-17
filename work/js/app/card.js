define(['underscore', 'app/helpers'], function (_, helper) {
    'use strict';


    var Card,
        getTemplate,
        mergeTemplate;

    getTemplate = function () {
        if (!Card.template) {
            return helper.getFile('text!tpl/app/card.html!strip').then(function (html) {
                Card.template = html;
                return html;
            });
        } else {
            return Promise.resolve(Card.template);
        }
    };


    mergeTemplate = function (html, data) {

        /*
                return helper.getImg(data.img).then(function (img) {
                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = _.template(html, {
                        variable: 'data'
                    })({
                        cardtext: data.text,
                        cardimg: data.img
                    });
                    return wrapper.children[0];
                });
        */




        var wrapper = document.createElement('div');
        wrapper.innerHTML = _.template(html, {
            variable: 'data'
        })({
            cardtext: data.text,
            cardimg: data.img
        });
        return wrapper.children[0];

    };


    Card = {

        add: function (data) {
            return getTemplate().then(function (html) {
                return mergeTemplate(html, data);
            });
        }

    };

    return Card;

});
