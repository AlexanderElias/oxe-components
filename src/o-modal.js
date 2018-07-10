
export default {
	name: 'o-modal',
	methods: {
		cancel: function () {
			if (this.model.cancel && typeof this.model.cancel === 'function') {
				this.model.cancel();
			}
		},
		confirm: function () {
			if (this.model.confirm && typeof this.model.confirm === 'function') {
				this.model.confirm();
			}
		}
	},
	model: {
		title: '',
		message: '',
		cancel: null,
		confirm: null,
	},
	properties: {
		open: {
			enumerable: true,
			value: function (data) {
				this.model.cancel = data.cancel;
				this.model.confirm = data.confirm;
				this.model.title = data.title || '';
				this.model.message = data.message || '';

				if (data.cancel) {
					this.eCancel.classList.add('active');
				}

				if (data.confirm) {
					this.eConfirm.classList.add('active');
				}

				this.classList.add('active');
			}
		},
		close: {
			enumerable: true,
			value: function () {
				this.model.title = '';
				this.model.message = '';
				this.model.cancel = null;
				this.model.confirm = null;
				this.classList.remove('active');
				this.eCancel.classList.remove('active');
				this.eConfirm.classList.remove('active');
			}
		}
	},
	created: function () {
		this.eCancel = this.querySelector('.o-modal-action[o-on-click="cancel"]');
		this.eConfirm = this.querySelector('.o-modal-action[o-on-click="confirm"]');
	},
	style: `
		o-modal {
			top: 0;
			left: 0;
			opacity: 0;
			z-index: -1;
			width: 100%;
    		height: 100%;
			display: flex;
			position: fixed;
			align-items: center;
			justify-content: center;
			background-color: var(--o-modal-background);
		}
		o-modal.active {
			z-index: 1;
			opacity: 1;
		}
		.active .o-modal-body {
			transform: translate(0, 0);
		}
		.o-modal-body {
            width: 30vw;
			padding: 1rem;
            flex: 1 1 auto;
            margin: 0.6rem;
            max-width: 600px;
            border-radius: 3px;
			transform: translate(50%, 50%);
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
			padding: 1rem 0;
		    display: flex;
		    align-items: center;
		    justify-content: right;
		}
		.o-modal-action {
			display: none;
		}
		.o-modal-action.active {
			display: block;
		}
	`,
	template: `
		<div class="o-modal-body">
			<div class="o-modal-title" o-text="title"></div>
			<div class="o-modal-message" o-text="message"></div>
			<div class="o-modal-actions">
				<button class="o-modal-action" o-on-click="cancel">Cancel</button>
				<button class="o-modal-action" o-on-click="confirm">Confirm</button>
			</div>
		</div>
	`
};
