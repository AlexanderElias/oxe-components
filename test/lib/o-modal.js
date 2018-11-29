
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

					var actionContext = {
						close: function () {
							if (closed) return;
							closed = true;
							self.removeChild(body);
							if (self.children.length > 1) return;
							self.classList.remove('active');
						}
					};

					for (var i = 0, l = data.actions.length; i < l; i++) {
						var actionOption = data.actions[i];

						if (typeof actionOption !== 'object') throw new Error('Oxe - Modal invalid action type');
						if (!actionOption.title) throw new Error('Oxe - Modal action title required');

						var actionElement = document.createElement('button');

						if (self.options.action && self.options.action.class) {
							actionElement.className = 'o-modal-action ' + self.options.action.class;
						} else {
							actionElement.className = 'o-modal-action';
						}

						actionElement.onclick = function (context, option) {
							Promise.resolve().then(function () {
								if (typeof option.method === 'function') {
									return option.method.call(context);
								}
							}).then(function () {
								if (option.close === undefined || option.close === true) {
									return context.close();
								}
							}).catch(console.error);
						}.bind(null, actionContext, actionOption);

						actionElement.innerText = actionOption.title;
						actions.appendChild(actionElement);
					}

				}

				self.appendChild(body);
				self.classList.add('active');
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
			padding: 1rem;
			margin: 0.6rem;
			min-width: 300px;
			max-width: 600px;
			position: absolute;
			border-radius: 3px;
			transform: translate(-50%, -50%);
			background-color: var(--o-modal-widget);
			box-shadow: 0 3px 6px var(--o-modal-shadow);
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
