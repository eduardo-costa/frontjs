# FrontJS  1.0

Clean and Fast MVC for your Front-End app.  
* Name your Views  
* Add your Controllers  
* Sample your Models  

```html
<div n="home">
  <div n="content">
  </div>
  <div n="footer">
  </div>
</div>
<div n="gallery">
  <div n="header">
  </div>
  <div n="pages">
  </div>
</div>
```

```javascript
Front.initialize();

//Home event controller
Front.controller.add(
{  
  //Allowed events
  allow: ["click","input"],
  
  //Notification Handler
  on: function(e)
  {
    //handle all events in 'allow'	
    
	//e.type   == 'input' || 'click'
	//e.view   == 'path.to.view'
	//e.src    == source event
	//e.path   == 'path.to.view@input' || 'path.to.view@click'
	//e.data   == null || {some-model-data}
	
    switch(e.path)
    {
      case "home.content@input": break;
      case "home.footer@click": break;
    }
  }
},"home");

//Gallery event controller
Front.controller.add("gallery"
{  
  allow: ["click","input","change"],
  on: function(e)
  {
	  /*...*/
  }
});
```

# Example

# Install 

## Javascript
Include the sources:

### Local
```html
<!-- full -->
<script src="js/frontjs.js">
<!-- minified -->
<script src="js/frontjs.min.js">
```

### CDN
```html
<!-- Current Version -->
<script src="http://cdn.thelaborat.org/frontjs/frontjs.js">
<script src="http://cdn.thelaborat.org/frontjs/frontjs.min.js">

<!-- Custom Version -->
<script src="http://cdn.thelaborat.org/frontjs/1.0.0/frontjs.js">
<script src="http://cdn.thelaborat.org/frontjs/1.0.0/frontjs.min.js">
```


## Haxe

# Usage

## Initialization

### HTML
First mark in the HTML whose elements will be a **View**.  
Allowed **name** attribute:
* `<div attrib0="a0" attrib1="a1" ... n="view-name"></div>`
* `<div attrib0="a0" attrib1="a1" ... data-n="view-name"></div>`

```html
<div n="content">
	<div n="form">
		<input type="text" n="name">
	</div>
</div>
```

### Javascript

The `Front` global object gives access to all MVC elements and other utility functions.  
Be sure to initialize `Front` before using it.  

```javascript
Front.init(); 
```

### Haxe

## Controller

Controller classes will listen and handle events captured at its root **View** using their `on` callback.

### Javascript
Create a Controller instance following this template:	
```javascript
var simple_controller =
{	
	//Allowed events. default="" and accepts all events.	
	allow: ["click","focus","model"],
	//'on' callback	
	on: function(e) { }
};
Front.controller.add(simple_controller,"path.to.view");

var v = Front.view.get("path.to.view");
Front.controller.add(simple_controller,v);
```
The created controller will have its `on` method called if the event type matches `simple_controller.allow` and if it originates from within the chosen **View**.

## Model

The **Model** instance of the `Front` class is responsible by handling data inside the DOM.
All Elements inside a sampled `path.to.view` will have its contents returned as an object.  

```html
<div n="container">
	<div n="foo">
		<input type="text" n="name"/>
		<input type="date" n="date"/>
		<p n="field">Some Not-Input Element</p>
	</div>
</div>

<script>
	//Will return { name: 'content', date: 'yyyy-mm-dd', field: "Some Not-Input Element" }
	console.log(Front.model.get("container.foo"));
	
	//Will fill the Element's 'value' when their 'view' matches the obj 'variables'
	var d = { name: "NAME", date: "2000-01-01", field: "LOL" };
	Front.model.set("container.foo",d);	
</script>
```

### Watch

It is possible to keep track of Model updates in the DOM.

```javascript
//Will watch if 'some.model' changes its content and emmits a `model` event for all controllers, informing the new `data`.
//If the `MutationObserver` class exists, DOM changes inside the model will also be notified as an `update` event.
Front.model.watch("some.model",true);

Front.controller.add(
{
	on: function(e)
	{
		if(e.path=="some.model@model")		
		{
			console.log(p_data);
		}
	}
});

```

## View

Views are useful to store the reference for important elements in the DOM.

```html
<div n="content">
	<div n="form">
		<input type="text" n="name">
	</div>
</div>
```

```javascript
//Will search an Element matching the view path "content.form"
var div = Front.view.get("content.form");
```

### Templates

## Events

You can listen to more events besides the default ones:
```javascript
//Enables the mouseover event.
Front.controller.listen("path.to.controller","mouseover",true);
//Disables the mouseout event.
Front.controller.listen("path.to.controller","mouseover",false);
```

## Data Binding

It is possible to transfer changes in model elements to other parts of the DOM.


```html
<div n="content">
	<div :n="form">
		<input type="text" n="name">
	</div>
</div>

<p bind="content.form.name">Start Value</p>
```

Everytime `content.form.name` changes, the new value will be applied on the `<p>` Element marked with the `bind` attribute.
The syntax for the `bind` attribute is `[path.to.view]`

