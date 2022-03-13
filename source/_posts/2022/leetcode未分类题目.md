---
title: leetcode基础
date: 2022-02-01 00:47:53
updated: 2022-02-01  00:53:53
categories: 
    - tool
tags: 
    - 实用教程
    - Another Tag
---

1207, 876, 701, 674


<!--more-->

## 647.[回文子串](https://leetcode-cn.com/problems/palindromic-substrings/)

> 思路：左侧判断去重，左右判断相等。

```c
int countSubstrings(char * s)
{
    int len = strlen(s);
    int res = len; // 每个字符都是回文
    for (int i = 0; i < len; i++) {
        int p = i - 1;
        while (p >= 0 && s[p] == s[i]) { // 左侧去重
            res++;
            p--;
        }
        int q = i + 1;
        while (p >= 0 && q < len && s[p] == s[q]) { // 判断左右相等
            res++;
            p--;
            q++;
        }
    }
    return res;
}
```

```c
int countSubstrings(char * s){
    int len = strlen(s);
    int count = 0;
    for (int i = 0; i < len; i++) {
        count += countPalin(s, i, i, len);
        if (i != len - 1) {
            count += countPalin(s, i, i+1, len);
        }
    }
    return count;
}

int countPalin(char *s, int head, int tail, int len)
{
    int ret = (s[head] == s[tail]) ? 1 : 0;
    if (ret && head - 1 >= 0 && tail + 1 < len) {
        ret += countPalin(s, head - 1, tail + 1, len);
    }
    return ret;
}
```

## 674.[最长连续递增序列](https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/)

> 思路：双循环判断，

```c
int findLengthOfLCIS(int* nums, int numsSize){
    if (numsSize == 1) {
        return 1;
    }
    int p2 = 0;
    int res = 0;
    for (int i = 1; i < numsSize; i++) {
        while (i < numsSize && nums[i-1] < nums[i]) {
            i++;
        }
        res = res > i - p2 ? res : i - p2;
        p2 = i;

    } 
    return res;
}
```


```c
int findLengthOfLCIS(int* nums, int numsSize){
    int maxLen = 0;
    int i = 0;
    while (i < numsSize) {
        int start = i;
        while (start + 1 < numsSize && nums[start] < nums[start + 1]) {
            start++;
        }
        maxLen = maxLen > (start - i + 1) ? maxLen : (start - i + 1);
        start++;
        i = start;
    }
    return maxLen;
}
```

## 700.[二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)

> 思路：递归，注意 判空 root == NULL

```c
struct TreeNode* searchBST(struct TreeNode* root, int val){
    if (root == NULL) {
        return NULL;
    }
    if (root->val == val) {
        return root;
    } else if (root->val > val) {
        return searchBST(root->left, val);
    } else {
        return searchBST(root->right, val);
    }
    return NULL;
}
```

## 701.[二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)

> 思路：递归，递归出口，root == NULL, 新建树结点 malloc

```c
struct TreeNode* insertIntoBST(struct TreeNode* root, int val){

    if (root == NULL) {
        struct TreeNode* newNode = (struct TreeNode*)malloc(sizeof(struct TreeNode));
        newNode->val = val;
        newNode->left = NULL;
        newNode->right = NULL;
        return newNode;
    }
    if (root->val < val) {
        root->right = insertIntoBST(root->right, val);
    }
    if (root->val > val) {
        root->left = insertIntoBST(root->left, val);
    }
    return root;
}
```

## 704.[二分查找](https://leetcode-cn.com/problems/binary-search/)

> 思路：二分查找，注意 left <= right ，包含等于

```c
int search(int* nums, int numsSize, int target){
    int left = 0;
    int right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}
```

## 709.[转换成小写字母](https://leetcode-cn.com/problems/to-lower-case/)

> 思路；库函数 isupper, tolower

```c
char * toLowerCase(char * s){
    int len = strlen(s);
    for (int i = 0; i < len; i++) {
        if (isupper(s[i])) {
            s[i] = tolower(s[i]);
        }
    }
    return s;
}
```

## 771.[宝石和石头](https://leetcode-cn.com/problems/jewels-and-stones/)

> 思路：表记录stones中每个字符个数，求和jewels字符表中的值

```c
int numJewelsInStones(char * jewels, char * stones){
    int table[256] = {0};
    int sLen = strlen(stones);
    for (int i = 0; i < sLen; i++) {
        table[stones[i]]++;
    }

    int jLen = strlen(jewels);
    int sum = 0;
    for (int i = 0; i < jLen; i++) {
        sum +=  table[jewels[i]];
    }
    return sum;
}
```


## 852.[山脉数组的峰顶索引](https://leetcode-cn.com/problems/peak-index-in-a-mountain-array/)

> 思路：判断条件，完全

```c
int peakIndexInMountainArray(int* arr, int arrSize){

  int low = 1, high = arrSize;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1])
            return mid;
        else if (arr[mid - 1] < arr[mid] && arr[mid] < arr[mid + 1])
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;

}
```

## 876.[链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

