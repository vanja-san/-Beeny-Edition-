// Модуль форматирования CSS
function waitForEditor() {
    // Проверяем настройки перед инициализацией
    if (typeof GM_getValue === 'function' && !GM_getValue('enableFormatter', true)) {
        return;
    }

    const buttons = document.querySelector(".buttons");
    if (buttons && document.querySelector(".CodeMirror")) {
        initFormatter();
    } else {
        setTimeout(waitForEditor, 500);
    }
}

function initFormatter() {
    // Создаем кнопку форматирования
    const formatButton = document.createElement("button");
    formatButton.className = "format-button";
    formatButton.setAttribute("type", "button");
    formatButton.innerHTML = `<span class="material-symbols-rounded">format_indent_decrease</span>`;

    // Находим место для вставки
    const buttonsContainer = document.querySelector(".buttons");
    if (buttonsContainer) {
        const saveButton = buttonsContainer.querySelector('input[type="submit"]');
        if (saveButton) {
            saveButton.parentNode.insertBefore(formatButton, saveButton);
        } else {
            buttonsContainer.insertBefore(formatButton, buttonsContainer.firstChild);
        }
    }

    // Добавляем стили
    const style = document.createElement("style");
    style.textContent = `
        /* Подключаем шрифт Material Symbols */
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0');

        .format-button {
            font-size: 13px;
            line-height: 23px;
            height: 23px;
            width: 23px;
            padding: 0;
            background-color: #456;
            border: 0;
            clear: right;
            color: #fff;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease, color 0.3s ease;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            margin-right: 10px;
        }
        .format-button:hover {
            background-color: #567;
        }
        .format-button:disabled {
            opacity: 0.7;
            cursor: wait;
        }
        .format-button .material-symbols-rounded {
            font-size: 20px;
            width: 20px;
            height: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-variation-settings: 'FILL' 1;
            transition: all 0.3s ease;
        }
        .format-button.success .material-symbols-rounded {
            color: #4CAF50;
            font-variation-settings: 'FILL' 1;
            transform: scale(1.2);
        }
        .format-button.error .material-symbols-rounded {
            color: #f44336;
            font-variation-settings: 'FILL' 1;
            transform: scale(1.2);
        }
        .buttons {
            display: flex;
            align-items: center;
        }
    `;
    document.head.appendChild(style);

    // Обработчик клика по кнопке форматирования
    formatButton.addEventListener("click", async function () {
        const cm = document.querySelector(".CodeMirror").CodeMirror;
        const code = cm.getValue();

        try {
            formatButton.disabled = true;
            formatButton.innerHTML = `<span class="material-symbols-rounded">sync</span>`;

            // Проверяем наличие Prettier
            if (typeof window.prettier === 'undefined') {
                throw new Error("Prettier is not loaded");
            }

            // Базовая конфигурация для Prettier 3.x
            const config = {
                parser: "postcss",
                printWidth: 80,
                tabWidth: 2,
                useTabs: false,
                semi: true,
                singleQuote: true,
            };

            // В Prettier 3.x format возвращает Promise
            const formatted = await window.prettier.format(code, config);

            // Проверяем, что formatted это строка
            if (typeof formatted === "string") {
                cm.setValue(formatted);
            } else {
                throw new Error("Formatter returned invalid result");
            }

            // Показываем успешное состояние
            formatButton.classList.add("success");
            formatButton.innerHTML = `<span class="material-symbols-rounded">check</span>`;

            // Возвращаем исходную иконку через 3 секунды
            setTimeout(() => {
                formatButton.classList.remove("success");
                formatButton.innerHTML = `<span class="material-symbols-rounded">format_indent_decrease</span>`;
            }, 3000);
        } catch (error) {
            console.error("Formatting error:", error);

            // Показываем состояние ошибки
            formatButton.classList.add("error");
            formatButton.innerHTML = `<span class="material-symbols-rounded">close</span>`;

            // Возвращаем исходную иконку через 3 секунды
            setTimeout(() => {
                formatButton.classList.remove("error");
                formatButton.innerHTML = `<span class="material-symbols-rounded">format_indent_decrease</span>`;
            }, 3000);
        } finally {
            formatButton.disabled = false;
        }
    });
}

// Экспортируем функцию waitForEditor глобально
window.waitForEditor = waitForEditor;