
var Animation=function(options) {
  this.value=0;
  this.start_value=0;
  this.end_value=1;
  this.progress=0;
  this.easing="smooth";
  this.time=0;
  this.start=0;
  this.animating=false;
  if(options) {
    if("value" in options) this.value=options.value;
    if("start_value" in options) this.start_value=options.start_value;
    if("end_value" in options) this.end_value=options.end_value;
    if("easing" in options) this.easing=options.easing;
    if("time" in options) this.time=options.time;
  }
  this.set=function(value) {
    this.animate(value);
  };
  this.get=function(progress) {
    return this.step(time());
  };
  this.animate=function(value) {
    this.animating=true;
    this.progress=0;
    this.start=time();
    this.start_value=this.value+0;
    this.end_value=value;
  };
  this.ease=function() {
    if(this.easing == "linear")
      this.value=crange(0,this.progress,1,this.start_value,this.end_value);
    else if(this.easing == "smooth")
      this.value=srange(0,this.progress,1,this.start_value,this.end_value);
    else
      console.log("Unknown easing '"+this.easing+"'");
  };
  this.step=function(t) {
    this.progress=crange(this.start,t,this.start+this.time,0,1);
    if(!this.animating)
      this.progress=0;
    this.ease();
    return this.value;
  };
  this.step(time());
};


a=new Animation(0);
a.time=10;
a.set(20);
