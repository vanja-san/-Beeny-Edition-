// ==UserScript==
// @name         Beeny Edition for Shikimori
// @namespace    https://github.com/vanja-san
// @version      1.0.1
// @description  Theme enhancements for Shikimori
// @author       vanja-san
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shikimori.one
// @match        https://shikimori.one/*
// @match        https://shikimori.me/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://cdn.jsdelivr.net/gh/vanja-san/-Beeny-Edition-@main/beeny-edition.user.js
// @updateURL    https://cdn.jsdelivr.net/gh/vanja-san/-Beeny-Edition-@main/beeny-edition.user.js
// @require      https://cdn.jsdelivr.net/npm/prettier@3.6.2/standalone.min.js
// @require      https://cdn.jsdelivr.net/npm/prettier@3.6.2/plugins/postcss.min.js
// ==/UserScript==

(function() {
    'use strict';
    
    // Используем jsDelivr для загрузки основного скрипта
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/vanja-san/-Beeny-Edition-@main/dist/js/main.js';
    document.head.appendChild(script);
})();