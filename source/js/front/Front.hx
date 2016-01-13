package js.front;
import js.front.controller.FController;
import js.front.view.FView;

/**
 * Class that implements FrontJS root class.
 * @author eduardo-costa
 */
class Front
{

	/**
	 * Reference to the class that implements View features.
	 */
	static public var view : FView;
	
	/**
	 * Reference to the class that implements Controlller features.
	 */
	static public var controller : FController;
	
	/**
	 * Initializes the Front class.
	 */
	static public function init():Void
	{
		view = new FView();
		controller = new FController();
	}
	
}