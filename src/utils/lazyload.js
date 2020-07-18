import {
  throttle
} from "./index"
export default function LazyLoad() {
  const lazyLoad = throttle(() => {
    // 获取所有 lazy 图片的 dom 
    let lazyImages = Array.from(document.querySelectorAll("img.lazy"))
    if(lazyImages.length === 0) {
      // window.removeEventListener("resize", lazyLoad)
      // window.removeEventListener("orientationchange", lazyLoad)
      return
    }

    for(let i = 0, l = lazyImages.length; i < l; i++) {
      if(isInViewport(lazyImages[i])){
        // 在视口范围内 加载图片 去掉 lazy class 
        lazyImages[i].src = lazyImages[i].dataset.src
        lazyImages[i].classList.remove("lazy")
      } else {
        // 找到不符合的就可以停止遍历了 因为后面的都不会符合
        break
      }
    }
  }, 300)
  
  // 防止没有滚动页面无刷新的情况
  let timer = setTimeout(() => {
    lazyLoad()
    clearTimeout(timer)
  }, 500)
  // document.addEventListener("resize", lazyLoad);
  // document.addEventListener("orientationchange", lazyLoad)
  return lazyLoad
}

function isInViewport(el) {
	// 元素顶部 距离 视口左上角 的距离top <= 窗口高度 （反例：元素在屏幕下方的情况）
  // 元素 display样式不为 none
  // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
  const notBelow = el.getBoundingClientRect().top <= window.innerHeight 
  const visable = getComputedStyle(el).display !== "none" 
	return notBelow && visable
}
