# cloud-music

这个项目主要是为了练手，因为之前是在学校的一个工作室里面负责前端项目的维护，但是由于团队的组长好像不太相信我们这些低年级的人的技术(我也不懂为什么...大神不也是从菜鸟慢慢成长的吗？)。这就导致一直没什么机会真正的从头到尾来编写一个像样的项目，所以就想写一个项目练手，刚好看到有现成的后台(主要是因为这个我才写这个播放器，不然就去写个博客了...)。其实这是我第二次写的，因为在第一次写到一半时，发现自己写得特别烂(虽然现在这个也很烂)，很多该拆分出来的组件没有拆分，导致后面如果要加东西的话，就感觉有种牵一发而动全身的感觉，就是很难受。所以后面就看了一下别人的开源项目，自己再写出来了这个项目。

## 后台数据

使用的是一个开源后台数据： [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)。不过跟登录权限有关的接口都不太稳定，不知道是不是我自己的问题。

在 centOS7 中部署，使用用nginx + pm2 + node运行

先安装 NodeJS，配置好环境，把 pm2 也装了，再配 nginx。 

如果你也是在阿里云部署的话，记得将安全组的端口打开，还有设置服务器的防火墙，不然端口访问不了。

## vue项目
可以先将项目 clone 下来
```
$ git clone https://github.com/ziho00/ziho-cloud-music
$ cd ziho-cloud-music
$ npm install
```
然后启动项目
```
$ npm run serve
```
[预览地址](http://116.62.70.150/player/)

项目的 webpack 也是自己配的，没有用 cli ，但是 vue-cli 是真的香，开发的话感觉还是直接用 vue-cli 会方便很多。在开发过程中还是学到了挺多的，因为遇到了很多问题，看了很多文档，很多文章才一一解决，再回看直接的代码，感觉太真实了.....一言难尽啊。

项目内容：

![Vue.js 打造的移动端音乐播发器](http://116.62.70.150/static/image/cloudMusic.png "Vue.js 打造的移动端音乐播发器")

还有很多模块都可以做但目前还没做的。不过有的是因为后台的数据接口不稳定，...特别是用户相关的接口。如果后台获取数据的项目后期不维护了，时间一长有的接口可能就访问不了了。





