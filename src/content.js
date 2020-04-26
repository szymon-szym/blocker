// iframes are being added dynamically,
// so it does not make sense to replace them on document load

// in general we can't hijack all iframes, because it would block pages functionalities
// but on some pages there are no usefull functionalities, so we can use all iframes there

const fullBlockList = ["onet.pl", "wp.pl", "o2.pl"];

// to be moved to the helper module
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
    // '#glonews > div > div > div > div > div > div > a'
    // "div[id*='bbb'] > a > img"
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

// iframes flow
let isFullBlocked = false;
fullBlockList.forEach((x) => {
  if (window.location.toString().includes(x)) {
    console.log(`full block mode`)
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
  console.log(`adds in iframes found ${googleAds.length}`);
  googleAds.forEach((x) => {
    console.log("replacing");
    const img = document.createElement("img");
    img.src = `https://placekitten.com/g/${x.width || "500"}/${x.height || "300"}`;
    x.replaceWith(img);
  });
  const otherAds = document.querySelectorAll("iframe[src*='ads']");
  console.log(`other adds found ${otherAds.length}`);
  otherAds.forEach((x) => {
    console.log("replacing");
    const img = document.createElement("img");
    img.src = `https://placekitten.com/g/${x.width || "500"}/${x.height || "300"}`;
    x.replaceWith(img);
  });
}

// divs flow
const googleAdsDiv = document.querySelectorAll("div[id*='google_ads']");
console.log(`adds in divs found ${googleAdsDiv.length}`);
googleAdsDiv.forEach((x) => {
  console.log("replacing");
  const img = document.createElement("img");
  img.src = `https://placekitten.com/g/${x.width || "500"}/${x.height || "300"}`;
  x.replaceWith(img);
});

// for observer
const iframesIdsToReplace = ["google_ads_"];
const iframesSrcToReplace = ["ads"];

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
              console.log(`removing 0 px height iframes`)
              node.remove()
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
              img.src = `https://placekitten.com/g/${node.width || "500"}/${
                node.height || "300"
              }`;
              node.replaceWith(img);
              return;
            }
          });
          iframesSrcToReplace.forEach((x) => {
            if (node.src.includes(x)) {
              console.log(`iframe to replace by src ${node.src}`);
              const img = document.createElement("img");
              img.src = `https://placekitten.com/g/${node.width || "500"}/${
                node.height || "300"
              }`;
              node.replaceWith(img);
              return;
            }
          });
        }
      }
    } else {
      console.log(`mutation: ${mutation.type}`);
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
});
// #google_ads_iframe_\/52555387\/rmadryt\.pl_HP_top_970x250_ybcm_0
