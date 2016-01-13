package js.front.controller;
import js.front.controller.ControllerEvent;
import js.front.view.View;
import js.html.DOMElement;
import js.html.Event;
import js.html.NodeList;

/**
 * Class that implements the Controller features of FrontJS.
 * @author eduardo-costa
 */
class FController
{
	/**
	 * List of active controllers.
	 */
	public var list : Array<Controller>;
	
	/**
	 * CTOR.
	 */
	public function new() 
	{
		list = [];	
	}
	
	/**
	 * Adds a Controller instance to the notification pool.
	 */
	@:overload(function(p_controller:Controller, p_target:DOMElement):Controller{})
	public function add(p_controller:Controller, p_target:String):Controller
	{
		p_controller.allow   = p_controller.allow == null ? ["click", "change", "input"] : p_controller.allow;
		p_controller.enabled = p_controller.enabled == null ? true : p_controller.enabled;
		remove(p_controller);
		
		var v : View = Std.is(p_target, String) ? Front.view.get(p_target) : (cast p_target);
		if (v == null) v = cast Browser.document.body;
		
		p_controller.view  = v;
		
		if (p_controller.handler == null)
		{
			p_controller.handler = function controller_handler(e:Event):Void
			{
				if (!p_controller.enabled) return;
				var cev : ControllerEvent = cast { };
				cev.type 	= e.type;
				cev.src     = e;
				cev.view    = Std.is(e.target, DOMElement) ? Front.view.path(cast e.target,v.parentElement) : "";
				cev.path	= cev.view == "" ? e.type : (e.type=="" ? cev.view : (cev.view + "@" + e.type));
				cev.data    = null;
				if(p_controller.on!=null)p_controller.on(cev);
			};
		}
		
		var bb : Bool = false;
		
		for (s in p_controller.allow)
		{
			bb = false;
			if (s == "focus") bb = true;
			if (s == "blur")  bb = true;			
			v.addEventListener(s, p_controller.handler,bb);
		}
		list.push(p_controller);
		return p_controller;
	}
	
	/**
	 * Removes the controller from the pool.
	 * @param	p_controller
	 * @return
	 */
	public function remove(p_controller:Controller):Controller
	{		
		if (p_controller.handler != null)
		{
			if (p_controller.view != null)
			{
				for (s in p_controller.allow) p_controller.view.removeEventListener(s, p_controller.handler);
			}						
		}
		p_controller.view = null;
		list.remove(p_controller);
		return p_controller;
	}
	
	/**
	 * Dispatches an event to all controllers.
	 * @param	p_type
	 * @param	p_view
	 * @param	p_event
	 * @param	p_data
	 */
	public function dispatch(p_path:String, p_data:Dynamic = null):Void
	{		
		var cev : ControllerEvent = cast { };
		cev.path    = p_path;
		cev.type 	= p_path.indexOf("@") >= 0 ? p_path.split("@").pop() : "";
		cev.view    = p_path.indexOf("@") >= 0 ? p_path.split("@").shift() : "";
		cev.src     = null;				
		cev.data    = p_data;
		for (c in list) c.on(cev);
	}
	
	/**
	 * Removes all controllers from the pool.
	 */
	public function clear():Void { for (c in list) remove(c); }
	
	
}