class Request {
	constructor(options = {}) {
		this.baseUrl = options.baseUrl || ''
		this.url = options.url || ''
		this.method = "GET"
		this.data = null
		this.header = options.header || {}
		this.beforeRequest = null
		this.afterRequest = null
	}
	get(url, data = {}) {
		this.method = 'GET',
			this.url = this.baseUrl + url
		this.data = data
		return this._()
	}
	post(url, data = {}) {
		this.method = "POST"
		this.url = this.baseUrl + url
		this.data = data;
		return this._();
	}
	delete(url, data = {}) {
		this.method = "DELETE"
		this.url = this.baseUrl + url
		this.data = data;
		return this._();
	}
	put(url, data = {}) {
		this.method = 'PUT',
			this.url = this.baseUrl + url
		this.data = data;
		return this._();
	}
	_() {
		// 清空header对象
		this.header = {};
		this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this);
		// console.log(this.url)
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.url,
				method: this.method,
				data: this.data,
				header: this.header,
				sslVerify: false,
				success: (res) => {
					resolve(res);
				},
				fail: (err) => { reject(err) },
				complete: (res) => {
					// console.log(res)
					this.afterRequest && typeof this.afterRequest === 'function' && this.afterRequest(res);
				}
			})
		})
	}
}

export const $http = new Request();