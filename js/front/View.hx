package js.front;
import js.html.Element;

/**
 * View manager class.
 * @author Eduardo Pons - eduardo@thelaborat.org
 */
extern class View
{
	
	/**
	 * Returns the View Element that contains 'target' or the target itself if it is a View.
	 * @param	p_target
	 * @return
	 */
	@:overload(function(p_target:String):Bool { } )	
	function context(p_target:Element):Element;
	
	/**
	 * Returns the path separated by '.' of the element. If forced, returns the path of the container View of it.
	 * @param	p_target
	 * @param	p_force
	 * @return
	 */	
	@:overload(function(p_target:Element):String { } )	
	function is(p_target:Element, p_force:Bool):String;
	
	/**
	 * Returns a View Element.
	 * @param	p_id
	 * @return
	 */
	function get(p_path:String):Element;
		
}