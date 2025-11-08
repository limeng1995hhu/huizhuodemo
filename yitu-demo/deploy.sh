#!/bin/bash

# GitHub Pages 快速部署脚本

echo "🚀 开始部署到 GitHub Pages..."

# 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
  echo "📝 发现未提交的更改，正在提交..."
  git add .
  
  # 获取提交信息
  read -p "请输入提交信息 (默认: 更新代码): " commit_message
  commit_message=${commit_message:-"更新代码"}
  
  git commit -m "$commit_message"
else
  echo "✅ 没有未提交的更改"
fi

# 推送到 GitHub
echo "📤 推送代码到 GitHub..."
git push origin main

if [ $? -eq 0 ]; then
  echo "✅ 代码推送成功！"
  echo "🔄 GitHub Actions 将自动构建和部署"
  echo "📍 请访问 GitHub Actions 查看部署进度"
  echo "🌐 部署完成后，访问您的 GitHub Pages 网站"
else
  echo "❌ 推送失败，请检查错误信息"
  exit 1
fi

