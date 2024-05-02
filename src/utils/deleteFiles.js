const fs = require('fs');
const path = require('path');

function deleteFiles(files, callback) {
  let remainingFiles = files.length;

  if (remainingFiles === 0) {
    callback(null);
    return;
  }

  files.forEach((filepath) => {
    fs.unlink(filepath, (err) => {
      remainingFiles--;

      if (err) {
        console.error(`Error deleting file ${filepath}:`, err);
      } else {
        console.log(`File ${filepath} deleted successfully.`);
      }

      if (remainingFiles === 0) {
        callback(null);
      }
    });
  });
}


exports.deleteFiles = deleteFiles;
