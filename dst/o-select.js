/*
	Name: oxe-components
	Version: 4.0.0
	License: MPL-2.0
	Author: Arc io
	Email: undefined
	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

export default [
    {
        name: 'o-select',
        template: '<slot></slot>',
        style: 'o-select { display: block; }',
        properties: {
            _selectedOptions: { writable: true, value: [] },
            // _selectedIndex: { writable: true, value: -1 },
            // selectedIndex: {
            //     enumerable: true,
            //     get: function () {
            //         return this._selectedIndex;
            //     }
            // },
            selectedOptions: {
                enumerable: true,
                get: function () {
                    return this._selectedOptions;
                }
            },
            required: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('required');
                },
                set: function (data) {
                    data = data ? true : false;
                    if (data) this.setAttribute('required', '');
                    else this.removeAttribute('required');
                    return data;
                }
            },
            checkValidity: {
                enumerable: true,
                value: function () {
                    if (this.required) {
                        return this.selectedOptions.length ? true : false;
                    } else {
                        return true;
                    }
                }
            },
            type: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('multiple') ? 'select-multiple' : 'select-one';
                }
            },
            options: {
                enumerable: true,
                get: function () {
                    return this.querySelectorAll('o-option');
                }
            },
            disabled: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('disabled');
                },
                set: function (data) {
                    data = data ? true : false;
                    if (data) this.setAttribute('disabled', '');
                    else this.removeAttribute('disabled');
                    return data;
                }
            },
            multiple: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('multiple');
                },
                set: function (data) {
                    data = data ? true : false;
                    if (data) this.setAttribute('multiple', '');
                    else this.removeAttribute('multiple');
                    return data;
                }
            },
            name: {
                enumerable: true,
                get: function () {
                    return this.getAttribute('name') || '';
                },
                set: function (data) {
                    this.setAttribute('name', data);
                    return data;
                }
            }
        },
        created: function () {
            // var self = this;
            //
            // var click = function (e) {
            //
            //     if (self.disabled || e.target === self) {
            //         return;
            //     }
            //
            //     var option = e.target;
            //
            //     if (option.nodeName !== 'O-OPTION') {
            //         while (option = option.parentElement) {
            //             if (option === self) {
            //                 return;
            //             } else if (option.nodeName === 'O-OPTION') {
            //                 if (option.disabled) {
            //                     return;
            //                 } else {
            //                     break;
            //                 }
            //             }
            //         }
            //     }
            //
            //     var optgroup = option;
            //
            //     if (optgroup && optgroup.nodeName !== 'O-OPTGROUP') {
            //         while (optgroup = optgroup.parentElement) {
            //             if (optgroup === self) {
            //                 break;
            //             } else if (optgroup.nodeName === 'O-OPTGROUP') {
            //                 if (optgroup.disabled) {
            //                     return;
            //                 } else {
            //                     break;
            //                 }
            //             }
            //         }
            //     }
            //
            //     if (!self.multiple) {
            //         var options = self.options;
            //         for (var i = 0, l = options.length; i < l; i++) {
            //             options[i].selected = false;
            //         }
            //     }
            //
            //     if (option) {
            //         option.selected = !option.selected;
            //     }
            //
            //     var index = self._selectedOptions.indexOf(option);
            //
            //     if (option.selected) {
            //         if (index === -1) {
            //             self._selectedOptions.push(option);
            //         }
            //     } else {
            //         if (index !== -1) {
            //             self._selectedOptions.splice(index, 1);
            //         }
            //     }
            //
            //     var binder = Oxe.binder.get('attribute', self, 'o-value');
            //     Oxe.binder.render(binder, 'view');
            // };
            //
            // self.addEventListener('click', click);
            //
            // var options = this.querySelectorAll('o-option');
            // for (var i = 0, l = options.length; i < l; i++) {
            //     Object.defineProperty(options[i], 'select', { value: this });
            //     click({ target: options[i] });
            // }

        }
    },
    {
        name: 'o-optgroup',
        template: '<slot></slot>',
        style: 'o-optgroup { display: block; } o-optgroup::before { content: attr(label); }',
        properties: {
            disabled: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('disabled');
                },
                set: function (data) {
                    data = data ? true : false;
                    if (data) this.setAttribute('disabled', '');
                    else this.removeAttribute('disabled');
                    return data;
                }
            }
        },
        created: function () {
            if (this.parentElement && this.parentElement.nodeName !== 'O-SELECT') {
                console.warn('o-optgroup invalid parent element');
            }
        }
    },
    {
        name: 'o-option',
        template: '<slot></slot>',
        style: 'o-option { display: block; }',
        attributes: [ 'value' ],
        properties: {
            _select: {
                get: function () {
                    if (this.parentElement && this.parentElement.nodeName === 'O-SELECT') {
                        return this.parentElement;
                    } else if (this.parentElement.parentElement && this.parentElement.parentElement.nodeName === 'O-SELECT') {
                        return this.parentElement.parentElement;
                    } else {
                        return console.warn('o-option invalid parent type');
                    }
                }
            },
            _group: {
                get: function () {
                    if (this.parentElement && this.parentElement.nodeName === 'O-OPTGROUP') {
                        return this.parentElement;
                    }
                }
            },
            _valueDefaultLocked: {
                writable: true,
                value: false
            },
            _selectedDefaultLocked: {
                writable: true,
                value: false
            },
            _value: {
                writable: true,
                value: ''
            },
            _selected: {
                writable: true,
                value: false
            },
            value: {
                enumerable: true,
                get: function () {
                    if (this._valueDefaultLocked) {
                        return this._value || this.textContent || '';
                    } else {
                        var value = this.getAttribute('value');
                        return value || this._value || this.textContent || '';
                    }
                },
                set: function (data) {
                    this._valueDefaultLocked = true;
                    return this._value = data === null || data === undefined ? '' : data;
                }
            },
            selected: {
                enumerable: true,
                get: function () {
                    if (this._selectedDefaultLocked) {
                        return this._selected;
                    } else {
                        var selected = this.getAttribute('selected');
                        return selected !== null && selected !== 'false' ? true : false;
                    }
                },
                set: function (data) {
                    this._selectedDefaultLocked = true;
                    var selected = this._selected = data ? true : false;

                    // maybe use toggle attribute neeed to test in IE
                    if (selected) this.setAttribute('data-selected', '');
                    else this.removeAttribute('data-selected');

                    var select = this._select;

                    if (!select.multiple) {
                        var old = select.selectedOptions[0];
                        if (old && this !== old) {
                            old.selected = false
                        }
                    }

                    var index = select._selectedOptions.indexOf(this);

                    if (selected) {
                        if (index === -1) {
                            select._selectedOptions.push(this);
                        }
                    } else {
                        if (index !== -1) {
                           select._selectedOptions.splice(index, 1);
                        }
                    }

                    return selected;
                }
            },
            disabled: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('disabled');
                },
                set: function (data) {
                    data = data ? true : false;
                    if (data) this.setAttribute('disabled', '');
                    else this.removeAttribute('disabled');
                    return data;
                }
            },
            name: {
                enumerable: true,
                get: function () {
                    return this.getAttribute('name') || '';
                },
                set: function (data) {
                    this.setAttribute('name', data);
                    return data;
                }
            },
        },
        attributed: function (name, _, data) {
            switch (name) {
            case 'value': this._value = data || ''; break;
            }
        },
        created: function () {
            var self = this;

            self.addEventListener('click', function () {
                var group = self._group;
                var select = self._select;

                if (self.disabled || (select && select.disabled) || (group && group.disabled)) {
                    return;
                }

                self.selected = !self.selected;

                if (select) {
                    var binder = Oxe.binder.get('attribute', select, 'o-value');

                    if (binder) {
                        Oxe.binder.render(binder, 'view');
                    }
                
                }

            });

            if (self.hasAttribute('selected')) {
                click();
                self.setAttribute('data-selected', '');
            } else {
                self.removeAttribute('data-selected');
            }

        }
    }
];
