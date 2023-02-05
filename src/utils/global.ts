import { message } from 'antd'

// effect 执行错误或 subscription 通过 done 主动抛错时触发，可用于管理全局出错状态。
const onError = (e) => {
  message.error(e.message, /* duration */ 3)
}

// 在 action 被 dispatch 时触发，用于注册 redux 中间件。支持函数或函数数组格式。
const onAction = (e) => {
  console.log('onAction:' + e)
}

//state 改变时触发，可用于同步 state 到 localStorage，服务器端等。
const onStateChange = (e) => {
  console.log('onStateChange:' + e)
}
// 封装 reducer 执行。比如借助 redux-undo 实现 redo/undo ：
const onReducer = (e) => {
  console.log('onReducer:' + e)
}
// 封装 effect 执行。比如 dva-loading 基于此实现了自动处理 loading 状态。
const onEffect = (e) => {
  console.log('onEffect:' + e)
}
// 指定额外的 reducer，比如 redux-form 需要指定额外的 form reducer：
const extraReducers = (e) => {
  console.log('extraReducers:' + e)
}
// 指定额外的 StoreEnhancer ，比如结合 redux-persist 的使用：
const extraEnhancers = (e) => {
  console.log('extraEnhancers:' + e)
}

export default {
  // history,
  // initialState,指定初始数据，优先级高于 model 中的 state，默认是 {}
  onError,
  onAction,
  onStateChange,
  onReducer,
  onEffect,
  // onHmr,  热替换相关
  extraReducers,
  extraEnhancers,
}
