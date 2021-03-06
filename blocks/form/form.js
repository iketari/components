'use strict';

import template from './form.jade'

export default class Form {
  constructor(opts) {
    console.time('Handlebars set form');
    this._template = template;
    console.timeEnd('Handlebars set form');

    this.el = document.createElement('div');

    this.setData(opts.data);
    this._initEvents();
  }

  render() {
    this.el.innerHTML = this._template(this.data);

    this.formEl = this.el.querySelector('.js-form');
    this.btnEl = this.el.querySelector('.js-button');
  }

  setData(data) {
    this.data = data;
  }

  toggle() {
    this.formEl.classList.toggle('hidden');
    this.btnEl.classList.toggle('hidden');
  }

  getField(name) {
    return this.el.querySelector(`[name="${name}"]`);
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
    this.el.addEventListener('submit', this._onSubmit.bind(this));
  }

  _onClick(event) {
    let item = event.target;

    switch (item.dataset.action) {
      case 'show':
        this.toggle();
        break;
    }
  }

  _onSubmit(event) {
    event.preventDefault();

    this.trigger('add', {
      href: this.getField('href').value,
      anchor: this.getField('anchor').value
    });

    this.toggle();
    event.target.reset();
  }


}
