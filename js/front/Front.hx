package js.front;
import js.html.Element;
import js.html.Image;
import js.html.ImageElement;
import js.html.MutationObserver;
import js.html.MutationRecord;
import js.html.ScriptElement;
import js.html.StyleElement;
import js.html.Uint8Array;
import js.html.XMLHttpRequest;
import haxe.ds.Either;

typedef RequestCallbackComplete = Dynamic->Float->XMLHttpRequest->Error->Void;
typedef RequestCallbackSimple   = Dynamic->Float->Void;

/**
 * Class that handles XMLHttpRequest for FrontJS applications..
 */
extern class FrontRequest
{		
	/**
	 * Creates a XMLHttpRequest setup for sending/receiving data.
	 * Defaults to GET.
	 * @param	p_url
	 * @param	p_path
	 * @param	p_event
	 * @param	p_data
	 * @param	p_binary
	 * @param	p_method
	 */
	@:overload(function(p_url:String, p_callback: RequestCallbackComplete):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackComplete,p_data:Dynamic):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackComplete,p_data:Dynamic,p_binary:Bool):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackComplete, p_data:Dynamic, p_binary:Bool, p_method:String):XMLHttpRequest { } )	
	@:overload(function(p_url:String, p_callback: RequestCallbackSimple):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackSimple,p_data:Dynamic):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackSimple,p_data:Dynamic,p_binary:Bool):XMLHttpRequest{})
	function create(p_url:String, p_callback: RequestCallbackSimple,p_data:Dynamic,p_binary:Bool,p_method:String):XMLHttpRequest;
	
	/**
	 * Creates a GET XMLHttpRequest setup for sending/receiving data.
	 * @param	p_url
	 * @param	p_path
	 * @param	p_event
	 * @param	p_data
	 * @param	p_binary
	 * @return
	 */
	@:overload(function(p_url:String, p_callback: RequestCallbackComplete):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackComplete,p_data:Dynamic):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackComplete,p_data:Dynamic,p_binary:Bool):XMLHttpRequest{})		
	@:overload(function(p_url:String, p_callback: RequestCallbackSimple):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackSimple,p_data:Dynamic):XMLHttpRequest{})	
	function get(p_url:String, p_callback: RequestCallbackSimple,p_data:Dynamic,p_binary:Bool):XMLHttpRequest;
	
	/**
	 * Creates a POST XMLHttpRequest setup for sending notification data.
	 * @param	p_url
	 * @param	p_path
	 * @param	p_event
	 * @param	p_data
	 * @param	p_binary
	 * @return
	 */
	@:overload(function(p_url:String, p_callback: RequestCallbackComplete):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackComplete,p_data:Dynamic):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackComplete,p_data:Dynamic,p_binary:Bool):XMLHttpRequest{})		
	@:overload(function(p_url:String, p_callback: RequestCallbackSimple):XMLHttpRequest{})
	@:overload(function(p_url:String, p_callback: RequestCallbackSimple,p_data:Dynamic):XMLHttpRequest{})	
	function post(p_url:String, p_callback: RequestCallbackSimple,p_data:Dynamic,p_binary:Bool):XMLHttpRequest;
	
}

/**
 * Class that represents a WebBundle instance.
 * @author Eduardo Pons - eduardo@thelaborat.org
 */
@:native("Front")
extern class Front
{

	/**
	 * Reference to the DOM observer (default or polyfill).
	 */
	static var observer : MutationObserver;
	
	/**
	 * Reference to the occurred mutations.
	 */
	static var mutations : MutationRecord;
	
	/**
	 * Default set of events.
	 */
	static var events : Array<String>;
	
	/**
	 * Root of the observed DOM structure.
	 */
	static var root : Element;
	
	/**
	 * Flag that indicates the Front manager is active.	
	 */
	static var enabled : Bool;
	
	/**
	 * Reference to the Model manager.
	 */
	static var model : Model;
	
	/**
	 * Reference to the View manager.
	 */
	static var view : View;
	
	/**
	 * Reference to the Controller manager.
	 */
	static var controller : Controller;
	
	/**
	 * Reference to the XMLHttpRequest handler.
	 */
	static var request : FrontRequest;
	
	/**
	 * Initializes the front-end informing the root Element and initial set of events.
	 * @param	p_root
	 * @param	p_events
	 */
	@:overload(function():Void { })	
	@:overload(function(p_root:Element):Void { })	
	static function initialize(p_root:Element, p_events:Array<String>):Void;
	
	/**
	 * Sets the event handling root element.
	 * @param	p_root
	 */
	static function setRoot(p_root:Element):Void;
	
	/**
	 * Sets the listening flag for a given event.
	 * @param	p_event
	 * @param	p_flag
	 */
	static function listen(p_event:String, p_flag:Bool):Void;
	
	/**
	 * Searches the first Element which matches an 'attribute' with 'value', starting at 'from'. If 'from' is null, it will start from the 'body'
	 * @param	p_attribute
	 * @param	p_value
	 * @param	p_from
	 * @return
	 */
	@:overload(function(p_attribute:String, p_value:String):Element{})
	static function find(p_attribute:String, p_value:String,p_from:Element):Element;
	
	/**
	 * Traverses the DOM hierarchy of the informed Element, calling 'callback' on each visit, including the element itself.
	 * @param	p_element
	 * @param	p_callback
	 */
	@:overload(function(p_element:Element,p_callback : Element->Void):Void{})
	static function traverse(p_element:Element, p_callback : Element-> Bool):Void;
}