import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NewProductModalActionType} from "../../actionTypes";
import Select from "react-select";

const newProductModalAction = require('../../actions/modules/NewProductModalAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

/**
 * UI组件：新增商品 模块。
 */
class NewProductRecommendModal extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor() {
        super();
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        $('.modal').modal();
    }

    /**
     * 更新 商品信息：商品名称
     */
    changeProductName = (event, value) => {
        this.props.setProductName(value);
    };

    /**
     * 更新 商品信息：数量
     */
    changeQuantity = (event, value) => {
        this.props.setQuantity(value);
    };

    /**
     * 更新 商品信息：生产日期
     */
    changeProductionDate = (event, value) => {
        this.props.setProductionDate(value);
    };

    /**
     * 更新 商品信息：定金
     */
    changeEarnestMoney = (event, value) => {
        this.props.setEarnestMoney(value);
    };

    /**
     * 更新 商品信息：指导价
     */
    changeOriginalPrice = (event, value) => {
        this.props.setOriginalPrice(value);
    };

    /**
     * 更新 商品信息：实际售价
     */
    changeActualPrice = (event, value) => {
        this.props.setActualPrice(value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newProductModalReducer, commonReducer, changeProductCity, changeProductSaleType, closeModal, addProduct} = this.props;
        if (newProductModalReducer.newProductId !== '') {
            return <Redirect push to={{pathname: '/product/' + newProductModalReducer.newProductId}}/>;
        }
        return (
            <div id="newProductRecommendModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">新增微信推广</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    <div className="row margin-top40">
                        <Input s={8} label="名称" maxLength="50" value={newProductModalReducer.productName} onChange={this.changeProductName}/>
                        <Input s={4} label="数量" type="number" className="right-align fz16 red-font" value={newProductModalReducer.quantity} onChange={this.changeQuantity}/>
                    </div>

                    <div className="row">
                        {/* 生产日期 */}
                        <div className="input-field col s4 custom-input-field">
                            <Input s={12} label="生产日期" type='date' options={sysConst.DATE_PICKER_OPTION} value={newProductModalReducer.productionDate} onChange={this.changeProductionDate} />
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：所在城市 */}
                        <div className="input-field col s4">
                            <Select
                                options={commonReducer.cityList}
                                onChange={changeProductCity}
                                value={newProductModalReducer.city}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE_FOR_MODAL}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">城市</label>
                        </div>

                        {/* 销售类型 */}
                        <div className="input-field col s4">
                            <Select
                                options={sysConst.PRODUCT_SALE_TYPE}
                                onChange={changeProductSaleType}
                                value={newProductModalReducer.productSaleType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">销售类型</label>
                        </div>
                    </div>

                    <div className="row">
                        <Input s={4} label="指导价 (元)" type="number" className="right-align fz16 red-font" value={newProductModalReducer.originalPrice} onChange={this.changeOriginalPrice}/>
                        <Input s={4} label="实际售价 (元)" type="number" className="right-align fz16 red-font" value={newProductModalReducer.actualPrice} onChange={this.changeActualPrice}/>
                        {newProductModalReducer.productSaleType != null && newProductModalReducer.productSaleType.value === sysConst.PRODUCT_SALE_TYPE[1].value &&
                        <Input s={4} label="定金 (元)" type="number" className="right-align fz16 red-font" value={newProductModalReducer.earnestMoney} onChange={this.changeEarnestMoney}/>}
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={addProduct}>确定</button>
                </div>
            </div>
        );
    }
}

/**
 * 输入逻辑：外部的数据（即state对象）转换为 UI 组件的参数。
 */
const mapStateToProps = (state) => {
    return {
        newProductModalReducer: state.NewProductModalReducer,
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setProductName: (value) => {
        dispatch(NewProductModalActionType.setProductName(value))
    },
    setQuantity: (value) => {
        dispatch(NewProductModalActionType.setQuantity(value))
    },
    changeProductCity: (value) => {
        dispatch(NewProductModalActionType.setProductCity(value))
    },
    setProductionDate: (value) => {
        dispatch(NewProductModalActionType.setProductionDate(value))
    },
    changeProductSaleType: (value) => {
        dispatch(NewProductModalActionType.setProductSaleType(value))
    },
    setEarnestMoney: (value) => {
        dispatch(NewProductModalActionType.setEarnestMoney(value))
    },
    setOriginalPrice: (value) => {
        dispatch(NewProductModalActionType.setOriginalPrice(value))
    },
    setActualPrice: (value) => {
        dispatch(NewProductModalActionType.setActualPrice(value))
    },
    addProduct: () => {
        // 设置保存成功后的商品编号，默认值：空
        dispatch(NewProductModalActionType.setNewProductId(''));
        dispatch(newProductModalAction.addProduct());
    },
    closeModal: () => {
        $('#newProductRecommendModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProductRecommendModal);