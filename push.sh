#!/bin/bash
git checkout backup
hexo clean
hexo g
hexo d
git status
git add .
git commit -m "iii"
git push


