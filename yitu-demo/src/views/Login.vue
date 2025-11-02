<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true)
const loading = ref(false)

const loginForm = ref({
  phone: '',
  code: ''
})

const registerForm = ref({
  nickname: '',
  avatar: '',
  phone: ''
})

const switchMode = () => {
  isLogin.value = !isLogin.value
}

const handleWechatAuth = () => {
  loading.value = true
  // 模拟微信授权
  setTimeout(() => {
    loading.value = false
    alert('微信授权成功！')
    if (isLogin.value) {
      // 登录成功
      router.push('/')
    } else {
      // 注册成功，显示信息确认
      registerForm.value.nickname = '微信用户'
      registerForm.value.avatar = '👤'
    }
  }, 1500)
}

const handleSubmit = () => {
  if (isLogin.value) {
    // 处理登录
    alert('登录成功！')
    router.push('/')
  } else {
    // 处理注册
    alert('注册成功！')
    router.push('/')
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <!-- 返回按钮 -->
      <button class="back-btn" @click="goBack">← 返回</button>

      <!-- Logo区域 -->
      <div class="logo-section">
        <div class="logo-icon">♟️</div>
        <h1 class="app-name">弈途</h1>
        <p class="app-slogan">传承围棋文化，共建围棋之乡</p>
      </div>

      <!-- 登录/注册切换 -->
      <div class="mode-switch">
        <button
          class="mode-btn"
          :class="{ active: isLogin }"
          @click="isLogin = true"
        >
          登录
        </button>
        <button
          class="mode-btn"
          :class="{ active: !isLogin }"
          @click="isLogin = false"
        >
          注册
        </button>
      </div>

      <!-- 微信授权登录 -->
      <div class="wechat-section">
        <button
          class="wechat-btn"
          @click="handleWechatAuth"
          :disabled="loading"
        >
          <span class="wechat-icon">💬</span>
          <span>{{ loading ? '授权中...' : '微信一键' + (isLogin ? '登录' : '注册') }}</span>
        </button>
        <p class="wechat-tip">
          点击授权即表示同意《用户协议》和《隐私政策》
        </p>
      </div>

      <!-- 分割线 -->
      <div class="divider">
        <span>或</span>
      </div>

      <!-- 登录表单 -->
      <div v-if="isLogin" class="form-section">
        <div class="form-group">
          <label>手机号</label>
          <input
            v-model="loginForm.phone"
            type="tel"
            class="input"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </div>
        <div class="form-group">
          <label>验证码</label>
          <div class="code-input-group">
            <input
              v-model="loginForm.code"
              type="text"
              class="input"
              placeholder="请输入验证码"
              maxlength="6"
            />
            <button class="code-btn">获取验证码</button>
          </div>
        </div>
        <button class="submit-btn btn-primary" @click="handleSubmit">
          登录
        </button>
      </div>

      <!-- 注册表单 -->
      <div v-else class="form-section">
        <div class="form-group">
          <label>昵称</label>
          <input
            v-model="registerForm.nickname"
            type="text"
            class="input"
            placeholder="请输入昵称"
          />
        </div>
        <div class="form-group">
          <label>手机号</label>
          <input
            v-model="registerForm.phone"
            type="tel"
            class="input"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </div>
        <button class="submit-btn btn-primary" @click="handleSubmit">
          完成注册
        </button>
      </div>

      <!-- 提示信息 -->
      <div class="tips">
        <p v-if="isLogin">
          还没有账号？<a @click="switchMode" class="link">立即注册</a>
        </p>
        <p v-else>
          已有账号？<a @click="switchMode" class="link">立即登录</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #2c5f2d 0%, #4a90e2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  padding: 40px 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
}

.back-btn:hover {
  color: var(--primary-color);
}

.logo-section {
  text-align: center;
  margin-bottom: 30px;
}

.logo-icon {
  font-size: 60px;
  margin-bottom: 10px;
}

.app-name {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
  letter-spacing: 4px;
}

.app-slogan {
  font-size: 14px;
  color: var(--text-secondary);
}

.mode-switch {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
}

.mode-btn {
  flex: 1;
  padding: 12px;
  border: 1px solid var(--border-color);
  background: white;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-secondary);
}

.mode-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.wechat-section {
  margin-bottom: 30px;
}

.wechat-btn {
  width: 100%;
  padding: 14px;
  background: #07c160;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.wechat-btn:hover:not(:disabled) {
  background: #06ad56;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(7, 193, 96, 0.3);
}

.wechat-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wechat-icon {
  font-size: 20px;
}

.wechat-tip {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-light);
  text-align: center;
}

.divider {
  position: relative;
  text-align: center;
  margin: 30px 0;
}

.divider::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: var(--border-color);
}

.divider span {
  position: relative;
  background: white;
  padding: 0 16px;
  color: var(--text-light);
  font-size: 14px;
}

.form-section {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.code-input-group {
  display: flex;
  gap: 8px;
}

.code-input-group .input {
  flex: 1;
}

.code-btn {
  padding: 10px 16px;
  background: var(--bg-gray);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  color: var(--primary-color);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.code-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
}

.tips {
  text-align: center;
  margin-top: 20px;
}

.tips p {
  font-size: 14px;
  color: var(--text-secondary);
}

.link {
  color: var(--primary-color);
  cursor: pointer;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-container {
    padding: 30px 20px;
  }

  .logo-icon {
    font-size: 50px;
  }

  .app-name {
    font-size: 28px;
  }
}
</style>

