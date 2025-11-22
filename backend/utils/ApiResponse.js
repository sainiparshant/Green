class ApiResponse{
    constructor(statusCode,message, success="true",data){
        this.statusCode = statusCode,
        this.success = success,
        this.message = message,
        this.data=data
    }
}

export { ApiResponse }