
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

        /* icon */
        var menuIcon = Create('svg', { width: '48px', height: '48px', class: 'o-menu-icon', viewBox: '0 0 100 100' });
        var rectOne = Create('rect', { width: '100', height: '10', style: 'transform: translate(0,25%)' });
        var rectTwo = Create('rect', { width: '100', height: '10', style: 'transform: translate(0,65%)' });

        // var path = Create('path', { d: 'M0 25 L100 25 L100 35 L0 35 M0 65 L0 65 L100 65 L100 75 L0 75 L0 65' });
        // menuIcon.appendChild(path);
        var mainList = self.querySelector('ul');

        menuIcon.addEventListener('click', function () {
            var actives = self.querySelectorAll('ul.active');
            if (actives.length > 1) {
                rectOne.setAttribute('style', 'transform: rotate(45deg) translate(15%,-5%)');
                rectTwo.setAttribute('style', 'transform: rotate(-45deg) translate(-50%,60%)');
                // path.setAttribute('d', 'M2 8 L8 2 L98 92 L92 98 M2 92 L92 2 L98 8 L8 98');
                actives[actives.length-1].classList.toggle('active');
            } else {
                var active = mainList.classList.toggle('active');
            	// var active = self.classList.toggle('active');
                if (active) {
                    rectOne.setAttribute('style', 'transform: rotate(45deg) translate(15%,-5%)');
                    rectTwo.setAttribute('style', 'transform: rotate(-45deg) translate(-50%,60%)');
                    // path.setAttribute('d', 'M2 8 L8 2 L98 92 L92 98 M2 92 L92 2 L98 8 L8 98');
                } else {
                    rectOne.setAttribute('style', 'transform: translate(0,25%)');
                    rectTwo.setAttribute('style', 'transform: translate(0,65%)');
                    // path.setAttribute('d', 'M0 25 L100 25 L100 35 L0 35 M0 65 L0 65 L100 65 L100 75 L0 75 L0 65');
                }
            }
        });

        menuIcon.appendChild(rectOne);
        menuIcon.appendChild(rectTwo);
        self.insertBefore(menuIcon, self.firstElementChild);

        var lists = self.querySelectorAll('ul > li > a ~ ul');
        for (var i = 0, l = lists.length; i < l; i++) {
            lists[i].parentElement.addEventListener('click', function (target) {
                rectOne.setAttribute('style', 'transform: rotate(45deg) translate(45%,15%)');
                rectTwo.setAttribute('style', 'transform: rotate(-45deg) translate(-25%,45%)');
                // path.setAttribute('d', 'M50 50 L90 0 L95 5 L60 50 M50 50 L90 100 L95 95 L60 50');
                target.classList.toggle('active');
            }.bind(null, lists[i]));
        }

    },
	style: /*css*/`

    :host rect {
        transition: transform ease-in-out 300ms;
    }
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
    	z-index: -1;
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
    }
	/* :host.active > ul */
	:host ul.active {
    	z-index: 1;
		transform: translate3d(0%, 0%, 0) scale3d(1, 1, 1);
	}

    /* :host li > ul::before {
        content: '';
    	margin: 0.3rem;
    	display: inline-block;
    	vertical-align: middle;
    	border-top: 0.3rem solid transparent;
    	border-right: 0.6rem solid currentColor;
    	border-bottom: 0.3rem solid transparent;
    } */

    /* .menu-arrow-left {
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
    } */

	`,
	template: /*html*/`
	   <slot name="body"></slot>
	`
};
