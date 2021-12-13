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

<!--more-->

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


### 1.2 单调栈描述

&ensp;单调栈里面的元素大小按照他们所在栈内的位置,满足一定的单调性.

> 单调递增栈：单调递增栈就是从栈底到栈顶数据是从小到大; 可找到左起第一个比当前数字小的元素.
> 单调递减栈：单调递减栈就是从栈底到栈顶数据是从大到小; 可找到左起第一个比当前数字大的元素.

&emsp;单调递增栈，元素进栈过程，若当前进栈的元素a，如果a>栈顶元素，则直接将a进栈，如果a<=栈顶元素，则不断将栈顶元素出栈，直到满足a>栈顶元素。单调递减栈则为a<栈顶元素时进栈。

&ensp;题目分析:给定一个数组,返回一个大小相同的数组,返回的数组的第i个位置的值应当是,对于原数组中的第i个元素,至少往右走多少步,才能遇到一个比自己大的元素(如果没有比自己大的元素,或为最后一个元素,则返回对应位置上为-1).
&emsp;例如:
&ensp;&emsp;input: 5, 3, 1, 2, 4
&ensp;&emsp;return: -1, 3, 1, 1, -1
&emsp;暴力解法时间复杂度O(n^2)
&emsp;暴力解法:
```c
int *nextExceed(int *input, int size)
{
    int *result = (int *)malloc(sizeof(int) * size);
    memset(input,-1,size*sizeof(int));
    for (int i = 0; i < size; i++) {
        int anchar = input[i];
        for (int j = i + 1; j < size; j++) {
            if (input[j] > anchar) {
                result[j] = j - 1;
                break;
            }
        }
    }
    return result;
}
```
&emsp;单调栈:
```c
int *nextExceed(int *input, int size)
{
    int *result = (int *)malloc(sizeof(int) * size);
    int *stack = (int *)malloc(sizeof(int) * size);
    memset(input, -1, size * sizeof(int));
    int top = 0;
    for (int i = 0; i < size; i++) {
        while (top >= 0 && input[i] > input[stack[top]]) {
            result[stack[top]] = i - stack[top];
            top--;
        }
        stack[++top] = i;
    }
    return result;
}
```

&emsp;我们维护一个单调递减栈stack,stack内存的是原数组的每个index,当遇到一个比当前栈顶所对应的树大的时候,则栈顶元素出栈.

&ensp;单调栈通常应用在一维数组上,和前后元素大小之间关系有关的问题.单调栈时间复杂度为`O(n)`.


