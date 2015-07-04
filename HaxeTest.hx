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
		allow = "model,click";
		
	}
	
	override public function on(p_path:String, p_event:String, p_target:Element, p_data:Dynamic):Void 
	{
		trace(">> " + p_event);
		switch(p_event)
		{
			case "model":
				trace(p_data);		
				
			case "click":
				trace(p_path);
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
		
		Browser.window.onload = function(p_event:Event):Void
		{
			Front.initialize();		
			trace(Front.model.data("home.form"));			
			Front.model.watch("home.form", true);			
			Front.controller.add(new SimpleController("simple"));
		};
		
	}
	
}