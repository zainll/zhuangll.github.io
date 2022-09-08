---
title: Dynamorio
date: 2022-05-20 00:47:53
updated: 2022-05-20 00:53:53
categories: 
    - tool
tags: 
    - Computer Science
    - Another Tag
---



## 编译
- 注意wsl中需要root用户编译
https://dynamorio.org/page_building.html
```sh
cmake \
-DCMAKE_TOOLCHAIN_FILE=/mnt/e/code/dynamorio/make/toolchain-android=arm64.cmake \
-DANDROID_TOOLCHAIN=/android_toolchain_using \
-DDR_COPY_TO_DEVICE=OFF \
-DCMAKE_BUILD_TYPE=Debug \
-DBUILD_TESTS=OFF \
-DBUILD_SAMPLES=ON \
-DBUILD_CLIENTS=ON \
../dynamorio



cmake \
-DDR_COPY_TO_DEVICE=OFF \
-DCMAKE_BUILD_TYPE=Debug \
-DBUILD_TESTS=OFF \
-DBUILD_SAMPLES=ON \
-DBUILD_CLIENTS=ON \
../dynamorio
```


<!--more-->


- 学习链接
DynamoRIO进阶指南
https://blog.csdn.net/oShuangYue12/article/details/109780166



