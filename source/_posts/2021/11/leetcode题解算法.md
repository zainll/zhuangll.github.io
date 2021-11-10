---
title: leetcode题解算法分析
date: 2021-10-27 00:47:53
updated: 2021-10-27 00:53:53
categories: 
    - tool
tags: 
    - 实用教程
    - Another Tag
---

## 单调栈

<!--more-->
&emsp;单调递增栈，元素进栈过程，若当前进栈的元素a，如果a>栈顶元素，则直接将a进栈，如果a<=栈顶元素，则不断将栈顶元素出栈，直到满足a>栈顶元素。单调递减栈则为a<栈顶元素时进栈。
> 单调递增栈：单调递增栈就是从栈底到栈顶数据是从大到小
> 单调递减栈：单调递减栈就是从栈底到栈顶数据是从小到大

- leetcode题目
84.[柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/description/
)
```c
int largestRectangleArea(int* heights, int heightsSize) {
    // 栈顶标记
    int top = -1;
    int area = 0;
    int maxArea = 0;
    int *stack = (int *)malloc(sizeof(int) * (heightsSize + 2));
    int *buf = (int *)malloc(sizeof(int) * (heightsSize + 2));

    // 增加前哨兵
    buf[0] = 0;
    for (int i = 1; i <= heightsSize; i++) {
        buf[i] = heights[i - 1];
    }

    // 在最后增加哨兵
    buf[heightsSize + 1] = 0;

    stack[++top] = 0;
    for (int i = 1; i < heightsSize + 2; i++) {
        while (top > 0 && buf[i] < buf[stack[top]]) {
            area = (i - stack[top - 1] - 1) * buf[stack[top]];
            maxArea = maxArea > area ? maxArea : area;
            top--;
        }
        // 索引入栈，其他可能是元素入栈
        stack[++top] = i;
    }

    return maxArea;
}
```
leetcode 496、503、739、239

## 单调队列
&emsp;单调队列与单调栈及其相似，把单调栈先进后出的性质改为先进先出既可。
元素进队列的过程对于单调递增队列。
对于一个元素a，如果a>队尾元素，那么直接将a扔进队列，如果a<=队尾元素，则将队尾元素出队列，直到满足 a>队尾元素即可。

>单调递增队列(从队首到队尾满足递增)
>单调递减队列(从队首到队尾满足递减)
- 单调队列作用：队列里的元素满足出队的单调性。

```c
#include <bits/stdc++.h>
#define ll long long
using namespace std;
const int Size=1000005;
int a[Size],qmax[Size],qmin[Size],savemax[Size],savemin[Size];
int main()
{
    int n,k,cnt=1;
    scanf("%d %d",&n,&k);
    for(int i=1;i<=n;i++)
    {scanf("%d",&a[i]);}
    int beg=1,top=0;//qmax队列的队首指针和队尾指针
    int st=1,ed=0;//qmin队列的队首指针和队尾指针
    for(int i=1;i<=n;i++)
    {
        while(beg<=top&&a[i]>=a[qmax[top]])
        {top--;}
        qmax[++top]=i;
        while(st<=ed&&a[i]<=a[qmin[ed]])
        {ed--;}
        qmin[++ed]=i;
        if(i>=k)
        {
            while(qmax[beg]<=i-k)beg++;
            while(qmin[st]<=i-k)st++;
            savemax[cnt]=a[qmax[beg]];
            savemin[cnt]=a[qmin[st]];
            cnt++;
        }
    }
    for(int i=1;i< cnt;i++) {
        printf("%d ",savemin[i]);
    }
    printf("\n");
    for(int i=1;i< cnt;i++) {
        printf("%d ",savemax[i]);
    }
    printf("\n");
    return 0;
}
```
## 并查集

## 滑动窗口

## 前缀与哈希

## 拓扑排序

## 字符串

## BFS

## DFS

## 动态规划

## 贪心算法

## 字典树



