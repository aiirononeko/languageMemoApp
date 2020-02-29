export default function ({ store, redirect }) {
    store.dispatch('flush_message/showFlashMessage', {text: null});
  }