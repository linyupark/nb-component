import { h } from '../nb-component.core.js';

class Actionsheet {
    constructor() {
        this.scrollTop = 0;
        this.visible = false;
        this.headTitle = '标题';
        this.mask = true;
        this.onClose = () => {
            this.close();
        };
    }
    getScrollTop() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }
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
    close() {
        this.visible = false;
    }
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
    static get style() { return ".actionsheet{position:fixed;z-index:1;bottom:0;background:#fff;width:10rem;-webkit-transition:-webkit-transform .1s linear;transition:-webkit-transform .1s linear;transition:transform .1s linear;transition:transform .1s linear,-webkit-transform .1s linear;-webkit-transform:translateY(100%);transform:translateY(100%)}.actionsheet.visible{z-index:999;-webkit-transform:translateY(0);transform:translateY(0)}.actionsheet .container .header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:1.173333333333333rem;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:relative;border-bottom:1px solid #ebebeb}.actionsheet .container .header .close{position:absolute;left:.4rem;top:.4rem;width:.37333333333333335rem;height:.37333333333333335rem}.actionsheet .container .header .title{font-size:.4266666666666667rem;color:#202020}.actionsheet .container .header .icon-close{width:.4266666666666667rem;height:.4266666666666667rem;position:absolute;right:.4rem;display:inline-block;stroke-width:0;stroke:currentColor;vertical-align:middle}.mask{position:fixed;top:0;width:10rem;height:100vh;background:rgba(0,0,0,.6);z-index:-1;opacity:0;-webkit-transition:opacity .1s linear;transition:opacity .1s linear}.mask.visible{z-index:1;opacity:1}"; }
}

