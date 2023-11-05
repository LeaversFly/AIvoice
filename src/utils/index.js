import { data } from "../main"
// 引入角色名
import roles from '../assets/roles.json'
const languages = {}
// 设置角色语音选项
export const createOptions = () => {
    const character = document.querySelector('.character')
    roles.forEach((item) => character.add(new Option(item, item)))
    const language = document.querySelector('.language')
    languages.forEach((item) => language.add(new Option(item, item)))
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
        item.addEventListener('input', e => {
            data[e.target.name] = e.target.value
            e.target.parentNode.querySelector(".param.tag").innerHTML = e.target.value;
        })
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

// 搜索按钮定义
export const defineSearchButton = () => {
    // 先设置value，然后触发 change event来更改全局变量（为什么要用一个全局变量而不是请求的时候读取几个框里的内容啊）
    const searchButton = document.getElementById('button');
    searchButton.addEventListener("click", function() {
        const characterSelect = document.querySelectorAll('select.selector')[0];
        characterSelect.value = document.getElementById('characterSearchBox').value;
        const changeEvent = new Event("change");
        characterSelect.dispatchEvent(changeEvent);
    })
}

// 方便下载和自动命名
export const defineDownloadButton = (url, name) => {
    const button = document.getElementById("download-button");
    button.addEventListener("click", function() {
        // 如果没点过生成会自动生成并下载
        document.querySelector('button.produce').click();
        const downloadLink = document.createElement('a');
        // {角色}：{文本}.{后缀}。文本先替换换行为空格，然后取前10个字符。
        downloadLink.download=document.querySelectorAll('select.selector')[0].selectedOptions[0].value+'：'+document.querySelector('textarea.input-box').value.replaceAll('\n', ' ').replaceAll('\r', ' ').slice(0, 10)+'.'+document.querySelectorAll('select.selector')[1].selectedOptions[0].value;
        // 还没点生成、点了还没返回或者已经返回了都不会重复请求。还没生成点下载会先生成。
        downloadLink.href=document.querySelector('audio.player').src;
        downloadLink.click();
    });
    document.querySelector('div.btns').appendChild(button);
}
