const h = window.NbComponent.h;

/**
 * 上滑交互框
 */
class Actionsheet {
    constructor() {
        /**
         * 暂存滚动条位置用于恢复
         * @type {Number}
         */
        this.scrollTop = 0;
        /**
         * 展示开关
         */
        this.visible = false;
        /**
         * 展示标题内容 （不用title避免跟原生属性冲突）
         */
        this.headTitle = '标题';
        /**
         * 是否需要遮罩
         */
        this.mask = true;
        /**
         * 关闭显示
         */
        this.onClose = () => {
            this.close();
        };
    }
    /**
     * 获取当前滚动位置
     * @return {Number}
     */
    getScrollTop() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }
    /**
     * 观察显示状态来控制滚动条（显示时滑动屏幕不能让背景内容一起滚动）
     * @param  {String} visible 最新的显示状态值
     * @return {Void}
     */
    scrollHandler(visible) {
        if (visible) {
            this.scrollTop = this.getScrollTop();
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = -this.scrollTop + 'px';
        }
        else {
            document.body.style.position = 'inherit';
            document.body.style.width = 'inherit';
            document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop || 0;
        }
    }
    get visibleClassName() {
        return this.visible ? 'actionsheet visible' : 'actionsheet';
    }
    /**
     * 关闭显示
     */
    close() {
        this.visible = false;
    }
    /**
     * 显示
     */
    show() {
        this.visible = true;
    }
    render() {
        return [
            h("div", { class: this.visibleClassName },
                h("div", { class: "container" },
                    this.headTitle && (h("div", { class: "header" },
                        h("div", { class: "title" }, this.headTitle),
                        h("svg", { onClick: this.onClose, class: "icon-close", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                            h("path", { fill: "#333", d: "M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z" })))),
                    h("slot", { name: "container" }))),
            this.mask && h("div", { class: `mask ${this.visible ? 'visible' : ''}`, onClick: this.onClose })
        ];
    }
    static get is() { return "nb-actionsheet"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "close": {
            "method": true
        },
        "headTitle": {
            "type": String,
            "attr": "head-title"
        },
        "mask": {
            "type": Boolean,
            "attr": "mask"
        },
        "show": {
            "method": true
        },
        "visible": {
            "state": true,
            "watchCallbacks": ["scrollHandler"]
        }
    }; }
    static get style() { return ".actionsheet {\n  position: fixed;\n  z-index: 1;\n  bottom: 0;\n  background: #fff;\n  width: 10rem;\n  -webkit-transition: -webkit-transform 0.1s linear;\n  transition: -webkit-transform 0.1s linear;\n  transition: transform 0.1s linear;\n  transition: transform 0.1s linear, -webkit-transform 0.1s linear;\n  -webkit-transform: translateY(100%);\n          transform: translateY(100%);\n}\n.actionsheet.visible {\n  z-index: 999;\n  -webkit-transform: translateY(0);\n          transform: translateY(0);\n}\n.actionsheet .container .header {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  height: 1.173333333333333rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  border-bottom: 1px solid #ebebeb;\n}\n.actionsheet .container .header .close {\n  position: absolute;\n  left: 0.4rem;\n  top: 0.4rem;\n  width: 0.373333333333333rem;\n  height: 0.373333333333333rem;\n}\n.actionsheet .container .header .title {\n  font-size: 0.426666666666667rem;\n  color: #202020;\n}\n.actionsheet .container .header .icon-close {\n  width: 0.426666666666667rem;\n  height: 0.426666666666667rem;\n  position: absolute;\n  right: 0.4rem;\n  display: inline-block;\n  stroke-width: 0;\n  stroke: currentColor;\n  vertical-align: middle;\n}\n.mask {\n  position: fixed;\n  top: 0;\n  width: 10rem;\n  height: 100vh;\n  background: rgba(0,0,0,0.6);\n  z-index: -1;\n  opacity: 0;\n  -webkit-transition: opacity 0.1s linear;\n  transition: opacity 0.1s linear;\n}\n.mask.visible {\n  z-index: 1;\n  opacity: 1;\n}"; }
}

/**
 * 固钉组件
 * @description 根据滑动来切换固定跟原始状态的组件
 */
