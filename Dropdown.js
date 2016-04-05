(function () {
	'use strict';

	class Dropdown {
		constructor (options) {
			this.el = options.el;

			this._itemSelectCallbacks = [];
			this._initEvents();
		}
		
		/**
		 * Add classname dropdown_open to element
		 */
		open () {
			this.el.classList.add('dropdown_open');
		}

		/**
		 * Remove classname dropdown_open to element
		 */
		close () {
			this.el.classList.remove('dropdown_open');
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
	window.Dropdown = Dropdown;

})();