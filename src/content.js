window.browser = (function() {
  return window.browser || window.chrome;
})();

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    attachInvertButton();
  
    highlightExternalLink();
  }
}

window.browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.message);
    console.log("request.message content//////");
    if( request.message === "invert" )
      invertPage();
    else if( request.message === "highlight" )
      highlightExternalLink();
    else if( request.message === "captureLink" )
      captureExtenalLinks();
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


function captureExtenalLinks() {
  var links = document.querySelectorAll("a");
  var external_links = [];
  var link_name = "";

  for(let link of links) {
    if((link.origin !== document.location.origin) && link.href !== "")
      link_name = `${link.innerText} - ${link.href}`;
      external_links.push(link_name);
  }

  window.browser.runtime.sendMessage({ 
    "message": "externalLink",
    "links": external_links
  });
}
