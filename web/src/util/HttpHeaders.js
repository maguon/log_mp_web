/*class HttpHeaders {
    constructor() {
        this.headers  = {
            "Content-Type": "application/json;charset=UTF-8"
        }
        this.formHeaders = {
            "Content-Type": "multipart/form-data"
        }
        this.set=(key,value)=>{

            this.headers[key]=value;
            this.formHeaders[key] =value;
        }
    }
}


export let new HttpHeaders();*/

let headers  = {
    "Content-Type": "application/json;charset=UTF-8"
}
let formHeaders = {
    "Content-Type": "multipart/form-data"
}
export const getHeaders =()=>{
    return headers;
}


export const getFormHeaders =()=>{
    return formHeaders;
}

export  const set =(key,value) =>{
    headers[key]=value;
    formHeaders[key] =value;
}






