import mqtt from '../../utils/mqtt.js';

import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

import api from "../../api/request.js"
//连接的服务器域名，注意格式！！！
const host = 'wxs://xxxxxxxx/mqttxxx';

//导入验证js
import WxValidate from "../../utils/WxValidate";


Page({

	data: {
		client: "",
		//记录重连的次数
		reconnectCounts: 0,
		//连接状态
		connectState: false,
		//MQTT连接的配置
		options: {
			protocolVersion: 4, //MQTT连接协议版本
			clientId: 'WXaugust',
			clean: true,
			password: '13877899818.',
			username: 'admin',
			reconnectPeriod: 0, //1000毫秒，两次重新连接之间的间隔
			connectTimeout: 30 * 1000, //1000毫秒，两次重新连接之间的间隔
			resubscribe: false //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
		},
		//弹出层
		isShowConfirm: false,
		show: false,
		//开关
		checked: true,
		// 选中的主题
		subscriptionIng: "",
		// 订阅主题输入表单
		inputSubscriptionName: "",
		// 发送的消息
		message: "",
		topics: [{
				"name": "Door",
				"state": false,
			},
			{
				"name": "topik1",
				"state": false,
			},
			{
				"name": "topik2",
				"state": false,
			},
			{
				"name": "Topic0",
				"state": false,
			},
		],

	},

	//开关状态
	onChange(e) {
		if (this.data.connectState) {
			// 保证只有一个开关为开
			if (!this.data.topics[e.currentTarget.dataset.index].state) {
				for (let i = 0; i < this.data.topics.length; i++) {
					if (i === e.currentTarget.dataset.index) {
						//下标相等时改变开关状态.保证当前只有一个开关是打开
						this.data.topics[i].state = e.detail
						this.data.subscriptionIng = this.data.topics[i].name
					} else {
						this.data.topics[i].state = !e.detail
					}
				}
			} else {
				this.data.topics[e.currentTarget.dataset.index].state = e.detail
				// 清空主题
				this.data.subscriptionIng = ""
				// 取消订阅
				this.onClick_unSubOne(this.data.subscriptionIng)
			}
			// 需要手动对 checked 状态进行更新
			this.setData({
				[`topics`]: this.data.topics,
				subscriptionIng: this.data.subscriptionIng
			})

			if (this.data.subscriptionIng.trim().length === 0) {
				return false
			}
			// 订阅
			this.onClick_SubOne(this.data.subscriptionIng)
		} else {
			wx.showToast({
				title: '请先连接服务器',
				icon: 'none',
				duration: 1000
			})
		}
	},

	// 订阅输入框回调
	subscriptionForm(event) {
		// 表单数据绑定
		this.setData({
			inputSubscriptionName: event.detail
		})

	},
	// 发生信息内容
	messageForm(event) {
		// 表单数据绑定
		this.setData({
			message: event.detail
		})


	},


	// 订阅
	subscription(event) {
		if (this.data.inputSubscriptionName.trim().length === 0) {
			wx.showModal({
				content: "订阅主题不能为空",
				showCancel: false,
			})
			return false
		}
		this.data.topics.push({
			"name": `${this.data.inputSubscriptionName}`,
			"state": false,
		}, )

		this.setData({
			[`topics`]: this.data.topics,
			inputSubscriptionName: ''
		})
	},


	// 取消订阅按钮
	unSubscription(e) {
		if (e.currentTarget.dataset.index === 0) {
			this.data.topics.splice(e.currentTarget.dataset.index, e.currentTarget.dataset.index + 1)
		} else {
			this.data.topics.splice(e.currentTarget.dataset.index, e.currentTarget.dataset.index)
		}

		this.setData({
			[`topics`]: this.data.topics,
			subscriptionIng: ""
		})
	},

	//显示弹出层
	showPopup() {
		this.setData({
			show: true
		});
	},

	//关闭弹出层
	onClose() {
		this.setData({
			show: false
		});
	},

	onClick_connect: function() {
		if (!this.data.connectState) {
			wx.showLoading({
				title: '连接中',
			})
			var that = this;
			//开始连接
			this.data.client = mqtt.connect(host, this.data.options);
			this.data.client.on('connect', function(connack) {
				wx.showToast({
					title: '连接成功',
					duration: 500,
					complete: () => {
						that.setData({
							connectState: true
						})
						wx.hideLoading()
					}
				})
			})

			//服务器下发消息的回调
			that.data.client.on("message", function(topic, payload) {
				console.log(" 收到 topic:" + topic + " , payload :" + payload)
				wx.showModal({
					content: " 收到topic:[" + topic + "], payload :[" + payload + "]",
					showCancel: false,
				});
			})


			//服务器连接异常的回调
			that.data.client.on("error", function(error) {
				console.log(" 服务器 error 的回调" + error)

			})

			//服务器重连连接异常的回调
			that.data.client.on("reconnect", function() {
				console.log(" 服务器 reconnect的回调")
			})


			//服务器连接异常的回调
			that.data.client.on("offline", function(errr) {
				this.setData({
					connectState: false
				})
				console.log(" 服务器offline的回调")
			})

			that.data.client.on('close', function(connack) {
				that.data.client.removeOutgoingMessage()
				console.log(this.data)
				wx.showToast({
					title: '已断开连接.....',
					complete: () => {
						this.setData({
							connectState: false
						})

					}
				})
			})
		} else {
			wx.showToast({
				title: '已连接.....',
				complete: () => {
					this.setData({
						connectState: true
					})
				}
			})
		}

	},

	onClick_close: function() {
		try {
			if (this.data.client && this.data.client.connected && this.data.connectState) {
				this.data.client.end()
				wx.showToast({
					title: '关闭成功',
					complete: () => {
						this.setData({
							connectState: false
						})
					},
					duration: 500,
				})
			} else {
				wx.showToast({
					title: '还未连接.....',
					duration: 750,
					icon: "error"
				})
			}
		} catch (e) {
			//TODO handle the exception
			console.log(e);
		}

	},

	add_SubOne() {
		// 弹出输入框
		this.showPopup()
	},

	onClick_SubOne: function(topic) {

		if (this.data.client && this.data.client.connected && this.data.connectState) {
			//仅订阅单个主题
			this.data.client.subscribe(topic, function(err, granted) {
				if (!err) {
					wx.showToast({
						title: '订阅主题成功',
						duration: 500
					})
				} else {
					wx.showToast({
						title: '订阅主题失败',
						icon: 'fail',
						duration: 1000
					})
				}
			})
		} else {
			wx.showToast({
				title: '请先连接服务器',
				icon: 'none',
				duration: 1000
			})
		}
	},
	onClick_SubMany: function() {

		if (this.data.client && this.data.client.connected && this.data.connectState) {
			//仅订阅多个主题
			this.data.client.subscribe({
				'Topic1': {
					qos: 0
				},
				'Topic2': {
					qos: 1
				}
			}, function(err, granted) {
				if (!err) {
					wx.showToast({
						title: '订阅多主题成功',
						duration: 500
					})
				} else {
					wx.showToast({
						title: '订阅多主题失败',
						icon: 'error',
						duration: 1000
					})
				}
			})
		} else {
			wx.showToast({
				title: '请先连接服务器',
				icon: 'none',
				duration: 1000,

			})
		}


	},
	onClick_PubMsg: function() {

		// 判断主题是否打开
		if (!this.data.subscriptionIng) {
			wx.showToast({
				title: '请先订阅主题',
				icon: "error",
				duration: 500
			})
			return false
		}
		if (this.data.client && this.data.client.connected && this.data.connectState) {
			this.data.client.publish(this.data.subscriptionIng, this.data.message);

			wx.showToast({
				title: '发布成功',
				duration: 500
			})
		} else {
			wx.showToast({
				title: '请先连接服务器',
				icon: 'none',
				duration: 1000
			})
		}
	},
	onClick_unSubOne: function(topic) {
		if (this.data.client && this.data.client.connected && this.data.connectState) {
			this.data.client.unsubscribe(topic, (err) => {
				console.log(this.data.client);
			});
			wx.showToast({
				title: '取消成功',
				duration: 500
			})
		} else {
			wx.showToast({
				title: '请先连接服务器',
				icon: 'none',
				duration: 1000
			})
		}
	},
	onClick_unSubMany: function() {
		if (this.data.client && this.data.client.connected && this.data.connectState) {
			this.data.client.unsubscribe(['Topic1', 'Topic2']);
			wx.showToast({
				title: '取消成功',
				duration: 500
			})
		} else {
			wx.showToast({
				title: '请先连接服务器',
				icon: 'none',
				duration: 1000
			})
		}
	},


	//保存到主题数据库
	saveTopic() {
		api.post("/userServelet", {
			data: {
				topics: this.data.topics,
				action: "saveTopic",
				username: wx.getStorageSync('username')
			},
		}).then(res => {

		}).catch(err => {
			wx.showToast({
				title: "保存数据失败",
				icon: 'none'
			})
		})


	},

	// 用户页面数据加载
	userShow() {
		api.post("/userServelet", {
			data: {
				username: wx.getStorageSync('username'),
				password: wx.getStorageSync('password'),
				action: "userShow",
			},
		}).then(res => {
			if (res) {
				this.setData({
					topics: res.topics
				})
			}
		}).catch(err => {
			wx.showToast({
				title: "数据加载失败",
				icon: 'none'
			})
		})

	},

	onLoad: function() {
		wx.setNavigationBarTitle({
			title: '504集团服务端'
		})
		this.initValidate()
		// 页面加载
		this.userShow()

	},

	onUnload: function() {
		if (this.data.client && this.data.client.connected && this.data.connectState) {
			this.data.client.end()
		}

		// 把所有订阅状态设置为false
		for (let item of this.data.topics) {
			item.state = false
		}

		// 保存当前订阅的话题到数据库
		this.saveTopic()
	},

	//验证函数
	initValidate() {
		const rules = {
			inputSub: {
				required: true,
				minlength: 1
			},
		}
		const messages = {
			inputSub: {
				required: '订阅名称不能为空',
				minlength: '请输入订阅名称'
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



})
