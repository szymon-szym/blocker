// const bkg = chrome.extension.getBackgroundPage();

// // check if there is a state in local store
// // update checkbox
// chrome.storage.local.get(['blocker'], function(result){
//     if (result.blocker) {
//         bkg.console.log(`init switch with ${result.blocker} - checked`)
//         document.querySelector('#checkbox').checked = true    
//     } else {
//         bkg.console.log(`init switch with ${result.blocker} - unchecked`)
//         document.querySelector('#checkbox').checked = false
//     }
// })

// document.addEventListener('DOMContentLoaded', function () {
//     // add event listener to store onChange
//     document.querySelector('#checkbox').addEventListener('change', function(ev){
//         chrome.runtime.sendMessage({checkbox: `${this.checked}`})
        
//     })
// });