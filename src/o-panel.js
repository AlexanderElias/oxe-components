
export default {
	name: 'o-panel',
	properties: {
		getNotifications: {
			value: function () {
				var data = window.localStorage.getItem('notifications');
				return JSON.parse(data || '[]');
			}
		},
		setNotifications: {
			value: function (data) {
				data = JSON.stringify(data || []);
				window.localStorage.setItem('notifications', data);
			}
		},
		notify: {
			value: function (data, flag) {
				var notification = document.createElement('div');
				var details = document.createElement('div');
				var message = document.createElement('div');
				var title = document.createElement('div');

				notification.setAttribute('class', 'notification');
				title.setAttribute('class', 'notification-title');
				message.setAttribute('class', 'notification-message');
				details.setAttribute('class', 'notification-details');

				title.innerText = data.title || '';
				message.innerText = data.message || '';
				details.innerText = data.details || '';

				notification.appendChild(title);
				notification.appendChild(message);
				notification.appendChild(details);

				var tray = this.querySelector('.tray-body');
				tray.appendChild(notification);

				if (flag) return;

				var notifications = this.getNotifications();
				notifications.push(data);
				this.setNotifications(notifications);
			}
		},
		clear: {
			value: function (data) {
				var tray = this.querySelector('.tray-body');

				while (tray.lastElementChild) {
					tray.removeChild(tray.lastElementChild);
				}

				this.setNotifications([]);
			}
		},
		setup: {
			value: function () {
				var notifications = this.getNotifications();
				for (var notification of notifications) {
					this.notify(notification, true);
				}
			}
		}
	},
	created: function () {
		var self = this;

		var menuIcon = self.querySelector('.menu-icon');
		var menuContainer = self.querySelector('.menu-container');

		var trayIcon = self.querySelector('.tray-icon');
		var trayBody = self.querySelector('.tray-body');
		var trayClear = self.querySelector('.tray-clear');
		var trayContainer = self.querySelector('.tray-container');

		menuIcon.addEventListener('click', function () {
			menuIcon.classList.toggle('active');
			menuContainer.classList.toggle('active');
		});

		trayIcon.addEventListener('click', function () {
			trayIcon.classList.toggle('active');
			trayContainer.classList.toggle('active');
		});

		trayClear.addEventListener('click', function () {
			self.clear();
		});

		self.setup();
	},
	template: `
		<style>
			o-panel {
				--o-panel-icon: #000;
				--o-panel-widget: #999;
				--o-panel-hover: rgba(0, 0, 0, 0.1);
				--o-panel-shadow: rgba(0, 0, 0, 0.1);
				--o-panel-translate: 150ms ease-in-out;
			}
			o-panel div {
				box-sizing: border-box;
				transition: transform var(--o-panel-translate);
			}
			.bar-container {
				top: 0;
				left: 0;
				z-index: 1;
				width: 100%;
				display: flex;
				position: fixed;
				align-items: center;
				background-color: var(--o-panel-widget);
				box-shadow: 0 3px 9px var(--o-panel-shadow);
			}
			.bar-title {
				flex: 1 1;
				margin: 0 1rem;
				font-size: 3rem;
				text-align: center;
				text-transform: uppercase;
			}

			.menu-icon {
				margin: 3px;
				width: 48px;
				height: 48px;
				cursor: pointer;
				position: relative;
			}
			.menu-icon > div {
				height: 3px;
				position: absolute;
				width: calc(100% - 6px);
				transform-origin: 50% 50%;
				background-color: var(--o-panel-icon);
			}

			.menu-icon > div:nth-child(1) {
				transform: translate(3px, 9px);
			}
			.menu-icon > div:nth-child(2) {
				transform: translate(3px, calc(24px - (3px/2)) );
			}
			.menu-icon > div:nth-child(3) {
				transform: translate(3px, calc(48px - (9px + 3px)) );
			}

			.menu-icon.active > div:nth-child(1) {
				transform:
					rotate(45deg)
					translate(17px, 13px);
			}
			.menu-icon.active > div:nth-child(2) {
				transform:
					rotate(45deg)
					translate(17px, 13px);
			}
			.menu-icon.active > div:nth-child(3) {
				transform:
					rotate(-45deg)
					translate(-13px, 17px);
			}

			.menu-container {
				top: 0;
				left: 0;
				z-index: 0;
				height: 100vh;
				display: flex;
				position: fixed;
				flex-flow: column;
				padding-top: 54px;
				transform: translate(-100%, 0);
				background-color: var(--o-panel-widget);
				box-shadow: 3px 0 9px var(--o-panel-shadow);
			}
			.menu-container.active {
				transform: translate(0, 0);
			}

			.tray-icon {
				margin: 3px;
				width: 48px;
				height: 48px;
				padding: 9px;
				cursor: pointer;
			}
			.tray-icon > svg {
				fill: var(--o-panel-icon);
			}

			.tray-container {
				top: 0;
				right: 0;
				z-index: 0;
				height: 100vh;
				display: flex;
				position: fixed;
				flex-flow: column;
				padding-top: 48px;
				transform: translate(100%, 0);
				background-color: var(--o-panel-widget);
				box-shadow: -3px 0 9px var(--o-panel-shadow);
			}
			.tray-container.active {
				transform: translate(0, 0);
			}

			[slot=menu-body],
			.tray-body {
				overflow-y: auto;
				height: calc(100% - 48px);
				justify-content: flex-start;
			}
			[slot=menu-foot],
			.tray-foot {
				justify-content: flex-end;
			}
			[slot=menu-body],
			[slot=menu-foot],
			.tray-body,
			.tray-foot {
				flex: 1 0 auto;
				display: flex;
				flex-direction: column;
			}
			[slot=menu-body] > *,
			[slot=menu-foot] > *,
			.tray-body > *,
			.tray-foot > * {
				all: unset;
				display: flex;
				cursor: pointer;
				color: var(--o-panel-icon);
				text-align: center;
				padding: 1rem 1.5rem;
				background-color: transparent;
			}
			[slot=menu-body] > a:hover,
			[slot=menu-foot] > a:hover,
			[slot=menu-body] > button:hover,
			[slot=menu-foot] > button:hover,
			.tray-body > a:hover,
			.tray-foot > a:hover,
			.tray-body > button:hover,
			.tray-foot > button:hover {
				background-color: var(--o-panel-hover);
			}

			.notification {
				width: 300px;
			    max-width: 60vw;
				text-align: left;
				flex-direction: column;
				border-bottom: solid 1px currentColor;
			}
			.notification-title {
				font-weight: bolder;
			}
			.notification-message {
				text-align: left;
			}
			.notification-details {
				opacity: 0;
				padding: 0;
				max-height: 0;
			}
			.notification:hover .notification-details {
				opacity: 1;
				padding: 1rem 0;
				max-height: 300px;
			}
		</style>

		<div class="bar-container">
			<div class="menu-icon icon">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="bar-title"></div>
			<div class="tray-icon icon">
				<svg viewBox="0 0 24 24">
				    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
				</svg>
			</div>
		</div>

		<div class="menu-container">
			<slot name="menu-body"></slot>
			<slot name="menu-foot"></slot>
		</div>

		<div class="tray-container">
			<div class="tray-body"></div>
			<div class="tray-foot">
				<button class="tray-clear">Clear</button>
			</div>
		</div>
	`
};
