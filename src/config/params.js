import roles from './roles.json'

export const params = {
    text: '',
    //最小值，最大值，步长，默认值
    sdp: [0.0, 1.0, 0.1, 0.4],
    // 人物太多使用文件导入
    speaker: roles,
    noise: [0.0, 1.5, 0.1, 0.6],
    noisew: [0.0, 1.5, 0.1, 0.8],
    length: [0.5, 2, 0.1, 1.0],
    language: ['ZH', 'EN', 'JP', 'mix'],
    format: ['wav', 'mp3', 'ogg']
}