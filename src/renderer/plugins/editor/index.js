/**
 * Created by 9i
 * @Date 2018/1/18
 */
'use strict'
import editor from './core'

if (typeof window !== 'undefined') {
  window.cEditor = editor
}

if (typeof module !== 'undefined' && module.exports) {
  exports = module.exports = editor
}

export default editor
