/**
 * 模糊查询 
 * 
 */
function getLike(bmob, table, attr, val, callback) {
  var test = [];
  var query = bmob.Query(table);
  query.equalTo('show', "==", true)
  query.find().then(results => {
    var i;
    for (i = 0; i < results.length; i++) {
      if (results[i][attr].indexOf(val) >= 0) {
        console.log(results[i][attr])
        console.log(val)
        console.log(results[i][attr].indexOf(val))
        test[test.length] = results[i];
      };
    }
    callback(test)
  })
}
/**
 * 移动
 */
function move(e,callback){
  var screenHeight, screenWidth;
  wx.getSystemInfo({
    success: function (res) {
      screenHeight= res.windowHeight
      screenWidth= res.windowWidth
    }
  })
  var touchs = e.touches[0];
  var pageX = touchs.clientX;
  var pageY = touchs.clientY;
  if (pageX < 0) return;
  if (pageX > screenWidth - 40) return;
  if (screenHeight - pageY <= 30) return;
  if (pageY <= 30) return;
  // var x = screenWidth - pageX - 20;
  // var y = screenHeight - pageY - 30;
  getApp().globalData.top = pageY;
  getApp().globalData.left=pageX;
  callback(pageX,pageY)
}


module.exports = {
  getLike: getLike,
  move: move
}

