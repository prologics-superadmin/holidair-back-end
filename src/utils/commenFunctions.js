function isValidObject(obj) {
  // Check if the argument is an object
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  // Check if all elements of the object are defined
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key) || obj[key] === undefined) {
      return false;
    }
  }
  
  return true;
}


exports.isValidObject = isValidObject;
