# cloud-music

[预览地址](http://116.62.70.150/player/)

建议配合谷歌 [chrome 浏览器](https://www.google.cn/chrome/index.html) 使用：

+ 打开浏览器按 F12
+ 点击图片中红框的按钮，模拟移动设备
![模拟移动设备](http://116.62.70.150/static/image/模拟移动设备.jpg)

## 为什么会写这个项目

这个项目主要是为了练手，因为之前是在学校的一个工作室里面负责前端项目的维护，但是由于团队的组长好像不太相信我们这些低年级的人的技术(我也不懂为什么...大神不也是从菜鸟慢慢成长的吗？)。这就导致一直没什么机会真正的从头到尾来编写一个像样的项目，所以就想写一个项目练手，刚好看到有现成的后台(主要是因为这个我才写这个播放器，不然就去写个博客了...)。其实这是我第二次写的，因为在第一次写到一半时，发现自己写得特别烂(虽然现在这个也很烂)，很多该拆分出来的组件没有拆分，导致后面如果要加东西的话，就感觉有种牵一发而动全身的感觉，就是很难受。所以后面就看了一下别人的开源项目，自己再写出来了这个项目。

## 后台数据

使用的是一个开源后台数据： [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)。不过跟登录权限有关的接口都不太稳定，不知道是不是我自己的问题。

在 centOS7 中部署，使用用nginx + pm2 + node运行

先安装 NodeJS，配置好环境，把 pm2 也装了，再配 nginx。 

如果你也是在阿里云部署的话，记得将安全组的端口打开，还有设置服务器的防火墙，不然端口访问不了。

## 前端部分 (Vue.js)
可以先将项目 clone 下来
```
$ git clone https://github.com/ziho00/cloud-music
$ cd cloud-music
$ npm install
```
然后启动项目
```
$ npm run dev
```
项目的 webpack 也是自己配的，没有用 cli ，但是 vue-cli 是真的香，开发的话感觉还是直接用 vue-cli 会方便很多。在开发过程中还是学到了挺多的，因为遇到了很多问题，看了很多文档，很多文章才一一解决，再回看之前的代码，感觉太真实了....菜得不行。

项目内容：

![Vue.js 打造的移动端音乐播发器](http://116.62.70.150/static/image/cloudMusic.png "Vue.js 打造的移动端音乐播发器")

还有很多模块都可以做但目前还没做的。不过有的是因为后台的数据接口不稳定，...特别是用户相关的接口。如果后台获取数据的项目后期不维护了，时间一长有的接口可能就访问不了了。

优化手段：
+ 图片懒加载
	自己写了一个图片懒加载的组件和配套的懒加载方法(加了节流),其实就是添加 `scroll` 事件，获取所有的class为 `lazy` 图片，即使用了懒加载组件的图片，判断是否在渲染范围内( `lazy` 元素顶部 距离 视口左上角 的距离 top <= 窗口高度 )，由于组件和方法可以改进的地方都很多，所有优化后感觉不是特别明显，只是图片较多的页面不会像之前一样在进入的时候会卡一下。

+ 路由懒加载并将可能会同时用到的页面打包到一个文件
	![路由懒加载](http://116.62.70.150/static/image/player_README7.jpg)
	在 `webpack` 配置的 `output` 中 设置 `filename` 为 `filename: [name].[hash].js` 或 `filename: [name].js` 即可,加 `[hash]` 是为了避免因为设备缓存的原因，加载不到最新的文件。
+ 使用 CDN 来加载 JS 库
	
	原因是我发现每次首屏都要3秒以上，想到是学生服务器，感觉问题就是出在带宽上面了。所以尝试了一下使用外部 `CDN` 会不会有所改善。主要就是将原本项目中一些通过 `import` 方法引入的库，换成了通过 `script` 标签的方式来加载。
	![使用外部 CDN](http://116.62.70.150/static/image/player_README2.jpg)
	使用外部的 `CDN` 后，打包体积从 1.88 MB 缩小到了 631 KB，首屏时间也有了很明显的改善
	+ 未使用 CDN
		DCL(DOMContentLoaded Event):
		![DOMContentLoaded Event](http://116.62.70.150/static/image/player_README5.png)
		L(Onload Event):
		![Onload Event](http://116.62.70.150/static/image/player_README6.png)
		这还是我挑的比较快的一次了....
	+ 使用了外部 CDN
		DCL(DOMContentLoaded Event):
		![DOMContentLoaded Event](http://116.62.70.150/static/image/player_README3.png)
		L(Onload Event):
		![Onload Event](http://116.62.70.150/static/image/player_README4.png)

	可以看到：`DCL` 2758.8 ms => 609.5 ms | `L` 3853.2 ms => 790.8 ms，只能用可怕来形容了，也可以看到学生服务器的带宽是真的低...，没使用外部 `CDN` 的首屏时间居然是，使用了 `CDN` 的 4 ~ 5 倍。




