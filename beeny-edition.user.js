// ==UserScript==
// @name         Beeny Edition for Shikimori
// @namespace    https://github.com/vanja-san
// @version      1.0.2
// @description  Theme enhancements for Shikimori
// @author       vanja-san
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shikimori.one
// @match        https://shikimori.one/*
// @match        https://shikimori.me/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://vanja-san.github.io/-Beeny-Edition-/beeny-edition.user.js
// @updateURL    https://vanja-san.github.io/-Beeny-Edition-/beeny-edition.user.js
// @require      https://cdn.jsdelivr.net/npm/prettier@3.6.2/standalone.min.js
// @require      https://cdn.jsdelivr.net/npm/prettier@3.6.2/plugins/postcss.min.js
// ==/UserScript==

(function() {
    'use strict';
    
    // Используем jsDelivr для загрузки основного скрипта
    const script = document.createElement('script');
    script.src = 'https://vanja-san.github.io/-Beeny-Edition-/src/js/main.js';
    document.head.appendChild(script);
})();