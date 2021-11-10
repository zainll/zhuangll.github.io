---
title: WSL
date: 2021-10-27 00:47:53
updated: 2021-10-27 00:53:53
categories: 
    - tool
tags: 
    - 实用教程
    - Another Tag
---


## 安装ubuntu20.04

安装到非系统盘目录，下载离线安装包，复制到想要安装的目录下，解压，以管理员身份运行ubuntu2004.exe

## 卸载wsl

```sh
wslconfig /l
# 从列表中选择要卸载的发行版（例如Ubuntu）并键入命令
wslconfig /u Ubuntu
```
参考链接：[WSL系列操作：安装，卸载](https://blog.csdn.net/zhangpeterx/article/details/97616268
)

<!--more-->

## 设置wsl
```sh
# 更改默认root用户登录
ubuntu1804.exe config --default-user root
# 更改默认登陆目录
# list 中 Ubuntu-20.04 条目中添加
"startingDirectory": "//wsl$/Ubuntu-20.04"
```

## ubuntu 换源

```sh
# 备份
cp /etc/apt/sources.list /etc/apt/sources.list.20211013
lsb_release -c
lsb_release -a
# 

sudo apt-get update
sudo apt-get upgrade

```
参考链接：[ubuntu20.04更改国内镜像源](https://blog.csdn.net/qq_33706673/article/details/106869016)


## Read The Docs 环境搭建

```sh

sudo apt-get install python3-pip

pip install sphinx sphinx-autobuild sphinx_rtd_theme
pip install recommonmark
pip install sphinx-markdown-tables
pip install Pyinstaller -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
（其中的Pyinstaller是你需要下载的库或包名，根据自己需求自行更改即可）

extensions = [
    'recommonmark',
    'sphinx_markdown_tables'
]

python3 -m pip freeze > requirements.txt
```

参考链接：
[VsCode +Read The Docs 环境搭建](https://zhuanlan.zhihu.com/p/112919704)
<br>

[Sphinx + Read the Docs 从懵逼到入门](https://zhuanlan.zhihu.com/p/264647009)
<br>

[ReadTheDocs搭建第一本电子书](https://zhuanlan.zhihu.com/p/388640347)


https://www.jianshu.com/p/8aae1c1453ae

## git

git push -u origin main

[玩转WSL(6)之Git配置](https://zhuanlan.zhihu.com/p/252505037)

## PowerShell

winget search Microsoft.PowerShell

- [Windows Powershell和Windows Terminal的区别](https://blog.csdn.net/The_Time_Runner/article/details/106038222)
<br>

[安装和设置 Windows 终端](https://docs.microsoft.com/zh-cn/windows/terminal/get-started)


## windows 包管理工具

- winget 官方推出
```sh
# 使用 WinGet 安装一遍
winget install postman
winget search postman

# 卸载，再用 Scoop 安装一遍
scoop install postman
```
- choro

- vcpkg
[Get started with vcpkg](https://vcpkg.io/en/getting-started.html)
<br>

[开源库集成器Vcpkg全教程](https://blog.csdn.net/cjmqas/article/details/79282847)


 Scoop 