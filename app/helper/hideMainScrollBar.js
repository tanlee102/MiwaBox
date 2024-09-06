export const hideMainScrollBar = (display) => {
  if (/Mobi/.test(navigator.userAgent)) {
      // Do nothing if on mobile
  } else {
      if(display) {
          document.body.classList.add('hide-scrollbar');  // Add the class to hide the scrollbar
      } else {
          document.body.classList.remove('hide-scrollbar');  // Remove the class to show the scrollbar
      }
  }
};