class Affix {
    constructor() {
        /**
         * 计算举例的参照dom
         */
        this.targetDom = () => document.body;
    }
    /**
     * 观察固定状态变化
     * @param isFixed
     */
    onCurrentPageChange(isFixed) {
        this.change.emit({
            isFixed
        });
    }
    /**
     * 根据设置来切换固定状态
     */
    handleFix() {
        if (this.offset >= 0) {
            const rectTop = this.el.getBoundingClientRect().top;
            this.fixed = rectTop <= this.offset;
        }
    }
    componentDidLoad() {
        try {
            this.handleFix();
            setTimeout(() => {
                this.targetDom().addEventListener('scroll', this.handleFix.bind(this), false);
            }, 10);
        }
        catch (e) {
            throw new TypeError(e);
        }
    }
    componentDidUnload() {
        this.targetDom().removeEventListener('scroll', this.handleFix.bind(this), false);
    }
    render() {
        return (h("div", { style: {
                position: this.fixed ? `fixed` : 'relative',
                top: this.fixed ? `${this.offset}px` : 'auto'
            } },
            h("slot", null)));
    }
    static get is() { return "nb-affix"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "fixed": {
            "state": true,
            "watchCallbacks": ["onCurrentPageChange"]
        },
        "offset": {
            "type": Number,
            "attr": "offset"
        },
        "targetDom": {
            "type": "Any",
            "attr": "target-dom"
        }
    }; }
    static get events() { return [{
            "name": "change",
            "method": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}

/**
 * 徽标数
 */
class Badge {
    constructor() {
        /**
         * count的封顶数值超出则显示 maxCount+
         */
        this.maxCount = 99;
        /**
         * 不展示数字，显示点
         */
        this.dot = false;
        /**
         * 当count为0的时候也显示
         */
        this.showZero = false;
        /**
         * 徽标底色
         */
        this.bgColor = '#FB5B4C';
    }
    /**
     * 徽标 classList
     */
    get dotCountClassNames() {
        let classNames = [];
        // 无论count多少都显示
        if (this.showZero)
            classNames.push('visible');
        // 显示为 dot
        if (this.dot)
            classNames.push('dot');
        // 显示为数字
        if (!this.dot)
            classNames.push('count');
        // 数字为0不显示
        if (!this.showZero && this.count === 0)
            classNames.push('hidden');
        return classNames.join(' ');
    }
    /**
     * 实际展示的数字
     */
    get displayCount() {
        if (this.dot)
            return '';
        if (this.showZero || this.count <= this.maxCount)
            return this.count;
        if (this.count > this.maxCount)
            return `${this.maxCount}+`;
    }
    render() {
        return (h("div", { class: "badge" },
            h("i", { class: this.dotCountClassNames, style: {
                    backgroundColor: this.bgColor
                } }, this.displayCount),
            h("slot", null)));
    }
    static get is() { return "nb-badge"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "bgColor": {
            "type": String,
            "attr": "bg-color"
        },
        "count": {
            "type": Number,
            "attr": "count"
        },
        "dot": {
            "type": Boolean,
            "attr": "dot"
        },
        "maxCount": {
            "type": Number,
            "attr": "max-count"
        },
        "showZero": {
            "type": Boolean,
            "attr": "show-zero"
        }
    }; }
    static get style() { return ".badge {\n  position: relative;\n  display: inline-block;\n}\n.badge .count,\n.badge .dot {\n  position: absolute;\n  border: 1px solid #fff;\n  font-style: normal;\n  text-align: center;\n}\n.badge .count.hidden,\n.badge .dot.hidden {\n  display: none;\n}\n.badge .count {\n  font-size: 0.266666666666667rem;\n  color: #fff;\n  height: 0.346666666666667rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0 0.093333333333333rem;\n  border-radius: 0.346666666666667rem;\n  top: -0.173333333333333rem;\n  right: -0.173333333333333rem;\n}\n.badge .dot {\n  width: 0.16rem;\n  height: 0.16rem;\n  border-radius: 50%;\n  top: -0.08rem;\n  right: -0.08rem;\n}"; }
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n.default || n;
}

var prism = createCommonjsModule(function (module) {
/* **********************************************
     Begin prism-core.js
********************************************** */

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-([\w-]+)\b/i;
var uniqueId = 0;

var _ = _self.Prism = {
	manual: _self.Prism && _self.Prism.manual,
	disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o, visited) {
			var type = _.util.type(o);
			visited = visited || {};

			switch (type) {
				case 'Object':
					if (visited[_.util.objId(o)]) {
						return visited[_.util.objId(o)];
					}
					var clone = {};
					visited[_.util.objId(o)] = clone;

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key], visited);
						}
					}

					return clone;

				case 'Array':
					if (visited[_.util.objId(o)]) {
						return visited[_.util.objId(o)];
					}
					var clone = [];
					visited[_.util.objId(o)] = clone;

					o.forEach(function (v, i) {
						clone[i] = _.util.clone(v, visited);
					});

					return clone;
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];

			if (arguments.length == 2) {
				insert = arguments[1];

				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}

				return grammar;
			}

			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === root[inside] && key != inside) {
					this[key] = ret;
				}
			});

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback, type, visited) {
			visited = visited || {};
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, null, visited);
					}
					else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, i, visited);
					}
				}
			}
		}
	},
	plugins: {},

	highlightAll: function(async, callback) {
		_.highlightAllUnder(document, async, callback);
	},

	highlightAllUnder: function(container, async, callback) {
		var env = {
			callback: callback,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run("before-highlightall", env);

		var elements = env.elements || container.querySelectorAll(env.selector);

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1].toLowerCase();
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		if (element.parentNode) {
			// Set language on the parent, for styling
			parent = element.parentNode;

			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		_.hooks.run('before-sanity-check', env);

		if (!env.code || !env.grammar) {
			if (env.code) {
				_.hooks.run('before-highlight', env);
				env.element.textContent = env.code;
				_.hooks.run('after-highlight', env);
			}
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = evt.data;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var env = {
			code: text,
			grammar: grammar,
			language: language
		};
		_.hooks.run('before-tokenize', env);
		env.tokens = _.tokenize(env.code, env.grammar);
		_.hooks.run('after-tokenize', env);
		return Token.stringify(_.util.encode(env.tokens), env.language);
	},

	matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
		var Token = _.Token;

		for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			if (token == target) {
				return;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					greedy = !!pattern.greedy,
					lookbehindLength = 0,
					alias = pattern.alias;

				if (greedy && !pattern.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
					pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
				}

				pattern = pattern.pattern || pattern;

				// Don’t cache length as it changes during the loop
				for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					if (greedy && i != strarr.length - 1) {
						pattern.lastIndex = pos;
						var match = pattern.exec(text);
						if (!match) {
							break;
						}

						var from = match.index + (lookbehind ? match[1].length : 0),
						    to = match.index + match[0].length,
						    k = i,
						    p = pos;

						for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
							p += strarr[k].length;
							// Move the index i to the element in strarr that is closest to from
							if (from >= p) {
								++i;
								pos = p;
							}
						}

						// If strarr[i] is a Token, then the match starts inside another Token, which is invalid
						if (strarr[i] instanceof Token) {
							continue;
						}

						// Number of tokens to delete and replace with the new match
						delNum = k - i;
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						pattern.lastIndex = 0;

						var match = pattern.exec(str),
							delNum = 1;
					}

					if (!match) {
						if (oneshot) {
							break;
						}

						continue;
					}

					if(lookbehind) {
						lookbehindLength = match[1] ? match[1].length : 0;
					}

					var from = match.index + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    to = from + match.length,
					    before = str.slice(0, from),
					    after = str.slice(to);

					var args = [i, delNum];

					if (before) {
						++i;
						pos += before.length;
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);

					if (delNum != 1)
						_.matchGrammar(text, strarr, grammar, i, pos, true, token);

					if (oneshot)
						break;
				}
			}
		}
	},

	tokenize: function(text, grammar, language) {
		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		_.matchGrammar(text, strarr, grammar, 0, 0, false);

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
	this.type = type;
	this.content = content;
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || "").length|0;
	this.greedy = !!greedy;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (_.util.type(o) === 'Array') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = Object.keys(env.attributes).map(function(name) {
		return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}).join(' ');

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _self.Prism;
	}

	if (!_.disableWorkerMessageHandler) {
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);
	}

	return _self.Prism;
}

//Get current script and highlight
var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

if (script) {
	_.filename = script.src;

	if (!_.manual && !script.hasAttribute('data-manual')) {
		if(document.readyState !== "loading") {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(_.highlightAll);
			} else {
				window.setTimeout(_.highlightAll, 16);
			}
		}
		else {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}
}

return _self.Prism;

})();

if ('object' !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof commonjsGlobal !== 'undefined') {
	commonjsGlobal.Prism = Prism;
}


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': /<!DOCTYPE[\s\S]+?>/i,
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
				inside: {
					'punctuation': [
						/^=/,
						{
							pattern: /(^|[^\\])["']/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;


/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
	'comment': /\/\*[\s\S]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
	'string': {
		pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css',
			greedy: true
		}
	});

	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /[.\\]/
		}
	},
	'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(?:true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
	'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
		lookbehind: true,
		greedy: true
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
		alias: 'function'
	},
	'constant': /\b[A-Z][A-Z\d_]*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\${[^}]+}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\${|}$/,
						alias: 'punctuation'
					},
					rest: null // See below
				}
			},
			'string': /[\s\S]+/
		}
	}
});
Prism.languages.javascript['template-string'].inside['interpolation'].inside.rest = Prism.languages.javascript;

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript',
			greedy: true
		}
	});
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
		return;
	}

	self.Prism.fileHighlight = function() {

		var Extensions = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
			var src = pre.getAttribute('data-src');

			var language, parent = pre;
			var lang = /\blang(?:uage)?-([\w-]+)\b/i;
			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (pre.className.match(lang) || [, ''])[1];
			}

			if (!language) {
				var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
				language = Extensions[extension] || extension;
			}

			var code = document.createElement('code');
			code.className = 'language-' + language;

			pre.textContent = '';

			code.textContent = 'Loading…';

			pre.appendChild(code);

			var xhr = new XMLHttpRequest();

			xhr.open('GET', src, true);

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {

					if (xhr.status < 400 && xhr.responseText) {
						code.textContent = xhr.responseText;

						Prism.highlightElement(code);
					}
					else if (xhr.status >= 400) {
						code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
					}
					else {
						code.textContent = '✖ Error: File does not exist or is empty';
					}
				}
			};

			xhr.send(null);
		});

		if (Prism.plugins.toolbar) {
			Prism.plugins.toolbar.registerButton('download-file', function (env) {
				var pre = env.element.parentNode;
				if (!pre || !/pre/i.test(pre.nodeName) || !pre.hasAttribute('data-src') || !pre.hasAttribute('data-download-link')) {
					return;
				}
				var src = pre.getAttribute('data-src');
				var a = document.createElement('a');
				a.textContent = pre.getAttribute('data-download-link-label') || 'Download';
				a.setAttribute('download', '');
				a.href = src;
				return a;
			});
		}

	};

	document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

})();
});

