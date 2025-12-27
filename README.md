# 颜色模块工具介绍

### 主要功能

#### 1. 多色彩模式支持

- **HEX**: 十六进制颜色代码 (#FF5733)
- **RGB**: 红绿蓝颜色模式 (rgb(255, 87, 51))
- **RGBA**: 带透明度的 RGB (rgba(255, 87, 51, 0.8))
- **HSL**: 色相、饱和度、亮度 (hsl(9, 100%, 60%))
- **HSB**: 色相、饱和度、明度 (hsb(9, 100%, 100%))
- **CMYK**: 印刷色彩模式 (cmyk(0%, 66%, 80%, 0%))

#### 2. 交互功能

- 点击色块打开颜色选择面板
- 手风琴式预设颜色展示
- 一键复制任意格式的颜色值
- 实时颜色格式转换
- 拖拽式颜色选择器
- 透明度滑块调节

#### 3. 响应式设计

- 移动端适配
- 暗色模式支持
- 触摸交互优化
- 无障碍访问支持

### 核心组件

- **ColorPicker**: 高级颜色选择器，支持多种颜色模型
- **ColorPanel**: 综合颜色面板，提供完整的颜色管理功能
- **ColorConverter**: 颜色格式转换器，支持实时转换
- **ColorInput**: 颜色输入组件，支持多种格式输入
- **ColorModuleDemo**: 完整功能演示组件

### 工具函数

提供丰富的颜色处理工具函数：

- 颜色格式转换 (hexToRgb, rgbToHsl, rgbToCmyk 等)
- 颜色分析 (isDarkColor, getContrastTextColor)
- 颜色操作 (adjustBrightness, calculateColorDifference)
- 实用功能 (copyToClipboard, generateRandomColor)
