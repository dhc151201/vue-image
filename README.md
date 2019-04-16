# vue-image 
## 自动识别pc/移动端，优先使用性能优越的IntersectionObserver，向下兼容，并积极跟进谷歌推进的loading=‘lazy’

 - 注册
```
 import Vimage from './puglin/vue.image.js'
 Vue.use(Vimage)
 ```

 - 使用
```
<Vimage width="200" height="200px" src="http://img3.imgtn.bdimg.com/it/u=3826705575,3384897964&fm=11&gp=0.jpg"></Vimage>
```

### 可配属性
<br>
 - width ： [Number, String] 默认100
 <br>
 - height ： [Number, String] 默认100
 <br>
 - background：String 默认#f1f1f1
 <br>
 - src：资源地址 默认''
 <br>
 - lazyLoad： 是否懒加载 默认true
 <br>
 - lazyLoadTime：延迟懒加载时间（单位ms） 默认100
 <br>

