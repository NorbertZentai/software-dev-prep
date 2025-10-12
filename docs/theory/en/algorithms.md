# Algorithms & Data Structures

## Brief Summary

Algorithms are the building blocks of problem-solving that define structured step-by-step solutions to tasks. This page presents junior-to-medior level, practice-oriented algorithms that are essential in modern software development and technical interviews. From array manipulation through graph algorithms to dynamic programming, every algorithm is presented with detailed pseudocode and implemented examples in three programming languages (Java, JavaScript, TypeScript). The goal is not practicing "baby" problems, but efficiently solving real-world problems.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Filter by topics</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">All</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="arrays">Arrays</button>
    <button class="filter-chip" data-filter="strings">Strings</button>
    <button class="filter-chip" data-filter="search">Search</button>
    <button class="filter-chip" data-filter="sorting">Sorting</button>
    <button class="filter-chip" data-filter="graphs">Graphs</button>
    <button class="filter-chip" data-filter="dp">DP</button>
    <button class="filter-chip" data-filter="trees">Trees</button>
  </div>
</div>

## How to use this page

### 📚 Recommended learning order

1. **Foundation**: `Two Pointers` → `Sliding Window` → `Prefix-sum`
2. **Array patterns**: `Monotonic Stack` → `Intervals` → `Kadane's Algorithm`
3. **Search**: `Binary Search on Answer` → `Quickselect`
4. **Sorting**: `Mergesort vs Quicksort` → `Top-K elements with heap`
5. **Data structures**: `Union-Find` → `LRU Cache` → `Heap patterns`
6. **Graphs**: `BFS/DFS` → `Dijkstra` → `Topological Sort` → `MST`
7. **Dynamic programming**: `LIS` → `Edit Distance` → `Coin Change` → `Knapsack`
8. **String algorithms**: `KMP` → `Rabin-Karp`
9. **Advanced**: `LCA` → `Segment Tree/Fenwick`

### 🎯 Usage tips

- **First** read the **Problem formulation** + **Algorithm steps (pseudocode)** section
- **Then** try to implement it yourself before looking at the code
- **Next** check the **Java/JavaScript/TypeScript** implementations
- **Finally** practice the problems in the **Interview questions** section
- Always read the **Common mistakes** section before writing production code

### 🏷️ Tag meanings

- **Junior**: Basic algorithms, learnable with 1-2 years of experience
- **Medior**: Advanced patterns, 3+ years of experience recommended
- **Arrays/Strings**: Array and string manipulation
- **Search/Sorting**: Search and sorting algorithms
- **Graphs/Trees**: Graph and tree algorithms
- **DP**: Dynamic programming patterns

## Concepts

### Two Pointers {#two-pointers}

<div class="concept-section definition" data-filter="arrays strings junior">

