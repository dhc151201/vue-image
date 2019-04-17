# vue-image
### - 自动识别pc、移动端，
### - 支持懒加载，并积极跟进谷歌推进的loading=‘lazy’
### - 优先使用性能优越的IntersectionObserver，向下兼容

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
 * width ： [Number, String]   默认100
 <br><br>
 * height ： [Number, String]   默认100
 <br><br>
 * background： String   默认#f1f1f1
 <br><br>
 * src： String   资源地址 默认''
 <br><br>
 * lazyLoad： Boolean   是否懒加载 默认true
 <br><br>
 * lazyLoadTime： Number   延迟懒加载时间（单位ms） 默认100
 <br><br>
 * radius ： [Number, String]  自定义圆角  默认-1
 <br><br>
 * block： Boolean   是否块级 默认true
 <br><br>
 * type：  String   默认normal  可选项[ normal、slight、round ]
 <br><br>

