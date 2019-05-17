
// var removeTemplate = document.createElement('div');
// removeTemplate.setAttribute('class', 'o-panel-remove-icon o-panel-icon');
// removeTemplate.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/></svg>';

// var icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="white">
// 	<rect width="100" height="10"/>
// 	<rect width="100" height="10"/>
// </svg>';

// transform="translate(0, 50) rotate(45, 50, 5)"

var Create = function (name, attributes) {
    attributes = attributes || {};
    var ns = 'http://www.w3.org/2000/svg';
    var el = document.createElementNS(ns, name);
    for (var n in attributes) {
        var v = attributes[n];
        el.setAttributeNS(null, n, v);
    }
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

        var menuIcon = Create('svg', {
            width: '48px',
            height: '48px',
            viewBox: '0 0 100 100',
            // xmlns: 'http://www.w3.org/2000/svg'
        });

        var rectOne = Create('rect', { width: '100', height: '10', x: '50', y: '30', transform: 'translate(-50,-5)' });
        var rectTwo = Create('rect', { width: '100', height: '10', x: '50', y: '70', transform: 'translate(-50,-5)' });

        menuIcon.appendChild(rectOne);
        menuIcon.appendChild(rectTwo);

        var arrowLeft = document.createElement('div');
        var arrowRight = document.createElement('div');

        var closeA = document.createElement('a');
        var closeLi = document.createElement('li');
        var closeText = document.createTextNode('Close');

        var menuTool = document.createElement('div');
        // var menuIcon = document.createElement('div');

        // var body = self.querySelector('[slot="body"]');
        var menuListAll = self.querySelectorAll('ul');
        var menuListMain = menuListAll[0];
        menuListMain.setAttribute('class', 'menu-list-main');

        /* arrows */
        arrowLeft.setAttribute('class', ' menu-arrow-left');
        arrowRight.setAttribute('class', 'menu-arrow-right');

        /* close */
        closeA.appendChild(arrowLeft.cloneNode(true));
        closeA.appendChild(closeText);
        closeLi.appendChild(closeA);

        /* icon */
        // menuIcon.setAttribute('class', 'menu-icon');
        // menuIcon.appendChild(document.createElement('div'));
        // menuIcon.appendChild(document.createElement('div'));
        // menuIcon.appendChild(document.createElement('div'));

        menuIcon.addEventListener('click', function () {
        	menuListMain.classList.toggle('active');
        	self.classList.toggle('active');
            rectOne.setAttribute('transform', 'translate(-50,-5) rotate(-45 125 72)');
            rectTwo.setAttribute('transform', 'translate(-50,-5) rotate(45 125 32)');
        });

        menuTool.appendChild(menuIcon);

        menuTool.setAttribute('class', 'menu-tool');
        self.insertBefore(menuTool, self.firstElementChild);

        // for (var i = 1, l = menuListAll.length; i < l; i++) {
        // 	var closeLiClone = closeLi.cloneNode(true);
        //
        // 	menuListAll[i].insertBefore(closeLiClone, menuListAll[i].firstElementChild);
        // 	menuListAll[i].setAttribute('class', 'menu-list-sub');
        //
        // 	/*
        // 		close
        // 	*/
        // 	closeLiClone.addEventListener('click', function() {
        //
        // 		this.parentNode.parentNode.classList.toggle('active');
        //
        // 		if (this.parentNode.parentNode.parentNode.className === 'menu-list-sub unactive') {
        // 			this.parentNode.parentNode.parentNode.classList.toggle('unactive');
        // 		}
        //
        // 	});
        //
        // 	/*
        // 		open
        // 	*/
        // 	menuListAll[i].previousElementSibling.appendChild(arrowRight.cloneNode(true));
        // 	menuListAll[i].previousElementSibling.addEventListener('click', function() {
        //
        // 		this.parentNode.classList.toggle('active');
        //
        // 		if (this.parentNode.parentNode.className === 'menu-list-sub') {
        // 			this.parentNode.parentNode.classList.toggle('unactive');
        // 		}
        //
        // 	});
        //
        // }

    },
	style: /*css*/`
	:host {
    	z-index: 1;
    	width: 100%;
    	display: block;
    	text-align: left;
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

    .menu-tool {
    	width: 100%;
    }
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
    	icon
    */
    .menu-icon {
    	width: 3rem;
    	height: 3rem;
    	cursor: pointer;
    	position: relative;
    }
    .menu-icon > div {
    	width: 3rem;
    	height: 0.18rem;
    	position: absolute;
    	transform-origin: 50% 50%;
    	background-color: currentColor;
    }

    /*
    	icon non-active
    */
    .menu-icon > div:nth-child(1) {
    	transform: translateY(0.6rem);
    }
    .menu-icon > div:nth-child(2) {
    	transform: translateY( calc(1.5rem - (0.18rem/2)) );
    }
    .menu-icon > div:nth-child(3) {
    	transform: translateY( calc(3rem - 0.6rem - 0.18rem) );
    }

    /*
    	icon active
    */
    :host.active .menu-icon > div:nth-child(1) {
    	transform:
    		rotate(45deg)
    		translate(calc(1.5rem/1.5), calc(1.5rem/1.5));
    }
    :host.active .menu-icon > div:nth-child(2) {
    	transform:
    		rotate(45deg)
    		translate(calc(1.5rem/1.5), calc(1.5rem/1.5));
    }
    :host.active .menu-icon > div:nth-child(3) {
    	transform:
    		rotate(-45deg)
    		translate(calc(-1.5rem/1.5), calc(1.5rem/1.5));
    }

    /*
    	mobile
    */
    @media screen and (min-width: 960px) {
    	.menu-tool {
    		display: none;
    	}
    	:host ul > li > ul {
    		transform: translate3d(0%, -50%, 0) scale3d(1, 0, 1);
    	}
    	:host > ul > li {
    		position: relative;
    	}
    	/* :host > ul > li > .menu-list-sub .menu-list-sub {
    		top: 0;
    	} */
    	:host li > ul > li:nth-child(1) {
    		display: none;
    	}
    	:host li.active > ul {
    		transform: translate3d(0%, 0%, 0) scale3d(1, 1, 1);
    	}

    	:host .unactive {
    		max-height: 0;
    	}
    	:host .unactive > li:not(.active) > a {
    		margin:0;
    		height: 0;
    		padding: 0;
    		touch-action: none;
        	pointer-events: none;
    	}
    }

    @media screen and (max-width: 960px) {
    	.menu-tool {
    		display: block;
    	}
    	.menu-icon {
    		margin: auto 1rem;
    	}
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
