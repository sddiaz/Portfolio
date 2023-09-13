//   Bubble Sort
export function getBubbleSortAnimations(array) {
    const animations = [];
    const helperArray = array.slice();
    bubbleSortHelper(array, animations, helperArray);
    return animations;
}
function bubbleSortHelper(array, animations, helperArray) {
    let n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // These are the values that we're comparing; we push them once
            // to change their color.
            animations.push([j, j + 1]);
            // These are the values that we're comparing; we push them a second
            // time to revert their color.
            animations.push([j, j + 1]);
            
            if (array[j] > array[j + 1]) {
                // Swap values when comparing.
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                // Animate our swawp for array values at j and j + 1.
                animations.push([j, j + 1]);
            }
            // No animation if no swap. 
            else {
                animations.push([-1, -1]);
            }
        }
    }
}
//   Selection Sort
export function getSelectionSortAnimations(array) {
    const animations = [];
}
//   Insertion Sort
export function getInsertionSortAnimations(array) {
    const animations = [];
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
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
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