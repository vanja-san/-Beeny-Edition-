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
// ==/UserScript==

(function() {
    'use strict';
    
    // Импорт основного JS файла
    const script = document.createElement('script');
    script.src = 'https://raw.githubusercontent.com/vanja-san/-Beeny-Edition-/main/src/js/main.js';
    document.head.appendChild(script);
})();