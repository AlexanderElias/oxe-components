/*
	Name: oxe-components
	Version: 4.0.1
	License: MPL-2.0
	Author: Arc io
	Email: undefined
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

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

        var width = 726;
        var iconColor = self.getAttribute('data-icon') || '#000';

        /* icon */
        var icon = Create('svg', { width: '48px', height: '48px', viewBox: '0 0 100 100' });
        var rectOne = Create('rect', { fill: iconColor, width: '100', height: '10', style: 'transform: translate(0,25%)' });
        var rectTwo = Create('rect', { fill: iconColor, width: '100', height: '10', style: 'transform: translate(0,65%)' });

        // var path = Create('path', { d: 'M0 25 L100 25 L100 35 L0 35 M0 65 L0 65 L100 65 L100 75 L0 75 L0 65' });
        // icon.appendChild(path);
        var mainList = self.querySelector('ul');

        icon.addEventListener('click', function () {
            var actives = self.querySelectorAll('ul.active');
            if (actives.length > 1) {
                rectOne.setAttribute('width', '100');
                rectTwo.setAttribute('width', '100');
                rectOne.setAttribute('style', 'transform: rotate(45deg) translate(15%,-5%)');
                rectTwo.setAttribute('style', 'transform: rotate(-45deg) translate(-50%,60%)');
                // path.setAttribute('d', 'M2 8 L8 2 L98 92 L92 98 M2 92 L92 2 L98 8 L8 98');
                actives[actives.length-1].classList.toggle('active');
            } else {
                mainList.classList.toggle('active');
            	var active = self.classList.toggle('active');

                if (active) {
                    window.document.documentElement.style.overflowY = 'hidden';

                    rectOne.setAttribute('style', 'transform: rotate(45deg) translate(15%,-5%)');
                    rectTwo.setAttribute('style', 'transform: rotate(-45deg) translate(-50%,60%)');
                    // path.setAttribute('d', 'M2 8 L8 2 L98 92 L92 98 M2 92 L92 2 L98 8 L8 98');
                } else {
                    window.document.documentElement.style.overflowY = 'initial';

                    rectOne.setAttribute('style', 'transform: translate(0,25%)');
                    rectTwo.setAttribute('style', 'transform: translate(0,65%)');
                    // path.setAttribute('d', 'M0 25 L100 25 L100 35 L0 35 M0 65 L0 65 L100 65 L100 75 L0 75 L0 65');
                }
            }
        });

        icon.appendChild(rectOne);
        icon.appendChild(rectTwo);
        self.insertBefore(icon, self.firstElementChild);

        var previous;
        var lists = self.querySelectorAll('ul > li > a ~ ul');
        for (var i = 0, l = lists.length; i < l; i++) {
            var ul = lists[i];
            var a = ul.previousElementSibling;

            // var i = Create('svg', { style:'width: 1rem; height: 1rem; position: absolute;', viewBox: '0 0 100 100' });
            // var p = Create('path', { d: 'M50 50 L90 0 L95 5 L60 50 M50 50 L90 100 L95 95 L60 50' });
            // i.appendChild(p);
            // a.parentElement.insertBefore(i, a);

            a.addEventListener('click', function (target) {
                console.log(target);
                rectOne.setAttribute('width', '50');
                rectTwo.setAttribute('width', '50');
                rectOne.setAttribute('style', 'transform: rotate(45deg) translate(45%,15%)');
                rectTwo.setAttribute('style', 'transform: rotate(-45deg) translate(-25%,45%)');
                // path.setAttribute('d', 'M50 50 L90 0 L95 5 L60 50 M50 50 L90 100 L95 95 L60 50');
                target.classList.toggle('active');

                // if (window.innerWidth > width) {
                //     if (previous && previous !== target) {
                //         previous.classList.remove('active');
                //         previous = target;
                //     } else {
                //         previous = target;
                //     }
                // } else {
                //     previous = null;
                // }

            }.bind(null, ul));
        }

    },
	style: /*css*/`
	:host {
    	z-index: 1;
    	width: 100%;
    	display: block;
        max-height: 100%;
    	position: relative;
    	box-sizing: border-box;
        /* transition: max-height ease-in-out 150ms; */
        transition: max-height ease-in-out 600ms;
	}
    :host > svg {
        display: none;
    }
    :host a {
    	min-width: 100%;
    	cursor: pointer;
    	display: inline-block;
    	padding: 1.3rem 2.3rem;
    	vertical-align: middle;
    	box-sizing: border-box;
    }
    :host ul {
        max-height: 0;
    	list-style: none;
		position: relative;
        transition: max-height ease-in-out 150ms;
    }
    :host > ul {
    	width: 100%;
    	display: block;
        max-height: initial;
    	text-align: center;
    	box-sizing: border-box;
    }
    :host ul > li > ul {
        overflow: hidden;
		position: absolute;
    }
    :host > ul > li {
        display: inline-block;
    }
    :host > ul > li > ul {
		top: 100%;
    }
    :host > ul > li > ul ul {
        position: initial;
    }
    :host li:hover, :host li:focus, :host li:active, :host li:visited {
    	background: rgba(0,0,0,0.1);
    }
    :host li > a {
		display: block;
	}
	:host ul.active {
    	z-index: 1;
        overflow-y: auto;
        max-height: 90vh;
	}
    @media only screen and (max-width: 768px) {
        :host > svg {
            display: block;
        	cursor: pointer;
            margin: 0 0.1rem;
        	box-sizing: border-box;
        }
        :host > svg > rect {
            transition: transform ease-in-out 150ms, width ease-in-out 150ms;
        }
        :host ul, :host li {
        	margin: 0;
        	padding: 0;
        	width: 100%;
        	display: block;
            overflow: hidden;
        	text-align: center;
        	box-sizing: border-box;
        }
        :host ul {
            max-height: 0;
    		top: 0 !important;
        }
        :host > ul > li > ul ul {
    		position: absolute;
        }
    	:host > ul ul.active {
        	z-index: 1;
            height: 100%;
            max-height: 100%;
    	}
    	:host > ul.active {
        	z-index: 1;
            max-height: 90vh;
    	}
    }
	`,
	template: /*html*/`
	   <slot name="body"></slot>
	`
};
