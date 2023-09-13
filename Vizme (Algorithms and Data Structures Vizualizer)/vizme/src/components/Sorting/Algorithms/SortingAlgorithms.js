// The main thing to learn from this section is that we are not returning any arrays,
// but rather an array of animations of varying types for each algorithm :)

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
            
            if (array[j] > array[j + 1]) {
                // Swap values when comparing.
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
  for (let i = 0; i < array.length; i++) {
    let min = i; 
    // Turn the initial minimum color. 
    for (let j = i + 1; j < array.length; j++) {
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
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    animations.push({"Color Change": [i, j]});
    animations.push({"Color Revert": [i, j]});
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

//   Quick Sort
export function getQuickSortAnimations(array) {
    const animations = [];
}

//   Merge Sort
export function getMergeSortAnimations(array) {
    const animations = [];
    const helperArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, helperArray, animations);
    return animations;
  }
  
function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    helperArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(helperArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(helperArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, helperArray, animations);
  }
  
function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push({"Color Change": [i, j]});
      animations.push({"Color Revert": [i, j]});
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push({"Overwrite": [k, auxiliaryArray[i]]});
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push({"Overwrite": [k, auxiliaryArray[j]]});
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push({"Color Change": [i, i]});
      animations.push({"Color Revert": [i, i]});
      animations.push({"Overwrite": [k, auxiliaryArray[i]]});
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push({"Color Change": [j, j]});
      animations.push({"Color Revert": [j, j]});
      animations.push({"Overwrite": [k, auxiliaryArray[j]]});
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

//   Heap Sort
export function getHeapSortAnimations(array) {
    const animations = [];
}
//   Tim Sort
export function getTimSortAnimations(array) {
    const animations = [];
}