
export default {
	name: 'o-toast',
	model: {
		code: '',
		type: '',
		title: '',
		message: '',
		details: ''
	},
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
		show: {
			enumerable: true,
			value: function (data) {
				var self = this;

				self.model.code = data.code;
				self.model.type = data.type;
				self.model.title = data.title || '';
				self.model.message = data.message || '';
				self.model.details = data.details || '';

				if (self.model.type || self.model.code) {
					var type = self.model.type || self.model.code;

					if (typeof type === 'number') {
						if (self.model.code >= 200 && self.model.code < 300 || self.model.code == 304) {
							type = 'success';
						} else {
							type = 'error';
						}
					}

					self.eToast.style.setProperty('background-color', `var(--o-toast-${type})`);
				}

				self.eToast.classList.add('active');

				setTimeout(function () {
					self.eToast.classList.remove('active');
				}, self.time);

			}
		}
	},
	created: function () {
		this.eToast = this.querySelector('.o-toast');
	},
	style: `
		.o-toast {
			right: 0;
			bottom: 0;
			width: 300px;
			padding: 1rem;
			position: fixed;
			border-radius: 1px;
			transform: translate(100%, -60%);
			background-color: var(--o-toast-widget);
			box-shadow: 0 3px 9px var(--o-toast-shadow);
		}
		.o-toast-title {
			color: var(--o-toast-font);
			font-weight: bolder;
		}
		.o-toast-message {
			color: var(--o-toast-font);
		}
		.o-toast.active {
			transform: translate(-10%, -60%);
		}
	`,
	template: `
		<div class="o-toast">
			<div class="o-toast-title" o-text="title"></div>
			<div class="o-toast-message" o-text="message"></div>
		</div>
	`
};
