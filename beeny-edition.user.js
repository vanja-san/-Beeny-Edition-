// ==UserScript==
// @name         Beeny Edition for Shikimori
// @namespace    https://github.com/vanja-san
// @version      1.0.7
// @description  Theme enhancements for Shikimori with settings panel
// @author       vanja-san
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shikimori.one
// @match        https://shikimori.one/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @run-at       document-start
// @downloadURL  https://vanja-san.github.io/-Beeny-Edition-/beeny-edition.user.js
// @updateURL    https://vanja-san.github.io/-Beeny-Edition-/beeny-edition.user.js
// @require      https://cdn.jsdelivr.net/npm/prettier@3.6.2/standalone.min.js
// @require      https://cdn.jsdelivr.net/npm/prettier@3.6.2/plugins/postcss.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Конфигурация по умолчанию
    const DEFAULT_CONFIG = {
        enableFormatter: true,
        // Здесь можно добавить другие настройки для новых модулей
    };

    // Создание окна настроек
    function createSettingsDialog() {
        const config = loadConfig();
        
        const dialog = document.createElement('dialog');
        dialog.className = 'beeny-settings-dialog';
        
        dialog.innerHTML = `
            <div class="beeny-settings-header">
                <h3>Beeny Edition Settings</h3>
                <button class="beeny-settings-close">×</button>
            </div>
            <div class="beeny-settings-content">
                <label class="beeny-settings-option">
                    <input type="checkbox" id="enableFormatter" ${config.enableFormatter ? 'checked' : ''}>
                    Enable CSS Formatter
                </label>
                <!-- Здесь можно добавить другие настройки для новых модулей -->
            </div>
        `;

        // Добавляем стили
        GM_addStyle(`
            .beeny-settings-dialog {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                border: 1px solid #ccc;
                min-width: 300px;
            }

            .beeny-settings-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
            }

            .beeny-settings-header h3 {
                margin: 0;
                color: #456;
            }

            .beeny-settings-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #666;
                padding: 5px;
            }

            .beeny-settings-close:hover {
                color: #456;
            }

            .beeny-settings-content {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .beeny-settings-option {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                padding: 5px;
                border-radius: 4px;
            }

            .beeny-settings-option:hover {
                background-color: #f5f5f5;
            }

            .beeny-settings-option input[type="checkbox"] {
                width: 16px;
                height: 16px;
                cursor: pointer;
            }
        `);

        // Обработчики событий
        dialog.querySelector('.beeny-settings-close').addEventListener('click', () => {
            dialog.close();
        });

        dialog.querySelector('#enableFormatter').addEventListener('change', (e) => {
            const config = loadConfig();
            config.enableFormatter = e.target.checked;
            saveConfig(config);
            
            // Перезагружаем страницу для применения настроек
            window.location.reload();
        });

        document.body.appendChild(dialog);
        dialog.showModal();
    }

    // Регистрируем команду в меню Tampermonkey
    GM_registerMenuCommand('Settings', createSettingsDialog);

    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;

            script.onload = resolve;
            script.onerror = () => reject(new Error(`[Beeny Edition] Ошибка загрузки скрипта ${url}`));

            document.head.appendChild(script);
        });
    }

    // Загружаем основной скрипт
    loadScript('https://vanja-san.github.io/-Beeny-Edition-/src/js/main.js')
        .catch(error => console.error(error));
})();