import {handleActions} from 'redux-actions';
import {ProductDetailActionType} from '../../actionTypes';

const initialState = {
    // 画面区分
    pageType: '',
    // 商品信息 - 商品基本信息(编辑画面用)
    productInfo: [],
    // 商品信息 - 新建商品id
    newProductId: '',

    // 商品信息 - 商品名称
    productName: '',
    // 商品信息 - 数量
    quantity: '',
    // 商品信息 - 城市
    city: {},

    // 商品信息 - 生产日期
    productionDate: '',
    // 商品信息 - 销售类型
    productSaleType: {},
    // 商品信息 - 定金
    earnestMoney: '',

    // 商品信息 - 指导价
    originalPrice: '',
    // 商品信息 - 实际售价
    actualPrice: '',

    // 商品图片
    productImg: '',

    // 商品介绍
    productDes: ''
};

export default handleActions({
    [ProductDetailActionType.setPageType]: (state, action) => {
        return {
            ...state,
            pageType: action.payload
        }
    },
    [ProductDetailActionType.getProductInfo]: (state, action) => {
        return {
            ...state,
            productInfo: action.payload
        }
    },
    [ProductDetailActionType.setNewProductId]: (state, action) => {
        return {
            ...state,
            newProductId: action.payload
        }
    },

    [ProductDetailActionType.setProductName]: (state, action) => {
        return {
            ...state,
            productName: action.payload
        }
    },
    [ProductDetailActionType.setQuantity]: (state, action) => {
        return {
            ...state,
            quantity: action.payload
        }
    },
    [ProductDetailActionType.setProductCity]: (state, action) => {
        return {
            ...state,
            city: action.payload
        }
    },

    [ProductDetailActionType.setProductionDate]: (state, action) => {
        return {
            ...state,
            productionDate: action.payload
        }
    },
    [ProductDetailActionType.setProductSaleType]: (state, action) => {
        return {
            ...state,
            productSaleType: action.payload
        }
    },
    [ProductDetailActionType.setEarnestMoney]: (state, action) => {
        return {
            ...state,
            earnestMoney: action.payload
        }
    },




    [ProductDetailActionType.setOriginalPrice]: (state, action) => {
        return {
            ...state,
            originalPrice: action.payload
        }
    },
    [ProductDetailActionType.setActualPrice]: (state, action) => {
        return {
            ...state,
            actualPrice: action.payload
        }
    },


    [ProductDetailActionType.setProductImg]: (state, action) => {
        return {
            ...state,
            productImg: action.payload
        }
    },
    [ProductDetailActionType.setProductDes]: (state, action) => {
        return {
            ...state,
            productDes: action.payload
        }
    }
}, initialState)