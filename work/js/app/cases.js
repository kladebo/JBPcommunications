define(['underscore', 'app/helpers'], function (_, helper) {
    'use strict';


    var cases_data,
        format,
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

        return wrapper.children[0];
    };

    enhanceImg = function (img, data) {
        var wrapper = document.createElement('figure'),
            innerwrapper = document.createElement('div'),
            textbox = document.createElement('div');

        wrapper.className = 'figure';
        if (img.className.indexOf('figure--wide') >= 0) {
            wrapper.className += ' figure--wide';
        }
        img.parentElement.insertBefore(wrapper, img);
        //wrapper.innerHTML = 'klaas';

        innerwrapper.className = 'figure__viewport';
        innerwrapper.appendChild(img);

        textbox.className = 'figure__text';
        innerwrapper.appendChild(textbox);
        textbox.innerHTML = img.title || data.description;

        img.className = 'figure__img';

        wrapper.appendChild(innerwrapper);
    };


    cases_data = function () {
        if (!Case.data) {
            return helper.getJSON('js/data/cases.min.json').then(function (data) {
                Case.data = data;
                return data;
            });
        } else {
            return Promise.resolve(Case.data);
        }
    };

    var Case = {

        /*
         *  http://www.html5rocks.com/en/tutorials/es6/promises/
         */

        addLogos: function () {
            cases_data().then(function (data) {
                _.map(data.cases, function (item) {
                    return helper.getImg('img/' + item.logo).then(function (img) {
                        require(['domReady!'], function () {
                            //console.log('img');
                            img.title = item.label;
                            img.className = 'case__logo';
                            document.getElementById('logos').appendChild(img);
                        });
                    });
                });
            });
        },

        addCase: function (id, wrapper) {
            var aCase;
            cases_data().then(function (data) {
                aCase = data.cases[id];
                
                //console.log(aCase);
                var file = 'text!tpl/' + aCase.src + '!strip';
                return helper.getFile(file);
            }).then(function (html) {

                // Write to the screen
                require(['domReady!'], function () {
                    var template = format(html, aCase);

                    _.each(template.getElementsByTagName('img'), function (img) {
                        enhanceImg(img, aCase);
                    });
                    
                    wrapper.appendChild(template);
                });
            });

            return;
        },

        addCases: function () {
            cases_data().then(function (data) {
                //Case.data = Case.data || data;

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
                                enhanceImg(img, item);
                            });

                            document.getElementById('content').appendChild(template);
                        });
                    });
                }, Promise.resolve());


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
