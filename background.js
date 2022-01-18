// window.browser = (function() {
//   return window.browser || window.chrome;
// })();

window.browser = chrome;


console.log(window.browser)

const domain = "https://7de4-117-202-180-125.ngrok.io";
const app_session = "_trix_editor_embedder_session";
const user_consent = "_user_consent";

window.browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  if(request.message === "setCookie") {

    window.browser.cookies.get({ "url": domain, "name": app_session }, function(cookie) {
      
      console.log(cookie)
      console.log("cookie......")
      if(cookie !== undefined || cookie !== null) {
        window.browser.cookies.set({
          "url": domain,
          "name": app_session,
          "value": cookie.value,
          "expirationDate": ((new Date().getTime()/1000) + 3600)
        })

        console.log("&&&&&&");

        window.browser.runtime.sendMessage({ "message": "loggedin" });
      }


    })

  }

  return true;
})