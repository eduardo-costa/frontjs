package js.front;
import js.html.Element;

/**
 * Model manager class.
 * @author Eduardo Pons - eduardo@thelaborat.org
 */
extern class Model
{
	/**
	 * Returns a flag indicating if a given Element, selected by reference or 'model' attribute, is a Model container. If forced, it indicates if the element is inside a Model Element.
	 * @param	p_target
	 * @param	p_force
	 * @return
	 */
	@:overload(function(p_target:String):Bool { } )
	@:overload(function(p_target:Element):Bool { } )
	@:overload(function(p_target:String, p_force:Bool):Bool { } )		
	function is(p_target:Element, p_force:Bool):Bool;
	
	
	/**
	 * Returns the Model Element that contains 'target' or the target itself if it is a Model.
	 * @param	p_target
	 * @return
	 */
	@:overload(function(p_target:String):Bool { } )	
	function context(p_target:Element):Element;
	
	/**
	 * Set the 'watch' flag of the desired Model Element. If it is being watched the Controller manager will dispatch 'model' events to its controllers.
	 * @param	p_id
	 * @param	p_flag
	 */
	function watch(p_id:String, p_flag:Bool):Void;
	
	/**
	 * Returns a Model Element as object searching by the 'model' attribute.
	 * @param	p_id
	 * @return
	 */
	function get(p_id:String):Element;
	
	/**
	 * Returns a Model data as object searching by the 'model' attribute.
	 * @param	p_id
	 * @return
	 */
	function data(p_id:String):Dynamic;

	/**
	 * Get or Set the relevant value of an Element. For 'input' it will be 'value', 'select' will be 'selectedIndex' and so on.
	 * @param	p_target
	 * @param	p_value
	 * @return
	 */
	@:overload(function(p_target:Element):Dynamic{})
	function value(p_target:Element, p_value:Dynamic):Dynamic;
	
}