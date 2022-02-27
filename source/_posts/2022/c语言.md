---
title: c语言
date: 2022-01-20 00:47:53
updated: 2022-01-20 00:53:53
categories: 
    - tool
tags: 
    - Computer Science
    - Another Tag
---



## 库函数

<!--more-->

### string.h
#### strcpy 字符串复制函数
```c
// strDestination 目的字符串；strSource 源字符串
char* strcpy(char* strDestination, const char* strSource);
// strcpy() 会把 strSource 指向的字符串复制到 strDestination。
// 返回值：目的字符串，也即 strDestination。
    char dest[50] = { 0 };
    char src[50] = { "http://c.biancheng.net" };
    strcpy(dest, src);
```

#### strlen 求字符串长度
```c

```


#### strcspn 求字符串互补跨度(长度)
```c
// 回从字符串 str 开头算起，连续有几个字符都不在 reject 中；也就是说，str 中连续有几个字符和 reject 没有交集
// str 要检索的字符串
// reject 该字符串包含要在str中进行匹配的字符列表
size_t strcspn(const char* str, const char* reject);
// 返回值：返回从字符串 str 开头算起，连续不在 reject 中的字符的个数；也可以理解为，str 中第一次出现 reject 中字符的位置。
char str[50] = { "http://c.biancheng.net" };
char keys[50] = { "?.,:\"\'-!" };
int i = strcspn(str, keys);
// i = 4
```

#### strcmp 比较两个字符串
```c
// strcmp() 会根据 ASCII 编码依次比较 str1 和 str2 的每一个字符，直到出现不到的字符，或者到达字符串末尾（遇见\0）
int strcmp(const char* str1, const char* str2);

char str1[50] = { 0 };
char str2[50] = { 0 };
strcmp(str1, str2)
```
返回值：
- 如果返回值 < 0，则表示 str1 小于 str2。
- 如果返回值 > 0，则表示 str2 小于 str1。
- 如果返回值 = 0，则表示 str1 等于 str2。


#### strchr 字符查找函数
- strchr() 函数会依次检索字符串 str 中的每一个字符，直到遇见字符 c，或者到达字符串末尾（遇见\0）。
```c
// str 被查找的字符串
// c  要查找的字符
char* strchr(const char* str, int c);

const char *str = "http://c.biancheng.net/";
int c = 'g';
char *p = strchr(str, c);
```
返回值：
- 返回在字符串 str 中第一次出现字符 c 的位置，如果未找到该字符 c 则返回 NULL。

#### strcat 字符串拼接
- strcat() 函数把 strSource 所指向的字符串追加到 strDestination 所指向的字符串的结尾
```c
// strDestination 目的字符串
// strSource  源字符串
char* strcat(char* strDestination, const char* strSource);

char str1[101] = { 0 };
char str2[50] = { 0 };
strcat(str1, str2);
```
返回值：
- 指向 strDestination 的指针。



### ctype.h

#### isupper 判断一个字符是否是大写字母
```c
// c
int isupper(int c);

char str[] = "C++ Java Python C# Linux Golang Shell\n";
int re = isupper(s[i]);
```
返回值：
- 返回值为非 0（真）表示 c 是大写字母，返回值为 0（假）表示 c 不是大写字母。

#### islower 判断一个字符是否是小写字母
```c
int islower(int c);

char c = 'a';
int re = islower(c);
```


#### isspace 判断一个字符是否是空白字符

```c
// 
int isspace(int c);

int i = 0;
char str[] = "Linux C++\tPython Shell\nC# Java\n";
while (str[i]) {
    if(isspace(s[i])) {
        printf("c = %c ", s[i]);
    }
    i++;
}
```
- 空白字符：空格、水平制表符、换行符、垂直制表符、换页、回车
返回值：
- 返回值为非 0（真）表示c是空白符，返回值为 0（假）表示c不是空白符。


#### isprint 判断一个字符是否是可打印字符
```c
int isprint(int c);

int i=0;
char str[]="C++ Java \n C# Python \t Shell Linux\n";
while(str[i]) {
    if(isprint(str[i])) putchar (str[i]);
    i++;
}
// C++ Java  C# Python  Shell Linux
```
- 可打印字符和控制字符是相对的，控制字符是指那些具有某种特殊功能、不会显示在屏幕上、不会占用字符位置的“特殊”字符。要检测一个字符是否是控制字符，请使用 iscntrl() 函数
返回值：
- 返回值为非 0（真）表示 c 是可打印字符，返回值为 0（假）表示 c 不是可打印字符。



#### isgraph 判断一个字符是否是图形字符
- 字符是图形字符，就是说这个字符需要在显示器上绘制出来，而空格、换行、Tab 缩进等字符只会占用输出的位置，不需要绘制。
```c
int isgraph(int c);

char c = '';
int res = isgraph(c)
```
返回值
- 返回值为非 0（真）表示 c 是图形字符，返回值为 0（假）表示 c 不是图形字符。

#### iscntrl 判断一个字符是否为控制字符
- “控制字符”是指那些具有某种特殊功能、不会显示在屏幕上、不会占用字符位置的特殊字符。默认情况下，C语言使用的是 ASCII 编码，控制字符的范围是0x00 (NUL) ~ 0x1f (US)，再加上最后的0x7f (DEL)，一共 33 个。
```c
int iscntrl(int c);

int res = iscntrl(c);
```
返回值
- 返回值为非 0（真）表示 c 是控制字符，返回值为 0（假）表示 c 不是控制字符。


