import store from 'store2';

export const getSessionItem = (key) => {
    return store.session.get(key)
};

export const setSessionItem = (key, value) => {
    store.session.set(key, value, true)
};

export const removeSessionStore = (key) => {
    store.session.remove(key)
};

export const getLocalItem = (key) => {
    return store.local.get(key)
};

export const setLocalItem = (key, value) => {
    // store.local.set(key, value, true)
    let itemObj = {};
    itemObj[key] = value;
    store.local(itemObj)
};

export const removeLocalItem = (key) => {
    store.local.remove(key)
};