> 思路：快慢指针，第二个指针通过 偶数判断  for循环

```c
struct ListNode* middleNode(struct ListNode* head){

    struct ListNode* pos1 = head;
    struct ListNode* pos2 = head;
    for (int i = 0; pos1->next != NULL; pos1 = pos1->next, i++) {
        if (i % 2 == 0) {
            pos2 = pos2->next;
        }
    }
    return pos2;
}
```

## 905.[按奇偶排序数组](https://leetcode-cn.com/problems/sort-array-by-parity/)

> 思路: 一、双指针，同917
二、判断，前后索引移动，双指针

- 解法一：
```c
int* sortArrayByParity(int* nums, int numsSize, int* returnSize)
{
    *returnSize = numsSize;
    int start = 0;
    int end = numsSize - 1;
    while (start < end) {
        while (start < end && nums[start] % 2 == 0) {
            start++;
        }
        while (end > start && nums[end] % 2 == 1) {
            end--;
        }
        while (start < end && nums[start] % 2 != 0 && nums[end] % 2 != 1) {
            int tmp = nums[start];
            nums[start] = nums[end];
            nums[end] = tmp;
            start++;
            end--;
        }
    }
    return nums;
}

int* sortArrayByParity(int* nums, int numsSize, int* returnSize){
    *returnSize = numsSize;
    int left = 0;
    int right = numsSize - 1;
    while (left < right) {
         if (nums[left] % 2 == 0) {
            left++;
            continue;
         }
         if (nums[right] % 2 == 1) {
             right--;
             continue;
         }

         int tmp = nums[left];
         nums[left] = nums[right];
         nums[right] = tmp;
         left++;
         right--;
    }
    return nums;

}
```

- 解法二；
```c
int* sortArrayByParity(int* nums, int numsSize, int* returnSize){
    int *res = (int *)malloc(sizeof(int) * numsSize);
    *returnSize = numsSize;
    int j = 0;
    int p = numsSize - 1;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] % 2 == 0) {
            res[j] = nums[i];
            j++;
        } else {
            res[p] = nums[i];
            p--;
        }
    }
    return res;
}
```


## 917.[仅仅反转字母](https://leetcode-cn.com/problems/reverse-only-letters/)

> 思路：双指针，库函数 isalpha， continue

```c
char * reverseOnlyLetters(char * s){
    int len = strlen(s);
    int left = 0;
    int right = len - 1;
    while (left < right) {
        if (!isalpha(s[left])) {
            left++;
            continue;
        }
         if (!isalpha(s[right])) {
            right--;
            continue;
        }
        //if (isalpha(s[left]) && isalpha(s[right])) {
            char c = s[left];
            s[left] = s[right];
            s[right] = c;
            left++;
            right--;
        //}
       
    }
    return s;
}
···



## 938.[二叉搜索树的范围和](https://leetcode-cn.com/problems/range-sum-of-bst/)

```c
int rangeSumBST(struct TreeNode* root, int low, int high){

    if (root == NULL) {
        return 0;
    }

    if (low > root->val) {
        return rangeSumBST(root->right, low, high);
    }
    if (high < root->val) {
        return rangeSumBST(root->left, low, high);
    }
    return root->val + rangeSumBST(root->left, low, high) + rangeSumBST(root->right, low, high);

}
```

```c
int rangeSumBST(struct TreeNode* root, int low, int high){
    if (root == NULL) {
        return 0;
    } else if (root->val >= low && root->val <= high) {
        return root->val + rangeSumBST(root->left, low, high) + rangeSumBST(root->right, low, high);
    } else {
        return rangeSumBST(root->left, low, high) + rangeSumBST(root->right, low, high);
    }
}
```




## 965.[值二叉树](https://leetcode-cn.com/problems/univalued-binary-tree/)

> 思路：递归，递归出口：root == NULL

```c
bool isUnivalTree(struct TreeNode* root){
    // root不判空会报错：
    // member access within null pointer of type 'struct TreeNode'
    if (root == NULL) {
        return true;
    }
    // 多余
   /*  if (root->left == NULL && root->right == NULL) {
        return true;
    } */


    if (root->left != NULL) {
        if (root->left->val != root->val) {
            return false;
        }
    }

    if (root->right != NULL) {
        if (root->right->val != root->val) {
            return false;
        }
    }

    return isUnivalTree(root->left) && isUnivalTree(root->right);

}
```


## 977.[有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/submissions/)

> 思路

```c
int Cmp(const void* a,  const void* b)
{
    return *(int *)a - *(int *)b;
}

