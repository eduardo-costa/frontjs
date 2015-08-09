package js.front;
import js.front.mvc.Controller;
import js.html.Element;
import js.html.XMLHttpRequest;
import js.RegExp;



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
extern class FrontController
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
	@:overload(function(p_target:Controller):Void { } )	
	function add(p_target:Controller, p_route:RegExp):Void;
	
	/**
	 * Removes a controller instance.
	 * @param	p_target
	 * @param	p_route
	 */	
	function remove(p_target:Controller):Void;
	
	/**
	 * Removes all controllers.
	 */	
	function clear():Void;
	
	/**
	 * Returns the reference of a controller by its name.
	 * @param	p_name
	 * @return
	 */
	function find(p_name:String):Controller;
	
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
	
	/**
	 * Sends a notification to all controllers.
	 * @param	p_path
	 * @param	p_event
	 * @param	p_target
	 * @param	p_data
	 */
	@:overload(function(p_path:String):Void{})
	@:overload(function(p_path:String, p_event:String):Void{})
	@:overload(function(p_path:String, p_event:String, p_target:Dynamic):Void { } )	
	function notify(p_path:String, p_event:String, p_target:Dynamic, p_data:Dynamic):Void;
	
}