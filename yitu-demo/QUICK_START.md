# 🚀 快速开始指南

## 第一步：确认 GitHub 仓库已创建

在 GitHub 上创建一个新仓库（如果还没有的话）：

1. 访问 https://github.com/new
2. 输入仓库名称（例如：`yitu-demo`）
3. 选择 Public（公开）
4. **不要**勾选 "Add a README file"
5. 点击 "Create repository"

## 第二步：运行初始化脚本

在项目目录下运行：

```bash
./init-github.sh
```

按照提示输入：
- GitHub 用户名
- 仓库名称
- 提交信息（可选）
- 是否立即推送（建议选择 y）

脚本会自动：
- ✅ 初始化 Git 仓库
- ✅ 配置 vite.config.js 的 base 路径
- ✅ 添加远程仓库
- ✅ 提交并推送代码

## 第三步：配置 GitHub Pages

1. 访问您的仓库页面：`https://github.com/你的用户名/仓库名`
2. 点击 **Settings** (设置)
3. 在左侧菜单找到 **Pages**
4. 在 **Build and deployment** 部分：
   - **Source**: 选择 `GitHub Actions`
5. 保存设置

## 第四步：等待部署完成

1. 访问 **Actions** 标签页
2. 查看 "部署到 GitHub Pages" 工作流
3. 等待绿色的 ✅ 标记（通常需要 1-3 分钟）

## 第五步：访问您的网站

部署成功后，访问：

```
https://你的用户名.github.io/仓库名/
```

例如：
- 用户名：`zhangsan`
- 仓库名：`yitu-demo`
- 网站：`https://zhangsan.github.io/yitu-demo/`

## 🔄 后续更新

每次修改代码后，只需运行：

```bash
./deploy.sh
```

或手动推送：

```bash
git add .
git commit -m "更新说明"
git push origin main
```

GitHub Actions 会自动构建和部署！

## ⚠️ 常见问题

### 问题：推送失败

**解决方案**：
```bash
# 检查远程仓库配置
git remote -v

# 如果不正确，重新设置
git remote set-url origin https://github.com/你的用户名/仓库名.git
```

### 问题：页面显示 404

**解决方案**：
1. 检查 GitHub Pages 设置是否正确
2. 确认 vite.config.js 中的 base 路径与仓库名一致
3. 等待几分钟让 DNS 生效

### 问题：样式加载失败

**解决方案**：
检查 vite.config.js 中的 base 配置：
```javascript
base: process.env.NODE_ENV === 'production' ? '/仓库名/' : '/',
```

## 📞 需要帮助？

查看详细文档：
- [DEPLOY.md](./DEPLOY.md) - 完整部署指南
- [README.md](./README.md) - 项目说明

## 🎉 完成！

现在您的项目已经部署到 GitHub Pages，每次推送代码都会自动更新网站！

