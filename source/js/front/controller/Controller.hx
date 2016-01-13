package js.front.controller;
import js.front.controller.ControllerEvent;
import js.front.view.View;
import js.html.Element;
import js.html.Event;

/**
 * Class that describes an HTML's Element as View.
 * @author eduardo-costa
 */
class Controller
{
	/**
	 * Allowed events to be detected.
	 */
	public var allow : Array<String> = ["click", "input", "change"];
	
	/**
	 * Reference to the view this controller is attached.
	 */
	public var view : View;
	
	/**
	 * Flag that tells if this controller will be notified.
	 */
	public var enabled : Bool = true;
	
	/**
	 * Reference to the event handler.
	 */
	public var handler : Event->Void;
	
	/**
	 * Class to be extended to handle the target View's events.
	 * @param	p_notification
	 */
	public function on(p_event : ControllerEvent):Void {}
	
	
}