### Request  
The `XMLHttpRequest` features allow easy and fast creation of http requests. It is possible to create custom ones or use the `get`and `post` shortcuts.  

#### Front  
The `Front.request` class allows for classic requests with any kind of data. In order to simplify the operation, users only need to define a single callback to handle everything. Also a `binary` flag can be passed so the request returns an `ArrayBuffer`as result.  
```javascript
var callback = 
function(data,progress)
{
  //During upload the progress goes from -1.0 to 0.0
  if(progress < 0.0) { console.log("uploading: "+(1.0+progress)*100.0); }
  
  if(progress>=0) if(progress<=1.0) { console.log("loading: "+(progress*100.0)); }
  if(progress>=1.0)
  {
    if(data != null) 
    	console.log("complete: "+data); 
    else
    	console.log("error");
  }
};

//XMLHttpRequest
var xhr;

var data = { a: "A", b: 1 };

xhr = Front.request.create("http://page.com/service",callback,data,false,"get");
xhr = Front.request.get("http://page.com/service",callback,data);
xhr = Front.request.post("http://page.com/service",callback,data);
//The data can also be informed as querystring
var qs = "a=A&b=1";
xhr = Front.request.get("http://page.com/service?"+qs,callback);
```

#### Controller
The `Front.controller.request` class can handle a special case o requests compatible with the notification system of `FrontJS`. Controller's `on(path,event,target,data)` callback parameters can be serialized and sent to webservices.  
The BackEnd must be configured to:
 * Receive
   * `POST` data as `{path: "some.path", event: "some-event", data: {...}`
   * `GET` data as `notification={path: "some.path", event: "some-event", data: {...}`
 * Send
   * Array of `notification`.
     * `[{path: "path.one", event: "e0", data: {...}},{path: "path.two", event: "e1", data: {...}},...]`

Then in the HTML.  

```javascript
var some_ctrl = 
{
  on: function(e)
  {
    switch(e.path)
    {
      case "some.path@progress": console.log("progress: "+data); break;
      case "some.path@error":    console.log("error: "+data);    break;
      case "some.path@complete": console.log("complete: "+data); break;
      case "service.result":
        console.log(event,data.a,data.b);
        break;
    }
  }
};

//Register the controller to handle the requests.
Front.controller.add(some_ctrl);

//XMLHttpRequest
var xhr;

//Request class shares similarities with 'Front.request'
//Assume the web-service returns {path: "service.result", event: "success", data: {a:"world", b:2}}
Front.controller.request.post("http://page.com/notification","some.path","my-event",{a:"hello", b:1});
Front.controller.request.get("http://page.com/notification","some.path","my-event",{a:"hello", b:1});

//The querystring can be mannually assembled too for 'get' requests.
var qs = "notification={'path':'some.path','event':'my-event','data': {'a':'hello','b':1}} }";
Front.controller.request.get("http://page.com/notification?"+qs);

//If a single service will handle notifications there is this usage too.
//It can reduce the amount of URLs to be stored and handled.
Front.controller.service = "http://page.com/notification";
Front.controller.request.notify("some.path","my-event",{a:"hello", b:1});
Front.controller.request.notify("other.path","other-event",{a:"hi!", b:2});
```

### Storage

The storage features internally uses the `localforage` library by Mozilla [https://github.com/mozilla/localForage].
It uses the `IndexedDB` API to store and retrieve values.

#### Front
The usage with the `Front` class is pretty similar to `localforage`.
Just check the methods signatures for small differences in names.  

```javascript
Front.storage.init("MyDatabaseName"); //Init the database with your custom name. Defaults to "frontjs".
console.log(Front.storage.database);  //MyDatabaseName

Front.storage.context = "myapp";      //Storage context. Can be used to add values only related to a given application. Defaults to "fjs"

// Sets the Number in the 'key0' slot inside the DB. 
// Wait for the 'callback' for confirmation. 
// Check Mozilla's doc for the complete list of accepted data
Front.storage.set("key0", 0, callback);    
Front.storage.set("key1", 1, callback);
Front.storage.set("key2", 2, callback);

Front.storage.get("key2",function(v,err) { console.log(v); }); //2

//Returns the count of key-values for the current context.
Front.storage.length(function(count,err){ console.log(count); }); //3

Front.keys(function(list,err) { console.log(list); }); //["key0","key1","key2"]

Front.clear(function(count,err){}); //Removes all key-values from the current Front.context
Front.destroy(function(err){});     //Removes all key-values from all context and outside FrontJS
```

#### Model
The `Model`storage features are pratically the same of `Front`.
The difference is that, instead of `callback`, users must pass a `notification` string and optionally extra `data`.

```javascript
Front.model.storage.get("key2","samplekey",10); //(key,path,extra-data)

Front.controller.add(
{
  on: function(e)
  {
    switch(e.path)
    {
      case "samplekey@get": console.log(data); break; //[2,10]
    }
  },
});
```

