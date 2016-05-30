"use strict";

import './libs/css/pure-min.css';

import Model from './model.js'
import Form from './blocks/form/form.js'
import Menu from './blocks/menu/menu.js'

const APP_EL = document.querySelector('.app'),
      DATA_KEY = '-KIIIl-A1w7peqCRVZ0R';

let menu = new Menu({
  tmpl: '#menu'
});

let form = new Form({
  tmpl: '#form'
});

let model = new Model({
  resource: 'menu',
  key: DATA_KEY
});

form.render();

APP_EL.appendChild(menu.el);
APP_EL.appendChild(form.el);

form.el.addEventListener('add', event => {
  let data = model.getData();
  data.items.push(event.detail);
  model.save(() => {
    menu.setData(model.getData());
    menu.render();
  });
});

menu.el.addEventListener('remove', event => {
  //TODO: seems like part of model
  let data = model.getData();
  data.items.splice(event.detail.index, 1);
  model.setData(data);

  model.save(() => {
    menu.setData(model.getData());
    menu.render();
  });
});

//TODO: create smth smarter
menu.el.addEventListener('pick', event => {
  let faviconer = document.querySelector('.faviconer'),
      img = document.createElement('img');

  img.onload = () => {
    faviconer.appendChild(img);
  }
  img.src = `${event.detail.href}/favicon.ico`;
});


// Load data
model.fetch(() => {
  menu.setData(model.getData());
  menu.render();
});
