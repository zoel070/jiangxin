// 你可以初始化自己定义 10来条数据，随机放上去先。
// 然后用户点击评论的时候往下加。

// 1.每次都是克隆卡片，从data获取内容，替换内容，替换背景，随机生成位置。
// 2.初始化搞十张出来先。


// 1.获取输入值，存储到data
// 2.addCart一下。


let cardList = [{ name: '耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！' }, { name: '耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！' }, { name: '耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！' }, { name: '耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！' }, { name: '耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！' }, { name: '耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！' }];
let backgroundColors = ['#EAE7D5', '#D5D6EA', '#DBEAD5', '#EBD7D7'];
const PAGE = {
    data: {
        backgroundColors: backgroundColors,
        defaultDatas: cardList,
        itemWidth: 340,
        itemHeight: 170,
        paddingOffset: 10,
        zIndex: 0,
        item: null,
        itemOffsetTop: null,
        itemOffsetLeft: null,
        pageX: null,
        pageY: null,
        isLock: true,
    },
    init: function () {
        this.setDefaultData();
        this.bind();
    },
    bind: function () {
        let wishBoard = document.getElementById('wish-board');
        this.onEventLister(wishBoard, 'mousedown', 'wish-card', this.handleMouseDown);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        let wishButton = document.getElementsByClassName('wish-button')[0];
        wishButton.addEventListener('click', this.newCard);
    },
    newCard: function (e) {
        let input = document.getElementsByClassName('wish-input')[0]
        let value = input.value.trim()
        if (!value) {
            return
        }
        PAGE.data.defaultDatas.push({ name: value })
        PAGE.addCart(value)
    },
    onEventLister: function (parentNode, action, childClassName, callback) {
        parentNode.addEventListener(action, function (e) {
            e.target.className == childClassName && callback(e);
        })
    },
    handleMouseDown: function (e) {
        console.log(1);
        let item = e.target;
        item.style.zIndex = ++PAGE.data.zIndex;
        PAGE.data.itemOffsetTop = item.offsetTop;
        PAGE.data.itemOffsetLeft = item.offsetLeft;
        PAGE.data.pageX = e.pageX;
        PAGE.data.pageY = e.pageY;
        PAGE.data.item = item;
        PAGE.data.isLock = false;
    },
    handleMouseMove: function (e) {
        if (!PAGE.data.isLock) {
            let wishBoard = document.getElementById('wish-board');
            let containerWidth = wishBoard.offsetWidth;
            let containerHeight = wishBoard.offsetHeight;
            let itemWidth = PAGE.data.itemWidth;
            let itemHeight = PAGE.data.itemHeight;
            let paddingOffset = PAGE.data.paddingOffset;
            let maxWidth = containerWidth - itemWidth - paddingOffset;
            let maxHeight = containerHeight - itemHeight - paddingOffset;
            let translateX = e.pageX - PAGE.data.pageX + PAGE.data.itemOffsetLeft;
            let translateY = e.pageY - PAGE.data.pageY + PAGE.data.itemOffsetTop;
            translateX = translateX > maxWidth ? maxWidth : translateX;
            translateY = translateY > maxHeight ? maxHeight : translateY;
            translateX = translateX < paddingOffset ? paddingOffset : translateX;
            translateY = translateY < paddingOffset ? paddingOffset : translateY;
            PAGE.data.item.style.left = translateX + 'px';
            PAGE.data.item.style.top = translateY + 'px';
        }
    },
    handleMouseUp: function () {
        PAGE.data.isLock = true
    },
    setDefaultData: function () {
        PAGE.data.defaultDatas.forEach(data => PAGE.addCart(data.name));
    },
    addCart: function (name) {
        let wishBoard = document.getElementById('wish-board');
        let wishCard = document.getElementsByClassName('wish-card')[0].cloneNode(true);
        let zIndex = ++PAGE.data.zIndex;
        let backgroundColors = PAGE.data.backgroundColors;
        let backgroundColor = backgroundColors[zIndex % backgroundColors.length];
        let containerWidth = wishBoard.offsetWidth;
        let containerHeight = wishBoard.offsetHeight;
        let itemWidth = PAGE.data.itemWidth;
        let itemHeight = PAGE.data.itemHeight;
        let paddingOffset = PAGE.data.paddingOffset;
        let maxWidth = containerWidth - itemWidth - paddingOffset;
        let maxHeight = containerHeight - itemHeight - paddingOffset;
        let randomTop = PAGE.randomBetween(paddingOffset, maxHeight);
        let randomLeft = PAGE.randomBetween(paddingOffset, maxWidth);
        let styleStr = `
          z-index:${zIndex};
          top:${randomTop}px;
          left:${randomLeft}px;`;
        wishCard.children[0].children[2].children[1].innerText = name;
        wishCard.children[0].children[2].style.backgroundColor = backgroundColor;
        wishCard.setAttribute('style', styleStr);
        wishBoard.appendChild(wishCard);
    },
    randomBetween: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

PAGE.init();



