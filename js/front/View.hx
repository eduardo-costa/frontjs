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
	 * Check if a given element or element's id is a view.	If forced checks if inside a view context.
	 * @param	p_target
	 * @param	p_force
	 * @return
	 */	
	@:overload(function(p_target:String):Bool { } )
	@:overload(function(p_target:Element):Bool { } )
	@:overload(function(p_target:String, p_force:Bool):Bool { } )		
	function is(p_target:Element, p_force:Bool):Bool;
	
	/**
	 * Returns the target Element's path separated by '.', if forced, returns the path of first view container found.
	 * @param	p_target
	 * @param	p_force
	 * @return
	 */
	@:overload(function(p_target:Element):String { } )		
	function path(p_target:Element, p_force:Bool):String;
	
	/**
	 * Returns a View Element.
	 * @param	p_id
	 * @return
	 */
	function get(p_path:String):Element;
	
	/**
	 * Searches a View by its id.
	 * If the flag 'all' is informed, all occurrences are returned.
	 * @param	p_id
	 * @return
	 */
	@:overload(function(p_id:String, p_all:Bool):Array<Element> { } )	
	function find(p_id:String):Element;
	
	/**
	 * Returns the view's parent.
	 * @param	p_path
	 * @return
	 */
	@:overload(function(p_element:Element):Element { } )	
	function parent(p_path:String):Element;
	
	/**
	 * Finds an element with 'template' attribute and clones it.
	 * @param	p_path
	 * @return
	 */
	@:overload(function(p_element:Element):Element { } )		
	function clone(p_path:String):Element;
	
	/**
	 * Returns the Element 'view' attribute.
	 * @param	p_target	 
	 */	
	function attribute(p_target:Element):String;
		
}