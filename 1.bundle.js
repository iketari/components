webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		'use strict';
		var TemplateEngine = function(html, options) {
		    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
		    var add = function(line, js) {
		        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
		            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
		        return add;
		    }
		    while(match = re.exec(html)) {
		        add(html.slice(cursor, match.index))(match[1], true);
		        cursor = match.index + match[0].length;
		    }
		    add(html.substr(cursor, html.length - cursor));
		    code += 'return r.join("");';
		    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
		}

		return TemplateEngine;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		'use strict';

		class Model {
			constructor(options, data) {
				this.id = options.id || null;
				this.url = this._makeUrl();

				this.data = data || { foo: 'bar' };
			}

			_makeUrl () {
				return 'https://jsru.firebaseio.com/rest/model' + (this.id ? `/${this.id}/` : '/') +'data.json';
			}
		
			save () {
				// 1. Создаём новый объект XMLHttpRequest
				var XHR = (window.XMLHttpRequest && "onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

				var xhr = new XHR();

				// 2. Конфигурируем его
				xhr.open('POST', this.url, true);

				// 3. Отсылаем запрос
				xhr.send(JSON.stringify(this.data));

				xhr.onreadystatechange = function() { // (3)
					if (xhr.readyState != 4) return;

					if (xhr.status != 200) {
						alert(xhr.status + ': ' + xhr.statusText);
					} else {
						this.id = JSON.parse(xhr.responseText).name
						// this.url = this._makeUrl(); 
					}
				}.bind(this);

				return xhr;
			}

			fetch () {

				if (!this.id) {
					return alert('Нечего загружать!')
				}

				// 1. Создаём новый объект XMLHttpRequest
				var XHR = (window.XMLHttpRequest && "onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

				var xhr = new XHR();

				// 2. Конфигурируем его
				xhr.open('GET', this.url, true);

				// 3. Отсылаем запрос
				xhr.send();

				xhr.onreadystatechange = function() { // (3)
					if (xhr.readyState != 4) return;

					if (xhr.status != 200) {
						alert(xhr.status + ': ' + xhr.statusText);
					} else {
						var data = JSON.parse(xhr.responseText);

						if (data[this.id]) {
							this.setData(data[this.id]);
						}
					}
				}.bind(this)

				return xhr;
			}

			setData (data) {
				this.data = data;
			}
		}

		//Export
		return Model;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (TemplateEngine) {

		'use strict';

		class Dropdown {
			constructor (options, data) {
				this.el = options.el;

				this._template = document.getElementById('DropdownTmpl').innerHTML;
				this.data = data;

				this._itemSelectCallbacks = [];
				this._initEvents();
			}

			render () {
				this.el.innerHTML = TemplateEngine(this._template, this.data);
			}
			
			/**
			 * Add classname dropdown_open to element
			 */
			open () {
				this.el.classList.add('dropdown_open');
				setTimeout(() => {
					document.body.addEventListener('click', this._onBodyClick);
				}, 50);
			}

			/**
			 * Remove classname dropdown_open to element
			 */
			close () {
				this.el.classList.remove('dropdown_open');
				document.body.removeEventListener('click', this._onBodyClick);
			}

			/**
			 * Open or close?
			 */
			toggle () {
				if (this.isOpen()) {
					this.close();
				} else {
					this.open();
				}
			}

			/**
			 * Set callback on user select event
			 * @param  {Function} callback
			 */
			onSelect (callback) {
				this._itemSelectCallbacks.push(callback);
			}

			isOpen () {
				return this.el.classList.contains('dropdown_open');
			}

			_initEvents () {
				this._onBodyClick = this.close.bind(this);

				this.el.addEventListener('click', this._onClick.bind(this));
			}

			_onClick (event) {
				if (event.target.classList.contains('dropdown__item')) {
					event.preventDefault();
					this._onItemClick(event);
				} else {
					this.toggle();
				}
			}

			_onItemClick (event) {
				var itemHtml = event.target.innerHTML;
				this.el.querySelector('.js-title').innerHTML = itemHtml;

				this._itemSelectCallbacks.forEach(callback => {
					callback({
						el: this.el,
						item: this,
						text: itemHtml
					});
				});

				this.close();
			}



			//TODO: method addItem
		}

		//EXPORT
		return Dropdown;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
]);