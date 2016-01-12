(function (console) { "use strict";
var Main = function() { };
Main.main = function() {
	window.Front = js_front_Front;
	js_front_Front.init();
};
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var js_front_Front = function() { };
js_front_Front.init = function() {
	js_front_Front.view = new js_front_view_FView();
};
var js_front_view_FView = function() {
};
js_front_view_FView.prototype = {
	get: function(p_path) {
		var l = p_path.split(".");
		if(l.length <= 0) return null;
		var it;
		it = window.document.body;
		while(l.length > 0) {
			var n = l.shift();
			var f = false;
			var _g1 = 0;
			var _g = it.children.length;
			while(_g1 < _g) {
				var i = _g1++;
				var v = it.children[i];
				var vn;
				if(v.attributes.length <= 0) vn = ""; else {
					var n1 = v.attributes[v.attributes.length - 1].name;
					if(n1.charAt(0) == ":") vn = StringTools.replace(n1,":",""); else if(v.hasAttribute("data-name")) vn = v.getAttribute("data-name"); else if(v.hasAttribute("name")) vn = v.getAttribute("name"); else vn = "";
				}
				if(n == vn) {
					it = v;
					f = true;
					break;
				}
			}
			if(!f) return null;
		}
		return it;
	}
	,traverse: function(p_element,p_callback) {
		if(p_callback(p_element) == false) return;
		var _g1 = 0;
		var _g = p_element.children.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.traverse(p_element.children[i],p_callback);
		}
	}
};
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
