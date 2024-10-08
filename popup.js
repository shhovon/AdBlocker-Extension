const toggleButton = document.getElementById('toggle-button');

chrome.storage.local.get(['adBlockerEnabled'], (result) => {
    const isEnabled = result.adBlockerEnabled ?? true;
    toggleButton.innerText = isEnabled ? 'Disable AdBlocker' : 'Enable AdBlocker';
});

const updateAdBlockingRules = (enabled) => {
    const adUrls = [
        "*://*.doubleclick.net/*",
        "*://*.googleadservices.com/*",
        "*://*.ads.google.com/*",
        "*://*.adservice.google.com/*",
        "*://*.youtube.com/*ad/*",
        "*://*.ad.doubleclick.net/*",
        "*://*.ad.yieldmanager.com/*",
        "*://*.pubmatic.com/*",
        "*://*.openx.net/*",
        "*://*.rubiconproject.com/*",
        "*://*.exelator.com/*",
        "*://*.adsrvr.org/*",
        "*://*.adzerk.net/*",
        "*://*.adform.net/*",
        "*://*.criteo.com/*",
        "*://*.ads.yahoo.com/*",
        "*://*.sonobi.com/*",
        "*://*.adblade.com/*",
        "*://*.sovrn.com/*",
        "*://*.quantserve.com/*",
        "*://*.tribalfusion.com/*",
        "*://*.mookie1.com/*",
        "*://*.fastclick.net/*",
        "*://*.bidswitch.net/*",
        "*://*.genius.com/*",
        "*://*.gaia.com/*",
        "*://*.adstir.com/*",
        "*://*.ads.tremorvideo.com/*",
        "*://*.audience.network/*",
        "*://*.nexage.com/*",
        "*://*.adcolony.com/*",
        "*://*.chartbeat.com/*",
        "*://*.appnexus.com/*",
        "*://*.serving-sys.com/*",
        "*://*.spotx.tv/*",
        "*://*.youku.com/*",
        "*://*.jivox.com/*",
        "*://*.audience.co/*",
        "*://*.zypmedia.com/*",
        "*://*.mediacom.com/*",
        "*://*.glance.com/*",
        "*://*.instreammedia.com/*",
        "*://*.adkernel.com/*",
        "*://*.matomy.com/*",
        "*://*.inmobi.com/*",
        "*://*.indexexchange.com/*",
        "*://*.spotxchange.com/*",
        "*://*.adsmogo.com/*",
        "*://*.plista.com/*",
        "*://*.omnicoreagency.com/*",
        "*://*.zeta.com/*",
        "*://*.gumgum.com/*"
    ];

    const rules = adUrls.map((url, index) => ({
        id: index + 1, 
        priority: 1,
        action: { 
            'type': 'block' 
        },
        condition: {
            urlFilter: url,
            resourceTypes: ["script", "image", "xmlhttprequest"]
        }
    }));

    if (enabled) {
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: rules,
            removeRuleIds: rules.map(rule => rule.id) 
        });
    } else {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: rules.map(rule => rule.id) 
        });
    }
};

toggleButton.addEventListener('click', () => {
    chrome.storage.local.get(['adBlockerEnabled'], (result) => {
        const isEnabled = result.adBlockerEnabled ?? true; 
        const newEnabledState = !isEnabled;

        chrome.storage.local.set({ adBlockerEnabled: newEnabledState }, () => {
            toggleButton.innerText = newEnabledState ? 'Disable AdBlocker' : 'Enable AdBlocker';

            updateAdBlockingRules(newEnabledState);
        });
    });
});
