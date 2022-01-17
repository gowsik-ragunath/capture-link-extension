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