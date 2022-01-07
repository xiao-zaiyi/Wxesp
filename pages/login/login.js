// pages/login/login.js

import netapi from "../../api/api.js"
import api from "../../api/request.js"
import md5 from "../../miniprogram_npm/md5/index.js"


//导入验证js
import WxValidate from "../../utils/WxValidate";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: wx.getStorageSync("username"),
		password: "",
		action: "login"

	},

	login(e) {
		const params = e.detail.value
		//校验表单
		if (!this.WxValidate.checkForm(params)) {
			const error = this.WxValidate.errorList[0]
			this.showModal(error)
			return false
		}
		wx.showLoading({
			title: '登录中',
			mask: true
		})
		api.post("/userServelet", {
			data: {
				username: e.detail.value.username,
				password: md5(e.detail.value.password),
				action: e.detail.value.action
			},
		}).then(res => {
			if (res) {
				// 判断用户是否存在
				if (!res.exis) {
					wx.showToast({
						title: '用户不存在',
						icon: 'error',
						duration: 700,
					})
					return false
				}

				if (res.state) {
					wx.hideToast()
					wx.redirectTo({
						url: '../simpleDemo/simple'
					})
					// 开启加密存储
					wx.setStorageSync("username", e.detail.value.username, true)
					wx.setStorageSync("password", md5(e.detail.value.password), true)
				} else {
					wx.showToast({
						title: '密码错误',
						icon: 'error',
						duration: 700,
					})
				}
			}
		}).catch(err => {
			wx.showToast({
				title: "登录失败",
				icon: 'none'
			})
		})
		

	},


	//重置表单回调
	formReset(e) {
		this.setData({
			action: "login"
		})
	},

	// 跳转注册页面
	register(e) {
		wx.redirectTo({
			url: '../register/register'
		})
	},


	//验证函数
	initValidate() {
		const rules = {
			username: {
				required: true,
				minlength: 1
			},
			password: {
				required: true,
				minlength: 1
			},
		}
		const messages = {
			username: {
				required: '请填写用户名',
				minlength: '请输入正确的用户名'
			},
			password: {
				required: '请填写确认密码',
				tel: '请填写正确的密码'
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
