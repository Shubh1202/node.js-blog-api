const { httpStatusCode } = require("../helper/httpStatusCode")
class ApiResponse {
    constructor(message = null, data = null, pageNo = null, perPageData = null) {
        this.status = "success"
        this.message = message

        if (data) this.data = data
        if (pageNo) this.pageNo = pageNo
        if (perPageData) this.perPageData = perPageData
    }
}

module.exports = ApiResponse