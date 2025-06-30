// ==UserScript==
// @name         Beeny Edition for Shikimori
// @namespace    https://github.com/vanja-san
// @version      1.0.0
// @description  Theme enhancements for Shikimori
// @author       vanja-san
// @match        https://shikimori.one/*
// @match        https://shikimori.me/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://cdn.jsdelivr.net/gh/vanja-san/Beeny-Edition@main/js/userscript.js
// @updateURL    https://cdn.jsdelivr.net/gh/vanja-san/Beeny-Edition@main/js/userscript.js
// ==/UserScript==

(function() {
    'use strict';
    
    // Используем jsDelivr для загрузки основного скрипта
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/vanja-san/-Beeny-Edition-@main/dist/js/main.js';
    document.head.appendChild(script);
})();