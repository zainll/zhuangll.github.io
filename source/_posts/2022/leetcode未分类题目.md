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

1207, 876, 701, 674, 367， 231  206 201  189  160



<!--more-->

## 141.[环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

> 思路：快慢双指针

```c
bool hasCycle(struct ListNode *head) {
    struct ListNode *slow = head;
    struct ListNode *fast = head;
    while (slow && fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}
```

## 142.[环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

> 思路：快慢双指针

```c
struct ListNode *detectCycle(struct ListNode *head) {
    struct ListNode* slow = (struct ListNode*)malloc(sizeof(struct ListNode));
    struct ListNode* fast = (struct ListNode*)malloc(sizeof(struct ListNode));
    slow = head;
    fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            struct ListNode* entry = head;
            while (slow != entry) {
                slow = slow->next;
                entry = entry->next;
            }
            return entry;
        }
    }
    return NULL;
}
```

## 153.[寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)

> 思路：二分查找

```c
int findMin(int* nums, int numsSize){
    int low = 0;
    int high = numsSize - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] < nums[high]) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return nums[low];
}
```

```c
int findMin(int* nums, int numsSize){
    int i;
    for (i = 0; i < numsSize - 1; i++) {
        if (nums[i] > nums[(i+1)]) {
            return nums[i+1];
        }
    }
    return nums[0];

}
```

## 160.[相交链表](https://leetcode-cn.com/problemset/all/?page=1&search=160)

> 思路：
一、
二、先统计两个链表结点个数，然后长链表先走个数差位

```c
struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    struct ListNode *cur1 = headA;
    struct ListNode *cur2 = headB;
    if (cur1 == NULL || cur2 == NULL)
        return NULL;
    while (cur1 && cur2 && cur1 != cur2) {
        cur1 = cur1->next;
        cur2 = cur2->next;
        if (cur1 == cur2) {
            return cur1;
        }
        if (!cur1) {
            cur1 = headB;
        }
        if (!cur2) {
            cur2 = headA;
        }
    }
    return cur1;
}
```


## 169.[多数元素](https://leetcode-cn.com/problems/majority-element/)

> 思路：选定一个主元素，计数器

```c
int majorityElement(int* nums, int numsSize){
    int count = 1;
    int majorNum = nums[0];
    for (int i = 1; i < numsSize; i++) {
        if (count == 0) {
            majorNum = nums[i];
            count++;
        } else if (majorNum == nums[i]) {
            count++;
        } else {
            count--;
        }
    }
    return majorNum;
}
```


## 173.[二叉搜索树迭代器](https://leetcode-cn.com/problems/binary-search-tree-iterator/)

> 思路：

```c
typedef struct {
    int* res;
    int size;
    int idx;
} BSTIterator;

int getTreeSize(struct TreeNode* root) {
    if (root == NULL) {
        return 0;
    }
    return 1 + getTreeSize(root->left) + getTreeSize(root->right);
}

void inorder(int* ret, int* retSize, struct TreeNode* root) {
    if (root == NULL) {
        return;
    }
    inorder(ret, retSize, root->left);
    ret[(*retSize)++] = root->val;
    inorder(ret, retSize, root->right);
}

int* inorderTraversal(int* retSize, struct TreeNode* root) {
    *retSize = 0;
    int* ret = malloc(sizeof(int) * getTreeSize(root));
    inorder(ret, retSize, root);
    return ret;
}

BSTIterator* bSTIteratorCreate(struct TreeNode* root) {
    BSTIterator* ret = malloc(sizeof(BSTIterator));
    ret->res = inorderTraversal(&(ret->size), root);
    ret->idx = 0;
    return ret;
}

int bSTIteratorNext(BSTIterator* obj) {
    return obj->res[(obj->idx)++];
}

bool bSTIteratorHasNext(BSTIterator* obj) {
    return (obj->idx < obj->size);
}

void bSTIteratorFree(BSTIterator* obj) {
    free(obj->res);
    free(obj);
}
```

