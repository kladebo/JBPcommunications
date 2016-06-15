define(['underscore', 'app/helpers', 'app/cases'], function (_, helper, cases) {
    'use strict';
    
    
    /*
     *  http://railscasts.com/episodes/114-endless-page
     */

    var currentPage = 0;
    var bottomMargin = 260;

    function checkScroll() {
        function nearBottomOfPage() {
            return scrollDistanceFromBottom() < bottomMargin;
        }

        function scrollDistanceFromBottom() {
            return pageHeight() - (window.pageYOffset + self.innerHeight);
        }

        function pageHeight() {
            return Math.max(document.body.scrollHeight, document.body.offsetHeight);
        }
        
        
        /*
         *  scroll ends on page 5
         */
        
        
        if (currentPage >= 5) {
            return document.removeEventListener('scroll', checkScroll);
        }
        
        if (nearBottomOfPage()) {
            currentPage++;
            //            new Ajax.Request('/products.js?page=' + currentPage, {
            //                asynchronous: true,
            //                evalScripts: true,
            //                method: 'get'
            //            });


            var endlessWrapper = document.createElement('div');


            endlessWrapper.className = 'endless__wrapper';
            cases.addCase(currentPage - 1, endlessWrapper);

            document.getElementById('content').appendChild(endlessWrapper);
            console.log('currentPage:',currentPage);
            setTimeout(function () {
                endlessWrapper.className += ' endless__wrapper--visible';
            }, 1);
        } else {
            setTimeout(checkScroll, 250);
        }
    }



    require(['domReady!'], function () {
        document.addEventListener('scroll', checkScroll);
    });
});
