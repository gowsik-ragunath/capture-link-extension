const domain = "https://d291-117-203-66-57.ngrok.io";

window.browser = (function() {
  return window.browser || window.chrome;
})();

window.browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message)
  console.log(request.links)
  console.log("request.message....")
  if(request.message === "login")
    loginUser();
  else if(request.message === "externalLink")
    postExternalLinks(request.links);


  return Promise.resolve('ok');;
})

window.onload = function() {
  console.log("popup loaded.?")
  browser.runtime.sendMessage({ message: "setCookie" });
}

document.querySelector("#highlight").addEventListener("click", () => {
  window.browser.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    window.browser.tabs.sendMessage(activeTab.id, { "message": "highlight" });
  })
})

document.querySelector("#invert").addEventListener("click", () => {
  window.browser.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    window.browser.tabs.sendMessage(activeTab.id, { "message": "invert" });
  })
})


function loginUser() {

  fetch(`${domain}/thoughts/dynamic_extension_content`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      
      var dynamicContent = document.getElementById("dynamicContent");

      if(json.signed_in === true) {
        createDynamicElements(dynamicContent);
      } else {
        dynamicContent.innerHTML = "Not logged in"  
      }

    })

}


function postExternalLinks(links) {
  var external_links = JSON.stringify(links.join("<br/>")).substring(0,600);
  var params = new URLSearchParams({links: external_links});

  fetch(`${domain}/thoughts/extension_create?${params}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
    })
}


function createDynamicElements(dynamicContent) {
  var captureLink = dynamicContent.querySelector("#captureLink");
  var loginStatus = dynamicContent.querySelector("#loginStatus");
  
  var captureLinkBtn = document.createElement("input");
  captureLinkBtn.type = "button";
  captureLinkBtn.value = "Capture Link";

  captureLink.appendChild(captureLinkBtn);
  loginStatus.innerHTML = "Logged In";

  captureLink.addEventListener("click", captureLinkListener);
}

function captureLinkListener() {
  window.browser.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    console.log(activeTab);
    window.browser.tabs.sendMessage(activeTab.id, { "message": "captureLink" });
  })
}

