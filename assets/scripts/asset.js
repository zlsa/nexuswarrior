
var Asset=function(options) {
  this.type="image";
  this.name=null;
  this.data=null;
  this.url=null;
  if(options) {
    if("name" in options) {
      this.name=options.name;
    }
    if("type" in options) this.type=options.type;
    if("data" in options) this.data=options.data;
    if("url" in options) this.url="assets/"+options.url+"";
  }

  var that=this;

  this.parse=function() {
  };

  this.callback=options.callback;

  this.load=function(reload) {
    if(this.data != null && !reload)
      return;
    else
      prop.asset.number.loaded-=1;
    if(this.type == "image") {
      this.data=new Image();
      this.data.src=this.url;
      this.data.onload=function() {
        prop.asset.number.loaded+=1;
        if(that.callback)
          that.callback("loaded");
        asset_number_changed();
      };
    }
  };
};

function asset_init() {
  
  prop.asset={};

  prop.asset.assets={};

  prop.asset.number={};
  prop.asset.number.loaded=0;
  prop.asset.number.total=0;
  
  //async("asset");
}

function asset_get(name) {
  if(name in prop.asset.assets)
    return prop.asset.assets[name];
  return null;
}

function assets_done() {
  if(prop.asset.number.total == prop.asset.number.loaded)
    return true;
  return false;
}

function asset_number_changed() {
  if(assets_done()) {
    console.log("Loaded all assets!");
    async_loaded("asset");
  }
}

function asset_load(a) {
  prop.asset.assets[a.name]=a;
  prop.asset.number.total+=1;
  prop.asset.number.loaded+=1;
  a.load();
}
