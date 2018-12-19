export const getJsonValue = (original, key) => {
    let ret = '未知';
    for (let i = 0; i < original.length; i++) {
        if (original[i].value === key) {
            ret = original[i].label;
            break;
        }
    }
    return ret;
};
