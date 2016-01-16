package js.front;
import js.html.ArrayBuffer;
import js.html.Blob;
import js.html.Event;
import js.html.FormData;
import js.html.ProgressEvent;
import js.html.Uint8Array;
import js.html.XMLHttpRequest;
import js.html.XMLHttpRequestResponseType;

/**
 * Class that implements XmlHttpRequest features of the Front class.
 * @author eduardo-costa
 */
class FRequest
{

	/**
	 * CTOR.
	 */
	public function new() 
	{
		
	}
	
	/**
	 * Creates and executes a XmlHttpRequest.
	 * @param	p_method
	 * @param	p_url
	 * @param	p_callback
	 * @param	p_binary
	 * @param	p_data
	 * @return
	 */
	public function create(p_method:String,p_url:String,p_callback : Dynamic->Float->Event->Void,p_binary:Bool=false, p_data:Dynamic=null,p_headers:Dynamic=null):XMLHttpRequest
	{
		var method : String = p_method==null ? "get" : p_method;
		var binary : Bool   = p_binary;		
		var ld 	   : XMLHttpRequest = new XMLHttpRequest();
		
		if(binary)
		{
			if (ld.overrideMimeType != null) {  ld.overrideMimeType("application/octet-stream");  }			
			ld.responseType = XMLHttpRequestResponseType.ARRAYBUFFER;
		}
		
		ld.onprogress = function req_progress(e : ProgressEvent) 
		{
			var p : Float = (e.total <= 0? 0 : e.loaded / (e.total + 5)) * 0.9999;
			if(p_callback!=null) p_callback(null,p,e);
		};
		
		ld.upload.onprogress = 
		function req_upload_progress(e : ProgressEvent) 
		{
			if(p_data!=null)
			{
				var p : Float = (e.total <= 0? 0 : e.loaded / (e.total + 5)) * 0.9999;
				if(p_callback!=null) p_callback(null,-(1.0-p),e);
			}
		};
		
		ld.onload  = function req_onload(e:Event) { if(p_callback!=null) p_callback(p_binary ? new Uint8Array(ld.response) : ld.response,1.0,e); };
		ld.onerror = function req_onerror(e:Event){ if(p_callback!=null) p_callback(null,1.0,e); };
		
		if (p_headers != null)
		{
			var fl : Array<String> 	= Reflect.fields(p_headers);
			for (i in 0...fl.length) ld.setRequestHeader(fl[i], Reflect.getProperty(p_headers, fl[i]));
		}
		
		
		ld.open(method,p_url,true);
		if(p_data != null)
		{			
			if (Std.is(p_data, ArrayBuffer)) ld.send(p_data); else
			if (Std.is(p_data, Blob)) 		 ld.send(p_data); else
			if (Std.is(p_data, String))		 ld.send(p_data); else
			if (Std.is(p_data, FormData))	 ld.send(p_data); else
			{
				var fd : FormData 		= new FormData();
				var fl : Array<String> 	= Reflect.fields(p_data);
				for (i in 0...fl.length) fd.append(fl[i], Reflect.getProperty(p_data, fl[i]));
				ld.send(fd);
			}
			
		}
		else
		{
			ld.send();
		}
		
		
				
		return ld;
	}
	
	/**
	 * Returns a XMLHttpRequest prepared for a GET operation.
	 * @param	p_url
	 * @param	p_callback
	 * @param	p_data
	 * @return
	 */
	public function get(p_url:String, p_callback : Dynamic->Float->Event->Void,p_binary : Bool=false, p_data : Dynamic = null,p_headers:Dynamic=null):XMLHttpRequest
	{
		return create("get", p_url, p_callback, p_binary, p_data,p_headers);
	}
	
	/**
	 * Returns a XMLHttpRequest prepared for a POST operation.
	 * @param	p_url
	 * @param	p_callback
	 * @param	p_data
	 * @return
	 */
	public function post(p_url:String, p_callback : Dynamic->Float->Event->Void,p_binary : Bool=false, p_data : Dynamic = null,p_headers:Dynamic=null):XMLHttpRequest
	{
		return create("post", p_url, p_callback, p_binary, p_data,p_headers);
	}
	
}