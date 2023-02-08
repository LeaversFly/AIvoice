import { handle } from './utils/proxy.js'
import { createOptions, setParams, bindData, getData } from './utils/index.js'
import css from './assets/style/index.css'

// 原始数据
let data = {
    'text': '',
    'speaker': '派蒙',
    'noise': '0.66',
    'noisew': '0.8',
    'length': '1.2',
    'format': 'wav'
}

// 初始化
// 对象代理
data = new Proxy(data, handle)

// 页面加载时设置角色语音选项
createOptions()

// 页面加载时设置初始值
setParams()

// 绑定数据
bindData()

// 绑定生成语音事件
document.querySelector('.produce').addEventListener('click', () => {
    getData()
})