## 189.[轮转数组](https://leetcode-cn.com/problems/rotate-array/)

> 思路：
一、每次移动一个数
二、先整体翻转，在翻转前k个，最后翻转 numsSize - k个


```c
void moveOne(int* nums, int numsSize)
{
    int tmp = nums[numsSize - 1];
    for (int i = numsSize - 1; i > 0; i--) {
        nums[i] = nums[i-1]; 
    }
    nums[0] = tmp;
}

void rotate(int* nums, int numsSize, int k)
{
    for (int i = 0; i < k; i++) {
        moveOne(nums, numsSize);
    }
}
```

```c
/* */ 
void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}
void reverse(int* nums, int start, int end) {
    while (start < end) {
        swap(&nums[start], &nums[end]);
        start += 1;
        end -= 1;
    }
}
void rotate(int* nums, int numsSize, int k) {
    k %= numsSize;
    for (int i = 0; i < numsSize; i++) {
        printf("nums[%d] = %d\t", i, nums[i]);
    }
    printf("\n");
    reverse(nums, 0, numsSize - 1);
    for (int i = 0; i < numsSize; i++) {
        printf("nums[%d] = %d\t", i, nums[i]);
    }
    printf("\n");
    reverse(nums, 0, k - 1);
    for (int i = 0; i < numsSize; i++) {
        printf("nums[%d] = %d\t", i, nums[i]);
    }
    printf("\n");
    reverse(nums, k, numsSize - 1);
    for (int i = 0; i < numsSize; i++) {
        printf("nums[%d] = %d\t", i, nums[i]);
    }
    printf("\n");
}



/*
void rotate(int* nums, int numsSize, int k){
     for (int i = 0; i < k; i++) {
        int lastElement = nums[numsSize - 1];
        for (int j = numsSize - 1; j > 0; j--) {
            nums[j] = nums[j - 1];
        }
        nums[0] = lastElement;
    } 
}*/

/*  
void rotate(int* nums, int numsSize, int k){
    if (k == numsSize / 2 && numsSize % 2 != 1) {
        for (int i = 0; i < k; i++) {
            int tmp = nums[i];
            nums[i] = nums[k+i];
            nums[k+i] = tmp;
        }
        return;
    }
  
    int i = 0;
    int tmp = nums[0];
    int p = 0;
    int count = 0;
    do {
        p = (i + k) % numsSize;
        printf("p = %d\n",p);
        int t = nums[p];
        nums[p] = tmp;
        tmp = t;
        i = p;
     } while (i != 0);
} */ 
```

## 190.[颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/submissions/)

> 思路：32位，

```c
uint32_t reverseBits(uint32_t n) {
    uint32_t m = 0;
    int cnt = 32;
    while (cnt) {
        m <<= 1;
        m += (n & 0x1);
        n >>= 1;
        cnt--;
    }
    return m;
}
```

## 191.[位1的个数](https://leetcode-cn.com/problems/number-of-1-bits/submissions/)

> 思路：n & 0x1

```c
int hammingWeight(uint32_t n) {
    int cnt = 0;
    while (n) {
        if (n & 0x1) {
            cnt++;
        }
        n >>= 1;
    }
    return cnt;
    
}
```

## 201.[数字范围按位与](https://leetcode-cn.com/problems/bitwise-and-of-numbers-range/)

> 思路：n & (n - 1) 去除n最高位的1

```c
int rangeBitwiseAnd(int left, int right){
    while (left < right) {
        right &= right - 1;
    }
    return right;
}
```

## 203.[移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

> 思路：递归

```c
struct ListNode *removeElements(struct ListNode *head, int val)
{
    if (head == NULL) {
         return NULL;
    }

    if (head->val == val) {
        return removeElements(head->next, val);
    } else {
        head->next = removeElements(head->next, val);
    }
    return head;
}

```

## 206.[反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

> 思路：

```c
struct ListNode* reverseList(struct ListNode* head){
    struct ListNode* res = NULL;
    while (head) {
        struct ListNode* pre_node = head;
        head = head->next;
        pre_node->next = res;
        res = pre_node;
    }
    return res;
}
```

