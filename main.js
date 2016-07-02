require(['./template', './model', './Dropdown'], 
function (TemplateEngine, Model, Dropdown) {
	'use strict';
	//Use our component
	let els = document.querySelectorAll('.js-dropdown'),
		instances = [];

	[1,2,3,4].forEach(num => {
		let dropdown = new Dropdown({
			el: document.createElement('div')
		}, {
			title: `My ${num} title`,
			items: [
				'first',
				'second'
			]
		});

		document.body.appendChild(dropdown.el);
		dropdown.render();
	});


	let myModel = new Model({}, {
		someStr: '123'
	});
	console.log('set: ', myModel.data, myModel.id);

	myModel.save();
	console.log('saved: ', myModel.data, myModel.id);

	myModel.fetch();
	console.log('fetched: ', myModel.data, myModel.id);



});



