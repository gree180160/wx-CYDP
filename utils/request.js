const app = getApp();
function postRequest(url, params, success, fail, complete) {
  var tokenValue = wx.getStorageSync('token');
  // if(!tokenValue) {
  //   tokenValue = storageToken();
  //   return;
  // }
  const postRequestTask = wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/json',
      'token': tokenValue
    },
    method: 'POST',
    success: function (res) {
      debugger
      if (res.data.code == 200) {
        success(res);
      } else if (res.code == 502) { //502 : token 失效
        wx.removeStorageSync('token');
        showMessage('token 失效')
      } else {
        showMessage(res.data.message);
      }

    },
    fail: function (res) {
      fail(res);
    },
    complete: function (res) {
      complete(res);
    }
  })
}

function getRequest(url, success, fail, complete) {
  var tokenValue = wx.getStorageSync('token');
  if (!tokenValue) {
    tokenValue = storageToken();
  }
  const postRequestTask = wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'token': tokenValue
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == 200) {
        success(res);
      } else if (res.code == 502) { //502 : token 失效
        wx.removeStorageSync('token');
        showMessage('token 失效')
      } else {
        showMessage(res.data.message);
      }
    },
    fail: function (res) {
      fail(res);
    },
    complete: function (res) {
      complete(res);
    }
  })
}
// 获取jscode
function getCode() {
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.setStorageSync('jsCode', res.code)
      } else {
        showMessage("获取code失败")
        return null;
      }
    },
    fail: function (res) {
      showMessage("获取code失败")
      return null;
    }
  })
}
// 获取nickname
function getNickName() {
  if (app.globalData.userInfo) {
    return app.globalData.userInfo.nickName;
  } else {
    wx.navigateTo({
      url: '/pages/useInfo/useInfo',
    })
  }
}

function storageToken() {
  var jsCodeValue = wx.getStorageSync('jsCode');
  if (!jsCodeValue) {
    jsCodeValue = getCode();
  }
  //获取nickName 和token
  var nickNameValue = app.globalData.userInfo.nickName;
  if (!nickNameValue) {
    nickNameValue = getNickName();
  }
}

function showMessage(message, duration) {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: duration ? duration : 1000
  })
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest,
  showMessage: showMessage,
  storageToken: storageToken
}