<template>
    <div :class="classs" :style="styles">
        <img class="dhc-image" ref="imageBox" loading="lazy">
    </div>
</template>

<script>
export default {
    name: 'Vimage',
    props: {
        width: {
            type: [Number, String],
            default: 100
        },
        height: {
            type: [Number, String],
            default: 100
        },
        background: {
            type: String,
            default: "#f1f1f1"
        },
        src: {
            type: String,
            default: ""
        },
        radius: {
            type: [Number, String],
            default: -1
        },
        block: {
            type: Boolean,
            default: false
        },
        //类型：normal、slight、round
        type: {
            type: String,
            default: "normal"
        },
        //是否启用懒加载
        lazyLoad: {
            type: Boolean,
            default: true
        },
        //延迟懒加载时间
        lazyLoadTime: {
            type: Number,
            default: 100
        },
        //hover时是否启用动画
        hoverAnimation: {
            type: Boolean,
            default: false
        },
        //是否启用阴影
        boxshadow: {
            type: [Boolean, String],
            default: false
        },
    },
    data(){
        return {
            selfsrc: null,
            selferror: false,
            selfbackground: ''
        }
    },
    computed: {
        classs: function(){
            return {
                'dhc-vue-image' : true,
                'type-normal' : this.type == 'normal',
                'type-slight' : this.type == 'slight',
                'type-round' : this.type == 'round',
                'v-i-block' : this.block,
                'v-i-hoveram' : this.hoverAnimation,
                'v-i-shadow' : this.boxshadow
            }
        },
        styles: function(){
            return {
                width: this.isNumber(this.width) ? this.width + 'px' : this.width,
                height: this.isNumber(this.height) ? this.height + 'px' : this.height,
                background: this.selfbackground || this.background,
                borderRadius: (this.isNumber(this.radius) && this.radius > -1) 
                        ? (this.radius + 'px') 
                        : this.radius,
                boxShadow: typeof this.boxshadow === 'string' 
                        ? this.boxshadow 
                        : ''
            }
        }
    },
    mounted(){
        
        //不启用懒加载，直接加载
        if(!this.lazyLoad){
            this.loadImage();
        }
        // 懒加载 之 IntersectionObserver
        else if(window.IntersectionObserver){
            this.loadType= 1;
            this.useIntersectionObserver();
        }
        // 懒加载 之 兼容写法: 移动端
        else if("ontouchstart" in window){
            this.loadType= 2;
            this.useTouchObserver();
            this.listenerCall();
        }
        // 懒加载 之 兼容写法: pc
        else{
            this.loadType= 3;
            this.useScrollObserver();
            this.listenerCall();
        }
    },
    beforeDestroy(){
        this.offListener();
    },
    methods: {
        isNumber(v){
            return parseFloat(v) == v;
        },
        //读取资源
        loadImage(){
            this.timeout= setTimeout(()=>{

                let image= new window.Image();
                image.onload= ()=> {
                    this.selfbackground= 'none';
                    this.selfsrc= this.src;
                    this.$refs.imageBox.src = this.src;
                    this.offListener();
                };
                image.onerror= ()=> {
                    this.selferror= true;
                    this.offListener();
                };
                image.src= this.src;

                clearTimeout(this.timeout);
                this.timeout= null;

            }, this.lazyLoadTime);
        },
        //优先使用的实验性方法
        useIntersectionObserver(){
            this.io = new window.IntersectionObserver(
                entries => {
                    if(entries[0].isIntersecting) this.loadImage();
                }
            );
            this.io.observe(this.$refs.imageBox);
        },
        //touch监听
        useTouchObserver(){
            document.body.addEventListener("touchmove", this.listenerCall())
            document.body.addEventListener("mousewheel", this.listenerCall())
        },
        //scroll或mousewheel监听
        useScrollObserver(){
            document.body.addEventListener("mousewheel", this.listenerCall())
            document.body.addEventListener("scroll", this.listenerCall())
        },
        //兼容写法的监听处理函数
        listenerCall(){
            //节流函数
            //return throttle(()=>{

                if( this.$data.selfsrc || this.selferror ) return this.offListener();

                // 缓存避免下方反复取值而反复重绘
                let rect= this.$refs.imageBox.getBoundingClientRect();

                if( rect.top <= window.innerHeight ||
                    rect.left <= window.innerWidth
                ){
                    this.loadImage();
                }

            //}, 300)
        },
        //释放监听
        offListener(){
            //console.log(this.state._src, "释放")
            switch(this.loadType){

                case 1 :
                this.io.unobserve(this.$refs.imageBox);
                this.io.disconnect();
                break;

                case 2 :
                document.body.removeEventListener("touchmove", this.listenerCall())
                document.body.removeEventListener("mousewheel", this.listenerCall())
                break;

                case 3 :
                document.body.removeEventListener("mousewheel", this.listenerCall())
                document.body.removeEventListener("scroll", this.listenerCall())

            }
        }

    }

}
</script>

<style >
    .dhc-vue-image{
        display: inline-block;
        overflow: hidden;
    }
    .v-i-shadow{
        box-shadow: 0 5px 15px rgba(0,0,0,.3);
    }
    .v-i-hoveram>img{
        transition: transform 300ms ease-in-out;
        transform: scale(1);
    }
    .v-i-hoveram>img:hover{
        cursor: pointer;
        transform: scale(1.2);
        transition-duration: 500ms;
    }
    .type-normal{
        border-radius: none;
    }
    .type-slight{
        border-radius: 8px;
    }
    .type-round{
        border-radius: 100%;
    }
    .v-i-block{
        display: block;
    }
    .dhc-image{
        width: inherit;
        height: inherit;
    }
</style>
