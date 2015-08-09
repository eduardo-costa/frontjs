package js.front;
import js.html.Element;

/**
 * Class that describes the storage features of FrontJS using notifications as callbacks.
 */
extern class ModelStorage
{	
		
	/**
	Retrieves a data from LocalForage.
	//*/	
	@:overload(function(p_key:String,p_notification:String):Void{})
	function get(p_key:String, p_notification:String,p_data:Dynamic):Void;
	
	/**
	Stores a data into LocalForage.
	//*/
	@:overload(function(p_key:String,p_value:Dynamic):Void{})
	@:overload(function(p_key:String,p_value:Dynamic, p_notification:String):Void{})
	function set(p_key:String, p_value:Dynamic,  p_notification:String,p_data:Dynamic):Void;
	
	/**
	Retrieves a data from LocalForage.
	//*/
	@:overload(function (p_key : String):Void{})
	@:overload(function (p_key : String,p_notification:String):Void{})
	function remove(p_key : String, p_notification:String,p_data:Dynamic):Void;
	
	/**
	Returns the Key Id based on its name.
	//*/	
	@:overload(function (p_id:Int, p_notification:String):Void{})
	function key(p_id:Int, p_notification:String,p_data:Dynamic):Void;
	
	/**
	Recovers the keys related to the context. If the context if empty, returns all keys.
	//*/
	@:overload(function (p_notification:String):Void{})
	function keys(p_notification:String,p_data:Dynamic):Void;
	
	/**
	Removes all keys of this context. If the context is empty all data will be excluded.
	//*/
	@:overload(function (p_notification:String):Void{})
	function clear(p_notification:String,p_data:Dynamic):Void;
	
	/**
	Returns the length of this storage based on the current context.
	//*/
	@:overload(function (p_notification:String):Void{})
	function length(p_notification:String,p_data:Dynamic):Void;
		
	/**
	Removes ALL data from the IndexedDB system.
	//*/	
	@:overload(function (p_notification:String):Void{})
	function destroy(p_notification:String,p_data:Dynamic):Void;
}


/**
 * Model manager class.
 * @author Eduardo Pons - eduardo@thelaborat.org
 */
extern class FrontModel
{
	/**
	 * Reference to the storage features notification oriented.
	 */
	var storage : ModelStorage;
	
	/**
	 * Returns a flag indicating if a given Element, selected by reference or 'model' attribute, is a Model container. If forced, it indicates if the element is inside a Model Element.
	 * @param	p_target
	 * @param	p_force
	 * @return
	 */
	@:overload(function(p_target:String):Bool { } )
	@:overload(function(p_target:Element):Bool { } )
	@:overload(function(p_target:String, p_force:Bool):Bool { } )		
	function is(p_target:Element, p_force:Bool):Bool;
	
	
	/**
	 * Returns the Model Element that contains 'target' or the target itself if it is a Model.
	 * @param	p_target
	 * @return
	 */
	@:overload(function(p_target:String):Bool { } )	
	function context(p_target:Element):Element;
	
	/**
	 * Set the 'watch' flag of the desired Model Element. If it is being watched the Controller manager will dispatch 'model' events to its controllers.
	 * @param	p_id
	 * @param	p_flag
	 */
	function watch(p_id:String, p_flag:Bool):Void;
	
	/**
	 * Returns a Model Element as object searching by the 'model' attribute.
	 * @param	p_id
	 * @return
	 */
	function get(p_id:String):Element;
	
	/**
	 * Get or Set a Model data indexed by 'id'. If the data is being set, it tries to matches the first 'view' inside the model.
	 * @param	p_id
	 * @param	p_value
	 * @return
	 */
	@:overload(function(p_id:String):Dynamic{})
	function data(p_id:String,p_value:Dynamic):Dynamic;

	/**
	 * Get or Set the relevant value of an Element. For 'input' it will be 'value', 'select' will be 'selectedIndex' and so on.
	 * @param	p_target
	 * @param	p_value
	 * @return
	 */
	@:overload(function(p_target:String):Dynamic{})
	@:overload(function(p_target:String, p_value:Dynamic):Dynamic{})
	@:overload(function(p_target:Element):Dynamic{})
	function value(p_target:Element, p_value:Dynamic):Dynamic;
	
	/**
	 * Returns the Element 'model' attribute.
	 * @param	p_target	 
	 */	
	function attribute(p_target:Element):String;
	
}