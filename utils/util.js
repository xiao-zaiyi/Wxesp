const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}


// Array.prototype.remove = function(dx) {
// 	if (isNaN(dx) || dx > this.length) {
// 		return false;
// 	}
// 	for (var i = 0, n = 0; i < this.length; i++) {
// 		if (this[i] != this[dx]) {
// 			this[n++] = this[i]
// 		}
// 	}
// 	this.length -= 1
// }

module.exports = {
	formatTime: formatTime
}
