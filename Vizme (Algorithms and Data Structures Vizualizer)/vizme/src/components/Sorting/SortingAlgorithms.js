// The main thing to learn from this section is that we are not returning any arrays,
// but rather an array of animations of varying types for each algorithm :)
// The code for each sorting algorithm is readily available online, the tricky part
// lies in placing the animations at the proper point in each algorithm to properly 
// visualize it. 

//   Bubble Sort
export function getBubbleSortAnimations(array) {
    const animations = [];
    bubbleSortHelper(array, animations);
    return animations;
  }
function bubbleSortHelper(array, animations) {
    let n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Animate the values we are comparing to change their color a first time. 
            animations.push({"Color Change": [j, j + 1]});
            // Animate the values we are comparing to revert their color. 
            animations.push({"Color Revert": [j, j + 1]});
            // Swap larger value to front when comparing.
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                // Animate our swawp for array values at j and j + 1.
                animations.push({"Swap": [j, j + 1]});
            }
        }
        animations.push({"Final Position": n - i - 1});
    }
  } 

//   Selection Sort
export function getSelectionSortAnimations(array) {
    const animations = [];
    selectionSortHelper(array, animations);
    return animations; 
  }
function selectionSortHelper(array, animations) {
  let n = array.length;
  for (let i = 0; i < n; i++) {
    let min = i; 
    // Turn the initial minimum color. 
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[min]) {
          min = j; 
      }
      animations.push({"Color Change": [i, j]});
      animations.push({"Color Revert": [i, j]});
    }
    if (i != min) {
      // Swap
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
      animations.push({"Swap": [i, min]});
    }
    // Make our item green if we know it's in the right spot.
    animations.push({"Final Position": i});
  }
  }

//   Insertion Sort
export function getInsertionSortAnimations(array) {
    const animations = [];
    insertionSortHelper(array, animations);
    return animations; 
  }
function insertionSortHelper(array, animations){
  let n = array.length; 
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    animations.push({"Color Change": [i, j]});
    animations.push({"Color Revert": [i, j]});
    // Insert our current element into the 
    // proper position in the sorted 
    // subarray
    while (j >= 0 && array[j] > key) {
        animations.push({"Color Change": [i, j]});
        animations.push({"Color Revert": [i, j]});
        animations.push({"Overwrite": [j + 1, array[j]]});
        array[j + 1] = array[j];
        j--;
    }
    array[j + 1] = key;
    animations.push({"Overwrite": [j + 1, key]});
  }
  }

// Quick Sort
export function getQuickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
  }

function quickSortHelper(
  array,
  startIdx,
  endIdx,
  animations
) {
  if (startIdx >= endIdx) return;
  // Partition array, putting elements lower than 
  // pivot to it's left, elements greater than pivot
  // to it's right, and repeat recursively. 
  const pivotIdx = partition(array, startIdx, endIdx, animations);
  quickSortHelper(array, startIdx, pivotIdx - 1, animations);
  quickSortHelper(array, pivotIdx + 1, endIdx, animations);
  }

function partition(array, startIdx, endIdx, animations) {
  const pivotValue = array[endIdx];
  let pivotIdx = startIdx;

  for (let i = startIdx; i < endIdx; i++) {
    // Push animations for color change
    animations.push({"Color Change": [i, pivotIdx] });
    animations.push({"Color Revert": [i, pivotIdx] });

    if (array[i] < pivotValue) {
      // Swap array[i] and array[pivotIdx]
      animations.push({"Color Change": [i, pivotIdx] });
      animations.push({"Color Revert": [i, pivotIdx] });
      animations.push({ "Swap": [i, pivotIdx] });
      [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
      pivotIdx++;
    }
  }

  // Swap pivotValue with array[pivotIdx]
  animations.push({"Swap": [endIdx, pivotIdx] });
  [array[endIdx], array[pivotIdx]] = [array[pivotIdx], array[endIdx]];

  // Revert the color change animation
  animations.push({"Color Revert": [endIdx, pivotIdx] });
  animations.push({"Final Position": pivotIdx});
  return pivotIdx;
  }

// Credit to @AlgoExpert for this wonderful implementation of Merge Sort :)
//   Merge Sort
export function getMergeSortAnimations(array) {
    const animations = [];
    const helperArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, helperArray, animations);
    return animations;
  }
  
function mergeSortHelper(
    array,
    startIdx,
    endIdx,
    helperArray,
    animations,
  ) {
    // Recursively Divide our array until we have subarrays of size 1 (startIdx == endIdx)
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(helperArray, startIdx, middleIdx, array, animations);
    mergeSortHelper(helperArray, middleIdx + 1, endIdx, array, animations);
    // Merge our recursively formed arrays, comparing 2 values at a time as we do so. 
    merge(array, startIdx, middleIdx, endIdx, helperArray, animations);
  }
  
