// ==UserScript==
// @name         Beeny Edition for Shikimori
// @namespace    https://github.com/vanja-san
// @version      1.0.10
// @description  Theme enhancements for Shikimori with settings panel
// @author       vanja-san
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shikimori.one
// @match        https://shikimori.one/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @run-at       document-end
// @downloadURL  https://vanja-san.github.io/-Beeny-Edition-/beeny-edition.user.js
// @updateURL    https://vanja-san.github.io/-Beeny-Edition-/beeny-edition.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Конфигурация по умолчанию
    const DEFAULT_CONFIG = {
        enableFormatter: true,
    };

    // Функции для работы с настройками
    function loadConfig() {
        const savedConfig = {};
        for (const key in DEFAULT_CONFIG) {
            savedConfig[key] = GM_getValue(key, DEFAULT_CONFIG[key]);
        }
        return savedConfig;
    }

    function saveConfig(config) {
        for (const key in config) {
            GM_setValue(key, config[key]);
        }
    }

    // Загрузка Prettier и его зависимостей
    async function loadPrettier() {
        try {
            // Загружаем основной скрипт Prettier
            await loadScript('https://cdn.jsdelivr.net/npm/prettier@3.6.2/standalone.min.js');
            // Загружаем парсер CSS
            await loadScript('https://cdn.jsdelivr.net/npm/prettier@3.6.2/parser-postcss.min.js');
            
            // Проверяем, что Prettier загрузился
            if (typeof window.prettier === 'undefined') {
                throw new Error('Failed to load Prettier');
            }
            
            return true;
        } catch (error) {
            console.error('[Beeny Edition] Error loading Prettier:', error);
            return false;
        }
    }

    // Создание окна настроек
    function createSettingsDialog() {
        // Удаляем старый диалог, если он существует
        const oldDialog = document.querySelector('.beeny-settings-dialog');
        if (oldDialog) {
            oldDialog.remove();
        }

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
            </div>
        `;

        // Обработчики событий
        dialog.querySelector('.beeny-settings-close').addEventListener('click', () => {
            dialog.close();
        });

        dialog.querySelector('#enableFormatter').addEventListener('change', (e) => {
            const newConfig = loadConfig();
            newConfig.enableFormatter = e.target.checked;
            saveConfig(newConfig);
            
            // Перезагружаем страницу для применения настроек
            window.location.reload();
        });

        document.body.appendChild(dialog);
        
        // Показываем диалог
        if (typeof dialog.showModal === 'function') {
            dialog.showModal();
        } else {
            dialog.style.display = 'block';
        }
    }

    // Функция для загрузки скриптов
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

    // Основная инициализация
    async function initialize() {
        // Регистрируем команду в меню Tampermonkey
        GM_registerMenuCommand('Settings', createSettingsDialog);

        // Загружаем Prettier если форматтер включен
        const config = loadConfig();
        if (config.enableFormatter) {
            const prettierLoaded = await loadPrettier();
            if (prettierLoaded) {
                // Загружаем основной скрипт только после успешной загрузки Prettier
                await loadScript('https://vanja-san.github.io/-Beeny-Edition-/src/js/main.js')
                    .catch(error => console.error(error));
            }
        }
    }

    // Запускаем инициализацию
    initialize();
})();