---
title: leetcode刷题笔记
date: 2022-02-01 00:47:53
updated: 2022-02-01  00:53:53
categories: 
    - tool
tags: 
    - 实用教程
    - Another Tag
---

## 双指针

### 3 [无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

> 思路：前后两个指针，从零开始向字符串尾移动，和一个标记字符在两个指针中间的表，判断前指针字符是否在表中，不在，记录表中，右指针加一；在，左指针对应字符提出表，左指针加一；左右指针差的最大值即为最长长度。

<!--more-->

```c
int lengthOfLongestSubstring(char * s){
    int len = strlen(s);
    int left = 0;
    int right = 0;
    char table[256] = {0};
    int maxLen = 0;
    while (right < len) {
        if (table[s[right]] == 0) {
            table[s[right]] = 1;
            right++;
        //} else if (table[s[right]] == 1) {
        } else {
            table[s[left]] = 0;
            left++;
        }
        maxLen = fmax(maxLen, right - left);
    }
    return maxLen;
}
```


## 并查集

### 128.[最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

```c
typedef struct {
    int key;
    int cnt;
    UT_hash_handle hh;
} Hash;

Hash *g_usrs = NULL;

void AddUser(int key)
{
    Hash *cur_usr = NULL;
    HASH_FIND_INT(g_usrs, &key, cur_usr);
    if (cur_usr == NULL) {
        cur_usr = (Hash *)malloc(sizeof(Hash));
        cur_usr->key = key;
        cur_usr->cnt = 1;
        HASH_ADD_INT(g_usrs, key, cur_usr);
    } else {
        cur_usr->cnt++;
    }
}

bool FindUser(int key)
{
    Hash *cur_usr = NULL;
    HASH_FIND_INT(g_usrs, &key, cur_usr);
    if (cur_usr == NULL) {
        return false;
    } else {
        return true;
    }
}

int Cmp(const void *a, const void *b)
{
    return *(int *)a - *(int *)b;
}

int longestConsecutive(int* nums, int numsSize)
{
    int res = 0, local = 0;
    g_usrs = NULL;
    for (int i = 0; i < numsSize; i++) {
        AddUser(nums[i]);
    }
    HASH_SORT(g_usrs, Cmp);
    Hash *cur_usr = NULL;
    Hash *next_usr = NULL;
    HASH_ITER(hh, g_usrs, cur_usr, next_usr) {
        if (next_usr != NULL) {
            if (next_usr->key - cur_usr->key == 1) {
                local++;
            } else {
                local = 0;
            }
        }
        res = fmax(res, local + 1);
    }
    return res;
}
```

















