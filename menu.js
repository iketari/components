(function () {
	'use strict';

	class Menu {
		constructor(options) {
			this.el = options.el;
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
		 * Set callback on user select event
		 * @param  {Function} callback
		 */
		onSelect (callback) {
			callback();
		}

		//TODO: method addItem
	}


	//Use our component
	window.menu = new Menu({
		el: document.querySelector('.js-dropdown')
	});
})();