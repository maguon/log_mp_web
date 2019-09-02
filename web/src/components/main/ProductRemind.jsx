import React from 'react';
import Select from 'react-select';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {ProductRemindActionType} from '../../actionTypes';
import {EditProductRemindModal} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const productRemindAction = require('../../actions/main/ProductRemindAction');
const editProductRemindModalAction = require('../../actions/modules/EditProductRemindModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class ProductRemind extends React.Component {

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
            this.props.changeConditionProduct(null);
            this.props.setConditionNickname('');
            this.props.changeConditionProductSaleStatus(null);
        }
        this.props.initConditionData();
        this.props.getProductRemindList();
    }

    /**
     * 更新 检索条件：用户昵称
     */
    changeConditionNickname = (event) => {
        this.props.setConditionNickname(event.target.value);
    };

    /**
     * 查询商品提醒列表
     */
    queryProductList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getProductRemindList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.productRemindReducer.start - (this.props.productRemindReducer.size - 1));
        this.props.getProductRemindList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.productRemindReducer.start + (this.props.productRemindReducer.size - 1));
        this.props.getProductRemindList();
    };

    render() {
        const {productRemindReducer, commonReducer, changeConditionProduct, changeConditionProductSaleStatus, showProductRemindModalData} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">商品提醒</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        {/* 查询条件：商品编号 */}
                        <div className="input-field col s4">
                            <Select
                                options={commonReducer.productList}
                                onChange={changeConditionProduct}
                                value={productRemindReducer.conditionProduct}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">商品名称</label>
                        </div>

                        <Input s={4} label="用户昵称" value={productRemindReducer.conditionNickname} onChange={this.changeConditionNickname}/>

                        {/* 查询条件：商品状态 */}
                        <div className="input-field col s4">
                            <Select
                                options={sysConst.PRODUCT_SALE_STATUS}
                                onChange={changeConditionProductSaleStatus}
                                value={productRemindReducer.conditionProductSaleStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">商品状态</label>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryProductList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                    <EditProductRemindModal/>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <div className="divider custom-divider"/>
                        <table className="bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>提醒编号</th>
                                <th>商品名称</th>
                                <th>用户ID</th>
                                <th>昵称</th>
                                <th>手机</th>
                                <th>指导价 (万元)</th>
                                <th>实际售价 (万元)</th>
                                <th>设置时间</th>
                                <th className="center">商品状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productRemindReducer.productRemindArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.commodity_name}</td>
                                        <td>{item.user_id}</td>
                                        <td>{item.user_name}</td>
                                        <td>{item.phone}</td>
                                        <td>{formatUtil.formatNumber(item.original_price/10000,2)}</td>
                                        <td>{formatUtil.formatNumber(item.actual_price/10000,2)}</td>
                                        <td>{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.PRODUCT_SALE_STATUS, item.status)}</td>
                                        <td className="operation center">
                                            {item.reminders_status === sysConst.PRODUCT_REMIND_FLAG[0].value &&
                                            <button type="button" className="btn list-pink-btn margin-right10 btn-height24 fz14" onClick={() => {showProductRemindModalData(item.id, '')}}>进行提醒</button>}
                                            {item.reminders_status === sysConst.PRODUCT_REMIND_FLAG[1].value &&
                                            <button type="button" className="btn list-pink-border-btn margin-right10 btn-height24 fz14" onClick={() => {showProductRemindModalData(item.id, item.remarks)}}>修改提醒</button>}
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            { productRemindReducer.productRemindArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="10">暂无数据</td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {productRemindReducer.start > 0 && productRemindReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {productRemindReducer.dataSize >= productRemindReducer.size &&
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
        productRemindReducer: state.ProductRemindReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    initConditionData: () => {
        // 取得商品列表
        dispatch(commonAction.getProductList());
    },
    getProductRemindList: () => {
        // 取得商品提醒列表
        dispatch(productRemindAction.getProductRemindList());
    },
    setStartNumber: (start) => {
        dispatch(ProductRemindActionType.setStartNumber(start))
    },
    changeConditionProduct: (value) => {
        dispatch(ProductRemindActionType.setConditionProduct(value))
    },
    setConditionNickname: (value) => {
        dispatch(ProductRemindActionType.setConditionNickname(value))
    },
    changeConditionProductSaleStatus: (value) => {
        dispatch(ProductRemindActionType.setConditionProductSaleStatus(value))
    },
    showProductRemindModalData: (id, remark) => {
        dispatch(editProductRemindModalAction.initEditProductRemindModal(id, remark));
        $('#editProductRemindModal').modal('open');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductRemind)