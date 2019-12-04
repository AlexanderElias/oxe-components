/*
	Name: oxe-components
	Version: 4.1.1
	License: MPL-2.0
	Author: Arc IO
	Email: undefined
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

var removeTemplate = document.createElement('div');

removeTemplate.setAttribute('class', 'o-panel-remove-icon o-panel-icon');
removeTemplate.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/></svg>';

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
		removeNotification: {
			value: function (index) {
				var data = window.localStorage.getItem('o-panel-notifications');
				var notifications = this.getNotifications();
				notifications.splice(index, 1);
				this.setNotifications(notifications);
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

				var item = document.createElement('div');
				var body = document.createElement('div');
				var detail = document.createElement('div');
				var message = document.createElement('div');
				var title = document.createElement('div');
				var remove = removeTemplate.cloneNode(true);

    			item.addEventListener('click', function (event) {
    				event.target.parentElement.classList.toggle('active');
    			});

				remove.addEventListener('click', function (e) {
					var body = e.target.parentElement.parentElement;
					var tray = e.target.parentElement.parentElement.parentElement;
					var index = Array.prototype.indexOf.call(tray.children, body);
					self.removeNotification(index);
					tray.removeChild(body)
				});

				item.setAttribute('class', 'o-panel-items');
                body.setAttribute('class', 'o-panel-items-body');

				title.setAttribute('class', 'o-panel-items-title');
				// detail.setAttribute('class', 'o-panel-notification-detail');
				message.setAttribute('class', 'o-panel-item-message');

				title.innerText = data.title || '';
				// detail.innerText = data.detail || '';
				message.innerText = data.message || '';

				body.appendChild(title);
				body.appendChild(message);
				// body.appendChild(detail);
				body.appendChild(remove);
                item.appendChild(title);
				item.appendChild(body);

				self.element.trayBody.appendChild(item);

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
					self.element.trayIcon.classList.remove('active');
					self.element.background.classList.remove('active');
					self.element.menuContainer.classList.remove('active');
					self.element.trayContainer.classList.remove('active');
				}
			}
		}
	},
	created: function () {
		var self = this;

		self.element = {};
		self.element.clear = self.querySelector('.o-panel-clear-icon');
		self.element.menuIcon = self.querySelector('.o-panel-menu-icon');
		self.element.trayIcon = self.querySelector('.o-panel-tray-icon');
		self.element.trayBody = self.querySelector('.o-panel-tray-body');
		self.element.background = self.querySelector('.o-panel-background');
		self.element.menuContainer = self.querySelector('.o-panel-menu-container');
		self.element.trayContainer = self.querySelector('.o-panel-tray-container');

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
			self.model.title = window.document.title;
			self.element.menuIcon.classList.remove('active');
			self.element.trayIcon.classList.remove('active');
			self.element.background.classList.remove('active');
			self.element.menuContainer.classList.remove('active');
			self.element.trayContainer.classList.remove('active');
		};

		Oxe.router.on('route:after', routed);

		self.element.menuIcon.addEventListener('click', toggle.bind(self, self.element.menuIcon, self.element.menuContainer));
		self.element.trayIcon.addEventListener('click', toggle.bind(self, self.element.trayIcon, self.element.trayContainer));
		self.element.clear.addEventListener('click', self.clear.bind(self));
		self.element.background.addEventListener('click', self.close.bind(self));

		window.addEventListener('keydown', self.close.bind(self));

		var menuItems = self.querySelectorAll('.o-panel-items > .o-panel-items-title');
		for (var i = 0, l = menuItems.length; i < l; i++) {
			menuItems[i].addEventListener('click', function (event) {
				event.target.parentElement.classList.toggle('active');
			});
		}

		self.setup();
		self.hidden = false;
	},
	style: /*css*/`
	:host {
		z-index: 1;
		width: 100%;
		height: 55px;
		display: block;
		position: relative;
	}
	.o-panel-background {
		top: 0;
		left: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		pointer-events: none;
		background-color: var(--o-panel-background);
		transition: opacity var(--o-panel-transition);
	}
	.o-panel-background.active {
		opacity: 1;
		pointer-events: initial;
	}
	.o-panel-icon {
		margin: 3px;
		width: 48px;
		height: 48px;
		padding: 9px;
		cursor: pointer;
		border-radius: 3px;
		box-sizing: border-box;
		background-color: var(--o-panel-icon);
		transition: all var(--o-panel-transition);
	}
	.o-panel-icon > * {
		transition: all var(--o-panel-transition);
	}
	.o-panel-icon:hover {
		background-color: var(--o-panel-icon-hover);
	}
	.o-panel-icon:focus {
		background-color: var(--o-panel-icon-focus);
	}
	.o-panel-icon:active {
		background-color: var(--o-panel-icon-active);
	}
	.o-panel-icon > svg {
		pointer-events: none;
	}
	/* icon color start */
	.o-panel-clear-icon > svg > path {
		fill: var(--o-panel-clear-icon);
	}
	.o-panel-clear-icon:hover > svg > path {
		fill: var(--o-panel-clear-icon-hover);
	}
	.o-panel-clear-icon:focus > svg > path {
		fill: var(--o-panel-clear-icon-focus);
	}
	.o-panel-clear-icon:active > svg > path {
		fill: var(--o-panel-clear-icon-active);
	}
	.o-panel-tray-icon > svg > path {
		fill: var(--o-panel-tray-icon);
	}
	.o-panel-tray-icon:hover > svg > path {
		fill: var(--o-panel-tray-icon-hover);
	}
	.o-panel-tray-icon:focus > svg > path {
		fill: var(--o-panel-tray-icon-focus);
	}
	.o-panel-tray-icon:active > svg > path {
		fill: var(--o-panel-tray-icon-active);
	}
	.o-panel-menu-icon > div {
		background-color: var(--o-panel-menu-icon);
	}
	.o-panel-menu-icon:hover > div {
		background-color: var(--o-panel-menu-icon-hover);
	}
	.o-panel-menu-icon:focus > div {
		background-color: var(--o-panel-menu-icon-focus);
	}
	.o-panel-menu-icon:active > div {
		background-color: var(--o-panel-menu-icon-active);
	}
	.o-panel-remove-icon > svg > path {
		fill: var(--o-panel-remove-icon);
	}
	.o-panel-remove-icon:hover > svg > path {
		fill: var(--o-panel-remove-icon-hover);
	}
	.o-panel-remove-icon:focus > svg > path {
		fill: var(--o-panel-remove-icon-focus);
	}
	.o-panel-remove-icon:active > svg > path {
		fill: var(--o-panel-remove-icon-active);
	}
	/* icon color end */
	/* bar start */
	.o-panel-bar-container {
		top: 0;
		left: 0;
		width: 100%;
		height: 55px;
		display: flex;
		position: fixed;
		align-items: center;
		color: var(--o-panel-bar-color);
		box-shadow: 0 3px 6px var(--o-panel-shadow);
		background-color: var(--o-panel-bar-background);
	}
	.o-panel-bar-title {
		flex: 1 1;
		margin: 0 1rem;
		font-size: 2.3rem;
		text-align: center;
		text-transform: capitalize;
	}
	/* bar end */
	/* menu start */
	.o-panel-menu-container {
		top: 0;
		left: 0;
        width: 45%;
		height: 100%;
		display: flex;
		position: fixed;
        min-width: 150px;
        max-width: 300px;
		padding-top: 55px;
		flex-flow: column;
		box-sizing: border-box;
		transform: translate(-100%, 0);
		color: var(--o-panel-menu-color);
		box-shadow: 3px 0 6px var(--o-panel-shadow);
		transition: transform var(--o-panel-transition);
		background-color: var(--o-panel-menu-background);
	}
	.o-panel-menu-container.active {
		transform: translate(0, 0);
	}
	.o-panel-menu-icon {
		padding: 0;
		position: relative;
	}
	.o-panel-menu-icon > div {
		height: 3px;
		position: absolute;
		width: calc(100% - 6px);
		transform-origin: 50% 50%;
		transition: transform var(--o-panel-transition);
	}
	.o-panel-menu-icon > div:nth-child(1) {
		transform: translate(3px, 17.5px);
	}
	.o-panel-menu-icon > div:nth-child(2) {
		transform: translate(3px, 31.5px);
	}
	.o-panel-menu-icon > div:nth-child(3) {
		transform: translate(3px, calc(48px - (9px + 3px)) );
	}
	.o-panel-menu-icon.active > div:nth-child(1) {
		transform:
			rotate(45deg)
			translate(17px, 13px);
	}
	.o-panel-menu-icon.active > div:nth-child(2) {
		transform:
			rotate(-45deg)
			translate(-13px, 17px);
	}
	/* menu end */
    /* item start */
	.o-panel-items-body {
		position: relative;
	}
	.o-panel-items > .o-panel-items-body > .o-panel-item {
	    padding-left: 1.6rem;
	}
	.o-panel-items-body {
		opacity: 0;
		max-height: 0;
        display: flex;
		pointer-events: none;
        flex-direction: column;
	    transition: all var(--o-panel-transition);
	}

    /* dropdown start */
	.o-panel-menu-container .o-panel-items-title::after,
    .o-panel-tray-container .o-panel-items-title::before {
		content: '';
		margin: 4px;
		padding: 4px;
		display: inline-block;
		border-style: solid;
		transform: rotate(45deg);
		border-width: 0 2px 2px 0;
		border-color: var(--o-panel-collapse-icon);
		transition: transform var(--o-panel-transition);
	}
	.o-panel-menu-container .o-panel-items.active > .o-panel-items-title::after,
    .o-panel-tray-container .o-panel-items.active > .o-panel-items-title::before {
		transform: rotate(-135deg);
	}
	.o-panel-menu-container .o-panel-items-body::before {
	    top: 0;
	    bottom: 0;
	    width: 2px;
		content: '';
	    left: 0.9rem;
	    display: block;
	    position: absolute;
		background-color: var(--o-panel-guide-icon);
	}

	.o-panel-items.active > .o-panel-items-body {
		opacity: 1;
		max-height: 300px;
		pointer-events: initial;
	}
	.o-panel-item, .o-panel-items-title {
		display: flex;
		cursor: pointer;
		align-items: center;
		padding: 0.9rem 1.3rem;
		background-color: transparent;
		transition: background-color var(--o-panel-transition);
	}
	.o-panel-item:hover, .o-panel-items-title:hover {
		background-color: var(--o-panel-item-hover);
	}
	.o-panel-item:active, .o-panel-items-title:active {
		background-color: var(--o-panel-item-active);
	}
	.o-panel-items-title {
		padding: 0.9rem;
		justify-content: space-between;
	}
	.o-panel-item-message {
        padding: 0.9rem;
        padding-left: 1.6rem;
        justify-content: space-between;
	}
	/* item end */
	/* tray start */
	.o-panel-tray-container {
		top: 0;
		right: 0;
        width: 45%;
		height: 100%;
		display: flex;
		position: fixed;
        min-width: 150px;
        max-width: 300px;
		padding-top: 55px;
		flex-flow: column;
		box-sizing: border-box;
		transform: translate(100%, 0);
		color: var(--o-panel-tray-color);
		box-shadow: -3px 0 6px var(--o-panel-shadow);
		transition: transform var(--o-panel-transition);
		background-color: var(--o-panel-tray-background);
	}
	.o-panel-tray-container.active {
		transform: translate(0, 0);
	}
	[slot="menu-body"],
	.o-panel-tray-body {
		display: flex;
		flex: 1 1 auto;
		overflow-y: auto;
		flex-direction: column;
		justify-content: flex-start;
		max-height: calc(100% - 1rem + 1.8rem);
	}
	[slot="menu-foot"],
	.o-panel-tray-foot {
		display: flex;
		flex: 0 1 auto;
		flex-direction: column;
	}
	.o-panel-tray-container .o-panel-remove-icon {
        align-self: flex-end;
	}
	/* tray end */
	/* notification start */
	.o-panel-notification-title {
		font-weight: bolder;
		text-transform: capitalize;
	}
	/* notification end */
	`,
	template: /*html*/`
	<div class="o-panel-background"></div>

	<div class="o-panel-menu-container">
		<slot name="menu-body"></slot>
		<slot name="menu-foot"></slot>
	</div>

	<div class="o-panel-tray-container">
		<div class="o-panel-tray-body"></div>
		<div class="o-panel-tray-foot">
			<div class="o-panel-clear-icon o-panel-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
					<path d="M10 26h28v-4H10v4zm-4 8h28v-4H6v4zm8-20v4h28v-4H14z"/>
				</svg>
			</div>
		</div>
	</div>

	<div class="o-panel-bar-container">
		<div class="o-panel-menu-icon o-panel-icon">
			<div></div>
			<div></div>
		</div>
		<div class="o-panel-bar-title">
			<div o-text="title"></div>
		</div>
		<div class="o-panel-tray-icon o-panel-icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
				<path d="M24 44c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4zm12-12V22c0-6.15-3.27-11.28-9-12.64V8c0-1.66-1.34-3-3-3s-3 1.34-3 3v1.36c-5.73 1.36-9 6.49-9 12.64v10l-4 4v2h32v-2l-4-4z"/>
			</svg>
		</div>
	</div>
	`
};
