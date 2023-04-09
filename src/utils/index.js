import { data } from "../main"
// 引入角色名
import roles from '../assets/roles.json'

// 设置角色语音选项
export const createOptions = () => {
    const selector = document.querySelector('.selector')
    roles.forEach((item) => selector.add(new Option(item, item)))
}

// 修改显示参数
export const setParams = () => {
    let nodeList = document.querySelectorAll('.param')
    for (let i = 0; i < nodeList.length; i++) {
        switch (i) {
            case 0:
                nodeList[i].innerHTML = data['noise']
                break
            case 1:
                nodeList[i].innerHTML = data['noisew']
                break
            case 2:
                nodeList[i].innerHTML = data['length']
                break
        }
    }
}

// 绑定事件，数据回流时重新展示
export const bindData = () => {
    document.querySelectorAll('.selector').forEach(item => {
        item.addEventListener('change', e => {
            e.target.length === 2 ? data.format = e.target.value : data.speaker = e.target.value
        })
    });
    document.querySelectorAll('.input-box').forEach(item => {
        item.addEventListener('input', e => data.text = e.target.value)
    });
    document.querySelectorAll('.slide').forEach(item => {
        item.addEventListener('input', e => data[e.target.name] = e.target.value)
    });
}

// 填入数据
export const getVoice = () => {
    const { text, speaker, noise, noisew, length, format } = data
    if (text === '') {
        alert('请输入文本!')
    }
    else {
        const node = document.getElementsByTagName('audio')[0]
        node.setAttribute('src', `https://genshinvoice.top/api?speaker=${speaker}&text=${text}&format=${format}&length=${1 / length}&noise=${noise}&noisew=${noisew}`)
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