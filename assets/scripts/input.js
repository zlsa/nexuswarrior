
var keys={
  enter:13
};

function input_init() {

  prop.input={};
  prop.input.text="";
  prop.input.image=0;
  prop.input.dirty=false;

  $("#text textarea").keyup(function(e) {
    prop.input.text=$("#text textarea").val();
    canvas_update();
    prop.input.dirty=true;
  });
  
  setInterval(function() {
    if(prop.input.dirty) {
      prop.input.dirty=false;
      input_convert();
    }
  },100000);
  
  $("#output").on("contextmenu",function() {
    console.log("convert");
    input_convert();
    return(true);
  });
}

function input_start() {

  asset_load(new Asset({
    name:"matias-nexus7",
    url:"images/matias-nexus7.png"
  }));

}

function input_convert() {
  console.log(canvas_get("main"));
  var url=canvas_get("main").canvas.toDataURL();
  $("#output").get(0).src=url;
}
