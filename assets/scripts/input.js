
var keys={
  enter:13
};

function input_init() {

  prop.input={};
  prop.input.text="";
  prop.input.image=0;
  if("nexuswarrior-last-image" in localStorage) {
    prop.input.image=parseInt(localStorage["nexuswarrior-last-image"]);
//    input_select_image(); // to ensure we don't go beyond bounds
  }
  prop.input.dirty=false;
  prop.input.style=["blue","black"];

  $("#text textarea").keyup(function(e) {
    input_update();
  });
  
  $("#output").on("contextmenu mousedown dragstart",function() {
    console.log("convert");
    input_convert();
    return(true);
  });
  
  $(".style").click(input_select);
  $("#style-blue-black").addClass("active");

  prop.input.images=[];

  $("#previous-image").click(function() {
    input_select_image(-1);
  });

  $("#next-image").click(function() {
    input_select_image(1);
  });

}

function input_update() {
  prop.input.text="";
  var text=$("#text textarea").val();
  var in_quotes=false;
  for(var i=0;i<text.length;i++) {
    var c=text[i];
    console.log(c);
    if(c == "\"") {
      if(!in_quotes) c="“";
      else c="”";
      in_quotes=!in_quotes;
    } else if(c == "'") {
      c="’";
    }
    prop.input.text+=c;
  }
  canvas_update();
  prop.input.dirty=true;
}

function input_convert() {
  var url=canvas_get("main").canvas.toDataURL();
  $("#output").get(0).src=url;
}

function input_select(e) {
  var id=$(e.currentTarget).attr("id").substr("style-".length);
  $(".style").removeClass("active");
  $("#style-"+id).addClass("active");
  // id=id.replace("black","#2b2b2b");
  // id=id.replace("blue","#33b5e5");
  // id=id.replace("gray","#bebebe");
  id=id.split("-");
  prop.input.style=id;
  canvas_update();
}

function input_select_image(offset) {
  prop.input.image+=offset;
  prop.input.image=prop.input.image.mod(prop.input.images.length);
  canvas_update();
  localStorage["nexuswarrior-last-image"]=prop.input.image;
}
