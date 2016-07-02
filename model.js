define(function () {
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
})