## 215.[数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

> 思路：排序，第k个最大

```c
int Cmp(const void* a, const void* b)
{
    return *(int *)b - *(int *)a;
}

int findKthLargest(int* nums, int numsSize, int k){
    qsort(nums, numsSize, sizeof(int), Cmp);
    return nums[k-1];
}
```

## 217.[存在重复元素](https://leetcode-cn.com/problems/contains-duplicate/)

> 思路：
一、排序，比较前一个数和当前数是否相等
二、uthash

```c
int Cmp(const void* a, const void* b)
{
    return *(int *)a - *(int *)b;
}

bool containsDuplicate(int* nums, int numsSize){
    if (numsSize <= 1) {
        return true;
    }
    qsort(nums, numsSize, sizeof(int), Cmp);
    for (int i = 1; i < numsSize; i++) {
        if (nums[i-1] == nums[i]) {
            return true;
        }
    }
    return false;
}
```

```c
struct my_struct {
    int id;
    UT_hash_handle hh;
};

struct my_struct *users = NULL;

bool containsDuplicate(int* nums, int numsSize){
   struct my_struct *s;
   HASH_FIND_INT(users, nums[i], s);
   if (s == NULL) {
       s = (struct my_struct*)malloc(sizeof(struct my_struct));
       s->id = nums[i];
       HASH_ADD_INT(users, id, s);
   } else {
       return true;
   }
   return false;
}
```

## 226.[翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

> 思路：判空，交换左右子树，递归调用

```c
struct TreeNode* invertTree(struct TreeNode* root){
    
    if (root == NULL) {
        return NULL;
    }

    struct TreeNode* tmp = root->left;
    root->left = root->right;
    root->right = tmp;

    invertTree(root->left);
    invertTree(root->right);
    return root;
}
```

```c
struct TreeNode* invertTree(struct TreeNode* root){
    if (root == NULL) {
        return NULL;
    }

    struct TreeNode *left = (struct TreeNode *)malloc(sizeof(struct TreeNode));
    struct TreeNode *right = (struct TreeNode *)malloc(sizeof(struct TreeNode));
    left = invertTree(root->left);
    right = invertTree(root->right);
    root->left = right;
    root->right = left;
    return root;
}
```

## 231.[2的幂](https://leetcode-cn.com/problems/power-of-two/)

> 思路：

```c
bool isPowerOfTwo(int n)
{
    if (!n) {
        return false;
    }
        
    while (n % 2 == 0) {
        n /= 2;
    }
    return n == 1;
}
```

```c
bool isPowerOfTwo(int n){

    if (n == 0) {
        return false;
    }

    if (n == 1) {
        return true;
    }
    
    bool res = false;
    if (n % 2 != 0) {
        return false;
    }else {
       res = isPowerOfTwo(n/2);
    }
    return res;
}
```

```c
bool isPowerOfTwo(int n){
    //用位运算来判断有几个1，要是只有一个1那就是2的幂。
    if (n >= 2147483647 || n <= -2147483648) {
        return false;
    }
    int nu m =0;
    while (n>0 && n!=0) {
        n &= (n-1);
        num++;
    }
    if (num!=1) {
        return false;
    }
    return true;

}

```

## 234.[回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/submissions/)

> 思路；
一、通过一个数组记录链表中的元素值，在判断数组是否是回文。
二、翻转链表

```c
#define MAXSIZE 100000

bool isPalindrome(struct ListNode* head){
    int size = 0;
    int nums[MAXSIZE] = {0};
    struct ListNode* p = head;
    // 判断条件
    while (p) {
        nums[size++] = p->val;
        p = p->next;
    }
    printf("size = %d\n", size);
    int left = 0;
    int right = size - 1;
    while (left <= right) {
        if (nums[left] != nums[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
```

