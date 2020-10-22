import { RefObject, useEffect } from "react";


/**
 * @description 点击节点外的内容执行handler
 * @param ref 监听的dom
 * @param handler 点击外部dom的处理，如关闭
 */

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside