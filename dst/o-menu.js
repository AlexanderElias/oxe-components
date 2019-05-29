/*
	Name: oxe-components
	Version: 3.0.5
	License: MPL-2.0
	Author: Alexander Elias
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
                    document.body.style.overflowY = 'hidden';
                    
                    rectOne.setAttribute('style', 'transform: rotate(45deg) translate(15%,-5%)');
                    rectTwo.setAttribute('style', 'transform: rotate(-45deg) translate(-50%,60%)');
                    // path.setAttribute('d', 'M2 8 L8 2 L98 92 L92 98 M2 92 L92 2 L98 8 L8 98');
                } else {
                    document.body.style.overflowY = 'initial';

                    rectOne.setAttribute('style', 'transform: translate(0,25%)');
                    rectTwo.setAttribute('style', 'transform: translate(0,65%)');
                    // path.setAttribute('d', 'M0 25 L100 25 L100 35 L0 35 M0 65 L0 65 L100 65 L100 75 L0 75 L0 65');
                }
            }
        });

        icon.appendChild(rectOne);
        icon.appendChild(rectTwo);
        self.insertBefore(icon, self.firstElementChild);

        var lists = self.querySelectorAll('ul > li > a ~ ul');
        for (var i = 0, l = lists.length; i < l; i++) {
            var ul = lists[i];
            var a = ul.previousElementSibling;

            // var i = Create('svg', { style:'width: 1rem; height: 1rem; position: absolute;', viewBox: '0 0 100 100' });
            // var p = Create('path', { d: 'M50 50 L90 0 L95 5 L60 50 M50 50 L90 100 L95 95 L60 50' });
            // i.appendChild(p);
            // a.parentElement.insertBefore(i, a);

            a.addEventListener('click', function (target) {
                rectOne.setAttribute('width', '50');
                rectTwo.setAttribute('width', '50');
                rectOne.setAttribute('style', 'transform: rotate(45deg) translate(45%,15%)');
                rectTwo.setAttribute('style', 'transform: rotate(-45deg) translate(-25%,45%)');
                // path.setAttribute('d', 'M50 50 L90 0 L95 5 L60 50 M50 50 L90 100 L95 95 L60 50');
                target.classList.toggle('active');
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
        transition: max-height ease-in-out 150ms;
	}
    :host > svg {
        margin: 0.1rem;
        display: block;
    	cursor: pointer;
    	box-sizing: border-box;
    }
    :host > svg > rect {
        transition: transform ease-in-out 150ms, width ease-in-out 150ms;
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
        max-height: 0;
        overflow: hidden;
    	list-style: none;
		position: relative;
        transition: max-height ease-in-out 150ms;
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
        height: 100%;
		position: absolute;
    }
	:host ul.active {
    	z-index: 1;
        max-height: 90vh;
	}
	`,
	template: /*html*/`
	   <slot name="body"></slot>
	`
};
