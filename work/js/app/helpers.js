/* globals Promise */

define(function (require) {
    'use strict';

    var get, getFile, getImg;


    /*
     *  load promise polyfill
     */

    require('promise').polyfill();



    get = function (url) {
        // Return a new promise.
        return new Promise(function (resolve, reject) {
            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = function () {
                // This is called even on 404 etc
                // so check the status
                if (req.status === 200) {
                    // Resolve the promise with the response text
                    resolve(req.response);
                } else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(new Error(req.statusText));
                }
            };

            // Handle network errors
            req.onerror = function () {
                reject(new Error('Network Error'));
            };

            // Make the request
            req.send();
        });
    };

    getFile = function (url) {
        return new Promise(function (resolve) {
            require([url], function (html) {
                resolve(html);
            });
        });
    };

    getImg = function (url) {
        return new Promise(function (resolve, reject) {
            var img = document.createElement('img');
            img.src = url;
            img.onload = function (){
                resolve(img);
            };
            img.onerror = function(){
                reject(new Error('img loading failed'));
            };
        });
    };

    
    /*
     *  Helper functions
     */

    return {

        getJSON: function (url) {
            return get(url).then(JSON.parse).catch(function (err) {
                console.error("getJSON failed for", url, err);
                throw err;
            });
        },

        getFile: function (url) {
            return getFile(url).then(function (data) {
                return data;
            }).catch(function (err) {
                console.error("getFile failed for", url, err);
                throw err;
            });
        },

        getImg: function (url){
            return getImg(url).then(function (img) {
                return img;
            }).catch(function (err) {
                console.error("getImg failed for", url, err);
                throw err;
            });
        }

    };

});
