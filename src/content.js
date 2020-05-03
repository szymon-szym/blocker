// to be moved to separated module

console.log(`[content] start content script`);

const fullBlockList = ["onet.pl", "wp.pl", "o2.pl"];

// ***** to be moved to the helper module
const clearWP = () => {
  const selectorsToReplace = [
    "#app-content > div > div > div > div > div > a > div > div > img",
    "#app-content > div > div > div > div > div > a > div > div > div > img",
    "#app-content > div > div > div > div > div > a > div > div > div > div > img",
    "#app-content > div > div > div > div > div > a > div > div > div > div > div > img",
    "#app-content > div > div > div > div > div > div > a > div > div > img",
    "#glonews > div > div > div > div > div > div > a > div > div > div > div > div > img",
    "#glonews > div > div > div > div > div > div > a > div > div > div > div > img",
    "#glonews > div > div > div > div > div > div > a > div > div > div > img",
    "#glonews > div > div > div > div > div > div > a > div > div > img",
  ];

  selectorsToReplace.forEach((sel) => {
    let adImg = document.querySelectorAll(sel);
    // console.log(`selector: ${sel}`)

    adImg.forEach((x) => {
      console.log(`replacing divs on wp`);
      const img = document.createElement("img");
      img.src = `https://placekitten.com/g/600/200`;
      x.parentElement.replaceWith(img);
    });
  });
};

// *****
let initialReplacementsFlags = true;

const initialReplacements = () => {
  // iframes are being added dynamically,
  // so it does not make sense to replace them on document load

  // in general we can't hijack all iframes, because it would block pages functionalities
  // but on some pages there are no usefull functionalities, so we can use all iframes there

  // iframes flow
  let isFullBlocked = false;
  fullBlockList.forEach((x) => {
    if (window.location.toString().includes(x)) {
      console.log(`full block mode`);
      isFullBlocked = true;
    }
  });

  if (isFullBlocked) {
    const allIframes = document.querySelectorAll("iframe");
    console.log(`blocking all found iframes at start ${allIframes.length}`);
    allIframes.forEach((x) => {
      const img = document.createElement("img");
      img.src = `https://placekitten.com/g/${x.width || "500"}/${x.height ||
        "300"}`;
      x.replaceWith(img);
    });
  } else {
    const googleAds = document.querySelectorAll("iframe[id*='google_ads']");
    console.log(`[content]adds in iframes found ${googleAds.length}`);
    googleAds.forEach((x) => {
      console.log("replacing");
      const img = document.createElement("img");
      img.src = `https://placekitten.com/g/${x.width || "500"}/${x.height ||
        "300"}`;
      x.replaceWith(img);
    });
    const otherAds = document.querySelectorAll("iframe[src*='ads']");
    console.log(`other adds found ${otherAds.length}`);
    otherAds.forEach((x) => {
      console.log("replacing");
      const img = document.createElement("img");
      img.src = `https://placekitten.com/g/${x.width || "500"}/${x.height ||
        "300"}`;
      x.replaceWith(img);
    });
    const otherAdsCase = document.querySelectorAll("iframe[src*='Ads']");
    console.log(`other adds found ${otherAdsCase.length}`);
    otherAdsCase.forEach((x) => {
      console.log("replacing");
      const img = document.createElement("img");
      img.src = `https://placekitten.com/g/${x.width || "500"}/${x.height ||
        "300"}`;
      x.replaceWith(img);
    });
  }

  // divs flow
  // todo - merge all selectors
  const googleAdsDiv = document.querySelectorAll("div[id*='google_ads']");
  console.log(`adds in divs found ${googleAdsDiv.length}`);
  googleAdsDiv.forEach((x) => {
    console.log("replacing");
    const img = document.createElement("img");
    img.src = `https://placekitten.com/g/${x.width || "500"}/${x.height ||
      "300"}`;
    x.replaceWith(img);
  });
  const tvnAdsDiv = document.querySelectorAll("div[class*='tvn-adv']");
  console.log(`tvn adds in divs found ${tvnAdsDiv.length}`);
  tvnAdsDiv.forEach((x) => {
    console.log("replacing");
    const img = document.createElement("img");
    img.src = `https://placekitten.com/g/${x.width || "500"}/${x.height ||
      "300"}`;
    x.replaceWith(img);
  });
};

/// ***** OBSERVER *****
// for observer
const iframesIdsToReplace = ["google_ads_"];
const iframesSrcToReplace = ["ads", "Ads", "ad", "adv"];

let isFullBlocked = false;
fullBlockList.forEach((x) => {
  if (window.location.toString().includes(x)) {
    console.log(`full block mode`);
    isFullBlocked = true;
  }
});

const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes) {
      if (window.location.toString().includes("wp.pl")) {
        clearWP();
      }
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const node = mutation.addedNodes[i];

        if (node.nodeName === "IFRAME") {
          // check full blocked option
          if (isFullBlocked) {
            console.log("blocking all iframes");
            if (node.height == 0) {
              console.log(`removing 0 px height iframes`);
              node.remove();
            }
            const img = document.createElement("img");
            img.src = `https://placekitten.com/g/${node.width ||
              "500"}/${node.height || "300"}`;
            node.replaceWith(img);
            return;
          }
          // regular flow
          iframesIdsToReplace.forEach((x) => {
            if (node.id.includes(x)) {
              console.log(`iframe to replace by id ${node.id}`);
              const img = document.createElement("img");
              img.src = `https://placekitten.com/g/${node.width ||
                "500"}/${node.height || "300"}`;
              node.replaceWith(img);
              return;
            }
          });
          iframesSrcToReplace.forEach((x) => {
            if (node.src.includes(x)) {
              console.log(`iframe to replace by src ${node.src}`);
              const img = document.createElement("img");
              img.src = `https://placekitten.com/g/${node.width ||
                "500"}/${node.height || "300"}`;
              node.replaceWith(img);
              return;
            }
          });

          // refresh tvn blocker
          const tvnAdsDiv = document.querySelectorAll("div[class*='tvn-adv']");
          console.log(`tvn adds in divs found ${tvnAdsDiv.length}`);
          tvnAdsDiv.forEach((x) => {
            console.log("replacing");
            const img = document.createElement("img");
            img.src = `https://placekitten.com/g/${x.width ||
              "500"}/${x.height || "300"}`;
            x.replaceWith(img);
          });
        }
      }
    } else {
      console.log(`mutation: ${mutation.type}`);
    }
  });
});

// naive state implementation
// turn on blocking
// turn off blocking

const startReplacing = () => {
  // turn on observer

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
  // turn on initial load replacements
  initialReplacementsFlags = true;
};

const stopReplacing = () => {
  // turn off observer
  observer.disconnect();
  // turn off initial load replacements
  initialReplacementsFlags = false;
};

// handle messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.message) {
    case "stop":
      console.log(`[content] stop`);
      stopReplacing();
      break;
    case "good":
      console.log(`[content] good`);
      startReplacing();
      initialReplacements();
      break;
    case "money":
      console.log(`[content] money`);
      startReplacing();
      initialReplacements();
      break;
    default:
      console.log(`[content] not button msg`);
  }
});

// initialize: read state from store and then decide if block
chrome.storage.local.get(["catblocker"], function(result) {
  let currState = result.catblocker === undefined ? true : result.catblocker;
  console.log(`[content] at init current state is ${currState}`);
  if (currState) {
    console.log(`[content] blocking adds on start`);
    initialReplacements();
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  } else {
    console.log(`[content] blocking adds on start STOPPED`);
  }
});