### 1.3 leetcode题目
[85.最大矩形](https://leetcode-cn.com/problems/maximal-rectangle/)
&ensp;给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
&emsp;思路:对于每一行,构建一个histogram,然后计算.在构建新的histogram的时候,不需要全部遍历,只需对已有的histogram进行略微修改(运用DP的思想)



```c
int maximalRectangle(char** matrix, int matrixSize, int* matrixColSize)
{
    int m = matrixSize;
    if (m == 0) {
        return 0;
    }
    int n = matrixColSize[0];
    int left[m][n];
    memset(left, 0, sizeof(left));
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == '1') {
                left[i][j] = (j == 0 ? 0 : left[i][j - 1]) + 1;
            }
        }
    }

    int ret = 0;
    for (int j = 0; j < n; j++) {  // 对于每一列，使用基于柱状图的方法
        int up[m], down[m];
        memset(up, 0, sizeof(up));
        memset(down, 0, sizeof(down));
        int stk[m], top = 0;
        for (int i = 0; i < m; i++) {
            while (top > 0 && left[stk[top - 1]][j] >= left[i][j]) {
                top--;
            }
            up[i] = top == 0 ? -1 : stk[top - 1];
            stk[top++] = i;
        }
        top = 0;
        for (int i = m - 1; i >= 0; i--) {
            while (top > 0 && left[stk[top - 1]][j] >= left[i][j]) {
                top--;
            }
            down[i] = top == 0 ? m : stk[top - 1];
            stk[top++] = i;
        }

        for (int i = 0; i < m; i++) {
            int height = down[i] - up[i] - 1;
            int area = height * left[i][j];
            ret = fmax(ret, area);
        }
    }
    return ret;
}
```

![20211207235410](https://s2.loli.net/2021/12/07/aU8ZQBWRo9dTXMb.png)


```c
stack<int> st;
//此处一般需要给数组最后添加结束标志符，具体下面例题会有详细讲解,单调减栈
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

<details>
<summary>单调栈</summary>

```c
int largestRectangleArea(int* heights, int heightsSize,int *S,int top){
    // int*S=(int*)malloc(sizeof(int)*heightsSize); // 初始化栈，栈内保存柱子序号
    // int top=-1;
    int start,end,h;
    int r=0;
    S[++top]=0; // 入栈第一根柱子
    for(int i=1;i<=heightsSize-1;i++){ // 遍历所有柱子
        if(heights[i] >= heights[S[top]] ) S[++top]=i; // 若当前柱子大于栈顶或等于栈顶，直接入栈
        else{ // 若当前柱子小于栈顶，则依次出栈较高的柱子并计算面积
            end = S[top]; // 记录最右边最高的柱子位置，之后每次矩形的底边是从出栈位置到最右边最高柱子的位置
            while(top != -1 && heights[i] < heights[S[top]] ){
                h = heights[S[top--]]; // 保存当前矩形的高
                while( top != -1 && heights[S[top]] == h) top--; // 若有相同高的柱子，直接出栈
                if ( top != -1) start=S[top]; // 避免栈为空
                else start=-1;

                if(r < (end-start)*h) r=(end-start)*h; // 矩形面积是最高柱子位置减去当前栈顶柱子的位置乘高
            }
            S[++top]=i;
        }
    }
    // 此时栈内剩余递增序列，出栈依次计算面积。计算流程同上
    end = S[top];
    while(top != -1){
        h = heights[S[top--]];
        while( top != -1 && heights[S[top]] == h) top--;
        if (top != -1) start=S[top];
        else start=-1;

        if(r < (end-start)*h) r=(end-start)*h;
    }
    return r;
}

int maximalRectangle(char** matrix, int matrixSize, int* matrixColSize){
    int m=matrixSize;
    int n=*matrixColSize;
    if (m==0) return 0;
    int *heights = (int*)malloc(sizeof(int)*n);
    int*S=(int*)malloc(sizeof(int)*n); // 初始化栈，栈内保存柱子序号
    int r=0;

    for(int k=0;k<=n-1;k++) heights[k]=0;
    for(int i=0;i<=m-1;i++){
        for(int j=0;j<=n-1;j++){
            if(matrix[i][j]=='1') heights[j]++;
            else heights[j]=0;
        }
        int top=-1;
        int cur=largestRectangleArea(heights,n,S,top);
        if(cur > r) r=cur;
    }
    return r;
}

```

</details>

<details>
<summary></summary>

```c
typedef struct {
    void **data;
    int top;
    int size;
} Stack;

Stack *StackCreate(int stackSize)
{
    Stack *stack = (Stack *)malloc(sizeof(Stack));
    if (stack == NULL) {
        return NULL;
    }

    stack->data = (void **)malloc(sizeof(void **) * (stackSize + 1));
    memset(stack->data, 0, sizeof(void **) * (stackSize + 1));
    stack->top = -1;
    stack->size = stackSize;
    return stack;
}

void StackFree(Stack *obj)
{
    if (obj->data != NULL) {
        free(obj->data);
        obj->data = NULL;
    }
    free(obj);
    obj = NULL;
    return;
}

bool IsStackEmpty(Stack *obj)
{
    return (obj->top == -1);
}

bool IsStackFull(Stack *obj)
{
    return (obj->top ==  obj->size);
}

void StackPush(Stack *obj, void *data)  // 泛型接口，使用void *
{
    if (IsStackFull(obj) == true) {
        return;
    }
    int top = obj->top;
    obj->data[++top] = data;
    obj->top = top;
    return;
}

void StackPop(Stack *obj)
{
    if (IsStackEmpty(obj) == true) {
        return;
    }
    void *data = obj->data[obj->top];
    free(data);
    data = NULL;
    obj->top--;
    return;
}

void *StackTop(Stack *obj)
{
    if (IsStackEmpty(obj) == true) {
        return NULL;
    }
    return (obj->data[obj->top]);
}

void StackClear(Stack *obj)
{
    if (IsStackEmpty(obj) == true) {
        return;
    }

    for (int i = 0; i <= obj->top; i++) {
        void *data = obj->data[i];
        if (data != NULL) {
            free(data);
            data = NULL;
        }
    }
    obj->top = -1;
    return;
}

#define MAX(a, b) ((a) > (b) ? (a) : (b))
int maximalRectangle(char **matrix, int matrixSize, int *matrixColSize)
{
    int **height = (int **)malloc(sizeof(int *) * matrixSize);
    for (int i = 0; i < matrixSize; i++) {
        height[i] = (int *)malloc(sizeof(int) * (matrixColSize[i] + 1));
        for (int j = 0; j < matrixColSize[i]; j++) {
            if (i == 0) {
                height[i][j] = (matrix[i][j] == '1') ? 1 : 0;
            } else {
                height[i][j] = (matrix[i][j] == '1') ? (height[i - 1][j] + 1) : 0;
            }
        }
        height[i][matrixColSize[i]] = 0;
    }

    Stack *monotoneStack = StackCreate(matrixSize * matrixSize);
    int ans = 0;
    for (int i = 0; i < matrixSize; i++) {
        for (int j = 0; j <= matrixColSize[i]; j++) {
            while ((IsStackEmpty(monotoneStack) != true) && 
                    (height[i][*(int *)monotoneStack->data[monotoneStack->top]] >= height[i][j])) {
                int h = height[i][*(int *)monotoneStack->data[monotoneStack->top]];
                StackPop(monotoneStack);
                int sidx = ((IsStackEmpty(monotoneStack) == true) ? -1 : *(int *)(monotoneStack->data[monotoneStack->top]));
                ans = MAX(ans, h * (j - sidx - 1));
            }
            int *node = (int *)malloc(sizeof(int));
            *node = j;
            StackPush(monotoneStack, node); 
        }
        StackClear(monotoneStack);
    }

    StackFree(monotoneStack);
    return ans;
}
```

</details>


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

```c
int *g_test;

bool init(int mSize)
{
    int i;
    if (mSize < 1) {
        return false;
    }
    g_dest = (int *)malloc(mSize * sizeof(int));
    if (g_dest == NULL) {
        return false;
    }
    
    fot (i = 0; i < mSize; i++) {
        g_dest[i] = i;
    }
    return true;
}

int Find(int index)
{
    if (g_dest[index] == index) {
        return index;
    }
    return g_dest[index] = Find(g_dest[index]);
}

int FindRoot(int i)
{
    while (g_dest[i] != 0) {
        i = g_dest[i];
    }
    return i;
}

void ProcCircle(int **m, int mSize)
{
    int i, j;
    int rootI, rootJ;
    for (i = 0; i < mSize; i++) {
        for (int j = (i + 1); j < mSize; j++) {
            if (m[i][j] != 1) {
                continue;
            }
            rootI = FindRoot(i);
            rootJ = FindRoot(j);
            if (rootI == rootJ) {
                continue;
            }
            g_dest[rootI] = rootJ;
        }
    }
    return;
}

int GetCircleNum(int mSize)
{
    int sum = 0;
    for (int i = 0; i < mSize; i++) {
        if (g_dest[i] == i) {
            sum++;
        }
    }
    return sum;
}

void FreeCircle()
{
    if (g_dest != NULL) {
        free(g_dest);
        g_dest = 0;
    }
}

int findCircleNum(int **m, int mSize, int* mColSize)
{
    bool rslt;
    int sum;
    rslt = Init(mSize);
    if (!rslt)  {
        return 0;
    }

    ProcCicle(m, mSize);
    sum = GetCircleNum(mSize);

    FreeCircle();
    return sum;
}

```


### 2.2 并查集介绍

&ensp;并查集(DSU)主要用于解决一些元素分组的问题，管理一系列不相交的集合，并支持两种操作：
&ensp;并查集即**合并集合**和**查找集合**两种操作的算法.但实际并查集的基本操作有三个:
&emsp;makeSet(size):建立一个新的并查集,其中包含size个单元素集合.
&emsp;unionSet(x, y)**合并**:把元素x和元素y所在的集合合并,要求x和y所在的集合不相交,如果相交则不合并.
&emsp;find(x)**查询**:找到元素x所在的集合的代表,该操作也可以用于判断两个元素是否位于同一个集合,只要将它们各自的代表比较一下就可以了. find(x)有两种实现方法,一种是递归,一种是非递归。
&ensp;并查集的重要思想在于，用集合中的一个元素代表集合。
&ensp;并查集有两种优化策略:
&emsp;1.按秩序合并

&emsp;2.**路径压缩**
合并的比较方法
应当将简单的树向复杂的树上合并，从而使合并后到根节点距离变长的节点个数比较少。

并查集的时间复杂度
查询次数+合并次数 N或以上则平均下来单次查询或合并的平均时间复杂度O(1)

```c
int pre[1010]; // 存放第i个元素的父节点
// 查询根节点
int unionsearch(int root)
{
    int son, tmp;
    son = root;
    // 寻找根节点
    while (root != pre[root]) {
        root = pre[root]; // 路径压缩
    }
    while (son != root) {
        tmp = pre[son];
        pre[son] = root;
        son = tmp;
    }
    return root;
}

void join(int root1, int root2) // 判断释放连通,不连通就合并
{
    int x, y;
    x = unionsearch(root1);
    y = unionsearch(root2);
    // 如果不连通,就把它们所在的连通分支合并
    if (x != y) {
        pre[x] = y;
    }
}
```

https://blog.csdn.net/qq_41593390/article/details/81146850

https://blog.csdn.net/ziachen/article/details/106315471


朋友圈

```c
int findCircleNum(int **matrix, int size)
{
    int *parent = (int *)malloc(sizeof(int)*size);
    memset(parent, -1, sizeof(int)*size);
    int rows = size;
    int clos = matrix[0];
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (matrix[i][j] == 1 && i != j) {
                union(parent, i, j);
            }
        }
    }
    return countCircleNum(parent, size);
}