class CodeHighlight {
    constructor() {
        /**
         * 代码内容
         */
        this.code = '';
        /**
         * 代码类型
         */
        this.lang = 'html';
    }
    render() {
        return (h("pre", null,
            h("code", { class: "language-html", innerHTML: prism.highlight(this.code, prism.languages[this.lang], this.lang) })));
    }
    static get is() { return "nb-code-highlight"; }
    static get properties() { return {
        "code": {
            "type": String,
            "attr": "code"
        },
        "lang": {
            "type": String,
            "attr": "lang"
        }
    }; }
    static get style() { return "/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * \@author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n	color: black;\n	background: none;\n	text-shadow: 0 1px white;\n	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n	text-align: left;\n	white-space: pre;\n	word-spacing: normal;\n	word-break: normal;\n	word-wrap: normal;\n	line-height: 1.5;\n	-moz-tab-size: 4;\n	-o-tab-size: 4;\n	tab-size: 4;\n\n	-webkit-hyphens: none;\n	-ms-hyphens: none;\n	hyphens: none;\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n	text-shadow: none;\n	background: #b3d4fc;\n}\n\n\@media print {\n	code[class*=\"language-\"],\n	pre[class*=\"language-\"] {\n		text-shadow: none;\n	}\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n	padding: 1em;\n	margin: .5em 0;\n	overflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n	background: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n	padding: .1em;\n	border-radius: .3em;\n	white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n	color: slategray;\n}\n\n.token.punctuation {\n	color: #999;\n}\n\n.namespace {\n	opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n	color: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n	color: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n	color: #9a6e3a;\n	background: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n	color: #07a;\n}\n\n.token.function,\n.token.class-name {\n	color: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n	color: #e90;\n}\n\n.token.important,\n.token.bold {\n	font-weight: bold;\n}\n.token.italic {\n	font-style: italic;\n}\n\n.token.entity {\n	cursor: help;\n}"; }
}

/**
 * 列表区块
 */
class List {
    constructor() {
        /**
         * List之间的间距
         */
        this.topSpace = 'm';
    }
    render() {
        return [
            this.topSpace !== 'none' && h("div", { class: `space ${this.topSpace}` }),
            h("div", { class: "list" },
                h("slot", null))
        ];
    }
    static get is() { return "nb-list"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "topSpace": {
            "type": String,
            "attr": "top-space"
        }
    }; }
    static get style() { return ".space.s {\n  margin-top: 0.133333333333333rem;\n}\n.space.m {\n  margin-top: 0.266666666666667rem;\n}\n.space.l {\n  margin-top: 0.4rem;\n}\n.list {\n  background: #fff;\n}"; }
}

/**
 * 区块项目
 */
class ListItem {
    constructor() {
        /**
         * 下边框, 0则不显示
         */
        this.border = 1;
        /**
         * 线条颜色
         */
        this.color = '#f5f5f5';
    }
    render() {
        return (h("div", { class: `item ${this.short || ''}`, style: {
                borderBottom: `${this.border > 0 ? `${this.border}px` : '0'} solid ${this.color}`
            } },
            h("slot", null)));
    }
    static get is() { return "nb-list-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "border": {
            "type": Number,
            "attr": "border"
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "short": {
            "type": String,
            "attr": "short"
        }
    }; }
    static get style() { return ".item {\n  height: 1.173333333333333rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 0 0.4rem;\n}\n.item.left {\n  margin-left: 0.4rem;\n  padding-left: 0;\n}\n.item.right {\n  margin-right: 0.4rem;\n  padding-right: 0;\n}\n.item.both {\n  margin: 0 0.4rem;\n  padding: 0;\n}"; }
}

