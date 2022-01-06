export default {
	login_api() {
		return wx.request({
			url: 'http://localhost:8080/wxEsp/userServelet', //仅为示例，并非真实的接口地址
			data: {
				x: 'cc',
				y: 'cc'
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			method: "GET",
			success(res) {
				return res
			},
			fail(err){
				return err
			}
		})
	}
}
