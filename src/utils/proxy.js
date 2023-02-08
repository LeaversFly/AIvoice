import { setParams } from './index.js'

export const handle = {
    get: function (target, key, receiver) {
        // console.log('获取属性：' + key)
        // console.log('获取值：' + target[key])
        return Reflect.get(...arguments)
    },
    set: function (target, key, value, receiver) {
        // console.log('设置值：' + value)
        setParams()
        return Reflect.set(...arguments)
    }
}