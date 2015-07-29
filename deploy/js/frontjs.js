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
				if(n==null) return;
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
			var fjs = Front;
			var t   = p_target;
			
			if(typeof(t)=="string")
			{
				t = fjs.view.get(t);
				if(t==null) return null;
			}
			
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
						default: 		 return p_value==null ? t.value : (t.value=p_value); 	 break;
					}							
				}
				break;						
				case "select":   return p_value==null ? t.selectedIndex : (t.selectedIndex=p_value); break;
				case "textarea": return p_value==null ? t.value : (t.value=p_value); 	 break;
				default: 		 return p_value==null ? t.textContent : (t.textContent=p_value); break;
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
			t.route = t.route==null ? (p_route==null ? /(.*?)/ : p_route) : t.route;
			if(t.allow==null) t.allow="";
			//if(t.allow=="") t.allow = "click,change,input,model";
			return t;
		},
		
		/**
		Removes a Controller.
		//*/
		remove: function(p_target)
		{
			var ref = this;
			var t = p_target;
			var pos = ref.list.indexOf(t);
			if(pos >= 0) { ref.list.splice(pos,1); return t; }
			return null;
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
			ref.notify(vpth,p_event,p_target,p_data);
			
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
		Propagates a notification to all controllers.
		//*/
		notify: function(p_path,p_event,p_target,p_data)
		{
			var fjs = Front;
			var ref = this;	
			
			for(var i=0;i< ref.list.length;i++)
			{
				var c = ref.list[i];								
				if(c.on != null)
				{
					//Event do not belongs to this controller permited.
					if(c.allow != null) if(c.allow!="") if(c.allow.indexOf(p_event)<0) continue;
					if(p_path!="") if(!c.route.test(p_path)) continue;
					c.on(p_path,p_event,p_target,p_data);
				}
			}
		},
		
		/**
		Wrapper for XMLHttpRequest features.
		//*/
		request:
		{
			/**
			URL for the default notification webservice.
			//*/
			service: "",
			
			/**
			Creates a XMLHttpRequest passing the notification data to it.
			//*/
			create: function(p_url,p_path,p_event,p_data,p_binary,p_method)
			{
				var method = p_method==null ? "get" : p_method;
				var binary = p_binary==null ? false : p_binary;			
				var ctrl = Front.controller;
				var fjs = Front;
				var n   = {};			
				n.path  = p_path;
				n.event = p_event==null ? "" : p_event;
				n.data  = p_data==null ? {} : p_data;				
				if(method=="get")
				{
					var qs = "?notification="+JSON.stringify(n);
					p_url+=qs;
				}
				
				var req =				
				fjs.request.create(p_url,function(d,p,x,err)
				{
					
					if(p>=0) if(p<=1.0) ctrl.notify(p_path+".progress","progress",x,p);
					if(p<0) ctrl.notify(p_path+".upload","progress",x,1.0+p);
					if(p>=1.0)
					{
						if(d==null)
						{
							ctrl.notify(p_path+".error","error",x,err);
						}
						else
						{							
							ctrl.notify(p_path+".complete","complete",x,x.response);
							if(!binary)
							{
								var nl = JSON.parse(x.response);
								if(nl == null) { console.error("Controller> Service ["+p_url+"] returned a wrong notification list."); return; }								
								for(var i=0; i<nl.length;i++)
								{
									var n = nl[i];
									if(n.path==null)
									{
										console.error("Controller> Service ["+p_url+"] returned a wrong notification format.");
									}
									else
									{
										
										n.event = n.event==null ? "" : n.event;
										n.data  = n.data==null ? {} : n.data;
										ctrl.notify(n.path,n.event,x,n.data);
									}
								}								
							}
						}						
					}					
				},JSON.stringify(n),binary,method);
				return req;
			},
			
			/**
			Wrapper for a GET request that returns a notification formatted reponse.
			//*/
			get: function(p_url,p_path,p_event,p_data,p_binary)
			{
				var ref = this;
				return ref.create(p_url,p_path,p_event,p_data,p_binary,"get");
			},
			
			/**
			Wrapper for a POST request.
			//*/
			post: function(p_url,p_path,p_event,p_data,p_binary)
			{
				var ref = this;
				return ref.create(p_url,p_path,p_event,p_data,p_binary,"post");
			},
			
			/**
			Creates a request to the default service and sends a notification.
			Default to POST.
			//*/
			notify: function(p_path,p_event,p_data,p_binary,p_method)
			{
				var ref = this;
				var method = p_method==null ? "post" : p_method;
				return ref.create(ref.service,p_path,p_event,p_data,p_binary,method);
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
		Check if a given element or element's id is a view.	If forced checks if inside a view context.
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
		Returns the view context the target is inserted.		
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
		If the element is not a view an empty string is returned unless, if forced the closest view path that contains this element is returned.
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
		Returns the view element's by its path.
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
		Searches a View by its id alone. If the flag 'all' is passed all occurrences are returned.
		//*/
		find: function(p_id,p_all)
		{
			var all = p_all==null ? false : p_all;
			var fjs = Front;
			var res = all ? [] : null;
			fjs.traverse(fjs.root,function(n)
			{
				var vid = fjs.attribute(n,"view");				
				if(vid=="")   return;				
				if(vid==p_id)
				{					
					if(!all) 
					{
						if(res==null) { res = n; return false; }
						if(res!=null) return false;
					}
					res.push(n);
				}
			});	
			return res;
		},
		
		/**
		Clones a given View if the 'template' attribute is available.
		//*/
		clone: function(p_target)
		{
			
			var fjs = Front;
			var ref = this;
			var c = null;
			if(typeof(p_target) =="string")
			{
				var t = ref.get(p_target);
				if(t==null) return null;
				if(t.getAttribute==null) return null;
				if(t.getAttribute("template")==null) return null;
				c = t;
			}
			else
			{
				c = p_target;
			}						
			c = c.cloneNode(true);
			c.removeAttribute("template");
			return c;
		},
		
		/**
		Returns the view's parent.
		//*/
		parent: function(p_target)
		{
			var fjs = Front;
			var ref = this;
			if(p_target==null) return null;
			if(typeof(p_target) =="string")
			{
				var tks = p_path.split(".");
				tks.pop();
				var pth = tks.join(".");
				return ref.get(pth);
			}
			var n = p_target.parentNode;
			while(n != null)
			{
				if(Front.view.is(n)) return n;
				n = n.parentNode;
			}	
			return null;
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
	Sets the event handling root element.
	//*/
	setRoot: function(p_root)
	{
		if(ref.root != null)
		{
			for(var i=0;i<ref.events.length;i++) ref.listen(ref.events[i],false);			
			ref.observer.disconnect();
		}		
		
		ref.root = p_root;
		
		if(ref.root != null)
		{
			for(var i=0;i<ref.events.length;i++) ref.listen(ref.events[i],true);
			
			var config = { attributes: true, childList: true, characterData: true, subtree: true };
			ref.observer.observe(ref.root,config);			
			
			//Make 'template' Elements disappear
			var sheet = document.styleSheets[0];
			sheet.insertRule("*[template] { display: none; }", 1);
			
		}
	},
	
	/**
	Register an internal handler for the desired event.
	//*/
	listen:function(p_event,p_flag)
	{
		if(ref.root == null) return;
		var e  = ref.root;
		var fn = p_flag ? e.addEventListener : e.removeEventListener;		
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
		ref = this;
		
		ref.events = p_events==null ? ref.events : p_events;		
		ref.root   = p_root;
		
		if(MutationObserver == null)
		{
			console.warn("FrontJS> MutationObserver class not found.");
		}		
		else
		{
			ref.observer = new MutationObserver(ref.onmutation);		
		}
		
		if(ref.root == null)
		{
			if(document.body == null)
			{
				window.addEventListener("load",ref.onload);
			}
			else
			{
				ref.root = document.body;
			}
		}
		
		
		if(ref.root != null)
		{
			console.log("FrontJS> Initialize ["+ref.root+"]");
			ref.setRoot(ref.root);
		}
	},
	
	/**
	Window onload callback.
	//*/
	onload: function()
	{		
		window.removeEventListener("load",ref.onload);		
		if(ref.root==null)
		{
			ref.root = document.body;
			console.log("FrontJS> Initialize ["+ref.root+"]");
			ref.setRoot(ref.root);
		}
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
	If the specified callback returns a Boolean, the traversal can be stopped in the current depth.
	//*/
	traverse: function(n,cb)
	{
		var res = null;
		res = cb(n);
		if(res==false) return;
		var l = n.children;
		for(var i=0;i<l.length;i++) ref.traverse(l[i],cb);
	},
	
	/**
	class that handles XMLHttpRequest related functionalities.
	//*/
	request:
	{
		/**
		Wrapper for a XMLHttpRequest. Accepts a callback that receives (data,progress,xhr,error).
		//*/
		create: function(p_url,p_callback,p_data,p_binary,p_method)
		{
			var method = p_method==null ? "get" : p_method;
			var binary = p_binary==null ? false : p_binary;		
			var ref = this;
			var ld = new XMLHttpRequest();		
			if (ld.overrideMimeType != null) {  ld.overrideMimeType(binary ? "application/octet-stream" : "text/plain");  }			
			ld.onprogress = function(e) 
			{
				var p = (e.total <= 0? 0 : e.loaded / (e.total + 5)) * 0.9999;
				if(p_callback!=null) p_callback(null,p,ld);
			};
			ld.upload.onprogress = 
			function(e) 
			{
				if(p_data!=null)
				{
					var p = (e.total <= 0? 0 : e.loaded / (e.total + 5)) * 0.9999;
					if(p_callback!=null) p_callback(null,-(1.0-p),ld);
				}
			};
			ld.onload = function(e1) { if(p_callback!=null) p_callback(ld.response,1.0,ld); };
			ld.onerror = function(e2){ if(p_callback!=null) p_callback(null,1.0,ld,e2); };			
			ld.open(method,p_url,true);
			if(p_data != null)
			{				
				ld.send(p_data);
			}
			else
			{
				ld.send();
			}
			return ld;
		},
		
		/**
		Creates a GET request.
		//*/
		get: function(p_url,p_callback,p_data,p_binary)
		{
			var ref = this;
			var d  = p_data;			
			if(d != null)
			{
				var qs = "?";
				var kl = [];
				for(var k in d) kl.push(k+"="+d[k]);
				for(var i=0;i<kl.length;i++)
				{					
					qs += kl[i];
					if(i<(kl.length-1)) qs+="&";
				}
				p_url+=qs;
			}
			return ref.create(p_url,p_callback,null,p_binary,"get");
		},
		
		/**
		Creates a POST request.
		//*/
		post: function(p_url,p_callback,p_data,p_binary)
		{	
			var ref = this;
			return ref.create(p_url,p_callback,p_data,p_binary,"post");
		},
	}
	
	
};