void union(int *parent, int i, int j)
{
    int xset = find(parent, i);
    int yset = find(parent, j);
    if (xset != yset) {
        // 合并i和j的两个集合
        parent[xset] = yset;
    }
}

/*
 查找集合 i 的源头
 如果集合 i 的父亲是 -1, 说明自己就是源头,返回自己的标号
 否则查找集合 i 的父亲的源头
*/

int find(int *parent, int i)
{
    if (parent[i] == -1) {
        // i 的父亲为 -1 时,i就是掌门人
        return i;
    }
    // 使用路径压缩,让这条路径上所有的人的上级直接变为掌门人
    return find(parent, parent[i]);
}

int countCircleNum(int *parent, int size)
{
    int count = 0;
    for (int i = 0; i < size; i++) {
        if (parent[i] == -1) {
            count++;
        }
    }
    return count;
}

// find 非递归实现
int find(int x)
{
    while (x != parent[x]) {
        parent[x] = parent[parent[x]];
        x = parent[x];
    }
    return x;
}

```

&emsp;DFS实现
```c
int findCircleNum(int **matrix, int matrixSize)
{
    int rows = matrixSize;
    int cols = matrix[0];
    int *visited = (int *)malloc(sizeof(int) * matrixSize);
    int count = 0;
    for (int i = 0; i < rows; i++) {
        if (visited[i] == 0) {
            dfs(matrix, matrixSize, visite, i);
            count++;
        }
    }
    return count;
}

