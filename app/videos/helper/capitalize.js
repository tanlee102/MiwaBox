export function capitalizeWords(str) {
    var words = str.split('_');
    var capitalizedWords = words.map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    var result = capitalizedWords.join(' ');
    return result;
}

export function decapitalizeString(str) {
  var lowercaseString = str.toLowerCase();
  var decapitalizedString = lowercaseString.replace(/\s+/g, '_');
  return decapitalizedString;
}