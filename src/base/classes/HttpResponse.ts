import IHttpResponse from "../interfaces/IHttpResponse";

class HttpResponse implements IHttpResponse {
    status: number;
    message: string;
    content?: any;

    constructor(options: IHttpResponse) {
        this.status = options.status;
        this.message = options.message;
        this.content = options.content;
    }
}

export default HttpResponse;