void dfs(int **matrix,  int matrixSize, int *visited, int i)
{
    for (int j = 0; j < matrixSize; j++) {
        if (matrix[i][j] == 1 && visited[j] == 0) {
            visited[j] = 1;
            dfs(matrxi, matrixSize, visited, j);
        }
    }
}
```

&emsp;BFS实现
```c

```


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



### 2.3 最小生成树

&ensp;关于图的几个概念定义:
连通图：在无向图中，若任意两个顶点vivi与vjvj都有路径相通，则称该无向图为连通图。
强连通图：在有向图中，若任意两个顶点vivi与vjvj都有路径相通，则称该有向图为强连通图。
连通网：在连通图中，若图的边具有一定的意义，每一条边都对应着一个数，称为权；权代表着连接连个顶点的代价，称这种连通图叫做连通网。
生成树：一个连通图的生成树是指一个连通子图，它含有图中全部n个顶点，但只有足以构成一棵树的n-1条边。一颗有n个顶点的生成树有且仅有n-1条边，如果生成树中再添加一条边，则必定成环。
最小生成树：在连通网的所有生成树中，所有边的代价和最小的生成树，称为最小生成树。


- 参考链接:https://blog.csdn.net/luoshixian099/article/details/51908175



## 3.滑动窗口&双指针

### 3.1 经典题目 1208.进可能使字符串相等

&ensp;滑动窗口法，也叫尺取法（可能也不一定相等，大概就是这样 =。=），可以用来解决一些查找满足一定条件的连续区间的性质（长度等）的问题。由于区间连续，因此当区间发生变化时，可以通过旧有的计算结果对搜索空间进行剪枝，这样便减少了重复计算，降低了时间复杂度。往往类似于“请找到满足xx的最x的区间（子串、子数组）的xx”这类问题都可以使用该方法进行解决。

&ensp; TCP协议使用滑动窗口实现.
&ensp;滑动窗口算法在一个特定大小的字符串或数组上进行操作，而不在整个字符串和数组上操作，这样就降低了问题的复杂度，从而也达到降低了循环的嵌套深度。其实这里就可以看出来滑动窗口主要应用在数组和字符串上。

滑动：说明这个窗口是移动的，也就是移动是按照一定方向来的。

窗口：窗口大小并不是固定的，可以不断扩容直到满足一定的条件；也可以不断缩小，直到找到一个满足条件的最小窗口；当然也可以是固定大小。

滑动窗口是双指针的一种应用，形象点说就是维护一个窗口，在窗口滑动的过程中进行窗口内数据的更新，并判断是否符合答案。、
初始时两个指针均指向开头，然后右指针依次向右滑动，在滑动的过程中需要收缩的时候进行左指针的移动，当右指针移出的时候结束循环即可。

Leetcode 209. 长度最小的子数组
给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。如果不存在符合条件的连续子数组，返回 0。

```c
void fun(string s, string t){
     map<char,int> need,window;
     //在need中记录相应的信息
      .....
      int left=0,right=0;
      int valid;//该变量用来判断是否得到相应的答案了
      
      while(right<s.size()){
         char c=s[right];//取出将要移入窗口内的数据
         right++；
         //下面进行窗口更新后一些数据的更新
         .....

         while(判断窗口是否需要收缩){
              //是否需要进行相应的答案更新
              ......

              char d=s[left];//将要移出窗口的数据；
              left++;//收缩窗口

              //窗口收缩后相应数据的更新
              .......           
         }   
      }      
}
```

示例: 

输入: s = 7, nums = [2,3,1,2,4,3]
输出: 2
解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。

- 参考链接:
https://zhuanlan.zhihu.com/p/61564531

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

## 4.前缀和(&哈希表优化)

### 4.1 前缀和介绍
&ensp;前缀和(prefix sum)定义:前缀和时一种预处理,能大大降低查询的时间复杂度.结合Hash缓存,能够进一步优化提升算法执行效率.
&emsp;对数组nums进行前缀和初始化需要O(n)时间
&emsp;新建数组prefixSum,数组长度定义为 nums.length+1,确保顶第 nums.length个元素存储前面0到nums.length-1个元素的和.将数组nums的累加一层放入数组prefixSum中.
&emsp;变换公式:
&ensp;&emsp;1)nums[某一项] = 两个相邻前缀和之差: nums[i] = prefixSum[x] - prefixSum[x-1]
&ensp;&emsp;2)从left到right的元素和等于: prefixSum[right+1] - prefixSum[left]

假设我们有一个字符串ABCDE，什么是这个单词的前缀，A、AB、ABC、ABCD、ABCDE就是这个单词的前缀，就是从第一个字母开始，依次往后拼接。E、ED、EDC、EDCB、EDCBA被称为这个单词的后缀。

那么对于一个数组的前缀，例如数组a = [1,2,3,4,5]，我们维护一个由前缀的和组成的数组sum，sum[i]表示数组中a[0]~ a[i] 的和。
sum[0] = a[0]
sum[1] = a[0] + a[1]
sum[2] = a[0] + a[1] + a[2]
sum[3] = a[0] + a[1] + a[2] + a[3]
sum[4] = a[0] + a[1] + a[2] + a[3] + a[4]
sum数组就被称为前缀和数组。

前缀和的作用
前缀和的最主要目的就是求子数组的和的大小。例如元素a[1]到a[3]的和。
a[1] + a[2] + a[3] = sum[3] - sum[0]


- 参考链接:https://blog.csdn.net/fgy_u/article/details/109349710

https://www.jianshu.com/p/3021429f38d4



## 5.差分

### 5.1 差分介绍
&emsp;差分时一种和前缀和算法相对 的策略,这种策略是,令 b(i) = a(i) - a(i-1),即相邻两数的差.在每一个点上记录变化数值,因为有增加有减少通过求和判断是否有超过指定容量的情况发生,超过则代表无法满足要求.

该算法是前缀和算法的逆运算，可以快速的对数组的某一个区间进行计算。

&ensp;对于数组array[N]中的某一段进行增减操作,通过差分可在 O(n)时间内完成.如:
&ensp;trips = [ [2,1,5], [3,3,7]]
&emsp;第一步:更新array[1] = 2, array[2] = -2;
&emsp;第二步:更新array[3] = 3, array[7] = -2;
&emsp;第三步:进行求和,得到结果array[] = {0, 2, 2, 5, 5, 3, 3, 0}


## 6.拓扑排序



一、什么是拓扑排序
在图论中，拓扑排序（Topological Sorting）是一个有向无环图（DAG, Directed Acyclic Graph）的所有顶点的线性序列。且该序列必须满足下面两个条件：

每个顶点出现且只出现一次。
若存在一条从顶点 A 到顶点 B 的路径，那么在序列中顶点 A 出现在顶点 B 的前面。
有向无环图（DAG）才有拓扑排序，非DAG图没有拓扑排序一说。

二、拓扑排序的应用
拓扑排序通常用来“排序”具有依赖关系的任务。

比如，如果用一个DAG图来表示一个工程，其中每个顶点表示工程中的一个任务，用有向边<script type="math/tex" id="MathJax-Element-1"> </script>表示在做任务 B 之前必须先完成任务 A。故在这个工程中，任意两个任务要么具有确定的先后关系，要么是没有关系，绝对不存在互相矛盾的关系（即环路）。


三、拓扑排序的实现
根据上面讲的方法，我们关键是要维护一个入度为0的顶点的集合。
图的存储方式有两种：邻接矩阵和邻接表。这里我们采用邻接表来存储图，C++代码如下：
```c++
#include<iostream>
#include <list>
#include <queue>
using namespace std;

