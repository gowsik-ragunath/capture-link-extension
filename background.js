window.browser = (function() {
  return window.browser || window.chrome;
})();

const domain = "https://d291-117-203-66-57.ngrok.io";
const app_session = "_trix_editor_embedder_session";

window.browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  console.log(request.message)
  if(request.message === "setCookie") {

    window.browser.cookies.get({ "url": domain, "name": app_session }, function(cookie) {
      if(cookie !== undefined && cookie !== null && cookie.value !== "" && cookie.value !== null && cookie.value !== "false") {
        window.browser.cookies.set({
          "url": domain,
          "name": app_session,
          "value": cookie.value,
          "expirationDate": ((new Date().getTime()/1000) + 3600)
        })

        console.log(cookie.value);

        window.browser.runtime.sendMessage({ "message": "login" });
      }


    })

  }

  return true;
})