```c
struct ListNode *reverse(struct ListNode *head)
{
    struct ListNode *res = NULL;
    while (head) {
        struct ListNode *pre_node = head;
        head = head->next;
        pre_node->next = res;
        res = pre_node;
    }
    return res;
}
bool isPalindrome(struct ListNode *head)
{
    struct ListNode *slow = head;
    struct ListNode *fast = head;
    struct ListNode *last;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    if (fast != NULL) {
        slow = slow->next;
    }
    last = reverse(slow);
    while (last) {
        if (head->val != last->val) {
            return 0;
        }
        head = head->next;
        last = last->next;
    }
    return 1;
}
```

## 242.[有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/submissions/)

> 思路：先比较长度，不相等 false，通过表格记录第一个字符串中字符，遍历第二个字符串时表格记录--，最后，判断表格中所有值是否为零

```c
#define NUMSIZE 256

bool isAnagram(char * s, char * t){
    int sLen = strlen(s);
    int tLen = strlen(t);
    if (sLen != tLen) {
        return false;
    }
    int table[256] = {0};

    for (int i = 0; i < sLen; i++) {
        table[s[i]]++;
    }
    for (int i = 0; i < tLen; i++) {
        table[t[i]]--;
    }

    for (int i = 0; i < NUMSIZE; i++) {
        if (table[i] != 0) {
            return false;
        }
    }
    return true;
}
```

## 268.[丢失的数字](https://leetcode-cn.com/problems/missing-number/)

> 思路：边求和，边减去数组中的数字

```c
int missingNumber(int* nums, int numsSize){
    int mNum = 0;
    for (int i = 0; i < numsSize; i++) {
        mNum += (i + 1);
        mNum -= nums[i];
    }
    return mNum;
}
```



## 278.[第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

> 思路：二分查找

```c
int firstBadVersion(int n) {
    int left = 1;
    int right = n;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (isBadVersion(mid) && !isBadVersion(mid-1)) {
            return mid;
        } else if (isBadVersion(mid) && isBadVersion(mid-1)) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}
```

```c
int firstBadVersion(int n) {
    int low = 1, high = n;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (isBadVersion(mid)) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return low;
}
```

## 283.[移动零](https://leetcode-cn.com/problems/move-zeroes/)

> 思路：不等于零时向数组中添加，等于零时跳过，最后填充0
nums[start++] = nums[i]

```c
void moveZeroes(int* nums, int numsSize){
    int start = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] != 0) {
            nums[start++] = nums[i];
        }
    }

    for (; start < numsSize; start++) {
        nums[start] = 0;
    }    
}
```

## 287.[寻找重复整数](https://leetcode-cn.com/problems/find-the-duplicate-number/)

> 思路：循环遍历，标记，判断是否标记过，return

```c
#define MAXSIZE 100001

int findDuplicate(int* nums, int numsSize){
    int table[MAXSIZE] = {0};
    for (int i = 0; i < numsSize; i++) {
        if (table[nums[i]] != 0) {
            return nums[i];
        } else {
            table[nums[i]]++;
        }
    }
    return -1;
}
```

## 344.[反转字符串](https://leetcode-cn.com/problems/reverse-string/)

> 思路：双指针，交换

```c
void reverseString(char* s, int sSize){
    int left =0;
    int right = sSize - 1;
    while (left < right) {
        char c = s[left];
        s[left] = s[right];
        s[right] = c;
        left++;
        right--;
    }
}
```

## 367.[有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square/)

> 思路：for 循环，条件 i * i <= num 

```c
bool isPerfectSquare(int num)
{
    for (long i = 0; i * i <= num; i++) {
        if (i * i == num) {
            return true;
        }
    }
    return false;
}


```

## 387.[字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

> 思路：两次遍历，第一次遍历见字母标记得到统计表格中，第二次遍历找出统计表格中第一个为1字符，返回对应下标。

```c
#define NUMSIZE 256

int firstUniqChar(char * s){
    int sLen = strlen(s);
    int table[NUMSIZE] = {0};
    for (int i = 0; i < sLen; i++) {
        table[s[i]]++;
    }

    for (int i = 0; i < sLen; i++) {
        if (table[s[i]] == 1) {
            return i;
        }
    }
    return -1;
}
```

