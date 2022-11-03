#!/bin/bash
hexo clean
hexo g
hexo d
git status
git add .
git commit -m "iii"
git push
cd public
git checkout main
git status
git add .
git commit -m "iii"
git push -u origin main --force

