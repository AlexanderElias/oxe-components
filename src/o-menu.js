
var Create = function (name, attributes) {
    attributes = attributes || {};
    var ns = 'http://www.w3.org/2000/svg';
    var el = document.createElementNS(ns, name);
    for (var n in attributes) el.setAttribute(n, attributes[n]);
    return el;
};

export default {
	name: 'o-menu',
	created: function () {
		var self = this;

        var menuLists = self.querySelectorAll('ul');
        var menuListMain = menuLists[0];

        /* arrows */
        var arrowLeft = document.createElement('div');
        var arrowRight = document.createElement('div');
        arrowLeft.setAttribute('class', ' menu-arrow-left');
        arrowRight.setAttribute('class', 'menu-arrow-right');

        /* close */
        var closeA = document.createElement('a');
        var closeLi = document.createElement('li');
        var closeText = document.createTextNode('Close');
        closeA.appendChild(arrowLeft.cloneNode(true));
        closeA.appendChild(closeText);
        closeLi.appendChild(closeA);

        /* icon */
        var menuIcon = Create('svg', { width: '48px', height: '48px', class: 'o-menu-icon', viewBox: '0 0 100 100' });
        // var rectOne = Create('rect', { width: '100', height: '10', transform: 'translate(0,25)' });
        // var rectTwo = Create('rect', { width: '100', height: '10', transform: 'translate(0,65)' });
        var rectOne = Create('polygon', { points: '0 25, 100 25, 100 35, 0 35' });
        var rectTwo = Create('polygon', { points: '0 65, 100 65, 100 75, 0 75, 0 65' });
        // var path = Create('path', { d: 'M0 25 L100 25 L100 35 L0 35 L0 25 M0 65 L100 65 L100 75 L0 75 L0 65' });

        menuIcon.addEventListener('click', function () {
            var actives = self.querySelectorAll('ul.active');
            if (actives.length > 1) {
                // x icon
                rectOne.setAttribute('points', '2 8, 8 2, 98 92, 92 98');
                rectTwo.setAttribute('points', '2 92, 92 2, 98 8, 8 98');
                actives[actives.length-1].classList.toggle('active');
            } else {
                menuListMain.classList.toggle('active');
            	var active = self.classList.toggle('active');
                if (active) {
                    // x icon
                    rectOne.setAttribute('points', '2 8, 8 2, 98 92, 92 98');
                    rectTwo.setAttribute('points', '2 92, 92 2, 98 8, 8 98');
                    // rectOne.setAttribute('transform', 'rotate(45) translate(15,-5)');
                    // rectTwo.setAttribute('transform', 'rotate(-45) translate(-50,60)');
                    // path.setAttribute('d', 'M10 0 L50 40 L90 0 L100 10 L60 50 L100 90 L90 100 L50 60 L10 100 L0 90 L40 50 L0 10');
                } else {
                    // bar icon
                    rectOne.setAttribute('points', '0 25, 100 25, 100 35, 0 35');
                    rectTwo.setAttribute('points', '0 65, 100 65, 100 75, 0 75, 0 65');
                    // path.setAttribute('d', 'M0 25 L100 25 L100 35 L0 35 M0 65 L100 65 L100 75 L0 75');
                    // rectOne.setAttribute('transform', 'translate(0,25)');
                    // rectTwo.setAttribute('transform', 'translate(0,65)');
                }
            }
        });

        menuIcon.appendChild(rectOne);
        menuIcon.appendChild(rectTwo);
        self.insertBefore(menuIcon, self.firstElementChild);

        for (var i = 0, l = menuLists.length; i < l; i++) {
            var menuList = menuLists[i];
            // if (i > 0) menuList.parentElement.classList.add('menu-arrow-left');
            menuList.addEventListener('click', function () {
                rectOne.setAttribute('points', '45 45, 90 0, 100 0, 55 45');
                rectTwo.setAttribute('points', '45 45, 90 100, 100 100, 55 45');
                menuList.classList.toggle('active');
            });
        }
    },
	style: /*css*/`
    .o-menu-icon {
        fill: black;
        margin: 0.1rem;
        display: block;
    	cursor: pointer;
    	box-sizing: border-box;
    }
	:host {
    	z-index: 1;
    	width: 100%;
    	display: block;
    	position: relative;
    	box-sizing: border-box;
	}
    :host a {
    	cursor: pointer;
    	min-width: 100%;
    	display: inline-block;
    	padding: 1.3rem 2.3rem;
    	vertical-align: middle;
    	box-sizing: border-box;
    }
    :host ul, :host li {
    	margin: 0;
    	padding: 0;
    	width: 100%;
    	display: block;
    	text-align: center;
    	box-sizing: border-box;
    }
    :host ul {
		top: 48px;
    	z-index: 1;
    	min-height: 100%;
    	list-style: none;
		position: absolute;
		transform: translate3d(0%, -50%, 0) scale3d(1, 0, 1);
    }
    :host li:hover, :host li:focus, :host li:active, :host li:visited {
    	background: rgba(0,0,0,0.1);
    }
    :host li > a {
		display: block;
		padding: 1.3rem 0;
	}
	:host ul > li > ul {
		top: 0;
    	z-index: 1;
		position: absolute;
    }
	:host ul.active {
		transform: translate3d(0%, 0%, 0) scale3d(1, 1, 1);
	}

    :host li > ul::before {
        content: '';
    	margin: 0.3rem;
    	display: inline-block;
    	vertical-align: middle;
    	border-top: 0.3rem solid transparent;
    	border-right: 0.6rem solid currentColor;
    	border-bottom: 0.3rem solid transparent;
    }

    .menu-arrow-left {
    	width: 0;
    	height: 0;
    	margin: 0.3rem;
    	display: inline-block;
    	vertical-align: middle;
    	border-top: 0.3rem solid transparent;
    	border-right: 0.6rem solid currentColor;
    	border-bottom: 0.3rem solid transparent;
    }
    .menu-arrow-right {
    	width: 0;
    	height: 0;
    	margin: 0.3rem;
    	display: inline-block;
    	vertical-align: middle;
    	border-top: 0.3rem solid transparent;
    	border-left: 0.6rem solid currentColor;
    	border-bottom: 0.3rem solid transparent;
    }
    li.active > a > .menu-arrow-right {
    	transform: rotate(90deg);
    }



	`,
	template: /*html*/`
	   <slot name="body"></slot>
	`
};
