// background may be used to block all requests. For now plugin uses only content scripts

// let currState;

// const blockURLcb = function(details) {
// //   console.log("blocking:", details.url);
//   if (!white_list.includes(details.url)) {
//     console.log(`REDIRECT current url ${details.url} is not on the whitelist`);
//     // return { redirectUrl: "https://placekitten.com/200/300" };
//     return { cancel: true };
//   } else {
//     console.log(`ALLOW current url ${details.url} is on the whitelist do not block`);
//     return { cancel: false}
//   }
// };

// // todo 
// chrome.storage.local.get(["blocker"], function(result) {
//   currState = result.blocker === undefined ? true : result.blocker;
//   console.log(`at init current state is ${currState}`);
//   if (currState) {
//     console.log(`init adding blocking listener`);
//     currState = true;
//     chrome.storage.local.set({ blocker: true }, () =>
//       console.log("bolcker state set in starge to true")
//     );
//     chrome.webRequest.onBeforeRequest.addListener(
//       blockURLcb,
//       { urls: blocked_domains },
//       ["blocking"]
//     );
//   } else {
//     console.log(`init removing blocking listener`);
//     currState = false;
//     chrome.storage.local.set({ blocker: false }, () =>
//       console.log("bolcker state set in starage to false")
//     );
//     chrome.webRequest.onBeforeRequest.removeListener(blockURLcb);
//   }
// });

// //  todo -> sync with local storage instead of listening for messages
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if (message.checkbox === "true") {
//     console.log(`adding blocking listener`);
//     chrome.storage.local.set({ blocker: true }, () =>
//       console.log("message - bolcker state set to true")
//     );
//     chrome.webRequest.onBeforeRequest.addListener(
//       blockURLcb,
//       { urls: blocked_domains },
//       ["blocking"]
//     );
//   } else if (message.checkbox === "false") {
//     console.log(`removing blocking listener`);
//     console.log(`${message.checkbox} - false`);
//     chrome.storage.local.set({ blocker: false }, () =>
//       console.log("message bolcker state false")
//     );

//     chrome.webRequest.onBeforeRequest.removeListener(blockURLcb);
//   }
// });
