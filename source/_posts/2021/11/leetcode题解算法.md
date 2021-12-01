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

## 1.单调栈
### 1.1 代表题目: 84.[柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/description/)

<details>
  <summary>柱状图中最大的矩形 c语言</summary>

```c
int largestRectangleArea(int* heights, int heightsSize) {
    // 栈顶标记,单调递减栈
    int top = -1;
    int area = 0;
    int maxArea = 0;
    int *stack = (int *)malloc(sizeof(int) * (heightsSize + 2));
    int *buf = (int *)malloc(sizeof(int) * (heightsSize + 2));

    // 增加前哨兵
    buf[0] = 0;
    // 在最后增加哨兵
    buf[heightsSize + 1] = 0;
    for (int i = 1; i <= heightsSize; i++) {
        buf[i] = heights[i - 1];
    }

    stack[++top] = 0;
    for (int i = 1; i < heightsSize + 2; i++) {
        while (top > 0 && buf[i] < buf[stack[top]]) {
            // 注意 i - 
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

</details>

<br>

<!--more-->
### 1.2 单调栈描述

&ensp;单调栈里面的元素大小按照他们所在栈内的位置,满足一定的单调性.

> 单调递增栈：单调递增栈就是从栈底到栈顶数据是从小到大; 可找到左起第一个比当前数字小的元素.
> 单调递减栈：单调递减栈就是从栈底到栈顶数据是从大到小; 可找到左起第一个比当前数字大的元素.

&emsp;单调递增栈，元素进栈过程，若当前进栈的元素a，如果a>栈顶元素，则直接将a进栈，如果a<=栈顶元素，则不断将栈顶元素出栈，直到满足a>栈顶元素。单调递减栈则为a<栈顶元素时进栈。

```c
stack<int> st;
//此处一般需要给数组最后添加结束标志符，具体下面例题会有详细讲解
for (遍历这个数组)
{
	if (栈空 || 栈顶元素大于等于当前比较元素)
	{
		入栈;
	}
	else
	{
		while (栈不为空 && 栈顶元素小于当前元素)
		{
			栈顶元素出栈;
			更新结果;
		}
		当前数据入栈;
	}
}
```

&ensp;题目分析:给定一个数组,返回一个大小相同的数组,返回的数组的第i个位置的值应当是,对于原数组中的第i个元素,至少往右走多少步,才能遇到一个比自己大的元素(如果没有比自己大的元素,或为最后一个元素,则返回对应位置上为-1).
&emsp;例如:
&ensp;&emsp;input: 5, 3, 1, 2, 4
&ensp;&emsp;return: -1, 3, 1, 1, -1
&emsp;暴力解法时间复杂度O(n^2)

&ensp;单调栈通常应用在一维数组上,和前后元素大小之间关系有关的问题.单调栈时间复杂度为`O(n)`.
### 1.3 leetcode题目
85 Maximal Reactangle
leetcode 496、503、739、239
42.接雨水
https://blog.csdn.net/chongbin007/article/details/112741867?utm_term=%E5%8D%95%E8%B0%83%E9%98%9F%E5%88%97leetcode&utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~sobaiduweb~default-0-112741867&spm=3001.4430




## 2.并查集

### 2.1 代表题目:[547.省份数量](https://leetcode-cn.com/problems/number-of-provinces/)

&ensp;有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

&ensp;省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

&ensp;给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

返回矩阵中 省份 的数量。


### 2.2 并查集介绍

&ensp;并查集主要用于解决一些元素分组的问题，管理一系列不相交的集合，并支持两种操作：
**合并（union）：**把两个不相交的集合合并为一个集合。
**查询（find）：**查询两个元素是否在同一个集合中。
&ensp;并查集的重要思想在于，用集合中的一个元素代表集合。

&ensp;**路径压缩**
合并的比较方法
应当将简单的树向复杂的树上合并，从而使合并后到根节点距离变长的节点个数比较少。

并查集的时间复杂度
查询次数+合并次数 N或以上则平均下来单次查询或合并的平均时间复杂度O(1)


https://blog.csdn.net/qq_41593390/article/details/81146850

https://blog.csdn.net/ziachen/article/details/106315471



题目背景
若某个家族人员过于庞大，要判断两个是否是亲戚，确实还很不容易，现在给出某个亲戚关系图，求任意给出的两个人是否具有亲戚关系。
题目描述
规定：x和y是亲戚，y和z是亲戚，那么x和z也是亲戚。如果x,y是亲戚，那么x的亲戚都是y的亲戚，y的亲戚也都是x的亲戚。
输入格式
第一行：三个整数n,m,p，（n<=5000,m<=5000,p<=5000），分别表示有n个人，m个亲戚关系，询问p对亲戚关系。
以下m行：每行两个数Mi，Mj，1<=Mi，Mj<=N，表示Mi和Mj具有亲戚关系。
接下来p行：每行两个数Pi，Pj，询问Pi和Pj是否具有亲戚关系。
输出格式
P行，每行一个’Yes’或’No’。表示第i个询问的答案为“具有”或“不具有”亲戚关系。

```c
#include <cstdio>
#define MAXN 5005
int fa[MAXN], rank[MAXN];
inline void init(int n)
{
    for (int i = 1; i <= n; ++i)
    {
        fa[i] = i;
        rank[i] = 1;
    }
}
int find(int x)
{
    return x == fa[x] ? x : (fa[x] = find(fa[x]));
}
inline void merge(int i, int j)
{
    int x = find(i), y = find(j);
    if (rank[x] <= rank[y])
        fa[x] = y;
    else
        fa[y] = x;
    if (rank[x] == rank[y] && x != y)
        rank[y]++;
}
int main()
{
    int n, m, p, x, y;
    scanf("%d%d%d", &n, &m, &p);
    init(n);
    for (int i = 0; i < m; ++i)
    {
        scanf("%d%d", &x, &y);
        merge(x, y);
    }
    for (int i = 0; i < p; ++i)
    {
        scanf("%d%d", &x, &y);
        printf("%s\n", find(x) == find(y) ? "Yes" : "No");
    }
    return 0;
}
```

## 滑动窗口&双指针

### .单调队列
&emsp;单调队列是指：队列中的元素之间的关系具有单调性，而且，队首和队尾都可以进行出队操作，只有队尾开源进行入队操作。
&emsp;单调队列与单调栈及其相似，把单调栈先进后出的性质改为先进先出既可。
元素进队列的过程对于单调递增队列。
对于一个元素a，如果a>队尾元素，那么直接将a扔进队列，如果a<=队尾元素，则将队尾元素出队列，直到满足 a>队尾元素即可。

>单调递增队列(从队首到队尾满足递增)
>单调递减队列(从队首到队尾满足递减)
- 单调队列作用：队列里的元素满足出队的单调性。
- 单调队列操作：去头和删尾

- leetcode 题目
[剑指 Offer 59 - II. 队列的最大值](https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/)
```c
typedef struct {
    int arr[20000];
    int begin;
    int end;
} MaxQueue;

MaxQueue* maxQueueCreate()
{
    MaxQueue *tmp = (MaxQueue*)malloc(sizeof(MaxQueue));
    tmp->begin = 0;
    tmp->end = 0;
    return tmp;
}

int maxQueueMax_value(MaxQueue* obj)
{
    int ans = -1;
    for (int i = obj->begin; i < obj->end; i++) {
        ans = fmax(ans, obj->arr[i]);
    }
    return ans;
}

void maxQueuPus_back(MaxQueue* obj, int value)
{
    obj->arr[obj->end++] = value;
}
int maxQueuePop_front(MaxQueue* obj) 
{
    if(obj->begin==obj->end)
    {
        return -1;
    }
    else
    {
        return obj->arr[obj->begin++];
    }
}

void maxQueueFree(MaxQueue* obj) 
{
    obj->end=0;
    obj->begin=0;
}

```

239.滑动窗口最大值

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

https://www.cnblogs.com/zzcxxoo/p/13216030.html

## 前缀与哈希

## 拓扑排序

## 字符串

## BFS

## DFS

## 动态规划

## 贪心算法

## 字典树



