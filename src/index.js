import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import App from './App';
import store from './store/';

import "../scss/style.scss";

import Ripple from "vue-ripple-directive";
import track from "./directives/track";

Vue.directive("ripple", Ripple);
Vue.directive("track", track);
Vue.use(VueRouter);

window.fetch = require("isomorphic-fetch");


window.trackEvent = (category, label) => {
    if ("gtag" in window && category && label) {
        console.log(`%cGA:[${category}][${label}]`, 'background: #c54e6e; color: white; font-size:18px');
        gtag('event', 'click', {
            'event_category': category,
            'event_label': label,
        });
    }
}

window.trackPage = page => {
    if ("gtag" in window && page) {
        console.log(`%cPAGE:[${page}]`, 'background: #6bb8c8; color: white; font-size:32px');
        gtag('config', 'UA-15669330-29', {
            'page_title': page,
            'page_path': page
        });
    }
}


const vue = new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {
        App,
    }
});

Vue.directive('ani', {
    bind(el, binding, vnode) {
        const $el = $(el);
        $el.css('opacity', 0);
        const start = () => {
            $el.css('opacity', 1);
            $el.addClass('animating');
            const delay = $el.css('animation-delay').indexOf('ms') > -1 ? parseFloat($el.css('animation-delay')) : parseFloat($el.css('animation-delay')) * 1000;
            const dur = $el.css('animation-duration').indexOf('ms') > -1 ? parseFloat($el.css('animation-duration')) : parseFloat($el.css('animation-duration')) * 1000;

            setTimeout(() => {
                $el.addClass('animated');
            }, dur + delay)
        }
        vue.$on("view-change", start)
        start();
    }
});