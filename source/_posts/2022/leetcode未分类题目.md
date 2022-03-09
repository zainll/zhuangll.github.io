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

1207,


<!--more-->

## 



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








