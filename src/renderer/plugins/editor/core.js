/**
 * Created by 9i
 * @Date 2018/1/18
 */
'use strict'
import Editor from './editor'
/**
 * canvas 编辑器对外接口
 */
const cEditor = {}
// 版本号
cEditor.version = '0.0.1'
// 编辑器实例集
cEditor.instances = {}
// 插件集
cEditor.plugins = {}
// 工具集
cEditor.utils = {}

/**
 * 提供一个方法获取/创建编辑器实例
 * @name getEditor
 * @params {string} id  -  放置编辑器的容器id, 如果容器下的编辑器已经存在，就直接返回
 * @params {object} opt  - 编辑器的可选参数
 * @example
 *  cEditor.getEditor('containerId',{onready:function(){//创建一个编辑器实例
 *      // do something
 *  }})
 *  cEditor.getEditor('containerId') //返回刚创建的实例
 *  @return {Editor}  返回刚创建的实例
 *
 */
cEditor.getEditor = function (id, opt) {
  let editor = cEditor.instances[id]
  if (!editor) {
    editor = cEditor.instances[id] = new Editor(opt)
    editor.render(id)
  }
  return editor
}
/**
 * 根据ID 销毁编辑器实例
 * @name getEditor
 * @params {string} id  -  放置编辑器的容器id, 如果容器下的编辑器已经存在，就直接返回
 * @params {object} opt  - 编辑器的可选参数
 * @example
 *  cEditor.delEditor('containerId') //返回刚创建的实例
 */
cEditor.delEditor = function (id) {
  let editor = cEditor.instances[id]
  if (editor) {
    editor.key && editor.destroy()
    delete cEditor.instances[id]
  }
}
export default cEditor