📋 **Concept Definition**  
**Algorithm pattern using two indices** traversing data structure simultaneously. **Variants**: **Opposite directions** (left=0, right=n-1, converge), **Same direction** (slow/fast pointers for cycle detection), **Sliding window** (expand/contract window). **Use cases**: pair sum in sorted array, palindrome checking, removing duplicates, linked list cycle detection (Floyd's algorithm). **Complexity**: typically O(n) time with O(1) space. **Requirements**: often requires sorted array for opposite-direction variant. **Techniques**: move pointers based on conditions (sum > target: right--, sum < target: left++). **Interview applications**: 3Sum, container with most water, linked list middle/cycle.

</div>

<div class="concept-section why-important" data-filter="arrays strings junior">

💡 **Why it matters?**
- **Efficiency**: reduces O(n²) brute force to O(n) linear solution
- **Space optimization**: constant space complexity instead of additional data structures
- **Interview favorite**: extremely common in technical interviews
- **Real-world applications**: data processing, search optimization, array manipulation

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Best case**: O(n) time, O(1) space
- **Average case**: O(n) time, O(1) space  
- **Worst case**: O(n) time, O(1) space
- **Space**: O(1) extra memory

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**
```pseudo
FUNCTION TwoPointers(A, target)
  left ← 0
  right ← LENGTH(A) − 1
  
  WHILE left < right DO
    currentSum ← A[left] + A[right]
    
    IF currentSum = target THEN
      RETURN [left, right]
    ELSE IF currentSum < target THEN
      left ← left + 1
    ELSE
      right ← right − 1
    END IF
  END WHILE
  
  RETURN null  // not found
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="arrays">

**Runnable mental model**
```javascript
// TWO POINTERS - COMPREHENSIVE IMPLEMENTATION

class TwoPointers {
    // 1. TWO SUM IN SORTED ARRAY
    static twoSum(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[left] + nums[right];
            
            if (sum === target) {
                return [left, right];
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        return [-1, -1]; // not found
    }
    
    // 2. REMOVE DUPLICATES FROM SORTED ARRAY
    static removeDuplicates(nums) {
        if (nums.length <= 1) return nums.length;
        
        let writeIdx = 1; // slow pointer
        
        for (let readIdx = 1; readIdx < nums.length; readIdx++) { // fast pointer
            if (nums[readIdx] !== nums[readIdx - 1]) {
                nums[writeIdx] = nums[readIdx];
                writeIdx++;
            }
        }
        
        return writeIdx;
    }
    
    // 3. THREE SUM - FIND TRIPLETS THAT SUM TO ZERO
    static threeSum(nums) {
        const result = [];
        nums.sort((a, b) => a - b);
        
        for (let i = 0; i < nums.length - 2; i++) {
            // Skip duplicates for first element
            if (i > 0 && nums[i] === nums[i - 1]) continue;
            
            let left = i + 1;
            let right = nums.length - 1;
            
            while (left < right) {
                const sum = nums[i] + nums[left] + nums[right];
                
                if (sum === 0) {
                    result.push([nums[i], nums[left], nums[right]]);
                    
                    // Skip duplicates for second element
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    // Skip duplicates for third element
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        
        return result;
    }
    
    // 4. CONTAINER WITH MOST WATER
    static maxArea(height) {
        let left = 0;
        let right = height.length - 1;
        let maxWater = 0;
        
        while (left < right) {
            const currentArea = Math.min(height[left], height[right]) * (right - left);
            maxWater = Math.max(maxWater, currentArea);
            
            // Move the pointer with smaller height
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxWater;
    }
    
    // 5. VALID PALINDROME
    static isPalindrome(s) {
        // Clean string: keep only alphanumeric characters, lowercase
        const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        let left = 0;
        let right = cleaned.length - 1;
        
        while (left < right) {
            if (cleaned[left] !== cleaned[right]) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }
    
    // 6. REVERSE STRING IN-PLACE
    static reverseString(s) {
        let left = 0;
        let right = s.length - 1;
        
        while (left < right) {
            // Swap characters
            [s[left], s[right]] = [s[right], s[left]];
            left++;
            right--;
        }
        
        return s;
    }
    
    // 7. MOVE ZEROS TO END
    static moveZeroes(nums) {
        let writeIndex = 0; // slow pointer
        
        // Move all non-zero elements to the front
        for (let readIndex = 0; readIndex < nums.length; readIndex++) {
            if (nums[readIndex] !== 0) {
                nums[writeIndex] = nums[readIndex];
                writeIndex++;
            }
        }
        
        // Fill remaining positions with zeros
        while (writeIndex < nums.length) {
            nums[writeIndex] = 0;
            writeIndex++;
        }
        
        return nums;
    }
    
    // 8. PARTITION ARRAY (QUICKSORT PARTITION)
    static partition(nums, pivot) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left <= right) {
            while (left <= right && nums[left] < pivot) left++;
            while (left <= right && nums[right] > pivot) right--;
            
            if (left <= right) {
                [nums[left], nums[right]] = [nums[right], nums[left]];
                left++;
                right--;
            }
        }
        
        return left; // partition index
    }
    
    // 9. DUTCH NATIONAL FLAG (3-WAY PARTITION)
    static sortColors(nums) {
        let left = 0;   // boundary for 0s
        let right = nums.length - 1; // boundary for 2s
        let current = 0;
        
        while (current <= right) {
            if (nums[current] === 0) {
                [nums[left], nums[current]] = [nums[current], nums[left]];
                left++;
                current++;
            } else if (nums[current] === 2) {
                [nums[current], nums[right]] = [nums[right], nums[current]];
                right--;
                // Don't increment current - need to check swapped element
            } else {
                current++; // nums[current] === 1
            }
        }
        
        return nums;
    }
    
    // 10. SQUARES OF SORTED ARRAY
    static sortedSquares(nums) {
        const result = new Array(nums.length);
        let left = 0;
        let right = nums.length - 1;
        let writeIndex = nums.length - 1;
        
        while (left <= right) {
            const leftSquare = nums[left] * nums[left];
            const rightSquare = nums[right] * nums[right];
            
            if (leftSquare > rightSquare) {
                result[writeIndex] = leftSquare;
                left++;
            } else {
                result[writeIndex] = rightSquare;
                right--;
            }
            writeIndex--;
        }
        
        return result;
    }
}

// TYPESCRIPT VERSION WITH TYPES
class TwoPointersTS {
    // Two Sum with type safety
    static twoSum(nums: number[], target: number): [number, number] | null {
        let left = 0;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[left] + nums[right];
            
            if (sum === target) {
                return [left, right];
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        return null;
    }
    
    // Generic partition function
    static partition<T>(
        array: T[], 
        compareFunction: (a: T, b: T) => number,
        pivot: T
    ): number {
        let left = 0;
        let right = array.length - 1;
        
        while (left <= right) {
            while (left <= right && compareFunction(array[left], pivot) < 0) left++;
            while (left <= right && compareFunction(array[right], pivot) > 0) right--;
            
            if (left <= right) {
                [array[left], array[right]] = [array[right], array[left]];
                left++;
                right--;
            }
        }
        
        return left;
    }
}

// JAVA-STYLE IMPLEMENTATION
class TwoPointersJava {
    // Closest pair to target sum
    static closestPairSum(nums, target) {
        nums.sort((a, b) => a - b);
        
        let left = 0;
        let right = nums.length - 1;
        let closestSum = nums[left] + nums[right];
        let result = [left, right];
        
        while (left < right) {
            const currentSum = nums[left] + nums[right];
            
            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                closestSum = currentSum;
                result = [left, right];
            }
            
            if (currentSum < target) {
                left++;
            } else if (currentSum > target) {
                right--;
            } else {
                break; // Exact match found
            }
        }
        
        return {
            indices: result,
            sum: closestSum,
            values: [nums[result[0]], nums[result[1]]]
        };
    }
    
    // Remove element in-place
    static removeElement(nums, val) {
        let writeIndex = 0;
        
        for (let readIndex = 0; readIndex < nums.length; readIndex++) {
            if (nums[readIndex] !== val) {
                nums[writeIndex] = nums[readIndex];
                writeIndex++;
            }
        }
        
        return writeIndex; // new length
    }
}

// USAGE EXAMPLES AND TESTING
console.log("=== TWO POINTERS EXAMPLES ===");

// Test Two Sum
const sortedArray = [2, 7, 11, 15];
console.log("Two Sum [2,7,11,15], target 9:", TwoPointers.twoSum(sortedArray, 9));

// Test Three Sum
const threeArray = [-1, 0, 1, 2, -1, -4];
console.log("Three Sum [-1,0,1,2,-1,-4]:", TwoPointers.threeSum(threeArray));

// Test Container with Most Water
const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log("Max Area [1,8,6,2,5,4,8,3,7]:", TwoPointers.maxArea(heights));

// Test Palindrome
console.log("Is 'A man, a plan, a canal: Panama' palindrome?", 
            TwoPointers.isPalindrome("A man, a plan, a canal: Panama"));

// Test Move Zeros
const zerosArray = [0, 1, 0, 3, 12];
console.log("Move Zeros [0,1,0,3,12]:", TwoPointers.moveZeroes([...zerosArray]));

// Test Squares of Sorted Array
const negativeArray = [-4, -1, 0, 3, 10];
console.log("Sorted Squares [-4,-1,0,3,10]:", TwoPointers.sortedSquares(negativeArray));

// Performance test
function performanceTest() {
    const largeArray = Array.from({length: 100000}, (_, i) => i);
    const target = 99999;
    
    console.time("Two Pointers on 100k elements");
    TwoPointers.twoSum(largeArray, target);
    console.timeEnd("Two Pointers on 100k elements");
}

performanceTest();
```
*Notice: Two Pointers technique efficiently solves array and string problems by using two indices that move towards each other, eliminating the need for nested loops.*

</div>

<div class="concept-section common-mistakes" data-filter="arrays">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Array bounds**: Always check `left < right` or `left <= right` depending on the problem
- **Infinite loops**: Ensure pointers always move in the correct direction
- **Duplicate handling**: Don't forget to skip duplicates when required (e.g., Three Sum)
- **Sorted requirement**: Two Pointers usually requires sorted data
- **Index vs value**: Be clear whether you're returning indices or actual values
- **Edge cases**: Handle empty arrays, single elements, and no-solution cases

</div>
</details>

</div>

<div class="concept-section interview-questions" data-filter="arrays">

<details>
<summary>💼 <strong>Interview questions</strong></summary>

<div>

**Q: When would you use Two Pointers over a hash map for Two Sum?**
A: When the array is sorted and you need O(1) space complexity, or when you need to find all pairs, not just existence.

**Q: How do you handle duplicates in Three Sum?**
A: Skip duplicates at each level - first element (i), second element (left), and third element (right) by continuing the loop while adjacent elements are equal.

**Q: Can Two Pointers work on unsorted arrays?**
A: Generally no, except for specific problems like finding pairs that meet certain conditions where sorting isn't necessary.

**Q: What's the difference between fast/slow pointers and left/right pointers?**
A: Fast/slow is for cycle detection and finding middle elements. Left/right is for searching pairs or partitioning.

</div>
</details>

</div>

<div class="concept-section connection-map" data-filter="arrays">

🗺️ **Connection map**  
`Sliding Window` · `Binary Search` · `Sorting` · `Array Manipulation` · `String Processing` · `Quick Sort Partition`

</div>

### Sliding Window {#sliding-window}

<div class="concept-section definition" data-filter="arrays strings junior">

📋 **Concept Definition**  
**Pattern for contiguous subarray/substring problems** maintaining window of elements. **Types**: **Fixed-size** (window size k constant), **Variable-size** (expand/contract based on condition). **Mechanics**: two pointers (left, right), right expands window, left contracts when condition violated. **State tracking**: hash map for frequencies, variable for sum/product. **Use cases**: max/min subarray sum of size k, longest substring without repeating characters, minimum window substring. **Complexity**: O(n) time (each element visited at most twice), O(k) space for state. **vs Two Pointers**: sliding window maintains contiguous segment, tracks state within window. **Interview applications**: anagrams, subarrays with sum/product, character replacement.

</div>

<div class="concept-section why-important" data-filter="arrays strings junior">

💡 **Why it matters?**
- **Efficiency**: converts O(n²) brute force to O(n) solutions for subarray problems
- **Memory optimization**: maintains constant space regardless of window size
- **Pattern recognition**: fundamental technique for substring and subarray problems
- **Real-world applications**: stream processing, analytics, data compression

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Fixed window**: O(n) time, O(1) space
- **Variable window**: O(n) time, O(k) space where k is window size
- **With hash map**: O(n) time, O(k) space for character/element tracking

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**
```pseudo
// Fixed Size Window
FUNCTION FixedSlidingWindow(A, k)
  windowSum ← SUM(A[0..k-1])
  maxSum ← windowSum
  
  FOR i ← k TO LENGTH(A) - 1 DO
    windowSum ← windowSum - A[i-k] + A[i]  // slide window
    maxSum ← MAX(maxSum, windowSum)
  END FOR
  
  RETURN maxSum
END FUNCTION

// Variable Size Window
FUNCTION VariableSlidingWindow(A, condition)
  left ← 0
  result ← optimal_value
  
  FOR right ← 0 TO LENGTH(A) - 1 DO
    // expand window
    add A[right] to window
    
    WHILE window violates condition DO
      // shrink window
      remove A[left] from window
      left ← left + 1
    END WHILE
    
    result ← UPDATE(result, current_window)
  END FOR
  
  RETURN result
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="arrays strings">

**Runnable mental model**
```javascript
// SLIDING WINDOW - COMPREHENSIVE IMPLEMENTATION

class SlidingWindow {
    // 1. MAXIMUM SUM SUBARRAY OF SIZE K (Fixed Window)
    static maxSumSubarray(nums, k) {
        if (nums.length < k) return null;
        
        // Calculate sum of first window
        let windowSum = 0;
        for (let i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        
        let maxSum = windowSum;
        
        // Slide the window: remove first element, add new element
        for (let i = k; i < nums.length; i++) {
            windowSum = windowSum - nums[i - k] + nums[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum;
    }
    
    // 2. LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS
    static lengthOfLongestSubstring(s) {
        const charSet = new Set();
        let left = 0;
        let maxLength = 0;
        
        for (let right = 0; right < s.length; right++) {
            // Shrink window until no duplicates
            while (charSet.has(s[right])) {
                charSet.delete(s[left]);
                left++;
            }
            
            charSet.add(s[right]);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
    
    // 3. MINIMUM WINDOW SUBSTRING
    static minWindow(s, t) {
        if (s.length < t.length) return "";
        
        // Count characters in t
        const targetCount = new Map();
        for (let char of t) {
            targetCount.set(char, (targetCount.get(char) || 0) + 1);
        }
        
        let left = 0;
        let minLength = Infinity;
        let minStart = 0;
        let requiredChars = targetCount.size;
        let formedChars = 0;
        const windowCount = new Map();
        
        for (let right = 0; right < s.length; right++) {
            // Expand window
            const rightChar = s[right];
            windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);
            
            if (targetCount.has(rightChar) && 
                windowCount.get(rightChar) === targetCount.get(rightChar)) {
                formedChars++;
            }
            
            // Contract window
            while (left <= right && formedChars === requiredChars) {
                const leftChar = s[left];
                
                // Update minimum window
                if (right - left + 1 < minLength) {
                    minLength = right - left + 1;
                    minStart = left;
                }
                
                // Remove from window
                windowCount.set(leftChar, windowCount.get(leftChar) - 1);
                if (targetCount.has(leftChar) && 
                    windowCount.get(leftChar) < targetCount.get(leftChar)) {
                    formedChars--;
                }
                
                left++;
            }
        }
        
        return minLength === Infinity ? "" : s.substring(minStart, minStart + minLength);
    }
    
    // 4. LONGEST SUBSTRING WITH AT MOST K DISTINCT CHARACTERS
    static lengthOfLongestSubstringKDistinct(s, k) {
        if (k === 0) return 0;
        
        const charCount = new Map();
        let left = 0;
        let maxLength = 0;
        
        for (let right = 0; right < s.length; right++) {
            // Expand window
            const rightChar = s[right];
            charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
            
            // Contract window if we have more than k distinct characters
            while (charCount.size > k) {
                const leftChar = s[left];
                charCount.set(leftChar, charCount.get(leftChar) - 1);
                if (charCount.get(leftChar) === 0) {
                    charCount.delete(leftChar);
                }
                left++;
            }
            
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
    
    // 5. SUBARRAY WITH GIVEN SUM (for positive numbers)
    static subarraySum(nums, target) {
        let left = 0;
        let currentSum = 0;
        
        for (let right = 0; right < nums.length; right++) {
            currentSum += nums[right];
            
            // Shrink window if sum exceeds target
            while (currentSum > target && left <= right) {
                currentSum -= nums[left];
                left++;
            }
            
            if (currentSum === target) {
                return [left, right];
            }
        }
        
        return [-1, -1]; // not found
    }
    
    // 6. MAXIMUM NUMBER OF VOWELS IN SUBSTRING OF LENGTH K
    static maxVowels(s, k) {
        const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
        
        // Count vowels in first window
        let currentVowels = 0;
        for (let i = 0; i < k; i++) {
            if (vowels.has(s[i])) {
                currentVowels++;
            }
        }
        
        let maxVowels = currentVowels;
        
        // Slide window
        for (let i = k; i < s.length; i++) {
            // Remove outgoing character
            if (vowels.has(s[i - k])) {
                currentVowels--;
            }
            // Add incoming character
            if (vowels.has(s[i])) {
                currentVowels++;
            }
            
            maxVowels = Math.max(maxVowels, currentVowels);
        }
        
        return maxVowels;
    }
    
    // 7. PERMUTATION IN STRING (Sliding Window with Character Frequency)
    static checkInclusion(s1, s2) {
        if (s1.length > s2.length) return false;
        
        // Count characters in s1
        const s1Count = new Map();
        for (let char of s1) {
            s1Count.set(char, (s1Count.get(char) || 0) + 1);
        }
        
        const windowSize = s1.length;
        const windowCount = new Map();
        
        // Initialize first window
        for (let i = 0; i < windowSize; i++) {
            const char = s2[i];
            windowCount.set(char, (windowCount.get(char) || 0) + 1);
        }
        
        // Check if first window matches
        if (this.mapsEqual(s1Count, windowCount)) {
            return true;
        }
        
        // Slide window
        for (let i = windowSize; i < s2.length; i++) {
            // Add new character
            const newChar = s2[i];
            windowCount.set(newChar, (windowCount.get(newChar) || 0) + 1);
            
            // Remove old character
            const oldChar = s2[i - windowSize];
            windowCount.set(oldChar, windowCount.get(oldChar) - 1);
            if (windowCount.get(oldChar) === 0) {
                windowCount.delete(oldChar);
            }
            
            if (this.mapsEqual(s1Count, windowCount)) {
                return true;
            }
        }
        
        return false;
    }
    
    // Helper function to compare maps
    static mapsEqual(map1, map2) {
        if (map1.size !== map2.size) return false;
        
        for (let [key, value] of map1) {
            if (map2.get(key) !== value) {
                return false;
            }
        }
        
        return true;
    }
    
    // 8. MAXIMUM AVERAGE SUBARRAY
    static findMaxAverage(nums, k) {
        let windowSum = 0;
        
        // Calculate sum of first window
        for (let i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        
        let maxSum = windowSum;
        
        // Slide window and find maximum sum
        for (let i = k; i < nums.length; i++) {
            windowSum = windowSum - nums[i - k] + nums[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum / k;
    }
    
    // 9. FRUIT INTO BASKETS (At Most 2 Types)
    static totalFruit(fruits) {
        const fruitCount = new Map();
        let left = 0;
        let maxFruits = 0;
        
        for (let right = 0; right < fruits.length; right++) {
            // Add fruit to basket
            const fruit = fruits[right];
            fruitCount.set(fruit, (fruitCount.get(fruit) || 0) + 1);
            
            // If more than 2 types, shrink window
            while (fruitCount.size > 2) {
                const leftFruit = fruits[left];
                fruitCount.set(leftFruit, fruitCount.get(leftFruit) - 1);
                if (fruitCount.get(leftFruit) === 0) {
                    fruitCount.delete(leftFruit);
                }
                left++;
            }
            
            maxFruits = Math.max(maxFruits, right - left + 1);
        }
        
        return maxFruits;
    }
    
    // 10. SLIDING WINDOW MAXIMUM
    static maxSlidingWindow(nums, k) {
        const result = [];
        const deque = []; // stores indices
        
        for (let i = 0; i < nums.length; i++) {
            // Remove indices outside current window
            while (deque.length > 0 && deque[0] <= i - k) {
                deque.shift();
            }
            
            // Remove smaller elements from back
            while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
                deque.pop();
            }
            
            deque.push(i);
            
            // Window is complete
            if (i >= k - 1) {
                result.push(nums[deque[0]]);
            }
        }
        
        return result;
    }
}

// TYPESCRIPT VERSION WITH GENERICS
class SlidingWindowTS {
    // Generic sliding window for any data type
    static slidingWindow<T, R>(
        array: T[],
        windowSize: number,
        processWindow: (window: T[]) => R
    ): R[] {
        const results: R[] = [];
        
        for (let i = 0; i <= array.length - windowSize; i++) {
            const window = array.slice(i, i + windowSize);
            results.push(processWindow(window));
        }
        
        return results;
    }
    
    // Type-safe character frequency counter
    static characterFrequency(s: string): Map<string, number> {
        const frequency = new Map<string, number>();
        
        for (const char of s) {
            frequency.set(char, (frequency.get(char) || 0) + 1);
        }
        
        return frequency;
    }
}

// USAGE EXAMPLES AND TESTING
console.log("=== SLIDING WINDOW EXAMPLES ===");

// Test Maximum Sum Subarray
const nums1 = [2, 1, 5, 1, 3, 2];
console.log("Max Sum Subarray (k=3):", SlidingWindow.maxSumSubarray(nums1, 3));

// Test Longest Substring Without Repeating Characters
const s1 = "abcabcbb";
console.log("Longest Substring Without Repeating:", 
            SlidingWindow.lengthOfLongestSubstring(s1));

// Test Minimum Window Substring
const s = "ADOBECODEBANC";
const t = "ABC";
console.log("Minimum Window Substring:", SlidingWindow.minWindow(s, t));

// Test Sliding Window Maximum
const nums2 = [1, 3, -1, -3, 5, 3, 6, 7];
console.log("Sliding Window Maximum (k=3):", 
            SlidingWindow.maxSlidingWindow(nums2, 3));

// Performance comparison
function performanceComparison() {
    const largeArray = Array.from({length: 100000}, () => Math.floor(Math.random() * 100));
    const k = 1000;
    
    // Sliding Window approach
    console.time("Sliding Window (O(n))");
    SlidingWindow.maxSumSubarray(largeArray, k);
    console.timeEnd("Sliding Window (O(n))");
    
    // Brute force approach for comparison
    function bruteForceMaxSum(arr, windowSize) {
        let maxSum = -Infinity;
        for (let i = 0; i <= arr.length - windowSize; i++) {
            let currentSum = 0;
            for (let j = i; j < i + windowSize; j++) {
                currentSum += arr[j];
            }
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
    
    console.time("Brute Force (O(n*k))");
    bruteForceMaxSum(largeArray.slice(0, 1000), 100); // Smaller for brute force
    console.timeEnd("Brute Force (O(n*k))");
}

performanceComparison();
```
*Notice: Sliding Window optimizes subarray/substring problems by maintaining a window that expands and contracts, avoiding redundant recalculations.*

</div>

<div class="concept-section common-mistakes" data-filter="arrays strings">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Window size validation**: Always check if array/string length is sufficient for the window
- **Off-by-one errors**: Be careful with window boundaries and loop conditions
- **State management**: Properly update window state when adding/removing elements
- **Hash map cleanup**: Remove entries when count reaches zero to avoid memory leaks
- **Edge cases**: Handle empty inputs, single elements, and windows larger than input
- **Fixed vs variable**: Understand whether the problem requires fixed or variable window size

</div>
</details>

</div>

<div class="concept-section interview-questions" data-filter="arrays strings">

<details>
<summary>💼 <strong>Interview questions</strong></summary>

<div>

**Q: How do you know when to use sliding window vs two pointers?**
A: Use sliding window for subarray/substring problems where you need to maintain a contiguous sequence. Use two pointers for pair-finding or partition problems.

**Q: What's the difference between fixed and variable sliding window?**
A: Fixed window maintains constant size throughout. Variable window expands and contracts based on conditions, often using the "expand right, contract left" pattern.

**Q: How do you optimize sliding window with hash maps?**
A: Use hash maps to track character/element frequencies in the current window, updating counts as you slide rather than recalculating.

**Q: Can sliding window work with negative numbers?**
A: Yes, but the approach may change. For subarray sum problems with negatives, you might need different techniques like prefix sums.

</div>
</details>

</div>

<div class="concept-section connection-map" data-filter="arrays strings">

🗺️ **Connection map**  
`Two Pointers` · `Hash Tables` · `Deque` · `String Processing` · `Subarray Problems` · `Dynamic Programming`

</div>

### Binary Search {#binary-search}

<div class="concept-section definition" data-filter="search junior">

� **Concept Definition**  
**Divide-and-conquer search algorithm** on sorted data, halving search space each iteration. **Complexity**: O(log n) time, O(1) space (iterative), O(log n) space (recursive stack). **Implementation**: left=0, right=n-1, mid=(left+right)/2 (or left+(right-left)/2 to avoid overflow), compare arr[mid] with target. **Variants**: **Lower bound** (first occurrence), **Upper bound** (last occurrence), **Search in rotated array**, **Binary search on answer** (find minimum/maximum satisfying condition). **Requirements**: array must be sorted (or monotonic function). **Edge cases**: empty array, single element, target not found. **Applications**: std::lower_bound, database indexes, optimization problems.

</div>

<div class="concept-section why-important" data-filter="search junior">

💡 **Why it matters?**
- **Logarithmic efficiency**: O(log n) vs O(n) linear search
- **Search space reduction**: eliminates half the possibilities each iteration
- **Foundation for advanced algorithms**: basis for binary search on answer
- **Real-world applications**: databases, data structures, optimization problems

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Time**: O(log n) for search operations
- **Space**: O(1) for iterative, O(log n) for recursive
- **Prerequisite**: Array must be sorted
- **Worst case**: Still O(log n) - very predictable performance

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**
```pseudo
FUNCTION BinarySearch(A, target)
  left ← 0
  right ← LENGTH(A) - 1
  
  WHILE left ≤ right DO
    mid ← left + (right - left) / 2  // avoid overflow
    
    IF A[mid] = target THEN
      RETURN mid
    ELSE IF A[mid] < target THEN
      left ← mid + 1
    ELSE
      right ← mid - 1
    END IF
  END WHILE
  
  RETURN -1  // not found
END FUNCTION

// Binary Search on Answer
FUNCTION BinarySearchAnswer(predicate, low, high)
  WHILE low < high DO
    mid ← low + (high - low) / 2
    
    IF predicate(mid) THEN
      high ← mid
    ELSE
      low ← mid + 1
    END IF
  END WHILE
  
  RETURN low
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="search">

**Runnable mental model**
```javascript
// BINARY SEARCH - COMPREHENSIVE IMPLEMENTATION

class BinarySearch {
    // 1. CLASSIC BINARY SEARCH
    static search(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (nums[mid] === target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1; // not found
    }
    
    // 2. FIND FIRST OCCURRENCE (Lower Bound)
    static findFirst(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (nums[mid] === target) {
                result = mid;
                right = mid - 1; // Continue searching left
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    // 3. FIND LAST OCCURRENCE (Upper Bound)
    static findLast(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (nums[mid] === target) {
                result = mid;
                left = mid + 1; // Continue searching right
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    // 4. SEARCH INSERT POSITION
    static searchInsert(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (nums[mid] === target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return left; // insertion position
    }
    
    // 5. SEARCH IN ROTATED SORTED ARRAY
    static searchRotated(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (nums[mid] === target) {
                return mid;
            }
            
            // Determine which half is sorted
            if (nums[left] <= nums[mid]) {
                // Left half is sorted
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return -1;
    }
    
    // 6. FIND MINIMUM IN ROTATED SORTED ARRAY
    static findMin(nums) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (nums[mid] > nums[right]) {
                // Minimum is in right half
                left = mid + 1;
            } else {
                // Minimum is in left half (including mid)
                right = mid;
            }
        }
        
        return nums[left];
    }
    
    // 7. FIND PEAK ELEMENT
    static findPeakElement(nums) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (nums[mid] < nums[mid + 1]) {
                // Peak is in right half
                left = mid + 1;
            } else {
                // Peak is in left half (including mid)
                right = mid;
            }
        }
        
        return left;
    }
    
    // 8. SQUARE ROOT (Integer)
    static sqrt(x) {
        if (x < 2) return x;
        
        let left = 1;
        let right = Math.floor(x / 2);
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            const square = mid * mid;
            
            if (square === x) {
                return mid;
            } else if (square < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return right; // largest integer whose square ≤ x
    }
    
    // 9. BINARY SEARCH ON ANSWER - MINIMUM CAPACITY TO SHIP PACKAGES
    static shipWithinDays(weights, days) {
        let left = Math.max(...weights); // minimum possible capacity
        let right = weights.reduce((sum, w) => sum + w, 0); // maximum possible capacity
        
        const canShip = (capacity) => {
            let daysNeeded = 1;
            let currentWeight = 0;
            
            for (let weight of weights) {
                if (currentWeight + weight > capacity) {
                    daysNeeded++;
                    currentWeight = weight;
                } else {
                    currentWeight += weight;
                }
            }
            
            return daysNeeded <= days;
        };
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (canShip(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    // 10. KTH SMALLEST ELEMENT IN SORTED MATRIX
    static kthSmallest(matrix, k) {
        const n = matrix.length;
        let left = matrix[0][0];
        let right = matrix[n - 1][n - 1];
        
        const countLessEqual = (target) => {
            let count = 0;
            let row = n - 1;
            let col = 0;
            
            while (row >= 0 && col < n) {
                if (matrix[row][col] <= target) {
                    count += row + 1;
                    col++;
                } else {
                    row--;
                }
            }
            
            return count;
        };
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (countLessEqual(mid) < k) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
    
    // 11. SEARCH 2D MATRIX
    static searchMatrix(matrix, target) {
        if (!matrix.length || !matrix[0].length) return false;
        
        const rows = matrix.length;
        const cols = matrix[0].length;
        let left = 0;
        let right = rows * cols - 1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            const midValue = matrix[Math.floor(mid / cols)][mid % cols];
            
            if (midValue === target) {
                return true;
            } else if (midValue < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return false;
    }
    
    // 12. FIND DUPLICATE NUMBER (Array as a Function)
    static findDuplicate(nums) {
        let left = 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            // Count numbers ≤ mid
            let count = 0;
            for (let num of nums) {
                if (num <= mid) count++;
            }
            
            if (count <= mid) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
}

// ADVANCED BINARY SEARCH PATTERNS
class AdvancedBinarySearch {
    // Binary search with custom comparator
    static binarySearchCustom(array, target, compareFunction) {
        let left = 0;
        let right = array.length - 1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            const comparison = compareFunction(array[mid], target);
            
            if (comparison === 0) {
                return mid;
            } else if (comparison < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    // Binary search on a function (find root)
    static findRoot(func, left, right, epsilon = 1e-9) {
        while (right - left > epsilon) {
            const mid = (left + right) / 2;
            const value = func(mid);
            
            if (Math.abs(value) < epsilon) {
                return mid;
            } else if (value < 0) {
                left = mid;
            } else {
                right = mid;
            }
        }
        
        return (left + right) / 2;
    }
    
    // Ternary search for finding maximum/minimum of unimodal function
    static ternarySearch(func, left, right, epsilon = 1e-9) {
        while (right - left > epsilon) {
            const mid1 = left + (right - left) / 3;
            const mid2 = right - (right - left) / 3;
            
            if (func(mid1) < func(mid2)) {
                left = mid1;
            } else {
                right = mid2;
            }
        }
        
        return (left + right) / 2;
    }
}

// TYPESCRIPT VERSION WITH GENERICS
class BinarySearchTS {
    // Generic binary search
    static search<T>(
        array: T[],
        target: T,
        compareFunction: (a: T, b: T) => number
    ): number {
        let left = 0;
        let right = array.length - 1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            const comparison = compareFunction(array[mid], target);
            
            if (comparison === 0) {
                return mid;
            } else if (comparison < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    // Binary search with predicate function
    static searchWithPredicate(
        predicate: (index: number) => boolean,
        left: number,
        right: number
    ): number {
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (predicate(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
}

// USAGE EXAMPLES AND TESTING
console.log("=== BINARY SEARCH EXAMPLES ===");

// Test classic binary search
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
console.log("Binary Search for 7:", BinarySearch.search(sortedArray, 7));
console.log("Binary Search for 6:", BinarySearch.search(sortedArray, 6));

// Test find first and last occurrence
const duplicateArray = [1, 2, 2, 2, 3, 4, 5];
console.log("First occurrence of 2:", BinarySearch.findFirst(duplicateArray, 2));
console.log("Last occurrence of 2:", BinarySearch.findLast(duplicateArray, 2));

// Test rotated array search
const rotatedArray = [4, 5, 6, 7, 0, 1, 2];
console.log("Search 0 in rotated array:", BinarySearch.searchRotated(rotatedArray, 0));

// Test binary search on answer
const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Ship within 5 days:", BinarySearch.shipWithinDays(weights, 5));

// Test 2D matrix search
const matrix = [
    [1,  4,  7,  11],
    [2,  5,  8,  12],
    [3,  6,  9,  16],
    [10, 13, 14, 17]
];
console.log("Search 5 in matrix:", BinarySearch.searchMatrix(matrix, 5));

// Performance comparison
function performanceTest() {
    const largeArray = Array.from({length: 1000000}, (_, i) => i * 2);
    const target = 999998;
    
    console.time("Binary Search on 1M elements");
    BinarySearch.search(largeArray, target);
    console.timeEnd("Binary Search on 1M elements");
    
    console.time("Linear Search on 1M elements");
    largeArray.indexOf(target);
    console.timeEnd("Linear Search on 1M elements");
}

performanceTest();
```
*Notice: Binary Search efficiently finds elements in sorted data by repeatedly dividing the search space in half, achieving O(log n) time complexity.*

</div>

<div class="concept-section common-mistakes" data-filter="search">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Integer overflow**: Use `left + (right - left) / 2` instead of `(left + right) / 2`
- **Infinite loops**: Ensure loop termination with proper boundary updates
- **Off-by-one errors**: Be careful with `<=` vs `<` in loop conditions
- **Sorted assumption**: Binary search only works on sorted data
- **Array bounds**: Always validate array indices and handle empty arrays
- **Equal elements**: Consider whether you need first, last, or any occurrence

</div>
</details>

</div>

<div class="concept-section interview-questions" data-filter="search">

<details>
<summary>💼 <strong>Interview questions</strong></summary>

<div>

**Q: How do you prevent integer overflow in binary search?**
A: Use `mid = left + (right - left) / 2` instead of `mid = (left + right) / 2` to avoid potential overflow.

**Q: What's the difference between lower_bound and upper_bound?**
A: Lower_bound finds the first position where you could insert target. Upper_bound finds the first position after all occurrences of target.

**Q: When would you use binary search on the answer?**
A: When you can easily check if a value works but finding the optimal value directly is hard. Common in optimization problems.

**Q: How do you modify binary search for rotated arrays?**
A: Determine which half is properly sorted, then check if target lies in that range before deciding which direction to search.

</div>
</details>

</div>

<div class="concept-section connection-map" data-filter="search">

🗺️ **Connection map**  
`Sorted Arrays` · `Divide and Conquer` · `Optimization Problems` · `Data Structures` · `Logarithmic Complexity`

</div>

### Sorting Algorithms {#sorting}

<div class="concept-section definition" data-filter="sorting junior">

� **Concept Definition**  
**Algorithms for arranging elements in order.** **Comparison-based**: **Bubble Sort** (O(n²), swap adjacent), **Insertion Sort** (O(n²), insert into sorted portion), **Selection Sort** (O(n²), select minimum), **Merge Sort** (O(n log n), divide-conquer-merge, stable), **Quick Sort** (O(n log n) average, pivot partitioning, unstable), **Heap Sort** (O(n log n), max-heap). **Non-comparison**: **Counting Sort** (O(n+k), integer range), **Radix Sort** (O(d·n), digit-by-digit), **Bucket Sort** (O(n+k), distribute to buckets). **Stability**: stable preserves relative order of equal elements (Merge, Insertion), unstable doesn't (Quick, Heap). **Space**: in-place (O(1): Quick, Heap), out-of-place (O(n): Merge). **Java**: Arrays.sort (dual-pivot Quick Sort), Collections.sort (Tim Sort).

</div>

<div class="concept-section why-important" data-filter="sorting junior">

💡 **Why it matters?**
- **Foundation algorithm**: basis for many other algorithms and optimizations
- **Data preprocessing**: enables binary search and other efficient operations
- **Real-world applications**: databases, search engines, data analysis
- **Algorithm design**: demonstrates divide-and-conquer, stability, and complexity trade-offs

</div>

<div class="concept-section performance">

📊 **Time and space complexity comparison**
- **Bubble Sort**: O(n²) time, O(1) space - educational only
- **Selection Sort**: O(n²) time, O(1) space - minimal swaps
- **Insertion Sort**: O(n²) worst, O(n) best, O(1) space - good for small arrays
- **Merge Sort**: O(n log n) time, O(n) space - stable, predictable
- **Quick Sort**: O(n log n) average, O(n²) worst, O(log n) space - fast in practice
- **Heap Sort**: O(n log n) time, O(1) space - guaranteed performance

</div>

<div class="runnable-model" data-filter="sorting">

**Runnable mental model**
```javascript
// SORTING ALGORITHMS - COMPREHENSIVE IMPLEMENTATION

class SortingAlgorithms {
    // 1. BUBBLE SORT - Educational purposes
    static bubbleSort(arr) {
        const n = arr.length;
        const result = [...arr];
        
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            
            for (let j = 0; j < n - i - 1; j++) {
                if (result[j] > result[j + 1]) {
                    [result[j], result[j + 1]] = [result[j + 1], result[j]];
                    swapped = true;
                }
            }
            
            // Optimization: if no swaps, array is sorted
            if (!swapped) break;
        }
        
        return result;
    }
    
    // 2. SELECTION SORT - Minimum swaps
    static selectionSort(arr) {
        const n = arr.length;
        const result = [...arr];
        
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            
            // Find minimum element in remaining array
            for (let j = i + 1; j < n; j++) {
                if (result[j] < result[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Swap only if needed
            if (minIndex !== i) {
                [result[i], result[minIndex]] = [result[minIndex], result[i]];
            }
        }
        
        return result;
    }
    
    // 3. INSERTION SORT - Good for small arrays
    static insertionSort(arr) {
        const result = [...arr];
        
        for (let i = 1; i < result.length; i++) {
            const current = result[i];
            let j = i - 1;
            
            // Shift elements to right until correct position found
            while (j >= 0 && result[j] > current) {
                result[j + 1] = result[j];
                j--;
            }
            
            result[j + 1] = current;
        }
        
        return result;
    }
    
    // 4. MERGE SORT - Stable, predictable O(n log n)
    static mergeSort(arr) {
        if (arr.length <= 1) return [...arr];
        
        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid));
        const right = this.mergeSort(arr.slice(mid));
        
        return this.merge(left, right);
    }
    
    static merge(left, right) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        
        // Merge while both arrays have elements
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] <= right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        
        // Add remaining elements
        result.push(...left.slice(leftIndex));
        result.push(...right.slice(rightIndex));
        
        return result;
    }
    
    // 5. QUICK SORT - Fast average case
    static quickSort(arr, low = 0, high = arr.length - 1) {
        const result = [...arr];
        
        if (low < high) {
            const pivotIndex = this.partition(result, low, high);
            
            // Recursively sort elements before and after partition
            this.quickSortInPlace(result, low, pivotIndex - 1);
            this.quickSortInPlace(result, pivotIndex + 1, high);
        }
        
        return result;
    }
    
    static quickSortInPlace(arr, low, high) {
        if (low < high) {
            const pivotIndex = this.partition(arr, low, high);
            this.quickSortInPlace(arr, low, pivotIndex - 1);
            this.quickSortInPlace(arr, pivotIndex + 1, high);
        }
    }
    
    static partition(arr, low, high) {
        // Choose rightmost element as pivot
        const pivot = arr[high];
        let i = low - 1; // Index of smaller element
        
        for (let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }
    
    // 6. HEAP SORT - Guaranteed O(n log n)
    static heapSort(arr) {
        const result = [...arr];
        const n = result.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(result, n, i);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            [result[0], result[i]] = [result[i], result[0]];
            
            // Restore heap property for reduced heap
            this.heapify(result, i, 0);
        }
        
        return result;
    }
    
    static heapify(arr, n, rootIndex) {
        let largest = rootIndex;
        const left = 2 * rootIndex + 1;
        const right = 2 * rootIndex + 2;
        
        // Check if left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        // Check if right child is larger than current largest
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        // If largest is not root, swap and continue heapifying
        if (largest !== rootIndex) {
            [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
            this.heapify(arr, n, largest);
        }
    }
    
    // 7. COUNTING SORT - For integers in small range
    static countingSort(arr, maxValue = Math.max(...arr)) {
        const count = new Array(maxValue + 1).fill(0);
        const result = new Array(arr.length);
        
        // Count occurrences
        for (let num of arr) {
            count[num]++;
        }
        
        // Update count array to store actual positions
        for (let i = 1; i <= maxValue; i++) {
            count[i] += count[i - 1];
        }
        
        // Build result array in reverse to maintain stability
        for (let i = arr.length - 1; i >= 0; i--) {
            result[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }
        
        return result;
    }
    
    // 8. RADIX SORT - For integers
    static radixSort(arr) {
        const max = Math.max(...arr);
        const result = [...arr];
        
        // Do counting sort for every digit
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            this.countingSortByDigit(result, exp);
        }
        
        return result;
    }
    
    static countingSortByDigit(arr, exp) {
        const count = new Array(10).fill(0);
        const output = new Array(arr.length);
        
        // Count occurrences of each digit
        for (let i = 0; i < arr.length; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
        }
        
        // Update count array
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        // Build output array
        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }
        
        // Copy output array to arr
        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }
    }
    
    // 9. BUCKET SORT - For uniformly distributed data
    static bucketSort(arr, bucketCount = 10) {
        if (arr.length <= 1) return [...arr];
        
        const min = Math.min(...arr);
        const max = Math.max(...arr);
        const bucketSize = (max - min) / bucketCount;
        
        // Create buckets
        const buckets = Array.from({length: bucketCount}, () => []);
        
        // Distribute elements into buckets
        for (let num of arr) {
            const bucketIndex = Math.min(
                Math.floor((num - min) / bucketSize),
                bucketCount - 1
            );
            buckets[bucketIndex].push(num);
        }
        
        // Sort individual buckets and concatenate
        const result = [];
        for (let bucket of buckets) {
            if (bucket.length > 0) {
                // Use insertion sort for small buckets
                const sorted = this.insertionSort(bucket);
                result.push(...sorted);
            }
        }
        
        return result;
    }
    
    // 10. TIM SORT (Hybrid algorithm used by Python and Java)
    static timSort(arr) {
        const MIN_MERGE = 32;
        const n = arr.length;
        const result = [...arr];
        
        // Sort small runs with insertion sort
        for (let i = 0; i < n; i += MIN_MERGE) {
            const end = Math.min(i + MIN_MERGE - 1, n - 1);
            this.insertionSortRange(result, i, end);
        }
        
        // Start merging from size MIN_MERGE
        let size = MIN_MERGE;
        while (size < n) {
            for (let start = 0; start < n; start += size * 2) {
                const mid = start + size - 1;
                const end = Math.min(start + size * 2 - 1, n - 1);
                
                if (mid < end) {
                    this.mergeRange(result, start, mid, end);
                }
            }
            size *= 2;
        }
        
        return result;
    }
    
    static insertionSortRange(arr, left, right) {
        for (let i = left + 1; i <= right; i++) {
            const current = arr[i];
            let j = i - 1;
            
            while (j >= left && arr[j] > current) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = current;
        }
    }
    
    static mergeRange(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
        }
        
        while (i < leftArr.length) arr[k++] = leftArr[i++];
        while (j < rightArr.length) arr[k++] = rightArr[j++];
    }
}

// ADVANCED SORTING TECHNIQUES
class AdvancedSorting {
    // Quick Select - Find kth smallest element
    static quickSelect(arr, k) {
        const result = [...arr];
        return this.quickSelectHelper(result, 0, result.length - 1, k - 1);
    }
    
    static quickSelectHelper(arr, low, high, k) {
        if (low <= high) {
            const pivotIndex = SortingAlgorithms.partition(arr, low, high);
            
            if (pivotIndex === k) {
                return arr[pivotIndex];
            } else if (pivotIndex > k) {
                return this.quickSelectHelper(arr, low, pivotIndex - 1, k);
            } else {
                return this.quickSelectHelper(arr, pivotIndex + 1, high, k);
            }
        }
        
        return null;
    }
    
    // External Sort - For data larger than memory
    static externalSort(data, chunkSize = 1000) {
        const chunks = [];
        
        // Phase 1: Sort chunks that fit in memory
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            chunks.push(SortingAlgorithms.mergeSort(chunk));
        }
        
        // Phase 2: Merge sorted chunks
        while (chunks.length > 1) {
            const merged = [];
            for (let i = 0; i < chunks.length; i += 2) {
                if (i + 1 < chunks.length) {
                    merged.push(SortingAlgorithms.merge(chunks[i], chunks[i + 1]));
                } else {
                    merged.push(chunks[i]);
                }
            }
            chunks.splice(0, chunks.length, ...merged);
        }
        
        return chunks[0] || [];
    }
    
    // Stable sorting for objects
    static stableSort(arr, compareFunction) {
        // Add original index to maintain stability
        const indexed = arr.map((item, index) => ({ item, index }));
        
        indexed.sort((a, b) => {
            const result = compareFunction(a.item, b.item);
            return result !== 0 ? result : a.index - b.index;
        });
        
        return indexed.map(({ item }) => item);
    }
}

// PERFORMANCE TESTING
class SortingBenchmark {
    static benchmark(algorithms, testData) {
        const results = {};
        
        for (const [name, algorithm] of Object.entries(algorithms)) {
            const data = [...testData];
            
            console.time(name);
            const sorted = algorithm(data);
            console.timeEnd(name);
            
            results[name] = {
                sorted,
                isSorted: this.isSorted(sorted),
                isStable: this.isStable(data, sorted, (a, b) => a.value - b.value)
            };
        }
        
        return results;
    }
    
    static isSorted(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    }
    
    static isStable(original, sorted, compareFunction) {
        // Implementation depends on data structure
        return true; // Simplified
    }
    
    static generateTestData(size, type = 'random') {
        switch (type) {
            case 'random':
                return Array.from({length: size}, () => Math.floor(Math.random() * 1000));
            case 'sorted':
                return Array.from({length: size}, (_, i) => i);
            case 'reverse':
                return Array.from({length: size}, (_, i) => size - i - 1);
            case 'nearly':
                const arr = Array.from({length: size}, (_, i) => i);
                // Swap 5% of elements
                for (let i = 0; i < size * 0.05; i++) {
                    const a = Math.floor(Math.random() * size);
                    const b = Math.floor(Math.random() * size);
                    [arr[a], arr[b]] = [arr[b], arr[a]];
                }
                return arr;
            default:
                return [];
        }
    }
}

// USAGE EXAMPLES AND TESTING
console.log("=== SORTING ALGORITHMS EXAMPLES ===");

const testArray = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42];
console.log("Original array:", testArray);

// Test different sorting algorithms
console.log("Bubble Sort:", SortingAlgorithms.bubbleSort(testArray));
console.log("Selection Sort:", SortingAlgorithms.selectionSort(testArray));
console.log("Insertion Sort:", SortingAlgorithms.insertionSort(testArray));
console.log("Merge Sort:", SortingAlgorithms.mergeSort(testArray));
console.log("Quick Sort:", SortingAlgorithms.quickSort(testArray));
console.log("Heap Sort:", SortingAlgorithms.heapSort(testArray));

// Test counting sort for small range integers
const countingArray = [4, 2, 2, 8, 3, 3, 1];
console.log("Counting Sort:", SortingAlgorithms.countingSort(countingArray));

// Test quick select
console.log("3rd smallest element:", AdvancedSorting.quickSelect(testArray, 3));

// Performance benchmark
function runBenchmark() {
    const testData = SortingBenchmark.generateTestData(10000, 'random');
    
    const algorithms = {
        'Merge Sort': SortingAlgorithms.mergeSort,
        'Quick Sort': SortingAlgorithms.quickSort,
        'Heap Sort': SortingAlgorithms.heapSort,
        'Tim Sort': SortingAlgorithms.timSort
    };
    
    console.log("\n=== PERFORMANCE BENCHMARK (10,000 elements) ===");
    SortingBenchmark.benchmark(algorithms, testData);
}

runBenchmark();
```
*Notice: Different sorting algorithms excel in different scenarios - understand their trade-offs between time complexity, space complexity, stability, and performance characteristics.*

</div>

<div class="concept-section common-mistakes" data-filter="sorting">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Stability confusion**: Not understanding when stable sorting is required
- **Wrong algorithm choice**: Using O(n²) algorithms for large datasets
- **Recursion depth**: Stack overflow in recursive algorithms like quicksort
- **Pivot selection**: Poor pivot choice leading to O(n²) performance in quicksort
- **Memory usage**: Not considering space complexity, especially for merge sort
- **Integer overflow**: In counting sort with large ranges or many elements

</div>
</details>

</div>

<div class="concept-section interview-questions" data-filter="sorting">

<details>
<summary>💼 <strong>Interview questions</strong></summary>

<div>

**Q: When would you choose merge sort over quicksort?**
A: When you need guaranteed O(n log n) performance, stable sorting, or when dealing with linked lists where random access is expensive.

**Q: What makes a sorting algorithm stable?**
A: A stable sort maintains the relative order of equal elements. Merge sort is stable, quicksort is not (unless specifically implemented to be).

**Q: How do you sort an array with only 0s, 1s, and 2s?**
A: Use Dutch National Flag algorithm (3-way partitioning) for O(n) time, O(1) space solution.

**Q: What's the best sorting algorithm for nearly sorted data?**
A: Insertion sort performs excellently (O(n)) on nearly sorted data, or TimSort which detects and leverages existing runs.

</div>
</details>

</div>

<div class="concept-section connection-map" data-filter="sorting">

🗺️ **Connection map**  
`Divide and Conquer` · `Heap Data Structure` · `Partitioning` · `Stability` · `Time Complexity` · `Quick Select`

</div>

### File Read & Parse {#file-read-parse}

<div class="concept-section definition" data-filter="java algorithms junior">

📋 **Concept Definition**  
**Common pattern for processing structured text files** line-by-line with validation. **Steps**: read file with Files.lines() or BufferedReader, split each line (String.split), filter valid lines (check length, non-empty fields), map to domain objects, handle exceptions. **Best practices**: use try-with-resources for automatic closing, validate before parsing, handle malformed data gracefully, use streams for large files. **Common formats**: CSV (comma-separated), TSV (tab-separated), custom delimiters. **Edge cases**: empty lines, comments, headers, incomplete rows, special characters.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data import**: reading configuration files, CSV data, logs
- **Validation**: ensuring data quality before processing
- **Stream processing**: handle large files efficiently with lazy evaluation
- **Real-world skill**: common in data processing applications

</div>

<div class="runnable-model">

**Runnable mental model**
```java
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

// Parse CSV file with validation
public class FileParseExample {
    
    public static class Record {
        private String name;
        private String category;
        private int value;
        
        public Record(String name, String category, int value) {
            this.name = name;
            this.category = category;
            this.value = value;
        }
        
        @Override
        public String toString() {
            return String.format("Record{name='%s', category='%s', value=%d}", 
                               name, category, value);
        }
    }
    
    public static List<Record> parseFile(Path path) throws Exception {
        try (Stream<String> lines = Files.lines(path)) {
            return lines
                // Trim whitespace
                .map(String::trim)
                
                // Filter out empty lines and comments
                .filter(line -> !line.isEmpty() && !line.startsWith("#"))
                
                // Split by comma
                .map(line -> line.split(",", -1))  // -1 keeps trailing empty strings
                
                // Filter valid rows (at least 3 fields, all non-blank)
                .filter(parts -> parts.length >= 3 && 
                               Arrays.stream(parts).noneMatch(String::isBlank))
                
                // Map to Record objects
                .map(parts -> {
                    try {
                        String name = parts[0].trim();
                        String category = parts[1].trim();
                        int value = Integer.parseInt(parts[2].trim());
                        return new Record(name, category, value);
                    } catch (NumberFormatException e) {
                        // Skip invalid numbers
                        return null;
                    }
                })
                
                // Filter out null records (parsing failures)
                .filter(Objects::nonNull)
                
                // Collect to list
                .toList();
        }
    }
    
    // Alternative: manual approach with more control
    public static List<Record> parseFileManual(String filePath) {
        List<Record> records = new ArrayList<>();
        
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            int lineNumber = 0;
            
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                line = line.trim();
                
                // Skip empty lines and comments
                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }
                
                String[] parts = line.split(",");
                
                // Validate field count
                if (parts.length < 3) {
                    System.err.println("Line " + lineNumber + ": Not enough fields");
                    continue;
                }
                
                // Check for blank fields
                boolean hasBlank = Arrays.stream(parts)
                    .limit(3)
                    .anyMatch(String::isBlank);
                
                if (hasBlank) {
                    System.err.println("Line " + lineNumber + ": Blank field detected");
                    continue;
                }
                
                try {
                    String name = parts[0].trim();
                    String category = parts[1].trim();
                    int value = Integer.parseInt(parts[2].trim());
                    
                    records.add(new Record(name, category, value));
                } catch (NumberFormatException e) {
                    System.err.println("Line " + lineNumber + ": Invalid number format");
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
        
        return records;
    }
    
    public static void main(String[] args) throws Exception {
        // Example file content:
        // # This is a comment
        // Apple,Fruit,5
        // Banana,Fruit,3
        // 
        // Carrot,Vegetable,7
        // ,,  (invalid - blank fields)
        // Tomato,Vegetable,invalid (invalid - bad number)
        
        Path testFile = Path.of("data.csv");
        List<Record> records = parseFile(testFile);
        
        System.out.println("Parsed " + records.size() + " records:");
        records.forEach(System.out::println);
    }
}
```
*Notice: Stream-based parsing is concise and handles large files efficiently with lazy evaluation.*

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Stream API` · `File I/O` · `Data Validation` · `Exception Handling` · `CSV Processing` · `String Manipulation`

</div>

### String Separation & Parsing {#string-separation}

<div class="concept-section definition" data-filter="java junior strings">

📋 **Concept Definition**  
**String splitting techniques** for parsing delimited data. **Methods**: **String.split()** (regex-based, returns array), **StringTokenizer** (legacy, performance), **Pattern.compile()** (reusable regex), **Scanner** (delimiter-based reading). **Common delimiters**: comma, semicolon, tab (\\t), pipe (|), whitespace (\\s+). **Regex patterns**: special characters need escaping (\\. \\| \\$ etc.), character classes [a-z], quantifiers (+, *, ?). **Edge cases**: empty strings, consecutive delimiters, trailing delimiters, quotes with delimiters inside. **Advanced**: CSV with quoted fields, multi-character delimiters, conditional splitting. **Performance**: compile Pattern once for repeated splits.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data parsing**: CSV, TSV, log files, configuration
- **Text processing**: tokenization, word extraction
- **Interview common**: string manipulation questions
- **Real-world**: API responses, file imports, data transformation

</div>

<div class="runnable-model">

**Runnable mental model - Comprehensive String Separation**
```java
import java.util.*;
import java.util.regex.*;
import java.util.stream.*;

public class StringSeparationExamples {
    
    public static void main(String[] args) {
        
        // ========== BASIC SPLIT ==========
        
        // 1. Simple comma split
        String csv = "apple,banana,cherry";
        String[] fruits = csv.split(",");
        // Output: [apple, banana, cherry]
        
        // 2. Split with limit
        String data = "a:b:c:d:e";
        String[] parts1 = data.split(":", 3);  // limit to 3 parts
        // Output: [a, b, c:d:e]
        
        // 3. Split preserving trailing empty strings
        String trailing = "a,b,c,,";
        String[] parts2 = trailing.split(",", -1);  // -1 keeps trailing empty
        // Output: [a, b, c, , ]  (length = 5)
        
        String[] parts3 = trailing.split(",");  // default drops trailing
        // Output: [a, b, c]  (length = 3)
        
        
        // ========== DIFFERENT DELIMITERS ==========
        
        // Semicolon
        String semiData = "name;age;city";
        String[] semiParts = semiData.split(";");
        // Output: [name, age, city]
        
        // Tab-separated
        String tsvData = "Alice\t25\tNYC";
        String[] tsvParts = tsvData.split("\\t");  // \\t for tab
        // Output: [Alice, 25, NYC]
        
        // Pipe delimiter (needs escaping)
        String pipeData = "John|Doe|30";
        String[] pipeParts = pipeData.split("\\|");  // \\| escapes pipe
        // Output: [John, Doe, 30]
        
        // Whitespace (one or more spaces/tabs)
        String spaceData = "alpha   beta  gamma";
        String[] spaceParts = spaceData.split("\\s+");  // \\s+ = one or more whitespace
        // Output: [alpha, beta, gamma]
        
        // Multiple delimiters (comma OR semicolon)
        String mixedData = "a,b;c,d;e";
        String[] mixedParts = mixedData.split("[,;]");  // character class
        // Output: [a, b, c, d, e]
        
        // Dot delimiter (needs escaping)
        String dotData = "192.168.1.1";
        String[] dotParts = dotData.split("\\.");  // \\. escapes dot
        // Output: [192, 168, 1, 1]
        
        
        // ========== ADVANCED REGEX PATTERNS ==========
        
        // Split on digits
        String alphanumeric = "abc123def456ghi";
        String[] alphaParts = alphanumeric.split("\\d+");  // \\d+ = one or more digits
        // Output: [abc, def, ghi]
        
        // Split on non-alphanumeric
        String special = "hello@world#test";
        String[] alphaOnlyParts = special.split("[^a-zA-Z]+");  // [^...] = negation
        // Output: [hello, world, test]
        
        // Split on word boundaries
        String sentence = "Hello, world! How are you?";
        String[] words = sentence.split("\\W+");  // \\W = non-word character
        // Output: [Hello, world, How, are, you]
        
        // Multi-character delimiter
        String multiDelim = "name::age::city";
        String[] multiParts = multiDelim.split("::");
        // Output: [name, age, city]
        
        
        // ========== PATTERN COMPILATION (PERFORMANCE) ==========
        
        // Compile pattern once for repeated use
        Pattern pattern = Pattern.compile(",");
        
        String[] data1 = pattern.split("a,b,c");
        String[] data2 = pattern.split("x,y,z");
        
        // Faster than calling String.split() multiple times
        
        
        // ========== CSV WITH QUOTED FIELDS ==========
        
        // Handle CSV with commas inside quotes: "Smith, John",30,"New York, NY"
        String complexCsv = "\"Smith, John\",30,\"New York, NY\"";
        
        // Regex: split on comma not inside quotes
        String regex = ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)";
        String[] csvParts = complexCsv.split(regex);
        // Output: ["Smith, John", 30, "New York, NY"]
        
        // Remove quotes
        String[] cleaned = Arrays.stream(csvParts)
            .map(s -> s.replaceAll("^\"|\"$", ""))  // remove leading/trailing quotes
            .toArray(String[]::new);
        // Output: [Smith, John, 30, New York, NY]
        
        
        // ========== STRINGTOKENIZER (LEGACY) ==========
        
        String tokenData = "apple,banana;cherry:date";
        StringTokenizer tokenizer = new StringTokenizer(tokenData, ",;:");
        
        List<String> tokens = new ArrayList<>();
        while (tokenizer.hasMoreTokens()) {
            tokens.add(tokenizer.nextToken());
        }
        // Output: [apple, banana, cherry, date]
        
        
        // ========== SCANNER WITH DELIMITER ==========
        
        String scanData = "10,20,30,40,50";
        Scanner scanner = new Scanner(scanData);
        scanner.useDelimiter(",");
        
        List<Integer> numbers = new ArrayList<>();
        while (scanner.hasNextInt()) {
            numbers.add(scanner.nextInt());
        }
        scanner.close();
        // Output: [10, 20, 30, 40, 50]
        
        
        // ========== PRACTICAL EXAMPLES ==========
        
        // Parse log entry
        String logEntry = "2024-01-15 10:30:45 ERROR UserService Failed to save user";
        String[] logParts = logEntry.split("\\s+", 5);  // limit to 5 parts
        String date = logParts[0];         // 2024-01-15
        String time = logParts[1];         // 10:30:45
        String level = logParts[2];        // ERROR
        String service = logParts[3];      // UserService
        String message = logParts[4];      // Failed to save user
        
        // Parse URL query string
        String queryString = "name=John&age=30&city=NYC";
        Map<String, String> params = Arrays.stream(queryString.split("&"))
            .map(param -> param.split("="))
            .collect(Collectors.toMap(
                parts -> parts[0],
                parts -> parts.length > 1 ? parts[1] : ""
            ));
        // Output: {name=John, age=30, city=NYC}
        
        // Parse version string
        String version = "1.2.3-beta";
        String[] versionParts = version.split("[-.]");
        int major = Integer.parseInt(versionParts[0]);    // 1
        int minor = Integer.parseInt(versionParts[1]);    // 2
        int patch = Integer.parseInt(versionParts[2]);    // 3
        String tag = versionParts[3];                     // beta
        
        // Split camelCase string
        String camelCase = "thisIsACamelCaseString";
        String[] camelParts = camelCase.split("(?=[A-Z])");  // lookahead for uppercase
        // Output: [this, Is, A, Camel, Case, String]
        
        // Split on multiple spaces but keep single spaces
        String multiSpace = "word1  word2   word3    word4";
        String normalized = multiSpace.replaceAll("\\s{2,}", " ");  // replace 2+ spaces with 1
        String[] normalizedParts = normalized.split(" ");
        // Output: [word1, word2, word3, word4]
        
        
        // ========== VALIDATION & ERROR HANDLING ==========
        
        String input = "name,age,email";
        String[] fields = input.split(",");
        
        if (fields.length != 3) {
            System.err.println("Expected 3 fields, got " + fields.length);
        }
        
        // Trim whitespace from each field
        String[] trimmed = Arrays.stream(fields)
            .map(String::trim)
            .toArray(String[]::new);
        
        // Filter empty fields
        String[] nonEmpty = Arrays.stream(fields)
            .filter(s -> !s.isEmpty())
            .toArray(String[]::new);
        
        
        // ========== PERFORMANCE COMPARISON ==========
        
        String largeData = String.join(",", Collections.nCopies(10000, "value"));
        
        // Method 1: String.split() (creates array)
        long start1 = System.nanoTime();
        String[] result1 = largeData.split(",");
        long end1 = System.nanoTime();
        System.out.println("String.split(): " + (end1 - start1) + "ns");
        
        // Method 2: Pattern.compile().split() (reusable)
        Pattern p = Pattern.compile(",");
        long start2 = System.nanoTime();
        String[] result2 = p.split(largeData);
        long end2 = System.nanoTime();
        System.out.println("Pattern.split(): " + (end2 - start2) + "ns");
        
        // Method 3: StringTokenizer (no regex overhead)
        long start3 = System.nanoTime();
        StringTokenizer st = new StringTokenizer(largeData, ",");
        List<String> result3 = new ArrayList<>();
        while (st.hasMoreTokens()) {
            result3.add(st.nextToken());
        }
        long end3 = System.nanoTime();
        System.out.println("StringTokenizer: " + (end3 - start3) + "ns");
        
        
        // ========== ADVANCED: CUSTOM DELIMITER LOGIC ==========
        
        // Split but respect quotes and brackets
        String complexString = "method(arg1, arg2), other, \"text, with, commas\"";
        List<String> smartSplit = smartSplit(complexString, ',');
        // Output: [method(arg1, arg2), other, "text, with, commas"]
    }
    
    // Custom split respecting nested structures
    public static List<String> smartSplit(String input, char delimiter) {
        List<String> result = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        int depth = 0;
        boolean inQuotes = false;
        
        for (char c : input.toCharArray()) {
            if (c == '"') {
                inQuotes = !inQuotes;
                current.append(c);
            } else if (!inQuotes && (c == '(' || c == '[' || c == '{')) {
                depth++;
                current.append(c);
            } else if (!inQuotes && (c == ')' || c == ']' || c == '}')) {
                depth--;
                current.append(c);
            } else if (c == delimiter && depth == 0 && !inQuotes) {
                result.add(current.toString().trim());
                current = new StringBuilder();
            } else {
                current.append(c);
            }
        }
        
        if (current.length() > 0) {
            result.add(current.toString().trim());
        }
        
        return result;
    }
}
```
*Notice: String splitting has many edge cases. Choose the right method based on your delimiter complexity and performance requirements.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Not escaping special regex characters (. | $ etc.) in split()
- Forgetting split() drops trailing empty strings by default
- Not handling quotes in CSV data
- Using split() in tight loops instead of compiled Pattern
- Not trimming whitespace after splitting

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Regex` · `String.split()` · `Pattern` · `CSV Parsing` · `Tokenization` · `Data Validation`

</div>

### Try-Catch-Finally Behavior {#try-catch-finally}

<div class="concept-section definition" data-filter="java junior">

📋 **Concept Definition**  
**Exception handling flow** demonstrating finally block always executes. **Execution order**: try → exception occurs → catch → finally (always runs). **Return behavior**: finally executes even if try/catch returns. **Key insight**: finally runs before method returns, enabling cleanup (close resources, release locks). **Try-with-resources**: modern alternative for auto-closing resources. **Edge cases**: finally doesn't run if JVM exits (System.exit()) or thread killed.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Resource cleanup**: ensures resources are released even on errors
- **Guaranteed execution**: finally always runs (except JVM exit)
- **Interview favorite**: tests understanding of exception flow
- **Production code**: critical for database connections, file handles

</div>

<div class="runnable-model">

**Runnable mental model**
```java
public class TryCatchFinallyExample {
    
    // Demonstrates execution flow
    public static int testFlow(int divisor) {
        System.out.println("=== Testing with divisor: " + divisor + " ===");
        
        try {
            System.out.println("1. Entering try block");
            int result = 10 / divisor;
            System.out.println("2. Try block completed, result: " + result);
            return result;
        } catch (ArithmeticException e) {
            System.out.println("3. Caught exception: " + e.getMessage());
            return -1;
        } finally {
            System.out.println("4. Finally block ALWAYS executes");
            // This runs BEFORE the method returns!
        }
    }
    
    // Finally overwrites return value (bad practice)
    public static int finallyOverridesReturn() {
        try {
            return 1;  // This value will be discarded
        } finally {
            return 2;  // BAD: Finally should not return
        }
    }
    
    // Proper resource cleanup pattern
    public static void resourceCleanupExample() {
        Connection connection = null;
        try {
            connection = openDatabaseConnection();
            // Do database operations
            connection.executeQuery("SELECT * FROM users");
        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
        } finally {
            // Cleanup: ALWAYS close connection
            if (connection != null) {
                try {
                    connection.close();
                    System.out.println("Connection closed");
                } catch (SQLException e) {
                    System.err.println("Error closing connection");
                }
            }
        }
    }
    
    // Modern approach: try-with-resources (Java 7+)
    public static void tryWithResourcesExample() {
        // AutoCloseable resources automatically closed
        try (Connection conn = openDatabaseConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users")) {
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                System.out.println(rs.getString("name"));
            }
            // No finally needed - resources auto-closed
        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
        }
    }
    
    // Demonstrate execution order
    public static void main(String[] args) {
        // Test case 1: Normal execution
        System.out.println("\n--- Test 1: Normal execution ---");
        int result1 = testFlow(2);
        System.out.println("Returned value: " + result1 + "\n");
        
        // Output:
        // === Testing with divisor: 2 ===
        // 1. Entering try block
        // 2. Try block completed, result: 5
        // 4. Finally block ALWAYS executes
        // Returned value: 5
        
        // Test case 2: Exception thrown
        System.out.println("\n--- Test 2: Exception case ---");
        int result2 = testFlow(0);
        System.out.println("Returned value: " + result2 + "\n");
        
        // Output:
        // === Testing with divisor: 0 ===
        // 1. Entering try block
        // 3. Caught exception: / by zero
        // 4. Finally block ALWAYS executes
        // Returned value: -1
        
        // Test case 3: Finally overrides return (bad practice)
        System.out.println("\n--- Test 3: Finally override ---");
        int result3 = finallyOverridesReturn();
        System.out.println("Returned value: " + result3);  // Prints 2, not 1!
    }
}
```
*Notice: Finally block executes BEFORE the method returns, making it perfect for cleanup operations.*

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Not knowing finally always executes (even with return in try)
- Thinking finally runs after return statement
- Using return in finally block (anti-pattern)
- Not understanding try-with-resources vs manual finally

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Exception Handling` · `Resource Management` · `Try-with-Resources` · `Flow Control` · `Cleanup Patterns`

</div>

### Static Counter Pattern {#static-counter}

<div class="concept-section definition" data-filter="java oop junior">

📋 **Concept Definition**  
**Static variable pattern** tracking class-level state across all instances. **Use case**: counting total instances created, shared configuration, caching. **Static vs instance**: static belongs to class (one copy), instance belongs to object (copy per object). **Thread safety**: static variables shared between threads require synchronization. **Memory**: static lives in method area, exists for application lifetime. **Inheritance**: static variables not inherited (each class has own).

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Class-level state**: track information across all instances
- **Instance counting**: useful for resource management and debugging
- **Interview question**: tests understanding of static vs instance
- **Design pattern**: basis for Singleton and Factory patterns

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Interface for animal sounds
interface Sound {
    void makeSound();
}

// Dog class with static counter
class Dog implements Sound {
    private String name;
    
    // Static variable - shared by ALL Dog instances
    public static int count = 0;
    
    public Dog(String name) {
        this.name = name;
        count++;  // Increment for every new Dog
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Woof!");
    }
    
    public static int getCount() {
        return count;
    }
}

// Cat class with static counter
class Cat implements Sound {
    private String name;
    
    // Static variable - shared by ALL Cat instances
    public static int count = 0;
    
    public Cat(String name) {
        this.name = name;
        count++;  // Increment for every new Cat
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Meow!");
    }
    
    public static int getCount() {
        return count;
    }
}

// Bird class with static counter
class Bird implements Sound {
    private String name;
    
    public static int count = 0;
    
    public Bird(String name) {
        this.name = name;
        count++;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Tweet!");
    }
    
    public static int getCount() {
        return count;
    }
}

// Demonstration
public class StaticCounterExample {
    public static void main(String[] args) {
        System.out.println("=== Creating Animals ===\n");
        
        // Create dogs
        Dog dog1 = new Dog("Rex");
        Dog dog2 = new Dog("Max");
        Dog dog3 = new Dog("Buddy");
        
        // Create cats
        Cat cat1 = new Cat("Whiskers");
        Cat cat2 = new Cat("Luna");
        
        // Create birds
        Bird bird1 = new Bird("Tweety");
        
        System.out.println("\n=== Animal Sounds ===\n");
        
        // Make sounds
        dog1.makeSound();
        dog2.makeSound();
        dog3.makeSound();
        cat1.makeSound();
        cat2.makeSound();
        bird1.makeSound();
        
        System.out.println("\n=== Animal Counts ===\n");
        
        // Access static counters
        System.out.println("Total Dogs created: " + Dog.count);        // 3
        System.out.println("Total Cats created: " + Cat.count);        // 2
        System.out.println("Total Birds created: " + Bird.count);      // 1
        
        // Alternative: use static method
        System.out.println("\nUsing static methods:");
        System.out.println("Dogs: " + Dog.getCount());
        System.out.println("Cats: " + Cat.getCount());
        System.out.println("Birds: " + Bird.getCount());
        
        System.out.println("\n=== Creating More Animals ===\n");
        
        // Create more animals
        Dog dog4 = new Dog("Charlie");
        Cat cat3 = new Cat("Simba");
        
        dog4.makeSound();
        cat3.makeSound();
        
        System.out.println("\n=== Updated Counts ===\n");
        System.out.println("Total Dogs: " + Dog.count);   // 4
        System.out.println("Total Cats: " + Cat.count);   // 3
        System.out.println("Total Birds: " + Bird.count); // 1 (unchanged)
        
        // Demonstrate polymorphism with counters
        System.out.println("\n=== Polymorphic Array ===\n");
        
        Sound[] animals = {
            new Dog("Fido"),
            new Cat("Garfield"),
            new Bird("Polly"),
            new Dog("Spot"),
            new Cat("Felix")
        };
        
        System.out.println("Making all animals sound:");
        for (Sound animal : animals) {
            animal.makeSound();
        }
        
        System.out.println("\n=== Final Counts ===\n");
        System.out.println("Total Dogs: " + Dog.count);   // 6
        System.out.println("Total Cats: " + Cat.count);   // 5
        System.out.println("Total Birds: " + Bird.count); // 2
    }
}

/* OUTPUT:
=== Creating Animals ===

=== Animal Sounds ===

Rex says: Woof!
Max says: Woof!
Buddy says: Woof!
Whiskers says: Meow!
Luna says: Meow!
Tweety says: Tweet!

=== Animal Counts ===

Total Dogs created: 3
Total Cats created: 2
Total Birds created: 1

Using static methods:
Dogs: 3
Cats: 2
Birds: 1

=== Creating More Animals ===

Charlie says: Woof!
Simba says: Meow!

=== Updated Counts ===

Total Dogs: 4
Total Cats: 3
Total Birds: 1

=== Polymorphic Array ===

Making all animals sound:
Fido says: Woof!
Garfield says: Meow!
Polly says: Tweet!
Spot says: Woof!
Felix says: Meow!

=== Final Counts ===

Total Dogs: 6
Total Cats: 5
Total Birds: 2
*/
```
*Notice: Each class maintains its own static counter, independent of other classes.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "Static variables are shared between all classes" → Each class has its own static variables
- "Can access instance variables from static context" → Static can only access static members
- "Static is always thread-safe" → Requires explicit synchronization for thread safety

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Can't explain difference between static and instance variables
- Don't understand when static counter resets (never, unless explicitly)
- Confuse static variables with instance variables in inheritance

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Static Variables` · `Class Variables` · `Instance Counting` · `Singleton Pattern` · `Thread Safety`

</div>

### Binary Tree & Types {#binary-tree}

<div class="concept-section definition" data-filter="trees junior medior">

📋 **Concept Definition**  
**Hierarchical data structure** where each node has at most two children (left, right). **Node structure**: value/key, left pointer, right pointer, optional parent pointer. **Types**: **Binary Search Tree (BST)** (left < parent < right, O(log n) search), **Complete Binary Tree** (all levels filled except possibly last, filled left-to-right), **Full Binary Tree** (every node has 0 or 2 children), **Perfect Binary Tree** (all leaves at same level), **Balanced Tree** (AVL, Red-Black ensure O(log n) height). **Traversals**: **In-order** (left, root, right - gives sorted order in BST), **Pre-order** (root, left, right - tree copy), **Post-order** (left, right, root - deletion), **Level-order** (BFS, level-by-level). **Height**: longest path from root to leaf. **Applications**: file systems, expression parsing, databases, priority queues.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Efficient search**: BST provides O(log n) search, insert, delete
- **Hierarchical data**: natural representation of tree-like structures
- **Interview staple**: extremely common in coding interviews
- **Foundation**: basis for advanced structures (AVL, Red-Black, B-trees)
- **Real-world**: file systems, DOM tree, decision trees, parsing

</div>

<div class="concept-section performance">

📊 **Time and space complexity**

**Binary Search Tree (BST)**:
- **Search/Insert/Delete**: O(log n) average, O(n) worst case (unbalanced)
- **Space**: O(n) for storing nodes, O(h) recursion stack where h = height

**Balanced Trees (AVL, Red-Black)**:
- **All operations**: O(log n) guaranteed
- **Space**: O(n) with overhead for balance information

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// Binary Tree Node structure
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// Binary Search Tree implementation
class BinarySearchTree {
    private TreeNode root;
    
    // INSERT into BST
    public void insert(int val) {
        root = insertRec(root, val);
    }
    
    private TreeNode insertRec(TreeNode node, int val) {
        // Base case: empty spot found
        if (node == null) {
            return new TreeNode(val);
        }
        
        // Recursive case: go left or right
        if (val < node.val) {
            node.left = insertRec(node.left, val);
        } else if (val > node.val) {
            node.right = insertRec(node.right, val);
        }
        // If val == node.val, don't insert duplicates
        
        return node;
    }
    
    // SEARCH in BST
    public boolean search(int val) {
        return searchRec(root, val);
    }
    
    private boolean searchRec(TreeNode node, int val) {
        // Base cases
        if (node == null) return false;
        if (node.val == val) return true;
        
        // Recursive search
        if (val < node.val) {
            return searchRec(node.left, val);
        } else {
            return searchRec(node.right, val);
        }
    }
    
    // DELETE from BST
    public void delete(int val) {
        root = deleteRec(root, val);
    }
    
    private TreeNode deleteRec(TreeNode node, int val) {
        if (node == null) return null;
        
        // Find the node to delete
        if (val < node.val) {
            node.left = deleteRec(node.left, val);
        } else if (val > node.val) {
            node.right = deleteRec(node.right, val);
        } else {
            // Node found - handle 3 cases
            
            // Case 1: Leaf node (no children)
            if (node.left == null && node.right == null) {
                return null;
            }
            
            // Case 2: One child
            if (node.left == null) {
                return node.right;
            }
            if (node.right == null) {
                return node.left;
            }
            
            // Case 3: Two children
            // Find inorder successor (smallest in right subtree)
            TreeNode successor = findMin(node.right);
            node.val = successor.val;
            node.right = deleteRec(node.right, successor.val);
        }
        
        return node;
    }
    
    private TreeNode findMin(TreeNode node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }
    
    // TRAVERSALS
    
    // In-order: Left → Root → Right (gives sorted order)
    public void inorder() {
        System.out.print("In-order: ");
        inorderRec(root);
        System.out.println();
    }
    
    private void inorderRec(TreeNode node) {
        if (node != null) {
            inorderRec(node.left);
            System.out.print(node.val + " ");
            inorderRec(node.right);
        }
    }
    
    // Pre-order: Root → Left → Right
    public void preorder() {
        System.out.print("Pre-order: ");
        preorderRec(root);
        System.out.println();
    }
    
    private void preorderRec(TreeNode node) {
        if (node != null) {
            System.out.print(node.val + " ");
            preorderRec(node.left);
            preorderRec(node.right);
        }
    }
    
    // Post-order: Left → Right → Root
    public void postorder() {
        System.out.print("Post-order: ");
        postorderRec(root);
        System.out.println();
    }
    
    private void postorderRec(TreeNode node) {
        if (node != null) {
            postorderRec(node.left);
            postorderRec(node.right);
            System.out.print(node.val + " ");
        }
    }
    
    // Level-order: BFS traversal
    public void levelorder() {
        if (root == null) return;
        
        System.out.print("Level-order: ");
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            System.out.print(node.val + " ");
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        System.out.println();
    }
    
    // UTILITY METHODS
    
    // Get height of tree
    public int height() {
        return heightRec(root);
    }
    
    private int heightRec(TreeNode node) {
        if (node == null) return 0;
        return 1 + Math.max(heightRec(node.left), heightRec(node.right));
    }
    
    // Check if tree is balanced
    public boolean isBalanced() {
        return checkBalance(root) != -1;
    }
    
    private int checkBalance(TreeNode node) {
        if (node == null) return 0;
        
        int leftHeight = checkBalance(node.left);
        if (leftHeight == -1) return -1;
        
        int rightHeight = checkBalance(node.right);
        if (rightHeight == -1) return -1;
        
        // Check if balanced
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;  // Not balanced
        }
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    // Validate BST property
    public boolean isBST() {
        return isBSTRec(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    private boolean isBSTRec(TreeNode node, long min, long max) {
        if (node == null) return true;
        
        // Current node must be within range
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        // Recursively check left and right subtrees
        return isBSTRec(node.left, min, node.val) &&
               isBSTRec(node.right, node.val, max);
    }
}

// DEMONSTRATION
public class BinaryTreeDemo {
    public static void main(String[] args) {
        BinarySearchTree bst = new BinarySearchTree();
        
        System.out.println("=== Building BST ===\n");
        
        // Insert values
        int[] values = {50, 30, 70, 20, 40, 60, 80};
        System.out.println("Inserting: " + Arrays.toString(values));
        
        for (int val : values) {
            bst.insert(val);
        }
        
        /*
         * Tree structure:
         *        50
         *       /  \
         *      30   70
         *     / \   / \
         *    20 40 60 80
         */
        
        System.out.println("\n=== Traversals ===\n");
        bst.inorder();      // 20 30 40 50 60 70 80 (sorted!)
        bst.preorder();     // 50 30 20 40 70 60 80
        bst.postorder();    // 20 40 30 60 80 70 50
        bst.levelorder();   // 50 30 70 20 40 60 80
        
        System.out.println("\n=== Tree Properties ===\n");
        System.out.println("Height: " + bst.height());           // 3
        System.out.println("Is BST: " + bst.isBST());           // true
        System.out.println("Is Balanced: " + bst.isBalanced()); // true
        
        System.out.println("\n=== Search Operations ===\n");
        System.out.println("Search 40: " + bst.search(40));  // true
        System.out.println("Search 25: " + bst.search(25));  // false
        
        System.out.println("\n=== Delete Operations ===\n");
        
        // Delete leaf node
        System.out.println("Deleting 20 (leaf)");
        bst.delete(20);
        bst.inorder();  // 30 40 50 60 70 80
        
        // Delete node with one child
        System.out.println("\nDeleting 30 (one child)");
        bst.delete(30);
        bst.inorder();  // 40 50 60 70 80
        
        // Delete node with two children
        System.out.println("\nDeleting 50 (two children)");
        bst.delete(50);
        bst.inorder();  // 40 60 70 80
    }
}

/* OUTPUT:
=== Building BST ===

Inserting: [50, 30, 70, 20, 40, 60, 80]

=== Traversals ===

In-order: 20 30 40 50 60 70 80 
Pre-order: 50 30 20 40 70 60 80 
Post-order: 20 40 30 60 80 70 50 
Level-order: 50 30 70 20 40 60 80 

=== Tree Properties ===

Height: 3
Is BST: true
Is Balanced: true

=== Search Operations ===

Search 40: true
Search 25: false

=== Delete Operations ===

Deleting 20 (leaf)
In-order: 30 40 50 60 70 80 

Deleting 30 (one child)
In-order: 40 50 60 70 80 

Deleting 50 (two children)
In-order: 40 60 70 80 
*/
```
*Notice: BST maintains left < parent < right property, enabling efficient O(log n) operations when balanced.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "All binary trees are binary search trees" → BST has specific ordering property
- "BST always gives O(log n) operations" → Worst case is O(n) when unbalanced (sorted insertion)
- "Balanced tree means perfect binary tree" → Balanced means height difference ≤ 1, not all leaves at same level
- "In-order traversal works for any binary tree to get sorted order" → Only for BST

</div>
</details>

</div>

<div class="concept-section interview-pitfalls">

<details>
<summary>⚠️ <strong>Interview pitfalls</strong></summary>

<div>

- Not understanding the difference between Complete, Full, and Perfect binary trees
- Forgetting to handle all 3 delete cases in BST (leaf, one child, two children)
- Not validating BST property correctly (must check entire subtree ranges, not just direct children)
- Confusing DFS traversals (in-order, pre-order, post-order) with BFS (level-order)
- Not considering unbalanced tree performance degradation

</div>
</details>

</div>

<div class="concept-section interview-questions" data-filter="trees">

<details>
<summary>💼 <strong>Interview questions</strong></summary>

<div>

**Q: What's the difference between Complete and Full binary tree?**
A: Complete: all levels filled except possibly last (filled left-to-right). Full: every node has 0 or 2 children.

**Q: When does BST degrade to O(n) complexity?**
A: When tree becomes unbalanced (e.g., inserting sorted data creates linked list). Use AVL or Red-Black trees for guaranteed O(log n).

**Q: Which traversal gives sorted order in BST?**
A: In-order traversal (left → root → right) produces sorted sequence.

**Q: How do you validate if a binary tree is a BST?**
A: Check that every node's value is within valid range based on ancestors. Left subtree must have all values < node, right subtree all values > node.

**Q: What's the advantage of balanced trees (AVL, Red-Black)?**
A: Guarantee O(log n) height through rotations, preventing worst-case O(n) degradation.

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Binary Search Tree` · `Tree Traversal` · `Balanced Trees` · `AVL Tree` · `Red-Black Tree` · `Heap` · `Recursion`

</div>

### Prefix Sum & Difference Array {#prefix-sum}

<div class="concept-section definition">

📋 **Concept Definition**  
**Prefix Sum** = precomputed cumulative sums enabling **O(1) range sum queries**. **Pattern**: prefix[i] = sum of elements [0...i]. **Range sum [L, R]** = prefix[R] - prefix[L-1]. **Applications**: cumulative statistics, subarray sum problems, 2D matrix range queries.

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// SUBARRAY SUM EQUALS K (LeetCode 560)
public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixSumCount = new HashMap<>();
    prefixSumCount.put(0, 1);
    int count = 0, sum = 0;
    
    for (int num : nums) {
        sum += num;
        if (prefixSumCount.containsKey(sum - k)) {
            count += prefixSumCount.get(sum - k);
        }
        prefixSumCount.put(sum, prefixSumCount.getOrDefault(sum, 0) + 1);
    }
    return count;
}
```

</div>

### Monotonic Stack {#monotonic-stack}

<div class="concept-section definition">

📋 **Concept Definition**  
**Monotonic Stack** maintains **strictly increasing/decreasing order**. For each element, pop all smaller/larger elements before pushing. **Use cases**: Next Greater Element, Stock Span, Largest Rectangle. **Time**: O(n).

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// NEXT GREATER ELEMENT
public int[] nextGreaterElement(int[] nums) {
    int[] result = new int[nums.length];
    Arrays.fill(result, -1);
    Stack<Integer> stack = new Stack<>();
    
    for (int i = 0; i < nums.length; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
}
```

</div>

### Kadane's Algorithm {#kadanes-algorithm}

<div class="concept-section definition">

📋 **Concept Definition**  
**Kadane's Algorithm** finds **maximum subarray sum** in **O(n)**. Formula: maxEndingHere = max(num, maxEndingHere + num).

</div>

<div class="runnable-model">

**Runnable mental model**
```java
public int maxSubArray(int[] nums) {
    int maxSoFar = nums[0], maxEndingHere = nums[0];
    for (int i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}
```

</div>

### Union-Find (DSU) {#union-find}

<div class="concept-section definition">

📋 **Concept Definition**  
**Union-Find** tracks **connected components** in **O(α(n)) ≈ O(1)**. Operations: find (with path compression), union (by rank).

</div>

<div class="runnable-model">

**Runnable mental model**
```java
class UnionFind {
    private int[] parent, rank;
    
    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    public int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    public boolean union(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX == rootY) return false;
        
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        return true;
    }
}
```

</div>

### LRU Cache {#lru-cache}

<div class="concept-section definition">

📋 **Concept Definition**  
**LRU Cache** evicts **Least Recently Used** item. Implementation: HashMap + Doubly Linked List for O(1) operations.

</div>

<div class="runnable-model">

**Runnable mental model**
```java
class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }
    
    private Map<Integer, Node> cache;
    private Node head, tail;
    private int capacity;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        cache = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!cache.containsKey(key)) return -1;
        Node node = cache.get(key);
        remove(node);
        addToFront(node);
        return node.value;
    }
    
    public void put(int key, int value) {
        if (cache.containsKey(key)) remove(cache.get(key));
        Node node = new Node(key, value);
        addToFront(node);
        cache.put(key, node);
        
        if (cache.size() > capacity) {
            Node lru = tail.prev;
            remove(lru);
            cache.remove(lru.key);
        }
    }
    
    private void addToFront(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
    
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}
```

</div>

### Graph Algorithms {#graph-algorithms-extended}

<div class="concept-section definition">

📋 **Concept Definition**  
**BFS** = shortest path (unweighted). **DFS** = cycle detection, components. **Dijkstra** = shortest path (weighted, non-negative).

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// DIJKSTRA
public int[] dijkstra(int[][] graph, int start) {
    int n = graph.length;
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;
    
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    pq.offer(new int[]{start, 0});
    
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int node = curr[0], d = curr[1];
        if (d > dist[node]) continue;
        
        for (int neighbor = 0; neighbor < n; neighbor++) {
            if (graph[node][neighbor] != 0) {
                int newDist = dist[node] + graph[node][neighbor];
                if (newDist < dist[neighbor]) {
                    dist[neighbor] = newDist;
                    pq.offer(new int[]{neighbor, newDist});
                }
            }
        }
    }
    return dist;
}
```

</div>

### Dynamic Programming {#dp-extended}

<div class="concept-section definition">

📋 **Concept Definition**  
**DP** breaks problems into overlapping subproblems. Common patterns: Knapsack, LIS, LCS, Coin Change.

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// COIN CHANGE
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}

// LONGEST INCREASING SUBSEQUENCE
public int lengthOfLIS(int[] nums) {
    int[] dp = new int[nums.length];
    Arrays.fill(dp, 1);
    
    for (int i = 1; i < nums.length; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return Arrays.stream(dp).max().getAsInt();
}
```

</div>

### Trie (Prefix Tree) {#trie}

<div class="concept-section definition">

📋 **Concept Definition**  
**Trie** stores strings for **O(m) prefix searches**. Applications: autocomplete, spell checker.

</div>

<div class="runnable-model">

**Runnable mental model**
```java
class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    private TrieNode root = new TrieNode();
    
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new TrieNode();
            }
            node = node.children[idx];
        }
        node.isEnd = true;
    }
    
    public boolean search(String word) {
        TrieNode node = searchPrefix(word);
        return node != null && node.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null;
    }
    
    private TrieNode searchPrefix(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return null;
            node = node.children[idx];
        }
        return node;
    }
}
```

</div>

### Topological Sort {#topological-sort}

<div class="concept-section definition">

📋 **Concept Definition**  
**Topological Sort** orders DAG vertices. Use Kahn's algorithm (BFS with indegree). Applications: task scheduling, dependencies.

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// COURSE SCHEDULE II
public int[] findOrder(int numCourses, int[][] prerequisites) {
    List<Integer>[] graph = new ArrayList[numCourses];
    int[] indegree = new int[numCourses];
    
    for (int i = 0; i < numCourses; i++) graph[i] = new ArrayList<>();
    for (int[] p : prerequisites) {
        graph[p[1]].add(p[0]);
        indegree[p[0]]++;
    }
    
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) queue.offer(i);
    }
    
    int[] order = new int[numCourses];
    int index = 0;
    
    while (!queue.isEmpty()) {
        int course = queue.poll();
        order[index++] = course;
        for (int next : graph[course]) {
            if (--indegree[next] == 0) queue.offer(next);
        }
    }
    return index == numCourses ? order : new int[0];
}
```

</div>

### Backtracking {#backtracking}

<div class="concept-section definition">

📋 **Concept Definition**  
**Backtracking** explores solutions incrementally. Pattern: choose → explore → unchoose. Applications: N-Queens, Sudoku, permutations.

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// PERMUTATIONS
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), nums, new boolean[nums.length]);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> curr, 
                      int[] nums, boolean[] used) {
    if (curr.size() == nums.length) {
        result.add(new ArrayList<>(curr));
        return;
    }
    
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        curr.add(nums[i]);
        used[i] = true;
        backtrack(result, curr, nums, used);
        curr.remove(curr.size() - 1);
        used[i] = false;
    }
}
```

</div>

### Intervals {#intervals}

<div class="concept-section definition">

📋 **Concept Definition**  
**Interval problems** handle overlapping ranges. Key: sort by start, check overlaps.

</div>

<div class="runnable-model">

**Runnable mental model**
```java
// MERGE INTERVALS
public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> result = new ArrayList<>();
    int[] curr = intervals[0];
    
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= curr[1]) {
            curr[1] = Math.max(curr[1], intervals[i][1]);
        } else {
            result.add(curr);
            curr = intervals[i];
        }
    }
    result.add(curr);
    return result.toArray(new int[result.size()][]);
}
```

</div>

## Summary

Algorithms and data structures form the foundation of efficient problem-solving in computer science. The journey from basic patterns like Two Pointers and Sliding Window to advanced techniques like Binary Search and various Sorting algorithms demonstrates the evolution from brute force to optimized solutions.

Key takeaways include understanding when to apply specific patterns (Two Pointers for sorted data, Sliding Window for subarrays, Binary Search for sorted search spaces), recognizing time and space complexity trade-offs, and mastering both iterative and recursive approaches. These algorithms serve as building blocks for more complex problems and are essential for technical interviews and real-world applications.

The progression from O(n²) brute force solutions to O(n log n) or O(n) optimized algorithms showcases the power of algorithmic thinking and the importance of choosing the right tool for each problem domain.

### Advanced Algorithms and Data Structures

The Hungarian version contains many additional advanced algorithms that are essential for senior-level positions and complex problem-solving scenarios. These include:

#### Graph Algorithms
- **Dijkstra's Algorithm**: For shortest path problems in weighted graphs
- **Topological Sort**: For dependency resolution and task scheduling
- **Union-Find (Disjoint Set Union)**: For connectivity problems and MST algorithms
- **BFS/DFS variants**: For graph traversal and cycle detection

#### Dynamic Programming Patterns
- **Longest Increasing Subsequence (LIS)**: Classic DP with O(n log n) optimization
- **Edit Distance**: String similarity and transformation problems
- **Coin Change**: Classic DP for optimization problems
- **Knapsack Problem**: Resource allocation and optimization
- **Tree DP**: Dynamic programming on tree structures

#### Advanced Data Structures
- **LRU Cache**: Least Recently Used cache implementation
- **Trie (Prefix Tree)**: For string search and autocomplete
- **Heap/Priority Queue patterns**: For top-K problems and scheduling
- **Segment Tree/Fenwick Tree**: For range queries and updates

#### String Algorithms
- **KMP Algorithm**: For pattern matching
- **Rabin-Karp**: Rolling hash for string search
- **Manacher's Algorithm**: For palindrome detection
- **Suffix Arrays**: For substring problems

#### Advanced Techniques
- **Binary Search on Answer**: For optimization problems
- **Quickselect**: For finding k-th element
- **Backtracking**: For N-Queens, Sudoku, and permutation problems
- **Sweep Line**: For computational geometry problems

#### Tree Algorithms
- **Lowest Common Ancestor (LCA)**: For tree queries
- **Tree Traversal**: In-order, pre-order, post-order patterns
- **Path Sum Problems**: Various tree path calculations

These advanced topics represent the comprehensive coverage that the Hungarian version provides. For a complete understanding of all algorithms and their implementations, refer to the Hungarian version which contains detailed explanations, code examples, and interview questions for each topic.

### Learning Path Recommendations

1. **Foundation** (covered in English version): Two Pointers, Sliding Window, Binary Search, Sorting
2. **Intermediate**: Prefix Sum, Monotonic Stack, Intervals, Kadane's Algorithm
3. **Advanced**: Graph algorithms, Dynamic Programming, Advanced Data Structures
4. **Expert**: String algorithms, Tree algorithms, Computational geometry

This structured approach ensures a solid foundation before moving to more complex algorithmic concepts.

### Binary Search on Answer {#binary-search-answer}
<!-- tags: binary-search, optimization, answer, search-space, medior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*Binary Search on Answer (also called Binary Search on Result) is a technique where we binary search on the answer space rather than the input array. We define a predicate function that tells us whether a given answer is "too small" or "too large", then binary search to find the optimal answer. This is particularly useful for optimization problems where we can easily verify if a solution works, but finding the optimal solution directly is difficult.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Time**: O(log(answer_range) × verification_cost)
- **Space**: O(1) for the binary search itself
- **Answer range**: depends on problem constraints
- **Verification**: usually O(n) or O(n log n)

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**
```pseudo
FUNCTION BinarySearchOnAnswer(low, high, canAchieve)
  WHILE low < high DO
    mid ← low + (high - low) / 2
    
    IF canAchieve(mid) THEN
      high ← mid  // mid is feasible, try smaller
    ELSE
      low ← mid + 1  // mid not feasible, need larger
    END IF
  END WHILE
  
  RETURN low  // minimum feasible answer
END FUNCTION

FUNCTION FindMaximumAnswer(low, high, canAchieve)
  WHILE low < high DO
    mid ← low + (high - low + 1) / 2  // bias towards upper half
    
    IF canAchieve(mid) THEN
      low ← mid  // mid is feasible, try larger
    ELSE
      high ← mid - 1  // mid not feasible, need smaller
    END IF
  END WHILE
  
  RETURN low  // maximum feasible answer
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="search optimization">

**Runnable mental model**
```javascript
// BINARY SEARCH ON ANSWER - COMPREHENSIVE IMPLEMENTATION

class BinarySearchOnAnswer {
    // 1. MINIMUM CAPACITY TO SHIP PACKAGES WITHIN D DAYS
    static shipWithinDays(weights, days) {
        const canShipWithCapacity = (capacity) => {
            let daysNeeded = 1;
            let currentWeight = 0;
            
            for (let weight of weights) {
                if (currentWeight + weight > capacity) {
                    daysNeeded++;
                    currentWeight = weight;
                    if (daysNeeded > days) return false;
                } else {
                    currentWeight += weight;
                }
            }
            
            return true;
        };
        
        let left = Math.max(...weights); // minimum possible capacity
        let right = weights.reduce((sum, w) => sum + w, 0); // maximum possible capacity
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (canShipWithCapacity(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    // 2. SPLIT ARRAY LARGEST SUM
    static splitArray(nums, m) {
        const canSplit = (maxSum) => {
            let subarrays = 1;
            let currentSum = 0;
            
            for (let num of nums) {
                if (currentSum + num > maxSum) {
                    subarrays++;
                    currentSum = num;
                    if (subarrays > m) return false;
                } else {
                    currentSum += num;
                }
            }
            
            return true;
        };
        
        let left = Math.max(...nums);
        let right = nums.reduce((sum, num) => sum + num, 0);
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (canSplit(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    // 3. KTH SMALLEST ELEMENT IN MULTIPLICATION TABLE
    static findKthNumber(m, n, k) {
        const countLessEqual = (target) => {
            let count = 0;
            for (let i = 1; i <= m; i++) {
                count += Math.min(Math.floor(target / i), n);
            }
            return count;
        };
        
        let left = 1;
        let right = m * n;
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (countLessEqual(mid) < k) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
    
    // 4. MINIMUM TIME TO COMPLETE TRIPS
    static minimumTime(time, totalTrips) {
        const canCompleteTrips = (timeLimit) => {
            let trips = 0;
            for (let t of time) {
                trips += Math.floor(timeLimit / t);
                if (trips >= totalTrips) return true;
            }
            return false;
        };
        
        let left = 1;
        let right = Math.min(...time) * totalTrips;
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (canCompleteTrips(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    // 5. MAGNETIC FORCE BETWEEN BALLS
    static maxDistance(position, m) {
        position.sort((a, b) => a - b);
        
        const canPlaceBalls = (force) => {
            let count = 1;
            let lastPosition = position[0];
            
            for (let i = 1; i < position.length; i++) {
                if (position[i] - lastPosition >= force) {
                    count++;
                    lastPosition = position[i];
                    if (count >= m) return true;
                }
            }
            
            return false;
        };
        
        let left = 1;
        let right = position[position.length - 1] - position[0];
        
        while (left < right) {
            const mid = Math.floor(left + (right - left + 1) / 2);
            
            if (canPlaceBalls(mid)) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }
        
        return left;
    }
    
    // 6. MINIMUM NUMBER OF DAYS TO MAKE M BOUQUETS
    static minDays(bloomDay, m, k) {
        if (bloomDay.length < m * k) return -1;
        
        const canMakeBouquets = (days) => {
            let bouquets = 0;
            let consecutive = 0;
            
            for (let day of bloomDay) {
                if (day <= days) {
                    consecutive++;
                    if (consecutive === k) {
                        bouquets++;
                        consecutive = 0;
                        if (bouquets >= m) return true;
                    }
                } else {
                    consecutive = 0;
                }
            }
            
            return false;
        };
        
        let left = Math.min(...bloomDay);
        let right = Math.max(...bloomDay);
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (canMakeBouquets(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    // 7. SWIM IN RISING WATER
    static swimInWater(grid) {
        const n = grid.length;
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        
        const canReach = (timeLimit) => {
            if (grid[0][0] > timeLimit) return false;
            
            const visited = Array(n).fill().map(() => Array(n).fill(false));
            const queue = [[0, 0]];
            visited[0][0] = true;
            
            while (queue.length > 0) {
                const [row, col] = queue.shift();
                
                if (row === n - 1 && col === n - 1) return true;
                
                for (let [dr, dc] of directions) {
                    const newRow = row + dr;
                    const newCol = col + dc;
                    
                    if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n &&
                        !visited[newRow][newCol] && grid[newRow][newCol] <= timeLimit) {
                        visited[newRow][newCol] = true;
                        queue.push([newRow, newCol]);
                    }
                }
            }
            
            return false;
        };
        
        let left = Math.max(grid[0][0], grid[n-1][n-1]);
        let right = n * n - 1;
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (canReach(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
}

// USAGE EXAMPLES
console.log("=== BINARY SEARCH ON ANSWER EXAMPLES ===");

// Test Ship Within Days
const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Ship within 5 days:", BinarySearchOnAnswer.shipWithinDays(weights, 5)); // 15

// Test Split Array
const nums = [7, 2, 5, 10, 8];
console.log("Split array into 2 parts:", BinarySearchOnAnswer.splitArray(nums, 2)); // 18

// Test Kth in Multiplication Table
console.log("3rd smallest in 3x3 table:", BinarySearchOnAnswer.findKthNumber(3, 3, 5)); // 3

// Test Minimum Time for Trips
const time = [1, 2, 3];
console.log("Time for 5 trips:", BinarySearchOnAnswer.minimumTime(time, 5)); // 3

// Test Magnetic Force
const positions = [1, 2, 3, 4, 7];
console.log("Max magnetic force:", BinarySearchOnAnswer.maxDistance(positions, 3)); // 3

// Test Bouquet Days
const bloomDay = [1, 10, 3, 10, 2];
console.log("Min days for bouquets:", BinarySearchOnAnswer.minDays(bloomDay, 3, 1)); // 3

// Test Swim in Water
const grid = [
    [0, 2],
    [1, 3]
];
console.log("Swim time:", BinarySearchOnAnswer.swimInWater(grid)); // 3
```
*Notice: Binary Search on Answer transforms optimization problems into verification problems, making complex constraints solvable in logarithmic time.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Answer range bounds**: incorrectly setting left/right bounds for the search space
- **Predicate function**: wrong logic in the "can achieve" verification function
- **Minimum vs Maximum**: confusing which direction to search (use different mid calculations)
- **Edge cases**: not handling impossible cases (return -1 when no solution exists)
- **Integer overflow**: answer range might exceed integer limits
- **Off-by-one**: incorrect boundary updates in the binary search loop

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Resource allocation**: bandwidth, capacity, time constraints
- **Scheduling problems**: deadline optimization, task distribution
- **Game theory**: optimal strategy with limited resources
- **Engineering**: material optimization, cost minimization
- **Competitive programming**: optimization contest problems

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Capacity To Ship Packages Within D Days"** → Classic binary search on answer template
2. **"Split Array Largest Sum"** → Minimize the maximum subarray sum
3. **"Kth Smallest Element in Multiplication Table"** → Search in implicitly sorted space
4. **"Magnetic Force Between Balls"** → Maximize minimum distance constraint
5. **"Minimum Days to Make m Bouquets"** → Resource availability over time

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Binary Search` · `Optimization` · `Greedy Algorithms` · `Dynamic Programming` · `Graph Algorithms`

</div>

<div class="tags">
  <span class="tag">binary-search</span>
  <span class="tag">optimization</span>
  <span class="tag">answer</span>
  <span class="tag">search-space</span>
  <span class="tag">medior</span>
</div>

### Quickselect {#quickselect}
<!-- tags: quickselect, selection, partition, kth-element, optimization, medior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*Quickselect is a selection algorithm to find the k-th smallest (or largest) element in an unordered list. It's related to QuickSort but instead of recursing into both sides, it only recurses into the side that contains the target element. Average time complexity is O(n), making it faster than sorting the entire array just to find one element. The algorithm uses the partition function from QuickSort to divide elements around a pivot.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Best case**: O(n) time, O(1) space
- **Average case**: O(n) time, O(log n) space (recursion)
- **Worst case**: O(n²) time, O(n) space (bad pivot choices)
- **Space**: O(log n) recursion stack on average

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**
```pseudo
FUNCTION Quickselect(A, left, right, k)
  IF left = right THEN
    RETURN A[left]
  END IF
  
  pivotIndex ← Partition(A, left, right)
  
  IF k = pivotIndex THEN
    RETURN A[k]
  ELSE IF k < pivotIndex THEN
    RETURN Quickselect(A, left, pivotIndex - 1, k)
  ELSE
    RETURN Quickselect(A, pivotIndex + 1, right, k)
  END IF
END FUNCTION

FUNCTION Partition(A, left, right)
  pivot ← A[right]
  i ← left - 1
  
  FOR j ← left TO right - 1 DO
    IF A[j] ≤ pivot THEN
      i ← i + 1
      SWAP(A[i], A[j])
    END IF
  END FOR
  
  SWAP(A[i + 1], A[right])
  RETURN i + 1
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="selection optimization">

**Runnable mental model**
```javascript
// QUICKSELECT - COMPREHENSIVE IMPLEMENTATION

class Quickselect {
    // 1. BASIC QUICKSELECT - KTH SMALLEST ELEMENT
    static quickselect(nums, k) {
        // Convert to 0-based index
        return this.quickselectHelper(nums, 0, nums.length - 1, k - 1);
    }
    
    static quickselectHelper(nums, left, right, k) {
        if (left === right) {
            return nums[left];
        }
        
        // Randomized pivot for better average case
        const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
        [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];
        
        const pivotIndex = this.partition(nums, left, right);
        
        if (k === pivotIndex) {
            return nums[k];
        } else if (k < pivotIndex) {
            return this.quickselectHelper(nums, left, pivotIndex - 1, k);
        } else {
            return this.quickselectHelper(nums, pivotIndex + 1, right, k);
        }
    }
    
    static partition(nums, left, right) {
        const pivot = nums[right];
        let i = left - 1;
        
        for (let j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                i++;
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        }
        
        [nums[i + 1], nums[right]] = [nums[right], nums[i + 1]];
        return i + 1;
    }
    
    // 2. KTH LARGEST ELEMENT
    static findKthLargest(nums, k) {
        return this.quickselectHelper(nums, 0, nums.length - 1, nums.length - k);
    }
    
    // 3. ITERATIVE QUICKSELECT (avoids recursion stack)
    static quickselectIterative(nums, k) {
        let left = 0;
        let right = nums.length - 1;
        k = k - 1; // Convert to 0-based
        
        while (left <= right) {
            const pivotIndex = this.partition(nums, left, right);
            
            if (pivotIndex === k) {
                return nums[pivotIndex];
            } else if (pivotIndex > k) {
                right = pivotIndex - 1;
            } else {
                left = pivotIndex + 1;
            }
        }
        
        return -1; // Should never reach here
    }
    
    // 4. MEDIAN OF MEDIANS (guaranteed O(n) worst case)
    static medianOfMedians(nums, k) {
        if (nums.length <= 5) {
            nums.sort((a, b) => a - b);
            return nums[k - 1];
        }
        
        // Divide into groups of 5
        const medians = [];
        for (let i = 0; i < nums.length; i += 5) {
            const group = nums.slice(i, Math.min(i + 5, nums.length));
            group.sort((a, b) => a - b);
            medians.push(group[Math.floor(group.length / 2)]);
        }
        
        // Find median of medians
        const medianOfMedians = this.medianOfMedians(medians, Math.ceil(medians.length / 2));
        
        // Partition around median of medians
        const pivotIndex = this.partitionAroundValue(nums, medianOfMedians);
        
        if (pivotIndex === k - 1) {
            return nums[pivotIndex];
        } else if (pivotIndex > k - 1) {
            return this.medianOfMedians(nums.slice(0, pivotIndex), k);
        } else {
            return this.medianOfMedians(nums.slice(pivotIndex + 1), k - pivotIndex - 1);
        }
    }
    
    static partitionAroundValue(nums, value) {
        let i = 0;
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] < value) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        
        // Place the pivot value
        for (let j = i; j < nums.length; j++) {
            if (nums[j] === value) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                break;
            }
        }
        
        return i;
    }
    
    // 5. TOP K FREQUENT ELEMENTS
    static topKFrequent(nums, k) {
        const freqMap = new Map();
        for (let num of nums) {
            freqMap.set(num, (freqMap.get(num) || 0) + 1);
        }
        
        const unique = Array.from(freqMap.keys());
        
        // Use quickselect on frequency values
        this.quickselectByFrequency(unique, freqMap, 0, unique.length - 1, unique.length - k);
        
        return unique.slice(unique.length - k);
    }
    
    static quickselectByFrequency(nums, freqMap, left, right, k) {
        if (left === right) return;
        
        const pivotIndex = this.partitionByFrequency(nums, freqMap, left, right);
        
        if (pivotIndex === k) {
            return;
        } else if (pivotIndex > k) {
            this.quickselectByFrequency(nums, freqMap, left, pivotIndex - 1, k);
        } else {
            this.quickselectByFrequency(nums, freqMap, pivotIndex + 1, right, k);
        }
    }
    
    static partitionByFrequency(nums, freqMap, left, right) {
        const pivotFreq = freqMap.get(nums[right]);
        let i = left - 1;
        
        for (let j = left; j < right; j++) {
            if (freqMap.get(nums[j]) <= pivotFreq) {
                i++;
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        }
        
        [nums[i + 1], nums[right]] = [nums[right], nums[i + 1]];
        return i + 1;
    }
    
    // 6. WIGGLE SORT II
    static wiggleSort(nums) {
        const n = nums.length;
        const median = this.quickselect([...nums], Math.floor((n + 1) / 2));
        
        // Virtual indexing for O(1) space
        const index = (i) => (1 + 2 * i) % (n | 1);
        
        let i = 0, j = 0, k = n - 1;
        
        while (j <= k) {
            if (nums[index(j)] > median) {
                [nums[index(i)], nums[index(j)]] = [nums[index(j)], nums[index(i)]];
                i++;
                j++;
            } else if (nums[index(j)] < median) {
                [nums[index(j)], nums[index(k)]] = [nums[index(k)], nums[index(j)]];
                k--;
            } else {
                j++;
            }
        }
    }
}

// USAGE EXAMPLES
console.log("=== QUICKSELECT EXAMPLES ===");

// Test Basic Quickselect
const nums1 = [3, 2, 1, 5, 6, 4];
console.log("2nd smallest:", Quickselect.quickselect([...nums1], 2)); // 2
console.log("4th smallest:", Quickselect.quickselect([...nums1], 4)); // 4

// Test Kth Largest
console.log("2nd largest:", Quickselect.findKthLargest([...nums1], 2)); // 5

// Test Iterative Version
console.log("3rd smallest (iterative):", Quickselect.quickselectIterative([...nums1], 3)); // 3

// Test Top K Frequent
const nums2 = [1, 1, 1, 2, 2, 3];
console.log("Top 2 frequent:", Quickselect.topKFrequent(nums2, 2)); // [1, 2]

// Test Median of Medians
const nums3 = [7, 10, 4, 3, 20, 15];
console.log("3rd smallest (MoM):", Quickselect.medianOfMedians([...nums3], 3)); // 7

// Performance comparison
function performanceComparison() {
    const largeArray = Array.from({length: 100000}, () => Math.floor(Math.random() * 100000));
    const k = 50000;
    
    console.time("Quickselect");
    Quickselect.quickselect([...largeArray], k);
    console.timeEnd("Quickselect");
    
    console.time("Sort and select");
    const sorted = [...largeArray].sort((a, b) => a - b);
    const result = sorted[k - 1];
    console.timeEnd("Sort and select");
    
    console.log("Quickselect is much faster for finding single elements!");
}

performanceComparison();
```
*Notice: Quickselect efficiently finds the k-th element without fully sorting the array, achieving O(n) average time complexity.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Index confusion**: mixing 0-based and 1-based indexing for k
- **Pivot selection**: always choosing the last element can lead to O(n²) worst case
- **Partition logic**: incorrect comparison operators in partition function
- **Recursion depth**: not using iterative version for very large arrays
- **Original array modification**: forgetting that quickselect modifies the input array
- **Edge cases**: not handling arrays with duplicate elements correctly

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Statistics**: finding median, percentiles, quartiles
- **Database queries**: ORDER BY with LIMIT optimization
- **Operating systems**: process scheduling, memory management
- **Graphics**: color quantization, image processing
- **Game development**: leaderboards, ranking systems

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Kth Largest Element in an Array"** → Basic quickselect implementation
2. **"Top K Frequent Elements"** → Quickselect with custom comparator
3. **"Wiggle Sort II"** → Advanced application with virtual indexing
4. **"Find Median from Data Stream"** → Online algorithm with two heaps
5. **"Kth Smallest Element in a Sorted Matrix"** → Binary search + matrix properties

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`QuickSort` · `Heap` · `Binary Search` · `Median of Medians` · `Intro Select`

</div>

<div class="tags">
  <span class="tag">quickselect</span>
  <span class="tag">selection</span>
  <span class="tag">partition</span>
  <span class="tag">optimization</span>
  <span class="tag">medior</span>
</div>

### Union-Find (Disjoint Set Union) {#union-find}
<!-- tags: union-find, dsu, connectivity, graph, optimization, medior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*Union-Find (also called Disjoint Set Union or DSU) is a data structure that tracks a set of elements partitioned into disjoint subsets. It supports two primary operations: Find (determine which subset an element belongs to) and Union (merge two subsets). With path compression and union by rank optimizations, both operations run in nearly constant amortized time O(α(n)), where α is the inverse Ackermann function. It's essential for connectivity problems, minimum spanning trees, and detecting cycles in graphs.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Find**: O(α(n)) amortized (nearly constant)
- **Union**: O(α(n)) amortized (nearly constant)
- **Space**: O(n) for parent and rank arrays
- **Initialization**: O(n) time
- **α(n)**: inverse Ackermann function, practically ≤ 4 for all reasonable n

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**
```pseudo
STRUCTURE UnionFind
  parent[]  // parent[i] points to parent of i
  rank[]    // rank[i] is the approximate depth of tree rooted at i
  
  FUNCTION Initialize(n)
    FOR i ← 0 TO n-1 DO
      parent[i] ← i    // each element is its own parent
      rank[i] ← 0      // initial rank is 0
    END FOR
  END FUNCTION
  
  FUNCTION Find(x)
    IF parent[x] ≠ x THEN
      parent[x] ← Find(parent[x])  // path compression
    END IF
    RETURN parent[x]
  END FUNCTION
  
  FUNCTION Union(x, y)
    rootX ← Find(x)
    rootY ← Find(y)
    
    IF rootX = rootY THEN
      RETURN  // already in same set
    END IF
    
    // Union by rank
    IF rank[rootX] < rank[rootY] THEN
      parent[rootX] ← rootY
    ELSE IF rank[rootX] > rank[rootY] THEN
      parent[rootY] ← rootX
    ELSE
      parent[rootY] ← rootX
      rank[rootX] ← rank[rootX] + 1
    END IF
  END FUNCTION
END STRUCTURE
```

</div>

<div class="runnable-model" data-filter="graph connectivity">

**Runnable mental model**
```javascript
// UNION-FIND - COMPREHENSIVE IMPLEMENTATION

class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.components = n; // number of connected components
        this.sizes = new Array(n).fill(1); // size of each component
    }
    
    // Find with path compression
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // path compression
        }
        return this.parent[x];
    }
    
    // Union by rank
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) {
            return false; // already connected
        }
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
            this.sizes[rootY] += this.sizes[rootX];
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
            this.sizes[rootX] += this.sizes[rootY];
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
            this.sizes[rootX] += this.sizes[rootY];
        }
        
        this.components--;
        return true;
    }
    
    // Check if two elements are connected
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
    
    // Get size of component containing x
    getSize(x) {
        return this.sizes[this.find(x)];
    }
    
    // Get number of connected components
    getComponents() {
        return this.components;
    }
    
    // Get all components as arrays
    getAllComponents() {
        const groups = new Map();
        
        for (let i = 0; i < this.parent.length; i++) {
            const root = this.find(i);
            if (!groups.has(root)) {
                groups.set(root, []);
            }
            groups.get(root).push(i);
        }
        
        return Array.from(groups.values());
    }
}

// APPLICATIONS OF UNION-FIND

class UnionFindApplications {
    // 1. NUMBER OF ISLANDS
    static numIslands(grid) {
        if (!grid || grid.length === 0) return 0;
        
        const rows = grid.length;
        const cols = grid[0].length;
        const uf = new UnionFind(rows * cols + 1); // +1 for water dummy node
        const waterNode = rows * cols;
        
        const getIndex = (r, c) => r * cols + c;
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === '0') {
                    uf.union(getIndex(r, c), waterNode);
                } else {
                    // Connect to adjacent land cells
                    for (let [dr, dc] of directions) {
                        const nr = r + dr;
                        const nc = c + dc;
                        
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
                            uf.union(getIndex(r, c), getIndex(nr, nc));
                        }
                    }
                }
            }
        }
        
        return uf.getComponents() - 1; // subtract water component
    }
    
    // 2. ACCOUNTS MERGE
    static accountsMerge(accounts) {
        const uf = new UnionFind(accounts.length);
        const emailToId = new Map();
        
        // Build email to account ID mapping
        for (let i = 0; i < accounts.length; i++) {
            for (let j = 1; j < accounts[i].length; j++) {
                const email = accounts[i][j];
                if (emailToId.has(email)) {
                    uf.union(i, emailToId.get(email));
                } else {
                    emailToId.set(email, i);
                }
            }
        }
        
        // Group emails by root account
        const groups = new Map();
        for (let [email, id] of emailToId) {
            const root = uf.find(id);
            if (!groups.has(root)) {
                groups.set(root, new Set());
            }
            groups.get(root).add(email);
        }
        
        // Build result
        const result = [];
        for (let [rootId, emails] of groups) {
            const sortedEmails = Array.from(emails).sort();
            result.push([accounts[rootId][0], ...sortedEmails]);
        }
        
        return result;
    }
    
    // 3. REDUNDANT CONNECTION
    static findRedundantConnection(edges) {
        const uf = new UnionFind(edges.length + 1);
        
        for (let [u, v] of edges) {
            if (uf.connected(u, v)) {
                return [u, v]; // this edge creates a cycle
            }
            uf.union(u, v);
        }
        
        return [];
    }
    
    // 4. MOST STONES REMOVED
    static removeStones(stones) {
        const n = stones.length;
        const uf = new UnionFind(n);
        
        // Connect stones in same row or column
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (stones[i][0] === stones[j][0] || stones[i][1] === stones[j][1]) {
                    uf.union(i, j);
                }
            }
        }
        
        return n - uf.getComponents();
    }
    
    // 5. SATISFIABILITY OF EQUALITY EQUATIONS
    static equationsPossible(equations) {
        const uf = new UnionFind(26); // for 26 letters
        
        // First pass: process equality equations
        for (let eq of equations) {
            if (eq[1] === '=') {
                const x = eq.charCodeAt(0) - 'a'.charCodeAt(0);
                const y = eq.charCodeAt(3) - 'a'.charCodeAt(0);
                uf.union(x, y);
            }
        }
        
        // Second pass: check inequality equations
        for (let eq of equations) {
            if (eq[1] === '!') {
                const x = eq.charCodeAt(0) - 'a'.charCodeAt(0);
                const y = eq.charCodeAt(3) - 'a'.charCodeAt(0);
                if (uf.connected(x, y)) {
                    return false; // contradiction
                }
            }
        }
        
        return true;
    }
}

// USAGE EXAMPLES
console.log("=== UNION-FIND EXAMPLES ===");

// Test Basic Union-Find
const uf = new UnionFind(10);
uf.union(0, 1);
uf.union(1, 2);
uf.union(3, 4);
console.log("Connected (0,2):", uf.connected(0, 2)); // true
console.log("Connected (0,3):", uf.connected(0, 3)); // false
console.log("Components:", uf.getComponents()); // 7
console.log("Size of component with 0:", uf.getSize(0)); // 3

// Test Number of Islands
const grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
];
console.log("Number of islands:", UnionFindApplications.numIslands(grid)); // 1

// Test Accounts Merge
const accounts = [
    ["John","johnsmith@mail.com","john_newyork@mail.com"],
    ["John","johnsmith@mail.com","john00@mail.com"],
    ["Mary","mary@mail.com"],
    ["John","johnnybravo@mail.com"]
];
console.log("Merged accounts:", UnionFindApplications.accountsMerge(accounts));

// Test Redundant Connection
const edges = [[1,2],[1,3],[2,3]];
console.log("Redundant connection:", UnionFindApplications.findRedundantConnection(edges)); // [2,3]

// Test Stones Removal
const stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]];
console.log("Stones removed:", UnionFindApplications.removeStones(stones)); // 5

// Test Equality Equations
const equations = ["a==b","b!=a"];
console.log("Equations possible:", UnionFindApplications.equationsPossible(equations)); // false
```
*Notice: Union-Find efficiently manages disjoint sets with nearly constant time operations, making it perfect for connectivity and grouping problems.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Path compression**: forgetting to implement path compression in find operation
- **Union by rank**: not using union by rank, leading to tall trees and slower operations
- **Root finding**: calling find on intermediate nodes instead of always finding the true root
- **Cycle detection**: incorrectly using union-find for cycle detection (need to check connection before union)
- **Index bounds**: off-by-one errors when mapping 2D coordinates to 1D indices
- **Component counting**: forgetting to update component count in union operation

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Graph connectivity**: checking if graph is connected, finding connected components
- **Minimum spanning tree**: Kruskal's algorithm uses union-find for cycle detection
- **Network reliability**: determining network connectivity and failure analysis
- **Image processing**: flood fill, connected component labeling
- **Social networks**: finding friend groups, community detection

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Number of Islands"** → 2D grid connectivity with union-find
2. **"Accounts Merge"** → Grouping based on shared properties
3. **"Redundant Connection"** → Cycle detection in undirected graph
4. **"Most Stones Removed with Same Row or Column"** → Maximizing removals in connected components
5. **"Satisfiability of Equality Equations"** → Constraint satisfaction with union-find

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Kruskal's MST` · `Graph Connectivity` · `DFS/BFS` · `Tarjan's Algorithm` · `Cycle Detection`

</div>

<div class="tags">
  <span class="tag">union-find</span>
  <span class="tag">dsu</span>
  <span class="tag">graph</span>
  <span class="tag">optimization</span>
  <span class="tag">medior</span>
</div>

### Dynamic Programming Patterns {#dp-patterns}
<!-- tags: dynamic-programming, dp, optimization, memoization, tabulation, medior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*Dynamic Programming (DP) is an algorithmic paradigm that solves complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant calculations. It applies to problems with overlapping subproblems and optimal substructure. Two main approaches: **Memoization** (top-down, recursive with caching) and **Tabulation** (bottom-up, iterative table filling). Common patterns include Linear DP (Fibonacci, Climbing Stairs), 2D DP (Edit Distance, LCS), Interval DP (Matrix Chain), Tree DP, and Bitmask DP.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Time**: Usually O(number of states × transition cost)
- **Space**: O(number of states) for memoization/tabulation
- **Space optimization**: Often reducible to O(1) or O(k) using rolling arrays
- **Typical patterns**: O(n), O(n²), O(n³) depending on problem dimensions

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**

**Memoization Template**
```pseudo
FUNCTION dpMemo(state, memo)
  IF state is base case THEN
    RETURN base_value
  END IF
  
  IF memo[state] is computed THEN
    RETURN memo[state]
  END IF
  
  result ← compute using recursive calls
  memo[state] ← result
  RETURN result
END FUNCTION
```

**Tabulation Template**
```pseudo
FUNCTION dpTabulation(n)
  dp ← NEW ARRAY[n+1]
  dp[0] ← base_case_value
  
  FOR i ← 1 TO n DO
    dp[i] ← compute using dp[j] where j < i
  END FOR
  
  RETURN dp[n]
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="dp optimization">

**Runnable mental model**
```javascript
// DYNAMIC PROGRAMMING PATTERNS - COMPREHENSIVE IMPLEMENTATION

class DynamicProgramming {
    // 1. FIBONACCI - Basic DP Pattern
    static fibonacci(n) {
        if (n <= 1) return n;
        
        // Space-optimized O(1) solution
        let prev2 = 0, prev1 = 1;
        
        for (let i = 2; i <= n; i++) {
            const current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
    
    // 2. CLIMBING STAIRS
    static climbStairs(n) {
        if (n <= 2) return n;
        
        let first = 1, second = 2;
        
        for (let i = 3; i <= n; i++) {
            const third = first + second;
            first = second;
            second = third;
        }
        
        return second;
    }
    
    // 3. COIN CHANGE - Unbounded Knapsack
    static coinChange(coins, amount) {
        const dp = new Array(amount + 1).fill(Infinity);
        dp[0] = 0;
        
        for (let i = 1; i <= amount; i++) {
            for (let coin of coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return dp[amount] === Infinity ? -1 : dp[amount];
    }
    
    // 4. LONGEST INCREASING SUBSEQUENCE (LIS)
    static lengthOfLIS(nums) {
        if (nums.length === 0) return 0;
        
        // O(n²) DP solution
        const dp = new Array(nums.length).fill(1);
        let maxLength = 1;
        
        for (let i = 1; i < nums.length; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLength = Math.max(maxLength, dp[i]);
        }
        
        return maxLength;
    }
    
    // 4b. LIS with Binary Search - O(n log n)
    static lengthOfLISOptimal(nums) {
        const tails = [];
        
        for (let num of nums) {
            let left = 0, right = tails.length;
            
            // Binary search for insertion position
            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                if (tails[mid] < num) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            
            if (left === tails.length) {
                tails.push(num);
            } else {
                tails[left] = num;
            }
        }
        
        return tails.length;
    }
    
    // 5. EDIT DISTANCE (Levenshtein Distance)
    static minDistance(word1, word2) {
        const m = word1.length;
        const n = word2.length;
        
        // Space-optimized to O(min(m,n))
        if (m < n) {
            return this.minDistance(word2, word1);
        }
        
        let prev = Array.from({length: n + 1}, (_, i) => i);
        
        for (let i = 1; i <= m; i++) {
            const curr = new Array(n + 1);
            curr[0] = i;
            
            for (let j = 1; j <= n; j++) {
                if (word1[i - 1] === word2[j - 1]) {
                    curr[j] = prev[j - 1];
                } else {
                    curr[j] = 1 + Math.min(
                        prev[j],     // deletion
                        curr[j - 1], // insertion
                        prev[j - 1]  // substitution
                    );
                }
            }
            
            prev = curr;
        }
        
        return prev[n];
    }
    
    // 6. LONGEST COMMON SUBSEQUENCE (LCS)
    static longestCommonSubsequence(text1, text2) {
        const m = text1.length;
        const n = text2.length;
        
        // Space-optimized
        let prev = new Array(n + 1).fill(0);
        
        for (let i = 1; i <= m; i++) {
            const curr = new Array(n + 1).fill(0);
            
            for (let j = 1; j <= n; j++) {
                if (text1[i - 1] === text2[j - 1]) {
                    curr[j] = prev[j - 1] + 1;
                } else {
                    curr[j] = Math.max(prev[j], curr[j - 1]);
                }
            }
            
            prev = curr;
        }
        
        return prev[n];
    }
    
    // 7. 0/1 KNAPSACK
    static knapsack(weights, values, capacity) {
        const n = weights.length;
        
        // Space-optimized to O(capacity)
        let prev = new Array(capacity + 1).fill(0);
        
        for (let i = 0; i < n; i++) {
            const curr = new Array(capacity + 1).fill(0);
            
            for (let w = 0; w <= capacity; w++) {
                // Don't take item i
                curr[w] = prev[w];
                
                // Take item i if possible
                if (weights[i] <= w) {
                    curr[w] = Math.max(curr[w], prev[w - weights[i]] + values[i]);
                }
            }
            
            prev = curr;
        }
        
        return prev[capacity];
    }
    
    // 8. HOUSE ROBBER
    static rob(nums) {
        if (nums.length === 0) return 0;
        if (nums.length === 1) return nums[0];
        
        let prev2 = 0;
        let prev1 = nums[0];
        
        for (let i = 1; i < nums.length; i++) {
            const current = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
    
    // 9. HOUSE ROBBER II (Circular)
    static robCircular(nums) {
        if (nums.length === 0) return 0;
        if (nums.length === 1) return nums[0];
        if (nums.length === 2) return Math.max(nums[0], nums[1]);
        
        // Case 1: Rob houses 0 to n-2 (exclude last)
        const rob1 = this.robLinear(nums.slice(0, -1));
        
        // Case 2: Rob houses 1 to n-1 (exclude first)
        const rob2 = this.robLinear(nums.slice(1));
        
        return Math.max(rob1, rob2);
    }
    
    static robLinear(nums) {
        let prev2 = 0, prev1 = 0;
        
        for (let num of nums) {
            const current = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
    
    // 10. PALINDROMIC SUBSTRINGS
    static countSubstrings(s) {
        const n = s.length;
        let count = 0;
        
        // dp[i][j] represents whether s[i...j] is palindrome
        const dp = Array(n).fill().map(() => Array(n).fill(false));
        
        // Every single character is a palindrome
        for (let i = 0; i < n; i++) {
            dp[i][i] = true;
            count++;
        }
        
        // Check for 2-character palindromes
        for (let i = 0; i < n - 1; i++) {
            if (s[i] === s[i + 1]) {
                dp[i][i + 1] = true;
                count++;
            }
        }
        
        // Check for palindromes of length 3 and more
        for (let length = 3; length <= n; length++) {
            for (let i = 0; i <= n - length; i++) {
                const j = i + length - 1;
                
                if (s[i] === s[j] && dp[i + 1][j - 1]) {
                    dp[i][j] = true;
                    count++;
                }
            }
        }
        
        return count;
    }
    
    // 11. WORD BREAK
    static wordBreak(s, wordDict) {
        const wordSet = new Set(wordDict);
        const dp = new Array(s.length + 1).fill(false);
        dp[0] = true;
        
        for (let i = 1; i <= s.length; i++) {
            for (let j = 0; j < i; j++) {
                if (dp[j] && wordSet.has(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        
        return dp[s.length];
    }
    
    // 12. UNIQUE PATHS
    static uniquePaths(m, n) {
        // Space-optimized to O(min(m,n))
        if (m > n) {
            return this.uniquePaths(n, m);
        }
        
        let dp = new Array(m).fill(1);
        
        for (let j = 1; j < n; j++) {
            for (let i = 1; i < m; i++) {
                dp[i] += dp[i - 1];
            }
        }
        
        return dp[m - 1];
    }
}

// USAGE EXAMPLES
console.log("=== DYNAMIC PROGRAMMING EXAMPLES ===");

// Test Fibonacci
console.log("Fibonacci(10):", DynamicProgramming.fibonacci(10)); // 55

// Test Climbing Stairs
console.log("Climbing 5 stairs:", DynamicProgramming.climbStairs(5)); // 8

// Test Coin Change
console.log("Coin change for 11:", DynamicProgramming.coinChange([1, 2, 5], 11)); // 3

// Test LIS
console.log("LIS [10,9,2,5,3,7,101,18]:", DynamicProgramming.lengthOfLIS([10,9,2,5,3,7,101,18])); // 4
console.log("LIS Optimal:", DynamicProgramming.lengthOfLISOptimal([10,9,2,5,3,7,101,18])); // 4

// Test Edit Distance
console.log("Edit distance 'horse' -> 'ros':", DynamicProgramming.minDistance("horse", "ros")); // 3

// Test LCS
console.log("LCS 'abcde' & 'ace':", DynamicProgramming.longestCommonSubsequence("abcde", "ace")); // 3

// Test Knapsack
const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
console.log("Knapsack capacity 7:", DynamicProgramming.knapsack(weights, values, 7)); // 9

// Test House Robber
console.log("House robber [2,7,9,3,1]:", DynamicProgramming.rob([2,7,9,3,1])); // 12
console.log("House robber circular [2,3,2]:", DynamicProgramming.robCircular([2,3,2])); // 3

// Test Palindromic Substrings
console.log("Palindromic substrings 'abc':", DynamicProgramming.countSubstrings("abc")); // 3
console.log("Palindromic substrings 'aaa':", DynamicProgramming.countSubstrings("aaa")); // 6

// Test Word Break
console.log("Word break 'leetcode':", DynamicProgramming.wordBreak("leetcode", ["leet", "code"])); // true

// Test Unique Paths
console.log("Unique paths 3x7:", DynamicProgramming.uniquePaths(3, 7)); // 28
```
*Notice: Dynamic Programming transforms recursive problems with overlapping subproblems into efficient iterative solutions by storing intermediate results.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Base case**: incorrectly defining base cases leading to wrong results
- **State definition**: choosing suboptimal state representation
- **Transition**: wrong recurrence relation or missing cases
- **Index bounds**: off-by-one errors in array indexing
- **Space optimization**: incorrectly optimizing space, losing necessary information
- **Overlapping subproblems**: not recognizing that the problem has optimal substructure

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Optimization problems**: resource allocation, scheduling, pathfinding
- **String algorithms**: edit distance, pattern matching, parsing
- **Game theory**: optimal strategies, minimax with memoization
- **Bioinformatics**: sequence alignment, gene prediction
- **Economics**: portfolio optimization, investment strategies

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Climbing Stairs"** → Basic 1D DP introduction
2. **"Coin Change"** → Unbounded knapsack pattern
3. **"Longest Increasing Subsequence"** → Classic O(n²) and O(n log n) solutions
4. **"Edit Distance"** → 2D DP with three operations
5. **"House Robber"** → Linear and circular variants

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Recursion` · `Memoization` · `Greedy Algorithms` · `Graph Algorithms` · `String Algorithms`

</div>

<div class="tags">
  <span class="tag">dynamic-programming</span>
  <span class="tag">dp</span>
  <span class="tag">optimization</span>
  <span class="tag">memoization</span>
  <span class="tag">medior</span>
</div>

### Graph Algorithms {#graph-algorithms}
<!-- tags: graph, bfs, dfs, dijkstra, topological-sort, shortest-path, medior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*Graph algorithms operate on graph data structures consisting of vertices (nodes) and edges (connections). Core algorithms include **BFS** (Breadth-First Search) for shortest unweighted paths and level-order traversal, **DFS** (Depth-First Search) for connectivity and cycle detection, **Dijkstra's Algorithm** for shortest weighted paths with non-negative weights, and **Topological Sort** for ordering vertices in DAGs. These algorithms form the foundation for solving connectivity, pathfinding, scheduling, and network analysis problems.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **BFS/DFS**: O(V + E) time, O(V) space
- **Dijkstra**: O((V + E) log V) with binary heap, O(V²) with array
- **Topological Sort**: O(V + E) time, O(V) space
- **V**: number of vertices, **E**: number of edges
- **Space**: O(V) for visited arrays, queues, stacks

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**

**BFS (Breadth-First Search)**
```pseudo
FUNCTION BFS(graph, start)
  visited ← SET()
  queue ← QUEUE([start])
  visited.add(start)
  
  WHILE NOT queue.empty() DO
    current ← queue.dequeue()
    process(current)
    
    FOR neighbor IN graph[current] DO
      IF neighbor NOT IN visited THEN
        visited.add(neighbor)
        queue.enqueue(neighbor)
      END IF
    END FOR
  END WHILE
END FUNCTION
```

**DFS (Depth-First Search)**
```pseudo
FUNCTION DFS(graph, start, visited)
  visited.add(start)
  process(start)
  
  FOR neighbor IN graph[start] DO
    IF neighbor NOT IN visited THEN
      DFS(graph, neighbor, visited)
    END IF
  END FOR
END FUNCTION
```

**Dijkstra's Algorithm**
```pseudo
FUNCTION Dijkstra(graph, start)
  dist ← MAP()
  pq ← PRIORITY_QUEUE()
  
  FOR vertex IN graph DO
    dist[vertex] ← INFINITY
  END FOR
  
  dist[start] ← 0
  pq.push((0, start))
  
  WHILE NOT pq.empty() DO
    (currentDist, current) ← pq.pop()
    
    IF currentDist > dist[current] THEN
      CONTINUE
    END IF
    
    FOR (neighbor, weight) IN graph[current] DO
      newDist ← dist[current] + weight
      IF newDist < dist[neighbor] THEN
        dist[neighbor] ← newDist
        pq.push((newDist, neighbor))
      END IF
    END FOR
  END WHILE
  
  RETURN dist
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="graph">

**Runnable mental model**
```javascript
// GRAPH ALGORITHMS - COMPREHENSIVE IMPLEMENTATION

class Graph {
    constructor(directed = false) {
        this.adjList = new Map();
        this.directed = directed;
    }
    
    addVertex(vertex) {
        if (!this.adjList.has(vertex)) {
            this.adjList.set(vertex, []);
        }
    }
    
    addEdge(v1, v2, weight = 1) {
        this.addVertex(v1);
        this.addVertex(v2);
        
        this.adjList.get(v1).push({ node: v2, weight });
        
        if (!this.directed) {
            this.adjList.get(v2).push({ node: v1, weight });
        }
    }
    
    getVertices() {
        return Array.from(this.adjList.keys());
    }
    
    getNeighbors(vertex) {
        return this.adjList.get(vertex) || [];
    }
}

class GraphAlgorithms {
    // 1. BREADTH-FIRST SEARCH (BFS)
    static bfs(graph, start) {
        const visited = new Set();
        const queue = [start];
        const result = [];
        
        visited.add(start);
        
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);
            
            for (let neighbor of graph.getNeighbors(current)) {
                if (!visited.has(neighbor.node)) {
                    visited.add(neighbor.node);
                    queue.push(neighbor.node);
                }
            }
        }
        
        return result;
    }
    
    // 2. DEPTH-FIRST SEARCH (DFS) - Recursive
    static dfs(graph, start, visited = new Set(), result = []) {
        visited.add(start);
        result.push(start);
        
        for (let neighbor of graph.getNeighbors(start)) {
            if (!visited.has(neighbor.node)) {
                this.dfs(graph, neighbor.node, visited, result);
            }
        }
        
        return result;
    }
    
    // 3. DFS - Iterative
    static dfsIterative(graph, start) {
        const visited = new Set();
        const stack = [start];
        const result = [];
        
        while (stack.length > 0) {
            const current = stack.pop();
            
            if (!visited.has(current)) {
                visited.add(current);
                result.push(current);
                
                // Add neighbors in reverse order to maintain left-to-right traversal
                const neighbors = graph.getNeighbors(current);
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    if (!visited.has(neighbors[i].node)) {
                        stack.push(neighbors[i].node);
                    }
                }
            }
        }
        
        return result;
    }
    
    // 4. SHORTEST PATH BFS (Unweighted)
    static shortestPathBFS(graph, start, end) {
        const visited = new Set();
        const queue = [{ node: start, path: [start] }];
        
        visited.add(start);
        
        while (queue.length > 0) {
            const { node: current, path } = queue.shift();
            
            if (current === end) {
                return path;
            }
            
            for (let neighbor of graph.getNeighbors(current)) {
                if (!visited.has(neighbor.node)) {
                    visited.add(neighbor.node);
                    queue.push({
                        node: neighbor.node,
                        path: [...path, neighbor.node]
                    });
                }
            }
        }
        
        return null; // Path not found
    }
    
    // 5. DIJKSTRA'S ALGORITHM (Weighted Shortest Path)
    static dijkstra(graph, start) {
        const distances = new Map();
        const previous = new Map();
        const pq = new MinPriorityQueue();
        
        // Initialize distances
        for (let vertex of graph.getVertices()) {
            distances.set(vertex, vertex === start ? 0 : Infinity);
            previous.set(vertex, null);
        }
        
        pq.enqueue(start, 0);
        
        while (!pq.isEmpty()) {
            const current = pq.dequeue().element;
            
            for (let neighbor of graph.getNeighbors(current)) {
                const alt = distances.get(current) + neighbor.weight;
                
                if (alt < distances.get(neighbor.node)) {
                    distances.set(neighbor.node, alt);
                    previous.set(neighbor.node, current);
                    pq.enqueue(neighbor.node, alt);
                }
            }
        }
        
        return { distances, previous };
    }
    
    // 6. GET PATH FROM DIJKSTRA RESULT
    static getPath(previous, start, end) {
        const path = [];
        let current = end;
        
        while (current !== null) {
            path.unshift(current);
            current = previous.get(current);
        }
        
        return path[0] === start ? path : null;
    }
    
    // 7. TOPOLOGICAL SORT (Kahn's Algorithm)
    static topologicalSort(graph) {
        const inDegree = new Map();
        const result = [];
        const queue = [];
        
        // Initialize in-degrees
        for (let vertex of graph.getVertices()) {
            inDegree.set(vertex, 0);
        }
        
        // Calculate in-degrees
        for (let vertex of graph.getVertices()) {
            for (let neighbor of graph.getNeighbors(vertex)) {
                inDegree.set(neighbor.node, inDegree.get(neighbor.node) + 1);
            }
        }
        
        // Find vertices with no incoming edges
        for (let [vertex, degree] of inDegree) {
            if (degree === 0) {
                queue.push(vertex);
            }
        }
        
        // Process vertices
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);
            
            for (let neighbor of graph.getNeighbors(current)) {
                inDegree.set(neighbor.node, inDegree.get(neighbor.node) - 1);
                
                if (inDegree.get(neighbor.node) === 0) {
                    queue.push(neighbor.node);
                }
            }
        }
        
        // Check for cycles
        return result.length === graph.getVertices().length ? result : null;
    }
    
    // 8. DETECT CYCLE IN DIRECTED GRAPH
    static hasCycleDirected(graph) {
        const color = new Map(); // 0: white, 1: gray, 2: black
        
        for (let vertex of graph.getVertices()) {
            color.set(vertex, 0);
        }
        
        const dfsVisit = (vertex) => {
            color.set(vertex, 1); // Gray
            
            for (let neighbor of graph.getNeighbors(vertex)) {
                if (color.get(neighbor.node) === 1) {
                    return true; // Back edge found (cycle)
                }
                
                if (color.get(neighbor.node) === 0 && dfsVisit(neighbor.node)) {
                    return true;
                }
            }
            
            color.set(vertex, 2); // Black
            return false;
        };
        
        for (let vertex of graph.getVertices()) {
            if (color.get(vertex) === 0) {
                if (dfsVisit(vertex)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // 9. DETECT CYCLE IN UNDIRECTED GRAPH
    static hasCycleUndirected(graph) {
        const visited = new Set();
        
        const dfs = (vertex, parent) => {
            visited.add(vertex);
            
            for (let neighbor of graph.getNeighbors(vertex)) {
                if (!visited.has(neighbor.node)) {
                    if (dfs(neighbor.node, vertex)) {
                        return true;
                    }
                } else if (neighbor.node !== parent) {
                    return true; // Back edge to non-parent
                }
            }
            
            return false;
        };
        
        for (let vertex of graph.getVertices()) {
            if (!visited.has(vertex)) {
                if (dfs(vertex, null)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // 10. CONNECTED COMPONENTS
    static connectedComponents(graph) {
        const visited = new Set();
        const components = [];
        
        for (let vertex of graph.getVertices()) {
            if (!visited.has(vertex)) {
                const component = [];
                
                const dfs = (v) => {
                    visited.add(v);
                    component.push(v);
                    
                    for (let neighbor of graph.getNeighbors(v)) {
                        if (!visited.has(neighbor.node)) {
                            dfs(neighbor.node);
                        }
                    }
                };
                
                dfs(vertex);
                components.push(component);
            }
        }
        
        return components;
    }
    
    // 11. BIPARTITE CHECK
    static isBipartite(graph) {
        const color = new Map();
        
        for (let start of graph.getVertices()) {
            if (!color.has(start)) {
                const queue = [start];
                color.set(start, 0);
                
                while (queue.length > 0) {
                    const current = queue.shift();
                    
                    for (let neighbor of graph.getNeighbors(current)) {
                        if (!color.has(neighbor.node)) {
                            color.set(neighbor.node, 1 - color.get(current));
                            queue.push(neighbor.node);
                        } else if (color.get(neighbor.node) === color.get(current)) {
                            return false;
                        }
                    }
                }
            }
        }
        
        return true;
    }
}

// SIMPLE PRIORITY QUEUE IMPLEMENTATION
class MinPriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    enqueue(element, priority) {
        this.heap.push({ element, priority });
        this.bubbleUp();
    }
    
    dequeue() {
        const min = this.heap[0];
        const end = this.heap.pop();
        
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown();
        }
        
        return min;
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
    
    bubbleUp() {
        let idx = this.heap.length - 1;
        
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            
            if (this.heap[parentIdx].priority <= this.heap[idx].priority) break;
            
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }
    
    sinkDown() {
        let idx = 0;
        const length = this.heap.length;
        
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let smallest = idx;
            
            if (leftChildIdx < length && 
                this.heap[leftChildIdx].priority < this.heap[smallest].priority) {
                smallest = leftChildIdx;
            }
            
            if (rightChildIdx < length && 
                this.heap[rightChildIdx].priority < this.heap[smallest].priority) {
                smallest = rightChildIdx;
            }
            
            if (smallest === idx) break;
            
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

// USAGE EXAMPLES
console.log("=== GRAPH ALGORITHMS EXAMPLES ===");

// Create a sample graph
const graph = new Graph(true); // directed graph
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 8);
graph.addEdge('C', 'E', 10);
graph.addEdge('D', 'E', 2);

// Test BFS
console.log("BFS from A:", GraphAlgorithms.bfs(graph, 'A'));

// Test DFS
console.log("DFS from A:", GraphAlgorithms.dfs(graph, 'A'));
console.log("DFS Iterative from A:", GraphAlgorithms.dfsIterative(graph, 'A'));

// Test shortest path (unweighted)
const unweightedGraph = new Graph();
unweightedGraph.addEdge('A', 'B');
unweightedGraph.addEdge('A', 'C');
unweightedGraph.addEdge('B', 'D');
unweightedGraph.addEdge('C', 'D');
console.log("Shortest path A->D:", GraphAlgorithms.shortestPathBFS(unweightedGraph, 'A', 'D'));

// Test Dijkstra
const result = GraphAlgorithms.dijkstra(graph, 'A');
console.log("Dijkstra distances from A:", Object.fromEntries(result.distances));
console.log("Path A->E:", GraphAlgorithms.getPath(result.previous, 'A', 'E'));

// Test Topological Sort
const dag = new Graph(true);
dag.addEdge('A', 'C');
dag.addEdge('B', 'C');
dag.addEdge('B', 'D');
dag.addEdge('C', 'E');
dag.addEdge('D', 'F');
dag.addEdge('E', 'F');
console.log("Topological sort:", GraphAlgorithms.topologicalSort(dag));

// Test cycle detection
console.log("Has cycle (directed):", GraphAlgorithms.hasCycleDirected(graph));

// Test undirected graph
const undirectedGraph = new Graph(false);
undirectedGraph.addEdge(1, 2);
undirectedGraph.addEdge(2, 3);
undirectedGraph.addEdge(3, 4);
undirectedGraph.addEdge(4, 5);
console.log("Connected components:", GraphAlgorithms.connectedComponents(undirectedGraph));
console.log("Is bipartite:", GraphAlgorithms.isBipartite(undirectedGraph));
```
*Notice: Graph algorithms are fundamental for solving connectivity, pathfinding, and network analysis problems in computer science.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Graph representation**: choosing wrong representation (adjacency list vs matrix) for the problem
- **Visited tracking**: forgetting to mark nodes as visited, leading to infinite loops
- **Directed vs undirected**: not handling edge directions correctly
- **Cycle detection**: confusing detection methods for directed vs undirected graphs
- **Priority queue**: not using proper priority queue for Dijkstra, leading to incorrect results
- **Path reconstruction**: incorrect parent tracking in shortest path algorithms

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Social networks**: friend recommendations, influence analysis, community detection
- **Navigation systems**: GPS routing, traffic optimization, shortest path calculation
- **Web crawling**: link analysis, PageRank, web graph traversal
- **Dependency resolution**: package management, build systems, task scheduling
- **Network analysis**: connectivity, bottlenecks, flow optimization

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Number of Islands"** → BFS/DFS for connected components in 2D grid
2. **"Course Schedule"** → Topological sort and cycle detection in directed graph
3. **"Network Delay Time"** → Dijkstra's algorithm for shortest path in weighted graph
4. **"Clone Graph"** → DFS/BFS traversal with node duplication
5. **"Word Ladder"** → BFS for shortest transformation sequence

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Union-Find` · `Minimum Spanning Tree` · `Floyd-Warshall` · `Bellman-Ford` · `A* Search`

</div>

<div class="tags">
  <span class="tag">graph</span>
  <span class="tag">bfs</span>
  <span class="tag">dfs</span>
  <span class="tag">dijkstra</span>
  <span class="tag">topological-sort</span>
  <span class="tag">shortest-path</span>
  <span class="tag">medior</span>
</div>

### LRU Cache {#lru-cache}
<!-- tags: lru-cache, data-structure, design, hash-map, doubly-linked-list, medior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*LRU (Least Recently Used) Cache is a data structure that maintains a fixed-size cache with O(1) access time. When the cache reaches capacity, it evicts the least recently used item. Implementation combines a **HashMap** for O(1) key lookup and a **Doubly Linked List** for O(1) insertion/deletion. The head represents the most recently used item, while the tail represents the least recently used. Each access moves the item to the head, and eviction removes from the tail.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Get operation**: O(1) time
- **Put operation**: O(1) time
- **Space**: O(capacity) for storing key-value pairs
- **HashMap**: O(1) average lookup, worst O(n) with poor hash function
- **Doubly Linked List**: O(1) insertion/deletion at any position

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**
```pseudo
STRUCTURE LRUCache
  capacity: INTEGER
  hashMap: MAP<KEY, NODE>
  head: NODE  // dummy head (most recent)
  tail: NODE  // dummy tail (least recent)
  
  FUNCTION Initialize(capacity)
    this.capacity ← capacity
    this.hashMap ← NEW MAP()
    this.head ← NEW NODE()
    this.tail ← NEW NODE()
    this.head.next ← this.tail
    this.tail.prev ← this.head
  END FUNCTION
  
  FUNCTION Get(key)
    IF key IN hashMap THEN
      node ← hashMap[key]
      MoveToHead(node)
      RETURN node.value
    ELSE
      RETURN -1
    END IF
  END FUNCTION
  
  FUNCTION Put(key, value)
    IF key IN hashMap THEN
      node ← hashMap[key]
      node.value ← value
      MoveToHead(node)
    ELSE
      IF hashMap.size = capacity THEN
        RemoveTail()
      END IF
      newNode ← NEW NODE(key, value)
      AddToHead(newNode)
      hashMap[key] ← newNode
    END IF
  END FUNCTION
END STRUCTURE
```

</div>

<div class="runnable-model" data-filter="data-structure design">

**Runnable mental model**
```javascript
// LRU CACHE - COMPREHENSIVE IMPLEMENTATION

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        
        // Create dummy head and tail nodes
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    get(key) {
        const node = this.cache.get(key);
        
        if (node) {
            // Move to head (mark as recently used)
            this.moveToHead(node);
            return node.value;
        }
        
        return -1;
    }
    
    put(key, value) {
        const node = this.cache.get(key);
        
        if (node) {
            // Update existing node
            node.value = value;
            this.moveToHead(node);
        } else {
            const newNode = new Node(key, value);
            
            if (this.cache.size >= this.capacity) {
                // Remove least recently used node
                const tail = this.removeTail();
                this.cache.delete(tail.key);
            }
            
            this.cache.set(key, newNode);
            this.addToHead(newNode);
        }
    }
    
    addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        
        this.head.next.prev = node;
        this.head.next = node;
    }
    
    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }
    
    removeTail() {
        const lastNode = this.tail.prev;
        this.removeNode(lastNode);
        return lastNode;
    }
    
    // Debug helper
    printCache() {
        const items = [];
        let current = this.head.next;
        
        while (current !== this.tail) {
            items.push(`${current.key}:${current.value}`);
            current = current.next;
        }
        
        console.log("Cache (head->tail):", items.join(" -> "));
    }
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

// ALTERNATIVE IMPLEMENTATIONS

// 1. LRU Cache using JavaScript Map (leverages insertion order)
class LRUCacheMap {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key) {
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            // Move to end (mark as recently used)
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return -1;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing key
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Remove least recently used (first item)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, value);
    }
}

// 2. LFU Cache (Least Frequently Used) for comparison
class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        this.keyToVal = new Map();
        this.keyToFreq = new Map();
        this.freqToKeys = new Map();
    }
    
    get(key) {
        if (!this.keyToVal.has(key)) {
            return -1;
        }
        
        this.increaseFreq(key);
        return this.keyToVal.get(key);
    }
    
    put(key, value) {
        if (this.capacity <= 0) return;
        
        if (this.keyToVal.has(key)) {
            this.keyToVal.set(key, value);
            this.increaseFreq(key);
            return;
        }
        
        if (this.keyToVal.size >= this.capacity) {
            this.removeMinFreqKey();
        }
        
        this.keyToVal.set(key, value);
        this.keyToFreq.set(key, 1);
        
        if (!this.freqToKeys.has(1)) {
            this.freqToKeys.set(1, new Set());
        }
        this.freqToKeys.get(1).add(key);
        
        this.minFreq = 1;
    }
    
    increaseFreq(key) {
        const freq = this.keyToFreq.get(key);
        
        this.keyToFreq.set(key, freq + 1);
        this.freqToKeys.get(freq).delete(key);
        
        if (!this.freqToKeys.has(freq + 1)) {
            this.freqToKeys.set(freq + 1, new Set());
        }
        this.freqToKeys.get(freq + 1).add(key);
        
        if (this.freqToKeys.get(freq).size === 0 && freq === this.minFreq) {
            this.minFreq++;
        }
    }
    
    removeMinFreqKey() {
        const keySet = this.freqToKeys.get(this.minFreq);
        const deletedKey = keySet.values().next().value;
        
        keySet.delete(deletedKey);
        this.keyToVal.delete(deletedKey);
        this.keyToFreq.delete(deletedKey);
    }
}

// 3. Time-based Cache with TTL (Time To Live)
class TTLCache {
    constructor(capacity, defaultTTL = 60000) { // 60 seconds default
        this.capacity = capacity;
        this.defaultTTL = defaultTTL;
        this.cache = new Map();
        this.timers = new Map();
    }
    
    get(key) {
        if (this.cache.has(key)) {
            const { value, expiry } = this.cache.get(key);
            
            if (Date.now() < expiry) {
                return value;
            } else {
                this.delete(key);
            }
        }
        
        return null;
    }
    
    set(key, value, ttl = this.defaultTTL) {
        // Clear existing timer if key exists
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
        }
        
        // Remove oldest item if at capacity
        if (!this.cache.has(key) && this.cache.size >= this.capacity) {
            const oldestKey = this.cache.keys().next().value;
            this.delete(oldestKey);
        }
        
        const expiry = Date.now() + ttl;
        this.cache.set(key, { value, expiry });
        
        // Set expiration timer
        const timer = setTimeout(() => {
            this.delete(key);
        }, ttl);
        
        this.timers.set(key, timer);
    }
    
    delete(key) {
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
            this.timers.delete(key);
        }
        
        this.cache.delete(key);
    }
    
    cleanup() {
        const now = Date.now();
        for (let [key, { expiry }] of this.cache) {
            if (now >= expiry) {
                this.delete(key);
            }
        }
    }
}

// USAGE EXAMPLES AND TESTING
console.log("=== LRU CACHE EXAMPLES ===");

// Test LRU Cache
const lru = new LRUCache(2);

lru.put(1, 1);
lru.put(2, 2);
console.log("Get 1:", lru.get(1)); // 1
lru.printCache(); // 1:1 -> 2:2

lru.put(3, 3); // evicts key 2
console.log("Get 2:", lru.get(2)); // -1 (not found)
console.log("Get 3:", lru.get(3)); // 3
console.log("Get 1:", lru.get(1)); // 1
lru.printCache(); // 1:1 -> 3:3

lru.put(4, 4); // evicts key 3
console.log("Get 1:", lru.get(1)); // 1
console.log("Get 3:", lru.get(3)); // -1 (evicted)
console.log("Get 4:", lru.get(4)); // 4
lru.printCache(); // 1:1 -> 4:4

// Test LRU Cache with Map
console.log("\n=== LRU CACHE WITH MAP ===");
const lruMap = new LRUCacheMap(2);

lruMap.put(1, 1);
lruMap.put(2, 2);
console.log("Get 1:", lruMap.get(1)); // 1

lruMap.put(3, 3); // evicts key 2
console.log("Get 2:", lruMap.get(2)); // -1
console.log("Get 3:", lruMap.get(3)); // 3
console.log("Get 1:", lruMap.get(1)); // 1

// Test LFU Cache
console.log("\n=== LFU CACHE EXAMPLE ===");
const lfu = new LFUCache(2);

lfu.put(1, 1);
lfu.put(2, 2);
console.log("Get 1:", lfu.get(1)); // 1 (freq: 2)
lfu.put(3, 3); // evicts key 2 (freq: 1)
console.log("Get 2:", lfu.get(2)); // -1
console.log("Get 3:", lfu.get(3)); // 3
console.log("Get 1:", lfu.get(1)); // 1

// Test TTL Cache
console.log("\n=== TTL CACHE EXAMPLE ===");
const ttlCache = new TTLCache(3, 1000); // 1 second TTL

ttlCache.set("key1", "value1");
ttlCache.set("key2", "value2", 500); // 0.5 second TTL

console.log("Get key1:", ttlCache.get("key1")); // "value1"
console.log("Get key2:", ttlCache.get("key2")); // "value2"

setTimeout(() => {
    console.log("After 600ms:");
    console.log("Get key1:", ttlCache.get("key1")); // "value1"
    console.log("Get key2:", ttlCache.get("key2")); // null (expired)
}, 600);

// Performance comparison
function performanceTest() {
    const iterations = 100000;
    
    // LRU Cache test
    console.time("LRU Cache operations");
    const lruPerf = new LRUCache(1000);
    
    for (let i = 0; i < iterations; i++) {
        lruPerf.put(i % 1500, i); // Some evictions will occur
        lruPerf.get(i % 1000);
    }
    console.timeEnd("LRU Cache operations");
    
    // Map-based LRU test
    console.time("Map-based LRU operations");
    const mapPerf = new LRUCacheMap(1000);
    
    for (let i = 0; i < iterations; i++) {
        mapPerf.put(i % 1500, i);
        mapPerf.get(i % 1000);
    }
    console.timeEnd("Map-based LRU operations");
}

performanceTest();
```
*Notice: LRU Cache combines HashMap and Doubly Linked List to achieve O(1) operations for both access and eviction policies.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Doubly linked list**: incorrect pointer updates leading to broken links
- **Dummy nodes**: not using dummy head/tail nodes, complicating edge cases
- **HashMap sync**: forgetting to update HashMap when modifying linked list
- **Capacity check**: incorrect capacity handling during insertion
- **Node reuse**: not properly handling node updates vs new insertions
- **Memory leaks**: not clearing references in removed nodes

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Operating systems**: page replacement in virtual memory management
- **CPU caches**: L1/L2/L3 cache replacement policies
- **Web browsers**: caching web pages, images, and resources
- **Database systems**: buffer pool management, query result caching
- **CDN**: content delivery network cache management

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"LRU Cache"** → Design data structure with O(1) get and put operations
2. **"LFU Cache"** → Least Frequently Used variation with frequency tracking
3. **"Design Browser History"** → Stack-like navigation with size limits
4. **"Design File System"** → File caching with hierarchical structure
5. **"Design In-Memory File System"** → Combining trie structure with LRU eviction

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Hash Tables` · `Doubly Linked Lists` · `Design Patterns` · `Memory Management` · `Cache Algorithms`

</div>

<div class="tags">
  <span class="tag">lru-cache</span>
  <span class="tag">data-structure</span>
  <span class="tag">design</span>
  <span class="tag">hash-map</span>
  <span class="tag">medior</span>
</div>

### Tree Algorithms {#tree-algorithms}
<!-- tags: tree, binary-tree, traversal, bst, lca, tree-dp, path-sum, medior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*Tree algorithms operate on hierarchical data structures with nodes connected by edges, forming no cycles. Key concepts include **Tree Traversal** (Inorder, Preorder, Postorder, Level-order), **Binary Search Trees** for ordered data with O(log n) operations, **Lowest Common Ancestor** (LCA) for finding shared ancestors, **Tree Dynamic Programming** for optimization problems on tree structures, and **Path Sum Problems** for finding paths with specific properties. Trees enable efficient searching, hierarchical organization, and recursive problem decomposition.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Tree traversal**: O(n) time, O(h) space for recursion stack (h = height)
- **BST operations**: O(log n) average, O(n) worst case (unbalanced)
- **LCA**: O(log n) with preprocessing, O(n) naive approach
- **Tree DP**: O(n) time, O(h) space for recursion
- **Path sum**: O(n) time, O(h) space for DFS approaches

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**

**Tree Traversal (DFS)**
```pseudo
FUNCTION InorderTraversal(root)
  IF root IS NULL THEN RETURN
  InorderTraversal(root.left)
  Process(root.val)
  InorderTraversal(root.right)
END FUNCTION

FUNCTION PreorderTraversal(root)
  IF root IS NULL THEN RETURN
  Process(root.val)
  PreorderTraversal(root.left)
  PreorderTraversal(root.right)
END FUNCTION

FUNCTION PostorderTraversal(root)
  IF root IS NULL THEN RETURN
  PostorderTraversal(root.left)
  PostorderTraversal(root.right)
  Process(root.val)
END FUNCTION
```

**Level Order Traversal (BFS)**
```pseudo
FUNCTION LevelOrderTraversal(root)
  IF root IS NULL THEN RETURN
  
  queue ← QUEUE([root])
  
  WHILE NOT queue.empty() DO
    current ← queue.dequeue()
    Process(current.val)
    
    IF current.left IS NOT NULL THEN
      queue.enqueue(current.left)
    END IF
    
    IF current.right IS NOT NULL THEN
      queue.enqueue(current.right)
    END IF
  END WHILE
END FUNCTION
```

**Lowest Common Ancestor**
```pseudo
FUNCTION LCA(root, p, q)
  IF root IS NULL OR root = p OR root = q THEN
    RETURN root
  END IF
  
  left ← LCA(root.left, p, q)
  right ← LCA(root.right, p, q)
  
  IF left IS NOT NULL AND right IS NOT NULL THEN
    RETURN root
  END IF
  
  RETURN left IS NOT NULL ? left : right
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="tree binary-tree">

**Runnable mental model**
```javascript
// TREE ALGORITHMS - COMPREHENSIVE IMPLEMENTATION

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class TreeAlgorithms {
    // 1. TREE TRAVERSALS
    
    // Inorder Traversal (Left, Root, Right) - for BST gives sorted order
    static inorderTraversal(root) {
        const result = [];
        
        const inorder = (node) => {
            if (!node) return;
            
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        };
        
        inorder(root);
        return result;
    }
    
    // Preorder Traversal (Root, Left, Right) - useful for tree construction
    static preorderTraversal(root) {
        const result = [];
        
        const preorder = (node) => {
            if (!node) return;
            
            result.push(node.val);
            preorder(node.left);
            preorder(node.right);
        };
        
        preorder(root);
        return result;
    }
    
    // Postorder Traversal (Left, Right, Root) - useful for tree deletion
    static postorderTraversal(root) {
        const result = [];
        
        const postorder = (node) => {
            if (!node) return;
            
            postorder(node.left);
            postorder(node.right);
            result.push(node.val);
        };
        
        postorder(root);
        return result;
    }
    
    // Level Order Traversal (BFS) - level by level
    static levelOrderTraversal(root) {
        if (!root) return [];
        
        const result = [];
        const queue = [root];
        
        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                currentLevel.push(node.val);
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            
            result.push(currentLevel);
        }
        
        return result;
    }
    
    // 2. ITERATIVE TRAVERSALS (using explicit stack)
    
    static inorderIterative(root) {
        const result = [];
        const stack = [];
        let current = root;
        
        while (current || stack.length > 0) {
            // Go to leftmost node
            while (current) {
                stack.push(current);
                current = current.left;
            }
            
            // Process current node
            current = stack.pop();
            result.push(current.val);
            
            // Move to right subtree
            current = current.right;
        }
        
        return result;
    }
    
    static preorderIterative(root) {
        if (!root) return [];
        
        const result = [];
        const stack = [root];
        
        while (stack.length > 0) {
            const node = stack.pop();
            result.push(node.val);
            
            // Push right first, then left (stack is LIFO)
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        
        return result;
    }
    
    static postorderIterative(root) {
        if (!root) return [];
        
        const result = [];
        const stack = [root];
        const visited = new Set();
        
        while (stack.length > 0) {
            const node = stack[stack.length - 1]; // peek
            
            if ((!node.left && !node.right) || visited.has(node)) {
                result.push(node.val);
                stack.pop();
                visited.add(node);
            } else {
                if (node.right) stack.push(node.right);
                if (node.left) stack.push(node.left);
            }
        }
        
        return result;
    }
    
    // 3. TREE PROPERTIES
    
    // Maximum depth of binary tree
    static maxDepth(root) {
        if (!root) return 0;
        
        return 1 + Math.max(
            this.maxDepth(root.left),
            this.maxDepth(root.right)
        );
    }
    
    // Minimum depth of binary tree
    static minDepth(root) {
        if (!root) return 0;
        
        // If one subtree is empty, consider only the other
        if (!root.left) return 1 + this.minDepth(root.right);
        if (!root.right) return 1 + this.minDepth(root.left);
        
        return 1 + Math.min(
            this.minDepth(root.left),
            this.minDepth(root.right)
        );
    }
    
    // Check if tree is balanced (height difference ≤ 1)
    static isBalanced(root) {
        const checkHeight = (node) => {
            if (!node) return 0;
            
            const leftHeight = checkHeight(node.left);
            if (leftHeight === -1) return -1;
            
            const rightHeight = checkHeight(node.right);
            if (rightHeight === -1) return -1;
            
            if (Math.abs(leftHeight - rightHeight) > 1) {
                return -1; // Unbalanced
            }
            
            return 1 + Math.max(leftHeight, rightHeight);
        };
        
        return checkHeight(root) !== -1;
    }
    
    // Check if tree is symmetric
    static isSymmetric(root) {
        const isMirror = (left, right) => {
            if (!left && !right) return true;
            if (!left || !right) return false;
            
            return left.val === right.val &&
                   isMirror(left.left, right.right) &&
                   isMirror(left.right, right.left);
        };
        
        return !root || isMirror(root.left, root.right);
    }
    
    // 4. BINARY SEARCH TREE OPERATIONS
    
    // Validate BST
    static isValidBST(root) {
        const validate = (node, min, max) => {
            if (!node) return true;
            
            if ((min !== null && node.val <= min) ||
                (max !== null && node.val >= max)) {
                return false;
            }
            
            return validate(node.left, min, node.val) &&
                   validate(node.right, node.val, max);
        };
        
        return validate(root, null, null);
    }
    
    // Insert into BST
    static insertIntoBST(root, val) {
        if (!root) return new TreeNode(val);
        
        if (val < root.val) {
            root.left = this.insertIntoBST(root.left, val);
        } else {
            root.right = this.insertIntoBST(root.right, val);
        }
        
        return root;
    }
    
    // Search in BST
    static searchBST(root, val) {
        if (!root || root.val === val) return root;
        
        return val < root.val ? 
            this.searchBST(root.left, val) : 
            this.searchBST(root.right, val);
    }
    
    // Delete node from BST
    static deleteNode(root, key) {
        if (!root) return null;
        
        if (key < root.val) {
            root.left = this.deleteNode(root.left, key);
        } else if (key > root.val) {
            root.right = this.deleteNode(root.right, key);
        } else {
            // Node to delete found
            if (!root.left) return root.right;
            if (!root.right) return root.left;
            
            // Node has two children: get inorder successor
            let successor = root.right;
            while (successor.left) {
                successor = successor.left;
            }
            
            root.val = successor.val;
            root.right = this.deleteNode(root.right, successor.val);
        }
        
        return root;
    }
    
    // 5. LOWEST COMMON ANCESTOR (LCA)
    
    // LCA in Binary Tree
    static lowestCommonAncestor(root, p, q) {
        if (!root || root === p || root === q) {
            return root;
        }
        
        const left = this.lowestCommonAncestor(root.left, p, q);
        const right = this.lowestCommonAncestor(root.right, p, q);
        
        if (left && right) return root; // Found both nodes
        return left || right; // Return non-null result
    }
    
    // LCA in BST (more efficient)
    static lowestCommonAncestorBST(root, p, q) {
        while (root) {
            if (p.val < root.val && q.val < root.val) {
                root = root.left;
            } else if (p.val > root.val && q.val > root.val) {
                root = root.right;
            } else {
                return root; // Split point found
            }
        }
        return null;
    }
    
    // 6. PATH SUM PROBLEMS
    
    // Path Sum I: Check if there's a root-to-leaf path with given sum
    static hasPathSum(root, targetSum) {
        if (!root) return false;
        
        // Leaf node
        if (!root.left && !root.right) {
            return root.val === targetSum;
        }
        
        const remainingSum = targetSum - root.val;
        return this.hasPathSum(root.left, remainingSum) ||
               this.hasPathSum(root.right, remainingSum);
    }
    
    // Path Sum II: Find all root-to-leaf paths with given sum
    static pathSum(root, targetSum) {
        const result = [];
        
        const dfs = (node, remaining, path) => {
            if (!node) return;
            
            path.push(node.val);
            
            // Leaf node
            if (!node.left && !node.right && remaining === node.val) {
                result.push([...path]);
            } else {
                dfs(node.left, remaining - node.val, path);
                dfs(node.right, remaining - node.val, path);
            }
            
            path.pop(); // Backtrack
        };
        
        dfs(root, targetSum, []);
        return result;
    }
    
    // Path Sum III: Any path (not necessarily root-to-leaf) with given sum
    static pathSumIII(root, targetSum) {
        let count = 0;
        
        const pathSumFromNode = (node, remaining) => {
            if (!node) return;
            
            if (remaining === node.val) count++;
            
            pathSumFromNode(node.left, remaining - node.val);
            pathSumFromNode(node.right, remaining - node.val);
        };
        
        const traverse = (node) => {
            if (!node) return;
            
            pathSumFromNode(node, targetSum);
            traverse(node.left);
            traverse(node.right);
        };
        
        traverse(root);
        return count;
    }
    
    // 7. TREE CONSTRUCTION
    
    // Build tree from preorder and inorder traversal
    static buildTreePreIn(preorder, inorder) {
        if (preorder.length === 0) return null;
        
        const rootVal = preorder[0];
        const root = new TreeNode(rootVal);
        
        const rootIndex = inorder.indexOf(rootVal);
        
        const leftInorder = inorder.slice(0, rootIndex);
        const rightInorder = inorder.slice(rootIndex + 1);
        
        const leftPreorder = preorder.slice(1, 1 + leftInorder.length);
        const rightPreorder = preorder.slice(1 + leftInorder.length);
        
        root.left = this.buildTreePreIn(leftPreorder, leftInorder);
        root.right = this.buildTreePreIn(rightPreorder, rightInorder);
        
        return root;
    }
    
    // Build tree from inorder and postorder traversal
    static buildTreeInPost(inorder, postorder) {
        if (inorder.length === 0) return null;
        
        const rootVal = postorder[postorder.length - 1];
        const root = new TreeNode(rootVal);
        
        const rootIndex = inorder.indexOf(rootVal);
        
        const leftInorder = inorder.slice(0, rootIndex);
        const rightInorder = inorder.slice(rootIndex + 1);
        
        const leftPostorder = postorder.slice(0, leftInorder.length);
        const rightPostorder = postorder.slice(leftInorder.length, postorder.length - 1);
        
        root.left = this.buildTreeInPost(leftInorder, leftPostorder);
        root.right = this.buildTreeInPost(rightInorder, rightPostorder);
        
        return root;
    }
    
    // 8. TREE DIAMETER AND PATHS
    
    // Diameter of binary tree (longest path between any two nodes)
    static diameterOfBinaryTree(root) {
        let maxDiameter = 0;
        
        const depth = (node) => {
            if (!node) return 0;
            
            const leftDepth = depth(node.left);
            const rightDepth = depth(node.right);
            
            // Update diameter: path through current node
            maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
            
            return 1 + Math.max(leftDepth, rightDepth);
        };
        
        depth(root);
        return maxDiameter;
    }
    
    // Maximum path sum (path can start and end at any nodes)
    static maxPathSum(root) {
        let maxSum = -Infinity;
        
        const maxGain = (node) => {
            if (!node) return 0;
            
            // Max sum on left and right sub-trees
            const leftGain = Math.max(maxGain(node.left), 0);
            const rightGain = Math.max(maxGain(node.right), 0);
            
            // Path through current node
            const pathSum = node.val + leftGain + rightGain;
            maxSum = Math.max(maxSum, pathSum);
            
            // Return max gain if continuing path upward
            return node.val + Math.max(leftGain, rightGain);
        };
        
        maxGain(root);
        return maxSum;
    }
    
    // 9. SERIALIZE AND DESERIALIZE
    
    static serialize(root) {
        const result = [];
        
        const preorder = (node) => {
            if (!node) {
                result.push('null');
                return;
            }
            
            result.push(node.val.toString());
            preorder(node.left);
            preorder(node.right);
        };
        
        preorder(root);
        return result.join(',');
    }
    
    static deserialize(data) {
        const values = data.split(',');
        let index = 0;
        
        const buildTree = () => {
            if (index >= values.length || values[index] === 'null') {
                index++;
                return null;
            }
            
            const node = new TreeNode(parseInt(values[index++]));
            node.left = buildTree();
            node.right = buildTree();
            
            return node;
        };
        
        return buildTree();
    }
}

// HELPER FUNCTIONS

// Create sample trees for testing
function createSampleTree() {
    /*
        Tree structure:
            3
           / \
          9   20
             /  \
            15   7
    */
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    return root;
}

function createBST() {
    /*
        BST structure:
            4
           / \
          2   7
         / \   \
        1   3   9
    */
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    root.right.right = new TreeNode(9);
    return root;
}

// USAGE EXAMPLES
console.log("=== TREE ALGORITHMS EXAMPLES ===");

const tree = createSampleTree();
const bst = createBST();

// Test traversals
console.log("Inorder:", TreeAlgorithms.inorderTraversal(tree));
console.log("Preorder:", TreeAlgorithms.preorderTraversal(tree));
console.log("Postorder:", TreeAlgorithms.postorderTraversal(tree));
console.log("Level order:", TreeAlgorithms.levelOrderTraversal(tree));

// Test iterative traversals
console.log("Inorder (iterative):", TreeAlgorithms.inorderIterative(tree));
console.log("Preorder (iterative):", TreeAlgorithms.preorderIterative(tree));

// Test tree properties
console.log("Max depth:", TreeAlgorithms.maxDepth(tree));
console.log("Min depth:", TreeAlgorithms.minDepth(tree));
console.log("Is balanced:", TreeAlgorithms.isBalanced(tree));
console.log("Is symmetric:", TreeAlgorithms.isSymmetric(tree));

// Test BST operations
console.log("Is valid BST:", TreeAlgorithms.isValidBST(bst));
console.log("Search 7 in BST:", TreeAlgorithms.searchBST(bst, 7)?.val);

// Test LCA
const p = bst.left; // Node 2
const q = bst.left.right; // Node 3
console.log("LCA of 2 and 3:", TreeAlgorithms.lowestCommonAncestorBST(bst, p, q)?.val);

// Test path sum
console.log("Has path sum 22:", TreeAlgorithms.hasPathSum(tree, 22));
console.log("Path sum paths (22):", TreeAlgorithms.pathSum(tree, 22));

// Test diameter
console.log("Diameter:", TreeAlgorithms.diameterOfBinaryTree(tree));

// Test serialization
const serialized = TreeAlgorithms.serialize(tree);
console.log("Serialized:", serialized);
const deserialized = TreeAlgorithms.deserialize(serialized);
console.log("Deserialized inorder:", TreeAlgorithms.inorderTraversal(deserialized));
```
*Notice: Tree algorithms form the foundation for many hierarchical data problems and recursive thinking patterns.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Null checks**: forgetting to check for null nodes, causing runtime errors
- **Base cases**: incorrect or missing base cases in recursive functions
- **Tree vs BST**: applying BST-specific logic to general binary trees
- **Path tracking**: not properly backtracking in path sum problems
- **Stack overflow**: recursive solutions without considering tree height limits
- **Node reference**: confusing node values with node references in comparisons

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **File systems**: directory structure navigation and organization
- **Database indexing**: B-trees and B+ trees for efficient data retrieval
- **Compiler design**: abstract syntax trees for parsing and optimization
- **Game development**: decision trees for AI behavior and game states
- **Machine learning**: decision trees for classification and regression

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Binary Tree Level Order Traversal"** → BFS traversal returning level-by-level arrays
2. **"Validate Binary Search Tree"** → Check if tree satisfies BST properties
3. **"Lowest Common Ancestor"** → Find LCA in binary tree or BST
4. **"Maximum Path Sum"** → Find path with maximum sum between any two nodes
5. **"Serialize and Deserialize Binary Tree"** → Convert tree to string and back

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Graph Algorithms` · `Dynamic Programming` · `Recursion` · `Binary Search` · `Heap Operations`

</div>

<div class="tags">
  <span class="tag">tree</span>
  <span class="tag">binary-tree</span>
  <span class="tag">traversal</span>
  <span class="tag">bst</span>
  <span class="tag">lca</span>
  <span class="tag">tree-dp</span>
  <span class="tag">path-sum</span>
  <span class="tag">medior</span>
</div>

### String Algorithms {#string-algorithms}
<!-- tags: string, trie, kmp, rabin-karp, manacher, pattern-matching, medior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*String algorithms solve pattern matching, text processing, and string manipulation problems efficiently. Key algorithms include **Trie** (prefix tree) for storing and searching strings with common prefixes, **KMP** (Knuth-Morris-Pratt) for linear-time pattern matching, **Rabin-Karp** for multiple pattern search using rolling hash, and **Manacher's Algorithm** for finding all palindromes in linear time. These algorithms enable efficient text search, autocomplete systems, and string analysis in applications like search engines and text editors.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Trie operations**: O(m) time for insert/search (m = string length), O(ALPHABET_SIZE × N × M) space
- **KMP**: O(n + m) time, O(m) space for pattern preprocessing
- **Rabin-Karp**: O(n + m) average, O(nm) worst case, O(1) space
- **Manacher**: O(n) time, O(n) space for finding all palindromes
- **n**: text length, **m**: pattern length

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**

**Trie (Prefix Tree)**
```pseudo
STRUCTURE TrieNode
  children: ARRAY[26] OF TrieNode
  isEndOfWord: BOOLEAN
END STRUCTURE

FUNCTION Insert(root, word)
  current ← root
  FOR char IN word DO
    index ← char - 'a'
    IF current.children[index] IS NULL THEN
      current.children[index] ← NEW TrieNode()
    END IF
    current ← current.children[index]
  END FOR
  current.isEndOfWord ← TRUE
END FUNCTION

FUNCTION Search(root, word)
  current ← root
  FOR char IN word DO
    index ← char - 'a'
    IF current.children[index] IS NULL THEN
      RETURN FALSE
    END IF
    current ← current.children[index]
  END FOR
  RETURN current.isEndOfWord
END FUNCTION
```

**KMP Algorithm**
```pseudo
FUNCTION ComputeLPS(pattern)
  lps ← ARRAY[pattern.length] FILLED WITH 0
  len ← 0
  i ← 1
  
  WHILE i < pattern.length DO
    IF pattern[i] = pattern[len] THEN
      len ← len + 1
      lps[i] ← len
      i ← i + 1
    ELSE
      IF len ≠ 0 THEN
        len ← lps[len - 1]
      ELSE
        lps[i] ← 0
        i ← i + 1
      END IF
    END IF
  END WHILE
  
  RETURN lps
END FUNCTION

FUNCTION KMP(text, pattern)
  lps ← ComputeLPS(pattern)
  i ← 0  // text index
  j ← 0  // pattern index
  
  WHILE i < text.length DO
    IF pattern[j] = text[i] THEN
      i ← i + 1
      j ← j + 1
    END IF
    
    IF j = pattern.length THEN
      RETURN i - j  // match found
      j ← lps[j - 1]
    ELSE IF i < text.length AND pattern[j] ≠ text[i] THEN
      IF j ≠ 0 THEN
        j ← lps[j - 1]
      ELSE
        i ← i + 1
      END IF
    END IF
  END WHILE
  
  RETURN -1  // not found
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="string pattern-matching">

**Runnable mental model**
```javascript
// STRING ALGORITHMS - COMPREHENSIVE IMPLEMENTATION

// 1. TRIE (PREFIX TREE)
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.count = 0; // For prefix counting
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    // Insert word into trie
    insert(word) {
        let current = this.root;
        
        for (let char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char);
            current.count++; // Count words passing through this node
        }
        
        current.isEndOfWord = true;
    }
    
    // Search for complete word
    search(word) {
        let current = this.root;
        
        for (let char of word) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char);
        }
        
        return current.isEndOfWord;
    }
    
    // Check if any word starts with prefix
    startsWith(prefix) {
        let current = this.root;
        
        for (let char of prefix) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char);
        }
        
        return true;
    }
    
    // Get all words with given prefix
    getWordsWithPrefix(prefix) {
        let current = this.root;
        
        // Navigate to prefix
        for (let char of prefix) {
            if (!current.children.has(char)) {
                return [];
            }
            current = current.children.get(char);
        }
        
        // DFS to find all complete words
        const words = [];
        
        const dfs = (node, currentWord) => {
            if (node.isEndOfWord) {
                words.push(currentWord);
            }
            
            for (let [char, childNode] of node.children) {
                dfs(childNode, currentWord + char);
            }
        };
        
        dfs(current, prefix);
        return words;
    }
    
    // Count words with given prefix
    countWordsWithPrefix(prefix) {
        let current = this.root;
        
        for (let char of prefix) {
            if (!current.children.has(char)) {
                return 0;
            }
            current = current.children.get(char);
        }
        
        return current.count;
    }
    
    // Delete word from trie
    delete(word) {
        const deleteHelper = (node, word, index) => {
            if (index === word.length) {
                if (!node.isEndOfWord) return false;
                
                node.isEndOfWord = false;
                node.count--;
                
                // Delete node if it has no children and is not end of another word
                return node.children.size === 0;
            }
            
            const char = word[index];
            const childNode = node.children.get(char);
            
            if (!childNode) return false;
            
            const shouldDeleteChild = deleteHelper(childNode, word, index + 1);
            
            if (shouldDeleteChild) {
                node.children.delete(char);
                node.count--;
                
                // Delete current node if it has no children and is not end of word
                return node.children.size === 0 && !node.isEndOfWord;
            }
            
            node.count--;
            return false;
        };
        
        deleteHelper(this.root, word, 0);
    }
}

// 2. KMP (KNUTH-MORRIS-PRATT) ALGORITHM
class KMP {
    // Compute Longest Proper Prefix which is also Suffix array
    static computeLPS(pattern) {
        const lps = new Array(pattern.length).fill(0);
        let len = 0; // length of previous longest prefix suffix
        let i = 1;
        
        while (i < pattern.length) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        
        return lps;
    }
    
    // Find first occurrence of pattern in text
    static search(text, pattern) {
        if (pattern.length === 0) return 0;
        if (text.length < pattern.length) return -1;
        
        const lps = this.computeLPS(pattern);
        let i = 0; // text index
        let j = 0; // pattern index
        
        while (i < text.length) {
            if (pattern[j] === text[i]) {
                i++;
                j++;
            }
            
            if (j === pattern.length) {
                return i - j; // match found at position i - j
            } else if (i < text.length && pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return -1; // not found
    }
    
    // Find all occurrences of pattern in text
    static searchAll(text, pattern) {
        const occurrences = [];
        const lps = this.computeLPS(pattern);
        let i = 0; // text index
        let j = 0; // pattern index
        
        while (i < text.length) {
            if (pattern[j] === text[i]) {
                i++;
                j++;
            }
            
            if (j === pattern.length) {
                occurrences.push(i - j);
                j = lps[j - 1];
            } else if (i < text.length && pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return occurrences;
    }
}

// 3. RABIN-KARP ALGORITHM (Rolling Hash)
class RabinKarp {
    constructor(prime = 101) {
        this.prime = prime;
        this.base = 256; // Number of characters in ASCII
    }
    
    // Calculate hash value for a string
    calculateHash(str, start = 0, end = str.length) {
        let hash = 0;
        let pow = 1;
        
        for (let i = start; i < end; i++) {
            hash = (hash + (str.charCodeAt(i) * pow)) % this.prime;
            pow = (pow * this.base) % this.prime;
        }
        
        return hash;
    }
    
    // Rolling hash: calculate new hash when sliding window
    rollingHash(oldHash, oldChar, newChar, patternLength) {
        // Remove contribution of old character
        oldHash = (oldHash - oldChar.charCodeAt(0)) / this.base;
        
        // Add contribution of new character
        oldHash = (oldHash + (newChar.charCodeAt(0) * Math.pow(this.base, patternLength - 1))) % this.prime;
        
        return oldHash;
    }
    
    // Find first occurrence of pattern in text
    search(text, pattern) {
        if (pattern.length > text.length) return -1;
        
        const patternHash = this.calculateHash(pattern);
        let textHash = this.calculateHash(text, 0, pattern.length);
        
        // Check first window
        if (patternHash === textHash && text.substring(0, pattern.length) === pattern) {
            return 0;
        }
        
        // Slide the window
        for (let i = 1; i <= text.length - pattern.length; i++) {
            // Calculate hash for current window
            textHash = this.rollingHash(
                textHash,
                text[i - 1],
                text[i + pattern.length - 1],
                pattern.length
            );
            
            // Check if hashes match, then verify actual string
            if (patternHash === textHash) {
                if (text.substring(i, i + pattern.length) === pattern) {
                    return i;
                }
            }
        }
        
        return -1;
    }
    
    // Find all occurrences
    searchAll(text, pattern) {
        const occurrences = [];
        if (pattern.length > text.length) return occurrences;
        
        const patternHash = this.calculateHash(pattern);
        let textHash = this.calculateHash(text, 0, pattern.length);
        
        // Check first window
        if (patternHash === textHash && text.substring(0, pattern.length) === pattern) {
            occurrences.push(0);
        }
        
        // Slide the window
        for (let i = 1; i <= text.length - pattern.length; i++) {
            textHash = this.rollingHash(
                textHash,
                text[i - 1],
                text[i + pattern.length - 1],
                pattern.length
            );
            
            if (patternHash === textHash) {
                if (text.substring(i, i + pattern.length) === pattern) {
                    occurrences.push(i);
                }
            }
        }
        
        return occurrences;
    }
}

// 4. MANACHER'S ALGORITHM (Linear Palindrome Detection)
class Manacher {
    // Preprocess string: "abc" -> "^#a#b#c#$"
    static preprocess(s) {
        if (s.length === 0) return "^$";
        
        let processed = "^";
        for (let char of s) {
            processed += "#" + char;
        }
        processed += "#$";
        
        return processed;
    }
    
    // Find all palindromes in linear time
    static longestPalindrome(s) {
        const processed = this.preprocess(s);
        const n = processed.length;
        const P = new Array(n).fill(0); // P[i] = radius of palindrome centered at i
        
        let center = 0; // center of current palindrome
        let right = 0;  // right boundary of current palindrome
        
        for (let i = 1; i < n - 1; i++) {
            const mirror = 2 * center - i; // mirror of i with respect to center
            
            if (i < right) {
                P[i] = Math.min(right - i, P[mirror]);
            }
            
            // Try to expand palindrome centered at i
            try {
                while (processed[i + (1 + P[i])] === processed[i - (1 + P[i])]) {
                    P[i]++;
                }
            } catch (e) {
                // Out of bounds
            }
            
            // If palindrome centered at i extends past right, adjust center and right
            if (i + P[i] > right) {
                center = i;
                right = i + P[i];
            }
        }
        
        // Find the longest palindrome
        let maxLength = 0;
        let centerIndex = 0;
        
        for (let i = 1; i < n - 1; i++) {
            if (P[i] > maxLength) {
                maxLength = P[i];
                centerIndex = i;
            }
        }
        
        // Convert back to original string coordinates
        const start = Math.floor((centerIndex - maxLength) / 2);
        return s.substring(start, start + maxLength);
    }
    
    // Count all palindromic substrings
    static countPalindromes(s) {
        const processed = this.preprocess(s);
        const n = processed.length;
        const P = new Array(n).fill(0);
        
        let center = 0;
        let right = 0;
        let count = 0;
        
        for (let i = 1; i < n - 1; i++) {
            const mirror = 2 * center - i;
            
            if (i < right) {
                P[i] = Math.min(right - i, P[mirror]);
            }
            
            try {
                while (processed[i + (1 + P[i])] === processed[i - (1 + P[i])]) {
                    P[i]++;
                }
            } catch (e) {
                // Out of bounds
            }
            
            if (i + P[i] > right) {
                center = i;
                right = i + P[i];
            }
            
            // Count palindromes centered at i
            count += Math.ceil(P[i] / 2);
        }
        
        return count;
    }
}

// 5. ADDITIONAL STRING ALGORITHMS

class StringUtils {
    // Longest Common Subsequence (Dynamic Programming)
    static longestCommonSubsequence(text1, text2) {
        const m = text1.length;
        const n = text2.length;
        const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (text1[i - 1] === text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Edit Distance (Levenshtein Distance)
    static editDistance(word1, word2) {
        const m = word1.length;
        const n = word2.length;
        const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
        
        // Initialize base cases
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (word1[i - 1] === word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j],     // deletion
                        dp[i][j - 1],     // insertion
                        dp[i - 1][j - 1]  // substitution
                    );
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Check if string contains all unique characters
    static isUnique(str) {
        const charSet = new Set();
        
        for (let char of str) {
            if (charSet.has(char)) {
                return false;
            }
            charSet.add(char);
        }
        
        return true;
    }
    
    // Check if two strings are anagrams
    static areAnagrams(str1, str2) {
        if (str1.length !== str2.length) return false;
        
        const charCount = {};
        
        // Count characters in first string
        for (let char of str1) {
            charCount[char] = (charCount[char] || 0) + 1;
        }
        
        // Subtract characters from second string
        for (let char of str2) {
            if (!charCount[char]) return false;
            charCount[char]--;
        }
        
        return true;
    }
    
    // Longest substring without repeating characters
    static lengthOfLongestSubstring(s) {
        const charMap = new Map();
        let left = 0;
        let maxLength = 0;
        
        for (let right = 0; right < s.length; right++) {
            if (charMap.has(s[right])) {
                left = Math.max(left, charMap.get(s[right]) + 1);
            }
            
            charMap.set(s[right], right);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
}

// USAGE EXAMPLES
console.log("=== STRING ALGORITHMS EXAMPLES ===");

// Test Trie
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("apricot");
trie.insert("banana");

console.log("Trie search 'app':", trie.search("app"));
console.log("Trie startsWith 'app':", trie.startsWith("app"));
console.log("Words with prefix 'app':", trie.getWordsWithPrefix("app"));

// Test KMP
const text = "ABABDABACDABABCABCABCABCABC";
const pattern = "ABABCABCABCABC";
console.log("KMP search:", KMP.search(text, pattern));
console.log("KMP search all:", KMP.searchAll("AABAACAADAABAABA", "AABA"));

// Test Rabin-Karp
const rk = new RabinKarp();
console.log("Rabin-Karp search:", rk.search("hello world hello", "hello"));
console.log("Rabin-Karp search all:", rk.searchAll("hello world hello", "hello"));

// Test Manacher
console.log("Longest palindrome:", Manacher.longestPalindrome("babad"));
console.log("Count palindromes:", Manacher.countPalindromes("abc"));

// Test String Utils
console.log("LCS length:", StringUtils.longestCommonSubsequence("abcde", "ace"));
console.log("Edit distance:", StringUtils.editDistance("kitten", "sitting"));
console.log("Is unique 'abc':", StringUtils.isUnique("abc"));
console.log("Are anagrams 'listen', 'silent':", StringUtils.areAnagrams("listen", "silent"));
console.log("Longest substring without repeating:", StringUtils.lengthOfLongestSubstring("abcabcbb"));
```
*Notice: String algorithms are essential for text processing, search functionality, and data validation in software applications.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Trie memory**: not considering memory usage for large alphabets or datasets
- **KMP LPS**: incorrect computation of longest proper prefix suffix array
- **Rolling hash**: hash collision handling and choosing appropriate prime numbers
- **Manacher preprocessing**: forgetting to handle edge cases in string transformation
- **Case sensitivity**: not considering case differences in string comparisons
- **Unicode**: assuming ASCII-only characters in implementation

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Search engines**: indexing and full-text search functionality
- **Text editors**: find/replace, autocomplete, and syntax highlighting
- **Bioinformatics**: DNA sequence analysis and pattern matching
- **Spell checkers**: word suggestion and correction algorithms
- **Data compression**: finding repeated patterns for compression algorithms

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Implement Trie"** → Design prefix tree with insert, search, and startsWith operations
2. **"Find All Anagrams in String"** → Use sliding window with character frequency counting
3. **"Longest Palindromic Substring"** → Expand around centers or Manacher's algorithm
4. **"Edit Distance"** → Dynamic programming for minimum operations to transform strings
5. **"Group Anagrams"** → Hash table grouping with sorted string as key

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Dynamic Programming` · `Hash Tables` · `Sliding Window` · `Two Pointers` · `Backtracking`

</div>

<div class="tags">
  <span class="tag">string</span>
  <span class="tag">trie</span>
  <span class="tag">kmp</span>
  <span class="tag">rabin-karp</span>
  <span class="tag">manacher</span>
  <span class="tag">medior</span>
</div>

### Backtracking Algorithms {#backtracking-algorithms}
<!-- tags: backtracking, recursion, n-queens, sudoku, permutations, combinations, medior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*Backtracking is a systematic method for solving constraint satisfaction problems by incrementally building candidates to solutions and abandoning candidates that cannot lead to valid solutions. The algorithm explores the solution space using **depth-first search**, making choices at each step and **backtracking** when constraints are violated. Key applications include **N-Queens Problem** for placing queens on a chessboard, **Sudoku Solver** for filling grids with constraints, **Permutations and Combinations** generation, and **Subset Sum** problems. Backtracking uses the "choose, explore, unchoose" pattern.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **General backtracking**: O(b^d) where b = branching factor, d = depth
- **N-Queens**: O(N!) time, O(N) space for recursion stack
- **Sudoku**: O(9^(n×n)) worst case, much better with pruning
- **Permutations**: O(N! × N) time, O(N) space
- **Subsets**: O(2^N × N) time, O(N) space for recursion

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**

**General Backtracking Template**
```pseudo
FUNCTION Backtrack(state, solutions)
  IF IsValidSolution(state) THEN
    solutions.add(COPY(state))
    RETURN
  END IF
  
  FOR choice IN GetChoices(state) DO
    IF IsValidChoice(state, choice) THEN
      state.makeChoice(choice)
      Backtrack(state, solutions)
      state.undoChoice(choice)
    END IF
  END FOR
END FUNCTION
```

**N-Queens Problem**
```pseudo
FUNCTION SolveNQueens(n)
  board ← MATRIX[n][n] FILLED WITH FALSE
  solutions ← LIST()
  
  FUNCTION IsValid(row, col)
    FOR i FROM 0 TO row-1 DO
      IF board[i][col] THEN RETURN FALSE
      IF col-row+i >= 0 AND board[i][col-row+i] THEN RETURN FALSE
      IF col+row-i < n AND board[i][col+row-i] THEN RETURN FALSE
    END FOR
    RETURN TRUE
  END FUNCTION
  
  FUNCTION PlaceQueens(row)
    IF row = n THEN
      solutions.add(COPY(board))
      RETURN
    END IF
    
    FOR col FROM 0 TO n-1 DO
      IF IsValid(row, col) THEN
        board[row][col] ← TRUE
        PlaceQueens(row + 1)
        board[row][col] ← FALSE
      END IF
    END FOR
  END FUNCTION
  
  PlaceQueens(0)
  RETURN solutions
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="backtracking recursion">

**Runnable mental model**
```javascript
// BACKTRACKING ALGORITHMS - COMPREHENSIVE IMPLEMENTATION

class BacktrackingAlgorithms {
    
    // 1. N-QUEENS PROBLEM
    static solveNQueens(n) {
        const solutions = [];
        const board = Array(n).fill().map(() => Array(n).fill('.'));
        
        const isValid = (row, col) => {
            // Check column
            for (let i = 0; i < row; i++) {
                if (board[i][col] === 'Q') return false;
            }
            
            // Check diagonal (top-left to bottom-right)
            for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
                if (board[i][j] === 'Q') return false;
            }
            
            // Check anti-diagonal (top-right to bottom-left)
            for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
                if (board[i][j] === 'Q') return false;
            }
            
            return true;
        };
        
        const backtrack = (row) => {
            if (row === n) {
                solutions.push(board.map(row => row.join('')));
                return;
            }
            
            for (let col = 0; col < n; col++) {
                if (isValid(row, col)) {
                    board[row][col] = 'Q';
                    backtrack(row + 1);
                    board[row][col] = '.';
                }
            }
        };
        
        backtrack(0);
        return solutions;
    }
    
    // 2. SUDOKU SOLVER
    static solveSudoku(board) {
        const isValid = (board, row, col, num) => {
            // Check row
            for (let j = 0; j < 9; j++) {
                if (board[row][j] === num) return false;
            }
            
            // Check column
            for (let i = 0; i < 9; i++) {
                if (board[i][col] === num) return false;
            }
            
            // Check 3x3 box
            const boxRow = Math.floor(row / 3) * 3;
            const boxCol = Math.floor(col / 3) * 3;
            
            for (let i = boxRow; i < boxRow + 3; i++) {
                for (let j = boxCol; j < boxCol + 3; j++) {
                    if (board[i][j] === num) return false;
                }
            }
            
            return true;
        };
        
        const solve = () => {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (board[i][j] === '.') {
                        for (let num = '1'; num <= '9'; num++) {
                            if (isValid(board, i, j, num)) {
                                board[i][j] = num;
                                
                                if (solve()) return true;
                                
                                board[i][j] = '.'; // backtrack
                            }
                        }
                        return false; // No valid number found
                    }
                }
            }
            return true; // All cells filled
        };
        
        solve();
        return board;
    }
    
    // 3. GENERATE PERMUTATIONS
    static permute(nums) {
        const result = [];
        
        const backtrack = (currentPerm) => {
            if (currentPerm.length === nums.length) {
                result.push([...currentPerm]);
                return;
            }
            
            for (let i = 0; i < nums.length; i++) {
                if (currentPerm.includes(nums[i])) continue;
                
                currentPerm.push(nums[i]);
                backtrack(currentPerm);
                currentPerm.pop();
            }
        };
        
        backtrack([]);
        return result;
    }
    
    // 4. GENERATE COMBINATIONS
    static combine(n, k) {
        const result = [];
        
        const backtrack = (start, currentCombination) => {
            if (currentCombination.length === k) {
                result.push([...currentCombination]);
                return;
            }
            
            for (let i = start; i <= n; i++) {
                currentCombination.push(i);
                backtrack(i + 1, currentCombination);
                currentCombination.pop();
            }
        };
        
        backtrack(1, []);
        return result;
    }
    
    // 5. SUBSET GENERATION
    static subsets(nums) {
        const result = [];
        
        const backtrack = (start, currentSubset) => {
            result.push([...currentSubset]);
            
            for (let i = start; i < nums.length; i++) {
                currentSubset.push(nums[i]);
                backtrack(i + 1, currentSubset);
                currentSubset.pop();
            }
        };
        
        backtrack(0, []);
        return result;
    }
    
    // 6. SUBSET SUM PROBLEM
    static hasSubsetSum(nums, target) {
        const backtrack = (index, currentSum) => {
            if (currentSum === target) return true;
            if (index >= nums.length || currentSum > target) return false;
            
            // Include current number
            if (backtrack(index + 1, currentSum + nums[index])) {
                return true;
            }
            
            // Exclude current number
            if (backtrack(index + 1, currentSum)) {
                return true;
            }
            
            return false;
        };
        
        return backtrack(0, 0);
    }
    
    // 7. WORD SEARCH IN GRID
    static wordSearch(board, word) {
        const rows = board.length;
        const cols = board[0].length;
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        
        const backtrack = (row, col, index) => {
            if (index === word.length) return true;
            
            if (row < 0 || row >= rows || col < 0 || col >= cols ||
                board[row][col] !== word[index]) {
                return false;
            }
            
            const temp = board[row][col];
            board[row][col] = '#'; // Mark as visited
            
            for (let [dr, dc] of directions) {
                if (backtrack(row + dr, col + dc, index + 1)) {
                    board[row][col] = temp; // Restore
                    return true;
                }
            }
            
            board[row][col] = temp; // Restore
            return false;
        };
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (backtrack(i, j, 0)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // 8. PALINDROME PARTITIONING
    static partition(s) {
        const result = [];
        
        const isPalindrome = (str, left, right) => {
            while (left < right) {
                if (str[left] !== str[right]) return false;
                left++;
                right--;
            }
            return true;
        };
        
        const backtrack = (start, currentPartition) => {
            if (start === s.length) {
                result.push([...currentPartition]);
                return;
            }
            
            for (let end = start; end < s.length; end++) {
                if (isPalindrome(s, start, end)) {
                    currentPartition.push(s.substring(start, end + 1));
                    backtrack(end + 1, currentPartition);
                    currentPartition.pop();
                }
            }
        };
        
        backtrack(0, []);
        return result;
    }
    
    // 9. GENERATE PARENTHESES
    static generateParenthesis(n) {
        const result = [];
        
        const backtrack = (current, open, close) => {
            if (current.length === 2 * n) {
                result.push(current);
                return;
            }
            
            if (open < n) {
                backtrack(current + '(', open + 1, close);
            }
            
            if (close < open) {
                backtrack(current + ')', open, close + 1);
            }
        };
        
        backtrack('', 0, 0);
        return result;
    }
    
    // 10. LETTER COMBINATIONS OF PHONE NUMBER
    static letterCombinations(digits) {
        if (digits.length === 0) return [];
        
        const phoneMap = {
            '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
            '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
        };
        
        const result = [];
        
        const backtrack = (index, currentCombination) => {
            if (index === digits.length) {
                result.push(currentCombination);
                return;
            }
            
            const letters = phoneMap[digits[index]];
            for (let letter of letters) {
                backtrack(index + 1, currentCombination + letter);
            }
        };
        
        backtrack(0, '');
        return result;
    }
    
    // 11. RAT IN A MAZE
    static ratInAMaze(maze) {
        const n = maze.length;
        const solution = Array(n).fill().map(() => Array(n).fill(0));
        const path = [];
        
        const isSafe = (x, y) => {
            return x >= 0 && x < n && y >= 0 && y < n && maze[x][y] === 1;
        };
        
        const solve = (x, y) => {
            if (x === n - 1 && y === n - 1 && maze[x][y] === 1) {
                solution[x][y] = 1;
                path.push([x, y]);
                return true;
            }
            
            if (isSafe(x, y)) {
                if (solution[x][y] === 1) return false; // Already visited
                
                solution[x][y] = 1;
                path.push([x, y]);
                
                // Try all four directions
                if (solve(x + 1, y) || solve(x, y + 1) || 
                    solve(x - 1, y) || solve(x, y - 1)) {
                    return true;
                }
                
                // Backtrack
                solution[x][y] = 0;
                path.pop();
                return false;
            }
            
            return false;
        };
        
        if (solve(0, 0)) {
            return { solution, path };
        }
        
        return { solution: null, path: [] };
    }
    
    // 12. KNIGHT'S TOUR PROBLEM
    static knightsTour(n) {
        const board = Array(n).fill().map(() => Array(n).fill(-1));
        const moves = [
            [2, 1], [1, 2], [-1, 2], [-2, 1],
            [-2, -1], [-1, -2], [1, -2], [2, -1]
        ];
        
        const isSafe = (x, y) => {
            return x >= 0 && x < n && y >= 0 && y < n && board[x][y] === -1;
        };
        
        const solve = (x, y, moveCount) => {
            board[x][y] = moveCount;
            
            if (moveCount === n * n - 1) {
                return true; // All squares visited
            }
            
            for (let [dx, dy] of moves) {
                const nextX = x + dx;
                const nextY = y + dy;
                
                if (isSafe(nextX, nextY)) {
                    if (solve(nextX, nextY, moveCount + 1)) {
                        return true;
                    }
                }
            }
            
            // Backtrack
            board[x][y] = -1;
            return false;
        };
        
        if (solve(0, 0, 0)) {
            return board;
        }
        
        return null; // No solution
    }
}

// OPTIMIZED VERSIONS AND UTILITIES

class BacktrackingOptimized {
    // Optimized N-Queens using bit manipulation
    static solveNQueensOptimized(n) {
        const solutions = [];
        
        const solve = (row, cols, diag1, diag2, board) => {
            if (row === n) {
                solutions.push(board.map(row => row.join('')));
                return;
            }
            
            let availablePositions = ((1 << n) - 1) & (~(cols | diag1 | diag2));
            
            while (availablePositions) {
                const position = availablePositions & (-availablePositions);
                availablePositions ^= position;
                
                const col = Math.log2(position);
                board[row][col] = 'Q';
                
                solve(
                    row + 1,
                    cols | position,
                    (diag1 | position) << 1,
                    (diag2 | position) >> 1,
                    board
                );
                
                board[row][col] = '.';
            }
        };
        
        const board = Array(n).fill().map(() => Array(n).fill('.'));
        solve(0, 0, 0, 0, board);
        return solutions;
    }
    
    // Subset generation with iterative approach
    static subsetsIterative(nums) {
        const result = [[]];
        
        for (let num of nums) {
            const newSubsets = [];
            for (let subset of result) {
                newSubsets.push([...subset, num]);
            }
            result.push(...newSubsets);
        }
        
        return result;
    }
    
    // Permutations with lexicographic ordering
    static nextPermutation(nums) {
        let i = nums.length - 2;
        
        // Find first decreasing element from right
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        
        if (i >= 0) {
            let j = nums.length - 1;
            
            // Find element just larger than nums[i]
            while (nums[j] <= nums[i]) {
                j--;
            }
            
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
        
        // Reverse the suffix
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right--;
        }
        
        return nums;
    }
}

// USAGE EXAMPLES
console.log("=== BACKTRACKING ALGORITHMS EXAMPLES ===");

// Test N-Queens
console.log("N-Queens (n=4):");
const nQueensSolutions = BacktrackingAlgorithms.solveNQueens(4);
nQueensSolutions.forEach((solution, index) => {
    console.log(`Solution ${index + 1}:`);
    solution.forEach(row => console.log(row));
    console.log();
});

// Test Sudoku Solver
const sudokuBoard = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];

console.log("Solved Sudoku:");
const solvedSudoku = BacktrackingAlgorithms.solveSudoku(sudokuBoard);
solvedSudoku.forEach(row => console.log(row.join(' ')));

// Test Permutations
console.log("Permutations of [1,2,3]:");
console.log(BacktrackingAlgorithms.permute([1, 2, 3]));

// Test Combinations
console.log("Combinations C(4,2):");
console.log(BacktrackingAlgorithms.combine(4, 2));

// Test Subsets
console.log("Subsets of [1,2,3]:");
console.log(BacktrackingAlgorithms.subsets([1, 2, 3]));

// Test Subset Sum
console.log("Has subset sum 9 in [3,34,4,12,5,2]:", 
    BacktrackingAlgorithms.hasSubsetSum([3, 34, 4, 12, 5, 2], 9));

// Test Word Search
const wordBoard = [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
];
console.log("Word 'ABCCED' exists:", 
    BacktrackingAlgorithms.wordSearch(wordBoard, "ABCCED"));

// Test Generate Parentheses
console.log("Valid parentheses (n=3):");
console.log(BacktrackingAlgorithms.generateParenthesis(3));

// Test Letter Combinations
console.log("Letter combinations of '23':");
console.log(BacktrackingAlgorithms.letterCombinations("23"));

// Test Palindrome Partitioning
console.log("Palindrome partitions of 'aab':");
console.log(BacktrackingAlgorithms.partition("aab"));

// Performance test
console.time("N-Queens (n=8) - Standard");
BacktrackingAlgorithms.solveNQueens(8);
console.timeEnd("N-Queens (n=8) - Standard");

console.time("N-Queens (n=8) - Optimized");
BacktrackingOptimized.solveNQueensOptimized(8);
console.timeEnd("N-Queens (n=8) - Optimized");
```
*Notice: Backtracking systematically explores solution space using "choose, explore, unchoose" pattern for constraint satisfaction problems.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **State restoration**: forgetting to undo changes when backtracking (not restoring state)
- **Base case**: incorrect or missing base case conditions in recursive calls
- **Constraint validation**: not checking constraints early enough, leading to unnecessary exploration
- **Deep copying**: modifying shared state without proper copying in solution collection
- **Pruning**: missing optimization opportunities for early termination
- **Stack overflow**: not considering recursion depth limits for large input sizes

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Puzzle solving**: Sudoku, crosswords, and logic puzzles
- **Game AI**: chess move generation, game tree exploration
- **Constraint satisfaction**: scheduling, resource allocation problems
- **Combinatorial optimization**: finding optimal solutions in large search spaces
- **Configuration problems**: system configuration and parameter tuning

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"N-Queens Problem"** → Place N queens on chessboard without attacking each other
2. **"Sudoku Solver"** → Fill 9×9 grid following Sudoku rules using backtracking
3. **"Generate Parentheses"** → Generate all valid combinations of n pairs of parentheses
4. **"Word Search"** → Find if word exists in character grid using DFS + backtracking
5. **"Permutations"** → Generate all possible arrangements of given array elements

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Depth-First Search` · `Dynamic Programming` · `Recursion` · `Constraint Satisfaction` · `Branch and Bound`

</div>

<div class="tags">
  <span class="tag">backtracking</span>
  <span class="tag">recursion</span>
  <span class="tag">n-queens</span>
  <span class="tag">sudoku</span>
  <span class="tag">permutations</span>
  <span class="tag">combinations</span>
  <span class="tag">medior</span>
</div>

---

## Summary and Next Steps

This comprehensive guide covers the essential algorithms every developer should master, from basic sorting and searching to advanced graph algorithms and backtracking techniques. Each section includes:

- **Conceptual understanding** with mental models
- **Performance analysis** with time/space complexity
- **Runnable implementations** in JavaScript
- **Common mistakes** to avoid
- **Real-world applications** and use cases
- **Interview questions** for practice

### Practice Strategy

1. **Start with fundamentals**: Master Two Pointers, Sliding Window, and Binary Search
2. **Build data structure knowledge**: Understand how to implement and use core structures
3. **Learn pattern recognition**: Identify when to apply specific algorithms
4. **Practice implementation**: Code algorithms from scratch without looking at solutions
5. **Analyze complexity**: Always consider time and space trade-offs
6. **Solve real problems**: Apply algorithms to actual coding challenges

### Interview Preparation

Focus on these high-frequency algorithm patterns:
- Two Pointers and Sliding Window for array problems
- Binary Search for optimization and search problems
- Graph BFS/DFS for connectivity and pathfinding
- Dynamic Programming for optimization problems
- Backtracking for constraint satisfaction problems

Remember: Understanding the underlying principles and when to apply each algorithm is more important than memorizing implementations. Practice regularly and focus on problem-solving patterns rather than just individual solutions.

### Prefix Sum & Difference Array {#prefix-sum}
<!-- tags: prefix-sum, arrays, range-queries, optimization, junior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*Prefix Sum (cumulative sum) is a preprocessing technique that creates an auxiliary array where each i-th element contains the sum of the first i elements from the original array. This enables O(1) time range sum queries with O(n) preprocessing cost. Difference Array (differential array) is the inverse approach: it stores differences between consecutive elements, allowing O(1) time range updates while requiring O(n) time for final array reconstruction.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Best case**: O(n) preprocessing, O(1) query time
- **Average case**: O(n) preprocessing, O(1) query time
- **Worst case**: O(n) preprocessing, O(1) query time
- **Space**: O(n) extra memory

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**

**Prefix Sum Array Creation**
```pseudo
FUNCTION BuildPrefixSum(A)
  prefixSum ← NEW ARRAY[LENGTH(A) + 1]
  prefixSum[0] ← 0
  
  FOR i ← 1 TO LENGTH(A) DO
    prefixSum[i] ← prefixSum[i − 1] + A[i − 1]
  END FOR
  
  RETURN prefixSum
END FUNCTION
```

**Range Sum Query**
```pseudo
FUNCTION RangeSum(prefixSum, left, right)
  RETURN prefixSum[right + 1] − prefixSum[left]
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="arrays">

**Runnable mental model**
```javascript
// PREFIX SUM - COMPREHENSIVE IMPLEMENTATION

class PrefixSum {
    // 1. BASIC PREFIX SUM FOR RANGE QUERIES
    static buildPrefixSum(nums) {
        const prefixSum = new Array(nums.length + 1).fill(0);
        
        for (let i = 0; i < nums.length; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }
        
        return prefixSum;
    }
    
    static rangeSum(prefixSum, left, right) {
        return prefixSum[right + 1] - prefixSum[left];
    }
    
    // 2. SUBARRAY SUM EQUALS K
    static subarraySum(nums, k) {
        const prefixSumCount = new Map();
        prefixSumCount.set(0, 1); // empty subarray
        
        let sum = 0;
        let count = 0;
        
        for (let num of nums) {
            sum += num;
            
            // If there exists prefix sum such that: sum - prefixSum = k
            if (prefixSumCount.has(sum - k)) {
                count += prefixSumCount.get(sum - k);
            }
            
            prefixSumCount.set(sum, (prefixSumCount.get(sum) || 0) + 1);
        }
        
        return count;
    }
    
    // 3. PRODUCT OF ARRAY EXCEPT SELF
    static productExceptSelf(nums) {
        const result = new Array(nums.length);
        
        // Left products
        result[0] = 1;
        for (let i = 1; i < nums.length; i++) {
            result[i] = result[i - 1] * nums[i - 1];
        }
        
        // Right products
        let rightProduct = 1;
        for (let i = nums.length - 1; i >= 0; i--) {
            result[i] = result[i] * rightProduct;
            rightProduct *= nums[i];
        }
        
        return result;
    }
    
    // 4. 2D PREFIX SUM
    static build2DPrefixSum(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const prefixSum = Array(rows + 1).fill(null).map(() => Array(cols + 1).fill(0));
        
        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= cols; j++) {
                prefixSum[i][j] = matrix[i-1][j-1] 
                                + prefixSum[i-1][j] 
                                + prefixSum[i][j-1] 
                                - prefixSum[i-1][j-1];
            }
        }
        
        return prefixSum;
    }
    
    static sumRegion(prefixSum, row1, col1, row2, col2) {
        return prefixSum[row2 + 1][col2 + 1] 
             - prefixSum[row1][col2 + 1] 
             - prefixSum[row2 + 1][col1] 
             + prefixSum[row1][col1];
    }
}

// DIFFERENCE ARRAY IMPLEMENTATION
class DifferenceArray {
    constructor(nums) {
        this.diff = new Array(nums.length);
        this.diff[0] = nums[0];
        
        for (let i = 1; i < nums.length; i++) {
            this.diff[i] = nums[i] - nums[i - 1];
        }
    }
    
    // Range update: add val to all elements in [left, right]
    rangeUpdate(left, right, val) {
        this.diff[left] += val;
        if (right + 1 < this.diff.length) {
            this.diff[right + 1] -= val;
        }
    }
    
    // Get final array after all updates
    getArray() {
        const result = new Array(this.diff.length);
        result[0] = this.diff[0];
        
        for (let i = 1; i < this.diff.length; i++) {
            result[i] = result[i - 1] + this.diff[i];
        }
        
        return result;
    }
}

// USAGE EXAMPLES
console.log("=== PREFIX SUM EXAMPLES ===");

// Test Range Sum Query
const nums = [-2, 0, 3, -5, 2, -1];
const prefixSum = PrefixSum.buildPrefixSum(nums);
console.log("Range [0,2]:", PrefixSum.rangeSum(prefixSum, 0, 2)); // 1
console.log("Range [2,5]:", PrefixSum.rangeSum(prefixSum, 2, 5)); // -1

// Test Subarray Sum Equals K
console.log("Subarrays with sum 2:", PrefixSum.subarraySum([1, 1, 1], 2)); // 2

// Test Product Except Self
console.log("Product except self:", PrefixSum.productExceptSelf([1, 2, 3, 4])); // [24,12,8,6]

// Test 2D Prefix Sum
const matrix = [
    [3, 0, 1, 4, 2],
    [5, 6, 3, 2, 1],
    [1, 2, 0, 1, 5],
    [4, 1, 0, 1, 7],
    [1, 0, 3, 0, 5]
];
const prefixSum2D = PrefixSum.build2DPrefixSum(matrix);
console.log("Sum region (2,1) to (4,3):", PrefixSum.sumRegion(prefixSum2D, 2, 1, 4, 3)); // 8

// Test Difference Array
const diffArray = new DifferenceArray([1, 3, 5, 7, 9]);
diffArray.rangeUpdate(1, 3, 2); // Add 2 to indices 1-3
console.log("After range update:", diffArray.getArray()); // [1, 5, 7, 9, 9]
```
*Notice: Prefix Sum enables O(1) range queries, while Difference Array enables O(1) range updates.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Off-by-one error**: prefix sum indexing errors (0-based vs 1-based)
- **Boundary checks**: range query out of bounds access
- **Negative modulo**: handling negative modulo in JavaScript/Python
- **2D prefix sum**: incorrect inclusion-exclusion principle application
- **Difference array reconstruction**: forgetting to apply prefix sum

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Range Sum Query**: fast range sum lookups
- **2D Range Sum**: matrix region sums
- **Subarray problems**: sum/product based subarray search
- **Range Updates**: batch update operations optimization
- **Corporate flight bookings**: seat reservation optimization

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Range Sum Query - Immutable"** → Prefix sum basics, O(1) query time
2. **"Subarray Sum Equals K"** → HashMap + prefix sum combination
3. **"Range Sum Query 2D - Immutable"** → 2D prefix sum, inclusion-exclusion principle
4. **"Corporate Flight Bookings"** → Difference array for range updates
5. **"Product of Array Except Self"** → Left/right prefix product arrays

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Segment Tree` · `Fenwick Tree` · `Sparse Table` · `Sliding Window` · `Two Pointers`

</div>

<div class="tags">
  <span class="tag">prefix-sum</span>
  <span class="tag">arrays</span>
  <span class="tag">range-queries</span>
  <span class="tag">optimization</span>
  <span class="tag">junior</span>
</div>

### Monotonic Stack {#monotonic-stack}
<!-- tags: monotonic-stack, stack, arrays, next-greater, optimization, junior -->

<div class="concept-section mental-model">

🧩 **Concept Definition**  
*Monotonic Stack is a stack-based data structure that maintains a strictly monotonic increasing or decreasing order among its elements. During operation, when pushing a new element onto the stack, we first pop all elements that violate the monotonic property. It's typically used for "next greater/smaller element" type problems with O(n) time complexity, where each element is pushed and popped at most once.*

</div>

<div class="concept-section performance">

📊 **Time and space complexity**
- **Best case**: O(n) time, O(1) space (each element pushed and popped once)
- **Average case**: O(n) time, O(n) space
- **Worst case**: O(n) time, O(n) space
- **Space**: O(n) stack size

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algorithm steps (pseudocode)**

**Next Greater Element (increasing monotonic stack)**
```pseudo
FUNCTION NextGreaterElement(A)
  stack ← EMPTY_STACK  // stores indices
  result ← NEW ARRAY[LENGTH(A)]
  
  FOR i ← 0 TO LENGTH(A) − 1 DO
    // Pop from stack while current > stack.top element
    WHILE NOT EMPTY(stack) AND A[i] > A[TOP(stack)] DO
      index ← POP(stack)
      result[index] ← A[i]
    END WHILE
    
    PUSH(stack, i)
  END FOR
  
  // Remaining elements didn't find greater element
  WHILE NOT EMPTY(stack) DO
    index ← POP(stack)
    result[index] ← −1
  END WHILE
  
  RETURN result
END FUNCTION
```

</div>

<div class="runnable-model" data-filter="stack arrays">

**Runnable mental model**
```javascript
// MONOTONIC STACK - COMPREHENSIVE IMPLEMENTATION

class MonotonicStack {
    // 1. NEXT GREATER ELEMENT I
    static nextGreaterElement(nums1, nums2) {
        const nextGreaterMap = new Map();
        const stack = [];
        
        // Build next greater map for nums2
        for (let num of nums2) {
            while (stack.length > 0 && stack[stack.length - 1] < num) {
                nextGreaterMap.set(stack.pop(), num);
            }
            stack.push(num);
        }
        
        // Build result for nums1
        const result = [];
        for (let num of nums1) {
            result.push(nextGreaterMap.get(num) || -1);
        }
        
        return result;
    }
    
    // 2. DAILY TEMPERATURES
    static dailyTemperatures(temperatures) {
        const result = new Array(temperatures.length).fill(0);
        const stack = []; // indices
        
        for (let i = 0; i < temperatures.length; i++) {
            while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
                const prevIndex = stack.pop();
                result[prevIndex] = i - prevIndex;
            }
            stack.push(i);
        }
        
        return result;
    }
    
    // 3. LARGEST RECTANGLE IN HISTOGRAM
    static largestRectangleArea(heights) {
        const stack = [];
        let maxArea = 0;
        
        for (let i = 0; i <= heights.length; i++) {
            const currentHeight = (i === heights.length) ? 0 : heights[i];
            
            while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
                const height = heights[stack.pop()];
                const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            
            stack.push(i);
        }
        
        return maxArea;
    }
    
    // 4. NEXT GREATER ELEMENT II (CIRCULAR ARRAY)
    static nextGreaterElementsCircular(nums) {
        const n = nums.length;
        const result = new Array(n).fill(-1);
        const stack = []; // indices
        
        // Process array twice to handle circular nature
        for (let i = 0; i < 2 * n; i++) {
            const actualIndex = i % n;
            
            while (stack.length > 0 && nums[actualIndex] > nums[stack[stack.length - 1]]) {
                const prevIndex = stack.pop();
                result[prevIndex] = nums[actualIndex];
            }
            
            // Only push indices in first iteration
            if (i < n) {
                stack.push(actualIndex);
            }
        }
        
        return result;
    }
    
    // 5. SLIDING WINDOW MAXIMUM
    static maxSlidingWindow(nums, k) {
        const result = [];
        const deque = []; // indices in decreasing order of values
        
        for (let i = 0; i < nums.length; i++) {
            // Remove indices outside current window
            while (deque.length > 0 && deque[0] <= i - k) {
                deque.shift();
            }
            
            // Maintain decreasing order
            while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
                deque.pop();
            }
            
            deque.push(i);
            
            // Add result when window is complete
            if (i >= k - 1) {
                result.push(nums[deque[0]]);
            }
        }
        
        return result;
    }
    
    // 6. REMOVE K DIGITS
    static removeKdigits(num, k) {
        const stack = [];
        
        for (let digit of num) {
            while (stack.length > 0 && k > 0 && stack[stack.length - 1] > digit) {
                stack.pop();
                k--;
            }
            stack.push(digit);
        }
        
        // Remove remaining k digits from end
        while (k > 0) {
            stack.pop();
            k--;
        }
        
        // Build result
        let result = stack.join('');
        
        // Remove leading zeros
        result = result.replace(/^0+/, '');
        
        return result.length === 0 ? "0" : result;
    }
    
    // 7. TRAPPING RAIN WATER
    static trap(height) {
        if (height.length === 0) return 0;
        
        const stack = []; // indices
        let water = 0;
        
        for (let i = 0; i < height.length; i++) {
            while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
                const bottomIndex = stack.pop();
                
                if (stack.length === 0) break;
                
                const leftIndex = stack[stack.length - 1];
                const width = i - leftIndex - 1;
                const minHeight = Math.min(height[leftIndex], height[i]) - height[bottomIndex];
                
                water += width * minHeight;
            }
            
            stack.push(i);
        }
        
        return water;
    }
    
    // 8. SUM OF SUBARRAY MINIMUMS
    static sumSubarrayMins(arr) {
        const MOD = 1e9 + 7;
        const stack = [];
        let result = 0;
        
        for (let i = 0; i <= arr.length; i++) {
            const currentVal = i === arr.length ? 0 : arr[i];
            
            while (stack.length > 0 && currentVal < arr[stack[stack.length - 1]]) {
                const minIndex = stack.pop();
                const leftBound = stack.length === 0 ? -1 : stack[stack.length - 1];
                const rightBound = i;
                
                const count = (minIndex - leftBound) * (rightBound - minIndex);
                result = (result + arr[minIndex] * count) % MOD;
            }
            
            stack.push(i);
        }
        
        return result;
    }
}

// USAGE EXAMPLES
console.log("=== MONOTONIC STACK EXAMPLES ===");

// Test Daily Temperatures
const temps = [73, 74, 75, 71, 69, 72, 76, 73];
console.log("Daily temperatures:", MonotonicStack.dailyTemperatures(temps));
// [1, 1, 4, 2, 1, 1, 0, 0]

// Test Largest Rectangle in Histogram
const heights = [2, 1, 5, 6, 2, 3];
console.log("Largest rectangle:", MonotonicStack.largestRectangleArea(heights)); // 10

// Test Next Greater Element (Circular)
console.log("Next greater (circular):", MonotonicStack.nextGreaterElementsCircular([1, 2, 1])); 
// [2, -1, 2]

// Test Sliding Window Maximum
const nums = [1, 3, -1, -3, 5, 3, 6, 7];
console.log("Sliding window max:", MonotonicStack.maxSlidingWindow(nums, 3)); 
// [3, 3, 5, 5, 6, 7]

// Test Remove K Digits
console.log("Remove K digits:", MonotonicStack.removeKdigits("1432219", 3)); // "1219"

// Test Trapping Rain Water
const rainHeight = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log("Trapped water:", MonotonicStack.trap(rainHeight)); // 6
```
*Notice: Monotonic Stack efficiently solves "next greater/smaller element" problems by maintaining stack order and processing each element exactly once.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Stack content**: storing values vs indices - usually indices are preferable
- **Monotonicity direction**: increasing vs decreasing stack decision based on problem
- **Pop condition**: `<` vs `<=` - equality handling can be important
- **Boundary handling**: processing last element, adding 0 or -1
- **Result initialization**: correct default values (-1, 0, infinity)

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Next/Previous Greater/Smaller**: temperature, stock price analysis
- **Histogram problems**: largest rectangle, maximal rectangle
- **Stack operations**: valid parentheses, calculator problems
- **Sliding window maximum**: real-time data analysis
- **Pattern detection**: 132 pattern, increasing subsequences

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Daily Temperatures"** → Monotonic decreasing stack for next greater element
2. **"Largest Rectangle in Histogram"** → Stack-based area calculation with index tracking
3. **"Trapping Rain Water"** → Two approaches: two pointers vs monotonic stack
4. **"Next Greater Element II"** → Circular array handling with double iteration
5. **"Sliding Window Maximum"** → Monotonic deque for O(n) solution

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Stack` · `Sliding Window` · `Two Pointers` · `Histogram Problems` · `Deque`

</div>

<div class="tags">
  <span class="tag">monotonic-stack</span>
  <span class="tag">stack</span>
  <span class="tag">arrays</span>
  <span class="tag">next-greater</span>
  <span class="tag">optimization</span>
  <span class="tag">junior</span>
</div>

---

### Heap Patterns {#heap-patterns}
<!-- tags: heap, priority-queue, top-k, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Heap patterns solve problems requiring priority-based element access**. **Min Heap**: smallest element at root, **Max Heap**: largest element at root. **Common patterns**: **Top-K elements** (keep K largest/smallest), **Merge K sorted** (streams, arrays), **Meeting Rooms** (intervals scheduling), **Median finding** (two heaps), **Task Scheduling** (frequency-based), **Sliding Window Maximum** (deque + heap). **Time complexity**: insert/delete O(log n), peek O(1). **Space**: O(k) for Top-K problems. **Java**: PriorityQueue (min heap default), **JavaScript**: custom implementation or library. **Key insight**: heap maintains partial order efficiently.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Efficient priority access**: O(log n) operations vs O(n) for unsorted array
- **Memory efficient**: O(k) space for Top-K vs O(n) for sorting entire array
- **Real-time processing**: streaming data, event scheduling, resource allocation
- **Interview frequency**: very common in FAANG interviews

</div>

<div class="runnable-model" data-filter="heap-patterns">

**Runnable mental model**
```java
// HEAP PATTERNS IMPLEMENTATION

import java.util.*;

public class HeapPatterns {
    
    // Pattern 1: Top-K Elements (K Largest/Smallest)
    public static List<Integer> findKLargest(int[] nums, int k) {
        // Min heap to maintain K largest elements
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll(); // Remove smallest
            }
        }
        
        return new ArrayList<>(minHeap);
    }
    
    public static List<Integer> findKSmallest(int[] nums, int k) {
        // Max heap to maintain K smallest elements
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
        
        for (int num : nums) {
            maxHeap.offer(num);
            if (maxHeap.size() > k) {
                maxHeap.poll(); // Remove largest
            }
        }
        
        return new ArrayList<>(maxHeap);
    }
    
    // Pattern 2: Kth Largest Element in Array
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        return minHeap.peek();
    }
    
    // Pattern 3: Meeting Rooms II (Minimum Rooms Required)
    public static int minMeetingRooms(int[][] intervals) {
        if (intervals.length == 0) return 0;
        
        // Sort by start time
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        
        // Min heap to track end times of meetings in progress
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        for (int[] interval : intervals) {
            // Remove meetings that have ended
            if (!minHeap.isEmpty() && minHeap.peek() <= interval[0]) {
                minHeap.poll();
            }
            
            // Add current meeting's end time
            minHeap.offer(interval[1]);
        }
        
        return minHeap.size();
    }
    
    // Pattern 4: Task Scheduler with Cooldown
    public static int leastInterval(char[] tasks, int n) {
        Map<Character, Integer> taskCounts = new HashMap<>();
        for (char task : tasks) {
            taskCounts.put(task, taskCounts.getOrDefault(task, 0) + 1);
        }
        
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
        maxHeap.addAll(taskCounts.values());
        
        int time = 0;
        Queue<int[]> cooldown = new LinkedList<>(); // [count, availableTime]
        
        while (!maxHeap.isEmpty() || !cooldown.isEmpty()) {
            time++;
            
            // Add back tasks from cooldown
            if (!cooldown.isEmpty() && cooldown.peek()[1] == time) {
                maxHeap.offer(cooldown.poll()[0]);
            }
            
            // Process next task
            if (!maxHeap.isEmpty()) {
                int count = maxHeap.poll() - 1;
                if (count > 0) {
                    cooldown.offer(new int[]{count, time + n + 1});
                }
            }
        }
        
        return time;
    }
    
    // Pattern 5: Merge K Sorted Arrays
    public static List<Integer> mergeKSortedArrays(List<List<Integer>> arrays) {
        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> 
            arrays.get(a[0]).get(a[1]) - arrays.get(b[0]).get(b[1])
        );
        
        // Initialize heap with first element from each array
        for (int i = 0; i < arrays.size(); i++) {
            if (!arrays.get(i).isEmpty()) {
                minHeap.offer(new int[]{i, 0}); // [arrayIndex, elementIndex]
            }
        }
        
        List<Integer> result = new ArrayList<>();
        
        while (!minHeap.isEmpty()) {
            int[] current = minHeap.poll();
            int arrayIdx = current[0];
            int elemIdx = current[1];
            
            result.add(arrays.get(arrayIdx).get(elemIdx));
            
            // Add next element from the same array
            if (elemIdx + 1 < arrays.get(arrayIdx).size()) {
                minHeap.offer(new int[]{arrayIdx, elemIdx + 1});
            }
        }
        
        return result;
    }
    
    // Pattern 6: Reorganize String (Greedy with Heap)
    public static String reorganizeString(String s) {
        Map<Character, Integer> charCounts = new HashMap<>();
        for (char c : s.toCharArray()) {
            charCounts.put(c, charCounts.getOrDefault(c, 0) + 1);
        }
        
        // Max heap by frequency
        PriorityQueue<Character> maxHeap = new PriorityQueue<>((a, b) -> 
            charCounts.get(b) - charCounts.get(a)
        );
        maxHeap.addAll(charCounts.keySet());
        
        StringBuilder result = new StringBuilder();
        Character previousChar = null;
        
        while (!maxHeap.isEmpty()) {
            char current = maxHeap.poll();
            result.append(current);
            
            // Decrease count
            charCounts.put(current, charCounts.get(current) - 1);
            
            // Add back previous character if it still has count
            if (previousChar != null && charCounts.get(previousChar) > 0) {
                maxHeap.offer(previousChar);
            }
            
            // Set current as previous for next iteration
            previousChar = charCounts.get(current) > 0 ? current : null;
        }
        
        return result.length() == s.length() ? result.toString() : "";
    }
    
    // Pattern 7: Find Median from Data Stream (Two Heaps)
    static class MedianFinder {
        private PriorityQueue<Integer> maxHeap; // Lower half
        private PriorityQueue<Integer> minHeap; // Upper half
        
        public MedianFinder() {
            maxHeap = new PriorityQueue<>((a, b) -> b - a);
            minHeap = new PriorityQueue<>();
        }
        
        public void addNum(int num) {
            maxHeap.offer(num);
            minHeap.offer(maxHeap.poll());
            
            // Balance heaps
            if (minHeap.size() > maxHeap.size()) {
                maxHeap.offer(minHeap.poll());
            }
        }
        
        public double findMedian() {
            if (maxHeap.size() > minHeap.size()) {
                return maxHeap.peek();
            }
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }
    }
    
    // Pattern 8: Sliding Window Maximum (Deque + Heap hybrid approach)
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums.length == 0) return new int[0];
        
        int[] result = new int[nums.length - k + 1];
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        
        for (int i = 0; i < nums.length; i++) {
            // Add current element
            maxHeap.offer(new int[]{nums[i], i});
            
            // Remove elements outside window
            while (!maxHeap.isEmpty() && maxHeap.peek()[1] <= i - k) {
                maxHeap.poll();
            }
            
            // Record maximum for current window
            if (i >= k - 1) {
                result[i - k + 1] = maxHeap.peek()[0];
            }
        }
        
        return result;
    }
    
    // Pattern 9: IPO (Initial Public Offering) - Maximum Capital
    public static int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        // Min heap for projects by capital requirement
        PriorityQueue<int[]> minCapitalHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        // Max heap for available projects by profit
        PriorityQueue<Integer> maxProfitHeap = new PriorityQueue<>((a, b) -> b - a);
        
        // Add all projects to capital heap
        for (int i = 0; i < profits.length; i++) {
            minCapitalHeap.offer(new int[]{capital[i], profits[i]});
        }
        
        for (int i = 0; i < k; i++) {
            // Move affordable projects to profit heap
            while (!minCapitalHeap.isEmpty() && minCapitalHeap.peek()[0] <= w) {
                int[] project = minCapitalHeap.poll();
                maxProfitHeap.offer(project[1]);
            }
            
            // Select most profitable project
            if (maxProfitHeap.isEmpty()) {
                break;
            }
            
            w += maxProfitHeap.poll();
        }
        
        return w;
    }
    
    // Pattern 10: Frequency-based Top K Elements
    public static List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> frequency = new HashMap<>();
        for (String word : words) {
            frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }
        
        // Min heap with custom comparator for frequency + lexicographic order
        PriorityQueue<String> minHeap = new PriorityQueue<>((a, b) -> {
            int freqCompare = frequency.get(a) - frequency.get(b);
            if (freqCompare == 0) {
                return b.compareTo(a); // Reverse lexicographic for min heap
            }
            return freqCompare;
        });
        
        for (String word : frequency.keySet()) {
            minHeap.offer(word);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        List<String> result = new ArrayList<>();
        while (!minHeap.isEmpty()) {
            result.add(0, minHeap.poll()); // Add to front to reverse order
        }
        
        return result;
    }
}

// JavaScript Implementation
class HeapPatterns {
    // Min Heap implementation
    static class MinHeap {
        constructor(compareFn = (a, b) => a - b) {
            this.heap = [];
            this.compare = compareFn;
        }
        
        offer(val) {
            this.heap.push(val);
            this.bubbleUp();
        }
        
        poll() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();
            
            const result = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.bubbleDown();
            return result;
        }
        
        peek() {
            return this.heap.length > 0 ? this.heap[0] : null;
        }
        
        size() {
            return this.heap.length;
        }
        
        bubbleUp() {
            let index = this.heap.length - 1;
            while (index > 0) {
                let parentIndex = Math.floor((index - 1) / 2);
                if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;
                
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            }
        }
        
        bubbleDown() {
            let index = 0;
            while (true) {
                let leftChild = 2 * index + 1;
                let rightChild = 2 * index + 2;
                let smallest = index;
                
                if (leftChild < this.heap.length && 
                    this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
                    smallest = leftChild;
                }
                
                if (rightChild < this.heap.length && 
                    this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
                    smallest = rightChild;
                }
                
                if (smallest === index) break;
                
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest;
            }
        }
    }
    
    // Find K Largest Elements
    static findKLargest(nums, k) {
        const minHeap = new this.MinHeap();
        
        for (const num of nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        return minHeap.heap.slice();
    }
    
    // Meeting Rooms II
    static minMeetingRooms(intervals) {
        if (intervals.length === 0) return 0;
        
        intervals.sort((a, b) => a[0] - b[0]);
        const minHeap = new this.MinHeap();
        
        for (const interval of intervals) {
            if (minHeap.size() > 0 && minHeap.peek() <= interval[0]) {
                minHeap.poll();
            }
            minHeap.offer(interval[1]);
        }
        
        return minHeap.size();
    }
    
    // Task Scheduler
    static leastInterval(tasks, n) {
        const taskCounts = new Map();
        for (const task of tasks) {
            taskCounts.set(task, (taskCounts.get(task) || 0) + 1);
        }
        
        const maxHeap = new this.MinHeap((a, b) => b - a);
        for (const count of taskCounts.values()) {
            maxHeap.offer(count);
        }
        
        let time = 0;
        const cooldown = [];
        
        while (maxHeap.size() > 0 || cooldown.length > 0) {
            time++;
            
            // Add back tasks from cooldown
            if (cooldown.length > 0 && cooldown[0][1] === time) {
                maxHeap.offer(cooldown.shift()[0]);
            }
            
            // Process next task
            if (maxHeap.size() > 0) {
                const count = maxHeap.poll() - 1;
                if (count > 0) {
                    cooldown.push([count, time + n + 1]);
                }
            }
        }
        
        return time;
    }
    
    // Median Finder
    static class MedianFinder {
        constructor() {
            this.maxHeap = new HeapPatterns.MinHeap((a, b) => b - a); // Lower half
            this.minHeap = new HeapPatterns.MinHeap(); // Upper half
        }
        
        addNum(num) {
            this.maxHeap.offer(num);
            this.minHeap.offer(this.maxHeap.poll());
            
            if (this.minHeap.size() > this.maxHeap.size()) {
                this.maxHeap.offer(this.minHeap.poll());
            }
        }
        
        findMedian() {
            if (this.maxHeap.size() > this.minHeap.size()) {
                return this.maxHeap.peek();
            }
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2.0;
        }
    }
}

// TypeScript Implementation with Generics
interface HeapComparator<T> {
    (a: T, b: T): number;
}

class TypedMinHeap<T> {
    private heap: T[] = [];
    
    constructor(private compare: HeapComparator<T> = (a: T, b: T) => (a as any) - (b as any)) {}
    
    offer(val: T): void {
        this.heap.push(val);
        this.bubbleUp();
    }
    
    poll(): T | null {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop()!;
        
        const result = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown();
        return result;
    }
    
    peek(): T | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
    
    size(): number {
        return this.heap.length;
    }
    
    isEmpty(): boolean {
        return this.heap.length === 0;
    }
    
    private bubbleUp(): void {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;
            
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    private bubbleDown(): void {
        let index = 0;
        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let smallest = index;
            
            if (leftChild < this.heap.length && 
                this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
                smallest = leftChild;
            }
            
            if (rightChild < this.heap.length && 
                this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
                smallest = rightChild;
            }
            
            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

// TypeScript Heap Patterns
class TypedHeapPatterns {
    // Top K Frequent Elements with proper typing
    static topKFrequent<T>(elements: T[], k: number): T[] {
        const frequency = new Map<T, number>();
        for (const element of elements) {
            frequency.set(element, (frequency.get(element) || 0) + 1);
        }
        
        const minHeap = new TypedMinHeap<T>((a, b) => 
            (frequency.get(a) || 0) - (frequency.get(b) || 0)
        );
        
        for (const element of frequency.keys()) {
            minHeap.offer(element);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        const result: T[] = [];
        while (!minHeap.isEmpty()) {
            const element = minHeap.poll();
            if (element !== null) {
                result.unshift(element); // Add to front to reverse order
            }
        }
        
        return result;
    }
    
    // Generic merge function for sorted arrays
    static mergeSorted<T>(arrays: T[][], compare: HeapComparator<T>): T[] {
        interface HeapElement {
            value: T;
            arrayIndex: number;
            elementIndex: number;
        }
        
        const minHeap = new TypedMinHeap<HeapElement>((a, b) => 
            compare(a.value, b.value)
        );
        
        // Initialize heap
        for (let i = 0; i < arrays.length; i++) {
            if (arrays[i].length > 0) {
                minHeap.offer({
                    value: arrays[i][0],
                    arrayIndex: i,
                    elementIndex: 0
                });
            }
        }
        
        const result: T[] = [];
        
        while (!minHeap.isEmpty()) {
            const current = minHeap.poll()!;
            result.push(current.value);
            
            // Add next element from same array
            const nextIndex = current.elementIndex + 1;
            if (nextIndex < arrays[current.arrayIndex].length) {
                minHeap.offer({
                    value: arrays[current.arrayIndex][nextIndex],
                    arrayIndex: current.arrayIndex,
                    elementIndex: nextIndex
                });
            }
        }
        
        return result;
    }
}

// Test Examples
console.log("=== HEAP PATTERNS EXAMPLES ===");

// Test K Largest
const nums = [3, 2, 1, 5, 6, 4];
console.log("K=2 largest:", HeapPatterns.findKLargest(nums, 2)); // [5, 6]

// Test Meeting Rooms
const meetings = [[0, 30], [5, 10], [15, 20]];
console.log("Min meeting rooms:", HeapPatterns.minMeetingRooms(meetings)); // 2

// Test Task Scheduler
const tasks = ['A', 'A', 'A', 'B', 'B', 'B'];
console.log("Min intervals:", HeapPatterns.leastInterval(tasks, 2)); // 8

// Test Median Finder
const medianFinder = new HeapPatterns.MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
console.log("Median:", medianFinder.findMedian()); // 1.5
medianFinder.addNum(3);
console.log("Median:", medianFinder.findMedian()); // 2

// Test Reorganize String
console.log("Reorganized:", HeapPatterns.reorganizeString("aab")); // "aba"

// Test Top K Frequent
const words = ["i", "love", "leetcode", "i", "love", "coding"];
console.log("Top 2 frequent:", HeapPatterns.topKFrequent(words, 2)); // ["i", "love"]
```
*Notice: Heap patterns efficiently solve priority-based problems by maintaining partial order with O(log n) operations.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Min vs Max heap confusion**: Use min heap for K largest, max heap for K smallest
- **Heap size management**: Remember to remove excess elements when maintaining fixed size
- **Comparator direction**: Ensure correct ordering for custom objects
- **Empty heap checks**: Always verify heap is not empty before peek/poll
- **Two heaps balancing**: Maintain size difference ≤ 1 for median finding
- **Index vs value storage**: Consider storing indices when position matters

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Data streaming**: real-time top-K, median calculation
- **Task scheduling**: priority queues, resource allocation
- **Graph algorithms**: Dijkstra's algorithm, Prim's MST
- **System design**: load balancing, rate limiting
- **Game development**: leaderboards, AI decision making

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Kth Largest Element"** → Min heap of size K
2. **"Meeting Rooms II"** → Min heap for tracking end times
3. **"Task Scheduler"** → Max heap with cooldown queue
4. **"Merge K Sorted Lists"** → Min heap with pointer tracking
5. **"Find Median from Data Stream"** → Two heaps (max + min)
6. **"Top K Frequent Elements"** → Min heap with frequency map
7. **"Reorganize String"** → Max heap with greedy selection

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Priority Queue` · `Sorting` · `Two Pointers` · `Merge Sort` · `Quick Select` · `Dijkstra`

</div>

<div class="tags">
  <span class="tag">heap</span>
  <span class="tag">priority-queue</span>
  <span class="tag">top-k</span>
  <span class="tag">sorting</span>
  <span class="tag">optimization</span>
  <span class="tag">medior</span>
</div>

---

### Union-Find (Disjoint Set) {#union-find}
<!-- tags: union-find, disjoint-set, graph-connectivity, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Union-Find (Disjoint Set Union - DSU) efficiently tracks connectivity in dynamic sets**. **Core operations**: **Find(x)** - determine which set x belongs to (with path compression), **Union(x,y)** - merge sets containing x and y (with union by rank/size). **Path compression**: flattens tree during find to optimize future operations. **Union by rank**: attach smaller tree under larger tree root. **Time complexity**: O(α(n)) amortized per operation where α is inverse Ackermann function (practically constant). **Applications**: **Connected Components**, **Cycle Detection**, **Kruskal's MST**, **Percolation**, **Dynamic Connectivity**. **Space**: O(n) for parent and rank arrays.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Dynamic connectivity**: efficiently track changing connections
- **Near-constant time**: amortized O(1) for practical purposes
- **Graph algorithms**: foundation for MST and cycle detection
- **System design**: network connectivity, social networks, clustering

</div>

<div class="runnable-model" data-filter="union-find">

**Runnable mental model**
```java
// UNION-FIND IMPLEMENTATION AND PATTERNS

public class UnionFind {
    private int[] parent;
    private int[] rank;     // For union by rank
    private int[] size;     // For union by size
    private int components; // Number of connected components
    
    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        size = new int[n];
        components = n;
        
        for (int i = 0; i < n; i++) {
            parent[i] = i;  // Each element is its own parent initially
            rank[i] = 0;    // Initial rank is 0
            size[i] = 1;    // Initial size is 1
        }
    }
    
    // Find with path compression
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    // Union by rank
    public boolean unionByRank(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) {
            return false; // Already in same set
        }
        
        // Union by rank: attach smaller rank tree under root of higher rank tree
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++; // Increase rank only if ranks were equal
        }
        
        components--;
        return true;
    }
    
    // Union by size (alternative to union by rank)
    public boolean unionBySize(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) {
            return false;
        }
        
        // Union by size: attach smaller size tree under root of larger size tree
        if (size[rootX] < size[rootY]) {
            parent[rootX] = rootY;
            size[rootY] += size[rootX];
        } else {
            parent[rootY] = rootX;
            size[rootX] += size[rootY];
        }
        
        components--;
        return true;
    }
    
    // Check if two elements are connected
    public boolean isConnected(int x, int y) {
        return find(x) == find(y);
    }
    
    // Get number of connected components
    public int getComponentCount() {
        return components;
    }
    
    // Get size of component containing x
    public int getComponentSize(int x) {
        return size[find(x)];
    }
    
    // Get all elements in the same component as x
    public List<Integer> getComponent(int x) {
        int root = find(x);
        List<Integer> component = new ArrayList<>();
        
        for (int i = 0; i < parent.length; i++) {
            if (find(i) == root) {
                component.add(i);
            }
        }
        
        return component;
    }
}

// UNION-FIND ALGORITHM PATTERNS

public class UnionFindPatterns {
    
    // Pattern 1: Number of Connected Components in Undirected Graph
    public static int countComponents(int n, int[][] edges) {
        UnionFind uf = new UnionFind(n);
        
        for (int[] edge : edges) {
            uf.unionByRank(edge[0], edge[1]);
        }
        
        return uf.getComponentCount();
    }
    
    // Pattern 2: Graph Valid Tree (must be connected with no cycles)
    public static boolean validTree(int n, int[][] edges) {
        // A valid tree has exactly n-1 edges
        if (edges.length != n - 1) {
            return false;
        }
        
        UnionFind uf = new UnionFind(n);
        
        // If union returns false, there's a cycle
        for (int[] edge : edges) {
            if (!uf.unionByRank(edge[0], edge[1])) {
                return false; // Cycle detected
            }
        }
        
        return uf.getComponentCount() == 1; // Must be exactly one component
    }
    
    // Pattern 3: Redundant Connection (find edge that creates cycle)
    public static int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        UnionFind uf = new UnionFind(n + 1); // 1-indexed
        
        for (int[] edge : edges) {
            if (!uf.unionByRank(edge[0], edge[1])) {
                return edge; // This edge creates a cycle
            }
        }
        
        return new int[0]; // Should not reach here
    }
    
    // Pattern 4: Accounts Merge (merge accounts with common emails)
    public static List<List<String>> accountsMerge(List<List<String>> accounts) {
        Map<String, Integer> emailToId = new HashMap<>();
        Map<String, String> emailToName = new HashMap<>();
        int id = 0;
        
        // Assign unique ID to each email
        for (List<String> account : accounts) {
            String name = account.get(0);
            for (int i = 1; i < account.size(); i++) {
                String email = account.get(i);
                if (!emailToId.containsKey(email)) {
                    emailToId.put(email, id++);
                }
                emailToName.put(email, name);
            }
        }
        
        UnionFind uf = new UnionFind(id);
        
        // Union emails from same account
        for (List<String> account : accounts) {
            int firstEmailId = emailToId.get(account.get(1));
            for (int i = 2; i < account.size(); i++) {
                int emailId = emailToId.get(account.get(i));
                uf.unionByRank(firstEmailId, emailId);
            }
        }
        
        // Group emails by root
        Map<Integer, List<String>> components = new HashMap<>();
        for (String email : emailToId.keySet()) {
            int root = uf.find(emailToId.get(email));
            components.computeIfAbsent(root, k -> new ArrayList<>()).add(email);
        }
        
        // Build result
        List<List<String>> result = new ArrayList<>();
        for (List<String> emails : components.values()) {
            Collections.sort(emails);
            List<String> account = new ArrayList<>();
            account.add(emailToName.get(emails.get(0))); // Name
            account.addAll(emails);
            result.add(account);
        }
        
        return result;
    }
    
    // Pattern 5: Number of Islands II (dynamic island formation)
    public static List<Integer> numIslands2(int m, int n, int[][] positions) {
        List<Integer> result = new ArrayList<>();
        UnionFind uf = new UnionFind(m * n);
        boolean[][] grid = new boolean[m][n];
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        int islands = 0;
        
        for (int[] pos : positions) {
            int row = pos[0], col = pos[1];
            
            if (grid[row][col]) {
                result.add(islands); // Already an island
                continue;
            }
            
            grid[row][col] = true;
            islands++;
            
            // Check and union with adjacent islands
            for (int[] dir : directions) {
                int newRow = row + dir[0];
                int newCol = col + dir[1];
                
                if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && grid[newRow][newCol]) {
                    int currentId = row * n + col;
                    int adjacentId = newRow * n + newCol;
                    
                    if (uf.unionByRank(currentId, adjacentId)) {
                        islands--; // Two islands merged into one
                    }
                }
            }
            
            result.add(islands);
        }
        
        return result;
    }
    
    // Pattern 6: Satisfiability of Equality Equations
    public static boolean equationsPossible(String[] equations) {
        UnionFind uf = new UnionFind(26); // 26 letters
        
        // First pass: process all equality constraints
        for (String eq : equations) {
            if (eq.charAt(1) == '=') {
                int x = eq.charAt(0) - 'a';
                int y = eq.charAt(3) - 'a';
                uf.unionByRank(x, y);
            }
        }
        
        // Second pass: check all inequality constraints
        for (String eq : equations) {
            if (eq.charAt(1) == '!') {
                int x = eq.charAt(0) - 'a';
                int y = eq.charAt(3) - 'a';
                if (uf.isConnected(x, y)) {
                    return false; // Contradiction found
                }
            }
        }
        
        return true;
    }
    
    // Pattern 7: Most Stones Removed with Same Row or Column
    public static int removeStones(int[][] stones) {
        int n = stones.length;
        UnionFind uf = new UnionFind(n);
        
        // Union stones that share row or column
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (stones[i][0] == stones[j][0] || stones[i][1] == stones[j][1]) {
                    uf.unionByRank(i, j);
                }
            }
        }
        
        // Can remove all stones except one from each component
        return n - uf.getComponentCount();
    }
    
    // Pattern 8: Kruskal's Minimum Spanning Tree
    static class Edge implements Comparable<Edge> {
        int src, dest, weight;
        
        Edge(int src, int dest, int weight) {
            this.src = src;
            this.dest = dest;
            this.weight = weight;
        }
        
        @Override
        public int compareTo(Edge other) {
            return Integer.compare(this.weight, other.weight);
        }
    }
    
    public static List<Edge> kruskalMST(int n, List<Edge> edges) {
        Collections.sort(edges); // Sort by weight
        UnionFind uf = new UnionFind(n);
        List<Edge> mst = new ArrayList<>();
        
        for (Edge edge : edges) {
            if (uf.unionByRank(edge.src, edge.dest)) {
                mst.add(edge);
                if (mst.size() == n - 1) {
                    break; // MST complete
                }
            }
        }
        
        return mst;
    }
    
    // Pattern 9: Percolation (grid connectivity problem)
    public static boolean percolates(boolean[][] grid) {
        int m = grid.length, n = grid[0].length;
        UnionFind uf = new UnionFind(m * n + 2); // +2 for virtual top and bottom
        int virtualTop = m * n;
        int virtualBottom = m * n + 1;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j]) {
                    int cellId = i * n + j;
                    
                    // Connect to virtual top if in first row
                    if (i == 0) {
                        uf.unionByRank(cellId, virtualTop);
                    }
                    
                    // Connect to virtual bottom if in last row
                    if (i == m - 1) {
                        uf.unionByRank(cellId, virtualBottom);
                    }
                    
                    // Connect to adjacent open cells
                    int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
                    for (int[] dir : directions) {
                        int newRow = i + dir[0];
                        int newCol = j + dir[1];
                        
                        if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && 
                            grid[newRow][newCol]) {
                            int adjacentId = newRow * n + newCol;
                            uf.unionByRank(cellId, adjacentId);
                        }
                    }
                }
            }
        }
        
        return uf.isConnected(virtualTop, virtualBottom);
    }
}

// JavaScript Implementation
class JSUnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.size = new Array(n).fill(1);
        this.components = n;
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return false;
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
            this.size[rootY] += this.size[rootX];
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
        } else {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
            this.rank[rootX]++;
        }
        
        this.components--;
        return true;
    }
    
    isConnected(x, y) {
        return this.find(x) === this.find(y);
    }
    
    getComponentCount() {
        return this.components;
    }
    
    getComponentSize(x) {
        return this.size[this.find(x)];
    }
}

// Example Usage and Tests
console.log("=== UNION-FIND EXAMPLES ===");

// Test basic union-find operations
const uf = new UnionFind(5);
console.log("Initial components:", uf.getComponentCount()); // 5

uf.unionByRank(0, 1);
uf.unionByRank(2, 3);
console.log("After unions:", uf.getComponentCount()); // 3

console.log("0 and 1 connected:", uf.isConnected(0, 1)); // true
console.log("1 and 2 connected:", uf.isConnected(1, 2)); // false

// Test graph connectivity
const edges = [[0, 1], [1, 2], [3, 4]];
console.log("Connected components:", UnionFindPatterns.countComponents(5, edges)); // 2

// Test valid tree
const treeEdges = [[0, 1], [0, 2], [0, 3], [1, 4]];
console.log("Valid tree:", UnionFindPatterns.validTree(5, treeEdges)); // true

// Test redundant connection
const cycleEdges = [[1, 2], [1, 3], [2, 3]];
console.log("Redundant edge:", UnionFindPatterns.findRedundantConnection(cycleEdges)); // [2, 3]

// Test stones removal
const stones = [[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]];
console.log("Stones removable:", UnionFindPatterns.removeStones(stones)); // 5
```
*Notice: Union-Find achieves near-constant amortized time through path compression and union by rank optimizations.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Missing path compression**: Without it, operations can degrade to O(n)
- **Union without rank/size**: Can create unbalanced trees
- **Forgetting to check union result**: Union returns false if already connected
- **Index confusion**: Ensure proper 0-based or 1-based indexing
- **Component counting**: Remember to decrease count only on successful union
- **Virtual nodes**: For percolation-type problems, don't forget virtual top/bottom

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Graph connectivity**: dynamic connectivity queries
- **Network analysis**: social networks, computer networks
- **Image processing**: connected component labeling
- **Game development**: maze generation, cluster detection
- **Computational geometry**: convex hull algorithms

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Number of Connected Components"** → Basic union-find application
2. **"Graph Valid Tree"** → Cycle detection + connectivity check
3. **"Accounts Merge"** → String-based union-find with mapping
4. **"Number of Islands II"** → Dynamic island formation
5. **"Most Stones Removed"** → Count components, remove all but one per component
6. **"Redundant Connection"** → Find first edge that creates cycle
7. **"Satisfiability of Equality Equations"** → Constraint satisfaction

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Graph Algorithms` · `DFS/BFS` · `Kruskal MST` · `Connected Components` · `Cycle Detection`

</div>

<div class="tags">
  <span class="tag">union-find</span>
  <span class="tag">disjoint-set</span>
  <span class="tag">graph-connectivity</span>
  <span class="tag">path-compression</span>
  <span class="tag">union-by-rank</span>
  <span class="tag">medior</span>
</div>

---

### Trie (Prefix Tree) {#trie}
<!-- tags: trie, prefix-tree, string-search, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Trie (prefix tree) efficiently stores and searches strings with common prefixes**. **Structure**: tree where each node represents a character, path from root to node forms prefix. **Operations**: **Insert** O(m), **Search** O(m), **StartsWith** O(m) where m is string length. **Space complexity**: O(ALPHABET_SIZE * N * M) worst case, much better with shared prefixes. **TrieNode**: contains children array/map, isEndOfWord boolean, optional metadata. **Applications**: **Autocomplete**, **Spell checker**, **IP routing**, **Word games**, **Dictionary lookups**. **Variations**: **Compressed trie** (Patricia tree), **Suffix trie**, **Radix tree**. **Key insight**: shared prefixes stored once, enabling efficient prefix operations.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Prefix operations**: efficient prefix-based searches and autocomplete
- **Memory efficiency**: shared prefixes reduce space complexity
- **Fast string operations**: O(m) vs O(n*m) for naive approaches
- **Real applications**: search engines, IDEs, routers use trie variants

</div>

<div class="runnable-model" data-filter="trie">

**Runnable mental model**
```java
// TRIE IMPLEMENTATION AND PATTERNS

// Basic Trie Node
class TrieNode {
    TrieNode[] children;
    boolean isEndOfWord;
    int wordCount;        // For frequency counting
    String word;          // For word storage (optional)
    
    public TrieNode() {
        children = new TrieNode[26]; // For lowercase a-z
        isEndOfWord = false;
        wordCount = 0;
    }
}

// Enhanced Trie Node with Map (for any characters)
class FlexibleTrieNode {
    Map<Character, FlexibleTrieNode> children;
    boolean isEndOfWord;
    int frequency;
    List<String> suggestions; // For autocomplete
    
    public FlexibleTrieNode() {
        children = new HashMap<>();
        isEndOfWord = false;
        frequency = 0;
        suggestions = new ArrayList<>();
    }
}

// Basic Trie Implementation
public class Trie {
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    // Insert word into trie
    public void insert(String word) {
        TrieNode current = root;
        
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        
        current.isEndOfWord = true;
        current.wordCount++;
        current.word = word; // Store word for retrieval
    }
    
    // Search for exact word
    public boolean search(String word) {
        TrieNode node = searchNode(word);
        return node != null && node.isEndOfWord;
    }
    
    // Check if any word starts with prefix
    public boolean startsWith(String prefix) {
        return searchNode(prefix) != null;
    }
    
    // Helper method to find node for given prefix
    private TrieNode searchNode(String prefix) {
        TrieNode current = root;
        
        for (char c : prefix.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                return null;
            }
            current = current.children[index];
        }
        
        return current;
    }
    
    // Delete word from trie
    public void delete(String word) {
        delete(root, word, 0);
    }
    
    private boolean delete(TrieNode current, String word, int index) {
        if (index == word.length()) {
            // End of word reached
            if (!current.isEndOfWord) {
                return false; // Word doesn't exist
            }
            current.isEndOfWord = false;
            current.wordCount = 0;
            
            // Return true if current has no children (can be deleted)
            return !hasChildren(current);
        }
        
        char c = word.charAt(index);
        int charIndex = c - 'a';
        TrieNode node = current.children[charIndex];
        
        if (node == null) {
            return false; // Word doesn't exist
        }
        
        boolean shouldDeleteChild = delete(node, word, index + 1);
        
        if (shouldDeleteChild) {
            current.children[charIndex] = null;
            
            // Return true if current is not end of word and has no children
            return !current.isEndOfWord && !hasChildren(current);
        }
        
        return false;
    }
    
    private boolean hasChildren(TrieNode node) {
        for (TrieNode child : node.children) {
            if (child != null) return true;
        }
        return false;
    }
    
    // Get all words with given prefix
    public List<String> getWordsWithPrefix(String prefix) {
        List<String> result = new ArrayList<>();
        TrieNode prefixNode = searchNode(prefix);
        
        if (prefixNode != null) {
            collectWords(prefixNode, prefix, result);
        }
        
        return result;
    }
    
    private void collectWords(TrieNode node, String prefix, List<String> result) {
        if (node.isEndOfWord) {
            result.add(prefix);
        }
        
        for (int i = 0; i < 26; i++) {
            if (node.children[i] != null) {
                char nextChar = (char) ('a' + i);
                collectWords(node.children[i], prefix + nextChar, result);
            }
        }
    }
    
    // Get word count with given prefix
    public int countWordsWithPrefix(String prefix) {
        TrieNode prefixNode = searchNode(prefix);
        if (prefixNode == null) return 0;
        
        return countWords(prefixNode);
    }
    
    private int countWords(TrieNode node) {
        int count = node.isEndOfWord ? 1 : 0;
        
        for (TrieNode child : node.children) {
            if (child != null) {
                count += countWords(child);
            }
        }
        
        return count;
    }
}

// Example Usage and Tests
console.log("=== TRIE EXAMPLES ===");

// Test basic trie operations
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("apricot");
trie.insert("application");

console.log("Search 'app':", trie.search("app")); // true
console.log("Search 'appl':", trie.search("appl")); // false
console.log("StartsWith 'app':", trie.startsWith("app")); // true

console.log("Words with prefix 'app':", trie.getWordsWithPrefix("app"));
// ["app", "apple", "application"]
```
*Notice: Trie excels at prefix-based operations and string searching, making it ideal for autocomplete and word games.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Memory inefficiency**: Using arrays for sparse character sets (use Map instead)
- **Case sensitivity**: Forgetting to normalize case for case-insensitive searches
- **Deletion complexity**: Improper deletion can leave orphaned nodes
- **End-of-word marking**: Forgetting to mark complete words vs just prefixes
- **Character encoding**: Assuming only lowercase letters (handle full Unicode)
- **Memory leaks**: Not properly cleaning up in dynamic tries

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Search engines**: autocomplete, spell checking, query suggestion
- **IDE features**: code completion, symbol lookup
- **Network routing**: IP routing tables, URL routing
- **Natural language processing**: dictionary lookups, morphological analysis
- **Game development**: word games, command parsing

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Implement Trie"** → Basic trie with insert, search, startsWith
2. **"Word Search II"** → DFS + Trie for efficient board word finding
3. **"Replace Words"** → Find shortest dictionary root for each word
4. **"Design Autocomplete System"** → Trie with frequency-based suggestions
5. **"Word Break II"** → Trie + memoization for all possible word breaks
6. **"Palindrome Pairs"** → Advanced trie with reverse word matching

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`String Algorithms` · `DFS/BFS` · `Hash Table` · `Binary Search` · `Suffix Tree` · `KMP`

</div>

<div class="tags">
  <span class="tag">trie</span>
  <span class="tag">prefix-tree</span>
  <span class="tag">string-search</span>
  <span class="tag">autocomplete</span>
  <span class="tag">dictionary</span>
  <span class="tag">medior</span>
</div>

---

### Graph Algorithms (DFS/BFS) {#graph-algorithms}
<!-- tags: graph, dfs, bfs, traversal, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Graph algorithms solve problems involving vertices (nodes) and edges (connections)**. **DFS (Depth-First Search)**: explores as far as possible along each branch before backtracking, uses stack (recursive or explicit). **BFS (Breadth-First Search)**: explores neighbors level by level, uses queue, finds shortest unweighted path. **Time complexity**: O(V + E) for both. **Space**: O(V) for visited array, O(V) for recursion stack/queue. **Graph representations**: **Adjacency List** (space efficient O(V+E)), **Adjacency Matrix** (O(V²), fast edge lookup). **Applications**: **Path finding**, **Connected components**, **Cycle detection**, **Topological sorting**, **Shortest paths**. **Key insight**: choose DFS for path existence, BFS for shortest path.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Universal building blocks**: foundation for advanced graph algorithms
- **Problem-solving versatility**: cycle detection, connectivity, path finding
- **Real-world applications**: social networks, web crawling, GPS navigation
- **Interview frequency**: extremely common in technical interviews

</div>

<div class="runnable-model" data-filter="graph-algorithms">

**Runnable mental model**
```java
// GRAPH ALGORITHMS IMPLEMENTATION

import java.util.*;

// Graph representation with adjacency list
class Graph {
    private int vertices;
    private List<List<Integer>> adjList;
    private boolean directed;
    
    public Graph(int vertices, boolean directed) {
        this.vertices = vertices;
        this.directed = directed;
        this.adjList = new ArrayList<>();
        
        for (int i = 0; i < vertices; i++) {
            adjList.add(new ArrayList<>());
        }
    }
    
    public void addEdge(int from, int to) {
        adjList.get(from).add(to);
        if (!directed) {
            adjList.get(to).add(from);
        }
    }
    
    public List<Integer> getNeighbors(int vertex) {
        return adjList.get(vertex);
    }
    
    public int getVertices() {
        return vertices;
    }
    
    // DFS implementation (recursive)
    public void dfsRecursive(int start, boolean[] visited, List<Integer> result) {
        visited[start] = true;
        result.add(start);
        
        for (int neighbor : adjList.get(start)) {
            if (!visited[neighbor]) {
                dfsRecursive(neighbor, visited, result);
            }
        }
    }
    
    // BFS implementation
    public List<Integer> bfs(int start) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[vertices];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            result.add(vertex);
            
            for (int neighbor : adjList.get(vertex)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
        
        return result;
    }
}

// Example Usage and Tests
console.log("=== GRAPH ALGORITHMS EXAMPLES ===");

const graph = new Graph(6, false);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 5);

console.log("BFS from 0:", graph.bfs(0)); // [0, 1, 2, 3, 4, 5]
```
*Notice: Graph algorithms form the foundation for solving connectivity, path-finding, and network analysis problems.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **Visited array management**: Forgetting to mark visited or incorrect timing
- **DFS stack overflow**: Deep recursion without iterative alternative
- **BFS vs DFS choice**: Using DFS when shortest path is needed (use BFS)
- **Graph representation**: Wrong choice between adjacency list vs matrix
- **Cycle detection**: Incorrectly handling back edges vs cross edges
- **Path reconstruction**: Not properly tracking parent pointers

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Social networks**: friend recommendations, community detection
- **Web crawling**: site mapping, link analysis, PageRank
- **GPS navigation**: route finding, traffic optimization
- **Game AI**: pathfinding, decision trees, game state exploration
- **Compiler design**: dependency analysis, optimization

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Number of Connected Components"** → DFS/BFS to count separate graphs
2. **"Course Schedule"** → Cycle detection in directed graph
3. **"Word Ladder"** → BFS for shortest transformation path
4. **"Number of Islands"** → DFS/BFS on 2D grid
5. **"Clone Graph"** → DFS with hash map for node cloning
6. **"Is Graph Bipartite"** → BFS/DFS with 2-coloring

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Union-Find` · `Dijkstra` · `Floyd-Warshall` · `Topological Sort` · `Minimum Spanning Tree`

</div>

<div class="tags">
  <span class="tag">graph</span>
  <span class="tag">dfs</span>
  <span class="tag">bfs</span>
  <span class="tag">traversal</span>
  <span class="tag">connectivity</span>
  <span class="tag">medior</span>
</div>

---

### Dynamic Programming Patterns {#dynamic-programming}
<!-- tags: dynamic-programming, dp, optimization, medior -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Dynamic Programming (DP) solves optimization problems by breaking them into overlapping subproblems and storing results**. **Key principles**: **Optimal Substructure** (optimal solution contains optimal solutions to subproblems), **Overlapping Subproblems** (same subproblems solved multiple times). **Approaches**: **Top-down** (memoization with recursion), **Bottom-up** (tabulation with iteration). **Common patterns**: **Linear DP** (1D array), **Grid DP** (2D array), **Interval DP**, **Tree DP**, **Bitmask DP**. **Time complexity**: typically O(n*m) for 2D problems. **Space optimization**: often reducible from O(n*m) to O(n) using rolling arrays.

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Optimization problems**: finds optimal solutions efficiently
- **Exponential to polynomial**: reduces time complexity dramatically
- **Real applications**: resource allocation, scheduling, game theory
- **Interview staple**: fundamental technique in algorithmic interviews

</div>

<div class="runnable-model" data-filter="dynamic-programming">

**Runnable mental model**
```java
// DYNAMIC PROGRAMMING PATTERNS

public class DynamicProgrammingPatterns {
    
    // Pattern 1: Fibonacci (Basic Linear DP)
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // Pattern 2: Coin Change (Unbounded Knapsack)
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // Initialize with impossible value
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
    
    // Pattern 3: Longest Increasing Subsequence
    public static int lengthOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
        
        return Arrays.stream(dp).max().orElse(0);
    }
    
    // Pattern 4: Edit Distance (Levenshtein Distance)
    public static int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        // Initialize base cases
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i; // Delete all characters from word1
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j; // Insert all characters into empty string
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1]; // No operation needed
                } else {
                    dp[i][j] = 1 + Math.min(
                        Math.min(dp[i - 1][j],     // Delete
                                dp[i][j - 1]),     // Insert
                        dp[i - 1][j - 1]           // Replace
                    );
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Pattern 5: Knapsack Problem (0/1 Knapsack)
    public static int knapsack(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];
        
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                // Don't take current item
                dp[i][w] = dp[i - 1][w];
                
                // Take current item if it fits
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i][w], 
                                       dp[i - 1][w - weights[i - 1]] + values[i - 1]);
                }
            }
        }
        
        return dp[n][capacity];
    }
}

