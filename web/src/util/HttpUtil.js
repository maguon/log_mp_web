
const httpHeaders = require( './HttpHeaders');

const simpleFetch = (method,url,params) =>{
    $("#preload").show();
    let options  ={
        method: method,
        headers: httpHeaders.getHeaders()
    };
    if('GET' != method){
        options.body = JSON.stringify(params)
    }
    return fetch('http://'+url, options).then((response) => {
        $("#preload").hide();

        // http 正常处理，则返回response，否则进入catch 处理
        if (response.ok) {
            return response.json();
        } else {
            throw new Error();
        }
    }).catch(function (error) {
        $("#preload").hide();
        swal('服务器内部错误!', '', 'error');
        return error;
    });
};

export const httpGet = (url)=> {
    return simpleFetch('GET',url,{});
};
export const httpPost = (url, params) => {
    return simpleFetch('POST',url,params)
};
export const httpPut = (url, params) => {
    return simpleFetch('PUT',url,params)
};
export const httpDelete = (url, params) => {
    return simpleFetch('DELETE',url,params)
};

export const httpAsyncGet = (url,callback) => {
    fetch('http://'+url, {
        method: 'GET',
        headers: httpHeaders.headers
    }).then((response) => {
            let json = response.json()
            return json
        }
    ).then((result)=>{
        callback(null,result);
    }).catch((error)=>{
        callback(error,null);
    })
};

export const httpAsyncPost = (url, params,callback) => {
    //console.log(httpHeaders.headers);
    fetch('http://'+url, {
        method: 'POST',
        headers: httpHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => {
        let json = response.json()
        return json;
    }).then((result)=>{
        callback(null,result);
    }).catch((error)=>{
        callback(error,null);
    })
};