## 389.[找不同](https://leetcode-cn.com/problems/find-the-difference/)

> 思路：字符可以转化为数字，为了防止溢出通过 - 'a'，求两个字符串的差值，在加上'a'

```c
char findTheDifference(char * s, char * t){
    int sLen = strlen(s);
    int tLen = strlen(t);
    int nS = 0;
    int nT = 0;
    for (int i = 0; i < sLen; i++) {
        nS += s[i] - 'a';
    }
    for (int i = 0; i < tLen; i++) {
        nT += t[i] - 'a';
    }
    return (char)(nT - nS + 'a');
}
```

## 404.[左叶子之和](https://leetcode-cn.com/problems/sum-of-left-leaves/)

> 思路：递归：判断左子树是否为叶子结点，是则记录sum，返回 sum + 递归调用左子树 + 递归调用右子树

```c
int sumOfLeftLeaves(struct TreeNode* root){
    if (root == NULL) {
        return 0;
    }
    int sum = 0;
    if (root->left) {
        if (root->left->left == NULL && root->left->right == NULL) {
            sum += root->left->val;
        }
    }
    return  sum + sumOfLeftLeaves(root->left) + sumOfLeftLeaves(root->right);
}
```

```c
int isleaf(struct TreeNode* root)
{
    return root->left == NULL && root->right == NULL;
}

int sumOfLeftLeaves(struct TreeNode* root)
{
    if(root == NULL) {
        return 0;
    }
    if (root->left) {
        if(isleaf(root->left)) {
            // 此处直接递归，少一层调用
            return root->left->val + sumOfLeftLeaves(root->right);
        }
    }
    return sumOfLeftLeaves(root->left) + sumOfLeftLeaves(root->right);
}
```

## 442.[数组中重复的数据](https://leetcode-cn.com/problems/find-all-duplicates-in-an-array/)

> 思路：
一、通过表标记数组中出现过的数字，当再次出现时将数字添加到返回数组中。
二、

```c
#define MAXSIZE 100000

int* findDuplicates(int* nums, int numsSize, int* returnSize){
    int table[MAXSIZE] = {0};
    *returnSize = 0;
    int *res = (int *)malloc(sizeof(int) * MAXSIZE);
    for (int i = 0; i < numsSize; i++) {
        if (table[nums[i]] == 1) {
            res[*returnSize] = nums[i];
            (*returnSize)++;
        } else {
            table[nums[i]]++;
        }
    }
    return res;
}
```

```c
int* findDuplicates(int* nums, int numsSize, int* returnSize) {
    int table[100000] = {0};
    int *res = (int *)malloc(sizeof(int) * 100000);
    int j = 0;
    for (int i = 0; i < numsSize; i++) {
        table[nums[i]]++;
        if (table[nums[i]] == 2) {
            res[j++] = nums[i];
        }
    }
    *returnSize = j;
    return res;
}
```


## 461.[汉明距离](https://leetcode-cn.com/problems/hamming-distance/)

> 思路：
一、求 x ^ y 中 1 的个数
二、比较x，y的每一位 和 1与

```c
int hammingDistance(int x, int y)
{
    int n = x ^ y;
    int res = 0;
    while (n) {
        int p = n & 1;
        if (p) {
            res++;
        }
        n >>= 1;
    }
    return res;
}
```

```c
int hammingDistance(int x, int y){
    int count = 0;
    while (x || y) {
        int nX = x & 0x1;
        int nY = y & 0x1;
        if (nX != nY) {
            count++;
        }
        x >>= 1;
        y >>= 1;
    }
    return count;

}
```

## 476.[数字的补数](https://leetcode-cn.com/problems/number-complement/)

> 思路：
一、按位与1求与，再取反(!)，然后移位，
二、先统计位数，在取位数相同全一数，最后与原数字求异或 ^

