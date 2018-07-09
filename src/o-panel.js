
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
		setup: {
			value: function () {
				var notifications = this.getNotifications();
				for (var notification of notifications) {
					this.notify(notification, true);
				}
			}
		},
		notify: {
			enumerable: true,
			value: function (data, flag) {
                var self = this;

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

				self.element.trayBody.appendChild(notification);

				if (flag) return;

				var notifications = this.getNotifications();
				notifications.push(data);
				this.setNotifications(notifications);
			}
		},
		clear: {
			enumerable: true,
			value: function () {
                var self = this;

				while (self.element.trayBody.lastElementChild) {
					self.element.trayBody.removeChild(self.element.trayBody.lastElementChild);
				}

				this.setNotifications([]);
			}
		},
        close: {
            enumerable: true,
            value: function (e) {
                var self = this;
                if (e.type ==='keydown' && e.keyCode === 27 || e.type === 'click') {
                    self.element.menuIcon.classList.remove('active');
                    self.element.menuContainer.classList.remove('active');
                    self.element.trayIcon.classList.remove('active');
                    self.element.trayContainer.classList.remove('active');
                    self.element.background.classList.remove('active');
                }
            }
        }
	},
	created: function () {
		var self = this;
        var count = 0;

        self.element = {};
        self.element.background = self.querySelector('.panel-background');
		self.element.menuIcon = self.querySelector('.menu-icon');
		self.element.menuContainer = self.querySelector('.menu-container');
		self.element.trayIcon = self.querySelector('.tray-icon');
		self.element.trayBody = self.querySelector('.tray-body');
		self.element.trayClear = self.querySelector('.tray-clear');
		self.element.trayContainer = self.querySelector('.tray-container');

        var toggle = function (icon, container) {
            var flag = icon.classList.toggle('active');
			container.classList.toggle('active');

            if (flag) {
                count++;
            } else {
                count--;
            }

            self.element.background.classList.toggle('active', count > 0);
        };

		self.element.menuIcon.addEventListener('click', toggle.bind(self, self.element.menuIcon, self.element.menuContainer));
		self.element.trayIcon.addEventListener('click', toggle.bind(self, self.element.trayIcon, self.element.trayContainer));
		self.element.trayClear.addEventListener('click', self.clear.bind(self));
		self.element.background.addEventListener('click', self.close.bind(self));
        window.addEventListener('keydown', self.close.bind(self));

		self.setup();
	},
	style: `
		:host * {
			box-sizing: border-box;
		}
        .panel-background {
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: none;
			position: fixed;
		}
        .panel-background.active {
            display: block;
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
			box-shadow: 0 3px 6px var(--o-panel-shadow);
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
			transition: transform var(--o-panel-translate);
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
			box-shadow: 3px 0 6px var(--o-panel-shadow);
			transition: transform var(--o-panel-translate);
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
			box-shadow: -3px 0 6px var(--o-panel-shadow);
			transition: transform var(--o-panel-translate);
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
        .menu-icon:hover,
        .tray-icon:hover,
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
	`,
	template: `
        <div class="panel-background"></div>

		<div class="bar-container">
			<div class="menu-icon">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="bar-title"></div>
			<div class="tray-icon">
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
