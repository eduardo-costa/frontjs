package;
import js.Browser;
import js.front.Front;

/**
 * Entry point class.
 * @author eduardo-costa
 */
class Main
{

	/**
	 * Entry.
	 */
	static public function main():Void
	{
		untyped Browser.window.Front = Front;
		Front.init();
	}
	
}