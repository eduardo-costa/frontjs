package js.front.view;
import js.html.DOMElement;

/**
 * Class that implements the View features of FrontJS.
 * @author eduardo-costa
 */
class FView
{
	/**
	 * CTOR.
	 */
	public function new() 
	{
		
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
			for (i in 0...it.children.length)
			{
				var v  : View 	= cast it.children[i];
				var vn : String = v.name;				
				if (n == vn)
				{
					it = v;
					f  = true;
					break;
				}
			}
			if (!f) return null;
		}
		return cast it;
	}
	
	/**
	 * Traverse the whole hierarchy of the chosen element, including itself.
	 * @param	p_element
	 * @param	p_callback
	 */
	@:overload(function(p_element : DOMElement, p_callback : DOMElement->Void):Void {})
	public function traverse(p_element : DOMElement, p_callback : DOMElement->Bool):Void
	{		
		if (p_callback(p_element)==false) return;
		for (i in 0...p_element.children.length) traverse(p_element.children[i], p_callback);		
	}
}