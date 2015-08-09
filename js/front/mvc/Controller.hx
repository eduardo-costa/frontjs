package js.front.mvc;


/**
 * Base class for an application's controller instance.
 */
class Controller
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
	public function on(p_path:String,p_event : String,p_target : Dynamic,p_data : Dynamic):Void { }
}