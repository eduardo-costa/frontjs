package;
import js.Browser;
import js.front.Controller.BaseController;
import js.front.Front;
import js.html.Element;
import js.html.Event;
import js.html.Image;

class SimpleController extends BaseController
{
	override public function new(p_name:String):Void
	{
		super(p_name);
		allow = "model";
		
	}
	
	override public function on(p_path:String, p_event:String, p_target:Element, p_data:Dynamic):Void 
	{
		switch(p_event)
		{
			case "model":
				trace(p_data);		
		}
		
	}
}


/**
 * 
 * @author Eduardo Pons - eduardo@thelaborat.org
 */
class HaxeTest
{

	/**
	 * Entry point.
	 */
	static public function main():Void
	{		
		trace("FrontJS> Haxe Example");
		
		Front.initialize();
		
		Browser.window.onload = function(p_event:Event):Void
		{
			trace(Front.model.data("home.form"));
			
			Front.model.watch("home.form", true);
			
			Front.controller.add(new SimpleController("simple"));
			
			
		};
		
	}
	
}