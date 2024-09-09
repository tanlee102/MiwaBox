// Helper function to check if the element is within an H3 or has H3 as an ancestor
export const isInsideH3 = (element) => {
    while (element) {
      if (element.tagName && element.tagName.toLowerCase() === 'h3') {
        return true;
      }
      element = element.parentElement;
    }
    return false;
};