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

## Summary

Algorithms and data structures form the foundation of efficient problem-solving in computer science. The journey from basic patterns like Two Pointers and Sliding Window to advanced techniques like Binary Search and various Sorting algorithms demonstrates the evolution from brute force to optimized solutions.

Key takeaways include understanding when to apply specific patterns (Two Pointers for sorted data, Sliding Window for subarrays, Binary Search for sorted search spaces), recognizing time and space complexity trade-offs, and mastering both iterative and recursive approaches. These algorithms serve as building blocks for more complex problems and are essential for technical interviews and real-world applications.

The progression from O(n²) brute force solutions to O(n log n) or O(n) optimized algorithms showcases the power of algorithmic thinking and the importance of choosing the right tool for each problem domain.