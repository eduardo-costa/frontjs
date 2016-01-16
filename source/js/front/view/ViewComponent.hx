package js.front.view;

/**
 * Class that describes a View prefab component.
 * @author eduardo-costa
 */
extern class ViewComponent
{
	/**
	 * Tag that represent this component.
	 */
	public var tag : String;
	
	/**
	 * HTML source of this component.
	 */
	public var src : String;
	
	/**
	 * Callback called when the component is created.
	 */
	public var init : View->Void;
	
	/**
	 * Flag that indicates the component's src must stay inside the tag.
	 */
	public var inner : Bool;
		
}