var Icon = {
    prev: (h("svg", { viewBox: "64 64 896 896", "data-icon": "left", width: "1em", height: "1em", fill: "currentColor" },
        h("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" }))),
    next: (h("svg", { viewBox: "64 64 896 896", "data-icon": "right", width: "1em", height: "1em", fill: "currentColor" },
        h("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })))
};

/**
 * 分页组件
 */
class Pagination {
    constructor() {
        /**
         * 当前页面
         */
        this.current = 1;
        /**
         * 每页条数
         */
        this.pagesize = 10;
        /**
         * 总数据条数
         */
        this.total = 0;
        /**
         * 当只有一页的时候自动隐藏
         */
        this.autoHide = true;
        /**
         * 当分页太多时候限制前后显示页数
         */
        this.limitPage = 4;
    }
    /**
     * 观察页数变化
     * @param to 前往页面
     * @param from 来自页面
     */
    onCurrentPageChange(to, from) {
        this.change.emit({
            to, from
        });
    }
    /**
     * 计算出一共有几页
     */
    get totalPages() {
        return Math.ceil(this.total / this.pagesize);
    }
    /**
     * 是否上一页可用
     */
    get hasPrev() {
        return this.current != 1;
    }
    /**
     * 是否下一页可用
     */
    get hasNext() {
        return this.totalPages > this.current;
    }
    /**
     * 判断是否可以显示分页
     */
    get showPagination() {
        return this.totalPages > 1 || !this.autoHide;
    }
    /**
     * 数字页数列表（实际中间展示的页码）
     */
    get numberPageList() {
        let list = [];
        // 左侧页起始未知
        const leftOffset = this.current - this.limitPage / 2;
        const leftStartAt = leftOffset < 1 ? 1 : leftOffset;
        // 右侧
        const rightOffset = this.current + this.limitPage / 2;
        const rightEndAt = rightOffset > this.totalPages ? this.totalPages : rightOffset;
        for (let n = leftStartAt; n <= rightEndAt; n++) {
            list.push(n);
        }
        // 添加第一页
        const prefixSpan = list[0] - 1;
        if (prefixSpan >= 2) {
            list.unshift('<<');
        }
        if (prefixSpan >= 1) {
            list.unshift(1);
        }
        // 添加末页
        const suffixSpan = this.totalPages - list.slice(-1)[0];
        if (suffixSpan >= 2) {
            list.push('>>');
        }
        if (suffixSpan >= 1) {
            list.push(this.totalPages);
        }
        return list;
    }
    render() {
        return [
            this.showPagination && h("div", { class: "pagination" },
                h("ul", null,
                    h("li", { title: "\u4E0A\u4E00\u9875", class: this.hasPrev ? '' : 'disabled', onClick: () => this.hasPrev && this.current-- },
                        h("a", null,
                            h("i", null, Icon.prev))),
                    this.numberPageList.map(n => {
                        if (n === '<<')
                            return (h("li", { onClick: () => this.current -= this.limitPage / 2 },
                                h("span", { class: "ellipsis" }, "\u2022\u2022\u2022")));
                        else if (n === '>>')
                            return (h("li", { onClick: () => this.current += this.limitPage / 2 },
                                h("span", { class: "ellipsis" }, "\u2022\u2022\u2022")));
                        else
                            return (h("li", { title: `第${n}页`, onClick: () => (this.current = n) },
                                h("a", { class: this.current == n ? 'active' : '' }, n)));
                    }),
                    h("li", { title: "\u4E0B\u4E00\u9875", class: this.hasNext ? '' : 'disabled', onClick: () => this.hasNext && this.current++ },
                        h("a", null,
                            h("i", null, Icon.next)))))
        ];
    }
    static get is() { return "nb-pagination"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "autoHide": {
            "type": Boolean,
            "attr": "auto-hide"
        },
        "current": {
            "type": Number,
            "attr": "current",
            "mutable": true,
            "watchCallbacks": ["onCurrentPageChange"]
        },
        "limitPage": {
            "type": Number,
            "attr": "limit-page"
        },
        "pagesize": {
            "type": Number,
            "attr": "pagesize"
        },
        "total": {
            "type": Number,
            "attr": "total"
        }
    }; }
    static get events() { return [{
            "name": "change",
            "method": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".pagination ul {\n  font-size: 14px;\n  line-height: 1.5;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.pagination ul li {\n  cursor: pointer;\n  min-width: 32px;\n  height: 32px;\n  line-height: 32px;\n  display: inline-block;\n  outline: none;\n  position: relative;\n  margin-right: 8px;\n}\n.pagination ul li.disabled {\n  border-color: #d9d9d9;\n  color: rgba(0,0,0,0.25);\n  cursor: not-allowed;\n}\n.pagination ul li.disabled a:hover {\n  border-color: #d9d9d9;\n  color: rgba(0,0,0,0.25);\n}\n.pagination ul li .ellipsis {\n  position: absolute;\n  display: block;\n  letter-spacing: 2px;\n  color: rgba(0,0,0,0.25);\n  text-align: center;\n  top: 12px;\n  margin: auto;\n}\n.pagination ul li a {\n  border: 1px solid #d9d9d9;\n  background-color: #fff;\n  border-radius: 4px;\n  display: block;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  font-size: 12px;\n  height: 100%;\n  text-align: center;\n}\n.pagination ul li a:hover,\n.pagination ul li a.active {\n  border-color: #1890ff;\n  color: #1890ff;\n}"; }
}

let refTarget = {};
const boxStyles = {
    border: '1px solid #eee',
    width: '30px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    background: '#eee'
};
const iconBox = {
    display: 'inline-block',
    width: '25%',
    padding: '20px 0',
    textAlign: 'center'
};
/**
 * 各组件的演示代码
 */
var Examples = {
    /**
     * 图标
     */
    'nb-svg-icon': [
        h("div", { class: "wrapper" },
            h("div", { style: iconBox },
                h("nb-svg-icon", { type: "forward", size: "xs" }),
                h("br", null),
                "forward(XS)"),
            h("div", { style: iconBox },
                h("nb-svg-icon", { type: "back", size: "s" }),
                h("br", null),
                "back(S)"),
            h("div", { style: iconBox },
                h("nb-svg-icon", { type: "loading" }),
                h("br", null),
                "loading(M)"),
            h("div", { style: iconBox },
                h("nb-svg-icon", { type: "add", size: "l" }),
                h("br", null),
                "add (L)"),
            h("div", { style: iconBox },
                h("nb-svg-icon", { type: "close", size: "xl" }),
                h("br", null),
                "close(XL)"),
            h("div", { style: iconBox },
                h("nb-svg-icon", null,
                    h("svg", { viewBox: "0 0 32 32" },
                        h("path", { d: "M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z M22.8823123,11.1582487 L13.6200552,20.2918445 L9.7475544,16.6425102 C9.48246798,16.3731249 9.05246304,16.3731249 8.78737662,16.6425102 C8.5222902,16.9112336 8.5222902,17.3476334 8.78737662,17.6170187 L13.15007,21.7647489 C13.4153737,22.0343548 13.8451613,22.0343548 14.110465,21.7647489 C14.1406675,21.7343024 14.166307,21.7009878 14.1893391,21.66657 L23.8427073,12.1331984 C24.1077937,11.8640338 24.1077937,11.4274134 23.8427073,11.1582487 C23.5774036,10.8888634 23.147616,10.8888634 22.8823123,11.1582487 Z", fill: "#3BC49D" }))),
                h("br", null),
                "\u81EA\u5B9A\u4E49svg\u5185\u5BB9(M)")),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
    <div style={iconBox}>
      <nb-svg-icon type="forward" size="xs" />
      <br />
      forward(XS)
    </div>
    <div style={iconBox}>
      <nb-svg-icon type="back" size="s" />
      <br />
      back(S)
    </div>
    <div style={iconBox}>
      <nb-svg-icon type="loading" />
      <br />
      loading(M)
    </div>
    <div style={iconBox}>
      <nb-svg-icon type="add" size="l" />
      <br />
      add (L)
    </div>
    <div style={iconBox}>
      <nb-svg-icon type="close" size="xl" />
      <br />
      close(XL)
    </div>
    <div style={iconBox}>
      <nb-svg-icon>
        <svg viewBox="0 0 32 32">
          <path
            d="M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z M22.8823123,11.1582487 L13.6200552,20.2918445 L9.7475544,16.6425102 C9.48246798,16.3731249 9.05246304,16.3731249 8.78737662,16.6425102 C8.5222902,16.9112336 8.5222902,17.3476334 8.78737662,17.6170187 L13.15007,21.7647489 C13.4153737,22.0343548 13.8451613,22.0343548 14.110465,21.7647489 C14.1406675,21.7343024 14.166307,21.7009878 14.1893391,21.66657 L23.8427073,12.1331984 C24.1077937,11.8640338 24.1077937,11.4274134 23.8427073,11.1582487 C23.5774036,10.8888634 23.147616,10.8888634 22.8823123,11.1582487 Z"
            fill="#3BC49D"
          />
        </svg>
      </nb-svg-icon>
      <br />
      自定义svg内容(M)
    </div>` })
    ],
    /**
     * 列表
     */
    'nb-list': [
        h("div", { class: "wrapper", style: {
                padding: '0',
                background: '#f5f5f5'
            } },
            h("nb-list", null,
                h("nb-list-item", null, "default \u9ED8\u8BA4"),
                h("nb-list-item", { short: "left" }, "short=left \u5DE6\u8FB9\u7F29\u8FDB"),
                h("nb-list-item", { short: "right" }, "short=right \u53F3\u8FB9\u7F29\u8FDB"),
                h("nb-list-item", { short: "both" }, "short=both \u4E24\u8FB9\u7F29\u8FDB"),
                h("nb-list-item", { border: 0 }, "border=0 \u9690\u85CF\u6A2A\u7EBF")),
            h("nb-list", null,
                h("nb-list-item", { border: 2 }, "border=2 \u6A2A\u7EBF\u7C97\u7EC6"),
                h("nb-list-item", { color: "red" }, "color=red \u6A2A\u7EBF\u989C\u8272"))),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
  <nb-list>
    <nb-list-item>default 默认</nb-list-item>
    <nb-list-item short="left">short=left 左边缩进</nb-list-item>
    <nb-list-item short="right">short=right 右边缩进</nb-list-item>
    <nb-list-item short="both">short=both 两边缩进</nb-list-item>
    <nb-list-item border={0}>border=0 隐藏横线</nb-list-item>
  </nb-list>
  <nb-list>
    <nb-list-item border={2}>border=2 横线粗细</nb-list-item>
    <nb-list-item color="red">color=red 横线颜色</nb-list-item>
  </nb-list>
      ` })
    ],
    /**
     * 徽标数
     */
    'nb-badge': [
        h("div", { class: "wrapper" },
            h("nb-badge", { count: 213 },
                h("div", { style: boxStyles }, "\u9ED8\u8D85")),
            "\u00A0\u00A0\u00A0\u00A0",
            h("nb-badge", { count: 0, showZero: true },
                h("div", { style: boxStyles }, "\u663E0")),
            "\u00A0\u00A0\u00A0\u00A0",
            h("nb-badge", { dot: true, count: 1 },
                h("div", { style: boxStyles }, "\u5706\u70B9")),
            "\u00A0\u00A0\u00A0\u00A0",
            h("nb-badge", { count: 6, maxCount: 5 },
                h("div", { style: boxStyles }, "\u5B9A\u8D85")),
            "\u00A0\u00A0\u00A0\u00A0",
            h("nb-badge", { count: 6, bgColor: "blue" },
                h("div", { style: boxStyles }, "\u70B9\u8272"))),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
  <nb-badge count={213}>
    <div style={boxStyles}>默超</div>
  </nb-badge>
  <nb-badge count={0} showZero>
    <div style={boxStyles}>显0</div>
  </nb-badge>
  <nb-badge dot count={1}>
    <div style={boxStyles}>圆点</div>
  </nb-badge>
  <nb-badge count={6} maxCount={5}>
    <div style={boxStyles}>定超</div>
  </nb-badge>
  <nb-badge count={6} bgColor="blue">
    <div style={boxStyles}>点色</div>
  </nb-badge>
      ` })
    ],
    /**
     * 下拉刷新上拉加载
     */
    'nb-pull-to-do': [
        h("nb-pull-to-do", { wrapperSelector: ".wrapper", contentSelector: ".wrapper > div", onRefresh: (ev) => {
                console.log('刷新开始');
                setTimeout(() => {
                    let newItem = document.createElement('div');
                    newItem.innerHTML = String(Date.now());
                    document
                        .querySelector('.wrapper > div')
                        .insertAdjacentElement('afterbegin', newItem);
                    ev.target.done();
                }, 1000);
            }, onMore: (ev) => {
                console.log('加载更多');
                setTimeout(() => {
                    let newItem = document.createElement('div');
                    newItem.innerHTML = String(Date.now());
                    document.querySelector('.wrapper > div').appendChild(newItem);
                    ev.target.done();
                }, 1000);
            } },
            h("div", { class: "wrapper", style: {
                    padding: '0px',
                    height: '30vh',
                    overflow: 'auto',
                    background: '#f5f5f5'
                } },
                h("div", { style: {
                        overflowX: 'hidden',
                        background: '#fff',
                        padding: '20px'
                    } },
                    "\u4E0B\u62C9\u8BD5\u8BD5\u5237\u65B0, \u4E0A\u62C9\u5230\u5E95\u8BD5\u8BD5\u52A0\u8F7D\u66F4\u591A\uFF08touch\u6A21\u5F0F\uFF09",
                    h("br", null),
                    '...........................'.split('').map(w => [w, h("br", null)])))),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
    <nb-pull-to-do
      wrapperSelector=".wrapper"
      contentSelector=".wrapper > div"
      onRefresh={(ev: any) => {
        console.log('刷新开始');
        setTimeout(() => {
          ev.target.done();
        }, 1000);
      }}
      onMore={(ev: any) => {
        console.log('加载更多');
        setTimeout(() => {
          ev.target.done();
        }, 1000);
      }}
    >
      <div
        class="wrapper"
        style={{
          padding: '0px',
          height: '30vh',
          overflow: 'auto',
          background: '#f5f5f5'
        }}
      >
        <div
          style={{
            overflowX: 'hidden',
            background: '#fff',
            padding: '20px'
          }}
        >
          下拉试试刷新, 上拉到底试试加载更多（touch模式）
          <br />
          {'...........................'
            .split('')
            .map(w => [w, <br />])}
        </div>
      </div>
    </nb-pull-to-do>
      ` })
    ],
    /**
     * 固钉
     */
    'nb-affix': [
        h("div", { class: "wrapper", ref: ev => (refTarget.affix = ev), style: {
                height: '30vh',
                overflow: 'auto',
                padding: '0px'
            } },
            h("div", { class: "content", style: {
                    height: '1000px',
                    overflowX: 'hidden'
                } },
                h("br", null),
                h("nb-affix", { onChange: ({ detail }) => {
                        if (!refTarget.affix)
                            return;
                        const target = refTarget.affix.querySelector('.affix-content');
                        const wrapper = refTarget.affix.querySelector('.content');
                        if (detail.isFixed) {
                            target.classList.add('fixed');
                            wrapper.style.paddingTop = '64px';
                        }
                        else {
                            target.classList.remove('fixed');
                            wrapper.style.paddingTop = '20px';
                        }
                    }, offset: 0, targetDom: () => refTarget.affix },
                    h("div", { class: "affix-content" },
                        h("div", { class: "item" }, "\u4E8C\u7EF4\u7801"),
                        h("div", { class: "item" }, "\u5173\u7CFB\u9884\u7EA6"),
                        h("div", { class: "item" }, "\u9A7E\u9A76\u8231"),
                        h("div", { class: "item" }, "\u4EA7\u54C1\u4E2D\u5FC3"))))),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
    <div
      style={{
        height: '1000px',
        overflowX: 'hidden'
      }}
    >
      <br />
      <nb-affix
        onChange={({ detail }) => {
          const target = document.querySelector('.affix-content');
          const wrapper: any = document.querySelector('.wrapper > div');
          if (detail.isFixed) {
            target.classList.add('fixed');
            wrapper.style.paddingTop = '64px';
          }
          else {
            target.classList.remove('fixed');
            wrapper.style.paddingTop = '20px';
          }
        }}
        offset={0}
        toTarget={() => refTarget}
      >
        <div class="affix-content">
          <div class="item">二维码</div>
          <div class="item">关系预约</div>
          <div class="item">驾驶舱</div>
          <div class="item">产品中心</div>
        </div>
      </nb-affix>
    </div>
      ` })
    ],
    /**
     * 分页
     */
    'nb-pagination': [
        h("div", { class: "wrapper" },
            h("nb-pagination", { current: 1, pagesize: 10, total: 100, onChange: ({ detail }) => console.log(`触发转到第${detail.to}页`) })),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
  <nb-pagination
    current={1}
    pagesize={10}
    total={100}
    onChange={({ detail }) => console.log(\`触发转到第\${detail.to}页\`)}
  />
    ` }),
        h("div", { class: "lang" }, "Vue"),
        h("nb-code-highlight", { code: `
  <nb-pagination
    :current="1"
    :pagesize="10"
    :total="100"
    @change="..."
  />
    ` }),
        h("div", { class: "lang" }, "HTML"),
        h("nb-code-highlight", { code: `
  <nb-pagination
    current="1"
    pagesize="10"
    total="100"
  />
  <script>
    const pager = document.querySelector('nb-pagination');
    pager.addEventListener('change', ({ detail }) => {
      document.querySelector('#page-to').innerHTML = \`触发转到第$\{
        detail.to
      \}页\`
    }, false);
  </script>
    ` })
    ],
    /**
     * 动作面板
     */
    'nb-actionsheet': [
        h("nb-actionsheet", { headTitle: "\u9762\u677F\u6807\u9898", mask: true, ref: ev => (refTarget.actionsheet = ev) },
            h("div", { slot: "container" },
                h("ul", null,
                    h("li", null, "\u9009\u98791")))),
        h("div", { class: "wrapper" },
            h("button", { onClick: () => refTarget.actionsheet.show() }, "\u6253\u5F00\u9762\u677F")),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
  <nb-actionsheet headTitle="面板标题" mask={true} ref={ev => refTarget = ev}>
    <div slot="container">
      <ul>
        <li>选项1</li>
      </ul>
    </div>
  </nb-actionsheet>
  <button onClick={() => refTarget.show()}>打开面板</button>
    ` }),
        h("div", { class: "lang" }, "Vue"),
        h("nb-code-highlight", { code: `
  <nb-actionsheet head-title="面板标题" :mask="true" ref="actionsheet">
    <div slot="container">
      <ul>
        <li>选项1</li>
      </ul>
    </div>
  </nb-actionsheet>
  <button @click="$refs.actionsheet.show()">打开面板</button>
    ` }),
        h("div", { class: "lang" }, "HTML"),
        h("nb-code-highlight", { code: `
  <nb-actionsheet head-title="面板标题" mask="true">
    <div slot="container">
      <ul>
        <li>选项1</li>
      </ul>
    </div>
  </nb-actionsheet>
  <button onclick="document.querySelector('nb-actionsheet').show()">打开面板</button>
    ` })
    ]
};

/**
 * hash search 转对象
 * ?a=a&b=b => {a:'a',b:'b'}
 * @param  {String} hash
 * @return {Object}
 */
const search2obj = (hash = '') => {
    let ret = {}, seg = decodeURIComponent(hash)
        .replace(/^\?/, '')
        .split('&'), len = seg.length, i = 0, s;
    for (; i < len; i++) {
        if (!seg[i]) {
            continue;
        }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
    }
    return ret;
};

class Playground {
    constructor() {
        /**
         * 开启h5模式
         */
        this.h5 = false;
        /**
         * 需要演示的组件列表
         */
        this.demoList = [
            {
                key: 'actionsheet',
                text: '动作面板.H5',
                mobile: true,
                tag: 'nb-actionsheet'
            },
            {
                key: 'pagination',
                text: '分页',
                mobile: false,
                tag: 'nb-pagination'
            },
            {
                key: 'affix',
                text: '固钉',
                mobile: false,
                tag: 'nb-affix'
            },
            {
                key: 'pull-to-do',
                text: '上下拉操作.H5',
                mobile: true,
                tag: 'nb-pull-to-do'
            },
            {
                key: 'badge',
                text: '徽标数.H5',
                mobile: true,
                tag: 'nb-badge'
            },
            {
                key: 'list',
                text: '列表.H5',
                mobile: true,
                tag: 'nb-list'
            },
            {
                key: 'icon',
                text: '图标.H5',
                mobile: true,
                tag: 'nb-svg-icon'
            }
        ];
        /**
         * 当前展示的demo
         */
        this.demo = this.demoList[0];
    }
    parseHash() {
        const tag = location.hash.match(/#([^\?]+)/);
        // 获得渲染组件
        if (tag) {
            this.tag = tag[1];
            // 设定当前demo
            this.demo = this.demoList.filter(demo => {
                return demo.tag === this.tag;
            })[0];
            // console.log('渲染', this.tag, this.demo);
        }
        else {
            this.tag = '';
        }
        const search = tag ? search2obj(location.hash.split('?')[1]) : {};
        // h5 模式
        this.h5 = search.display === 'mobile';
        if (this.h5 && this.tag !== '') {
            this.el.ownerDocument.documentElement.style.fontSize = '37.5px';
        }
    }
    /**
     * 从hash来得到需要展示的组件
     */
    componentWillLoad() {
        this.parseHash();
        window.onhashchange = this.parseHash.bind(this);
    }
    render() {
        return this.tag === '' ? (h("div", { class: "site" },
            h("h2", null,
                "NB-\u725B\u90A6\u901A\u7528\u7EC4\u4EF6\u5E93",
                h("small", { class: "intro" },
                    "Powered by",
                    ' ',
                    h("a", { href: "https://stenciljs.com/docs/introduction", target: "_blank" }, "Stencil"),
                    "\u00B7",
                    h("a", { href: "https://stenciljs.com/docs/overview", target: "_blank" }, "\u8DE8\u5E73\u53F0\u4F7F\u7528\u65B9\u6CD5"),
                    "\u00B7",
                    h("a", { href: "https://github.com/linyupark/nb-component", target: "_blank" }, "github"))),
            h("ul", null, this.demoList.map(demo => (h("li", { key: demo.key, class: { active: demo.key === this.demo.key } },
                h("a", { href: "javascript:;", onClick: () => {
                        this.demo = demo;
                    } },
                    demo.text,
                    h("br", null),
                    demo.key))))),
            h("div", { class: "content" },
                h("iframe", { scrolling: "no", class: this.demo.mobile ? 'mobile' : '', src: `#${this.demo.tag}?display=${this.demo.mobile ? 'mobile' : 'pc'}` })))) : (h("div", { class: this.demo.mobile ? 'example mobile' : 'example' }, Examples[this.tag]));
    }
    static get is() { return "nb-playground"; }
    static get properties() { return {
        "demo": {
            "state": true
        },
        "el": {
            "elementRef": true
        }
    }; }
    static get style() { return ".site {\n  color: #444;\n  padding: 20px;\n}\n.site h2 {\n  font-size: 20px;\n  height: 40px;\n  line-height: 40px;\n  margin: 0 0 30px 0;\n}\n.site h2 small {\n  font-size: 12px;\n  color: #999;\n  margin-left: 20px;\n}\n.site a {\n  color: #3779ff;\n  text-decoration: none;\n}\n.site ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  width: 120px;\n  font-size: 14px;\n  float: left;\n}\n.site ul li {\n  padding: 5px 10px 5px 0;\n  margin: 0 10px 10px 0;\n  border-right: 1px solid #fff;\n}\n.site ul li.active {\n  border-right: 1px solid #3779ff;\n}\n.site .content {\n  float: left;\n  margin-left: 30px;\n}\n.site .content iframe {\n  width: 600px;\n  height: calc(100vh - 120px);\n  display: block;\n  border: 1px solid #eee;\n  float: left;\n  background: #fff;\n}\n.site .content iframe.mobile {\n  width: 375px;\n}\n.example {\n  font-size: 16px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  overflow-y: scroll;\n}\n.example::-webkit-scrollbar {\n  width: 1px;\n}\n.example::-webkit-scrollbar-thumb {\n  background-color: #3779ff;\n}\n.example .wrapper {\n  padding: 20px;\n  overflow-x: hidden;\n}\n.example .wrapper .affix-content,\n.example .wrapper .affix-content2 {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: space-around;\n          -ms-flex-pack: distribute;\n          justify-content: space-around;\n  left: 0;\n  width: 100%;\n  height: 88px;\n  background: -webkit-linear-gradient(263deg, #6dc9fe 0%, #3b98fc 100%);\n  background: linear-gradient(187deg, #6dc9fe 0%, #3b98fc 100%);\n  -webkit-box-shadow: 0px 6px 12px 0px #ccc;\n  box-shadow: 0px 6px 12px 0px #ccc;\n  border-radius: 8px;\n  -webkit-transition: height 0.3s;\n  transition: height 0.3s;\n}\n.example .wrapper .affix-content .item,\n.example .wrapper .affix-content2 .item {\n  color: #fff;\n}\n.example .wrapper .affix-content.fixed,\n.example .wrapper .affix-content2.fixed {\n  width: 100vw;\n  height: 44px;\n  left: 0;\n}\n.example .lang {\n  background: #ccc;\n  padding: 5px;\n}\n.example pre {\n  font-size: 12px;\n  background: #f5f5f5;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n}\n.example pre code {\n  white-space: pre-wrap;\n  -moz-tab-size: 2;\n  -o-tab-size: 2;\n  tab-size: 2;\n}\n.example.mobile {\n  font-size: 0.373333333333333rem;\n}\n.example.mobile pre {\n  font-size: 0.32rem;\n}"; }
}

