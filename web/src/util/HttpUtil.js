
const httpHeaders = require( './HttpHeaders');

const simpleFetch = (method,url,params) =>{
    $("#preload").show();
    let options  ={
        method: method,
        headers: httpHeaders.getHeaders()
    }
    if('GET' != method){
        options.body = JSON.stringify(params)
    }
    return fetch('http://'+url, options).then((response) => {
        $("#preload").hide();
        let json = response.json();
        return json;
    }).catch(function (error) {
        $("#preload").hide();
        return error;
    });
}

export const httpGet = (url)=> {
    return simpleFetch('GET',url,{});
}
export const httpPost = (url, params) => {
    return simpleFetch('POST',url,params)
}
export const httpPut = (url, params) => {
    return simpleFetch('PUT',url,params)
}
export const httpDelete = (url, params) => {
    return simpleFetch('DELETE',url,params)
}

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
}

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
}

