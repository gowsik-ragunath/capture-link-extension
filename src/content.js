// window.browser = (function() {
//   return window.browser || window.chrome;
// })();

window.browser = chrome;

console.log(window.browser)

document.onreadystatechange = () => {
  console.log(document.readyState)
  if (document.readyState === "complete") {
    attachInvertButton();
  
    highlightExternalLink();
  }
}

window.browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "invert" )
      invertPage();
    else if( request.message === "highlight" )
      highlightExternalLink();
  }
);

function attachInvertButton() {
  let invertButton = document.createElement("button");
  invertButton.innerHTML = "Invert Page";

  invertButton.addEventListener("click", (_e) => { 
    invertPage();
  })

  document.body.insertAdjacentElement('beforebegin', invertButton);
}

function highlightExternalLink() {
  var links = document.querySelectorAll("a");

  for(let link of links) {
    if(link.origin !== document.location.origin) {
      if(link.style.backgroundColor?.toLowerCase() !== "yellow") {
        link.style.backgroundColor = "yellow";
      } else {
        link.style.backgroundColor = "white";
      }
    }
  }
}

function invertPage() {
  let filter = document.querySelector('html').style.filter;
  
  if(filter === "invert(0%)" || filter === undefined || filter === null)
    document.querySelector('html').style.filter = 'invert(100%)';
  else
    document.querySelector('html').style.filter = 'invert(0%)';
}