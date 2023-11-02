// Checks if two strings are anagrams of each other
function anagrams(str1, str2) {
  // If the strings have different lengths, they cannot be anagrams
  if (str1.length !== str2.length) return false;

  // Object to keep track of the count of each letter in str1
  const counts = {};

  // Populate counts object with the frequency of each letter in str1
  for (let i = 0; i < str1.length; i++) {
    let letter = str1[i];
    counts[letter] = (counts[letter] || 0) + 1;
  }

  // Decrease the count of each letter in str2 from the counts object
  for (let i = 0; i < str2.length; i++) {
    let letter = str2[i];
    if (!counts[letter]) { // If a letter in str2 is not in str1 or count is zero, they are not anagrams
      return false;
    }
    counts[letter]--;
  }

  // If all counts are zero, str1 and str2 are anagrams
  return true;
}

// Finds common elements in two arrays
function commonElements(arr1, arr2) {
  // Create a Set from the first array
  const set1 = new Set(arr1);

  // Filter the second array, keeping only the elements that are in set1
  return arr2.filter(x => set1.has(x));
}

// Finds the first duplicate element in an array
function duplicate(arr) {
  // Create a Set to track seen elements
  const set = new Set();

  // Iterate over the array
  for (let i = 0; i < arr.length; i++) {
    // If the set already contains the element, return it as the duplicate
    if (set.has(arr[i])) return arr[i];
    // Otherwise, add the element to the set
    set.add(arr[i]);
  }

  // If no duplicates are found, undefined is returned implicitly
}

// Determines if there are two numbers in an array that add up to a target number
function twoSum(nums, target) {
  // Create a Set to store numbers
  const numSet = new Set();

  // Iterate through the array of numbers
  for (let i = 0; i < nums.length; i++) {
    // If the complement of the current number (to reach the target) is in the set, return true
    if (numSet.has(target - nums[i])) return true;
    // Otherwise, add the current number to the set
    numSet.add(nums[i]);
  }

  // If no two numbers add up to the target, return false
  return false;
}

// Determines if a string pattern matches a sequence of words
function wordPattern(pattern, strings) {
  // Object to match letters to words
  const matches = {};
  // Set to keep track of already seen words
  const wordSet = new Set();

  // Iterate through the pattern
  for (let i = 0; i < pattern.length; i++) {
    let letter = pattern[i];
    // If the letter is already matched with a word
    if (matches[letter]) {
      // If the current word does not match the previously matched word, return false
      if (matches[letter] !== strings[i]) return false;
    } else {
      let word = strings[i];
      // If the word is already matched with another letter, return false
      if (wordSet.has(word)) return false;
      // Otherwise, add the word to the set and match it with the letter
      wordSet.add(word);
      matches[letter] = word;
    }
  }

  // If all pattern letters can be matched uniquely to words, return true
  return true;
}

// Exporting the functions as a module
module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
