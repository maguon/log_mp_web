import store from 'store2';

export const  getSessionItem = (key)=>{
    return store.session(key)
}

export const setSessionItem = (key,value) => {
    store.session(key,value)
}

export const  getLocalItem = (key)=>{
    return store.local(key)
}

export const setLocalItem = (key,value) => {
    let itemObj = {};
    itemObj[key]=value;
    store.local(itemObj)
}

export const removeLocalItem =(key) => {
    store.remove(key)
}