int* sortedSquares(int* nums, int numsSize, int* returnSize){

    int* squareNum = (int *)malloc(sizeof(int) * numsSize);
    *returnSize = numsSize;
    for (int i = 0; i < numsSize; i++) {
        //squareNum[i] = nums[i] * nums[i];
        squareNum[i] = pow(nums[i], 2);
    }
    qsort(squareNum, numsSize, sizeof(int), Cmp);
    return squareNum;
}
```

## 1089.[复写零](https://leetcode-cn.com/problems/duplicate-zeros/)

> 思路：将原数组复制一份，根据复制数组，修改原数组值

```c
void duplicateZeros(int* arr, int arrSize)
{
    int b[arrSize]; // = {0};
    memcpy(b, arr, sizeof(int) * arrSize);
    for (int i = 0, j = 0; i < arrSize && j < arrSize; i++) {
        arr[j++] = b[i];
        if (j < arrSize && b[i] == 0) {
            arr[j++] = 0;
        }
    }W
}
```

```c
void duplicateZeros(int* arr, int arrSize){

    int * nums = (int *)malloc(sizeof(int) * arrSize);
    for (int i = 0; i < arrSize; i++) {
        nums[i] = arr[i];
    }

    int j = 0;
    for (int i = 0; i < arrSize; i++, j++) {
        arr[i] = nums[j];
        if (i + 1 < arrSize && nums[j] == 0) {
            arr[++i] = 0; 
        }
    }

}
```



## 1184.[公交站间的距离](https://leetcode-cn.com/problems/distance-between-bus-stops/submissions/)

> 思路: 保证 start 小于 destination， 计算一圈的总长度sum，计算start到destination的距离d，取d与sum-d两者较小值

```c
int distanceBetweenBusStops(int* distance, int distanceSize, int start, int destination){
    
    if (start > destination) {
        int tmp = start;
        start = destination;
        destination = tmp;
    }

    int min = 0;
    int sum = 0;
    for (int i = 0; i < distanceSize; i++) {
        sum += distance[i];
        if (i >= start && i < destination) {
            min += distance[i];
        }
    }

    min = min < (sum - min) ? min : sum - min;
    return min;
}
```

## 1189.[ “气球” 的最大数量](https://leetcode-cn.com/problems/maximum-number-of-balloons/)

> 思路：统计字符次数，注意 字符串指针  取值 *p  或者 字符数组 test[i]

```c
int maxNumberOfBalloons(char * text){
    int len = strlen(text);
    int table[5] = {0};

    char* p = text;
    while (*p != '\0') {
        if (*p == 'b') {
            table[0]++;
        }
        if (*p == 'a') {
            table[1]++;
        }
        if (*p == 'l') {
            table[2]++;
        }
        if (*p == 'o') {
            table[3]++;
        }
        if (*p == 'n') {
            table[4]++;
        }
        p++;
    }

    table[2] /= 2;
    table[3] /= 2;
    int min = INT_MAX;
    for (int i = 0; i < 5; i++) {
        min = min < table[i] ? min : table[i];
    }
    return min;

}


/* int maxNumberOfBalloons(char * text){
    int len = strlen(text);

    int testNum[5] = {0};

    for (int i = 0; i < len; i++) {
        if (text[i] == 'b') {
            testNum[0]++;
        }
        if (text[i] == 'a') {
            testNum[1]++;
        }

        if (text[i] == 'l') {
            testNum[2]++;
        }

        if (text[i] == 'o') {
            testNum[3]++;
        }

        if (text[i] == 'n') {
            testNum[4]++;
        }
    }

    testNum[2] /= 2;
    testNum[3] /= 2;

    int res = INT_MAX;
    for (int i = 0; i < 5; i++) {
        res = res < testNum[i] ? res : testNum[i];
    }
    return res;

} */
```



## 1207.[独一无二的出现次数](https://leetcode-cn.com/problems/unique-number-of-occurrences/)

解法一
> 通过一个表统计每个数字出现的次数，定义另外一个表记录表一中每一项的，如果出现相同数字，则返回false，遍历到最后时返回true



<details>
<summary>uniqueOccurrences</summary>

```c
bool uniqueOccurrences(int* arr, int arrSize){
    int table[2001] = {0};

    for (int i = 0; i < arrSize; i++) {
        table[arr[i] + 1000]++;
        printf("table[arr[%d] + 1000] = %d\n", i, table[arr[i] + 1000]);
    }

    int table1[2001] = {0};
    for (int i = 0; i < 2001; i++) {
        table1[i] = 0;
        if (table[i] != 0) {
            if (table1[table[i]] != 0) {
                printf("table1[table[%d]] = %d\n", i, table1[table[i]]);
                return false;
            } else {
                table1[table[i]]++;
            }
        }
        
    }
    return true;

}
```

解法二：
> 同解法一
```c
/* */
bool uniqueOccurrences(int* arr, int arrSize){
   int hashTable[2001]={0};//初始化一张表，下标对应元素值，存储对应元素出现的次数
    for(int i=0;i<arrSize;i++) {
        hashTable[arr[i]+1000]++;
    }
    bool visited[1001]={false};
    for(int i=0;i<2001;i++) {
        if(hashTable[i]) { //如果i在数组中
            if(visited[hashTable[i]]) { //如果之前出现过与i相同的重复次数
                return false;
            } else {
                visited[hashTable[i]]=true;//说明与i相同的重复次数还未出现，设置为已访问过
            }
        }
    }
    return true;

} 

```
</details>








