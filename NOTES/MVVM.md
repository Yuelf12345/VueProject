# VUE 数据驱动 组件化
## MVVM 模式原理(Observe Dep Watcher)  https://v2.cn.vuejs.org/images/data.png
[Vue 运行机制](./images/MVVM.png)

## 原理
Vue数据响应式是通过数据劫持结合发布订阅模式实现的，核心的方法是利用Object.defineProperty()方法将data中的数据设置为getter和setter形式，当读取数据时就会触发get方法，修改数据时触发set方法，这时候我们在set方法里去实现DOM元素更新视图。

## 实现 Observer Dep Watcher
```HTML
<div>{{name}}</div>
```
```javascript
new Vue({
    data(){
        return {
                name:'张三'，
                info:{
                    age:18,
                    gender:'男'
                }
            }
    }
})
function observe(value) {
    Object.keys(value).forEach((key) => defineReactive(value, key, value[key]))
}
function defineReactive(obj,key,val){
    Object.defineProperty(obj,key,val){
        enumerable: true,//可枚举
        configurable: true,//可配置
        get:()=>{
            return val
        },
        set:(newVal)=>{
            val = newVal
            update()//更新视图    
        }
    }
}
```
### 响应式数据 Observer
在new Vue()后，Vue会调用_init函数进行初始化，这时会调用Observer函数通过Object.keys()方法获取到键名(name,info 如果值为object还要递归获取到age,gender。vue3中使用了es6的proxyAPI对数据进行处理)再利用Object.defineProperty()方法设置getter和setter属性。读取数据时触发get，设置数据时触发set去修改视图。此时我们修改name时，就会触发update()重新渲染视图，同样修改age时也会触发update()，但是视图并没有用到age值，这样没有意义的更新视图就会消耗性能。所以Vue利用Dep去进行依赖收集。


### 依赖收集
我们什么时候去收集依赖？
首先我们需要了解Vue的生命周期 beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed[Vue 生命周期示意图](./images/LifeCycle.png)
这里面我们可以看到在created阶段就能够获取到data中的数据并能够进行修改，所以我们发送请求时通常会在该阶段。但是该阶段并不能判断data里哪些数据页面用到了，哪些没有用到。我们知道要渲染出真实的DOM，需要先产生render函数，而我们在调用render函数的时候，会有 _s()方法来获取data上的变量，从而会触发get方法，所以在beforeMount生命周期时，我们就可以只获取在页面中用到的变量了;同时Vue会通过new Watcher生成一个渲染Watcher，它会在页面渲染的过程中访问每个数据对象的 getter 属性，从而进行依赖的收集(Watcher拿小本本记下页面用到的数据)。

```JavaScript
    get: ()=>{
        if (Dep.target) {
             /*Watcher对象存在全局的Dep.target中*/
            dep.addSub(Dep.target);
        }
    },
    set:newVal=> {
        /*只有之前addSub中的函数才会触发*/
        dep.notify();
    }
```
### 依赖收集类 Dep
其实Dep就是一个发布者，可以订阅多个观察者，依赖收集之后Deps中会存在一个或多个Watcher对象，在数据变更的时候通知所有的Watcher。

```JavaScript
class Dep {
    constructor () {
        this.id = uid++;
        this.subs = [];
    }
    // 收集依赖 收集Watcher
    addSub (sub: Watcher) {
        this.subs.push(sub)
    }
    // 派发更新 通知Watcher去更新视图
    notify () {
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}
Dep.target = null
/*依赖收集完需要将Dep.target设为null，防止后面重复添加依赖。*/
```
### 观察者 Watcher
依赖收集以后Watcher对象会被保存在Deps中，数据变动的时候会由Dep通知Watcher实例，然后由Watcher实例回调进行视图的更新。

```JavaScript
class Watcher{
    constructor(){
        /*在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集*/
        Dep.target = this;
    },
     update () {
        // 更新视图
    }
}
```

# 总结
Vue初始化时会调用Observer，通过Object.defineProperty()为data数据设置getter和setter属性，获取数据触发get()，更新数据触发set()，在beforeMount阶段，调用render函数准备渲染页面时，我们能够获取到该页面data上的变量,这时触发get()，同时new一个Watcher实例(主要是将模板与数据建立联系)并将Watcher添加到依赖Dep的subs中进行依赖收集。当某个数据修改后会触发set()，调用Dep的notify()方法去通知subs里的所有Watcher执行update()更新视图。
Vue更新视图是异步的，所有可能出现数据更新后视图未更新的情况，这时需要调用Vue的nextTick方法强制视图更新。