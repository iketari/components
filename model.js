"use strict";

  const XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  const HOST = 'https://javascriptru.firebaseio.com';

  export default class Model {
    constructor(opts, data) {
      this._resource = opts.resource;
      this._key = opts.key;

      this.setData(data)
    }

    setData(data) {
      this.data = data;
    }

    getData() {
      return this.data;
    }

    setKey(key) {
      alert('New key set: ' +  key);
      this._key = key;
    }

    fetch(done, fail) {
      this._request('GET', null, (xhr) => {
        this.setData(JSON.parse(xhr.responseText));
        done && done(this, xhr);
      }, fail);
    }

    save(done, fail) {
      let method = this._key ? 'PUT' : 'POST';

      this._request(method, this.data, (xhr) => {
        if (method === 'POST') {
          this.setKey(JSON.parse(xhr.responseText).name);
        } else if (method === 'PUT') {
          this.setData(JSON.parse(xhr.responseText));
        }

        done && done(this, xhr, method);
      }, fail);
    }

    _getUrl() {
      let url = `${HOST}/${this._resource}`;

      if (this._key) {
        url += `/${this._key}`;
      }

      return `${url}.json`;
    }

    _request(method, data, callback, errback) {
      let xhr = new XHR(),
          model = this;

      xhr.open(method, this._getUrl(), true);
      xhr.onload = function (event) {
        callback.call(this, this, event, model);
      };
      xhr.onerror = function (event) {
        //TODO: Do smth on errors
      };

      xhr.send(JSON.stringify(data || {}));
    }
  }
