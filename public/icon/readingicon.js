const fs = require('fs');
const path = require('path');

const folderPath = './cute';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  const item_list = files.map((fileName) => {
    return path.join('cute', `${fileName}`);
  });

  console.log(item_list);
});