// Основной файл, который управляет всеми модулями
async function initializeModules() {
    // Получаем настройки через GM_getValue напрямую
    const enableFormatter = typeof GM_getValue === 'function' ? 
        GM_getValue('enableFormatter', true) : true;

    if (enableFormatter) {
        try {
            await loadScript('https://vanja-san.github.io/-Beeny-Edition-/src/js/formatter.js');
            // После загрузки formatter.js, функция waitForEditor будет доступна глобально
            if (typeof waitForEditor === 'function') {
                waitForEditor();
            }
        } catch (error) {
            console.error('[Beeny Edition] Error loading formatter:', error);
        }
    }

    // Здесь можно добавить загрузку других модулей
    // например:
    // if (GM_getValue('enableAnotherFeature', true)) {
    //     await loadScript('https://vanja-san.github.io/-Beeny-Edition-/src/js/another-feature.js');
    // }
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

// Инициализация при загрузке страницы
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeModules);
} else {
    initializeModules();
}