/************************类声明************************/
class Graph
{
    int V;             // 顶点个数
    list<int> *adj;    // 邻接表
    queue<int> q;      // 维护一个入度为0的顶点的集合
    int* indegree;     // 记录每个顶点的入度
public:
    Graph(int V);                   // 构造函数
    ~Graph();                       // 析构函数
    void addEdge(int v, int w);     // 添加边
    bool topological_sort();        // 拓扑排序
};

/************************类定义************************/
Graph::Graph(int V)
{
    this->V = V;
    adj = new list<int>[V];

    indegree = new int[V];  // 入度全部初始化为0
    for(int i=0; i<V; ++i)
        indegree[i] = 0;
}

Graph::~Graph()
{
    delete [] adj;
    delete [] indegree;
}

void Graph::addEdge(int v, int w)
{
    adj[v].push_back(w); 
    ++indegree[w];
}

bool Graph::topological_sort()
{
    for(int i=0; i<V; ++i)
        if(indegree[i] == 0)
            q.push(i);         // 将所有入度为0的顶点入队

    int count = 0;             // 计数，记录当前已经输出的顶点数 
    while(!q.empty())
    {
        int v = q.front();      // 从队列中取出一个顶点
        q.pop();

        cout << v << " ";      // 输出该顶点
        ++count;
        // 将所有v指向的顶点的入度减1，并将入度减为0的顶点入栈
        list<int>::iterator beg = adj[v].begin();
        for( ; beg!=adj[v].end(); ++beg)
            if(!(--indegree[*beg]))
                q.push(*beg);   // 若入度为0，则入栈
    }

    if(count < V)
        return false;           // 没有输出全部顶点，有向图中有回路
    else
        return true;            // 拓扑排序成功
}

