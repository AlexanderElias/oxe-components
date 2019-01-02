/*
	Name: oxe-components
	Version: 1.12.1
	License: MPL-2.0
	Author: Alexander Elias
	Email: undefined
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

export default {
	name: 'o-modal',
	properties: {
		options: {
			enumerable: true,
			value: {}
		},
		open: {
			enumerable: true,
			value: function (data) {
				var self = this;
				return new Promise(function (resolve) {
					var closed = false;
					var body = document.createElement('div');
					var title = document.createElement('div');
					var message = document.createElement('div');
					var actions = document.createElement('div');

					body.setAttribute('class', 'o-modal-body');
					title.setAttribute('class', 'o-modal-title');
					message.setAttribute('class', 'o-modal-message');
					actions.setAttribute('class', 'o-modal-actions');

					body.appendChild(title);
					body.appendChild(message);
					body.appendChild(actions);

					title.innerText = data.title || '';
					message.innerText = data.message || '';

					if (data.actions) {
						var actionItems = typeof data.actions === 'string' ? data.actions.split(/\s*,\s*/) : data.actions;

						var close = function () {
							return new Promise(function (r) {
								if (closed) return r();
								closed = true;
								body.classList.remove('active');
								body.addEventListener('transitionend', function l (event) {
									self.removeChild(body);
									if (self.children.length > 1) return r();
									self.classList.remove('active');
									self.addEventListener('transitionend', function l (event) {
										r();
										self.removeEventListener('transitionend', l);
									});
									body.removeEventListener('transitionend', l);
								});
							});
						};

						for (var i = 0, l = actionItems.length; i < l; i++) {
							var actionOption = actionItems[i];

							if (typeof actionOption !== 'object') actionOption = { title: actionOption };
							if (typeof actionOption.title !== 'string') throw new Error('o-modal action title required');

							var actionElement = document.createElement('button');

							if (self.options.action && self.options.action.class) {
								actionElement.className = 'o-modal-action ' + self.options.action.class;
							} else {
								actionElement.className = 'o-modal-action';
							}

							actionElement.onclick = function (title) {
								if (data.close === undefined || data.close === true) close();
								resolve({ title: title, close: close });
							}.bind(null, actionOption.title);

							actionElement.innerText = actionOption.title;
							actions.appendChild(actionElement);
						}

					}

					self.appendChild(body);
					self.classList.add('active');
					body.classList.add('active');
				});
			}
		}
	},
	style: `
		:host {
			top: 0;
			left: 0;
			z-index: 3;
			opacity: 0;
			width: 100%;
			height: 100%;
			position: fixed;
			pointer-events: none;
			background-color: var(--o-modal-background);
			transition: opacity var(--o-modal-transition);
		}
		:host.active {
			opacity: 1;
			z-index: 1000;
			pointer-events: initial;
		}
		.o-modal-body {
			top: 50%;
			left: 50%;
			opacity: 0;
			padding: 1rem;
			margin: 0.6rem;
			min-width: 300px;
			max-width: 600px;
			position: absolute;
			border-radius: 3px;
			transform: translate(-50%, -50%);
			background-color: var(--o-modal-widget);
			box-shadow: 0 3px 6px var(--o-modal-shadow);
			transition: opacity var(--o-modal-transition);
		}
		.o-modal-body.active {
			opacity: 1;
		}
		.o-modal-title {
			padding: 1rem 0;
			font-weight: 300;
			font-size: 1.3rem;
			color: currentColor;
			word-break: break-word;
			letter-spacing: 0.12rem;
			text-transform: capitalize;
		}
		.o-modal-message {
			padding: 1rem 0;
			color: currentColor;
		}
		.o-modal-actions {
			display: flex;
			flex-warp: wrap;
			padding: 1rem 0;
			flex-direction: row;
			justify-content: flex-end;
		}
		.o-modal-action {
			margin: 0.3rem;
		}
	`
};
