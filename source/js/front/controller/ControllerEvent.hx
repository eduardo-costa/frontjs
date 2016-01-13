package js.front.controller;
import js.html.DOMElement;
import js.html.Element;
import js.html.Event;

/**
 * Class that describes an event captured by a Controller from its target View.
 * @author eduardo-costa
 */
extern class ControllerEvent
{
	/**
	 * Event Type (i.e. 'click', 'mouseover', 'change', ...)
	 */
	public var type : String;
	
	/**
	 * Path to View
	 */
	public var view : String;
	
	/**
	 * Source event that triggered this controller event.
	 */
	public var src : Event;
		
	/**
	 * Complete event string (i.e. 'path.to.view@type')
	 */
	public var path : String;
	
	/**
	 * Data associated to this event (null if none).
	 */
	public var data : Dynamic;
	
	
}