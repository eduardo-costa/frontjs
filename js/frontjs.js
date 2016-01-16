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
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
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
var js_front_FRequest = function() {
};
js_front_FRequest.__name__ = true;
js_front_FRequest.prototype = {
	create: function(p_method,p_url,p_callback,p_binary,p_data,p_headers) {
		if(p_binary == null) p_binary = false;
		var method;
		if(p_method == null) method = "get"; else method = p_method;
		var binary = p_binary;
		var ld = new XMLHttpRequest();
		if(binary) {
			if($bind(ld,ld.overrideMimeType) != null) ld.overrideMimeType("application/octet-stream");
			ld.responseType = "arraybuffer";
		}
		var req_progress = function(e) {
			var p;
			p = (e.total <= 0?0:e.loaded / (e.total + 5)) * 0.9999;
			if(p_callback != null) p_callback(null,p,e);
		};
		ld.onprogress = req_progress;
		var req_upload_progress = function(e1) {
			if(p_data != null) {
				var p1;
				p1 = (e1.total <= 0?0:e1.loaded / (e1.total + 5)) * 0.9999;
				if(p_callback != null) p_callback(null,-(1.0 - p1),e1);
			}
		};
		ld.upload.onprogress = req_upload_progress;
		var req_onload = function(e2) {
			if(p_callback != null) p_callback(p_binary?new Uint8Array(ld.response):ld.response,1.0,e2);
		};
		ld.onload = req_onload;
		var req_onerror = function(e3) {
			if(p_callback != null) p_callback(null,1.0,e3);
		};
		ld.onerror = req_onerror;
		if(p_headers != null) {
			var fl = Reflect.fields(p_headers);
			var _g1 = 0;
			var _g = fl.length;
			while(_g1 < _g) {
				var i = _g1++;
				ld.setRequestHeader(fl[i],Reflect.getProperty(p_headers,fl[i]));
			}
		}
		ld.open(method,p_url,true);
		if(p_data != null) {
			if(js_Boot.__instanceof(p_data,ArrayBuffer)) ld.send(p_data); else if(js_Boot.__instanceof(p_data,Blob)) ld.send(p_data); else if(typeof(p_data) == "string") ld.send(p_data); else if(js_Boot.__instanceof(p_data,FormData)) ld.send(p_data); else {
				var fd = new FormData();
				var fl1 = Reflect.fields(p_data);
				var _g11 = 0;
				var _g2 = fl1.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					fd.append(fl1[i1],Reflect.getProperty(p_data,fl1[i1]));
				}
				ld.send(fd);
			}
		} else ld.send();
		return ld;
	}
	,get: function(p_url,p_callback,p_binary,p_data,p_headers) {
		if(p_binary == null) p_binary = false;
		return this.create("get",p_url,p_callback,p_binary,p_data,p_headers);
	}
	,post: function(p_url,p_callback,p_binary,p_data,p_headers) {
		if(p_binary == null) p_binary = false;
		return this.create("post",p_url,p_callback,p_binary,p_data,p_headers);
	}
	,__class__: js_front_FRequest
};
var js_front_Front = function() { };
js_front_Front.__name__ = true;
js_front_Front.init = function() {
	js_front_Front.model = new js_front_model_FModel();
	js_front_Front.view = new js_front_view_FView();
	js_front_Front.controller = new js_front_controller_FController();
	js_front_Front.request = new js_front_FRequest();
	window.addEventListener("load",function(e) {
		haxe_Timer.delay((function($this) {
			var $r;
			var delayed_component_cb = function() {
				window.dispatchEvent(new Event("component"));
				js_front_Front.view.parse();
			};
			$r = delayed_component_cb;
			return $r;
		}(this)),1);
	});
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
		var aidx = p_path.indexOf("@");
		var splt;
		if(aidx >= 0) splt = p_path.split("@"); else splt = [];
		if(aidx >= 0) cev.type = splt.pop(); else cev.type = "";
		if(aidx >= 0) cev.view = splt.shift(); else cev.view = "";
		cev.src = null;
		cev.data = p_data;
		var _g1 = 0;
		var _g = this.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.list[i].on(cev);
		}
	}
	,clear: function() {
		var _g1 = 0;
		var _g = this.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.remove(this.list[i]);
		}
	}
	,__class__: js_front_controller_FController
};
var js_front_model_FModel = function() {
};
js_front_model_FModel.__name__ = true;
js_front_model_FModel.prototype = {
	data: function(p_target,p_value) {
		var _g2 = this;
		var v;
		if(typeof(p_target) == "string") v = js_front_Front.view.get(p_target); else v = p_target;
		var res = { };
		js_front_Front.view.traverse(v,function(e) {
			var it = e;
			if(js_front_Front.view.name(it) == "") return;
			var has_children = true;
			if(it.children.length <= 0) has_children = false;
			if(it.nodeName.toLowerCase() == "select") has_children = false;
			if(!has_children) {
				var path = js_front_Front.view.path(it,v);
				var tks = path.split(".");
				var d = res;
				var dv = p_value;
				var _g1 = 0;
				var _g = tks.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i >= tks.length - 1) d[tks[i]] = _g2.value(it,dv == null?dv:dv[tks[i]]); else {
						if(dv != null) dv = dv[tks[i]];
						if(d[tks[i]] == null) d[tks[i]] = { };
						d = d[tks[i]];
					}
				}
			}
		});
		return res;
	}
	,value: function(n,v) {
		var nn = n.nodeName.toLowerCase();
		switch(nn) {
		case "input":
			var itp;
			if(nn == "input") {
				if(n.type == null) itp = ""; else itp = n.type.toLowerCase();
			} else itp = "";
			switch(itp) {
			case "checkbox":
				if(v == null) return n.checked; else return n.checked = v;
				break;
			case "radio":
				if(v == null) return n.checked; else return n.checked = v;
				break;
			case "number":
				if(v == null) return n.valueAsNumber; else return n.valueAsNumber = v;
				break;
			case "range":
				if(v == null) return n.valueAsNumber; else return n.valueAsNumber = v;
				break;
			default:
				if(v == null) return n.value; else return n.value = v;
			}
			break;
		case "select":
			if(v == null) return n.selectedIndex; else return n.selectedIndex = v;
			break;
		case "textarea":
			if(v == null) return n.value; else return n.value = v;
			break;
		default:
			if(v == null) return n.textContent; else return n.textContent = v;
		}
		return "";
	}
	,__class__: js_front_model_FModel
};
var js_front_view_FView = function() {
	this.components = [];
	this.m_mutation_lock = false;
	if(window.MutationObserver != null) {
		var mo = new MutationObserver($bind(this,this.onMutation));
		mo.observe(window.document.body,{ subtree : true, childList : true});
	} else console.warning("FrontJS> MutationObserver not found!");
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
	,parse: function() {
		var _g1 = 0;
		var _g = this.components.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.components[i];
			var l = window.document.body.querySelectorAll(c.tag);
			var _g3 = 0;
			var _g2 = l.length;
			while(_g3 < _g2) {
				var j = _g3++;
				var v = l[j];
				var attribs = v.attributes;
				var text = v.textContent;
				v.innerHTML = StringTools.replace(c.src,"$text",text);
				this.parseElement(c,v);
			}
		}
	}
	,parseElement: function(p_component,p_target) {
		var v = p_target;
		var c = p_component;
		haxe_Timer.delay(function() {
			var p = v.parentElement;
			var _g1 = 0;
			var _g = v.children.length;
			while(_g1 < _g) {
				var i = _g1++;
				var vc = v.children[i];
				var _g3 = 0;
				var _g2 = v.classList.length;
				while(_g3 < _g2) {
					var j = _g3++;
					if(!vc.classList.contains(v.classList[j])) vc.classList.add(v.classList[j]);
				}
				var _g31 = 0;
				var _g21 = v.attributes.length;
				while(_g31 < _g21) {
					var j1 = _g31++;
					var a = v.attributes[j1];
					if(a.name == "class") continue;
					vc.setAttribute(a.name,a.value);
				}
			}
			if(c.init != null) c.init(v);
			var is_inner;
			if(c.inner == null) is_inner = true; else is_inner = c.inner;
			if(is_inner) return;
			var p1 = v.parentElement;
			var _g11 = 0;
			var _g4 = v.children.length;
			while(_g11 < _g4) {
				var i1 = _g11++;
				var vc1 = v.children[i1];
				if(v.nextSibling != null) p1.insertBefore(vc1,v); else p1.appendChild(vc1);
			}
			if(p1 != null) p1.removeChild(v);
		},1);
	}
	,onMutation: function(p_list,p_observer) {
		var _g = this;
		if(this.m_mutation_lock) return;
		this.m_mutation_lock = true;
		this.parse();
		haxe_Timer.delay(function() {
			_g.m_mutation_lock = false;
		},2);
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
