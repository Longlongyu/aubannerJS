# aubannerJS
aubannerJS 是一个简单、轻量的轮播图插件。


他具有以下优点：
### 1.方便
你不需要定义和引入css样式，aubannerJS已经为你准备好了。

### 2.轻量
原生JavaScript书写，不依赖其他插件，压缩后大小也仅有5k。

### 3.简单
使用简单方式简单，可以看以下例子：

HTML部分写上代码
``` html
<div id="aubannerJS">
  <div aubanner-banner>
    <img aubanner-img src="src/img/demo-1.jpeg">
    <img aubanner-img src="src/img/demo-2.jpeg">
    <img aubanner-img src="src/img/demo-3.jpeg">
    <img aubanner-img src="src/img/demo-4.jpeg">
  </div>
  <!-- 你可以将aubanner-nav为空来使用自定义样式，选中的样式为.aubanner-select -->
  <div aubanner-nav="normal">
    <div aubanner-btn></div>
    <div aubanner-btn></div>
    <div aubanner-btn></div>
    <div aubanner-btn></div>
  </div>
  <!-- 你可以将aubanner-pre为空来使用自定义样式 -->
  <div aubanner-pre="normal">
    <div aubanner-left></div>
    <div aubanner-right></div>
  </div>
</div>
```

引入aubannerJS
``` html
<script src="build/aubanner.min.js"></script>
<script type="text/javascript">
  aubanner("#aubannerJS", {
    // 如果单独设置一项，则另一项会百分比缩放
    width : 960 * 1.3,
    // 每多少ms进行一次动画
    delay : 5000,
    // animation
    time  : '1s',
    timing: 'ease',
    // 默认为 none, 可选效果有:
    // 左滑动 left, 右滑动 right
    anim  : 'left'
  });
</script>
```
