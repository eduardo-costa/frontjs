# FrontJS  
Straightforward front-end MVC Javascript Framework  

# Install 

## Javascript
Include the sources:

```html
<script src="js/frontjs.js">
```
or
```html
<script src="js/frontjs.min.js">
```

## Haxe

Install the `fronthx` library:
```
haxelib git fronthx https://github.com/eduardo-costa/frontjs
```

After adding the sources in the HTML.
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

