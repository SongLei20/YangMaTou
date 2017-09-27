window.onload = function () {
	var
		oBox 		  = $('box'),
		oImgList	  = $('img-list'),
		oBtnDirection = $('btn-direction'),
		oLeftBtn 	  = $('left-btn'),
		oRightBtn 	  = $('right-btn'),
		oBtnList 	  = $('btn-list'),
		aBtnListA	  = Array.from(oBtnList.children),
		iIndex		  = 0, // 针对图片的下标
		iBtnIndex     = 0, // 针对按钮的下标
		iTimer		  = null;

	var PER_WIDTH = 1200;
	// 复制第一个LI添加到UL的最后面
	oImgList.innerHTML += oImgList.children[0].outerHTML;
	oImgList.style.width = PER_WIDTH * oImgList.children.length + 'px';

	// 鼠标进入 方向按钮显示
	oBox.onmouseenter = function () {
		clearInterval(iTimer);
		oBtnDirection.style.display = 'block';
	};
	// 鼠标离开 方向按钮隐藏
	oBox.onmouseleave = function () {
		oBtnDirection.style.display = 'none';
		autoMove();
	};

	// 给左侧按钮添加点击事件
	oLeftBtn.onclick = function () {
		iIndex--;
		if(iIndex < 0) {
			oImgList.style.left =  -(oImgList.children.length - 1) * PER_WIDTH+ 'px';
			iIndex = oImgList.children.length - 2;
		}
		bufferMove(oImgList, {left: - iIndex * PER_WIDTH});

		// 切换按钮
		iBtnIndex--;
		if(iBtnIndex < 0) {
			iBtnIndex = oImgList.children.length - 2;
		}
		aBtnListA.forEach(function(v){v.className = ''} );
		aBtnListA[iBtnIndex].className = 'active';
	};

	// 给右侧按钮添加点击事件
	oRightBtn.onclick = function () {
		iIndex++;

		if(iIndex === oImgList.children.length) {
			oImgList.style.left = 0;
			iIndex = 1;
		}
		bufferMove(oImgList, {left: - iIndex * PER_WIDTH});

		// 切换按钮
		iBtnIndex++;
		if(iBtnIndex === oImgList.children.length - 1) {
			iBtnIndex = 0;
		}
		aBtnListA.forEach(function(v){v.className = ''} );
		aBtnListA[iBtnIndex].className = 'active';
	};

	// 给按钮列表添加鼠标进入事件
	aBtnListA.forEach(function(v, k) {
		v.onmouseenter = function () {
			iIndex = k;

			bufferMove(oImgList, {left: - iIndex * PER_WIDTH});

			// 切换按钮
			iBtnIndex = k;
			aBtnListA.forEach(function(v){v.className = ''} );
			aBtnListA[iBtnIndex].className = 'active';
		};
	});

	// 自动轮播
	autoMove();

	// 自动轮播的函数
	function autoMove() {
		iTimer = setInterval(function () {
			iIndex++;

			if(iIndex === oImgList.children.length) {
				oImgList.style.left = 0;
				iIndex = 1;
			}
			bufferMove(oImgList, {left: - iIndex * PER_WIDTH});

			// 切换按钮
			iBtnIndex++;
			if(iBtnIndex === oImgList.children.length - 1) {
				iBtnIndex = 0;
			}
			aBtnListA.forEach(function(v){v.className = ''} );
			aBtnListA[iBtnIndex].className = 'active';
		}, 4000);
	}


};