function merge(
    array,
    startIdx,
    middleIdx,
    endIdx,
    helperArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push({"Color Change": [i, j]});
      animations.push({"Color Revert": [i, j]});
      if (helperArray[i] <= helperArray[j]) {
        animations.push({"Overwrite": [k, helperArray[i]]});
        array[k++] = helperArray[i++];
      } else {
        animations.push({"Overwrite": [k, helperArray[j]]});
        array[k++] = helperArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push({"Color Change": [i, i]});
      animations.push({"Color Revert": [i, i]});
      animations.push({"Overwrite": [k, helperArray[i]]});
      array[k++] = helperArray[i++];
    }
    while (j <= endIdx) {
      animations.push({"Color Change": [j, j]});
      animations.push({"Color Revert": [j, j]});
      animations.push({"Overwrite": [k, helperArray[j]]});
      array[k++] = helperArray[j++];
    }
  }

//   Heap Sort
export function getHeapSortAnimations(array) {
    const animations = [];
    heapSortHelper(array, animations); 
    return animations; 
  }
function heapSortHelper(array, animations) {
    // Construct a heap from our array
    let n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }        

    // Extract each element from heap
    // and put the element in it's final position (i)
    // at the end of the array. 
    // re-heapify our new array. 
    for (let i = n - 1; i >= 0; i--) {
        animations.push({"Color Change": [i, 0]});
        animations.push({"Color Revert": [i, 0]});
        var temp = array[0];
        array[0] = array[i];
        array[i] = temp; 
        animations.push({"Swap": [0, i]});
        animations.push({"Final Position": i});
        animations.push({})
        heapify(array, i, 0, animations);
    }
  }
function heapify(arr, N, i, animations)
{
    // Initialize largest as root
    var largest = i;
    var left = 2 * i + 1; // left = 2*i + 1
    var right = 2 * i + 2; // right = 2*i + 2

    // Set largest to the largest of child nodes
    // (left and right)
    if (left < N && arr[left] > arr[largest])
        largest = left;
    if (right < N && arr[right] > arr[largest])
        largest = right;

    // If largest is not root
    // Swap largest and root. 
    if (largest != i) {
        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        animations.push({"Swap": [largest, i]});
        // Recursively heapify the affected sub-tree
        heapify(arr, N, largest, animations);
    }
  }

//   Tim Sort
export function getTimSortAnimations(array) {
    const animations = [];
    timSortHelper(array, animations);
    return animations;
  }
// Merge function merges the sorted runs
function timSortHelper(array, animations)
{ 

  let n = array.length;
  let minRun = 15; // length of subarrays to be sorted with insertion sort. 

    // Sort subarrays of size 'run'. 
    for(let i = 0; i < n; i += minRun)
    {
        tim_insertionSort(array, i, Math.min((i + minRun - 1), (n - 1)), animations);
    }

    for(let size = minRun; size < n; size = 2 * size)
    {
        
        for(let left = 0; left < n;
                          left += 2 * size)
        {

            let mid = left + size - 1;
            let right = Math.min((left + 2 * size - 1),
                                    (n - 1));
            if(mid < right)
                merge(array, left, mid, right, array.slice(), animations);
        }
    }
  } 
// special insertion sort for a subarray of varying indices.
function tim_insertionSort(array,left,right, animations)
{
    for(let i = left + 1; i <= right; i++)
    {
        let temp = array[i];
        let j = i - 1;
        animations.push({"Color Change": [i, j]});
        animations.push({"Color Revert": [i, j]});
        while (j >= left && array[j] > temp)
        {
          animations.push({"Color Change": [i, j]});
          animations.push({"Color Revert": [i, j]});
          animations.push({"Overwrite": [j + 1, array[j]]});
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = temp;
    }
  }

//    Radix Sort
export function getRadixSortAnimations(array) {
  const animations = [];
  radixSortHelper(array, animations);
  return animations;
  }
// Iterate through each digit position (from least significant to most significant)
// of the largest number in the array and sort the numbers based on 
function radixSortHelper(array, animations) {
  // Determine the maximum number of digits in the largest number in the array.
  const maxDigits = Math.max(...array);


  for (let k = 0; k < maxDigits; k++) {
    // Create buckets to hold numbers based on their current digit at position 'k'
    const buckets = Array.from({ length: 10 }, () => []);
    
    // Check if the array is already sorted in ascending order to optimize and avoid unnecessary sorting
    if (isSortedAscending(array)) {
      return;  
    }

    // Place each number in the appropriate bucket based on its current digit at position 'k'
    for (let i = 0; i < array.length; i++) {
      const digit = getDigit(array[i], k);
      animations.push({"Color Change": [i, digit]});
      animations.push({"Color Revert": [i, digit]});
      buckets[digit].push(array[i]);
    }

    // Collect the numbers from the buckets back into the array
    let idx = 0;
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        array[idx++] = bucket[j];
        animations.push({"Overwrite": [idx - 1, bucket[j]]});
      }
    }
  }
  return array;  // Return the sorted array
  }
// This function extracts the digit at a specified place from a given number.
function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  }
// Check if our array is already sorted
// To prevent further animations 
// This is very slow in practice.. don't do this
// in your code!!!
function isSortedAscending(array){
  for (let i = 1; i < array.length; i++) {
     if (array[i] < array[i - 1]) {
        return false; 
     }
  }
  return true; 
  }   