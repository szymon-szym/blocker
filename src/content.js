// iframes are being added dynamically,
// so it does not make sense to replace them on document load

// in general we can't hijack all iframes, because it would block pages functionalities
// but on some pages there is no usefull functionalities, so we can use all iframes there

const fullBlockList = [
  'onet.pl',
  'wp.pl'
]

// document.querySelectorAll('div > a > div > div > div > div > img')
// to be moved to the helper module
const clearWP = () => {
  const selectorsToReplace = [
    '#app-content > div > div > div > div > div > a > div > div > img',
    '#app-content > div > div > div > div > div > a > div > div > div > img',
    '#app-content > div > div > div > div > div > a > div > div > div > div > img',
    '#app-content > div > div > div > div > div > a > div > div > div > div > div > img',
    '#glonews > div > div > div > div > div > div > a > div > div > div > div > div > img',
    '#glonews > div > div > div > div > div > div > a > div > div > div > div > img',
    '#glonews > div > div > div > div > div > div > a > div > div > div > img',
    '#glonews > div > div > div > div > div > div > a > div > div > img',
    // "div[id*='bbb'] > a > img"
  ]

  selectorsToReplace.forEach(sel => {

    let adImg = document.querySelectorAll(sel)
    // console.log(`selector: ${sel}`)
  
    adImg.forEach(x => {
      console.log(`replacing divs on wp`)
      const img = document.createElement("img");
        img.src = `https://placekitten.com/g/600/200`;
      x.parentElement.replaceWith(img)
    })
  })
  
}



// iframes flow
let isFullBlocked = false
fullBlockList.forEach(x => {
  if (window.location.toString().includes(x)) {
    isFullBlocked = true
  }
}) 

if(fullBlockList) {
  const allIframes = document.querySelectorAll("iframes");
  console.log('blocking all found iframes')
  allIframes.forEach(x => {
    const img = document.createElement("img");
    img.src = `https://placekitten.com/g/${x.width}/${x.height}`;
    x.replaceWith(img);

  })
} else {
  const googleAds = document.querySelectorAll("iframe[id*='google_ads']");
  console.log(`adds in iframes found ${googleAds.length}`);
  googleAds.forEach((x) => {
    console.log("replacing");
    const img = document.createElement("img");
    img.src = `https://placekitten.com/g/${x.width}/${x.height}`;
    x.replaceWith(img);
  });
  const otherAds = document.querySelectorAll("iframe[src*='ads']");
  console.log(`other adds found ${otherAds.length}`);
  otherAds.forEach((x) => {
    console.log("replacing");
    const img = document.createElement("img");
    img.src = `https://placekitten.com/g/${x.width}/${x.height}`;
    x.replaceWith(img);
  });
}

// divs flow
const googleAdsDiv = document.querySelectorAll("div[id*='google_ads']");
console.log(`adds in divs found ${googleAdsDiv.length}`);
googleAdsDiv.forEach((x) => {
  console.log("replacing");
  const img = document.createElement("img");
  img.src = `https://placekitten.com/g/${x.width}/${x.height}`;
  x.replaceWith(img);
})


// for observer
const iframesIdsToReplace = ["google_ads_"];
const iframesSrcToReplace = ["ads"];

const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (!mutation.addedNodes) return;
    if (window.location.toString().includes('wp.pl')) {
      clearWP();
    }
    for (let i = 0; i < mutation.addedNodes.length; i++) {
      // do things to your newly added nodes here
      const node = mutation.addedNodes[i];
      //   console.log(`added node ${node.nodeName}`)
      
      if (node.nodeName === "IFRAME") {
        // check full blocked option
        if (isFullBlocked) {
          console.log('blocking all iframes')
          const img = document.createElement("img");
          img.src = `https://placekitten.com/g/${node.width}/${node.height}`;
          node.replaceWith(img);
          return;
        }
        // regular flow
        iframesIdsToReplace.forEach((x) => {
            if (node.id.includes(x)) {
            console.log(`iframe to replace by id ${node.id}`);
            const img = document.createElement("img");
            img.src = `https://placekitten.com/g/${node.width}/${node.height}`;
            node.replaceWith(img);
            return;
            }
        });
        iframesSrcToReplace.forEach((x) => {
          if (node.src.includes(x)) {
          console.log(`iframe to replace by src ${node.src}`);
          const img = document.createElement("img");
          img.src = `https://placekitten.com/g/${node.width}/${node.height}`;
          node.replaceWith(img);
          return;
          }
      });
      }
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
