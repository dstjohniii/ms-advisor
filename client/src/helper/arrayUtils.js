// program to merge and remove duplicate value from an array
// Copied from https://www.programiz.com/javascript/examples/merge-remove-duplicate

export default function getUniqueAfterMerge(arr1, arr2) {
  // merge two arrays
  let arr = arr1.concat(arr2);
  let uniqueArr = [];

  // loop through array
  for (let i of arr) {
    if (uniqueArr.indexOf(i) === -1) {
      uniqueArr.push(i);
    }
  }
  return uniqueArr;
}