// Example Usage and Tests
console.log("=== DYNAMIC PROGRAMMING EXAMPLES ===");

// Test fibonacci
console.log("Fibonacci(10):", DynamicProgrammingPatterns.fibonacci(10)); // 55

// Test coin change
const coins = [1, 3, 4];
console.log("Coin change for 6:", DynamicProgrammingPatterns.coinChange(coins, 6)); // 2

// Test LIS
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log("LIS length:", DynamicProgrammingPatterns.lengthOfLIS(nums)); // 4

// Test edit distance
console.log("Edit distance:", DynamicProgrammingPatterns.minDistance("horse", "ros")); // 3

// Test knapsack
const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
console.log("Knapsack max value:", DynamicProgrammingPatterns.knapsack(weights, values, 7)); // 9
```
*Notice: Dynamic Programming transforms exponential problems into polynomial time by eliminating redundant calculations.*

</div>

<div class="concept-section common-mistakes">

<details>
<summary>⚠️ <strong>Common mistakes</strong></summary>

<div>

- **State definition**: Unclear or incorrect definition of DP states
- **Base case errors**: Missing or incorrect initialization of base cases
- **Transition formula**: Wrong recurrence relation between states
- **Space optimization**: Not recognizing when 2D can be reduced to 1D
- **Memoization bugs**: Forgetting to check memo or store results
- **Array bounds**: Index out of bounds in bottom-up approaches

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Application areas**
- **Resource optimization**: knapsack problems, resource allocation
- **String processing**: text similarity, spell checking, diff algorithms
- **Game theory**: optimal strategies, minimax with pruning
- **Bioinformatics**: sequence alignment, gene analysis
- **Financial modeling**: option pricing, portfolio optimization

</div>

<div class="concept-section interview-questions">

💼 **Interview questions**
1. **"Fibonacci Number"** → Basic memoization introduction
2. **"Coin Change"** → Unbounded knapsack, optimal solution counting
3. **"Longest Increasing Subsequence"** → O(n²) DP, O(n log n) optimization
4. **"Edit Distance"** → 2D DP with three operations
5. **"House Robber"** → Linear DP with constraint
6. **"Unique Paths"** → Grid DP with combinatorics alternative
7. **"Word Break"** → String DP with dictionary lookup

</div>

<div class="concept-section related-algorithms">

🔗 **Related algorithms**  
`Recursion` · `Memoization` · `Greedy` · `Divide and Conquer` · `Graph Algorithms`

</div>

<div class="tags">
  <span class="tag">dynamic-programming</span>
  <span class="tag">dp</span>
  <span class="tag">optimization</span>
  <span class="tag">memoization</span>
  <span class="tag">bottom-up</span>
  <span class="tag">medior</span>
</div>