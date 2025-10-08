# Algoritmusok

## Rövid összefoglaló

Az algoritmusok a problémamegoldás építőkövei, amelyek strukturált lépéssorozatként határozzák meg a feladatok megoldását. Ez az oldal junior-medior szintű, gyakorlatorientált algoritmusokat mutat be, amelyek elengedhetetlenek a modern szoftverfejlesztésben és műszaki interjúkon. A tömb manipulációtól a gráf algoritmusokon át a dinamikus programozásig, minden algoritmus részletes pszeudokóddal és három programozási nyelven (Java, JavaScript, TypeScript) implementált példákkal kerül bemutatásra. A cél nem a "bébi" feladatok gyakorlása, hanem valós problémák hatékony megoldása.

<!-- Reading Progress Bar -->
<div id="read-progress"></div>

<!-- Tag Filter -->
<div class="tag-filter-container">
  <h3>🏷️ Szűrés témakörök szerint</h3>
  <div class="tag-filter-chips">
    <button class="filter-chip active" data-filter="all">Mind</button>
    <button class="filter-chip" data-filter="junior">Junior</button>
    <button class="filter-chip" data-filter="medior">Medior</button>
    <button class="filter-chip" data-filter="arrays">Tömbök</button>
    <button class="filter-chip" data-filter="strings">Stringek</button>
    <button class="filter-chip" data-filter="search">Keresés</button>
    <button class="filter-chip" data-filter="sorting">Rendezés</button>
    <button class="filter-chip" data-filter="graphs">Gráfok</button>
    <button class="filter-chip" data-filter="dp">DP</button>
    <button class="filter-chip" data-filter="trees">Fák</button>
  </div>
</div>

## Hogyan használd ezt az oldalt

### 📚 Javasolt tanulási sorrend

1. **Alapozás**: `Two Pointers` → `Sliding Window` → `Prefix-sum`
2. **Tömb minták**: `Monotonic Stack` → `Intervals` → `Kadane's Algorithm`
3. **Keresés**: `Binary Search on Answer` → `Quickselect`
4. **Rendezés**: `Mergesort vs Quicksort` → `Top-K elemek heap-pel`
5. **Adatszerkezetek**: `Union-Find` → `LRU Cache` → `Heap minták`
6. **Gráfok**: `BFS/DFS` → `Dijkstra` → `Topological Sort` → `MST`
7. **Dinamikus programozás**: `LIS` → `Edit Distance` → `Coin Change` → `Knapsack`
8. **String algoritmusok**: `KMP` → `Rabin-Karp`
9. **Haladó**: `LCA` → `Segment Tree/Fenwick`

### 🎯 Használati tippek

- **Először** olvass el a **Probléma megfogalmazása** + **Algoritmus lépései (pszeudokód)** részt
- **Majd** próbáld implementálni saját magad, mielőtt megnéznéd a kódokat
- **Ezután** nézd meg a **Java/JavaScript/TypeScript** implementációkat
- **Végül** gyakorold az **interjú kérdések** részben található problémákat
- A **Gyakori hibák** szekciót mindig olvasd el, mielőtt éles kódot írnál

### 🏷️ Címke jelentések

- **Junior**: Alap algoritmusok, 1-2 év tapasztalattal elsajátítható
- **Medior**: Haladó minták, 3+ év tapasztalat ajánlott
- **Arrays/Strings**: Tömb és string manipuláció
- **Search/Sorting**: Keresési és rendezési algoritmusok
- **Graphs/Trees**: Gráf és fa algoritmusok
- **DP**: Dinamikus programozás minták

## Fogalmak

### Two Pointers {#two-pointers}
<!-- tags: two-pointers, arrays, strings, optimization, junior -->

<div class="concept-section mental-model">

🧩 **Fogalom meghatározása**  
*A Two Pointers egy algoritmus technika, amely két indexet (mutatót) használ egy lineáris adatszerkezeten történő bejáráshoz, jellemzően különböző pozíciókból indulva vagy különböző sebességgel haladva. Gyakran rendezett tömbökön vagy listákon alkalmazott módszer, amely O(n) időkomplexitással oldja meg azokat a problémákat, amelyek naiv megközelítéssel O(n²) komplexitást igényelnének.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(n) idő, O(1) tér
- **Average case**: O(n) idő, O(1) tér  
- **Worst case**: O(n) idő, O(1) tér
- **Space**: O(1) extra memória

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
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
  
  RETURN null  // nem található
END FUNCTION
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class TwoPointers {
    // Példa: Két szám összege egy rendezett tömbben
    public static int[] twoSum(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left < right) {
            int sum = nums[left] + nums[right];
            
            if (sum == target) {
                return new int[]{left, right};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        return new int[]{-1, -1}; // nem található
    }
    
    // Duplikátumok eltávolítása rendezett tömbből
    public static int removeDuplicates(int[] nums) {
        if (nums.length <= 1) return nums.length;
        
        int writeIdx = 1; // slow pointer
        
        for (int readIdx = 1; readIdx < nums.length; readIdx++) { // fast pointer
            if (nums[readIdx] != nums[readIdx - 1]) {
                nums[writeIdx] = nums[readIdx];
                writeIdx++;
            }
        }
        
        return writeIdx;
    }
    
    // Teszt
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int[] result = twoSum(nums, 9);
        System.out.println("Two Sum: " + Arrays.toString(result)); // [0, 1]
        
        int[] duplicates = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
        int newLength = removeDuplicates(duplicates);
        System.out.println("New length: " + newLength + ", Array: " + 
                         Arrays.toString(Arrays.copyOf(duplicates, newLength)));
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Két szám összege rendezett tömbben
function twoSum(nums, target) {
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
    
    return [-1, -1]; // nem található
}

// Duplikátumok eltávolítása rendezett tömbből
function removeDuplicates(nums) {
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

// Háromszög ellenőrzés rendezett tömbben
function validTriangle(nums) {
    nums.sort((a, b) => a - b);
    
    for (let i = nums.length - 1; i >= 2; i--) {
        let left = 0;
        let right = i - 1;
        
        while (left < right) {
            if (nums[left] + nums[right] > nums[i]) {
                return true;
            }
            left++;
        }
    }
    
    return false;
}

// Teszt
console.log("Two Sum:", twoSum([2, 7, 11, 15], 9)); // [0, 1]

const duplicates = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const newLength = removeDuplicates(duplicates);
console.log("New length:", newLength, "Array:", duplicates.slice(0, newLength));
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Két szám összege rendezett tömbben
function twoSum(nums: number[], target: number): [number, number] | null {
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
    
    return null; // nem található
}

// Duplikátumok eltávolítása in-place
function removeDuplicates(nums: number[]): number {
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

// Container With Most Water
function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const area = width * currentHeight;
        
        maxWater = Math.max(maxWater, area);
        
        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// Teszt
const nums: number[] = [2, 7, 11, 15];
console.log("Two Sum:", twoSum(nums, 9)); // [0, 1]

const heights: number[] = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log("Max Water Area:", maxArea(heights)); // 49
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Infinite loop**: elfelejteni a pointer-eket léptetni bizonyos feltételeknél
- **Boundary check hiánya**: `left < right` feltétel helyett `left <= right` használata
- **Rendezettség feltételezése**: nem ellenőrizni, hogy a tömb rendezett-e, amikor szükséges
- **Index konfúzió**: a két pointer értékét és indexét összekeverni
- **Optimális mozgatás**: mindig a "rosszabb" pointer-t kell mozgatni, nem random-ot

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **LeetCode Two Sum II**: rendezett tömbben két szám keresése
- **Container With Most Water**: maximális terület megtalálása
- **Valid Palindrome**: palindrom ellenőrzés string-ben
- **Remove Duplicates**: duplikátumok eltávolítása in-place
- **Merge Sorted Arrays**: két rendezett tömb egyesítése

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor használható a Two Pointers technika?
<details><summary>Válasz mutatása</summary>
Rendezett tömbök/listák esetén, amikor párosítást keresünk, vagy bizonyos feltételeknek megfelelő elemeket. Gyakran O(n²) algoritmusokat optimalizál O(n)-re.
</details>

2. Mi a különbség a slow-fast és left-right pointer variánsok között?
<details><summary>Válasz mutatása</summary>
Left-right: ellentétes irányból közeledik (pl. two sum). Slow-fast: ugyanabból az irányból, különböző sebességgel (pl. cycle detection, duplicates removal).
</details>

3. Hogyan döntsük el, melyik pointer-t léptetjük?
<details><summary>Válasz mutatása</summary>
Általában azt a pointer-t léptetjük, amely "rosszabb" helyzetben van. Pl. two sum esetén ha összeg < target, akkor left++, mert kisebb számra van szükség.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Implement Two Sum in a sorted array"** → Two Pointers O(n) vs HashMap O(n) + O(n) space
2. **"Remove duplicates from sorted array in-place"** → Slow-fast pointers, write index optimization
3. **"Find if there's a valid triangle in an array"** → Sort + two pointers, triangle inequality theorem
4. **"Container with most water problem"** → Greedy choice: move the shorter line pointer
5. **"Merge two sorted arrays in-place"** → Backwards two pointers to avoid overwriting

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Sliding Window` · `Binary Search` · `Merge Sort` · `Quick Sort Partition` · `Palindrome Check`

</div>

<div class="tags">
  <span class="tag">two-pointers</span>
  <span class="tag">arrays</span>
  <span class="tag">strings</span>
  <span class="tag">optimization</span>
  <span class="tag">junior</span>
</div>

### Sliding Window {#sliding-window}
<!-- tags: sliding-window, arrays, strings, optimization, subarray, junior -->

<div class="concept-section mental-model">

🧩 **Fogalom meghatározása**  
*A Sliding Window egy algoritmus technika, amely egy rögzített vagy dinamikus méretű ablakot mozgat végig egy lineáris adatszerkezeten (tömb, string), miközben az ablakban lévő elemekkel kapcsolatos információkat követi. Az ablak csúsztatása inkrementális műveletekkel történik: új elem hozzáadása és régi elem eltávolítása, így elkerülhető az ismételt számítás. Hatékony megoldást nyújt subarray/substring problémákra, ahol összegeket, maximum/minimum értékeket, vagy egyéb aggregált adatokat keresünk O(n) időkomplexitással.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(n) idő, O(1) tér (fix méretű ablak)
- **Average case**: O(n) idő, O(k) tér (ahol k az ablak mérete vagy karakter számosság)
- **Worst case**: O(n) idő, O(k) tér
- **Space**: O(1) - O(k) extra memória

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**Fix méretű ablak**
```pseudo
FUNCTION FixedSlidingWindow(A, windowSize)
  windowSum ← 0
  
  // Első ablak kiszámítása
  FOR i ← 0 TO windowSize − 1 DO
    windowSum ← windowSum + A[i]
  END FOR
  
  maxSum ← windowSum
  
  // Ablak csúsztatása
  FOR i ← windowSize TO LENGTH(A) − 1 DO
    windowSum ← windowSum − A[i − windowSize] + A[i]
    maxSum ← MAX(maxSum, windowSum)
  END FOR
  
  RETURN maxSum
END FUNCTION
```

**Változó méretű ablak**
```pseudo
FUNCTION VariableSlidingWindow(A, target)
  left ← 0
  windowSum ← 0
  minLength ← INFINITY
  
  FOR right ← 0 TO LENGTH(A) − 1 DO
    windowSum ← windowSum + A[right]
    
    WHILE windowSum ≥ target DO
      minLength ← MIN(minLength, right − left + 1)
      windowSum ← windowSum − A[left]
      left ← left + 1
    END WHILE
  END FOR
  
  RETURN minLength = INFINITY ? 0 : minLength
END FUNCTION
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class SlidingWindow {
    
    // Fix méretű ablak - Maximum sum of subarray of size k
    public static int maxSumFixedWindow(int[] arr, int k) {
        if (arr.length < k) return -1;
        
        int windowSum = 0;
        
        // Első ablak összege
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        
        int maxSum = windowSum;
        
        // Ablak csúsztatása
        for (int i = k; i < arr.length; i++) {
            windowSum = windowSum - arr[i - k] + arr[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum;
    }
    
    // Változó méretű ablak - Minimum window substring
    public static int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int sum = 0;
        int minLen = Integer.MAX_VALUE;
        
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            
            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }
        
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
    
    // Leghosszabb substring egyedi karakterekkel
    public static int lengthOfLongestSubstring(String s) {
        Set<Character> window = new HashSet<>();
        int left = 0;
        int maxLength = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char currentChar = s.charAt(right);
            
            // Duplikátum eltávolítása
            while (window.contains(currentChar)) {
                window.remove(s.charAt(left));
                left++;
            }
            
            window.add(currentChar);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
    
    // Teszt
    public static void main(String[] args) {
        int[] arr = {2, 1, 3, 4, 1, 2, 1, 5, 4};
        System.out.println("Max sum (k=3): " + maxSumFixedWindow(arr, 3)); // 8
        
        int[] nums = {2, 3, 1, 2, 4, 3};
        System.out.println("Min subarray length: " + minSubArrayLen(7, nums)); // 2
        
        System.out.println("Longest unique substring: " + 
                         lengthOfLongestSubstring("abcabcbb")); // 3
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Fix méretű ablak - Maximum average subarray
function findMaxAverage(nums, k) {
    let windowSum = 0;
    
    // Első ablak
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    
    let maxSum = windowSum;
    
    // Ablak csúsztatása
    for (let i = k; i < nums.length; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum / k;
}

// Változó méretű ablak - Fruits into Baskets
function totalFruit(fruits) {
    const basket = new Map();
    let left = 0;
    let maxFruits = 0;
    
    for (let right = 0; right < fruits.length; right++) {
        // Gyümölcs hozzáadása a kosárhoz
        basket.set(fruits[right], (basket.get(fruits[right]) || 0) + 1);
        
        // Ha több mint 2 fajta gyümölcs van
        while (basket.size > 2) {
            const leftFruit = fruits[left];
            basket.set(leftFruit, basket.get(leftFruit) - 1);
            
            if (basket.get(leftFruit) === 0) {
                basket.delete(leftFruit);
            }
            
            left++;
        }
        
        maxFruits = Math.max(maxFruits, right - left + 1);
    }
    
    return maxFruits;
}

// Leghosszabb substring k egyedi karakterrel
function longestSubstringWithKDistinct(s, k) {
    if (k === 0) return 0;
    
    const charCount = new Map();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
        
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

// Teszt
console.log("Max average:", findMaxAverage([1, 12, -5, -6, 50, 3], 4)); // 12.75
console.log("Total fruits:", totalFruit([1, 2, 1])); // 3
console.log("Longest k-distinct:", longestSubstringWithKDistinct("eceba", 2)); // 3
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Fix méretű ablak - Maximum sum subarray
function maxSumSubarray(nums: number[], k: number): number {
    if (nums.length < k) return 0;
    
    let windowSum = 0;
    
    // Első ablak kiszámítása
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    
    let maxSum = windowSum;
    
    // Ablak csúsztatása
    for (let i = k; i < nums.length; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Változó méretű ablak - Character Replacement
function characterReplacement(s: string, k: number): number {
    const charCount = new Map<string, number>();
    let left = 0;
    let maxLength = 0;
    let maxCharCount = 0;
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
        maxCharCount = Math.max(maxCharCount, charCount.get(rightChar)!);
        
        // Ha az ablakban túl sok karaktert kellene kicserélni
        while (right - left + 1 - maxCharCount > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar)! - 1);
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Permutation in String
function checkInclusion(s1: string, s2: string): boolean {
    if (s1.length > s2.length) return false;
    
    const s1Count = new Map<string, number>();
    const windowCount = new Map<string, number>();
    
    // s1 karaktereinek számlálása
    for (const char of s1) {
        s1Count.set(char, (s1Count.get(char) || 0) + 1);
    }
    
    let left = 0;
    let matches = 0;
    
    for (let right = 0; right < s2.length; right++) {
        const rightChar = s2[right];
        windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);
        
        if (s1Count.has(rightChar) && 
            windowCount.get(rightChar) === s1Count.get(rightChar)) {
            matches++;
        }
        
        // Ablak méretének fenntartása
        if (right - left + 1 > s1.length) {
            const leftChar = s2[left];
            
            if (s1Count.has(leftChar) && 
                windowCount.get(leftChar) === s1Count.get(leftChar)) {
                matches--;
            }
            
            windowCount.set(leftChar, windowCount.get(leftChar)! - 1);
            left++;
        }
        
        if (matches === s1Count.size) {
            return true;
        }
    }
    
    return false;
}

// Teszt
console.log("Max sum subarray:", maxSumSubarray([2, 1, 3, 4, 1, 2, 1, 5, 4], 3)); // 8
console.log("Character replacement:", characterReplacement("ABAB", 2)); // 4
console.log("Check inclusion:", checkInclusion("ab", "eidbaooo")); // true
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Ablak méret kezelése**: fix vs változó méretű ablak összekeverése
- **Border case-ek**: üres tömb, ablak nagyobb mint tömb mérete
- **HashMap cleanup**: karakter count 0-ra csökkenése után nem törli a Map-ből
- **Pointer management**: left pointer túl gyors/lassú mozgatása
- **Optimum tracking**: maximum/minimum tracking helytelen időzítése

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Maximum/minimum subarray sum**: fix k méretű ablakkal
- **Longest substring**: egyedi karakterekkel, k különböző karakterrel
- **Anagram detection**: permutation in string problémák
- **Character replacement**: k csere engedélyezése
- **Fruits into baskets**: legfeljebb k különböző elem gyűjtése

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor használjunk fix vs változó méretű sliding window-t?
<details><summary>Válasz mutatása</summary>
Fix méret: ha az ablak mérete előre ismert (pl. k elemű subarray). Változó méret: ha feltételnek megfelelő optimális méretet keresünk.
</details>

2. Hogyan optimalizáljuk a karakter counting-ot sliding window-ban?
<details><summary>Válasz mutatása</summary>
HashMap/Map használata karakter→count párosításra. Hozzáadásnál count++, eltávolításnál count--. Ha count 0 lesz, töröljük a Map-ből.
</details>

3. Mi a "shrinking window" stratégia?
<details><summary>Válasz mutatása</summary>
A bal pointer mozgatása, amíg az ablak nem felel meg a feltételeknek. Pl. összeg >= target esetén bal pointer növelése.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Find maximum sum of subarray of size k"** → Fix sliding window, O(n) solution
2. **"Longest substring without repeating characters"** → Variable window + HashSet
3. **"Minimum window substring"** → Template matching with character counts
4. **"Permutation in string"** → Fixed window + frequency matching
5. **"Longest repeating character replacement"** → Variable window + character frequency + k replacements

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Two Pointers` · `Hash Tables` · `Prefix Sum` · `Deque (Sliding Window Maximum)` · `String Matching`

</div>

<div class="tags">
  <span class="tag">sliding-window</span>
  <span class="tag">arrays</span>
  <span class="tag">strings</span>
  <span class="tag">optimization</span>
  <span class="tag">subarray</span>
  <span class="tag">junior</span>
</div>

### Prefix Sum & Difference Array {#prefix-sum}
<!-- tags: prefix-sum, arrays, range-queries, optimization, junior -->

<div class="concept-section mental-model">

🧩 **Fogalom meghatározása**  
*A Prefix Sum (előtagösszeg) egy preprocessing technika, amely egy auxiliary tömböt hoz létre, ahol minden i-edik elem tartalmazza az eredeti tömb első i elemének összegét. Ez lehetővé teszi tartomány összegek O(1) idejű lekérdezését O(n) előfeldolgozási költséggel. A Difference Array (különbözeti tömb) fordított megközelítés: tárolja az egymást követő elemek különbségeit, ami lehetővé teszi tartomány frissítések O(1) idejű végrehajtását, míg a végső tömb rekonstruálása O(n) időt igényel.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(n) preprocessing, O(1) query idő
- **Average case**: O(n) preprocessing, O(1) query idő
- **Worst case**: O(n) preprocessing, O(1) query idő
- **Space**: O(n) extra memória

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**Prefix Sum Array létrehozása**
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

**Difference Array (Range Updates)**
```pseudo
FUNCTION BuildDifferenceArray(A)
  diff ← NEW ARRAY[LENGTH(A)]
  diff[0] ← A[0]
  
  FOR i ← 1 TO LENGTH(A) − 1 DO
    diff[i] ← A[i] − A[i − 1]
  END FOR
  
  RETURN diff
END FUNCTION

PROCEDURE RangeUpdate(diff, left, right, value)
  diff[left] ← diff[left] + value
  IF right + 1 < LENGTH(diff) THEN
    diff[right + 1] ← diff[right + 1] − value
  END IF
END PROCEDURE
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class PrefixSum {
    
    // Prefix Sum alapú Range Sum Query
    static class NumArray {
        private int[] prefixSum;
        
        public NumArray(int[] nums) {
            prefixSum = new int[nums.length + 1];
            for (int i = 0; i < nums.length; i++) {
                prefixSum[i + 1] = prefixSum[i] + nums[i];
            }
        }
        
        public int sumRange(int left, int right) {
            return prefixSum[right + 1] - prefixSum[left];
        }
    }
    
    // 2D Prefix Sum
    static class NumMatrix {
        private int[][] prefixSum;
        
        public NumMatrix(int[][] matrix) {
            int m = matrix.length;
            int n = matrix[0].length;
            prefixSum = new int[m + 1][n + 1];
            
            for (int i = 1; i <= m; i++) {
                for (int j = 1; j <= n; j++) {
                    prefixSum[i][j] = matrix[i-1][j-1] 
                                    + prefixSum[i-1][j] 
                                    + prefixSum[i][j-1] 
                                    - prefixSum[i-1][j-1];
                }
            }
        }
        
        public int sumRegion(int row1, int col1, int row2, int col2) {
            return prefixSum[row2 + 1][col2 + 1] 
                 - prefixSum[row1][col2 + 1] 
                 - prefixSum[row2 + 1][col1] 
                 + prefixSum[row1][col1];
        }
    }
    
    // Difference Array for Range Updates
    static class RangeUpdateArray {
        private int[] diff;
        private int[] original;
        
        public RangeUpdateArray(int[] nums) {
            original = nums.clone();
            diff = new int[nums.length];
            diff[0] = nums[0];
            
            for (int i = 1; i < nums.length; i++) {
                diff[i] = nums[i] - nums[i - 1];
            }
        }
        
        public void rangeUpdate(int left, int right, int val) {
            diff[left] += val;
            if (right + 1 < diff.length) {
                diff[right + 1] -= val;
            }
        }
        
        public int[] getArray() {
            int[] result = new int[diff.length];
            result[0] = diff[0];
            
            for (int i = 1; i < diff.length; i++) {
                result[i] = result[i - 1] + diff[i];
            }
            
            return result;
        }
    }
    
    // Subarray sum equals K
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixSumCount = new HashMap<>();
        prefixSumCount.put(0, 1); // empty subarray
        
        int sum = 0;
        int count = 0;
        
        for (int num : nums) {
            sum += num;
            
            // Ha létezik prefix sum, amelyre: sum - prefixSum = k
            if (prefixSumCount.containsKey(sum - k)) {
                count += prefixSumCount.get(sum - k);
            }
            
            prefixSumCount.put(sum, prefixSumCount.getOrDefault(sum, 0) + 1);
        }
        
        return count;
    }
    
    // Teszt
    public static void main(String[] args) {
        // Range Sum Query
        NumArray numArray = new NumArray(new int[]{-2, 0, 3, -5, 2, -1});
        System.out.println("Sum [0,2]: " + numArray.sumRange(0, 2)); // 1
        System.out.println("Sum [2,5]: " + numArray.sumRange(2, 5)); // -1
        
        // Subarray sum equals K
        int[] nums = {1, 1, 1};
        System.out.println("Subarrays with sum 2: " + subarraySum(nums, 2)); // 2
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Prefix Sum for Range Queries
class NumArray {
    constructor(nums) {
        this.prefixSum = new Array(nums.length + 1).fill(0);
        
        for (let i = 0; i < nums.length; i++) {
            this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
        }
    }
    
    sumRange(left, right) {
        return this.prefixSum[right + 1] - this.prefixSum[left];
    }
}

// Product of Array Except Self (prefix/suffix product)
function productExceptSelf(nums) {
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

// Range Update using Difference Array
class RangeUpdate {
    constructor(nums) {
        this.diff = new Array(nums.length);
        this.diff[0] = nums[0];
        
        for (let i = 1; i < nums.length; i++) {
            this.diff[i] = nums[i] - nums[i - 1];
        }
    }
    
    rangeUpdate(left, right, val) {
        this.diff[left] += val;
        if (right + 1 < this.diff.length) {
            this.diff[right + 1] -= val;
        }
    }
    
    getArray() {
        const result = new Array(this.diff.length);
        result[0] = this.diff[0];
        
        for (let i = 1; i < this.diff.length; i++) {
            result[i] = result[i - 1] + this.diff[i];
        }
        
        return result;
    }
}

// Continuous Subarray Sum
function checkSubarraySum(nums, k) {
    const prefixSumMap = new Map();
    prefixSumMap.set(0, -1); // empty subarray
    
    let sum = 0;
    
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        const remainder = sum % k;
        
        if (prefixSumMap.has(remainder)) {
            if (i - prefixSumMap.get(remainder) > 1) {
                return true;
            }
        } else {
            prefixSumMap.set(remainder, i);
        }
    }
    
    return false;
}

// Teszt
const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log("Sum [0,2]:", numArray.sumRange(0, 2)); // 1

console.log("Product except self:", productExceptSelf([1, 2, 3, 4])); // [24,12,8,6]

console.log("Continuous subarray sum:", checkSubarraySum([23, 2, 4, 6, 7], 6)); // true
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Range Sum Query - Immutable
class NumArray {
    private prefixSum: number[];
    
    constructor(nums: number[]) {
        this.prefixSum = new Array(nums.length + 1).fill(0);
        
        for (let i = 0; i < nums.length; i++) {
            this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
        }
    }
    
    sumRange(left: number, right: number): number {
        return this.prefixSum[right + 1] - this.prefixSum[left];
    }
}

// 2D Range Sum Query
class NumMatrix {
    private prefixSum: number[][];
    
    constructor(matrix: number[][]) {
        const m = matrix.length;
        const n = matrix[0].length;
        this.prefixSum = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                this.prefixSum[i][j] = matrix[i-1][j-1] 
                                     + this.prefixSum[i-1][j] 
                                     + this.prefixSum[i][j-1] 
                                     - this.prefixSum[i-1][j-1];
            }
        }
    }
    
    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        return this.prefixSum[row2 + 1][col2 + 1] 
             - this.prefixSum[row1][col2 + 1] 
             - this.prefixSum[row2 + 1][col1] 
             + this.prefixSum[row1][col1];
    }
}

// Range Update with Difference Array
class RangeUpdateArray {
    private diff: number[];
    
    constructor(nums: number[]) {
        this.diff = new Array(nums.length);
        this.diff[0] = nums[0];
        
        for (let i = 1; i < nums.length; i++) {
            this.diff[i] = nums[i] - nums[i - 1];
        }
    }
    
    rangeUpdate(left: number, right: number, val: number): void {
        this.diff[left] += val;
        if (right + 1 < this.diff.length) {
            this.diff[right + 1] -= val;
        }
    }
    
    getArray(): number[] {
        const result = new Array(this.diff.length);
        result[0] = this.diff[0];
        
        for (let i = 1; i < this.diff.length; i++) {
            result[i] = result[i - 1] + this.diff[i];
        }
        
        return result;
    }
}

// Subarray Sums Divisible by K
function subarraysDivByK(nums: number[], k: number): number {
    const modCountMap = new Map<number, number>();
    modCountMap.set(0, 1); // empty subarray
    
    let sum = 0;
    let count = 0;
    
    for (const num of nums) {
        sum += num;
        let mod = sum % k;
        
        // Handle negative modulo
        if (mod < 0) mod += k;
        
        if (modCountMap.has(mod)) {
            count += modCountMap.get(mod)!;
        }
        
        modCountMap.set(mod, (modCountMap.get(mod) || 0) + 1);
    }
    
    return count;
}

// Teszt
const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log("Sum [0,2]:", numArray.sumRange(0, 2)); // 1

const rangeUpdateArray = new RangeUpdateArray([1, 3, 5, 7, 9]);
rangeUpdateArray.rangeUpdate(1, 3, 2);
console.log("After range update:", rangeUpdateArray.getArray()); // [1, 5, 7, 9, 9]

console.log("Subarrays divisible by 5:", subarraysDivByK([4, 5, 0, -2, -3, 1], 5)); // 7
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Off-by-one error**: prefix sum indexelés hibák (0-based vs 1-based)
- **Boundary checks**: range query-knél out of bounds hozzáférés
- **Negative modulo**: JavaScript/Python-ban negatív modulo kezelése
- **2D prefix sum**: inclusion-exclusion elv helytelen alkalmazása
- **Difference array reconstruction**: elfelejteni a prefix sum-ot alkalmazni

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Range Sum Query**: gyors tartomány összeg lekérdezések
- **2D Range Sum**: matrix régió összegek
- **Subarray problems**: összeg/termék alapú subarray keresés
- **Range Updates**: batch update műveletek optimalizálása
- **Corporate flight bookings**: seat reservation optimalizálás

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mi a különbség a prefix sum és difference array között?
<details><summary>Válasz mutatása</summary>
Prefix sum: gyors range query-k (O(1) olvasás). Difference array: gyors range update-ek (O(1) írás, O(n) rekonstrukció).
</details>

2. Hogyan működik a 2D prefix sum inclusion-exclusion elve?
<details><summary>Válasz mutatása</summary>
sum[i][j] = matrix[i-1][j-1] + sum[i-1][j] + sum[i][j-1] - sum[i-1][j-1]. A duplikáció eltávolításához kivonjuk a közös területet.
</details>

3. Miért hasznos a HashMap prefix sum problémáknál?
<details><summary>Válasz mutatása</summary>
Tárolja a prefix sum értékeket és előfordulási gyakoriságukat. sum[j] - sum[i] = k átalakítható sum[j] - k = sum[i] formára.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Range Sum Query - Immutable"** → Prefix sum alapok, O(1) query time
2. **"Subarray Sum Equals K"** → HashMap + prefix sum kombináció
3. **"Range Sum Query 2D - Immutable"** → 2D prefix sum, inclusion-exclusion principle
4. **"Corporate Flight Bookings"** → Difference array for range updates
5. **"Product of Array Except Self"** → Left/right prefix product arrays

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
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

🧩 **Fogalom meghatározása**  
*A Monotonic Stack egy stack alapú adatszerkezet, amely szigorúan monoton növekvő vagy csökkenő sorrendet tart fenn az elemei között. Az algoritmus működése során, amikor új elemet push-olunk a stack-re, előbb minden olyan elemet pop-olunk, amely sérti a monoton tulajdonságot. Jellemzően "következő nagyobb/kisebb elem" típusú problémák O(n) időkomplexitású megoldására használatos, ahol minden elem legfeljebb egyszer kerül be és egyszer ki a stack-ből.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(n) idő, O(1) tér (minden elem egyszer kerül be és ki)
- **Average case**: O(n) idő, O(n) tér
- **Worst case**: O(n) idő, O(n) tér
- **Space**: O(n) stack méret

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**Next Greater Element (növekvő monotonic stack)**
```pseudo
FUNCTION NextGreaterElement(A)
  stack ← EMPTY_STACK  // indexek tárolása
  result ← NEW ARRAY[LENGTH(A)]
  
  FOR i ← 0 TO LENGTH(A) − 1 DO
    // Stack-ből pop amíg current > stack.top elem
    WHILE NOT EMPTY(stack) AND A[i] > A[TOP(stack)] DO
      index ← POP(stack)
      result[index] ← A[i]
    END WHILE
    
    PUSH(stack, i)
  END FOR
  
  // Maradék elemek nem találtak nagyobb elemet
  WHILE NOT EMPTY(stack) DO
    index ← POP(stack)
    result[index] ← −1
  END WHILE
  
  RETURN result
END FUNCTION
```

**Largest Rectangle in Histogram**
```pseudo
FUNCTION LargestRectangle(heights)
  stack ← EMPTY_STACK
  maxArea ← 0
  
  FOR i ← 0 TO LENGTH(heights) DO
    currentHeight ← (i = LENGTH(heights)) ? 0 : heights[i]
    
    WHILE NOT EMPTY(stack) AND currentHeight < heights[TOP(stack)] DO
      height ← heights[POP(stack)]
      width ← EMPTY(stack) ? i : i − TOP(stack) − 1
      maxArea ← MAX(maxArea, height × width)
    END WHILE
    
    PUSH(stack, i)
  END FOR
  
  RETURN maxArea
END FUNCTION
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class MonotonicStack {
    
    // Next Greater Element I
    public static int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> nextGreaterMap = new HashMap<>();
        Stack<Integer> stack = new Stack<>();
        
        // Build next greater map for nums2
        for (int num : nums2) {
            while (!stack.isEmpty() && stack.peek() < num) {
                nextGreaterMap.put(stack.pop(), num);
            }
            stack.push(num);
        }
        
        // Build result for nums1
        int[] result = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            result[i] = nextGreaterMap.getOrDefault(nums1[i], -1);
        }
        
        return result;
    }
    
    // Daily Temperatures
    public static int[] dailyTemperatures(int[] temperatures) {
        int[] result = new int[temperatures.length];
        Stack<Integer> stack = new Stack<>(); // indices
        
        for (int i = 0; i < temperatures.length; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIndex = stack.pop();
                result[prevIndex] = i - prevIndex;
            }
            stack.push(i);
        }
        
        return result;
    }
    
    // Largest Rectangle in Histogram
    public static int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        
        for (int i = 0; i <= heights.length; i++) {
            int currentHeight = (i == heights.length) ? 0 : heights[i];
            
            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            
            stack.push(i);
        }
        
        return maxArea;
    }
    
    // Remove K Digits (monotonic increasing)
    public static String removeKdigits(String num, int k) {
        Stack<Character> stack = new Stack<>();
        
        for (char digit : num.toCharArray()) {
            while (!stack.isEmpty() && k > 0 && stack.peek() > digit) {
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
        StringBuilder result = new StringBuilder();
        for (char digit : stack) {
            result.append(digit);
        }
        
        // Remove leading zeros
        while (result.length() > 1 && result.charAt(0) == '0') {
            result.deleteCharAt(0);
        }
        
        return result.length() == 0 ? "0" : result.toString();
    }
    
    // Teszt
    public static void main(String[] args) {
        int[] temps = {73, 74, 75, 71, 69, 72, 76, 73};
        System.out.println("Daily temperatures: " + Arrays.toString(dailyTemperatures(temps)));
        // [1, 1, 4, 2, 1, 1, 0, 0]
        
        int[] heights = {2, 1, 5, 6, 2, 3};
        System.out.println("Largest rectangle: " + largestRectangleArea(heights)); // 10
        
        System.out.println("Remove K digits: " + removeKdigits("1432219", 3)); // "1219"
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Next Greater Element II (circular array)
function nextGreaterElements(nums) {
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

// Sliding Window Maximum using Monotonic Deque
function maxSlidingWindow(nums, k) {
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

// Trapping Rain Water
function trap(height) {
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

// Stock Span Problem
function stockSpan(prices) {
    const result = [];
    const stack = []; // indices
    
    for (let i = 0; i < prices.length; i++) {
        while (stack.length > 0 && prices[stack[stack.length - 1]] <= prices[i]) {
            stack.pop();
        }
        
        const span = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];
        result.push(span);
        stack.push(i);
    }
    
    return result;
}

// Teszt
console.log("Next greater (circular):", nextGreaterElements([1, 2, 1])); // [2, -1, 2]
console.log("Sliding window max:", maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]
console.log("Trapped water:", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log("Stock span:", stockSpan([100, 80, 60, 70, 60, 75, 85])); // [1,1,1,2,1,4,6]
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Next Greater Element with indices
function nextGreaterElementWithIndices(nums: number[]): number[] {
    const result: number[] = new Array(nums.length).fill(-1);
    const stack: number[] = []; // indices
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            const prevIndex = stack.pop()!;
            result[prevIndex] = nums[i];
        }
        stack.push(i);
    }
    
    return result;
}

// Largest Rectangle in Binary Matrix
function maximalRectangle(matrix: string[][]): number {
    if (matrix.length === 0) return 0;
    
    const heights: number[] = new Array(matrix[0].length).fill(0);
    let maxArea = 0;
    
    for (let i = 0; i < matrix.length; i++) {
        // Update heights array
        for (let j = 0; j < matrix[i].length; j++) {
            heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
        }
        
        // Calculate largest rectangle for current histogram
        maxArea = Math.max(maxArea, largestRectangleInHistogram(heights));
    }
    
    return maxArea;
}

function largestRectangleInHistogram(heights: number[]): number {
    const stack: number[] = [];
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const currentHeight = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()!];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}

// 132 Pattern Detection
function find132pattern(nums: number[]): boolean {
    const stack: number[] = [];
    let second = -Infinity;
    
    // Traverse from right to left
    for (let i = nums.length - 1; i >= 0; i--) {
        // If current number is less than second, we found 132 pattern
        if (nums[i] < second) {
            return true;
        }
        
        // Update second with popped elements
        while (stack.length > 0 && nums[i] > stack[stack.length - 1]) {
            second = stack.pop()!;
        }
        
        stack.push(nums[i]);
    }
    
    return false;
}

// Sum of Subarray Minimums
function sumSubarrayMins(arr: number[]): number {
    const MOD = 1e9 + 7;
    const stack: number[] = [];
    let result = 0;
    
    for (let i = 0; i <= arr.length; i++) {
        const currentVal = i === arr.length ? 0 : arr[i];
        
        while (stack.length > 0 && currentVal < arr[stack[stack.length - 1]]) {
            const minIndex = stack.pop()!;
            const leftBound = stack.length === 0 ? -1 : stack[stack.length - 1];
            const rightBound = i;
            
            const count = (minIndex - leftBound) * (rightBound - minIndex);
            result = (result + arr[minIndex] * count) % MOD;
        }
        
        stack.push(i);
    }
    
    return result;
}

// Teszt
console.log("Next greater elements:", nextGreaterElementWithIndices([2, 1, 2, 4, 3, 1])); // [4,2,4,-1,-1,-1]

const matrix = [
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"]
];
console.log("Maximal rectangle:", maximalRectangle(matrix)); // 6

console.log("132 pattern:", find132pattern([1, 2, 3, 4])); // false
console.log("Sum subarray mins:", sumSubarrayMins([3, 1, 2, 4])); // 17
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Stack tartalom**: értékek vs indexek tárolása - általában indexeket célszerű
- **Monotonitás iránya**: növekvő vs csökkenő stack eldöntése a probléma alapján
- **Pop feltétel**: `<` vs `<=` - egyenlőség kezelése fontos lehet
- **Boundary handling**: utolsó elem feldolgozása, 0 vagy -1 hozzáadása
- **Result inicializálás**: helyes default értékek (-1, 0, infinity)

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Next/Previous Greater/Smaller**: hőmérséklet, stock price analízis
- **Histogram problems**: largest rectangle, maximal rectangle
- **Stack operations**: valid parentheses, calculator problems
- **Sliding window maximum**: real-time data analysis
- **Pattern detection**: 132 pattern, increasing subsequences

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor használunk növekvő vs csökkenő monotonic stack-et?
<details><summary>Válasz mutatása</summary>
Növekvő: next/previous smaller element keresése. Csökkenő: next/previous greater element keresése.
</details>

2. Miért tároljuk az indexeket és nem az értékeket?
<details><summary>Válasz mutatása</summary>
Az indexekkel kiszámíthatjuk a távolságot, pozíciót, és az eredeti értéket is elérjük arr[index] formában.
</details>

3. Hogyan működik a largest rectangle algoritmus?
<details><summary>Válasz mutatása</summary>
Minden csökkenő elem triggerel egy pop műveletet. A popped elem magasságát használjuk, szélesség = current_index - stack_top - 1.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Daily Temperatures"** → Monotonic decreasing stack for next greater element
2. **"Largest Rectangle in Histogram"** → Stack-based area calculation with index tracking
3. **"Trapping Rain Water"** → Two approaches: two pointers vs monotonic stack
4. **"Next Greater Element II"** → Circular array handling with double iteration
5. **"Sliding Window Maximum"** → Monotonic deque for O(n) solution

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
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

### Intervals (Intervallumok) {#intervals}
<!-- tags: intervals, merge, sweep-line, sorting, greedy, medior -->

<div class="concept-section mental-model">

🧩 **Fogalom meghatározása**  
*Az Interval (intervallum) algoritmusok olyan problémákat oldanak meg, amelyek időbeli vagy térbeli tartományokkal (kezdőpont, végpont párokkal) dolgoznak. A fő műveletek közé tartozik az intervallumok egyesítése (merge), átfedés detektálása, beszúrása, vagy az egyszerre aktív intervallumok számának meghatározása. A sweep line technika egy általános megközelítés, amely egy képzeletbeli vonalat "söpör" végig az eseménytéren, közben követve az aktív intervallumokat vagy eseményeket. Gyakran rendezéssel kezdődik (O(n log n)), majd lineáris feldolgozással folytatódik (O(n)).*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(n log n) idő (rendezés miatt), O(1) tér
- **Average case**: O(n log n) idő, O(n) tér
- **Worst case**: O(n log n) idő, O(n) tér
- **Space**: O(n) eredmény tároláshoz

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**Merge Intervals**
```pseudo
FUNCTION MergeIntervals(intervals)
  SORT intervals BY start time
  merged ← EMPTY_LIST
  
  FOR interval IN intervals DO
    IF EMPTY(merged) OR interval.start > LAST(merged).end THEN
      ADD(merged, interval)
    ELSE
      LAST(merged).end ← MAX(LAST(merged).end, interval.end)
    END IF
  END FOR
  
  RETURN merged
END FUNCTION
```

**Meeting Rooms II (minimum conference rooms)**
```pseudo
FUNCTION MinMeetingRooms(intervals)
  events ← EMPTY_LIST
  
  FOR interval IN intervals DO
    ADD(events, [interval.start, 1])    // meeting starts
    ADD(events, [interval.end, −1])     // meeting ends
  END FOR
  
  SORT events BY time (if tie, end before start)
  
  activeRooms ← 0
  maxRooms ← 0
  
  FOR event IN events DO
    activeRooms ← activeRooms + event.type
    maxRooms ← MAX(maxRooms, activeRooms)
  END FOR
  
  RETURN maxRooms
END FUNCTION
```

**Insert Interval**
```pseudo
FUNCTION InsertInterval(intervals, newInterval)
  result ← EMPTY_LIST
  i ← 0
  
  // Add all intervals before overlap
  WHILE i < LENGTH(intervals) AND intervals[i].end < newInterval.start DO
    ADD(result, intervals[i])
    i ← i + 1
  END WHILE
  
  // Merge overlapping intervals
  WHILE i < LENGTH(intervals) AND intervals[i].start ≤ newInterval.end DO
    newInterval.start ← MIN(newInterval.start, intervals[i].start)
    newInterval.end ← MAX(newInterval.end, intervals[i].end)
    i ← i + 1
  END WHILE
  
  ADD(result, newInterval)
  
  // Add remaining intervals
  WHILE i < LENGTH(intervals) DO
    ADD(result, intervals[i])
    i ← i + 1
  END WHILE
  
  RETURN result
END FUNCTION
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class Intervals {
    
    // Merge Intervals
    public static int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        
        List<int[]> merged = new ArrayList<>();
        
        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            }
        }
        
        return merged.toArray(new int[merged.size()][]);
    }
    
    // Meeting Rooms II
    public static int minMeetingRooms(int[][] intervals) {
        List<int[]> events = new ArrayList<>();
        
        for (int[] interval : intervals) {
            events.add(new int[]{interval[0], 1});   // start
            events.add(new int[]{interval[1], -1});  // end
        }
        
        // Sort by time, end events before start events for same time
        events.sort((a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
        
        int activeRooms = 0;
        int maxRooms = 0;
        
        for (int[] event : events) {
            activeRooms += event[1];
            maxRooms = Math.max(maxRooms, activeRooms);
        }
        
        return maxRooms;
    }
    
    // Insert Interval
    public static int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        
        // Add intervals before overlap
        while (i < intervals.length && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }
        
        // Merge overlapping intervals
        while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        
        result.add(newInterval);
        
        // Add remaining intervals
        while (i < intervals.length) {
            result.add(intervals[i]);
            i++;
        }
        
        return result.toArray(new int[result.size()][]);
    }
    
    // Non-overlapping Intervals (minimum removals)
    public static int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1])); // sort by end time
        
        int count = 0;
        int lastEnd = intervals[0][1];
        
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < lastEnd) {
                count++; // remove current interval
            } else {
                lastEnd = intervals[i][1];
            }
        }
        
        return count;
    }
    
    // Employee Free Time
    public static List<int[]> employeeFreeTime(List<List<int[]>> schedule) {
        List<int[]> allIntervals = new ArrayList<>();
        
        // Flatten all schedules
        for (List<int[]> employee : schedule) {
            allIntervals.addAll(employee);
        }
        
        // Merge all intervals
        int[][] merged = merge(allIntervals.toArray(new int[0][]));
        
        List<int[]> freeTime = new ArrayList<>();
        for (int i = 1; i < merged.length; i++) {
            if (merged[i - 1][1] < merged[i][0]) {
                freeTime.add(new int[]{merged[i - 1][1], merged[i][0]});
            }
        }
        
        return freeTime;
    }
    
    // Teszt
    public static void main(String[] args) {
        int[][] intervals = { {1, 3}, {2, 6}, {8, 10}, {15, 18} };
        System.out.println("Merged: " + Arrays.deepToString(merge(intervals)));
        // [[1,6], [8,10], [15,18]]
        
        int[][] meetings = { {0, 30}, {5, 10}, {15, 20} };
        System.out.println("Min meeting rooms: " + minMeetingRooms(meetings)); // 2
        
        int[][] intervals2 = { {1, 3}, {6, 9} };
        int[] newInterval = {2, 5};
        System.out.println("Insert interval: " + Arrays.deepToString(insert(intervals2, newInterval)));
        // [[1,5], [6,9]]
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Merge Intervals
function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    
    const merged = [];
    
    for (const interval of intervals) {
        if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
            merged.push(interval);
        } else {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
        }
    }
    
    return merged;
}

// Meeting Rooms (can attend all meetings)
function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false; // overlap found
        }
    }
    
    return true;
}

// Interval List Intersections
function intervalIntersection(firstList, secondList) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < firstList.length && j < secondList.length) {
        const start = Math.max(firstList[i][0], secondList[j][0]);
        const end = Math.min(firstList[i][1], secondList[j][1]);
        
        if (start <= end) {
            result.push([start, end]);
        }
        
        // Move pointer with earlier end time
        if (firstList[i][1] < secondList[j][1]) {
            i++;
        } else {
            j++;
        }
    }
    
    return result;
}

// Car Pooling (sweep line)
function carPooling(trips, capacity) {
    const events = [];
    
    for (const [passengers, start, end] of trips) {
        events.push([start, passengers]);   // pickup
        events.push([end, -passengers]);    // drop off
    }
    
    events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
    let currentPassengers = 0;
    
    for (const [location, change] of events) {
        currentPassengers += change;
        if (currentPassengers > capacity) {
            return false;
        }
    }
    
    return true;
}

// My Calendar I
class MyCalendar {
    constructor() {
        this.bookings = [];
    }
    
    book(start, end) {
        for (const [s, e] of this.bookings) {
            if (start < e && end > s) { // overlap check
                return false;
            }
        }
        
        this.bookings.push([start, end]);
        return true;
    }
}

// Point Coverage (minimum intervals to cover all points)
function minIntervalsToCoverPoints(intervals, points) {
    intervals.sort((a, b) => a[1] - b[1]); // sort by end time
    points.sort((a, b) => a - b);
    
    let count = 0;
    let lastCovered = -Infinity;
    
    for (const point of points) {
        if (point > lastCovered) {
            // Find interval that covers this point and ends latest
            let found = false;
            for (const [start, end] of intervals) {
                if (start <= point && point <= end && end > lastCovered) {
                    lastCovered = end;
                    count++;
                    found = true;
                    break;
                }
            }
            if (!found) return -1; // impossible to cover
        }
    }
    
    return count;
}

// Teszt
console.log("Merge intervals:", merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log("Can attend meetings:", canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log("Interval intersections:", intervalIntersection([[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]])); 
// [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
console.log("Car pooling:", carPooling([[2,1,5],[3,3,7]], 4)); // false
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Interval interface
interface Interval {
    start: number;
    end: number;
}

// Merge Intervals
function mergeIntervals(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0]);
    
    const merged: number[][] = [];
    
    for (const interval of intervals) {
        if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
            merged.push(interval);
        } else {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
        }
    }
    
    return merged;
}

// Meeting Rooms II with Priority Queue simulation
function minMeetingRoomsAdvanced(intervals: number[][]): number {
    if (intervals.length === 0) return 0;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    const endTimes: number[] = []; // min heap simulation
    
    for (const interval of intervals) {
        const [start, end] = interval;
        
        // If room is available (earliest end time <= current start)
        if (endTimes.length > 0 && endTimes[0] <= start) {
            endTimes.shift(); // remove earliest end time
        }
        
        // Add current meeting's end time
        endTimes.push(end);
        endTimes.sort((a, b) => a - b); // maintain min heap property
    }
    
    return endTimes.length;
}

// Insert Interval
function insertInterval(intervals: number[][], newInterval: number[]): number[][] {
    const result: number[][] = [];
    let i = 0;
    
    // Add intervals that end before newInterval starts
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    
    // Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    
    result.push(newInterval);
    
    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }
    
    return result;
}

// Data Stream as Disjoint Intervals
class SummaryRanges {
    private intervals: number[][];
    
    constructor() {
        this.intervals = [];
    }
    
    addNum(val: number): void {
        let i = 0;
        
        // Find insertion position
        while (i < this.intervals.length && this.intervals[i][1] + 1 < val) {
            i++;
        }
        
        let start = val;
        let end = val;
        
        // Merge with previous interval if possible
        if (i > 0 && this.intervals[i - 1][1] + 1 >= val) {
            i--;
            start = this.intervals[i][0];
        }
        
        // Merge with following intervals
        while (i < this.intervals.length && this.intervals[i][0] <= end + 1) {
            start = Math.min(start, this.intervals[i][0]);
            end = Math.max(end, this.intervals[i][1]);
            this.intervals.splice(i, 1);
        }
        
        this.intervals.splice(i, 0, [start, end]);
    }
    
    getIntervals(): number[][] {
        return this.intervals;
    }
}

// Remove Covered Intervals
function removeCoveredIntervals(intervals: number[][]): number {
    intervals.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
    
    let count = 0;
    let prevEnd = 0;
    
    for (const [start, end] of intervals) {
        if (end > prevEnd) {
            count++;
            prevEnd = end;
        }
    }
    
    return count;
}

// Teszt
const intervals: number[][] = [[1, 3], [2, 6], [8, 10], [15, 18]];
console.log("Merged intervals:", mergeIntervals(intervals)); // [[1,6],[8,10],[15,18]]

const meetings: number[][] = [[0, 30], [5, 10], [15, 20]];
console.log("Min meeting rooms:", minMeetingRoomsAdvanced(meetings)); // 2

const summaryRanges = new SummaryRanges();
summaryRanges.addNum(1);
summaryRanges.addNum(3);
summaryRanges.addNum(7);
summaryRanges.addNum(2);
summaryRanges.addNum(6);
console.log("Summary ranges:", summaryRanges.getIntervals()); // [[1,3],[6,7]]

const coveredIntervals: number[][] = [[1, 4], [3, 6], [2, 8]];
console.log("Remove covered intervals:", removeCoveredIntervals(coveredIntervals)); // 2
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Rendezési kritérium**: start vs end time szerint rendezés eldöntése a probléma alapján
- **Overlap definition**: `[1,2]` és `[2,3]` átfednek-e? Depends on problem statement
- **Sweep line events**: end event prioritása start event előtt azonos időnél
- **Greedy choice**: meeting rooms problémánál end time szerinti rendezés optimális
- **Boundary cases**: üres lista, egyetlen interval, teljes átfedés kezelése

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Calendar management**: meeting scheduling, room booking
- **Resource allocation**: CPU scheduling, bandwidth allocation
- **Timeline analysis**: event processing, log analysis
- **Computational geometry**: line sweep algorithms
- **Database query optimization**: range queries, index merging

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor rendezzünk start time vs end time szerint?
<details><summary>Válasz mutatása</summary>
Start time: merge intervals, insert interval. End time: maximum non-overlapping intervals (greedy choice).
</details>

2. Mi a sweep line algoritmus alapelve?
<details><summary>Válasz mutatása</summary>
Event-based feldolgozás: start/end eseményeket időrend szerint dolgozzuk fel, aktív intervalumok számát követjük.
</details>

3. Hogyan optimalizáljuk a meeting rooms problémát?
<details><summary>Válasz mutatása</summary>
Heap/priority queue helyett sweep line: +1 start-nál, -1 end-nél. Maximum aktív szoba szám a válasz.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Merge Intervals"** → Basic interval merging, sort by start time
2. **"Meeting Rooms II"** → Sweep line algorithm or priority queue approach
3. **"Insert Interval"** → Three phases: before, merge, after
4. **"Non-overlapping Intervals"** → Greedy algorithm, sort by end time
5. **"Employee Free Time"** → Merge all schedules, find gaps between merged intervals

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Sweep Line` · `Greedy Algorithms` · `Priority Queue` · `Binary Search` · `Sorting`

</div>

<div class="tags">
  <span class="tag">intervals</span>
  <span class="tag">merge</span>
  <span class="tag">sweep-line</span>
  <span class="tag">sorting</span>
  <span class="tag">greedy</span>
  <span class="tag">medior</span>
</div>

### Kadane's Algorithm {#kadanes-algorithm}
<!-- tags: kadane, maximum-subarray, dynamic-programming, arrays, optimization, junior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*A Kadane's Algorithm olyan, mint egy befektető, aki folyamatosan dönt: "folytatom a jelenlegi befektetési sorozatot, vagy újrakezdem?" Minden lépésben eldönti, hogy a jelenlegi elem hozzáadása az eddigi összeghez jobb-e, mint az újrakezdés. A maximum subarray sum problémájának O(n) megoldása.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(n) idő, O(1) tér
- **Average case**: O(n) idő, O(1) tér
- **Worst case**: O(n) idő, O(1) tér
- **Space**: O(1) extra memória

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**Basic Kadane's Algorithm**
```pseudo
FUNCTION MaxSubarraySum(A)
  maxSoFar ← A[0]
  maxEndingHere ← A[0]
  
  FOR i ← 1 TO LENGTH(A) − 1 DO
    maxEndingHere ← MAX(A[i], maxEndingHere + A[i])
    maxSoFar ← MAX(maxSoFar, maxEndingHere)
  END FOR
  
  RETURN maxSoFar
END FUNCTION
```

**Kadane with indices (track start and end)**
```pseudo
FUNCTION MaxSubarrayWithIndices(A)
  maxSum ← A[0]
  currentSum ← A[0]
  start ← 0, end ← 0, tempStart ← 0
  
  FOR i ← 1 TO LENGTH(A) − 1 DO
    IF currentSum < 0 THEN
      currentSum ← A[i]
      tempStart ← i
    ELSE
      currentSum ← currentSum + A[i]
    END IF
    
    IF currentSum > maxSum THEN
      maxSum ← currentSum
      start ← tempStart
      end ← i
    END IF
  END FOR
  
  RETURN [maxSum, start, end]
END FUNCTION
```

**Circular Array Maximum Subarray**
```pseudo
FUNCTION MaxSubarrayCircular(A)
  // Case 1: Maximum subarray is non-circular
  normalMax ← KADANE(A)
  
  // Case 2: Maximum subarray is circular
  totalSum ← SUM(A)
  invertedArray ← [−x FOR x IN A]
  maxWrap ← totalSum + KADANE(invertedArray)  // totalSum − minSubarray
  
  // Handle all negative case
  IF maxWrap = 0 THEN
    RETURN normalMax
  END IF
  
  RETURN MAX(normalMax, maxWrap)
END FUNCTION
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class KadaneAlgorithm {
    
    // Basic Kadane's Algorithm
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        
        return maxSoFar;
    }
    
    // Kadane with subarray indices
    public static int[] maxSubArrayWithIndices(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        int start = 0, end = 0, tempStart = 0;
        
        for (int i = 1; i < nums.length; i++) {
            if (currentSum < 0) {
                currentSum = nums[i];
                tempStart = i;
            } else {
                currentSum += nums[i];
            }
            
            if (currentSum > maxSum) {
                maxSum = currentSum;
                start = tempStart;
                end = i;
            }
        }
        
        return new int[]{maxSum, start, end};
    }
    
    // Maximum Circular Subarray
    public static int maxSubarraySumCircular(int[] arr) {
        // Case 1: Maximum subarray is non-circular
        int normalMax = kadane(arr);
        
        // Case 2: Maximum subarray is circular
        int totalSum = Arrays.stream(arr).sum();
        
        // Invert array and find max subarray (which is min of original)
        int[] invertedArr = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            invertedArr[i] = -arr[i];
        }
        
        int maxWrap = totalSum + kadane(invertedArr);
        
        // If all elements are negative, maxWrap will be 0
        if (maxWrap == 0) {
            return normalMax;
        }
        
        return Math.max(normalMax, maxWrap);
    }
    
    private static int kadane(int[] arr) {
        int maxSum = arr[0];
        int currentSum = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            currentSum = Math.max(arr[i], currentSum + arr[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
    
    // Maximum Product Subarray (Kadane variation)
    public static int maxProduct(int[] nums) {
        int maxSoFar = nums[0];
        int minSoFar = nums[0];  // Track minimum for negative * negative = positive
        int result = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            int num = nums[i];
            
            if (num < 0) {
                // Swap max and min when encountering negative number
                int temp = maxSoFar;
                maxSoFar = minSoFar;
                minSoFar = temp;
            }
            
            maxSoFar = Math.max(num, maxSoFar * num);
            minSoFar = Math.min(num, minSoFar * num);
            
            result = Math.max(result, maxSoFar);
        }
        
        return result;
    }
    
    // Maximum Sum Rectangle in 2D Array
    public static int maxSumRectangle(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        int maxSum = Integer.MIN_VALUE;
        
        for (int top = 0; top < rows; top++) {
            int[] temp = new int[cols];
            
            for (int bottom = top; bottom < rows; bottom++) {
                // Add current row to temp array
                for (int col = 0; col < cols; col++) {
                    temp[col] += matrix[bottom][col];
                }
                
                // Apply Kadane's algorithm on temp array
                int currentMax = maxSubArray(temp);
                maxSum = Math.max(maxSum, currentMax);
            }
        }
        
        return maxSum;
    }
    
    // Teszt
    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Max subarray sum: " + maxSubArray(nums)); // 6
        
        int[] result = maxSubArrayWithIndices(nums);
        System.out.println("Max sum: " + result[0] + ", from index " + result[1] + " to " + result[2]); 
        // Max sum: 6, from index 3 to 6
        
        int[] circular = {1, -2, 3, -2};
        System.out.println("Max circular subarray: " + maxSubarraySumCircular(circular)); // 3
        
        int[] products = {2, 3, -2, 4};
        System.out.println("Max product subarray: " + maxProduct(products)); // 6
        
        int[][] matrix = {
            {1, 2, -1, -4, -20},
            {-8, -3, 4, 2, 1},
            {3, 8, 10, 1, 3},
            {-4, -1, 1, 7, -6}
        };
        System.out.println("Max sum rectangle: " + maxSumRectangle(matrix)); // 29
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Basic Kadane's Algorithm
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Maximum Subarray with actual subarray
function maxSubArrayWithArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0, end = 0, tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (currentSum < 0) {
            currentSum = nums[i];
            tempStart = i;
        } else {
            currentSum += nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return {
        sum: maxSum,
        subarray: nums.slice(start, end + 1),
        indices: [start, end]
    };
}

// Maximum Circular Subarray
function maxSubarraySumCircular(arr) {
    // Helper function for Kadane's algorithm
    function kadane(array) {
        let maxSum = array[0];
        let currentSum = array[0];
        
        for (let i = 1; i < array.length; i++) {
            currentSum = Math.max(array[i], currentSum + array[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
    
    // Case 1: Maximum subarray is non-circular
    const normalMax = kadane(arr);
    
    // Case 2: Maximum subarray is circular
    const totalSum = arr.reduce((sum, num) => sum + num, 0);
    const invertedArr = arr.map(num => -num);
    const maxWrap = totalSum + kadane(invertedArr);
    
    // If all elements are negative
    if (maxWrap === 0) {
        return normalMax;
    }
    
    return Math.max(normalMax, maxWrap);
}

// Best Time to Buy and Sell Stock (Kadane variation)
function maxProfit(prices) {
    let maxProfit = 0;
    let minPrice = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
        minPrice = Math.min(minPrice, prices[i]);
        maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    }
    
    return maxProfit;
}

// Maximum Difference Between Increasing Elements
function maximumDifference(nums) {
    let maxDiff = -1;
    let minSoFar = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > minSoFar) {
            maxDiff = Math.max(maxDiff, nums[i] - minSoFar);
        }
        minSoFar = Math.min(minSoFar, nums[i]);
    }
    
    return maxDiff;
}

// Maximum Subarray Sum with At Most K Deletions
function maxSubarrayWithKDeletions(arr, k) {
    const n = arr.length;
    // dp[i][j] = max sum ending at i with j deletions
    const dp = Array(n).fill().map(() => Array(k + 1).fill(-Infinity));
    
    // Base case
    dp[0][0] = arr[0];
    if (k > 0) dp[0][1] = 0; // delete first element
    
    let maxSum = arr[0];
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= k; j++) {
            // Don't delete current element
            dp[i][j] = Math.max(arr[i], dp[i-1][j] + arr[i]);
            
            // Delete current element (if possible)
            if (j > 0) {
                dp[i][j] = Math.max(dp[i][j], dp[i-1][j-1]);
            }
            
            maxSum = Math.max(maxSum, dp[i][j]);
        }
    }
    
    return maxSum;
}

// Teszt
console.log("Max subarray sum:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6

const result = maxSubArrayWithArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log("Max subarray:", result); 
// { sum: 6, subarray: [4, -1, 2, 1], indices: [3, 6] }

console.log("Max circular subarray:", maxSubarraySumCircular([1, -2, 3, -2])); // 3

console.log("Max profit:", maxProfit([7, 1, 5, 3, 6, 4])); // 5

console.log("Maximum difference:", maximumDifference([7, 1, 5, 4])); // 4
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Basic Kadane's Algorithm with type safety
function maxSubArray(nums: number[]): number {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Kadane result interface
interface KadaneResult {
    sum: number;
    startIndex: number;
    endIndex: number;
    subarray: number[];
}

// Kadane with detailed result
function maxSubArrayDetailed(nums: number[]): KadaneResult {
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0, end = 0, tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (currentSum < 0) {
            currentSum = nums[i];
            tempStart = i;
        } else {
            currentSum += nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return {
        sum: maxSum,
        startIndex: start,
        endIndex: end,
        subarray: nums.slice(start, end + 1)
    };
}

// Maximum Product Subarray
function maxProduct(nums: number[]): number {
    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        
        if (num < 0) {
            [maxSoFar, minSoFar] = [minSoFar, maxSoFar];
        }
        
        maxSoFar = Math.max(num, maxSoFar * num);
        minSoFar = Math.min(num, minSoFar * num);
        
        result = Math.max(result, maxSoFar);
    }
    
    return result;
}

// Maximum Sum of 3 Non-Overlapping Subarrays
function maxSumOfThreeSubarrays(nums: number[], k: number): number[] {
    const n = nums.length;
    
    // Calculate sums of all k-length subarrays
    const sums: number[] = [];
    let windowSum = 0;
    
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    sums.push(windowSum);
    
    for (let i = k; i < n; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        sums.push(windowSum);
    }
    
    // Find the best left subarray for each position
    const left: number[] = new Array(sums.length);
    let bestLeft = 0;
    left[0] = 0;
    
    for (let i = 1; i < sums.length; i++) {
        if (sums[i] > sums[bestLeft]) {
            bestLeft = i;
        }
        left[i] = bestLeft;
    }
    
    // Find the best right subarray for each position
    const right: number[] = new Array(sums.length);
    let bestRight = sums.length - 1;
    right[sums.length - 1] = sums.length - 1;
    
    for (let i = sums.length - 2; i >= 0; i--) {
        if (sums[i] >= sums[bestRight]) {
            bestRight = i;
        }
        right[i] = bestRight;
    }
    
    // Find the maximum sum by trying each middle subarray
    let maxSum = 0;
    let result: number[] = [];
    
    for (let mid = k; mid < sums.length - k; mid++) {
        const leftIdx = left[mid - k];
        const rightIdx = right[mid + k];
        const currentSum = sums[leftIdx] + sums[mid] + sums[rightIdx];
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            result = [leftIdx, mid, rightIdx];
        }
    }
    
    return result;
}

// Maximum Subarray Sum After One Deletion
function maximumSum(arr: number[]): number {
    const n = arr.length;
    
    // forward[i] = max subarray sum ending at index i
    const forward: number[] = new Array(n);
    forward[0] = arr[0];
    let maxSum = arr[0];
    
    for (let i = 1; i < n; i++) {
        forward[i] = Math.max(arr[i], forward[i - 1] + arr[i]);
        maxSum = Math.max(maxSum, forward[i]);
    }
    
    // backward[i] = max subarray sum starting at index i
    const backward: number[] = new Array(n);
    backward[n - 1] = arr[n - 1];
    
    for (let i = n - 2; i >= 0; i--) {
        backward[i] = Math.max(arr[i], backward[i + 1] + arr[i]);
    }
    
    // Try deleting each element
    for (let i = 1; i < n - 1; i++) {
        maxSum = Math.max(maxSum, forward[i - 1] + backward[i + 1]);
    }
    
    return maxSum;
}

// Teszt
const nums: number[] = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log("Max subarray sum:", maxSubArray(nums)); // 6

const detailed: KadaneResult = maxSubArrayDetailed(nums);
console.log("Detailed result:", detailed);
// { sum: 6, startIndex: 3, endIndex: 6, subarray: [4, -1, 2, 1] }

const products: number[] = [2, 3, -2, 4];
console.log("Max product:", maxProduct(products)); // 6

const threeSubarrays: number[] = [1, 2, 1, 2, 6, 7, 5, 1];
console.log("Three subarrays indices:", maxSumOfThreeSubarrays(threeSubarrays, 2)); // [0, 3, 5]

const deleteOne: number[] = [1, -2, 0, 3];
console.log("Max sum after deletion:", maximumSum(deleteOne)); // 4
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Initialization**: `maxSoFar` inicializálása `0`-val üres subarray-re, de ez rossz ha minden elem negatív
- **Reset condition**: `maxEndingHere < 0` vs `maxEndingHere <= 0` - egyenlőség kezelése
- **Index tracking**: start/end indexek helyes frissítése, különösen reset után
- **Circular case**: mindent negatív eset kezelése (maxWrap == 0)
- **2D extension**: Kadane alkalmazása minden sor kombinációra O(n³) összesítés

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Stock trading**: maximum profit single buy-sell transaction
- **Image processing**: brightest region detection in 2D arrays
- **Bioinformatics**: DNA sequence analysis, finding GC-rich regions
- **Financial analysis**: portfolio optimization, risk assessment
- **Game development**: maximum score sequence, combo systems

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért működik a Kadane's algoritmus?
<details><summary>Válasz mutatása</summary>
Ha az eddigi összeg negatív, akkor azt eldobjuk és újrakezdjük, mert bármely pozitív elem önmagában jobb lesz, mint az eddigi negatív összeg + az elem.
</details>

2. Hogyan adaptáljuk Kadane-t maximum product subarray-re?
<details><summary>Válasz mutatása</summary>
Két változót követünk: max és min. Negatív számnál megcseréljük őket, mert negatív × negatív = pozitív.
</details>

3. Mi a trükk a circular maximum subarray problémánál?
<details><summary>Válasz mutatása</summary>
Circular max = total_sum - minimum_subarray. Minimum subarray megtalálásához invertáljuk a tömböt és alkalmazzuk Kadane-t.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Maximum Subarray"** → Classic Kadane's algorithm implementation
2. **"Maximum Product Subarray"** → Handle negative numbers, track both max and min
3. **"Maximum Circular Subarray"** → Two cases: normal vs circular, use complement technique
4. **"Best Time to Buy and Sell Stock"** → Kadane variation, track minimum price
5. **"Maximum Sum Rectangle in 2D Array"** → Apply Kadane's on compressed rows

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Dynamic Programming` · `Greedy Algorithms` · `Prefix Sum` · `Sliding Window` · `Divide and Conquer`

</div>

<div class="tags">
  <span class="tag">kadane</span>
  <span class="tag">maximum-subarray</span>
  <span class="tag">dynamic-programming</span>
  <span class="tag">arrays</span>
  <span class="tag">optimization</span>
  <span class="tag">junior</span>
</div>

### Binary Search on Answer {#binary-search-answer}
<!-- tags: binary-search, optimization, search, answer-space, medior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*A Binary Search on Answer olyan, mint egy "túl kevés vagy túl sok?" játék: nem konkrét értéket keresünk egy tömbben, hanem a válaszok terében keresünk. Ha egy érték működik, akkor a nagyobbak is; ha nem működik, akkor a kisebbek sem. A monoton tulajdonság alapján felezzük a keresési teret.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(log(max-min) * check_function_time) idő
- **Average case**: O(log(max-min) * check_function_time) idő
- **Worst case**: O(log(max-min) * check_function_time) idő
- **Space**: O(1) - O(check_function_space) tér

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**Template for Binary Search on Answer**
```pseudo
FUNCTION BinarySearchAnswer(possibleAnswers, checkFunction)
  left ← minPossibleAnswer
  right ← maxPossibleAnswer
  result ← −1  // or other default
  
  WHILE left ≤ right DO
    mid ← left + (right − left) / 2
    
    IF checkFunction(mid) THEN
      result ← mid  // Valid answer found
      right ← mid − 1  // Search for smaller valid answer
    ELSE
      left ← mid + 1   // Search for larger answer
    END IF
  END WHILE
  
  RETURN result
END FUNCTION
```

**Capacity To Ship Packages example**
```pseudo
FUNCTION ShipWithinDays(weights, days)
  FUNCTION CanShipWithCapacity(capacity)
    currentWeight ← 0
    daysNeeded ← 1
    
    FOR weight IN weights DO
      IF currentWeight + weight > capacity THEN
        daysNeeded ← daysNeeded + 1
        currentWeight ← weight
        IF daysNeeded > days THEN
          RETURN false
        END IF
      ELSE
        currentWeight ← currentWeight + weight
      END IF
    END FOR
    
    RETURN true
  END FUNCTION
  
  left ← MAX(weights)  // minimum possible capacity
  right ← SUM(weights) // maximum possible capacity
  
  WHILE left < right DO
    mid ← left + (right − left) / 2
    
    IF CanShipWithCapacity(mid) THEN
      right ← mid
    ELSE
      left ← mid + 1
    END IF
  END WHILE
  
  RETURN left
END FUNCTION
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class BinarySearchOnAnswer {
    
    // Capacity To Ship Packages Within D Days
    public static int shipWithinDays(int[] weights, int days) {
        int left = Arrays.stream(weights).max().orElse(0);
        int right = Arrays.stream(weights).sum();
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (canShipWithCapacity(weights, days, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    private static boolean canShipWithCapacity(int[] weights, int days, int capacity) {
        int currentWeight = 0;
        int daysNeeded = 1;
        
        for (int weight : weights) {
            if (currentWeight + weight > capacity) {
                daysNeeded++;
                currentWeight = weight;
                if (daysNeeded > days) {
                    return false;
                }
            } else {
                currentWeight += weight;
            }
        }
        
        return true;
    }
    
    // Kth Smallest Pair Distance
    public static int smallestDistancePair(int[] nums, int k) {
        Arrays.sort(nums);
        int left = 0;
        int right = nums[nums.length - 1] - nums[0];
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (countPairsWithDistanceLessEqual(nums, mid) >= k) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    private static int countPairsWithDistanceLessEqual(int[] nums, int target) {
        int count = 0;
        int left = 0;
        
        for (int right = 1; right < nums.length; right++) {
            while (nums[right] - nums[left] > target) {
                left++;
            }
            count += right - left;
        }
        
        return count;
    }
    
    // Split Array Largest Sum
    public static int splitArray(int[] nums, int m) {
        int left = Arrays.stream(nums).max().orElse(0);
        int right = Arrays.stream(nums).sum();
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (canSplitWithMaxSum(nums, m, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    private static boolean canSplitWithMaxSum(int[] nums, int m, int maxSum) {
        int currentSum = 0;
        int splits = 1;
        
        for (int num : nums) {
            if (currentSum + num > maxSum) {
                splits++;
                currentSum = num;
                if (splits > m) {
                    return false;
                }
            } else {
                currentSum += num;
            }
        }
        
        return true;
    }
    
    // Magnetic Force Between Two Balls
    public static int maxDistance(int[] position, int m) {
        Arrays.sort(position);
        int left = 1;
        int right = position[position.length - 1] - position[0];
        int result = 0;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (canPlaceBallsWithMinDist(position, m, mid)) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    private static boolean canPlaceBallsWithMinDist(int[] position, int m, int minDist) {
        int count = 1;
        int lastPosition = position[0];
        
        for (int i = 1; i < position.length; i++) {
            if (position[i] - lastPosition >= minDist) {
                count++;
                lastPosition = position[i];
                if (count >= m) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // Teszt
    public static void main(String[] args) {
        int[] weights = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        System.out.println("Ship capacity: " + shipWithinDays(weights, 5)); // 15
        
        int[] nums = {1, 3, 1};
        System.out.println("Kth smallest distance: " + smallestDistancePair(nums, 1)); // 0
        
        int[] splitNums = {7, 2, 5, 10, 8};
        System.out.println("Split array largest sum: " + splitArray(splitNums, 2)); // 18
        
        int[] positions = {1, 2, 3, 4, 7};
        System.out.println("Max magnetic distance: " + maxDistance(positions, 3)); // 3
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Minimum Number of Days to Make m Bouquets
function minDays(bloomDay, m, k) {
    if (m * k > bloomDay.length) return -1;
    
    const left = Math.min(...bloomDay);
    const right = Math.max(...bloomDay);
    
    function canMakeBouquets(day) {
        let bouquets = 0;
        let consecutiveFlowers = 0;
        
        for (const bloom of bloomDay) {
            if (bloom <= day) {
                consecutiveFlowers++;
                if (consecutiveFlowers === k) {
                    bouquets++;
                    consecutiveFlowers = 0;
                }
            } else {
                consecutiveFlowers = 0;
            }
        }
        
        return bouquets >= m;
    }
    
    let result = right;
    let low = left, high = right;
    
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        
        if (canMakeBouquets(mid)) {
            result = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    
    return result;
}

// Minimized Maximum of Products Distributed to Any Store
function minimizedMaximum(n, quantities) {
    let left = 1;
    let right = Math.max(...quantities);
    
    function canDistribute(maxProducts) {
        let storesNeeded = 0;
        
        for (const quantity of quantities) {
            storesNeeded += Math.ceil(quantity / maxProducts);
            if (storesNeeded > n) {
                return false;
            }
        }
        
        return true;
    }
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (canDistribute(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

// Find Peak Element (classic binary search variation)
function findPeakElement(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[mid + 1]) {
            // Peak is on the left side (including mid)
            right = mid;
        } else {
            // Peak is on the right side
            left = mid + 1;
        }
    }
    
    return left;
}

// Search in Rotated Sorted Array
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
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

// Time-based Key-Value Store
class TimeMap {
    constructor() {
        this.map = new Map();
    }
    
    set(key, value, timestamp) {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        this.map.get(key).push([timestamp, value]);
    }
    
    get(key, timestamp) {
        if (!this.map.has(key)) return "";
        
        const values = this.map.get(key);
        let left = 0;
        let right = values.length - 1;
        let result = "";
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (values[mid][0] <= timestamp) {
                result = values[mid][1];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
}

// Teszt
console.log("Min days for bouquets:", minDays([1,10,3,10,2], 3, 1)); // 3
console.log("Minimized maximum:", minimizedMaximum(6, [11,6])); // 3
console.log("Peak element index:", findPeakElement([1,2,3,1])); // 2
console.log("Search in rotated array:", search([4,5,6,7,0,1,2], 0)); // 4

const timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);
timeMap.set("foo", "bar2", 4);
console.log("TimeMap get:", timeMap.get("foo", 4)); // "bar2"
console.log("TimeMap get:", timeMap.get("foo", 5)); // "bar2"
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Binary Search on Answer template
function binarySearchOnAnswer<T>(
    left: number,
    right: number,
    checkFunction: (mid: number, data?: T) => boolean,
    data?: T,
    findMinimum: boolean = true
): number {
    let result = findMinimum ? right : left;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (checkFunction(mid, data)) {
            result = mid;
            if (findMinimum) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (findMinimum) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return result;
}

// Aggressive Cows Problem
function aggressiveCows(stalls: number[], cows: number): number {
    stalls.sort((a, b) => a - b);
    
    function canPlaceCows(minDistance: number): boolean {
        let count = 1;
        let lastPosition = stalls[0];
        
        for (let i = 1; i < stalls.length; i++) {
            if (stalls[i] - lastPosition >= minDistance) {
                count++;
                lastPosition = stalls[i];
                if (count >= cows) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    const maxDistance = stalls[stalls.length - 1] - stalls[0];
    return binarySearchOnAnswer(1, maxDistance, canPlaceCows, undefined, false);
}

// Median of Two Sorted Arrays
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = Math.floor((m + n + 1) / 2) - partition1;
        
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];
        
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            right = partition1 - 1;
        } else {
            left = partition1 + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted");
}

// Kth Smallest Element in a Sorted Matrix
function kthSmallest(matrix: number[][], k: number): number {
    const n = matrix.length;
    let left = matrix[0][0];
    let right = matrix[n - 1][n - 1];
    
    function countLessEqual(target: number): number {
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
    }
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (countLessEqual(mid) >= k) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

// Find Minimum in Rotated Sorted Array
function findMin(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
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

// H-Index II (Binary Search on Answer)
function hIndex(citations: number[]): number {
    const n = citations.length;
    let left = 0;
    let right = n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const hCandidate = n - mid;
        
        if (citations[mid] >= hCandidate) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return n - left;
}

// Teszt
const stalls: number[] = [1, 2, 4, 8, 9];
console.log("Aggressive cows:", aggressiveCows(stalls, 3)); // 3

console.log("Median of sorted arrays:", findMedianSortedArrays([1, 3], [2])); // 2

const matrix: number[][] = [
    [1, 5, 9],
    [10, 11, 13],
    [12, 13, 15]
];
console.log("Kth smallest in matrix:", kthSmallest(matrix, 8)); // 13

console.log("Find minimum in rotated:", findMin([3, 4, 5, 1, 2])); // 1

const citations: number[] = [0, 1, 3, 5, 6];
console.log("H-Index:", hIndex(citations)); // 3
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Search space meghatározása**: min/max értékek helytelen megállapítása
- **Check function logika**: monoton tulajdonság megsértése
- **Integer overflow**: `(left + right) / 2` helyett `left + (right - left) / 2`
- **Boundary conditions**: `left <= right` vs `left < right` eldöntése
- **Result tracking**: mikor frissítsük a result változót

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Resource allocation**: capacity planning, load balancing
- **Optimization problems**: minimize maximum, maximize minimum
- **Game theory**: optimal strategy finding
- **Engineering**: stress testing, performance tuning
- **Machine learning**: hyperparameter optimization

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor alkalmazható a Binary Search on Answer?
<details><summary>Válasz mutatása</summary>
Ha a válaszok terében monoton tulajdonság van: ha x válasz működik, akkor minden x-nél nagyobb (vagy kisebb) is működik.
</details>

2. Hogyan határozzuk meg a search space-t?
<details><summary>Válasz mutatása</summary>
Left: minimálisan lehetséges válasz (gyakran 0 vagy max(array)). Right: maximálisan lehetséges válasz (gyakran sum(array) vagy nagy konstans).
</details>

3. Mi a különbség a klasszikus binary search és binary search on answer között?
<details><summary>Válasz mutatása</summary>
Klasszikus: konkrét értéket keresünk tömbben. Answer: válaszok terében keresünk, check function segítségével.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Capacity To Ship Packages Within D Days"** → Classic binary search on answer with capacity check
2. **"Kth Smallest Pair Distance"** → Search on distance values, count pairs efficiently
3. **"Split Array Largest Sum"** → Minimize the maximum sum using binary search
4. **"Aggressive Cows"** → Maximize minimum distance placement problem
5. **"Median of Two Sorted Arrays"** → Binary search on partitions to find median

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Binary Search` · `Two Pointers` · `Greedy Algorithms` · `Optimization` · `Ternary Search`

</div>

<div class="tags">
  <span class="tag">binary-search</span>
  <span class="tag">optimization</span>
  <span class="tag">search</span>
  <span class="tag">answer-space</span>
  <span class="tag">medior</span>
</div>

### Quickselect {#quickselect}
<!-- tags: quickselect, selection, kth-element, partition, divide-conquer, medior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*A Quickselect olyan, mint a Quicksort részleges végrehajtása: nem rendezzük az egész tömböt, csak addig megyünk, amíg meg nem találjuk a k-adik elemet. A partition művelettel felezzük a problémát, de csak az egyik felét dolgozzuk fel tovább. Átlagban O(n) idő, worst case O(n²).*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(n) idő, O(1) tér
- **Average case**: O(n) idő, O(1) tér
- **Worst case**: O(n²) idő, O(1) tér (rossz pivot választás)
- **Space**: O(1) iteratív, O(log n) rekurzív

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**Basic Quickselect Algorithm**
```pseudo
FUNCTION Quickselect(A, left, right, k)
  IF left = right THEN
    RETURN A[left]
  END IF
  
  pivotIndex ← PARTITION(A, left, right)
  
  IF k = pivotIndex THEN
    RETURN A[k]
  ELSE IF k < pivotIndex THEN
    RETURN Quickselect(A, left, pivotIndex − 1, k)
  ELSE
    RETURN Quickselect(A, pivotIndex + 1, right, k)
  END IF
END FUNCTION
```

**Lomuto Partition Scheme**
```pseudo
FUNCTION Partition(A, left, right)
  pivot ← A[right]
  i ← left
  
  FOR j ← left TO right − 1 DO
    IF A[j] ≤ pivot THEN
      SWAP(A, i, j)
      i ← i + 1
    END IF
  END FOR
  
  SWAP(A, i, right)
  RETURN i
END FUNCTION
```

**Median of Medians (guarantees O(n) worst case)**
```pseudo
FUNCTION MedianOfMedians(A, k)
  IF LENGTH(A) ≤ 5 THEN
    SORT A AND RETURN k-th element
  END IF
  
  // Divide into groups of 5
  medians ← EMPTY_LIST
  FOR i ← 0 TO LENGTH(A) STEP 5 DO
    group ← A[i:i+5]
    SORT group
    ADD(medians, group[LENGTH(group)/2])
  END FOR
  
  // Recursively find median of medians
  pivot ← MedianOfMedians(medians, LENGTH(medians)/2)
  
  // Partition around this pivot
  pivotIndex ← PARTITION(A, pivot)
  
  IF k = pivotIndex THEN
    RETURN A[k]
  ELSE IF k < pivotIndex THEN
    RETURN MedianOfMedians(A[0:pivotIndex], k)
  ELSE
    RETURN MedianOfMedians(A[pivotIndex+1:], k − pivotIndex − 1)
  END IF
END FUNCTION
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class Quickselect {
    
    // Basic Quickselect (Kth Largest Element)
    public static int findKthLargest(int[] nums, int k) {
        return quickselect(nums, 0, nums.length - 1, nums.length - k);
    }
    
    private static int quickselect(int[] nums, int left, int right, int k) {
        if (left == right) {
            return nums[left];
        }
        
        Random random = new Random();
        int pivotIndex = left + random.nextInt(right - left + 1);
        
        pivotIndex = partition(nums, left, right, pivotIndex);
        
        if (k == pivotIndex) {
            return nums[k];
        } else if (k < pivotIndex) {
            return quickselect(nums, left, pivotIndex - 1, k);
        } else {
            return quickselect(nums, pivotIndex + 1, right, k);
        }
    }
    
    private static int partition(int[] nums, int left, int right, int pivotIndex) {
        int pivotValue = nums[pivotIndex];
        
        // Move pivot to end
        swap(nums, pivotIndex, right);
        
        int storeIndex = left;
        for (int i = left; i < right; i++) {
            if (nums[i] < pivotValue) {
                swap(nums, storeIndex, i);
                storeIndex++;
            }
        }
        
        // Move pivot to final position
        swap(nums, storeIndex, right);
        return storeIndex;
    }
    
    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    
    // Top K Frequent Elements
    public static int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }
        
        List<Integer> unique = new ArrayList<>(freqMap.keySet());
        
        // Quickselect based on frequency
        int n = unique.size();
        quickselectByFreq(unique, freqMap, 0, n - 1, n - k);
        
        return unique.subList(n - k, n).stream().mapToInt(i -> i).toArray();
    }
    
    private static void quickselectByFreq(List<Integer> unique, Map<Integer, Integer> freqMap, 
                                        int left, int right, int k) {
        if (left == right) return;
        
        Random random = new Random();
        int pivotIndex = left + random.nextInt(right - left + 1);
        
        pivotIndex = partitionByFreq(unique, freqMap, left, right, pivotIndex);
        
        if (k == pivotIndex) {
            return;
        } else if (k < pivotIndex) {
            quickselectByFreq(unique, freqMap, left, pivotIndex - 1, k);
        } else {
            quickselectByFreq(unique, freqMap, pivotIndex + 1, right, k);
        }
    }
    
    private static int partitionByFreq(List<Integer> unique, Map<Integer, Integer> freqMap,
                                     int left, int right, int pivotIndex) {
        int pivotFreq = freqMap.get(unique.get(pivotIndex));
        
        // Move pivot to end
        Collections.swap(unique, pivotIndex, right);
        
        int storeIndex = left;
        for (int i = left; i < right; i++) {
            if (freqMap.get(unique.get(i)) < pivotFreq) {
                Collections.swap(unique, storeIndex, i);
                storeIndex++;
            }
        }
        
        Collections.swap(unique, storeIndex, right);
        return storeIndex;
    }
    
    // Median of Medians (Guaranteed O(n))
    public static int medianOfMedians(int[] nums) {
        return medianOfMedians(nums, 0, nums.length - 1, nums.length / 2);
    }
    
    private static int medianOfMedians(int[] nums, int left, int right, int k) {
        if (right - left < 5) {
            Arrays.sort(nums, left, right + 1);
            return nums[left + k];
        }
        
        // Divide into groups of 5 and find medians
        int medianIndex = left;
        for (int i = left; i <= right; i += 5) {
            int groupRight = Math.min(i + 4, right);
            Arrays.sort(nums, i, groupRight + 1);
            int median = i + (groupRight - i) / 2;
            swap(nums, median, medianIndex);
            medianIndex++;
        }
        
        // Find median of medians
        int mom = medianOfMedians(nums, left, medianIndex - 1, (medianIndex - left) / 2);
        
        // Find position of median of medians in original array
        int pivotIndex = left;
        for (int i = left; i <= right; i++) {
            if (nums[i] == mom) {
                pivotIndex = i;
                break;
            }
        }
        
        // Partition around median of medians
        pivotIndex = partition(nums, left, right, pivotIndex);
        
        if (k == pivotIndex - left) {
            return nums[pivotIndex];
        } else if (k < pivotIndex - left) {
            return medianOfMedians(nums, left, pivotIndex - 1, k);
        } else {
            return medianOfMedians(nums, pivotIndex + 1, right, k - (pivotIndex - left + 1));
        }
    }
    
    // Teszt
    public static void main(String[] args) {
        int[] nums = {3, 2, 1, 5, 6, 4};
        System.out.println("2nd largest: " + findKthLargest(nums, 2)); // 5
        
        int[] freqNums = {1, 1, 1, 2, 2, 3};
        System.out.println("Top 2 frequent: " + Arrays.toString(topKFrequent(freqNums, 2))); // [1, 2]
        
        int[] medianNums = {3, 1, 4, 1, 5, 9, 2, 6};
        System.out.println("Median: " + medianOfMedians(medianNums)); // 3
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Basic Quickselect Implementation
function findKthLargest(nums, k) {
    function quickselect(left, right, kSmallest) {
        if (left === right) {
            return nums[left];
        }
        
        const pivotIndex = randomPartition(left, right);
        
        if (kSmallest === pivotIndex) {
            return nums[kSmallest];
        } else if (kSmallest < pivotIndex) {
            return quickselect(left, pivotIndex - 1, kSmallest);
        } else {
            return quickselect(pivotIndex + 1, right, kSmallest);
        }
    }
    
    function randomPartition(left, right) {
        const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
        [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];
        return partition(left, right);
    }
    
    function partition(left, right) {
        const pivot = nums[right];
        let i = left;
        
        for (let j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        
        [nums[i], nums[right]] = [nums[right], nums[i]];
        return i;
    }
    
    return quickselect(0, nums.length - 1, nums.length - k);
}

// Quickselect for Multiple Kth Elements
function findKthSmallest(nums, k) {
    function quickselect(arr, k) {
        if (arr.length === 1) return arr[0];
        
        const pivot = arr[Math.floor(Math.random() * arr.length)];
        const less = arr.filter(x => x < pivot);
        const equal = arr.filter(x => x === pivot);
        const greater = arr.filter(x => x > pivot);
        
        if (k <= less.length) {
            return quickselect(less, k);
        } else if (k <= less.length + equal.length) {
            return pivot;
        } else {
            return quickselect(greater, k - less.length - equal.length);
        }
    }
    
    return quickselect([...nums], k);
}

// Find Median using Quickselect
function findMedian(nums) {
    const n = nums.length;
    const arr = [...nums]; // Create copy
    
    if (n % 2 === 1) {
        return findKthSmallest(arr, Math.floor(n / 2) + 1);
    } else {
        const mid1 = findKthSmallest([...nums], n / 2);
        const mid2 = findKthSmallest([...nums], n / 2 + 1);
        return (mid1 + mid2) / 2;
    }
}

// Top K Elements in Stream
class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.heap = nums.sort((a, b) => a - b).slice(0, k); // Min heap simulation
    }
    
    add(val) {
        this.heap.push(val);
        this.heap.sort((a, b) => a - b);
        
        if (this.heap.length > this.k) {
            this.heap.shift(); // Remove smallest
        }
        
        return this.heap[0]; // Return kth largest
    }
}

// Wiggle Sort II using Quickselect
function wiggleSort(nums) {
    const n = nums.length;
    const median = findKthSmallest([...nums], Math.floor((n + 1) / 2));
    
    // Dutch flag partitioning with index mapping
    function newIndex(index) {
        return (1 + 2 * index) % (n | 1);
    }
    
    let i = 0, j = 0, k = n - 1;
    
    while (j <= k) {
        if (nums[newIndex(j)] > median) {
            [nums[newIndex(i)], nums[newIndex(j)]] = [nums[newIndex(j)], nums[newIndex(i)]];
            i++;
            j++;
        } else if (nums[newIndex(j)] < median) {
            [nums[newIndex(j)], nums[newIndex(k)]] = [nums[newIndex(k)], nums[newIndex(j)]];
            k--;
        } else {
            j++;
        }
    }
}

// Array with Elements Not Equal to Average of Neighbors
function rearrangeArray(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    let left = 0;
    let right = nums.length - 1;
    let useLeft = true;
    
    while (left <= right) {
        if (useLeft) {
            result.push(nums[left]);
            left++;
        } else {
            result.push(nums[right]);
            right--;
        }
        useLeft = !useLeft;
    }
    
    return result;
}

// Teszt
console.log("3rd largest:", findKthLargest([3,2,1,5,6,4], 3)); // 4
console.log("2nd smallest:", findKthSmallest([7,10,4,3,20,15], 2)); // 4
console.log("Median:", findMedian([3,1,4,1,5,9,2,6])); // 3.5

const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log("Add 3:", kthLargest.add(3)); // 4
console.log("Add 5:", kthLargest.add(5)); // 5

const wiggleArray = [1, 5, 1, 1, 6, 4];
wiggleSort(wiggleArray);
console.log("Wiggle sort:", wiggleArray); // [1,6,1,5,1,4] (or similar valid wiggle)
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Generic Quickselect Implementation
class QuickSelect {
    static findKthElement<T>(
        arr: T[], 
        k: number, 
        compareFn: (a: T, b: T) => number = (a, b) => Number(a) - Number(b)
    ): T {
        return this.quickselect(arr, 0, arr.length - 1, k - 1, compareFn);
    }
    
    private static quickselect<T>(
        arr: T[], 
        left: number, 
        right: number, 
        k: number,
        compareFn: (a: T, b: T) => number
    ): T {
        if (left === right) {
            return arr[left];
        }
        
        const pivotIndex = this.randomPartition(arr, left, right, compareFn);
        
        if (k === pivotIndex) {
            return arr[k];
        } else if (k < pivotIndex) {
            return this.quickselect(arr, left, pivotIndex - 1, k, compareFn);
        } else {
            return this.quickselect(arr, pivotIndex + 1, right, k, compareFn);
        }
    }
    
    private static randomPartition<T>(
        arr: T[], 
        left: number, 
        right: number,
        compareFn: (a: T, b: T) => number
    ): number {
        const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
        [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
        return this.partition(arr, left, right, compareFn);
    }
    
    private static partition<T>(
        arr: T[], 
        left: number, 
        right: number,
        compareFn: (a: T, b: T) => number
    ): number {
        const pivot = arr[right];
        let i = left;
        
        for (let j = left; j < right; j++) {
            if (compareFn(arr[j], pivot) <= 0) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        
        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
    }
}

// Kth Closest Points to Origin
interface Point {
    x: number;
    y: number;
    distance?: number;
}

function kClosest(points: number[][], k: number): number[][] {
    const pointObjects: Point[] = points.map(([x, y]) => ({
        x, 
        y, 
        distance: Math.sqrt(x * x + y * y)
    }));
    
    function quickselect(left: number, right: number, k: number): void {
        if (left >= right) return;
        
        const pivotIndex = partition(left, right);
        
        if (pivotIndex === k) {
            return;
        } else if (pivotIndex > k) {
            quickselect(left, pivotIndex - 1, k);
        } else {
            quickselect(pivotIndex + 1, right, k);
        }
    }
    
    function partition(left: number, right: number): number {
        const pivotDistance = pointObjects[right].distance!;
        let i = left;
        
        for (let j = left; j < right; j++) {
            if (pointObjects[j].distance! <= pivotDistance) {
                [pointObjects[i], pointObjects[j]] = [pointObjects[j], pointObjects[i]];
                i++;
            }
        }
        
        [pointObjects[i], pointObjects[right]] = [pointObjects[right], pointObjects[i]];
        return i;
    }
    
    quickselect(0, pointObjects.length - 1, k - 1);
    
    return pointObjects.slice(0, k).map(p => [p.x, p.y]);
}

// Find K Pairs with Smallest Sums
function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    interface Pair {
        sum: number;
        i: number;
        j: number;
    }
    
    const allPairs: Pair[] = [];
    
    // Generate all possible pairs (optimized for large arrays)
    for (let i = 0; i < Math.min(nums1.length, k); i++) {
        for (let j = 0; j < Math.min(nums2.length, k); j++) {
            allPairs.push({
                sum: nums1[i] + nums2[j],
                i,
                j
            });
        }
    }
    
    // Use quickselect to find k smallest
    function quickselect(left: number, right: number, k: number): void {
        if (left >= right) return;
        
        const pivotIndex = partition(left, right);
        
        if (pivotIndex === k) {
            return;
        } else if (pivotIndex > k) {
            quickselect(left, pivotIndex - 1, k);
        } else {
            quickselect(pivotIndex + 1, right, k);
        }
    }
    
    function partition(left: number, right: number): number {
        const pivotSum = allPairs[right].sum;
        let i = left;
        
        for (let j = left; j < right; j++) {
            if (allPairs[j].sum <= pivotSum) {
                [allPairs[i], allPairs[j]] = [allPairs[j], allPairs[i]];
                i++;
            }
        }
        
        [allPairs[i], allPairs[right]] = [allPairs[right], allPairs[i]];
        return i;
    }
    
    const actualK = Math.min(k, allPairs.length);
    quickselect(0, allPairs.length - 1, actualK - 1);
    
    return allPairs.slice(0, actualK).map(pair => [nums1[pair.i], nums2[pair.j]]);
}

// Median Finder with Quickselect
class MedianFinder {
    private numbers: number[] = [];
    
    addNum(num: number): void {
        this.numbers.push(num);
    }
    
    findMedian(): number {
        const n = this.numbers.length;
        const copy = [...this.numbers];
        
        if (n % 2 === 1) {
            return QuickSelect.findKthElement(copy, Math.floor(n / 2) + 1);
        } else {
            const left = QuickSelect.findKthElement([...this.numbers], n / 2);
            const right = QuickSelect.findKthElement([...this.numbers], n / 2 + 1);
            return (left + right) / 2;
        }
    }
}

// Teszt
const nums: number[] = [3, 2, 1, 5, 6, 4];
console.log("2nd largest:", QuickSelect.findKthElement(nums, 2, (a, b) => b - a)); // 5

const points: number[][] = [[1,1],[2,2],[3,3],[4,4]];
console.log("2 closest points:", kClosest(points, 2)); // [[1,1],[2,2]]

const pairs = kSmallestPairs([1,7,11], [2,4,6], 3);
console.log("3 smallest pairs:", pairs); // [[1,2],[1,4],[1,6]]

const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
console.log("Median:", medianFinder.findMedian()); // 1.5
medianFinder.addNum(3);
console.log("Median:", medianFinder.findMedian()); // 2
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Pivot választás**: mindig ugyanaz a pivot (pl. utolsó elem) rossz performanciát okozhat
- **K index**: 0-based vs 1-based indexelés összekeverése
- **Partition implementation**: Lomuto vs Hoare scheme különbségei
- **In-place modification**: eredeti tömb módosítása vs másolat készítése
- **Worst case**: O(n²) esetben median-of-medians vagy randomizáció szükséges

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Statistics**: median, percentile számítás nagy adathalmazokon
- **Database queries**: ORDER BY LIMIT optimalizáció
- **Game development**: leaderboard top-k elemek
- **Data analysis**: outlier detection, quantile analysis
- **Machine learning**: feature selection, sampling techniques

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért jobb a Quickselect a teljes rendezésnél k-adik elem megtalálásánál?
<details><summary>Válasz mutatása</summary>
Quickselect átlagban O(n), teljes rendezés O(n log n). Csak az egyik fél feldolgozása szükséges, nem az egész tömb.
</details>

2. Mi a median-of-medians algoritmus célja?
<details><summary>Válasz mutatása</summary>
Garantált O(n) worst-case időkomplexitás biztosítása jó pivot választással, 5-ös csoportok mediánjának mediánja.
</details>

3. Mikor érdemes Quickselect helyett heap-et használni k legnagyobb elemhez?
<details><summary>Válasz mutatása</summary>
Ha k << n és többször kell query-zni, vagy ha stream-ben érkeznek az adatok. Heap: O(n log k), Quickselect: O(n).
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Kth Largest Element in an Array"** → Basic quickselect implementation
2. **"Top K Frequent Elements"** → Quickselect with custom comparator on frequency
3. **"Kth Closest Points to Origin"** → Distance-based quickselect with 2D points
4. **"Find Median from Data Stream"** → Compare quickselect vs two heaps approach
5. **"Wiggle Sort II"** → Use quickselect to find median, then arrange elements

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Quicksort` · `Heap` · `Median of Medians` · `Dutch National Flag` · `Binary Search`

</div>

<div class="tags">
  <span class="tag">quickselect</span>
  <span class="tag">selection</span>
  <span class="tag">kth-element</span>
  <span class="tag">partition</span>
  <span class="tag">divide-conquer</span>
  <span class="tag">medior</span>
</div>

### Sorting Algorithms (QuickSort, MergeSort, HeapSort) {#sorting-algorithms}

<div class="concept-section mental-model" data-filter="sorting medior">

📋 **Fogalom meghatározása**  
*Sorting algorithms = comparison-based rendezési algoritmusok, amelyek elemeket összehasonlítva rendeznek. **QuickSort**: Divide-and-conquer, partition around pivot, in-place, átlag O(n log n), worst O(n²), **nem stabil**. **MergeSort**: Divide-and-conquer, split then merge, O(n) extra space, guaranteed O(n log n), **stabil**. **HeapSort**: Selection sort variant, heap data structure használat, in-place, O(n log n) guaranteed, **nem stabil**. **Stability**: Egyenlő elemek eredeti sorrendje megmarad-e. **In-place**: O(1) vagy O(log n) extra space. **Comparison count**: Alsó korlát összehasonlítás-alapú rendezésnek O(n log n).*

</div>

<div class="concept-section why-important" data-filter="sorting medior">

💡 **Miért számít?**
- **Algorithm design**: Divide-and-conquer paradigma gyakorlati példája
- **Interview frequency**: Top 10 leggyakoribb interjú téma
- **Performance**: Adatstruktúra választás (in-place vs stable) befolyásolja scalability-t
- **Real-world usage**: Adatbázis indexing, file systems, priority queues alapja

</div>

<div class="runnable-model" data-filter="sorting">

**Runnable mental model**

**QuickSort - Partition-based sorting:**
```javascript
// QuickSort: O(n log n) average, O(n²) worst (sorted/reverse sorted)
// In-place, not stable
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        // Randomized pivot to avoid O(n²) on sorted arrays
        const pivotIndex = randomizedPartition(arr, left, right);
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

function randomizedPartition(arr, left, right) {
    // Random pivot selection prevents worst-case on sorted data
    const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
    [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
    
    return partition(arr, left, right);
}

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;  // Smaller elements boundary
    
    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}

// Example:
const arr1 = [64, 34, 25, 12, 22, 11, 90];
quickSort(arr1);
console.log(arr1);  // [11, 12, 22, 25, 34, 64, 90]
```

**MergeSort - Divide and merge:**
```javascript
// MergeSort: O(n log n) guaranteed, O(n) space
// Not in-place, stable
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {  // <= ensures stability
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example:
const arr2 = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(arr2));  // [11, 12, 22, 25, 34, 64, 90]
```

**HeapSort - Selection sort with heap:**
```javascript
// HeapSort: O(n log n) guaranteed, O(1) extra space
// In-place, not stable
function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Example:
const arr3 = [64, 34, 25, 12, 22, 11, 90];
heapSort(arr3);
console.log(arr3);  // [11, 12, 22, 25, 34, 64, 90]
```
*Figyeld meg: QuickSort fastest average, MergeSort stable + guaranteed, HeapSort in-place + guaranteed.*

</div>

<div class="concept-section myths" data-filter="sorting">

<details>
<summary>🧯 <strong>Gyakori tévhitek / félreértések</strong></summary>

<div>

- **"QuickSort mindig O(n log n)"** → **Valójában**: O(n²) worst case sorted input-nál, randomized pivot kell
- **"MergeSort in-place"** → **Valójában**: O(n) extra space kell a merge-hez
- **"HeapSort stable"** → **Valójában**: Nem stabil, heap operations megváltoztatják equal elements sorrendjét
- **"Stability nem számít"** → **Valójában**: Multi-field sorting-nál (sort by name, then age) stability kritikus
- **"QuickSort O(log n) space"** → **Valójában**: O(log n) average, O(n) worst (recursion stack)

</div>

</details>

</div>

<div class="concept-section performance" data-filter="sorting performance">

<details>
<summary>🚀 <strong>Performance corner</strong></summary>

<div>

**Pivot Selection Impact:**
```javascript
// ❌ ROSSZ: Fixed pivot (last element) = O(n²) on sorted
function badQuickSort(arr, left, right) {
    const pivot = arr[right];  // Sorted input: O(n²)!
}

// ✅ JÓ: Randomized pivot = Expected O(n log n)
function goodQuickSort(arr, left, right) {
    const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
    [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
    const pivot = arr[right];  // O(n log n) expected
}

// Sorted array benchmark:
// Bad: 5000ms (O(n²))
// Good: 50ms (O(n log n))
```

**Small Array Optimization:**
```javascript
// Hybrid: QuickSort + Insertion Sort
const THRESHOLD = 10;

function hybridQuickSort(arr, left, right) {
    if (right - left < THRESHOLD) {
        insertionSort(arr, left, right);  // Fast for small arrays
        return;
    }
    // ... QuickSort logic
}
// 10-20% faster than pure QuickSort
```

**Cache Performance:**
```javascript
// QuickSort: ✅ Good cache locality (sequential partition)
// MergeSort: ❌ Poor (scattered merge access)
// HeapSort: ❌ Poor (heap jumps)

// Benchmark (1M elements):
// QuickSort: ~50ms
// MergeSort: ~80ms
// HeapSort: ~120ms
```

</div>

</details>

</div>

<div class="concept-section tools" data-filter="sorting">

<details>
<summary>🧰 <strong>Kapcsolódó API-k / eszközök</strong></summary>

<div>

**JavaScript Array.prototype.sort():**
```javascript
// Numeric sorting:
[10, 5, 40, 25].sort((a, b) => a - b);  // [5, 10, 25, 40]

// Stable since ES2019 (TimSort)
const data = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 30 }];
data.sort((a, b) => a.age - b.age);  // Alice/Bob order preserved
```

**Java Arrays.sort():**
```java
// Primitive arrays: Dual-Pivot QuickSort (not stable)
int[] arr = {5, 2, 8, 1};
Arrays.sort(arr);

// Object arrays: TimSort (stable)
Integer[] arr2 = {5, 2, 8, 1};
Arrays.sort(arr2);  // Stable
```

**Python sorted():**
```python
# TimSort (stable)
arr = [5, 2, 8, 1]
sorted(arr)  # [1, 2, 5, 8]

# Custom key:
data = [('Alice', 30), ('Bob', 25)]
sorted(data, key=lambda x: x[1])  // Sort by age
```

**Visualization:**
- VisuAlgo: https://visualgo.net/en/sorting

</div>

</details>

</div>

<div class="concept-section micro-learning" data-filter="sorting">

<details>
<summary>🎧 <strong>Mikrotanulási promptok</strong></summary>

<div>

**1) Mikor használj QuickSort helyett MergeSort-ot?**
<details>
<summary>Válasz</summary>

**Use MergeSort when**:
- ✅ Stability required (multi-field sorting)
- ✅ Guaranteed O(n log n) needed
- ✅ External sorting (disk-based)

**Use QuickSort when**:
- ✅ Average case performance (2-3x faster)
- ✅ In-place needed (O(log n) vs O(n))

</details>

**2) Miért O(n²) worst case a QuickSort?**
<details>
<summary>Válasz</summary>

**Worst case**: Sorted/reverse sorted + last pivot.

```javascript
[1, 2, 3, 4, 5]  // Sorted
pivot = 5  // Partition: [1,2,3,4] | [5]
// Unbalanced: O(n) depth × O(n) partition = O(n²)
```

**Solution**: Randomized pivot → Expected O(n log n).

</details>

**3) Mi az algoritmus stability?**
<details>
<summary>Válasz</summary>

**Stability**: Equal elements eredeti sorrendje megmarad.

```javascript
[{name:'Alice', age:30}, {name:'Bob', age:30}]
// Stable sort by age: Alice before Bob (original order) ✅
```

**Stable**: MergeSort, TimSort.  
**Unstable**: QuickSort, HeapSort.

</details>

**4) Hogyan működik a HeapSort?**
<details>
<summary>Válasz</summary>

1. **Build max heap**: O(n) heapify
2. **Extract max repeatedly**: O(n log n)
   - Swap root with last
   - Reduce heap size
   - Heapify root

**Use when**: Guaranteed O(n log n) + O(1) space.

</details>

**5) Mi a különbség in-place és out-of-place?**
<details>
<summary>Válasz</summary>

**In-place**: O(1) extra space.
- QuickSort O(log n) stack, HeapSort O(1)

**Out-of-place**: O(n) space.
- MergeSort O(n) temporary arrays

</details>

**6) Mitől függ a QuickSort partition quality?**
<details>
<summary>Válasz</summary>

**Good partition**: Even split (~n/2 each) → O(log n) depth.  
**Bad partition**: Skewed (n-1 vs 0) → O(n) depth.

**Pivot strategies**:
- Fixed: O(n²) on sorted ❌
- Random: O(n log n) expected ✅
- Median-of-three: Better partitions ✅✅

</details>

**7) Hogyan optimalizálod a MergeSort memory usage-t?**
<details>
<summary>Válasz</summary>

**Optimization**: Reuse temporary array (allocate once).

```javascript
let tempArray = new Array(n);  // Reuse

function optimizedMerge(arr, left, mid, right) {
    // Copy to temp
    for (let i = left; i <= right; i++) {
        tempArray[i] = arr[i];
    }
    // Merge from temp to arr (no allocations)
}
```

</details>

**8) Mikor használj Insertion Sort?**
<details>
<summary>Válasz</summary>

**Insertion Sort**:
- O(n²) time
- **Fast for small arrays** (< 10-50 elements)
- **Fast for nearly sorted** (O(n) best case)

**Hybrid approach**:
```javascript
if (right - left < 10) {
    insertionSort(arr, left, right);
} else {
    quickSort(arr, left, right);
}
```

10-20% faster than pure QuickSort.

</details>

</div>

</details>

</div>

---

### Top-K Elements with Heap {#top-k-heap}
            quickSort(arr, pivotIndex + 1, right);
        }
    }
    
    private static int randomizedPartition(int[] arr, int left, int right) {
        // Random pivot selection to avoid worst case
        Random random = new Random();
        int randomIndex = left + random.nextInt(right - left + 1);
        swap(arr, randomIndex, right);
        return partition(arr, left, right);
    }
    
    private static int partition(int[] arr, int left, int right) {
        int pivot = arr[right];
        int i = left - 1;
        
        for (int j = left; j < right; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, right);
        return i + 1;
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    // Hybrid Sort (Timsort-inspired)
    public static void hybridSort(int[] arr) {
        final int INSERTION_SORT_THRESHOLD = 32;
        
        if (arr.length <= INSERTION_SORT_THRESHOLD) {
            insertionSort(arr, 0, arr.length - 1);
        } else {
            mergeSort(arr, 0, arr.length - 1);
        }
    }
    
    private static void insertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int key = arr[i];
            int j = i - 1;
            
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = key;
        }
    }
    
    // Performance benchmark
    public static void benchmark() {
        int[] sizes = {1000, 10000, 100000};
        
        for (int size : sizes) {
            System.out.println("Array size: " + size);
            
            // Test with random data
            int[] randomData = generateRandomArray(size);
            long startTime, endTime;
            
            // Mergesort
            int[] mergeCopy = randomData.clone();
            startTime = System.nanoTime();
            mergeSort(mergeCopy);
            endTime = System.nanoTime();
            System.out.println("Mergesort: " + (endTime - startTime) / 1_000_000 + " ms");
            
            // Quicksort
            int[] quickCopy = randomData.clone();
            startTime = System.nanoTime();
            quickSort(quickCopy);
            endTime = System.nanoTime();
            System.out.println("Quicksort: " + (endTime - startTime) / 1_000_000 + " ms");
            
            // Arrays.sort (Dual-Pivot Quicksort)
            int[] javaSort = randomData.clone();
            startTime = System.nanoTime();
            Arrays.sort(javaSort);
            endTime = System.nanoTime();
            System.out.println("Arrays.sort: " + (endTime - startTime) / 1_000_000 + " ms\n");
        }
    }
    
    private static int[] generateRandomArray(int size) {
        Random random = new Random();
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(10000);
        }
        return arr;
    }
    
    // Teszt
    public static void main(String[] args) {
        int[] testArray = {64, 34, 25, 12, 22, 11, 90};
        
        int[] mergeTest = testArray.clone();
        mergeSort(mergeTest);
        System.out.println("Mergesort result: " + Arrays.toString(mergeTest));
        
        int[] quickTest = testArray.clone();
        quickSort(quickTest);
        System.out.println("Quicksort result: " + Arrays.toString(quickTest));
        
        // Performance benchmark
        benchmark();
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Mergesort Implementation
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    // Add remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// In-place Mergesort (memory efficient)
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    mergeSortInPlace(arr, left, mid);
    mergeSortInPlace(arr, mid + 1, right);
    mergeInPlace(arr, left, mid, right);
}

function mergeInPlace(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

// Quicksort Implementation
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = randomizedPartition(arr, left, right);
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

function randomizedPartition(arr, left, right) {
    // Random pivot to avoid worst case
    const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
    [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
    return partition(arr, left, right);
}

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;
    
    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}

// Iterative Quicksort (avoid stack overflow)
function quickSortIterative(arr) {
    const stack = [[0, arr.length - 1]];
    
    while (stack.length > 0) {
        const [left, right] = stack.pop();
        
        if (left < right) {
            const pivotIndex = partition(arr, left, right);
            
            // Push larger partition first (depth optimization)
            if (pivotIndex - left > right - pivotIndex) {
                stack.push([left, pivotIndex - 1]);
                stack.push([pivotIndex + 1, right]);
            } else {
                stack.push([pivotIndex + 1, right]);
                stack.push([left, pivotIndex - 1]);
            }
        }
    }
    
    return arr;
}

// Stable Quicksort
function stableQuickSort(arr, keyFn = x => x) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const pivotKey = keyFn(pivot);
    
    const less = [];
    const equal = [];
    const greater = [];
    
    for (const item of arr) {
        const itemKey = keyFn(item);
        if (itemKey < pivotKey) {
            less.push(item);
        } else if (itemKey > pivotKey) {
            greater.push(item);
        } else {
            equal.push(item);
        }
    }
    
    return [
        ...stableQuickSort(less, keyFn),
        ...equal,
        ...stableQuickSort(greater, keyFn)
    ];
}

// Performance comparison
function performanceTest() {
    const sizes = [1000, 10000, 50000];
    
    sizes.forEach(size => {
        console.log(`\nArray size: ${size}`);
        
        const randomArray = Array.from({length: size}, () => Math.floor(Math.random() * 10000));
        
        // Test Mergesort
        console.time('Mergesort');
        mergeSort([...randomArray]);
        console.timeEnd('Mergesort');
        
        // Test Quicksort
        console.time('Quicksort');
        quickSort([...randomArray]);
        console.timeEnd('Quicksort');
        
        // Test native sort
        console.time('Native sort');
        [...randomArray].sort((a, b) => a - b);
        console.timeEnd('Native sort');
    });
}

// Sort stability test
function stabilityTest() {
    const data = [
        {name: 'Alice', age: 25},
        {name: 'Bob', age: 25},
        {name: 'Charlie', age: 30},
        {name: 'David', age: 25}
    ];
    
    console.log('Original order:', data.map(p => p.name));
    
    // Stable sort by age
    const stableSorted = stableQuickSort([...data], person => person.age);
    console.log('Stable sort by age:', stableSorted.map(p => `${p.name}(${p.age})`));
}

// Teszt
const testArray = [64, 34, 25, 12, 22, 11, 90];

console.log('Original:', testArray);
console.log('Mergesort:', mergeSort([...testArray]));
console.log('Quicksort:', quickSort([...testArray]));

stabilityTest();
performanceTest();
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Generic sorting interfaces
interface SortOptions<T> {
    compareFn?: (a: T, b: T) => number;
    stable?: boolean;
}

type CompareFunction<T> = (a: T, b: T) => number;

// Mergesort Implementation
class MergeSort {
    static sort<T>(arr: T[], options: SortOptions<T> = {}): T[] {
        const { compareFn = (a, b) => Number(a) - Number(b) } = options;
        return this.mergeSort([...arr], compareFn);
    }
    
    private static mergeSort<T>(arr: T[], compareFn: CompareFunction<T>): T[] {
        if (arr.length <= 1) return arr;
        
        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid), compareFn);
        const right = this.mergeSort(arr.slice(mid), compareFn);
        
        return this.merge(left, right, compareFn);
    }
    
    private static merge<T>(left: T[], right: T[], compareFn: CompareFunction<T>): T[] {
        const result: T[] = [];
        let i = 0, j = 0;
        
        while (i < left.length && j < right.length) {
            if (compareFn(left[i], right[j]) <= 0) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }
        
        return result.concat(left.slice(i)).concat(right.slice(j));
    }
    
    // In-place version
    static sortInPlace<T>(arr: T[], options: SortOptions<T> = {}): void {
        const { compareFn = (a, b) => Number(a) - Number(b) } = options;
        this.mergeSortInPlace(arr, 0, arr.length - 1, compareFn);
    }
    
    private static mergeSortInPlace<T>(
        arr: T[], 
        left: number, 
        right: number, 
        compareFn: CompareFunction<T>
    ): void {
        if (left >= right) return;
        
        const mid = Math.floor((left + right) / 2);
        this.mergeSortInPlace(arr, left, mid, compareFn);
        this.mergeSortInPlace(arr, mid + 1, right, compareFn);
        this.mergeInPlace(arr, left, mid, right, compareFn);
    }
    
    private static mergeInPlace<T>(
        arr: T[], 
        left: number, 
        mid: number, 
        right: number, 
        compareFn: CompareFunction<T>
    ): void {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (compareFn(leftArr[i], rightArr[j]) <= 0) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
}

// Quicksort Implementation
class QuickSort {
    static sort<T>(arr: T[], options: SortOptions<T> = {}): T[] {
        const { compareFn = (a, b) => Number(a) - Number(b) } = options;
        const result = [...arr];
        this.quickSort(result, 0, result.length - 1, compareFn);
        return result;
    }
    
    private static quickSort<T>(
        arr: T[], 
        left: number, 
        right: number, 
        compareFn: CompareFunction<T>
    ): void {
        if (left < right) {
            const pivotIndex = this.randomizedPartition(arr, left, right, compareFn);
            this.quickSort(arr, left, pivotIndex - 1, compareFn);
            this.quickSort(arr, pivotIndex + 1, right, compareFn);
        }
    }
    
    private static randomizedPartition<T>(
        arr: T[], 
        left: number, 
        right: number, 
        compareFn: CompareFunction<T>
    ): number {
        const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
        [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
        return this.partition(arr, left, right, compareFn);
    }
    
    private static partition<T>(
        arr: T[], 
        left: number, 
        right: number, 
        compareFn: CompareFunction<T>
    ): number {
        const pivot = arr[right];
        let i = left - 1;
        
        for (let j = left; j < right; j++) {
            if (compareFn(arr[j], pivot) <= 0) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        
        [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
        return i + 1;
    }
    
    // Dual-pivot quicksort (Java 7+ style)
    static dualPivotSort<T>(arr: T[], compareFn: CompareFunction<T>): T[] {
        const result = [...arr];
        this.dualPivotQuickSort(result, 0, result.length - 1, compareFn);
        return result;
    }
    
    private static dualPivotQuickSort<T>(
        arr: T[], 
        left: number, 
        right: number, 
        compareFn: CompareFunction<T>
    ): void {
        if (left < right) {
            // Ensure arr[left] <= arr[right]
            if (compareFn(arr[left], arr[right]) > 0) {
                [arr[left], arr[right]] = [arr[right], arr[left]];
            }
            
            const [lt, gt] = this.dualPivotPartition(arr, left, right, compareFn);
            
            this.dualPivotQuickSort(arr, left, lt - 1, compareFn);
            this.dualPivotQuickSort(arr, lt + 1, gt - 1, compareFn);
            this.dualPivotQuickSort(arr, gt + 1, right, compareFn);
        }
    }
    
    private static dualPivotPartition<T>(
        arr: T[], 
        left: number, 
        right: number, 
        compareFn: CompareFunction<T>
    ): [number, number] {
        const pivot1 = arr[left];
        const pivot2 = arr[right];
        
        let lt = left + 1;
        let gt = right - 1;
        let i = left + 1;
        
        while (i <= gt) {
            if (compareFn(arr[i], pivot1) < 0) {
                [arr[i], arr[lt]] = [arr[lt], arr[i]];
                lt++;
            } else if (compareFn(arr[i], pivot2) > 0) {
                [arr[i], arr[gt]] = [arr[gt], arr[i]];
                gt--;
                i--;
            }
            i++;
        }
        
        [arr[left], arr[lt - 1]] = [arr[lt - 1], arr[left]];
        [arr[right], arr[gt + 1]] = [arr[gt + 1], arr[right]];
        
        return [lt - 1, gt + 1];
    }
}

// Performance testing
class SortBenchmark {
    static async benchmark(): Promise<void> {
        const sizes = [1000, 10000, 100000];
        
        for (const size of sizes) {
            console.log(`\n=== Array size: ${size} ===`);
            
            const randomArray = Array.from(
                { length: size }, 
                () => Math.floor(Math.random() * 10000)
            );
            
            await this.testAlgorithm('Mergesort', () => 
                MergeSort.sort(randomArray)
            );
            
            await this.testAlgorithm('Quicksort', () => 
                QuickSort.sort(randomArray)
            );
            
            await this.testAlgorithm('Dual-pivot Quicksort', () => 
                QuickSort.dualPivotSort(randomArray, (a, b) => a - b)
            );
            
            await this.testAlgorithm('Native sort', () => 
                [...randomArray].sort((a, b) => a - b)
            );
        }
    }
    
    private static async testAlgorithm(name: string, sortFn: () => void): Promise<void> {
        const start = performance.now();
        sortFn();
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)} ms`);
    }
}

// Usage examples
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
    { name: 'David', age: 25 }
];

// Sort by age
const sortedByAge = MergeSort.sort(people, {
    compareFn: (a, b) => a.age - b.age
});

console.log('Sorted by age:', sortedByAge);

// Sort numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Mergesort:', MergeSort.sort(numbers));
console.log('Quicksort:', QuickSort.sort(numbers));

// Run benchmark
SortBenchmark.benchmark();
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Mergesort**: felesleges másolás minden merge-nél, memory leak temporary arrays-szel
- **Quicksort**: worst-case nem kezelése (már rendezett tömb), stack overflow deep recursion-nél
- **Pivot selection**: mindig ugyanaz a pivot választás (first/last) rossz performance-ot okozhat
- **Stability**: Quicksort alapból nem stabil, de Mergesort igen
- **Memory usage**: Mergesort O(n) extra memory, Quicksort O(log n) average case

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**

**Mergesort:**
- **Stable sorting**: amikor az eredeti sorrend megőrzése fontos
- **External sorting**: nagy adathalmazok rendezése memórián kívül
- **Linked lists**: O(1) space komplexitású rendezés linked list-eknél
- **Parallel processing**: könnyű párhuzamosítás

**Quicksort:**
- **In-place sorting**: minimális extra memória használat
- **Cache-friendly**: jobb locality of reference
- **Average case optimum**: legtöbb valós adaton gyors
- **Embedded systems**: korlátozott memória környezetben

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor válasszunk Mergesort-ot Quicksort helyett?
<details><summary>Válasz mutatása</summary>
Ha stabilitásra van szükség, guaranteed O(n log n) performance kell, vagy external sorting-ra használjuk.
</details>

2. Hogyan javítható a Quicksort worst-case performance?
<details><summary>Válasz mutatása</summary>
Random pivot selection, median-of-three, dual-pivot, vagy introsort (hibrid Quicksort + Heapsort).
</details>

3. Miért gyorsabb általában a Quicksort mint a Mergesort?
<details><summary>Válasz mutatása</summary>
In-place működés (jobb cache locality), kevesebb másolás, konstans faktor kisebb a partition műveletnél.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Implement merge sort and analyze its time complexity"** → Divide and conquer explanation
2. **"Why might quicksort be faster than mergesort in practice?"** → Cache locality and space complexity
3. **"How would you make quicksort stable?"** → Additional indexing or key-value pairs
4. **"Which sorting algorithm would you choose for sorting 1TB of data?"** → External mergesort discussion
5. **"Explain the difference between comparison-based and non-comparison sorting"** → Lead to counting sort, radix sort

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Heapsort` · `Introsort` · `Timsort` · `Counting Sort` · `Radix Sort` · `External Sorting`

</div>

<div class="tags">
  <span class="tag">sorting</span>
  <span class="tag">mergesort</span>
  <span class="tag">quicksort</span>
  <span class="tag">divide-conquer</span>
  <span class="tag">comparison</span>
  <span class="tag">junior</span>
</div>

### Top-K Elements with Heap {#top-k-heap}
<!-- tags: heap, priority-queue, top-k, selection, data-structures, junior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*A Top-K elemek keresése olyan, mint egy verseny eredményhirdetése: nem az összes versenyzőt kell rangsorolni, csak a legjobb K-t. A heap adatszerkezet segítségével hatékonyan tartunk egy "dinamikus legjobb K" listát, ahol minden új elem hozzáadásakor automatikusan frissül a toplista. Min-heap használunk K legnagyobb elemhez, max-heap K legkisebb elemhez.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(n log k) idő, O(k) tér
- **Average case**: O(n log k) idő, O(k) tér
- **Worst case**: O(n log k) idő, O(k) tér
- **Space**: O(k) heap méret (vs O(n log n) teljes rendezés)

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**Top-K Largest Elements using Min-Heap**
```pseudo
FUNCTION TopKLargest(A, k)
  minHeap ← NEW MIN_HEAP
  
  FOR element IN A DO
    IF SIZE(minHeap) < k THEN
      PUSH(minHeap, element)
    ELSE IF element > PEEK(minHeap) THEN
      POP(minHeap)      // Remove smallest from heap
      PUSH(minHeap, element)
    END IF
  END FOR
  
  result ← EMPTY_LIST
  WHILE NOT EMPTY(minHeap) DO
    ADD(result, POP(minHeap))
  END WHILE
  
  RETURN result
END FUNCTION
```

**Top-K Frequent Elements**
```pseudo
FUNCTION TopKFrequent(A, k)
  frequencyMap ← EMPTY_MAP
  
  // Count frequencies
  FOR element IN A DO
    frequencyMap[element] ← frequencyMap[element] + 1
  END FOR
  
  // Use min-heap with size k
  minHeap ← NEW MIN_HEAP(compareByFrequency)
  
  FOR [element, frequency] IN frequencyMap DO
    IF SIZE(minHeap) < k THEN
      PUSH(minHeap, [element, frequency])
    ELSE IF frequency > PEEK(minHeap).frequency THEN
      POP(minHeap)
      PUSH(minHeap, [element, frequency])
    END IF
  END FOR
  
  RETURN getAllElements(minHeap)
END FUNCTION
```

**Streaming Top-K (for real-time data)**
```pseudo
CLASS StreamingTopK
  CONSTRUCTOR(k)
    this.k ← k
    this.minHeap ← NEW MIN_HEAP
  END CONSTRUCTOR
  
  PROCEDURE Add(element)
    IF SIZE(minHeap) < k THEN
      PUSH(minHeap, element)
    ELSE IF element > PEEK(minHeap) THEN
      POP(minHeap)
      PUSH(minHeap, element)
    END IF
  END PROCEDURE
  
  FUNCTION GetTopK()
    RETURN getAllElements(minHeap)
  END FUNCTION
END CLASS
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class TopKHeap {
    
    // Top K Largest Elements
    public static int[] findKLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            result[i] = minHeap.poll();
        }
        
        return result;
    }
    
    // Top K Frequent Elements
    public static int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        
        // Count frequencies
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }
        
        // Min heap ordered by frequency
        PriorityQueue<Map.Entry<Integer, Integer>> minHeap = 
            new PriorityQueue<>((a, b) -> a.getValue() - b.getValue());
        
        for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
            minHeap.offer(entry);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            result[i] = minHeap.poll().getKey();
        }
        
        return result;
    }
    
    // K Closest Points to Origin
    public static int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> {
            long dist1 = (long)a[0] * a[0] + (long)a[1] * a[1];
            long dist2 = (long)b[0] * b[0] + (long)b[1] * b[1];
            return Long.compare(dist2, dist1); // Max heap
        });
        
        for (int[] point : points) {
            maxHeap.offer(point);
            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }
        
        int[][] result = new int[k][2];
        for (int i = 0; i < k; i++) {
            result[i] = maxHeap.poll();
        }
        
        return result;
    }
    
    // Streaming Top-K Class
    static class StreamingTopK {
        private final int k;
        private final PriorityQueue<Integer> minHeap;
        
        public StreamingTopK(int k) {
            this.k = k;
            this.minHeap = new PriorityQueue<>();
        }
        
        public void add(int num) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        public List<Integer> getTopK() {
            List<Integer> result = new ArrayList<>(minHeap);
            result.sort(Collections.reverseOrder());
            return result;
        }
        
        public int getKthLargest() {
            return minHeap.peek();
        }
    }
    
    // Top K Frequent Words
    public static List<String> topKFrequentWords(String[] words, int k) {
        Map<String, Integer> frequencyMap = new HashMap<>();
        
        for (String word : words) {
            frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
        }
        
        // Min heap with custom comparator
        PriorityQueue<String> minHeap = new PriorityQueue<>((a, b) -> {
            int freqCompare = frequencyMap.get(a) - frequencyMap.get(b);
            if (freqCompare == 0) {
                return b.compareTo(a); // Reverse lexicographical for min heap
            }
            return freqCompare;
        });
        
        for (String word : frequencyMap.keySet()) {
            minHeap.offer(word);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        List<String> result = new ArrayList<>();
        while (!minHeap.isEmpty()) {
            result.add(0, minHeap.poll()); // Add to front for correct order
        }
        
        return result;
    }
    
    // Find K Pairs with Smallest Sums
    public static List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> 
            (b[0] + b[1]) - (a[0] + a[1])
        );
        
        for (int i = 0; i < Math.min(nums1.length, k); i++) {
            for (int j = 0; j < Math.min(nums2.length, k); j++) {
                int[] pair = {nums1[i], nums2[j]};
                
                if (maxHeap.size() < k) {
                    maxHeap.offer(pair);
                } else if (nums1[i] + nums2[j] < maxHeap.peek()[0] + maxHeap.peek()[1]) {
                    maxHeap.poll();
                    maxHeap.offer(pair);
                }
            }
        }
        
        List<List<Integer>> result = new ArrayList<>();
        while (!maxHeap.isEmpty()) {
            int[] pair = maxHeap.poll();
            result.add(Arrays.asList(pair[0], pair[1]));
        }
        
        return result;
    }
    
    // Teszt
    public static void main(String[] args) {
        // Test Top K Largest
        int[] nums = {3, 2, 1, 5, 6, 4};
        System.out.println("Top 2 largest: " + Arrays.toString(findKLargest(nums, 2))); // [6, 5]
        
        // Test Top K Frequent
        int[] freqNums = {1, 1, 1, 2, 2, 3};
        System.out.println("Top 2 frequent: " + Arrays.toString(topKFrequent(freqNums, 2))); // [1, 2]
        
        // Test Streaming
        StreamingTopK streaming = new StreamingTopK(3);
        int[] stream = {4, 5, 8, 2, 3, 5, 10, 9, 4};
        for (int num : stream) {
            streaming.add(num);
            System.out.println("After adding " + num + ": " + streaming.getTopK());
        }
        
        // Test K Closest Points
        int[][] points = { {1, 1}, {2, 2}, {3, 3} };
        int[][] closest = kClosest(points, 2);
        System.out.println("2 closest points: " + Arrays.deepToString(closest));
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Priority Queue implementation for JavaScript
class PriorityQueue {
    constructor(compareFn = (a, b) => a - b) {
        this.items = [];
        this.compare = compareFn;
    }
    
    enqueue(item) {
        this.items.push(item);
        this.heapifyUp();
    }
    
    dequeue() {
        if (this.items.length === 0) return null;
        
        const item = this.items[0];
        const lastItem = this.items.pop();
        
        if (this.items.length > 0) {
            this.items[0] = lastItem;
            this.heapifyDown();
        }
        
        return item;
    }
    
    peek() {
        return this.items[0] || null;
    }
    
    size() {
        return this.items.length;
    }
    
    heapifyUp() {
        let index = this.items.length - 1;
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.compare(this.items[index], this.items[parentIndex]) >= 0) {
                break;
            }
            
            [this.items[index], this.items[parentIndex]] = 
            [this.items[parentIndex], this.items[index]];
            
            index = parentIndex;
        }
    }
    
    heapifyDown() {
        let index = 0;
        
        while (this.leftChild(index) !== null) {
            const leftChildIndex = this.leftChildIndex(index);
            const rightChildIndex = this.rightChildIndex(index);
            
            let smallestIndex = leftChildIndex;
            
            if (rightChildIndex !== null && 
                this.compare(this.items[rightChildIndex], this.items[leftChildIndex]) < 0) {
                smallestIndex = rightChildIndex;
            }
            
            if (this.compare(this.items[index], this.items[smallestIndex]) <= 0) {
                break;
            }
            
            [this.items[index], this.items[smallestIndex]] = 
            [this.items[smallestIndex], this.items[index]];
            
            index = smallestIndex;
        }
    }
    
    leftChildIndex(index) {
        return 2 * index + 1 < this.items.length ? 2 * index + 1 : null;
    }
    
    rightChildIndex(index) {
        return 2 * index + 2 < this.items.length ? 2 * index + 2 : null;
    }
    
    leftChild(index) {
        const idx = this.leftChildIndex(index);
        return idx !== null ? this.items[idx] : null;
    }
}

// Top K Largest Elements
function findKLargest(nums, k) {
    const minHeap = new PriorityQueue((a, b) => a - b);
    
    for (const num of nums) {
        minHeap.enqueue(num);
        if (minHeap.size() > k) {
            minHeap.dequeue();
        }
    }
    
    const result = [];
    while (minHeap.size() > 0) {
        result.unshift(minHeap.dequeue()); // Add to front for descending order
    }
    
    return result;
}

// Top K Frequent Elements
function topKFrequent(nums, k) {
    const frequencyMap = new Map();
    
    // Count frequencies
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // Min heap ordered by frequency
    const minHeap = new PriorityQueue((a, b) => a[1] - b[1]);
    
    for (const [num, freq] of frequencyMap) {
        minHeap.enqueue([num, freq]);
        if (minHeap.size() > k) {
            minHeap.dequeue();
        }
    }
    
    const result = [];
    while (minHeap.size() > 0) {
        result.unshift(minHeap.dequeue()[0]);
    }
    
    return result;
}

// Streaming Top-K Class
class StreamingTopK {
    constructor(k) {
        this.k = k;
        this.minHeap = new PriorityQueue((a, b) => a - b);
    }
    
    add(num) {
        this.minHeap.enqueue(num);
        if (this.minHeap.size() > this.k) {
            this.minHeap.dequeue();
        }
    }
    
    getTopK() {
        return [...this.minHeap.items].sort((a, b) => b - a);
    }
    
    getKthLargest() {
        return this.minHeap.peek();
    }
}

// K Closest Points to Origin
function kClosest(points, k) {
    const distance = ([x, y]) => x * x + y * y;
    
    // Max heap for k closest points
    const maxHeap = new PriorityQueue((a, b) => distance(b) - distance(a));
    
    for (const point of points) {
        maxHeap.enqueue(point);
        if (maxHeap.size() > k) {
            maxHeap.dequeue();
        }
    }
    
    return maxHeap.items;
}

// Top K Frequent Words
function topKFrequentWords(words, k) {
    const frequencyMap = new Map();
    
    for (const word of words) {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    }
    
    // Min heap with custom comparator
    const minHeap = new PriorityQueue((a, b) => {
        if (a[1] !== b[1]) {
            return a[1] - b[1]; // Compare by frequency
        }
        return b[0].localeCompare(a[0]); // Reverse lexicographical order
    });
    
    for (const [word, freq] of frequencyMap) {
        minHeap.enqueue([word, freq]);
        if (minHeap.size() > k) {
            minHeap.dequeue();
        }
    }
    
    const result = [];
    while (minHeap.size() > 0) {
        result.unshift(minHeap.dequeue()[0]);
    }
    
    return result;
}

// Merge K Sorted Lists (using heap)
function mergeKLists(lists) {
    const minHeap = new PriorityQueue((a, b) => a.val - b.val);
    
    // Add first node of each list
    for (const list of lists) {
        if (list) {
            minHeap.enqueue(list);
        }
    }
    
    const dummy = { next: null };
    let current = dummy;
    
    while (minHeap.size() > 0) {
        const node = minHeap.dequeue();
        current.next = node;
        current = current.next;
        
        if (node.next) {
            minHeap.enqueue(node.next);
        }
    }
    
    return dummy.next;
}

// Find Median from Data Stream
class MedianFinder {
    constructor() {
        this.maxHeap = new PriorityQueue((a, b) => b - a); // Left half
        this.minHeap = new PriorityQueue((a, b) => a - b); // Right half
    }
    
    addNum(num) {
        // Add to max heap first
        this.maxHeap.enqueue(num);
        
        // Balance: move largest from max heap to min heap
        if (this.maxHeap.size() > 0) {
            this.minHeap.enqueue(this.maxHeap.dequeue());
        }
        
        // Ensure max heap has equal or one more element
        if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.enqueue(this.minHeap.dequeue());
        }
    }
    
    findMedian() {
        if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.peek();
        }
        
        return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    }
}

// Teszt
console.log("Top 3 largest:", findKLargest([3, 2, 1, 5, 6, 4], 3)); // [6, 5, 4]
console.log("Top 2 frequent:", topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]

const streaming = new StreamingTopK(3);
[4, 5, 8, 2, 3, 5, 10, 9, 4].forEach(num => {
    streaming.add(num);
    console.log(`After adding ${num}:`, streaming.getTopK());
});

const points = [[1, 1], [2, 2], [3, 3], [0, 1]];
console.log("2 closest points:", kClosest(points, 2));

const words = ["i", "love", "leetcode", "i", "love", "coding"];
console.log("Top 2 frequent words:", topKFrequentWords(words, 2)); // ["i", "love"]
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Generic Priority Queue implementation
class PriorityQueue<T> {
    private items: T[] = [];
    
    constructor(private compareFn: (a: T, b: T) => number) {}
    
    enqueue(item: T): void {
        this.items.push(item);
        this.heapifyUp();
    }
    
    dequeue(): T | null {
        if (this.items.length === 0) return null;
        
        const item = this.items[0];
        const lastItem = this.items.pop()!;
        
        if (this.items.length > 0) {
            this.items[0] = lastItem;
            this.heapifyDown();
        }
        
        return item;
    }
    
    peek(): T | null {
        return this.items[0] || null;
    }
    
    size(): number {
        return this.items.length;
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    toArray(): T[] {
        return [...this.items];
    }
    
    private heapifyUp(): void {
        let index = this.items.length - 1;
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.compareFn(this.items[index], this.items[parentIndex]) >= 0) {
                break;
            }
            
            [this.items[index], this.items[parentIndex]] = 
            [this.items[parentIndex], this.items[index]];
            
            index = parentIndex;
        }
    }
    
    private heapifyDown(): void {
        let index = 0;
        
        while (this.hasLeftChild(index)) {
            let smallestIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && 
                this.compareFn(this.getRightChild(index), this.getLeftChild(index)) < 0) {
                smallestIndex = this.getRightChildIndex(index);
            }
            
            if (this.compareFn(this.items[index], this.items[smallestIndex]) <= 0) {
                break;
            }
            
            [this.items[index], this.items[smallestIndex]] = 
            [this.items[smallestIndex], this.items[index]];
            
            index = smallestIndex;
        }
    }
    
    private getLeftChildIndex(index: number): number {
        return 2 * index + 1;
    }
    
    private getRightChildIndex(index: number): number {
        return 2 * index + 2;
    }
    
    private hasLeftChild(index: number): boolean {
        return this.getLeftChildIndex(index) < this.items.length;
    }
    
    private hasRightChild(index: number): boolean {
        return this.getRightChildIndex(index) < this.items.length;
    }
    
    private getLeftChild(index: number): T {
        return this.items[this.getLeftChildIndex(index)];
    }
    
    private getRightChild(index: number): T {
        return this.items[this.getRightChildIndex(index)];
    }
}

// Top K Elements utility class
class TopKElements {
    // Find K largest elements
    static findKLargest(nums: number[], k: number): number[] {
        const minHeap = new PriorityQueue<number>((a, b) => a - b);
        
        for (const num of nums) {
            minHeap.enqueue(num);
            if (minHeap.size() > k) {
                minHeap.dequeue();
            }
        }
        
        const result: number[] = [];
        while (!minHeap.isEmpty()) {
            result.unshift(minHeap.dequeue()!);
        }
        
        return result;
    }
    
    // Top K frequent elements
    static topKFrequent(nums: number[], k: number): number[] {
        const frequencyMap = new Map<number, number>();
        
        for (const num of nums) {
            frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        }
        
        const minHeap = new PriorityQueue<[number, number]>((a, b) => a[1] - b[1]);
        
        for (const [num, freq] of frequencyMap) {
            minHeap.enqueue([num, freq]);
            if (minHeap.size() > k) {
                minHeap.dequeue();
            }
        }
        
        const result: number[] = [];
        while (!minHeap.isEmpty()) {
            result.unshift(minHeap.dequeue()![0]);
        }
        
        return result;
    }
    
    // K closest points to origin
    static kClosest(points: number[][], k: number): number[][] {
        const distance = ([x, y]: number[]): number => x * x + y * y;
        
        const maxHeap = new PriorityQueue<number[]>((a, b) => distance(b) - distance(a));
        
        for (const point of points) {
            maxHeap.enqueue(point);
            if (maxHeap.size() > k) {
                maxHeap.dequeue();
            }
        }
        
        return maxHeap.toArray();
    }
}

// Streaming Top-K with generics
class StreamingTopK<T> {
    private readonly minHeap: PriorityQueue<T>;
    
    constructor(
        private readonly k: number,
        private readonly compareFn: (a: T, b: T) => number = (a, b) => Number(a) - Number(b)
    ) {
        this.minHeap = new PriorityQueue<T>(this.compareFn);
    }
    
    add(item: T): void {
        this.minHeap.enqueue(item);
        if (this.minHeap.size() > this.k) {
            this.minHeap.dequeue();
        }
    }
    
    getTopK(): T[] {
        return this.minHeap.toArray().sort((a, b) => -this.compareFn(a, b));
    }
    
    getKthLargest(): T | null {
        return this.minHeap.peek();
    }
    
    size(): number {
        return this.minHeap.size();
    }
}

// Advanced: Top K with custom objects
interface ScoredItem<T> {
    item: T;
    score: number;
}

class TopKScored<T> {
    private readonly minHeap: PriorityQueue<ScoredItem<T>>;
    
    constructor(private readonly k: number) {
        this.minHeap = new PriorityQueue<ScoredItem<T>>((a, b) => a.score - b.score);
    }
    
    add(item: T, score: number): void {
        const scoredItem: ScoredItem<T> = { item, score };
        
        this.minHeap.enqueue(scoredItem);
        if (this.minHeap.size() > this.k) {
            this.minHeap.dequeue();
        }
    }
    
    getTopK(): T[] {
        return this.minHeap.toArray()
            .sort((a, b) => b.score - a.score)
            .map(scoredItem => scoredItem.item);
    }
    
    getTopKWithScores(): ScoredItem<T>[] {
        return this.minHeap.toArray().sort((a, b) => b.score - a.score);
    }
}

// Find Median from Data Stream
class MedianFinder {
    private readonly maxHeap: PriorityQueue<number>; // Lower half
    private readonly minHeap: PriorityQueue<number>; // Upper half
    
    constructor() {
        this.maxHeap = new PriorityQueue<number>((a, b) => b - a);
        this.minHeap = new PriorityQueue<number>((a, b) => a - b);
    }
    
    addNum(num: number): void {
        // Add to max heap first
        this.maxHeap.enqueue(num);
        
        // Move largest from max heap to min heap
        if (!this.maxHeap.isEmpty()) {
            this.minHeap.enqueue(this.maxHeap.dequeue()!);
        }
        
        // Balance: ensure max heap has equal or one more element
        if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.enqueue(this.minHeap.dequeue()!);
        }
    }
    
    findMedian(): number {
        if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.peek()!;
        }
        
        return (this.maxHeap.peek()! + this.minHeap.peek()!) / 2;
    }
}

// Usage examples
const numbers: number[] = [3, 2, 1, 5, 6, 4];
console.log("Top 3 largest:", TopKElements.findKLargest(numbers, 3)); // [6, 5, 4]

const frequencies: number[] = [1, 1, 1, 2, 2, 3];
console.log("Top 2 frequent:", TopKElements.topKFrequent(frequencies, 2)); // [1, 2]

// Streaming example
const streaming = new StreamingTopK<number>(3);
[4, 5, 8, 2, 3, 5, 10, 9, 4].forEach(num => {
    streaming.add(num);
    console.log(`After adding ${num}:`, streaming.getTopK());
});

// Custom objects example
interface Student {
    name: string;
    id: number;
}

const topStudents = new TopKScored<Student>(3);
topStudents.add({ name: "Alice", id: 1 }, 95);
topStudents.add({ name: "Bob", id: 2 }, 87);
topStudents.add({ name: "Charlie", id: 3 }, 92);
topStudents.add({ name: "David", id: 4 }, 98);

console.log("Top 3 students:", topStudents.getTopK());
console.log("Top 3 with scores:", topStudents.getTopKWithScores());

// Median finder
const medianFinder = new MedianFinder();
[1, 2, 3, 4, 5].forEach(num => {
    medianFinder.addNum(num);
    console.log(`After adding ${num}, median:`, medianFinder.findMedian());
});
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Min vs Max heap**: K legnagyobb elemhez min-heap kell, K legkisebbhez max-heap
- **Heap size management**: elfelejteni a heap méretét k-ra korlátozni
- **Custom comparator**: helytelen összehasonlító függvény írása komplex objektumokhoz
- **Result order**: heap nem garantál sorrendet, külön rendezés szükséges
- **Memory efficiency**: feleslegesen nagy heap használata nagy adathalmazoknál

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Real-time analytics**: top trending topics, hot products
- **Recommendation systems**: top-rated items, most viewed content
- **Monitoring systems**: highest CPU usage, most frequent errors
- **Game leaderboards**: top players, high scores
- **Search engines**: most relevant results, popular queries

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért használunk min-heap-et K legnagyobb elem keresésére?
<details><summary>Válasz mutatása</summary>
A min-heap tetején mindig a legkisebb elem van. Ha a heap mérete > K, akkor a legkisebb elemet töröljük, így a maradék K elem a legnagyobbak.
</details>

2. Mi az előnye a heap-based top-K-nak a teljes rendezés helyett?
<details><summary>Válasz mutatása</summary>
O(n log k) vs O(n log n) időkomplexitás, O(k) vs O(n) memória. Nagy n és kis k esetén jelentős javulás.
</details>

3. Hogyan implementálnánk streaming top-K-t memória-hatékonyan?
<details><summary>Válasz mutatása</summary>
Fix méretű heap fenntartása, új elemek hozzáadása csak akkor, ha jobbak a legrosszabb jelenlegi elemnél.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Find the Kth Largest Element in an Array"** → Heap vs quickselect trade-offs
2. **"Top K Frequent Elements"** → Frequency counting + heap combination
3. **"K Closest Points to Origin"** → Distance calculation + max heap approach
4. **"Find Median from Data Stream"** → Two heaps technique, balance maintenance
5. **"Merge k Sorted Lists"** → Min heap for efficient merging

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Quickselect` · `Bucket Sort` · `Priority Queue` · `Binary Search` · `Two Heaps`

</div>

<div class="tags">
  <span class="tag">heap</span>
  <span class="tag">priority-queue</span>
  <span class="tag">top-k</span>
  <span class="tag">selection</span>
  <span class="tag">data-structures</span>
  <span class="tag">junior</span>
</div>

### Union-Find (Disjoint Set Union) {#union-find}
<!-- tags: union-find, disjoint-set, path-compression, union-by-rank, graphs, connectivity, medior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*Az Union-Find olyan, mint egy társasági esemény csoportkezelése: az emberek kezdetben különálló csoportokban vannak, de idővel egyesülhetnek nagyobb csoportokká. Gyorsan meg tudjuk mondani, hogy két ember ugyanabban a csoportban van-e, és hatékonyan tudunk csoportokat egyesíteni. Path compression és union by rank optimalizációkkal szinte konstans időben működik.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(α(n)) amortized per operation (α = inverse Ackermann)
- **Average case**: O(α(n)) amortized per operation
- **Worst case**: O(α(n)) amortized per operation (gyakorlatban ~konstans)
- **Space**: O(n) parent és rank tömbök

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```pseudo
CLASS UnionFind
  CONSTRUCTOR(n)
    parent ← [0, 1, 2, ..., n−1]  // Everyone is their own parent
    rank ← [0, 0, 0, ..., 0]      // All trees have height 0
    count ← n                      // Number of components
  END CONSTRUCTOR
  
  FUNCTION Find(x)
    IF parent[x] ≠ x THEN
      parent[x] ← Find(parent[x])  // Path compression
    END IF
    RETURN parent[x]
  END FUNCTION
  
  FUNCTION Union(x, y)
    rootX ← Find(x)
    rootY ← Find(y)
    
    IF rootX = rootY THEN
      RETURN false  // Already in same set
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
    
    count ← count − 1
    RETURN true
  END FUNCTION
  
  FUNCTION Connected(x, y)
    RETURN Find(x) = Find(y)
  END FUNCTION
  
  FUNCTION GetCount()
    RETURN count  // Number of disjoint components
  END FUNCTION
END CLASS
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class UnionFind {
    private int[] parent;
    private int[] rank;
    private int count;
    
    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        count = n;
        
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }
    
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) {
            return false; // Already connected
        }
        
        // Union by rank
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        
        count--;
        return true;
    }
    
    public boolean connected(int x, int y) {
        return find(x) == find(y);
    }
    
    public int getCount() {
        return count;
    }
    
    // Get all components
    public Map<Integer, List<Integer>> getComponents() {
        Map<Integer, List<Integer>> components = new HashMap<>();
        
        for (int i = 0; i < parent.length; i++) {
            int root = find(i);
            components.computeIfAbsent(root, k -> new ArrayList<>()).add(i);
        }
        
        return components;
    }
    
    // Number of Islands using Union-Find
    public static int numIslands(char[][] grid) {
        if (grid.length == 0) return 0;
        
        int rows = grid.length;
        int cols = grid[0].length;
        UnionFind uf = new UnionFind(rows * cols);
        int waterCount = 0;
        
        int[][] directions = { {0, 1}, {1, 0}, {0, -1}, {-1, 0} };
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '0') {
                    waterCount++;
                    continue;
                }
                
                int currentId = i * cols + j;
                
                // Check all 4 directions
                for (int[] dir : directions) {
                    int ni = i + dir[0];
                    int nj = j + dir[1];
                    
                    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj] == '1') {
                        int neighborId = ni * cols + nj;
                        uf.union(currentId, neighborId);
                    }
                }
            }
        }
        
        return uf.getCount() - waterCount;
    }
    
    // Graph Valid Tree
    public static boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) return false; // Tree must have n-1 edges
        
        UnionFind uf = new UnionFind(n);
        
        for (int[] edge : edges) {
            if (!uf.union(edge[0], edge[1])) {
                return false; // Cycle detected
            }
        }
        
        return uf.getCount() == 1; // Should be one connected component
    }
    
    // Accounts Merge
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
        
        // Union emails in same account
        for (List<String> account : accounts) {
            for (int i = 2; i < account.size(); i++) {
                uf.union(emailToId.get(account.get(1)), emailToId.get(account.get(i)));
            }
        }
        
        // Group emails by root
        Map<Integer, List<String>> groups = new HashMap<>();
        for (String email : emailToId.keySet()) {
            int root = uf.find(emailToId.get(email));
            groups.computeIfAbsent(root, k -> new ArrayList<>()).add(email);
        }
        
        List<List<String>> result = new ArrayList<>();
        for (List<String> emails : groups.values()) {
            Collections.sort(emails);
            List<String> account = new ArrayList<>();
            account.add(emailToName.get(emails.get(0)));
            account.addAll(emails);
            result.add(account);
        }
        
        return result;
    }
    
    // Teszt
    public static void main(String[] args) {
        UnionFind uf = new UnionFind(5);
        
        System.out.println("Initial components: " + uf.getCount()); // 5
        
        uf.union(0, 1);
        uf.union(2, 3);
        System.out.println("After unions: " + uf.getCount()); // 3
        
        System.out.println("0 and 1 connected: " + uf.connected(0, 1)); // true
        System.out.println("1 and 2 connected: " + uf.connected(1, 2)); // false
        
        char[][] grid = {
            {'1','1','1','1','0'},
            {'1','1','0','1','0'},
            {'1','1','0','0','0'},
            {'0','0','0','0','0'}
        };
        System.out.println("Number of islands: " + numIslands(grid)); // 1
        
        int[][] edges = { {0,1},{0,2},{0,3},{1,4} };
        System.out.println("Valid tree: " + validTree(5, edges)); // true
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.count = n;
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
        
        if (rootX === rootY) {
            return false; // Already connected
        }
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        this.count--;
        return true;
    }
    
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
    
    getCount() {
        return this.count;
    }
    
    getComponents() {
        const components = new Map();
        
        for (let i = 0; i < this.parent.length; i++) {
            const root = this.find(i);
            if (!components.has(root)) {
                components.set(root, []);
            }
            components.get(root).push(i);
        }
        
        return components;
    }
}

// Surrounded Regions
function solve(board) {
    if (board.length === 0) return;
    
    const rows = board.length;
    const cols = board[0].length;
    const uf = new UnionFind(rows * cols + 1); // +1 for border sentinel
    const borderNode = rows * cols;
    
    const getIndex = (i, j) => i * cols + j;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    // Connect border 'O's to border sentinel
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === 'O') {
                const idx = getIndex(i, j);
                
                // If on border, connect to sentinel
                if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
                    uf.union(idx, borderNode);
                }
                
                // Connect to adjacent 'O's
                for (const [di, dj] of directions) {
                    const ni = i + di;
                    const nj = j + dj;
                    
                    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && board[ni][nj] === 'O') {
                        uf.union(idx, getIndex(ni, nj));
                    }
                }
            }
        }
    }
    
    // Flip 'O's not connected to border
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === 'O' && !uf.connected(getIndex(i, j), borderNode)) {
                board[i][j] = 'X';
            }
        }
    }
}

// Friend Circles
function findCircleNum(isConnected) {
    const n = isConnected.length;
    const uf = new UnionFind(n);
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (isConnected[i][j] === 1) {
                uf.union(i, j);
            }
        }
    }
    
    return uf.getCount();
}

// Redundant Connection
function findRedundantConnection(edges) {
    const uf = new UnionFind(edges.length + 1);
    
    for (const [u, v] of edges) {
        if (!uf.union(u, v)) {
            return [u, v]; // This edge creates a cycle
        }
    }
    
    return [];
}

// Most Stones Removed with Same Row or Column
function removeStones(stones) {
    const uf = new UnionFind(20000); // Max coordinate value
    
    for (const [x, y] of stones) {
        uf.union(x, y + 10000); // Offset y coordinates
    }
    
    const uniqueComponents = new Set();
    for (const [x, y] of stones) {
        uniqueComponents.add(uf.find(x));
    }
    
    return stones.length - uniqueComponents.size;
}

// Satisfiability of Equality Equations
function equationsPossible(equations) {
    const uf = new UnionFind(26); // 26 letters
    
    // Process equality equations first
    for (const eq of equations) {
        if (eq[1] === '=') {
            const x = eq.charCodeAt(0) - 'a'.charCodeAt(0);
            const y = eq.charCodeAt(3) - 'a'.charCodeAt(0);
            uf.union(x, y);
        }
    }
    
    // Check inequality equations
    for (const eq of equations) {
        if (eq[1] === '!') {
            const x = eq.charCodeAt(0) - 'a'.charCodeAt(0);
            const y = eq.charCodeAt(3) - 'a'.charCodeAt(0);
            if (uf.connected(x, y)) {
                return false; // Contradiction found
            }
        }
    }
    
    return true;
}

// Teszt
const uf = new UnionFind(5);
console.log("Initial components:", uf.getCount()); // 5

uf.union(0, 1);
uf.union(2, 3);
console.log("After unions:", uf.getCount()); // 3

console.log("0 and 1 connected:", uf.connected(0, 1)); // true
console.log("1 and 2 connected:", uf.connected(1, 2)); // false

const isConnected = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1]
];
console.log("Friend circles:", findCircleNum(isConnected)); // 2

const edges = [[1,2],[1,3],[2,3]];
console.log("Redundant connection:", findRedundantConnection(edges)); // [2,3]

const stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]];
console.log("Max stones removed:", removeStones(stones)); // 5
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
class UnionFind {
    private parent: number[];
    private rank: number[];
    private count: number;
    
    constructor(n: number) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.count = n;
    }
    
    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) {
            return false; // Already connected
        }
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        this.count--;
        return true;
    }
    
    connected(x: number, y: number): boolean {
        return this.find(x) === this.find(y);
    }
    
    getCount(): number {
        return this.count;
    }
    
    getSize(x: number): number {
        const root = this.find(x);
        let size = 0;
        
        for (let i = 0; i < this.parent.length; i++) {
            if (this.find(i) === root) {
                size++;
            }
        }
        
        return size;
    }
    
    getComponents(): Map<number, number[]> {
        const components = new Map<number, number[]>();
        
        for (let i = 0; i < this.parent.length; i++) {
            const root = this.find(i);
            if (!components.has(root)) {
                components.set(root, []);
            }
            components.get(root)!.push(i);
        }
        
        return components;
    }
}

// Advanced Union-Find with size tracking
class WeightedUnionFind {
    private parent: number[];
    private size: number[];
    private count: number;
    
    constructor(n: number) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.size = new Array(n).fill(1);
        this.count = n;
    }
    
    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) {
            return false;
        }
        
        // Union by size
        if (this.size[rootX] < this.size[rootY]) {
            this.parent[rootX] = rootY;
            this.size[rootY] += this.size[rootX];
        } else {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
        }
        
        this.count--;
        return true;
    }
    
    getSize(x: number): number {
        return this.size[this.find(x)];
    }
    
    connected(x: number, y: number): boolean {
        return this.find(x) === this.find(y);
    }
    
    getCount(): number {
        return this.count;
    }
}

// Application: Largest Component Size by Common Factor
function largestComponentSize(nums: number[]): number {
    const uf = new WeightedUnionFind(nums.length);
    const primeToIndex = new Map<number, number>();
    
    // Helper function to get prime factors
    function getPrimeFactors(n: number): number[] {
        const factors: number[] = [];
        
        for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) {
                factors.push(i);
                while (n % i === 0) {
                    n /= i;
                }
            }
        }
        
        if (n > 1) {
            factors.push(n);
        }
        
        return factors;
    }
    
    // Union indices that share prime factors
    for (let i = 0; i < nums.length; i++) {
        const primes = getPrimeFactors(nums[i]);
        
        for (const prime of primes) {
            if (primeToIndex.has(prime)) {
                uf.union(i, primeToIndex.get(prime)!);
            } else {
                primeToIndex.set(prime, i);
            }
        }
    }
    
    // Find largest component
    let maxSize = 1;
    for (let i = 0; i < nums.length; i++) {
        maxSize = Math.max(maxSize, uf.getSize(i));
    }
    
    return maxSize;
}

// Application: Minimize Malware Spread
function minMalwareSpread(graph: number[][], initial: number[]): number {
    const n = graph.length;
    const uf = new WeightedUnionFind(n);
    
    // Union connected nodes
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (graph[i][j] === 1) {
                uf.union(i, j);
            }
        }
    }
    
    // Count malware in each component
    const malwareCount = new Map<number, number>();
    for (const node of initial) {
        const root = uf.find(node);
        malwareCount.set(root, (malwareCount.get(root) || 0) + 1);
    }
    
    // Find removal candidate
    let candidate = initial[0];
    let maxSaved = 0;
    
    for (const node of initial) {
        const root = uf.find(node);
        
        // If this component has only one malware, removing it saves the entire component
        if (malwareCount.get(root) === 1) {
            const saved = uf.getSize(node);
            if (saved > maxSaved || (saved === maxSaved && node < candidate)) {
                maxSaved = saved;
                candidate = node;
            }
        }
    }
    
    // If no single malware components, return smallest node
    if (maxSaved === 0) {
        return Math.min(...initial);
    }
    
    return candidate;
}

// Application: Evaluate Division with Union-Find
function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    const variableToId = new Map<string, number>();
    let idCounter = 0;
    
    // Assign IDs to variables
    for (const [a, b] of equations) {
        if (!variableToId.has(a)) {
            variableToId.set(a, idCounter++);
        }
        if (!variableToId.has(b)) {
            variableToId.set(b, idCounter++);
        }
    }
    
    // Custom Union-Find with weights
    class WeightedUF {
        private parent: number[];
        private weight: number[];
        
        constructor(n: number) {
            this.parent = Array.from({length: n}, (_, i) => i);
            this.weight = new Array(n).fill(1.0);
        }
        
        find(x: number): number {
            if (this.parent[x] !== x) {
                const originalParent = this.parent[x];
                this.parent[x] = this.find(originalParent);
                this.weight[x] *= this.weight[originalParent];
            }
            return this.parent[x];
        }
        
        union(x: number, y: number, value: number): void {
            const rootX = this.find(x);
            const rootY = this.find(y);
            
            if (rootX !== rootY) {
                this.parent[rootX] = rootY;
                this.weight[rootX] = (this.weight[y] * value) / this.weight[x];
            }
        }
        
        getQuotient(x: number, y: number): number {
            const rootX = this.find(x);
            const rootY = this.find(y);
            
            if (rootX !== rootY) {
                return -1.0;
            }
            
            return this.weight[x] / this.weight[y];
        }
    }
    
    const uf = new WeightedUF(idCounter);
    
    // Process equations
    for (let i = 0; i < equations.length; i++) {
        const [a, b] = equations[i];
        const idA = variableToId.get(a)!;
        const idB = variableToId.get(b)!;
        uf.union(idA, idB, values[i]);
    }
    
    // Process queries
    const results: number[] = [];
    for (const [a, b] of queries) {
        if (!variableToId.has(a) || !variableToId.has(b)) {
            results.push(-1.0);
        } else {
            const idA = variableToId.get(a)!;
            const idB = variableToId.get(b)!;
            results.push(uf.getQuotient(idA, idB));
        }
    }
    
    return results;
}

// Teszt
const uf = new UnionFind(5);
console.log("Initial components:", uf.getCount()); // 5

uf.union(0, 1);
uf.union(2, 3);
console.log("After unions:", uf.getCount()); // 3

console.log("Components:", uf.getComponents());

const nums = [4, 6, 15, 35];
console.log("Largest component by common factor:", largestComponentSize(nums)); // 4

const equations = [["a","b"],["b","c"]];
const values = [2.0, 3.0];
const queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]];
console.log("Equation results:", calcEquation(equations, values, queries)); // [6.0,0.5,-1.0,1.0,-1.0]
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Path compression nélkül**: O(n) per operation helyett O(α(n))
- **Union by rank/size hiánya**: kiegyensúlyozatlan fák, rossz teljesítmény
- **Find() result cache**: minden find() után frissíteni kell a parent pointert
- **0-based vs 1-based indexing**: koordináta-transzformációs hibák
- **Component count tracking**: union sikertelen esetén ne csökkentsd a count-ot

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Network connectivity**: social networks, computer networks
- **Image processing**: connected components, region growing
- **Game development**: land masses, territorial control
- **Compiler optimization**: variable aliasing, register allocation
- **Distributed systems**: cluster membership, partition tolerance

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért szükséges a path compression optimalizáció?
<details><summary>Válasz mutatása</summary>
Anélkül a find() művelet O(n) lehet. Path compression "lapítja" a fát, minden csomópontot közvetlenül a root alá kapcsol.
</details>

2. Mi a különbség union by rank és union by size között?
<details><summary>Válasz mutatása</summary>
Union by rank: fa magassága alapján. Union by size: komponens mérete alapján. Mindkettő hasonló performance-t ad.
</details>

3. Mikor használjunk Union-Find helyett más adatszerkezetet?
<details><summary>Válasz mutatása</summary>
Ha gyakori a komponens szétválasztás (Union-Find csak union-t támogat), vagy ha path query-k kellenek (használj graph adatszerkezetet).
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Number of Islands"** → 2D grid connectivity, Union-Find vs DFS/BFS comparison
2. **"Graph Valid Tree"** → Cycle detection + connectivity check
3. **"Accounts Merge"** → String-based grouping with Union-Find
4. **"Redundant Connection"** → Find cycle-creating edge in undirected graph
5. **"Most Stones Removed with Same Row or Column"** → Coordinate-based connectivity

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`DFS` · `BFS` · `Kruskal's MST` · `Connected Components` · `Cycle Detection`

</div>

<div class="tags">
  <span class="tag">union-find</span>
  <span class="tag">disjoint-set</span>
  <span class="tag">path-compression</span>
  <span class="tag">union-by-rank</span>
  <span class="tag">graphs</span>
  <span class="tag">connectivity</span>
  <span class="tag">medior</span>
</div>

### LRU Cache {#lru-cache}
<!-- tags: lru-cache, hashmap, doubly-linked-list, caching, design, medior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*Az LRU Cache olyan, mint egy korlátozott méretű könyvespolc: amikor betelt és új könyvet akarsz felrakni, akkor a legrégebben használt könyvet dobod ki. A "legrégebben használt" (Least Recently Used) azt jelenti, hogy sem olvasáskor, sem íráskor nem érintették. HashMap + Doubly Linked List kombinációval O(1) get/put műveletek.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Best case**: O(1) get/put operations
- **Average case**: O(1) get/put operations  
- **Worst case**: O(1) get/put operations
- **Space**: O(capacity) HashMap + Linked List

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**LRU Cache with HashMap + Doubly Linked List**
```pseudo
CLASS LRUCache
  CLASS Node
    key, value, prev, next
  END CLASS
  
  CONSTRUCTOR(capacity)
    this.capacity ← capacity
    this.cache ← EMPTY_MAP  // HashMap: key → Node
    
    // Dummy head and tail for easier manipulation
    this.head ← NEW Node(0, 0)
    this.tail ← NEW Node(0, 0)
    this.head.next ← this.tail
    this.tail.prev ← this.head
  END CONSTRUCTOR
  
  FUNCTION Get(key)
    IF key IN cache THEN
      node ← cache[key]
      MoveToHead(node)  // Mark as recently used
      RETURN node.value
    END IF
    RETURN −1
  END FUNCTION
  
  PROCEDURE Put(key, value)
    IF key IN cache THEN
      // Update existing
      node ← cache[key]
      node.value ← value
      MoveToHead(node)
    ELSE
      // Add new
      newNode ← NEW Node(key, value)
      
      IF SIZE(cache) ≥ capacity THEN
        // Remove LRU (tail.prev)
        lru ← RemoveTail()
        DELETE cache[lru.key]
      END IF
      
      cache[key] ← newNode
      AddToHead(newNode)
    END IF
  END PROCEDURE
  
  PROCEDURE AddToHead(node)
    node.prev ← head
    node.next ← head.next
    head.next.prev ← node
    head.next ← node
  END PROCEDURE
  
  PROCEDURE RemoveNode(node)
    node.prev.next ← node.next
    node.next.prev ← node.prev
  END PROCEDURE
  
  PROCEDURE MoveToHead(node)
    RemoveNode(node)
    AddToHead(node)
  END PROCEDURE
  
  FUNCTION RemoveTail()
    lru ← tail.prev
    RemoveNode(lru)
    RETURN lru
  END FUNCTION
END CLASS
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class LRUCache {
    
    class Node {
        int key, value;
        Node prev, next;
        
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }
    
    private final int capacity;
    private final Map<Integer, Node> cache;
    private final Node head;
    private final Node tail;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        
        // Dummy head and tail
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) {
            return -1;
        }
        
        // Move to head (mark as recently used)
        moveToHead(node);
        return node.value;
    }
    
    public void put(int key, int value) {
        Node node = cache.get(key);
        
        if (node != null) {
            // Update existing
            node.value = value;
            moveToHead(node);
        } else {
            // Add new
            Node newNode = new Node(key, value);
            
            if (cache.size() >= capacity) {
                // Remove LRU
                Node lru = removeTail();
                cache.remove(lru.key);
            }
            
            cache.put(key, newNode);
            addToHead(newNode);
        }
    }
    
    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }
    
    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }
    
    private Node removeTail() {
        Node lru = tail.prev;
        removeNode(lru);
        return lru;
    }
    
    // Debug method
    public void printCache() {
        System.out.print("Cache (MRU -> LRU): ");
        Node current = head.next;
        while (current != tail) {
            System.out.print("(" + current.key + ":" + current.value + ") ");
            current = current.next;
        }
        System.out.println();
    }
    
    // Alternative: Using LinkedHashMap (Java built-in LRU)
    static class LRUCacheSimple extends LinkedHashMap<Integer, Integer> {
        private final int capacity;
        
        public LRUCacheSimple(int capacity) {
            super(capacity, 0.75f, true); // access-order = true
            this.capacity = capacity;
        }
        
        public int get(int key) {
            return super.getOrDefault(key, -1);
        }
        
        public void put(int key, int value) {
            super.put(key, value);
        }
        
        @Override
        protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
            return size() > capacity;
        }
    }
    
    // LFU Cache implementation
    static class LFUCache {
        private final int capacity;
        private int minFreq;
        private final Map<Integer, Node> cache;
        private final Map<Integer, DoublyLinkedList> freqMap;
        
        class Node {
            int key, value, freq;
            Node prev, next;
            
            Node(int key, int value) {
                this.key = key;
                this.value = value;
                this.freq = 1;
            }
        }
        
        class DoublyLinkedList {
            Node head, tail;
            
            DoublyLinkedList() {
                head = new Node(0, 0);
                tail = new Node(0, 0);
                head.next = tail;
                tail.prev = head;
            }
            
            void addToHead(Node node) {
                node.next = head.next;
                node.prev = head;
                head.next.prev = node;
                head.next = node;
            }
            
            void removeNode(Node node) {
                node.prev.next = node.next;
                node.next.prev = node.prev;
            }
            
            Node removeTail() {
                Node last = tail.prev;
                removeNode(last);
                return last;
            }
            
            boolean isEmpty() {
                return head.next == tail;
            }
        }
        
        public LFUCache(int capacity) {
            this.capacity = capacity;
            this.minFreq = 0;
            this.cache = new HashMap<>();
            this.freqMap = new HashMap<>();
        }
        
        public int get(int key) {
            Node node = cache.get(key);
            if (node == null) return -1;
            
            updateFreq(node);
            return node.value;
        }
        
        public void put(int key, int value) {
            if (capacity <= 0) return;
            
            Node node = cache.get(key);
            if (node != null) {
                node.value = value;
                updateFreq(node);
            } else {
                if (cache.size() >= capacity) {
                    DoublyLinkedList minFreqList = freqMap.get(minFreq);
                    Node lfu = minFreqList.removeTail();
                    cache.remove(lfu.key);
                }
                
                Node newNode = new Node(key, value);
                cache.put(key, newNode);
                freqMap.computeIfAbsent(1, k -> new DoublyLinkedList()).addToHead(newNode);
                minFreq = 1;
            }
        }
        
        private void updateFreq(Node node) {
            int oldFreq = node.freq;
            int newFreq = oldFreq + 1;
            
            // Remove from old frequency list
            freqMap.get(oldFreq).removeNode(node);
            if (oldFreq == minFreq && freqMap.get(oldFreq).isEmpty()) {
                minFreq++;
            }
            
            // Add to new frequency list
            node.freq = newFreq;
            freqMap.computeIfAbsent(newFreq, k -> new DoublyLinkedList()).addToHead(node);
        }
    }
    
    // Teszt
    public static void main(String[] args) {
        LRUCache lru = new LRUCache(2);
        
        lru.put(1, 1);
        lru.put(2, 2);
        lru.printCache(); // (2:2) (1:1)
        
        System.out.println(lru.get(1)); // 1, moves (1:1) to front
        lru.printCache(); // (1:1) (2:2)
        
        lru.put(3, 3); // Evicts key 2
        lru.printCache(); // (3:3) (1:1)
        
        System.out.println(lru.get(2)); // -1 (not found)
        
        lru.put(4, 4); // Evicts key 1
        lru.printCache(); // (4:4) (3:3)
        
        System.out.println(lru.get(1)); // -1 (not found)
        System.out.println(lru.get(3)); // 3
        System.out.println(lru.get(4)); // 4
        
        // Test LFU Cache
        LFUCache lfu = new LFUCache(2);
        lfu.put(1, 1);
        lfu.put(2, 2);
        System.out.println(lfu.get(1)); // 1
        lfu.put(3, 3); // Evicts key 2 (least frequent)
        System.out.println(lfu.get(2)); // -1
        System.out.println(lfu.get(3)); // 3
        lfu.put(4, 4); // Evicts key 1
        System.out.println(lfu.get(1)); // -1
        System.out.println(lfu.get(3)); // 3
        System.out.println(lfu.get(4)); // 4
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Maintains insertion order
    }
    
    get(key) {
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            // Move to end (most recently used)
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return -1;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Remove LRU (first entry)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, value);
    }
    
    // Debug method
    printCache() {
        console.log('Cache (LRU -> MRU):', Array.from(this.cache.entries()));
    }
}

// Manual implementation with doubly linked list
class LRUCacheManual {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        
        // Dummy head and tail
        this.head = { key: 0, value: 0, prev: null, next: null };
        this.tail = { key: 0, value: 0, prev: null, next: null };
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    get(key) {
        const node = this.cache.get(key);
        if (!node) return -1;
        
        this.moveToHead(node);
        return node.value;
    }
    
    put(key, value) {
        const node = this.cache.get(key);
        
        if (node) {
            // Update existing
            node.value = value;
            this.moveToHead(node);
        } else {
            // Add new
            const newNode = { key, value, prev: null, next: null };
            
            if (this.cache.size >= this.capacity) {
                // Remove LRU
                const lru = this.removeTail();
                this.cache.delete(lru.key);
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
        const lru = this.tail.prev;
        this.removeNode(lru);
        return lru;
    }
    
    printCache() {
        const items = [];
        let current = this.head.next;
        while (current !== this.tail) {
            items.push(`${current.key}:${current.value}`);
            current = current.next;
        }
        console.log('Cache (MRU -> LRU):', items);
    }
}

// LFU Cache implementation
class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        this.cache = new Map(); // key -> {value, freq, prev, next}
        this.freqMap = new Map(); // freq -> {head, tail}
    }
    
    get(key) {
        const node = this.cache.get(key);
        if (!node) return -1;
        
        this.updateFreq(node);
        return node.value;
    }
    
    put(key, value) {
        if (this.capacity <= 0) return;
        
        const node = this.cache.get(key);
        if (node) {
            node.value = value;
            this.updateFreq(node);
        } else {
            if (this.cache.size >= this.capacity) {
                this.evictLFU();
            }
            
            const newNode = { key, value, freq: 1, prev: null, next: null };
            this.cache.set(key, newNode);
            this.addToFreqList(newNode, 1);
            this.minFreq = 1;
        }
    }
    
    updateFreq(node) {
        const oldFreq = node.freq;
        const newFreq = oldFreq + 1;
        
        this.removeFromFreqList(node, oldFreq);
        
        if (oldFreq === this.minFreq && this.isFreqListEmpty(oldFreq)) {
            this.minFreq++;
        }
        
        node.freq = newFreq;
        this.addToFreqList(node, newFreq);
    }
    
    addToFreqList(node, freq) {
        if (!this.freqMap.has(freq)) {
            const head = { prev: null, next: null };
            const tail = { prev: null, next: null };
            head.next = tail;
            tail.prev = head;
            this.freqMap.set(freq, { head, tail });
        }
        
        const { head } = this.freqMap.get(freq);
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
    
    removeFromFreqList(node, freq) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    isFreqListEmpty(freq) {
        const { head, tail } = this.freqMap.get(freq);
        return head.next === tail;
    }
    
    evictLFU() {
        const { head, tail } = this.freqMap.get(this.minFreq);
        const lfu = tail.prev;
        this.removeFromFreqList(lfu, this.minFreq);
        this.cache.delete(lfu.key);
    }
}

// TTL (Time To Live) Cache
class TTLCache {
    constructor(capacity, defaultTTL = 60000) { // 1 minute default
        this.capacity = capacity;
        this.defaultTTL = defaultTTL;
        this.cache = new Map();
        this.timers = new Map();
    }
    
    get(key) {
        if (this.cache.has(key)) {
            const { value, expiry } = this.cache.get(key);
            
            if (Date.now() < expiry) {
                // Move to end (LRU behavior)
                this.cache.delete(key);
                this.cache.set(key, { value, expiry });
                return value;
            } else {
                // Expired
                this.delete(key);
            }
        }
        return null;
    }
    
    put(key, value, ttl = this.defaultTTL) {
        if (this.cache.has(key)) {
            this.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Remove LRU
            const firstKey = this.cache.keys().next().value;
            this.delete(firstKey);
        }
        
        const expiry = Date.now() + ttl;
        this.cache.set(key, { value, expiry });
        
        // Set expiration timer
        const timer = setTimeout(() => this.delete(key), ttl);
        this.timers.set(key, timer);
    }
    
    delete(key) {
        this.cache.delete(key);
        
        const timer = this.timers.get(key);
        if (timer) {
            clearTimeout(timer);
            this.timers.delete(key);
        }
    }
    
    clear() {
        this.cache.clear();
        for (const timer of this.timers.values()) {
            clearTimeout(timer);
        }
        this.timers.clear();
    }
}

// Teszt
console.log("=== LRU Cache Test ===");
const lru = new LRUCache(2);

lru.put(1, 1);
lru.put(2, 2);
lru.printCache(); // [1:1, 2:2]

console.log(lru.get(1)); // 1
lru.printCache(); // [2:2, 1:1]

lru.put(3, 3); // Evicts key 2
lru.printCache(); // [1:1, 3:3]

console.log(lru.get(2)); // -1
console.log(lru.get(3)); // 3
console.log(lru.get(1)); // 1

console.log("\n=== Manual LRU Test ===");
const lruManual = new LRUCacheManual(2);
lruManual.put(1, 1);
lruManual.put(2, 2);
lruManual.printCache();

console.log(lruManual.get(1)); // 1
lruManual.put(3, 3);
lruManual.printCache();

console.log("\n=== TTL Cache Test ===");
const ttl = new TTLCache(2, 2000); // 2 second TTL
ttl.put('a', 1);
ttl.put('b', 2);

console.log('Immediate get:', ttl.get('a')); // 1

setTimeout(() => {
    console.log('After 1 second:', ttl.get('a')); // 1
}, 1000);

setTimeout(() => {
    console.log('After 3 seconds:', ttl.get('a')); // null (expired)
}, 3000);
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Generic LRU Cache interface
interface Cache<K, V> {
    get(key: K): V | null;
    put(key: K, value: V): void;
    delete(key: K): boolean;
    clear(): void;
    size(): number;
}

// Node interface for doubly linked list
interface ListNode<K, V> {
    key: K;
    value: V;
    prev: ListNode<K, V> | null;
    next: ListNode<K, V> | null;
}

// LRU Cache implementation
class LRUCache<K, V> implements Cache<K, V> {
    private readonly capacity: number;
    private readonly cache: Map<K, ListNode<K, V>>;
    private readonly head: ListNode<K, V>;
    private readonly tail: ListNode<K, V>;
    
    constructor(capacity: number) {
        if (capacity <= 0) {
            throw new Error('Capacity must be positive');
        }
        
        this.capacity = capacity;
        this.cache = new Map();
        
        // Initialize dummy head and tail
        this.head = { key: {} as K, value: {} as V, prev: null, next: null };
        this.tail = { key: {} as K, value: {} as V, prev: null, next: null };
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    get(key: K): V | null {
        const node = this.cache.get(key);
        if (!node) {
            return null;
        }
        
        // Move to head (mark as recently used)
        this.moveToHead(node);
        return node.value;
    }
    
    put(key: K, value: V): void {
        const existingNode = this.cache.get(key);
        
        if (existingNode) {
            // Update existing node
            existingNode.value = value;
            this.moveToHead(existingNode);
        } else {
            // Create new node
            const newNode: ListNode<K, V> = {
                key,
                value,
                prev: null,
                next: null
            };
            
            if (this.cache.size >= this.capacity) {
                // Remove LRU node
                const lru = this.removeTail();
                if (lru) {
                    this.cache.delete(lru.key);
                }
            }
            
            this.cache.set(key, newNode);
            this.addToHead(newNode);
        }
    }
    
    delete(key: K): boolean {
        const node = this.cache.get(key);
        if (!node) {
            return false;
        }
        
        this.removeNode(node);
        this.cache.delete(key);
        return true;
    }
    
    clear(): void {
        this.cache.clear();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    size(): number {
        return this.cache.size;
    }
    
    // Get all keys in order (MRU to LRU)
    keys(): K[] {
        const keys: K[] = [];
        let current = this.head.next;
        
        while (current && current !== this.tail) {
            keys.push(current.key);
            current = current.next;
        }
        
        return keys;
    }
    
    // Get all values in order (MRU to LRU)
    values(): V[] {
        const values: V[] = [];
        let current = this.head.next;
        
        while (current && current !== this.tail) {
            values.push(current.value);
            current = current.next;
        }
        
        return values;
    }
    
    private addToHead(node: ListNode<K, V>): void {
        node.prev = this.head;
        node.next = this.head.next;
        
        if (this.head.next) {
            this.head.next.prev = node;
        }
        this.head.next = node;
    }
    
    private removeNode(node: ListNode<K, V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
    }
    
    private moveToHead(node: ListNode<K, V>): void {
        this.removeNode(node);
        this.addToHead(node);
    }
    
    private removeTail(): ListNode<K, V> | null {
        const lru = this.tail.prev;
        if (lru && lru !== this.head) {
            this.removeNode(lru);
            return lru;
        }
        return null;
    }
}

// LFU Cache implementation
class LFUCache<K, V> implements Cache<K, V> {
    private readonly capacity: number;
    private minFreq: number = 0;
    private readonly cache: Map<K, FreqNode<K, V>>;
    private readonly freqMap: Map<number, DoublyLinkedList<K, V>>;
    
    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
        this.freqMap = new Map();
    }
    
    get(key: K): V | null {
        const node = this.cache.get(key);
        if (!node) {
            return null;
        }
        
        this.updateFreq(node);
        return node.value;
    }
    
    put(key: K, value: V): void {
        if (this.capacity <= 0) return;
        
        const existingNode = this.cache.get(key);
        if (existingNode) {
            existingNode.value = value;
            this.updateFreq(existingNode);
        } else {
            if (this.cache.size >= this.capacity) {
                this.evictLFU();
            }
            
            const newNode: FreqNode<K, V> = {
                key,
                value,
                freq: 1,
                prev: null,
                next: null
            };
            
            this.cache.set(key, newNode);
            this.addToFreqList(newNode, 1);
            this.minFreq = 1;
        }
    }
    
    delete(key: K): boolean {
        const node = this.cache.get(key);
        if (!node) {
            return false;
        }
        
        this.removeFromFreqList(node);
        this.cache.delete(key);
        return true;
    }
    
    clear(): void {
        this.cache.clear();
        this.freqMap.clear();
        this.minFreq = 0;
    }
    
    size(): number {
        return this.cache.size;
    }
    
    private updateFreq(node: FreqNode<K, V>): void {
        const oldFreq = node.freq;
        const newFreq = oldFreq + 1;
        
        this.removeFromFreqList(node);
        
        if (oldFreq === this.minFreq && this.isFreqListEmpty(oldFreq)) {
            this.minFreq++;
        }
        
        node.freq = newFreq;
        this.addToFreqList(node, newFreq);
    }
    
    private addToFreqList(node: FreqNode<K, V>, freq: number): void {
        if (!this.freqMap.has(freq)) {
            this.freqMap.set(freq, new DoublyLinkedList<K, V>());
        }
        this.freqMap.get(freq)!.addToHead(node);
    }
    
    private removeFromFreqList(node: FreqNode<K, V>): void {
        const freqList = this.freqMap.get(node.freq);
        if (freqList) {
            freqList.removeNode(node);
        }
    }
    
    private isFreqListEmpty(freq: number): boolean {
        const freqList = this.freqMap.get(freq);
        return !freqList || freqList.isEmpty();
    }
    
    private evictLFU(): void {
        const minFreqList = this.freqMap.get(this.minFreq);
        if (minFreqList) {
            const lfu = minFreqList.removeTail();
            if (lfu) {
                this.cache.delete(lfu.key);
            }
        }
    }
}

// Supporting interfaces and classes
interface FreqNode<K, V> extends ListNode<K, V> {
    freq: number;
}

class DoublyLinkedList<K, V> {
    private head: ListNode<K, V>;
    private tail: ListNode<K, V>;
    
    constructor() {
        this.head = { key: {} as K, value: {} as V, prev: null, next: null };
        this.tail = { key: {} as K, value: {} as V, prev: null, next: null };
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    addToHead(node: ListNode<K, V>): void {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next!.prev = node;
        this.head.next = node;
    }
    
    removeNode(node: ListNode<K, V>): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }
    
    removeTail(): ListNode<K, V> | null {
        const last = this.tail.prev;
        if (last !== this.head) {
            this.removeNode(last!);
            return last;
        }
        return null;
    }
    
    isEmpty(): boolean {
        return this.head.next === this.tail;
    }
}

// TTL (Time To Live) Cache
class TTLCache<K, V> implements Cache<K, V> {
    private readonly capacity: number;
    private readonly defaultTTL: number;
    private readonly cache: Map<K, TTLNode<V>>;
    private readonly timers: Map<K, NodeJS.Timeout>;
    
    constructor(capacity: number, defaultTTL: number = 60000) {
        this.capacity = capacity;
        this.defaultTTL = defaultTTL;
        this.cache = new Map();
        this.timers = new Map();
    }
    
    get(key: K): V | null {
        const node = this.cache.get(key);
        if (!node) {
            return null;
        }
        
        if (Date.now() < node.expiry) {
            // Move to end for LRU behavior
            this.cache.delete(key);
            this.cache.set(key, node);
            return node.value;
        } else {
            this.delete(key);
            return null;
        }
    }
    
    put(key: K, value: V, ttl: number = this.defaultTTL): void {
        if (this.cache.has(key)) {
            this.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Remove oldest entry
            const firstKey = this.cache.keys().next().value;
            this.delete(firstKey);
        }
        
        const expiry = Date.now() + ttl;
        const node: TTLNode<V> = { value, expiry };
        
        this.cache.set(key, node);
        
        // Set expiration timer
        const timer = setTimeout(() => this.delete(key), ttl);
        this.timers.set(key, timer);
    }
    
    delete(key: K): boolean {
        const deleted = this.cache.delete(key);
        
        const timer = this.timers.get(key);
        if (timer) {
            clearTimeout(timer);
            this.timers.delete(key);
        }
        
        return deleted;
    }
    
    clear(): void {
        this.cache.clear();
        for (const timer of this.timers.values()) {
            clearTimeout(timer);
        }
        this.timers.clear();
    }
    
    size(): number {
        return this.cache.size;
    }
}

interface TTLNode<V> {
    value: V;
    expiry: number;
}

// Usage examples
const lruCache = new LRUCache<string, number>(3);
lruCache.put('a', 1);
lruCache.put('b', 2);
lruCache.put('c', 3);

console.log('LRU Cache:');
console.log('Get a:', lruCache.get('a')); // 1
console.log('Keys order:', lruCache.keys()); // ['a', 'b', 'c']

lruCache.put('d', 4); // Evicts 'b'
console.log('After adding d:', lruCache.keys()); // ['d', 'a', 'c']

const lfuCache = new LFUCache<string, number>(2);
lfuCache.put('a', 1);
lfuCache.put('b', 2);
console.log('\nLFU Cache:');
console.log('Get a:', lfuCache.get('a')); // 1
lfuCache.put('c', 3); // Evicts 'b' (least frequent)
console.log('Get b:', lfuCache.get('b')); // null

const ttlCache = new TTLCache<string, number>(2, 1000); // 1 second TTL
ttlCache.put('x', 10);
console.log('\nTTL Cache:');
console.log('Immediate get:', ttlCache.get('x')); // 10

setTimeout(() => {
    console.log('After 1.5 seconds:', ttlCache.get('x')); // null
}, 1500);
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Double linking hibák**: prev/next pointer helytelen frissítése
- **HashMap-LinkedList sync**: cache Map és linked list konzisztenciájának fenntartása
- **Dummy node kezelés**: head/tail dummy node-ok helytelen kezelése
- **Capacity == 0 edge case**: üres cache kezelése
- **Memory leak**: timer cleanup elmulasztása TTL cache-nél

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Web browsers**: page caching, resource caching
- **Operating systems**: page replacement algorithms
- **Database systems**: buffer pool management
- **CDN systems**: content delivery optimization
- **Application servers**: session management, data caching

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért szükséges HashMap + Doubly Linked List kombináció?
<details><summary>Válasz mutatása</summary>
HashMap: O(1) kulcs alapú keresés. Doubly Linked List: O(1) elem mozgatás/törlés a lista közepéről. Egyedül egyik sem adná meg az O(1) get/put-ot.
</details>

2. Mi a különbség LRU és LFU cache között?
<details><summary>Válasz mutatása</summary>
LRU: legrégebben használt elem kiesik. LFU: legritkábban használt elem kiesik. LFU komplikáltabb, frequency tracking szükséges.
</details>

3. Hogyan optimalizálható a TTL cache memory használata?
<details><summary>Válasz mutatása</summary>
Lazy cleanup: lejárt elemeket csak access-kor töröljük. Batch cleanup: periodikus cleanup timer. Priority queue expiry sorrendben.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Design and implement an LRU Cache"** → O(1) operations, data structure choice explanation
2. **"LRU Cache with TTL"** → Time-based expiration + LRU eviction policy
3. **"LFU Cache implementation"** → Frequency tracking, min frequency optimization
4. **"Design a distributed cache"** → Consistency, partitioning, replication strategies
5. **"Cache replacement policies comparison"** → LRU vs LFU vs FIFO vs Random trade-offs

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`HashMap` · `Doubly Linked List` · `Priority Queue` · `Clock Algorithm` · `ARC Cache`

</div>

<div class="tags">
  <span class="tag">lru-cache</span>
  <span class="tag">hashmap</span>
  <span class="tag">doubly-linked-list</span>
  <span class="tag">caching</span>
  <span class="tag">design</span>
  <span class="tag">medior</span>
</div>

### Heap/Priority Queue Receptek {#heap-priority-queue-recipes}
<!-- tags: heap, priority-queue, patterns, algorithms, data-structures, junior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*A Heap/Priority Queue olyan, mint egy intelligens sor: nem "először jött, először megy" alapon, hanem prioritás szerint. Mindig a legfontosabb elemet szolgálja ki. Ez az adatszerkezet számtalan algoritmusban kulcsfontosságú, és ismerni kell a tipikus használati mintákat (recepteket).*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Insert**: O(log n) idő
- **Extract Min/Max**: O(log n) idő
- **Peek**: O(1) idő
- **Build Heap**: O(n) idő (bottom-up)
- **Space**: O(n) tárhely

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**Basic Heap Operations**
```pseudo
CLASS MinHeap
  CONSTRUCTOR()
    heap ← EMPTY_ARRAY
  END CONSTRUCTOR
  
  PROCEDURE Insert(val)
    APPEND(heap, val)
    HeapifyUp(LENGTH(heap) − 1)
  END PROCEDURE
  
  FUNCTION ExtractMin()
    IF EMPTY(heap) THEN
      RETURN null
    END IF
    
    min ← heap[0]
    heap[0] ← heap[LENGTH(heap) − 1]
    REMOVE_LAST(heap)
    HeapifyDown(0)
    RETURN min
  END FUNCTION
  
  PROCEDURE HeapifyUp(index)
    WHILE index > 0 DO
      parent ← (index − 1) / 2
      IF heap[parent] ≤ heap[index] THEN
        BREAK
      END IF
      SWAP(heap, parent, index)
      index ← parent
    END WHILE
  END PROCEDURE
  
  PROCEDURE HeapifyDown(index)
    WHILE index has children DO
      smallestChild ← index
      
      IF LeftChild(index) < heap[smallestChild] THEN
        smallestChild ← LeftChild(index)
      END IF
      IF RightChild(index) < heap[smallestChild] THEN
        smallestChild ← RightChild(index)
      END IF
      
      IF smallestChild = index THEN
        BREAK
      END IF
      SWAP(heap, index, smallestChild)
      index ← smallestChild
    END WHILE
  END PROCEDURE
END CLASS
```

**Common Patterns:**
```pseudo
// 1. Top-K Pattern: Use heap of size K
// 2. Merge Pattern: Merge multiple sorted streams
// 3. Sliding Window: Maintain min/max in window
// 4. Two Heaps: Find median dynamically
// 5. Custom Priority: Complex object comparison
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class HeapRecipes {
    
    // Recipe 1: Sliding Window Maximum using Deque
    public static int[] maxSlidingWindow(int[] nums, int k) {
        Deque<Integer> deque = new ArrayDeque<>(); // Store indices
        int[] result = new int[nums.length - k + 1];
        
        for (int i = 0; i < nums.length; i++) {
            // Remove indices outside window
            while (!deque.isEmpty() && deque.peekFirst() <= i - k) {
                deque.pollFirst();
            }
            
            // Remove smaller elements (maintain decreasing order)
            while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
                deque.pollLast();
            }
            
            deque.offerLast(i);
            
            // Add result when window is complete
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        
        return result;
    }
    
    // Recipe 2: Meeting Rooms II (Interval Scheduling)
    public static int minMeetingRooms(int[][] intervals) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // End times
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]); // Sort by start time
        
        for (int[] interval : intervals) {
            // If room is available, reuse it
            if (!minHeap.isEmpty() && minHeap.peek() <= interval[0]) {
                minHeap.poll();
            }
            
            // Add current meeting's end time
            minHeap.offer(interval[1]);
        }
        
        return minHeap.size();
    }
    
    // Recipe 3: Task Scheduler with Cooldown
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
    
    // Recipe 4: Merge K Sorted Arrays
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
    
    // Recipe 5: Reorganize String (Greedy with Heap)
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
    
    // Recipe 6: Find Median from Data Stream (Two Heaps)
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
    
    // Recipe 7: Huffman Coding Tree
    static class HuffmanNode {
        char ch;
        int freq;
        HuffmanNode left, right;
        
        HuffmanNode(char ch, int freq) {
            this.ch = ch;
            this.freq = freq;
        }
        
        HuffmanNode(int freq, HuffmanNode left, HuffmanNode right) {
            this.freq = freq;
            this.left = left;
            this.right = right;
        }
    }
    
    public static HuffmanNode buildHuffmanTree(Map<Character, Integer> frequencies) {
        PriorityQueue<HuffmanNode> minHeap = new PriorityQueue<>((a, b) -> a.freq - b.freq);
        
        // Add all characters to heap
        for (Map.Entry<Character, Integer> entry : frequencies.entrySet()) {
            minHeap.offer(new HuffmanNode(entry.getKey(), entry.getValue()));
        }
        
        // Build tree bottom-up
        while (minHeap.size() > 1) {
            HuffmanNode left = minHeap.poll();
            HuffmanNode right = minHeap.poll();
            
            HuffmanNode merged = new HuffmanNode(left.freq + right.freq, left, right);
            minHeap.offer(merged);
        }
        
        return minHeap.poll();
    }
    
    // Recipe 8: IPO (Initial Public Offering) - Maximum Capital
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
    
    // Teszt
    public static void main(String[] args) {
        // Test sliding window maximum
        int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
        System.out.println("Sliding window max: " + Arrays.toString(maxSlidingWindow(nums, 3)));
        // [3, 3, 5, 5, 6, 7]
        
        // Test meeting rooms
        int[][] meetings = { {0, 30}, {5, 10}, {15, 20} };
        System.out.println("Min meeting rooms: " + minMeetingRooms(meetings)); // 2
        
        // Test task scheduler
        char[] tasks = {'A','A','A','B','B','B'};
        System.out.println("Least interval: " + leastInterval(tasks, 2)); // 8
        
        // Test reorganize string
        System.out.println("Reorganized: " + reorganizeString("aab")); // "aba"
        
        // Test median finder
        MedianFinder mf = new MedianFinder();
        mf.addNum(1);
        mf.addNum(2);
        System.out.println("Median: " + mf.findMedian()); // 1.5
        mf.addNum(3);
        System.out.println("Median: " + mf.findMedian()); // 2.0
        
        // Test IPO
        int[] profits = {1, 2, 3};
        int[] capital = {0, 1, 1};
        System.out.println("Max capital: " + findMaximizedCapital(2, 0, profits, capital)); // 4
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Priority Queue implementation for JavaScript
class PriorityQueue {
    constructor(compareFn = (a, b) => a - b) {
        this.items = [];
        this.compare = compareFn;
    }
    
    enqueue(item) {
        this.items.push(item);
        this.heapifyUp();
    }
    
    dequeue() {
        if (this.size() === 0) return null;
        
        const item = this.items[0];
        const lastItem = this.items.pop();
        
        if (this.size() > 0) {
            this.items[0] = lastItem;
            this.heapifyDown();
        }
        
        return item;
    }
    
    peek() {
        return this.items[0] || null;
    }
    
    size() {
        return this.items.length;
    }
    
    heapifyUp() {
        let index = this.items.length - 1;
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.compare(this.items[index], this.items[parentIndex]) >= 0) {
                break;
            }
            
            [this.items[index], this.items[parentIndex]] = 
            [this.items[parentIndex], this.items[index]];
            
            index = parentIndex;
        }
    }
    
    heapifyDown() {
        let index = 0;
        
        while (this.leftChild(index) !== null) {
            let smallestIndex = this.leftChildIndex(index);
            
            if (this.rightChild(index) !== null && 
                this.compare(this.rightChild(index), this.leftChild(index)) < 0) {
                smallestIndex = this.rightChildIndex(index);
            }
            
            if (this.compare(this.items[index], this.items[smallestIndex]) <= 0) {
                break;
            }
            
            [this.items[index], this.items[smallestIndex]] = 
            [this.items[smallestIndex], this.items[index]];
            
            index = smallestIndex;
        }
    }
    
    leftChildIndex(index) {
        return 2 * index + 1;
    }
    
    rightChildIndex(index) {
        return 2 * index + 2;
    }
    
    leftChild(index) {
        const idx = this.leftChildIndex(index);
        return idx < this.items.length ? this.items[idx] : null;
    }
    
    rightChild(index) {
        const idx = this.rightChildIndex(index);
        return idx < this.items.length ? this.items[idx] : null;
    }
}

// Recipe 1: Merge K Sorted Lists
function mergeKSortedLists(lists) {
    const minHeap = new PriorityQueue((a, b) => a.val - b.val);
    
    // Add first node of each list
    for (const head of lists) {
        if (head) {
            minHeap.enqueue(head);
        }
    }
    
    const dummy = { next: null };
    let current = dummy;
    
    while (minHeap.size() > 0) {
        const node = minHeap.dequeue();
        current.next = node;
        current = current.next;
        
        if (node.next) {
            minHeap.enqueue(node.next);
        }
    }
    
    return dummy.next;
}

// Recipe 2: Twitter Feed (Top K Tweets)
class TwitterFeed {
    constructor() {
        this.tweets = new Map(); // userId -> [{tweetId, timestamp}]
        this.follows = new Map(); // userId -> Set of followeeIds
        this.timestamp = 0;
    }
    
    postTweet(userId, tweetId) {
        if (!this.tweets.has(userId)) {
            this.tweets.set(userId, []);
        }
        this.tweets.get(userId).push({ tweetId, timestamp: this.timestamp++ });
    }
    
    getNewsFeed(userId) {
        const maxHeap = new PriorityQueue((a, b) => b.timestamp - a.timestamp);
        
        // Add user's own tweets
        if (this.tweets.has(userId)) {
            for (const tweet of this.tweets.get(userId)) {
                maxHeap.enqueue(tweet);
            }
        }
        
        // Add followees' tweets
        if (this.follows.has(userId)) {
            for (const followeeId of this.follows.get(userId)) {
                if (this.tweets.has(followeeId)) {
                    for (const tweet of this.tweets.get(followeeId)) {
                        maxHeap.enqueue(tweet);
                    }
                }
            }
        }
        
        const result = [];
        for (let i = 0; i < 10 && maxHeap.size() > 0; i++) {
            result.push(maxHeap.dequeue().tweetId);
        }
        
        return result;
    }
    
    follow(followerId, followeeId) {
        if (!this.follows.has(followerId)) {
            this.follows.set(followerId, new Set());
        }
        this.follows.get(followerId).add(followeeId);
    }
    
    unfollow(followerId, followeeId) {
        if (this.follows.has(followerId)) {
            this.follows.get(followerId).delete(followeeId);
        }
    }
}

// Recipe 3: Kth Largest Element in Stream
class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.minHeap = new PriorityQueue((a, b) => a - b);
        
        for (const num of nums) {
            this.add(num);
        }
    }
    
    add(val) {
        this.minHeap.enqueue(val);
        
        if (this.minHeap.size() > this.k) {
            this.minHeap.dequeue();
        }
        
        return this.minHeap.peek();
    }
}

// Recipe 4: Course Schedule III (Maximum Courses)
function scheduleCourse(courses) {
    // Sort by end time
    courses.sort((a, b) => a[1] - b[1]);
    
    const maxHeap = new PriorityQueue((a, b) => b - a); // Duration heap
    let time = 0;
    
    for (const [duration, endTime] of courses) {
        time += duration;
        maxHeap.enqueue(duration);
        
        // If we exceed deadline, remove longest course
        if (time > endTime) {
            time -= maxHeap.dequeue();
        }
    }
    
    return maxHeap.size();
}

// Recipe 5: Ugly Number II
function nthUglyNumber(n) {
    const minHeap = new PriorityQueue((a, b) => a - b);
    const seen = new Set();
    const factors = [2, 3, 5];
    
    minHeap.enqueue(1);
    seen.add(1);
    
    let ugly = 1;
    for (let i = 0; i < n; i++) {
        ugly = minHeap.dequeue();
        
        for (const factor of factors) {
            const next = ugly * factor;
            if (!seen.has(next)) {
                seen.add(next);
                minHeap.enqueue(next);
            }
        }
    }
    
    return ugly;
}

// Recipe 6: Rearrange String k Distance Apart
function rearrangeString(s, k) {
    if (k <= 1) return s;
    
    const charCount = new Map();
    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Max heap by frequency
    const maxHeap = new PriorityQueue((a, b) => b.count - a.count);
    for (const [char, count] of charCount) {
        maxHeap.enqueue({ char, count });
    }
    
    const result = [];
    const waitQueue = [];
    
    while (maxHeap.size() > 0) {
        const current = maxHeap.dequeue();
        result.push(current.char);
        current.count--;
        
        waitQueue.push(current);
        
        // When wait queue reaches k distance, add back to heap
        if (waitQueue.length >= k) {
            const waiting = waitQueue.shift();
            if (waiting.count > 0) {
                maxHeap.enqueue(waiting);
            }
        }
    }
    
    return result.length === s.length ? result.join('') : '';
}

// Recipe 7: Super Ugly Number
function nthSuperUglyNumber(n, primes) {
    const minHeap = new PriorityQueue((a, b) => a.value - b.value);
    const seen = new Set();
    
    minHeap.enqueue({ value: 1, prime: 2 });
    seen.add(1);
    
    let ugly = 1;
    for (let i = 0; i < n; i++) {
        ugly = minHeap.dequeue().value;
        
        for (const prime of primes) {
            const next = ugly * prime;
            if (!seen.has(next)) {
                seen.add(next);
                minHeap.enqueue({ value: next, prime });
            }
        }
    }
    
    return ugly;
}

// Teszt
console.log("=== Heap Recipes Tests ===");

// Test Kth Largest
const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log("Kth largest add 3:", kthLargest.add(3)); // 4
console.log("Kth largest add 5:", kthLargest.add(5)); // 5

// Test Course Schedule
const courses = [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]];
console.log("Max courses:", scheduleCourse(courses)); // 3

// Test Ugly Number
console.log("10th ugly number:", nthUglyNumber(10)); // 12

// Test Rearrange String
console.log("Rearrange 'aabbcc' with k=3:", rearrangeString('aabbcc', 3)); // "abcabc"

// Test Twitter Feed
const twitter = new TwitterFeed();
twitter.postTweet(1, 5);
twitter.postTweet(1, 3);
twitter.follow(1, 2);
twitter.postTweet(2, 6);
console.log("News feed for user 1:", twitter.getNewsFeed(1)); // [6, 3, 5]
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Generic Priority Queue
class PriorityQueue<T> {
    private items: T[] = [];
    
    constructor(private compareFn: (a: T, b: T) => number) {}
    
    enqueue(item: T): void {
        this.items.push(item);
        this.heapifyUp();
    }
    
    dequeue(): T | null {
        if (this.size() === 0) return null;
        
        const item = this.items[0];
        const lastItem = this.items.pop()!;
        
        if (this.size() > 0) {
            this.items[0] = lastItem;
            this.heapifyDown();
        }
        
        return item;
    }
    
    peek(): T | null {
        return this.items[0] || null;
    }
    
    size(): number {
        return this.items.length;
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    private heapifyUp(): void {
        let index = this.items.length - 1;
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.compareFn(this.items[index], this.items[parentIndex]) >= 0) {
                break;
            }
            
            [this.items[index], this.items[parentIndex]] = 
            [this.items[parentIndex], this.items[index]];
            
            index = parentIndex;
        }
    }
    
    private heapifyDown(): void {
        let index = 0;
        
        while (this.getLeftChildIndex(index) < this.items.length) {
            let smallestIndex = this.getLeftChildIndex(index);
            
            if (this.getRightChildIndex(index) < this.items.length && 
                this.compareFn(this.items[this.getRightChildIndex(index)], 
                              this.items[smallestIndex]) < 0) {
                smallestIndex = this.getRightChildIndex(index);
            }
            
            if (this.compareFn(this.items[index], this.items[smallestIndex]) <= 0) {
                break;
            }
            
            [this.items[index], this.items[smallestIndex]] = 
            [this.items[smallestIndex], this.items[index]];
            
            index = smallestIndex;
        }
    }
    
    private getLeftChildIndex(index: number): number {
        return 2 * index + 1;
    }
    
    private getRightChildIndex(index: number): number {
        return 2 * index + 2;
    }
}

// Recipe 1: Event Scheduler with Priority
interface Event {
    id: string;
    priority: number;
    timestamp: number;
    data: any;
}

class EventScheduler {
    private eventQueue: PriorityQueue<Event>;
    private currentTime: number = 0;
    
    constructor() {
        this.eventQueue = new PriorityQueue<Event>((a, b) => {
            // First by timestamp, then by priority
            if (a.timestamp !== b.timestamp) {
                return a.timestamp - b.timestamp;
            }
            return b.priority - a.priority; // Higher priority first
        });
    }
    
    scheduleEvent(id: string, delay: number, priority: number = 0, data: any = null): void {
        const event: Event = {
            id,
            priority,
            timestamp: this.currentTime + delay,
            data
        };
        this.eventQueue.enqueue(event);
    }
    
    processEvents(until: number): Event[] {
        const processedEvents: Event[] = [];
        
        while (!this.eventQueue.isEmpty() && this.eventQueue.peek()!.timestamp <= until) {
            const event = this.eventQueue.dequeue()!;
            processedEvents.push(event);
            this.currentTime = event.timestamp;
        }
        
        this.currentTime = until;
        return processedEvents;
    }
    
    getNextEventTime(): number | null {
        return this.eventQueue.peek()?.timestamp || null;
    }
}

// Recipe 2: Advanced Median Finder with Remove
class AdvancedMedianFinder {
    private maxHeap: PriorityQueue<number>; // Lower half
    private minHeap: PriorityQueue<number>; // Upper half
    private toRemove: Map<number, number> = new Map(); // Lazy deletion
    
    constructor() {
        this.maxHeap = new PriorityQueue<number>((a, b) => b - a);
        this.minHeap = new PriorityQueue<number>((a, b) => a - b);
    }
    
    addNum(num: number): void {
        this.maxHeap.enqueue(num);
        this.minHeap.enqueue(this.maxHeap.dequeue()!);
        
        if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.enqueue(this.minHeap.dequeue()!);
        }
        
        this.cleanupHeaps();
    }
    
    removeNum(num: number): boolean {
        const count = this.toRemove.get(num) || 0;
        this.toRemove.set(num, count + 1);
        
        this.cleanupHeaps();
        return true;
    }
    
    findMedian(): number {
        this.cleanupHeaps();
        
        const maxSize = this.getActualSize(this.maxHeap);
        const minSize = this.getActualSize(this.minHeap);
        
        if (maxSize > minSize) {
            return this.getValidTop(this.maxHeap);
        }
        
        return (this.getValidTop(this.maxHeap) + this.getValidTop(this.minHeap)) / 2;
    }
    
    private cleanupHeaps(): void {
        this.cleanupHeap(this.maxHeap);
        this.cleanupHeap(this.minHeap);
    }
    
    private cleanupHeap(heap: PriorityQueue<number>): void {
        while (!heap.isEmpty() && this.shouldRemove(heap.peek()!)) {
            const top = heap.dequeue()!;
            const count = this.toRemove.get(top)!;
            if (count === 1) {
                this.toRemove.delete(top);
            } else {
                this.toRemove.set(top, count - 1);
            }
        }
    }
    
    private shouldRemove(num: number): boolean {
        return (this.toRemove.get(num) || 0) > 0;
    }
    
    private getActualSize(heap: PriorityQueue<number>): number {
        let size = heap.size();
        const items = [...(heap as any).items];
        
        for (const item of items) {
            if (this.shouldRemove(item)) {
                size--;
            }
        }
        
        return size;
    }
    
    private getValidTop(heap: PriorityQueue<number>): number {
        this.cleanupHeap(heap);
        return heap.peek()!;
    }
}

// Recipe 3: Multi-Level Feedback Queue
interface Task {
    id: string;
    priority: number;
    remainingTime: number;
    arrivalTime: number;
}

class MultilevelFeedbackQueue {
    private queues: PriorityQueue<Task>[];
    private timeQuantums: number[];
    private currentTime: number = 0;
    
    constructor(levels: number = 3) {
        this.queues = [];
        this.timeQuantums = [];
        
        for (let i = 0; i < levels; i++) {
            this.queues.push(new PriorityQueue<Task>((a, b) => a.arrivalTime - b.arrivalTime));
            this.timeQuantums.push(Math.pow(2, i + 1)); // Exponential time quantum
        }
    }
    
    addTask(task: Task): void {
        this.queues[0].enqueue(task);
    }
    
    executeNext(): Task | null {
        for (let level = 0; level < this.queues.length; level++) {
            const queue = this.queues[level];
            
            if (!queue.isEmpty()) {
                const task = queue.dequeue()!;
                const quantum = this.timeQuantums[level];
                const executeTime = Math.min(task.remainingTime, quantum);
                
                task.remainingTime -= executeTime;
                this.currentTime += executeTime;
                
                if (task.remainingTime > 0) {
                    // Move to next level (lower priority)
                    const nextLevel = Math.min(level + 1, this.queues.length - 1);
                    this.queues[nextLevel].enqueue(task);
                }
                
                return task;
            }
        }
        
        return null;
    }
    
    getCurrentTime(): number {
        return this.currentTime;
    }
}

// Recipe 4: Memory Pool Manager
interface MemoryBlock {
    size: number;
    address: number;
    isFree: boolean;
}

class MemoryPoolManager {
    private freeBlocks: PriorityQueue<MemoryBlock>; // Min heap by size
    private allocatedBlocks: Map<number, MemoryBlock> = new Map();
    private totalSize: number;
    
    constructor(totalSize: number) {
        this.totalSize = totalSize;
        this.freeBlocks = new PriorityQueue<MemoryBlock>((a, b) => a.size - b.size);
        
        // Initial free block
        this.freeBlocks.enqueue({
            size: totalSize,
            address: 0,
            isFree: true
        });
    }
    
    allocate(size: number): number | null {
        // Find smallest fitting block
        let bestBlock: MemoryBlock | null = null;
        const tempQueue = new PriorityQueue<MemoryBlock>((a, b) => a.size - b.size);
        
        while (!this.freeBlocks.isEmpty()) {
            const block = this.freeBlocks.dequeue()!;
            
            if (block.size >= size && (bestBlock === null || block.size < bestBlock.size)) {
                if (bestBlock) tempQueue.enqueue(bestBlock);
                bestBlock = block;
            } else {
                tempQueue.enqueue(block);
            }
        }
        
        // Restore blocks to heap
        while (!tempQueue.isEmpty()) {
            this.freeBlocks.enqueue(tempQueue.dequeue()!);
        }
        
        if (!bestBlock) {
            return null; // Out of memory
        }
        
        // Split block if necessary
        if (bestBlock.size > size) {
            const remainingBlock: MemoryBlock = {
                size: bestBlock.size - size,
                address: bestBlock.address + size,
                isFree: true
            };
            this.freeBlocks.enqueue(remainingBlock);
        }
        
        // Allocate block
        const allocatedBlock: MemoryBlock = {
            size,
            address: bestBlock.address,
            isFree: false
        };
        
        this.allocatedBlocks.set(bestBlock.address, allocatedBlock);
        return bestBlock.address;
    }
    
    deallocate(address: number): boolean {
        const block = this.allocatedBlocks.get(address);
        if (!block) {
            return false;
        }
        
        this.allocatedBlocks.delete(address);
        block.isFree = true;
        this.freeBlocks.enqueue(block);
        
        // TODO: Coalesce adjacent free blocks
        return true;
    }
    
    getFragmentation(): number {
        let freeSpace = 0;
        let largestFreeBlock = 0;
        
        const tempQueue = new PriorityQueue<MemoryBlock>((a, b) => a.size - b.size);
        
        while (!this.freeBlocks.isEmpty()) {
            const block = this.freeBlocks.dequeue()!;
            freeSpace += block.size;
            largestFreeBlock = Math.max(largestFreeBlock, block.size);
            tempQueue.enqueue(block);
        }
        
        // Restore blocks
        while (!tempQueue.isEmpty()) {
            this.freeBlocks.enqueue(tempQueue.dequeue()!);
        }
        
        return freeSpace > 0 ? 1 - (largestFreeBlock / freeSpace) : 0;
    }
}

// Test examples
const eventScheduler = new EventScheduler();
eventScheduler.scheduleEvent('task1', 10, 1);
eventScheduler.scheduleEvent('task2', 5, 2);
eventScheduler.scheduleEvent('task3', 15, 0);

console.log('Events processed:', eventScheduler.processEvents(20));

const medianFinder = new AdvancedMedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
medianFinder.addNum(3);
console.log('Median before removal:', medianFinder.findMedian()); // 2
medianFinder.removeNum(2);
console.log('Median after removal:', medianFinder.findMedian()); // 1.5

const mlfq = new MultilevelFeedbackQueue();
mlfq.addTask({ id: 'A', priority: 0, remainingTime: 8, arrivalTime: 0 });
mlfq.addTask({ id: 'B', priority: 0, remainingTime: 4, arrivalTime: 1 });

console.log('Next task:', mlfq.executeNext());
console.log('Current time:', mlfq.getCurrentTime());

const memoryManager = new MemoryPoolManager(1024);
const addr1 = memoryManager.allocate(100);
const addr2 = memoryManager.allocate(200);
console.log('Allocated addresses:', addr1, addr2);
console.log('Fragmentation:', memoryManager.getFragmentation());
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Comparator irány**: min-heap vs max-heap összekeverése, helytelen összehasonlító függvény
- **Heap property**: parent-child relációk megsértése heapify műveletek során
- **Index calculation**: parent/child index számítási hibák (0-based vs 1-based)
- **Empty heap**: peek/dequeue hívása üres heap-en ellenőrzés nélkül
- **Stability**: heap nem stabil rendezés, egyenlő elemek sorrendje változhat

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Operating systems**: CPU scheduling, memory management
- **Network routing**: shortest path algorithms, load balancing
- **Game development**: A* pathfinding, event systems
- **Database systems**: query optimization, index management
- **Real-time systems**: priority-based task scheduling

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor használjunk heap-et array rendezés helyett?
<details><summary>Válasz mutatása</summary>
Ha csak a top-K elemet kell, streaming adatoknál, vagy prioritás alapú feldolgozásnál. Heap: O(n log k), rendezés: O(n log n).
</details>

2. Mi a különbség binary heap és d-ary heap között?
<details><summary>Válasz mutatása</summary>
Binary heap: 2 gyerek/node. D-ary heap: d gyerek/node. D-ary jobb cache locality-t ad, de bonyolultabb implementáció.
</details>

3. Hogyan implementálunk heap-et dinamikus prioritás változtatással?
<details><summary>Válasz mutatása</summary>
Index tracking Map-pel + heapify up/down kombinációval, vagy indexed heap használatával. Lazy deletion is lehetőség.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Design a task scheduler with priorities"** → Multi-level priority queue design
2. **"Merge K sorted streams in real-time"** → Heap-based merging with streaming data
3. **"Find running median of data stream"** → Two heaps technique explanation
4. **"Implement a memory allocator"** → Free block management with heaps
5. **"Design Twitter timeline"** → Priority queue for tweet ranking and feeds

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Heapsort` · `Dijkstra's Algorithm` · `A* Search` · `Huffman Coding` · `Prim's MST`

</div>

<div class="tags">
  <span class="tag">heap</span>
  <span class="tag">priority-queue</span>
  <span class="tag">patterns</span>
  <span class="tag">algorithms</span>
  <span class="tag">data-structures</span>
  <span class="tag">junior</span>
</div>

## 4. Gráf algoritmusok

### BFS/DFS - Szélességi és Mélységi Keresés {#bfs-dfs}
<!-- tags: bfs, dfs, graph, traversal, search, level-order, path-finding, junior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*A BFS (Breadth-First Search) olyan, mint a víz terjedése: minden irányban egyszerre, rétegről rétegre. A DFS (Depth-First Search) mint egy labirintus feltérképezése: egy úton megyünk a végéig, aztán visszatérünk és próbálunk másikat. Mindkettő alapvető gráfbejárási módszer, de különböző problémákra optimalizáltak.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **BFS idő**: O(V + E) - minden csúcs és él egyszer
- **DFS idő**: O(V + E) - minden csúcs és él egyszer
- **BFS memória**: O(V) - queue tárolás
- **DFS memória**: O(V) - stack/rekurzió (legrosszabb esetben)
- **Shortest path (unweighted)**: BFS O(V + E), DFS nem garantált

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**BFS - Breadth-First Search**
```pseudo
FUNCTION BFS(graph, startNode)
  queue ← NEW QUEUE
  visited ← NEW SET
  distances ← NEW MAP
  
  ENQUEUE(queue, startNode)
  ADD(visited, startNode)
  distances[startNode] ← 0
  
  WHILE NOT EMPTY(queue) DO
    current ← DEQUEUE(queue)
    
    FOR EACH neighbor IN graph[current] DO
      IF neighbor NOT IN visited THEN
        ADD(visited, neighbor)
        distances[neighbor] ← distances[current] + 1
        ENQUEUE(queue, neighbor)
      END IF
    END FOR
  END WHILE
  
  RETURN distances
END FUNCTION
```

**DFS - Depth-First Search (Recursive)**
```pseudo
PROCEDURE DFS(graph, node, visited, path)
  ADD(visited, node)
  APPEND(path, node)
  
  FOR EACH neighbor IN graph[node] DO
    IF neighbor NOT IN visited THEN
      DFS(graph, neighbor, visited, path)
    END IF
  END FOR
END PROCEDURE
```

**DFS - Iterative with Stack**
```pseudo
FUNCTION DFS_Iterative(graph, startNode)
  stack ← NEW STACK
  visited ← NEW SET
  path ← EMPTY_LIST
  
  PUSH(stack, startNode)
  
  WHILE NOT EMPTY(stack) DO
    current ← POP(stack)
    
    IF current NOT IN visited THEN
      ADD(visited, current)
      APPEND(path, current)
      
      // Add neighbors in reverse order for consistent traversal
      FOR neighbor IN REVERSE(graph[current]) DO
        IF neighbor NOT IN visited THEN
          PUSH(stack, neighbor)
        END IF
      END FOR
    END IF
  END WHILE
  
  RETURN path
END FUNCTION
```

**Applications:**
```pseudo
// 1. Shortest path (unweighted) - BFS
// 2. Connected components - DFS/BFS
// 3. Cycle detection - DFS with colors
// 4. Topological sort - DFS based
// 5. Maze solving - DFS backtracking
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class GraphTraversal {
    
    // Graph representation with adjacency list
    static class Graph {
        private Map<Integer, List<Integer>> adjacencyList;
        
        public Graph() {
            this.adjacencyList = new HashMap<>();
        }
        
        public void addEdge(int from, int to) {
            adjacencyList.computeIfAbsent(from, k -> new ArrayList<>()).add(to);
            adjacencyList.computeIfAbsent(to, k -> new ArrayList<>()).add(from); // Undirected
        }
        
        public void addDirectedEdge(int from, int to) {
            adjacencyList.computeIfAbsent(from, k -> new ArrayList<>()).add(to);
        }
        
        public List<Integer> getNeighbors(int node) {
            return adjacencyList.getOrDefault(node, new ArrayList<>());
        }
        
        public Set<Integer> getAllNodes() {
            return adjacencyList.keySet();
        }
    }
    
    // BFS Implementation with multiple features
    public static Map<String, Object> BFS(Graph graph, int startNode) {
        Queue<Integer> queue = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();
        Map<Integer, Integer> distances = new HashMap<>();
        Map<Integer, Integer> parent = new HashMap<>();
        List<Integer> bfsOrder = new ArrayList<>();
        
        queue.offer(startNode);
        visited.add(startNode);
        distances.put(startNode, 0);
        parent.put(startNode, -1);
        
        while (!queue.isEmpty()) {
            int current = queue.poll();
            bfsOrder.add(current);
            
            for (int neighbor : graph.getNeighbors(current)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    distances.put(neighbor, distances.get(current) + 1);
                    parent.put(neighbor, current);
                    queue.offer(neighbor);
                }
            }
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("distances", distances);
        result.put("parent", parent);
        result.put("bfsOrder", bfsOrder);
        result.put("visited", visited);
        
        return result;
    }
    
    // DFS Recursive Implementation
    public static void DFS(Graph graph, int node, Set<Integer> visited, List<Integer> path) {
        visited.add(node);
        path.add(node);
        
        for (int neighbor : graph.getNeighbors(node)) {
            if (!visited.contains(neighbor)) {
                DFS(graph, neighbor, visited, path);
            }
        }
    }
    
    // DFS Iterative Implementation
    public static List<Integer> DFSIterative(Graph graph, int startNode) {
        Stack<Integer> stack = new Stack<>();
        Set<Integer> visited = new HashSet<>();
        List<Integer> path = new ArrayList<>();
        
        stack.push(startNode);
        
        while (!stack.isEmpty()) {
            int current = stack.pop();
            
            if (!visited.contains(current)) {
                visited.add(current);
                path.add(current);
                
                // Add neighbors in reverse order for consistent traversal
                List<Integer> neighbors = new ArrayList<>(graph.getNeighbors(current));
                Collections.reverse(neighbors);
                
                for (int neighbor : neighbors) {
                    if (!visited.contains(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        
        return path;
    }
    
    // Find shortest path using BFS
    public static List<Integer> shortestPath(Graph graph, int start, int target) {
        Map<String, Object> bfsResult = BFS(graph, start);
        @SuppressWarnings("unchecked")
        Map<Integer, Integer> parent = (Map<Integer, Integer>) bfsResult.get("parent");
        
        if (!parent.containsKey(target)) {
            return new ArrayList<>(); // No path found
        }
        
        List<Integer> path = new ArrayList<>();
        int current = target;
        
        while (current != -1) {
            path.add(0, current); // Add to beginning
            current = parent.get(current);
        }
        
        return path;
    }
    
    // Find all connected components using DFS
    public static List<List<Integer>> findConnectedComponents(Graph graph) {
        Set<Integer> globalVisited = new HashSet<>();
        List<List<Integer>> components = new ArrayList<>();
        
        for (int node : graph.getAllNodes()) {
            if (!globalVisited.contains(node)) {
                List<Integer> component = new ArrayList<>();
                DFS(graph, node, globalVisited, component);
                components.add(component);
            }
        }
        
        return components;
    }
    
    // Cycle detection using DFS with colors
    public static boolean hasCycle(Graph graph) {
        Set<Integer> white = new HashSet<>(graph.getAllNodes()); // Unvisited
        Set<Integer> gray = new HashSet<>();  // Currently processing
        Set<Integer> black = new HashSet<>(); // Completely processed
        
        for (int node : graph.getAllNodes()) {
            if (white.contains(node)) {
                if (hasCycleDFS(graph, node, white, gray, black)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    private static boolean hasCycleDFS(Graph graph, int node, 
                                      Set<Integer> white, Set<Integer> gray, Set<Integer> black) {
        white.remove(node);
        gray.add(node);
        
        for (int neighbor : graph.getNeighbors(node)) {
            if (gray.contains(neighbor)) {
                return true; // Back edge found
            }
            
            if (white.contains(neighbor) && hasCycleDFS(graph, neighbor, white, gray, black)) {
                return true;
            }
        }
        
        gray.remove(node);
        black.add(node);
        return false;
    }
    
    // Bipartite check using BFS
    public static boolean isBipartite(Graph graph) {
        Map<Integer, Integer> colors = new HashMap<>();
        
        for (int startNode : graph.getAllNodes()) {
            if (!colors.containsKey(startNode)) {
                Queue<Integer> queue = new LinkedList<>();
                queue.offer(startNode);
                colors.put(startNode, 0);
                
                while (!queue.isEmpty()) {
                    int node = queue.poll();
                    
                    for (int neighbor : graph.getNeighbors(node)) {
                        if (!colors.containsKey(neighbor)) {
                            colors.put(neighbor, 1 - colors.get(node));
                            queue.offer(neighbor);
                        } else if (colors.get(neighbor).equals(colors.get(node))) {
                            return false; // Same color for adjacent nodes
                        }
                    }
                }
            }
        }
        
        return true;
    }
    
    // Level-order traversal (BFS variant)
    public static List<List<Integer>> levelOrder(Graph graph, int startNode) {
        List<List<Integer>> levels = new ArrayList<>();
        Queue<Integer> queue = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();
        
        queue.offer(startNode);
        visited.add(startNode);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                int node = queue.poll();
                currentLevel.add(node);
                
                for (int neighbor : graph.getNeighbors(node)) {
                    if (!visited.contains(neighbor)) {
                        visited.add(neighbor);
                        queue.offer(neighbor);
                    }
                }
            }
            
            levels.add(currentLevel);
        }
        
        return levels;
    }
    
    // Grid-based BFS (for maze-like problems)
    public static int[][] directions = { {-1, 0}, {1, 0}, {0, -1}, {0, 1} };
    
    public static int shortestPathInGrid(int[][] grid, int[] start, int[] target) {
        int rows = grid.length;
        int cols = grid[0].length;
        
        if (grid[start[0]][start[1]] == 1 || grid[target[0]][target[1]] == 1) {
            return -1; // Start or target is blocked
        }
        
        Queue<int[]> queue = new LinkedList<>();
        boolean[][] visited = new boolean[rows][cols];
        
        queue.offer(new int[]{start[0], start[1], 0}); // x, y, distance
        visited[start[0]][start[1]] = true;
        
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int x = current[0], y = current[1], dist = current[2];
            
            if (x == target[0] && y == target[1]) {
                return dist;
            }
            
            for (int[] dir : directions) {
                int newX = x + dir[0];
                int newY = y + dir[1];
                
                if (newX >= 0 && newX < rows && newY >= 0 && newY < cols &&
                    !visited[newX][newY] && grid[newX][newY] == 0) {
                    
                    visited[newX][newY] = true;
                    queue.offer(new int[]{newX, newY, dist + 1});
                }
            }
        }
        
        return -1; // No path found
    }
    
    // Test
    public static void main(String[] args) {
        Graph graph = new Graph();
        
        // Build sample graph
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 4);
        graph.addEdge(3, 5);
        graph.addEdge(4, 5);
        
        // Test BFS
        Map<String, Object> bfsResult = BFS(graph, 0);
        System.out.println("BFS distances: " + bfsResult.get("distances"));
        System.out.println("BFS order: " + bfsResult.get("bfsOrder"));
        
        // Test DFS
        Set<Integer> visited = new HashSet<>();
        List<Integer> dfsPath = new ArrayList<>();
        DFS(graph, 0, visited, dfsPath);
        System.out.println("DFS path: " + dfsPath);
        
        // Test shortest path
        List<Integer> path = shortestPath(graph, 0, 5);
        System.out.println("Shortest path 0->5: " + path);
        
        // Test connected components
        List<List<Integer>> components = findConnectedComponents(graph);
        System.out.println("Connected components: " + components);
        
        // Test bipartite
        System.out.println("Is bipartite: " + isBipartite(graph));
        
        // Test grid BFS
        int[][] grid = {
            {0, 0, 1, 0},
            {0, 1, 0, 0},
            {0, 0, 0, 1},
            {1, 0, 0, 0}
        };
        int distance = shortestPathInGrid(grid, new int[]{0, 0}, new int[]{3, 3});
        System.out.println("Grid shortest path: " + distance);
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Graph class with adjacency list representation
class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
    
    addEdge(from, to, directed = false) {
        if (!this.adjacencyList.has(from)) {
            this.adjacencyList.set(from, []);
        }
        if (!this.adjacencyList.has(to)) {
            this.adjacencyList.set(to, []);
        }
        
        this.adjacencyList.get(from).push(to);
        
        if (!directed) {
            this.adjacencyList.get(to).push(from);
        }
    }
    
    getNeighbors(node) {
        return this.adjacencyList.get(node) || [];
    }
    
    getAllNodes() {
        return Array.from(this.adjacencyList.keys());
    }
    
    hasNode(node) {
        return this.adjacencyList.has(node);
    }
}

// BFS Implementation
function BFS(graph, startNode) {
    const queue = [startNode];
    const visited = new Set([startNode]);
    const distances = new Map([[startNode, 0]]);
    const parent = new Map([[startNode, null]]);
    const bfsOrder = [];
    
    while (queue.length > 0) {
        const current = queue.shift();
        bfsOrder.push(current);
        
        for (const neighbor of graph.getNeighbors(current)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                distances.set(neighbor, distances.get(current) + 1);
                parent.set(neighbor, current);
                queue.push(neighbor);
            }
        }
    }
    
    return {
        distances,
        parent,
        bfsOrder,
        visited: Array.from(visited)
    };
}

// DFS Recursive Implementation
function DFS(graph, node, visited = new Set(), path = []) {
    visited.add(node);
    path.push(node);
    
    for (const neighbor of graph.getNeighbors(node)) {
        if (!visited.has(neighbor)) {
            DFS(graph, neighbor, visited, path);
        }
    }
    
    return path;
}

// DFS Iterative Implementation
function DFSIterative(graph, startNode) {
    const stack = [startNode];
    const visited = new Set();
    const path = [];
    
    while (stack.length > 0) {
        const current = stack.pop();
        
        if (!visited.has(current)) {
            visited.add(current);
            path.push(current);
            
            // Add neighbors in reverse order for consistent traversal
            const neighbors = [...graph.getNeighbors(current)].reverse();
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    
    return path;
}

// Find shortest path using BFS
function shortestPath(graph, start, target) {
    const { parent } = BFS(graph, start);
    
    if (!parent.has(target)) {
        return []; // No path found
    }
    
    const path = [];
    let current = target;
    
    while (current !== null) {
        path.unshift(current); // Add to beginning
        current = parent.get(current);
    }
    
    return path;
}

// Find all connected components
function findConnectedComponents(graph) {
    const globalVisited = new Set();
    const components = [];
    
    for (const node of graph.getAllNodes()) {
        if (!globalVisited.has(node)) {
            const component = [];
            DFS(graph, node, globalVisited, component);
            components.push(component);
        }
    }
    
    return components;
}

// Cycle detection using DFS with colors
function hasCycle(graph) {
    const white = new Set(graph.getAllNodes()); // Unvisited
    const gray = new Set();  // Currently processing
    const black = new Set(); // Completely processed
    
    function hasCycleDFS(node) {
        white.delete(node);
        gray.add(node);
        
        for (const neighbor of graph.getNeighbors(node)) {
            if (gray.has(neighbor)) {
                return true; // Back edge found
            }
            
            if (white.has(neighbor) && hasCycleDFS(neighbor)) {
                return true;
            }
        }
        
        gray.delete(node);
        black.add(node);
        return false;
    }
    
    for (const node of graph.getAllNodes()) {
        if (white.has(node)) {
            if (hasCycleDFS(node)) {
                return true;
            }
        }
    }
    
    return false;
}

// Bipartite check using BFS
function isBipartite(graph) {
    const colors = new Map();
    
    for (const startNode of graph.getAllNodes()) {
        if (!colors.has(startNode)) {
            const queue = [startNode];
            colors.set(startNode, 0);
            
            while (queue.length > 0) {
                const node = queue.shift();
                
                for (const neighbor of graph.getNeighbors(node)) {
                    if (!colors.has(neighbor)) {
                        colors.set(neighbor, 1 - colors.get(node));
                        queue.push(neighbor);
                    } else if (colors.get(neighbor) === colors.get(node)) {
                        return false; // Same color for adjacent nodes
                    }
                }
            }
        }
    }
    
    return true;
}

// Level-order traversal
function levelOrder(graph, startNode) {
    const levels = [];
    const queue = [startNode];
    const visited = new Set([startNode]);
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node);
            
            for (const neighbor of graph.getNeighbors(node)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        
        levels.push(currentLevel);
    }
    
    return levels;
}

// Grid-based BFS for maze-like problems
function shortestPathInGrid(grid, start, target) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    if (grid[start[0]][start[1]] === 1 || grid[target[0]][target[1]] === 1) {
        return -1; // Start or target is blocked
    }
    
    const queue = [[start[0], start[1], 0]]; // x, y, distance
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    
    visited[start[0]][start[1]] = true;
    
    while (queue.length > 0) {
        const [x, y, dist] = queue.shift();
        
        if (x === target[0] && y === target[1]) {
            return dist;
        }
        
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            
            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols &&
                !visited[newX][newY] && grid[newX][newY] === 0) {
                
                visited[newX][newY] = true;
                queue.push([newX, newY, dist + 1]);
            }
        }
    }
    
    return -1; // No path found
}

// Multi-source BFS (useful for problems like "01 Matrix")
function multiSourceBFS(grid, sources) {
    const rows = grid.length;
    const cols = grid[0].length;
    const distances = Array(rows).fill().map(() => Array(cols).fill(Infinity));
    const queue = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    // Initialize all sources with distance 0
    for (const [r, c] of sources) {
        distances[r][c] = 0;
        queue.push([r, c, 0]);
    }
    
    while (queue.length > 0) {
        const [x, y, dist] = queue.shift();
        
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            
            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols &&
                distances[newX][newY] > dist + 1) {
                
                distances[newX][newY] = dist + 1;
                queue.push([newX, newY, dist + 1]);
            }
        }
    }
    
    return distances;
}

// Word Ladder problem using BFS
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    
    if (!wordSet.has(endWord)) {
        return 0;
    }
    
    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);
    
    while (queue.length > 0) {
        const [word, length] = queue.shift();
        
        if (word === endWord) {
            return length;
        }
        
        // Generate all possible next words
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                const char = String.fromCharCode(c);
                if (char === word[i]) continue;
                
                const nextWord = word.substring(0, i) + char + word.substring(i + 1);
                
                if (wordSet.has(nextWord) && !visited.has(nextWord)) {
                    visited.add(nextWord);
                    queue.push([nextWord, length + 1]);
                }
            }
        }
    }
    
    return 0;
}

// Test examples
console.log("=== Graph Traversal Tests ===");

const graph = new Graph();

// Build sample graph
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 5);
graph.addEdge(4, 5);

// Test BFS
const bfsResult = BFS(graph, 0);
console.log("BFS distances:", Object.fromEntries(bfsResult.distances));
console.log("BFS order:", bfsResult.bfsOrder);

// Test DFS
const dfsPath = DFS(graph, 0);
console.log("DFS path:", dfsPath);

// Test shortest path
const path = shortestPath(graph, 0, 5);
console.log("Shortest path 0->5:", path);

// Test connected components
const components = findConnectedComponents(graph);
console.log("Connected components:", components);

// Test bipartite
console.log("Is bipartite:", isBipartite(graph));

// Test grid BFS
const grid = [
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [1, 0, 0, 0]
];
const distance = shortestPathInGrid(grid, [0, 0], [3, 3]);
console.log("Grid shortest path:", distance);

// Test word ladder
const wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
const ladderLen = ladderLength("hit", "cog", wordList);
console.log("Word ladder length:", ladderLen);
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Graph interface and implementation
interface IGraph<T> {
    addEdge(from: T, to: T, directed?: boolean): void;
    getNeighbors(node: T): T[];
    getAllNodes(): T[];
    hasNode(node: T): boolean;
}

class Graph<T> implements IGraph<T> {
    private adjacencyList: Map<T, T[]> = new Map();
    
    addEdge(from: T, to: T, directed: boolean = false): void {
        if (!this.adjacencyList.has(from)) {
            this.adjacencyList.set(from, []);
        }
        if (!this.adjacencyList.has(to)) {
            this.adjacencyList.set(to, []);
        }
        
        this.adjacencyList.get(from)!.push(to);
        
        if (!directed) {
            this.adjacencyList.get(to)!.push(from);
        }
    }
    
    getNeighbors(node: T): T[] {
        return this.adjacencyList.get(node) || [];
    }
    
    getAllNodes(): T[] {
        return Array.from(this.adjacencyList.keys());
    }
    
    hasNode(node: T): boolean {
        return this.adjacencyList.has(node);
    }
}

// BFS Result interface
interface BFSResult<T> {
    distances: Map<T, number>;
    parent: Map<T, T | null>;
    bfsOrder: T[];
    visited: T[];
}

// Graph traversal algorithms
class GraphTraversal {
    
    static BFS<T>(graph: IGraph<T>, startNode: T): BFSResult<T> {
        const queue: T[] = [startNode];
        const visited = new Set<T>([startNode]);
        const distances = new Map<T, number>([[startNode, 0]]);
        const parent = new Map<T, T | null>([[startNode, null]]);
        const bfsOrder: T[] = [];
        
        while (queue.length > 0) {
            const current = queue.shift()!;
            bfsOrder.push(current);
            
            for (const neighbor of graph.getNeighbors(current)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    distances.set(neighbor, distances.get(current)! + 1);
                    parent.set(neighbor, current);
                    queue.push(neighbor);
                }
            }
        }
        
        return {
            distances,
            parent,
            bfsOrder,
            visited: Array.from(visited)
        };
    }
    
    static DFS<T>(graph: IGraph<T>, node: T, visited: Set<T> = new Set(), path: T[] = []): T[] {
        visited.add(node);
        path.push(node);
        
        for (const neighbor of graph.getNeighbors(node)) {
            if (!visited.has(neighbor)) {
                GraphTraversal.DFS(graph, neighbor, visited, path);
            }
        }
        
        return path;
    }
    
    static DFSIterative<T>(graph: IGraph<T>, startNode: T): T[] {
        const stack: T[] = [startNode];
        const visited = new Set<T>();
        const path: T[] = [];
        
        while (stack.length > 0) {
            const current = stack.pop()!;
            
            if (!visited.has(current)) {
                visited.add(current);
                path.push(current);
                
                // Add neighbors in reverse order for consistent traversal
                const neighbors = [...graph.getNeighbors(current)].reverse();
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        
        return path;
    }
    
    static shortestPath<T>(graph: IGraph<T>, start: T, target: T): T[] {
        const { parent } = GraphTraversal.BFS(graph, start);
        
        if (!parent.has(target)) {
            return []; // No path found
        }
        
        const path: T[] = [];
        let current: T | null = target;
        
        while (current !== null) {
            path.unshift(current); // Add to beginning
            current = parent.get(current)!;
        }
        
        return path;
    }
    
    static findConnectedComponents<T>(graph: IGraph<T>): T[][] {
        const globalVisited = new Set<T>();
        const components: T[][] = [];
        
        for (const node of graph.getAllNodes()) {
            if (!globalVisited.has(node)) {
                const component: T[] = [];
                GraphTraversal.DFS(graph, node, globalVisited, component);
                components.push(component);
            }
        }
        
        return components;
    }
    
    static hasCycle<T>(graph: IGraph<T>): boolean {
        const white = new Set<T>(graph.getAllNodes()); // Unvisited
        const gray = new Set<T>();  // Currently processing
        const black = new Set<T>(); // Completely processed
        
        function hasCycleDFS(node: T): boolean {
            white.delete(node);
            gray.add(node);
            
            for (const neighbor of graph.getNeighbors(node)) {
                if (gray.has(neighbor)) {
                    return true; // Back edge found
                }
                
                if (white.has(neighbor) && hasCycleDFS(neighbor)) {
                    return true;
                }
            }
            
            gray.delete(node);
            black.add(node);
            return false;
        }
        
        for (const node of graph.getAllNodes()) {
            if (white.has(node)) {
                if (hasCycleDFS(node)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    static isBipartite<T>(graph: IGraph<T>): boolean {
        const colors = new Map<T, number>();
        
        for (const startNode of graph.getAllNodes()) {
            if (!colors.has(startNode)) {
                const queue: T[] = [startNode];
                colors.set(startNode, 0);
                
                while (queue.length > 0) {
                    const node = queue.shift()!;
                    
                    for (const neighbor of graph.getNeighbors(node)) {
                        if (!colors.has(neighbor)) {
                            colors.set(neighbor, 1 - colors.get(node)!);
                            queue.push(neighbor);
                        } else if (colors.get(neighbor) === colors.get(node)) {
                            return false; // Same color for adjacent nodes
                        }
                    }
                }
            }
        }
        
        return true;
    }
}

// Grid-based traversal for 2D problems
type Coordinate = [number, number];
type GridCell = 0 | 1; // 0 = passable, 1 = blocked

class GridTraversal {
    private static readonly DIRECTIONS: Coordinate[] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    static shortestPathInGrid(grid: GridCell[][], start: Coordinate, target: Coordinate): number {
        const [rows, cols] = [grid.length, grid[0].length];
        
        if (grid[start[0]][start[1]] === 1 || grid[target[0]][target[1]] === 1) {
            return -1; // Start or target is blocked
        }
        
        const queue: [number, number, number][] = [[start[0], start[1], 0]];
        const visited: boolean[][] = Array(rows).fill(null).map(() => Array(cols).fill(false));
        
        visited[start[0]][start[1]] = true;
        
        while (queue.length > 0) {
            const [x, y, dist] = queue.shift()!;
            
            if (x === target[0] && y === target[1]) {
                return dist;
            }
            
            for (const [dx, dy] of GridTraversal.DIRECTIONS) {
                const newX = x + dx;
                const newY = y + dy;
                
                if (GridTraversal.isValidCell(newX, newY, rows, cols) &&
                    !visited[newX][newY] && grid[newX][newY] === 0) {
                    
                    visited[newX][newY] = true;
                    queue.push([newX, newY, dist + 1]);
                }
            }
        }
        
        return -1; // No path found
    }
    
    static multiSourceBFS(grid: GridCell[][], sources: Coordinate[]): number[][] {
        const [rows, cols] = [grid.length, grid[0].length];
        const distances: number[][] = Array(rows).fill(null).map(() => Array(cols).fill(Infinity));
        const queue: [number, number, number][] = [];
        
        // Initialize all sources with distance 0
        for (const [r, c] of sources) {
            distances[r][c] = 0;
            queue.push([r, c, 0]);
        }
        
        while (queue.length > 0) {
            const [x, y, dist] = queue.shift()!;
            
            for (const [dx, dy] of GridTraversal.DIRECTIONS) {
                const newX = x + dx;
                const newY = y + dy;
                
                if (GridTraversal.isValidCell(newX, newY, rows, cols) &&
                    distances[newX][newY] > dist + 1) {
                    
                    distances[newX][newY] = dist + 1;
                    queue.push([newX, newY, dist + 1]);
                }
            }
        }
        
        return distances;
    }
    
    static floodFill(grid: number[][], start: Coordinate, newColor: number): number[][] {
        const result = grid.map(row => [...row]); // Deep copy
        const originalColor = result[start[0]][start[1]];
        
        if (originalColor === newColor) {
            return result;
        }
        
        const stack: Coordinate[] = [start];
        
        while (stack.length > 0) {
            const [x, y] = stack.pop()!;
            
            if (result[x][y] === originalColor) {
                result[x][y] = newColor;
                
                for (const [dx, dy] of GridTraversal.DIRECTIONS) {
                    const newX = x + dx;
                    const newY = y + dy;
                    
                    if (GridTraversal.isValidCell(newX, newY, result.length, result[0].length) &&
                        result[newX][newY] === originalColor) {
                        stack.push([newX, newY]);
                    }
                }
            }
        }
        
        return result;
    }
    
    private static isValidCell(x: number, y: number, rows: number, cols: number): boolean {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}

// Advanced graph algorithms
class AdvancedGraphAlgorithms {
    
    // Topological sort using DFS
    static topologicalSort<T>(graph: IGraph<T>): T[] {
        const visited = new Set<T>();
        const stack: T[] = [];
        
        function topologicalSortDFS(node: T): void {
            visited.add(node);
            
            for (const neighbor of graph.getNeighbors(node)) {
                if (!visited.has(neighbor)) {
                    topologicalSortDFS(neighbor);
                }
            }
            
            stack.push(node);
        }
        
        for (const node of graph.getAllNodes()) {
            if (!visited.has(node)) {
                topologicalSortDFS(node);
            }
        }
        
        return stack.reverse();
    }
    
    // Find strongly connected components (Kosaraju's algorithm)
    static stronglyConnectedComponents<T>(graph: IGraph<T>): T[][] {
        const visited = new Set<T>();
        const finishOrder: T[] = [];
        
        // First DFS to get finish order
        function firstDFS(node: T): void {
            visited.add(node);
            
            for (const neighbor of graph.getNeighbors(node)) {
                if (!visited.has(neighbor)) {
                    firstDFS(neighbor);
                }
            }
            
            finishOrder.push(node);
        }
        
        for (const node of graph.getAllNodes()) {
            if (!visited.has(node)) {
                firstDFS(node);
            }
        }
        
        // Create transpose graph
        const transpose = new Graph<T>();
        for (const node of graph.getAllNodes()) {
            for (const neighbor of graph.getNeighbors(node)) {
                transpose.addEdge(neighbor, node, true);
            }
        }
        
        // Second DFS on transpose in reverse finish order
        visited.clear();
        const components: T[][] = [];
        
        for (const node of finishOrder.reverse()) {
            if (!visited.has(node)) {
                const component: T[] = [];
                GraphTraversal.DFS(transpose, node, visited, component);
                components.push(component);
            }
        }
        
        return components;
    }
}

// Test examples
const graph = new Graph<number>();

// Build sample graph
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 5);
graph.addEdge(4, 5);

// Test BFS
const bfsResult = GraphTraversal.BFS(graph, 0);
console.log("BFS distances:", Object.fromEntries(bfsResult.distances));
console.log("BFS order:", bfsResult.bfsOrder);

// Test DFS
const dfsPath = GraphTraversal.DFS(graph, 0);
console.log("DFS path:", dfsPath);

// Test shortest path
const path = GraphTraversal.shortestPath(graph, 0, 5);
console.log("Shortest path 0->5:", path);

// Test connected components
const components = GraphTraversal.findConnectedComponents(graph);
console.log("Connected components:", components);

// Test bipartite
console.log("Is bipartite:", GraphTraversal.isBipartite(graph));

// Test grid traversal
const grid: GridCell[][] = [
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [1, 0, 0, 0]
];
const distance = GridTraversal.shortestPathInGrid(grid, [0, 0], [3, 3]);
console.log("Grid shortest path:", distance);

// Test topological sort
const dag = new Graph<string>();
dag.addEdge("shirt", "tie", true);
dag.addEdge("tie", "jacket", true);
dag.addEdge("shirt", "belt", true);
dag.addEdge("belt", "jacket", true);

const topoOrder = AdvancedGraphAlgorithms.topologicalSort(dag);
console.log("Topological order:", topoOrder);
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Queue vs Stack**: BFS-hez queue, DFS-hez stack/rekurzió - gyakran összekeverik
- **Visited check**: Visited ellenőrzés hiánya → végtelen ciklus
- **Shortest path**: DFS nem garantálja a legrövidebb utat súlyozatlan gráfban
- **Grid boundaries**: 2D gráfokban boundary check hiánya → index out of bounds
- **Directed vs Undirected**: Gráf típus figyelmen kívül hagyása algoritmus választásnál

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Maze solving**: Grid-based BFS/DFS útkeresés
- **Social networks**: Connected components, friend recommendations
- **Game AI**: Pathfinding, state space search
- **Web crawling**: Link traversal, site mapping
- **Dependency resolution**: Topological sort, build systems

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor válasszunk BFS-t DFS helyett?
<details><summary>Válasz mutatása</summary>
BFS: legrövidebb út, level-order traversal, minimum steps. DFS: memory-efficient, topological sort, ciklus detektálás.
</details>

2. Mi a különbség a három DFS szín között?
<details><summary>Válasz mutatása</summary>
White: még nem látogatott. Gray: folyamatban lévő (stack-ben). Black: teljesen feldolgozott. Gray→Gray él = back edge (ciklus).
</details>

3. Hogyan működik a bipartite gráf ellenőrzés?
<details><summary>Válasz mutatása</summary>
2-coloring probléma: BFS/DFS közben színezzük a csúcsokat. Ha szomszédos csúcsok ugyanolyan színűek → nem bipartite.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Find shortest path in unweighted graph"** → BFS implementation
2. **"Detect cycle in directed/undirected graph"** → DFS with colors explanation
3. **"Clone a graph"** → DFS/BFS with node copying
4. **"Word ladder transformation"** → BFS on word graph
5. **"Course scheduling with prerequisites"** → Topological sort + cycle detection

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Dijkstra's Algorithm` · `A* Search` · `Topological Sort` · `Union-Find` · `Floyd-Warshall`

</div>

<div class="tags">
  <span class="tag">bfs</span>
  <span class="tag">dfs</span>
  <span class="tag">graph</span>
  <span class="tag">traversal</span>
  <span class="tag">search</span>
  <span class="tag">level-order</span>
  <span class="tag">path-finding</span>
  <span class="tag">junior</span>
</div>

### Dijkstra's Algorithm - Legrövidebb Út Algoritmus {#dijkstra}
<!-- tags: dijkstra, shortest-path, graph, weighted, priority-queue, medior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*A Dijkstra algoritmus olyan, mint egy okos GPS navigáció: mindig a legközelebbi, még fel nem fedezett helyet választja következőnek, és garantálja, hogy amikor elérünk egy célpontot, akkor a legrövidebb úton tettük meg. Nem negatív élsúlyokkal működő gráfokban talál optimális utat egy forrásból minden más csúcsba.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Binary heap**: O((V + E) log V) idő, O(V) memória
- **Fibonacci heap**: O(E + V log V) idő, O(V) memória (ritkán implementált)
- **Dense graph**: O(V²) egyszerű array-jel
- **Space**: O(V) - distances + priority queue storage
- **Path reconstruction**: +O(V) parent array

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```pseudo
FUNCTION Dijkstra(graph, startNode)
  distances ← NEW MAP  // Minden csúcshoz a távolság
  previous ← NEW MAP   // Út rekonstrukció
  visited ← NEW SET
  priorityQueue ← NEW MIN_HEAP
  
  // Inicializálás
  FOR EACH node IN graph DO
    distances[node] ← INFINITY
    previous[node] ← null
  END FOR
  
  distances[startNode] ← 0
  INSERT(priorityQueue, startNode, 0)
  
  WHILE NOT EMPTY(priorityQueue) DO
    current ← EXTRACT_MIN(priorityQueue)
    
    IF current IN visited THEN
      CONTINUE  // Skip if already processed
    END IF
        
    ADD(visited, current)
    
    FOR EACH neighbor IN NEIGHBORS(graph, current) DO
      IF neighbor NOT IN visited THEN
        newDistance ← distances[current] + WEIGHT(graph, current, neighbor)
        
        IF newDistance < distances[neighbor] THEN
          distances[neighbor] ← newDistance
          previous[neighbor] ← current
          INSERT(priorityQueue, neighbor, newDistance)
        END IF
      END IF
    END FOR
  END WHILE
  
  RETURN distances, previous
END FUNCTION

// Út rekonstrukció
FUNCTION ReconstructPath(previous, start, target)
  path ← EMPTY_LIST
  current ← target
  
  WHILE current ≠ null DO
    PREPEND(path, current)
    current ← previous[current]
  END WHILE
  
  IF path[0] = start THEN
    RETURN path
  ELSE
    RETURN EMPTY_LIST  // No path exists
  END IF
END FUNCTION
```

**Optimalizációs trükkök:**
```pseudo
// 1. Early termination: stop when target found
// 2. Bidirectional search: search from both ends
// 3. A* heuristic: guided search with admissible heuristic
// 4. Lazy deletion: mark nodes as processed in heap
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class DijkstraAlgorithm {
    
    // Edge representation
    static class Edge {
        int to;
        int weight;
        
        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }
    
    // Graph with weighted edges
    static class WeightedGraph {
        private Map<Integer, List<Edge>> adjacencyList;
        
        public WeightedGraph() {
            this.adjacencyList = new HashMap<>();
        }
        
        public void addEdge(int from, int to, int weight) {
            adjacencyList.computeIfAbsent(from, k -> new ArrayList<>()).add(new Edge(to, weight));
        }
        
        public void addUndirectedEdge(int from, int to, int weight) {
            addEdge(from, to, weight);
            addEdge(to, from, weight);
        }
        
        public List<Edge> getNeighbors(int node) {
            return adjacencyList.getOrDefault(node, new ArrayList<>());
        }
        
        public Set<Integer> getAllNodes() {
            return adjacencyList.keySet();
        }
    }
    
    // Node for priority queue
    static class Node implements Comparable<Node> {
        int vertex;
        int distance;
        
        Node(int vertex, int distance) {
            this.vertex = vertex;
            this.distance = distance;
        }
        
        @Override
        public int compareTo(Node other) {
            return Integer.compare(this.distance, other.distance);
        }
    }
    
    // Dijkstra result
    static class DijkstraResult {
        Map<Integer, Integer> distances;
        Map<Integer, Integer> previous;
        
        DijkstraResult(Map<Integer, Integer> distances, Map<Integer, Integer> previous) {
            this.distances = distances;
            this.previous = previous;
        }
    }
    
    // Main Dijkstra implementation
    public static DijkstraResult dijkstra(WeightedGraph graph, int startNode) {
        Map<Integer, Integer> distances = new HashMap<>();
        Map<Integer, Integer> previous = new HashMap<>();
        Set<Integer> visited = new HashSet<>();
        PriorityQueue<Node> pq = new PriorityQueue<>();
        
        // Initialize distances
        for (int node : graph.getAllNodes()) {
            distances.put(node, Integer.MAX_VALUE);
            previous.put(node, -1);
        }
        
        distances.put(startNode, 0);
        pq.offer(new Node(startNode, 0));
        
        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int currentVertex = current.vertex;
            
            if (visited.contains(currentVertex)) {
                continue; // Skip if already processed
            }
            
            visited.add(currentVertex);
            
            for (Edge edge : graph.getNeighbors(currentVertex)) {
                if (!visited.contains(edge.to)) {
                    int newDistance = distances.get(currentVertex) + edge.weight;
                    
                    if (newDistance < distances.get(edge.to)) {
                        distances.put(edge.to, newDistance);
                        previous.put(edge.to, currentVertex);
                        pq.offer(new Node(edge.to, newDistance));
                    }
                }
            }
        }
        
        return new DijkstraResult(distances, previous);
    }
    
    // Dijkstra with early termination for single target
    public static DijkstraResult dijkstraToTarget(WeightedGraph graph, int start, int target) {
        Map<Integer, Integer> distances = new HashMap<>();
        Map<Integer, Integer> previous = new HashMap<>();
        Set<Integer> visited = new HashSet<>();
        PriorityQueue<Node> pq = new PriorityQueue<>();
        
        // Initialize only reachable nodes
        distances.put(start, 0);
        previous.put(start, -1);
        pq.offer(new Node(start, 0));
        
        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int currentVertex = current.vertex;
            
            if (visited.contains(currentVertex)) {
                continue;
            }
            
            visited.add(currentVertex);
            
            // Early termination
            if (currentVertex == target) {
                break;
            }
            
            for (Edge edge : graph.getNeighbors(currentVertex)) {
                if (!visited.contains(edge.to)) {
                    int newDistance = distances.get(currentVertex) + edge.weight;
                    
                    if (!distances.containsKey(edge.to) || newDistance < distances.get(edge.to)) {
                        distances.put(edge.to, newDistance);
                        previous.put(edge.to, currentVertex);
                        pq.offer(new Node(edge.to, newDistance));
                    }
                }
            }
        }
        
        return new DijkstraResult(distances, previous);
    }
    
    // Reconstruct path from start to target
    public static List<Integer> reconstructPath(Map<Integer, Integer> previous, int start, int target) {
        List<Integer> path = new ArrayList<>();
        int current = target;
        
        while (current != -1) {
            path.add(0, current); // Add to beginning
            current = previous.getOrDefault(current, -1);
        }
        
        // Check if path is valid
        if (path.isEmpty() || path.get(0) != start) {
            return new ArrayList<>(); // No path found
        }
        
        return path;
    }
    
    // Find K shortest paths using modified Dijkstra
    public static List<List<Integer>> kShortestPaths(WeightedGraph graph, int start, int target, int k) {
        PriorityQueue<PathInfo> pq = new PriorityQueue<>();
        List<List<Integer>> results = new ArrayList<>();
        Map<Integer, Integer> visitCount = new HashMap<>();
        
        pq.offer(new PathInfo(start, 0, Arrays.asList(start)));
        
        while (!pq.isEmpty() && results.size() < k) {
            PathInfo current = pq.poll();
            int node = current.node;
            int cost = current.cost;
            List<Integer> path = current.path;
            
            visitCount.put(node, visitCount.getOrDefault(node, 0) + 1);
            
            if (node == target) {
                results.add(new ArrayList<>(path));
                continue;
            }
            
            // Pruning: allow at most k visits per node
            if (visitCount.get(node) <= k) {
                for (Edge edge : graph.getNeighbors(node)) {
                    if (!path.contains(edge.to)) { // Avoid cycles in path
                        List<Integer> newPath = new ArrayList<>(path);
                        newPath.add(edge.to);
                        pq.offer(new PathInfo(edge.to, cost + edge.weight, newPath));
                    }
                }
            }
        }
        
        return results;
    }
    
    static class PathInfo implements Comparable<PathInfo> {
        int node;
        int cost;
        List<Integer> path;
        
        PathInfo(int node, int cost, List<Integer> path) {
            this.node = node;
            this.cost = cost;
            this.path = path;
        }
        
        @Override
        public int compareTo(PathInfo other) {
            return Integer.compare(this.cost, other.cost);
        }
    }
    
    // A* algorithm (Dijkstra with heuristic)
    public static DijkstraResult aStar(WeightedGraph graph, int start, int target, 
                                      Map<Integer, Integer> heuristic) {
        Map<Integer, Integer> gScore = new HashMap<>();
        Map<Integer, Integer> fScore = new HashMap<>();
        Map<Integer, Integer> previous = new HashMap<>();
        Set<Integer> visited = new HashSet<>();
        PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> 
            Integer.compare(fScore.getOrDefault(a.vertex, Integer.MAX_VALUE),
                          fScore.getOrDefault(b.vertex, Integer.MAX_VALUE))
        );
        
        gScore.put(start, 0);
        fScore.put(start, heuristic.getOrDefault(start, 0));
        pq.offer(new Node(start, fScore.get(start)));
        
        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int currentVertex = current.vertex;
            
            if (visited.contains(currentVertex)) {
                continue;
            }
            
            visited.add(currentVertex);
            
            if (currentVertex == target) {
                break; // Found target
            }
            
            for (Edge edge : graph.getNeighbors(currentVertex)) {
                if (!visited.contains(edge.to)) {
                    int tentativeGScore = gScore.get(currentVertex) + edge.weight;
                    
                    if (tentativeGScore < gScore.getOrDefault(edge.to, Integer.MAX_VALUE)) {
                        previous.put(edge.to, currentVertex);
                        gScore.put(edge.to, tentativeGScore);
                        fScore.put(edge.to, tentativeGScore + heuristic.getOrDefault(edge.to, 0));
                        pq.offer(new Node(edge.to, fScore.get(edge.to)));
                    }
                }
            }
        }
        
        return new DijkstraResult(gScore, previous);
    }
    
    // All pairs shortest path using repeated Dijkstra
    public static Map<Integer, Map<Integer, Integer>> allPairsShortestPath(WeightedGraph graph) {
        Map<Integer, Map<Integer, Integer>> allDistances = new HashMap<>();
        
        for (int start : graph.getAllNodes()) {
            DijkstraResult result = dijkstra(graph, start);
            allDistances.put(start, result.distances);
        }
        
        return allDistances;
    }
    
    // Test
    public static void main(String[] args) {
        WeightedGraph graph = new WeightedGraph();
        
        // Build sample weighted graph
        graph.addUndirectedEdge(0, 1, 4);
        graph.addUndirectedEdge(0, 2, 2);
        graph.addUndirectedEdge(1, 2, 1);
        graph.addUndirectedEdge(1, 3, 5);
        graph.addUndirectedEdge(2, 3, 8);
        graph.addUndirectedEdge(2, 4, 10);
        graph.addUndirectedEdge(3, 4, 2);
        
        // Test Dijkstra
        DijkstraResult result = dijkstra(graph, 0);
        System.out.println("Distances from node 0: " + result.distances);
        
        // Test path reconstruction
        List<Integer> path = reconstructPath(result.previous, 0, 4);
        System.out.println("Path from 0 to 4: " + path);
        
        // Test single target
        DijkstraResult targetResult = dijkstraToTarget(graph, 0, 4);
        System.out.println("Distance to target 4: " + targetResult.distances.get(4));
        
        // Test K shortest paths
        List<List<Integer>> kPaths = kShortestPaths(graph, 0, 4, 3);
        System.out.println("3 shortest paths from 0 to 4:");
        for (int i = 0; i < kPaths.size(); i++) {
            System.out.println("Path " + (i + 1) + ": " + kPaths.get(i));
        }
        
        // Test A* with Manhattan distance heuristic (example)
        Map<Integer, Integer> heuristic = new HashMap<>();
        heuristic.put(0, 6); heuristic.put(1, 4); heuristic.put(2, 4);
        heuristic.put(3, 2); heuristic.put(4, 0);
        
        DijkstraResult astarResult = aStar(graph, 0, 4, heuristic);
        System.out.println("A* distance to target: " + astarResult.distances.get(4));
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Priority Queue implementation for Dijkstra
class PriorityQueue {
    constructor() {
        this.elements = [];
    }
    
    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }
    
    dequeue() {
        return this.elements.shift();
    }
    
    isEmpty() {
        return this.elements.length === 0;
    }
}

// Weighted Graph class
class WeightedGraph {
    constructor() {
        this.adjacencyList = new Map();
    }
    
    addEdge(from, to, weight) {
        if (!this.adjacencyList.has(from)) {
            this.adjacencyList.set(from, []);
        }
        this.adjacencyList.get(from).push({ to, weight });
    }
    
    addUndirectedEdge(from, to, weight) {
        this.addEdge(from, to, weight);
        this.addEdge(to, from, weight);
    }
    
    getNeighbors(node) {
        return this.adjacencyList.get(node) || [];
    }
    
    getAllNodes() {
        return Array.from(this.adjacencyList.keys());
    }
}

// Main Dijkstra implementation
function dijkstra(graph, startNode) {
    const distances = new Map();
    const previous = new Map();
    const visited = new Set();
    const pq = new PriorityQueue();
    
    // Initialize distances
    for (const node of graph.getAllNodes()) {
        distances.set(node, Infinity);
        previous.set(node, null);
    }
    
    distances.set(startNode, 0);
    pq.enqueue(startNode, 0);
    
    while (!pq.isEmpty()) {
        const { element: currentVertex } = pq.dequeue();
        
        if (visited.has(currentVertex)) {
            continue; // Skip if already processed
        }
        
        visited.add(currentVertex);
        
        for (const { to: neighbor, weight } of graph.getNeighbors(currentVertex)) {
            if (!visited.has(neighbor)) {
                const newDistance = distances.get(currentVertex) + weight;
                
                if (newDistance < distances.get(neighbor)) {
                    distances.set(neighbor, newDistance);
                    previous.set(neighbor, currentVertex);
                    pq.enqueue(neighbor, newDistance);
                }
            }
        }
    }
    
    return { distances, previous };
}

// Dijkstra with early termination
function dijkstraToTarget(graph, start, target) {
    const distances = new Map();
    const previous = new Map();
    const visited = new Set();
    const pq = new PriorityQueue();
    
    distances.set(start, 0);
    previous.set(start, null);
    pq.enqueue(start, 0);
    
    while (!pq.isEmpty()) {
        const { element: currentVertex } = pq.dequeue();
        
        if (visited.has(currentVertex)) {
            continue;
        }
        
        visited.add(currentVertex);
        
        // Early termination
        if (currentVertex === target) {
            break;
        }
        
        for (const { to: neighbor, weight } of graph.getNeighbors(currentVertex)) {
            if (!visited.has(neighbor)) {
                const newDistance = distances.get(currentVertex) + weight;
                
                if (!distances.has(neighbor) || newDistance < distances.get(neighbor)) {
                    distances.set(neighbor, newDistance);
                    previous.set(neighbor, currentVertex);
                    pq.enqueue(neighbor, newDistance);
                }
            }
        }
    }
    
    return { distances, previous };
}

// Reconstruct path
function reconstructPath(previous, start, target) {
    const path = [];
    let current = target;
    
    while (current !== null) {
        path.unshift(current); // Add to beginning
        current = previous.get(current);
    }
    
    // Check if path is valid
    if (path.length === 0 || path[0] !== start) {
        return []; // No path found
    }
    
    return path;
}

// A* Algorithm (Dijkstra with heuristic)
function aStar(graph, start, target, heuristic) {
    const gScore = new Map();
    const fScore = new Map();
    const previous = new Map();
    const visited = new Set();
    const pq = new PriorityQueue();
    
    gScore.set(start, 0);
    fScore.set(start, heuristic.get(start) || 0);
    pq.enqueue(start, fScore.get(start));
    
    while (!pq.isEmpty()) {
        const { element: currentVertex } = pq.dequeue();
        
        if (visited.has(currentVertex)) {
            continue;
        }
        
        visited.add(currentVertex);
        
        if (currentVertex === target) {
            break; // Found target
        }
        
        for (const { to: neighbor, weight } of graph.getNeighbors(currentVertex)) {
            if (!visited.has(neighbor)) {
                const tentativeGScore = gScore.get(currentVertex) + weight;
                
                if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
                    previous.set(neighbor, currentVertex);
                    gScore.set(neighbor, tentativeGScore);
                    fScore.set(neighbor, tentativeGScore + (heuristic.get(neighbor) || 0));
                    pq.enqueue(neighbor, fScore.get(neighbor));
                }
            }
        }
    }
    
    return { distances: gScore, previous };
}

// Bidirectional Dijkstra
function bidirectionalDijkstra(graph, start, target) {
    const forwardDistances = new Map();
    const backwardDistances = new Map();
    const forwardPrevious = new Map();
    const backwardPrevious = new Map();
    const forwardVisited = new Set();
    const backwardVisited = new Set();
    const forwardPQ = new PriorityQueue();
    const backwardPQ = new PriorityQueue();
    
    // Initialize forward search
    forwardDistances.set(start, 0);
    forwardPrevious.set(start, null);
    forwardPQ.enqueue(start, 0);
    
    // Initialize backward search
    backwardDistances.set(target, 0);
    backwardPrevious.set(target, null);
    backwardPQ.enqueue(target, 0);
    
    let shortestPath = Infinity;
    let meetingPoint = null;
    
    while (!forwardPQ.isEmpty() && !backwardPQ.isEmpty()) {
        // Forward step
        if (!forwardPQ.isEmpty()) {
            const { element: current } = forwardPQ.dequeue();
            
            if (!forwardVisited.has(current)) {
                forwardVisited.add(current);
                
                // Check if paths meet
                if (backwardVisited.has(current)) {
                    const totalDistance = forwardDistances.get(current) + backwardDistances.get(current);
                    if (totalDistance < shortestPath) {
                        shortestPath = totalDistance;
                        meetingPoint = current;
                    }
                }
                
                for (const { to: neighbor, weight } of graph.getNeighbors(current)) {
                    if (!forwardVisited.has(neighbor)) {
                        const newDistance = forwardDistances.get(current) + weight;
                        
                        if (newDistance < (forwardDistances.get(neighbor) || Infinity)) {
                            forwardDistances.set(neighbor, newDistance);
                            forwardPrevious.set(neighbor, current);
                            forwardPQ.enqueue(neighbor, newDistance);
                        }
                    }
                }
            }
        }
        
        // Backward step
        if (!backwardPQ.isEmpty()) {
            const { element: current } = backwardPQ.dequeue();
            
            if (!backwardVisited.has(current)) {
                backwardVisited.add(current);
                
                // Check if paths meet
                if (forwardVisited.has(current)) {
                    const totalDistance = forwardDistances.get(current) + backwardDistances.get(current);
                    if (totalDistance < shortestPath) {
                        shortestPath = totalDistance;
                        meetingPoint = current;
                    }
                }
                
                for (const { to: neighbor, weight } of graph.getNeighbors(current)) {
                    if (!backwardVisited.has(neighbor)) {
                        const newDistance = backwardDistances.get(current) + weight;
                        
                        if (newDistance < (backwardDistances.get(neighbor) || Infinity)) {
                            backwardDistances.set(neighbor, newDistance);
                            backwardPrevious.set(neighbor, current);
                            backwardPQ.enqueue(neighbor, newDistance);
                        }
                    }
                }
            }
        }
    }
    
    return {
        distance: shortestPath,
        meetingPoint,
        forwardDistances,
        backwardDistances,
        forwardPrevious,
        backwardPrevious
    };
}

// Find shortest path in grid (2D Dijkstra)
function dijkstraGrid(grid, start, target) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    const distances = Array(rows).fill().map(() => Array(cols).fill(Infinity));
    const previous = Array(rows).fill().map(() => Array(cols).fill(null));
    const pq = new PriorityQueue();
    
    distances[start[0]][start[1]] = 0;
    pq.enqueue(start, 0);
    
    while (!pq.isEmpty()) {
        const { element: [x, y] } = pq.dequeue();
        
        if (x === target[0] && y === target[1]) {
            break; // Reached target
        }
        
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            
            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
                const newDistance = distances[x][y] + grid[newX][newY];
                
                if (newDistance < distances[newX][newY]) {
                    distances[newX][newY] = newDistance;
                    previous[newX][newY] = [x, y];
                    pq.enqueue([newX, newY], newDistance);
                }
            }
        }
    }
    
    return {
        distance: distances[target[0]][target[1]],
        distances,
        previous
    };
}

// Network delay time (Dijkstra application)
function networkDelayTime(times, n, k) {
    const graph = new WeightedGraph();
    
    // Build graph from times array
    for (const [u, v, w] of times) {
        graph.addEdge(u, v, w);
    }
    
    const { distances } = dijkstra(graph, k);
    
    let maxDelay = 0;
    for (let i = 1; i <= n; i++) {
        const delay = distances.get(i);
        if (delay === Infinity) {
            return -1; // Not all nodes reachable
        }
        maxDelay = Math.max(maxDelay, delay);
    }
    
    return maxDelay;
}

// Test examples
console.log("=== Dijkstra Algorithm Tests ===");

const graph = new WeightedGraph();

// Build sample weighted graph
graph.addUndirectedEdge(0, 1, 4);
graph.addUndirectedEdge(0, 2, 2);
graph.addUndirectedEdge(1, 2, 1);
graph.addUndirectedEdge(1, 3, 5);
graph.addUndirectedEdge(2, 3, 8);
graph.addUndirectedEdge(2, 4, 10);
graph.addUndirectedEdge(3, 4, 2);

// Test Dijkstra
const result = dijkstra(graph, 0);
console.log("Distances from node 0:", Object.fromEntries(result.distances));

// Test path reconstruction
const path = reconstructPath(result.previous, 0, 4);
console.log("Path from 0 to 4:", path);

// Test single target
const targetResult = dijkstraToTarget(graph, 0, 4);
console.log("Distance to target 4:", targetResult.distances.get(4));

// Test A* with heuristic
const heuristic = new Map([
    [0, 6], [1, 4], [2, 4], [3, 2], [4, 0]
]);
const astarResult = aStar(graph, 0, 4, heuristic);
console.log("A* distance to target:", astarResult.distances.get(4));

// Test bidirectional Dijkstra
const biResult = bidirectionalDijkstra(graph, 0, 4);
console.log("Bidirectional distance:", biResult.distance);

// Test grid Dijkstra
const grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
];
const gridResult = dijkstraGrid(grid, [0, 0], [2, 2]);
console.log("Grid shortest path distance:", gridResult.distance);
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Priority Queue interface and implementation
interface IPriorityQueue<T> {
    enqueue(element: T, priority: number): void;
    dequeue(): { element: T; priority: number } | null;
    isEmpty(): boolean;
}

class PriorityQueue<T> implements IPriorityQueue<T> {
    private elements: Array<{ element: T; priority: number }> = [];
    
    enqueue(element: T, priority: number): void {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }
    
    dequeue(): { element: T; priority: number } | null {
        return this.elements.shift() || null;
    }
    
    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}

// Edge interface
interface Edge {
    to: number;
    weight: number;
}

// Weighted Graph interface and implementation
interface IWeightedGraph {
    addEdge(from: number, to: number, weight: number): void;
    addUndirectedEdge(from: number, to: number, weight: number): void;
    getNeighbors(node: number): Edge[];
    getAllNodes(): number[];
}

class WeightedGraph implements IWeightedGraph {
    private adjacencyList: Map<number, Edge[]> = new Map();
    
    addEdge(from: number, to: number, weight: number): void {
        if (!this.adjacencyList.has(from)) {
            this.adjacencyList.set(from, []);
        }
        this.adjacencyList.get(from)!.push({ to, weight });
    }
    
    addUndirectedEdge(from: number, to: number, weight: number): void {
        this.addEdge(from, to, weight);
        this.addEdge(to, from, weight);
    }
    
    getNeighbors(node: number): Edge[] {
        return this.adjacencyList.get(node) || [];
    }
    
    getAllNodes(): number[] {
        return Array.from(this.adjacencyList.keys());
    }
}

// Dijkstra result interface
interface DijkstraResult {
    distances: Map<number, number>;
    previous: Map<number, number | null>;
}

// Main Dijkstra implementation
function dijkstra(graph: IWeightedGraph, startNode: number): DijkstraResult {
    const distances = new Map<number, number>();
    const previous = new Map<number, number | null>();
    const visited = new Set<number>();
    const pq = new PriorityQueue<number>();
    
    // Initialize distances
    for (const node of graph.getAllNodes()) {
        distances.set(node, Infinity);
        previous.set(node, null);
    }
    
    distances.set(startNode, 0);
    pq.enqueue(startNode, 0);
    
    while (!pq.isEmpty()) {
        const current = pq.dequeue();
        if (!current) break;
        
        const currentVertex = current.element;
        
        if (visited.has(currentVertex)) {
            continue; // Skip if already processed
        }
        
        visited.add(currentVertex);
        
        for (const { to: neighbor, weight } of graph.getNeighbors(currentVertex)) {
            if (!visited.has(neighbor)) {
                const newDistance = distances.get(currentVertex)! + weight;
                
                if (newDistance < distances.get(neighbor)!) {
                    distances.set(neighbor, newDistance);
                    previous.set(neighbor, currentVertex);
                    pq.enqueue(neighbor, newDistance);
                }
            }
        }
    }
    
    return { distances, previous };
}

// Dijkstra with early termination
function dijkstraToTarget(graph: IWeightedGraph, start: number, target: number): DijkstraResult {
    const distances = new Map<number, number>();
    const previous = new Map<number, number | null>();
    const visited = new Set<number>();
    const pq = new PriorityQueue<number>();
    
    distances.set(start, 0);
    previous.set(start, null);
    pq.enqueue(start, 0);
    
    while (!pq.isEmpty()) {
        const current = pq.dequeue();
        if (!current) break;
        
        const currentVertex = current.element;
        
        if (visited.has(currentVertex)) {
            continue;
        }
        
        visited.add(currentVertex);
        
        // Early termination
        if (currentVertex === target) {
            break;
        }
        
        for (const { to: neighbor, weight } of graph.getNeighbors(currentVertex)) {
            if (!visited.has(neighbor)) {
                const newDistance = distances.get(currentVertex)! + weight;
                
                if (!distances.has(neighbor) || newDistance < distances.get(neighbor)!) {
                    distances.set(neighbor, newDistance);
                    previous.set(neighbor, currentVertex);
                    pq.enqueue(neighbor, newDistance);
                }
            }
        }
    }
    
    return { distances, previous };
}

// Path reconstruction
function reconstructPath(previous: Map<number, number | null>, start: number, target: number): number[] {
    const path: number[] = [];
    let current: number | null = target;
    
    while (current !== null) {
        path.unshift(current); // Add to beginning
        current = previous.get(current) || null;
    }
    
    // Check if path is valid
    if (path.length === 0 || path[0] !== start) {
        return []; // No path found
    }
    
    return path;
}

// A* Algorithm interface and implementation
interface AStarResult {
    distances: Map<number, number>;
    previous: Map<number, number | null>;
}

function aStar(
    graph: IWeightedGraph, 
    start: number, 
    target: number, 
    heuristic: Map<number, number>
): AStarResult {
    const gScore = new Map<number, number>();
    const fScore = new Map<number, number>();
    const previous = new Map<number, number | null>();
    const visited = new Set<number>();
    const pq = new PriorityQueue<number>();
    
    gScore.set(start, 0);
    fScore.set(start, heuristic.get(start) || 0);
    pq.enqueue(start, fScore.get(start)!);
    
    while (!pq.isEmpty()) {
        const current = pq.dequeue();
        if (!current) break;
        
        const currentVertex = current.element;
        
        if (visited.has(currentVertex)) {
            continue;
        }
        
        visited.add(currentVertex);
        
        if (currentVertex === target) {
            break; // Found target
        }
        
        for (const { to: neighbor, weight } of graph.getNeighbors(currentVertex)) {
            if (!visited.has(neighbor)) {
                const tentativeGScore = gScore.get(currentVertex)! + weight;
                
                if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
                    previous.set(neighbor, currentVertex);
                    gScore.set(neighbor, tentativeGScore);
                    fScore.set(neighbor, tentativeGScore + (heuristic.get(neighbor) || 0));
                    pq.enqueue(neighbor, fScore.get(neighbor)!);
                }
            }
        }
    }
    
    return { distances: gScore, previous };
}

// Grid-based Dijkstra
type Coordinate = [number, number];

interface GridDijkstraResult {
    distance: number;
    distances: number[][];
    previous: (Coordinate | null)[][];
}

function dijkstraGrid(grid: number[][], start: Coordinate, target: Coordinate): GridDijkstraResult {
    const [rows, cols] = [grid.length, grid[0].length];
    const directions: Coordinate[] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    const distances: number[][] = Array(rows).fill(null).map(() => Array(cols).fill(Infinity));
    const previous: (Coordinate | null)[][] = Array(rows).fill(null).map(() => Array(cols).fill(null));
    const pq = new PriorityQueue<Coordinate>();
    
    distances[start[0]][start[1]] = 0;
    pq.enqueue(start, 0);
    
    while (!pq.isEmpty()) {
        const current = pq.dequeue();
        if (!current) break;
        
        const [x, y] = current.element;
        
        if (x === target[0] && y === target[1]) {
            break; // Reached target
        }
        
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            
            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
                const newDistance = distances[x][y] + grid[newX][newY];
                
                if (newDistance < distances[newX][newY]) {
                    distances[newX][newY] = newDistance;
                    previous[newX][newY] = [x, y];
                    pq.enqueue([newX, newY], newDistance);
                }
            }
        }
    }
    
    return {
        distance: distances[target[0]][target[1]],
        distances,
        previous
    };
}

// Advanced Dijkstra variants
class AdvancedDijkstra {
    
    // K shortest paths
    static kShortestPaths(graph: IWeightedGraph, start: number, target: number, k: number): number[][] {
        interface PathInfo {
            node: number;
            cost: number;
            path: number[];
        }
        
        const pq = new PriorityQueue<PathInfo>();
        const results: number[][] = [];
        const visitCount = new Map<number, number>();
        
        pq.enqueue({ node: start, cost: 0, path: [start] }, 0);
        
        while (!pq.isEmpty() && results.length < k) {
            const current = pq.dequeue();
            if (!current) break;
            
            const { node, cost, path } = current.element;
            
            visitCount.set(node, (visitCount.get(node) || 0) + 1);
            
            if (node === target) {
                results.push([...path]);
                continue;
            }
            
            // Pruning: allow at most k visits per node
            if ((visitCount.get(node) || 0) <= k) {
                for (const { to: neighbor, weight } of graph.getNeighbors(node)) {
                    if (!path.includes(neighbor)) { // Avoid cycles in path
                        const newPath = [...path, neighbor];
                        const newCost = cost + weight;
                        pq.enqueue({ node: neighbor, cost: newCost, path: newPath }, newCost);
                    }
                }
            }
        }
        
        return results;
    }
    
    // Single source shortest path with path reconstruction
    static singleSourceShortestPaths(graph: IWeightedGraph, source: number): {
        distances: Map<number, number>;
        paths: Map<number, number[]>;
    } {
        const { distances, previous } = dijkstra(graph, source);
        const paths = new Map<number, number[]>();
        
        for (const target of graph.getAllNodes()) {
            const path = reconstructPath(previous, source, target);
            if (path.length > 0) {
                paths.set(target, path);
            }
        }
        
        return { distances, paths };
    }
    
    // Multi-source Dijkstra
    static multiSourceDijkstra(graph: IWeightedGraph, sources: number[]): Map<number, number> {
        const distances = new Map<number, number>();
        const visited = new Set<number>();
        const pq = new PriorityQueue<number>();
        
        // Initialize all sources with distance 0
        for (const source of sources) {
            distances.set(source, 0);
            pq.enqueue(source, 0);
        }
        
        while (!pq.isEmpty()) {
            const current = pq.dequeue();
            if (!current) break;
            
            const currentVertex = current.element;
            
            if (visited.has(currentVertex)) {
                continue;
            }
            
            visited.add(currentVertex);
            
            for (const { to: neighbor, weight } of graph.getNeighbors(currentVertex)) {
                if (!visited.has(neighbor)) {
                    const newDistance = distances.get(currentVertex)! + weight;
                    
                    if (!distances.has(neighbor) || newDistance < distances.get(neighbor)!) {
                        distances.set(neighbor, newDistance);
                        pq.enqueue(neighbor, newDistance);
                    }
                }
            }
        }
        
        return distances;
    }
}

// Test examples
const graph = new WeightedGraph();

// Build sample weighted graph
graph.addUndirectedEdge(0, 1, 4);
graph.addUndirectedEdge(0, 2, 2);
graph.addUndirectedEdge(1, 2, 1);
graph.addUndirectedEdge(1, 3, 5);
graph.addUndirectedEdge(2, 3, 8);
graph.addUndirectedEdge(2, 4, 10);
graph.addUndirectedEdge(3, 4, 2);

// Test Dijkstra
const result = dijkstra(graph, 0);
console.log("Distances from node 0:", Object.fromEntries(result.distances));

// Test path reconstruction
const path = reconstructPath(result.previous, 0, 4);
console.log("Path from 0 to 4:", path);

// Test A* with heuristic
const heuristic = new Map<number, number>([
    [0, 6], [1, 4], [2, 4], [3, 2], [4, 0]
]);
const astarResult = aStar(graph, 0, 4, heuristic);
console.log("A* distance to target:", astarResult.distances.get(4));

// Test grid Dijkstra
const grid: number[][] = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
];
const gridResult = dijkstraGrid(grid, [0, 0], [2, 2]);
console.log("Grid shortest path distance:", gridResult.distance);

// Test K shortest paths
const kPaths = AdvancedDijkstra.kShortestPaths(graph, 0, 4, 3);
console.log("3 shortest paths from 0 to 4:", kPaths);

// Test multi-source Dijkstra
const multiResult = AdvancedDijkstra.multiSourceDijkstra(graph, [0, 1]);
console.log("Multi-source distances:", Object.fromEntries(multiResult));
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Negatív élsúlyok**: Dijkstra negatív súlyokkal nem működik → Bellman-Ford kell
- **Lazy deletion**: Priority queue-ban több bejegyzés → visited check szükséges
- **Infinity initialization**: Helytelen infinity kezelés → overflow problémák
- **Path reconstruction**: Previous array inicializálás hiánya → invalid path
- **Early termination**: Target elérése után folytatás → felesleges számítás

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **GPS navigation**: Útvonaltervezés térképeken
- **Network routing**: Csomagok optimális útvonala
- **Game AI**: Pathfinding algoritmusok
- **Social networks**: Kapcsolati távolság mérése
- **Flight connections**: Legolcsóbb repülőjegy keresés

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért nem működik Dijkstra negatív élsúlyokkal?
<details><summary>Válasz mutatása</summary>
Greedy jelleg: egyszer feldolgozott csúcsot nem revisitálja. Negatív súly esetén később jobb út jöhet → hibás eredmény.
</details>

2. Mi a különbség Dijkstra és A* között?
<details><summary>Válasz mutatása</summary>
A* = Dijkstra + heurisztika. A* irányított keresés (goal-oriented), Dijkstra mindenfelé terjeszkedik. A* gyorsabb ha jó a heurisztika.
</details>

3. Mikor használjunk bidirectional search-öt?
<details><summary>Válasz mutatása</summary>
Nagy gráfokban, amikor start és target között keresünk. Két irányból O(b^(d/2)) vs egy irányból O(b^d) ahol b=branching factor, d=mélység.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Find shortest path in weighted graph"** → Dijkstra vs alternatives discussion
2. **"Network delay time"** → Single source shortest path application
3. **"Cheapest flights with K stops"** → Modified Dijkstra with constraints
4. **"Path with minimum effort"** → 2D grid Dijkstra variant
5. **"Design GPS navigation system"** → Real-world pathfinding requirements

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`A* Search` · `Bellman-Ford` · `Floyd-Warshall` · `Johnson's Algorithm` · `BFS (unweighted)`

</div>

<div class="tags">
  <span class="tag">dijkstra</span>
  <span class="tag">shortest-path</span>
  <span class="tag">graph</span>
  <span class="tag">weighted</span>
  <span class="tag">priority-queue</span>
  <span class="tag">medior</span>
</div>

## 5. Dinamikus programozás

### LIS - Longest Increasing Subsequence {#lis}
<!-- tags: lis, dp, subsequence, binary-search, patience-sorting, medior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*A LIS (Longest Increasing Subsequence) olyan, mint a paciencia pasziánsz játék: kártyákat rakunk kupacokba, ahol minden kupacban a legalján levő kártya kisebb, mint a fölötte levők. A kupacok száma adja meg a leghosszabb növekvő részsorozat hosszát. Ez a probléma a dinamikus programozás és a binary search kombinációjának klasszikus példája.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **DP megoldás**: O(n²) idő, O(n) memória
- **Binary search + DP**: O(n log n) idő, O(n) memória
- **Space optimized**: O(n) extra space needed for tails array
- **Reconstruction**: +O(n) space for parent array
- **Variations**: LDS (decreasing), LCS (common subsequence) similar complexity

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**O(n²) Dynamic Programming solution**
```pseudo
FUNCTION LIS_DP(A)
  n ← LENGTH(A)
  dp ← NEW ARRAY[n] FILLED WITH 1  // dp[i] = length of LIS ending at i
  
  FOR i ← 1 TO n − 1 DO
    FOR j ← 0 TO i − 1 DO
      IF A[j] < A[i] THEN
        dp[i] ← MAX(dp[i], dp[j] + 1)
      END IF
    END FOR
  END FOR
  
  RETURN MAX(dp)
END FUNCTION
```

**O(n log n) Binary Search + DP solution**
```pseudo
FUNCTION LIS_BinarySearch(A)
  tails ← EMPTY_LIST  // tails[i] = smallest ending element of all increasing subsequences of length i+1
  
  FOR num IN A DO
    left ← 0
    right ← LENGTH(tails)
    
    // Binary search for insertion position
    WHILE left < right DO
      mid ← (left + right) / 2
      IF tails[mid] < num THEN
        left ← mid + 1
      ELSE
        right ← mid
      END IF
    END WHILE
    
    // If left = LENGTH(tails), append. Otherwise, replace
    IF left = LENGTH(tails) THEN
      APPEND(tails, num)
    ELSE
      tails[left] ← num
    END IF
  END FOR
  
  RETURN LENGTH(tails)
END FUNCTION
```

// LIS with reconstruction
function LIS_WithPath(arr):
    n = arr.length
    dp = new Array(n).fill(1)
    parent = new Array(n).fill(-1)
    
    for i from 1 to n-1:
        for j from 0 to i-1:
            if arr[j] < arr[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j
    
    // Find maximum length and its ending index
    maxLength = max(dp)
    endIndex = dp.indexOf(maxLength)
    
    // Reconstruct path
    path = []
    current = endIndex
    while current != -1:
        path.prepend(arr[current])
        current = parent[current]
    
    return path, maxLength

// Applications:
// 1. Stock prices - maximum profit with increasing prices
// 2. Box stacking - optimal arrangement for maximum height
// 3. Patience sorting - efficient sorting algorithm
// 4. Activity selection - scheduling with increasing finish times
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class LIS {
    
    // Basic O(n²) Dynamic Programming solution
    public static int lengthOfLIS_DP(int[] nums) {
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
    
    // Optimized O(n log n) Binary Search solution
    public static int lengthOfLIS_BinarySearch(int[] nums) {
        if (nums.length == 0) return 0;
        
        List<Integer> tails = new ArrayList<>();
        
        for (int num : nums) {
            int left = 0, right = tails.size();
            
            // Binary search for insertion position
            while (left < right) {
                int mid = left + (right - left) / 2;
                if (tails.get(mid) < num) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            
            // If left == tails.size(), append. Otherwise, replace
            if (left == tails.size()) {
                tails.add(num);
            } else {
                tails.set(left, num);
            }
        }
        
        return tails.size();
    }
    
    // LIS with actual subsequence reconstruction
    public static class LISResult {
        public List<Integer> subsequence;
        public int length;
        
        public LISResult(List<Integer> subsequence, int length) {
            this.subsequence = subsequence;
            this.length = length;
        }
    }
    
    public static LISResult getLISWithPath(int[] nums) {
        if (nums.length == 0) return new LISResult(new ArrayList<>(), 0);
        
        int[] dp = new int[nums.length];
        int[] parent = new int[nums.length];
        Arrays.fill(dp, 1);
        Arrays.fill(parent, -1);
        
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    parent[i] = j;
                }
            }
        }
        
        // Find maximum length and its ending index
        int maxLength = 0;
        int endIndex = 0;
        for (int i = 0; i < dp.length; i++) {
            if (dp[i] > maxLength) {
                maxLength = dp[i];
                endIndex = i;
            }
        }
        
        // Reconstruct path
        List<Integer> path = new ArrayList<>();
        int current = endIndex;
        while (current != -1) {
            path.add(0, nums[current]); // Add to beginning
            current = parent[current];
        }
        
        return new LISResult(path, maxLength);
    }
    
    // Number of LIS (count how many LIS exist)
    public static int findNumberOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        
        int[] lengths = new int[nums.length];  // lengths[i] = length of LIS ending at i
        int[] counts = new int[nums.length];   // counts[i] = number of LIS ending at i
        Arrays.fill(lengths, 1);
        Arrays.fill(counts, 1);
        
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (lengths[j] + 1 > lengths[i]) {
                        lengths[i] = lengths[j] + 1;
                        counts[i] = counts[j];
                    } else if (lengths[j] + 1 == lengths[i]) {
                        counts[i] += counts[j];
                    }
                }
            }
        }
        
        int maxLength = Arrays.stream(lengths).max().orElse(0);
        int result = 0;
        for (int i = 0; i < lengths.length; i++) {
            if (lengths[i] == maxLength) {
                result += counts[i];
            }
        }
        
        return result;
    }
    
    // Longest Decreasing Subsequence
    public static int lengthOfLDS(int[] nums) {
        if (nums.length == 0) return 0;
        
        // Reverse the comparison to get decreasing subsequence
        List<Integer> tails = new ArrayList<>();
        
        for (int num : nums) {
            int left = 0, right = tails.size();
            
            // Binary search for insertion position (reverse comparison)
            while (left < right) {
                int mid = left + (right - left) / 2;
                if (tails.get(mid) > num) {  // Changed from < to >
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            
            if (left == tails.size()) {
                tails.add(num);
            } else {
                tails.set(left, num);
            }
        }
        
        return tails.size();
    }
    
    // Russian Doll Envelopes (2D LIS problem)
    public static int maxEnvelopes(int[][] envelopes) {
        if (envelopes.length == 0) return 0;
        
        // Sort by width ascending, height descending
        Arrays.sort(envelopes, (a, b) -> 
            a[0] == b[0] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0]));
        
        // Find LIS on heights
        List<Integer> tails = new ArrayList<>();
        
        for (int[] envelope : envelopes) {
            int height = envelope[1];
            int left = 0, right = tails.size();
            
            while (left < right) {
                int mid = left + (right - left) / 2;
                if (tails.get(mid) < height) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            
            if (left == tails.size()) {
                tails.add(height);
            } else {
                tails.set(left, height);
            }
        }
        
        return tails.size();
    }
    
    // Box Stacking Problem (3D extension)
    static class Box {
        int width, height, depth;
        
        Box(int w, int h, int d) {
            this.width = w;
            this.height = h;
            this.depth = d;
        }
        
        boolean canBeAbove(Box other) {
            return this.width < other.width && this.height < other.height && this.depth < other.depth;
        }
    }
    
    public static int maxStackHeight(Box[] boxes) {
        Arrays.sort(boxes, (a, b) -> Integer.compare(b.width * b.height, a.width * a.height));
        
        int[] dp = new int[boxes.length];
        for (int i = 0; i < boxes.length; i++) {
            dp[i] = boxes[i].depth;
        }
        
        for (int i = 1; i < boxes.length; i++) {
            for (int j = 0; j < i; j++) {
                if (boxes[i].canBeAbove(boxes[j])) {
                    dp[i] = Math.max(dp[i], dp[j] + boxes[i].depth);
                }
            }
        }
        
        return Arrays.stream(dp).max().orElse(0);
    }
    
    // Longest Bitonic Subsequence
    public static int longestBitonicSubsequence(int[] nums) {
        if (nums.length == 0) return 0;
        
        int n = nums.length;
        int[] lis = new int[n];  // LIS ending at i
        int[] lds = new int[n];  // LDS starting at i
        
        Arrays.fill(lis, 1);
        Arrays.fill(lds, 1);
        
        // Calculate LIS for each position
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    lis[i] = Math.max(lis[i], lis[j] + 1);
                }
            }
        }
        
        // Calculate LDS for each position (from right to left)
        for (int i = n - 2; i >= 0; i--) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] > nums[j]) {
                    lds[i] = Math.max(lds[i], lds[j] + 1);
                }
            }
        }
        
        // Find maximum bitonic length
        int maxLength = 0;
        for (int i = 0; i < n; i++) {
            maxLength = Math.max(maxLength, lis[i] + lds[i] - 1);
        }
        
        return maxLength;
    }
    
    // Test
    public static void main(String[] args) {
        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};
        
        System.out.println("LIS length (DP): " + lengthOfLIS_DP(nums));
        System.out.println("LIS length (Binary Search): " + lengthOfLIS_BinarySearch(nums));
        
        LISResult result = getLISWithPath(nums);
        System.out.println("LIS: " + result.subsequence + " (length: " + result.length + ")");
        
        System.out.println("Number of LIS: " + findNumberOfLIS(nums));
        System.out.println("LDS length: " + lengthOfLDS(nums));
        System.out.println("Longest Bitonic Subsequence: " + longestBitonicSubsequence(nums));
        
        // Test Russian Doll Envelopes
        int[][] envelopes = { {5,4},{6,4},{6,7},{2,3} };
        System.out.println("Max envelopes: " + maxEnvelopes(envelopes));
        
        // Test Box Stacking
        Box[] boxes = {
            new Box(4, 6, 7),
            new Box(1, 2, 3),
            new Box(4, 5, 6),
            new Box(10, 12, 32)
        };
        System.out.println("Max stack height: " + maxStackHeight(boxes));
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Basic O(n²) Dynamic Programming solution
function lengthOfLIS_DP(nums) {
    if (nums.length === 0) return 0;
    
    const dp = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// Optimized O(n log n) Binary Search solution
function lengthOfLIS_BinarySearch(nums) {
    if (nums.length === 0) return 0;
    
    const tails = [];
    
    for (const num of nums) {
        let left = 0;
        let right = tails.length;
        
        // Binary search for insertion position
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // If left === tails.length, append. Otherwise, replace
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
}

// LIS with actual subsequence reconstruction
function getLISWithPath(nums) {
    if (nums.length === 0) return { subsequence: [], length: 0 };
    
    const dp = new Array(nums.length).fill(1);
    const parent = new Array(nums.length).fill(-1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
    }
    
    // Find maximum length and its ending index
    let maxLength = 0;
    let endIndex = 0;
    for (let i = 0; i < dp.length; i++) {
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            endIndex = i;
        }
    }
    
    // Reconstruct path
    const path = [];
    let current = endIndex;
    while (current !== -1) {
        path.unshift(nums[current]); // Add to beginning
        current = parent[current];
    }
    
    return { subsequence: path, length: maxLength };
}

// Number of LIS (count how many LIS exist)
function findNumberOfLIS(nums) {
    if (nums.length === 0) return 0;
    
    const lengths = new Array(nums.length).fill(1);  // lengths[i] = length of LIS ending at i
    const counts = new Array(nums.length).fill(1);   // counts[i] = number of LIS ending at i
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (lengths[j] + 1 > lengths[i]) {
                    lengths[i] = lengths[j] + 1;
                    counts[i] = counts[j];
                } else if (lengths[j] + 1 === lengths[i]) {
                    counts[i] += counts[j];
                }
            }
        }
    }
    
    const maxLength = Math.max(...lengths);
    let result = 0;
    for (let i = 0; i < lengths.length; i++) {
        if (lengths[i] === maxLength) {
            result += counts[i];
        }
    }
    
    return result;
}

// Longest Decreasing Subsequence
function lengthOfLDS(nums) {
    if (nums.length === 0) return 0;
    
    const tails = [];
    
    for (const num of nums) {
        let left = 0;
        let right = tails.length;
        
        // Binary search for insertion position (reverse comparison)
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] > num) {  // Changed from < to >
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

// Russian Doll Envelopes (2D LIS problem)
function maxEnvelopes(envelopes) {
    if (envelopes.length === 0) return 0;
    
    // Sort by width ascending, height descending
    envelopes.sort((a, b) => 
        a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
    
    // Find LIS on heights
    const tails = [];
    
    for (const [width, height] of envelopes) {
        let left = 0;
        let right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < height) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(height);
        } else {
            tails[left] = height;
        }
    }
    
    return tails.length;
}

// Longest Bitonic Subsequence
function longestBitonicSubsequence(nums) {
    if (nums.length === 0) return 0;
    
    const n = nums.length;
    const lis = new Array(n).fill(1);  // LIS ending at i
    const lds = new Array(n).fill(1);  // LDS starting at i
    
    // Calculate LIS for each position
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                lis[i] = Math.max(lis[i], lis[j] + 1);
            }
        }
    }
    
    // Calculate LDS for each position (from right to left)
    for (let i = n - 2; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] > nums[j]) {
                lds[i] = Math.max(lds[i], lds[j] + 1);
            }
        }
    }
    
    // Find maximum bitonic length
    let maxLength = 0;
    for (let i = 0; i < n; i++) {
        maxLength = Math.max(maxLength, lis[i] + lds[i] - 1);
    }
    
    return maxLength;
}

// Patience Sorting (returns sorted array using LIS concept)
function patienceSort(nums) {
    const piles = [];
    const pilesTop = [];
    
    for (const num of nums) {
        let left = 0;
        let right = pilesTop.length;
        
        // Binary search for pile to place card
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (pilesTop[mid] <= num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // Create new pile or add to existing
        if (left === piles.length) {
            piles.push([num]);
            pilesTop.push(num);
        } else {
            piles[left].push(num);
            pilesTop[left] = num;
        }
    }
    
    // Reconstruct sorted array by taking from piles
    const result = [];
    const heap = piles.map((pile, index) => ({ value: pile[pile.length - 1], pileIndex: index }))
        .filter(item => item.value !== undefined);
    
    // Simple implementation - in practice would use a proper min-heap
    while (heap.length > 0) {
        heap.sort((a, b) => a.value - b.value);
        const { value, pileIndex } = heap.shift();
        result.push(value);
        
        piles[pileIndex].pop();
        if (piles[pileIndex].length > 0) {
            heap.push({ value: piles[pileIndex][piles[pileIndex].length - 1], pileIndex });
        }
    }
    
    return result;
}

// LIS with actual elements in O(n log n)
function getLISOptimalWithPath(nums) {
    if (nums.length === 0) return { subsequence: [], length: 0 };
    
    const tails = [];
    const elements = [];  // elements[i] stores actual elements for LIS of length i+1
    const parent = new Array(nums.length).fill(-1);
    const tailIndices = [];  // tailIndices[i] = index in original array for tails[i]
    
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        let left = 0;
        let right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left > 0) {
            parent[i] = tailIndices[left - 1];
        }
        
        if (left === tails.length) {
            tails.push(num);
            elements.push([num]);
            tailIndices.push(i);
        } else {
            tails[left] = num;
            tailIndices[left] = i;
        }
    }
    
    // Reconstruct LIS
    const result = [];
    let current = tailIndices[tailIndices.length - 1];
    while (current !== -1) {
        result.unshift(nums[current]);
        current = parent[current];
    }
    
    return { subsequence: result, length: tails.length };
}

// Test examples
console.log("=== LIS Algorithm Tests ===");

const nums = [10, 9, 2, 5, 3, 7, 101, 18];

console.log("LIS length (DP):", lengthOfLIS_DP(nums));
console.log("LIS length (Binary Search):", lengthOfLIS_BinarySearch(nums));

const result = getLISWithPath(nums);
console.log("LIS:", result.subsequence, "(length:", result.length + ")");

console.log("Number of LIS:", findNumberOfLIS(nums));
console.log("LDS length:", lengthOfLDS(nums));
console.log("Longest Bitonic Subsequence:", longestBitonicSubsequence(nums));

// Test Russian Doll Envelopes
const envelopes = [[5,4],[6,4],[6,7],[2,3]];
console.log("Max envelopes:", maxEnvelopes(envelopes));

// Test Patience Sort
const unsorted = [4, 2, 8, 3, 1, 5, 7, 6];
console.log("Patience sorted:", patienceSort(unsorted));

// Test optimal LIS with path
const optimalResult = getLISOptimalWithPath(nums);
console.log("Optimal LIS:", optimalResult.subsequence, "(length:", optimalResult.length + ")");
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// LIS Result interface
interface LISResult {
    subsequence: number[];
    length: number;
}

// Basic O(n²) Dynamic Programming solution
function lengthOfLIS_DP(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    const dp: number[] = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// Optimized O(n log n) Binary Search solution
function lengthOfLIS_BinarySearch(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    const tails: number[] = [];
    
    for (const num of nums) {
        let left = 0;
        let right = tails.length;
        
        // Binary search for insertion position
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // If left === tails.length, append. Otherwise, replace
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
}

// LIS with actual subsequence reconstruction
function getLISWithPath(nums: number[]): LISResult {
    if (nums.length === 0) return { subsequence: [], length: 0 };
    
    const dp: number[] = new Array(nums.length).fill(1);
    const parent: number[] = new Array(nums.length).fill(-1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
    }
    
    // Find maximum length and its ending index
    let maxLength = 0;
    let endIndex = 0;
    for (let i = 0; i < dp.length; i++) {
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            endIndex = i;
        }
    }
    
    // Reconstruct path
    const path: number[] = [];
    let current = endIndex;
    while (current !== -1) {
        path.unshift(nums[current]); // Add to beginning
        current = parent[current];
    }
    
    return { subsequence: path, length: maxLength };
}

// Generic LIS class with multiple algorithms
class LISAlgorithms {
    
    // Number of LIS (count how many LIS exist)
    static findNumberOfLIS(nums: number[]): number {
        if (nums.length === 0) return 0;
        
        const lengths: number[] = new Array(nums.length).fill(1);  // lengths[i] = length of LIS ending at i
        const counts: number[] = new Array(nums.length).fill(1);   // counts[i] = number of LIS ending at i
        
        for (let i = 1; i < nums.length; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (lengths[j] + 1 > lengths[i]) {
                        lengths[i] = lengths[j] + 1;
                        counts[i] = counts[j];
                    } else if (lengths[j] + 1 === lengths[i]) {
                        counts[i] += counts[j];
                    }
                }
            }
        }
        
        const maxLength = Math.max(...lengths);
        let result = 0;
        for (let i = 0; i < lengths.length; i++) {
            if (lengths[i] === maxLength) {
                result += counts[i];
            }
        }
        
        return result;
    }
    
    // Longest Decreasing Subsequence
    static lengthOfLDS(nums: number[]): number {
        if (nums.length === 0) return 0;
        
        const tails: number[] = [];
        
        for (const num of nums) {
            let left = 0;
            let right = tails.length;
            
            // Binary search for insertion position (reverse comparison)
            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                if (tails[mid] > num) {  // Changed from < to >
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
    
    // Longest Bitonic Subsequence
    static longestBitonicSubsequence(nums: number[]): number {
        if (nums.length === 0) return 0;
        
        const n = nums.length;
        const lis: number[] = new Array(n).fill(1);  // LIS ending at i
        const lds: number[] = new Array(n).fill(1);  // LDS starting at i
        
        // Calculate LIS for each position
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    lis[i] = Math.max(lis[i], lis[j] + 1);
                }
            }
        }
        
        // Calculate LDS for each position (from right to left)
        for (let i = n - 2; i >= 0; i--) {
            for (let j = i + 1; j < n; j++) {
                if (nums[i] > nums[j]) {
                    lds[i] = Math.max(lds[i], lds[j] + 1);
                }
            }
        }
        
        // Find maximum bitonic length
        let maxLength = 0;
        for (let i = 0; i < n; i++) {
            maxLength = Math.max(maxLength, lis[i] + lds[i] - 1);
        }
        
        return maxLength;
    }
}

// Envelope interface for Russian Doll problem
interface Envelope {
    width: number;
    height: number;
}

// Russian Doll Envelopes (2D LIS problem)
function maxEnvelopes(envelopes: number[][]): number {
    if (envelopes.length === 0) return 0;
    
    // Sort by width ascending, height descending
    envelopes.sort((a, b) => 
        a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
    
    // Find LIS on heights
    const tails: number[] = [];
    
    for (const [width, height] of envelopes) {
        let left = 0;
        let right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < height) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(height);
        } else {
            tails[left] = height;
        }
    }
    
    return tails.length;
}

// Box interface for stacking problem
interface Box {
    width: number;
    height: number;
    depth: number;
}

// Box Stacking Problem (3D extension)
class BoxStacking {
    
    static canBeAbove(box1: Box, box2: Box): boolean {
        return box1.width < box2.width && 
               box1.height < box2.height && 
               box1.depth < box2.depth;
    }
    
    static maxStackHeight(boxes: Box[]): number {
        // Sort boxes by base area in descending order
        boxes.sort((a, b) => (b.width * b.height) - (a.width * a.height));
        
        const dp: number[] = boxes.map(box => box.depth);
        
        for (let i = 1; i < boxes.length; i++) {
            for (let j = 0; j < i; j++) {
                if (BoxStacking.canBeAbove(boxes[i], boxes[j])) {
                    dp[i] = Math.max(dp[i], dp[j] + boxes[i].depth);
                }
            }
        }
        
        return Math.max(...dp);
    }
}

// Patience Sorting implementation
class PatienceSort {
    
    static sort(nums: number[]): number[] {
        const piles: number[][] = [];
        const pilesTop: number[] = [];
        
        for (const num of nums) {
            let left = 0;
            let right = pilesTop.length;
            
            // Binary search for pile to place card
            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                if (pilesTop[mid] <= num) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            
            // Create new pile or add to existing
            if (left === piles.length) {
                piles.push([num]);
                pilesTop.push(num);
            } else {
                piles[left].push(num);
                pilesTop[left] = num;
            }
        }
        
        // Reconstruct sorted array by taking from piles
        const result: number[] = [];
        const indices: number[] = new Array(piles.length).fill(0).map((_, i) => piles[i].length - 1);
        
        while (result.length < nums.length) {
            let minValue = Infinity;
            let minPile = -1;
            
            for (let i = 0; i < piles.length; i++) {
                if (indices[i] >= 0 && piles[i][indices[i]] < minValue) {
                    minValue = piles[i][indices[i]];
                    minPile = i;
                }
            }
            
            result.push(minValue);
            indices[minPile]--;
        }
        
        return result;
    }
}

// Advanced LIS with reconstruction in O(n log n)
function getLISOptimalWithPath(nums: number[]): LISResult {
    if (nums.length === 0) return { subsequence: [], length: 0 };
    
    const tails: number[] = [];
    const parent: number[] = new Array(nums.length).fill(-1);
    const tailIndices: number[] = [];  // tailIndices[i] = index in original array for tails[i]
    
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        let left = 0;
        let right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left > 0) {
            parent[i] = tailIndices[left - 1];
        }
        
        if (left === tails.length) {
            tails.push(num);
            tailIndices.push(i);
        } else {
            tails[left] = num;
            tailIndices[left] = i;
        }
    }
    
    // Reconstruct LIS
    const result: number[] = [];
    let current = tailIndices[tailIndices.length - 1];
    while (current !== -1) {
        result.unshift(nums[current]);
        current = parent[current];
    }
    
    return { subsequence: result, length: tails.length };
}

// Test examples
const nums: number[] = [10, 9, 2, 5, 3, 7, 101, 18];

console.log("LIS length (DP):", lengthOfLIS_DP(nums));
console.log("LIS length (Binary Search):", lengthOfLIS_BinarySearch(nums));

const result = getLISWithPath(nums);
console.log("LIS:", result.subsequence, "(length:", result.length + ")");

console.log("Number of LIS:", LISAlgorithms.findNumberOfLIS(nums));
console.log("LDS length:", LISAlgorithms.lengthOfLDS(nums));
console.log("Longest Bitonic Subsequence:", LISAlgorithms.longestBitonicSubsequence(nums));

// Test Russian Doll Envelopes
const envelopes: number[][] = [[5,4],[6,4],[6,7],[2,3]];
console.log("Max envelopes:", maxEnvelopes(envelopes));

// Test Box Stacking
const boxes: Box[] = [
    { width: 4, height: 6, depth: 7 },
    { width: 1, height: 2, depth: 3 },
    { width: 4, height: 5, depth: 6 },
    { width: 10, height: 12, depth: 32 }
];
console.log("Max stack height:", BoxStacking.maxStackHeight(boxes));

// Test Patience Sort
const unsorted: number[] = [4, 2, 8, 3, 1, 5, 7, 6];
console.log("Patience sorted:", PatienceSort.sort(unsorted));

// Test optimal LIS with path
const optimalResult = getLISOptimalWithPath(nums);
console.log("Optimal LIS:", optimalResult.subsequence, "(length:", optimalResult.length + ")");
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Subsequence vs Subarray**: LIS nem kell egymás mellett levő elemek → subsequence != substring
- **Binary search irány**: helytelen binary search → végtelen ciklus vagy hibás eredmény
- **Strict increasing**: egyenlő elemek kezelése → <= vs < összehasonlítás
- **Path reconstruction**: parent array helytelen építése → invalid path
- **Index handling**: off-by-one hibák binary search-ben → array bounds error

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Stock trading**: Maximum profit with increasing stock prices
- **Scheduling**: Activity selection with increasing finish times
- **Bioinformatics**: DNA sequence alignment and analysis
- **Game theory**: Optimal move sequences in strategy games
- **Data compression**: Patience sorting and encoding algorithms

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért O(n log n) a binary search-es LIS megoldás?
<details><summary>Válasz mutatása</summary>
n elem × log n binary search per elem. A tails array mindig rendezett marad, így binary search használható a helyes pozíció megtalálására.
</details>

2. Mi a különbség LIS és LCS között?
<details><summary>Válasz mutatása</summary>
LIS: egy array-ben növekvő részsorozat. LCS: két string/array közös részsorozata. LIS O(n log n), LCS O(nm) DP-vel.
</details>

3. Hogyan működik a patience sorting?
<details><summary>Válasz mutatása</summary>
Kártyákat kupacokba rakjuk: minden kupacban csökkenő sorrend. Új kártya a legbaloldalibb kupacra megy ahol nagyobb az előzőnél. Kupacok száma = LIS hossza.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Longest Increasing Subsequence"** → O(n²) DP vs O(n log n) binary search comparison
2. **"Russian Doll Envelopes"** → 2D LIS problem with sorting strategy
3. **"Number of LIS"** → Extended DP to count all possible LIS
4. **"Longest Bitonic Subsequence"** → Combination of LIS and LDS
5. **"Box Stacking"** → 3D extension with constraint handling

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Longest Common Subsequence` · `Edit Distance` · `Patience Sorting` · `Activity Selection` · `Weighted Job Scheduling`

</div>

<div class="tags">
  <span class="tag">lis</span>
  <span class="tag">dp</span>
  <span class="tag">subsequence</span>
  <span class="tag">binary-search</span>
  <span class="tag">patience-sorting</span>
  <span class="tag">medior</span>
</div>

### Edit Distance - Szerkesztési Távolság {#edit-distance}
<!-- tags: edit-distance, dp, string, levenshtein, alignment, medior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*Az Edit Distance (Levenshtein távolság) olyan, mint a helyesírás-ellenőrző algoritmus szíve: megmondja, hány minimum lépésben (beszúrás, törlés, csere) lehet az egyik stringet a másikká alakítani. Ez a klasszikus dinamikus programozás probléma a bioinformatikától a természetes nyelvfeldolgozásig mindenhol alkalmazott.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Basic DP**: O(m × n) idő, O(m × n) memória
- **Space optimized**: O(m × n) idő, O(min(m, n)) memória
- **Path reconstruction**: +O(m + n) extra space
- **Variants**: Weighted operations, restricted alphabet optimizations
- **Practical**: Real strings often have better average case performance

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**

**Basic Edit Distance with DP**
```pseudo
FUNCTION EditDistance(str1, str2)
  m ← LENGTH(str1)
  n ← LENGTH(str2)
  dp ← NEW ARRAY[m + 1][n + 1]
  
  // Initialize base cases
  FOR i ← 0 TO m DO
    dp[i][0] ← i  // Delete all characters from str1
  END FOR
  FOR j ← 0 TO n DO
    dp[0][j] ← j  // Insert all characters to str1
  END FOR
  
  // Fill DP table
  FOR i ← 1 TO m DO
    FOR j ← 1 TO n DO
      IF str1[i − 1] = str2[j − 1] THEN
        dp[i][j] ← dp[i − 1][j − 1]  // No operation needed
      ELSE
        dp[i][j] ← 1 + MIN(
          dp[i − 1][j],    // Delete from str1
          dp[i][j − 1],    // Insert to str1
          dp[i − 1][j − 1] // Replace in str1
        )
      END IF
    END FOR
  END FOR
  
  RETURN dp[m][n]
END FUNCTION
```

**Space-optimized version**
```pseudo
FUNCTION EditDistanceOptimized(str1, str2)
  m ← LENGTH(str1)
  n ← LENGTH(str2)
  IF m < n THEN
    SWAP(str1, str2)
    SWAP(m, n)
  END IF
  
  prev ← NEW ARRAY[n + 1]
  curr ← NEW ARRAY[n + 1]
  
  // Initialize first row
  FOR j ← 0 TO n DO
    prev[j] ← j
  END FOR
  
  FOR i ← 1 TO m DO
    curr[0] ← i
    FOR j ← 1 TO n DO
      IF str1[i − 1] = str2[j − 1] THEN
        curr[j] ← prev[j − 1]
      ELSE
        curr[j] ← 1 + MIN(prev[j], curr[j − 1], prev[j − 1])
      END IF
    END FOR
    
    SWAP(prev, curr)
  END FOR
  
  RETURN prev[n]
END FUNCTION
```

**Edit Distance with operation tracking**
```pseudo
FUNCTION EditDistanceWithPath(str1, str2)
  m ← LENGTH(str1)
  n ← LENGTH(str2)
  dp ← NEW ARRAY[m + 1][n + 1]
  operations ← NEW ARRAY[m + 1][n + 1]  // Track operations
    
    // Initialize and fill similar to above, but also track operations
    // operations[i][j] = "insert"/"delete"/"replace"/"match"
    
    // Reconstruct path from dp table
    return backtrackOperations(operations, str1, str2, m, n)

// Applications:
// 1. Spell checkers - find closest valid words
// 2. DNA sequence alignment - biological applications  
// 3. Plagiarism detection - text similarity
// 4. Version control - diff algorithms
// 5. Machine translation - sequence alignment
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class EditDistance {
    
    // Basic Edit Distance implementation
    public static int editDistance(String str1, String str2) {
        int m = str1.length();
        int n = str2.length();
        
        int[][] dp = new int[m + 1][n + 1];
        
        // Initialize base cases
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i; // Delete all characters from str1
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j; // Insert all characters to str1
        }
        
        // Fill DP table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1]; // No operation needed
                } else {
                    dp[i][j] = 1 + Math.min(
                        Math.min(dp[i - 1][j], dp[i][j - 1]), // Delete or Insert
                        dp[i - 1][j - 1] // Replace
                    );
                }
            }
        }
        
        return dp[m][n];
    }
    
    // Space-optimized O(min(m,n)) space version
    public static int editDistanceOptimized(String str1, String str2) {
        // Ensure str1 is the shorter string for space optimization
        if (str1.length() > str2.length()) {
            return editDistanceOptimized(str2, str1);
        }
        
        int m = str1.length();
        int n = str2.length();
        
        int[] prev = new int[m + 1];
        int[] curr = new int[m + 1];
        
        // Initialize first row
        for (int i = 0; i <= m; i++) {
            prev[i] = i;
        }
        
        for (int j = 1; j <= n; j++) {
            curr[0] = j;
            for (int i = 1; i <= m; i++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    curr[i] = prev[i - 1];
                } else {
                    curr[i] = 1 + Math.min(
                        Math.min(prev[i], curr[i - 1]),
                        prev[i - 1]
                    );
                }
            }
            
            // Swap arrays
            int[] temp = prev;
            prev = curr;
            curr = temp;
        }
        
        return prev[m];
    }
    
    // Edit Distance with path reconstruction
    public static class EditResult {
        public int distance;
        public List<String> operations;
        
        public EditResult(int distance, List<String> operations) {
            this.distance = distance;
            this.operations = operations;
        }
    }
    
    public static EditResult editDistanceWithPath(String str1, String str2) {
        int m = str1.length();
        int n = str2.length();
        
        int[][] dp = new int[m + 1][n + 1];
        String[][] operations = new String[m + 1][n + 1];
        
        // Initialize base cases
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i;
            operations[i][0] = "DELETE";
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j;
            operations[0][j] = "INSERT";
        }
        operations[0][0] = "";
        
        // Fill DP table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                    operations[i][j] = "MATCH";
                } else {
                    int delete = dp[i - 1][j];
                    int insert = dp[i][j - 1];
                    int replace = dp[i - 1][j - 1];
                    
                    if (delete <= insert && delete <= replace) {
                        dp[i][j] = 1 + delete;
                        operations[i][j] = "DELETE";
                    } else if (insert <= replace) {
                        dp[i][j] = 1 + insert;
                        operations[i][j] = "INSERT";
                    } else {
                        dp[i][j] = 1 + replace;
                        operations[i][j] = "REPLACE";
                    }
                }
            }
        }
        
        // Reconstruct path
        List<String> path = new ArrayList<>();
        int i = m, j = n;
        
        while (i > 0 || j > 0) {
            String op = operations[i][j];
            
            switch (op) {
                case "MATCH":
                    path.add(0, "Match '" + str1.charAt(i - 1) + "'");
                    i--; j--;
                    break;
                case "REPLACE":
                    path.add(0, "Replace '" + str1.charAt(i - 1) + "' with '" + str2.charAt(j - 1) + "'");
                    i--; j--;
                    break;
                case "DELETE":
                    path.add(0, "Delete '" + str1.charAt(i - 1) + "'");
                    i--;
                    break;
                case "INSERT":
                    path.add(0, "Insert '" + str2.charAt(j - 1) + "'");
                    j--;
                    break;
            }
        }
        
        return new EditResult(dp[m][n], path);
    }
    
    // Test shortened for brevity - continues with weighted edit distance, LCS, etc.
    public static void main(String[] args) {
        String str1 = "intention";
        String str2 = "execution";
        
        System.out.println("Edit Distance: " + editDistance(str1, str2)); // 5
        System.out.println("Edit Distance (Optimized): " + editDistanceOptimized(str1, str2)); // 5
        
        EditResult result = editDistanceWithPath(str1, str2);
        System.out.println("Distance: " + result.distance);
        System.out.println("Operations: " + result.operations);
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Basic Edit Distance implementation
function editDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i; // Delete all characters from str1
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j; // Insert all characters to str1
    }
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // No operation needed
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // Delete from str1
                    dp[i][j - 1],     // Insert to str1
                    dp[i - 1][j - 1]  // Replace in str1
                );
            }
        }
    }
    
    return dp[m][n];
}

// Space-optimized O(min(m,n)) space version
function editDistanceOptimized(str1, str2) {
    // Ensure str1 is the shorter string for space optimization
    if (str1.length > str2.length) {
        return editDistanceOptimized(str2, str1);
    }
    
    const m = str1.length;
    const n = str2.length;
    
    let prev = Array(m + 1).fill(0).map((_, i) => i);
    let curr = Array(m + 1).fill(0);
    
    for (let j = 1; j <= n; j++) {
        curr[0] = j;
        for (let i = 1; i <= m; i++) {
            if (str1[i - 1] === str2[j - 1]) {
                curr[i] = prev[i - 1];
            } else {
                curr[i] = 1 + Math.min(prev[i], curr[i - 1], prev[i - 1]);
            }
        }
        
        // Swap arrays
        [prev, curr] = [curr, prev];
    }
    
    return prev[m];
}

// Edit Distance with path reconstruction
function editDistanceWithPath(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    const operations = Array(m + 1).fill().map(() => Array(n + 1).fill(''));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
        operations[i][0] = 'DELETE';
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
        operations[0][j] = 'INSERT';
    }
    operations[0][0] = '';
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
                operations[i][j] = 'MATCH';
            } else {
                const deleteOp = dp[i - 1][j];
                const insertOp = dp[i][j - 1];
                const replaceOp = dp[i - 1][j - 1];
                
                if (deleteOp <= insertOp && deleteOp <= replaceOp) {
                    dp[i][j] = 1 + deleteOp;
                    operations[i][j] = 'DELETE';
                } else if (insertOp <= replaceOp) {
                    dp[i][j] = 1 + insertOp;
                    operations[i][j] = 'INSERT';
                } else {
                    dp[i][j] = 1 + replaceOp;
                    operations[i][j] = 'REPLACE';
                }
            }
        }
    }
    
    // Reconstruct path
    const path = [];
    let i = m, j = n;
    
    while (i > 0 || j > 0) {
        const op = operations[i][j];
        
        switch (op) {
            case 'MATCH':
                path.unshift(`Match '${str1[i - 1]}'`);
                i--; j--;
                break;
            case 'REPLACE':
                path.unshift(`Replace '${str1[i - 1]}' with '${str2[j - 1]}'`);
                i--; j--;
                break;
            case 'DELETE':
                path.unshift(`Delete '${str1[i - 1]}'`);
                i--;
                break;
            case 'INSERT':
                path.unshift(`Insert '${str2[j - 1]}'`);
                j--;
                break;
        }
    }
    
    return { distance: dp[m][n], operations: path };
}

// Test examples
console.log("=== Edit Distance Tests ===");

const str1 = "intention";
const str2 = "execution";

console.log("Edit Distance:", editDistance(str1, str2)); // 5
console.log("Edit Distance (Optimized):", editDistanceOptimized(str1, str2)); // 5

const result = editDistanceWithPath(str1, str2);
console.log("Distance:", result.distance);
console.log("Operations:", result.operations);
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Edit Distance Result interface
interface EditResult {
    distance: number;
    operations: string[];
}

// Basic Edit Distance implementation
function editDistance(str1: string, str2: string): number {
    const m = str1.length;
    const n = str2.length;
    
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i; // Delete all characters from str1
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j; // Insert all characters to str1
    }
    
    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // No operation needed
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // Delete from str1
                    dp[i][j - 1],     // Insert to str1
                    dp[i - 1][j - 1]  // Replace in str1
                );
            }
        }
    }
    
    return dp[m][n];
}

// Advanced Edit Distance class
class EditDistanceAlgorithms {
    
    // Space-optimized version
    static optimized(str1: string, str2: string): number {
        if (str1.length > str2.length) {
            return EditDistanceAlgorithms.optimized(str2, str1);
        }
        
        const m = str1.length;
        const n = str2.length;
        
        let prev: number[] = Array(m + 1).fill(0).map((_, i) => i);
        let curr: number[] = Array(m + 1).fill(0);
        
        for (let j = 1; j <= n; j++) {
            curr[0] = j;
            for (let i = 1; i <= m; i++) {
                if (str1[i - 1] === str2[j - 1]) {
                    curr[i] = prev[i - 1];
                } else {
                    curr[i] = 1 + Math.min(prev[i], curr[i - 1], prev[i - 1]);
                }
            }
            
            [prev, curr] = [curr, prev];
        }
        
        return prev[m];
    }
    
    // Edit Distance with path reconstruction
    static withPath(str1: string, str2: string): EditResult {
        const m = str1.length;
        const n = str2.length;
        
        const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
        const operations: string[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(''));
        
        // Initialize base cases
        for (let i = 0; i <= m; i++) {
            dp[i][0] = i;
            operations[i][0] = 'DELETE';
        }
        for (let j = 0; j <= n; j++) {
            dp[0][j] = j;
            operations[0][j] = 'INSERT';
        }
        operations[0][0] = '';
        
        // Fill DP table
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                    operations[i][j] = 'MATCH';
                } else {
                    const deleteOp = dp[i - 1][j];
                    const insertOp = dp[i][j - 1];
                    const replaceOp = dp[i - 1][j - 1];
                    
                    if (deleteOp <= insertOp && deleteOp <= replaceOp) {
                        dp[i][j] = 1 + deleteOp;
                        operations[i][j] = 'DELETE';
                    } else if (insertOp <= replaceOp) {
                        dp[i][j] = 1 + insertOp;
                        operations[i][j] = 'INSERT';
                    } else {
                        dp[i][j] = 1 + replaceOp;
                        operations[i][j] = 'REPLACE';
                    }
                }
            }
        }
        
        // Reconstruct path
        const path: string[] = [];
        let i = m, j = n;
        
        while (i > 0 || j > 0) {
            const op = operations[i][j];
            
            switch (op) {
                case 'MATCH':
                    path.unshift(`Match '${str1[i - 1]}'`);
                    i--; j--;
                    break;
                case 'REPLACE':
                    path.unshift(`Replace '${str1[i - 1]}' with '${str2[j - 1]}'`);
                    i--; j--;
                    break;
                case 'DELETE':
                    path.unshift(`Delete '${str1[i - 1]}'`);
                    i--;
                    break;
                case 'INSERT':
                    path.unshift(`Insert '${str2[j - 1]}'`);
                    j--;
                    break;
            }
        }
        
        return { distance: dp[m][n], operations: path };
    }
}

// Test examples
const str1: string = "intention";
const str2: string = "execution";

console.log("Edit Distance:", editDistance(str1, str2)); // 5
console.log("Edit Distance (Optimized):", EditDistanceAlgorithms.optimized(str1, str2)); // 5

const result = EditDistanceAlgorithms.withPath(str1, str2);
console.log("Distance:", result.distance);
console.log("Operations:", result.operations);
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Index confusion**: off-by-one hibák a DP táblában → helytelen inicializálás
- **Operation tracking**: path reconstruction során helytelen irány → invalid operations sequence
- **Space optimization**: row/column felcserélése → memory access error
- **Base cases**: üres string kezelés hiánya → boundary condition bugs
- **Character comparison**: case sensitivity figyelmen kívül hagyása → incorrect matches

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Spell checkers**: Helyesírás-ellenőrzés és javaslatok
- **Bioinformatics**: DNS/protein szekvencia alignment
- **Natural language processing**: Text similarity és translation
- **Version control**: Diff algoritmusok és merge conflicts
- **Plagiarism detection**: Document similarity analysis

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mi a különbség edit distance és LCS között?
<details><summary>Válasz mutatása</summary>
Edit distance: minimum műveletek a transzformációhoz. LCS: leghosszabb közös részsorozat. Kapcsolat: Edit distance = m + n - 2×LCS (csak insert/delete esetén).
</details>

2. Hogyan optimalizálható a memóriahasználat O(min(m,n))-re?
<details><summary>Válasz mutatása</summary>
Csak két sort tárolunk: előző és jelenlegi. A rövidebb stringet használjuk oszlopként → space: O(min(m,n)).
</details>

3. Mikor használjunk weighted edit distance-t?
<details><summary>Válasz mutatása</summary>
Amikor különböző műveletek eltérő költséggel bírnak. Pl: billentyűzet layout alapján, vagy domain-specific penalties.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Edit Distance / Levenshtein Distance"** → Classic DP with space optimization
2. **"One Edit Distance"** → Optimized check without full DP table
3. **"Delete Operation for Two Strings"** → LCS-based approach
4. **"Minimum ASCII Delete Sum"** → Weighted variant with character values
5. **"Design a spell checker"** → Real-world application with performance considerations

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Longest Common Subsequence` · `Needleman-Wunsch` · `Smith-Waterman` · `Jaro-Winkler` · `Hamming Distance`

</div>

<div class="tags">
  <span class="tag">edit-distance</span>
  <span class="tag">dp</span>
  <span class="tag">string</span>
  <span class="tag">levenshtein</span>
  <span class="tag">alignment</span>
  <span class="tag">medior</span>
</div>

### Coin Change - Érmék Váltása {#coin-change}
<!-- tags: coin-change, dp, greedy, knapsack, optimization, medior -->

<div class="concept-section mental-model">

💰 **Probléma megfogalmazása**  
*A Coin Change olyan, mint a kassza: adott érméket használva a minimum számú érmével szeretnénk kifizetni egy összeget. Ez klasszikus DP probléma két fő változattal: minimális érmeszám (optimization) és hányféleképpen lehet kifizetni (counting). A greedy megközelítés csak bizonyos érmekészleteknél működik!*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Bottom-up DP**: O(amount × coins) idő, O(amount) memória
- **Top-down DP**: O(amount × coins) idő + recursion stack
- **Counting variant**: O(amount × coins) idő, O(amount) memória
- **Space optimized**: O(amount) space for both variants
- **Greedy**: O(coins × log coins) DE nem mindig optimális!

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// 1. Minimum coins needed (optimization version)
function minCoins(coins, amount):
    dp = new Array(amount + 1, Infinity)
    dp[0] = 0  // Base case: 0 coins needed for amount 0
    
    for coin in coins:
        for i from coin to amount:
            if dp[i - coin] != Infinity:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] == Infinity ? -1 : dp[amount]

// 2. Number of ways to make change (counting version)
function countWays(coins, amount):
    dp = new Array(amount + 1, 0)
    dp[0] = 1  // Base case: 1 way to make amount 0
    
    for coin in coins:
        for i from coin to amount:
            dp[i] += dp[i - coin]
    
    return dp[amount]

// 3. Coin Change with coin tracking
function minCoinsWithPath(coins, amount):
    dp = new Array(amount + 1, Infinity)
    parent = new Array(amount + 1, -1)
    dp[0] = 0
    
    for i from 1 to amount:
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1
                parent[i] = coin
    
    if dp[amount] == Infinity:
        return null
    
    // Reconstruct solution
    result = []
    current = amount
    while current > 0:
        coin = parent[current]
        result.add(coin)
        current -= coin
    
    return result

// 4. Greedy approach (works for canonical coin systems)
function greedyCoinChange(coins, amount):
    coins.sort(reverse=true)  // Largest first
    result = []
    
    for coin in coins:
        while amount >= coin:
            result.add(coin)
            amount -= coin
    
    return amount == 0 ? result : null

// Applications:
// 1. Currency systems - making change optimally
// 2. Resource allocation - minimize resource usage
// 3. Knapsack problems - unlimited items variant
// 4. Game theory - optimal strategy problems
// 5. Network routing - minimum cost path problems
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class CoinChange {
    
    // 1. Minimum coins needed for amount
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // Use amount + 1 as "infinity"
        dp[0] = 0;
        
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
    
    // 2. Number of ways to make change
    public static int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1; // One way to make amount 0
        
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        
        return dp[amount];
    }
    
    // 3. Minimum coins with actual coin sequence
    public static class CoinResult {
        public int minCoins;
        public List<Integer> coins;
        
        public CoinResult(int minCoins, List<Integer> coins) {
            this.minCoins = minCoins;
            this.coins = coins;
        }
    }
    
    public static CoinResult coinChangeWithPath(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        int[] parent = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        Arrays.fill(parent, -1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i && dp[i - coin] + 1 < dp[i]) {
                    dp[i] = dp[i - coin] + 1;
                    parent[i] = coin;
                }
            }
        }
        
        if (dp[amount] > amount) {
            return new CoinResult(-1, new ArrayList<>());
        }
        
        // Reconstruct solution
        List<Integer> result = new ArrayList<>();
        int current = amount;
        while (current > 0) {
            int coin = parent[current];
            result.add(coin);
            current -= coin;
        }
        
        Collections.sort(result, Collections.reverseOrder());
        return new CoinResult(dp[amount], result);
    }
    
    // 4. Greedy approach (works for canonical systems like US coins)
    public static List<Integer> greedyCoinChange(int[] coins, int amount) {
        Arrays.sort(coins);
        // Reverse to get largest first
        for (int i = 0; i < coins.length / 2; i++) {
            int temp = coins[i];
            coins[i] = coins[coins.length - 1 - i];
            coins[coins.length - 1 - i] = temp;
        }
        
        List<Integer> result = new ArrayList<>();
        
        for (int coin : coins) {
            while (amount >= coin) {
                result.add(coin);
                amount -= coin;
            }
        }
        
        return amount == 0 ? result : null;
    }
    
    // 5. Top-down DP with memoization
    public static int coinChangeTopDown(int[] coins, int amount) {
        return coinChangeHelper(coins, amount, new HashMap<>());
    }
    
    private static int coinChangeHelper(int[] coins, int amount, Map<Integer, Integer> memo) {
        if (amount == 0) return 0;
        if (amount < 0) return -1;
        if (memo.containsKey(amount)) return memo.get(amount);
        
        int min = Integer.MAX_VALUE;
        for (int coin : coins) {
            int result = coinChangeHelper(coins, amount - coin, memo);
            if (result >= 0) {
                min = Math.min(min, result + 1);
            }
        }
        
        int result = min == Integer.MAX_VALUE ? -1 : min;
        memo.put(amount, result);
        return result;
    }
    
    // Test examples
    public static void main(String[] args) {
        int[] coins = {1, 3, 4};
        int amount = 6;
        
        System.out.println("Minimum coins for " + amount + ": " + coinChange(coins, amount)); // 2 (3+3)
        System.out.println("Number of ways: " + change(amount, coins)); // 3 ways
        
        CoinResult result = coinChangeWithPath(coins, amount);
        System.out.println("Min coins: " + result.minCoins + ", Coins: " + result.coins);
        
        // Greedy test with canonical coins
        int[] canonicalCoins = {1, 5, 10, 25};
        List<Integer> greedyResult = greedyCoinChange(canonicalCoins, 67);
        System.out.println("Greedy result: " + greedyResult); // [25, 25, 10, 5, 1, 1]
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// 1. Minimum coins needed for amount
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}

// 2. Number of ways to make change
function change(amount, coins) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1; // One way to make amount 0
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    
    return dp[amount];
}

// 3. Minimum coins with actual coin sequence
function coinChangeWithPath(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    const parent = new Array(amount + 1).fill(-1);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] + 1 < dp[i]) {
                dp[i] = dp[i - coin] + 1;
                parent[i] = coin;
            }
        }
    }
    
    if (dp[amount] > amount) {
        return { minCoins: -1, coins: [] };
    }
    
    // Reconstruct solution
    const result = [];
    let current = amount;
    while (current > 0) {
        const coin = parent[current];
        result.push(coin);
        current -= coin;
    }
    
    result.sort((a, b) => b - a); // Sort descending
    return { minCoins: dp[amount], coins: result };
}

// 4. Greedy approach (works for canonical systems)
function greedyCoinChange(coins, amount) {
    coins.sort((a, b) => b - a); // Largest first
    const result = [];
    
    for (const coin of coins) {
        while (amount >= coin) {
            result.push(coin);
            amount -= coin;
        }
    }
    
    return amount === 0 ? result : null;
}

// 5. Top-down DP with memoization
function coinChangeTopDown(coins, amount) {
    const memo = new Map();
    
    function helper(remainingAmount) {
        if (remainingAmount === 0) return 0;
        if (remainingAmount < 0) return -1;
        if (memo.has(remainingAmount)) return memo.get(remainingAmount);
        
        let min = Infinity;
        for (const coin of coins) {
            const result = helper(remainingAmount - coin);
            if (result >= 0) {
                min = Math.min(min, result + 1);
            }
        }
        
        const finalResult = min === Infinity ? -1 : min;
        memo.set(remainingAmount, finalResult);
        return finalResult;
    }
    
    return helper(amount);
}

// Test examples
console.log("=== Coin Change Tests ===");

const coins = [1, 3, 4];
const amount = 6;

console.log("Minimum coins for", amount + ":", coinChange(coins, amount)); // 2 (3+3)
console.log("Number of ways:", change(amount, coins)); // 3 ways

const result = coinChangeWithPath(coins, amount);
console.log("Min coins:", result.minCoins, "Coins:", result.coins);

// Greedy test with canonical coins
const canonicalCoins = [1, 5, 10, 25];
const greedyResult = greedyCoinChange(canonicalCoins, 67);
console.log("Greedy result:", greedyResult); // [25, 25, 10, 5, 1, 1]

console.log("Top-down result:", coinChangeTopDown(coins, amount));
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Coin Change result interface
interface CoinChangeResult {
    minCoins: number;
    coins: number[];
}

// Main Coin Change class
class CoinChangeAlgorithms {
    
    // 1. Minimum coins needed for amount
    static minCoins(coins: number[], amount: number): number {
        const dp: number[] = new Array(amount + 1).fill(amount + 1);
        dp[0] = 0;
        
        for (const coin of coins) {
            for (let i = coin; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
    
    // 2. Number of ways to make change
    static countWays(amount: number, coins: number[]): number {
        const dp: number[] = new Array(amount + 1).fill(0);
        dp[0] = 1; // One way to make amount 0
        
        for (const coin of coins) {
            for (let i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        
        return dp[amount];
    }
    
    // 3. Minimum coins with actual coin sequence
    static minCoinsWithPath(coins: number[], amount: number): CoinChangeResult {
        const dp: number[] = new Array(amount + 1).fill(amount + 1);
        const parent: number[] = new Array(amount + 1).fill(-1);
        dp[0] = 0;
        
        for (let i = 1; i <= amount; i++) {
            for (const coin of coins) {
                if (coin <= i && dp[i - coin] + 1 < dp[i]) {
                    dp[i] = dp[i - coin] + 1;
                    parent[i] = coin;
                }
            }
        }
        
        if (dp[amount] > amount) {
            return { minCoins: -1, coins: [] };
        }
        
        // Reconstruct solution
        const result: number[] = [];
        let current = amount;
        while (current > 0) {
            const coin = parent[current];
            result.push(coin);
            current -= coin;
        }
        
        result.sort((a, b) => b - a); // Sort descending
        return { minCoins: dp[amount], coins: result };
    }
    
    // 4. Greedy approach (works for canonical systems)
    static greedy(coins: number[], amount: number): number[] | null {
        const sortedCoins = [...coins].sort((a, b) => b - a); // Largest first
        const result: number[] = [];
        let remainingAmount = amount;
        
        for (const coin of sortedCoins) {
            while (remainingAmount >= coin) {
                result.push(coin);
                remainingAmount -= coin;
            }
        }
        
        return remainingAmount === 0 ? result : null;
    }
    
    // 5. Top-down DP with memoization
    static minCoinsTopDown(coins: number[], amount: number): number {
        const memo = new Map<number, number>();
        
        function helper(remainingAmount: number): number {
            if (remainingAmount === 0) return 0;
            if (remainingAmount < 0) return -1;
            if (memo.has(remainingAmount)) return memo.get(remainingAmount)!;
            
            let min = Infinity;
            for (const coin of coins) {
                const result = helper(remainingAmount - coin);
                if (result >= 0) {
                    min = Math.min(min, result + 1);
                }
            }
            
            const finalResult = min === Infinity ? -1 : min;
            memo.set(remainingAmount, finalResult);
            return finalResult;
        }
        
        return helper(amount);
    }
    
    // 6. Advanced: Change with limited coin quantities
    static changeWithLimitedCoins(coins: number[], quantities: number[], amount: number): number {
        const dp: number[] = new Array(amount + 1).fill(Infinity);
        dp[0] = 0;
        
        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i];
            const quantity = quantities[i];
            
            // Process this coin type with limited quantity
            for (let j = amount; j >= coin; j--) {
                for (let k = 1; k <= quantity && k * coin <= j; k++) {
                    if (dp[j - k * coin] !== Infinity) {
                        dp[j] = Math.min(dp[j], dp[j - k * coin] + k);
                    }
                }
            }
        }
        
        return dp[amount] === Infinity ? -1 : dp[amount];
    }
}

// Test examples
const coins: number[] = [1, 3, 4];
const amount: number = 6;

console.log("Minimum coins for", amount + ":", CoinChangeAlgorithms.minCoins(coins, amount)); // 2
console.log("Number of ways:", CoinChangeAlgorithms.countWays(amount, coins)); // 3

const result = CoinChangeAlgorithms.minCoinsWithPath(coins, amount);
console.log("Min coins:", result.minCoins, "Coins:", result.coins);

// Greedy test with canonical coins
const canonicalCoins: number[] = [1, 5, 10, 25];
const greedyResult = CoinChangeAlgorithms.greedy(canonicalCoins, 67);
console.log("Greedy result:", greedyResult);

console.log("Top-down result:", CoinChangeAlgorithms.minCoinsTopDown(coins, amount));

// Test limited quantities
const limitedCoins = [1, 3, 4];
const quantities = [2, 1, 1]; // 2 coins of value 1, 1 coin of value 3, 1 coin of value 4
console.log("Limited coins result:", CoinChangeAlgorithms.changeWithLimitedCoins(limitedCoins, quantities, 6));
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Greedy fallacy**: greedy mindig optimális → NEM! Pl: [1,3,4] érmékkel 6-hoz greedy: 4+1+1=3 érme, DP: 3+3=2 érme
- **Initialization error**: dp[0] helytelen inicializálása → base case failure
- **Infinite handling**: "infinity" érték túlcsordulása → use amount+1 instead of Integer.MAX_VALUE
- **Order dependency**: counting probléma esetén érme sorrend → duplicate counting
- **Space complexity**: felesleges 2D tömb használata → 1D elegendő

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Currency systems**: Optimal change making
- **Resource allocation**: Minimize resource usage with constraints
- **Knapsack variants**: Unlimited items problem
- **Network protocols**: Minimum cost routing
- **Game theory**: Optimal strategy with limited moves

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor NEM működik a greedy megközelítés?
<details><summary>Válasz mutatása</summary>
Nem-canonical érmekészleteknél. Pl: [1,3,4] coins, amount=6 → Greedy: 4+1+1=3, Optimal: 3+3=2. Canonical rendszerek (USD, EUR) esetén a greedy optimális.
</details>

2. Mi a különbség optimization és counting változat között?
<details><summary>Válasz mutatása</summary>
Optimization: minimum érmék száma. Counting: hányféleképpen alakítható ki az összeg. Mindkettő O(amount×coins), de különböző DP recurrence.
</details>

3. Hogyan építhető fel a megoldás sequence?
<details><summary>Válasz mutatása</summary>
Parent array tárolása: parent[i] = coin used to reach amount i. Backtrack: current→parent[current]→parent[parent[current]]...
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Coin Change"** → Classic DP optimization problem
2. **"Coin Change 2"** → Counting variations problem
3. **"Perfect Squares"** → Variant where coins are perfect squares
4. **"Minimum Cost For Tickets"** → Time-based variant with different durations
5. **"Number of Dice Rolls With Target Sum"** → Multiple coin types with constraints

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Unbounded Knapsack` · `Perfect Squares` · `Partition Problem` · `Target Sum` · `Combination Sum`

</div>

<div class="tags">
  <span class="tag">coin-change</span>
  <span class="tag">dp</span>
  <span class="tag">greedy</span>
  <span class="tag">knapsack</span>
  <span class="tag">optimization</span>
  <span class="tag">medior</span>
</div>

### Knapsack Problem - Hátizsák Probléma {#knapsack}
<!-- tags: knapsack, dp, optimization, 0-1-knapsack, unbounded, backtrack, medior -->

<div class="concept-section mental-model">

🎒 **Probléma megfogalmazása**  
*A Knapsack olyan, mint a perfekt csomagolás: korlátozott kapacitású hátizsákba szeretnénk a lehető legnagyobb értékű tárgyakat berakni. Két fő változat: 0/1 knapsack (minden tárgyból max 1 db) és unbounded (korlátlan darabszám). Ez az optimization problémák alapköve és a legtöbb real-world resource allocation probléma mögött áll.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **0/1 Knapsack**: O(n × W) idő, O(n × W) memória
- **Space optimized**: O(n × W) idő, O(W) memória
- **Unbounded Knapsack**: O(n × W) idő, O(W) memória
- **Fractional Knapsack**: O(n log n) greedy solution
- **With item tracking**: +O(n) extra space for solution reconstruction

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// 1. Classic 0/1 Knapsack
function knapsack01(weights, values, capacity):
    n = weights.length
    dp = new Array(n+1, capacity+1)
    
    // Initialize base cases
    for i from 0 to n:
        dp[i][0] = 0  // Zero capacity = zero value
    for w from 0 to capacity:
        dp[0][w] = 0  // Zero items = zero value
    
    // Fill DP table
    for i from 1 to n:
        for w from 1 to capacity:
            // Don't take item i-1
            dp[i][w] = dp[i-1][w]
            
            // Take item i-1 if it fits
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])
    
    return dp[n][capacity]

// 2. Space-optimized 0/1 Knapsack
function knapsackOptimized(weights, values, capacity):
    prev = new Array(capacity + 1, 0)
    curr = new Array(capacity + 1, 0)
    
    for i from 0 to weights.length-1:
        for w from 0 to capacity:
            curr[w] = prev[w]  // Don't take item
            
            if weights[i] <= w:
                curr[w] = max(curr[w], prev[w-weights[i]] + values[i])
        
        swap(prev, curr)
    
    return prev[capacity]

// 3. Unbounded Knapsack (unlimited items)
function unboundedKnapsack(weights, values, capacity):
    dp = new Array(capacity + 1, 0)
    
    for w from 1 to capacity:
        for i from 0 to weights.length-1:
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w-weights[i]] + values[i])
    
    return dp[capacity]

// 4. Knapsack with item tracking
function knapsackWithItems(weights, values, capacity):
    n = weights.length
    dp = new Array(n+1, capacity+1)
    
    // Fill DP table (same as classic)
    // ... fill logic here ...
    
    // Backtrack to find items
    items = []
    w = capacity
    for i from n down to 1:
        if dp[i][w] != dp[i-1][w]:
            items.add(i-1)  // Item i-1 was taken
            w -= weights[i-1]
    
    return {maxValue: dp[n][capacity], items: items.reverse()}

// 5. Fractional Knapsack (greedy approach)
function fractionalKnapsack(weights, values, capacity):
    items = []
    for i from 0 to weights.length-1:
        items.add({index: i, ratio: values[i]/weights[i], weight: weights[i], value: values[i]})
    
    items.sort(by ratio, descending)
    
    totalValue = 0
    remainingCapacity = capacity
    
    for item in items:
        if item.weight <= remainingCapacity:
            totalValue += item.value
            remainingCapacity -= item.weight
        else:
            fraction = remainingCapacity / item.weight
            totalValue += fraction * item.value
            break
    
    return totalValue

// Applications:
// 1. Resource allocation - budget optimization
// 2. Investment portfolios - risk/return optimization  
// 3. Cargo loading - shipping optimization
// 4. Task scheduling - deadline and value constraints
// 5. Memory management - cache optimization
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class KnapsackProblem {
    
    // 1. Classic 0/1 Knapsack
    public static int knapsack01(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];
        
        // Fill DP table
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                // Don't take item i-1
                dp[i][w] = dp[i - 1][w];
                
                // Take item i-1 if it fits
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i][w], 
                                       dp[i - 1][w - weights[i - 1]] + values[i - 1]);
                }
            }
        }
        
        return dp[n][capacity];
    }
    
    // 2. Space-optimized 0/1 Knapsack
    public static int knapsackOptimized(int[] weights, int[] values, int capacity) {
        int[] prev = new int[capacity + 1];
        int[] curr = new int[capacity + 1];
        
        for (int i = 0; i < weights.length; i++) {
            for (int w = 0; w <= capacity; w++) {
                curr[w] = prev[w]; // Don't take item
                
                if (weights[i] <= w) {
                    curr[w] = Math.max(curr[w], prev[w - weights[i]] + values[i]);
                }
            }
            
            // Swap arrays
            int[] temp = prev;
            prev = curr;
            curr = temp;
        }
        
        return prev[capacity];
    }
    
    // 3. Unbounded Knapsack
    public static int unboundedKnapsack(int[] weights, int[] values, int capacity) {
        int[] dp = new int[capacity + 1];
        
        for (int w = 1; w <= capacity; w++) {
            for (int i = 0; i < weights.length; i++) {
                if (weights[i] <= w) {
                    dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
                }
            }
        }
        
        return dp[capacity];
    }
    
    // 4. Knapsack with item tracking
    public static class KnapsackResult {
        public int maxValue;
        public List<Integer> items;
        
        public KnapsackResult(int maxValue, List<Integer> items) {
            this.maxValue = maxValue;
            this.items = items;
        }
    }
    
    public static KnapsackResult knapsackWithItems(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];
        
        // Fill DP table
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                dp[i][w] = dp[i - 1][w];
                
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i][w], 
                                       dp[i - 1][w - weights[i - 1]] + values[i - 1]);
                }
            }
        }
        
        // Backtrack to find items
        List<Integer> items = new ArrayList<>();
        int w = capacity;
        
        for (int i = n; i > 0; i--) {
            if (dp[i][w] != dp[i - 1][w]) {
                items.add(i - 1); // Item i-1 was taken
                w -= weights[i - 1];
            }
        }
        
        Collections.reverse(items);
        return new KnapsackResult(dp[n][capacity], items);
    }
    
    // 5. Fractional Knapsack (greedy)
    public static class Item {
        public int index;
        public double ratio;
        public int weight;
        public int value;
        
        public Item(int index, int weight, int value) {
            this.index = index;
            this.weight = weight;
            this.value = value;
            this.ratio = (double) value / weight;
        }
    }
    
    public static double fractionalKnapsack(int[] weights, int[] values, int capacity) {
        List<Item> items = new ArrayList<>();
        for (int i = 0; i < weights.length; i++) {
            items.add(new Item(i, weights[i], values[i]));
        }
        
        // Sort by value-to-weight ratio in descending order
        items.sort((a, b) -> Double.compare(b.ratio, a.ratio));
        
        double totalValue = 0.0;
        int remainingCapacity = capacity;
        
        for (Item item : items) {
            if (item.weight <= remainingCapacity) {
                totalValue += item.value;
                remainingCapacity -= item.weight;
            } else {
                double fraction = (double) remainingCapacity / item.weight;
                totalValue += fraction * item.value;
                break;
            }
        }
        
        return totalValue;
    }
    
    // Test examples
    public static void main(String[] args) {
        int[] weights = {10, 20, 30};
        int[] values = {60, 100, 120};
        int capacity = 50;
        
        System.out.println("0/1 Knapsack: " + knapsack01(weights, values, capacity)); // 220
        System.out.println("Optimized: " + knapsackOptimized(weights, values, capacity)); // 220
        System.out.println("Unbounded: " + unboundedKnapsack(weights, values, capacity)); // 300
        
        KnapsackResult result = knapsackWithItems(weights, values, capacity);
        System.out.println("Max value: " + result.maxValue + ", Items: " + result.items);
        
        System.out.println("Fractional: " + fractionalKnapsack(weights, values, capacity)); // 240.0
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// 1. Classic 0/1 Knapsack
function knapsack01(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    // Fill DP table
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            // Don't take item i-1
            dp[i][w] = dp[i - 1][w];
            
            // Take item i-1 if it fits
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w], 
                                   dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }
    
    return dp[n][capacity];
}

// 2. Space-optimized 0/1 Knapsack
function knapsackOptimized(weights, values, capacity) {
    let prev = Array(capacity + 1).fill(0);
    let curr = Array(capacity + 1).fill(0);
    
    for (let i = 0; i < weights.length; i++) {
        for (let w = 0; w <= capacity; w++) {
            curr[w] = prev[w]; // Don't take item
            
            if (weights[i] <= w) {
                curr[w] = Math.max(curr[w], prev[w - weights[i]] + values[i]);
            }
        }
        
        // Swap arrays
        [prev, curr] = [curr, prev];
    }
    
    return prev[capacity];
}

// 3. Unbounded Knapsack
function unboundedKnapsack(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    
    for (let w = 1; w <= capacity; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[capacity];
}

// 4. Knapsack with item tracking
function knapsackWithItems(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    // Fill DP table
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];
            
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w], 
                                   dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }
    
    // Backtrack to find items
    const items = [];
    let w = capacity;
    
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            items.push(i - 1); // Item i-1 was taken
            w -= weights[i - 1];
        }
    }
    
    items.reverse();
    return { maxValue: dp[n][capacity], items };
}

// 5. Fractional Knapsack (greedy)
function fractionalKnapsack(weights, values, capacity) {
    const items = weights.map((weight, index) => ({
        index,
        weight,
        value: values[index],
        ratio: values[index] / weight
    }));
    
    // Sort by value-to-weight ratio in descending order
    items.sort((a, b) => b.ratio - a.ratio);
    
    let totalValue = 0;
    let remainingCapacity = capacity;
    
    for (const item of items) {
        if (item.weight <= remainingCapacity) {
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            const fraction = remainingCapacity / item.weight;
            totalValue += fraction * item.value;
            break;
        }
    }
    
    return totalValue;
}

// Test examples
console.log("=== Knapsack Problem Tests ===");

const weights = [10, 20, 30];
const values = [60, 100, 120];
const capacity = 50;

console.log("0/1 Knapsack:", knapsack01(weights, values, capacity)); // 220
console.log("Optimized:", knapsackOptimized(weights, values, capacity)); // 220
console.log("Unbounded:", unboundedKnapsack(weights, values, capacity)); // 300

const result = knapsackWithItems(weights, values, capacity);
console.log("Max value:", result.maxValue, "Items:", result.items);

console.log("Fractional:", fractionalKnapsack(weights, values, capacity)); // 240
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Knapsack result interface
interface KnapsackResult {
    maxValue: number;
    items: number[];
}

// Item interface for fractional knapsack
interface Item {
    index: number;
    weight: number;
    value: number;
    ratio: number;
}

// Main Knapsack algorithms class
class KnapsackAlgorithms {
    
    // 1. Classic 0/1 Knapsack
    static classic01(weights: number[], values: number[], capacity: number): number {
        const n = weights.length;
        const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
        
        // Fill DP table
        for (let i = 1; i <= n; i++) {
            for (let w = 1; w <= capacity; w++) {
                // Don't take item i-1
                dp[i][w] = dp[i - 1][w];
                
                // Take item i-1 if it fits
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i][w], 
                                       dp[i - 1][w - weights[i - 1]] + values[i - 1]);
                }
            }
        }
        
        return dp[n][capacity];
    }
    
    // 2. Space-optimized 0/1 Knapsack
    static optimized(weights: number[], values: number[], capacity: number): number {
        let prev: number[] = Array(capacity + 1).fill(0);
        let curr: number[] = Array(capacity + 1).fill(0);
        
        for (let i = 0; i < weights.length; i++) {
            for (let w = 0; w <= capacity; w++) {
                curr[w] = prev[w]; // Don't take item
                
                if (weights[i] <= w) {
                    curr[w] = Math.max(curr[w], prev[w - weights[i]] + values[i]);
                }
            }
            
            // Swap arrays
            [prev, curr] = [curr, prev];
        }
        
        return prev[capacity];
    }
    
    // 3. Unbounded Knapsack
    static unbounded(weights: number[], values: number[], capacity: number): number {
        const dp: number[] = Array(capacity + 1).fill(0);
        
        for (let w = 1; w <= capacity; w++) {
            for (let i = 0; i < weights.length; i++) {
                if (weights[i] <= w) {
                    dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
                }
            }
        }
        
        return dp[capacity];
    }
    
    // 4. Knapsack with item tracking
    static withItems(weights: number[], values: number[], capacity: number): KnapsackResult {
        const n = weights.length;
        const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
        
        // Fill DP table
        for (let i = 1; i <= n; i++) {
            for (let w = 1; w <= capacity; w++) {
                dp[i][w] = dp[i - 1][w];
                
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i][w], 
                                       dp[i - 1][w - weights[i - 1]] + values[i - 1]);
                }
            }
        }
        
        // Backtrack to find items
        const items: number[] = [];
        let w = capacity;
        
        for (let i = n; i > 0; i--) {
            if (dp[i][w] !== dp[i - 1][w]) {
                items.push(i - 1); // Item i-1 was taken
                w -= weights[i - 1];
            }
        }
        
        items.reverse();
        return { maxValue: dp[n][capacity], items };
    }
    
    // 5. Fractional Knapsack (greedy)
    static fractional(weights: number[], values: number[], capacity: number): number {
        const items: Item[] = weights.map((weight, index) => ({
            index,
            weight,
            value: values[index],
            ratio: values[index] / weight
        }));
        
        // Sort by value-to-weight ratio in descending order
        items.sort((a, b) => b.ratio - a.ratio);
        
        let totalValue = 0;
        let remainingCapacity = capacity;
        
        for (const item of items) {
            if (item.weight <= remainingCapacity) {
                totalValue += item.value;
                remainingCapacity -= item.weight;
            } else {
                const fraction = remainingCapacity / item.weight;
                totalValue += fraction * item.value;
                break;
            }
        }
        
        return totalValue;
    }
    
    // 6. Multiple Knapsack variant
    static multipleKnapsack(weights: number[], values: number[], quantities: number[], capacity: number): number {
        const dp: number[] = Array(capacity + 1).fill(0);
        
        for (let i = 0; i < weights.length; i++) {
            const weight = weights[i];
            const value = values[i];
            const quantity = quantities[i];
            
            // Process this item type with limited quantity
            for (let j = capacity; j >= weight; j--) {
                for (let k = 1; k <= quantity && k * weight <= j; k++) {
                    dp[j] = Math.max(dp[j], dp[j - k * weight] + k * value);
                }
            }
        }
        
        return dp[capacity];
    }
}

// Test examples
const weights: number[] = [10, 20, 30];
const values: number[] = [60, 100, 120];
const capacity: number = 50;

console.log("0/1 Knapsack:", KnapsackAlgorithms.classic01(weights, values, capacity)); // 220
console.log("Optimized:", KnapsackAlgorithms.optimized(weights, values, capacity)); // 220
console.log("Unbounded:", KnapsackAlgorithms.unbounded(weights, values, capacity)); // 300

const result = KnapsackAlgorithms.withItems(weights, values, capacity);
console.log("Max value:", result.maxValue, "Items:", result.items);

console.log("Fractional:", KnapsackAlgorithms.fractional(weights, values, capacity)); // 240

// Test multiple knapsack
const quantities: number[] = [1, 2, 1]; // Limited quantities
console.log("Multiple:", KnapsackAlgorithms.multipleKnapsack(weights, values, quantities, capacity));
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Array boundaries**: weight <= w feltétel hiánya → array index out of bounds
- **Space optimization**: backward iteration hiánya → overwriting needed values
- **Item tracking**: rossz irányú backtrack → invalid solution reconstruction
- **Unbounded vs 0/1**: rossz loop order → incorrect recurrence relation
- **Fractional confusion**: 0/1 és fractional összekeverése → wrong algorithm choice

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Resource allocation**: Budget optimization with constraints
- **Investment portfolios**: Risk/return optimization
- **Cargo loading**: Shipping and logistics optimization
- **Task scheduling**: Deadline and priority constraints
- **Memory management**: Cache optimization strategies

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mi a különbség 0/1 és unbounded knapsack között?
<details><summary>Válasz mutatása</summary>
0/1: minden tárgyból max 1 db használható. Unbounded: korlátlan darabszám. Loop order különbözik: 0/1-nél items→weights, unbounded-nál weights→items.
</details>

2. Mikor használható greedy megközelítés?
<details><summary>Válasz mutatása</summary>
Fractional knapsack esetén, amikor törhetőek a tárgyak. Value/weight ratio szerint rendezve greedy optimális. 0/1 knapsack-nál greedy nem működik.
</details>

3. Hogyan optimalizálható a memóriahasználat?
<details><summary>Válasz mutatása</summary>
2D→1D: csak aktuális és előző sor tárolása. 0/1-nél backward iteration szükséges az overwriting elkerülésére.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"0/1 Knapsack Problem"** → Classic DP optimization
2. **"Partition Equal Subset Sum"** → Knapsack variant with target sum
3. **"Target Sum"** → Assignment of +/- signs optimization
4. **"Last Stone Weight II"** → Minimize difference optimization
5. **"Ones and Zeroes"** → 2D knapsack with multiple constraints

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Subset Sum` · `Partition Problem` · `Coin Change` · `Bin Packing` · `Multi-dimensional Knapsack`

</div>

<div class="tags">
  <span class="tag">knapsack</span>
  <span class="tag">dp</span>
  <span class="tag">optimization</span>
  <span class="tag">0-1-knapsack</span>
  <span class="tag">unbounded</span>
  <span class="tag">backtrack</span>
  <span class="tag">medior</span>
</div>

</section>

<!-- Tree Algorithms Section -->
<section class="concept-section" id="tree-algorithms">

## 🌳 Tree Algorithms {#tree-algorithms}

### Tree Traversal - Fa Bejárás {#tree-traversal}
<!-- tags: tree-traversal, binary-tree, dfs, bfs, inorder, preorder, postorder, junior -->

<div class="concept-section mental-model">

🌲 **Probléma megfogalmazása**  
*A Tree Traversal olyan, mint egy családfa felderítése: különböző stratégiákkal járhatjuk be a fa csomópontjait. A három fő DFS módszer (preorder, inorder, postorder) és a BFS (level order) mindegyikének más-más alkalmazási területe van. Az inorder binary search tree esetén rendezett sorrendet ad, a postorder bottom-up feldolgozáshoz, a preorder top-down feldolgozáshoz optimális.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **DFS traversals**: O(n) idő, O(h) memória (recursion stack)
- **BFS level order**: O(n) idő, O(w) memória (queue width)
- **Iterative DFS**: O(n) idő, O(h) memória (explicit stack)
- **Morris traversal**: O(n) idő, O(1) memória (no stack/recursion)
- **Worst case height**: O(n) for skewed tree, O(log n) for balanced

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// Tree Node structure
class TreeNode:
    int val
    TreeNode left, right
    
    constructor(val):
        this.val = val
        this.left = this.right = null

// 1. Preorder Traversal (Root → Left → Right)
function preorderRecursive(root, result):
    if root == null:
        return
    
    result.add(root.val)          // Visit root first
    preorderRecursive(root.left, result)   // Then left subtree
    preorderRecursive(root.right, result)  // Then right subtree

// 2. Inorder Traversal (Left → Root → Right)
function inorderRecursive(root, result):
    if root == null:
        return
    
    inorderRecursive(root.left, result)    // First left subtree
    result.add(root.val)                   // Then visit root
    inorderRecursive(root.right, result)   // Then right subtree

// 3. Postorder Traversal (Left → Right → Root)
function postorderRecursive(root, result):
    if root == null:
        return
    
    postorderRecursive(root.left, result)  // First left subtree
    postorderRecursive(root.right, result) // Then right subtree
    result.add(root.val)                   // Finally visit root

// 4. Level Order Traversal (BFS)
function levelOrder(root):
    if root == null:
        return []
    
    result = []
    queue = [root]
    
    while queue not empty:
        levelSize = queue.size()
        currentLevel = []
        
        for i from 0 to levelSize-1:
            node = queue.dequeue()
            currentLevel.add(node.val)
            
            if node.left:
                queue.enqueue(node.left)
            if node.right:
                queue.enqueue(node.right)
        
        result.add(currentLevel)
    
    return result

// 5. Iterative Preorder (using stack)
function preorderIterative(root):
    if root == null:
        return []
    
    result = []
    stack = [root]
    
    while stack not empty:
        node = stack.pop()
        result.add(node.val)
        
        // Push right first, then left (stack is LIFO)
        if node.right:
            stack.push(node.right)
        if node.left:
            stack.push(node.left)
    
    return result

// 6. Morris Inorder Traversal (O(1) space)
function morrisInorder(root):
    result = []
    current = root
    
    while current != null:
        if current.left == null:
            result.add(current.val)
            current = current.right
        else:
            // Find inorder predecessor
            predecessor = current.left
            while predecessor.right != null and predecessor.right != current:
                predecessor = predecessor.right
            
            if predecessor.right == null:
                // Create thread
                predecessor.right = current
                current = current.left
            else:
                // Remove thread and visit current
                predecessor.right = null
                result.add(current.val)
                current = current.right
    
    return result

// Applications:
// 1. Binary Search Trees - inorder gives sorted sequence
// 2. Expression trees - postorder for evaluation
// 3. File systems - preorder for directory listing
// 4. Syntax trees - different orders for different parsing needs
// 5. Binary tree serialization/deserialization
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

// Tree Node definition
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class TreeTraversal {
    
    // 1. Preorder Traversal (Root → Left → Right)
    public static List<Integer> preorderRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorderHelper(root, result);
        return result;
    }
    
    private static void preorderHelper(TreeNode root, List<Integer> result) {
        if (root == null) return;
        
        result.add(root.val);              // Visit root first
        preorderHelper(root.left, result); // Then left subtree
        preorderHelper(root.right, result); // Then right subtree
    }
    
    // 2. Inorder Traversal (Left → Root → Right)
    public static List<Integer> inorderRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorderHelper(root, result);
        return result;
    }
    
    private static void inorderHelper(TreeNode root, List<Integer> result) {
        if (root == null) return;
        
        inorderHelper(root.left, result);  // First left subtree
        result.add(root.val);              // Then visit root
        inorderHelper(root.right, result); // Then right subtree
    }
    
    // 3. Postorder Traversal (Left → Right → Root)
    public static List<Integer> postorderRecursive(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorderHelper(root, result);
        return result;
    }
    
    private static void postorderHelper(TreeNode root, List<Integer> result) {
        if (root == null) return;
        
        postorderHelper(root.left, result);  // First left subtree
        postorderHelper(root.right, result); // Then right subtree
        result.add(root.val);                // Finally visit root
    }
    
    // 4. Level Order Traversal (BFS)
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            
            result.add(currentLevel);
        }
        
        return result;
    }
    
    // 5. Iterative Preorder (using stack)
    public static List<Integer> preorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);
            
            // Push right first, then left (stack is LIFO)
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
        
        return result;
    }
    
    // 6. Iterative Inorder (using stack)
    public static List<Integer> inorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        
        while (current != null || !stack.isEmpty()) {
            // Go to the leftmost node
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            
            // Visit current node
            current = stack.pop();
            result.add(current.val);
            
            // Move to right subtree
            current = current.right;
        }
        
        return result;
    }
    
    // 7. Morris Inorder Traversal (O(1) space)
    public static List<Integer> morrisInorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        TreeNode current = root;
        
        while (current != null) {
            if (current.left == null) {
                result.add(current.val);
                current = current.right;
            } else {
                // Find inorder predecessor
                TreeNode predecessor = current.left;
                while (predecessor.right != null && predecessor.right != current) {
                    predecessor = predecessor.right;
                }
                
                if (predecessor.right == null) {
                    // Create thread
                    predecessor.right = current;
                    current = current.left;
                } else {
                    // Remove thread and visit current
                    predecessor.right = null;
                    result.add(current.val);
                    current = current.right;
                }
            }
        }
        
        return result;
    }
    
    // Test example
    public static void main(String[] args) {
        // Create test tree:     1
        //                      / \
        //                     2   3
        //                    / \
        //                   4   5
        TreeNode root = new TreeNode(1,
            new TreeNode(2, new TreeNode(4), new TreeNode(5)),
            new TreeNode(3)
        );
        
        System.out.println("Preorder: " + preorderRecursive(root));   // [1, 2, 4, 5, 3]
        System.out.println("Inorder: " + inorderRecursive(root));     // [4, 2, 5, 1, 3]
        System.out.println("Postorder: " + postorderRecursive(root)); // [4, 5, 2, 3, 1]
        System.out.println("Level order: " + levelOrder(root));       // [[1], [2, 3], [4, 5]]
        
        System.out.println("Preorder (iterative): " + preorderIterative(root));
        System.out.println("Inorder (iterative): " + inorderIterative(root));
        System.out.println("Morris inorder: " + morrisInorder(root));
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Tree Node definition
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// 1. Preorder Traversal (Root → Left → Right)
function preorderRecursive(root) {
    const result = [];
    
    function preorderHelper(node) {
        if (!node) return;
        
        result.push(node.val);        // Visit root first
        preorderHelper(node.left);    // Then left subtree
        preorderHelper(node.right);   // Then right subtree
    }
    
    preorderHelper(root);
    return result;
}

// 2. Inorder Traversal (Left → Root → Right)
function inorderRecursive(root) {
    const result = [];
    
    function inorderHelper(node) {
        if (!node) return;
        
        inorderHelper(node.left);     // First left subtree
        result.push(node.val);        // Then visit root
        inorderHelper(node.right);    // Then right subtree
    }
    
    inorderHelper(root);
    return result;
}

// 3. Postorder Traversal (Left → Right → Root)
function postorderRecursive(root) {
    const result = [];
    
    function postorderHelper(node) {
        if (!node) return;
        
        postorderHelper(node.left);   // First left subtree
        postorderHelper(node.right);  // Then right subtree
        result.push(node.val);        // Finally visit root
    }
    
    postorderHelper(root);
    return result;
}

// 4. Level Order Traversal (BFS)
function levelOrder(root) {
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

// 5. Iterative Preorder (using stack)
function preorderIterative(root) {
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

// 6. Iterative Inorder (using stack)
function inorderIterative(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current || stack.length > 0) {
        // Go to the leftmost node
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        // Visit current node
        current = stack.pop();
        result.push(current.val);
        
        // Move to right subtree
        current = current.right;
    }
    
    return result;
}

// 7. Morris Inorder Traversal (O(1) space)
function morrisInorder(root) {
    const result = [];
    let current = root;
    
    while (current) {
        if (!current.left) {
            result.push(current.val);
            current = current.right;
        } else {
            // Find inorder predecessor
            let predecessor = current.left;
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (!predecessor.right) {
                // Create thread
                predecessor.right = current;
                current = current.left;
            } else {
                // Remove thread and visit current
                predecessor.right = null;
                result.push(current.val);
                current = current.right;
            }
        }
    }
    
    return result;
}

// Test examples
console.log("=== Tree Traversal Tests ===");

// Create test tree:     1
//                      / \
//                     2   3
//                    / \
//                   4   5
const root = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
);

console.log("Preorder:", preorderRecursive(root));   // [1, 2, 4, 5, 3]
console.log("Inorder:", inorderRecursive(root));     // [4, 2, 5, 1, 3]
console.log("Postorder:", postorderRecursive(root)); // [4, 5, 2, 3, 1]
console.log("Level order:", levelOrder(root));       // [[1], [2, 3], [4, 5]]

console.log("Preorder (iterative):", preorderIterative(root));
console.log("Inorder (iterative):", inorderIterative(root));
console.log("Morris inorder:", morrisInorder(root));
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Tree Node definition
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

// Tree Traversal algorithms class
class TreeTraversalAlgorithms {
    
    // 1. Preorder Traversal (Root → Left → Right)
    static preorderRecursive(root: TreeNode | null): number[] {
        const result: number[] = [];
        
        function preorderHelper(node: TreeNode | null): void {
            if (!node) return;
            
            result.push(node.val);        // Visit root first
            preorderHelper(node.left);    // Then left subtree
            preorderHelper(node.right);   // Then right subtree
        }
        
        preorderHelper(root);
        return result;
    }
    
    // 2. Inorder Traversal (Left → Root → Right)
    static inorderRecursive(root: TreeNode | null): number[] {
        const result: number[] = [];
        
        function inorderHelper(node: TreeNode | null): void {
            if (!node) return;
            
            inorderHelper(node.left);     // First left subtree
            result.push(node.val);        // Then visit root
            inorderHelper(node.right);    // Then right subtree
        }
        
        inorderHelper(root);
        return result;
    }
    
    // 3. Postorder Traversal (Left → Right → Root)
    static postorderRecursive(root: TreeNode | null): number[] {
        const result: number[] = [];
        
        function postorderHelper(node: TreeNode | null): void {
            if (!node) return;
            
            postorderHelper(node.left);   // First left subtree
            postorderHelper(node.right);  // Then right subtree
            result.push(node.val);        // Finally visit root
        }
        
        postorderHelper(root);
        return result;
    }
    
    // 4. Level Order Traversal (BFS)
    static levelOrder(root: TreeNode | null): number[][] {
        if (!root) return [];
        
        const result: number[][] = [];
        const queue: TreeNode[] = [root];
        
        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel: number[] = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift()!;
                currentLevel.push(node.val);
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            
            result.push(currentLevel);
        }
        
        return result;
    }
    
    // 5. Iterative Preorder (using stack)
    static preorderIterative(root: TreeNode | null): number[] {
        if (!root) return [];
        
        const result: number[] = [];
        const stack: TreeNode[] = [root];
        
        while (stack.length > 0) {
            const node = stack.pop()!;
            result.push(node.val);
            
            // Push right first, then left (stack is LIFO)
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        
        return result;
    }
    
    // 6. Iterative Inorder (using stack)
    static inorderIterative(root: TreeNode | null): number[] {
        const result: number[] = [];
        const stack: TreeNode[] = [];
        let current: TreeNode | null = root;
        
        while (current || stack.length > 0) {
            // Go to the leftmost node
            while (current) {
                stack.push(current);
                current = current.left;
            }
            
            // Visit current node
            current = stack.pop()!;
            result.push(current.val);
            
            // Move to right subtree
            current = current.right;
        }
        
        return result;
    }
    
    // 7. Morris Inorder Traversal (O(1) space)
    static morrisInorder(root: TreeNode | null): number[] {
        const result: number[] = [];
        let current: TreeNode | null = root;
        
        while (current) {
            if (!current.left) {
                result.push(current.val);
                current = current.right;
            } else {
                // Find inorder predecessor
                let predecessor: TreeNode = current.left;
                while (predecessor.right && predecessor.right !== current) {
                    predecessor = predecessor.right;
                }
                
                if (!predecessor.right) {
                    // Create thread
                    predecessor.right = current;
                    current = current.left;
                } else {
                    // Remove thread and visit current
                    predecessor.right = null;
                    result.push(current.val);
                    current = current.right;
                }
            }
        }
        
        return result;
    }
    
    // 8. Advanced: Zigzag Level Order
    static zigzagLevelOrder(root: TreeNode | null): number[][] {
        if (!root) return [];
        
        const result: number[][] = [];
        const queue: TreeNode[] = [root];
        let leftToRight = true;
        
        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel: number[] = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift()!;
                
                if (leftToRight) {
                    currentLevel.push(node.val);
                } else {
                    currentLevel.unshift(node.val);
                }
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            
            result.push(currentLevel);
            leftToRight = !leftToRight;
        }
        
        return result;
    }
}

// Test examples
const root: TreeNode = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
);

console.log("Preorder:", TreeTraversalAlgorithms.preorderRecursive(root));   // [1, 2, 4, 5, 3]
console.log("Inorder:", TreeTraversalAlgorithms.inorderRecursive(root));     // [4, 2, 5, 1, 3]
console.log("Postorder:", TreeTraversalAlgorithms.postorderRecursive(root)); // [4, 5, 2, 3, 1]
console.log("Level order:", TreeTraversalAlgorithms.levelOrder(root));       // [[1], [2, 3], [4, 5]]

console.log("Preorder (iterative):", TreeTraversalAlgorithms.preorderIterative(root));
console.log("Inorder (iterative):", TreeTraversalAlgorithms.inorderIterative(root));
console.log("Morris inorder:", TreeTraversalAlgorithms.morrisInorder(root));
console.log("Zigzag level order:", TreeTraversalAlgorithms.zigzagLevelOrder(root));
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Stack overflow**: mély fák esetén recursion limit → iterative approach szükséges
- **Queue implementation**: array shift() használata → O(n) operation instead of O(1)
- **Morris traversal**: thread cleanup hiánya → infinite loop or corrupted tree
- **Null check**: base case hiánya recursive methods-ban → NullPointerException
- **Stack order**: iterative preorder-nél rossz push sorrend → incorrect traversal result

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Binary Search Trees**: Inorder traversal gives sorted sequence
- **Expression evaluation**: Postorder for evaluation, preorder for prefix notation
- **File system operations**: Preorder for directory listing
- **Syntax tree processing**: Different orders for different compiler phases
- **Tree serialization**: Converting tree to/from linear representation

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor használjunk Morris traversal-t?
<details><summary>Válasz mutatása</summary>
Amikor O(1) space complexity szükséges. Threading technique-et használ a recursion/stack helyett, de módosítja ideiglenesen a tree strukrúrát.
</details>

2. Mi a gyakorlati különbség inorder és preorder között BST-nél?
<details><summary>Válasz mutatása</summary>
Inorder: rendezett sorrend (ascending). Preorder: tree structure reconstruction lehetősége. Postorder: bottom-up processing (pl. directory size calculation).
</details>

3. Miért push-oljuk a right child-ot először iterative preorder-nél?
<details><summary>Válasz mutatása</summary>
Stack LIFO (Last In, First Out). Right first, then left → left pop-olódik először, ezért preorder: root, left, right sorrend marad.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Binary Tree Preorder/Inorder/Postorder Traversal"** → Basic traversal implementations
2. **"Binary Tree Level Order Traversal"** → BFS with level separation
3. **"Binary Tree Zigzag Level Order Traversal"** → Alternating direction BFS
4. **"Recover Binary Search Tree"** → Morris traversal application
5. **"Binary Tree Right Side View"** → Level order with rightmost elements

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Binary Search Tree` · `Tree Diameter` · `Lowest Common Ancestor` · `Path Sum` · `Tree Serialization`

</div>

<div class="tags">
  <span class="tag">tree-traversal</span>
  <span class="tag">binary-tree</span>
  <span class="tag">dfs</span>
  <span class="tag">bfs</span>
  <span class="tag">inorder</span>
  <span class="tag">preorder</span>
  <span class="tag">postorder</span>
  <span class="tag">junior</span>
</div>

### Lowest Common Ancestor - Legalacsonyabb Közös Ős {#lca}
<!-- tags: lca, binary-tree, recursion, parent-pointers, binary-lifting, medior -->

<div class="concept-section mental-model">

🔗 **Probléma megfogalmazása**  
*A Lowest Common Ancestor (LCA) olyan, mint a családfa közös ősének megtalálása: két csomópont legközelebbi közös őse a fában. Ez alapvető probléma tree algoritmusokban, többféle megközelítéssel: naiv parent pointer követés, rekurzív DFS, binary lifting (sparse table), és Tarjan's offline algoritmus. A megoldás komplexitása a fa típusától és query gyakoriságától függ.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Recursive DFS**: O(n) per query, O(h) space
- **Parent pointers**: O(h) per query, O(n) preprocessing
- **Binary lifting**: O(log n) per query, O(n log n) preprocessing/space
- **Tarjan's offline**: O(α(n)) per query, O(n) total for all queries
- **Range Minimum Query**: O(1) per query, O(n log n) preprocessing

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// 1. Basic Recursive LCA (Binary Tree)
function lcaRecursive(root, p, q):
    if root == null:
        return null
    
    // If current node is one of the target nodes
    if root == p or root == q:
        return root
    
    // Search in left and right subtrees
    leftLCA = lcaRecursive(root.left, p, q)
    rightLCA = lcaRecursive(root.right, p, q)
    
    // If found in both subtrees, current node is LCA
    if leftLCA != null and rightLCA != null:
        return root
    
    // Return the non-null result
    return leftLCA != null ? leftLCA : rightLCA

// 2. Binary Search Tree LCA (optimized)
function lcaBST(root, p, q):
    // Ensure p.val <= q.val
    if p.val > q.val:
        swap(p, q)
    
    current = root
    while current != null:
        if current.val > q.val:
            current = current.left    // Both nodes in left subtree
        elif current.val < p.val:
            current = current.right   // Both nodes in right subtree
        else:
            return current           // Found LCA
    
    return null

// 3. LCA with Parent Pointers
function lcaWithParents(p, q):
    // Get depths
    depthP = getDepth(p)
    depthQ = getDepth(q)
    
    // Bring to same level
    while depthP > depthQ:
        p = p.parent
        depthP--
    while depthQ > depthP:
        q = q.parent
        depthQ--
    
    // Move up until they meet
    while p != q:
        p = p.parent
        q = q.parent
    
    return p

// 4. Binary Lifting LCA (for multiple queries)
class BinaryLiftingLCA:
    function preprocess(root, n):
        LOG = ceil(log2(n))
        parent = new Array(n, LOG)  // parent[node][k] = 2^k-th ancestor
        depth = new Array(n)
        
        // DFS to fill parent[node][0] and depth
        dfs(root, -1, 0, parent, depth)
        
        // Fill binary lifting table
        for k from 1 to LOG-1:
            for node from 0 to n-1:
                if parent[node][k-1] != -1:
                    parent[node][k] = parent[parent[node][k-1]][k-1]
        
        this.parent = parent
        this.depth = depth
        this.LOG = LOG
    
    function query(u, v):
        // Make u deeper than v
        if depth[u] < depth[v]:
            swap(u, v)
        
        // Bring u to same level as v
        diff = depth[u] - depth[v]
        for k from 0 to LOG-1:
            if (diff >> k) & 1:
                u = parent[u][k]
        
        if u == v:
            return u
        
        // Binary search for LCA
        for k from LOG-1 down to 0:
            if parent[u][k] != parent[v][k]:
                u = parent[u][k]
                v = parent[v][k]
        
        return parent[u][0]

// 5. Tarjan's Offline LCA (Union-Find based)
function tarjanLCA(queries):
    ancestor = new Array(n)
    visited = new Array(n, false)
    
    function dfs(node):
        ancestor[node] = node
        
        for child in node.children:
            dfs(child)
            union(node, child)
            ancestor[find(node)] = node
        
        visited[node] = true
        
        for query in queries[node]:
            other = query.other
            if visited[other]:
                answer[query.id] = ancestor[find(other)]

// Applications:
// 1. Tree path queries - distance between nodes
// 2. Tree decomposition - heavy-light decomposition
// 3. Range queries on trees - convert to array queries
// 4. Version control systems - merge base finding
// 5. Phylogenetic trees - evolutionary relationships
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

// Tree Node definition
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode parent; // For parent pointer approach
    
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class LowestCommonAncestor {
    
    // 1. Basic Recursive LCA (Binary Tree)
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        // If current node is one of the target nodes
        if (root == p || root == q) {
            return root;
        }
        
        // Search in left and right subtrees
        TreeNode leftLCA = lowestCommonAncestor(root.left, p, q);
        TreeNode rightLCA = lowestCommonAncestor(root.right, p, q);
        
        // If found in both subtrees, current node is LCA
        if (leftLCA != null && rightLCA != null) {
            return root;
        }
        
        // Return the non-null result
        return leftLCA != null ? leftLCA : rightLCA;
    }
    
    // 2. Binary Search Tree LCA (optimized)
    public static TreeNode lowestCommonAncestorBST(TreeNode root, TreeNode p, TreeNode q) {
        // Ensure p.val <= q.val
        if (p.val > q.val) {
            TreeNode temp = p;
            p = q;
            q = temp;
        }
        
        TreeNode current = root;
        while (current != null) {
            if (current.val > q.val) {
                current = current.left;    // Both nodes in left subtree
            } else if (current.val < p.val) {
                current = current.right;   // Both nodes in right subtree
            } else {
                return current;           // Found LCA
            }
        }
        
        return null;
    }
    
    // 3. LCA with Parent Pointers
    public static TreeNode lowestCommonAncestorWithParents(TreeNode p, TreeNode q) {
        // Get depths
        int depthP = getDepth(p);
        int depthQ = getDepth(q);
        
        // Bring to same level
        while (depthP > depthQ) {
            p = p.parent;
            depthP--;
        }
        while (depthQ > depthP) {
            q = q.parent;
            depthQ--;
        }
        
        // Move up until they meet
        while (p != q) {
            p = p.parent;
            q = q.parent;
        }
        
        return p;
    }
    
    private static int getDepth(TreeNode node) {
        int depth = 0;
        while (node.parent != null) {
            node = node.parent;
            depth++;
        }
        return depth;
    }
    
    // 4. Binary Lifting LCA (for multiple queries)
    static class BinaryLiftingLCA {
        private int[][] parent;
        private int[] depth;
        private int LOG;
        private int n;
        
        public BinaryLiftingLCA(TreeNode root, int nodeCount) {
            this.n = nodeCount;
            this.LOG = (int) Math.ceil(Math.log(n) / Math.log(2)) + 1;
            this.parent = new int[n][LOG];
            this.depth = new int[n];
            
            // Initialize parent array with -1
            for (int i = 0; i < n; i++) {
                Arrays.fill(parent[i], -1);
            }
            
            preprocess(root, -1, 0);
            
            // Fill binary lifting table
            for (int k = 1; k < LOG; k++) {
                for (int node = 0; node < n; node++) {
                    if (parent[node][k-1] != -1) {
                        parent[node][k] = parent[parent[node][k-1]][k-1];
                    }
                }
            }
        }
        
        private void preprocess(TreeNode node, int par, int d) {
            if (node == null) return;
            
            parent[node.val][0] = par;
            depth[node.val] = d;
            
            preprocess(node.left, node.val, d + 1);
            preprocess(node.right, node.val, d + 1);
        }
        
        public int query(int u, int v) {
            // Make u deeper than v
            if (depth[u] < depth[v]) {
                int temp = u;
                u = v;
                v = temp;
            }
            
            // Bring u to same level as v
            int diff = depth[u] - depth[v];
            for (int k = 0; k < LOG; k++) {
                if (((diff >> k) & 1) == 1) {
                    u = parent[u][k];
                }
            }
            
            if (u == v) return u;
            
            // Binary search for LCA
            for (int k = LOG - 1; k >= 0; k--) {
                if (parent[u][k] != parent[v][k]) {
                    u = parent[u][k];
                    v = parent[v][k];
                }
            }
            
            return parent[u][0];
        }
    }
    
    // 5. Path between two nodes (using LCA)
    public static List<TreeNode> getPath(TreeNode root, TreeNode target) {
        List<TreeNode> path = new ArrayList<>();
        if (findPath(root, target, path)) {
            return path;
        }
        return new ArrayList<>();
    }
    
    private static boolean findPath(TreeNode root, TreeNode target, List<TreeNode> path) {
        if (root == null) return false;
        
        path.add(root);
        
        if (root == target) return true;
        
        if (findPath(root.left, target, path) || findPath(root.right, target, path)) {
            return true;
        }
        
        path.remove(path.size() - 1);
        return false;
    }
    
    public static int getDistance(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode lca = lowestCommonAncestor(root, p, q);
        List<TreeNode> pathP = getPath(root, p);
        List<TreeNode> pathQ = getPath(root, q);
        List<TreeNode> pathLCA = getPath(root, lca);
        
        return (pathP.size() - pathLCA.size()) + (pathQ.size() - pathLCA.size());
    }
    
    // Test examples
    public static void main(String[] args) {
        // Create test tree:     3
        //                      / \
        //                     5   1
        //                    / \ / \
        //                   6 2 0  8
        //                    / \
        //                   7   4
        TreeNode root = new TreeNode(3,
            new TreeNode(5, 
                new TreeNode(6), 
                new TreeNode(2, new TreeNode(7), new TreeNode(4))),
            new TreeNode(1, 
                new TreeNode(0), 
                new TreeNode(8))
        );
        
        TreeNode p = root.left; // Node 5
        TreeNode q = root.left.right.right; // Node 4
        
        TreeNode lca = lowestCommonAncestor(root, p, q);
        System.out.println("LCA of " + p.val + " and " + q.val + ": " + lca.val); // 5
        
        // Test distance
        int distance = getDistance(root, p, q);
        System.out.println("Distance between " + p.val + " and " + q.val + ": " + distance); // 3
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Tree Node definition
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.parent = null; // For parent pointer approach
    }
}

// 1. Basic Recursive LCA (Binary Tree)
function lowestCommonAncestor(root, p, q) {
    if (!root) return null;
    
    // If current node is one of the target nodes
    if (root === p || root === q) {
        return root;
    }
    
    // Search in left and right subtrees
    const leftLCA = lowestCommonAncestor(root.left, p, q);
    const rightLCA = lowestCommonAncestor(root.right, p, q);
    
    // If found in both subtrees, current node is LCA
    if (leftLCA && rightLCA) {
        return root;
    }
    
    // Return the non-null result
    return leftLCA || rightLCA;
}

// 2. Binary Search Tree LCA (optimized)
function lowestCommonAncestorBST(root, p, q) {
    // Ensure p.val <= q.val
    if (p.val > q.val) {
        [p, q] = [q, p];
    }
    
    let current = root;
    while (current) {
        if (current.val > q.val) {
            current = current.left;    // Both nodes in left subtree
        } else if (current.val < p.val) {
            current = current.right;   // Both nodes in right subtree
        } else {
            return current;           // Found LCA
        }
    }
    
    return null;
}

// 3. LCA with Parent Pointers
function lowestCommonAncestorWithParents(p, q) {
    // Get depths
    const getDepth = (node) => {
        let depth = 0;
        while (node.parent) {
            node = node.parent;
            depth++;
        }
        return depth;
    };
    
    let depthP = getDepth(p);
    let depthQ = getDepth(q);
    
    // Bring to same level
    while (depthP > depthQ) {
        p = p.parent;
        depthP--;
    }
    while (depthQ > depthP) {
        q = q.parent;
        depthQ--;
    }
    
    // Move up until they meet
    while (p !== q) {
        p = p.parent;
        q = q.parent;
    }
    
    return p;
}

// 4. Binary Lifting LCA (for multiple queries)
class BinaryLiftingLCA {
    constructor(root, nodeCount) {
        this.n = nodeCount;
        this.LOG = Math.ceil(Math.log2(nodeCount)) + 1;
        this.parent = Array(nodeCount).fill().map(() => Array(this.LOG).fill(-1));
        this.depth = Array(nodeCount).fill(0);
        
        this.preprocess(root, -1, 0);
        
        // Fill binary lifting table
        for (let k = 1; k < this.LOG; k++) {
            for (let node = 0; node < nodeCount; node++) {
                if (this.parent[node][k-1] !== -1) {
                    this.parent[node][k] = this.parent[this.parent[node][k-1]][k-1];
                }
            }
        }
    }
    
    preprocess(node, par, d) {
        if (!node) return;
        
        this.parent[node.val][0] = par;
        this.depth[node.val] = d;
        
        this.preprocess(node.left, node.val, d + 1);
        this.preprocess(node.right, node.val, d + 1);
    }
    
    query(u, v) {
        // Make u deeper than v
        if (this.depth[u] < this.depth[v]) {
            [u, v] = [v, u];
        }
        
        // Bring u to same level as v
        const diff = this.depth[u] - this.depth[v];
        for (let k = 0; k < this.LOG; k++) {
            if ((diff >> k) & 1) {
                u = this.parent[u][k];
            }
        }
        
        if (u === v) return u;
        
        // Binary search for LCA
        for (let k = this.LOG - 1; k >= 0; k--) {
            if (this.parent[u][k] !== this.parent[v][k]) {
                u = this.parent[u][k];
                v = this.parent[v][k];
            }
        }
        
        return this.parent[u][0];
    }
}

// 5. Path between two nodes (using LCA)
function getPath(root, target) {
    const path = [];
    
    function findPath(node) {
        if (!node) return false;
        
        path.push(node);
        
        if (node === target) return true;
        
        if (findPath(node.left) || findPath(node.right)) {
            return true;
        }
        
        path.pop();
        return false;
    }
    
    return findPath(root) ? path : [];
}

function getDistance(root, p, q) {
    const lca = lowestCommonAncestor(root, p, q);
    const pathP = getPath(root, p);
    const pathQ = getPath(root, q);
    const pathLCA = getPath(root, lca);
    
    return (pathP.length - pathLCA.length) + (pathQ.length - pathLCA.length);
}

// Test examples
console.log("=== Lowest Common Ancestor Tests ===");

// Create test tree:     3
//                      / \
//                     5   1
//                    / \ / \
//                   6 2 0  8
//                    / \
//                   7   4
const root = new TreeNode(3,
    new TreeNode(5, 
        new TreeNode(6), 
        new TreeNode(2, new TreeNode(7), new TreeNode(4))),
    new TreeNode(1, 
        new TreeNode(0), 
        new TreeNode(8))
);

const p = root.left; // Node 5
const q = root.left.right.right; // Node 4

const lca = lowestCommonAncestor(root, p, q);
console.log(`LCA of ${p.val} and ${q.val}: ${lca.val}`); // 5

const distance = getDistance(root, p, q);
console.log(`Distance between ${p.val} and ${q.val}: ${distance}`); // 3
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Tree Node definition
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    parent?: TreeNode | null; // For parent pointer approach
    
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
        this.parent = null;
    }
}

// LCA algorithms class
class LowestCommonAncestorAlgorithms {
    
    // 1. Basic Recursive LCA (Binary Tree)
    static recursive(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
        if (!root) return null;
        
        // If current node is one of the target nodes
        if (root === p || root === q) {
            return root;
        }
        
        // Search in left and right subtrees
        const leftLCA = LowestCommonAncestorAlgorithms.recursive(root.left, p, q);
        const rightLCA = LowestCommonAncestorAlgorithms.recursive(root.right, p, q);
        
        // If found in both subtrees, current node is LCA
        if (leftLCA && rightLCA) {
            return root;
        }
        
        // Return the non-null result
        return leftLCA || rightLCA;
    }
    
    // 2. Binary Search Tree LCA (optimized)
    static bst(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
        // Ensure p.val <= q.val
        if (p.val > q.val) {
            [p, q] = [q, p];
        }
        
        let current = root;
        while (current) {
            if (current.val > q.val) {
                current = current.left;    // Both nodes in left subtree
            } else if (current.val < p.val) {
                current = current.right;   // Both nodes in right subtree
            } else {
                return current;           // Found LCA
            }
        }
        
        return null;
    }
    
    // 3. LCA with Parent Pointers
    static withParents(p: TreeNode, q: TreeNode): TreeNode | null {
        const getDepth = (node: TreeNode): number => {
            let depth = 0;
            let current: TreeNode | null = node;
            while (current?.parent) {
                current = current.parent;
                depth++;
            }
            return depth;
        };
        
        let pCurrent: TreeNode | null = p;
        let qCurrent: TreeNode | null = q;
        let depthP = getDepth(p);
        let depthQ = getDepth(q);
        
        // Bring to same level
        while (depthP > depthQ && pCurrent?.parent) {
            pCurrent = pCurrent.parent;
            depthP--;
        }
        while (depthQ > depthP && qCurrent?.parent) {
            qCurrent = qCurrent.parent;
            depthQ--;
        }
        
        // Move up until they meet
        while (pCurrent && qCurrent && pCurrent !== qCurrent) {
            pCurrent = pCurrent.parent;
            qCurrent = qCurrent.parent;
        }
        
        return pCurrent;
    }
    
    // 4. Path utilities
    static getPath(root: TreeNode | null, target: TreeNode): TreeNode[] {
        const path: TreeNode[] = [];
        
        function findPath(node: TreeNode | null): boolean {
            if (!node) return false;
            
            path.push(node);
            
            if (node === target) return true;
            
            if (findPath(node.left) || findPath(node.right)) {
                return true;
            }
            
            path.pop();
            return false;
        }
        
        return findPath(root) ? path : [];
    }
    
    static getDistance(root: TreeNode | null, p: TreeNode, q: TreeNode): number {
        const lca = LowestCommonAncestorAlgorithms.recursive(root, p, q);
        if (!lca) return -1;
        
        const pathP = LowestCommonAncestorAlgorithms.getPath(root, p);
        const pathQ = LowestCommonAncestorAlgorithms.getPath(root, q);
        const pathLCA = LowestCommonAncestorAlgorithms.getPath(root, lca);
        
        return (pathP.length - pathLCA.length) + (pathQ.length - pathLCA.length);
    }
}

// Binary Lifting LCA class (for multiple queries)
class BinaryLiftingLCA {
    private parent: number[][];
    private depth: number[];
    private LOG: number;
    private n: number;
    
    constructor(root: TreeNode | null, nodeCount: number) {
        this.n = nodeCount;
        this.LOG = Math.ceil(Math.log2(nodeCount)) + 1;
        this.parent = Array(nodeCount).fill(null).map(() => Array(this.LOG).fill(-1));
        this.depth = Array(nodeCount).fill(0);
        
        this.preprocess(root, -1, 0);
        
        // Fill binary lifting table
        for (let k = 1; k < this.LOG; k++) {
            for (let node = 0; node < nodeCount; node++) {
                if (this.parent[node][k-1] !== -1) {
                    this.parent[node][k] = this.parent[this.parent[node][k-1]][k-1];
                }
            }
        }
    }
    
    private preprocess(node: TreeNode | null, par: number, d: number): void {
        if (!node) return;
        
        this.parent[node.val][0] = par;
        this.depth[node.val] = d;
        
        this.preprocess(node.left, node.val, d + 1);
        this.preprocess(node.right, node.val, d + 1);
    }
    
    query(u: number, v: number): number {
        // Make u deeper than v
        if (this.depth[u] < this.depth[v]) {
            [u, v] = [v, u];
        }
        
        // Bring u to same level as v
        const diff = this.depth[u] - this.depth[v];
        for (let k = 0; k < this.LOG; k++) {
            if ((diff >> k) & 1) {
                u = this.parent[u][k];
            }
        }
        
        if (u === v) return u;
        
        // Binary search for LCA
        for (let k = this.LOG - 1; k >= 0; k--) {
            if (this.parent[u][k] !== this.parent[v][k]) {
                u = this.parent[u][k];
                v = this.parent[v][k];
            }
        }
        
        return this.parent[u][0];
    }
}

// Test examples
const root: TreeNode = new TreeNode(3,
    new TreeNode(5, 
        new TreeNode(6), 
        new TreeNode(2, new TreeNode(7), new TreeNode(4))),
    new TreeNode(1, 
        new TreeNode(0), 
        new TreeNode(8))
);

const p: TreeNode = root.left!; // Node 5
const q: TreeNode = root.left!.right!.right!; // Node 4

const lca = LowestCommonAncestorAlgorithms.recursive(root, p, q);
console.log(`LCA of ${p.val} and ${q.val}: ${lca?.val}`); // 5

const distance = LowestCommonAncestorAlgorithms.getDistance(root, p, q);
console.log(`Distance between ${p.val} and ${q.val}: ${distance}`); // 3

// Test Binary Lifting
const binaryLiftLCA = new BinaryLiftingLCA(root, 9);
console.log(`Binary Lifting LCA: ${binaryLiftLCA.query(5, 4)}`); // 5
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **BST vs Binary Tree**: BST optimalizált algoritmust használunk általános binary tree-n → incorrect result
- **Parent pointer null check**: parent chain követése során null check hiánya → NullPointerException
- **Binary lifting bounds**: LOG értéke túl kicsi → array bounds error
- **Depth calculation**: root depth 0 vs 1 inconsistency → off-by-one errors
- **Node equality**: value comparison vs reference comparison → logical errors

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Tree path queries**: Distance calculation between nodes
- **Range queries on trees**: Converting tree queries to array queries
- **Version control systems**: Finding merge base in Git
- **Phylogenetic analysis**: Common evolutionary ancestors
- **Network routing**: Finding optimal connection points

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor érdemes Binary Lifting-et használni?
<details><summary>Válasz mutatása</summary>
Sok LCA query esetén: preprocessing O(n log n), query O(log n). Kevés query-nél egyszerű recursive O(n) per query hatékonyabb.
</details>

2. Mi a különbség BST és általános binary tree LCA között?
<details><summary>Válasz mutatása</summary>
BST: értékek alapján iterative O(log n). Binary tree: recursive/parent pointers O(n) worst case. BST-nél nem kell teljes fa bejárás.
</details>

3. Hogyan számítható ki két node távolsága LCA-val?
<details><summary>Válasz mutatása</summary>
Distance = depth(p) + depth(q) - 2×depth(LCA). LCA-ig vezető utak hosszának összege mínusz a közös szakasz duplikálása.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Lowest Common Ancestor of a Binary Tree"** → Basic recursive LCA
2. **"Lowest Common Ancestor of a Binary Search Tree"** → BST optimized version
3. **"Distance Between Nodes in BST"** → LCA-based distance calculation
4. **"All Nodes Distance K in Binary Tree"** → BFS from LCA with distance tracking
5. **"Binary Tree Maximum Path Sum"** → LCA-based path optimization

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Tree Diameter` · `Heavy-Light Decomposition` · `Tarjan's Offline LCA` · `Range Minimum Query` · `Tree DP`

</div>

<div class="tags">
  <span class="tag">lca</span>
  <span class="tag">binary-tree</span>
  <span class="tag">recursion</span>
  <span class="tag">parent-pointers</span>
  <span class="tag">binary-lifting</span>
  <span class="tag">medior</span>
</div>

### Tree DP - Dinamikus Programozás Fán {#tree-dp}
<!-- tags: tree-dp, dynamic-programming, postorder, memoization, rerooting, medior -->

<div class="concept-section mental-model">

🌳 **Probléma megfogalmazása**  
*A Tree DP olyan, mint a családfa értékeinek optimalizálása: minden csomópontban döntést hozunk (kiválasztjuk vagy nem), és a gyermek csomópontok eredményei alapján számítjuk ki a jelenlegi optimális értéket. Postorder traversal-lal bottom-up építjük fel a megoldást. A re-rooting technikaával minden csomópontot gyökérként kezelhetünk anélkül, hogy újra futtatnánk az algoritmust.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Basic Tree DP**: O(n) idő, O(h) memória (recursion stack)
- **Re-rooting DP**: O(n) idő, O(n) memória
- **Tree diameter**: O(n) idő, O(h) memória
- **Maximum path sum**: O(n) idő, O(h) memória
- **Subtree problems**: O(n) per query without preprocessing

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// 1. Tree DP Template (bottom-up)
function treeDP(node, parent):
    if node == null:
        return baseCase
    
    // Process all children first (postorder)
    childResults = []
    for child in node.children:
        if child != parent:
            childResults.add(treeDP(child, node))
    
    // Compute current node's result based on children
    return computeResult(node, childResults)

// 2. House Robber III (Tree DP classic)
function rob(root):
    // Returns [maxWithoutRoot, maxWithRoot]
    function robHelper(node):
        if node == null:
            return [0, 0]
        
        leftResult = robHelper(node.left)
        rightResult = robHelper(node.right)
        
        // Don't rob current node
        withoutCurrent = max(leftResult[0], leftResult[1]) + 
                        max(rightResult[0], rightResult[1])
        
        // Rob current node
        withCurrent = node.val + leftResult[0] + rightResult[0]
        
        return [withoutCurrent, withCurrent]
    
    result = robHelper(root)
    return max(result[0], result[1])

// 3. Tree Diameter (longest path in tree)
function treeDiameter(root):
    maxDiameter = 0
    
    function dfs(node):
        if node == null:
            return 0
        
        leftDepth = dfs(node.left)
        rightDepth = dfs(node.right)
        
        // Update diameter (path through current node)
        currentDiameter = leftDepth + rightDepth
        maxDiameter = max(maxDiameter, currentDiameter)
        
        // Return height of current subtree
        return 1 + max(leftDepth, rightDepth)
    
    dfs(root)
    return maxDiameter

// 4. Maximum Path Sum (any node to any node)
function maxPathSum(root):
    maxSum = Integer.MIN_VALUE
    
    function maxPathSumHelper(node):
        if node == null:
            return 0
        
        // Max sum from left/right children (0 if negative)
        leftMax = max(0, maxPathSumHelper(node.left))
        rightMax = max(0, maxPathSumHelper(node.right))
        
        // Max path through current node
        currentMax = node.val + leftMax + rightMax
        maxSum = max(maxSum, currentMax)
        
        // Return max path starting from current node
        return node.val + max(leftMax, rightMax)
    
    maxPathSumHelper(root)
    return maxSum

// 5. Re-rooting DP (all nodes as root)
function rerootingDP(tree):
    n = tree.nodeCount
    dp1 = new Array(n)  // Answer when node is in subtree
    dp2 = new Array(n)  // Answer when node considers all nodes
    
    // First DFS: compute subtree answers
    function dfs1(node, parent):
        dp1[node] = nodeValue[node]
        for child in adjList[node]:
            if child != parent:
                dfs1(child, node)
                dp1[node] += dp1[child]
    
    // Second DFS: re-root and compute all answers
    function dfs2(node, parent):
        dp2[node] = dp1[node]
        
        for child in adjList[node]:
            if child != parent:
                // Re-root: move root from node to child
                oldChildValue = dp1[child]
                oldNodeValue = dp1[node]
                
                // Update values for re-rooting
                dp1[node] -= dp1[child]
                dp1[child] += dp1[node]
                
                dfs2(child, node)
                
                // Restore original values
                dp1[child] = oldChildValue
                dp1[node] = oldNodeValue
    
    dfs1(0, -1)
    dfs2(0, -1)
    return dp2

// 6. Distance Sum (sum of distances from each node to all others)
function distanceSum(tree):
    n = tree.nodeCount
    subtreeSize = new Array(n)
    distSum = new Array(n)
    
    // First DFS: compute subtree sizes and initial distance sums
    function dfs1(node, parent):
        subtreeSize[node] = 1
        distSum[node] = 0
        
        for child in adjList[node]:
            if child != parent:
                dfs1(child, node)
                subtreeSize[node] += subtreeSize[child]
                distSum[node] += distSum[child] + subtreeSize[child]
    
    // Second DFS: re-root and update distance sums
    function dfs2(node, parent):
        for child in adjList[node]:
            if child != parent:
                // Move root from node to child
                distSum[child] = distSum[node] - subtreeSize[child] + (n - subtreeSize[child])
                dfs2(child, node)
    
    dfs1(0, -1)
    dfs2(0, -1)
    return distSum

// Applications:
// 1. Resource optimization - maximize/minimize values in tree structure
// 2. Network analysis - tree metrics and centrality measures
// 3. Phylogenetic analysis - evolutionary tree computations
// 4. File system analysis - directory size computations
// 5. Game theory - optimal strategies in tree-based games
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

// Tree Node definition
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class TreeDP {
    
    // 1. House Robber III (Tree DP classic)
    public static int rob(TreeNode root) {
        int[] result = robHelper(root);
        return Math.max(result[0], result[1]);
    }
    
    // Returns [maxWithoutRoot, maxWithRoot]
    private static int[] robHelper(TreeNode node) {
        if (node == null) {
            return new int[]{0, 0};
        }
        
        int[] leftResult = robHelper(node.left);
        int[] rightResult = robHelper(node.right);
        
        // Don't rob current node
        int withoutCurrent = Math.max(leftResult[0], leftResult[1]) + 
                            Math.max(rightResult[0], rightResult[1]);
        
        // Rob current node (can't rob children)
        int withCurrent = node.val + leftResult[0] + rightResult[0];
        
        return new int[]{withoutCurrent, withCurrent};
    }
    
    // 2. Tree Diameter (longest path in tree)
    static int maxDiameter = 0;
    
    public static int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        diameterHelper(root);
        return maxDiameter;
    }
    
    private static int diameterHelper(TreeNode node) {
        if (node == null) return 0;
        
        int leftDepth = diameterHelper(node.left);
        int rightDepth = diameterHelper(node.right);
        
        // Update diameter (path through current node)
        maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
        
        // Return height of current subtree
        return 1 + Math.max(leftDepth, rightDepth);
    }
    
    // 3. Maximum Path Sum (any node to any node)
    static int maxSum = Integer.MIN_VALUE;
    
    public static int maxPathSum(TreeNode root) {
        maxSum = Integer.MIN_VALUE;
        maxPathSumHelper(root);
        return maxSum;
    }
    
    private static int maxPathSumHelper(TreeNode node) {
        if (node == null) return 0;
        
        // Max sum from left/right children (0 if negative)
        int leftMax = Math.max(0, maxPathSumHelper(node.left));
        int rightMax = Math.max(0, maxPathSumHelper(node.right));
        
        // Max path through current node
        int currentMax = node.val + leftMax + rightMax;
        maxSum = Math.max(maxSum, currentMax);
        
        // Return max path starting from current node
        return node.val + Math.max(leftMax, rightMax);
    }
    
    // 4. Binary Tree Maximum Width
    public static int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        
        Queue<TreeNode> nodeQueue = new LinkedList<>();
        Queue<Integer> indexQueue = new LinkedList<>();
        nodeQueue.offer(root);
        indexQueue.offer(0);
        
        int maxWidth = 1;
        
        while (!nodeQueue.isEmpty()) {
            int size = nodeQueue.size();
            int start = indexQueue.peek();
            int end = start;
            
            for (int i = 0; i < size; i++) {
                TreeNode node = nodeQueue.poll();
                int index = indexQueue.poll();
                end = index;
                
                if (node.left != null) {
                    nodeQueue.offer(node.left);
                    indexQueue.offer(2 * index);
                }
                if (node.right != null) {
                    nodeQueue.offer(node.right);
                    indexQueue.offer(2 * index + 1);
                }
            }
            
            maxWidth = Math.max(maxWidth, end - start + 1);
        }
        
        return maxWidth;
    }
    
    // 5. Tree DP with memoization
    public static class TreeDPMemo {
        private Map<TreeNode, Integer> memo = new HashMap<>();
        
        public int computeWithMemo(TreeNode root) {
            if (root == null) return 0;
            if (memo.containsKey(root)) return memo.get(root);
            
            // Compute result based on children
            int leftResult = computeWithMemo(root.left);
            int rightResult = computeWithMemo(root.right);
            
            // Example: sum of all nodes in subtree
            int result = root.val + leftResult + rightResult;
            memo.put(root, result);
            return result;
        }
    }
    
    // 6. Re-rooting DP example (sum of distances)
    static class RerootingDP {
        private int n;
        private List<List<Integer>> adjList;
        private int[] subtreeSize;
        private long[] distSum;
        
        public RerootingDP(int nodeCount) {
            this.n = nodeCount;
            this.adjList = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                adjList.add(new ArrayList<>());
            }
            this.subtreeSize = new int[n];
            this.distSum = new long[n];
        }
        
        public void addEdge(int u, int v) {
            adjList.get(u).add(v);
            adjList.get(v).add(u);
        }
        
        public long[] computeDistanceSums() {
            dfs1(0, -1);
            dfs2(0, -1);
            return distSum;
        }
        
        private void dfs1(int node, int parent) {
            subtreeSize[node] = 1;
            distSum[node] = 0;
            
            for (int child : adjList.get(node)) {
                if (child != parent) {
                    dfs1(child, node);
                    subtreeSize[node] += subtreeSize[child];
                    distSum[node] += distSum[child] + subtreeSize[child];
                }
            }
        }
        
        private void dfs2(int node, int parent) {
            for (int child : adjList.get(node)) {
                if (child != parent) {
                    // Re-root from node to child
                    distSum[child] = distSum[node] - subtreeSize[child] + (n - subtreeSize[child]);
                    dfs2(child, node);
                }
            }
        }
    }
    
    // Test examples
    public static void main(String[] args) {
        // Create test tree:     3
        //                      / \
        //                     2   3
        //                      \   \
        //                       3   1
        TreeNode root = new TreeNode(3,
            new TreeNode(2, null, new TreeNode(3)),
            new TreeNode(3, null, new TreeNode(1))
        );
        
        System.out.println("House Robber III: " + rob(root)); // 7
        System.out.println("Tree Diameter: " + diameterOfBinaryTree(root)); // 3
        System.out.println("Max Path Sum: " + maxPathSum(root)); // 10
        
        TreeDPMemo memo = new TreeDPMemo();
        System.out.println("Sum with memoization: " + memo.computeWithMemo(root)); // 12
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Tree Node definition
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// 1. House Robber III (Tree DP classic)
function rob(root) {
    // Returns [maxWithoutRoot, maxWithRoot]
    function robHelper(node) {
        if (!node) return [0, 0];
        
        const leftResult = robHelper(node.left);
        const rightResult = robHelper(node.right);
        
        // Don't rob current node
        const withoutCurrent = Math.max(leftResult[0], leftResult[1]) + 
                              Math.max(rightResult[0], rightResult[1]);
        
        // Rob current node (can't rob children)
        const withCurrent = node.val + leftResult[0] + rightResult[0];
        
        return [withoutCurrent, withCurrent];
    }
    
    const result = robHelper(root);
    return Math.max(result[0], result[1]);
}

// 2. Tree Diameter (longest path in tree)
function diameterOfBinaryTree(root) {
    let maxDiameter = 0;
    
    function diameterHelper(node) {
        if (!node) return 0;
        
        const leftDepth = diameterHelper(node.left);
        const rightDepth = diameterHelper(node.right);
        
        // Update diameter (path through current node)
        maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
        
        // Return height of current subtree
        return 1 + Math.max(leftDepth, rightDepth);
    }
    
    diameterHelper(root);
    return maxDiameter;
}

// 3. Maximum Path Sum (any node to any node)
function maxPathSum(root) {
    let maxSum = Number.MIN_SAFE_INTEGER;
    
    function maxPathSumHelper(node) {
        if (!node) return 0;
        
        // Max sum from left/right children (0 if negative)
        const leftMax = Math.max(0, maxPathSumHelper(node.left));
        const rightMax = Math.max(0, maxPathSumHelper(node.right));
        
        // Max path through current node
        const currentMax = node.val + leftMax + rightMax;
        maxSum = Math.max(maxSum, currentMax);
        
        // Return max path starting from current node
        return node.val + Math.max(leftMax, rightMax);
    }
    
    maxPathSumHelper(root);
    return maxSum;
}

// 4. Tree DP with memoization
class TreeDPMemo {
    constructor() {
        this.memo = new Map();
    }
    
    computeWithMemo(root) {
        if (!root) return 0;
        if (this.memo.has(root)) return this.memo.get(root);
        
        // Compute result based on children
        const leftResult = this.computeWithMemo(root.left);
        const rightResult = this.computeWithMemo(root.right);
        
        // Example: sum of all nodes in subtree
        const result = root.val + leftResult + rightResult;
        this.memo.set(root, result);
        return result;
    }
}

// 5. Binary Tree Maximum Width
function widthOfBinaryTree(root) {
    if (!root) return 0;
    
    const nodeQueue = [root];
    const indexQueue = [0];
    let maxWidth = 1;
    
    while (nodeQueue.length > 0) {
        const size = nodeQueue.length;
        const start = indexQueue[0];
        let end = start;
        
        for (let i = 0; i < size; i++) {
            const node = nodeQueue.shift();
            const index = indexQueue.shift();
            end = index;
            
            if (node.left) {
                nodeQueue.push(node.left);
                indexQueue.push(2 * index);
            }
            if (node.right) {
                nodeQueue.push(node.right);
                indexQueue.push(2 * index + 1);
            }
        }
        
        maxWidth = Math.max(maxWidth, end - start + 1);
    }
    
    return maxWidth;
}

// 6. Re-rooting DP example (sum of distances)
class RerootingDP {
    constructor(nodeCount) {
        this.n = nodeCount;
        this.adjList = Array(nodeCount).fill().map(() => []);
        this.subtreeSize = Array(nodeCount).fill(0);
        this.distSum = Array(nodeCount).fill(0);
    }
    
    addEdge(u, v) {
        this.adjList[u].push(v);
        this.adjList[v].push(u);
    }
    
    computeDistanceSums() {
        this.dfs1(0, -1);
        this.dfs2(0, -1);
        return this.distSum;
    }
    
    dfs1(node, parent) {
        this.subtreeSize[node] = 1;
        this.distSum[node] = 0;
        
        for (const child of this.adjList[node]) {
            if (child !== parent) {
                this.dfs1(child, node);
                this.subtreeSize[node] += this.subtreeSize[child];
                this.distSum[node] += this.distSum[child] + this.subtreeSize[child];
            }
        }
    }
    
    dfs2(node, parent) {
        for (const child of this.adjList[node]) {
            if (child !== parent) {
                // Re-root from node to child
                this.distSum[child] = this.distSum[node] - this.subtreeSize[child] + 
                                     (this.n - this.subtreeSize[child]);
                this.dfs2(child, node);
            }
        }
    }
}

// Test examples
console.log("=== Tree DP Tests ===");

// Create test tree:     3
//                      / \
//                     2   3
//                      \   \
//                       3   1
const root = new TreeNode(3,
    new TreeNode(2, null, new TreeNode(3)),
    new TreeNode(3, null, new TreeNode(1))
);

console.log("House Robber III:", rob(root)); // 7
console.log("Tree Diameter:", diameterOfBinaryTree(root)); // 3
console.log("Max Path Sum:", maxPathSum(root)); // 10

const memo = new TreeDPMemo();
console.log("Sum with memoization:", memo.computeWithMemo(root)); // 12

console.log("Tree Width:", widthOfBinaryTree(root)); // 2
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Tree Node definition
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

// Tree DP algorithms class
class TreeDPAlgorithms {
    
    // 1. House Robber III (Tree DP classic)
    static rob(root: TreeNode | null): number {
        // Returns [maxWithoutRoot, maxWithRoot]
        function robHelper(node: TreeNode | null): [number, number] {
            if (!node) return [0, 0];
            
            const leftResult = robHelper(node.left);
            const rightResult = robHelper(node.right);
            
            // Don't rob current node
            const withoutCurrent = Math.max(leftResult[0], leftResult[1]) + 
                                  Math.max(rightResult[0], rightResult[1]);
            
            // Rob current node (can't rob children)
            const withCurrent = node.val + leftResult[0] + rightResult[0];
            
            return [withoutCurrent, withCurrent];
        }
        
        const result = robHelper(root);
        return Math.max(result[0], result[1]);
    }
    
    // 2. Tree Diameter (longest path in tree)
    static diameterOfBinaryTree(root: TreeNode | null): number {
        let maxDiameter = 0;
        
        function diameterHelper(node: TreeNode | null): number {
            if (!node) return 0;
            
            const leftDepth = diameterHelper(node.left);
            const rightDepth = diameterHelper(node.right);
            
            // Update diameter (path through current node)
            maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
            
            // Return height of current subtree
            return 1 + Math.max(leftDepth, rightDepth);
        }
        
        diameterHelper(root);
        return maxDiameter;
    }
    
    // 3. Maximum Path Sum (any node to any node)
    static maxPathSum(root: TreeNode | null): number {
        let maxSum = Number.MIN_SAFE_INTEGER;
        
        function maxPathSumHelper(node: TreeNode | null): number {
            if (!node) return 0;
            
            // Max sum from left/right children (0 if negative)
            const leftMax = Math.max(0, maxPathSumHelper(node.left));
            const rightMax = Math.max(0, maxPathSumHelper(node.right));
            
            // Max path through current node
            const currentMax = node.val + leftMax + rightMax;
            maxSum = Math.max(maxSum, currentMax);
            
            // Return max path starting from current node
            return node.val + Math.max(leftMax, rightMax);
        }
        
        maxPathSumHelper(root);
        return maxSum;
    }
    
    // 4. Binary Tree Maximum Width
    static widthOfBinaryTree(root: TreeNode | null): number {
        if (!root) return 0;
        
        const nodeQueue: TreeNode[] = [root];
        const indexQueue: number[] = [0];
        let maxWidth = 1;
        
        while (nodeQueue.length > 0) {
            const size = nodeQueue.length;
            const start = indexQueue[0];
            let end = start;
            
            for (let i = 0; i < size; i++) {
                const node = nodeQueue.shift()!;
                const index = indexQueue.shift()!;
                end = index;
                
                if (node.left) {
                    nodeQueue.push(node.left);
                    indexQueue.push(2 * index);
                }
                if (node.right) {
                    nodeQueue.push(node.right);
                    indexQueue.push(2 * index + 1);
                }
            }
            
            maxWidth = Math.max(maxWidth, end - start + 1);
        }
        
        return maxWidth;
    }
}

// Tree DP with memoization
class TreeDPMemo {
    private memo: Map<TreeNode, number> = new Map();
    
    computeWithMemo(root: TreeNode | null): number {
        if (!root) return 0;
        if (this.memo.has(root)) return this.memo.get(root)!;
        
        // Compute result based on children
        const leftResult = this.computeWithMemo(root.left);
        const rightResult = this.computeWithMemo(root.right);
        
        // Example: sum of all nodes in subtree
        const result = root.val + leftResult + rightResult;
        this.memo.set(root, result);
        return result;
    }
}

// Re-rooting DP example (sum of distances)
class RerootingDP {
    private n: number;
    private adjList: number[][];
    private subtreeSize: number[];
    private distSum: number[];
    
    constructor(nodeCount: number) {
        this.n = nodeCount;
        this.adjList = Array(nodeCount).fill(null).map(() => []);
        this.subtreeSize = Array(nodeCount).fill(0);
        this.distSum = Array(nodeCount).fill(0);
    }
    
    addEdge(u: number, v: number): void {
        this.adjList[u].push(v);
        this.adjList[v].push(u);
    }
    
    computeDistanceSums(): number[] {
        this.dfs1(0, -1);
        this.dfs2(0, -1);
        return this.distSum;
    }
    
    private dfs1(node: number, parent: number): void {
        this.subtreeSize[node] = 1;
        this.distSum[node] = 0;
        
        for (const child of this.adjList[node]) {
            if (child !== parent) {
                this.dfs1(child, node);
                this.subtreeSize[node] += this.subtreeSize[child];
                this.distSum[node] += this.distSum[child] + this.subtreeSize[child];
            }
        }
    }
    
    private dfs2(node: number, parent: number): void {
        for (const child of this.adjList[node]) {
            if (child !== parent) {
                // Re-root from node to child
                this.distSum[child] = this.distSum[node] - this.subtreeSize[child] + 
                                     (this.n - this.subtreeSize[child]);
                this.dfs2(child, node);
            }
        }
    }
}

// Test examples
const root: TreeNode = new TreeNode(3,
    new TreeNode(2, null, new TreeNode(3)),
    new TreeNode(3, null, new TreeNode(1))
);

console.log("House Robber III:", TreeDPAlgorithms.rob(root)); // 7
console.log("Tree Diameter:", TreeDPAlgorithms.diameterOfBinaryTree(root)); // 3
console.log("Max Path Sum:", TreeDPAlgorithms.maxPathSum(root)); // 10

const memo = new TreeDPMemo();
console.log("Sum with memoization:", memo.computeWithMemo(root)); // 12

console.log("Tree Width:", TreeDPAlgorithms.widthOfBinaryTree(root)); // 2

// Test re-rooting DP
const rerootDP = new RerootingDP(5);
rerootDP.addEdge(0, 1);
rerootDP.addEdge(0, 2);
rerootDP.addEdge(1, 3);
rerootDP.addEdge(1, 4);
console.log("Distance sums:", rerootDP.computeDistanceSums());
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **State definition**: rossz DP state → suboptimal solutions vagy incorrect recurrence
- **Base case**: null node handling hiánya → NullPointerException vagy infinite recursion
- **Postorder requirement**: children processing előtt current node update → incorrect DP values
- **Re-rooting complexity**: parent-child relationship tracking hibák → wrong subtree calculations
- **Memoization key**: node reference vs value-based caching → memory leaks vagy cache misses

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Network optimization**: Tree-structured network analysis
- **Resource allocation**: Hierarchical resource distribution
- **Game theory**: Tree-based decision optimization
- **Phylogenetic analysis**: Evolutionary tree computations
- **File system analysis**: Directory structure optimization

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért használunk postorder traversal-t Tree DP-ben?
<details><summary>Válasz mutatása</summary>
Bottom-up approach: gyermek eredmények alapján számítjuk ki a jelenlegi node értékét. Preorder-ben még nincs gyermek információ.
</details>

2. Mikor alkalmazzuk a re-rooting technikaát?
<details><summary>Válasz mutatása</summary>
Amikor minden node-ot gyökérként kell kezelni (pl. minden node-ból való távolságszámítás). Egyetlen DFS helyett két DFS-sel O(n) idő.
</details>

3. Mi a kapcsolat Tree DP és klasszikus DP között?
<details><summary>Válasz mutatása</summary>
Tree DP: optimal substructure tree-ben. Klasszikus DP: array/grid-ben. Mindkettő: részprobléma eredmények kombinálása optimális megoldáshoz.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"House Robber III"** → Classic Tree DP with binary choice
2. **"Diameter of Binary Tree"** → Path optimization through nodes
3. **"Binary Tree Maximum Path Sum"** → Complex path sum optimization
4. **"Distribute Coins in Binary Tree"** → Re-balancing tree resources
5. **"Sum of Distances in Tree"** → Re-rooting DP application

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Tree Rerooting` · `Heavy-Light Decomposition` · `Centroid Decomposition` · `Tree Hashing` · `LCA`

</div>

<div class="tags">
  <span class="tag">tree-dp</span>
  <span class="tag">dynamic-programming</span>
  <span class="tag">postorder</span>
  <span class="tag">memoization</span>
  <span class="tag">rerooting</span>
  <span class="tag">medior</span>
</div>

### Path Sum Problems - Út Összeg Problémák {#path-sum}
<!-- tags: path-sum, binary-tree, dfs, backtracking, prefix-sum, medior -->

<div class="concept-section mental-model">

🛤️ **Probléma megfogalmazása**  
*A Path Sum problémák olyan, mint az útvonal tervezés értékekkel: adott fa csomópontjain keresztül vezető útvonalak összegeit vizsgáljuk különféle feltételekkel. Root-to-leaf utak, any-to-any utak, adott összegű utak keresése, vagy akár útvonalak számlálása. A megoldások DFS backtracking-et, prefix sum technikákat és Tree DP megközelítéseket használnak.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Path Sum I/II**: O(n) idő, O(h) memória (DFS stack)
- **Path Sum III**: O(n²) naive, O(n) with prefix sum
- **Binary Tree Paths**: O(n × h) idő, O(n × h) memória (all paths)
- **Sum Root to Leaf**: O(n) idő, O(h) memória
- **Maximum Path Sum**: O(n) idő, O(h) memória

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// 1. Path Sum I - Root to Leaf with Target Sum
function hasPathSum(root, targetSum):
    if root == null:
        return false
    
    // Leaf node check
    if root.left == null and root.right == null:
        return root.val == targetSum
    
    // Recurse with remaining sum
    remainingSum = targetSum - root.val
    return hasPathSum(root.left, remainingSum) or 
           hasPathSum(root.right, remainingSum)

// 2. Path Sum II - All Root to Leaf Paths with Target Sum
function pathSum(root, targetSum):
    result = []
    currentPath = []
    
    function dfs(node, remainingSum):
        if node == null:
            return
        
        currentPath.add(node.val)
        
        // Leaf node with target sum
        if node.left == null and node.right == null and remainingSum == node.val:
            result.add(copy(currentPath))
        else:
            dfs(node.left, remainingSum - node.val)
            dfs(node.right, remainingSum - node.val)
        
        currentPath.removeLast()  // Backtrack
    
    dfs(root, targetSum)
    return result

// 3. Path Sum III - Any Node to Any Node with Target Sum
function pathSumIII(root, targetSum):
    prefixSumCount = new HashMap()
    prefixSumCount.put(0, 1)  // Base case for paths starting from root
    
    function dfs(node, currentSum):
        if node == null:
            return 0
        
        currentSum += node.val
        pathCount = 0
        
        // Check if there's a path ending at current node
        complement = currentSum - targetSum
        if prefixSumCount.containsKey(complement):
            pathCount += prefixSumCount.get(complement)
        
        // Add current sum to prefix count
        prefixSumCount.put(currentSum, prefixSumCount.getOrDefault(currentSum, 0) + 1)
        
        // Recurse to children
        pathCount += dfs(node.left, currentSum) + dfs(node.right, currentSum)
        
        // Backtrack: remove current sum from count
        prefixSumCount.put(currentSum, prefixSumCount.get(currentSum) - 1)
        
        return pathCount
    
    return dfs(root, 0)

// 4. Binary Tree Paths - All Root to Leaf Paths
function binaryTreePaths(root):
    result = []
    
    function dfs(node, currentPath):
        if node == null:
            return
        
        currentPath += node.val
        
        // Leaf node
        if node.left == null and node.right == null:
            result.add(currentPath)
        else:
            dfs(node.left, currentPath + "->")
            dfs(node.right, currentPath + "->")
    
    dfs(root, "")
    return result

// 5. Sum Root to Leaf Numbers
function sumNumbers(root):
    function dfs(node, currentNumber):
        if node == null:
            return 0
        
        currentNumber = currentNumber * 10 + node.val
        
        // Leaf node
        if node.left == null and node.right == null:
            return currentNumber
        
        return dfs(node.left, currentNumber) + dfs(node.right, currentNumber)
    
    return dfs(root, 0)

// 6. Maximum Path Sum (any node to any node)
function maxPathSum(root):
    maxSum = Integer.MIN_VALUE
    
    function maxPathHelper(node):
        if node == null:
            return 0
        
        // Max sum from children (ignore negative paths)
        leftMax = max(0, maxPathHelper(node.left))
        rightMax = max(0, maxPathHelper(node.right))
        
        // Current path through this node
        currentPathSum = node.val + leftMax + rightMax
        maxSum = max(maxSum, currentPathSum)
        
        // Return max path starting from this node
        return node.val + max(leftMax, rightMax)
    
    maxPathHelper(root)
    return maxSum

// 7. Path Sum with K Different Values
function pathSumWithKValues(root, targetSum, k):
    result = []
    
    function dfs(node, path, sum, used):
        if node == null:
            return
        
        path.add(node.val)
        sum += node.val
        used.add(node.val)
        
        // Leaf node with conditions met
        if node.left == null and node.right == null:
            if sum == targetSum and used.size() == k:
                result.add(copy(path))
        else:
            dfs(node.left, path, sum, used)
            dfs(node.right, path, sum, used)
        
        // Backtrack
        path.removeLast()
        used.remove(node.val)
    
    dfs(root, [], 0, new HashSet())
    return result

// Applications:
// 1. Decision trees - path-based decision making
// 2. Game trees - scoring paths in game states
// 3. Financial modeling - investment path analysis
// 4. Network routing - cost-based path selection
// 5. File system analysis - directory path computations
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

// Tree Node definition
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class PathSumProblems {
    
    // 1. Path Sum I - Root to Leaf with Target Sum
    public static boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        
        // Leaf node check
        if (root.left == null && root.right == null) {
            return root.val == targetSum;
        }
        
        // Recurse with remaining sum
        int remainingSum = targetSum - root.val;
        return hasPathSum(root.left, remainingSum) || 
               hasPathSum(root.right, remainingSum);
    }
    
    // 2. Path Sum II - All Root to Leaf Paths with Target Sum
    public static List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> currentPath = new ArrayList<>();
        dfsPathSum(root, targetSum, currentPath, result);
        return result;
    }
    
    private static void dfsPathSum(TreeNode node, int remainingSum, 
                                  List<Integer> currentPath, List<List<Integer>> result) {
        if (node == null) return;
        
        currentPath.add(node.val);
        
        // Leaf node with target sum
        if (node.left == null && node.right == null && remainingSum == node.val) {
            result.add(new ArrayList<>(currentPath));
        } else {
            dfsPathSum(node.left, remainingSum - node.val, currentPath, result);
            dfsPathSum(node.right, remainingSum - node.val, currentPath, result);
        }
        
        currentPath.remove(currentPath.size() - 1); // Backtrack
    }
    
    // 3. Path Sum III - Any Node to Any Node with Target Sum
    public static int pathSumIII(TreeNode root, int targetSum) {
        Map<Long, Integer> prefixSumCount = new HashMap<>();
        prefixSumCount.put(0L, 1); // Base case
        return dfsPathSumIII(root, 0L, targetSum, prefixSumCount);
    }
    
    private static int dfsPathSumIII(TreeNode node, long currentSum, int targetSum, 
                                    Map<Long, Integer> prefixSumCount) {
        if (node == null) return 0;
        
        currentSum += node.val;
        int pathCount = 0;
        
        // Check if there's a path ending at current node
        long complement = currentSum - targetSum;
        pathCount += prefixSumCount.getOrDefault(complement, 0);
        
        // Add current sum to prefix count
        prefixSumCount.put(currentSum, prefixSumCount.getOrDefault(currentSum, 0) + 1);
        
        // Recurse to children
        pathCount += dfsPathSumIII(node.left, currentSum, targetSum, prefixSumCount);
        pathCount += dfsPathSumIII(node.right, currentSum, targetSum, prefixSumCount);
        
        // Backtrack: remove current sum from count
        prefixSumCount.put(currentSum, prefixSumCount.get(currentSum) - 1);
        
        return pathCount;
    }
    
    // 4. Binary Tree Paths - All Root to Leaf Paths
    public static List<String> binaryTreePaths(TreeNode root) {
        List<String> result = new ArrayList<>();
        dfsBinaryTreePaths(root, "", result);
        return result;
    }
    
    private static void dfsBinaryTreePaths(TreeNode node, String currentPath, List<String> result) {
        if (node == null) return;
        
        currentPath += node.val;
        
        // Leaf node
        if (node.left == null && node.right == null) {
            result.add(currentPath);
        } else {
            dfsBinaryTreePaths(node.left, currentPath + "->", result);
            dfsBinaryTreePaths(node.right, currentPath + "->", result);
        }
    }
    
    // 5. Sum Root to Leaf Numbers
    public static int sumNumbers(TreeNode root) {
        return dfsSumNumbers(root, 0);
    }
    
    private static int dfsSumNumbers(TreeNode node, int currentNumber) {
        if (node == null) return 0;
        
        currentNumber = currentNumber * 10 + node.val;
        
        // Leaf node
        if (node.left == null && node.right == null) {
            return currentNumber;
        }
        
        return dfsSumNumbers(node.left, currentNumber) + 
               dfsSumNumbers(node.right, currentNumber);
    }
    
    // 6. Maximum Path Sum (any node to any node)
    static int maxSum = Integer.MIN_VALUE;
    
    public static int maxPathSum(TreeNode root) {
        maxSum = Integer.MIN_VALUE;
        maxPathHelper(root);
        return maxSum;
    }
    
    private static int maxPathHelper(TreeNode node) {
        if (node == null) return 0;
        
        // Max sum from children (ignore negative paths)
        int leftMax = Math.max(0, maxPathHelper(node.left));
        int rightMax = Math.max(0, maxPathHelper(node.right));
        
        // Current path through this node
        int currentPathSum = node.val + leftMax + rightMax;
        maxSum = Math.max(maxSum, currentPathSum);
        
        // Return max path starting from this node
        return node.val + Math.max(leftMax, rightMax);
    }
    
    // 7. Path Sum with Minimum/Maximum Constraints
    public static class PathSumConstraints {
        public static List<List<Integer>> pathSumWithConstraints(TreeNode root, int targetSum, 
                                                               int minPath, int maxPath) {
            List<List<Integer>> result = new ArrayList<>();
            List<Integer> currentPath = new ArrayList<>();
            dfsWithConstraints(root, targetSum, minPath, maxPath, currentPath, result);
            return result;
        }
        
        private static void dfsWithConstraints(TreeNode node, int remainingSum, int minPath, 
                                             int maxPath, List<Integer> currentPath, 
                                             List<List<Integer>> result) {
            if (node == null) return;
            
            currentPath.add(node.val);
            
            // Leaf node
            if (node.left == null && node.right == null) {
                if (remainingSum == node.val && 
                    currentPath.size() >= minPath && 
                    currentPath.size() <= maxPath) {
                    result.add(new ArrayList<>(currentPath));
                }
            } else {
                if (currentPath.size() < maxPath) { // Pruning
                    dfsWithConstraints(node.left, remainingSum - node.val, 
                                     minPath, maxPath, currentPath, result);
                    dfsWithConstraints(node.right, remainingSum - node.val, 
                                     minPath, maxPath, currentPath, result);
                }
            }
            
            currentPath.remove(currentPath.size() - 1); // Backtrack
        }
    }
    
    // Test examples
    public static void main(String[] args) {
        // Create test tree:     5
        //                      / \
        //                     4   8
        //                    /   / \
        //                   11  13  4
        //                  / \      \
        //                 7   2      1
        TreeNode root = new TreeNode(5,
            new TreeNode(4, 
                new TreeNode(11, new TreeNode(7), new TreeNode(2)), 
                null),
            new TreeNode(8, 
                new TreeNode(13), 
                new TreeNode(4, null, new TreeNode(1)))
        );
        
        System.out.println("Has Path Sum (22): " + hasPathSum(root, 22)); // true
        System.out.println("Path Sum II (22): " + pathSum(root, 22)); // [[5,4,11,2]]
        System.out.println("Path Sum III (8): " + pathSumIII(root, 8)); // 3
        System.out.println("Binary Tree Paths: " + binaryTreePaths(root));
        System.out.println("Sum Numbers: " + sumNumbers(root));
        System.out.println("Max Path Sum: " + maxPathSum(root));
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Tree Node definition
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// 1. Path Sum I - Root to Leaf with Target Sum
function hasPathSum(root, targetSum) {
    if (!root) return false;
    
    // Leaf node check
    if (!root.left && !root.right) {
        return root.val === targetSum;
    }
    
    // Recurse with remaining sum
    const remainingSum = targetSum - root.val;
    return hasPathSum(root.left, remainingSum) || 
           hasPathSum(root.right, remainingSum);
}

// 2. Path Sum II - All Root to Leaf Paths with Target Sum
function pathSum(root, targetSum) {
    const result = [];
    const currentPath = [];
    
    function dfs(node, remainingSum) {
        if (!node) return;
        
        currentPath.push(node.val);
        
        // Leaf node with target sum
        if (!node.left && !node.right && remainingSum === node.val) {
            result.push([...currentPath]);
        } else {
            dfs(node.left, remainingSum - node.val);
            dfs(node.right, remainingSum - node.val);
        }
        
        currentPath.pop(); // Backtrack
    }
    
    dfs(root, targetSum);
    return result;
}

// 3. Path Sum III - Any Node to Any Node with Target Sum
function pathSumIII(root, targetSum) {
    const prefixSumCount = new Map();
    prefixSumCount.set(0, 1); // Base case
    
    function dfs(node, currentSum) {
        if (!node) return 0;
        
        currentSum += node.val;
        let pathCount = 0;
        
        // Check if there's a path ending at current node
        const complement = currentSum - targetSum;
        pathCount += prefixSumCount.get(complement) || 0;
        
        // Add current sum to prefix count
        prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
        
        // Recurse to children
        pathCount += dfs(node.left, currentSum) + dfs(node.right, currentSum);
        
        // Backtrack: remove current sum from count
        prefixSumCount.set(currentSum, prefixSumCount.get(currentSum) - 1);
        
        return pathCount;
    }
    
    return dfs(root, 0);
}

// 4. Binary Tree Paths - All Root to Leaf Paths
function binaryTreePaths(root) {
    const result = [];
    
    function dfs(node, currentPath) {
        if (!node) return;
        
        currentPath += node.val;
        
        // Leaf node
        if (!node.left && !node.right) {
            result.push(currentPath);
        } else {
            dfs(node.left, currentPath + "->");
            dfs(node.right, currentPath + "->");
        }
    }
    
    dfs(root, "");
    return result;
}

// 5. Sum Root to Leaf Numbers
function sumNumbers(root) {
    function dfs(node, currentNumber) {
        if (!node) return 0;
        
        currentNumber = currentNumber * 10 + node.val;
        
        // Leaf node
        if (!node.left && !node.right) {
            return currentNumber;
        }
        
        return dfs(node.left, currentNumber) + dfs(node.right, currentNumber);
    }
    
    return dfs(root, 0);
}

// 6. Maximum Path Sum (any node to any node)
function maxPathSum(root) {
    let maxSum = Number.MIN_SAFE_INTEGER;
    
    function maxPathHelper(node) {
        if (!node) return 0;
        
        // Max sum from children (ignore negative paths)
        const leftMax = Math.max(0, maxPathHelper(node.left));
        const rightMax = Math.max(0, maxPathHelper(node.right));
        
        // Current path through this node
        const currentPathSum = node.val + leftMax + rightMax;
        maxSum = Math.max(maxSum, currentPathSum);
        
        // Return max path starting from this node
        return node.val + Math.max(leftMax, rightMax);
    }
    
    maxPathHelper(root);
    return maxSum;
}

// 7. Path Sum with Constraints
function pathSumWithConstraints(root, targetSum, minPath, maxPath) {
    const result = [];
    const currentPath = [];
    
    function dfs(node, remainingSum) {
        if (!node) return;
        
        currentPath.push(node.val);
        
        // Leaf node
        if (!node.left && !node.right) {
            if (remainingSum === node.val && 
                currentPath.length >= minPath && 
                currentPath.length <= maxPath) {
                result.push([...currentPath]);
            }
        } else {
            if (currentPath.length < maxPath) { // Pruning
                dfs(node.left, remainingSum - node.val);
                dfs(node.right, remainingSum - node.val);
            }
        }
        
        currentPath.pop(); // Backtrack
    }
    
    dfs(root, targetSum);
    return result;
}

// Test examples
console.log("=== Path Sum Problems Tests ===");

// Create test tree:     5
//                      / \
//                     4   8
//                    /   / \
//                   11  13  4
//                  / \      \
//                 7   2      1
const root = new TreeNode(5,
    new TreeNode(4, 
        new TreeNode(11, new TreeNode(7), new TreeNode(2)), 
        null),
    new TreeNode(8, 
        new TreeNode(13), 
        new TreeNode(4, null, new TreeNode(1)))
);

console.log("Has Path Sum (22):", hasPathSum(root, 22)); // true
console.log("Path Sum II (22):", pathSum(root, 22)); // [[5,4,11,2]]
console.log("Path Sum III (8):", pathSumIII(root, 8)); // 3
console.log("Binary Tree Paths:", binaryTreePaths(root));
console.log("Sum Numbers:", sumNumbers(root));
console.log("Max Path Sum:", maxPathSum(root));
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Tree Node definition
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

// Path Sum algorithms class
class PathSumAlgorithms {
    
    // 1. Path Sum I - Root to Leaf with Target Sum
    static hasPathSum(root: TreeNode | null, targetSum: number): boolean {
        if (!root) return false;
        
        // Leaf node check
        if (!root.left && !root.right) {
            return root.val === targetSum;
        }
        
        // Recurse with remaining sum
        const remainingSum = targetSum - root.val;
        return PathSumAlgorithms.hasPathSum(root.left, remainingSum) || 
               PathSumAlgorithms.hasPathSum(root.right, remainingSum);
    }
    
    // 2. Path Sum II - All Root to Leaf Paths with Target Sum
    static pathSum(root: TreeNode | null, targetSum: number): number[][] {
        const result: number[][] = [];
        const currentPath: number[] = [];
        
        function dfs(node: TreeNode | null, remainingSum: number): void {
            if (!node) return;
            
            currentPath.push(node.val);
            
            // Leaf node with target sum
            if (!node.left && !node.right && remainingSum === node.val) {
                result.push([...currentPath]);
            } else {
                dfs(node.left, remainingSum - node.val);
                dfs(node.right, remainingSum - node.val);
            }
            
            currentPath.pop(); // Backtrack
        }
        
        dfs(root, targetSum);
        return result;
    }
    
    // 3. Path Sum III - Any Node to Any Node with Target Sum
    static pathSumIII(root: TreeNode | null, targetSum: number): number {
        const prefixSumCount = new Map<number, number>();
        prefixSumCount.set(0, 1); // Base case
        
        function dfs(node: TreeNode | null, currentSum: number): number {
            if (!node) return 0;
            
            currentSum += node.val;
            let pathCount = 0;
            
            // Check if there's a path ending at current node
            const complement = currentSum - targetSum;
            pathCount += prefixSumCount.get(complement) || 0;
            
            // Add current sum to prefix count
            prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
            
            // Recurse to children
            pathCount += dfs(node.left, currentSum) + dfs(node.right, currentSum);
            
            // Backtrack: remove current sum from count
            prefixSumCount.set(currentSum, prefixSumCount.get(currentSum)! - 1);
            
            return pathCount;
        }
        
        return dfs(root, 0);
    }
    
    // 4. Binary Tree Paths - All Root to Leaf Paths
    static binaryTreePaths(root: TreeNode | null): string[] {
        const result: string[] = [];
        
        function dfs(node: TreeNode | null, currentPath: string): void {
            if (!node) return;
            
            currentPath += node.val;
            
            // Leaf node
            if (!node.left && !node.right) {
                result.push(currentPath);
            } else {
                dfs(node.left, currentPath + "->");
                dfs(node.right, currentPath + "->");
            }
        }
        
        dfs(root, "");
        return result;
    }
    
    // 5. Sum Root to Leaf Numbers
    static sumNumbers(root: TreeNode | null): number {
        function dfs(node: TreeNode | null, currentNumber: number): number {
            if (!node) return 0;
            
            currentNumber = currentNumber * 10 + node.val;
            
            // Leaf node
            if (!node.left && !node.right) {
                return currentNumber;
            }
            
            return dfs(node.left, currentNumber) + dfs(node.right, currentNumber);
        }
        
        return dfs(root, 0);
    }
    
    // 6. Maximum Path Sum (any node to any node)
    static maxPathSum(root: TreeNode | null): number {
        let maxSum = Number.MIN_SAFE_INTEGER;
        
        function maxPathHelper(node: TreeNode | null): number {
            if (!node) return 0;
            
            // Max sum from children (ignore negative paths)
            const leftMax = Math.max(0, maxPathHelper(node.left));
            const rightMax = Math.max(0, maxPathHelper(node.right));
            
            // Current path through this node
            const currentPathSum = node.val + leftMax + rightMax;
            maxSum = Math.max(maxSum, currentPathSum);
            
            // Return max path starting from this node
            return node.val + Math.max(leftMax, rightMax);
        }
        
        maxPathHelper(root);
        return maxSum;
    }
    
    // 7. Path Sum with Constraints
    static pathSumWithConstraints(root: TreeNode | null, targetSum: number, 
                                 minPath: number, maxPath: number): number[][] {
        const result: number[][] = [];
        const currentPath: number[] = [];
        
        function dfs(node: TreeNode | null, remainingSum: number): void {
            if (!node) return;
            
            currentPath.push(node.val);
            
            // Leaf node
            if (!node.left && !node.right) {
                if (remainingSum === node.val && 
                    currentPath.length >= minPath && 
                    currentPath.length <= maxPath) {
                    result.push([...currentPath]);
                }
            } else {
                if (currentPath.length < maxPath) { // Pruning
                    dfs(node.left, remainingSum - node.val);
                    dfs(node.right, remainingSum - node.val);
                }
            }
            
            currentPath.pop(); // Backtrack
        }
        
        dfs(root, targetSum);
        return result;
    }
}

// Test examples
const root: TreeNode = new TreeNode(5,
    new TreeNode(4, 
        new TreeNode(11, new TreeNode(7), new TreeNode(2)), 
        null),
    new TreeNode(8, 
        new TreeNode(13), 
        new TreeNode(4, null, new TreeNode(1)))
);

console.log("Has Path Sum (22):", PathSumAlgorithms.hasPathSum(root, 22)); // true
console.log("Path Sum II (22):", PathSumAlgorithms.pathSum(root, 22)); // [[5,4,11,2]]
console.log("Path Sum III (8):", PathSumAlgorithms.pathSumIII(root, 8)); // 3
console.log("Binary Tree Paths:", PathSumAlgorithms.binaryTreePaths(root));
console.log("Sum Numbers:", PathSumAlgorithms.sumNumbers(root));
console.log("Max Path Sum:", PathSumAlgorithms.maxPathSum(root));
console.log("Path Sum with Constraints:", PathSumAlgorithms.pathSumWithConstraints(root, 22, 3, 5));
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Backtrack hiánya**: path building során nem távolítjuk el az elemeket → incorrect paths
- **Leaf node check**: csak null children check helyett → non-leaf nodes behandled as leaves
- **Integer overflow**: nagy számok összegzése → use long for sum calculations
- **Prefix sum cleanup**: Path Sum III-ban backtrack hiánya → incorrect count accumulation
- **Path definition confusion**: root-to-leaf vs any-to-any paths → wrong algorithm choice

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Decision trees**: Path-based decision scoring
- **Game theory**: Move sequence evaluation
- **Financial modeling**: Investment path analysis
- **Network routing**: Cost optimization with constraints
- **Resource allocation**: Path-dependent resource usage

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mi a különbség Path Sum I, II és III között?
<details><summary>Válasz mutatása</summary>
I: boolean (van-e path). II: összes root-to-leaf path listája. III: any-to-any pathek száma prefix sum-mal O(n) időben.
</details>

2. Miért használunk prefix sum-ot Path Sum III-ban?
<details><summary>Válasz mutatása</summary>
O(n²)→O(n) optimalizálás. Prefix sum map-pel elkerüljük minden path végpont újraszámítását. Hasonló az array subarray sum-hoz.
</details>

3. Mikor kell backtrack-elni DFS-ben?
<details><summary>Válasz mutatása</summary>
Amikor globális state-et módosítunk (path array, visited set, prefix sum count). Lokális változók (remainingSum) automatikusan restore-olódnak.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Path Sum"** → Basic root-to-leaf path existence
2. **"Path Sum II"** → All paths with target sum
3. **"Path Sum III"** → Any-to-any paths with optimization
4. **"Binary Tree Paths"** → All root-to-leaf path strings
5. **"Sum Root to Leaf Numbers"** → Numeric path interpretation

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Tree Traversal` · `Backtracking` · `Prefix Sum` · `Tree DP` · `Maximum Path Sum`

</div>

<div class="tags">
  <span class="tag">path-sum</span>
  <span class="tag">binary-tree</span>
  <span class="tag">dfs</span>
  <span class="tag">backtracking</span>
  <span class="tag">prefix-sum</span>
  <span class="tag">medior</span>
</div>

</section>

<!-- Trie and String Algorithms Section -->
<section class="concept-section" id="trie-string-algorithms">

## 🔤 Trie és String Algorithms {#trie-string-algorithms}

### Trie Implementation - Prefix Tree {#trie}
<!-- tags: trie, prefix-tree, string, autocomplete, dictionary, medior -->

<div class="concept-section mental-model">

🌳 **Probléma megfogalmazása**  
*A Trie (prefix tree) olyan, mint egy intelligens szótár: minden node egy karaktert reprezentál, az útvonalak szavakat alkotnak. Ideális autocomplete, spell checker és prefix-based keresésekhez. A gyökértől az egyes node-okig vezető utak prefixeket, a végső node-ig vezető utak teljes szavakat jelentenek. Space-time trade-off: több memória, de gyors prefix keresések.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Insert/Search/Delete**: O(m) idő (m = szó hossza)
- **Prefix search**: O(p) idő (p = prefix hossza)
- **Memory usage**: O(ALPHABET_SIZE × N × M) worst case
- **Autocomplete**: O(p + k) where k = suggestions count
- **Space optimization**: Compressed trie, patricia tree variants

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// Trie Node structure
class TrieNode:
    children = new Array(26)  // for lowercase a-z
    isEndOfWord = false
    wordCount = 0            // for counting word frequency
    
    constructor():
        for i from 0 to 25:
            children[i] = null

// Trie implementation
class Trie:
    root = new TrieNode()
    
    // Insert a word into trie
    function insert(word):
        current = root
        
        for char in word:
            index = char - 'a'
            
            if current.children[index] == null:
                current.children[index] = new TrieNode()
            
            current = current.children[index]
        
        current.isEndOfWord = true
        current.wordCount++
    
    // Search if word exists in trie
    function search(word):
        current = root
        
        for char in word:
            index = char - 'a'
            
            if current.children[index] == null:
                return false
            
            current = current.children[index]
        
        return current.isEndOfWord
    
    // Check if any word starts with prefix
    function startsWith(prefix):
        current = root
        
        for char in prefix:
            index = char - 'a'
            
            if current.children[index] == null:
                return false
            
            current = current.children[index]
        
        return true
    
    // Delete a word from trie
    function delete(word):
        function deleteHelper(node, word, index):
            if index == word.length:
                if not node.isEndOfWord:
                    return false  // Word doesn't exist
                
                node.isEndOfWord = false
                node.wordCount--
                
                // If no children, node can be deleted
                return not hasChildren(node)
            
            char = word.charAt(index)
            charIndex = char - 'a'
            child = node.children[charIndex]
            
            if child == null:
                return false  // Word doesn't exist
            
            shouldDeleteChild = deleteHelper(child, word, index + 1)
            
            if shouldDeleteChild:
                node.children[charIndex] = null
                
                // Return true if current node has no children and is not end of another word
                return not node.isEndOfWord and not hasChildren(node)
            
            return false
        
        deleteHelper(root, word, 0)
    
    // Get all words with given prefix (autocomplete)
    function autocomplete(prefix):
        current = root
        
        // Navigate to prefix end
        for char in prefix:
            index = char - 'a'
            if current.children[index] == null:
                return []
            current = current.children[index]
        
        // Collect all words from this point
        result = []
        dfs(current, prefix, result)
        return result
    
    function dfs(node, currentWord, result):
        if node.isEndOfWord:
            result.add(currentWord)
        
        for i from 0 to 25:
            if node.children[i] != null:
                char = (char)('a' + i)
                dfs(node.children[i], currentWord + char, result)

// Advanced Trie operations
class AdvancedTrie:
    // Word frequency trie
    function getMostFrequent(prefix):
        node = navigateToPrefix(prefix)
        if node == null:
            return null
        
        maxCount = 0
        bestWord = ""
        dfsWithFrequency(node, prefix, maxCount, bestWord)
        return bestWord
    
    // Compressed trie (Patricia tree) - space optimization
    function compress():
        compressHelper(root)
    
    function compressHelper(node):
        // If node has exactly one child and is not end of word
        if countChildren(node) == 1 and not node.isEndOfWord:
            // Merge with child node
            child = getOnlyChild(node)
            mergeWithChild(node, child)
            compressHelper(node)
        
        // Recursively compress children
        for child in node.children:
            if child != null:
                compressHelper(child)

// Applications:
// 1. Autocomplete systems - search suggestions
// 2. Spell checkers - dictionary lookup and corrections
// 3. IP routing tables - longest prefix matching
// 4. Phone directories - T9 predictive text
// 5. Bioinformatics - DNA sequence analysis
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

// Trie Node class
class TrieNode {
    TrieNode[] children;
    boolean isEndOfWord;
    int wordCount;
    String word; // Optional: store full word for easier retrieval
    
    public TrieNode() {
        children = new TrieNode[26]; // for lowercase a-z
        isEndOfWord = false;
        wordCount = 0;
        word = null;
    }
    
    public boolean hasChildren() {
        for (TrieNode child : children) {
            if (child != null) return true;
        }
        return false;
    }
}

// Main Trie implementation
public class Trie {
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    // Insert a word into trie
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
        current.word = word; // Store the complete word
    }
    
    // Search if word exists in trie
    public boolean search(String word) {
        TrieNode current = root;
        
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            
            if (current.children[index] == null) {
                return false;
            }
            
            current = current.children[index];
        }
        
        return current.isEndOfWord;
    }
    
    // Check if any word starts with prefix
    public boolean startsWith(String prefix) {
        TrieNode current = root;
        
        for (char c : prefix.toCharArray()) {
            int index = c - 'a';
            
            if (current.children[index] == null) {
                return false;
            }
            
            current = current.children[index];
        }
        
        return true;
    }
    
    // Delete a word from trie
    public void delete(String word) {
        deleteHelper(root, word, 0);
    }
    
    private boolean deleteHelper(TrieNode node, String word, int index) {
        if (index == word.length()) {
            if (!node.isEndOfWord) {
                return false; // Word doesn't exist
            }
            
            node.isEndOfWord = false;
            node.wordCount--;
            node.word = null;
            
            // If no children, node can be deleted
            return !node.hasChildren();
        }
        
        char c = word.charAt(index);
        int charIndex = c - 'a';
        TrieNode child = node.children[charIndex];
        
        if (child == null) {
            return false; // Word doesn't exist
        }
        
        boolean shouldDeleteChild = deleteHelper(child, word, index + 1);
        
        if (shouldDeleteChild) {
            node.children[charIndex] = null;
            
            // Return true if current node has no children and is not end of another word
            return !node.isEndOfWord && !node.hasChildren();
        }
        
        return false;
    }
    
    // Get all words with given prefix (autocomplete)
    public List<String> autocomplete(String prefix) {
        TrieNode current = root;
        
        // Navigate to prefix end
        for (char c : prefix.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                return new ArrayList<>();
            }
            current = current.children[index];
        }
        
        // Collect all words from this point
        List<String> result = new ArrayList<>();
        dfs(current, prefix, result);
        return result;
    }
    
    private void dfs(TrieNode node, String currentWord, List<String> result) {
        if (node.isEndOfWord) {
            result.add(currentWord);
        }
        
        for (int i = 0; i < 26; i++) {
            if (node.children[i] != null) {
                char c = (char) ('a' + i);
                dfs(node.children[i], currentWord + c, result);
            }
        }
    }
    
    // Get word count
    public int getWordCount(String word) {
        TrieNode current = root;
        
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                return 0;
            }
            current = current.children[index];
        }
        
        return current.isEndOfWord ? current.wordCount : 0;
    }
    
    // Get all words in trie
    public List<String> getAllWords() {
        List<String> result = new ArrayList<>();
        dfs(root, "", result);
        return result;
    }
    
    // Longest common prefix
    public String longestCommonPrefix() {
        StringBuilder result = new StringBuilder();
        TrieNode current = root;
        
        while (current != null && !current.isEndOfWord && countChildren(current) == 1) {
            for (int i = 0; i < 26; i++) {
                if (current.children[i] != null) {
                    result.append((char) ('a' + i));
                    current = current.children[i];
                    break;
                }
            }
        }
        
        return result.toString();
    }
    
    private int countChildren(TrieNode node) {
        int count = 0;
        for (TrieNode child : node.children) {
            if (child != null) count++;
        }
        return count;
    }
    
    // Test examples
    public static void main(String[] args) {
        Trie trie = new Trie();
        
        // Insert words
        trie.insert("apple");
        trie.insert("app");
        trie.insert("apricot");
        trie.insert("banana");
        trie.insert("band");
        
        // Test search
        System.out.println("Search 'app': " + trie.search("app")); // true
        System.out.println("Search 'appl': " + trie.search("appl")); // false
        
        // Test prefix
        System.out.println("Starts with 'app': " + trie.startsWith("app")); // true
        System.out.println("Starts with 'ban': " + trie.startsWith("ban")); // true
        
        // Test autocomplete
        System.out.println("Autocomplete 'app': " + trie.autocomplete("app")); // [app, apple, apricot]
        System.out.println("Autocomplete 'ban': " + trie.autocomplete("ban")); // [banana, band]
        
        // Test delete
        trie.delete("app");
        System.out.println("After deleting 'app': " + trie.search("app")); // false
        System.out.println("Apple still exists: " + trie.search("apple")); // true
        
        System.out.println("All words: " + trie.getAllWords());
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// Trie Node class
class TrieNode {
    constructor() {
        this.children = new Array(26).fill(null); // for lowercase a-z
        this.isEndOfWord = false;
        this.wordCount = 0;
        this.word = null; // Optional: store full word
    }
    
    hasChildren() {
        return this.children.some(child => child !== null);
    }
}

// Main Trie implementation
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    // Insert a word into trie
    insert(word) {
        let current = this.root;
        
        for (const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            
            if (!current.children[index]) {
                current.children[index] = new TrieNode();
            }
            
            current = current.children[index];
        }
        
        current.isEndOfWord = true;
        current.wordCount++;
        current.word = word;
    }
    
    // Search if word exists in trie
    search(word) {
        let current = this.root;
        
        for (const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            
            if (!current.children[index]) {
                return false;
            }
            
            current = current.children[index];
        }
        
        return current.isEndOfWord;
    }
    
    // Check if any word starts with prefix
    startsWith(prefix) {
        let current = this.root;
        
        for (const char of prefix) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            
            if (!current.children[index]) {
                return false;
            }
            
            current = current.children[index];
        }
        
        return true;
    }
    
    // Delete a word from trie
    delete(word) {
        const deleteHelper = (node, word, index) => {
            if (index === word.length) {
                if (!node.isEndOfWord) {
                    return false; // Word doesn't exist
                }
                
                node.isEndOfWord = false;
                node.wordCount--;
                node.word = null;
                
                // If no children, node can be deleted
                return !node.hasChildren();
            }
            
            const char = word[index];
            const charIndex = char.charCodeAt(0) - 'a'.charCodeAt(0);
            const child = node.children[charIndex];
            
            if (!child) {
                return false; // Word doesn't exist
            }
            
            const shouldDeleteChild = deleteHelper(child, word, index + 1);
            
            if (shouldDeleteChild) {
                node.children[charIndex] = null;
                
                // Return true if current node has no children and is not end of another word
                return !node.isEndOfWord && !node.hasChildren();
            }
            
            return false;
        };
        
        deleteHelper(this.root, word, 0);
    }
    
    // Get all words with given prefix (autocomplete)
    autocomplete(prefix) {
        let current = this.root;
        
        // Navigate to prefix end
        for (const char of prefix) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!current.children[index]) {
                return [];
            }
            current = current.children[index];
        }
        
        // Collect all words from this point
        const result = [];
        this.dfs(current, prefix, result);
        return result;
    }
    
    dfs(node, currentWord, result) {
        if (node.isEndOfWord) {
            result.push(currentWord);
        }
        
        for (let i = 0; i < 26; i++) {
            if (node.children[i]) {
                const char = String.fromCharCode('a'.charCodeAt(0) + i);
                this.dfs(node.children[i], currentWord + char, result);
            }
        }
    }
    
    // Get word count
    getWordCount(word) {
        let current = this.root;
        
        for (const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!current.children[index]) {
                return 0;
            }
            current = current.children[index];
        }
        
        return current.isEndOfWord ? current.wordCount : 0;
    }
    
    // Get all words in trie
    getAllWords() {
        const result = [];
        this.dfs(this.root, "", result);
        return result;
    }
    
    // Longest common prefix
    longestCommonPrefix() {
        let result = "";
        let current = this.root;
        
        while (current && !current.isEndOfWord && this.countChildren(current) === 1) {
            for (let i = 0; i < 26; i++) {
                if (current.children[i]) {
                    result += String.fromCharCode('a'.charCodeAt(0) + i);
                    current = current.children[i];
                    break;
                }
            }
        }
        
        return result;
    }
    
    countChildren(node) {
        return node.children.filter(child => child !== null).length;
    }
}

// Test examples
console.log("=== Trie Implementation Tests ===");

const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("apricot");
trie.insert("banana");
trie.insert("band");

// Test search
console.log("Search 'app':", trie.search("app")); // true
console.log("Search 'appl':", trie.search("appl")); // false

// Test prefix
console.log("Starts with 'app':", trie.startsWith("app")); // true
console.log("Starts with 'ban':", trie.startsWith("ban")); // true

// Test autocomplete
console.log("Autocomplete 'app':", trie.autocomplete("app")); // [app, apple, apricot]
console.log("Autocomplete 'ban':", trie.autocomplete("ban")); // [banana, band]

// Test delete
trie.delete("app");
console.log("After deleting 'app':", trie.search("app")); // false
console.log("Apple still exists:", trie.search("apple")); // true

console.log("All words:", trie.getAllWords());
console.log("Longest common prefix of all:", trie.longestCommonPrefix());
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Trie Node class
class TrieNode {
    children: (TrieNode | null)[];
    isEndOfWord: boolean;
    wordCount: number;
    word: string | null;
    
    constructor() {
        this.children = new Array(26).fill(null); // for lowercase a-z
        this.isEndOfWord = false;
        this.wordCount = 0;
        this.word = null;
    }
    
    hasChildren(): boolean {
        return this.children.some(child => child !== null);
    }
}

// Main Trie implementation
class Trie {
    private root: TrieNode;
    
    constructor() {
        this.root = new TrieNode();
    }
    
    // Insert a word into trie
    insert(word: string): void {
        let current = this.root;
        
        for (const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            
            if (!current.children[index]) {
                current.children[index] = new TrieNode();
            }
            
            current = current.children[index]!;
        }
        
        current.isEndOfWord = true;
        current.wordCount++;
        current.word = word;
    }
    
    // Search if word exists in trie
    search(word: string): boolean {
        let current = this.root;
        
        for (const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            
            if (!current.children[index]) {
                return false;
            }
            
            current = current.children[index]!;
        }
        
        return current.isEndOfWord;
    }
    
    // Check if any word starts with prefix
    startsWith(prefix: string): boolean {
        let current = this.root;
        
        for (const char of prefix) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            
            if (!current.children[index]) {
                return false;
            }
            
            current = current.children[index]!;
        }
        
        return true;
    }
    
    // Delete a word from trie
    delete(word: string): void {
        const deleteHelper = (node: TrieNode, word: string, index: number): boolean => {
            if (index === word.length) {
                if (!node.isEndOfWord) {
                    return false; // Word doesn't exist
                }
                
                node.isEndOfWord = false;
                node.wordCount--;
                node.word = null;
                
                // If no children, node can be deleted
                return !node.hasChildren();
            }
            
            const char = word[index];
            const charIndex = char.charCodeAt(0) - 'a'.charCodeAt(0);
            const child = node.children[charIndex];
            
            if (!child) {
                return false; // Word doesn't exist
            }
            
            const shouldDeleteChild = deleteHelper(child, word, index + 1);
            
            if (shouldDeleteChild) {
                node.children[charIndex] = null;
                
                // Return true if current node has no children and is not end of another word
                return !node.isEndOfWord && !node.hasChildren();
            }
            
            return false;
        };
        
        deleteHelper(this.root, word, 0);
    }
    
    // Get all words with given prefix (autocomplete)
    autocomplete(prefix: string): string[] {
        let current = this.root;
        
        // Navigate to prefix end
        for (const char of prefix) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!current.children[index]) {
                return [];
            }
            current = current.children[index]!;
        }
        
        // Collect all words from this point
        const result: string[] = [];
        this.dfs(current, prefix, result);
        return result;
    }
    
    private dfs(node: TrieNode, currentWord: string, result: string[]): void {
        if (node.isEndOfWord) {
            result.push(currentWord);
        }
        
        for (let i = 0; i < 26; i++) {
            if (node.children[i]) {
                const char = String.fromCharCode('a'.charCodeAt(0) + i);
                this.dfs(node.children[i]!, currentWord + char, result);
            }
        }
    }
    
    // Get word count
    getWordCount(word: string): number {
        let current = this.root;
        
        for (const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!current.children[index]) {
                return 0;
            }
            current = current.children[index]!;
        }
        
        return current.isEndOfWord ? current.wordCount : 0;
    }
    
    // Get all words in trie
    getAllWords(): string[] {
        const result: string[] = [];
        this.dfs(this.root, "", result);
        return result;
    }
    
    // Longest common prefix
    longestCommonPrefix(): string {
        let result = "";
        let current: TrieNode | null = this.root;
        
        while (current && !current.isEndOfWord && this.countChildren(current) === 1) {
            for (let i = 0; i < 26; i++) {
                if (current.children[i]) {
                    result += String.fromCharCode('a'.charCodeAt(0) + i);
                    current = current.children[i];
                    break;
                }
            }
        }
        
        return result;
    }
    
    private countChildren(node: TrieNode): number {
        return node.children.filter(child => child !== null).length;
    }
    
    // Advanced: Get top K frequent words with prefix
    getTopKWithPrefix(prefix: string, k: number): string[] {
        let current = this.root;
        
        // Navigate to prefix
        for (const char of prefix) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!current.children[index]) {
                return [];
            }
            current = current.children[index]!;
        }
        
        // Collect words with frequencies
        const wordsWithFreq: Array<{word: string, count: number}> = [];
        this.dfsWithFrequency(current, prefix, wordsWithFreq);
        
        // Sort by frequency and return top k
        wordsWithFreq.sort((a, b) => b.count - a.count);
        return wordsWithFreq.slice(0, k).map(item => item.word);
    }
    
    private dfsWithFrequency(node: TrieNode, currentWord: string, 
                           result: Array<{word: string, count: number}>): void {
        if (node.isEndOfWord) {
            result.push({word: currentWord, count: node.wordCount});
        }
        
        for (let i = 0; i < 26; i++) {
            if (node.children[i]) {
                const char = String.fromCharCode('a'.charCodeAt(0) + i);
                this.dfsWithFrequency(node.children[i]!, currentWord + char, result);
            }
        }
    }
}

// Test examples
const trie: Trie = new Trie();

// Insert words with frequencies
trie.insert("apple");
trie.insert("app");
trie.insert("app"); // Insert again to test frequency
trie.insert("apricot");
trie.insert("banana");
trie.insert("band");

console.log("Search 'app':", trie.search("app")); // true
console.log("Word count for 'app':", trie.getWordCount("app")); // 2
console.log("Starts with 'app':", trie.startsWith("app")); // true
console.log("Autocomplete 'app':", trie.autocomplete("app"));
console.log("Top 2 words with prefix 'app':", trie.getTopKWithPrefix("app", 2));
console.log("All words:", trie.getAllWords());
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Array bounds**: character index számítás hibája → ArrayIndexOutOfBoundsException
- **Delete complexity**: helytelen node törlés → memory leaks vagy structure corruption
- **Case sensitivity**: upper/lowercase handling hiánya → inconsistent behavior
- **Memory optimization**: trie size alulbecslése → OutOfMemoryError nagy szótárakkal
- **Unicode support**: csak ASCII karakterek support → international characters fail

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Autocomplete systems**: Search suggestions in real-time
- **Spell checkers**: Dictionary lookup and corrections
- **IP routing**: Longest prefix matching in routers
- **Text processing**: Efficient prefix-based text analysis
- **Bioinformatics**: DNA/RNA sequence pattern matching

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mikor használjuk Trie-t hash table helyett?
<details><summary>Válasz mutatása</summary>
Prefix-based operations esetén: autocomplete, startsWith queries. Hash table O(1) lookup, de prefix search O(k×n). Trie O(m) mindkettőre.
</details>

2. Hogyan optimalizálható a Trie memóriahasználata?
<details><summary>Válasz mutatása</summary>
Compressed Trie (Patricia): single-child chains collapse. HashMap children array helyett sparse representation. Lazy deletion.
</details>

3. Mi a különbség Trie és Suffix Tree között?
<details><summary>Válasz mutatása</summary>
Trie: prefix-based, words insert. Suffix Tree: substring-based, all suffixes of string(s). Suffix tree powerful de complex build.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Implement Trie (Prefix Tree)"** → Basic trie with insert/search/startsWith
2. **"Design Add and Search Words Data Structure"** → Trie with wildcard support
3. **"Word Search II"** → Trie-based grid word finding
4. **"Auto-complete System"** → Top k frequent words with prefix
5. **"Replace Words"** → Dictionary-based word replacement

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Suffix Tree` · `Aho-Corasick` · `Radix Tree` · `Patricia Tree` · `Suffix Array`

</div>

<div class="tags">
  <span class="tag">trie</span>
  <span class="tag">prefix-tree</span>
  <span class="tag">string</span>
  <span class="tag">autocomplete</span>
  <span class="tag">dictionary</span>
  <span class="tag">medior</span>
</div>

### Suffix Array - Szuffixum Tömb {#suffix-array}
<!-- tags: suffix-array, string, sorting, lcp, pattern-matching, medior -->

<div class="concept-section mental-model">

🔤 **Probléma megfogalmazása**  
*A Suffix Array olyan, mint a string összes szuffixumának ábécé szerinti rendezése: minden pozíciótól kezdődő végig tartó substring indexeit tartalmazza lexikografikus sorrendben. Kompakt alternatíva a Suffix Tree-hez, kevesebb memóriával. Ideális pattern matching, longest common substring, string ranking problémákhoz. Az LCP array-jel kiegészítve rendkívül hatékony string algoritmusokat tesz lehetővé.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Naive construction**: O(n² log n) - sort all suffixes
- **DC3/Skew algorithm**: O(n) linear time construction
- **Radix sort approach**: O(n log n) practical implementation
- **LCP array construction**: O(n) from suffix array
- **Pattern search**: O(m + log n) with binary search
- **Space complexity**: O(n) vs O(n log n) for suffix tree

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// 1. Naive Suffix Array Construction
function buildSuffixArray(text):
    n = text.length
    suffixes = []
    
    // Create all suffixes with their starting positions
    for i from 0 to n-1:
        suffixes.add({suffix: text.substring(i), index: i})
    
    // Sort suffixes lexicographically
    suffixes.sort(by suffix string)
    
    // Extract indices
    suffixArray = []
    for item in suffixes:
        suffixArray.add(item.index)
    
    return suffixArray

// 2. Efficient O(n log n) Construction with Counting Sort
function buildSuffixArrayEfficient(text):
    n = text.length
    suffixArray = [0..n-1]  // Initialize with indices
    rank = new Array(n)
    
    // Initial ranking based on first character
    for i from 0 to n-1:
        rank[i] = text[i]
    
    // Build suffix array by doubling technique
    k = 1
    while k < n:
        // Sort based on rank of (suffix[i], suffix[i+k])
        suffixArray.sort(by (rank[i], rank[i+k]))
        
        // Update ranks for next iteration
        newRank = new Array(n)
        newRank[suffixArray[0]] = 0
        
        for i from 1 to n-1:
            curr = suffixArray[i]
            prev = suffixArray[i-1]
            
            if rank[curr] == rank[prev] and rank[curr+k] == rank[prev+k]:
                newRank[curr] = newRank[prev]
            else:
                newRank[curr] = i
        
        rank = newRank
        k *= 2
    
    return suffixArray

// 3. LCP Array Construction (Longest Common Prefix)
function buildLCPArray(text, suffixArray):
    n = text.length
    lcp = new Array(n-1)
    rank = new Array(n)
    
    // Build rank array (inverse of suffix array)
    for i from 0 to n-1:
        rank[suffixArray[i]] = i
    
    // Build LCP array using Kasai's algorithm
    h = 0  // Height of current LCP
    for i from 0 to n-1:
        if rank[i] > 0:
            j = suffixArray[rank[i] - 1]  // Previous suffix in sorted order
            
            // Find LCP between suffix[i] and suffix[j]
            while i + h < n and j + h < n and text[i + h] == text[j + h]:
                h++
            
            lcp[rank[i] - 1] = h
            
            if h > 0:
                h--  // h can decrease by at most 1
    
    return lcp

// 4. Pattern Search using Binary Search
function searchPattern(text, suffixArray, pattern):
    n = text.length
    m = pattern.length
    
    // Binary search for leftmost occurrence
    left = binarySearchLeft(text, suffixArray, pattern, 0, n-1)
    if left == -1:
        return []
    
    // Binary search for rightmost occurrence
    right = binarySearchRight(text, suffixArray, pattern, 0, n-1)
    
    // Return all occurrences
    occurrences = []
    for i from left to right:
        occurrences.add(suffixArray[i])
    
    return occurrences

function binarySearchLeft(text, suffixArray, pattern, low, high):
    while low <= high:
        mid = (low + high) / 2
        suffix = text.substring(suffixArray[mid])
        
        if suffix.startsWith(pattern):
            if mid == 0 or not text.substring(suffixArray[mid-1]).startsWith(pattern):
                return mid
            high = mid - 1
        elif suffix < pattern:
            low = mid + 1
        else:
            high = mid - 1
    
    return -1

// 5. Longest Common Substring using LCP Array
function longestCommonSubstring(text1, text2):
    // Concatenate strings with separator
    combined = text1 + "$" + text2 + "#"
    suffixArray = buildSuffixArray(combined)
    lcp = buildLCPArray(combined, suffixArray)
    
    maxLCP = 0
    bestPos = -1
    n1 = text1.length
    
    // Find maximum LCP between suffixes from different strings
    for i from 0 to lcp.length-1:
        pos1 = suffixArray[i]
        pos2 = suffixArray[i+1]
        
        // Check if suffixes are from different original strings
        if (pos1 <= n1 and pos2 > n1 + 1) or (pos1 > n1 + 1 and pos2 <= n1):
            if lcp[i] > maxLCP:
                maxLCP = lcp[i]
                bestPos = min(pos1, pos2)
    
    if maxLCP == 0:
        return ""
    
    return combined.substring(bestPos, bestPos + maxLCP)

// 6. Number of Distinct Substrings
function countDistinctSubstrings(text):
    n = text.length
    suffixArray = buildSuffixArray(text)
    lcp = buildLCPArray(text, suffixArray)
    
    // Total substrings = n*(n+1)/2
    totalSubstrings = n * (n + 1) / 2
    
    // Subtract duplicate substrings (sum of LCP values)
    duplicates = 0
    for i from 0 to lcp.length-1:
        duplicates += lcp[i]
    
    return totalSubstrings - duplicates

// Applications:
// 1. Full-text search - efficient pattern matching
// 2. Bioinformatics - DNA sequence analysis
// 3. Data compression - finding repeating patterns
// 4. Plagiarism detection - document similarity
// 5. Suffix tree simulation - space-efficient alternative
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class SuffixArray {
    
    // 1. Naive Suffix Array Construction O(n² log n)
    public static int[] buildSuffixArrayNaive(String text) {
        int n = text.length();
        List<SuffixInfo> suffixes = new ArrayList<>();
        
        // Create all suffixes with their starting positions
        for (int i = 0; i < n; i++) {
            suffixes.add(new SuffixInfo(text.substring(i), i));
        }
        
        // Sort suffixes lexicographically
        Collections.sort(suffixes, (a, b) -> a.suffix.compareTo(b.suffix));
        
        // Extract indices
        int[] suffixArray = new int[n];
        for (int i = 0; i < n; i++) {
            suffixArray[i] = suffixes.get(i).index;
        }
        
        return suffixArray;
    }
    
    static class SuffixInfo {
        String suffix;
        int index;
        
        SuffixInfo(String suffix, int index) {
            this.suffix = suffix;
            this.index = index;
        }
    }
    
    // 2. Efficient O(n log n) Construction
    public static int[] buildSuffixArray(String text) {
        int n = text.length();
        Integer[] suffixArray = new Integer[n];
        int[] rank = new int[n];
        
        // Initialize suffix array and rank
        for (int i = 0; i < n; i++) {
            suffixArray[i] = i;
            rank[i] = text.charAt(i);
        }
        
        // Build suffix array by doubling technique
        for (int k = 1; k < n; k *= 2) {
            final int gap = k;
            final int[] currentRank = rank.clone();
            
            // Sort based on rank of (suffix[i], suffix[i+k])
            Arrays.sort(suffixArray, (a, b) -> {
                if (currentRank[a] != currentRank[b]) {
                    return currentRank[a] - currentRank[b];
                }
                int rankA = (a + gap < n) ? currentRank[a + gap] : -1;
                int rankB = (b + gap < n) ? currentRank[b + gap] : -1;
                return rankA - rankB;
            });
            
            // Update ranks for next iteration
            int[] newRank = new int[n];
            newRank[suffixArray[0]] = 0;
            
            for (int i = 1; i < n; i++) {
                int curr = suffixArray[i];
                int prev = suffixArray[i - 1];
                
                boolean sameRank = (currentRank[curr] == currentRank[prev]);
                boolean sameNext = ((curr + gap < n ? currentRank[curr + gap] : -1) == 
                                   (prev + gap < n ? currentRank[prev + gap] : -1));
                
                if (sameRank && sameNext) {
                    newRank[curr] = newRank[prev];
                } else {
                    newRank[curr] = i;
                }
            }
            
            rank = newRank;
        }
        
        return Arrays.stream(suffixArray).mapToInt(Integer::intValue).toArray();
    }
    
    // 3. LCP Array Construction using Kasai's algorithm
    public static int[] buildLCPArray(String text, int[] suffixArray) {
        int n = text.length();
        int[] lcp = new int[n - 1];
        int[] rank = new int[n];
        
        // Build rank array (inverse of suffix array)
        for (int i = 0; i < n; i++) {
            rank[suffixArray[i]] = i;
        }
        
        // Build LCP array
        int h = 0; // Height of current LCP
        for (int i = 0; i < n; i++) {
            if (rank[i] > 0) {
                int j = suffixArray[rank[i] - 1]; // Previous suffix in sorted order
                
                // Find LCP between suffix[i] and suffix[j]
                while (i + h < n && j + h < n && text.charAt(i + h) == text.charAt(j + h)) {
                    h++;
                }
                
                lcp[rank[i] - 1] = h;
                
                if (h > 0) {
                    h--; // h can decrease by at most 1
                }
            }
        }
        
        return lcp;
    }
    
    // 4. Pattern Search using Binary Search
    public static List<Integer> searchPattern(String text, int[] suffixArray, String pattern) {
        int n = text.length();
        
        // Binary search for leftmost occurrence
        int left = binarySearchLeft(text, suffixArray, pattern);
        if (left == -1) {
            return new ArrayList<>();
        }
        
        // Binary search for rightmost occurrence
        int right = binarySearchRight(text, suffixArray, pattern);
        
        // Collect all occurrences
        List<Integer> occurrences = new ArrayList<>();
        for (int i = left; i <= right; i++) {
            occurrences.add(suffixArray[i]);
        }
        
        return occurrences;
    }
    
    private static int binarySearchLeft(String text, int[] suffixArray, String pattern) {
        int low = 0, high = suffixArray.length - 1;
        int result = -1;
        
        while (low <= high) {
            int mid = (low + high) / 2;
            String suffix = text.substring(suffixArray[mid]);
            
            if (suffix.startsWith(pattern)) {
                result = mid;
                high = mid - 1; // Continue searching left
            } else if (suffix.compareTo(pattern) < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        return result;
    }
    
    private static int binarySearchRight(String text, int[] suffixArray, String pattern) {
        int low = 0, high = suffixArray.length - 1;
        int result = -1;
        
        while (low <= high) {
            int mid = (low + high) / 2;
            String suffix = text.substring(suffixArray[mid]);
            
            if (suffix.startsWith(pattern)) {
                result = mid;
                low = mid + 1; // Continue searching right
            } else if (suffix.compareTo(pattern) < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        return result;
    }
    
    // 5. Longest Common Substring
    public static String longestCommonSubstring(String text1, String text2) {
        // Concatenate strings with unique separators
        String combined = text1 + "$" + text2 + "#";
        int[] suffixArray = buildSuffixArray(combined);
        int[] lcp = buildLCPArray(combined, suffixArray);
        
        int maxLCP = 0;
        int bestPos = -1;
        int n1 = text1.length();
        
        // Find maximum LCP between suffixes from different strings
        for (int i = 0; i < lcp.length; i++) {
            int pos1 = suffixArray[i];
            int pos2 = suffixArray[i + 1];
            
            // Check if suffixes are from different original strings
            boolean fromDifferentStrings = (pos1 <= n1 && pos2 > n1 + 1) || 
                                         (pos1 > n1 + 1 && pos2 <= n1);
            
            if (fromDifferentStrings && lcp[i] > maxLCP) {
                maxLCP = lcp[i];
                bestPos = Math.min(pos1, pos2);
            }
        }
        
        if (maxLCP == 0) {
            return "";
        }
        
        return combined.substring(bestPos, bestPos + maxLCP);
    }
    
    // 6. Count Distinct Substrings
    public static long countDistinctSubstrings(String text) {
        int n = text.length();
        int[] suffixArray = buildSuffixArray(text);
        int[] lcp = buildLCPArray(text, suffixArray);
        
        // Total substrings = n*(n+1)/2
        long totalSubstrings = (long) n * (n + 1) / 2;
        
        // Subtract duplicate substrings (sum of LCP values)
        long duplicates = 0;
        for (int lcpValue : lcp) {
            duplicates += lcpValue;
        }
        
        return totalSubstrings - duplicates;
    }
    
    // Test examples
    public static void main(String[] args) {
        String text = "banana";
        System.out.println("Text: " + text);
        
        // Build suffix array
        int[] suffixArray = buildSuffixArray(text);
        System.out.println("Suffix Array: " + Arrays.toString(suffixArray));
        
        // Print suffixes in sorted order
        System.out.println("Sorted Suffixes:");
        for (int i = 0; i < suffixArray.length; i++) {
            System.out.println(i + ": " + text.substring(suffixArray[i]));
        }
        
        // Build LCP array
        int[] lcp = buildLCPArray(text, suffixArray);
        System.out.println("LCP Array: " + Arrays.toString(lcp));
        
        // Pattern search
        String pattern = "ana";
        List<Integer> occurrences = searchPattern(text, suffixArray, pattern);
        System.out.println("Pattern '" + pattern + "' found at positions: " + occurrences);
        
        // Longest common substring
        String text2 = "ananas";
        String lcs = longestCommonSubstring(text, text2);
        System.out.println("Longest common substring of '" + text + "' and '" + text2 + "': " + lcs);
        
        // Count distinct substrings
        long distinct = countDistinctSubstrings(text);
        System.out.println("Number of distinct substrings: " + distinct);
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// 1. Naive Suffix Array Construction
function buildSuffixArrayNaive(text) {
    const n = text.length;
    const suffixes = [];
    
    // Create all suffixes with their starting positions
    for (let i = 0; i < n; i++) {
        suffixes.push({ suffix: text.substring(i), index: i });
    }
    
    // Sort suffixes lexicographically
    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
    
    // Extract indices
    return suffixes.map(item => item.index);
}

// 2. Efficient O(n log n) Construction
function buildSuffixArray(text) {
    const n = text.length;
    let suffixArray = Array.from({ length: n }, (_, i) => i);
    let rank = Array.from({ length: n }, (_, i) => text.charCodeAt(i));
    
    // Build suffix array by doubling technique
    for (let k = 1; k < n; k *= 2) {
        const currentRank = [...rank];
        
        // Sort based on rank of (suffix[i], suffix[i+k])
        suffixArray.sort((a, b) => {
            if (currentRank[a] !== currentRank[b]) {
                return currentRank[a] - currentRank[b];
            }
            const rankA = (a + k < n) ? currentRank[a + k] : -1;
            const rankB = (b + k < n) ? currentRank[b + k] : -1;
            return rankA - rankB;
        });
        
        // Update ranks for next iteration
        const newRank = new Array(n);
        newRank[suffixArray[0]] = 0;
        
        for (let i = 1; i < n; i++) {
            const curr = suffixArray[i];
            const prev = suffixArray[i - 1];
            
            const sameRank = currentRank[curr] === currentRank[prev];
            const sameNext = ((curr + k < n ? currentRank[curr + k] : -1) === 
                             (prev + k < n ? currentRank[prev + k] : -1));
            
            if (sameRank && sameNext) {
                newRank[curr] = newRank[prev];
            } else {
                newRank[curr] = i;
            }
        }
        
        rank = newRank;
    }
    
    return suffixArray;
}

// 3. LCP Array Construction using Kasai's algorithm
function buildLCPArray(text, suffixArray) {
    const n = text.length;
    const lcp = new Array(n - 1);
    const rank = new Array(n);
    
    // Build rank array (inverse of suffix array)
    for (let i = 0; i < n; i++) {
        rank[suffixArray[i]] = i;
    }
    
    // Build LCP array
    let h = 0; // Height of current LCP
    for (let i = 0; i < n; i++) {
        if (rank[i] > 0) {
            const j = suffixArray[rank[i] - 1]; // Previous suffix in sorted order
            
            // Find LCP between suffix[i] and suffix[j]
            while (i + h < n && j + h < n && text[i + h] === text[j + h]) {
                h++;
            }
            
            lcp[rank[i] - 1] = h;
            
            if (h > 0) {
                h--; // h can decrease by at most 1
            }
        }
    }
    
    return lcp;
}

// 4. Pattern Search using Binary Search
function searchPattern(text, suffixArray, pattern) {
    // Binary search for leftmost occurrence
    const left = binarySearchLeft(text, suffixArray, pattern);
    if (left === -1) {
        return [];
    }
    
    // Binary search for rightmost occurrence
    const right = binarySearchRight(text, suffixArray, pattern);
    
    // Collect all occurrences
    const occurrences = [];
    for (let i = left; i <= right; i++) {
        occurrences.push(suffixArray[i]);
    }
    
    return occurrences;
}

function binarySearchLeft(text, suffixArray, pattern) {
    let low = 0, high = suffixArray.length - 1;
    let result = -1;
    
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const suffix = text.substring(suffixArray[mid]);
        
        if (suffix.startsWith(pattern)) {
            result = mid;
            high = mid - 1; // Continue searching left
        } else if (suffix < pattern) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    return result;
}

function binarySearchRight(text, suffixArray, pattern) {
    let low = 0, high = suffixArray.length - 1;
    let result = -1;
    
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const suffix = text.substring(suffixArray[mid]);
        
        if (suffix.startsWith(pattern)) {
            result = mid;
            low = mid + 1; // Continue searching right
        } else if (suffix < pattern) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    return result;
}

// 5. Longest Common Substring
function longestCommonSubstring(text1, text2) {
    // Concatenate strings with unique separators
    const combined = text1 + "$" + text2 + "#";
    const suffixArray = buildSuffixArray(combined);
    const lcp = buildLCPArray(combined, suffixArray);
    
    let maxLCP = 0;
    let bestPos = -1;
    const n1 = text1.length;
    
    // Find maximum LCP between suffixes from different strings
    for (let i = 0; i < lcp.length; i++) {
        const pos1 = suffixArray[i];
        const pos2 = suffixArray[i + 1];
        
        // Check if suffixes are from different original strings
        const fromDifferentStrings = (pos1 <= n1 && pos2 > n1 + 1) || 
                                   (pos1 > n1 + 1 && pos2 <= n1);
        
        if (fromDifferentStrings && lcp[i] > maxLCP) {
            maxLCP = lcp[i];
            bestPos = Math.min(pos1, pos2);
        }
    }
    
    if (maxLCP === 0) {
        return "";
    }
    
    return combined.substring(bestPos, bestPos + maxLCP);
}

// 6. Count Distinct Substrings
function countDistinctSubstrings(text) {
    const n = text.length;
    const suffixArray = buildSuffixArray(text);
    const lcp = buildLCPArray(text, suffixArray);
    
    // Total substrings = n*(n+1)/2
    const totalSubstrings = n * (n + 1) / 2;
    
    // Subtract duplicate substrings (sum of LCP values)
    const duplicates = lcp.reduce((sum, val) => sum + val, 0);
    
    return totalSubstrings - duplicates;
}

// Test examples
console.log("=== Suffix Array Tests ===");

const text = "banana";
console.log("Text:", text);

// Build suffix array
const suffixArray = buildSuffixArray(text);
console.log("Suffix Array:", suffixArray);

// Print suffixes in sorted order
console.log("Sorted Suffixes:");
for (let i = 0; i < suffixArray.length; i++) {
    console.log(`${i}: ${text.substring(suffixArray[i])}`);
}

// Build LCP array
const lcp = buildLCPArray(text, suffixArray);
console.log("LCP Array:", lcp);

// Pattern search
const pattern = "ana";
const occurrences = searchPattern(text, suffixArray, pattern);
console.log(`Pattern '${pattern}' found at positions:`, occurrences);

// Longest common substring
const text2 = "ananas";
const lcs = longestCommonSubstring(text, text2);
console.log(`Longest common substring of '${text}' and '${text2}': ${lcs}`);

// Count distinct substrings
const distinct = countDistinctSubstrings(text);
console.log("Number of distinct substrings:", distinct);
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Suffix information interface
interface SuffixInfo {
    suffix: string;
    index: number;
}

// Suffix Array algorithms class
class SuffixArrayAlgorithms {
    
    // 1. Naive Suffix Array Construction
    static buildNaive(text: string): number[] {
        const n = text.length;
        const suffixes: SuffixInfo[] = [];
        
        // Create all suffixes with their starting positions
        for (let i = 0; i < n; i++) {
            suffixes.push({ suffix: text.substring(i), index: i });
        }
        
        // Sort suffixes lexicographically
        suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
        
        // Extract indices
        return suffixes.map(item => item.index);
    }
    
    // 2. Efficient O(n log n) Construction
    static build(text: string): number[] {
        const n = text.length;
        let suffixArray: number[] = Array.from({ length: n }, (_, i) => i);
        let rank: number[] = Array.from({ length: n }, (_, i) => text.charCodeAt(i));
        
        // Build suffix array by doubling technique
        for (let k = 1; k < n; k *= 2) {
            const currentRank = [...rank];
            
            // Sort based on rank of (suffix[i], suffix[i+k])
            suffixArray.sort((a, b) => {
                if (currentRank[a] !== currentRank[b]) {
                    return currentRank[a] - currentRank[b];
                }
                const rankA = (a + k < n) ? currentRank[a + k] : -1;
                const rankB = (b + k < n) ? currentRank[b + k] : -1;
                return rankA - rankB;
            });
            
            // Update ranks for next iteration
            const newRank = new Array<number>(n);
            newRank[suffixArray[0]] = 0;
            
            for (let i = 1; i < n; i++) {
                const curr = suffixArray[i];
                const prev = suffixArray[i - 1];
                
                const sameRank = currentRank[curr] === currentRank[prev];
                const sameNext = ((curr + k < n ? currentRank[curr + k] : -1) === 
                                 (prev + k < n ? currentRank[prev + k] : -1));
                
                if (sameRank && sameNext) {
                    newRank[curr] = newRank[prev];
                } else {
                    newRank[curr] = i;
                }
            }
            
            rank = newRank;
        }
        
        return suffixArray;
    }
    
    // 3. LCP Array Construction using Kasai's algorithm
    static buildLCPArray(text: string, suffixArray: number[]): number[] {
        const n = text.length;
        const lcp = new Array<number>(n - 1);
        const rank = new Array<number>(n);
        
        // Build rank array (inverse of suffix array)
        for (let i = 0; i < n; i++) {
            rank[suffixArray[i]] = i;
        }
        
        // Build LCP array
        let h = 0; // Height of current LCP
        for (let i = 0; i < n; i++) {
            if (rank[i] > 0) {
                const j = suffixArray[rank[i] - 1]; // Previous suffix in sorted order
                
                // Find LCP between suffix[i] and suffix[j]
                while (i + h < n && j + h < n && text[i + h] === text[j + h]) {
                    h++;
                }
                
                lcp[rank[i] - 1] = h;
                
                if (h > 0) {
                    h--; // h can decrease by at most 1
                }
            }
        }
        
        return lcp;
    }
    
    // 4. Pattern Search using Binary Search
    static searchPattern(text: string, suffixArray: number[], pattern: string): number[] {
        // Binary search for leftmost occurrence
        const left = this.binarySearchLeft(text, suffixArray, pattern);
        if (left === -1) {
            return [];
        }
        
        // Binary search for rightmost occurrence
        const right = this.binarySearchRight(text, suffixArray, pattern);
        
        // Collect all occurrences
        const occurrences: number[] = [];
        for (let i = left; i <= right; i++) {
            occurrences.push(suffixArray[i]);
        }
        
        return occurrences;
    }
    
    private static binarySearchLeft(text: string, suffixArray: number[], pattern: string): number {
        let low = 0, high = suffixArray.length - 1;
        let result = -1;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const suffix = text.substring(suffixArray[mid]);
            
            if (suffix.startsWith(pattern)) {
                result = mid;
                high = mid - 1; // Continue searching left
            } else if (suffix < pattern) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        return result;
    }
    
    private static binarySearchRight(text: string, suffixArray: number[], pattern: string): number {
        let low = 0, high = suffixArray.length - 1;
        let result = -1;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const suffix = text.substring(suffixArray[mid]);
            
            if (suffix.startsWith(pattern)) {
                result = mid;
                low = mid + 1; // Continue searching right
            } else if (suffix < pattern) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        return result;
    }
    
    // 5. Longest Common Substring
    static longestCommonSubstring(text1: string, text2: string): string {
        // Concatenate strings with unique separators
        const combined = text1 + "$" + text2 + "#";
        const suffixArray = this.build(combined);
        const lcp = this.buildLCPArray(combined, suffixArray);
        
        let maxLCP = 0;
        let bestPos = -1;
        const n1 = text1.length;
        
        // Find maximum LCP between suffixes from different strings
        for (let i = 0; i < lcp.length; i++) {
            const pos1 = suffixArray[i];
            const pos2 = suffixArray[i + 1];
            
            // Check if suffixes are from different original strings
            const fromDifferentStrings = (pos1 <= n1 && pos2 > n1 + 1) || 
                                       (pos1 > n1 + 1 && pos2 <= n1);
            
            if (fromDifferentStrings && lcp[i] > maxLCP) {
                maxLCP = lcp[i];
                bestPos = Math.min(pos1, pos2);
            }
        }
        
        if (maxLCP === 0) {
            return "";
        }
        
        return combined.substring(bestPos, bestPos + maxLCP);
    }
    
    // 6. Count Distinct Substrings
    static countDistinctSubstrings(text: string): number {
        const n = text.length;
        const suffixArray = this.build(text);
        const lcp = this.buildLCPArray(text, suffixArray);
        
        // Total substrings = n*(n+1)/2
        const totalSubstrings = n * (n + 1) / 2;
        
        // Subtract duplicate substrings (sum of LCP values)
        const duplicates = lcp.reduce((sum, val) => sum + val, 0);
        
        return totalSubstrings - duplicates;
    }
    
    // 7. Longest Repeated Substring
    static longestRepeatedSubstring(text: string): string {
        const suffixArray = this.build(text);
        const lcp = this.buildLCPArray(text, suffixArray);
        
        let maxLCP = 0;
        let bestPos = -1;
        
        for (let i = 0; i < lcp.length; i++) {
            if (lcp[i] > maxLCP) {
                maxLCP = lcp[i];
                bestPos = suffixArray[i];
            }
        }
        
        if (maxLCP === 0) {
            return "";
        }
        
        return text.substring(bestPos, bestPos + maxLCP);
    }
}

// Test examples
const text: string = "banana";
console.log("Text:", text);

// Build suffix array
const suffixArray = SuffixArrayAlgorithms.build(text);
console.log("Suffix Array:", suffixArray);

// Print suffixes in sorted order
console.log("Sorted Suffixes:");
for (let i = 0; i < suffixArray.length; i++) {
    console.log(`${i}: ${text.substring(suffixArray[i])}`);
}

// Build LCP array
const lcp = SuffixArrayAlgorithms.buildLCPArray(text, suffixArray);
console.log("LCP Array:", lcp);

// Pattern search
const pattern: string = "ana";
const occurrences = SuffixArrayAlgorithms.searchPattern(text, suffixArray, pattern);
console.log(`Pattern '${pattern}' found at positions:`, occurrences);

// Longest common substring
const text2: string = "ananas";
const lcs = SuffixArrayAlgorithms.longestCommonSubstring(text, text2);
console.log(`Longest common substring of '${text}' and '${text2}': ${lcs}`);

// Count distinct substrings
const distinct = SuffixArrayAlgorithms.countDistinctSubstrings(text);
console.log("Number of distinct substrings:", distinct);

// Longest repeated substring
const repeated = SuffixArrayAlgorithms.longestRepeatedSubstring(text);
console.log("Longest repeated substring:", repeated);
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Sorting comparison**: string comparison helyett rank-based comparison → performance bottleneck
- **LCP calculation**: Kasai algoritmus height invariant figyelmen kívül hagyása → incorrect results
- **Pattern search**: binary search boundary conditions → missing or duplicate results
- **Memory optimization**: suffix strings tárolása → unnecessary memory usage
- **Separator choice**: LCS-nél azonos separatorok → incorrect boundary detection

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Text processing**: Full-text search and indexing
- **Bioinformatics**: DNA/RNA sequence analysis and alignment
- **Data compression**: Finding repeated patterns for compression
- **Plagiarism detection**: Document similarity analysis
- **String algorithms**: Space-efficient suffix tree alternative

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Mi az előnye Suffix Array-nek Suffix Tree-vel szemben?
<details><summary>Válasz mutatása</summary>
Space efficiency: O(n) vs O(n log σ). Construction egyszerűbb. Cache-friendly linear memory access. Downside: néhány query lassabb suffix tree-nél.
</details>

2. Hogyan működik a Kasai algoritmus LCP array építéshez?
<details><summary>Válasz mutatása</summary>
Height invariant: h[i] >= h[i-1] - 1. Minden suffix-hez max n karakter check, így O(n) total. Rank array-jel order szerint processzáljuk.
</details>

3. Miért használunk doubling technique-et suffix array építéshez?
<details><summary>Válasz mutatása</summary>
O(n log n) time complexity elérése. Minden iterációban 2k hosszú prefixek szerint rendezünk. log n iteráció után minden suffix unique rank.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Longest Common Substring"** → LCS using suffix array and LCP
2. **"Longest Repeated Substring"** → Maximum LCP value application
3. **"Count Distinct Substrings"** → Total minus LCP sum
4. **"Pattern Searching"** → Binary search on suffix array
5. **"String Ranking"** → Lexicographic order of substrings

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Suffix Tree` · `LCP Array` · `Burrows-Wheeler Transform` · `Z Algorithm` · `Manacher's Algorithm`

</div>

<div class="tags">
  <span class="tag">suffix-array</span>
  <span class="tag">string</span>
  <span class="tag">sorting</span>
  <span class="tag">lcp</span>
  <span class="tag">pattern-matching</span>
  <span class="tag">medior</span>
</div>

### Manacher's Algorithm - Palindróm Keresés {#manacher}
<!-- tags: manacher, palindrome, string, linear-time, preprocessing, medior -->

<div class="concept-section mental-model">

🔄 **Probléma megfogalmazása**  
*A Manacher algoritmus olyan, mint a palindrómok szuper-detektora: lineáris időben megtalálja az összes palindrómot egy stringben. A kulcs az ötletes preprocessing (# karakterek beszúrása) és a szimmetria kihasználása. Az algoritmus "center expansion" logikát használ, de intelligensen elkerüli a redundáns összehasonlításokat korábbi számítások alapján. Ez a leghatékonyabb módja a leghosszabb palindróm megtalálásának.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Time complexity**: O(n) linear time guaranteed
- **Space complexity**: O(n) for preprocessing and auxiliary arrays
- **Naive approach**: O(n³) brute force checking all substrings
- **Optimized naive**: O(n²) expand around centers
- **Manacher advantage**: O(n) with no constant factor issues

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// 1. Preprocess string to handle even-length palindromes
function preprocess(s):
    // Insert '#' between every character
    // "abc" -> "#a#b#c#"
    processed = "#"
    for char in s:
        processed += char + "#"
    return processed

// 2. Manacher's Algorithm
function manacher(s):
    // Preprocess to handle even-length palindromes uniformly
    T = preprocess(s)
    n = T.length
    P = new Array(n, 0)  // P[i] = radius of palindrome centered at i
    center = 0           // Center of rightmost palindrome
    right = 0           // Right boundary of rightmost palindrome
    
    for i from 0 to n-1:
        // Mirror of i with respect to center
        mirror = 2 * center - i
        
        // If i is within right boundary, we can use previously computed values
        if i < right:
            P[i] = min(right - i, P[mirror])
        
        // Try to expand palindrome centered at i
        try:
            while T[i + P[i] + 1] == T[i - P[i] - 1]:
                P[i]++
        catch (bounds check):
            pass  // Handle array bounds
        
        // If palindrome centered at i extends past right, update center and right
        if i + P[i] > right:
            center = i
            right = i + P[i]
    
    return P

// 3. Find Longest Palindromic Substring
function longestPalindrome(s):
    if s.length == 0:
        return ""
    
    T = preprocess(s)
    P = manacher(s)
    
    // Find center with maximum radius
    maxLen = 0
    centerIndex = 0
    
    for i from 0 to P.length-1:
        if P[i] > maxLen:
            maxLen = P[i]
            centerIndex = i
    
    // Extract palindrome from original string
    start = (centerIndex - maxLen) / 2
    return s.substring(start, start + maxLen)

// 4. Count All Palindromic Substrings
function countPalindromes(s):
    T = preprocess(s)
    P = manacher(s)
    
    count = 0
    for radius in P:
        count += (radius + 1) / 2  // Each radius contributes multiple palindromes
    
    return count

// 5. Find All Palindromic Substrings
function allPalindromes(s):
    T = preprocess(s)
    P = manacher(s)
    palindromes = []
    
    for i from 0 to P.length-1:
        radius = P[i]
        
        // Extract all palindromes centered at i
        for r from 1 to radius:
            start = (i - r) / 2
            length = r
            if start >= 0 and start + length <= s.length:
                palindromes.add(s.substring(start, start + length))
    
    return palindromes

// 6. Palindromic Tree (Advanced structure for multiple queries)
class PalindromicTree:
    nodes = []
    
    function build(s):
        // Build compressed representation of all palindromes
        // Each node represents a palindrome
        // Edges represent extensions by single character
        
        nodes.add(Node(-1))  // odd root
        nodes.add(Node(0))   // even root
        
        for char in s:
            addCharacter(char)
    
    function addCharacter(char):
        // Add character and create new palindromes
        // Update suffix links and failure links
        pass

// 7. Applications and Optimizations
function palindromeQueries(s, queries):
    // Precompute all palindromes
    T = preprocess(s)
    P = manacher(s)
    
    results = []
    for query in queries:
        start, end = query
        // Answer query about palindromes in range [start, end]
        result = queryRange(P, start, end)
        results.add(result)
    
    return results

// Advanced applications:
// 1. Minimum cuts for palindrome partitioning
// 2. Longest palindromic subsequence
// 3. Palindrome pairs
// 4. Rolling hash with palindrome detection
// 5. DNA sequence analysis
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class ManacherAlgorithm {
    
    // 1. Preprocess string to handle even-length palindromes
    private static String preprocess(String s) {
        StringBuilder sb = new StringBuilder();
        sb.append('#');
        for (char c : s.toCharArray()) {
            sb.append(c).append('#');
        }
        return sb.toString();
    }
    
    // 2. Manacher's Algorithm - core implementation
    public static int[] manacher(String s) {
        if (s == null || s.length() == 0) {
            return new int[0];
        }
        
        String T = preprocess(s);
        int n = T.length();
        int[] P = new int[n]; // P[i] = radius of palindrome centered at i
        int center = 0;       // Center of rightmost palindrome
        int right = 0;        // Right boundary of rightmost palindrome
        
        for (int i = 0; i < n; i++) {
            // Mirror of i with respect to center
            int mirror = 2 * center - i;
            
            // If i is within right boundary, use previously computed values
            if (i < right) {
                P[i] = Math.min(right - i, P[mirror]);
            }
            
            // Try to expand palindrome centered at i
            try {
                while (i + P[i] + 1 < n && i - P[i] - 1 >= 0 && 
                       T.charAt(i + P[i] + 1) == T.charAt(i - P[i] - 1)) {
                    P[i]++;
                }
            } catch (Exception e) {
                // Handle bounds naturally with try-catch
            }
            
            // If palindrome centered at i extends past right, update center and right
            if (i + P[i] > right) {
                center = i;
                right = i + P[i];
            }
        }
        
        return P;
    }
    
    // 3. Find Longest Palindromic Substring
    public static String longestPalindrome(String s) {
        if (s == null || s.length() == 0) {
            return "";
        }
        
        int[] P = manacher(s);
        String T = preprocess(s);
        
        // Find center with maximum radius
        int maxLen = 0;
        int centerIndex = 0;
        
        for (int i = 0; i < P.length; i++) {
            if (P[i] > maxLen) {
                maxLen = P[i];
                centerIndex = i;
            }
        }
        
        // Extract palindrome from original string
        int start = (centerIndex - maxLen) / 2;
        return s.substring(start, start + maxLen);
    }
    
    // 4. Count All Palindromic Substrings
    public static int countPalindromes(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }
        
        int[] P = manacher(s);
        int count = 0;
        
        for (int radius : P) {
            count += (radius + 1) / 2;
        }
        
        return count;
    }
    
    // 5. Find All Palindromic Substrings
    public static List<String> allPalindromes(String s) {
        if (s == null || s.length() == 0) {
            return new ArrayList<>();
        }
        
        int[] P = manacher(s);
        String T = preprocess(s);
        Set<String> palindromes = new HashSet<>();
        
        for (int i = 0; i < P.length; i++) {
            int radius = P[i];
            
            // Extract all palindromes centered at i
            for (int r = 0; r <= radius; r++) {
                if (T.charAt(i) != '#') { // Odd length palindromes
                    int start = (i - r) / 2;
                    int length = r + 1;
                    if (start >= 0 && start + length <= s.length()) {
                        palindromes.add(s.substring(start, start + length));
                    }
                } else { // Even length palindromes
                    if (r > 0) {
                        int start = (i - r) / 2;
                        int length = r;
                        if (start >= 0 && start + length <= s.length()) {
                            palindromes.add(s.substring(start, start + length));
                        }
                    }
                }
            }
        }
        
        return new ArrayList<>(palindromes);
    }
    
    // 6. Check if substring is palindrome in O(1) after preprocessing
    public static class PalindromeChecker {
        private int[] P;
        private String original;
        private String processed;
        
        public PalindromeChecker(String s) {
            this.original = s;
            this.processed = preprocess(s);
            this.P = manacher(s);
        }
        
        public boolean isPalindrome(int start, int end) {
            if (start < 0 || end >= original.length() || start > end) {
                return false;
            }
            
            // Convert to processed string coordinates
            int center = start + end + 1; // Center in processed string
            int radius = (end - start + 1) / 2;
            
            return center < P.length && P[center] >= radius;
        }
        
        public String getLongestPalindromeAt(int center) {
            if (center < 0 || center >= original.length()) {
                return "";
            }
            
            int processedCenter = center * 2 + 1;
            if (processedCenter >= P.length) {
                return "";
            }
            
            int radius = P[processedCenter];
            int start = center - radius / 2;
            int length = radius;
            
            if (start >= 0 && start + length <= original.length()) {
                return original.substring(start, start + length);
            }
            
            return "";
        }
    }
    
    // 7. Minimum palindrome partitioning
    public static int minPalindromePartition(String s) {
        int n = s.length();
        if (n <= 1) return 0;
        
        // Use Manacher to identify all palindromes
        PalindromeChecker checker = new PalindromeChecker(s);
        
        // DP to find minimum cuts
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (checker.isPalindrome(j, i - 1)) {
                    dp[i] = Math.min(dp[i], dp[j] + 1);
                }
            }
        }
        
        return dp[n] - 1; // Number of cuts = partitions - 1
    }
    
    // Test examples
    public static void main(String[] args) {
        String[] testStrings = {"babad", "cbbd", "racecar", "abcdef", "abacabad"};
        
        for (String s : testStrings) {
            System.out.println("\n=== Testing: " + s + " ===");
            
            // Longest palindrome
            String longest = longestPalindrome(s);
            System.out.println("Longest palindrome: " + longest);
            
            // Count palindromes
            int count = countPalindromes(s);
            System.out.println("Number of palindromes: " + count);
            
            // All palindromes
            List<String> all = allPalindromes(s);
            System.out.println("All palindromes: " + all);
            
            // Palindrome checker
            PalindromeChecker checker = new PalindromeChecker(s);
            System.out.println("Is [0, " + (s.length()-1) + "] palindrome: " + 
                             checker.isPalindrome(0, s.length()-1));
            
            // Minimum partition
            int minCuts = minPalindromePartition(s);
            System.out.println("Minimum palindrome partition cuts: " + minCuts);
        }
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// 1. Preprocess string to handle even-length palindromes
function preprocess(s) {
    let result = '#';
    for (const char of s) {
        result += char + '#';
    }
    return result;
}

// 2. Manacher's Algorithm - core implementation
function manacher(s) {
    if (!s || s.length === 0) {
        return [];
    }
    
    const T = preprocess(s);
    const n = T.length;
    const P = new Array(n).fill(0); // P[i] = radius of palindrome centered at i
    let center = 0;                 // Center of rightmost palindrome
    let right = 0;                  // Right boundary of rightmost palindrome
    
    for (let i = 0; i < n; i++) {
        // Mirror of i with respect to center
        const mirror = 2 * center - i;
        
        // If i is within right boundary, use previously computed values
        if (i < right) {
            P[i] = Math.min(right - i, P[mirror]);
        }
        
        // Try to expand palindrome centered at i
        while (i + P[i] + 1 < n && i - P[i] - 1 >= 0 && 
               T[i + P[i] + 1] === T[i - P[i] - 1]) {
            P[i]++;
        }
        
        // If palindrome centered at i extends past right, update center and right
        if (i + P[i] > right) {
            center = i;
            right = i + P[i];
        }
    }
    
    return P;
}

// 3. Find Longest Palindromic Substring
function longestPalindrome(s) {
    if (!s || s.length === 0) {
        return "";
    }
    
    const P = manacher(s);
    
    // Find center with maximum radius
    let maxLen = 0;
    let centerIndex = 0;
    
    for (let i = 0; i < P.length; i++) {
        if (P[i] > maxLen) {
            maxLen = P[i];
            centerIndex = i;
        }
    }
    
    // Extract palindrome from original string
    const start = Math.floor((centerIndex - maxLen) / 2);
    return s.substring(start, start + maxLen);
}

// 4. Count All Palindromic Substrings
function countPalindromes(s) {
    if (!s || s.length === 0) {
        return 0;
    }
    
    const P = manacher(s);
    let count = 0;
    
    for (const radius of P) {
        count += Math.floor((radius + 1) / 2);
    }
    
    return count;
}

// 5. Find All Palindromic Substrings
function allPalindromes(s) {
    if (!s || s.length === 0) {
        return [];
    }
    
    const P = manacher(s);
    const T = preprocess(s);
    const palindromes = new Set();
    
    for (let i = 0; i < P.length; i++) {
        const radius = P[i];
        
        // Extract all palindromes centered at i
        for (let r = 0; r <= radius; r++) {
            if (T[i] !== '#') { // Odd length palindromes
                const start = Math.floor((i - r) / 2);
                const length = r + 1;
                if (start >= 0 && start + length <= s.length) {
                    palindromes.add(s.substring(start, start + length));
                }
            } else { // Even length palindromes
                if (r > 0) {
                    const start = Math.floor((i - r) / 2);
                    const length = r;
                    if (start >= 0 && start + length <= s.length) {
                        palindromes.add(s.substring(start, start + length));
                    }
                }
            }
        }
    }
    
    return Array.from(palindromes);
}

// 6. Palindrome Checker class for O(1) queries
class PalindromeChecker {
    constructor(s) {
        this.original = s;
        this.processed = preprocess(s);
        this.P = manacher(s);
    }
    
    isPalindrome(start, end) {
        if (start < 0 || end >= this.original.length || start > end) {
            return false;
        }
        
        // Convert to processed string coordinates
        const center = start + end + 1; // Center in processed string
        const radius = Math.floor((end - start + 1) / 2);
        
        return center < this.P.length && this.P[center] >= radius;
    }
    
    getLongestPalindromeAt(center) {
        if (center < 0 || center >= this.original.length) {
            return "";
        }
        
        const processedCenter = center * 2 + 1;
        if (processedCenter >= this.P.length) {
            return "";
        }
        
        const radius = this.P[processedCenter];
        const start = center - Math.floor(radius / 2);
        const length = radius;
        
        if (start >= 0 && start + length <= this.original.length) {
            return this.original.substring(start, start + length);
        }
        
        return "";
    }
}

// 7. Minimum palindrome partitioning
function minPalindromePartition(s) {
    const n = s.length;
    if (n <= 1) return 0;
    
    // Use Manacher to identify all palindromes
    const checker = new PalindromeChecker(s);
    
    // DP to find minimum cuts
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (checker.isPalindrome(j, i - 1)) {
                dp[i] = Math.min(dp[i], dp[j] + 1);
            }
        }
    }
    
    return dp[n] - 1; // Number of cuts = partitions - 1
}

// Test examples
console.log("=== Manacher's Algorithm Tests ===");

const testStrings = ["babad", "cbbd", "racecar", "abcdef", "abacabad"];

for (const s of testStrings) {
    console.log(`\n=== Testing: ${s} ===`);
    
    // Longest palindrome
    const longest = longestPalindrome(s);
    console.log(`Longest palindrome: ${longest}`);
    
    // Count palindromes
    const count = countPalindromes(s);
    console.log(`Number of palindromes: ${count}`);
    
    // All palindromes
    const all = allPalindromes(s);
    console.log(`All palindromes: ${all}`);
    
    // Palindrome checker
    const checker = new PalindromeChecker(s);
    console.log(`Is [0, ${s.length-1}] palindrome: ${checker.isPalindrome(0, s.length-1)}`);
    
    // Minimum partition
    const minCuts = minPalindromePartition(s);
    console.log(`Minimum palindrome partition cuts: ${minCuts}`);
}
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Manacher's Algorithm implementation class
class ManacherAlgorithm {
    
    // 1. Preprocess string to handle even-length palindromes
    private static preprocess(s: string): string {
        let result = '#';
        for (const char of s) {
            result += char + '#';
        }
        return result;
    }
    
    // 2. Manacher's Algorithm - core implementation
    static computeRadius(s: string): number[] {
        if (!s || s.length === 0) {
            return [];
        }
        
        const T = this.preprocess(s);
        const n = T.length;
        const P: number[] = new Array(n).fill(0); // P[i] = radius of palindrome centered at i
        let center = 0;                           // Center of rightmost palindrome
        let right = 0;                            // Right boundary of rightmost palindrome
        
        for (let i = 0; i < n; i++) {
            // Mirror of i with respect to center
            const mirror = 2 * center - i;
            
            // If i is within right boundary, use previously computed values
            if (i < right) {
                P[i] = Math.min(right - i, P[mirror]);
            }
            
            // Try to expand palindrome centered at i
            while (i + P[i] + 1 < n && i - P[i] - 1 >= 0 && 
                   T[i + P[i] + 1] === T[i - P[i] - 1]) {
                P[i]++;
            }
            
            // If palindrome centered at i extends past right, update center and right
            if (i + P[i] > right) {
                center = i;
                right = i + P[i];
            }
        }
        
        return P;
    }
    
    // 3. Find Longest Palindromic Substring
    static longestPalindrome(s: string): string {
        if (!s || s.length === 0) {
            return "";
        }
        
        const P = this.computeRadius(s);
        
        // Find center with maximum radius
        let maxLen = 0;
        let centerIndex = 0;
        
        for (let i = 0; i < P.length; i++) {
            if (P[i] > maxLen) {
                maxLen = P[i];
                centerIndex = i;
            }
        }
        
        // Extract palindrome from original string
        const start = Math.floor((centerIndex - maxLen) / 2);
        return s.substring(start, start + maxLen);
    }
    
    // 4. Count All Palindromic Substrings
    static countPalindromes(s: string): number {
        if (!s || s.length === 0) {
            return 0;
        }
        
        const P = this.computeRadius(s);
        let count = 0;
        
        for (const radius of P) {
            count += Math.floor((radius + 1) / 2);
        }
        
        return count;
    }
    
    // 5. Find All Palindromic Substrings
    static allPalindromes(s: string): string[] {
        if (!s || s.length === 0) {
            return [];
        }
        
        const P = this.computeRadius(s);
        const T = this.preprocess(s);
        const palindromes = new Set<string>();
        
        for (let i = 0; i < P.length; i++) {
            const radius = P[i];
            
            // Extract all palindromes centered at i
            for (let r = 0; r <= radius; r++) {
                if (T[i] !== '#') { // Odd length palindromes
                    const start = Math.floor((i - r) / 2);
                    const length = r + 1;
                    if (start >= 0 && start + length <= s.length) {
                        palindromes.add(s.substring(start, start + length));
                    }
                } else { // Even length palindromes
                    if (r > 0) {
                        const start = Math.floor((i - r) / 2);
                        const length = r;
                        if (start >= 0 && start + length <= s.length) {
                            palindromes.add(s.substring(start, start + length));
                        }
                    }
                }
            }
        }
        
        return Array.from(palindromes);
    }
}

// Palindrome Checker class for O(1) queries after preprocessing
class PalindromeChecker {
    private original: string;
    private processed: string;
    private P: number[];
    
    constructor(s: string) {
        this.original = s;
        this.processed = this.preprocess(s);
        this.P = ManacherAlgorithm.computeRadius(s);
    }
    
    private preprocess(s: string): string {
        let result = '#';
        for (const char of s) {
            result += char + '#';
        }
        return result;
    }
    
    isPalindrome(start: number, end: number): boolean {
        if (start < 0 || end >= this.original.length || start > end) {
            return false;
        }
        
        // Convert to processed string coordinates
        const center = start + end + 1; // Center in processed string
        const radius = Math.floor((end - start + 1) / 2);
        
        return center < this.P.length && this.P[center] >= radius;
    }
    
    getLongestPalindromeAt(center: number): string {
        if (center < 0 || center >= this.original.length) {
            return "";
        }
        
        const processedCenter = center * 2 + 1;
        if (processedCenter >= this.P.length) {
            return "";
        }
        
        const radius = this.P[processedCenter];
        const start = center - Math.floor(radius / 2);
        const length = radius;
        
        if (start >= 0 && start + length <= this.original.length) {
            return this.original.substring(start, start + length);
        }
        
        return "";
    }
    
    getAllPalindromesInRange(start: number, end: number): string[] {
        const palindromes: string[] = [];
        
        for (let i = start; i <= end; i++) {
            for (let j = i; j <= end; j++) {
                if (this.isPalindrome(i, j)) {
                    palindromes.push(this.original.substring(i, j + 1));
                }
            }
        }
        
        return palindromes;
    }
}

// Advanced palindrome algorithms
class AdvancedPalindromeAlgorithms {
    
    // Minimum palindrome partitioning
    static minPalindromePartition(s: string): number {
        const n = s.length;
        if (n <= 1) return 0;
        
        // Use Manacher to identify all palindromes
        const checker = new PalindromeChecker(s);
        
        // DP to find minimum cuts
        const dp: number[] = new Array(n + 1).fill(Infinity);
        dp[0] = 0;
        
        for (let i = 1; i <= n; i++) {
            for (let j = 0; j < i; j++) {
                if (checker.isPalindrome(j, i - 1)) {
                    dp[i] = Math.min(dp[i], dp[j] + 1);
                }
            }
        }
        
        return dp[n] - 1; // Number of cuts = partitions - 1
    }
    
    // Find palindromic pairs
    static palindromicPairs(words: string[]): number[][] {
        const result: number[][] = [];
        
        for (let i = 0; i < words.length; i++) {
            for (let j = 0; j < words.length; j++) {
                if (i !== j) {
                    const combined = words[i] + words[j];
                    const longest = ManacherAlgorithm.longestPalindrome(combined);
                    if (longest === combined) {
                        result.push([i, j]);
                    }
                }
            }
        }
        
        return result;
    }
    
    // Longest palindromic subsequence using DP
    static longestPalindromicSubsequence(s: string): number {
        const n = s.length;
        const dp: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
        
        // Single characters are palindromes of length 1
        for (let i = 0; i < n; i++) {
            dp[i][i] = 1;
        }
        
        // Build up for larger lengths
        for (let len = 2; len <= n; len++) {
            for (let i = 0; i <= n - len; i++) {
                const j = i + len - 1;
                if (s[i] === s[j]) {
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[0][n - 1];
    }
}

// Test examples
const testStrings: string[] = ["babad", "cbbd", "racecar", "abcdef", "abacabad"];

console.log("=== Manacher's Algorithm Tests ===");

for (const s of testStrings) {
    console.log(`\n=== Testing: ${s} ===`);
    
    // Longest palindrome
    const longest = ManacherAlgorithm.longestPalindrome(s);
    console.log(`Longest palindrome: ${longest}`);
    
    // Count palindromes
    const count = ManacherAlgorithm.countPalindromes(s);
    console.log(`Number of palindromes: ${count}`);
    
    // All palindromes
    const all = ManacherAlgorithm.allPalindromes(s);
    console.log(`All palindromes: ${all}`);
    
    // Palindrome checker
    const checker = new PalindromeChecker(s);
    console.log(`Is [0, ${s.length-1}] palindrome: ${checker.isPalindrome(0, s.length-1)}`);
    
    // Minimum partition
    const minCuts = AdvancedPalindromeAlgorithms.minPalindromePartition(s);
    console.log(`Minimum palindrome partition cuts: ${minCuts}`);
    
    // Longest palindromic subsequence
    const lps = AdvancedPalindromeAlgorithms.longestPalindromicSubsequence(s);
    console.log(`Longest palindromic subsequence length: ${lps}`);
}

// Test palindromic pairs
const words: string[] = ["abc", "cba", "race", "car"];
const pairs = AdvancedPalindromeAlgorithms.palindromicPairs(words);
console.log("\nPalindromic pairs:", pairs);
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Preprocessing skip**: even-length palindrómok kezelése hiányos → incorrect results
- **Bounds checking**: array bounds túllépése expand során → runtime errors
- **Mirror calculation**: center és mirror relationship hibás → performance degradation
- **Coordinate conversion**: processed string és original string közötti mapping → wrong substring extraction
- **Edge cases**: üres string, single character handling → boundary errors

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Text processing**: Longest palindromic substring finding
- **Bioinformatics**: DNA sequence palindrome detection
- **Data validation**: Palindrome checking in real-time
- **String algorithms**: Palindrome partitioning optimization
- **Pattern recognition**: Symmetric pattern detection

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért van szükség preprocessing-re a Manacher algoritmusban?
<details><summary>Válasz mutatása</summary>
Even-length palindrómok kezelése: "#a#b#a#" formátum egységesíti. Minden palindróm odd-length lesz a processed stringben → uniform handling.
</details>

2. Hogyan működik a mirror optimization?
<details><summary>Válasz mutatása</summary>
Ha i < right, akkor P[i] >= min(right-i, P[mirror]) szimmetria miatt. Ez elkerüli redundáns character comparison-öket.
</details>

3. Mi garantálja az O(n) idő komplexitást?
<details><summary>Válasz mutatása</summary>
Minden karakter maximum kétszer van vizsgálva: egyszer expand-nél, egyszer mirror copy-nál. Total character comparisons <= 2n.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Longest Palindromic Substring"** → Direct Manacher application
2. **"Palindromic Substrings"** → Count all palindromes efficiently
3. **"Palindrome Partitioning"** → Minimum cuts using palindrome detection
4. **"Shortest Palindrome"** → Add minimum characters to make palindrome
5. **"Valid Palindrome"** → Extended palindrome validation with conditions

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`KMP Algorithm` · `Z Algorithm` · `Rolling Hash` · `Suffix Array` · `Aho-Corasick`

</div>

<div class="tags">
  <span class="tag">manacher</span>
  <span class="tag">palindrome</span>
  <span class="tag">string</span>
  <span class="tag">linear-time</span>
  <span class="tag">preprocessing</span>
  <span class="tag">medior</span>
</div>

</section>

<!-- Backtracking Algorithms Section -->
<section class="concept-section" id="backtracking-algorithms">

## 🔄 Backtracking Algorithms {#backtracking-algorithms}

### N-Queens Problem - N Királynő Probléma {#n-queens}
<!-- tags: n-queens, backtracking, chess, constraint-satisfaction, recursion, medior -->

<div class="concept-section mental-model">

♛ **Probléma megfogalmazása**  
*Az N-Queens olyan, mint a tökéletes sakkpozíció keresése: N×N táblán N királynőt kell elhelyezni úgy, hogy egyikük se támadja a másikat. Klasszikus backtracking probléma, ahol row-by-row próbálkozunk, és ha zsákutcába jutunk, visszalépünk. A constraint propagation és pruning technikák jelentősen optimalizálják a keresést. Ez a CSP (Constraint Satisfaction Problem) prototípusa.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Naive backtracking**: O(N^N) exponential worst case
- **Optimized backtracking**: O(N!) with constraint checking
- **Space complexity**: O(N) for recursion stack + board state
- **Solutions count**: No closed formula, grows exponentially
- **Pruning effectiveness**: Dramatically reduces search space

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// 1. Basic N-Queens Backtracking
function solveNQueens(n):
    board = new Array(n, n)  // Initialize empty board
    solutions = []
    
    function isSafe(row, col):
        // Check column conflicts
        for i from 0 to row-1:
            if board[i][col] == 1:
                return false
        
        // Check diagonal conflicts (top-left to bottom-right)
        i, j = row-1, col-1
        while i >= 0 and j >= 0:
            if board[i][j] == 1:
                return false
            i--, j--
        
        // Check diagonal conflicts (top-right to bottom-left)
        i, j = row-1, col+1
        while i >= 0 and j < n:
            if board[i][j] == 1:
                return false
            i--, j++
        
        return true
    
    function backtrack(row):
        if row == n:
            solutions.add(copyBoard(board))
            return
        
        for col from 0 to n-1:
            if isSafe(row, col):
                board[row][col] = 1      // Place queen
                backtrack(row + 1)       // Recurse to next row
                board[row][col] = 0      // Backtrack
    
    backtrack(0)
    return solutions

// 2. Optimized N-Queens with Constraint Arrays
function solveNQueensOptimized(n):
    solutions = []
    queens = new Array(n, -1)  // queens[i] = column of queen in row i
    
    // Constraint tracking arrays
    cols = new Array(n, false)        // Column conflicts
    diag1 = new Array(2*n-1, false)   // Main diagonal conflicts
    diag2 = new Array(2*n-1, false)   // Anti diagonal conflicts
    
    function backtrack(row):
        if row == n:
            solutions.add(copy(queens))
            return
        
        for col from 0 to n-1:
            d1 = row - col + n - 1     // Main diagonal index
            d2 = row + col             // Anti diagonal index
            
            if not cols[col] and not diag1[d1] and not diag2[d2]:
                // Place queen
                queens[row] = col
                cols[col] = diag1[d1] = diag2[d2] = true
                
                backtrack(row + 1)
                
                // Backtrack
                cols[col] = diag1[d1] = diag2[d2] = false
    
    backtrack(0)
    return solutions

// 3. Count Solutions Only (more efficient)
function countNQueens(n):
    count = 0
    cols = new Array(n, false)
    diag1 = new Array(2*n-1, false)
    diag2 = new Array(2*n-1, false)
    
    function backtrack(row):
        if row == n:
            count++
            return
        
        for col from 0 to n-1:
            d1 = row - col + n - 1
            d2 = row + col
            
            if not cols[col] and not diag1[d1] and not diag2[d2]:
                cols[col] = diag1[d1] = diag2[d2] = true
                backtrack(row + 1)
                cols[col] = diag1[d1] = diag2[d2] = false
    
    backtrack(0)
    return count

// 4. N-Queens with Bit Manipulation (ultra-optimized)
function solveNQueensBits(n):
    count = 0
    
    function backtrack(row, cols, diag1, diag2):
        if row == n:
            count++
            return
        
        // Available positions = positions not under attack
        available = ((1 << n) - 1) & ~(cols | diag1 | diag2)
        
        while available:
            pos = available & (-available)  // Get rightmost set bit
            available ^= pos                // Remove this position
            
            backtrack(row + 1,
                     cols | pos,           // Mark column
                     (diag1 | pos) << 1,   // Mark main diagonal
                     (diag2 | pos) >> 1)   // Mark anti diagonal
    
    backtrack(0, 0, 0, 0)
    return count

// 5. Find One Solution (early termination)
function findOneNQueenSolution(n):
    queens = new Array(n, -1)
    cols = new Array(n, false)
    diag1 = new Array(2*n-1, false)
    diag2 = new Array(2*n-1, false)
    
    function backtrack(row):
        if row == n:
            return true  // Found solution
        
        for col from 0 to n-1:
            d1 = row - col + n - 1
            d2 = row + col
            
            if not cols[col] and not diag1[d1] and not diag2[d2]:
                queens[row] = col
                cols[col] = diag1[d1] = diag2[d2] = true
                
                if backtrack(row + 1):
                    return true  // Early termination
                
                cols[col] = diag1[d1] = diag2[d2] = false
        
        return false
    
    if backtrack(0):
        return queens
    return null

// 6. Iterative N-Queens (avoiding recursion)
function solveNQueensIterative(n):
    solutions = []
    stack = [{row: 0, queens: new Array(n, -1), 
              cols: new Array(n, false),
              diag1: new Array(2*n-1, false),
              diag2: new Array(2*n-1, false)}]
    
    while stack.length > 0:
        state = stack.pop()
        
        if state.row == n:
            solutions.add(copy(state.queens))
            continue
        
        for col from 0 to n-1:
            d1 = state.row - col + n - 1
            d2 = state.row + col
            
            if not state.cols[col] and not state.diag1[d1] and not state.diag2[d2]:
                newQueens = copy(state.queens)
                newCols = copy(state.cols)
                newDiag1 = copy(state.diag1)
                newDiag2 = copy(state.diag2)
                
                newQueens[state.row] = col
                newCols[col] = true
                newDiag1[d1] = true
                newDiag2[d2] = true
                
                stack.push({
                    row: state.row + 1,
                    queens: newQueens,
                    cols: newCols,
                    diag1: newDiag1,
                    diag2: newDiag2
                })
    
    return solutions

// Applications:
// 1. Constraint satisfaction problems
// 2. Resource allocation with conflicts
// 3. Scheduling with constraints
// 4. Graph coloring problems
// 5. Puzzle solving algorithms
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class NQueens {
    
    // 1. Basic N-Queens with board representation
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> solutions = new ArrayList<>();
        char[][] board = new char[n][n];
        
        // Initialize board
        for (int i = 0; i < n; i++) {
            Arrays.fill(board[i], '.');
        }
        
        backtrack(board, 0, solutions);
        return solutions;
    }
    
    private static void backtrack(char[][] board, int row, List<List<String>> solutions) {
        if (row == board.length) {
            solutions.add(constructBoard(board));
            return;
        }
        
        for (int col = 0; col < board.length; col++) {
            if (isSafe(board, row, col)) {
                board[row][col] = 'Q';      // Place queen
                backtrack(board, row + 1, solutions);
                board[row][col] = '.';      // Backtrack
            }
        }
    }
    
    private static boolean isSafe(char[][] board, int row, int col) {
        int n = board.length;
        
        // Check column
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 'Q') {
                return false;
            }
        }
        
        // Check main diagonal (top-left to bottom-right)
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') {
                return false;
            }
        }
        
        // Check anti diagonal (top-right to bottom-left)
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] == 'Q') {
                return false;
            }
        }
        
        return true;
    }
    
    private static List<String> constructBoard(char[][] board) {
        List<String> result = new ArrayList<>();
        for (char[] row : board) {
            result.add(new String(row));
        }
        return result;
    }
    
    // 2. Optimized N-Queens with constraint arrays
    public static List<List<Integer>> solveNQueensOptimized(int n) {
        List<List<Integer>> solutions = new ArrayList<>();
        int[] queens = new int[n]; // queens[i] = column of queen in row i
        Arrays.fill(queens, -1);
        
        boolean[] cols = new boolean[n];
        boolean[] diag1 = new boolean[2 * n - 1];
        boolean[] diag2 = new boolean[2 * n - 1];
        
        backtrackOptimized(0, n, queens, cols, diag1, diag2, solutions);
        return solutions;
    }
    
    private static void backtrackOptimized(int row, int n, int[] queens,
                                         boolean[] cols, boolean[] diag1, boolean[] diag2,
                                         List<List<Integer>> solutions) {
        if (row == n) {
            List<Integer> solution = new ArrayList<>();
            for (int col : queens) {
                solution.add(col);
            }
            solutions.add(solution);
            return;
        }
        
        for (int col = 0; col < n; col++) {
            int d1 = row - col + n - 1;  // Main diagonal index
            int d2 = row + col;          // Anti diagonal index
            
            if (!cols[col] && !diag1[d1] && !diag2[d2]) {
                // Place queen
                queens[row] = col;
                cols[col] = diag1[d1] = diag2[d2] = true;
                
                backtrackOptimized(row + 1, n, queens, cols, diag1, diag2, solutions);
                
                // Backtrack
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        }
    }
    
    // 3. Count solutions only (more efficient)
    public static int totalNQueens(int n) {
        boolean[] cols = new boolean[n];
        boolean[] diag1 = new boolean[2 * n - 1];
        boolean[] diag2 = new boolean[2 * n - 1];
        
        return countSolutions(0, n, cols, diag1, diag2);
    }
    
    private static int countSolutions(int row, int n, boolean[] cols, 
                                    boolean[] diag1, boolean[] diag2) {
        if (row == n) {
            return 1;
        }
        
        int count = 0;
        for (int col = 0; col < n; col++) {
            int d1 = row - col + n - 1;
            int d2 = row + col;
            
            if (!cols[col] && !diag1[d1] && !diag2[d2]) {
                cols[col] = diag1[d1] = diag2[d2] = true;
                count += countSolutions(row + 1, n, cols, diag1, diag2);
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        }
        
        return count;
    }
    
    // 4. Bit manipulation version (ultra-optimized)
    public static int totalNQueensBits(int n) {
        return countWithBits(0, 0, 0, 0, n);
    }
    
    private static int countWithBits(int row, int cols, int diag1, int diag2, int n) {
        if (row == n) {
            return 1;
        }
        
        int count = 0;
        int available = ((1 << n) - 1) & (~(cols | diag1 | diag2));
        
        while (available != 0) {
            int pos = available & (-available);  // Get rightmost set bit
            available ^= pos;                    // Remove this position
            
            count += countWithBits(row + 1,
                                  cols | pos,
                                  (diag1 | pos) << 1,
                                  (diag2 | pos) >> 1,
                                  n);
        }
        
        return count;
    }
    
    // 5. Find first solution (early termination)
    public static int[] findFirstSolution(int n) {
        int[] queens = new int[n];
        Arrays.fill(queens, -1);
        
        boolean[] cols = new boolean[n];
        boolean[] diag1 = new boolean[2 * n - 1];
        boolean[] diag2 = new boolean[2 * n - 1];
        
        if (findSolution(0, n, queens, cols, diag1, diag2)) {
            return queens;
        }
        
        return null; // No solution exists
    }
    
    private static boolean findSolution(int row, int n, int[] queens,
                                      boolean[] cols, boolean[] diag1, boolean[] diag2) {
        if (row == n) {
            return true; // Found solution
        }
        
        for (int col = 0; col < n; col++) {
            int d1 = row - col + n - 1;
            int d2 = row + col;
            
            if (!cols[col] && !diag1[d1] && !diag2[d2]) {
                queens[row] = col;
                cols[col] = diag1[d1] = diag2[d2] = true;
                
                if (findSolution(row + 1, n, queens, cols, diag1, diag2)) {
                    return true; // Early termination
                }
                
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        }
        
        return false;
    }
    
    // 6. Visualization helper
    public static void printBoard(int[] queens) {
        int n = queens.length;
        System.out.println("N-Queens Solution (N=" + n + "):");
        
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                if (queens[row] == col) {
                    System.out.print("Q ");
                } else {
                    System.out.print(". ");
                }
            }
            System.out.println();
        }
        System.out.println();
    }
    
    // Test examples
    public static void main(String[] args) {
        int[] testSizes = {1, 4, 8, 10};
        
        for (int n : testSizes) {
            System.out.println("=== N-Queens for N=" + n + " ===");
            
            // Count solutions
            long startTime = System.nanoTime();
            int count = totalNQueens(n);
            long endTime = System.nanoTime();
            
            System.out.println("Number of solutions: " + count);
            System.out.println("Time (recursive): " + (endTime - startTime) / 1_000_000.0 + " ms");
            
            // Count with bit manipulation
            startTime = System.nanoTime();
            int countBits = totalNQueensBits(n);
            endTime = System.nanoTime();
            
            System.out.println("Number of solutions (bits): " + countBits);
            System.out.println("Time (bits): " + (endTime - startTime) / 1_000_000.0 + " ms");
            
            // Find first solution
            int[] firstSolution = findFirstSolution(n);
            if (firstSolution != null) {
                System.out.println("First solution found:");
                printBoard(firstSolution);
            } else {
                System.out.println("No solution exists.");
            }
            
            System.out.println();
        }
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
// 1. Basic N-Queens with board representation
function solveNQueens(n) {
    const solutions = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function backtrack(row) {
        if (row === n) {
            solutions.push(board.map(r => r.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';      // Place queen
                backtrack(row + 1);
                board[row][col] = '.';      // Backtrack
            }
        }
    }
    
    function isSafe(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') {
                return false;
            }
        }
        
        // Check main diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') {
                return false;
            }
        }
        
        // Check anti diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') {
                return false;
            }
        }
        
        return true;
    }
    
    backtrack(0);
    return solutions;
}

// 2. Optimized N-Queens with constraint arrays
function solveNQueensOptimized(n) {
    const solutions = [];
    const queens = new Array(n).fill(-1);
    const cols = new Array(n).fill(false);
    const diag1 = new Array(2 * n - 1).fill(false);
    const diag2 = new Array(2 * n - 1).fill(false);
    
    function backtrack(row) {
        if (row === n) {
            solutions.push([...queens]);
            return;
        }
        
        for (let col = 0; col < n; col++) {
            const d1 = row - col + n - 1;
            const d2 = row + col;
            
            if (!cols[col] && !diag1[d1] && !diag2[d2]) {
                // Place queen
                queens[row] = col;
                cols[col] = diag1[d1] = diag2[d2] = true;
                
                backtrack(row + 1);
                
                // Backtrack
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        }
    }
    
    backtrack(0);
    return solutions;
}

// 3. Count solutions only
function totalNQueens(n) {
    const cols = new Array(n).fill(false);
    const diag1 = new Array(2 * n - 1).fill(false);
    const diag2 = new Array(2 * n - 1).fill(false);
    
    function backtrack(row) {
        if (row === n) {
            return 1;
        }
        
        let count = 0;
        for (let col = 0; col < n; col++) {
            const d1 = row - col + n - 1;
            const d2 = row + col;
            
            if (!cols[col] && !diag1[d1] && !diag2[d2]) {
                cols[col] = diag1[d1] = diag2[d2] = true;
                count += backtrack(row + 1);
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        }
        
        return count;
    }
    
    return backtrack(0);
}

// 4. Bit manipulation version
function totalNQueensBits(n) {
    function backtrack(row, cols, diag1, diag2) {
        if (row === n) {
            return 1;
        }
        
        let count = 0;
        let available = ((1 << n) - 1) & (~(cols | diag1 | diag2));
        
        while (available !== 0) {
            const pos = available & (-available);  // Get rightmost set bit
            available ^= pos;                      // Remove this position
            
            count += backtrack(row + 1,
                             cols | pos,
                             (diag1 | pos) << 1,
                             (diag2 | pos) >>> 1);  // Use unsigned right shift
        }
        
        return count;
    }
    
    return backtrack(0, 0, 0, 0);
}

// 5. Find first solution with early termination
function findFirstSolution(n) {
    const queens = new Array(n).fill(-1);
    const cols = new Array(n).fill(false);
    const diag1 = new Array(2 * n - 1).fill(false);
    const diag2 = new Array(2 * n - 1).fill(false);
    
    function backtrack(row) {
        if (row === n) {
            return true; // Found solution
        }
        
        for (let col = 0; col < n; col++) {
            const d1 = row - col + n - 1;
            const d2 = row + col;
            
            if (!cols[col] && !diag1[d1] && !diag2[d2]) {
                queens[row] = col;
                cols[col] = diag1[d1] = diag2[d2] = true;
                
                if (backtrack(row + 1)) {
                    return true; // Early termination
                }
                
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        }
        
        return false;
    }
    
    return backtrack(0) ? queens : null;
}

// 6. Iterative version (avoiding recursion stack overflow)
function solveNQueensIterative(n) {
    const solutions = [];
    const stack = [{
        row: 0,
        queens: new Array(n).fill(-1),
        cols: new Array(n).fill(false),
        diag1: new Array(2 * n - 1).fill(false),
        diag2: new Array(2 * n - 1).fill(false)
    }];
    
    while (stack.length > 0) {
        const state = stack.pop();
        
        if (state.row === n) {
            solutions.push([...state.queens]);
            continue;
        }
        
        for (let col = 0; col < n; col++) {
            const d1 = state.row - col + n - 1;
            const d2 = state.row + col;
            
            if (!state.cols[col] && !state.diag1[d1] && !state.diag2[d2]) {
                const newQueens = [...state.queens];
                const newCols = [...state.cols];
                const newDiag1 = [...state.diag1];
                const newDiag2 = [...state.diag2];
                
                newQueens[state.row] = col;
                newCols[col] = true;
                newDiag1[d1] = true;
                newDiag2[d2] = true;
                
                stack.push({
                    row: state.row + 1,
                    queens: newQueens,
                    cols: newCols,
                    diag1: newDiag1,
                    diag2: newDiag2
                });
            }
        }
    }
    
    return solutions;
}

// Visualization helper
function printBoard(queens) {
    const n = queens.length;
    console.log(`N-Queens Solution (N=${n}):`);
    
    for (let row = 0; row < n; row++) {
        let line = '';
        for (let col = 0; col < n; col++) {
            line += queens[row] === col ? 'Q ' : '. ';
        }
        console.log(line);
    }
    console.log();
}

// Test examples
console.log("=== N-Queens Algorithm Tests ===");

const testSizes = [1, 4, 8];

for (const n of testSizes) {
    console.log(`\n=== N-Queens for N=${n} ===`);
    
    // Count solutions
    console.time('Recursive');
    const count = totalNQueens(n);
    console.timeEnd('Recursive');
    console.log(`Number of solutions: ${count}`);
    
    // Count with bit manipulation
    console.time('Bit manipulation');
    const countBits = totalNQueensBits(n);
    console.timeEnd('Bit manipulation');
    console.log(`Number of solutions (bits): ${countBits}`);
    
    // Find first solution
    const firstSolution = findFirstSolution(n);
    if (firstSolution) {
        console.log("First solution found:");
        printBoard(firstSolution);
    } else {
        console.log("No solution exists.");
    }
}
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// N-Queens solution representation
interface NQueensSolution {
    queens: number[];  // queens[i] = column of queen in row i
    board?: string[];  // Optional board representation
}

// N-Queens solver class
class NQueensSolver {
    private n: number;
    
    constructor(n: number) {
        this.n = n;
    }
    
    // 1. Find all solutions
    findAllSolutions(): NQueensSolution[] {
        const solutions: NQueensSolution[] = [];
        const queens: number[] = new Array(this.n).fill(-1);
        const cols: boolean[] = new Array(this.n).fill(false);
        const diag1: boolean[] = new Array(2 * this.n - 1).fill(false);
        const diag2: boolean[] = new Array(2 * this.n - 1).fill(false);
        
        this.backtrack(0, queens, cols, diag1, diag2, solutions);
        return solutions;
    }
    
    private backtrack(row: number, queens: number[], cols: boolean[], 
                     diag1: boolean[], diag2: boolean[], 
                     solutions: NQueensSolution[]): void {
        if (row === this.n) {
            solutions.push({
                queens: [...queens],
                board: this.constructBoard(queens)
            });
            return;
        }
        
        for (let col = 0; col < this.n; col++) {
            const d1 = row - col + this.n - 1;
            const d2 = row + col;
            
            if (!cols[col] && !diag1[d1] && !diag2[d2]) {
                // Place queen
                queens[row] = col;
                cols[col] = diag1[d1] = diag2[d2] = true;
                
                this.backtrack(row + 1, queens, cols, diag1, diag2, solutions);
                
                // Backtrack
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        }
    }
    
    // 2. Count solutions only (more efficient)
    countSolutions(): number {
        const cols: boolean[] = new Array(this.n).fill(false);
        const diag1: boolean[] = new Array(2 * this.n - 1).fill(false);
        const diag2: boolean[] = new Array(2 * this.n - 1).fill(false);
        
        return this.countBacktrack(0, cols, diag1, diag2);
    }
    
    private countBacktrack(row: number, cols: boolean[], 
                          diag1: boolean[], diag2: boolean[]): number {
        if (row === this.n) {
            return 1;
        }
        
        let count = 0;
        for (let col = 0; col < this.n; col++) {
            const d1 = row - col + this.n - 1;
            const d2 = row + col;
            
            if (!cols[col] && !diag1[d1] && !diag2[d2]) {
                cols[col] = diag1[d1] = diag2[d2] = true;
                count += this.countBacktrack(row + 1, cols, diag1, diag2);
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        }
        
        return count;
    }
    
    // 3. Find first solution with early termination
    findFirstSolution(): NQueensSolution | null {
        const queens: number[] = new Array(this.n).fill(-1);
        const cols: boolean[] = new Array(this.n).fill(false);
        const diag1: boolean[] = new Array(2 * this.n - 1).fill(false);
        const diag2: boolean[] = new Array(2 * this.n - 1).fill(false);
        
        if (this.findSolution(0, queens, cols, diag1, diag2)) {
            return {
                queens: [...queens],
                board: this.constructBoard(queens)
            };
        }
        
        return null;
    }
    
    private findSolution(row: number, queens: number[], cols: boolean[], 
                        diag1: boolean[], diag2: boolean[]): boolean {
        if (row === this.n) {
            return true;
        }
        
        for (let col = 0; col < this.n; col++) {
            const d1 = row - col + this.n - 1;
            const d2 = row + col;
            
            if (!cols[col] && !diag1[d1] && !diag2[d2]) {
                queens[row] = col;
                cols[col] = diag1[d1] = diag2[d2] = true;
                
                if (this.findSolution(row + 1, queens, cols, diag1, diag2)) {
                    return true;
                }
                
                cols[col] = diag1[d1] = diag2[d2] = false;
            }
        }
        
        return false;
    }
    
    // 4. Bit manipulation version (ultra-optimized)
    countSolutionsBits(): number {
        return this.countWithBits(0, 0, 0, 0);
    }
    
    private countWithBits(row: number, cols: number, diag1: number, diag2: number): number {
        if (row === this.n) {
            return 1;
        }
        
        let count = 0;
        let available = ((1 << this.n) - 1) & (~(cols | diag1 | diag2));
        
        while (available !== 0) {
            const pos = available & (-available);  // Get rightmost set bit
            available ^= pos;                      // Remove this position
            
            count += this.countWithBits(row + 1,
                                       cols | pos,
                                       (diag1 | pos) << 1,
                                       (diag2 | pos) >>> 1);
        }
        
        return count;
    }
    
    // Helper method to construct board representation
    private constructBoard(queens: number[]): string[] {
        const board: string[] = [];
        
        for (let row = 0; row < this.n; row++) {
            let line = '';
            for (let col = 0; col < this.n; col++) {
                line += queens[row] === col ? 'Q' : '.';
            }
            board.push(line);
        }
        
        return board;
    }
    
    // Visualization helper
    printSolution(solution: NQueensSolution): void {
        console.log(`N-Queens Solution (N=${this.n}):`);
        
        if (solution.board) {
            for (const row of solution.board) {
                console.log(row.split('').join(' '));
            }
        } else {
            // Construct board from queens array
            for (let row = 0; row < this.n; row++) {
                let line = '';
                for (let col = 0; col < this.n; col++) {
                    line += solution.queens[row] === col ? 'Q ' : '. ';
                }
                console.log(line);
            }
        }
        console.log();
    }
    
    // Performance benchmarking
    benchmark(): void {
        console.log(`\n=== Benchmarking N-Queens for N=${this.n} ===`);
        
        // Test recursive counting
        console.time('Recursive counting');
        const countRecursive = this.countSolutions();
        console.timeEnd('Recursive counting');
        console.log(`Solutions (recursive): ${countRecursive}`);
        
        // Test bit manipulation counting
        console.time('Bit manipulation counting');
        const countBits = this.countSolutionsBits();
        console.timeEnd('Bit manipulation counting');
        console.log(`Solutions (bits): ${countBits}`);
        
        // Test first solution finding
        console.time('First solution');
        const firstSolution = this.findFirstSolution();
        console.timeEnd('First solution');
        
        if (firstSolution) {
            console.log("First solution found:");
            this.printSolution(firstSolution);
        } else {
            console.log("No solution exists.");
        }
    }
}

// Advanced N-Queens utilities
class NQueensUtils {
    
    // Check if two queens attack each other
    static queensAttack(row1: number, col1: number, row2: number, col2: number): boolean {
        return row1 === row2 ||                          // Same row
               col1 === col2 ||                          // Same column
               Math.abs(row1 - row2) === Math.abs(col1 - col2); // Same diagonal
    }
    
    // Validate a solution
    static isValidSolution(queens: number[]): boolean {
        const n = queens.length;
        
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (this.queensAttack(i, queens[i], j, queens[j])) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    // Convert solution to different formats
    static solutionToString(queens: number[]): string {
        return queens.join(',');
    }
    
    static stringToSolution(str: string): number[] {
        return str.split(',').map(Number);
    }
}

// Test examples
const testSizes: number[] = [1, 4, 8];

console.log("=== N-Queens TypeScript Implementation ===");

for (const n of testSizes) {
    const solver = new NQueensSolver(n);
    solver.benchmark();
    
    // Test solution validation
    const firstSolution = solver.findFirstSolution();
    if (firstSolution) {
        const isValid = NQueensUtils.isValidSolution(firstSolution.queens);
        console.log(`Solution validation: ${isValid ? 'VALID' : 'INVALID'}`);
        
        const solutionString = NQueensUtils.solutionToString(firstSolution.queens);
        console.log(`Solution string: ${solutionString}`);
    }
}
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Diagonal indexing**: row-col és row+col diagonal indexek keveredése → incorrect constraint checking
- **Backtrack hiánya**: state nem reset-elése → persistent constraints
- **Bounds checking**: diag1, diag2 array bounds túllépése → array index errors
- **Early termination**: first solution keresése esetén return hiánya → unnecessary computation
- **Bit manipulation**: signed/unsigned shift operations → incorrect bit patterns

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Constraint Satisfaction**: CSP problems solving framework
- **Resource allocation**: Conflict-free resource assignment
- **Scheduling**: Task scheduling with mutual exclusions
- **Game theory**: Board game state space exploration
- **Combinatorial optimization**: Permutation problems with constraints

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért hatékony a constraint propagation N-Queens-ben?
<details><summary>Válasz mutatása</summary>
Early pruning: ha column/diagonal foglalt, nem próbálkozunk. Exponential search space dramatikusan csökken az early constraint checking miatt.
</details>

2. Hogyan működik a diagonal indexing?
<details><summary>Válasz mutatása</summary>
Main diagonal: row-col+n-1 (konstans értékek azonos diagonálison). Anti diagonal: row+col (konstans értékek azonos diagonálison).
</details>

3. Mikor érdemes bit manipulation-t használni?
<details><summary>Válasz mutatása</summary>
Counting only esetén: bit operations gyorsabbak boolean array-nél. Memory access pattern optimálisabb, branch prediction jobb.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"N-Queens"** → Classic backtracking with constraint optimization
2. **"N-Queens II"** → Count solutions efficiently
3. **"Sudoku Solver"** → Extended CSP with multiple constraints
4. **"Graph Coloring"** → Backtracking with adjacency constraints
5. **"Permutations with Constraints"** → Constrained permutation generation

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Sudoku Solver` · `Graph Coloring` · `Constraint Satisfaction` · `Branch and Bound` · `Backtracking Template`

</div>

<div class="tags">
  <span class="tag">n-queens</span>
  <span class="tag">backtracking</span>
  <span class="tag">chess</span>
  <span class="tag">constraint-satisfaction</span>
  <span class="tag">recursion</span>
  <span class="tag">medior</span>
</div>

### Sudoku Solver - Sudoku Megoldó {#sudoku-solver}
<!-- tags: sudoku, backtracking, constraint-satisfaction, grid, validation, medior -->

<div class="concept-section mental-model">

🧩 **Probléma megfogalmazása**  
*A Sudoku Solver egy 9×9 grid-ben missing számokat tölt ki úgy, hogy minden sor, oszlop és 3×3 subgrid tartalmazzon 1-9 számokat pontosan egyszer. Ez egy constraint satisfaction problem, ahol három típusú constraint van: row, column, box constraints. A backtracking itt cell-by-cell halad, és minden üres cellnél 1-9 számokat próbál, constraint checking-gel. Smart heuristics (MRV, forward checking) jelentősen gyorsíthatja.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Brute force**: O(9^(empty_cells)) exponential worst case
- **Constraint propagation**: Significant pruning, typically sub-exponential
- **Space complexity**: O(1) for in-place solving, O(9²) for constraint tracking
- **Best case**: O(empty_cells) when constraints heavily prune search
- **Practical performance**: Most puzzles solved in milliseconds

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// 1. Basic Sudoku Solver with Backtracking
function solveSudoku(board):
    function isValid(board, row, col, num):
        // Check row constraint
        for c from 0 to 8:
            if board[row][c] == num:
                return false
        
        // Check column constraint  
        for r from 0 to 8:
            if board[r][col] == num:
                return false
        
        // Check 3x3 box constraint
        boxRow = (row / 3) * 3
        boxCol = (col / 3) * 3
        for r from boxRow to boxRow + 2:
            for c from boxCol to boxCol + 2:
                if board[r][c] == num:
                    return false
        
        return true
    
    function solve(board):
        for row from 0 to 8:
            for col from 0 to 8:
                if board[row][col] == 0:  // Empty cell
                    for num from 1 to 9:
                        if isValid(board, row, col, num):
                            board[row][col] = num     // Place number
                            
                            if solve(board):          // Recurse
                                return true
                            
                            board[row][col] = 0       // Backtrack
                    
                    return false  // No valid number found
        
        return true  // All cells filled
    
    return solve(board)

// 2. Optimized Sudoku with Constraint Arrays
function solveSudokuOptimized(board):
    // Pre-compute constraints
    rows = Array(9, Array(10, false))     // rows[r][num] = is num used in row r
    cols = Array(9, Array(10, false))     // cols[c][num] = is num used in col c
    boxes = Array(9, Array(10, false))    // boxes[b][num] = is num used in box b
    
    // Initialize constraints from existing numbers
    function initializeConstraints():
        for row from 0 to 8:
            for col from 0 to 8:
                if board[row][col] != 0:
                    num = board[row][col]
                    box = (row / 3) * 3 + (col / 3)
                    rows[row][num] = true
                    cols[col][num] = true  
                    boxes[box][num] = true
    
    function isValidFast(row, col, num):
        box = (row / 3) * 3 + (col / 3)
        return not rows[row][num] and not cols[col][num] and not boxes[box][num]
    
    function solve():
        for row from 0 to 8:
            for col from 0 to 8:
                if board[row][col] == 0:
                    for num from 1 to 9:
                        if isValidFast(row, col, num):
                            // Place number and update constraints
                            board[row][col] = num
                            box = (row / 3) * 3 + (col / 3)
                            rows[row][num] = cols[col][num] = boxes[box][num] = true
                            
                            if solve():
                                return true
                            
                            // Backtrack and reset constraints
                            board[row][col] = 0
                            rows[row][num] = cols[col][num] = boxes[box][num] = false
                    
                    return false
        
        return true
    
    initializeConstraints()
    return solve()

// 3. Sudoku with Most Constrainted Variable (MRV) Heuristic
function solveSudokuMRV(board):
    // Find cell with fewest possible values (MRV heuristic)
    function findMostConstrainedCell():
        minPossibilities = 10
        bestCell = null
        
        for row from 0 to 8:
            for col from 0 to 8:
                if board[row][col] == 0:
                    possibilities = 0
                    for num from 1 to 9:
                        if isValid(board, row, col, num):
                            possibilities++
                    
                    if possibilities < minPossibilities:
                        minPossibilities = possibilities
                        bestCell = {row, col, possibilities}
                        
                        if possibilities == 0:  // Dead end
                            return bestCell
        
        return bestCell
    
    function solve():
        cell = findMostConstrainedCell()
        
        if cell == null:
            return true  // No empty cells left
        
        if cell.possibilities == 0:
            return false  // Dead end, backtrack
        
        for num from 1 to 9:
            if isValid(board, cell.row, cell.col, num):
                board[cell.row][cell.col] = num
                
                if solve():
                    return true
                
                board[cell.row][cell.col] = 0
        
        return false
    
    return solve()

// 4. Sudoku with Forward Checking
function solveSudokuForwardChecking(board):
    // Maintain possible values for each cell
    possible = Array(9, Array(9, Set))
    
    function initializePossibleValues():
        for row from 0 to 8:
            for col from 0 to 8:
                if board[row][col] == 0:
                    possible[row][col] = new Set()
                    for num from 1 to 9:
                        if isValid(board, row, col, num):
                            possible[row][col].add(num)
    
    function updateConstraints(row, col, num, remove):
        // Update row constraints
        for c from 0 to 8:
            if c != col and board[row][c] == 0:
                if remove:
                    possible[row][c].remove(num)
                else:
                    if isValid(board, row, c, num):
                        possible[row][c].add(num)
        
        // Update column constraints
        for r from 0 to 8:
            if r != row and board[r][col] == 0:
                if remove:
                    possible[r][col].remove(num)
                else:
                    if isValid(board, r, col, num):
                        possible[r][col].add(num)
        
        // Update box constraints
        boxRow = (row / 3) * 3
        boxCol = (col / 3) * 3
        for r from boxRow to boxRow + 2:
            for c from boxCol to boxCol + 2:
                if (r != row or c != col) and board[r][c] == 0:
                    if remove:
                        possible[r][c].remove(num)
                    else:
                        if isValid(board, r, c, num):
                            possible[r][c].add(num)
    
    function solve():
        // Find cell with minimum remaining values
        minValues = 10
        bestCell = null
        
        for row from 0 to 8:
            for col from 0 to 8:
                if board[row][col] == 0:
                    size = possible[row][col].size()
                    if size == 0:
                        return false  // Dead end
                    if size < minValues:
                        minValues = size
                        bestCell = {row, col}
        
        if bestCell == null:
            return true  // Solved
        
        // Try each possible value
        possibleNums = Array.from(possible[bestCell.row][bestCell.col])
        for num in possibleNums:
            board[bestCell.row][bestCell.col] = num
            updateConstraints(bestCell.row, bestCell.col, num, true)
            
            if solve():
                return true
            
            // Backtrack
            board[bestCell.row][bestCell.col] = 0
            updateConstraints(bestCell.row, bestCell.col, num, false)
        
        return false
    
    initializePossibleValues()
    return solve()

// 5. Sudoku Validator
function isValidSudoku(board):
    // Check rows
    for row from 0 to 8:
        seen = new Set()
        for col from 0 to 8:
            if board[row][col] != 0:
                if seen.has(board[row][col]):
                    return false
                seen.add(board[row][col])
    
    // Check columns
    for col from 0 to 8:
        seen = new Set()
        for row from 0 to 8:
            if board[row][col] != 0:
                if seen.has(board[row][col]):
                    return false
                seen.add(board[row][col])
    
    // Check 3x3 boxes
    for box from 0 to 8:
        seen = new Set()
        startRow = (box / 3) * 3
        startCol = (box % 3) * 3
        
        for row from startRow to startRow + 2:
            for col from startCol to startCol + 2:
                if board[row][col] != 0:
                    if seen.has(board[row][col]):
                        return false
                    seen.add(board[row][col])
    
    return true

// 6. Sudoku Generator (bonus)
function generateSudoku(difficulty):
    board = Array(9, Array(9, 0))
    
    // Fill board completely
    if solveSudoku(board):
        // Remove numbers based on difficulty
        cellsToRemove = getDifficultyLevel(difficulty)
        
        while cellsToRemove > 0:
            row = random(0, 8)
            col = random(0, 8)
            
            if board[row][col] != 0:
                backup = board[row][col]
                board[row][col] = 0
                
                // Check if puzzle still has unique solution
                if hasUniqueSolution(board):
                    cellsToRemove--
                else:
                    board[row][col] = backup  // Restore
    
    return board

// Applications:
// 1. Constraint satisfaction problems
// 2. Logic puzzle solving
// 3. Game AI development
// 4. Educational tools
// 5. Pattern recognition systems
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class SudokuSolver {
    private static final int SIZE = 9;
    private static final int EMPTY = 0;
    private static final int BOX_SIZE = 3;
    
    // 1. Basic Sudoku Solver
    public static boolean solveSudoku(int[][] board) {
        for (int row = 0; row < SIZE; row++) {
            for (int col = 0; col < SIZE; col++) {
                if (board[row][col] == EMPTY) {
                    for (int num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            
                            if (solveSudoku(board)) {
                                return true;
                            }
                            
                            board[row][col] = EMPTY; // Backtrack
                        }
                    }
                    return false; // No valid number found
                }
            }
        }
        return true; // All cells filled successfully
    }
    
    private static boolean isValid(int[][] board, int row, int col, int num) {
        // Check row
        for (int c = 0; c < SIZE; c++) {
            if (board[row][c] == num) {
                return false;
            }
        }
        
        // Check column
        for (int r = 0; r < SIZE; r++) {
            if (board[r][col] == num) {
                return false;
            }
        }
        
        // Check 3x3 box
        int boxRow = (row / BOX_SIZE) * BOX_SIZE;
        int boxCol = (col / BOX_SIZE) * BOX_SIZE;
        
        for (int r = boxRow; r < boxRow + BOX_SIZE; r++) {
            for (int c = boxCol; c < boxCol + BOX_SIZE; c++) {
                if (board[r][c] == num) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    // 2. Optimized Sudoku with Constraint Arrays
    public static boolean solveSudokuOptimized(int[][] board) {
        boolean[][] rows = new boolean[SIZE][SIZE + 1];
        boolean[][] cols = new boolean[SIZE][SIZE + 1];
        boolean[][] boxes = new boolean[SIZE][SIZE + 1];
        
        // Initialize constraints
        for (int row = 0; row < SIZE; row++) {
            for (int col = 0; col < SIZE; col++) {
                if (board[row][col] != EMPTY) {
                    int num = board[row][col];
                    int box = (row / BOX_SIZE) * BOX_SIZE + (col / BOX_SIZE);
                    rows[row][num] = true;
                    cols[col][num] = true;
                    boxes[box][num] = true;
                }
            }
        }
        
        return solveOptimized(board, rows, cols, boxes);
    }
    
    private static boolean solveOptimized(int[][] board, boolean[][] rows, 
                                        boolean[][] cols, boolean[][] boxes) {
        for (int row = 0; row < SIZE; row++) {
            for (int col = 0; col < SIZE; col++) {
                if (board[row][col] == EMPTY) {
                    for (int num = 1; num <= 9; num++) {
                        int box = (row / BOX_SIZE) * BOX_SIZE + (col / BOX_SIZE);
                        
                        if (!rows[row][num] && !cols[col][num] && !boxes[box][num]) {
                            // Place number
                            board[row][col] = num;
                            rows[row][num] = cols[col][num] = boxes[box][num] = true;
                            
                            if (solveOptimized(board, rows, cols, boxes)) {
                                return true;
                            }
                            
                            // Backtrack
                            board[row][col] = EMPTY;
                            rows[row][num] = cols[col][num] = boxes[box][num] = false;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    // 3. Sudoku with MRV (Most Remaining Values) Heuristic
    public static boolean solveSudokuMRV(int[][] board) {
        return solveMRV(board);
    }
    
    private static boolean solveMRV(int[][] board) {
        Cell bestCell = findMostConstrainedCell(board);
        
        if (bestCell == null) {
            return true; // No empty cells left
        }
        
        if (bestCell.possibilities == 0) {
            return false; // Dead end
        }
        
        for (int num = 1; num <= 9; num++) {
            if (isValid(board, bestCell.row, bestCell.col, num)) {
                board[bestCell.row][bestCell.col] = num;
                
                if (solveMRV(board)) {
                    return true;
                }
                
                board[bestCell.row][bestCell.col] = EMPTY;
            }
        }
        
        return false;
    }
    
    private static Cell findMostConstrainedCell(int[][] board) {
        int minPossibilities = 10;
        Cell bestCell = null;
        
        for (int row = 0; row < SIZE; row++) {
            for (int col = 0; col < SIZE; col++) {
                if (board[row][col] == EMPTY) {
                    int possibilities = 0;
                    for (int num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            possibilities++;
                        }
                    }
                    
                    if (possibilities < minPossibilities) {
                        minPossibilities = possibilities;
                        bestCell = new Cell(row, col, possibilities);
                        
                        if (possibilities == 0) {
                            return bestCell; // Dead end found
                        }
                    }
                }
            }
        }
        
        return bestCell;
    }
    
    // 4. Sudoku Validator
    public static boolean isValidSudoku(int[][] board) {
        // Check rows
        for (int row = 0; row < SIZE; row++) {
            boolean[] seen = new boolean[SIZE + 1];
            for (int col = 0; col < SIZE; col++) {
                if (board[row][col] != EMPTY) {
                    if (seen[board[row][col]]) {
                        return false;
                    }
                    seen[board[row][col]] = true;
                }
            }
        }
        
        // Check columns
        for (int col = 0; col < SIZE; col++) {
            boolean[] seen = new boolean[SIZE + 1];
            for (int row = 0; row < SIZE; row++) {
                if (board[row][col] != EMPTY) {
                    if (seen[board[row][col]]) {
                        return false;
                    }
                    seen[board[row][col]] = true;
                }
            }
        }
        
        // Check 3x3 boxes
        for (int box = 0; box < SIZE; box++) {
            boolean[] seen = new boolean[SIZE + 1];
            int startRow = (box / BOX_SIZE) * BOX_SIZE;
            int startCol = (box % BOX_SIZE) * BOX_SIZE;
            
            for (int row = startRow; row < startRow + BOX_SIZE; row++) {
                for (int col = startCol; col < startCol + BOX_SIZE; col++) {
                    if (board[row][col] != EMPTY) {
                        if (seen[board[row][col]]) {
                            return false;
                        }
                        seen[board[row][col]] = true;
                    }
                }
            }
        }
        
        return true;
    }
    
    // 5. Count number of solutions
    public static int countSolutions(int[][] board) {
        return countSolutionsHelper(copyBoard(board), 0);
    }
    
    private static int countSolutionsHelper(int[][] board, int count) {
        for (int row = 0; row < SIZE; row++) {
            for (int col = 0; col < SIZE; col++) {
                if (board[row][col] == EMPTY) {
                    int localCount = 0;
                    for (int num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            localCount += countSolutionsHelper(board, 0);
                            board[row][col] = EMPTY;
                        }
                    }
                    return localCount;
                }
            }
        }
        return 1; // Complete solution found
    }
    
    // Helper classes and methods
    private static class Cell {
        int row, col, possibilities;
        
        Cell(int row, int col, int possibilities) {
            this.row = row;
            this.col = col;
            this.possibilities = possibilities;
        }
    }
    
    public static void printBoard(int[][] board) {
        System.out.println("Sudoku Board:");
        for (int row = 0; row < SIZE; row++) {
            if (row % 3 == 0 && row != 0) {
                System.out.println("------+-------+------");
            }
            for (int col = 0; col < SIZE; col++) {
                if (col % 3 == 0 && col != 0) {
                    System.out.print("| ");
                }
                if (board[row][col] == EMPTY) {
                    System.out.print(". ");
                } else {
                    System.out.print(board[row][col] + " ");
                }
            }
            System.out.println();
        }
        System.out.println();
    }
    
    private static int[][] copyBoard(int[][] board) {
        int[][] copy = new int[SIZE][SIZE];
        for (int i = 0; i < SIZE; i++) {
            System.arraycopy(board[i], 0, copy[i], 0, SIZE);
        }
        return copy;
    }
    
    // Test examples
    public static void main(String[] args) {
        // Example Sudoku puzzle (0 represents empty cells)
        int[][] puzzle = {
            {5, 3, 0, 0, 7, 0, 0, 0, 0},
            {6, 0, 0, 1, 9, 5, 0, 0, 0},
            {0, 9, 8, 0, 0, 0, 0, 6, 0},
            {8, 0, 0, 0, 6, 0, 0, 0, 3},
            {4, 0, 0, 8, 0, 3, 0, 0, 1},
            {7, 0, 0, 0, 2, 0, 0, 0, 6},
            {0, 6, 0, 0, 0, 0, 2, 8, 0},
            {0, 0, 0, 4, 1, 9, 0, 0, 5},
            {0, 0, 0, 0, 8, 0, 0, 7, 9}
        };
        
        System.out.println("Original puzzle:");
        printBoard(puzzle);
        
        // Test validation
        System.out.println("Is valid: " + isValidSudoku(puzzle));
        
        // Solve with basic algorithm
        int[][] basicSolution = copyBoard(puzzle);
        long startTime = System.nanoTime();
        boolean solved = solveSudoku(basicSolution);
        long endTime = System.nanoTime();
        
        System.out.println("Basic solver - Solved: " + solved);
        System.out.println("Time: " + (endTime - startTime) / 1_000_000.0 + " ms");
        if (solved) {
            printBoard(basicSolution);
        }
        
        // Solve with optimized algorithm
        int[][] optimizedSolution = copyBoard(puzzle);
        startTime = System.nanoTime();
        boolean solvedOpt = solveSudokuOptimized(optimizedSolution);
        endTime = System.nanoTime();
        
        System.out.println("Optimized solver - Solved: " + solvedOpt);
        System.out.println("Time: " + (endTime - startTime) / 1_000_000.0 + " ms");
        
        // Solve with MRV heuristic
        int[][] mrvSolution = copyBoard(puzzle);
        startTime = System.nanoTime();
        boolean solvedMRV = solveSudokuMRV(mrvSolution);
        endTime = System.nanoTime();
        
        System.out.println("MRV solver - Solved: " + solvedMRV);
        System.out.println("Time: " + (endTime - startTime) / 1_000_000.0 + " ms");
        
        // Count solutions
        int solutionCount = countSolutions(puzzle);
        System.out.println("Number of solutions: " + solutionCount);
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
class SudokuSolver {
    constructor() {
        this.SIZE = 9;
        this.EMPTY = 0;
        this.BOX_SIZE = 3;
    }
    
    // 1. Basic Sudoku Solver
    solveSudoku(board) {
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] === this.EMPTY) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            
                            if (this.solveSudoku(board)) {
                                return true;
                            }
                            
                            board[row][col] = this.EMPTY; // Backtrack
                        }
                    }
                    return false; // No valid number found
                }
            }
        }
        return true; // All cells filled successfully
    }
    
    isValid(board, row, col, num) {
        // Check row
        for (let c = 0; c < this.SIZE; c++) {
            if (board[row][c] === num) {
                return false;
            }
        }
        
        // Check column
        for (let r = 0; r < this.SIZE; r++) {
            if (board[r][col] === num) {
                return false;
            }
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / this.BOX_SIZE) * this.BOX_SIZE;
        const boxCol = Math.floor(col / this.BOX_SIZE) * this.BOX_SIZE;
        
        for (let r = boxRow; r < boxRow + this.BOX_SIZE; r++) {
            for (let c = boxCol; c < boxCol + this.BOX_SIZE; c++) {
                if (board[r][c] === num) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    // 2. Optimized Sudoku with Constraint Arrays
    solveSudokuOptimized(board) {
        const rows = Array(this.SIZE).fill().map(() => Array(this.SIZE + 1).fill(false));
        const cols = Array(this.SIZE).fill().map(() => Array(this.SIZE + 1).fill(false));
        const boxes = Array(this.SIZE).fill().map(() => Array(this.SIZE + 1).fill(false));
        
        // Initialize constraints
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] !== this.EMPTY) {
                    const num = board[row][col];
                    const box = Math.floor(row / this.BOX_SIZE) * this.BOX_SIZE + 
                              Math.floor(col / this.BOX_SIZE);
                    rows[row][num] = true;
                    cols[col][num] = true;
                    boxes[box][num] = true;
                }
            }
        }
        
        return this.solveOptimized(board, rows, cols, boxes);
    }
    
    solveOptimized(board, rows, cols, boxes) {
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] === this.EMPTY) {
                    for (let num = 1; num <= 9; num++) {
                        const box = Math.floor(row / this.BOX_SIZE) * this.BOX_SIZE + 
                                  Math.floor(col / this.BOX_SIZE);
                        
                        if (!rows[row][num] && !cols[col][num] && !boxes[box][num]) {
                            // Place number
                            board[row][col] = num;
                            rows[row][num] = cols[col][num] = boxes[box][num] = true;
                            
                            if (this.solveOptimized(board, rows, cols, boxes)) {
                                return true;
                            }
                            
                            // Backtrack
                            board[row][col] = this.EMPTY;
                            rows[row][num] = cols[col][num] = boxes[box][num] = false;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    // 3. Sudoku with MRV (Most Remaining Values) Heuristic
    solveSudokuMRV(board) {
        return this.solveMRV(board);
    }
    
    solveMRV(board) {
        const bestCell = this.findMostConstrainedCell(board);
        
        if (!bestCell) {
            return true; // No empty cells left
        }
        
        if (bestCell.possibilities === 0) {
            return false; // Dead end
        }
        
        for (let num = 1; num <= 9; num++) {
            if (this.isValid(board, bestCell.row, bestCell.col, num)) {
                board[bestCell.row][bestCell.col] = num;
                
                if (this.solveMRV(board)) {
                    return true;
                }
                
                board[bestCell.row][bestCell.col] = this.EMPTY;
            }
        }
        
        return false;
    }
    
    findMostConstrainedCell(board) {
        let minPossibilities = 10;
        let bestCell = null;
        
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] === this.EMPTY) {
                    let possibilities = 0;
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(board, row, col, num)) {
                            possibilities++;
                        }
                    }
                    
                    if (possibilities < minPossibilities) {
                        minPossibilities = possibilities;
                        bestCell = { row, col, possibilities };
                        
                        if (possibilities === 0) {
                            return bestCell; // Dead end found
                        }
                    }
                }
            }
        }
        
        return bestCell;
    }
    
    // 4. Sudoku Validator
    isValidSudoku(board) {
        // Check rows
        for (let row = 0; row < this.SIZE; row++) {
            const seen = new Set();
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] !== this.EMPTY) {
                    if (seen.has(board[row][col])) {
                        return false;
                    }
                    seen.add(board[row][col]);
                }
            }
        }
        
        // Check columns
        for (let col = 0; col < this.SIZE; col++) {
            const seen = new Set();
            for (let row = 0; row < this.SIZE; row++) {
                if (board[row][col] !== this.EMPTY) {
                    if (seen.has(board[row][col])) {
                        return false;
                    }
                    seen.add(board[row][col]);
                }
            }
        }
        
        // Check 3x3 boxes
        for (let box = 0; box < this.SIZE; box++) {
            const seen = new Set();
            const startRow = Math.floor(box / this.BOX_SIZE) * this.BOX_SIZE;
            const startCol = (box % this.BOX_SIZE) * this.BOX_SIZE;
            
            for (let row = startRow; row < startRow + this.BOX_SIZE; row++) {
                for (let col = startCol; col < startCol + this.BOX_SIZE; col++) {
                    if (board[row][col] !== this.EMPTY) {
                        if (seen.has(board[row][col])) {
                            return false;
                        }
                        seen.add(board[row][col]);
                    }
                }
            }
        }
        
        return true;
    }
    
    // 5. Get possible values for a cell
    getPossibleValues(board, row, col) {
        if (board[row][col] !== this.EMPTY) {
            return [];
        }
        
        const possible = [];
        for (let num = 1; num <= 9; num++) {
            if (this.isValid(board, row, col, num)) {
                possible.push(num);
            }
        }
        
        return possible;
    }
    
    // 6. Count number of solutions
    countSolutions(board) {
        const boardCopy = this.copyBoard(board);
        return this.countSolutionsHelper(boardCopy);
    }
    
    countSolutionsHelper(board) {
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] === this.EMPTY) {
                    let count = 0;
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            count += this.countSolutionsHelper(board);
                            board[row][col] = this.EMPTY;
                        }
                    }
                    return count;
                }
            }
        }
        return 1; // Complete solution found
    }
    
    // Helper methods
    copyBoard(board) {
        return board.map(row => [...row]);
    }
    
    printBoard(board) {
        console.log("Sudoku Board:");
        for (let row = 0; row < this.SIZE; row++) {
            if (row % 3 === 0 && row !== 0) {
                console.log("------+-------+------");
            }
            let line = '';
            for (let col = 0; col < this.SIZE; col++) {
                if (col % 3 === 0 && col !== 0) {
                    line += "| ";
                }
                if (board[row][col] === this.EMPTY) {
                    line += ". ";
                } else {
                    line += board[row][col] + " ";
                }
            }
            console.log(line);
        }
        console.log();
    }
}

// Test examples
const solver = new SudokuSolver();

// Example Sudoku puzzle (0 represents empty cells)
const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

console.log("Original puzzle:");
solver.printBoard(puzzle);

// Test validation
console.log("Is valid:", solver.isValidSudoku(puzzle));

// Solve with basic algorithm
const basicSolution = solver.copyBoard(puzzle);
console.time('Basic solver');
const solved = solver.solveSudoku(basicSolution);
console.timeEnd('Basic solver');

console.log("Basic solver - Solved:", solved);
if (solved) {
    solver.printBoard(basicSolution);
}

// Solve with optimized algorithm
const optimizedSolution = solver.copyBoard(puzzle);
console.time('Optimized solver');
const solvedOpt = solver.solveSudokuOptimized(optimizedSolution);
console.timeEnd('Optimized solver');

console.log("Optimized solver - Solved:", solvedOpt);

// Solve with MRV heuristic
const mrvSolution = solver.copyBoard(puzzle);
console.time('MRV solver');
const solvedMRV = solver.solveSudokuMRV(mrvSolution);
console.timeEnd('MRV solver');

console.log("MRV solver - Solved:", solvedMRV);

// Count solutions
const solutionCount = solver.countSolutions(puzzle);
console.log("Number of solutions:", solutionCount);

// Show possible values for first empty cell
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] === 0) {
            const possible = solver.getPossibleValues(puzzle, row, col);
            console.log(`Possible values for cell (${row}, ${col}):`, possible);
            break;
        }
    }
    if (puzzle[row].includes(0)) break;
}
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Types for Sudoku solver
type SudokuBoard = number[][];
type Cell = { row: number; col: number; possibilities?: number };
type SolverResult = { solved: boolean; time: number; iterations?: number };

interface SudokuConstraints {
    rows: boolean[][];
    cols: boolean[][];
    boxes: boolean[][];
}

class SudokuSolver {
    private readonly SIZE = 9;
    private readonly EMPTY = 0;
    private readonly BOX_SIZE = 3;
    private iterations = 0;
    
    // 1. Basic Sudoku Solver
    solveSudoku(board: SudokuBoard): boolean {
        this.iterations = 0;
        return this.solveSudokuHelper(board);
    }
    
    private solveSudokuHelper(board: SudokuBoard): boolean {
        this.iterations++;
        
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] === this.EMPTY) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            
                            if (this.solveSudokuHelper(board)) {
                                return true;
                            }
                            
                            board[row][col] = this.EMPTY; // Backtrack
                        }
                    }
                    return false; // No valid number found
                }
            }
        }
        return true; // All cells filled successfully
    }
    
    private isValid(board: SudokuBoard, row: number, col: number, num: number): boolean {
        // Check row
        for (let c = 0; c < this.SIZE; c++) {
            if (board[row][c] === num) {
                return false;
            }
        }
        
        // Check column
        for (let r = 0; r < this.SIZE; r++) {
            if (board[r][col] === num) {
                return false;
            }
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / this.BOX_SIZE) * this.BOX_SIZE;
        const boxCol = Math.floor(col / this.BOX_SIZE) * this.BOX_SIZE;
        
        for (let r = boxRow; r < boxRow + this.BOX_SIZE; r++) {
            for (let c = boxCol; c < boxCol + this.BOX_SIZE; c++) {
                if (board[r][c] === num) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    // 2. Optimized Sudoku with Constraint Arrays
    solveSudokuOptimized(board: SudokuBoard): SolverResult {
        const startTime = performance.now();
        this.iterations = 0;
        
        const constraints = this.initializeConstraints(board);
        const solved = this.solveOptimized(board, constraints);
        
        const endTime = performance.now();
        return {
            solved,
            time: endTime - startTime,
            iterations: this.iterations
        };
    }
    
    private initializeConstraints(board: SudokuBoard): SudokuConstraints {
        const rows = Array(this.SIZE).fill(null).map(() => Array(this.SIZE + 1).fill(false));
        const cols = Array(this.SIZE).fill(null).map(() => Array(this.SIZE + 1).fill(false));
        const boxes = Array(this.SIZE).fill(null).map(() => Array(this.SIZE + 1).fill(false));
        
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] !== this.EMPTY) {
                    const num = board[row][col];
                    const box = Math.floor(row / this.BOX_SIZE) * this.BOX_SIZE + 
                              Math.floor(col / this.BOX_SIZE);
                    rows[row][num] = true;
                    cols[col][num] = true;
                    boxes[box][num] = true;
                }
            }
        }
        
        return { rows, cols, boxes };
    }
    
    private solveOptimized(board: SudokuBoard, constraints: SudokuConstraints): boolean {
        this.iterations++;
        
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] === this.EMPTY) {
                    for (let num = 1; num <= 9; num++) {
                        const box = Math.floor(row / this.BOX_SIZE) * this.BOX_SIZE + 
                                  Math.floor(col / this.BOX_SIZE);
                        
                        if (!constraints.rows[row][num] && 
                            !constraints.cols[col][num] && 
                            !constraints.boxes[box][num]) {
                            
                            // Place number
                            board[row][col] = num;
                            constraints.rows[row][num] = true;
                            constraints.cols[col][num] = true;
                            constraints.boxes[box][num] = true;
                            
                            if (this.solveOptimized(board, constraints)) {
                                return true;
                            }
                            
                            // Backtrack
                            board[row][col] = this.EMPTY;
                            constraints.rows[row][num] = false;
                            constraints.cols[col][num] = false;
                            constraints.boxes[box][num] = false;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    // 3. Sudoku with MRV (Most Remaining Values) Heuristic
    solveSudokuMRV(board: SudokuBoard): SolverResult {
        const startTime = performance.now();
        this.iterations = 0;
        
        const solved = this.solveMRV(board);
        
        const endTime = performance.now();
        return {
            solved,
            time: endTime - startTime,
            iterations: this.iterations
        };
    }
    
    private solveMRV(board: SudokuBoard): boolean {
        this.iterations++;
        
        const bestCell = this.findMostConstrainedCell(board);
        
        if (!bestCell) {
            return true; // No empty cells left
        }
        
        if (bestCell.possibilities === 0) {
            return false; // Dead end
        }
        
        for (let num = 1; num <= 9; num++) {
            if (this.isValid(board, bestCell.row, bestCell.col, num)) {
                board[bestCell.row][bestCell.col] = num;
                
                if (this.solveMRV(board)) {
                    return true;
                }
                
                board[bestCell.row][bestCell.col] = this.EMPTY;
            }
        }
        
        return false;
    }
    
    private findMostConstrainedCell(board: SudokuBoard): Cell | null {
        let minPossibilities = 10;
        let bestCell: Cell | null = null;
        
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] === this.EMPTY) {
                    let possibilities = 0;
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(board, row, col, num)) {
                            possibilities++;
                        }
                    }
                    
                    if (possibilities < minPossibilities) {
                        minPossibilities = possibilities;
                        bestCell = { row, col, possibilities };
                        
                        if (possibilities === 0) {
                            return bestCell; // Dead end found
                        }
                    }
                }
            }
        }
        
        return bestCell;
    }
    
    // 4. Sudoku Validator
    isValidSudoku(board: SudokuBoard): boolean {
        // Check rows
        for (let row = 0; row < this.SIZE; row++) {
            const seen = new Set<number>();
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] !== this.EMPTY) {
                    if (seen.has(board[row][col])) {
                        return false;
                    }
                    seen.add(board[row][col]);
                }
            }
        }
        
        // Check columns
        for (let col = 0; col < this.SIZE; col++) {
            const seen = new Set<number>();
            for (let row = 0; row < this.SIZE; row++) {
                if (board[row][col] !== this.EMPTY) {
                    if (seen.has(board[row][col])) {
                        return false;
                    }
                    seen.add(board[row][col]);
                }
            }
        }
        
        // Check 3x3 boxes
        for (let box = 0; box < this.SIZE; box++) {
            const seen = new Set<number>();
            const startRow = Math.floor(box / this.BOX_SIZE) * this.BOX_SIZE;
            const startCol = (box % this.BOX_SIZE) * this.BOX_SIZE;
            
            for (let row = startRow; row < startRow + this.BOX_SIZE; row++) {
                for (let col = startCol; col < startCol + this.BOX_SIZE; col++) {
                    if (board[row][col] !== this.EMPTY) {
                        if (seen.has(board[row][col])) {
                            return false;
                        }
                        seen.add(board[row][col]);
                    }
                }
            }
        }
        
        return true;
    }
    
    // 5. Get possible values for a cell
    getPossibleValues(board: SudokuBoard, row: number, col: number): number[] {
        if (board[row][col] !== this.EMPTY) {
            return [];
        }
        
        const possible: number[] = [];
        for (let num = 1; num <= 9; num++) {
            if (this.isValid(board, row, col, num)) {
                possible.push(num);
            }
        }
        
        return possible;
    }
    
    // 6. Count number of solutions
    countSolutions(board: SudokuBoard): number {
        const boardCopy = this.copyBoard(board);
        return this.countSolutionsHelper(boardCopy);
    }
    
    private countSolutionsHelper(board: SudokuBoard): number {
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] === this.EMPTY) {
                    let count = 0;
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            count += this.countSolutionsHelper(board);
                            board[row][col] = this.EMPTY;
                        }
                    }
                    return count;
                }
            }
        }
        return 1; // Complete solution found
    }
    
    // 7. Sudoku difficulty analyzer
    analyzeDifficulty(board: SudokuBoard): { difficulty: string; emptyCount: number; minPossibilities: number } {
        let emptyCount = 0;
        let minPossibilities = 10;
        
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (board[row][col] === this.EMPTY) {
                    emptyCount++;
                    const possibilities = this.getPossibleValues(board, row, col).length;
                    minPossibilities = Math.min(minPossibilities, possibilities);
                }
            }
        }
        
        let difficulty: string;
        if (emptyCount < 30 || minPossibilities >= 4) {
            difficulty = "Easy";
        } else if (emptyCount < 45 || minPossibilities >= 2) {
            difficulty = "Medium";
        } else {
            difficulty = "Hard";
        }
        
        return { difficulty, emptyCount, minPossibilities };
    }
    
    // Helper methods
    copyBoard(board: SudokuBoard): SudokuBoard {
        return board.map(row => [...row]);
    }
    
    printBoard(board: SudokuBoard): void {
        console.log("Sudoku Board:");
        for (let row = 0; row < this.SIZE; row++) {
            if (row % 3 === 0 && row !== 0) {
                console.log("------+-------+------");
            }
            let line = '';
            for (let col = 0; col < this.SIZE; col++) {
                if (col % 3 === 0 && col !== 0) {
                    line += "| ";
                }
                if (board[row][col] === this.EMPTY) {
                    line += ". ";
                } else {
                    line += board[row][col] + " ";
                }
            }
            console.log(line);
        }
        console.log();
    }
    
    benchmark(board: SudokuBoard): void {
        console.log("\n=== Sudoku Solver Benchmark ===");
        
        const analysis = this.analyzeDifficulty(board);
        console.log(`Difficulty: ${analysis.difficulty}`);
        console.log(`Empty cells: ${analysis.emptyCount}`);
        console.log(`Min possibilities: ${analysis.minPossibilities}`);
        
        // Test basic solver
        const basicBoard = this.copyBoard(board);
        const basicStart = performance.now();
        const basicSolved = this.solveSudoku(basicBoard);
        const basicEnd = performance.now();
        
        console.log(`\nBasic solver: ${basicSolved ? 'Solved' : 'Failed'}`);
        console.log(`Time: ${(basicEnd - basicStart).toFixed(3)} ms`);
        console.log(`Iterations: ${this.iterations}`);
        
        // Test optimized solver
        const optimizedBoard = this.copyBoard(board);
        const optimizedResult = this.solveSudokuOptimized(optimizedBoard);
        
        console.log(`\nOptimized solver: ${optimizedResult.solved ? 'Solved' : 'Failed'}`);
        console.log(`Time: ${optimizedResult.time.toFixed(3)} ms`);
        console.log(`Iterations: ${optimizedResult.iterations}`);
        
        // Test MRV solver
        const mrvBoard = this.copyBoard(board);
        const mrvResult = this.solveSudokuMRV(mrvBoard);
        
        console.log(`\nMRV solver: ${mrvResult.solved ? 'Solved' : 'Failed'}`);
        console.log(`Time: ${mrvResult.time.toFixed(3)} ms`);
        console.log(`Iterations: ${mrvResult.iterations}`);
        
        // Count solutions
        const solutionCount = this.countSolutions(board);
        console.log(`\nNumber of solutions: ${solutionCount}`);
    }
}

// Test examples
const solver = new SudokuSolver();

// Example Sudoku puzzle (0 represents empty cells)
const puzzle: SudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

console.log("Original puzzle:");
solver.printBoard(puzzle);

// Test validation
console.log("Is valid:", solver.isValidSudoku(puzzle));

// Run benchmark
solver.benchmark(puzzle);

// Test solution
const solution = solver.copyBoard(puzzle);
if (solver.solveSudoku(solution)) {
    console.log("\nSolution:");
    solver.printBoard(solution);
}
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Box indexing**: (row/3)*3 + (col/3) formula értelmezési hiba → wrong box validation
- **Constraint reset**: backtrack során constraints nem resetting → persistent invalid state
- **Deep copy hiánya**: board reference passing → unintended mutations
- **Early termination**: multiple solutions esetén first solution return → incomplete search
- **Validation order**: expensive validation early → unnecessary computation

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Logic puzzles**: Constraint-based puzzle solving
- **Game development**: AI for puzzle games
- **Educational tools**: Interactive learning systems
- **Constraint satisfaction**: General CSP framework
- **Pattern recognition**: Rule-based pattern detection

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért hatékony az MRV heuristic Sudoku-ban?
<details><summary>Válasz mutatása</summary>
Legkorlátozottabb cellával kezdve a search space dramatically csökken. Fail-fast principle: ha dead end, gyorsan kiderül.
</details>

2. Hogyan működik a box indexing Sudoku-ban?
<details><summary>Válasz mutatása</summary>
Box index = (row/3)*3 + (col/3). Row/3 adja meg box row-ját (0,1,2), col/3 adja meg box column-ját (0,1,2).
</details>

3. Mikor használjunk constraint arrays a helyett validation?
<details><summary>Válasz mutatása</summary>
Ha sok backtracking van: constraint arrays O(1) checking vs O(9) validation. Memory vs time tradeoff.
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Sudoku Solver"** → Backtracking with constraint satisfaction
2. **"Valid Sudoku"** → Constraint validation without solving
3. **"N-Queens"** → Similar backtracking pattern
4. **"Word Search"** → Backtracking in 2D grid
5. **"Combination Sum"** → Backtracking with different constraints

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`N-Queens` · `Graph Coloring` · `Word Search` · `Constraint Satisfaction` · `Backtracking Template`

</div>

<div class="tags">
  <span class="tag">sudoku</span>
  <span class="tag">backtracking</span>
  <span class="tag">constraint-satisfaction</span>
  <span class="tag">grid</span>
  <span class="tag">validation</span>
  <span class="tag">medior</span>
</div>

### Combination Generation - Kombinációk Generálása {#combination-generation}
<!-- tags: combinations, backtracking, enumeration, subset, permutation, medior -->

<div class="concept-section mental-model">

🔢 **Probléma megfogalmazása**  
*A Combination Generation n elemből k darab kiválasztásának minden lehetséges módját generálja. Ez a klasszikus combinatorics probléma backtracking-gel oldható meg elegánsan. A lényeg: minden pozícióban eldöntjük, hogy az aktuális elemet belerakjuk-e a kombinációba vagy sem. Pruning történik, ha már nem lehet elérni a k méretet. A generálás lehet lexicographical order, vagy optimalizált a duplikátumok elkerülésére.*

</div>

<div class="concept-section performance">

📊 **Idő- és memória-komplexitás**
- **Combinations**: O(C(n,k)) = O(n!/(k!(n-k)!)) solution count
- **Generation time**: O(k * C(n,k)) with k copy operations per solution
- **Space complexity**: O(k) for recursion stack + current combination
- **Permutations**: O(n!) exponential for all permutations
- **Practical performance**: Depends heavily on pruning effectiveness

</div>

<div class="concept-section algorithm-steps">

⚙️ **Algoritmus lépései (pszeudokód)**
```
// 1. Basic Combination Generation (C(n,k))
function generateCombinations(n, k):
    result = []
    current = []
    
    function backtrack(start):
        if current.length == k:
            result.add(copy(current))
            return
        
        for i from start to n:
            current.add(i)               // Choose
            backtrack(i + 1)             // Explore
            current.removeLast()         // Unchoose (backtrack)
    
    backtrack(1)
    return result

// 2. Array Element Combinations
function combineArrayElements(nums, k):
    result = []
    current = []
    
    function backtrack(start):
        if current.length == k:
            result.add(copy(current))
            return
        
        // Pruning: if remaining elements + current < k, skip
        remaining = nums.length - start
        needed = k - current.length
        if remaining < needed:
            return
        
        for i from start to nums.length - 1:
            current.add(nums[i])
            backtrack(i + 1)
            current.removeLast()
    
    backtrack(0)
    return result

// 3. Combinations with Duplicates
function combinationsWithDups(nums, k):
    result = []
    current = []
    nums.sort()  // Sort to handle duplicates
    
    function backtrack(start):
        if current.length == k:
            result.add(copy(current))
            return
        
        for i from start to nums.length - 1:
            // Skip duplicates (except first occurrence)
            if i > start and nums[i] == nums[i-1]:
                continue
            
            current.add(nums[i])
            backtrack(i + 1)
            current.removeLast()
    
    backtrack(0)
    return result

// 4. All Possible Combinations (Subsets)
function generateSubsets(nums):
    result = []
    current = []
    
    function backtrack(index):
        if index == nums.length:
            result.add(copy(current))
            return
        
        // Don't include current element
        backtrack(index + 1)
        
        // Include current element
        current.add(nums[index])
        backtrack(index + 1)
        current.removeLast()
    
    backtrack(0)
    return result

// 5. Combination Sum (with repetition allowed)
function combinationSum(candidates, target):
    result = []
    current = []
    
    function backtrack(start, currentSum):
        if currentSum == target:
            result.add(copy(current))
            return
        
        if currentSum > target:
            return  // Pruning
        
        for i from start to candidates.length - 1:
            current.add(candidates[i])
            // Allow repetition by using same start index
            backtrack(i, currentSum + candidates[i])
            current.removeLast()
    
    backtrack(0, 0)
    return result

// 6. Permutation Generation
function generatePermutations(nums):
    result = []
    current = []
    used = new Array(nums.length, false)
    
    function backtrack():
        if current.length == nums.length:
            result.add(copy(current))
            return
        
        for i from 0 to nums.length - 1:
            if used[i]:
                continue
            
            current.add(nums[i])
            used[i] = true
            backtrack()
            current.removeLast()
            used[i] = false
    
    backtrack()
    return result

// 7. Next Lexicographical Combination
function nextCombination(combination, n):
    k = combination.length
    
    // Find rightmost element that can be incremented
    for i from k - 1 down to 0:
        if combination[i] < n - k + i + 1:
            combination[i]++
            
            // Set subsequent elements
            for j from i + 1 to k - 1:
                combination[j] = combination[j-1] + 1
            
            return true
    
    return false  // No next combination

// 8. Iterative Combination Generation (bit manipulation)
function combinationsIterative(n, k):
    result = []
    
    // Generate all n-bit numbers with exactly k bits set
    for mask from 0 to (1 << n) - 1:
        if countBits(mask) == k:
            combination = []
            for i from 0 to n - 1:
                if (mask & (1 << i)) != 0:
                    combination.add(i + 1)
            result.add(combination)
    
    return result

function countBits(n):
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count

// 9. Combination with Sum Constraints
function combinationWithSum(nums, targetSum, targetCount):
    result = []
    current = []
    
    function backtrack(start, currentSum, count):
        if count == targetCount:
            if currentSum == targetSum:
                result.add(copy(current))
            return
        
        // Pruning: impossible to reach target
        if currentSum > targetSum:
            return
        
        remaining = nums.length - start
        needed = targetCount - count
        if remaining < needed:
            return
        
        for i from start to nums.length - 1:
            current.add(nums[i])
            backtrack(i + 1, currentSum + nums[i], count + 1)
            current.removeLast()
    
    backtrack(0, 0, 0)
    return result

// 10. Combination Generation with Callback (memory efficient)
function forEachCombination(nums, k, callback):
    current = []
    
    function backtrack(start):
        if current.length == k:
            callback(copy(current))
            return
        
        for i from start to nums.length - 1:
            current.add(nums[i])
            backtrack(i + 1)
            current.removeLast()
    
    backtrack(0)

// 11. Pascal's Triangle for Combination Counts
function generatePascalTriangle(n):
    triangle = Array(n + 1)
    
    for i from 0 to n:
        triangle[i] = Array(i + 1)
        triangle[i][0] = triangle[i][i] = 1
        
        for j from 1 to i - 1:
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
    
    return triangle

// C(n,k) = triangle[n][k]

// Applications:
// 1. Team selection problems
// 2. Resource allocation combinations
// 3. Test case generation
// 4. Lottery number combinations
// 5. Menu combination problems
// 6. Portfolio optimization
// 7. Feature selection in ML
// 8. Game state enumeration
```

</div>

<div class="concept-section implementation">

💻 **Megvalósítás különböző nyelveken**

<details>
<summary><strong>Java implementáció</strong></summary>

```java
import java.util.*;

public class CombinationGenerator {
    
    // 1. Basic Combination Generation C(n,k)
    public static List<List<Integer>> generateCombinations(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> current = new ArrayList<>();
        
        backtrack(n, k, 1, current, result);
        return result;
    }
    
    private static void backtrack(int n, int k, int start, 
                                 List<Integer> current, List<List<Integer>> result) {
        if (current.size() == k) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int i = start; i <= n; i++) {
            current.add(i);
            backtrack(n, k, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }
    
    // 2. Array Element Combinations with Pruning
    public static List<List<Integer>> combineArrayElements(int[] nums, int k) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> current = new ArrayList<>();
        
        combineHelper(nums, k, 0, current, result);
        return result;
    }
    
    private static void combineHelper(int[] nums, int k, int start,
                                    List<Integer> current, List<List<Integer>> result) {
        if (current.size() == k) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        // Pruning: check if enough elements remain
        int remaining = nums.length - start;
        int needed = k - current.size();
        if (remaining < needed) {
            return;
        }
        
        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            combineHelper(nums, k, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }
    
    // 3. Combinations with Duplicates
    public static List<List<Integer>> combinationsWithDups(int[] nums, int k) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> current = new ArrayList<>();
        Arrays.sort(nums); // Sort to handle duplicates
        
        combineDupsHelper(nums, k, 0, current, result);
        return result;
    }
    
    private static void combineDupsHelper(int[] nums, int k, int start,
                                        List<Integer> current, List<List<Integer>> result) {
        if (current.size() == k) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int i = start; i < nums.length; i++) {
            // Skip duplicates (except first occurrence at this level)
            if (i > start && nums[i] == nums[i - 1]) {
                continue;
            }
            
            current.add(nums[i]);
            combineDupsHelper(nums, k, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }
    
    // 4. Generate All Subsets (Power Set)
    public static List<List<Integer>> generateSubsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> current = new ArrayList<>();
        
        generateSubsetsHelper(nums, 0, current, result);
        return result;
    }
    
    private static void generateSubsetsHelper(int[] nums, int index,
                                            List<Integer> current, List<List<Integer>> result) {
        if (index == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        // Don't include current element
        generateSubsetsHelper(nums, index + 1, current, result);
        
        // Include current element
        current.add(nums[index]);
        generateSubsetsHelper(nums, index + 1, current, result);
        current.remove(current.size() - 1);
    }
    
    // 5. Combination Sum with Repetition
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> current = new ArrayList<>();
        Arrays.sort(candidates); // Sort for optimization
        
        combinationSumHelper(candidates, target, 0, 0, current, result);
        return result;
    }
    
    private static void combinationSumHelper(int[] candidates, int target, int start,
                                           int currentSum, List<Integer> current,
                                           List<List<Integer>> result) {
        if (currentSum == target) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        if (currentSum > target) {
            return; // Pruning
        }
        
        for (int i = start; i < candidates.length; i++) {
            // Skip if this candidate would exceed target
            if (currentSum + candidates[i] > target) {
                break; // Since array is sorted, all subsequent will also exceed
            }
            
            current.add(candidates[i]);
            // Allow repetition by using same start index
            combinationSumHelper(candidates, target, i, currentSum + candidates[i], current, result);
            current.remove(current.size() - 1);
        }
    }
    
    // 6. Generate All Permutations
    public static List<List<Integer>> generatePermutations(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> current = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        
        permutationHelper(nums, current, used, result);
        return result;
    }
    
    private static void permutationHelper(int[] nums, List<Integer> current,
                                        boolean[] used, List<List<Integer>> result) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }
            
            current.add(nums[i]);
            used[i] = true;
            permutationHelper(nums, current, used, result);
            current.remove(current.size() - 1);
            used[i] = false;
        }
    }
    
    // 7. Iterative Combination Generation using Bit Manipulation
    public static List<List<Integer>> combinationsIterative(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        
        // Generate all n-bit numbers with exactly k bits set
        for (int mask = 0; mask < (1 << n); mask++) {
            if (Integer.bitCount(mask) == k) {
                List<Integer> combination = new ArrayList<>();
                for (int i = 0; i < n; i++) {
                    if ((mask & (1 << i)) != 0) {
                        combination.add(i + 1);
                    }
                }
                result.add(combination);
            }
        }
        
        return result;
    }
    
    // 8. Next Lexicographical Combination
    public static boolean nextCombination(int[] combination, int n) {
        int k = combination.length;
        
        // Find rightmost element that can be incremented
        for (int i = k - 1; i >= 0; i--) {
            if (combination[i] < n - k + i + 1) {
                combination[i]++;
                
                // Set subsequent elements
                for (int j = i + 1; j < k; j++) {
                    combination[j] = combination[j - 1] + 1;
                }
                
                return true;
            }
        }
        
        return false; // No next combination
    }
    
    // 9. Combination Count using Pascal's Triangle
    public static int[][] generatePascalTriangle(int n) {
        int[][] triangle = new int[n + 1][];
        
        for (int i = 0; i <= n; i++) {
            triangle[i] = new int[i + 1];
            triangle[i][0] = triangle[i][i] = 1;
            
            for (int j = 1; j < i; j++) {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
        }
        
        return triangle;
    }
    
    // 10. Memory-efficient callback-based generation
    public interface CombinationCallback {
        void processCombination(List<Integer> combination);
    }
    
    public static void forEachCombination(int[] nums, int k, CombinationCallback callback) {
        List<Integer> current = new ArrayList<>();
        forEachCombinationHelper(nums, k, 0, current, callback);
    }
    
    private static void forEachCombinationHelper(int[] nums, int k, int start,
                                               List<Integer> current, CombinationCallback callback) {
        if (current.size() == k) {
            callback.processCombination(new ArrayList<>(current));
            return;
        }
        
        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            forEachCombinationHelper(nums, k, i + 1, current, callback);
            current.remove(current.size() - 1);
        }
    }
    
    // Test examples and benchmarking
    public static void main(String[] args) {
        System.out.println("=== Combination Generation Tests ===");
        
        // Test 1: Basic combinations
        System.out.println("C(5,3) combinations:");
        List<List<Integer>> combinations = generateCombinations(5, 3);
        for (List<Integer> combo : combinations) {
            System.out.println(combo);
        }
        System.out.println("Count: " + combinations.size());
        System.out.println();
        
        // Test 2: Array element combinations
        int[] nums = {1, 2, 3, 4};
        System.out.println("Array combinations (k=2):");
        List<List<Integer>> arrayCombos = combineArrayElements(nums, 2);
        for (List<Integer> combo : arrayCombos) {
            System.out.println(combo);
        }
        System.out.println();
        
        // Test 3: Combinations with duplicates
        int[] numsWithDups = {1, 2, 2, 3};
        System.out.println("Combinations with duplicates (k=2):");
        List<List<Integer>> dupCombos = combinationsWithDups(numsWithDups, 2);
        for (List<Integer> combo : dupCombos) {
            System.out.println(combo);
        }
        System.out.println();
        
        // Test 4: All subsets
        int[] subsetNums = {1, 2, 3};
        System.out.println("All subsets:");
        List<List<Integer>> subsets = generateSubsets(subsetNums);
        for (List<Integer> subset : subsets) {
            System.out.println(subset);
        }
        System.out.println();
        
        // Test 5: Combination sum
        int[] candidates = {2, 3, 6, 7};
        int target = 7;
        System.out.println("Combination sum (target=" + target + "):");
        List<List<Integer>> sumCombos = combinationSum(candidates, target);
        for (List<Integer> combo : sumCombos) {
            System.out.println(combo);
        }
        System.out.println();
        
        // Test 6: Performance comparison
        System.out.println("=== Performance Comparison ===");
        testPerformance();
        
        // Test 7: Pascal's triangle
        System.out.println("Pascal's Triangle (n=5):");
        int[][] pascal = generatePascalTriangle(5);
        for (int[] row : pascal) {
            System.out.println(Arrays.toString(row));
        }
        System.out.println();
        
        // Test 8: Next combination generation
        System.out.println("Next combination generation:");
        int[] combo = {1, 2, 3};
        System.out.println("Start: " + Arrays.toString(combo));
        while (nextCombination(combo, 5)) {
            System.out.println("Next: " + Arrays.toString(combo));
        }
    }
    
    private static void testPerformance() {
        int n = 15, k = 7;
        int[] testNums = new int[n];
        for (int i = 0; i < n; i++) {
            testNums[i] = i + 1;
        }
        
        // Test recursive approach
        long startTime = System.nanoTime();
        List<List<Integer>> recursive = combineArrayElements(testNums, k);
        long endTime = System.nanoTime();
        System.out.println("Recursive approach:");
        System.out.println("Count: " + recursive.size());
        System.out.println("Time: " + (endTime - startTime) / 1_000_000.0 + " ms");
        
        // Test iterative approach
        startTime = System.nanoTime();
        List<List<Integer>> iterative = combinationsIterative(n, k);
        endTime = System.nanoTime();
        System.out.println("Iterative approach:");
        System.out.println("Count: " + iterative.size());
        System.out.println("Time: " + (endTime - startTime) / 1_000_000.0 + " ms");
        
        // Test callback approach (memory efficient)
        final int[] count = {0};
        startTime = System.nanoTime();
        forEachCombination(testNums, k, combination -> count[0]++);
        endTime = System.nanoTime();
        System.out.println("Callback approach:");
        System.out.println("Count: " + count[0]);
        System.out.println("Time: " + (endTime - startTime) / 1_000_000.0 + " ms");
        System.out.println();
    }
}
```

</details>

<details>
<summary><strong>JavaScript implementáció</strong></summary>

```javascript
class CombinationGenerator {
    
    // 1. Basic Combination Generation C(n,k)
    static generateCombinations(n, k) {
        const result = [];
        const current = [];
        
        function backtrack(start) {
            if (current.length === k) {
                result.push([...current]);
                return;
            }
            
            for (let i = start; i <= n; i++) {
                current.push(i);
                backtrack(i + 1);
                current.pop();
            }
        }
        
        backtrack(1);
        return result;
    }
    
    // 2. Array Element Combinations with Pruning
    static combineArrayElements(nums, k) {
        const result = [];
        const current = [];
        
        function backtrack(start) {
            if (current.length === k) {
                result.push([...current]);
                return;
            }
            
            // Pruning: check if enough elements remain
            const remaining = nums.length - start;
            const needed = k - current.length;
            if (remaining < needed) {
                return;
            }
            
            for (let i = start; i < nums.length; i++) {
                current.push(nums[i]);
                backtrack(i + 1);
                current.pop();
            }
        }
        
        backtrack(0);
        return result;
    }
    
    // 3. Combinations with Duplicates
    static combinationsWithDups(nums, k) {
        const result = [];
        const current = [];
        nums.sort((a, b) => a - b); // Sort to handle duplicates
        
        function backtrack(start) {
            if (current.length === k) {
                result.push([...current]);
                return;
            }
            
            for (let i = start; i < nums.length; i++) {
                // Skip duplicates (except first occurrence at this level)
                if (i > start && nums[i] === nums[i - 1]) {
                    continue;
                }
                
                current.push(nums[i]);
                backtrack(i + 1);
                current.pop();
            }
        }
        
        backtrack(0);
        return result;
    }
    
    // 4. Generate All Subsets (Power Set)
    static generateSubsets(nums) {
        const result = [];
        const current = [];
        
        function backtrack(index) {
            if (index === nums.length) {
                result.push([...current]);
                return;
            }
            
            // Don't include current element
            backtrack(index + 1);
            
            // Include current element
            current.push(nums[index]);
            backtrack(index + 1);
            current.pop();
        }
        
        backtrack(0);
        return result;
    }
    
    // 5. Combination Sum with Repetition
    static combinationSum(candidates, target) {
        const result = [];
        const current = [];
        candidates.sort((a, b) => a - b); // Sort for optimization
        
        function backtrack(start, currentSum) {
            if (currentSum === target) {
                result.push([...current]);
                return;
            }
            
            if (currentSum > target) {
                return; // Pruning
            }
            
            for (let i = start; i < candidates.length; i++) {
                // Skip if this candidate would exceed target
                if (currentSum + candidates[i] > target) {
                    break; // Since array is sorted, all subsequent will also exceed
                }
                
                current.push(candidates[i]);
                // Allow repetition by using same start index
                backtrack(i, currentSum + candidates[i]);
                current.pop();
            }
        }
        
        backtrack(0, 0);
        return result;
    }
    
    // 6. Generate All Permutations
    static generatePermutations(nums) {
        const result = [];
        const current = [];
        const used = new Array(nums.length).fill(false);
        
        function backtrack() {
            if (current.length === nums.length) {
                result.push([...current]);
                return;
            }
            
            for (let i = 0; i < nums.length; i++) {
                if (used[i]) {
                    continue;
                }
                
                current.push(nums[i]);
                used[i] = true;
                backtrack();
                current.pop();
                used[i] = false;
            }
        }
        
        backtrack();
        return result;
    }
    
    // 7. Iterative Combination Generation using Bit Manipulation
    static combinationsIterative(n, k) {
        const result = [];
        
        // Generate all n-bit numbers with exactly k bits set
        for (let mask = 0; mask < (1 << n); mask++) {
            if (this.countBits(mask) === k) {
                const combination = [];
                for (let i = 0; i < n; i++) {
                    if ((mask & (1 << i)) !== 0) {
                        combination.push(i + 1);
                    }
                }
                result.push(combination);
            }
        }
        
        return result;
    }
    
    static countBits(n) {
        let count = 0;
        while (n) {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }
    
    // 8. Next Lexicographical Combination
    static nextCombination(combination, n) {
        const k = combination.length;
        
        // Find rightmost element that can be incremented
        for (let i = k - 1; i >= 0; i--) {
            if (combination[i] < n - k + i + 1) {
                combination[i]++;
                
                // Set subsequent elements
                for (let j = i + 1; j < k; j++) {
                    combination[j] = combination[j - 1] + 1;
                }
                
                return true;
            }
        }
        
        return false; // No next combination
    }
    
    // 9. Generate Pascal's Triangle for Combination Counts
    static generatePascalTriangle(n) {
        const triangle = [];
        
        for (let i = 0; i <= n; i++) {
            triangle[i] = new Array(i + 1);
            triangle[i][0] = triangle[i][i] = 1;
            
            for (let j = 1; j < i; j++) {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
        }
        
        return triangle;
    }
    
    // 10. Memory-efficient callback-based generation
    static forEachCombination(nums, k, callback) {
        const current = [];
        
        function backtrack(start) {
            if (current.length === k) {
                callback([...current]);
                return;
            }
            
            for (let i = start; i < nums.length; i++) {
                current.push(nums[i]);
                backtrack(i + 1);
                current.pop();
            }
        }
        
        backtrack(0);
    }
    
    // 11. Combination with Sum Constraint
    static combinationWithSum(nums, targetSum, targetCount) {
        const result = [];
        const current = [];
        
        function backtrack(start, currentSum, count) {
            if (count === targetCount) {
                if (currentSum === targetSum) {
                    result.push([...current]);
                }
                return;
            }
            
            // Pruning: impossible to reach target
            if (currentSum > targetSum) {
                return;
            }
            
            const remaining = nums.length - start;
            const needed = targetCount - count;
            if (remaining < needed) {
                return;
            }
            
            for (let i = start; i < nums.length; i++) {
                current.push(nums[i]);
                backtrack(i + 1, currentSum + nums[i], count + 1);
                current.pop();
            }
        }
        
        backtrack(0, 0, 0);
        return result;
    }
    
    // 12. Combination with Custom Constraint
    static combinationWithConstraint(nums, k, constraint) {
        const result = [];
        const current = [];
        
        function backtrack(start) {
            if (current.length === k) {
                if (constraint(current)) {
                    result.push([...current]);
                }
                return;
            }
            
            for (let i = start; i < nums.length; i++) {
                current.push(nums[i]);
                // Early constraint checking for pruning
                if (constraint(current) !== false) {
                    backtrack(i + 1);
                }
                current.pop();
            }
        }
        
        backtrack(0);
        return result;
    }
}

// Test examples and benchmarking
console.log("=== Combination Generation Tests ===");

// Test 1: Basic combinations
console.log("C(5,3) combinations:");
const combinations = CombinationGenerator.generateCombinations(5, 3);
combinations.forEach(combo => console.log(combo));
console.log(`Count: ${combinations.length}\n`);

// Test 2: Array element combinations
const nums = [1, 2, 3, 4];
console.log("Array combinations (k=2):");
const arrayCombos = CombinationGenerator.combineArrayElements(nums, 2);
arrayCombos.forEach(combo => console.log(combo));
console.log();

// Test 3: Combinations with duplicates
const numsWithDups = [1, 2, 2, 3];
console.log("Combinations with duplicates (k=2):");
const dupCombos = CombinationGenerator.combinationsWithDups(numsWithDups, 2);
dupCombos.forEach(combo => console.log(combo));
console.log();

// Test 4: All subsets
const subsetNums = [1, 2, 3];
console.log("All subsets:");
const subsets = CombinationGenerator.generateSubsets(subsetNums);
subsets.forEach(subset => console.log(subset));
console.log();

// Test 5: Combination sum
const candidates = [2, 3, 6, 7];
const target = 7;
console.log(`Combination sum (target=${target}):`);
const sumCombos = CombinationGenerator.combinationSum(candidates, target);
sumCombos.forEach(combo => console.log(combo));
console.log();

// Test 6: Performance comparison
console.log("=== Performance Comparison ===");

function testPerformance() {
    const n = 15, k = 7;
    const testNums = Array.from({length: n}, (_, i) => i + 1);
    
    // Test recursive approach
    console.time('Recursive approach');
    const recursive = CombinationGenerator.combineArrayElements(testNums, k);
    console.timeEnd('Recursive approach');
    console.log(`Count: ${recursive.length}`);
    
    // Test iterative approach
    console.time('Iterative approach');
    const iterative = CombinationGenerator.combinationsIterative(n, k);
    console.timeEnd('Iterative approach');
    console.log(`Count: ${iterative.length}`);
    
    // Test callback approach (memory efficient)
    let count = 0;
    console.time('Callback approach');
    CombinationGenerator.forEachCombination(testNums, k, () => count++);
    console.timeEnd('Callback approach');
    console.log(`Count: ${count}`);
    console.log();
}

testPerformance();

// Test 7: Pascal's triangle
console.log("Pascal's Triangle (n=5):");
const pascal = CombinationGenerator.generatePascalTriangle(5);
pascal.forEach(row => console.log(row));
console.log();

// Test 8: Next combination generation
console.log("Next combination generation:");
const combo = [1, 2, 3];
console.log(`Start: [${combo}]`);
while (CombinationGenerator.nextCombination(combo, 5)) {
    console.log(`Next: [${combo}]`);
}
console.log();

// Test 9: Combination with custom constraint
console.log("Combinations with sum <= 5:");
const constraintCombos = CombinationGenerator.combinationWithConstraint(
    [1, 2, 3, 4], 
    3, 
    current => current.reduce((sum, x) => sum + x, 0) <= 5
);
constraintCombos.forEach(combo => {
    const sum = combo.reduce((s, x) => s + x, 0);
    console.log(`${combo} (sum: ${sum})`);
});
```

</details>

<details>
<summary><strong>TypeScript implementáció</strong></summary>

```typescript
// Types for Combination Generation
type Combination<T> = T[];
type CombinationResult<T> = Combination<T>[];
type CombinationCallback<T> = (combination: Combination<T>) => void;
type ConstraintFunction<T> = (combination: Combination<T>) => boolean;

interface CombinationOptions {
    allowDuplicates?: boolean;
    allowRepetition?: boolean;
    maxSize?: number;
    minSize?: number;
}

interface GenerationStats {
    count: number;
    time: number;
    memoryPeak?: number;
}

class CombinationGenerator<T> {
    
    // 1. Basic Combination Generation C(n,k)
    generateCombinations(items: T[], k: number): CombinationResult<T> {
        const result: CombinationResult<T> = [];
        const current: T[] = [];
        
        this.backtrack(items, k, 0, current, result);
        return result;
    }
    
    private backtrack(items: T[], k: number, start: number, 
                     current: T[], result: CombinationResult<T>): void {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        
        // Pruning: check if enough elements remain
        const remaining = items.length - start;
        const needed = k - current.length;
        if (remaining < needed) {
            return;
        }
        
        for (let i = start; i < items.length; i++) {
            current.push(items[i]);
            this.backtrack(items, k, i + 1, current, result);
            current.pop();
        }
    }
    
    // 2. Generate Combinations with Options
    generateWithOptions(items: T[], k: number, options: CombinationOptions = {}): CombinationResult<T> {
        const {
            allowDuplicates = false,
            allowRepetition = false,
            maxSize = k,
            minSize = k
        } = options;
        
        if (allowDuplicates && !allowRepetition) {
            return this.generateCombinationsWithDuplicates(items, k);
        }
        
        if (allowRepetition) {
            return this.generateCombinationsWithRepetition(items, k);
        }
        
        if (minSize !== maxSize) {
            return this.generateCombinationsInRange(items, minSize, maxSize);
        }
        
        return this.generateCombinations(items, k);
    }
    
    // 3. Combinations with Duplicates in Input
    generateCombinationsWithDuplicates(items: T[], k: number): CombinationResult<T> {
        const result: CombinationResult<T> = [];
        const current: T[] = [];
        const sortedItems = [...items].sort();
        
        this.backtrackWithDuplicates(sortedItems, k, 0, current, result);
        return result;
    }
    
    private backtrackWithDuplicates(items: T[], k: number, start: number,
                                   current: T[], result: CombinationResult<T>): void {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i < items.length; i++) {
            // Skip duplicates (except first occurrence at this level)
            if (i > start && items[i] === items[i - 1]) {
                continue;
            }
            
            current.push(items[i]);
            this.backtrackWithDuplicates(items, k, i + 1, current, result);
            current.pop();
        }
    }
    
    // 4. Combinations with Repetition Allowed
    generateCombinationsWithRepetition(items: T[], k: number): CombinationResult<T> {
        const result: CombinationResult<T> = [];
        const current: T[] = [];
        
        this.backtrackWithRepetition(items, k, 0, current, result);
        return result;
    }
    
    private backtrackWithRepetition(items: T[], k: number, start: number,
                                   current: T[], result: CombinationResult<T>): void {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i < items.length; i++) {
            current.push(items[i]);
            // Allow repetition by using same start index
            this.backtrackWithRepetition(items, k, i, current, result);
            current.pop();
        }
    }
    
    // 5. Generate All Subsets (Power Set)
    generateAllSubsets(items: T[]): CombinationResult<T> {
        const result: CombinationResult<T> = [];
        const current: T[] = [];
        
        this.generateSubsets(items, 0, current, result);
        return result;
    }
    
    private generateSubsets(items: T[], index: number, 
                           current: T[], result: CombinationResult<T>): void {
        if (index === items.length) {
            result.push([...current]);
            return;
        }
        
        // Don't include current element
        this.generateSubsets(items, index + 1, current, result);
        
        // Include current element
        current.push(items[index]);
        this.generateSubsets(items, index + 1, current, result);
        current.pop();
    }
    
    // 6. Combinations in Size Range
    generateCombinationsInRange(items: T[], minSize: number, maxSize: number): CombinationResult<T> {
        const result: CombinationResult<T> = [];
        
        for (let k = minSize; k <= maxSize; k++) {
            const combos = this.generateCombinations(items, k);
            result.push(...combos);
        }
        
        return result;
    }
    
    // 7. Memory-efficient Iterator Pattern
    *iterateCombinations(items: T[], k: number): Generator<Combination<T>, void, unknown> {
        const current: T[] = [];
        yield* this.backtrackGenerator(items, k, 0, current);
    }
    
    private *backtrackGenerator(items: T[], k: number, start: number, 
                               current: T[]): Generator<Combination<T>, void, unknown> {
        if (current.length === k) {
            yield [...current];
            return;
        }
        
        const remaining = items.length - start;
        const needed = k - current.length;
        if (remaining < needed) {
            return;
        }
        
        for (let i = start; i < items.length; i++) {
            current.push(items[i]);
            yield* this.backtrackGenerator(items, k, i + 1, current);
            current.pop();
        }
    }
    
    // 8. Callback-based Generation (Memory Efficient)
    forEachCombination(items: T[], k: number, callback: CombinationCallback<T>): void {
        const current: T[] = [];
        this.forEachHelper(items, k, 0, current, callback);
    }
    
    private forEachHelper(items: T[], k: number, start: number,
                         current: T[], callback: CombinationCallback<T>): void {
        if (current.length === k) {
            callback([...current]);
            return;
        }
        
        for (let i = start; i < items.length; i++) {
            current.push(items[i]);
            this.forEachHelper(items, k, i + 1, current, callback);
            current.pop();
        }
    }
    
    // 9. Combinations with Custom Constraint
    generateWithConstraint(items: T[], k: number, 
                          constraint: ConstraintFunction<T>): CombinationResult<T> {
        const result: CombinationResult<T> = [];
        const current: T[] = [];
        
        this.backtrackWithConstraint(items, k, 0, current, result, constraint);
        return result;
    }
    
    private backtrackWithConstraint(items: T[], k: number, start: number,
                                   current: T[], result: CombinationResult<T>,
                                   constraint: ConstraintFunction<T>): void {
        if (current.length === k) {
            if (constraint(current)) {
                result.push([...current]);
            }
            return;
        }
        
        for (let i = start; i < items.length; i++) {
            current.push(items[i]);
            // Early constraint checking for pruning
            if (constraint(current) !== false) {
                this.backtrackWithConstraint(items, k, i + 1, current, result, constraint);
            }
            current.pop();
        }
    }
    
    // 10. Generate with Statistics
    generateWithStats(items: T[], k: number): { combinations: CombinationResult<T>; stats: GenerationStats } {
        const startTime = performance.now();
        const combinations = this.generateCombinations(items, k);
        const endTime = performance.now();
        
        const stats: GenerationStats = {
            count: combinations.length,
            time: endTime - startTime
        };
        
        return { combinations, stats };
    }
    
    // 11. Next Lexicographical Combination
    nextCombination(combination: number[], n: number): boolean {
        const k = combination.length;
        
        // Find rightmost element that can be incremented
        for (let i = k - 1; i >= 0; i--) {
            if (combination[i] < n - k + i + 1) {
                combination[i]++;
                
                // Set subsequent elements
                for (let j = i + 1; j < k; j++) {
                    combination[j] = combination[j - 1] + 1;
                }
                
                return true;
            }
        }
        
        return false; // No next combination
    }
    
    // 12. Combination Count Calculation
    static calculateCombinationCount(n: number, k: number): number {
        if (k > n || k < 0) return 0;
        if (k === 0 || k === n) return 1;
        
        k = Math.min(k, n - k); // Take advantage of symmetry
        
        let result = 1;
        for (let i = 0; i < k; i++) {
            result = result * (n - i) / (i + 1);
        }
        
        return Math.round(result);
    }
    
    // 13. Pascal's Triangle Generation
    static generatePascalTriangle(n: number): number[][] {
        const triangle: number[][] = [];
        
        for (let i = 0; i <= n; i++) {
            triangle[i] = new Array(i + 1);
            triangle[i][0] = triangle[i][i] = 1;
            
            for (let j = 1; j < i; j++) {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
        }
        
        return triangle;
    }
    
    // 14. Benchmark Different Approaches
    benchmark(items: T[], k: number): { [key: string]: GenerationStats } {
        const results: { [key: string]: GenerationStats } = {};
        
        // Benchmark recursive approach
        const startRecursive = performance.now();
        const recursiveResult = this.generateCombinations(items, k);
        const endRecursive = performance.now();
        
        results.recursive = {
            count: recursiveResult.length,
            time: endRecursive - startRecursive
        };
        
        // Benchmark callback approach
        let callbackCount = 0;
        const startCallback = performance.now();
        this.forEachCombination(items, k, () => callbackCount++);
        const endCallback = performance.now();
        
        results.callback = {
            count: callbackCount,
            time: endCallback - startCallback
        };
        
        // Benchmark iterator approach
        let iteratorCount = 0;
        const startIterator = performance.now();
        for (const combo of this.iterateCombinations(items, k)) {
            iteratorCount++;
        }
        const endIterator = performance.now();
        
        results.iterator = {
            count: iteratorCount,
            time: endIterator - startIterator
        };
        
        return results;
    }
}

// Test examples
const generator = new CombinationGenerator<number>();

console.log("=== TypeScript Combination Generation Tests ===");

// Test 1: Basic combinations
const items = [1, 2, 3, 4, 5];
const k = 3;

console.log(`Generating C(${items.length}, ${k}):`);
const { combinations, stats } = generator.generateWithStats(items, k);
console.log(`Generated ${stats.count} combinations in ${stats.time.toFixed(3)}ms`);
console.log("First 5 combinations:", combinations.slice(0, 5));
console.log();

// Test 2: Memory-efficient iteration
console.log("Memory-efficient iteration (first 5):");
let count = 0;
for (const combo of generator.iterateCombinations(items, k)) {
    if (count < 5) {
        console.log(combo);
    }
    count++;
}
console.log(`Total: ${count} combinations\n`);

// Test 3: Combinations with constraint
const constraint = (combo: number[]) => combo.reduce((sum, x) => sum + x, 0) <= 8;
console.log("Combinations with sum <= 8:");
const constraintCombos = generator.generateWithConstraint(items, k, constraint);
constraintCombos.forEach(combo => {
    const sum = combo.reduce((s, x) => s + x, 0);
    console.log(`[${combo}] sum: ${sum}`);
});
console.log();

// Test 4: String combinations
const stringGenerator = new CombinationGenerator<string>();
const colors = ['red', 'green', 'blue', 'yellow'];
console.log("String combinations (k=2):");
const colorCombos = stringGenerator.generateCombinations(colors, 2);
colorCombos.forEach(combo => console.log(combo));
console.log();

// Test 5: Performance benchmark
console.log("=== Performance Benchmark ===");
const benchmarkItems = Array.from({length: 12}, (_, i) => i + 1);
const benchmarkK = 6;

const benchmarkResults = generator.benchmark(benchmarkItems, benchmarkK);
Object.entries(benchmarkResults).forEach(([method, stats]) => {
    console.log(`${method}: ${stats.count} combinations in ${stats.time.toFixed(3)}ms`);
});
console.log();

// Test 6: Pascal's triangle
console.log("Pascal's Triangle (n=6):");
const pascal = CombinationGenerator.generatePascalTriangle(6);
pascal.forEach((row, i) => {
    const spaces = ' '.repeat((6 - i) * 2);
    const rowStr = row.map(x => x.toString().padStart(3)).join('');
    console.log(spaces + rowStr);
});
console.log();

// Test 7: Combination count calculation
console.log("Combination count calculations:");
for (let n = 5; n <= 10; n++) {
    for (let k = 0; k <= 3; k++) {
        const count = CombinationGenerator.calculateCombinationCount(n, k);
        console.log(`C(${n}, ${k}) = ${count}`);
    }
}
```

</details>

</div>

<div class="concept-section common-mistakes">

<details>
<summary>🧯 <strong>Gyakori hibák / félreértések</strong></summary>

<div>

- **Deep copy hiánya**: result.push(current) instead of result.push([...current]) → shared references
- **Pruning logic**: remaining < needed condition helytelenül → unnecessary computation
- **Duplicate handling**: nem megfelelő i > start condition → incorrect duplicate skipping  
- **Index bounds**: off-by-one errors backtracking során → infinite loops or missing combinations
- **Memory explosion**: large C(n,k) without streaming → out of memory errors

</div>
</details>

</div>

<div class="concept-section applications">

📚 **Alkalmazási területek**
- **Team selection**: Personnel assignment with constraints
- **Test case generation**: Combinatorial testing strategies
- **Feature selection**: Machine learning feature combinations
- **Portfolio optimization**: Asset combination analysis
- **Game development**: Level/character combination generation

</div>

<div class="concept-section micro-learning">

<details>
<summary>🧠 <strong>Mikro-tanulási kérdések</strong></summary>

<div>

1. Miért fontos a pruning combination generation-ben?
<details><summary>Válasz mutatása</summary>
Ha remaining < needed, akkor már nem lehet k elemet összegyűjteni. Early termination exponentially reduces search space.
</details>

2. Hogyan működik a duplicate skipping?
<details><summary>Válasz mutatása</summary>
i > start && nums[i] == nums[i-1] condition: same level-en első előfordulás után ugrik át duplicated values.
</details>

3. Mikor érdemes callback pattern-t használni?
<details><summary>Válasz mutatása</summary>
Nagy C(n,k) values esetén: avoid storing all combinations in memory. Memory O(k) instead of O(k * C(n,k)).
</details>

</div>
</details>

</div>

<div class="concept-section interview-questions">

💼 **Interjú kérdések**
1. **"Combinations"** → Basic C(n,k) generation with backtracking
2. **"Combination Sum"** → Backtracking with sum constraints and repetition
3. **"Subsets"** → Generate all possible subsets (power set)
4. **"Permutations"** → All arrangements with backtracking
5. **"Letter Combinations of Phone Number"** → Mapping-based combinations

</div>

<div class="concept-section related-algorithms">

🔗 **Kapcsolódó algoritmusok**  
`Permutations` · `Subsets` · `N-Queens` · `Sudoku Solver` · `Backtracking Template`

</div>

<div class="tags">
  <span class="tag">combinations</span>
  <span class="tag">backtracking</span>
  <span class="tag">enumeration</span>
  <span class="tag">subset</span>
  <span class="tag">permutation</span>
  <span class="tag">medior</span>
</div>

</section>

<!-- Summary and Learning Path Section -->
<section class="concept-section" id="learning-path">

## 🎯 Tanulási útvonal és összefoglaló {#learning-path}

### Algoritmusok elsajátítási sorrendje

<div class="concept-section mental-model">

📚 **Javasolt tanulási sorrend junior–medior szintre**

**1. Alapvető algoritmusok (1-2 hét)**
- Two Pointers → egyszerű, sokszor használható
- Sliding Window → Two Pointers kiterjesztése
- Binary Search → logikai alapok, O(log n) megértése

**2. Adatstruktúra alapok (1 hét)**  
- Array/String manipulációk
- Basic sorting (Quick Sort, Merge Sort)
- Stack/Queue operations

**3. Rekurzió és Backtracking (2 hét)**
- Tree Traversal → rekurzió alapok
- N-Queens → constraint satisfaction
- Combination Generation → systematic enumeration

**4. Dynamic Programming (2-3 hét)**
- LIS (Longest Increasing Subsequence) → 1D DP
- Coin Change → unbounded DP
- Edit Distance → 2D DP
- Knapsack → bounded DP

**5. Graph algoritmusok (2 hét)**
- BFS/DFS → graph traversal
- Dijkstra → shortest path algorithms
- Union-Find → connected components

**6. String algoritmusok (1-2 hét)**
- KMP → pattern matching
- Boyer-Moore → optimized search  
- Rabin-Karp → rolling hash technique

**7. Komplex optimalizációk (1 hét)**
- Ternary Search → optimization
- LRU Cache → data structure design
- Heap/Priority Queue → advanced data structures

</div>

### Gyakorlási stratégia

<div class="concept-section algorithm-steps">

💪 **Hatékony tanulási módszertan**

**Napi rutina (1-2 óra):**
1. **Theory review (15 perc)**: olvass el 1-2 algoritmus leírást
2. **Implementation practice (30-45 perc)**: kódold le mind a 3 nyelven
3. **Problem solving (30-45 perc)**: oldj meg 2-3 kapcsolódó LeetCode feladatot
4. **Review mistakes (15 perc)**: elemezd a hibákat, írd fel a tanulságokat

**Heti célok:**
- **Hét eleje**: 2-3 új algoritmus megértése
- **Hét közepe**: implementációk finomítása, edge cases
- **Hétvége**: összefoglaló, keresztreferenciák, interview practice

**Haladás mérése:**
- Minden algoritmusból legalább 5 variáns megoldása
- Interview kérdésekre immediate response
- Big-O complexity-k fejből tudása
- Implementation 20 perc alatt minden nyelven

</div>

### Interview felkészülés

<div class="concept-section interview-questions">

🎤 **Interjú készenlét checklist**

**Alapszintű elvárások (junior):**
- [ ] Two Pointers pattern variants
- [ ] Basic Binary Search implementations  
- [ ] Simple BFS/DFS traversals
- [ ] Array/String manipulation techniques
- [ ] Basic sorting algorithm explanations

**Medior szintű elvárások:**
- [ ] Dynamic Programming pattern recognition
- [ ] Graph algorithms optimization techniques
- [ ] String matching algorithms comparison
- [ ] Backtracking with pruning strategies
- [ ] Data structure design principles

**Advanced topics (senior):**
- [ ] Algorithm modification on-the-fly
- [ ] Space-time complexity trade-offs
- [ ] Industry-specific optimizations
- [ ] Distributed algorithm considerations
- [ ] Real-world constraint handling

</div>

### Gyakori hibák és megoldásuk

<div class="concept-section common-mistakes">

⚠️ **Tipikus problémák és tanácsok**

**Implementation hibák:**
- **Off-by-one errors**: mindig rajzold fel a small example-t
- **Null/undefined handling**: minden input validation
- **Integer overflow**: használj megfelelő data types-ot
- **Deep copy vs shallow copy**: arrays és objects kezelése

**Algorithmic mistakes:**
- **Wrong base cases**: recursion-nél gondosan definiálj
- **Missing edge cases**: empty inputs, single elements
- **Incorrect complexity analysis**: időben elemezz minden nested loop-ot
- **Suboptimal data structures**: válaszd ki a leghatékonyabb ADT-t

**Interview mistakes:**
- **Jumping to code**: gondolkodj hangosan, explain approach first
- **Not asking questions**: clarify requirements, constraints
- **Ignoring trade-offs**: explain space vs time decisions
- **Poor testing**: walk through examples, edge cases

</div>

### Referencia táblázatok

<div class="concept-section performance">

📊 **Algoritmus komplexitás összefoglaló**

| Algorithm | Best Case | Average Case | Worst Case | Space | Use Case |
|-----------|-----------|--------------|------------|-------|----------|
| **Two Pointers** | O(n) | O(n) | O(n) | O(1) | Sorted arrays |
| **Sliding Window** | O(n) | O(n) | O(n) | O(1) | Subarray problems |
| **Binary Search** | O(1) | O(log n) | O(log n) | O(1) | Sorted search |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | General sorting |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Stable sorting |
| **BFS/DFS** | O(V + E) | O(V + E) | O(V + E) | O(V) | Graph traversal |
| **Dijkstra** | O((V + E) log V) | O((V + E) log V) | O((V + E) log V) | O(V) | Shortest path |
| **KMP** | O(n + m) | O(n + m) | O(n + m) | O(m) | String matching |
| **LIS DP** | O(n log n) | O(n log n) | O(n log n) | O(n) | Sequence problems |
| **N-Queens** | O(N!) | O(N!) | O(N!) | O(N) | Constraint satisfaction |

</div>

### További tanulási források

<div class="concept-section applications">

🔗 **Ajánlott gyakorlási platformok**

**Online judges:**
- **LeetCode**: legjobb interview preparation, pattern-based grouping
- **HackerRank**: structured learning paths, certificates
- **CodeForces**: competitive programming, mathematical focus
- **AtCoder**: clean problems, educational content

**Könyvek és materiálok:**
- **Introduction to Algorithms (CLRS)**: comprehensive theoretical background
- **Algorithm Design Manual (Skiena)**: practical problem-solving approach
- **Competitive Programming Handbook**: contest-focused, optimization tricks
- **System Design Interview**: real-world algorithmic applications

**Gyakorló projektek:**
- **Build a search engine**: string algorithms, indexing
- **Graph visualization tool**: graph algorithms in practice
- **Data compression utility**: algorithmic optimization
- **Game AI**: backtracking, optimization, heuristics

</div>

</section>

<!-- Final Footer and Credits -->
<footer class="concept-section" id="footer">

---

## 📝 Záró megjegyzések

Ez az algoritmus referencia a **junior–medior developer szint** átfogó lefedésére készült, gyakorlati implementációkkal és interview-orientált megközelítéssel. Minden algoritmus tartalmazza:

✅ **9-blokk struktúra**: Mental model, Performance, Algorithm steps, Implementation, Common mistakes, Applications, Micro-learning, Interview questions, Related algorithms

✅ **3 nyelv implementáció**: Java, JavaScript, TypeScript with real-world examples

✅ **Practice-first approach**: Kód előtt elmélet, complexity analysis minden esetben

✅ **Interview preparation**: Tipikus kérdések és megoldási strategiák

**Használati tippek:**
- Bookmark-old a gyakran használt algoritmusokat
- Használd a tag filter-t specifikus típusok keresésére  
- Implementáld le minden algoritmust saját példákon
- Térj vissza rendszeresen a micro-learning kérdésekhez

**Fejlesztési lehetőségek:**
- Advanced algoritmusok hozzáadása (senior level)
- Interaktív visualizációk
- Performance benchmarking tools
- Industry-specific use case studies

---

*Utolsó frissítés: 2024 | Készítette: Algorithm Study Guide Team*
*Célcsoport: Junior–Medior Software Developers | Fókusz: Interview Preparation & Practical Implementation*

</footer>
