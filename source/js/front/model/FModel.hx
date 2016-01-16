package js.front.model;
import js.front.view.View;
import js.html.DOMElement;
import js.html.Event;
import js.html.InputElement;
import js.html.NodeList;

/**
 * Class that implements the Model features of FrontJS.
 * @author eduardo-costa
 */
class FModel
{
		
	/**
	 * CTOR.
	 */
	public function new() 
	{
		
	}
	
	/**
	 * Get/Set the View's data in object form.
	 * @param	p_target
	 * @return
	 */
	@:overload(function (p_target:DOMElement):Dynamic {})
	public function data(p_target : String,p_value:Dynamic=null) : Dynamic
	{		
		var v : View = Std.is(p_target, String) ? Front.view.get(p_target) : (cast p_target);
		var res : Dynamic = { };
		Front.view.traverse(v,cast function(e:DOMElement):Void
		{				
			var it : View = cast e;
			
			if (it.name == "") return;
			var has_children : Bool = true;
			if (it.children.length <= 0) 				has_children = false;
			if (it.nodeName.toLowerCase() == "select")  has_children = false;
			if (!has_children)
			{					
				var path : String = Front.view.path(it, v);
				var tks : Array<String> = path.split(".");
				var d : Dynamic  = res;
				var dv : Dynamic = p_value;
				for (i in 0...tks.length)
				{
					if (i >= (tks.length - 1))
					{
						untyped d[tks[i]] = value(it,dv==null ? dv : dv[tks[i]]);
					}
					else
					{
						if (dv != null)
						{								
							untyped dv = dv[tks[i]];
						}
						
						if (untyped d[tks[i]] == null) untyped d[tks[i]] = { }
						untyped d = d[tks[i]];
					}
				}
			}				
			
		});		
		return res;		
	}
	
	/**
	 * Get/Set the value of a DOM or Form Element.
	 * @param	n
	 * @param	v
	 * @return
	 */
	public function value(n : Dynamic,v:Dynamic=null):Dynamic
	{
		var nn : String = n.nodeName.toLowerCase();		
		switch(nn)
		{
			case "input": 	
			{
				var itp : String = nn=="input" ? (n.type==null ? "" : n.type.toLowerCase()) : "";	
				switch(itp)
				{
					case "checkbox": return v == null ? n.checked : (n.checked = v);     
					case "radio":    return v == null ? n.checked : (n.checked = v);
					case "number":   return v == null ? n.valueAsNumber  : (n.valueAsNumber  = v); 	 
					case "range":    return v == null ? n.valueAsNumber  : (n.valueAsNumber  = v); 	 					
					default: 		 return v==null ? n.value  : (n.value  =v); 	 
				}							
			}							
			case "select":   return v==null ? n.selectedIndex 	: (n.selectedIndex=v); 
			case "textarea": return v==null ? n.value 			: (n.value=v); 	 	 
			default: 		 return v==null ? n.textContent 	: (n.textContent=v);
		}		
		return "";
	}	
}