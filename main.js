(function () {
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

	window.TemplateEngine = TemplateEngine;
})();

(function () {
	'use strict';
	//Use our component
	let els = document.querySelectorAll('.js-dropdown'),
		instances = [];

	[1,2,3,4].forEach(num => {
		let dropdown = new Dropdown({
			el: document.createElement('div'),
			template: 'DropdownTmpl'
		}, {
			title: `My ${num} title`,
			items: [
				'first',
				'second'
			]
		});

		document.body.appendChild(dropdown.el);
		dropdown.render();
	})

})();