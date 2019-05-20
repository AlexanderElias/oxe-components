
// var removeTemplate = document.createElement('div');
// removeTemplate.setAttribute('class', 'o-panel-remove-icon o-panel-icon');
// removeTemplate.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/></svg>';

var Create = function (name, attributes) {
    attributes = attributes || {};
    var ns = 'http://www.w3.org/2000/svg';
    var el = document.createElementNS(ns, name);
    for (var n in attributes) el.setAttribute(n, attributes[n]);
    return el;
};

export default {
	name: 'o-menu',
	properties: {
		// close: {
		// 	enumerable: true,
		// 	value: function (e) {
		// 	}
		// }
	},
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
        var rectOne = Create('rect', { width: '100', height: '10', transform: 'translate(0,25)' });
        var rectTwo = Create('rect', { width: '100', height: '10', transform: 'translate(0,65)' });

        menuIcon.addEventListener('click', function () {
        	menuListMain.classList.toggle('active');
        	var active = self.classList.toggle('active');
            if (active) {
                rectOne.setAttribute('transform', 'rotate(45) translate(15,-5)');
                rectTwo.setAttribute('transform', 'rotate(-45) translate(-50,60)');
            } else {
                rectOne.setAttribute('transform', 'translate(0,25)');
                rectTwo.setAttribute('transform', 'translate(0,65)');
            }
        });

        menuIcon.appendChild(rectOne);
        menuIcon.appendChild(rectTwo);
        self.insertBefore(menuIcon, self.firstElementChild);

        for (var i = 0, l = menuLists.length; i < l; i++) {
            var menuList = menuLists[i];
            // add toggle active event
        }
    },
	style: /*css*/`
    .o-menu-icon {
        fill: black;
        display: block;
    	cursor: pointer;
        margin: 0.1rem;
    }
	:host {
    	z-index: 1;
    	width: 100%;
    	display: block;
    	position: relative;
	}
    :host a {
    	cursor: pointer;
    	min-width: 100%;
    	padding: 1.3rem 2.3rem;
    	display: inline-block;
    	vertical-align: middle;
    	box-sizing: border-box;
    }
    :host ul, :host li {
    	margin: 0;
    	padding: 0;
    }
    :host ul {
    	width: 100%;
    	min-height: 100%;
    	list-style: none;
    	text-align: center;
    }
    :host li {
    	display: inline-block;
    }
    :host li:hover, :host li:focus, :host li:active, :host li:visited {
    	background: rgba(0,0,0,0.1);
    }

    /* :host ul > li > ul {
        transform: translate3d(50%, 0%, 0) scale3d(0, 1, 1);
    } */

    /* transform: translate3d(0%, 0%, 0) scale3d(1, 1, 1); */

    :host > ul {
    	z-index: 1;
    	display: inline-block;
    }
    :host ul > li > ul {
    	left: 0;
    	z-index: 1;
        position: absolute;
    }
    :host ul > li > ul > li {
    	width: 100%;
    }
    :host ul > li > ul > li:nth-child(1) > a {
    	width: 100%;
    	padding: 1rem 0;
    	font-size: 0.9rem;
    	text-align: left;
    	font-weight: bold;
    	text-indent: 1rem;
    	text-transform: uppercase;
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

    /*
    	mobile
    */
    @media screen and (max-width: 960px) {
    	:host li {
    		display: block;
    	}
    	:host li > a {
    		display: block;
    		padding: 1.3rem 0;
    	}
    	:host > ul {
    		position: absolute;
    		transform: translate3d(0%, -50%, 0) scale3d(1, 0, 1);
    	}
    	:host ul > li > ul {
    		top: 0;
    		transform: translate3d(50%, 0%, 0) scale3d(0, 1, 1);
    	}
    	:host li.active > ul > li > ul, :host > ul.active {
    		transform: translate3d(0%, 0%, 0) scale3d(1, 1, 1);
    	}
    }
	`,
	template: /*html*/`
	   <slot name="body"></slot>
	`
};
