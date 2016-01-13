package js.front.view;
import js.html.DOMElement;
import js.html.NodeList;

/**
 * Class that implements the View features of FrontJS.
 * @author eduardo-costa
 */
class FView
{
	/**
	 * CTOR.
	 */
	public function new() {	}	
	
	/**
	 * Get/Set a View's name attribute.
	 * @param	p_target
	 * @return
	 */
	public function name(p_target:DOMElement,p_name:String=null):String
	{
		//get
		if (p_name == null)
		{			
			if (!p_target.hasAttributes()) 		 return "";
			if (p_target.hasAttribute("n")) 	 return p_target.getAttribute("n");
			if (p_target.hasAttribute("data-n")) return p_target.getAttribute("data-n");
			return "";
		}
		//set				
		p_name = p_name == null ? "" : p_name;
		
		if (p_target.hasAttribute("data-n"))
		{
			p_target.setAttribute("data-n",p_name); 
		}
		else 
		{
			p_target.setAttribute("n",p_name);
		}
		return p_name;
	}
	
	/**
	 * Searches the document for a View matching the path.
	 * @param	p_path
	 * @return
	 */
	public function get(p_path:String):View
	{
		var l : Array<String> = p_path.split(".");
		
		if (l.length <= 0) return null;
		
		var it : DOMElement;
		
		it = Browser.document.body;
		
		while (l.length > 0)
		{
			var n : String = l.shift();
			var f : Bool   = false;			
			traverse(it, function get_traverse_cb(e:DOMElement):Bool
			{
				var v  : View 	= cast e;
				if (n == v.name)
				{
					f = true;
					it = e;
					return false;
				}
				return true;
			},true);			
			if (!f) return null;
		}
		return cast it;
	}
	
	/**
	 * Returns the dot path to this element or its View 'root' container.
	 * @param	p_target
	 * @return
	 */
	public function path(p_target : DOMElement,p_root:DOMElement=null):String
	{		
		var v : View     = cast p_target;
		var n : String   = "";
		var res : String = "";		
		if (p_root == null) p_root = Browser.document.body;
		while (v != p_root)
		{
			n = v.name;
			if (n != "") res = n + (res=="" ? res : ("." +res));
			v = cast v.parentElement;
		}		
		return res;
	}
	
	/**
	 * Returns a flag telling if the 'target' is contained by the View reference of its 'path'.
	 * @param	p_path
	 * @param	p_target
	 * @return
	 */
	@:overload(function(p_view : View, p_target:DOMElement):Bool{})	
	public function contains(p_view:String, p_target:DOMElement):Bool
	{
		if (p_target == null) return false;
		
		var v : View = null;
		if (Std.is(p_view, String)) v = get(cast p_view); else v = cast p_view;
		if (v == null) return false;
		
		var is_parent : Bool = false;
		var it : DOMElement = p_target;
		while (it.parentElement != Browser.document.body)
		{
			if (it.parentElement == v) return true;
			it = it.parentElement;
		}
		return is_parent;
	}
	
	/**
	 * Executes a query on the desired target's path or instance.
	 * If no target is specified, the [body] tag is used.
	 * @param	p_query
	 * @param	p_target
	 * @return
	 */
	@:overload(function(p_query:String,p_target:DOMElement=null):Array<View>{})	
	public function query(p_query:String,p_target:String=null):Array<View>
	{
		var e : DOMElement = Std.is(p_target, String) ? get(p_target) : (cast p_target);
		if (e == null) e = Browser.document.body;
		var res : Array<View> = [];
		var l : NodeList = e.querySelectorAll(p_query);
		for (i in 0...l.length) res.push(cast l[i]);
		return res;
	}
	
	/**
	 * Returns the first parent element which is a View.
	 * @param	p_target
	 * @return
	 */
	public function parent(p_target:DOMElement):View
	{
		var it : DOMElement = p_target;		
		while (it != Browser.document.body)
		{
			it = it.parentElement;
			if (it.hasAttribute("n")) 		return cast it;
			if (it.hasAttribute("data-n"))  return cast it;
		}		
		return null;
	}
	
	/**
	 * Traverse the whole hierarchy of the chosen element, including itself.
	 * The last boolean flag tells if the traversal will be Breadth First Search, otherwise Depth First Search will be used.
	 * @param	p_element
	 * @param	p_callback
	 */
	@:overload(function(p_element : DOMElement, p_callback : DOMElement->Void,p_bfs : Bool=false):Void {})
	public function traverse(p_element : DOMElement, p_callback : DOMElement->Bool,p_bfs : Bool=false):Void
	{		
		if (p_bfs)
		{
			var l : Array<DOMElement> = [p_element];
			var k : Int = 0;
			while (k < l.length)
			{
				if (p_callback(l[k])==false) return;
				for (i in 0...l[k].children.length)
				{
					l.push(l[k].children[i]);
				}
				k++;
			}		
			return;
		}
		if (p_callback(p_element)==false) return;
		for (i in 0...p_element.children.length) traverse(p_element.children[i], p_callback);		
	}
}