/**
 * @author longlongyu
 * @name  aubannerJS 1.0.0
 * @description 一个简易的轮播图插件，
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *
 */

 (function(window) {
  
  function aubanner(elem, options) {
    // 初始化
    init.call(this, elem, options)
  }

  function clearChildrenNodes(parent, ele) {
    parent.innerHTML = '';
    parent.appendChild(ele);
  }

  function train(anim, ele, imgs, num) {
    // 清除所有节点;
    var node,
      parent = ele.parentNode,
      pos = parseInt(ele.getAttribute('aubanner-img')) - 1;
    clearChildrenNodes(parent, ele);
    for (var i = 0; i < num; i++) {
      if (anim == 'left' || anim == 'none') {
        if (pos === imgs.length - 1) {
          parent.appendChild(imgs[0]);
          node = imgs[0];
          pos = 0;
        } else {
          parent.appendChild(imgs[++pos]);
          node = imgs[pos];
        }
      } else if (anim == 'right') {
        if (pos === 0) {
          parent.insertBefore(imgs[imgs.length-1], imgs[pos]);
          node = imgs[imgs.length-1];
          pos = imgs.length-1;
        } else {
          parent.insertBefore(imgs[pos-1], imgs[pos--]);
          node = imgs[pos];
        }
      }
    }
    return node;
  }
  
  

  function init(elem, options) {
    var _this = this;

    this.elem = document.querySelector(elem);
    this.options = options;
    this.banner = this.elem.querySelector('[aubanner-banner]');
    this.imgs = this.banner.querySelectorAll('[aubanner-img]');
    this.nav = this.elem.querySelector('[aubanner-nav]');
    this.btns = this.nav.querySelectorAll('[aubanner-btn]');
    this.pre = this.elem.querySelector('[aubanner-pre]');
    this.left = this.pre.querySelector('[aubanner-left]');
    this.right = this.pre.querySelector('[aubanner-right]');
    this.curr = this.imgs[0];
    this.select = this.btns[0];
    this.select.classList.add("aubanner-select");

    this.animat = function(anim, num) {
      _this.curr = train(anim, _this.curr, _this.imgs, num);
      if (_this.options.anim && _this.options.anim == 'none') {
        clearChildrenNodes(_this.curr.parentNode, _this.curr)
        setNavSelect(_this.curr.getAttribute('aubanner-img'));
        return;
      }
      if (anim == 'left') { // 左滑动
        resetTrans(25);
        _this.banner.style.left = 0;
        setTimeout(function() {
          _this.banner.style.transition = _this.bannertemp;
          setNavSelect(_this.curr.getAttribute('aubanner-img'));
          _this.banner.style.left =  -(_this.curr.width * num) + 'px';
        }, 25);
      } else if (anim == 'right') { // 右滑动
        resetTrans(25);
        _this.banner.style.left = -(_this.curr.width * num) + 'px';
        setTimeout(function() {
          setNavSelect(_this.curr.getAttribute('aubanner-img'));
          _this.banner.style.left = 0;
        }, 25);
      }

      function resetTrans(ms) { // 暂时关闭缓冲动画
          _this.banner.style.transition = '';
        setTimeout(function() {
          _this.banner.style.transition = _this.bannertemp;
        }, ms);
      }
      function setNavSelect(pos) {
        _this.btns.forEach(function(e) {
          e.classList.remove("aubanner-select");
          if (_this.nav.getAttribute('aubanner-nav') == 'normal') {
            e.style.backgroundColor = '';
            if(e.getAttribute('aubanner-btn') == pos){
              e.style.backgroundColor = '#fff';
              _this.select = e;
            }
          }
          if(e.getAttribute('aubanner-btn') == pos){
            e.classList.add("aubanner-select");
          }
        })
      }
    }

    { // 初始化anim配置
      var time = options.time ? options.time : '1s';
      var timing = options.timing ? options.timing : 'ease';
      var delay = options.delay ? options.delay : 5000;
      var anim = options.anim ? options.anim : 'none';
    }

    { // 初始化banner样式
      this.banner.style.position = 'relative';
    }
    { // 初始化banner图片，宽高在options中设置
      var imgs_count = 1; // 给图片队列进行排号的计数器
      this.imgs.forEach(function(e) {
        e.width = options.width ? options.width : e.width;
        e.height = options.height ? options.height : e.height;
        e.style.float = 'left';
        e.setAttribute('aubanner-img', imgs_count++);
      });
    }

    { // 初始化nav样式
      if (this.nav.getAttribute('aubanner-nav') === 'normal') {
        this.nav.style.width = '100%';
        this.nav.style.position = 'absolute';
        this.nav.style.bottom = 40 + 'px';
        this.nav.style.right = 0;
        this.nav.style.textAlign = 'center';
      }
    }
    { // 初始化nav按钮
      var btns_count = 1; // 给按钮队列进行排号的计数器
      this.btns.forEach(function(e) {
        e.setAttribute('aubanner-btn', btns_count++);
        if (_this.nav.getAttribute('aubanner-nav') === 'normal') {
          e.style.transition = 'all ' + time + ' ' + timing;
          e.style.width = '20px';
          e.style.height = '20px';
          e.style.display = 'inline-block';
          e.style.border = '2px solid #fff'
          e.style.borderRadius = '50%';
          e.style.cursor = 'pointer';
          if(e.getAttribute('aubanner-btn') == 1) {
            e.style.backgroundColor = '#fff';
          }
        }
        e.addEventListener('click', function navclick(event) {
          var ele = event.target,
              pos = parseInt(ele.getAttribute('aubanner-btn')),
              selectpos = parseInt(_this.select.getAttribute('aubanner-btn'));
          if (ele === _this.select) return;
          var result = 'none';
          if (anim === 'left' || anim === 'right' || anim === 'none') {
            if (pos < selectpos) {
              result = 'right';
            } else {
              result = 'left';
            }
          }
          _this.animat(result, Math.abs(selectpos - pos));

          setTimeout(reset,0);
        });
      });
    }

    { // 初始化left&&right按钮
      this.pre.querySelectorAll('[aubanner-left],[aubanner-right]')
      .forEach(function(e) {
        if (_this.pre.getAttribute('aubanner-pre') === 'normal') {
          e.style.width = _this.imgs[0].width / 6 + 'px';
          e.style.height = _this.imgs[0].height + 'px';
          e.style.display = 'inline-block';
          e.style.backgroundColor = '#333';
          e.style.opacity = '0';
          e.style.position = 'absolute';
          e.style.bottom = 0;
          e.style.boxShadow = '0 0 200px 200px #333';
          e.style.color = '#fff';
          e.style.textAlign = 'center';
          e.style.lineHeight = e.style.height;
          e.style.fontSize = '800%';
          e.style.cursor = 'pointer';
        }
        e.addEventListener('mouseover', function rightover(event) {
          e.style.transition = 'all ' + time + ' ' + timing;
          e.style.opacity = '0.5';
        });
        e.addEventListener('mouseout', function rightout(event) {
          e.style.opacity = '0';
        });
        
      });
      // right按钮
      this.right.style.left = 0;
      this.right.innerText = '<';
      this.right.addEventListener('click', function rightclick(event) {
        var result = 'none';
        if (anim === 'left' || anim === 'right' || anim === 'none') {
          result = 'right';
        }
        _this.animat(result, 1);
        setTimeout(reset, 0);
      });
      // left按钮
      this.left.style.right = 0;
      this.left.innerText = '>';
      this.left.addEventListener('click', function leftclick(event) {
        var result = 'none';
        if (anim === 'left' || anim === 'right' || anim === 'none') {
          result = 'left';
        }
        _this.animat(result, 1);
        setTimeout(reset, 0);
      });
    }

    { // 初始化main样式
      this.elem.style.width = this.imgs[0].width + 'px';
      this.elem.style.height = this.imgs[0].height + 'px';
      this.elem.style.overflow = 'hidden';
      this.elem.style.position = 'relative';
      this.elem.style.userSelect = 'none';
    }

    if (false) {

    } else {
      // 左右滑动样式
      { // 初始化banner样式
        this.banner.style.transition = 'left ' + time + ' ' + timing;
        this.banner.style.width = this.imgs[0].width * this.imgs.length + 'px';
        this.banner.style.left = 0;
        this.bannertemp = this.banner.style.transition;
      }
    }

    play(this, anim, delay);

    function reset() {
      clearInterval(_this.interval);
      play(_this, anim, delay);
    }
  }
  
  function play(banner, anim, delay) {
    banner.interval = setInterval(function() {
      if(anim === 'left' || anim === 'right' || anim === 'none')
        banner.animat(anim, 1);
    }, delay);
  }

  function create(elem, options) {
    return new aubanner(elem, options);
  }
  window.aubanner = create;
 })(window);