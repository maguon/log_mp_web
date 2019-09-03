import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {ProductOrderActionType} from '../../actionTypes';

const productOrderAction = require('../../actions/main/ProductOrderAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class ProductOrder extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);
            this.props.setConditionId('');
            this.props.changeConditionProduct(null);
            this.props.changeConditionCity(null);
            this.props.changeConditionOrderStatus(null);
            this.props.setConditionUserId('');
            this.props.setConditionNickname('');
            this.props.setConditionPhone('');
            this.props.changeConditionPaymentStatus(null);
        }
        this.props.initConditionData();
        this.props.getProductOrderList();
    }

    /**
     * 更新 检索条件：订单编号
     */
    changeConditionId = (event) => {
        this.props.setConditionId(event.target.value);
    };

    /**
     * 更新 检索条件：用户ID
     */
    changeConditionUserId = (event) => {
        this.props.setConditionUserId(event.target.value);
    };

    /**
     * 更新 检索条件：昵称
     */
    changeConditionNickname = (event) => {
        this.props.setConditionNickname(event.target.value);
    };

    /**
     * 更新 检索条件：手机
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 查询商品订单列表
     */
    queryProductOrderList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getProductOrderList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.productOrderReducer.start - (this.props.productOrderReducer.size - 1));
        this.props.getProductOrderList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.productOrderReducer.start + (this.props.productOrderReducer.size - 1));
        this.props.getProductOrderList();
    };

    render() {
        const {
            productOrderReducer,
            commonReducer,
            changeConditionProduct,
            changeConditionCity,
            changeConditionOrderStatus,
            changeConditionPaymentStatus
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">商品订单</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：订单编号 */}
                            <Input s={3} label="订单编号" value={productOrderReducer.conditionId} onChange={this.changeConditionId}/>

                            {/* 查询条件：商品编号 */}
                            <div className="input-field col s3">
                                <Select
                                    options={commonReducer.productList}
                                    onChange={changeConditionProduct}
                                    value={productOrderReducer.conditionProduct}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                />
                                <label className="active">商品名称</label>
                            </div>

                            {/* 查询条件：城市 */}
                            <div className="input-field col s3">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionCity}
                                    value={productOrderReducer.conditionCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                />
                                <label className="active">城市</label>
                            </div>

                            {/* 查询条件：订单状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.PRODUCT_ORDER_STATUS}
                                    onChange={changeConditionOrderStatus}
                                    value={productOrderReducer.conditionOrderStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                />
                                <label className="active">订单状态</label>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            <Input s={3} label="用户ID" value={productOrderReducer.conditionUserId} onChange={this.changeConditionUserId}/>
                            <Input s={3} label="昵称" value={productOrderReducer.conditionNickname} onChange={this.changeConditionNickname}/>
                            <Input s={3} label="手机" value={productOrderReducer.conditionPhone} onChange={this.changeConditionPhone}/>

                            {/* 查询条件：支付状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.PRODUCT_PAYMENT_STATUS}
                                    onChange={changeConditionPaymentStatus}
                                    value={productOrderReducer.conditionPaymentStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                />
                                <label className="active">支付状态</label>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryProductOrderList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <table className="bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>订单编号</th>
                                <th className="ellipsis-td context-ellipsis">商品车名称</th>
                                <th>城市</th>
                                <th>销售类型</th>
                                <th>用户ID</th>
                                <th>昵称</th>
                                <th>手机</th>
                                <th className="right-align">已付/金额 (元)</th>
                                <th className="center">创建时间</th>
                                <th className="center">支付状态</th>
                                <th className="center">订单状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productOrderReducer.productOrderArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td className="ellipsis-td context-ellipsis">{item.commodity_name}</td>
                                        <td>{item.city_name}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.PRODUCT_SALE_TYPE,item.type)}</td>
                                        <td>{item.user_id}</td>
                                        <td>{item.user_name}</td>
                                        <td>{item.phone}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.payment_earnest_money)}/{formatUtil.formatNumber(item.earnest_money)}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.PRODUCT_PAYMENT_STATUS,item.payment_status)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.PRODUCT_ORDER_STATUS,item.status)}</td>
                                        <td className="operation right-align padding-right20">
                                            <Link to={{pathname: '/product_order/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            { productOrderReducer.productOrderArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="12">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {productOrderReducer.start > 0 && productOrderReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {productOrderReducer.dataSize >= productOrderReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let fromDetail = false;
    if (typeof ownProps.location.state !== 'undefined' && ownProps.location.state.fromDetail === true) {
        fromDetail = true;
    }
    return {
        productOrderReducer: state.ProductOrderReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    initConditionData: () => {
        // 取得城市列表
        dispatch(commonAction.getCityList());
        // 取得商品列表
        dispatch(commonAction.getProductList());
    },
    getProductOrderList: () => {
        dispatch(productOrderAction.getProductOrderList())
    },
    setStartNumber: (start) => {
        dispatch(ProductOrderActionType.setStartNumber(start))
    },
    setConditionId: (value) => {
        dispatch(ProductOrderActionType.setConditionId(value))
    },
    changeConditionProduct: (value) => {
        dispatch(ProductOrderActionType.setConditionProduct(value))
    },
    changeConditionCity: (value) => {
        dispatch(ProductOrderActionType.setConditionCity(value))
    },
    changeConditionOrderStatus: (value) => {
        dispatch(ProductOrderActionType.setConditionOrderStatus(value))
    },
    setConditionUserId: (value) => {
        dispatch(ProductOrderActionType.setConditionUserId(value))
    },
    setConditionNickname: (value) => {
        dispatch(ProductOrderActionType.setConditionNickname(value))
    },
    setConditionPhone: (value) => {
        dispatch(ProductOrderActionType.setConditionPhone(value))
    },
    changeConditionPaymentStatus: (value) => {
        dispatch(ProductOrderActionType.setConditionPaymentStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder)