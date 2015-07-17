# FrontJS  

Clean and Fast MVC for your Front-End app. Plug and Play your controller classes with the smallest code footprint.
```html
<div view="home">
  <div view="content">
  </div>
  <div view="footer">
  </div>
</div>
<div view="gallery">
  <div view="header">
  </div>
  <div view="pages">
  </div>
</div>
```

```javascript
Front.initialize();

//Home event controller
Front.controller.add(
{
  //RegExp of the chosen view route or null if capture all.
  route: /home./, 
  //Allowed events
  allow: "click,input",
  on: function(path,type,target)
  {
    //handle all events in 'allow'
    //filter by view 'path' or 'type'
    switch(path)
    {
      case "home.content": break;
      case "home.footer": break;
    }
  }
});

//Gallery event controller
Front.controller.add(
{
  route: /gallery./,
  allow: "click,input,change",
  on: function(path,ev,target)
  {
  
  }
});
```

# Example

Simple example, showing controllers and examples.
http://codepen.io/eduardo_costa/pen/pJLoKd


# Install 

## Javascript
Include the sources:

### Local
```html
<script src="js/frontjs.js">
<!-- minified -->
<script src="js/frontjs.min.js">
```

### CDN
```html
<script src="http://cdn.thelaborat.org/frontjs/frontjs.js">
<script src="http://cdn.thelaborat.org/frontjs/frontjs.min.js">

<!-- Custom Version -->
<script src="http://cdn.thelaborat.org/frontjs/0.4.0/frontjs.js">
<script src="http://cdn.thelaborat.org/frontjs/0.4.0/frontjs.min.js">
```


## Haxe

* Add the `js` sources on your HTML page.
* Install the `fronthx` library:
```CLI
haxelib git fronthx https://github.com/eduardo-costa/frontjs
```  
Include the library when compiling:  

```CLI
haxe ... -lib fronthx ...
```
Include the references on your Haxe source.
```haxe
import js.front.Front;
```

# Usage

## Initialization

### HTML
First mark in the HTML whose elements will be **Views** and/or **Models**

```html
<div view="content" model="app.model">
	<div view="form">
		<input type="text" view="name">
	</div>
</div>
```

### Javascript

The `Front` global object gives access to all MVC elements and other utility functions.
Be sure to initialize `Front` before using it.

```javascript
//root_element   -> defaults to document.body
//default_events -> defaults to ["input","change","click"]
Front.initialize([root_element],[default_events]); 
```

### Haxe

The `Front` static class is a direct reference to the `Front` global object.

```haxe
static function main()
{
	Front.initialize([root_element],[default_events]); 	
}
```

## Controller

Controller classes will listen and handle events captured at `Front.root` using their `on` callback.

### Javascript
Create a Controller instance following this template:	
```javascript
var simple_controller =
{
	//View Path RegExp tester. default=null
	var route: /some.regexp/,
	//Allowed events. default="click,change,input"	
	var allow: "click,focus,model",
	//'on' callback
	//path   = Container View path or "" if none
	//event  = event.type
	//target = event.target
	//data   = Model data when 'model' event or if informed in Front.model.dispatch call
	var on: function(path,event_type,target,data) { }
};
Front.controller.add(simple_controller,[/some.other.regexp/]);
```
The created controller will have its `on` method called if the event type matches `simple_controller.allow` and the event target's containing view matches the `route`.

### Haxe
The Haxe target makes full use of its language features to create a `BaseController` class that can be extended.

```haxe
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

/*...*/

Front.controller.add(new SimpleController("simple"),["some.regexp.str.rule"]);
```

## Model

The `model`attribute helps the `Front` class search for elements responsible for data storage and update.
Elements with the `model`attributes can have their data sampled like this:	

```javascript
//Will search an Element with model="some.model.attrib"
var obj = Front.model.data("some.model.attrib");
```

Similarly in Haxe:
	
```haxe
var obj : Dynamic = Front.model.data("some.model.attrib");
```

All Elements inside it with the `view` attribute will have their data sampled and returned in the resulting object.

```html
<div model="foo">
	<input type="text" view="name"/>
	<input type="date" view="date"/>
	<p view="field">Some Not-Input Element</p>
</div>

<script>
	//Will return { name: 'content', date: 'yyyy-mm-dd', field: "Some Not-Input Element" }
	console.log(Front.model.data("foo"));
	
	//Will fill the Element's 'value' when their 'view' matches the obj 'variables'
	var d = { name: "NAME", date: "2000-01-01", field: "LOL" };
	Front.model.data("foo",d);	
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
	on: function(p_path,p_event,p_target,p_data)
	{
		if(p_event == "model")
		{
			if(Front.model.attribute(p_target) == "some.model") console.log(p_data);
		}
	}
});

```

## View

Views are useful to store the reference for important elements in the DOM.

```html
<div view="content" model="content.form">
	<div view="form">
		<input type="text" view="name">
	</div>
</div>
```

```javascript
//Will search an Element with model="some.model.attrib"
var div = Front.view.get("content.form");
```

Similarly in Haxe:
	
```haxe
var div : DivElement = cast Front.view.get("content.form");
```

### Templates

Some times we want to duplicate items in a list. 
For these cases, it is possible to mark elements with `template`. 
They will be invisible and cloneable using the method `Front.view.clone(path | element)`.

```html
<ul view="list">
  <li view="item" template>This is Template</li>
</ul>
```

```javascript
var list = Front.view.get("list");
var new_item = Front.view.clone("list.item");
new_item.textContent = "Item X";
list.appendChild(new_item);
```


## Events

You can listen to more events besides the default ones:
```javascript
//Enables the mouseover event.
Front.listen("mouseover",true);
//Disables the mouseout event.
Front.listen("mouseout",false);
```

## Data Binding

It is possible to transfer changes in model elements to other parts of the DOM.


```html
<div view="content" model="content.form">
	<div view="form">
		<input type="text" view="name">
	</div>
</div>

<p bind="content.form.name">Start Value</p>
```

Everytime `content.form.name` changes, the new value will be applied on the `<p>` Element marked with the `bind` attribute.
The syntax for the `bind` attribute is `[path.to.model].[view-attrib]`

