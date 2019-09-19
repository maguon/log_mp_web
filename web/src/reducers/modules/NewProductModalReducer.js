import {handleActions} from 'redux-actions';
import {NewProductModalActionType} from '../../actionTypes';

const initialState = {
    // 商品信息 - 商品id
    newProductId: '',
    // 商品信息 - 商品名称
    productName: '',
    // 商品信息 - 数量
    quantity: '',
    // 商品信息 - 城市
    city: null,
    // 商品信息 - 生产日期
    productionDate: '',
    // 商品信息 - 开售日期
    startSaleDate: '',
    // 商品信息 - 开售时间
    startSaleTime: '',
    // 商品信息 - 销售类型
    productSaleType: null,
    // 商品信息 - 定金
    earnestMoney: 0,
    // 商品信息 - 指导价
    originalPrice: '',
    // 商品信息 - 实际售价
    actualPrice: ''
};

export default handleActions({
    [NewProductModalActionType.setNewProductId]: (state, action) => {
        return {
            ...state,
            newProductId: action.payload
        }
    },
    [NewProductModalActionType.setProductName]: (state, action) => {
        return {
            ...state,
            productName: action.payload
        }
    },
    [NewProductModalActionType.setQuantity]: (state, action) => {
        return {
            ...state,
            quantity: action.payload
        }
    },
    [NewProductModalActionType.setProductCity]: (state, action) => {
        return {
            ...state,
            city: action.payload
        }
    },
    [NewProductModalActionType.setProductionDate]: (state, action) => {
        return {
            ...state,
            productionDate: action.payload
        }
    },
    [NewProductModalActionType.setStartSaleDate]: (state, action) => {
        return {
            ...state,
            startSaleDate: action.payload
        }
    },
    [NewProductModalActionType.setStartSaleTime]: (state, action) => {
        return {
            ...state,
            startSaleTime: action.payload
        }
    },
    [NewProductModalActionType.setProductSaleType]: (state, action) => {
        return {
            ...state,
            productSaleType: action.payload
        }
    },
    [NewProductModalActionType.setEarnestMoney]: (state, action) => {
        return {
            ...state,
            earnestMoney: action.payload
        }
    },
    [NewProductModalActionType.setOriginalPrice]: (state, action) => {
        return {
            ...state,
            originalPrice: action.payload
        }
    },
    [NewProductModalActionType.setActualPrice]: (state, action) => {
        return {
            ...state,
            actualPrice: action.payload
        }
    }
}, initialState)