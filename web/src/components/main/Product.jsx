import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {ProductActionType} from '../../actionTypes';
import {NewProductModal} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const productAction = require('../../actions/main/ProductAction');
const newProductModalAction = require('../../actions/modules/NewProductModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class Product extends React.Component {

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
            this.props.changeConditionCity(null);
            this.props.changeConditionSaleType(null);
            this.props.changeConditionProductSaleStatus(null);
        }
        this.props.initConditionData();
        this.props.getProductList();
    }

    /**
     * 查询商品列表
     */
    queryProductList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getProductList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.productReducer.start - (this.props.productReducer.size - 1));
        this.props.getProductList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.productReducer.start + (this.props.productReducer.size - 1));
        this.props.getProductList();
    };

    /**
     * 显示 新增商品
     */
    showNewProductModal = () => {
        this.props.initNewProductModalData();
        $('#newProductModal').modal('open');
    };

    render() {
        const {productReducer, commonReducer, changeConditionSaleType, changeConditionProductSaleStatus, changeConditionProduct, changeConditionCity, changeShowStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">商品管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">
                        {/* 查询条件：商品编号 */}
                        <div className="input-field col s3">
                            <Select
                                options={commonReducer.productList}
                                onChange={changeConditionProduct}
                                value={productReducer.conditionProduct}
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
                                value={productReducer.conditionCity}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">城市</label>
                        </div>

                        {/* 查询条件：销售类型 */}
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.PRODUCT_SALE_TYPE}
                                onChange={changeConditionSaleType}
                                value={productReducer.conditionSaleType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">销售类型</label>
                        </div>

                        {/* 查询条件：状态 */}
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.PRODUCT_SALE_STATUS}
                                onChange={changeConditionProductSaleStatus}
                                value={productReducer.conditionProductSaleStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">状态</label>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryProductList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn add-btn" onClick={this.showNewProductModal}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                    <NewProductModal/>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <div className="divider custom-divider"/>
                        <table className="bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>商品编号</th>
                                <th>商品名称</th>
                                <th>生产日期</th>
                                <th>城市</th>
                                <th className="center">销售类型</th>
                                <th>指导价 (万元)</th>
                                <th>实际售价 (万元)</th>
                                <th>定金 (元)</th>
                                <th>库存</th>
                                <th>售出</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productReducer.productArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.commodity_name}</td>
                                        <td>{item.production_date}</td>
                                        <td>{item.city_name}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.PRODUCT_SALE_TYPE, item.type)}</td>
                                        <td>{formatUtil.formatNumber(item.original_price/10000,2)}</td>
                                        <td>{formatUtil.formatNumber(item.actual_price/10000,2)}</td>
                                        <td>{formatUtil.formatNumber(item.earnest_money)}</td>
                                        <td>{formatUtil.formatNumber(item.quantity)}</td>
                                        <td>{formatUtil.formatNumber(item.saled_quantity)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.PRODUCT_SALE_STATUS, item.status)}</td>
                                        <td className="operation center">
                                            <span className="switch">
                                                <label>
                                                  <input type="checkbox" checked={item.show_status === sysConst.SALE_STATUS[0].value} onClick={() => {changeShowStatus(item.id, item.show_status)}}/>
                                                  <span className="lever"/>
                                                </label>
                                            </span>
                                            <Link to={{pathname: '/product/' + item.id}}>
                                                <i className="mdi mdi-table-search light-blue-text"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            { productReducer.productArray.length === 0 &&
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
                            {productReducer.start > 0 && productReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {productReducer.dataSize >= productReducer.size &&
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
        productReducer: state.ProductReducer,
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
    getProductList: () => {
        // 取得商品列表
        dispatch(productAction.getProductList());
    },
    setStartNumber: (start) => {
        dispatch(ProductActionType.setStartNumber(start))
    },
    changeConditionProduct: (value) => {
        dispatch(ProductActionType.setConditionProduct(value))
    },
    changeConditionCity: (value) => {
        dispatch(ProductActionType.setConditionCity(value))
    },
    changeConditionSaleType: (value) => {
        dispatch(ProductActionType.setConditionSaleType(value))
    },
    changeConditionProductSaleStatus: (value) => {
        dispatch(ProductActionType.setConditionProductSaleStatus(value))
    },
    changeShowStatus: (id, status) => {
        dispatch(productAction.changeProductShowStatus(id, status))
    },
    initNewProductModalData: () => {
        dispatch(newProductModalAction.initNewProductModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Product)