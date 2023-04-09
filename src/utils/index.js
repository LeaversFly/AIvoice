import { data } from "../main"

// 158个角色
const voices = [
    '鹿野院平藏', '香菱', '雷电将军', '雷泽', '魈', '阿贝多', '钟离', '重云', '迪希雅', '迪娜泽黛', '迪奥娜', '迪卢克', '达达利亚', '辛焱', '赛诺', '诺艾尔', '识之律者', '行秋', '神里绫华', '神里绫人', '白术', '留云借风真君', '申鹤', '田铁嘴', '甘雨', '瑶瑶', '琴', '莱依拉', '莫娜', '荧', '荒泷一斗', '艾尔海森', '艾伯特', '胡桃', '芭芭拉', '纳西妲', '空', '砂糖', '烟绯', '温迪', '流浪者', '派蒙',
    '黑希儿', '魇夜星渊', '雷之律者', '阿波尼亚', '阿晃', '阿扎尔', '迷城骇兔', '薪炎之律者', '萝莎莉娅', '萍姥姥', '菲谢尔', '菲尔戈黛特', '莫弈', '莉莉娅', '芽衣', '羽生田千鹤', '罗莎莉亚', '缭乱星棘', '维尔薇', '第六夜想曲', '符华', '空之律者', '知易', '琪亚娜', '理之律者', '班尼特', '珐露珊', '珊瑚宫心海', '玛格丽特', '玛乔丽', '狂热蓝调', '爱衣', '爱莉希雅', '渡鸦', '海芭夏', '次生银翼', '梅比乌斯', '格蕾修', '柯莱', '枫原万叶', '极地战刃', '杜拉夫', '李素裳', '朔夜观星', '月下初拥', '暮光骑士', '昆钧', '早柚', '提纳里', '掇星攫辰天君', '拉赫曼', '托马', '戴因斯雷布', '德丽莎', '式大将', '幽兰黛尔', '常九爷', '帕朵菲莉丝', '希儿', '布洛妮娅', '左然', '宵宫', '安柏', '姬子', '妮露', '女士', '奥拉夫', '奥兹', '失落迷迭', '天穹游侠', '天叔', '天元骑英', '大肉丸', '大慈树王', '夜兰', '多莉', '夏彦', '埃洛伊', '坎蒂丝', '哲平', '可莉', '卡萝尔', '卡莲', '博士', '北斗', '刻晴', '凯瑟琳', '凯亚', '凝光', '八重霞', '八重神子', '八重樱', '元素女孩-琪亚娜', '优菈', '伏特加女孩', '伊甸', '伊利亚斯', '人之律者', '五郎', '云墨丹心'
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