int main()
{
    Graph g(6);   // 创建图
    g.addEdge(5, 2);
    g.addEdge(5, 0);
    g.addEdge(4, 0);
    g.addEdge(4, 1);
    g.addEdge(2, 3);
    g.addEdge(3, 1);

    g.topological_sort();
    return 0;
}
```
输出结果是 4, 5, 2, 0, 3, 1。这是该图的拓扑排序序列之一。

每次在入度为0的集合中取顶点，并没有特殊的取出规则，随机取出也行，这里使用的queue。取顶点的顺序不同会得到不同的拓扑排序序列，当然前提是该图存在多个拓扑排序序列。

由于输出每个顶点的同时还要删除以它为起点的边，故上述拓扑排序的时间复杂度为O(V+E)O(V+E)。


- 参考链接:https://blog.csdn.net/lisonglisonglisong/article/details/45543451


## 7.字符串

字符串介绍
&emsp;字符串可以涉及非常多的考点:如递归,栈,hash,dfs,bfs,动态规划等.


## 8.二分查找
&ensp;二分查找也称折半查找(Binary Search),它使一种效率较高的查找方法,前提是数据结构必须先排好序.但是,二分查找要求线性表具有随机访问的特点(如数组),也要求线性表能够根据中间元素的特点推测它两侧元素的性质,以达到缩减问题规模的效果.
&ensp;二分查找问题也是面试中常考问题,虽然它思想简单,但写好二分算法并不容易.
## 9.BFS

BFS（广度优先搜索） 常用来解决最短路径问题。
第一次遍历到目的节点时，所经过的路径是最短路径。
几个要点：

只能用来求解无权图的最短路径问题
队列：用来存储每一层遍历得到的节点
标记：对于遍历过的结点，应将其标记，以防重复访问

注:
1.广度搜索时候,如果曾经加入过,后续就不用再加入
2.加入队列时候,需要标记当前层级,方便后续直接返回目标解.



- 参考链接:https://zhuanlan.zhihu.com/p/62884729



## 10.DFS

&ensp;DFS实质是一种枚举,不过借助递归实现;
&emsp;DFS基本模式:
```c
void dfs(int step)
{
    // 判断边界
    ...;
    // 尝试每一种可能
    for (int i = 1; j <= n; ++i) {
        // 继续下一步
        dfs(step + 1);
    }

    // 返回
    ...;
}
```


## 11.动态规划


- 参考链接:
https://blog.csdn.net/qq_37763204/article/details/79394397
https://blog.csdn.net/u013309870/article/details/75193592

## 12.贪心算法

## 13.字典树



## bitmap

```c
#include <stdio.h>
#include <math.h>

