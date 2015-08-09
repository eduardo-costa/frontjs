package;
import haxe.Timer;
import js.Browser;
import js.front.Front;
import js.front.mvc.Controller;
import js.front.mvc.View;
import js.html.Element;
import js.html.Event;
import js.html.Image;

class SimpleController extends Controller
{
	override public function new(p_name:String):Void
	{
		super(p_name);
		allow = "";		
	}
	
	override public function on(p_path:String, p_event:String, p_target:Element, p_data:Dynamic):Void 
	{
		
		switch(p_event)
		{
			case "model":
				trace(p_path);
				trace(p_data);		
				
			case "click":
				trace(p_path);
		}
		
		switch(p_path)
		{
			case "contact.form.send":			
			var url : String = Front.model.data("contact.form").url;
			var method: Int = Front.model.data("contact.form").method;
			trace("send "+url);
			Front.request.create(url, function(d:Dynamic, p:Float):Void
			{
				trace("@ " + d + " " + p);
				if (p >= 1)
				{
					Front.model.value("contact.form.output", d);
				}
			},null,false,method==1 ? "post" : "get");
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
			Front.model.watch("home.form", true);			
			Front.controller.add(new SimpleController("simple"));
			
			
		};
		
	}
	
}