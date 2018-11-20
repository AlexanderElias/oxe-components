
export default {
	name: 'o-toast',
	properties: {
		time: {
			enumerable: true,
			configurable: true,
			get: function () {
				return this._time || 3000;
			},
			set: function () {
				return this._time = (arguments[0] || 3000);
			}
		},
		open: {
			enumerable: true,
			value: function (data) {
				var self = this;
				var toast = document.createElement('div');
				var title = document.createElement('div');
				var message = document.createElement('div');

				toast.setAttribute('class', 'o-toast');
				title.setAttribute('class', 'o-toast-title');
				message.setAttribute('class', 'o-toast-message');

				title.innerText = data.title || '';
				message.innerText = data.message || '';

				toast.appendChild(title);
				toast.appendChild(message);

				if (data.type || data.code) {
					var code = data.code;
					var type = data.type || data.code;

					if (typeof type === 'number') {
						if (code >= 200 && code < 300 || code == 304) {
							type = 'success';
						} else {
							type = 'error';
						}
					}

					toast.style.setProperty('background-color', `var(--o-toast-${type})`);
				}

				self.appendChild(toast);
				self.classList.add('active');

				var e = toast.addEventListener('transitionend', function () {
					setTimeout(function () {

						var e = toast.addEventListener('transitionend', function () {
							self.removeChild(toast);
							self.classList.remove('active');
							toast.removeEventListener('transitionend', e);
						});

						toast.classList.remove('active');
					}, self.time);

					toast.removeEventListener('transitionend', e);
				});

				window.requestAnimationFrame(function () {
					window.requestAnimationFrame(function () {
						toast.classList.add('active');
					});
				});

			}
		}
	},
	style: `
		:host {
			top: 0;
			right: 0;
			z-index: 0;
			display: flex;
			flex: 1 1 100%;
			position: fixed;
			padding-top: 55px;
			height: calc(100vh - 55px);
			flex-direction: column-reverse;
		}
		:host > .o-toast {
			margin: 3px;
		}
		:host.active {
			z-index: 2;
		}
		.o-toast {
            width: 30vw;
			padding: 1rem;
            min-width: 150px;
            max-width: 300px;
			border-radius: 3px;
			transform: translateX(100%);
			background-color: var(--o-toast-widget);
			box-shadow: 0 3px 6px var(--o-toast-shadow);
            transition: transform var(--o-toast-transition);
		}
		.o-toast-title {
			font-weight: bolder;
			color: var(--o-toast-color);
		}
		.o-toast-message {
			color: var(--o-toast-color);
		}
		.o-toast.active {
			transform: translateX(0);
		}
	`
};
