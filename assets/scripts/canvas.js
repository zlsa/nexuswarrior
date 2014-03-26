
function canvas_init() {
  prop.canvas={};

  prop.canvas.contexts={};

  canvas_add("main");

  // resize canvas to fit window?
  prop.canvas.resize=false;
  prop.canvas.size={ // all canvases are the same size
    height:480,
    width:640
  };
  
  canvas_set_size();
}

function canvas_set_size() {
  if(prop.canvas.resize) {
    prop.canvas.size.width=$(window).width();
    prop.canvas.size.height=$(window).height();
  }
  for(var i in prop.canvas.contexts) {
    prop.canvas.contexts[i].canvas.height=prop.canvas.size.height;
    prop.canvas.contexts[i].canvas.width=prop.canvas.size.width;
  }
}

function canvas_add(name) {
  $("#canvases").append("<canvas id='"+name+"-canvas'></canvas>");
  prop.canvas.contexts[name]=$("#"+name+"-canvas").get(0).getContext("2d");
}

function canvas_get(name) {
  return(prop.canvas.contexts[name]);
}

function canvas_clear(cc) {
  cc.clearRect(0,0,prop.canvas.size.width,prop.canvas.size.height);
}

function canvas_draw_image(cc) {
  cc.drawImage(asset_get(prop.input.images[prop.input.image][0]).data,0,0);
}

function canvas_draw_text(cc) {
  cc.font="bold 40px Roboto";
  cc.shadowColor="transparent";
  cc.shadowBlur=6;
  cc.shadowOffsetX=0;
  cc.shadowOffsetY=1;
  var text=prop.input.text;
  if(text.length == 0)
    text="Sane defaults (type something)";
  var text=text.split("\n");
  var height=50;
  var offset=prop.canvas.size.height/2-50;
  offset-=(text.length*height)/4;
  cc.textAlign="center";
  $("body").append("<div id='text-size'></div>");
  $("#text-size").text(text.join("\n"));
  $("#text-size").css("font-size","40px");
  var width=$("#text-size").outerWidth();

  var o=offset-height*0.8;
  var h=text.length*height;
  var p=5;
  var alpha=0.7;
  switch(prop.input.style[1]) {
  case "black":
    cc.fillStyle="rgba(43,43,43,"+alpha+")";
    break;
  case "blue":
    cc.fillStyle="rgba(51,181,229,"+alpha+")";
    break;
  case "gray":
    cc.fillStyle="rgba(190,190,190,"+alpha+")";
    break;
  }
  cc.fillRect(f(prop.canvas.size.width/2-width/2-p),
              f(o-p),c(width+p*2),c(h+p*2));

//  cc.fillStyle=prop.input.style[0];
  switch(prop.input.style[0]) {
  case "black":
    cc.fillStyle="rgba(43,43,43,1)";
    break;
  case "blue":
    cc.fillStyle="rgba(51,181,229,1)";
    break;
  case "gray":
    cc.fillStyle="rgba(190,190,190,1)";
    break;
  }
//  cc.fillStyle="#33b5e5";
  cc.shadowColor="rgba(0,0,0,0.8)";
  for(var i=0;i<text.length;i++) {
    cc.fillText(text[i],prop.canvas.size.width/2,height*i+offset);
  }
  cc.fillStyle="#fff";
  cc.shadowBlur=4;
  cc.shadowOffsetY=0;
  cc.font="20px Roboto Slab";
  cc.fillText("#justnexuswarriorthings",prop.canvas.size.width/2,
              prop.canvas.size.height-100);
  cc.font="12px Roboto Condensed";
  p=5;
  cc.textAlign="left";
  cc.fillText("http://zlsa.github.io/nexuswarrior/",p,prop.canvas.size.height-p);
  cc.textAlign="right";
  if(prop.input.images[prop.input.image][1] != null)
    cc.fillText("Image copyright "+prop.input.images[prop.input.image][1],
                prop.canvas.size.width-p,prop.canvas.size.height-p);
}

function canvas_update() {
  var cc=canvas_get("main");
  cc.save();
  canvas_clear(cc);
  canvas_draw_image(cc);
  canvas_draw_text(cc);
  cc.restore();
  $("#text-size").each(function() {
    $(this).remove();
  });
}
