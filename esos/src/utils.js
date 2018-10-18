function moveToAnchor(pageId, elementId, speed) {
  scrollTo(pageId, elementId, speed);
}

function scrollTo(pageId, elementId, speed){
  let page = document.querySelector("#"+pageId);
  let element = document.querySelector("#"+elementId);

  let currentScroll = page.scrollTop;
  let elementScroll = element.getBoundingClientRect().top;

  let stick = elementScroll - currentScroll;
  if(Math.abs(stick) != 0.0){
    setTimeout(function(){
      if(stick > speed){
        stick = speed;
      }
      else if(stick < -speed){
        stick = -speed;
      }

      speed *= 0.01;

      page.scrollTop += stick;
      //console.log(page.scrollHeight - page.scrollTop);

      if(page.scrollHeight - page.scrollTop != page.getBoundingClientRect().height){
        scrollTo(pageId, elementId);
      }
    }, 10);
  }
}

function ScrollToResolver(elem) {
  var jump = parseInt(elem.getBoundingClientRect().top * .2);
  document.body.scrollTop += jump;
  document.documentElement.scrollTop += jump;
  if (!elem.lastjump || elem.lastjump > Math.abs(jump)) {
    elem.lastjump = Math.abs(jump);
    setTimeout(function() { ScrollToResolver(elem);}, 100);
  } else {
    elem.lastjump = null;
  }
}

export default {
  moveToAnchor
}