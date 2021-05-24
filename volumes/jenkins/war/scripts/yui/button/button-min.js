/*
 Copyright (c) 2011, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.com/yui/license.html
 version: 2.9.0
 */
(function(){var g=YAHOO.util.Dom,m=YAHOO.util.Event,i=YAHOO.lang,l=YAHOO.env.ua,b=YAHOO.widget.Overlay,j=YAHOO.widget.Menu,d={},k=null,e=null,c=null;function f(o,n,r,p){var s,q;if(i.isString(o)&&i.isString(n)){if(l.ie&&(l.ie<9)){q='<input type="'+o+'" name="'+n+'"';if(p){q+=" checked"}q+=">";s=document.createElement(q);s.value=r}else{s=document.createElement("input");s.name=n;s.type=o;s.value=r;if(p){s.checked=true}}}return s}function h(o,v){var n=o.nodeName.toUpperCase(),s=(this.CLASS_NAME_PREFIX+this.CSS_CLASS_NAME),t=this,u,p,q;function w(x){if(!(x in v)){u=o.getAttributeNode(x);if(u&&("value" in u)){YAHOO.log('Setting attribute "'+x+'" using source element\'s attribute value of "'+u.value+'"',"info",t.toString());v[x]=u.value}}}function r(){w("type");if(v.type=="button"){v.type="push"}if(!("disabled" in v)){v.disabled=o.disabled}w("name");w("value");w("title")}switch(n){case"A":v.type="link";w("href");w("target");break;case"INPUT":r();if(!("checked" in v)){v.checked=o.checked}break;case"BUTTON":r();p=o.parentNode.parentNode;if(g.hasClass(p,s+"-checked")){v.checked=true}if(g.hasClass(p,s+"-disabled")){v.disabled=true}o.removeAttribute("value");o.setAttribute("type","button");break}o.removeAttribute("id");o.removeAttribute("name");if(!("tabindex" in v)){v.tabindex=o.tabIndex}if(!("label" in v)){q=n=="INPUT"?o.value:o.innerHTML;if(q&&q.length>0){v.label=q}}}function a(p){var o=p.attributes,n=o.srcelement,r=n.nodeName.toUpperCase(),q=this;if(r==this.NODE_NAME){p.element=n;p.id=n.id;g.getElementsBy(function(s){switch(s.nodeName.toUpperCase()){case"BUTTON":case"A":case"INPUT":h.call(q,s,o);break}},"*",n)}else{switch(r){case"BUTTON":case"A":case"INPUT":h.call(this,n,o);break}}}YAHOO.widget.Button=function(r,o){if(!b&&YAHOO.widget.Overlay){b=YAHOO.widget.Overlay}if(!j&&YAHOO.widget.Menu){j=YAHOO.widget.Menu}var q=YAHOO.widget.Button.superclass.constructor,p,n;if(arguments.length==1&&!i.isString(r)&&!r.nodeName){if(!r.id){r.id=g.generateId();YAHOO.log('No value specified for the button\'s "id" attribute. Setting button id to "'+r.id+'".',"info",this.toString())}YAHOO.log("No source HTML element.  Building the button using the set of configuration attributes.","info",this.toString());q.call(this,(this.createButtonElement(r.type)),r)}else{p={element:null,attributes:(o||{})};if(i.isString(r)){n=g.get(r);if(n){if(!p.attributes.id){p.attributes.id=r}YAHOO.log("Building the button using an existing HTML element as a source element.","info",this.toString());p.attributes.srcelement=n;a.call(this,p);if(!p.element){YAHOO.log("Source element could not be used as is.  Creating a new HTML element for the button.","info",this.toString());p.element=this.createButtonElement(p.attributes.type)}q.call(this,p.element,p.attributes)}}else{if(r.nodeName){if(!p.attributes.id){if(r.id){p.attributes.id=r.id}else{p.attributes.id=g.generateId();YAHOO.log('No value specified for the button\'s "id" attribute. Setting button id to "'+p.attributes.id+'".',"info",this.toString())}}YAHOO.log("Building the button using an existing HTML element as a source element.","info",this.toString());p.attributes.srcelement=r;a.call(this,p);if(!p.element){YAHOO.log("Source element could not be used as is.  Creating a new HTML element for the button.","info",this.toString());p.element=this.createButtonElement(p.attributes.type)}q.call(this,p.element,p.attributes)}}}};YAHOO.extend(YAHOO.widget.Button,YAHOO.util.Element,{_button:null,_menu:null,_hiddenFields:null,_onclickAttributeValue:null,_activationKeyPressed:false,_activationButtonPressed:false,_hasKeyEventHandlers:false,_hasMouseEventHandlers:false,_nOptionRegionX:0,CLASS_NAME_PREFIX:"yui-",NODE_NAME:"SPAN",CHECK_ACTIVATION_KEYS:[32],ACTIVATION_KEYS:[13,32],OPTION_AREA_WIDTH:20,CSS_CLASS_NAME:"button",_setType:function(n){if(n=="split"){this.on("option",this._onOption)}},_setLabel:function(o){this._button.innerHTML=o;var p,n=l.gecko;if(n&&n<1.9&&g.inDocument(this.get("element"))){p=(this.CLASS_NAME_PREFIX+this.CSS_CLASS_NAME);this.removeClass(p);i.later(0,this,this.addClass,p)}},_setTabIndex:function(n){this._button.tabIndex=n},_setTitle:function(n){if(this.get("type")!="link"){this._button.title=n}},_setDisabled:function(n){if(this.get("type")!="link"){if(n){if(this._menu){this._menu.hide()}if(this.hasFocus()){this.blur()}this._button.setAttribute("disabled","disabled");this.addStateCSSClasses("disabled");this.removeStateCSSClasses("hover");this.removeStateCSSClasses("active");this.removeStateCSSClasses("focus")}else{this._button.removeAttribute("disabled");this.removeStateCSSClasses("disabled")}}},_setHref:function(n){if(this.get("type")=="link"){this._button.href=n}},_setTarget:function(n){if(this.get("type")=="link"){this._button.setAttribute("target",n)}},_setChecked:function(n){var o=this.get("type");if(o=="checkbox"||o=="radio"){if(n){this.addStateCSSClasses("checked")}else{this.removeStateCSSClasses("checked")}}},_setMenu:function(u){var p=this.get("lazyloadmenu"),r=this.get("element"),n,w=false,x,o,q;function v(){x.render(r.parentNode);this.removeListener("appendTo",v)}function t(){x.cfg.queueProperty("container",r.parentNode);this.removeListener("appendTo",t)}function s(){var y;if(x){g.addClass(x.element,this.get("menuclassname"));g.addClass(x.element,this.CLASS_NAME_PREFIX+this.get("type")+"-button-menu");x.showEvent.subscribe(this._onMenuShow,null,this);x.hideEvent.subscribe(this._onMenuHide,null,this);x.renderEvent.subscribe(this._onMenuRender,null,this);if(j&&x instanceof j){if(p){y=this.get("container");if(y){x.cfg.queueProperty("container",y)}else{this.on("appendTo",t)}}x.cfg.queueProperty("clicktohide",false);x.keyDownEvent.subscribe(this._onMenuKeyDown,this,true);x.subscribe("click",this._onMenuClick,this,true);this.on("selectedMenuItemChange",this._onSelectedMenuItemChange);q=x.srcElement;if(q&&q.nodeName.toUpperCase()=="SELECT"){q.style.display="none";q.parentNode.removeChild(q)}}else{if(b&&x instanceof b){if(!k){k=new YAHOO.widget.OverlayManager()}k.register(x)}}this._menu=x;if(!w&&!p){if(g.inDocument(r)){x.render(r.parentNode)
}else{this.on("appendTo",v)}}}}if(b){if(j){n=j.prototype.CSS_CLASS_NAME}if(u&&j&&(u instanceof j)){x=u;w=true;s.call(this)}else{if(b&&u&&(u instanceof b)){x=u;w=true;x.cfg.queueProperty("visible",false);s.call(this)}else{if(j&&i.isArray(u)){x=new j(g.generateId(),{lazyload:p,itemdata:u});this._menu=x;this.on("appendTo",s)}else{if(i.isString(u)){o=g.get(u);if(o){if(j&&g.hasClass(o,n)||o.nodeName.toUpperCase()=="SELECT"){x=new j(u,{lazyload:p});s.call(this)}else{if(b){x=new b(u,{visible:false});s.call(this)}}}}else{if(u&&u.nodeName){if(j&&g.hasClass(u,n)||u.nodeName.toUpperCase()=="SELECT"){x=new j(u,{lazyload:p});s.call(this)}else{if(b){if(!u.id){g.generateId(u)}x=new b(u,{visible:false});s.call(this)}}}}}}}}},_setOnClick:function(n){if(this._onclickAttributeValue&&(this._onclickAttributeValue!=n)){this.removeListener("click",this._onclickAttributeValue.fn);this._onclickAttributeValue=null}if(!this._onclickAttributeValue&&i.isObject(n)&&i.isFunction(n.fn)){this.on("click",n.fn,n.obj,n.scope);this._onclickAttributeValue=n}},_isActivationKey:function(n){var s=this.get("type"),o=(s=="checkbox"||s=="radio")?this.CHECK_ACTIVATION_KEYS:this.ACTIVATION_KEYS,q=o.length,r=false,p;if(q>0){p=q-1;do{if(n==o[p]){r=true;break}}while(p--)}return r},_isSplitButtonOptionKey:function(p){var o=(m.getCharCode(p)==40);var n=function(q){m.preventDefault(q);this.removeListener("keypress",n)};if(o){if(l.opera){this.on("keypress",n)}m.preventDefault(p)}return o},_addListenersToForm:function(){var t=this.getForm(),s=YAHOO.widget.Button.onFormKeyPress,r,n,q,p,o;if(t){m.on(t,"reset",this._onFormReset,null,this);m.on(t,"submit",this._onFormSubmit,null,this);n=this.get("srcelement");if(this.get("type")=="submit"||(n&&n.type=="submit")){q=m.getListeners(t,"keypress");r=false;if(q){p=q.length;if(p>0){o=p-1;do{if(q[o].fn==s){r=true;break}}while(o--)}}if(!r){m.on(t,"keypress",s)}}}},_showMenu:function(r){if(YAHOO.widget.MenuManager){YAHOO.widget.MenuManager.hideVisible()}if(k){k.hideAll()}var n=this._menu,q=this.get("menualignment"),p=this.get("focusmenu"),o;if(this._renderedMenu){n.cfg.setProperty("context",[this.get("element"),q[0],q[1]]);n.cfg.setProperty("preventcontextoverlap",true);n.cfg.setProperty("constraintoviewport",true)}else{n.cfg.queueProperty("context",[this.get("element"),q[0],q[1]]);n.cfg.queueProperty("preventcontextoverlap",true);n.cfg.queueProperty("constraintoviewport",true)}this.focus();if(j&&n&&(n instanceof j)){o=n.focus;n.focus=function(){};if(this._renderedMenu){n.cfg.setProperty("minscrollheight",this.get("menuminscrollheight"));n.cfg.setProperty("maxheight",this.get("menumaxheight"))}else{n.cfg.queueProperty("minscrollheight",this.get("menuminscrollheight"));n.cfg.queueProperty("maxheight",this.get("menumaxheight"))}n.show();n.focus=o;n.align();if(r.type=="mousedown"){m.stopPropagation(r)}if(p){n.focus()}}else{if(b&&n&&(n instanceof b)){if(!this._renderedMenu){n.render(this.get("element").parentNode)}n.show();n.align()}}},_hideMenu:function(){var n=this._menu;if(n){n.hide()}},_onMouseOver:function(o){var q=this.get("type"),n,p;if(q==="split"){n=this.get("element");p=(g.getX(n)+(n.offsetWidth-this.OPTION_AREA_WIDTH));this._nOptionRegionX=p}if(!this._hasMouseEventHandlers){if(q==="split"){this.on("mousemove",this._onMouseMove)}this.on("mouseout",this._onMouseOut);this._hasMouseEventHandlers=true}this.addStateCSSClasses("hover");if(q==="split"&&(m.getPageX(o)>p)){this.addStateCSSClasses("hoveroption")}if(this._activationButtonPressed){this.addStateCSSClasses("active")}if(this._bOptionPressed){this.addStateCSSClasses("activeoption")}if(this.isActive()||this._bOptionPressed){m.removeListener(document,"mouseup",this._onDocumentMouseUp)}},_onMouseMove:function(n){var o=this._nOptionRegionX;if(o){if(m.getPageX(n)>o){this.addStateCSSClasses("hoveroption")}else{this.removeStateCSSClasses("hoveroption")}}},_onMouseOut:function(n){var o=this.get("type");this.removeStateCSSClasses("hover");if(o!="menu"){this.removeStateCSSClasses("active")}if(this.isActive()||this._bOptionPressed){m.on(document,"mouseup",this._onDocumentMouseUp,null,this)}if(o==="split"&&(m.getPageX(n)>this._nOptionRegionX)){this.removeStateCSSClasses("hoveroption")}},_onDocumentMouseUp:function(p){this._activationButtonPressed=false;this._bOptionPressed=false;var q=this.get("type"),n,o;if(q=="menu"||q=="split"){n=m.getTarget(p);o=this._menu.element;if(n!=o&&!g.isAncestor(o,n)){this.removeStateCSSClasses((q=="menu"?"active":"activeoption"));this._hideMenu()}}m.removeListener(document,"mouseup",this._onDocumentMouseUp)},_onMouseDown:function(p){var q,o=true;function n(){this._hideMenu();this.removeListener("mouseup",n)}if((p.which||p.button)==1){if(!this.hasFocus()){i.later(0,this,this.focus)}q=this.get("type");if(q=="split"){if(m.getPageX(p)>this._nOptionRegionX){this.fireEvent("option",p);o=false}else{this.addStateCSSClasses("active");this._activationButtonPressed=true}}else{if(q=="menu"){if(this.isActive()){this._hideMenu();this._activationButtonPressed=false}else{this._showMenu(p);this._activationButtonPressed=true}}else{this.addStateCSSClasses("active");this._activationButtonPressed=true}}if(q=="split"||q=="menu"){this._hideMenuTimer=i.later(250,this,this.on,["mouseup",n])}}return o},_onMouseUp:function(p){this.inMouseDown=false;var q=this.get("type"),n=this._hideMenuTimer,o=true;if(n){n.cancel()}if(q=="checkbox"||q=="radio"){if((p.which||p.button)!=1){return}this.set("checked",!(this.get("checked")))}this._activationButtonPressed=false;if(q!="menu"){this.removeStateCSSClasses("active")}if(q=="split"&&m.getPageX(p)>this._nOptionRegionX){o=false}return o},_onFocus:function(o){var n;this.addStateCSSClasses("focus");if(this._activationKeyPressed){this.addStateCSSClasses("active")}c=this;if(!this._hasKeyEventHandlers){n=this._button;m.on(n,"blur",this._onBlur,null,this);m.on(n,"keydown",this._onKeyDown,null,this);m.on(n,"keyup",this._onKeyUp,null,this);this._hasKeyEventHandlers=true}this.fireEvent("focus",o)},_onBlur:function(n){this.removeStateCSSClasses("focus");if(this.get("type")!="menu"){this.removeStateCSSClasses("active")
}if(this._activationKeyPressed){m.on(document,"keyup",this._onDocumentKeyUp,null,this)}c=null;this.fireEvent("blur",n)},_onDocumentKeyUp:function(n){if(this._isActivationKey(m.getCharCode(n))){this._activationKeyPressed=false;m.removeListener(document,"keyup",this._onDocumentKeyUp)}},_onKeyDown:function(o){var n=this._menu;if(this.get("type")=="split"&&this._isSplitButtonOptionKey(o)){this.fireEvent("option",o)}else{if(this._isActivationKey(m.getCharCode(o))){if(this.get("type")=="menu"){this._showMenu(o)}else{this._activationKeyPressed=true;this.addStateCSSClasses("active")}}}if(n&&n.cfg.getProperty("visible")&&m.getCharCode(o)==27){n.hide();this.focus()}},_onKeyUp:function(n){var o;if(this._isActivationKey(m.getCharCode(n))){o=this.get("type");if(o=="checkbox"||o=="radio"){this.set("checked",!(this.get("checked")))}this._activationKeyPressed=false;if(this.get("type")!="menu"){this.removeStateCSSClasses("active")}}},_onClick:function(p){var r=this.get("type"),q,n,o;switch(r){case"submit":if(p.returnValue!==false){this.submitForm()}break;case"reset":q=this.getForm();if(q){q.reset()}break;case"split":if(this._nOptionRegionX>0&&(m.getPageX(p)>this._nOptionRegionX)){o=false}else{this._hideMenu();n=this.get("srcelement");if(n&&n.type=="submit"&&p.returnValue!==false){this.submitForm()}}break}return o},_onDblClick:function(o){var n=true;if(this.get("type")=="split"&&m.getPageX(o)>this._nOptionRegionX){n=false}return n},_onAppendTo:function(n){i.later(0,this,this._addListenersToForm)},_onFormReset:function(o){var p=this.get("type"),n=this._menu;if(p=="checkbox"||p=="radio"){this.resetValue("checked")}if(j&&n&&(n instanceof j)){this.resetValue("selectedMenuItem")}},_onFormSubmit:function(n){this.createHiddenFields()},_onDocumentMouseDown:function(r){var o=m.getTarget(r),q=this.get("element"),p=this._menu.element;function n(t){var v,s,u;if(!t){return true}for(v=0,s=t.length;v<s;v++){u=t[v].element;if(o==u||g.isAncestor(u,o)){return true}if(t[v]&&t[v].getSubmenus){if(n(t[v].getSubmenus())){return true}}}return false}if(o!=q&&!g.isAncestor(q,o)&&o!=p&&!g.isAncestor(p,o)){if(this._menu&&this._menu.getSubmenus){if(!n(this._menu.getSubmenus())){return}}this._hideMenu();if(l.ie&&(l.ie<9)&&o.focus){o.setActive()}m.removeListener(document,"mousedown",this._onDocumentMouseDown)}},_onOption:function(n){if(this.hasClass(this.CLASS_NAME_PREFIX+"split-button-activeoption")){this._hideMenu();this._bOptionPressed=false}else{this._showMenu(n);this._bOptionPressed=true}},_onMenuShow:function(n){m.on(document,"mousedown",this._onDocumentMouseDown,null,this);var o=(this.get("type")=="split")?"activeoption":"active";this.addStateCSSClasses(o)},_onMenuHide:function(n){var o=(this.get("type")=="split")?"activeoption":"active";this.removeStateCSSClasses(o);if(this.get("type")=="split"){this._bOptionPressed=false}},_onMenuKeyDown:function(p,o){var n=o[0];if(m.getCharCode(n)==27){this.focus();if(this.get("type")=="split"){this._bOptionPressed=false}}},_onMenuRender:function(p){var s=this.get("element"),o=s.parentNode,n=this._menu,r=n.element,q=n.srcElement,t;if(o!=r.parentNode){o.appendChild(r)}this._renderedMenu=true;if(q&&q.nodeName.toLowerCase()==="select"&&q.value){t=n.getItem(q.selectedIndex);this.set("selectedMenuItem",t,true);this._onSelectedMenuItemChange({newValue:t})}},_onMenuClick:function(o,n){var q=n[1],p;if(q){this.set("selectedMenuItem",q);p=this.get("srcelement");if(p&&p.type=="submit"){this.submitForm()}this._hideMenu()}},_onSelectedMenuItemChange:function(o){var p=o.prevValue,q=o.newValue,n=this.CLASS_NAME_PREFIX;if(p){g.removeClass(p.element,(n+"button-selectedmenuitem"))}if(q){g.addClass(q.element,(n+"button-selectedmenuitem"))}},_onLabelClick:function(n){this.focus();var o=this.get("type");if(o=="radio"||o=="checkbox"){this.set("checked",(!this.get("checked")))}},createButtonElement:function(n){var p=this.NODE_NAME,o=document.createElement(p);o.innerHTML="<"+p+' class="first-child">'+(n=="link"?"<a></a>":'<button type="button"></button>')+"</"+p+">";return o},addStateCSSClasses:function(o){var p=this.get("type"),n=this.CLASS_NAME_PREFIX;if(i.isString(o)){if(o!="activeoption"&&o!="hoveroption"){this.addClass(n+this.CSS_CLASS_NAME+("-"+o))}this.addClass(n+p+("-button-"+o))}},removeStateCSSClasses:function(o){var p=this.get("type"),n=this.CLASS_NAME_PREFIX;if(i.isString(o)){this.removeClass(n+this.CSS_CLASS_NAME+("-"+o));this.removeClass(n+p+("-button-"+o))}},createHiddenFields:function(){this.removeHiddenFields();var v=this.getForm(),z,o,s,x,y,t,u,n,r,w,p,q=false;if(v&&!this.get("disabled")){o=this.get("type");s=(o=="checkbox"||o=="radio");if((s&&this.get("checked"))||(e==this)){YAHOO.log("Creating hidden field.","info",this.toString());z=f((s?o:"hidden"),this.get("name"),this.get("value"),this.get("checked"));if(z){if(s){z.style.display="none"}v.appendChild(z)}}x=this._menu;if(j&&x&&(x instanceof j)){YAHOO.log("Creating hidden field for menu.","info",this.toString());y=this.get("selectedMenuItem");p=x.srcElement;q=(p&&p.nodeName.toUpperCase()=="SELECT");if(y){u=(y.value===null||y.value==="")?y.cfg.getProperty("text"):y.value;t=this.get("name");if(q){w=p.name}else{if(t){w=(t+"_options")}}if(u&&w){n=f("hidden",w,u);v.appendChild(n)}}else{if(q){n=v.appendChild(p)}}}if(z&&n){this._hiddenFields=[z,n]}else{if(!z&&n){this._hiddenFields=n}else{if(z&&!n){this._hiddenFields=z}}}r=this._hiddenFields}return r},removeHiddenFields:function(){var q=this._hiddenFields,o,p;function n(r){if(g.inDocument(r)){r.parentNode.removeChild(r)}}if(q){if(i.isArray(q)){o=q.length;if(o>0){p=o-1;do{n(q[p])}while(p--)}}else{n(q)}this._hiddenFields=null}},submitForm:function(){var q=this.getForm(),p=this.get("srcelement"),o=false,n;if(q){if(this.get("type")=="submit"||(p&&p.type=="submit")){e=this}if(q.requestSubmit){return q.requestSubmit()}if(l.ie&&(l.ie<9)){o=q.fireEvent("onsubmit")}else{n=document.createEvent("HTMLEvents");n.initEvent("submit",true,true);o=q.dispatchEvent(n)}if((l.ie||l.webkit)&&o){q.submit()}}return o},init:function(p,D){var v=D.type=="link"?"a":"button",A=D.srcelement,s=p.getElementsByTagName(v)[0],u;
if(!s){u=p.getElementsByTagName("input")[0];if(u){s=document.createElement("button");s.setAttribute("type","button");u.parentNode.replaceChild(s,u)}}this._button=s;YAHOO.widget.Button.superclass.init.call(this,p,D);var t=this.get("id"),z=t+"-button";s.id=z;var x,q;var E=function(F){return(F.htmlFor===t)};var C=function(){q.setAttribute((l.ie?"htmlFor":"for"),z)};if(A&&this.get("type")!="link"){x=g.getElementsBy(E,"label");if(i.isArray(x)&&x.length>0){q=x[0]}}d[t]=this;var B=this.CLASS_NAME_PREFIX;this.addClass(B+this.CSS_CLASS_NAME);this.addClass(B+this.get("type")+"-button");m.on(this._button,"focus",this._onFocus,null,this);this.on("mouseover",this._onMouseOver);this.on("mousedown",this._onMouseDown);this.on("mouseup",this._onMouseUp);this.on("click",this._onClick);var r=this.get("onclick");this.set("onclick",null);this.set("onclick",r);this.on("dblclick",this._onDblClick);var o;if(q){if(this.get("replaceLabel")){this.set("label",q.innerHTML);o=q.parentNode;o.removeChild(q)}else{this.on("appendTo",C);m.on(q,"click",this._onLabelClick,null,this);this._label=q}}this.on("appendTo",this._onAppendTo);var n=this.get("container"),y=this.get("element"),w=g.inDocument(y);if(n){if(A&&A!=y){o=A.parentNode;if(o){o.removeChild(A)}}if(i.isString(n)){m.onContentReady(n,this.appendTo,n,this)}else{this.on("init",function(){i.later(0,this,this.appendTo,n)})}}else{if(!w&&A&&A!=y){o=A.parentNode;if(o){this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:o});o.replaceChild(y,A);this.fireEvent("appendTo",{type:"appendTo",target:o})}}else{if(this.get("type")!="link"&&w&&A&&A==y){this._addListenersToForm()}}}YAHOO.log("Initialization completed.","info",this.toString());this.fireEvent("init",{type:"init",target:this})},initAttributes:function(o){var n=o||{};YAHOO.widget.Button.superclass.initAttributes.call(this,n);this.setAttributeConfig("type",{value:(n.type||"push"),validator:i.isString,writeOnce:true,method:this._setType});this.setAttributeConfig("label",{value:n.label,validator:i.isString,method:this._setLabel});this.setAttributeConfig("value",{value:n.value});this.setAttributeConfig("name",{value:n.name,validator:i.isString});this.setAttributeConfig("tabindex",{value:n.tabindex,validator:i.isNumber,method:this._setTabIndex});this.configureAttribute("title",{value:n.title,validator:i.isString,method:this._setTitle});this.setAttributeConfig("disabled",{value:(n.disabled||false),validator:i.isBoolean,method:this._setDisabled});this.setAttributeConfig("href",{value:n.href,validator:i.isString,method:this._setHref});this.setAttributeConfig("target",{value:n.target,validator:i.isString,method:this._setTarget});this.setAttributeConfig("checked",{value:(n.checked||false),validator:i.isBoolean,method:this._setChecked});this.setAttributeConfig("container",{value:n.container,writeOnce:true});this.setAttributeConfig("srcelement",{value:n.srcelement,writeOnce:true});this.setAttributeConfig("menu",{value:null,method:this._setMenu,writeOnce:true});this.setAttributeConfig("lazyloadmenu",{value:(n.lazyloadmenu===false?false:true),validator:i.isBoolean,writeOnce:true});this.setAttributeConfig("menuclassname",{value:(n.menuclassname||(this.CLASS_NAME_PREFIX+"button-menu")),validator:i.isString,method:this._setMenuClassName,writeOnce:true});this.setAttributeConfig("menuminscrollheight",{value:(n.menuminscrollheight||90),validator:i.isNumber});this.setAttributeConfig("menumaxheight",{value:(n.menumaxheight||0),validator:i.isNumber});this.setAttributeConfig("menualignment",{value:(n.menualignment||["tl","bl"]),validator:i.isArray});this.setAttributeConfig("selectedMenuItem",{value:null});this.setAttributeConfig("onclick",{value:n.onclick,method:this._setOnClick});this.setAttributeConfig("focusmenu",{value:(n.focusmenu===false?false:true),validator:i.isBoolean});this.setAttributeConfig("replaceLabel",{value:false,validator:i.isBoolean,writeOnce:true})},focus:function(){if(!this.get("disabled")){try{this._button.focus()}catch(n){}}},blur:function(){if(!this.get("disabled")){try{this._button.blur()}catch(n){}}},hasFocus:function(){return(c==this)},isActive:function(){return this.hasClass(this.CLASS_NAME_PREFIX+this.CSS_CLASS_NAME+"-active")},getMenu:function(){return this._menu},getForm:function(){var n=this._button,o;if(n){o=n.form}return o},getHiddenFields:function(){return this._hiddenFields},destroy:function(){YAHOO.log("Destroying ...","info",this.toString());var p=this.get("element"),n=this._menu,t=this._label,o,s;if(n){YAHOO.log("Destroying menu.","info",this.toString());if(k&&k.find(n)){k.remove(n)}n.destroy()}YAHOO.log("Removing DOM event listeners.","info",this.toString());m.purgeElement(p);m.purgeElement(this._button);m.removeListener(document,"mouseup",this._onDocumentMouseUp);m.removeListener(document,"keyup",this._onDocumentKeyUp);m.removeListener(document,"mousedown",this._onDocumentMouseDown);if(t){m.removeListener(t,"click",this._onLabelClick);o=t.parentNode;o.removeChild(t)}var q=this.getForm();if(q){m.removeListener(q,"reset",this._onFormReset);m.removeListener(q,"submit",this._onFormSubmit)}YAHOO.log("Removing CustomEvent listeners.","info",this.toString());this.unsubscribeAll();o=p.parentNode;if(o){o.removeChild(p)}YAHOO.log("Removing from document.","info",this.toString());delete d[this.get("id")];var r=(this.CLASS_NAME_PREFIX+this.CSS_CLASS_NAME);s=g.getElementsByClassName(r,this.NODE_NAME,q);if(i.isArray(s)&&s.length===0){m.removeListener(q,"keypress",YAHOO.widget.Button.onFormKeyPress)}YAHOO.log("Destroyed.","info",this.toString())},fireEvent:function(o,n){var p=arguments[0];if(this.DOM_EVENTS[p]&&this.get("disabled")){return false}return YAHOO.widget.Button.superclass.fireEvent.apply(this,arguments)},toString:function(){return("Button "+this.get("id"))}});YAHOO.widget.Button.onFormKeyPress=function(r){var p=m.getTarget(r),s=m.getCharCode(r),q=p.nodeName&&p.nodeName.toUpperCase(),n=p.type,t=false,v,x,o,w;function u(A){var z,y;switch(A.nodeName.toUpperCase()){case"INPUT":case"BUTTON":if(A.type=="submit"&&!A.disabled){if(!t&&!o){o=A}}break;
default:z=A.id;if(z){v=d[z];if(v){t=true;if(!v.get("disabled")){y=v.get("srcelement");if(!x&&(v.get("type")=="submit"||(y&&y.type=="submit"))){x=v}}}}break}}if(s==13&&((q=="INPUT"&&(n=="text"||n=="password"||n=="checkbox"||n=="radio"||n=="file"))||q=="SELECT")){g.getElementsBy(u,"*",this);if(o){o.focus()}else{if(!o&&x){m.preventDefault(r);if(l.ie){if(l.ie<9){x.get("element").fireEvent("onclick")}else{w=document.createEvent("HTMLEvents");w.initEvent("click",true,true);x.get("element").dispatchEvent(w)}}else{w=document.createEvent("HTMLEvents");w.initEvent("click",true,true);if(l.gecko<1.9){x.fireEvent("click",w)}else{x.get("element").dispatchEvent(w)}}}}}};YAHOO.widget.Button.addHiddenFieldsToForm=function(n){var r=YAHOO.widget.Button.prototype,t=g.getElementsByClassName((r.CLASS_NAME_PREFIX+r.CSS_CLASS_NAME),"*",n),q=t.length,s,o,p;if(q>0){YAHOO.log("Form contains "+q+" YUI buttons.","info",this.toString());for(p=0;p<q;p++){o=t[p].id;if(o){s=d[o];if(s){s.createHiddenFields()}}}}};YAHOO.widget.Button.getButton=function(n){return d[n]}})();(function(){var c=YAHOO.util.Dom,b=YAHOO.util.Event,d=YAHOO.lang,a=YAHOO.widget.Button,e={};YAHOO.widget.ButtonGroup=function(j,h){var i=YAHOO.widget.ButtonGroup.superclass.constructor,k,g,f;if(arguments.length==1&&!d.isString(j)&&!j.nodeName){if(!j.id){f=c.generateId();j.id=f;YAHOO.log('No value specified for the button group\'s "id" attribute. Setting button group id to "'+f+'".',"info")}this.logger=new YAHOO.widget.LogWriter("ButtonGroup "+f);this.logger.log("No source HTML element.  Building the button group using the set of configuration attributes.");i.call(this,(this._createGroupElement()),j)}else{if(d.isString(j)){g=c.get(j);if(g){if(g.nodeName.toUpperCase()==this.NODE_NAME){this.logger=new YAHOO.widget.LogWriter("ButtonGroup "+j);i.call(this,g,h)}}}else{k=j.nodeName.toUpperCase();if(k&&k==this.NODE_NAME){if(!j.id){j.id=c.generateId();YAHOO.log('No value specified for the button group\'s "id" attribute. Setting button group id to "'+j.id+'".',"warn")}this.logger=new YAHOO.widget.LogWriter("ButtonGroup "+j.id);i.call(this,j,h)}}}};YAHOO.extend(YAHOO.widget.ButtonGroup,YAHOO.util.Element,{_buttons:null,NODE_NAME:"DIV",CLASS_NAME_PREFIX:"yui-",CSS_CLASS_NAME:"buttongroup",_createGroupElement:function(){var f=document.createElement(this.NODE_NAME);return f},_setDisabled:function(g){var h=this.getCount(),f;if(h>0){f=h-1;do{this._buttons[f].set("disabled",g)}while(f--)}},_onKeyDown:function(k){var g=b.getTarget(k),i=b.getCharCode(k),h=g.parentNode.parentNode.id,j=e[h],f=-1;if(i==37||i==38){f=(j.index===0)?(this._buttons.length-1):(j.index-1)}else{if(i==39||i==40){f=(j.index===(this._buttons.length-1))?0:(j.index+1)}}if(f>-1){this.check(f);this.getButton(f).focus()}},_onAppendTo:function(h){var j=this._buttons,g=j.length,f;for(f=0;f<g;f++){j[f].appendTo(this.get("element"))}},_onButtonCheckedChange:function(g,f){var i=g.newValue,h=this.get("checkedButton");if(i&&h!=f){if(h){h.set("checked",false,true)}this.set("checkedButton",f);this.set("value",f.get("value"))}else{if(h&&!h.set("checked")){h.set("checked",true,true)}}},init:function(i,h){this._buttons=[];YAHOO.widget.ButtonGroup.superclass.init.call(this,i,h);this.addClass(this.CLASS_NAME_PREFIX+this.CSS_CLASS_NAME);var k=(YAHOO.widget.Button.prototype.CLASS_NAME_PREFIX+"radio-button"),j=this.getElementsByClassName(k);this.logger.log("Searching for child nodes with the class name "+k+" to add to the button group.");if(j.length>0){this.logger.log("Found "+j.length+" child nodes with the class name "+k+"  Attempting to add to button group.");this.addButtons(j)}this.logger.log('Searching for child nodes with the type of  "radio" to add to the button group.');function f(l){return(l.type=="radio")}j=c.getElementsBy(f,"input",this.get("element"));if(j.length>0){this.logger.log("Found "+j.length+' child nodes with the type of "radio."  Attempting to add to button group.');this.addButtons(j)}this.on("keydown",this._onKeyDown);this.on("appendTo",this._onAppendTo);var g=this.get("container");if(g){if(d.isString(g)){b.onContentReady(g,function(){this.appendTo(g)},null,this)}else{this.appendTo(g)}}this.logger.log("Initialization completed.")},initAttributes:function(g){var f=g||{};YAHOO.widget.ButtonGroup.superclass.initAttributes.call(this,f);this.setAttributeConfig("name",{value:f.name,validator:d.isString});this.setAttributeConfig("disabled",{value:(f.disabled||false),validator:d.isBoolean,method:this._setDisabled});this.setAttributeConfig("value",{value:f.value});this.setAttributeConfig("container",{value:f.container,writeOnce:true});this.setAttributeConfig("checkedButton",{value:null})},addButton:function(j){var l,k,g,f,h,i;if(j instanceof a&&j.get("type")=="radio"){l=j}else{if(!d.isString(j)&&!j.nodeName){j.type="radio";l=new a(j)}else{l=new a(j,{type:"radio"})}}if(l){f=this._buttons.length;h=l.get("name");i=this.get("name");l.index=f;this._buttons[f]=l;e[l.get("id")]=l;if(h!=i){l.set("name",i)}if(this.get("disabled")){l.set("disabled",true)}if(l.get("checked")){this.set("checkedButton",l)}k=l.get("element");g=this.get("element");if(k.parentNode!=g){g.appendChild(k)}l.on("checkedChange",this._onButtonCheckedChange,l,this);this.logger.log("Button "+l.get("id")+" added.")}return l},addButtons:function(g){var h,j,k,f;if(d.isArray(g)){h=g.length;k=[];if(h>0){for(f=0;f<h;f++){j=this.addButton(g[f]);if(j){k[k.length]=j}}}}return k},removeButton:function(h){var j=this.getButton(h),g,f;if(j){this.logger.log("Removing button "+j.get("id")+".");this._buttons.splice(h,1);delete e[j.get("id")];j.removeListener("checkedChange",this._onButtonCheckedChange);j.destroy();g=this._buttons.length;if(g>0){f=this._buttons.length-1;do{this._buttons[f].index=f}while(f--)}this.logger.log("Button "+j.get("id")+" removed.")}},getButton:function(f){return this._buttons[f]},getButtons:function(){return this._buttons},getCount:function(){return this._buttons.length},focus:function(h){var j,g,f;if(d.isNumber(h)){j=this._buttons[h];if(j){j.focus()}}else{g=this.getCount();for(f=0;
f<g;f++){j=this._buttons[f];if(!j.get("disabled")){j.focus();break}}}},check:function(f){var g=this.getButton(f);if(g){g.set("checked",true)}},destroy:function(){this.logger.log("Destroying...");var j=this._buttons.length,h=this.get("element"),f=h.parentNode,g;if(j>0){g=this._buttons.length-1;do{this._buttons[g].destroy()}while(g--)}this.logger.log("Removing DOM event handlers.");b.purgeElement(h);this.logger.log("Removing from document.");f.removeChild(h)},toString:function(){return("ButtonGroup "+this.get("id"))}})})();YAHOO.register("button",YAHOO.widget.Button,{version:"2.9.0",build:"2800"});