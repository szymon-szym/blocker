import $ from "jquery";
import popper from "popper.js";
import bootstrap from "bootstrap";


//update state badge
{/* <span class="badge badge-secondary">Blocking</span> */}
const statusEl = document.querySelector('#status')
const blockingBadge = document.createElement("span")
blockingBadge.classList.add("badge")
blockingBadge.classList.add("badge-secondary")
blockingBadge.innerHTML = " blocking"

const nonBlockingBadge = document.createElement("span")
nonBlockingBadge.classList.add("badge")
nonBlockingBadge.classList.add("badge-danger")
nonBlockingBadge.innerHTML = " non blocking"

const updateStatusBlocking = () => {
    statusEl.appendChild(blockingBadge)
    statusEl.removeChild(nonBlockingBadge)
}
const updateStatusNonBlocking = () => {
    statusEl.appendChild(nonBlockingBadge)
    statusEl.removeChild(blockingBadge)
}

let currState 
// store state for curr page in local store
chrome.storage.local.get(["catblocker"], function(result) {
    currState = result.catblocker === undefined ? true : result.catblocker;
    console.log(`[popup] at init current state is ${currState}`);
    currState ? updateStatusBlocking() : updateStatusNonBlocking()
  });

const doNotBlockBtn = document.querySelector('#doNotBlockBtn')
doNotBlockBtn.addEventListener('click', (ev) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const currTab = tabs[0].id
        chrome.tabs.sendMessage(currTab, {message: "stop"})
        chrome.storage.local.set({ catblocker: false }, () => {
            console.log("bolcker state set in starge to false")
        });
        updateStatusNonBlocking()
        chrome.runtime.sendMessage({message: "stop"}, response => {
            console.log(`[popup] response: ${response}`)
        })

    })
})

const blockGoodBtn = document.querySelector('#blockGoodBtn')
blockGoodBtn.addEventListener('click', (ev) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const currTab = tabs[0].id
        chrome.tabs.sendMessage(currTab, {message: "good"})
        chrome.storage.local.set({ catblocker: true }, () => {
            console.log("blocker state set in starge to true")
        });
        updateStatusBlocking()
        chrome.runtime.sendMessage({message: "good"}, response => {
            console.log(`[popup] response: ${response}`)
        })
    })
})

const blockMoneyBtn = document.querySelector('#blockMoneyBtn')
blockMoneyBtn.addEventListener('click', (ev) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const currTab = tabs[0].id
        chrome.tabs.sendMessage(currTab, {message: "money"})
        chrome.storage.local.set({ catblocker: true }, () => {
            console.log("blocker state set in starge to true")
        });
        updateStatusBlocking()
        chrome.runtime.sendMessage({message: "money"}, response => {
            console.log(`[popup] response: ${response}`)
        })
    })
})
