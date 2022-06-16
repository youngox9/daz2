import Vue from 'vue';
import store from '../store/'

export const track = {
  bind(el, binding, vnode) {
    $(el).click(() => {
      if ("gtag" in window) {
          const category = store.state.ui.page;
        // const category = $(el).parents('[track-title]').length > 0 ?$(el).parents('[track-title]').eq(0).attr('track-title'):'';
          const label = binding.value;
          window.trackEvent(category,label)
      }
  })
  }
}
Vue.directive('track', track)