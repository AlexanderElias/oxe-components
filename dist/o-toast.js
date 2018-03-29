export default{name:'o-toast',model:{code:'',type:'',title:'',message:'',details:''},properties:{time:{enumerable:!0,configurable:!0,get:function(){return this._time||3e3},set:function(){return this._time=arguments[0]||3e3}},show:{enumerable:!0,value:function(a){var b=this;if(b.model.code=a.code,b.model.type=a.type,b.model.title=a.title||'',b.model.message=a.message||'',b.model.details=a.details||'',b.model.type||b.model.code){var c=b.model.type||b.model.code;'number'==typeof c&&(200<=b.model.code&&300>b.model.code||304==b.model.code?c='success':c='error'),b.eToast.style.setProperty('background-color','var(--o-toast-'+c+')')}b.eToast.classList.add('active'),setTimeout(function(){b.eToast.classList.remove('active')},b.time)}}},created:function(){this.eToast=this.querySelector('.o-toast')},style:'\n\t\t:host {\n\t\t\t--o-toast-widget: #999;\n\t\t\t--o-toast-font: currentColor;\n\t\t\t--o-toast-shadow: rgba(0, 0, 0, 0.1);\n\t\t}\n\t\t.o-toast {\n\t\t\tright: 0;\n\t\t\tbottom: 0;\n\t\t\twidth: 300px;\n\t\t\tpadding: 1rem;\n\t\t\tposition: fixed;\n\t\t\tborder-radius: 1px;\n\t\t\ttransform: translate(100%, -60%);\n\t\t\tbackground-color: var(--o-toast-widget);\n\t\t\tbox-shadow: 0 3px 9px var(--o-toast-shadow);\n\t\t}\n\t\t.o-toast-title {\n\t\t\tcolor: var(--o-toast-font);\n\t\t\tfont-weight: bolder;\n\t\t}\n\t\t.o-toast-message {\n\t\t\tcolor: var(--o-toast-font);\n\t\t}\n\t\t.o-toast.active {\n\t\t\ttransform: translate(-10%, -60%);\n\t\t}\n\t',template:'\n\t\t<div class="o-toast">\n\t\t\t<div class="o-toast-title" o-text="title"></div>\n\t\t\t<div class="o-toast-message" o-text="message"></div>\n\t\t</div>\n\t'};