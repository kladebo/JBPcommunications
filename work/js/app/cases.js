define(['underscore', 'app/helpers'], function (_, helper) {
    'use strict';


    var format,
        enhanceImg;

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };


    /*
     *  merges the html-template with the data
     */

    format = function (html, mycase) {
        var wrapper = document.createElement('div');

        wrapper.innerHTML = _.template(html, {
            variable: 'data'
        })({
            id: mycase.id,
            name: mycase.label,
            iets: mycase.src,
            nogiets: function () {
                var k = [];
                _.each(mycase.keywords, function (item) {
                    if (_.has(item, 'keyword')) {
                        k.push(item.keyword);
                    }
                });
                return k;
            }().join(' - '),
            weeriets: function () {
                var k = [];
                _.each(mycase.keywords, function (item) {
                    if (_.has(item, 'type')) {
                        //console.log(item);
                        k.push(item.type.join(', '));
                    }
                });
                return k;
            }().join(', ')
        });

        return wrapper;
    };

    enhanceImg = function (img) {
        var wrapper = document.createElement('div');
        wrapper.className = 'img__case';
        wrapper.appendChild(img);

        return wrapper;
    };

    var Case = {

        /*
         *  http://www.html5rocks.com/en/tutorials/es6/promises/
         */

        add: function () {
            helper.getJSON('js/data/cases.min.json').then(function (data) {


                /*
                // Start off with a promise that always resolves
                var sequence = Promise.resolve();

                // Loop through our chapter urls
                _.each(data.cases, function (item) {
                    // Add these actions to the end of the sequence
                    sequence = sequence.then(function () {
                        var template = 'text!tpl/' + item.src + '!strip';
                        return helper.getFile(template);

                    }).then(function (html) {
                        document.getElementById('content').innerHTML += format(html, item);
                    });
                });
                */


                // OR


                // Loop through our chapter urls
                _.reduce(data.cases, function (sequence, item) {
                    // Add these actions to the end of the sequence
                    return sequence.then(function () {
                        var file = 'text!tpl/' + item.src + '!strip';
                        return helper.getFile(file);
                    }).then(function (html) {
                        
                        // Write to the screen
                        require(['domReady!'], function () {
                            var template = format(html, item);

                            _.each(template.getElementsByTagName('img'), function (img) {
                                img.style.border = '3px solid red';
                            });

                            document.getElementById('content').appendChild(template);
                        });
                    });
                }, Promise.resolve());


                _.map(data.cases, function (item) {
                    return helper.getImg('img/' + item.logo).then(function (img) {
                        require(['domReady!'], function () {
                            console.log('img');
                            img.title = item.label;
                            img.className = 'case__logo';
                            document.getElementById('header').appendChild(img);
                        });
                    });
                });




                /*
                // OR EVEN
                // kdb ToDo: doesn't work for now looses 'item' to fill the template

                // Map our array of chapter urls to
                // an array of chapter json promises.
                // This makes sure they all download parallel.
                                
                var pages = _.map(data.cases, function (item){
                    return 'text!tpl/' + item.src + '!strip';
                });
                console.log('pages', pages);
                                
                return pages.map(helper.getFile)
                    .reduce(function (sequence, chapterPromise) {
                        // Use reduce to chain the promises together,
                        // adding content to the page for each chapter
                        return sequence.then(function () {
                            // Wait for everything in the sequence so far,
                            // then wait for this chapter to arrive.
                            return chapterPromise;
                        }).then(function (html) {
                            format(html, item);
                            //addHtmlToPage(chapter.html);
                        });
                    }, Promise.resolve());
                */


            }).then(function () {
                // And we're all done!
                console.log("Cases done");
            }).catch(function (err) {
                // Catch any error that happened along the way
                console.log("Argh, broken: " + err.message);
            }).then(function () {
                console.log('All done');
            });
        }
    };

    return Case;
});
