window.browser = chrome;

window.onload = function() {
  console.log("window openeddd.....")
  window.browser.runtime.sendMessage({ message: "setCookie" });
}


window.browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message)
  console.log("request.message....")
  if(request.message === "loggedin") {
    var loginStatus = document.getElementById("loginStatus");

    loginStatus.innerHTML = "Logged in"
  }

  return true;
})

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