/**
Creates the FrontJS manager.
//*/
var Front =
{
	/**
	self reference.
	//*/
	ref: null,
	
	/**
	Model root container.
	//*/
	model: 
	{
		/**
		Check if a given element or element's id is a model.
		If forced checks if inside a model context.
		//*/
		is: function(p_target,p_force)
		{			
			var fjs = Front;
			var ref = this;					
			if(typeof(p_target) =="string") return ref.get(p_target) != null;
			if(p_force) return ref.context(p_target) != null;			
			return fjs.attribute(p_target,"model") != "";
		},
		
		/**
		Returns the model context the target is inserted.		
		//*/
		context: function(p_target)
		{
			var fjs = Front;
			var ref = this;
			var n = p_target;
			if(typeof(p_target) =="string") n = ref.get(p_target);
			while(n!=null)
			{
				var mid = fjs.attribute(n,"model");
				if(mid!="") return n;
				n = n.parentNode;
			}
			return null;
		},
		
		/**
		Will watch a model DOM and report changes as 'model' events.
		//*/
		watch: function(p_id,p_flag) 
		{
			var fjs = Front;
			var m = fjs.find("model",p_id);
			if(m==null) return;			
			m.watch = p_flag==null ? true : p_flag;
		},
		
		/**
		Returns the model DOM element.
		//*/
		get: function(p_id)
		{			
			var fjs = Front;
			return fjs.find("model",p_id);
		},
		
		/**
		Get or Set a model data using the 'model' attribute in the DOM as guide.
		//*/
		data: function(p_id,p_value)
		{
			var fjs = Front;
			var ref = this;
			
			if(p_value != null)
			{
				var m = ref.get(p_id);
				if(m==null) return;
				for(var s in p_value)
				{
					var vn = fjs.find("view",s,m);
					ref.value(vn,p_value[s]);
				}
				return p_value;
			}
			
			var d = { };				
			fjs.traverse(fjs.root,function(n)
			{				
				var mid = n.getAttribute("model");
				if(mid==null) return;				
				if(mid!=p_id) return;				
				fjs.traverse(n,function(md)
				{
					if(md==n) return;
					var vid = md.getAttribute("view");
					if(vid==null) return;
					var tn  = md.nodeName.toLowerCase();
					if(tn==null) 	return;
					if(tn=="#text") return;					
					var itp = tn=="input" ? (md.type==null ? "" : md.type.toLowerCase()) : "";					
					var s = ref.value(md);					
					d[vid] = s;
				});
			});			
			return d;
		},
		
		/**
		Get or Set the value of the target element.
		//*/
		value: function(p_target,p_value)
		{
			var t   = p_target;
			var tn  = t.nodeName.toLowerCase();
			if(tn==null) 	return p_value;
			if(tn=="#text") return p_value;					
			var itp = tn=="input" ? (t.type==null ? "" : t.type.toLowerCase()) : "";			
			switch(tn)
			{
				case "input": 	
				{
					switch(itp)
					{
						case "checkbox": return p_value==null ? t.checked : (t.checked=p_value); break;
						default: 		 return p_value==null ? t.value : (t.value=p_value); break;
					}							
				}
				break;						
				case "select":  return p_value==null ? t.selectedIndex : (t.selectedIndex=p_value); break;
				default: 		return p_value==null ? t.textContent : (t.textContent=p_value); break;
			}
			return p_value;
		},
		
		/**
		Callbacks for events.
		//*/
		onevent:function(p_event,p_target)
		{
			var fjs = Front;
			var ref = this;
			var n = p_target;				
			while(n!=null)
			{
				var mid = fjs.attribute(n,"model");					
				if(mid!="")
				if(mid!=null)
				{						
					if(n.watch!=null)
					if(n.watch)
					{
						var d = ref.data(mid);
						fjs.controller.dispatch("model",n,d);
					}
				}					
				n = n.parentNode;
			}
		},
		
		/**
		Returns the 'model' attribute of the target.
		//*/
		attribute: function(p_target) { return Front.attribute(p_target,"model"); }
		
	},
	
	/**
	Controller root container.
	//*/
	controller:
	{
		/**
		List of added controllers.
		//*/
		list: [],
				
		/**
		Adds a Controller. If needed a route RegExp can be specified to allow events only of some view contexts.
		//*/
		add: function(p_target,p_route)
		{		
			var ref = this;
			var t = p_target;
			if(ref.list.indexOf(t) < 0) ref.list.push(t);
			t.route = p_route==null ? /(.*?)/ : p_route;
			if(t.allow==null) t.allow="";
			if(t.allow=="") t.allow = "click,change,input,model";
		},
		
		/**
		Removes a Controller.
		//*/
		remove: function(p_target)
		{
			var ref = this;
			var t = p_target;
			var pos = ref.list.indexOf(t);
			if(pos >= 0) ref.list.splice(pos,1);
		},
		
		
		/**
		Returns a flag indicating if the Controller named 'name' exists.
		//*/
		exists:function(p_name) { var ref = this; return ref.find(p_name) != null; },
		
		/**
		Searches a given controller by its name.
		//*/
		find: function(p_name)
		{
			var ref = this; 
			for(var i=0;i<ref.list.length;i++) if(ref.list[i].name != null)if(ref.list[i].name == p_name) return ref.list[i];
			return null;
		},
		
		/**
		Propagates an event to all controllers.
		//*/
		dispatch: function(p_event,p_target,p_data)
		{
			var fjs = Front;
			var ref = this;			
			var vpth = fjs.view.path(p_target,true);			
			for(var i=0;i< ref.list.length;i++)
			{
				var c = ref.list[i];								
				if(c.on != null)
				{
					//Event do not belongs to this controller permited.
					if(c.allow != null) if(c.allow!="") if(c.allow.indexOf(p_event)<0) continue;
					if(vpth!="") if(!c.route.test(vpth)) continue;
					c.on(vpth,p_event,p_target,p_data);
				}
			}
			
			//Check 'bind' Elements.
			if(("input,change,update").indexOf(p_event)>=0)
			{
				fjs.traverse(fjs.root,function(n)
				{
					var bind = fjs.attribute(n,"bind");
					if(bind=="") return;				
					var tks = bind.split(".");
					var f = tks.pop();
					var m = tks.join(".");							
					if(!fjs.model.is(m)) return;
					var d = fjs.model.data(m);				
					if(d[f]==null) return;
					fjs.model.value(n,d[f]);
				});			
			}
		},
		
		/**
		Removes all controllers.
		//*/
		clear: function() { var ref = this; ref.list = []; }
	},
	
	/**
	View root container.
	//*/
	view: 
	{
		/**
		Check if a given element or element's id is a view.
		If forced checks if inside a model context.
		//*/
		is: function(p_target,p_force)
		{
			var fjs = Front;
			var ref = this;
			if(typeof(p_target) =="string") return ref.get(p_target) != null;
			if(p_force) return ref.context(p_target) != null;			
			return fjs.attribute(p_target,"view") != "";
		},
		
		/**
		Returns the model context the target is inserted.		
		//*/
		context: function(p_target)
		{
			var fjs = Front;
			var n = p_target;
			while(n!=null)
			{
				var vid = fjs.attribute(n,"view");
				if(vid!="") return n;
				n = n.parentNode;
			}
			return null;
		},
		
		/**
		Returns the dot path of all view to this element. 
		If forced the view path that contains this element is returned.
		//*/
		path: function(p_target,p_force)
		{
			var pth = [];
			var vid = "";
			var f = p_force==null ? false : p_force;
			var n = p_target;
			vid = n.getAttribute!=null ? n.getAttribute("view") : "";		
			if(!f)
			{
				//Element isn't a view itself.
				if(vid==null) return "";
				if(vid=="")   return "";			
			}
			if(vid!=null) if(vid!="") pth.push(vid);
			n = n.parentNode;
			while(n!=null)
			{
				vid = n.getAttribute!=null ? n.getAttribute("view") : "";
				if(vid != null) if(vid!="") pth.push(vid);
				n = n.parentNode;
			}
			pth.reverse();
			return pth.join(".");
		},
		
		/**
		Returns the view element's path.
		//*/
		get: function(p_path)
		{
			if(p_path==null) return null;			
			var fjs = Front;
			var pth = p_path.split(".");			
			if(pth.length<=0) return null;			
			pth.reverse();					
			var res = null;			
			fjs.traverse(fjs.root,function(n)
			{
				if(pth.length<=0) { return false; }
				var vid = fjs.attribute(n,"view");				
				if(vid=="")   return;
				if(vid==pth[pth.length-1]) pth.pop();				
				if(pth.length<=0) { res = n; return false; }
			});			
			return res;
		},
		
		/**
		Returns the 'view' attribute of the target.
		//*/
		attribute: function(p_target) { return Front.attribute(p_target,"view"); }
		
	},
	
	/**
	Reference to the DOM observer (default or polyfill).
	//*/
	observer: null,
	
	/**
	Reference to the occurred mutations.
	//*/
	mutations: [],
	
	/**
	Default set of events.
	//*/
	events: ["click","input","change"],
	
	/**
	Root of the observed DOM structure.
	//*/
	root: null,
	
	/**
	Flag that indicates the Front manager is active.	
	//*/	
	enabled: true,
	
	/**
	Window onload callback.
	//*/
	onload: function()
	{		
		window.removeEventListener("load",ref.onload);		
		if(ref.root==null) ref.root = document.body;		
		console.log("FrontJS> Initialize ["+ref.root+"]");
		var config = { attributes: true, childList: true, characterData: true, subtree: true };
		ref.observer.observe(ref.root,config);		
		for(var i=0;i<ref.events.length;i++) ref.listen(ref.events[i],true);		
	},
	
	/**
	Register an internal handler for the desired event.
	//*/
	listen:function(p_event,p_flag)
	{
		var fn = p_flag ? document.body.addEventListener : document.body.removeEventListener;		
		var f  = ("focus,blur".indexOf(p_event) >= 0) && p_flag;
		if(f) fn(p_event,ref.onevent,true); fn(p_event,ref.onevent);
	},
	
	/**
	Global listener
	//*/
	onevent: function(p_event)
	{		
		if(!ref.enabled) return;
		var t = p_event.target;
		var e = p_event.type;		
		switch(e)
		{
			case "change":
			case "input":				
				ref.model.onevent(e,t);
			break;
		}		
		ref.controller.dispatch(e,t);
	},
	
	/**
	initialize the Front manager.
	//*/
	initialize: function(p_root,p_events)
	{		
		ref  = this;
		ref.root = p_root==null ? (document != null ? document.body : null) : p_root;
		if(p_events != null) ref.events = p_events;
		if(MutationObserver == null)
		{
			console.warn("FrontJS> MutationObserver class not found.");
		}		
		else
		{
			ref.observer = new MutationObserver(ref.onmutation);		
		}
		window.addEventListener("load",ref.onload);
	},
	
	/**
	Returns the target's attribute safely.
	//*/
	attribute: function(p_target,p_attribute)
	{
		if(p_target==null) return "";
		if(p_target.getAttribute==null) return "";
		var a = p_target.getAttribute(p_attribute);
		if(a==null) return "";
		return a;
	},
	
	
	/**
	Searches a given DOM by its attribute and its value.
	//*/
	find: function(p_attrib,p_value,p_from)
	{
		var res = null;
		var t = p_from==null ? ref.root : p_from;
		ref.traverse(t,function(n)
		{
			if(res!=null) return false;
			if(n.getAttribute==null)return;
			var a = n.getAttribute(p_attrib);
			if(a==null) return;
			if(a=="") return;
			if(p_value==null) 	{ res=n; return false; }
			if(p_value=="") 	{ res=n; return false; }
			if(a==p_value) { res=n; return false; }
		});
		return res;
	},
	
	/**
	Callbacks called when the DOM changes somehow.
	//*/
	onmutation: function(p_list)
	{	
		if(!ref.enabled) return;
		ref.mutations = p_list;
		for(var i=0;i<ref.mutations.length;i++)
		{
			var t = ref.mutations[i].target;
			ref.model.onevent("update",t);
		}
		ref.controller.dispatch("update",document.body);
	},
	
	/**
	Traverse the DOM Node, calling a callback.
	//*/
	traverse: function(n,cb)
	{
		var res = null;
		res = cb(n);
		if(res==false) return;
		var l = n.children;
		for(var i=0;i<l.length;i++) ref.traverse(l[i],cb);
	},
};


