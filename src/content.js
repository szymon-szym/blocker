// iframes are being added dynamically,
// so it does not make sense to replace them on document load

// const googleAds = document.querySelectorAll("iframe[id*='google_ads']");
// console.log(`adds found ${googleAds.length}`);
// googleAds.forEach((x) => {
//   console.log("replacing");
//   x.replaceWith("kot");
// });

const iframesToReplace = ["google_ads_"];

const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (!mutation.addedNodes) return;

    for (let i = 0; i < mutation.addedNodes.length; i++) {
      // do things to your newly added nodes here
      const node = mutation.addedNodes[i];
      //   console.log(`added node ${node.nodeName}`)
      if (node.nodeName === "IFRAME") {
        iframesToReplace.forEach((x) => {
          if (node.id.includes(x)) {
            console.log(`iframe to replace ${node.id}`);
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
