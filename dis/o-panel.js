export default{name:'o-panel',model:{count:0,title:''},properties:{getNotifications:{value:function(){var a=window.localStorage.getItem('o-panel-notifications');return JSON.parse(a||'[]')}},setNotifications:{value:function(a){a=JSON.stringify(a||[]),window.localStorage.setItem('o-panel-notifications',a)}},setup:{value:function(){var a=this.getNotifications(),b=!0,c=!1,d=void 0;try{for(var e,f,g=a[Symbol.iterator]();!(b=(e=g.next()).done);b=!0)f=e.value,this.notify(f,!0)}catch(a){c=!0,d=a}finally{try{!b&&g.return&&g.return()}finally{if(c)throw d}}}},notify:{enumerable:!0,value:function(a,b){var c=this,d=document.createElement('div'),e=document.createElement('div'),f=document.createElement('div'),g=document.createElement('div');if(d.setAttribute('class','o-panel-notification'),g.setAttribute('class','o-panel-notification-title'),f.setAttribute('class','o-panel-notification-message'),e.setAttribute('class','o-panel-notification-details'),g.innerText=a.title||'',f.innerText=a.message||'',e.innerText=a.details||'',d.appendChild(g),d.appendChild(f),d.appendChild(e),c.element.trayBody.appendChild(d),!b){var h=c.getNotifications();h.push(a),c.setNotifications(h)}}},clear:{enumerable:!0,value:function(){for(var a=this;a.element.trayBody.lastElementChild;)a.element.trayBody.removeChild(a.element.trayBody.lastElementChild);this.setNotifications([])}},close:{enumerable:!0,value:function(a){var b=this;('keydown'===a.type&&27===a.keyCode||'click'===a.type)&&(b.model.count=0,b.element.menuIcon.classList.remove('active'),b.element.menuContainer.classList.remove('active'),b.element.trayIcon.classList.remove('active'),b.element.trayContainer.classList.remove('active'),b.element.background.classList.remove('active'))}}},created:function(){var a=this;a.element={},a.element.background=a.querySelector('.o-panel-background'),a.element.menuIcon=a.querySelector('.menu-icon'),a.element.menuContainer=a.querySelector('.menu-container'),a.element.trayIcon=a.querySelector('.tray-icon'),a.element.trayBody=a.querySelector('.tray-body'),a.element.trayClear=a.querySelector('.o-tray-clear'),a.element.trayContainer=a.querySelector('.tray-container');var b=function(b,c){var d=b.classList.toggle('active');c.classList.toggle('active'),d?a.model.count++:a.model.count--,a.element.background.classList.toggle('active',0<a.model.count)};Oxe.router.on('routed',function(){a.model.title=Oxe.location.route.title}),a.element.menuIcon.addEventListener('click',b.bind(a,a.element.menuIcon,a.element.menuContainer)),a.element.trayIcon.addEventListener('click',b.bind(a,a.element.trayIcon,a.element.trayContainer)),a.element.trayClear.addEventListener('click',a.clear.bind(a)),a.element.background.addEventListener('click',a.close.bind(a)),window.addEventListener('keydown',a.close.bind(a)),a.setup()},style:'\n        o-panel {\n            width: 100%;\n            height: 55px;\n            display: block;\n        }\n        .o-panel-background {\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n            opacity: 0;\n            z-index: -1;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tposition: fixed;\n            background-color: var(--o-panel-background);\n\t\t    transition: opacity var(--o-panel-transition);\n\t\t}\n        .o-panel-background.active {\n            opacity: 1;\n            z-index: 0;\n        }\n        .o-panel-icon:hover {\n\t\t\tbackground-color: var(--o-panel-icon-hover);\n        }\n        .o-panel-icon:active {\n\t\t\tbackground-color: var(--o-panel-icon-active);\n        }\n\t\t.bar-container {\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tz-index: 1;\n\t\t\twidth: 100%;\n            height: 55px;\n\t\t\tdisplay: flex;\n\t\t\tposition: fixed;\n\t\t\talign-items: center;\n            color: var(--o-panel-bar-color);\n\t\t\tbox-shadow: 0 3px 6px var(--o-panel-shadow);\n\t\t\tbackground-color: var(--o-panel-bar-background);\n\t\t}\n\t\t.bar-title {\n\t\t\tflex: 1 1;\n\t\t\tmargin: 0 1rem;\n\t\t\tfont-size: 2.3rem;\n\t\t\ttext-align: center;\n\t\t\ttext-transform: capitalize;\n\t\t}\n        .menu-container {\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tz-index: 0;\n\t\t\theight: 100vh;\n\t\t\tdisplay: flex;\n\t\t\tposition: fixed;\n\t\t\tflex-flow: column;\n\t\t\tpadding-top: 55px;\n            box-sizing: border-box;\n            transform: translate(-100%, 0);\n            color: var(--o-panel-menu-color);\n\t\t\tbox-shadow: 3px 0 6px var(--o-panel-shadow);\n\t\t\ttransition: transform var(--o-panel-transition);\n\t\t\tbackground-color: var(--o-panel-menu-background);\n\t\t}\n\t\t.menu-container.active {\n\t\t\ttransform: translate(0, 0);\n\t\t}\n\t\t.menu-icon {\n\t\t\tmargin: 3px;\n\t\t\twidth: 48px;\n\t\t\theight: 48px;\n\t\t\tcursor: pointer;\n            border-radius: 3px;\n\t\t\tposition: relative;\n            box-sizing: border-box;\n\t\t\ttransition: background-color var(--o-panel-transition);\n\t\t}\n\t\t.menu-icon > div {\n\t\t\theight: 3px;\n\t\t\tposition: absolute;\n\t\t\twidth: calc(100% - 6px);\n\t\t\ttransform-origin: 50% 50%;\n\t\t\tbackground-color: var(--o-panel-icon);\n\t\t\ttransition: transform var(--o-panel-transition);\n\t\t}\n\t\t.menu-icon > div:nth-child(1) {\n\t\t\ttransform: translate(3px, 9px);\n\t\t}\n\t\t.menu-icon > div:nth-child(2) {\n\t\t\ttransform: translate(3px, calc(24px - (3px/2)) );\n\t\t}\n\t\t.menu-icon > div:nth-child(3) {\n\t\t\ttransform: translate(3px, calc(48px - (9px + 3px)) );\n\t\t}\n\t\t.menu-icon.active > div:nth-child(1) {\n\t\t\ttransform:\n\t\t\t\trotate(45deg)\n\t\t\t\ttranslate(17px, 13px);\n\t\t}\n\t\t.menu-icon.active > div:nth-child(2) {\n\t\t\ttransform:\n\t\t\t\trotate(45deg)\n\t\t\t\ttranslate(17px, 13px);\n\t\t}\n\t\t.menu-icon.active > div:nth-child(3) {\n\t\t\ttransform:\n\t\t\t\trotate(-45deg)\n\t\t\t\ttranslate(-13px, 17px);\n\t\t}\t\n\t\t.tray-container {\n\t\t\ttop: 0;\n\t\t\tright: 0;\n\t\t\tz-index: 0;\n\t\t\theight: 100vh;\n\t\t\tdisplay: flex;\n\t\t\tposition: fixed;\n\t\t\tflex-flow: column;\n\t\t\tpadding-top: 55px;\n            box-sizing: border-box;\n\t\t\ttransform: translate(100%, 0);\n            color: var(--o-panel-tray-color);\n\t\t\tbox-shadow: -3px 0 6px var(--o-panel-shadow);\n\t\t\ttransition: transform var(--o-panel-transition);\n\t\t\tbackground-color: var(--o-panel-tray-background);\n\t\t}\n\t\t.tray-container.active {\n\t\t\ttransform: translate(0, 0);\n\t\t}\n        .tray-icon {\n\t\t\tmargin: 3px;\n\t\t\twidth: 48px;\n\t\t\theight: 48px;\n\t\t\tpadding: 9px;\n\t\t\tcursor: pointer;\n            border-radius: 3px;\n            box-sizing: border-box;\n\t\t\ttransition: background-color var(--o-panel-transition);\n\t\t}\n\t\t.tray-icon > svg {\n\t\t\tfill: var(--o-panel-icon);\n\t\t} \t\n        [slot="menu-body"],\n\t\t.tray-body {\n            width: 30vw;\n            display: flex;\n            flex: 1 0 auto;\n            min-width: 150px;\n            max-width: 300px;\n\t\t\toverflow-y: auto;\n\t\t\tflex-direction: column;\n\t\t\tjustify-content: flex-start;\n\t\t}\n        [slot="menu-foot"],\n\t\t.tray-foot { \n            display: flex;\n\t\t\tflex: 0 1 auto;\n\t\t\tflex-direction: column;\n        }\n        .o-panel-item {\n            all: unset;\n\t\t\tdisplay: flex;\n\t\t\tcursor: pointer;\n            align-items: center;\n\t\t\tpadding: 0.9rem 1.3rem;\n\t\t\tbackground-color: transparent;\n\t\t\ttransition: background-color var(--o-panel-transition);\n\t\t}\n        .o-panel-item:hover {\n\t\t\tbackground-color: var(--o-panel-item-hover);\n\t\t}\n        .o-panel-item:active {\n\t\t\tbackground-color: var(--o-panel-item-active);\n\t\t}\t\n        .o-panel-notification {\n            display: flex;\n            flex: 0 0 auto;\n\t\t\tcursor: pointer;\n\t\t\ttext-align: left;\n\t\t\tpadding: 0.9rem 1.3rem;\n\t\t\tflex-direction: column;\n            align-items: flex-start;\n            background-color: transparent;\n\t\t\tborder-bottom: solid 1px currentColor;\n\t\t}\n\t\t.o-panel-notification-title {\n\t\t\tfont-weight: bolder;\n\t\t\ttext-transform: capitalize;\n\t\t}\n\t\t.o-panel-notification-message {\n\t\t\ttext-align: left;\n\t\t}\n\t\t.o-panel-notification-details {\n\t\t\topacity: 0;\n\t\t\tpadding: 0;\n\t\t\tmax-height: 0;\n            transition: max-height var(--o-panel-transition), padding var(--o-panel-transition), opacity var(--o-panel-transition);\n\t\t}\n\t\t.o-panel-notification:hover .o-panel-notification-details {\n\t\t\topacity: 1;\n\t\t\tpadding: 1rem 0;\n\t\t\tmax-height: 300px;\n\t\t}\n\t',template:'\n        <div class="o-panel-background"></div>\n\n\t\t<div class="bar-container">\n\t\t\t<div class="o-panel-icon menu-icon">\n\t\t\t\t<div></div>\n\t\t\t\t<div></div>\n\t\t\t\t<div></div>\n\t\t\t</div>\n\t\t\t<div class="bar-title">\n                <div o-text="title"></div>\n            </div>\n\t\t\t<div class="o-panel-icon tray-icon">\n\t\t\t\t<svg viewBox="0 0 24 24">\n\t\t\t\t    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class="menu-container">\n\t\t\t<slot name="menu-body"></slot>\n\t\t\t<slot name="menu-foot"></slot>\n\t\t</div>\n\n\t\t<div class="tray-container">\n\t\t\t<div class="tray-body"></div>\n\t\t\t<div class="tray-foot">\n\t\t\t\t<button class="o-panel-item o-tray-clear">Clear</button>\n\t\t\t</div>\n\t\t</div>\n\t'};