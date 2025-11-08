#!/bin/bash

# GitHub 仓库初始化脚本

echo "🎯 GitHub Pages 部署初始化"
echo "================================"

# 检查是否已经初始化 Git
if [ ! -d .git ]; then
  echo "📦 初始化 Git 仓库..."
  git init
  echo "✅ Git 仓库初始化完成"
else
  echo "✅ Git 仓库已存在"
fi

# 获取 GitHub 仓库信息
echo ""
echo "请输入您的 GitHub 仓库信息："
read -p "GitHub 用户名: " github_username
read -p "仓库名称: " repo_name

# 验证输入
if [ -z "$github_username" ] || [ -z "$repo_name" ]; then
  echo "❌ 用户名和仓库名不能为空"
  exit 1
fi

# 更新 vite.config.js 中的 base 路径
echo ""
echo "📝 更新 vite.config.js 配置..."
sed -i.bak "s|base: process.env.NODE_ENV === 'production' ? '/yitu-demo/' : '/',|base: process.env.NODE_ENV === 'production' ? '/$repo_name/' : '/',|g" vite.config.js
rm -f vite.config.js.bak
echo "✅ base 路径已更新为: /$repo_name/"

# 设置远程仓库
echo ""
echo "🔗 配置远程仓库..."
git_url="https://github.com/$github_username/$repo_name.git"

# 检查是否已有 origin
if git remote | grep -q "^origin$"; then
  echo "⚠️  远程仓库 origin 已存在，正在更新..."
  git remote set-url origin $git_url
else
  git remote add origin $git_url
fi

echo "✅ 远程仓库已配置: $git_url"

# 检查当前分支
current_branch=$(git branch --show-current)
if [ -z "$current_branch" ]; then
  echo ""
  echo "📌 创建并切换到 main 分支..."
  git checkout -b main
else
  echo "✅ 当前分支: $current_branch"
  if [ "$current_branch" != "main" ]; then
    read -p "⚠️  当前分支不是 main，是否切换到 main 分支？(y/n): " switch_branch
    if [ "$switch_branch" = "y" ]; then
      git checkout -b main 2>/dev/null || git checkout main
    fi
  fi
fi

# 添加所有文件
echo ""
echo "📦 添加文件到 Git..."
git add .

# 提交
echo ""
read -p "请输入初始提交信息 (默认: 初始化项目并配置 GitHub Pages): " commit_message
commit_message=${commit_message:-"初始化项目并配置 GitHub Pages"}
git commit -m "$commit_message"

# 推送到 GitHub
echo ""
read -p "🚀 是否立即推送到 GitHub？(y/n): " push_now
if [ "$push_now" = "y" ]; then
  echo "📤 推送到 GitHub..."
  git push -u origin main
  
  if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "📋 接下来的步骤："
    echo "1. 访问 https://github.com/$github_username/$repo_name/settings/pages"
    echo "2. 在 'Build and deployment' 部分"
    echo "3. 将 'Source' 设置为 'GitHub Actions'"
    echo "4. 等待 Actions 自动部署完成"
    echo "5. 访问您的网站: https://$github_username.github.io/$repo_name/"
    echo ""
    echo "🔄 GitHub Actions 工作流已配置，每次推送代码都会自动部署"
  else
    echo "❌ 推送失败，请检查："
    echo "1. GitHub 仓库是否已创建"
    echo "2. 是否有推送权限"
    echo "3. 网络连接是否正常"
  fi
else
  echo ""
  echo "📝 稍后可以使用以下命令推送："
  echo "   git push -u origin main"
fi

echo ""
echo "🎉 初始化完成！"

