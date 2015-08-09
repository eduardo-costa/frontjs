(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var js_front_mvc_Controller = function(p_name,p_allow,p_route) {
	this.name = Type.getClassName(js_Boot.getClass(this));
	if(p_name != null) this.name = p_name;
	if(p_allow != null) this.allow = p_allow;
	if(p_route != null) this.route = new RegExp(p_route);
};
js_front_mvc_Controller.__name__ = ["js","front","mvc","Controller"];
js_front_mvc_Controller.prototype = {
	on: function(p_path,p_event,p_target,p_data) {
	}
	,__class__: js_front_mvc_Controller
};
var SimpleController = function(p_name) {
	js_front_mvc_Controller.call(this,p_name);
	this.allow = "";
};
SimpleController.__name__ = ["SimpleController"];
SimpleController.__super__ = js_front_mvc_Controller;
SimpleController.prototype = $extend(js_front_mvc_Controller.prototype,{
	on: function(p_path,p_event,p_target,p_data) {
		switch(p_event) {
		case "model":
			console.log(p_path);
			console.log(p_data);
			break;
		case "click":
			console.log(p_path);
			break;
		}
		switch(p_path) {
		case "contact.form.send":
			var url = Front.model.data("contact.form").url;
			var method = Front.model.data("contact.form").method;
			console.log("send " + url);
			Front.request.create(url,function(d,p) {
				console.log("@ " + Std.string(d) + " " + p);
				if(p >= 1) Front.model.value("contact.form.output",d);
			},null,false,method == 1?"post":"get");
			break;
		}
	}
	,__class__: SimpleController
});
var HaxeTest = function() { };
HaxeTest.__name__ = ["HaxeTest"];
HaxeTest.main = function() {
	console.log("FrontJS> Haxe Example");
	window.onload = function(p_event) {
		Front.initialize();
		Front.model.watch("home.form",true);
		Front.controller.add(new SimpleController("simple"));
	};
};
Math.__name__ = ["Math"];
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
js_Boot.__toStr = {}.toString;
HaxeTest.main();
})(typeof console != "undefined" ? console : {log:function(){}});
