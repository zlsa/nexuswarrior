
/* Adding images? Never fret. Just copy one of the lines below and
 * change the image name (found in assets/images/backdrops/<name>.png)
 * and the creator. The order they're defined here is the order
 * they're displayed in. If there is no creator, leave the field
 * empty. */

function images_start() {
  /* Edit below this line... */
  image_add("matias-nexus7","Gizmodo");
  image_add("pocket","CNET");
  image_add("hand","CNET");
  image_add("back","Phandroid");
  image_add("crapple-censored");
  image_add("nexus5-root","capecoders.net");
  /* ... and above this line. */
}

/* Curious? See assets.js (but beware, it's hacky and badly (aka not)
 * documented. See also modules.js). */

function image_add(name,creator) {
  if(!creator)
    creator=null;
  asset_load(new Asset({
    name:name,
    url:"images/backdrops/"+name+".png"
  }));
  prop.input.images.push([name,creator]);
}
