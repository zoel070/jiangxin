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
        itemWidth: 320,
        itemHeight: 157,
        paddingOffset: 20,
        num: 0,
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
        let wishBoard = document.getElementById('wish-board-container');
        this.onEventLister(wishBoard, 'mousedown', 'wish-card-bg', this.handleMouseDown);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);

        let wishButton = document.getElementsByClassName('wish-button')[0];
        wishButton.addEventListener('click', this.newCard);

        let closeButton = document.getElementsByClassName('wish-card-close')
        for (let i = 0; i < closeButton.length; i++) {
            closeButton[i].addEventListener('click', this.closeCard)
        }

        window.addEventListener('unload', this.saveCard)

    },
    saveCard: function () {
        let datas = PAGE.data.defaultDatas
        let datasStr = JSON.stringify(datas);
        localStorage.setItem('datas', datasStr)
    },
    closeCard: function (e) {
        let len = document.getElementsByClassName('wish-card-bg').length
        if (len == 1) {
            return
        }
        PAGE.data.defaultDatas = PAGE.data.defaultDatas.filter(item => item.id != e.target.parentNode.dataset.id)
        console.log(PAGE.data.defaultDatas)
        e.target.parentNode.remove()
    },
    newCard: function (e) {
        let input = document.getElementsByClassName('wish-input')[0]
        let value = input.value.trim()
        if (!value) {
            return
        }
        let obj = { name: value }
        PAGE.addCart(obj)                    //这里出了问题，这里给obj加了编号，但是并没把obj给到page
        console.log(obj, 1111)      //这样给page的就带编号了
        PAGE.data.defaultDatas.push(obj)           //你给page的只是带name的，没带编号
        input.value = ""
    },
    onEventLister: function (parentNode, action, childClassName, callback) {
        parentNode.addEventListener(action, function (e) {
            e.target.className == childClassName && callback(e);
        })
    },
    handleMouseDown: function (e) {
        let item = e.target;
        console.log(item.dataset.id, 'down')
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
            let wishBoard = document.getElementById('wish-board-container');
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
        let datas = localStorage.getItem('datas');
        datas = JSON.parse(datas) || [];
        PAGE.data.defaultDatas = datas;
        PAGE.data.defaultDatas.forEach(data => PAGE.addCart(data));
    },
    addCart: function (data) {
        let wishBoard = document.getElementById('wish-board-container');
        let wishCardBg = document.getElementsByClassName('wish-card-bg')[0].cloneNode(true);
        let num = PAGE.data.num++;
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
          background-color:${backgroundColor};
          left:${randomLeft}px;`;
        data["id"] = num;
        wishCardBg.children[1].innerText = data.name;
        wishCardBg.setAttribute('style', styleStr);
        wishCardBg.setAttribute('data-id', num);
        wishBoard.appendChild(wishCardBg);
        wishCardBg.children[2].addEventListener('click', PAGE.closeCard)
    },
    randomBetween: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

PAGE.init();


// 必须带编号，才能知道谁是谁。而且编号是id，不是index。要用同一个id来关联dom一个元素和page一项数据。一个叫id，一个叫data - id。
// 1.每次添加数据，page编号 + 1，给到page新项和dom新元素。
// 2.每次删除数据，删除跟dom元素同一编号的page项。
// 2.开机才set一次，拿最新的page数据来呈现。因为我这里不用切换待办已办全部状态，不需要经常刷新。
// 3.每次关闭页面都得储存最新的page。
// 4.每次打开页面都得获得最新的page，给page每一项编个新号，给dom每一个编个新号。并记录编了多少个号。



// 1.看下todo是怎么让page数据有序的。

