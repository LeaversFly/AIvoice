import { params } from "../config/params"
import { data } from "../main"

// 设置选项与拖动条
export const createOptions = () => {
    const sliderPorp = ['min', 'max', 'step', 'value']
    for (let key in params) {
        const container = document.querySelector('.' + key)
        // 拖动条
        if (typeof params[key][0] === 'number') {
            sliderPorp.forEach((item, index) => container.setAttribute(item, params[key][index]))
            container.parentNode.querySelector('.param').innerHTML = params[key][3]
        } else if (key !== 'text') {
            // 选择器
            params[key].forEach(item => container.add(new Option(item, item)))
        }
    }
}

// 绑定数据更新事件
export const bindData = () => {
    for (let key in data) {
        const container = document.querySelector('.' + key)
        // 文本
        if (key === 'text') {
            document.querySelector('.input-box').addEventListener('input', e => {
                data[key] = e.target.value
            })
        } else if (container.className.includes('selector')) {
            // 选择器
            container.addEventListener('change', e => {
                data[key] = e.target.value
            })
        } else {
            // 拖动条
            container.addEventListener('input', e => {
                data[key] = e.target.value
                // 更新拖动条后的数值
                container.parentNode.querySelector('.param').innerHTML = data[key]
            })
        }
    }
}

// 填入数据
export const getVoice = () => {
    if (data.text === '') {
        alert('请输入文本!')
    } else {
        const node = document.getElementsByTagName('audio')[0]
        let url = 'https://genshinvoice.top/api?'
        // 根据参数拼接url字符串
        for (let key in data) {
            // 语速要特殊处理
            key === 'length' ? url += key + '=' + 1 / data[key] + '&' :
                url += key + '=' + data[key] + '&'
        }
        // 删掉多余的&
        url = url.slice(0, -1)
        node.setAttribute('src', url)
    }
}

// 禁用调试
export const forbidCheck = () => {
    //禁止F12
    window.onkeydown = window.onkeyup = window.onkeypress = function () {
        if (window.event.keyCode === 123)
            return false;
    }

    // 开启控制台自动debugger
    setInterval(function () {
        check()
    }, 4000)
    var check = function () {
        function doCheck(a) {
            if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
                ; (function () { }['constructor']('debugger')())
            } else {
                ; (function () { }['constructor']('debugger')())
            }
            doCheck(++a)
        }
        try {
            doCheck(0)
        } catch (err) { }
    }
    check()
}

// 方便下载和自动命名
export const defineDownloadButton = (url, name) => {
    const button = document.getElementById("download-button");
    button.addEventListener("click", function () {
        // 如果没点过生成会自动生成并下载
        document.querySelector('button.produce').click();
        const downloadLink = document.createElement('a');
        // {角色}：{文本}.{后缀}。文本先替换换行为空格，然后取前10个字符。
        downloadLink.download = document.querySelectorAll('select.selector')[0].selectedOptions[0].value + '：' + document.querySelector('textarea.input-box').value.replaceAll('\n', ' ').replaceAll('\r', ' ').slice(0, 10) + '.' + document.querySelectorAll('select.selector')[1].selectedOptions[0].value;
        // 还没点生成、点了还没返回或者已经返回了都不会重复请求。还没生成点下载会先生成。
        downloadLink.href = document.querySelector('audio.player').src;
        downloadLink.click();
    });
    document.querySelector('div.btns').appendChild(button);
}
