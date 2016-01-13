(function (console, $global) { "use strict";
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	window.Front = js_front_Front;
	js_front_Front.init();
};
Math.__name__ = true;
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_front_Front = function() { };
js_front_Front.__name__ = true;
js_front_Front.init = function() {
	js_front_Front.view = new js_front_view_FView();
	js_front_Front.controller = new js_front_controller_FController();
};
var js_front_controller_Controller = function() {
	this.enabled = true;
	this.allow = ["click","input","change"];
};
js_front_controller_Controller.__name__ = true;
js_front_controller_Controller.prototype = {
	on: function(p_event) {
	}
	,__class__: js_front_controller_Controller
};
var js_front_controller_FController = function() {
	this.list = [];
};
js_front_controller_FController.__name__ = true;
js_front_controller_FController.prototype = {
	add: function(p_controller,p_target) {
		if(p_controller.allow == null) p_controller.allow = ["click","change","input"]; else p_controller.allow = p_controller.allow;
		if(p_controller.enabled == null) p_controller.enabled = true; else p_controller.enabled = p_controller.enabled;
		this.remove(p_controller);
		var v;
		if(typeof(p_target) == "string") v = js_front_Front.view.get(p_target); else v = p_target;
		if(v == null) v = window.document.body;
		p_controller.view = v;
		if(p_controller.handler == null) {
			var controller_handler = function(e) {
				if(!p_controller.enabled) return;
				var cev = { };
				cev.type = e.type;
				cev.src = e;
				if(js_Boot.__instanceof(e.target,Element)) cev.view = js_front_Front.view.path(e.target,v.parentElement); else cev.view = "";
				if(cev.view == "") cev.path = e.type; else if(e.type == "") cev.path = cev.view; else cev.path = cev.view + "@" + e.type;
				cev.data = null;
				if($bind(p_controller,p_controller.on) != null) p_controller.on(cev);
			};
			p_controller.handler = controller_handler;
		}
		var bb = false;
		var _g = 0;
		var _g1 = p_controller.allow;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			bb = false;
			if(s == "focus") bb = true;
			if(s == "blur") bb = true;
			v.addEventListener(s,p_controller.handler,bb);
		}
		this.list.push(p_controller);
		return p_controller;
	}
	,remove: function(p_controller) {
		if(p_controller.handler != null) {
			if(p_controller.view != null) {
				var _g = 0;
				var _g1 = p_controller.allow;
				while(_g < _g1.length) {
					var s = _g1[_g];
					++_g;
					p_controller.view.removeEventListener(s,p_controller.handler);
				}
			}
		}
		p_controller.view = null;
		HxOverrides.remove(this.list,p_controller);
		return p_controller;
	}
	,dispatch: function(p_path,p_data) {
		var cev = { };
		cev.path = p_path;
		if(p_path.indexOf("@") >= 0) cev.type = p_path.split("@").pop(); else cev.type = "";
		if(p_path.indexOf("@") >= 0) cev.view = p_path.split("@").shift(); else cev.view = "";
		cev.src = null;
		cev.data = p_data;
		var _g = 0;
		var _g1 = this.list;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.on(cev);
		}
	}
	,clear: function() {
		var _g = 0;
		var _g1 = this.list;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			this.remove(c);
		}
	}
	,__class__: js_front_controller_FController
};
var js_front_view_FView = function() {
};
js_front_view_FView.__name__ = true;
js_front_view_FView.prototype = {
	name: function(p_target,p_name) {
		if(p_name == null) {
			if(!p_target.hasAttributes()) return "";
			if(p_target.hasAttribute("n")) return p_target.getAttribute("n");
			if(p_target.hasAttribute("data-n")) return p_target.getAttribute("data-n");
			return "";
		}
		if(p_name == null) p_name = ""; else p_name = p_name;
		if(p_target.hasAttribute("data-n")) p_target.setAttribute("data-n",p_name); else p_target.setAttribute("n",p_name);
		return p_name;
	}
	,get: function(p_path) {
		var l = p_path.split(".");
		if(l.length <= 0) return null;
		var it;
		it = window.document.body;
		while(l.length > 0) {
			var n = [l.shift()];
			var f = [false];
			this.traverse(it,(function($this) {
				var $r;
				var get_traverse_cb = (function(f,n) {
					return function(e) {
						var v = e;
						if(n[0] == js_front_Front.view.name(v)) {
							f[0] = true;
							it = e;
							return false;
						}
						return true;
					};
				})(f,n);
				$r = get_traverse_cb;
				return $r;
			}(this)),true);
			if(!f[0]) return null;
		}
		return it;
	}
	,path: function(p_target,p_root) {
		var v = p_target;
		var n = "";
		var res = "";
		if(p_root == null) p_root = window.document.body;
		while(v != p_root) {
			n = js_front_Front.view.name(v);
			if(n != "") res = n + (res == ""?res:"." + res);
			v = v.parentElement;
		}
		return res;
	}
	,contains: function(p_view,p_target) {
		if(p_target == null) return false;
		var v = null;
		if(typeof(p_view) == "string") v = this.get(p_view); else v = p_view;
		if(v == null) return false;
		var is_parent = false;
		var it = p_target;
		while(it.parentElement != window.document.body) {
			if(it.parentElement == v) return true;
			it = it.parentElement;
		}
		return is_parent;
	}
	,query: function(p_query,p_target) {
		var e;
		if(typeof(p_target) == "string") e = this.get(p_target); else e = p_target;
		if(e == null) e = window.document.body;
		var res = [];
		var l = e.querySelectorAll(p_query);
		var _g1 = 0;
		var _g = l.length;
		while(_g1 < _g) {
			var i = _g1++;
			res.push(l[i]);
		}
		return res;
	}
	,parent: function(p_target) {
		var it = p_target;
		while(it != window.document.body) {
			it = it.parentElement;
			if(it.hasAttribute("n")) return it;
			if(it.hasAttribute("data-n")) return it;
		}
		return null;
	}
	,traverse: function(p_element,p_callback,p_bfs) {
		if(p_bfs == null) p_bfs = false;
		if(p_bfs) {
			var l = [p_element];
			var k = 0;
			while(k < l.length) {
				if(p_callback(l[k]) == false) return;
				var _g1 = 0;
				var _g = l[k].children.length;
				while(_g1 < _g) {
					var i = _g1++;
					l.push(l[k].children[i]);
				}
				k++;
			}
			return;
		}
		if(p_callback(p_element) == false) return;
		var _g11 = 0;
		var _g2 = p_element.children.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.traverse(p_element.children[i1],p_callback);
		}
	}
	,__class__: js_front_view_FView
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
js_Boot.__toStr = {}.toString;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
