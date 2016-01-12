package js.front.view;
import js.html.Element;

/**
 * Class that describes an HTML's Element as View.
 * @author eduardo-costa
 */
extern class View extends Element
{
	/**
	 * Name attrib of the this Element View.
	 * @param	get
	 * @param	set
	 * @return
	 */
	public var name(get, set):String;
	inline private function get_name():String 
	{ 
		if (this.attributes.length <= 0) return "";
		var n : String = this.attributes[this.attributes.length - 1].name;
		if (n.charAt(0) == ":") 			return StringTools.replace(n, ":", "");
		if (this.hasAttribute("data-name")) return this.getAttribute("data-name");
		if (this.hasAttribute("name")) 		return this.getAttribute("name");
		return "";
	}	
	inline private function set_name(v:String):String 
	{		
		if (this.attributes.length <= 1) return "";
		v = v == null ? "" : v;
		this.removeAttribute(this.attributes[this.attributes.length].name);
		this.setAttribute(":" + v, "");
		return v;
	}
	
	/**
	 * Shortcut to query select using this element as root.
	 * @param	p_query
	 * @return
	 */
	inline public function query(p_query:String):View { return cast this.querySelector(p_query); }
	
	/**
	 * Shortcut to query select using this element as root.
	 * @param	p_query
	 * @return
	 */
	inline public function queryAll(p_query:String):Array<View> { return cast this.querySelectorAll(p_query); }
}