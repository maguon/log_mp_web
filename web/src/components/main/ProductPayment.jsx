import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {ProductPaymentActionType} from '../../actionTypes';

const productPaymentAction = require('../../actions/main/ProductPaymentAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class ProductPayment extends React.Component {

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
            this.props.setConditionNo('');
            this.props.setConditionOrderId('');
            this.props.changeConditionPaymentType(null);
            this.props.changeConditionPaymentStatus(null);
        }
        this.props.getProductPaymentList();
    }

    /**
     * 更新 检索条件：编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：订单编号
     */
    changeConditionOrderId = (event) => {
        this.props.setConditionOrderId(event.target.value);
    };

    /**
     * 查询商品支付列表
     */
    queryProductPaymentList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getProductPaymentList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.productPaymentReducer.start - (this.props.productPaymentReducer.size - 1));
        this.props.getProductPaymentList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.productPaymentReducer.start + (this.props.productPaymentReducer.size - 1));
        this.props.getProductPaymentList();
    };

    render() {
        const {productPaymentReducer, changeConditionPaymentType,changeConditionPaymentStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">商品支付</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        <Input s={3} label="支付编号" value={productPaymentReducer.conditionNo} onChange={this.changeConditionNo}/>
                        <Input s={3} label="订单编号" value={productPaymentReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.PRODUCT_ORDER_PAYMENT_TYPE}
                                onChange={changeConditionPaymentType}
                                value={productPaymentReducer.conditionPaymentType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">支付类型</label>
                        </div>
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.PRODUCT_PAYMENT_FLAG}
                                onChange={changeConditionPaymentStatus}
                                value={productPaymentReducer.conditionPaymentStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">支付状态</label>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryProductPaymentList}>
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
                                <th>支付编号</th>
                                <th>订单编号</th>
                                <th>支付类型</th>
                                <th>支付金额 (元)</th>
                                <th>用户ID</th>
                                <th>昵称</th>
                                <th className="center">支付时间</th>
                                <th className="center">支付状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productPaymentReducer.productPaymentArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.product_order_id}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.PRODUCT_ORDER_PAYMENT_TYPE, item.type)}</td>
                                        <td>{formatUtil.formatNumber(item.total_fee)}</td>
                                        <td>{item.user_id}</td>
                                        <td>{item.user_name}</td>
                                        <td className="center">{formatUtil.getDateTime(item.payment_time)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.PRODUCT_PAYMENT_FLAG,item.status)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/product_payment/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            {productPaymentReducer.productPaymentArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="9">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {productPaymentReducer.start > 0 && productPaymentReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {productPaymentReducer.dataSize >= productPaymentReducer.size &&
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
        productPaymentReducer: state.ProductPaymentReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getProductPaymentList: () => {
        dispatch(productPaymentAction.getProductPaymentList())
    },
    setStartNumber: (start) => {
        dispatch(ProductPaymentActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(ProductPaymentActionType.setConditionNo(value))
    },
    setConditionOrderId: (value) => {
        dispatch(ProductPaymentActionType.setConditionOrderId(value))
    },
    changeConditionPaymentType: (value) => {
        dispatch(ProductPaymentActionType.setConditionPaymentType(value))
    },
    changeConditionPaymentStatus: (value) => {
        dispatch(ProductPaymentActionType.setConditionPaymentStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPayment)