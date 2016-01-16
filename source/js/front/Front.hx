package js.front;
import haxe.Timer;
import js.front.controller.FController;
import js.front.model.FModel;
import js.front.view.FView;
import js.html.Event;

/**
 * Class that implements FrontJS root class.
 * @author eduardo-costa
 */
class Front
{
	/**
	 * Reference to the class that implements Model features.
	 */
	static public var model : FModel;

	/**
	 * Reference to the class that implements View features.
	 */
	static public var view : FView;
	
	/**
	 * Reference to the class that implements Controlller features.
	 */
	static public var controller : FController;
	
	/**
	 * Reference to the http request features.
	 */
	static public var request : FRequest;
	
	/**
	 * Initializes the Front class.
	 */
	static public function init():Void
	{
		model       = new FModel();
		view 		= new FView();
		controller  = new FController();
		request     = new FRequest();
				
		Browser.window.addEventListener("load", function(e)
		{			
			Timer.delay(
			function delayed_component_cb() 
			{ 
				Browser.window.dispatchEvent(new Event("component")); 
				view.parse();
			}, 1);
		});
		
	}
	
}