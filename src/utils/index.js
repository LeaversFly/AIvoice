import { data } from "../main"

// 158个角色
const voices = [
    "派蒙", "空", "荧", "阿贝多", "枫原万叶", "温迪", "八重神子", "纳西妲", "钟离", "诺艾尔", "凝光", "托马", "北斗", "莫娜", "荒泷一斗", "提纳里", "芭芭拉", "艾尔海森", "雷电将军", "赛诺", "琴", "班尼特", "五郎", "神里绫华", "迪希雅", "夜兰", "辛焱", "安柏", "宵宫", "云堇", "妮露", "烟绯", "鹿野院平藏", "凯亚", "达达利亚", "迪卢克", "可莉", "早柚", "香菱", "重云", "刻晴", "久岐忍", "珊瑚宫心海", "迪奥娜", "戴因斯雷布", "魈", "神里绫人", "丽莎", "优菈", "凯瑟琳", "雷泽", "菲谢尔", "九条裟罗", "甘雨", "行秋", "胡桃", "迪娜泽黛", "柯莱", "申鹤", "砂糖", "萍姥姥", "奥兹", "罗莎莉亚", "式大将", "哲平", "坎蒂丝", "托克", "留云借风真君", "昆钧", "塞琉斯", "多莉", "大肉丸", "莱依拉", "散兵", "拉赫曼", "杜拉夫", "阿守", "玛乔丽", "纳比尔", "海芭夏", "九条镰治", "阿娜耶", "阿晃", "阿扎尔", "七七", "博士", "白术", "埃洛伊", "大慈树王", "女士", "丽塔", "失落迷迭", "缭乱星棘", "伊甸", "伏特加女孩", "狂热蓝调", "莉莉娅", "萝莎莉娅", "八重樱", "八重霞", "卡莲", "第六夜想曲", "卡萝尔", "姬子", "极地战刃", "布洛妮娅", "次生银翼", "理之律者", "迷城骇兔", "希儿", "魇夜星渊", "黑希儿", "帕朵菲莉丝", "天元骑英", "幽兰黛尔", "德丽莎", "月下初拥", "朔夜观星", "暮光骑士", "明日香", "李素裳", "格蕾修", "梅比乌斯", "渡鸦", "人之律者", "爱莉希雅", "爱衣", "天穹游侠", "琪亚娜", "空之律者", "薪炎之律者", "云墨丹心", "符华", "识之律者", "维尔薇", "芽衣", "雷之律者", "阿波尼亚"
]

// 设置角色语音选项
export const createOptions = () => {
    const selector = document.querySelector('.selector')
    voices.forEach((item) => selector.add(new Option(item, item)))
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
        node.setAttribute('src', `https://ai-api.baimianxiao.cn/tts?speaker=${speaker}&text=${text}&format=${format}&length=${1 / length}&noise=${noise}&noisew=${noisew}`)
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