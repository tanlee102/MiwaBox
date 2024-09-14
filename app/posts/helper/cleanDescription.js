export function cleanDescription(description) {
  if(description) {
    return description
      .replace(/^(<br\s*\/?>)+|(<br\s*\/?>)+$/g, '')  // Remove leading and trailing <br> tags
      .trim();  // Trim extra spaces
  } else {
    return '';
  }
}

export function cleanTitle(str) {
  return str.replace(/&nbsp;/g, ' ');
}
