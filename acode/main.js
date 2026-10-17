import Url from 'utils/Url';

class E_Language_Plugin {
    constructor() {
        this.id = "com.engineer.lang.e";
    }

    async init() {
        // 1. Проверяем, доступен ли Ace Editor в текущей версии Acode
        if (!window.ace) return;

        // 2. Регистрируем расширение файла .e в менеджере языков Acode
        const modelist = ace.require("ace/ext/modelist");
        if (modelist) {
            // Добавляем режим "e_lang" для всех файлов с расширением .e
            modelist.defineMode({
                name: "e_lang",
                caption: "E Language",
                extensions: "e"
            });
        }

        // 3. Создаем правила подсветки для нашего синтаксиса строк и отступов
        define("ace/mode/e_lang_highlight_rules", function(require, exports, module) {
            const oop = require("ace/lib/oop");
            const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

            const E_HighlightRules = function() {
                this.$rules = {
                    "start": [
                        // Подсветка комментариев
                        {
                            regex: /#.*$/,
                            token: "comment"
                        },
                        // Ключевые слова создания переменных и логики
                        {
                            regex: /\b(var|if|set|run|log|every)\b/,
                            token: "keyword"
                        },
                        // Фирменный режим администратора
                        {
                            regex: /\b(admin_critical|admin_override)\b/,
                            token: "keyword.operator.critical" // Окрасит в важный цвет (часто красный)
                        },
                        // Системные состояния пинов
                        {
                            regex: /\b(HIGH|LOW|INPUT|OUTPUT)\b/,
                            token: "constant.language"
                        },
                        // Определение работы с железом: pin(A5) или pin(2)
                        {
                            regex: /\bpin\(\w+\)/,
                            token: "support.function.hardware"
                        },
                        // Распознавание единиц времени: 200ms, 500ms
                        {
                            regex: /\b\d+(ms|s)\b/,
                            token: "constant.numeric"
                        },
                        // Строковые логи (сообщения)
                        {
                            token: "string", 
                            regex: '".*?"'
                        }
                    ]
                };
                this.normalizeRules();
            };

            oop.inherits(E_HighlightRules, TextHighlightRules);
            exports.E_HighlightRules = E_HighlightRules;
        });

        // 4. Оборачиваем правила в полноценный языковой режим Ace
        define("ace/mode/e_lang", function(require, exports, module) {
            const oop = require("ace/lib/oop");
            const TextMode = require("ace/mode/text").Mode;
            const E_HighlightRules = require("ace/mode/e_lang_highlight_rules").E_HighlightRules;

            const Mode = function() {
                this.HighlightRules = E_HighlightRules;
            };
            oop.inherits(Mode, TextMode);

            (function() {
                this.$id = "ace/mode/e_lang";
            }).call(Mode.prototype);

            exports.Mode = Mode;
        });
    }

    async destroy() {
        // При удалении плагина возвращаем стандартные настройки, если необходимо
    }
}

// Регистрируем плагин в системе Acode
if (window.acode) {
    const plugin = new E_Language_Plugin();
    acode.setPluginInit(plugin.id, (baseUrl, $page, options) => plugin.init(baseUrl, $page, options));
    acode.setPluginUnmount(plugin.id, () => plugin.destroy());
}
