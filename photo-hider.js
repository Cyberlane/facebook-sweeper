// ==UserScript==
// @name         Hide Facebook Shared Photos
// @description  Hides any shared photos from your facebook timeline
// @include      *.facebook.com/*
// @exclude      *.facebook.com/ajax/*
// @grant        GM_getValue
// ==/UserScript==

setInterval(function() {
    function closest(el, selector) {
        var matchesFn;
        // find vendor prefix
        ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        });
        // traverse parents
        while (el!==null) {
            parent = el.parentElement;
            if (parent!==null && parent[matchesFn](selector)) {
                return parent;
            }
            el = parent;
        }
        return null;
    }
    
    var badClasses = ['._6ks','._5inf'];
    var trashSelectors = badClasses.join(':not([trash="true"]),') + ':not([trash="true"])';
    
    var badImages = document.querySelectorAll(trashSelectors);
    [].forEach.call(badImages, function(badImage){
        badImage.setAttribute('trash', true);
        badImage.style.display = 'none';
        var show = document.createElement('button');
        show.innerText = 'show image';
        show.addEventListener('click', function(){
            closest(this, '.userContentWrapper').querySelector(badClasses.join(',')).style.display = '';
            this.style.display = 'none';
        });
        var userContent = closest(badImage, '.userContentWrapper').querySelector('.userContent');
        if (userContent == null){
            console.log(badImage);
            console.log('userContent not found');
            return;
        }
        userContent.parentNode.insertBefore(show, userContent.nextSibling);
    });
}, 500);
