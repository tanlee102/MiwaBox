export function cleanDescription(description) {
    return description
      .replace(/^(<br\s*\/?>)+|(<br\s*\/?>)+$/g, '')  // Remove leading and trailing <br> tags
      .trim();  // Trim extra spaces
}