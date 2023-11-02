// Define a KeyValuePair class to store key-value pairs with a pointer to the next element, useful for handling collisions.
class KeyValuePair {
  constructor(key, value) {
    this.key = key;       // The key part of the key-value pair.
    this.value = value;   // The value part of the key-value pair.
    this.next = null;     // A reference to the next KeyValuePair, initially null (used in linked list for collision resolution).
  }
}

// Define a HashTable class to implement a hash table with basic operations.
class HashTable {
  // The constructor sets default bucket size and initializes the hash table.
  constructor(numBuckets = 8) {
    this.count = 0;                       // Track the number of key-value pairs in the hash table.
    this.capacity = numBuckets;           // Set the initial number of buckets in the hash table.
    this.data = new Array(this.capacity).fill(null); // Initialize buckets as an array filled with null.
  }

  // The hash function takes a key and converts it to a numeric hash value.
  hash(key) {
    let hashValue = 0;                 // Initialize hash value to 0.

    // Sum the character codes of the key to create a hash value.
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue; // Return the resulting hash value.
  }

  // A helper method to get the index in the array after applying the hash function modulo the number of buckets.
  hashMod(key) {
    return this.hash(key) % this.capacity; // Use the modulo operation to ensure the hash index fits within the bucket array.
  }

  // Insert a key-value pair into the hash table.
  insert(key, value) {
    // Resize the hash table if the load factor exceeds 0.7.
    if (this.count / this.capacity > 0.7) this.resize();

    // Find the index for the given key.
    const index = this.hashMod(key);

    // Start at the beginning of the linked list at the calculated bucket index.
    let currentPair = this.data[index];

    // Traverse the linked list to find if the key exists.
    while (currentPair && currentPair.key !== key) {
      currentPair = currentPair.next;
    }

    // If the key is found, update the value.
    if (currentPair) {
      currentPair.value = value;
    } else {
      // If the key is not found, create a new KeyValuePair and insert it.
      const newPair = new KeyValuePair(key, value);
      newPair.next = this.data[index]; // Link the new pair to the existing list.
      this.data[index] = newPair; // Insert the new pair at the beginning of the list.
      this.count++; // Increment the count of key-value pairs.
    }
  }

  // Read the value associated with a given key.
  read(key) {
    // Find the index for the given key.
    const index = this.hashMod(key);

    // Start at the beginning of the linked list at the calculated bucket index.
    let currentPair = this.data[index];

    // Traverse the linked list to find the key.
    while (currentPair) {
      if (currentPair.key == key) {
        return currentPair.value; // If found, return the value.
      }
      currentPair = currentPair.next;
    }

    // If the key is not found, return undefined.
    return undefined;
  }

  // Resize the hash table when the load factor is too high.
  resize() {
    const oldData = this.data; // Keep a reference to the old bucket array.
    this.capacity = 2 * this.capacity; // Double the capacity.
    this.data = new Array(this.capacity).fill(null); // Create a new bucket array with updated capacity.
    this.count = 0; // Reset the count.

    // Reinsert all key-value pairs into the new bucket array.
    let currentPair = null;
    for (let i = 0; i < oldData.length; i++) {
      currentPair = oldData[i];
      while (currentPair) {
        this.insert(currentPair.key, currentPair.value);
        currentPair = currentPair.next;
      }
    }
  }

  // Delete a key-value pair from the hash table.
  delete(key) {
    const index = this.hashMod(key); // Find the index for the given key.

    // Start at the beginning of the linked list at the calculated bucket index.
    let currentPair = this.data[index];
    let lastPair = null;

    // Traverse the linked list to find the key.
    while (currentPair && currentPair.key !== key) {
      lastPair = currentPair;
      currentPair = lastPair.next;
    }

    // If the key is not found, return a message.
    if (!currentPair) {
      return "Key not found";
    } else {
      // If the key is found, remove the key-value pair from the linked list.
      if (!lastPair) {
        this.data[index] = currentPair.next; // If it's the first element, link the bucket directly to the next KeyValuePair.
      } else {
        lastPair.next = currentPair.next; // Otherwise, bypass the current KeyValuePair in the linked list.
      }
      this.count--; // Decrement the count of key-value pairs.
    }
  }
}

// Export the HashTable class as a module to be used in other files.
module.exports = HashTable;