class Affix {
    constructor() {
        this.toTarget = () => document;
    }
    onCurrentPageChange(isFixed) {
        this.change.emit({
            isFixed
        });
    }
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
                this.toTarget().addEventListener('scroll', this.handleFix.bind(this), false);
            }, 100);
        }
        catch (e) {
            throw new TypeError('"toTarget" props maybe not a valid scroll dom.');
        }
    }
    async componentDidUnload() {
        this.toTarget().removeEventListener('scroll', this.handleFix.bind(this), false);
    }
    render() {
        return (h("div", { class: `${this.fixed ? 'fixed' : 'nofixed'}`, style: {
                top: this.fixed ? `${this.offset}px` : 'auto'
            } },
            h("slot", null)));
    }
    static get is() { return "nb-affix"; }
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
        "toTarget": {
            "type": "Any",
            "attr": "to-target"
        }
    }; }
    static get events() { return [{
            "name": "change",
            "method": "change",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".nofixed{position:relative}.fixed{position:fixed}"; }
}

class Badge {
    constructor() {
        this.maxCount = 99;
        this.dot = false;
        this.showZero = false;
        this.bgColor = '#FB5B4C';
    }
    get dotCountClassNames() {
        let classNames = [];
        if (this.showZero)
            classNames.push('visible');
        if (this.dot)
            classNames.push('dot');
        if (!this.dot)
            classNames.push('count');
        if (!this.showZero && this.count === 0)
            classNames.push('hidden');
        return classNames.join(' ');
    }
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
    static get style() { return ".badge{position:relative;display:inline-block}.badge .count,.badge .dot{position:absolute;border:1px solid #fff;font-style:normal;text-align:center}.badge .count.hidden,.badge .dot.hidden{display:none}.badge .count{font-size:.26666666666666666rem;color:#fff;height:.3466666666666667rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding:0 .09333333333333334rem;border-radius:.3466666666666667rem;top:-.17333333333333334rem;right:-.17333333333333334rem}.badge .dot{width:.16rem;height:.16rem;border-radius:50%;top:-.08rem;right:-.08rem}"; }
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
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

if (module.exports) {
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
        this.code = '';
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
    static get style() { return "code[class*=language-],pre[class*=language-]{color:#000;background:none;text-shadow:0 1px #fff;font-family:Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-]::selection,code[class*=language-] ::selection,pre[class*=language-]::selection,pre[class*=language-] ::selection{text-shadow:none;background:#b3d4fc}\@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.token.punctuation{color:#999}.namespace{opacity:.7}.token.boolean,.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag{color:#905}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#690}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url{color:#9a6e3a;background:hsla(0,0%,100%,.5)}.token.atrule,.token.attr-value,.token.keyword{color:#07a}.token.class-name,.token.function{color:#dd4a68}.token.important,.token.regex,.token.variable{color:#e90}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}"; }
}

var Icon = {
    prev: (h("svg", { viewBox: "64 64 896 896", "data-icon": "left", width: "1em", height: "1em", fill: "currentColor" },
        h("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" }))),
    next: (h("svg", { viewBox: "64 64 896 896", "data-icon": "right", width: "1em", height: "1em", fill: "currentColor" },
        h("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })))
};

class Pagination {
    constructor() {
        this.current = 1;
        this.pagesize = 10;
        this.total = 0;
        this.autoHide = true;
        this.limitPage = 4;
    }
    onCurrentPageChange(to, from) {
        this.change.emit({
            to, from
        });
    }
    get totalPages() {
        return Math.ceil(this.total / this.pagesize);
    }
    get hasPrev() {
        return this.current != 1;
    }
    get hasNext() {
        return this.totalPages > this.current;
    }
    get showPagination() {
        return this.totalPages > 1 || !this.autoHide;
    }
    get numberPageList() {
        let list = [];
        const leftOffset = this.current - this.limitPage / 2;
        const leftStartAt = leftOffset < 1 ? 1 : leftOffset;
        const rightOffset = this.current + this.limitPage / 2;
        const rightEndAt = rightOffset > this.totalPages ? this.totalPages : rightOffset;
        for (let n = leftStartAt; n <= rightEndAt; n++) {
            list.push(n);
        }
        const prefixSpan = list[0] - 1;
        if (prefixSpan >= 2) {
            list.unshift('<<');
        }
        if (prefixSpan >= 1) {
            list.unshift(1);
        }
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
    static get style() { return ".pagination ul{font-size:14px;line-height:1.5;margin:0;padding:0;list-style:none}.pagination ul li{cursor:pointer;min-width:32px;height:32px;line-height:32px;display:inline-block;outline:none;position:relative;margin-right:8px}.pagination ul li.disabled{cursor:not-allowed}.pagination ul li.disabled,.pagination ul li.disabled a:hover{border-color:#d9d9d9;color:rgba(0,0,0,.25)}.pagination ul li .ellipsis{position:absolute;display:block;letter-spacing:2px;color:rgba(0,0,0,.25);text-align:center;top:12px;margin:auto}.pagination ul li a{border:1px solid #d9d9d9;background-color:#fff;border-radius:4px;display:block;-webkit-transition:all .3s;transition:all .3s;font-size:12px;height:100%;text-align:center}.pagination ul li a.active,.pagination ul li a:hover{border-color:#1890ff;color:#1890ff}"; }
}

let refTarget;
const boxStyles = {
    border: '1px solid #eee',
    width: '30px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    background: '#eee'
};
var Examples = {
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
    'nb-affix': [
        h("div", { class: "wrapper", ref: ev => (refTarget = ev), style: {
                height: '30vh',
                overflow: 'auto'
            } },
            h("div", { style: {
                    height: '1000px',
                    overflowX: 'hidden'
                } },
                h("br", null),
                h("nb-affix", { onChange: ({ detail }) => {
                        const target = document.querySelector('.affix-content');
                        const wrapper = document.querySelector('.wrapper > div');
                        if (detail.isFixed) {
                            target.classList.add('fixed');
                            wrapper.style.paddingTop = '64px';
                        }
                        else {
                            target.classList.remove('fixed');
                            wrapper.style.paddingTop = '20px';
                        }
                    }, offset: 0, toTarget: () => refTarget },
                    h("div", { class: "affix-content" },
                        h("div", { class: "item" }, "\u4E8C\u7EF4\u7801"),
                        h("div", { class: "item" }, "\u5173\u7CFB\u9884\u7EA6"),
                        h("div", { class: "item" }, "\u9A7E\u9A76\u8231"),
                        h("div", { class: "item" }, "\u4EA7\u54C1\u4E2D\u5FC3"))))),
        h("div", { class: "lang" }, "Stylus"),
        h("nb-code-highlight", { code: `
      .affix-content {
        display: flex;
        align-items: center;
        justify-content: space-around;
        left: 0;
        width: 100%;
        height: 88px;
        background: linear-gradient(187deg, rgba(109, 201, 254, 1) 0%, rgba(59, 152, 252, 1) 100%);
        box-shadow: 0px 6px 12px 0px rgba(204, 204, 204, 1);
        border-radius: 8px;
        transition: height .3s;
  
        .item {
          color: #fff;
        }
  
        &.fixed {
          width: 100vw;
          height: 44px;
          left: 0;
        }
      }
      `, lang: "css" }),
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
    'nb-pagination': [
        h("div", { class: "wrapper" },
            h("p", { id: "page-to" }, "\u00A0"),
            h("nb-pagination", { current: 1, pagesize: 10, total: 100, onChange: ({ detail }) => (document.querySelector('#page-to').innerHTML = `触发转到第${detail.to}页`) })),
        h("div", { class: "lang" }, "React"),
        h("nb-code-highlight", { code: `
  <p id="page-to">&nbsp;</p>
  <nb-pagination
    current={1}
    pagesize={10}
    total={100}
    onChange={({ detail }) =>
      document.querySelector('#page-to').innerHTML = \`触发转到第$\{
        detail.to
      \}页\`;
    }
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
    'nb-actionsheet': [
        h("nb-actionsheet", { headTitle: "\u9762\u677F\u6807\u9898", mask: true, ref: ev => (refTarget = ev) },
            h("div", { slot: "container" },
                h("ul", null,
                    h("li", null, "\u9009\u98791")))),
        h("div", { class: "wrapper" },
            h("button", { onClick: () => refTarget.show() }, "\u6253\u5F00\u9762\u677F")),
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

class Playground {
    constructor() {
        this.h5 = false;
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
            }
        ];
        this.demo = this.demoList[0];
    }
    componentWillLoad() {
        const hash = location.hash.split('#');
        const search = location.search;
        if (hash.length > 1) {
            this.tag = hash[1];
            this.demo = this.demoList.filter(demo => {
                return demo.tag === this.tag;
            })[0];
            console.log('渲染', this.tag, this.demo);
        }
        else {
            this.tag = '';
        }
        this.h5 = !!~search.search('mobile');
        if (this.h5 && this.tag !== '') {
            this.el.ownerDocument.documentElement.style.fontSize = '37.5px';
        }
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
                h("iframe", { scrolling: "no", class: this.demo.mobile ? 'mobile' : '', src: `./?${this.demo.mobile ? 'mobile' : ''}${Date.now()}#${this.demo.tag}` })))) : (h("div", { class: this.demo.mobile ? 'example mobile' : 'example' }, Examples[this.tag]));
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
    static get style() { return ".site{color:#444;padding:20px}.site h2{font-size:20px;height:40px;line-height:40px;margin:0 0 30px 0}.site h2 small{font-size:12px;color:#999;margin-left:20px}.site a{color:#3779ff;text-decoration:none}.site ul{list-style:none;margin:0;padding:0;width:120px;font-size:14px;float:left}.site ul li{padding:5px 10px 5px 0;margin:0 10px 10px 0;border-right:1px solid #fff}.site ul li.active{border-right:1px solid #3779ff}.site .content{float:left;margin-left:30px}.site .content iframe{width:600px;height:calc(100vh - 120px);display:block;border:1px solid #eee;float:left;background:#fff}.site .content iframe.mobile{width:375px}.example{font-size:16px;position:absolute;top:0;left:0;width:100%;height:100vh;overflow-y:scroll}.example::-webkit-scrollbar{width:1px}.example::-webkit-scrollbar-thumb{background-color:#3779ff}.example .wrapper{padding:20px;overflow-x:hidden}.example .wrapper .affix-content,.example .wrapper .affix-content2{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;left:0;width:100%;height:88px;background:-webkit-linear-gradient(263deg,#6dc9fe,#3b98fc);background:linear-gradient(187deg,#6dc9fe,#3b98fc);-webkit-box-shadow:0 6px 12px 0 #ccc;box-shadow:0 6px 12px 0 #ccc;border-radius:8px;-webkit-transition:height .3s;transition:height .3s}.example .wrapper .affix-content2 .item,.example .wrapper .affix-content .item{color:#fff}.example .wrapper .affix-content2.fixed,.example .wrapper .affix-content.fixed{width:100vw;height:44px;left:0}.example .lang{background:#ccc;padding:5px}.example pre{font-size:12px;background:#f5f5f5;padding:0;margin:0;overflow:hidden}.example pre code{white-space:pre-wrap;-moz-tab-size:2;-o-tab-size:2;tab-size:2}.example.mobile{font-size:.37333333333333335rem}.example.mobile pre{font-size:.32rem}"; }
}

class PullToRefresh {
    constructor() {
        this.refreshHTML = '<div class="onrefresh">刷新内容</div>';
        this.moreHTML = '<div class="onmore">加载更多</div>';
        this.loadingHTML = '<div class="loading">loading</div>';
        this.dampHeight = 30;
        this.dampingLen = 0;
        this.loading = false;
    }
    done() {
        this.$content.style.transform = `translateY(0px)`;
        this.dampingLen = 0;
        this.loading = false;
    }
    get pullLength() {
        return this.movePageY - this.startPageY;
    }
    getScrollTop() {
        return this.$wrapper.scrollTop;
    }
    getWrapperScrollTop() {
        return this.$wrapper.scrollHeight - this.$wrapper.clientHeight;
    }
    recordStartDampLen() {
        if (this.startDampLen)
            return;
        if ((this.getScrollTop() === 0 && this.pullLength > 0) ||
            (this.getScrollTop() === this.getWrapperScrollTop() &&
                this.pullLength < 0)) {
            this.startDampLen = this.pullLength;
        }
    }
    handleTouchStart(ev) {
        this.startPageY = ev.touches[0].pageY;
    }
    handleTouchMove(ev) {
        this.movePageY = ev.touches[0].pageY;
        if (this.loading)
            return;
        this.recordStartDampLen();
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
            this.loading = true;
        }
        this.dampingLen > 3 && this.refresh.emit();
        this.dampingLen < -3 && this.more.emit();
    }
    bindTouchScroll(bind = true) {
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
    static get style() { return ".pull-to-do{position:relative}.pull-to-do .hide,.pull-to-do .show{position:absolute;width:100%;top:0;opacity:1;z-index:2;-webkit-transition:opacity .3s;transition:opacity .3s}.pull-to-do .hide{opacity:0;z-index:-1}.pull-to-do .bottom{top:auto;bottom:0}.loading,.onmore,.onrefresh{text-align:center;color:#ccc;background:#f5f5f5;height:.8rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}"; }
}

export { Actionsheet as NbActionsheet, Affix as NbAffix, Badge as NbBadge, CodeHighlight as NbCodeHighlight, Pagination as NbPagination, Playground as NbPlayground, PullToRefresh as NbPullToDo };