#### isdigit  判断一个字符是否为数字
- isdigit() 函数用来判断一个字符是否是数字，也即 0~9。
```c
int isdigit(int c);

char s[50] = {0};
int res = isdigit(s[i]);
```
返回值
- 返回值为非 0（真）表示 c 是数字，返回值为 0（假）表示 c 不是数字。

#### isalpha 判断一个字符是否是字母
- isalpha() 函数用来检测一个字符是否是字母，包括大写字母和小写字母。
```c
int isalpha(int c);

char str[] = "C++ Java C#";
while (str[i]) {
    if (isalpha(str[i])) {
        printf("%c is alphabetic\n", str[i]);
    } else {
        printf("%c is not alphabetic\n", str[i]);
    }
    i++;
}
```
返回值
- 回非 0（真）表示 c 是字母，返回 0（假）表示 c 不是字母。


#### isalnum 判断一个字符是否是字母或数字
-  isalnum() 函数用于判断一个字符是否是字母（包括大写字母和小写字母）或者数字（0~9）。
```c
int isalnum(int c);

char str[] = "*http://c.biancheng.net is 7 years old";
while (str[i]) {
    if (isalnum(str[i])) n++;
    i++;
}
```
返回值
- 返回非 0（真）表示 c 是字母或者数字，返回 0（假）表示 c 既不是数字也不是字母。



### math.h

#### ldexp 
返回x乘以2的exponent次方
- ldexp() 函数用来计算 x 乘以 2 的 exponent 次方（次幂）的值，也即返回 x * 2^exponent 的值。
```c
// x 双精度浮点数
// exponnent  2的指数
double ldexp(double x, int exponent);

double f=0.964453, n=7;  //为变量赋初值
double x = ldexp(f, n);  //求f * 2^n 的结果
```
返回值：
- x*2^exponent 的计算结果


#### labs 求整数的绝对值(针对long类型)
```c
long labs(long n);

long m = 11;
long a = labs(m); // 求m的绝对值
```
返回值：
- 参数n的绝对值

#### abs 求整数的绝对值
- abs()函数用于求整数的绝对值
```c
int abs(int n);

int a = 3, b = -4, c, d;  //为变量赋初值
c = abs(a);  //求a的绝对值
d = abs(b);  //求b的绝对值
```
返回值
- 参数的绝对值

#### pow 求x的y次方的值
-  pow() 函数用来求 x 的 y 次方的值。
```c
// x 双精度数  y 双精度数
double pow(double x, double y);

double x = 4, y = 6;  //为变量赋初值
double result = pow(x, y);  //求a的b次方
```
返回值
- x 的 y 次方的值。

#### frexp 提取浮点数的尾数和指数部分
- rexp() 函数用来提取一个浮点数（小数）的指数部分和尾数部分。
```c
// x 要被计算的浮点数
// exponent  一个指向指数部分的指针
double frexp(double x, int* exponent);


int exp;
double mant = frexp(19.625, &exp);
```
指数部分被存入参数 exponent 中，尾数部分被放入返回值中，最终 x = mantissa * 2 ^ exponent（mantissa 表示尾数）。
返回值
- 浮点数 x 的尾数部分。

#### modf 提取浮点数的小数和整数部分
- double modf(double x, double *intptr) 将提取浮点数 x 的整数部分和小数部分，整数部分被存入参数 intptr 中，小数部分被放入返回值中。
```c
// x 要被计算的浮点数
// 一个指向整数部分的指针
double modf(double x, double *intptr);


double x=3.1415, intpart;  //为变量赋初值
double fractpart = modf(x, &intpart);  //求3.1415的小数部分
```
返回值
- x的小数部分

#### fmod 求x/y的余数(针对浮点数)
- fmod()函数用于求x/y的余数，针对浮点数。
```c
double fmod(double x, double y);

double m=10.1, n=3.1;  //为变量赋初值
double x = fmod(m,n);  //求m/n的余数
```
返回值
- x/y的余数



#### log10 返回以10为底的对数

```c

```


#### log 返回x的自然对数

```c

```

#### ceil 求不小于x的最小整数
- ceil() 函数用于求不小于 x 的最小整数，也即向上取整。
```c
double ceil(double x);

double m = 6.123;
int n = ceil(m);  //求不小于m的最小整数
```
返回值
- 不小于x的最小整数


#### floor 求不大于x的最大整数（向下取整）
- floor() 函数用于求不大于 x 的最大整数，也即向下取整。
```c
double floor(double x);

double m = 6.123;  //为变量赋初值
double n = floor(m);  //求不大于m的最大整数
```
返回值
- 不大于x的最大整数


### stdlib.h

#### ldiv 求两个数的商和余数
- ldiv() 函数用于求两个长整型数的商和余数。
```c
// numer 被除数  denom 除数
ldiv_t ldiv(long int numer, long int denom);

long x = 234, y = 23;  //为变量赋初值
ldiv_t a = ldiv(x, y);  //求234除以23的商和余数
```
返回值
- ldiv_t 类型的商和余数
ldiv_t 是在 stdlib.h 头文件中定义的结构体，它有两个成员，分别是 quot 和 rem：quot 表示商，rem 表示余数。

#### div 求两个数的商和余数
- div()函数用于求两个数的商和余数
```c
// numer 是被除数  denom 除数
div_t div(int numer, int denom);


int x = 512, y = 28;  //为变量赋初值
div_t a = div(x, y);  //求512除以28的商和余数
```
返回值
-- div_t 类型的商和余数


参考链接：
http://c.biancheng.net/c/ref/







