/*
	通过ID获取DOM节点对象
*/
function $(id) {
	return document.getElementById(id);
}

/*
	获取元素的样式值
*/
function getStyle(obj, sAttr) {
	if(obj.currentStyle) {
		return obj.currentStyle[sAttr];
	} else {
		return getComputedStyle(obj, false)[sAttr];
	}
}

/*
	多属性同时缓冲运动的函数
*/

function bufferMove(obj, target, fn) {
	// 清除老的定时器
	clearInterval(obj.iTimer);
	// 开启新的定时器
	obj.iTimer = setInterval(function () {
		// 假设所有的属性均已运动完毕
		var bBtn = true;
		// 遍历包含运动属性以及终点值的对象
		for(var sAttr in target) {
			// 获取当前值
			var iCur;
			if(sAttr === 'opacity') {
				iCur = parseFloat(getStyle(obj, sAttr)) * 100;
			} else {
				iCur = parseInt(getStyle(obj, sAttr));
			}

			// 计算速度
			var iSpeed = (target[sAttr] - iCur) / 8;

			// 辨别方向 取整
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			// 计算下一次的值
			var iNext = iCur + iSpeed;

			// 赋值
			if(sAttr === 'opacity') {
				obj.style[sAttr] = iNext / 100;
				obj.style.filter = 'alpha(opacity=' + iNext +')';
			} else {
				obj.style[sAttr] = iNext + 'px';
			}

			// 判断当前属性是否运动完毕
			if(iNext !== target[sAttr]) {
				bBtn = false;
			}
		}

		// 清除定时器
		if(bBtn === true) {
			clearInterval(obj.iTimer);
			if(fn) {
				fn();
			}
		}

	}, 50);
}