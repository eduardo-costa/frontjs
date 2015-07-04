(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var js_front_BaseController = function(p_name,p_allow,p_route) {
	this.name = Type.getClassName(js_Boot.getClass(this));
	if(p_name != null) this.name = p_name;
	if(p_allow != null) this.allow = p_allow;
	if(p_route != null) this.route = new RegExp(p_route);
};
js_front_BaseController.__name__ = ["js","front","BaseController"];
js_front_BaseController.prototype = {
	on: function(p_path,p_event,p_target,p_data) {
	}
	,__class__: js_front_BaseController
};
var SimpleController = function(p_name) {
	js_front_BaseController.call(this,p_name);
	this.allow = "model,click";
};
SimpleController.__name__ = ["SimpleController"];
SimpleController.__super__ = js_front_BaseController;
SimpleController.prototype = $extend(js_front_BaseController.prototype,{
	on: function(p_path,p_event,p_target,p_data) {
		console.log(">> " + p_event);
		switch(p_event) {
		case "model":
			console.log(p_data);
			break;
		case "click":
			console.log(p_path);
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
		console.log(Front.model.data("home.form"));
		Front.model.watch("home.form",true);
		Front.controller.add(new SimpleController("simple"));
	};
};
Math.__name__ = ["Math"];
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
