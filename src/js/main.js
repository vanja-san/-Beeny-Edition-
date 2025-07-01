// Основной файл, который управляет всеми модулями
async function initializeModules() {
    // Загружаем и инициализируем модули в зависимости от настроек
    const config = loadConfig();

    if (config.enableFormatter) {
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
    // if (config.enableAnotherFeature) {
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

// Загрузка конфигурации
function loadConfig() {
    const savedConfig = {};
    for (const key in DEFAULT_CONFIG) {
        savedConfig[key] = GM_getValue(key, DEFAULT_CONFIG[key]);
    }
    return savedConfig;
}

// Инициализация при загрузке страницы
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeModules);
} else {
    initializeModules();
}
