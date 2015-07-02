package js.front;
import js.html.Element;
import js.RegExp;

/**
 * Base class for an application's controller instance.
 */
class BaseController
{
	/**
	 * Name of this controller.
	 */
	public var name : String;
	
	/**
	 * View path filter rule.
	 */
	public var route : RegExp;
	
	/**
	 * Allowed events separated by commas.
	 */
	public var allow : String;
	
	/**
	 * Creates a new Controller instance.
	 * @param	p_name
	 * @param	p_allow
	 * @param	p_route
	 */
	@:overload(function():Void{})
	@:overload(function(p_name:String):Void{})
	@:overload(function(p_name:String, p_allow:String):Void { } )	
	public function new(p_name:String,p_allow:String,p_route:String)
	{		
		name = Type.getClassName(Type.getClass(this));
		if(p_name!=null) name = p_name;
		if(p_allow!=null) allow	= p_allow;
		if (p_route != null) route = new RegExp(p_route);
	}
	
	/**
	 * Event callback.
	 * @param	p_path
	 * @param	p_event
	 * @param	p_target
	 * @param	p_data
	 */
	public function on(p_path:String,p_event : String,p_target : Element,p_data : Dynamic):Void { }
}

/**
 * Controller manager class.
 * @author Eduardo Pons - eduardo@thelaborat.org
 */
extern class Controller
{
	/**
	 * List of active controllers.
	 */
	var list : Array<Dynamic>;
	
	/**
	 * Adds a controller instance.
	 * @param	p_target
	 * @param	p_route
	 */
	@:overload(function(p_target:BaseController):Void { } )	
	function add(p_target:BaseController, p_route:RegExp):Void;
	
	/**
	 * Removes a controller instance.
	 * @param	p_target
	 * @param	p_route
	 */	
	function remove(p_target:BaseController):Void;
	
	/**
	 * Removes all controllers.
	 */	
	function clear():Void;
	
	/**
	 * Returns the reference of a controller by its name.
	 * @param	p_name
	 * @return
	 */
	function find(p_name:String):BaseController;
	
	/**
	 * Returns a flag indicating if a given controller exists.
	 * @param	p_name
	 * @return
	 */
	function exists(p_name:String):Bool;
	 
	
	/**
	 * Dispatches an event to all controllers.
	 * @param	p_event
	 * @param	p_target
	 * @param	p_data
	 */
	@:overload(function(p_event:String):Void{})
	@:overload(function(p_event:String,p_target:Element):Void{})
	function dispatch(p_event:String, p_target:Element, p_data:Dynamic):Void;
}