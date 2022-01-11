import api from "../../api/request.js"

//导入验证js
import WxValidate from "../../utils/WxValidate";
import md5 from "../../miniprogram_npm/md5/index.js"

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: "",
		password: "",
		// 授权码
		authorize: "",
		action: "regist"
	},


	//调用注册验证函数
	register(e) {
		const params = e.detail.value
		//校验表单
		if (!this.WxValidate.checkForm(params)) {
			const error = this.WxValidate.errorList[0]
			this.showModal(error)
			return false
		}
		//授权码===密码(通过MD5加密存入数据库)
		if (md5(e.detail.value.authorize) === md5(e.detail.value.password)) {
			wx.showLoading({
				title: '注册中,请稍后..',
			})
			// 成功后发请求
			api.post("/userServelet", {
				data: {
					username: e.detail.value.username,
					password: md5(e.detail.value.password),
					action: e.detail.value.action,
					authorize: e.detail.value.authorize
				},
			}).then(res => {
				if (res) {
					// 判断用户是否存在
					if (res.exis) {
						wx.showToast({
							title: '用户名已经存在',
							icon: 'error',
							duration: 700,
						})
						return false
					}
					if (res.state) {
						wx.hideLoading()
						wx.showModal({
							title: '注册成功',
							content: '是否跳转到服务页面',
							success(res) {
								if (res.confirm) {
									wx.navigateTo({
										url: '../simpleDemo/simple'
									})
									// 开启加密存储
									wx.setStorageSync("username", e.detail.value.username, true)
									wx.setStorageSync("password", md5(e.detail.value.password),
										true)
								} else if (res.cancel) {
									wx.navigateTo({
										url: '../login/login'
									})
								}
							}
						})

					} else {
						wx.showToast({
							title: '注册失败',
							icon: 'error',
							duration: 700,
						})
					}
					console.log(res.state);
				}
			}).catch(err => {
				wx.showToast({
					title: err.message,
					icon: 'none'
				})
			})
		} else {
			wx.showToast({
				title: "授权码不正确",
				icon: 'none'
			})
		}

	},


	//重置表单回调
	formReset(e) {
		this.setData({
			action: "regist"
		})
	},


	//验证函数
	initValidate() {
		const rules = {
			username: {
				required: true,
				minlength: 2
			},
			ispassword: {

				required: true,
				minlength: 6
			},
			authorize: {
				required: true,
			},
			password: {
				equalTo: "ispassword",
				required: true,
				minlength: 6
			},

		}
		const messages = {
			username: {
				required: '请填写用户名',
				minlength: '请输入正确的用户名'
			},
			password: {
				required: '请填写确认密码',
				tel: '请填写正确的密码',
				equalTo: '两次输入的密码不一致'
			},
			ispassword: {
				required: '请填写密码',
				tel: '请填写正确的密码'
			},
			authorize: {
				required: '请填写授权码',
				tel: '请填写正确的授权码'
			},
		}
		this.WxValidate = new WxValidate(rules, messages)
	},
	//报错
	showModal(error) {
		wx.showModal({
			content: error.msg,
			showCancel: false,
		})
	},



	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		this.initValidate() //验证规则函数
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
