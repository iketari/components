'use strict';

import './menu.css'
import template from './menu.jade'

export default class Menu {
  constructor(opts) {
    console.time('Handlebars set menu');
    this._template = template;
    console.timeEnd('Handlebars set menu');

    this.el = document.createElement('div');

    this.setData(opts.data || {title: '', items: []});
    this._initEvents();
  }

  render() {
    this.el.innerHTML = this._template(this.data);
  }

  setData(data) {
    this.data = data;
  }

  removeItem(item) {
    let index = parseInt(item.parentNode.dataset.index, 10);

    this.trigger('remove', {
      index
    });
  }

  pickItem(item) {
    this.trigger('pick', {
      href: item.getAttribute('href'),
      anchor: item.textContent
    });
  }

  trigger(name, data) {
    let widgetEvent = new CustomEvent(name, {
        bubbles: true,
        detail: data
      });

    this.el.dispatchEvent(widgetEvent);
  }

  _initEvents() {
    this.el.addEventListener('click', this._onClick.bind(this));
  }

  _onClick(event) {
    event.preventDefault();
    let item = event.target;

    switch (item.dataset.action) {
      case 'remove':
        this.removeItem(item);
        break;

      case 'pick':
        this.pickItem(item);
        break;
    }
  }


}
