package js.front.view;
import haxe.Timer;
import js.html.Attr;
import js.html.DOMElement;
import js.html.Event;
import js.html.MutationObserver;
import js.html.MutationRecord;
import js.html.NamedNodeMap;
import js.html.NodeList;

/**
 * Class that implements the View features of FrontJS.
 * @author eduardo-costa
 */
class FView
{
	/**
	 * List of components templates.
	 */
	public var components : Array<ViewComponent>;
	
	/**
	 * Blocks the mutation handling while components are parsed.
	 */
	private var m_mutation_lock : Bool;
	
	/**
	 * CTOR.
	 */
	public function new() 
	{
		components = [];
		
		m_mutation_lock = false;
		if (untyped (window.MutationObserver != null))
		{
			var mo : MutationObserver = new MutationObserver(onMutation);
			mo.observe(Browser.document.body, { subtree:true, childList:true } );
		}
		else
		{
			untyped console.warning("FrontJS> MutationObserver not found!");
		}
	}
	
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
	
	/**
	 * Sweeps the DOM and insert components where they should appear.
	 */
	public function parse():Void
	{
		for (i in 0...components.length)
		{
			var c : ViewComponent = components[i];
			var l : Array<View>   = cast Browser.document.body.querySelectorAll(c.tag);
			for (j in 0...l.length)
			{
				var v : View = l[j];
				var attribs : NamedNodeMap = v.attributes;				
				var text    : String 	   = v.textContent;				
				v.innerHTML = StringTools.replace(c.src, "$text", text);
				parseElement(c,v);				
			}
		}
		
	}
	
	/**
	 * Finishes parsing the component element.
	 * @param	p_target
	 */
	private function parseElement(p_component:ViewComponent,p_target:View):Void
	{
		var v : View 		  = p_target;
		var c : ViewComponent = p_component;
		Timer.delay(function() 
		{
			var p   : View = cast v.parentElement;					
			for (i in 0...v.children.length)
			{	
				var vc : View = cast v.children[i];				
				for (j in 0...v.classList.length) 
				{ 					
					if(!vc.classList.contains(v.classList[j]))vc.classList.add(v.classList[j]); 					
				}
				for (j in 0...v.attributes.length) 
				{ 
					var a : Attr = v.attributes[j]; 
					if (a.name == "class") continue;
					vc.setAttribute(a.name, a.value); 					
				}
			}
			
			if (c.init != null) c.init(v);
			
			var is_inner : Bool = c.inner == null ? true : c.inner;			
			if (is_inner) return;
			var p   : View = cast v.parentElement;					
			for (i in 0...v.children.length)
			{	
				var vc : View = cast v.children[i];				
				if (v.nextSibling != null) { p.insertBefore(vc,v); } else { p.appendChild(vc); }						
			}					
			if(p!=null)p.removeChild(v);					
		}, 1);
	}
	
	/**
	 * Callback that handles DOM changes.
	 * @param	p_list
	 * @param	p_observer
	 */
	private function onMutation(p_list : Array<MutationRecord>, p_observer : MutationObserver):Void
	{
		if (m_mutation_lock) return;
		m_mutation_lock = true;
		parse();
		Timer.delay(function() { m_mutation_lock = false; }, 2);
	}
}