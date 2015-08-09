package js.front.mvc;
import js.html.Element;


/**
 * Class that implements View features using the DOM elements returned from FrontView.
 * @author Eduardo Pons - eduardo@thelaborat.org
 */
extern class View extends Element implements Dynamic<Dynamic>
{	
	/**
	 * Returns this element parent converted to view.
	 */
	public var parent(get, never):View;
	private inline function get_parent():View { return cast this.parentElement; }
	
	/**
	 * Flag that indicates this element was added in the hierarchy.
	 */
	public var added(get, never):Bool;
	private inline function get_added():Bool { return (this.parentElement != null); }
	
	/**
	 * Returns this view attribute by its name.
	 * @param	p_v
	 * @return
	 */
	public inline function attribute(p_k:String, p_v:String = ""):String 
	{ 
		if (p_v == "") return this.hasAttribute(p_k) ? this.getAttribute(p_k) : "";
		if (p_v == null) { if (this.hasAttribute(p_k)) this.removeAttribute(p_k); return ""; }
		this.setAttribute(p_k, p_v);
		return p_v;
	}
	
	/**
	 * Get/Set the 'view' atribute of this Element.
	 */
	public var name(get, set):String;
	private inline function get_name():String { return this.attribute("view"); }
	private inline function set_name(v:String):String { this.attribute("view", v); return v; }
	
	/**
	 * Returns a flag indicating this element is visible.
	 */
	public var visible(get, set):Bool;
	private inline function get_visible():Bool { return this.style.display.indexOf("none") < 0; }
	private inline function set_visible(v:Bool):Bool { this.style.display = v ? "" : "none"; return v; }
	
	/**
	 * Returns the opacity level of this element.
	 */
	public var opacity(get, set):Float;
	private inline function get_opacity():Float { return this.style.opacity=="" ? 1.0 : Std.parseFloat(this.style.opacity); }
	private inline function set_opacity(v:Float):Float { v = (v >= 1.0 ? 1.0 : (v<=0.0 ? 0.0 : v)); this.style.opacity = (v >= 1.0) ? "" : (v + ""); return v; }
	
	
	/**
	 * Adds a new child at the designated position.
	 * @param	p_view
	 * @return
	 */
	public inline function insert(p_view:View,p_index:Int):View
	{	
		var p : Int = p_index<0 ? 0 : (p_index > this.children.length ? (this.children.length) : p_index);
		if (p_view.parentElement != this) if(p_view.added) p_view.parentElement.removeChild(p_view);
		if(p>=this.children.length) this.appendChild(p_view) else this.insertBefore(p_view, this.children[p]);
		return p_view;
	}
	
	/**
	 * Adds a new children at the end of this hierarchy.
	 * @param	p_view
	 * @return
	 */
	public inline function add(p_view:View):View { return this.insert(p_view, this.children.length); }
	
	/**
	 * Swaps the hierarchy position of 2 children.
	 * @param	p_a
	 * @param	p_b
	 */
	public inline function swap(p_a:View, p_b:View):Void
	{
		if (p_a.parentElement == null) return;
		if (p_b.parentElement == null) return;
		if (p_a.parentElement != this) return;
		if (p_b.parentElement != this) return;
		this.insertBefore(p_b,p_a);
	}
	
	/**
	 * Swap 2 children in the specified indexes.
	 * @param	p_a
	 * @param	p_b
	 */
	public inline function swapAt(p_a:Int, p_b:Int):Void
	{
		var ia : Int = p_a<0 ? 0 : (p_a >= this.children.length ? (this.children.length-1) : p_a);		
		var ib : Int = p_b<0 ? 0 : (p_b >= this.children.length ? (this.children.length-1) : p_b);			
		this.swap(this.child(ia), this.child(ib));
	}
	
	/**
	 * Sends a given child to the front of the hierarchy.
	 * @param	p_a
	 * @return
	 */
	public inline function toFront(p_a:View):View { this.insert(p_a,this.childCount); return p_a;	}
	
	/**
	 * Advances the child one step front in the hierarchy.
	 * @param	p_a
	 * @return
	 */
	public inline function stepFront(p_a:View):View { if (!p_a.added) return p_a; if (p_a.parentElement != this) return p_a; if (p_a.nextElementSibling != null) this.swap(p_a, cast p_a.nextElementSibling); return p_a;	}
	
	/**
	 * Sends a given child to the back of the hierarchy.
	 * @param	p_a
	 * @return
	 */
	public inline function toBack(p_a:View):View { this.insert(p_a, 0); return p_a;	}
	
	/**
	 * Advances the child one step back from the hierarchy.
	 * @param	p_a
	 * @return
	 */
	public inline function stepBack(p_a:View):View { if (!p_a.added) return p_a; if (p_a.parentElement != this) return p_a; if (p_a.previousElementSibling != null) this.swap(p_a, cast p_a.previousElementSibling); return p_a;	}
	
	/**
	 * Returns this element's index position in the hierarchy.
	 */
	public var index(get, set):Int;
	private inline function get_index():Int
	{
		var k : Int = 0;
		var n : Element = cast this.previousElementSibling;
		while (n != null) { n = cast n.previousElementSibling; k++; }
		return k;
	}
	private inline function set_index(v:Int):Int { if (!this.added) return v; parent.removeChild(this); parent.insert(this, v); return this.index; }
	
	/**
	 * Returns this View children as View.
	 * @param	p_index
	 * @return
	 */
	public inline function child(p_index:Int):View { return cast this.children[p_index]; }
	
	/**
	 * Number of child elements.
	 */
	public var childCount(get, never):Int;
	inline function get_childCount():Int { return this.children.length; }
	
	/**
	 * Wrapper for a JQuery call using this element.
	 * @param	p_query
	 * @return
	 */
	public inline function query(p_query:String) : Array<View> { return cast this.querySelectorAll(p_query); }
	
	
	
	
}
	