package js.front;
import js.html.Element;
import js.html.XMLHttpRequest;
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
 * Class that handles XMLHttpRequest for controllers.
 */
extern class ControllerRequest
{
	/**
	 * Default URL for sending notification requests.
	 */
	var service : String;
	
	/**
	 * Creates a XMLHttpRequest setup for sending notification data.
	 * Defaults to GET.
	 * @param	p_url
	 * @param	p_path
	 * @param	p_event
	 * @param	p_data
	 * @param	p_binary
	 * @param	p_method
	 */
	@:overload(function(p_url:String, p_path:String):XMLHttpRequest{})
	@:overload(function(p_url:String, p_path:String, p_event:String):XMLHttpRequest{})
	@:overload(function(p_url:String, p_path:String, p_event:String, p_data:Dynamic):XMLHttpRequest{})
	@:overload(function(p_url:String, p_path:String, p_event:String, p_data:Dynamic, p_binary:Bool):XMLHttpRequest{})
	function create(p_url:String, p_path:String, p_event:String, p_data:Dynamic, p_binary:Bool, p_method:String):XMLHttpRequest;
	
	/**
	 * Creates a GET XMLHttpRequest setup for sending notification data.
	 * @param	p_url
	 * @param	p_path
	 * @param	p_event
	 * @param	p_data
	 * @param	p_binary
	 * @return
	 */
	@:overload(function(p_url:String, p_path:String):XMLHttpRequest{})
	@:overload(function(p_url:String, p_path:String, p_event:String):XMLHttpRequest{})
	@:overload(function(p_url:String, p_path:String, p_event:String, p_data:Dynamic):XMLHttpRequest { } )	
	function get(p_url:String, p_path:String, p_event:String, p_data:Dynamic, p_binary:Bool):XMLHttpRequest;
	
	/**
	 * Creates a POST XMLHttpRequest setup for sending notification data.
	 * @param	p_url
	 * @param	p_path
	 * @param	p_event
	 * @param	p_data
	 * @param	p_binary
	 * @return
	 */
	@:overload(function(p_url:String, p_path:String):XMLHttpRequest{})
	@:overload(function(p_url:String, p_path:String, p_event:String):XMLHttpRequest{})
	@:overload(function(p_url:String, p_path:String, p_event:String, p_data:Dynamic):XMLHttpRequest { } )	
	function post(p_url:String, p_path:String, p_event:String, p_data:Dynamic, p_binary:Bool):XMLHttpRequest;
	
	/**
	 * Creates a XMLHttpRequest setup for sending notification data to the default 'service' variable.
	 * Defaults to POST
	 * @param	p_url
	 * @param	p_path
	 * @param	p_event
	 * @param	p_data
	 * @param	p_binary
	 * @return
	 */
	@:overload(function(p_url:String, p_path:String):XMLHttpRequest{})
	@:overload(function(p_url:String, p_path:String, p_event:String):XMLHttpRequest{})
	@:overload(function(p_url:String, p_path:String, p_event:String, p_data:Dynamic,p_binary:Bool):XMLHttpRequest { } )	
	function notify(p_path:String, p_event:String, p_data:Dynamic, p_binary:Bool,p_method:String):XMLHttpRequest;	
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
	 * Request manager instance.
	 */
	var request : ControllerRequest;
	
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