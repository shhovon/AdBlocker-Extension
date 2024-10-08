const hideYouTubeAds = () => {
    const adElements = document.querySelectorAll('.video-ads, .ytp-ad-module');
    adElements.forEach(ad => ad.style.display = 'none');
  };
  
  window.onload = hideYouTubeAds;

  const observer = new MutationObserver(hideYouTubeAds);
  observer.observe(document.body, { childList: true, subtree: true });
  