#define TYPE int
#define INT_BITS (1<<3) * sizeof(TYPE)
#define SHIFT (int)(log(INT_BITS)/log(2))
#define MASK INT_BITS-1

TYPE bitmap[10000];

// 设置
void setBit(int num);
// 是否存在
int containBit(int num);
// 得到当前位置的第几位
int getBit(int num);
// 删除
int deleteBit(int num);

int main(){

	printf("int_bits = %d, shift = %d, mask = %d\n", INT_BITS, SHIFT, MASK);
	setBit(2);
	printf("是否存在%d\n", containBit(2));
	printf("是否存在%d\n", containBit(3));
	deleteBit(2);
	printf("是否存在%d\n", containBit(2));
	printf("是否存在%d\n", containBit(3));
	setBit(2);
	printf("是否存在%d\n", containBit(2));
	printf("是否存在%d\n", containBit(3));

	printf("2在当前的位置%d\n", getBit(2));
	setBit(32);
	printf("32在当前的位置%d\n", getBit(32));

	return 0;
}

void setBit(int num){
	 bitmap[num >> SHIFT] |= 1 << (num & MASK);
	 printf("set --[%d]: %d\n", num >> SHIFT, bitmap[num >> SHIFT]);
}

int containBit(int num){
	return (bitmap[num >> SHIFT] & 1 << (num &MASK)) ==  1 << (num &MASK);
}

int getBit(int num){
	return num & MASK;
}
// 删除
int deleteBit(int num){
	bitmap[num >> SHIFT] &= ~(1 << (num & MASK));
	printf("del -- [%d] : %d\n", num >> SHIFT, bitmap[num >> SHIFT]);
	return -1;
}
```


https://www.cnblogs.com/cjsblog/p/11613708.html

https://www.cnblogs.com/chunxia/archive/2013/04/28/3049243.html

https://zhuanlan.zhihu.com/p/414067305

