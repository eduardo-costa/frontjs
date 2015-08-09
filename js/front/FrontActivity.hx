package js.front;
import js.html.Element;

@:native("Time")
extern class Time
{
	/**
	 * Elapsed time since start in seconds.
	 */
	static public var elapsed : Float;
	
	/**
	 * Time between frames in seconds.
	 */
	static public var delta : Float;
}

/**
 * Class that describes a basic Activity.
 */
extern class Activity
{
	/**
	 * Time since start in seconds.
	 */
	var elapsed : Float;
	
	/**
	 * Progress of execution.
	 */
	var progress : Float;
	
	/**
	 * Duration of execution in seconds.
	 */
	var duration : Float;
	
	/**
	 * Execution method.
	 */
	function update():Void;
	
}

/**
 * Class that implements async execution features.
 */
extern class FrontActivity
{	
	
	/**
	 * Stops all executing nodes.
	 */
	function clear():Void;
	
	/**
	 * Adds an execution node.
	 * @param	p_node
	 */
	function add(p_node:Activity):Void;
	
	/**
	 * Removes an execution node.
	 * @param	p_node
	 */
	function remove(p_node:Activity):Void;
	
	/**
	 * Creates a new execution node and executes the specified method.
	 * @param	p_callback
	 * @param	p_duration
	 * @param	p_delay
	 * @param	p_run_on_background
	 * @return
	 */
	@:overload(function(p_callback : Activity->Void, p_duration:Float):Activity{})
	@:overload(function(p_callback : Activity->Void, p_duration:Float, p_delay:Float):Activity { } )	
	function run(p_callback : Activity->Void, p_duration:Float, p_delay:Float, p_run_on_background:Bool):Activity;
	
	/**
	 * Waits 'delay' seconds and execute the callback.
	 * @param	p_callback
	 * @param	p_delay
	 * @param	p_run_on_background
	 * @param	p_args
	 * @return
	 */
	@:overload(function(p_callback : Dynamic, p_delay:Float):Activity { } )	
	@:overload(function(p_callback : Dynamic, p_delay:Float, p_run_on_background:Bool):Activity { } )		
	function delay(p_callback : Dynamic, p_delay:Float, p_run_on_background:Bool,p_args:Array<Dynamic>):Activity;
	
	/**
	 * Wait 'delay' in seconds and sets the target's property.
	 * @param	p_target
	 * @param	p_property
	 * @param	p_value
	 * @param	p_delay
	 * @param	p_run_on_background
	 * @return
	 */
	@:overload(function(p_target : Dynamic, p_property:String,p_value:Dynamic):Activity { })
	@:overload(function(p_target : Dynamic, p_property:String, p_value:Dynamic, p_delay:Float):Activity { } )	
	function set(p_target : Dynamic, p_property:String, p_value:Dynamic, p_delay:Float, p_run_on_background:Bool):Activity;
	
	/**
	 * Asynchronously iterates the 'list' elements 'step' elements per frame. Runs until 'timeout'.
	 * @param	p_callback
	 * @param	p_list
	 * @param	p_step
	 * @param	p_timeout
	 * @param	p_run_on_background
	 * @return
	 */
	@:overload(function(p_callback : Dynamic->Int->Int->Void,p_list:Array<Dynamic>):Activity{})
	@:overload(function(p_callback : Dynamic->Int->Int->Void,p_list:Array<Dynamic>,p_step:Int):Activity{})
	@:overload(function(p_callback : Dynamic->Int->Int->Void, p_list:Array<Dynamic>, p_step:Int, p_timeout:Float):Activity { } )	
	function iterate(p_callback : Dynamic->Int->Int->Void, p_list:Array<Dynamic>, p_step:Int, p_timeout:Float, p_run_on_background:Bool):Activity;
}