```c
int findComplement(int num){
    int res = 0;
    int count = 0;
    while (num) {
        int t = !(num & 0x1);
        t <<= count;
        printf("t = %d\n", t);
        res += t;
        count++;
        num>>=1;
    }
    return res;

}
```

```c
int findComplement(int num){
    int totalBits = 0;
    int tmp = num;
    while (tmp) {
        totalBits++;
        tmp >>= 1;
    }
    int flipNumber = 1;
    for (int i = 1; i < totalBits; i++) {
        flipNumber += UINT32_C(1) << i;
    }
    num = num ^ flipNumber;
    return num;
}

```

## 509.[斐波那契数列](https://leetcode-cn.com/problems/fibonacci-number/)

> 思路：一、递归  二、迭代

- 递归
```c
int fib(int n){
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);

}
```

- 迭代
```c
int fib(int n){
    if (n <= 1) {
        return n;
    }
    int* nums = (int *)malloc(sizeof(int) * (n + 1));
    nums[0] = 0;
    nums[1] = 1;
    for (int i = 2; i <= n; i++) {
        nums[i] = nums[i - 1] + nums[i - 2];
    }
    return nums[n];
}
```

## 520.[检测大写字母](https://leetcode-cn.com/problems/detect-capital/submissions/)

> 思路：
一、先判断第二个字母是否为大写，1.word[1] 大写，从从零开始判断是否全为大写 2.word[1]为小写，从word是否全为小写。
二、

```c
bool detectCapitalUse(char * word){

    int len = strlen(word);
    if (len <= 1) {
        return true;
    }

    int i = 1;
    if (isupper(word[i])) {
        i = 0;
        while (word[i] != '\0') {
            if (!isupper(word[i])) {
                return false;
            }
            i++;
        }
    } else {
        while (word[i] != '\0') {
            if (isupper(word[i])) {
                return false;
            }
            i++;
        }
    }
    return true;
}
```

```c
bool detectCapitalUse(char * word){
    int len = strlen(word);
    if (len == 1) {
        return true;
    }
    for (int i = 1; i < len; i++) {
        // word[0] 每次都需要判断，一个复杂度。
        if (isupper(word[0]) && isupper(word[1])) {
            if (!isupper(word[i])) {
                return false;
            }
        } else {
            if (isupper(word[i])) {
                return false;
            }
        }
    }
    return true;
   
}
```


## 561.[拆分数组I](https://leetcode-cn.com/problems/array-partition-i/)

> 思路：排序，取偶数位求和。

```c
int Cmp(const void* a, const void* b)
{
    return *(int *)a - *(int *)b;
}
int arrayPairSum(int* nums, int numsSize){
    qsort(nums, numsSize, sizeof(int), Cmp);
    int minSum = 0;
    for (int i = 0; i < numsSize; i++) {
        if (i % 2 == 0) {
            minSum += nums[i];
        }    
    }
    return minSum;
}
```

## 617.[合并二叉树](https://leetcode-cn.com/problems/merge-two-binary-trees/)

> 思路：递归，判空，

```c
struct TreeNode* newNode(int val)
{
    struct TreeNode* node = malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

struct TreeNode* mergeTrees(struct TreeNode* root1, struct TreeNode* root2){

   /*  if (root1 == NULL && root2 == NULL) {
        return NULL;
    } */
    if (root1 == NULL) {
        return root2;
    }

    if (root2 == NULL) {
        return root1;
    }
    
   /*  struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val += root1 == NULL ? 0 : root1->val;
    root->val += root2 == NULL ? 0 : root2->val;
    root->left = NULL;
    root->right = NULL; */
    int val = (root1 == NULL ? 0 : root1->val) + (root2 == NULL ? 0 : root2->val);
    struct TreeNode* root  = newNode(val);
    root->left = mergeTrees(root1->left, root2->left);
    root->right = mergeTrees(root1->right, root2->right);
    return root;
}
```

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
```


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




## 965.[单值二叉树](https://leetcode-cn.com/problems/univalued-binary-tree/)

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