let _scrollTopPosition = 0;
/**
 * 下滑刷新
 */
class PullToRefresh {
    constructor() {
        /**
         * 下拉展示的提示
         */
        this.refreshHTML = '<div class="onrefresh">刷新内容</div>';
        /**
         * 上拉加载更多
         */
        this.moreHTML = '<div class="onmore">加载更多</div>';
        /**
         * 加载中的内容
         */
        this.loadingHTML = '<div class="loading">loading</div>';
        /**
         * 拉动限制高度
         */
        this.dampHeight = 30;
        /**
         * 当浏览器是返回状态是否尝试回到上一次的位置
         */
        this.positionSave = true;
        /**
         * 已经拉动的限制高度(正数为顶部，负数为底部)
         */
        this.dampingLen = 0;
        /**
         * 加载状态
         */
        this.loading = false;
    }
    /**
     * 加载完毕
     */
    done() {
        this.$content.style.transform = `translateY(0px)`;
        this.dampingLen = 0;
        this.loading = false;
    }
    /**
     * 计算拉动距离
     */
    get pullLength() {
        return this.movePageY - this.startPageY;
    }
    /**
     * 获取当前滚动位置
     * @return {Number}
     */
    getScrollTop() {
        return this.$wrapper.scrollTop;
    }
    /**
     * 滚动区域最多能到达的scrollTop值，判断是否到底部
     */
    getWrapperScrollTop() {
        return this.$wrapper.scrollHeight - this.$wrapper.clientHeight;
    }
    /**
     * 记录阻尼开始位置
     */
    recordStartDampLen() {
        if (this.startDampLen)
            return;
        if ((this.getScrollTop() === 0 && this.pullLength > 0) ||
            (this.getScrollTop() === this.getWrapperScrollTop() &&
                this.pullLength < 0)) {
            this.startDampLen = this.pullLength;
            // console.log('startDampLen', this.startDampLen);
        }
    }
    /**
     * 触摸开始操作
     * @param ev
     */
    handleTouchStart(ev) {
        this.startPageY = ev.touches[0].pageY;
    }
    /**
     * 触摸滑动操作
     * @param ev
     */
    handleTouchMove(ev) {
        this.movePageY = ev.touches[0].pageY;
        // 还在loading
        if (this.loading)
            return;
        this.recordStartDampLen();
        // 在有阻尼开始位置记录的时候继续拉动
        if (this.startDampLen > 0 && this.disable !== 'refresh') {
            if (this.pullLength > this.startDampLen) {
                this.dampingLen = this.pullLength - this.startDampLen;
                if (this.dampingLen > this.dampHeight)
                    this.dampingLen = this.dampHeight;
            }
            else if (this.pullLength + 3 < this.startDampLen) {
                this.dampingLen = 0;
            }
        }
        if (this.startDampLen < 0 && this.disable !== 'more') {
            if (this.pullLength < this.startDampLen) {
                this.dampingLen = this.pullLength + this.startDampLen;
                if (this.dampingLen < -this.dampHeight)
                    this.dampingLen = -this.dampHeight;
            }
            else if (this.pullLength - 3 > this.startDampLen) {
                this.dampingLen = 0;
            }
        }
        if (this.startDampLen !== 0) {
            this.$content.style.transition = 'transform 0.3s';
            this.$content.style.transform = `translateY(${this.dampingLen}px)`;
        }
    }
    handleTouchEnd() {
        this.startDampLen = null;
        if (Math.abs(this.dampingLen) > 3) {
            // 进入 loading 状态
            this.loading = true;
        }
        this.dampingLen > 3 && this.refresh.emit();
        this.dampingLen < -3 && this.more.emit();
        // 记录当前位置
        if (this.positionSave) {
            _scrollTopPosition = this.getScrollTop();
        }
    }
    /**
     * 对 touch动作监听绑定跟解绑
     * @param {Boolean} bind 绑定还是解绑？
     */
    bindTouchScroll(bind = true) {
        // 绑定
        if (bind) {
            try {
                this.$wrapper = this.el.querySelector(this.wrapperSelector);
                this.$content = this.el.querySelector(this.contentSelector);
                this.$wrapper.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
                this.$wrapper.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
                this.$wrapper.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
            }
            catch (e) {
                throw new TypeError('"wrapperSelector" or "contentSelector" props maybe not a valid scroll dom selector.');
            }
        }
    }
    componentDidLoad() {
        this.bindTouchScroll();
        if (this.positionSave) {
            // console.log('回到位置', _scrollTopPosition);
            this.$wrapper.scrollTo(0, _scrollTopPosition);
        }
    }
    render() {
        return (h("div", { class: "pull-to-do" },
            h("div", { class: `${this.dampingLen > this.dampHeight * 0.8 ? 'show' : 'hide'}` },
                h("div", { innerHTML: !this.loading ? this.refreshHTML : this.loadingHTML })),
            h("slot", null),
            h("div", { class: `bottom ${this.dampingLen < -this.dampHeight * 0.8 ? 'show' : 'hide'}` },
                h("div", { innerHTML: !this.loading ? this.moreHTML : this.loadingHTML }))));
    }
    static get is() { return "nb-pull-to-do"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "contentSelector": {
            "type": String,
            "attr": "content-selector"
        },
        "dampHeight": {
            "type": Number,
            "attr": "damp-height"
        },
        "dampingLen": {
            "state": true
        },
        "disable": {
            "type": String,
            "attr": "disable"
        },
        "done": {
            "method": true
        },
        "el": {
            "elementRef": true
        },
        "loading": {
            "state": true
        },
        "loadingHTML": {
            "type": String,
            "attr": "loading-h-t-m-l"
        },
        "moreHTML": {
            "type": String,
            "attr": "more-h-t-m-l"
        },
        "positionSave": {
            "type": Boolean,
            "attr": "position-save"
        },
        "refreshHTML": {
            "type": String,
            "attr": "refresh-h-t-m-l"
        },
        "wrapperSelector": {
            "type": String,
            "attr": "wrapper-selector"
        }
    }; }
    static get events() { return [{
            "name": "refresh",
            "method": "refresh",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "more",
            "method": "more",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".pull-to-do {\n  position: relative;\n}\n.pull-to-do .show,\n.pull-to-do .hide {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  opacity: 1;\n  z-index: 2;\n  -webkit-transition: opacity 0.3s;\n  transition: opacity 0.3s;\n}\n.pull-to-do .hide {\n  opacity: 0;\n  z-index: -1;\n}\n.pull-to-do .bottom {\n  top: auto;\n  bottom: 0;\n}\n.onrefresh,\n.onmore,\n.loading {\n  text-align: center;\n  color: #ccc;\n  background: #f5f5f5;\n  height: 0.8rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n}"; }
}

/**
 * 内置一部分icon，不需要的话可以注释
 */
const IconSvgs = {
    loading: {
        svg: `
    <svg id="loading" viewBox="1 2 30 30">
      <path
        d="M25.8398645,8.20762762 C26.1552348,8.4458118 26.311805,8.85961997 26.2032246,9.26484749 C26.0602828,9.79831359 25.5119459,10.1148961 24.9784798,9.97195427 C24.7421163,9.90862086 24.5483297,9.76570348 24.4182249,9.57975695 C24.3367971,9.50525336 24.2441862,9.4044728 24.1278227,9.28120929 C22.8128468,7.88825905 21.1287293,6.8698644 19.2176,6.35777882 C13.6162059,4.8568898 7.85866785,8.18100594 6.35777882,13.7824 C4.8568898,19.3837941 8.18100594,25.1413322 13.7824,26.6422212 C19.0720434,28.0595768 24.552585,25.1698044 26.3834549,20.0470559 C26.4217667,19.9398599 26.4584077,19.8318805 26.4933625,19.7231406 C26.4990319,19.705504 26.5083828,19.6888457 26.5206271,19.6729547 C26.674803,19.1562347 27.213359,18.8529978 27.7375565,18.9934561 C28.2710226,19.1363979 28.5876051,19.6847349 28.4446633,20.218201 C28.4273975,20.2826378 28.404217,20.3439103 28.3758624,20.4015909 C28.3408271,20.5085506 28.3044602,20.6147442 28.2667853,20.7201581 C26.0984988,26.7869934 19.5977991,30.271005 13.2647619,28.5740728 C6.59643565,26.7873002 2.63915453,19.9330882 4.42592717,13.2647619 C6.21269982,6.59643565 13.0669118,2.63915453 19.7352381,4.42592717 C22.1507323,5.07315691 24.210501,6.38530283 25.7703854,8.11267456 C25.8005232,8.1460484 25.8233552,8.17760934 25.8398645,8.20762762 Z"
        fill="#595959"
      />
    </svg>
    `,
        anim: 'rotate'
    },
    add: {
        svg: `
    <svg id="add" viewBox="0 0 32 32">
      <path d="M15,15 L15,4 C15,3.44771525 15.4477153,3 16,3 C16.5522847,3 17,3.44771525 17,4 L17,15 L28,15 C28.5522847,15 29,15.4477153 29,16 C29,16.5522847 28.5522847,17 28,17 L17,17 L17,28 C17,28.5522847 16.5522847,29 16,29 C15.4477153,29 15,28.5522847 15,28 L15,17 L4,17 C3.44771525,17 3,16.5522847 3,16 C3,15.4477153 3.44771525,15 4,15 L15,15 Z" fill="#595959"></path>
    </svg>
    `
    },
    close: {
        svg: `
    <svg id="close" viewBox="0 0 32 32">
      <path d="M16,14.5857864 L25.1923882,5.39339828 C25.5829124,5.00287399 26.2160774,5.00287399 26.6066017,5.39339828 C26.997126,5.78392257 26.997126,6.41708755 26.6066017,6.80761184 L17.4142136,16 L26.6066017,25.1923882 C26.997126,25.5829124 26.997126,26.2160774 26.6066017,26.6066017 C26.2160774,26.997126 25.5829124,26.997126 25.1923882,26.6066017 L16,17.4142136 L6.80761184,26.6066017 C6.41708755,26.997126 5.78392257,26.997126 5.39339828,26.6066017 C5.00287399,26.2160774 5.00287399,25.5829124 5.39339828,25.1923882 L14.5857864,16 L5.39339828,6.80761184 C5.00287399,6.41708755 5.00287399,5.78392257 5.39339828,5.39339828 C5.78392257,5.00287399 6.41708755,5.00287399 6.80761184,5.39339828 L16,14.5857864 Z" fill="#595959"></path>
    </svg>
    `
    },
    back: {
        svg: `
    <svg id="back" viewBox="0 0 32 32">
      <path d="M20.5857864,16 L9.29289322,4.70710678 C8.90236893,4.31658249 8.90236893,3.68341751 9.29289322,3.29289322 C9.68341751,2.90236893 10.3165825,2.90236893 10.7071068,3.29289322 L22.7071068,15.2928932 C23.0976311,15.6834175 23.0976311,16.3165825 22.7071068,16.7071068 L10.7071068,28.7071068 C10.3165825,29.0976311 9.68341751,29.0976311 9.29289322,28.7071068 C8.90236893,28.3165825 8.90236893,27.6834175 9.29289322,27.2928932 L20.5857864,16 Z" fill="#595959" transform="translate(16.000000, 16.000000) scale(-1, 1) translate(-16.000000, -16.000000)"></path>
    </svg>
    `
    },
    forward: {
        svg: `
    <svg id="forward" viewBox="0 0 32 32">
      <path d="M20.5857864,16 L9.29289322,4.70710678 C8.90236893,4.31658249 8.90236893,3.68341751 9.29289322,3.29289322 C9.68341751,2.90236893 10.3165825,2.90236893 10.7071068,3.29289322 L22.7071068,15.2928932 C23.0976311,15.6834175 23.0976311,16.3165825 22.7071068,16.7071068 L10.7071068,28.7071068 C10.3165825,29.0976311 9.68341751,29.0976311 9.29289322,28.7071068 C8.90236893,28.3165825 8.90236893,27.6834175 9.29289322,27.2928932 L20.5857864,16 Z" fill="#595959""></path>
    </svg>
    `
    }
};
/**
 * svg 图标
 */
class SvgIcon {
    constructor() {
        /**
         * svg 大小
         */
        this.size = 'm';
        /**
         * 加入动画名称
         */
        this.anim = '';
    }
    get animation() {
        return this.anim || (this.type && IconSvgs[this.type])
            ? IconSvgs[this.type].anim
            : '';
    }
    render() {
        return (h("div", { class: `icon ${this.size} ${this.animation}`, innerHTML: this.type && IconSvgs[this.type] ? IconSvgs[this.type].svg : '' },
            h("slot", null)));
    }
    static get is() { return "nb-svg-icon"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "anim": {
            "type": String,
            "attr": "anim"
        },
        "size": {
            "type": String,
            "attr": "size"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get style() { return ".icon {\n  display: inline-block;\n  stroke-width: 0;\n  stroke: currentColor;\n  vertical-align: middle;\n}\n.icon.xs {\n  width: 0.32rem;\n  height: 0.32rem;\n}\n.icon.s {\n  width: 0.453333333333333rem;\n  height: 0.453333333333333rem;\n}\n.icon.m {\n  width: 0.586666666666667rem;\n  height: 0.586666666666667rem;\n}\n.icon.l {\n  width: 0.72rem;\n  height: 0.72rem;\n}\n.icon.xl {\n  width: 0.853333333333333rem;\n  height: 0.853333333333333rem;\n}\n.icon.rotate {\n  -webkit-animation: rotate 1s linear infinite;\n          animation: rotate 1s linear infinite;\n}\n\@-webkit-keyframes rotate {\n  from {\n    -webkit-transform: rotate(0);\n            transform: rotate(0);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\@keyframes rotate {\n  from {\n    -webkit-transform: rotate(0);\n            transform: rotate(0);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}"; }
}

export { Actionsheet as NbActionsheet, Affix as NbAffix, Badge as NbBadge, CodeHighlight as NbCodeHighlight, List as NbList, ListItem as NbListItem, Pagination as NbPagination, Playground as NbPlayground, PullToRefresh as NbPullToDo, SvgIcon as NbSvgIcon };
