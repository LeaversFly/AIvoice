import { handle } from './utils/proxy.js'
import { createOptions, bindData, getVoice, forbidCheck, defineDownloadButton } from './utils/index.js'
import dialog from './utils/dialog'
import { params } from './config/params.js'
import css from './assets/style/index.css'

// 初始化
// 页面加载时设置角色语音选项
createOptions()

// 对象代理
export const data = new Proxy(params, handle)
// 赋初始值
for (let key in params) {
    if (key !== 'text') {
        if (typeof params[key][0] === 'number') {
            data[key] = params[key][3]
        } else {
            data[key] = params[key][0]
        }
    }
}

// 绑定数据
bindData()

// 禁用控制台
forbidCheck()

// 点击支持一下弹出对话框
dialog()

// 绑定生成语音事件
document.querySelector('.produce').addEventListener('click', () => {
    getVoice()
})

// 下载按钮定义
defineDownloadButton()
