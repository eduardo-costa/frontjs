package js.front;
import js.front.FrontActivity.Activity;
import js.html.Element;

/**
 * Class that describes a basic Animation node.
 */
extern class Animation extends Activity
{
	/**
	 * Target being animated.
	 */
	var target : Dynamic;
	
	/**
	 * Property being animated.
	 */
	var property : String;
	
	/**
	 * Target value to be reached.
	 */
	var value : Dynamic;
}



/**
 * Class that implements async execution features.
 */
extern class FrontAnimation
{	
	
	/**
	 * Adds a new Animation to the execution queue.
	 * @param	p_target
	 * @param	p_property
	 * @param	p_value
	 * @param	p_duration
	 * @param	p_delay
	 * @param	p_easing
	 * @param	p_run_on_background
	 * @return
	 */
	@:overlod(function (p_target:Dynamic, p_property:String, p_value:Dynamic) : Animation{})
	@:overlod(function (p_target:Dynamic, p_property:String, p_value:Dynamic, p_easing:Float->Float) : Animation{})
	@:overlod(function (p_target:Dynamic, p_property:String, p_value:Dynamic, p_duration:Float, p_easing:Float->Float) : Animation{})
	@:overlod(function (p_target:Dynamic, p_property:String, p_value:Dynamic, p_duration:Float, p_delay:Float, p_easing:Float->Float) : Animation{})
	@:overlod(function (p_target:Dynamic, p_property:String, p_value:Dynamic, p_duration:Float, p_delay:Float, p_easing:Float->Float, p_run_on_background:Bool) : Animation{})
	function add(p_target:Dynamic, p_property:String, p_value:Dynamic, p_duration:Float, p_delay:Float, p_easing:Float->Float, p_run_on_background:Bool) : Animation;
	
	/**
	 * Removes all Animations matching the criteria. If none is specified, all Animations are removed.
	 * @param	p_target
	 * @param	p_property
	 * @param	p_ignore_list
	 */
	@:overload(function () : Void { } )
	@:overload(function (p_target:Dynamic) : Void { } )
	@:overload(function (p_target:Dynamic, p_property:String) : Void { } )
	function clear(p_target:Dynamic, p_property:String, p_ignore_list:Array<String>) : Void;
}
