package js.front;
import js.Error;
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
 * Class that describes the storage features of FrontJS.
 */
extern class FrontStorage
{
	/**
	String to be used before keys to avoid key collision between different applications.
	//*/
	var context : String;
	
	/**
	Chosen name for the database.
	//*/
	var database : String;
	
	/**
	Initializes the storage with custom information.
	/**/
	@:overload(function():Void{})
	function init(p_name:String):Void;
		
	/**
	Retrieves a data from LocalForage.
	//*/	
	@:overload(function(p_key:String,p_callback:Dynamic->Void):Void{})
	function get(p_key:String, p_callback:Dynamic->Error->Void):Void;
	
	/**
	Stores a data into LocalForage.
	//*/
	@:overload(function(p_key:String,p_value:Dynamic):Void{})
	@:overload(function(p_key:String,p_value:Dynamic,p_callback:Dynamic->Void):Void{})
	function set(p_key:String, p_value:Dynamic, p_callback:Dynamic->Error->Void):Void;
	
	/**
	Retrieves a data from LocalForage.
	//*/
	@:overload(function (p_key : String):Void{})
	@:overload(function (p_key : String,p_callback:Dynamic->Void):Void{})
	function remove(p_key : String, p_callback:Dynamic->Error->Void):Void;
	
	/**
	Returns the Key Id based on its name.
	//*/	
	@:overload(function (p_id:Int, p_callback:String->Void):Void{})
	function key(p_id:Int, p_callback:String->Error->Void):Void;
	
	/**
	Recovers the keys related to the context. If the context if empty, returns all keys.
	//*/
	@:overload(function (p_callback:Array<String>->Void):Void{})
	function keys(p_callback:Array<String>->Error->Void):Void;
	
	/**
	Removes all keys of this context. If the context is empty all data will be excluded.
	//*/
	@:overload(function (p_callback:Int->Void):Void{})
	function clear(p_callback:Int->Error->Void):Void;
	
	/**
	Returns the length of this storage based on the current context.
	//*/
	@:overload(function (p_callback:Int->Void):Void{})
	function length(p_callback:Int->Error->Void):Void;
	
	/**
	Iterates all key-value pairs from this storaged context.
	//*/
	@:overload(function(p_callback:String->Dynamic):Void {})
	function iterate(p_callback:String->Dynamic->Int):Void;
	
	/**
	Removes ALL data from the IndexedDB system.
	//*/	
	@:overload(function (p_callback:Void->Void):Void{})
	function destroy(p_callback:Error->Void):Void;
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
	static var model : FrontModel;
	
	/**
	 * Reference to the View manager.
	 */
	static var view : FrontView;
	
	/**
	 * Reference to the Controller manager.
	 */
	static var controller : FrontController;
	
	/**
	 * Reference to the XMLHttpRequest handler.
	 */
	static var request : FrontRequest;
	
	/**
	 * Reference to the storage system.
	 */
	static var storage : FrontStorage;
	
	/**
	 * Reference to the Activity functionality.
	 */
	static var activity : FrontActivity;
	
	/**
	 * Reference to the Activity functionality.
	 */
	static var animation : FrontAnimation;
	
	/**
	 * Initializes the front-end informing the root Element, initial set of events and a flag allowing or not mutation events.
	 * @param	p_root
	 * @param	p_events
	 */
	@:overload(function():Void { })	
	@:overload(function(p_root:Element):Void { } )
	@:overload(function(p_root:Element,p_events:Array<String>):Void { })
	static function initialize(p_root:Element, p_events:Array<String>,p_allow_mutation:Bool):Void;
	
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
	 * Searches all HTML using the specified 'query'.
	 * @param	p_query
	 * @return
	 */	
	static function query(p_query:String):Array<Dynamic>;
	
	/**
	 * Traverses the DOM hierarchy of the informed Element, calling 'callback' on each visit, including the element itself.
	 * @param	p_element
	 * @param	p_callback
	 */
	@:overload(function(p_element:Element,p_callback : Element->Void):Void{})
	static function traverse(p_element:Element, p_callback : Element-> Bool):Void;
}