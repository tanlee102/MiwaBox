export const sanitizeAndUrlify = (text) => {
    // Remove JavaScript code
    var jsRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    text = text.replace(jsRegex, '');
  
    // Replace URLs with anchor tags
    var urlRegex = /(https?:\/\/([^\s]+))/g;
    return text.replace(urlRegex, function(url, domain) {
      var linkLabel = domain.replace(/^https?:\/\//, ''); // Remove "http://" or "https://"
      return '<a href="' + url + '">' + linkLabel + '</a>';
    });
  }