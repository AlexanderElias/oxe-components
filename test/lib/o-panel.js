
export default {
	name: 'o-panel',
    model: {
        count: 0,
        title: '',
    },
	properties: {
		getNotifications: {
			value: function () {
				var data = window.localStorage.getItem('o-panel-notifications');
				return JSON.parse(data || '[]');
			}
		},
		setNotifications: {
			value: function (data) {
				data = JSON.stringify(data || []);
				window.localStorage.setItem('o-panel-notifications', data);
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

				notification.setAttribute('class', 'o-panel-notification');
				title.setAttribute('class', 'o-panel-notification-title');
				message.setAttribute('class', 'o-panel-notification-message');
				details.setAttribute('class', 'o-panel-notification-details');

				title.innerText = data.title || '';
				message.innerText = data.message || '';
				details.innerText = data.details || '';

				notification.appendChild(title);
				notification.appendChild(message);
				notification.appendChild(details);

				self.element.trayBody.appendChild(notification);

				if (flag) return;

				var notifications = self.getNotifications();
				notifications.push(data);
				self.setNotifications(notifications);
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
                    self.model.count = 0;
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
        
        self.element = {};
        self.element.background = self.querySelector('.o-panel-background');
		self.element.menuIcon = self.querySelector('.menu-icon');
		self.element.menuContainer = self.querySelector('.menu-container');
		self.element.trayIcon = self.querySelector('.tray-icon');
		self.element.trayBody = self.querySelector('.tray-body');
		self.element.trayClear = self.querySelector('.o-tray-clear');
		self.element.trayContainer = self.querySelector('.tray-container');

        var toggle = function (icon, container) {
            var flag = icon.classList.toggle('active');
			container.classList.toggle('active');

            if (flag) {
                self.model.count++;
            } else {
                self.model.count--;
            }

            self.element.background.classList.toggle('active', self.model.count > 0);
        };

        var routed = function () {
			self.model.title = Oxe.location.route.title;
		};

		Oxe.router.on('routed', routed);
		self.element.menuIcon.addEventListener('click', toggle.bind(self, self.element.menuIcon, self.element.menuContainer));
		self.element.trayIcon.addEventListener('click', toggle.bind(self, self.element.trayIcon, self.element.trayContainer));
		self.element.trayClear.addEventListener('click', self.clear.bind(self));
		self.element.background.addEventListener('click', self.close.bind(self));
        window.addEventListener('keydown', self.close.bind(self));

		self.setup();
	},
	style: `
        .o-panel-background {
			top: 0;
			left: 0;
            opacity: 0;
            z-index: -1;
			width: 100%;
			height: 100%;
			position: fixed;
            background-color: var(--o-panel-background);
		    transition: opacity var(--o-panel-transition);
		}
        .o-panel-background.active {
            opacity: 1;
            z-index: 0;
        }
        .o-panel-icon:hover {
			background-color: var(--o-panel-icon-hover);
        }
        .o-panel-icon:active {
			background-color: var(--o-panel-icon-active);
        }
		.bar-container {
			top: 0;
			left: 0;
			z-index: 1;
			width: 100%;
            height: 55px;
			display: flex;
			position: fixed;
			align-items: center;
            color: var(--o-panel-bar-color);
			box-shadow: 0 3px 6px var(--o-panel-shadow);
			background-color: var(--o-panel-bar-background);
		}
		.bar-title {
			flex: 1 1;
			margin: 0 1rem;
			font-size: 2.3rem;
			text-align: center;
			text-transform: capitalize;
		}
        .menu-container {
			top: 0;
			left: 0;
			z-index: 0;
			height: 100vh;
			display: flex;
			position: fixed;
			flex-flow: column;
			padding-top: 55px;
            box-sizing: border-box;
            transform: translate(-100%, 0);
            color: var(--o-panel-menu-color);
			box-shadow: 3px 0 6px var(--o-panel-shadow);
			transition: transform var(--o-panel-transition);
			background-color: var(--o-panel-menu-background);
		}
		.menu-container.active {
			transform: translate(0, 0);
		}
		.menu-icon {
			margin: 3px;
			width: 48px;
			height: 48px;
			cursor: pointer;
            border-radius: 3px;
			position: relative;
            box-sizing: border-box;
			transition: background-color var(--o-panel-transition);
		}
		.menu-icon > div {
			height: 3px;
			position: absolute;
			width: calc(100% - 6px);
			transform-origin: 50% 50%;
			background-color: var(--o-panel-icon);
			transition: transform var(--o-panel-transition);
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
		.tray-container {
			top: 0;
			right: 0;
			z-index: 0;
			height: 100vh;
			display: flex;
			position: fixed;
			flex-flow: column;
			padding-top: 55px;
            box-sizing: border-box;
			transform: translate(100%, 0);
            color: var(--o-panel-tray-color);
			box-shadow: -3px 0 6px var(--o-panel-shadow);
			transition: transform var(--o-panel-transition);
			background-color: var(--o-panel-tray-background);
		}
		.tray-container.active {
			transform: translate(0, 0);
		}
        .tray-icon {
			margin: 3px;
			width: 48px;
			height: 48px;
			padding: 9px;
			cursor: pointer;
            border-radius: 3px;
            box-sizing: border-box;
			transition: background-color var(--o-panel-transition);
		}
		.tray-icon > svg {
			fill: var(--o-panel-icon);
		} 	
        [slot="menu-body"],
		.tray-body {
            width: 30vw;
            display: flex;
            flex: 1 0 auto;
            min-width: 150px;
            max-width: 300px;
			overflow-y: auto;
			flex-direction: column;
			justify-content: flex-start;
		}
        [slot="menu-foot"],
		.tray-foot { 
            display: flex;
			flex: 0 1 auto;
			flex-direction: column;
        }
        .o-panel-item {
            all: unset;
			display: flex;
			cursor: pointer;
            align-items: center;
			padding: 0.9rem 1.3rem;
			background-color: transparent;
			transition: background-color var(--o-panel-transition);
		}
        .o-panel-item:hover {
			background-color: var(--o-panel-item-hover);
		}
        .o-panel-item:active {
			background-color: var(--o-panel-item-active);
		}	
        .o-panel-notification {
            display: flex;
            flex: 0 0 auto;
			cursor: pointer;
			text-align: left;
			padding: 0.9rem 1.3rem;
			flex-direction: column;
            align-items: flex-start;
            background-color: transparent;
			border-bottom: solid 1px currentColor;
		}
		.o-panel-notification-title {
			font-weight: bolder;
			text-transform: capitalize;
		}
		.o-panel-notification-message {
			text-align: left;
		}
		.o-panel-notification-details {
			opacity: 0;
			padding: 0;
			max-height: 0;
            transition: max-height var(--o-panel-transition), padding var(--o-panel-transition), opacity var(--o-panel-transition);
		}
		.o-panel-notification:hover .o-panel-notification-details {
			opacity: 1;
			padding: 1rem 0;
			max-height: 300px;
		}
	`,
	template: `
        <div class="o-panel-background"></div>

		<div class="bar-container">
			<div class="o-panel-icon menu-icon">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="bar-title">
                <div o-text="title"></div>
            </div>
			<div class="o-panel-icon tray-icon">
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
				<button class="o-panel-item o-tray-clear">Clear</button>
			</div>
		</div>
	`
};
