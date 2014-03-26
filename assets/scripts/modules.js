
//////////////////////////////////////////////////////////////////////////////////////////

// all modules, prefix with "-" to signify library; <name>_init etc. won't be called
var MODULES=[
  "-util",
  "-animation",
//  "load",
  "asset",
  "input",
  "images",
  "canvas",
];

// saved as prop.version
var VERSION=[0,0,1];

// use a main loop? (if you disable then reenable this, you must call update() afterwards)
var UPDATE=false;

// the framerate is updated this often (seconds)
var FRAME_DELAY=1;

//////////////////////////////////////////////////////////////////////////////////////////

var async_modules={};
var async_done_callback=null;

// PROP

function prop_init() {
  prop={};
  prop.version=VERSION;
  prop.time={};
  prop.time.start=time();
  prop.time.frames=0;
  prop.time.frame={};
  prop.time.frame.start=time();
  prop.time.frame.delay=FRAME_DELAY;
  prop.time.frame.count=0;
  prop.time.frame.last=time();
  prop.time.frame.delta=0;
  prop.time.fps=0;
}

// ASYNC (AJAX etc.)

function async(name) {
  async_modules[name]=false;
}

function async_loaded(name) {
  async_modules[name]=true;
  async_check();
}

function async_wait(callback) {
  async_done_callback=callback;
  async_check();
}

function async_check() {
  for(var i in async_modules) {
    if(async_modules[i] == false)
      return;
  }
  if(async_done_callback)
    async_done_callback();
}

// UTIL

function time() {
  return new Date().getTime()/1000;
}

function s(n,t,f) {
  if(!t) t="";
  if(!f) f="s";
  if(n == 1) return t;
  return f;
}

// MODULES

function load_module(name) {
  var filename;
  if(name[0] == "-") {
    modules[name].library=true;
    filename="assets/scripts/"+name.substr(1)+".js";
  } else {
    filename="assets/scripts/"+name+".js";
  }
  var el=document.createElement("script");
  el.src=filename;
  document.head.appendChild(el);
  el.onload=function() {
    modules[name].script=true;
    if(modules[name].library)
      console.log("Loaded library "+name.substr(1));
    else
      console.log("Loaded module "+name);
    for(var i in modules) {
      var m=modules[i];
      if(!m.script)
        return;
    }
    call_module("*","init");
    done();
  };
}

function load_modules() {
  // inserts each module's <script> into <head>
  for(var i in modules) {
    load_module(i);
  }
}

function call_module(name,func,args) {
  if(!args) args=[];
  if(name == "*") {
    for(var i=0;i<MODULES.length;i++)
      call_module(MODULES[i],func,args);
    return null;
  }
  if(name+"_"+func in window && name[0] != "-") {
    return window[name+"_"+func].apply(window,args);
  }
  return null;
}

$(document).ready(function() {
  modules={};
  for(var i=0;i<MODULES.length;i++) {
    modules[MODULES[i]]={
      library:false,
      script:false,
    };
  }
  prop_init();
  load_modules();
});

function done() {
  var e=time()-prop.time.start;
  e=e.toPrecision(2);
  console.log("Finished loading "+MODULES.length+" module"+s(MODULES.length)+" in "+e+"s");
  call_module("*","start");
  async_wait(function() {
    call_module("*","done");
    $(window).resize(resize);
    if(update)
      requestAnimationFrame(update);
  });
}

function resize() {
  call_module("*","resize");
}

function update() {
  call_module("*","update");
  if(UPDATE)
    requestAnimationFrame(update);
  prop.time.frames+=1;
  prop.time.frame.count+=1;
  var elapsed=time()-prop.time.frame.start;
  if(elapsed > prop.time.frame.delay) {
    prop.time.fps=prop.time.frame.count/elapsed;
    prop.time.frame.count=0;
    prop.time.frame.start=time();
  }
  prop.time.frame.delta=Math.min(time()-prop.time.frame.last,0.9);
  prop.time.frame.last=time();
}

function delta() {
  return prop.time.frame.delta;
}
