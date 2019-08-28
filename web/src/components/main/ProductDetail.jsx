import React from 'react';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {reduxForm} from "redux-form";
import {NewProductModalActionType, ProductDetailActionType} from '../../actionTypes';
import {fileHost} from "../../config/HostConfig";

const productDetailAction = require('../../actions/main/ProductDetailAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class ProductDetail extends React.Component {

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
        // 取得商品信息
        this.props.getProductInfo();
        $('ul.tabs').tabs();
        let viewer = new Viewer(document.getElementById('viewer'), {
            url: 'data-original'
        });
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
     * 更新 商品信息：商品介绍
     */
    changeProductDes = (value) => {
        this.props.setProductDes(value);
    };

    /**
     * 新建画面 跳转到 商品介绍TAB
     */
    // goNextPage = () => {
    //     $("ul.tabs li").removeClass("disabled");
    //     $('ul.tabs').tabs('select_tab', 'tab-desc');
    //     $("ul.tabs li").addClass("disabled");
    // };

    render() {
        const {productDetailReducer, commonReducer, changeProductCity, changeProductSaleType, saveProductInfo, changeProductStatus, saveProductDesc, handleSubmit} = this.props;

        // 商品图片地址
        let avatarUrl = "";
        if (productDetailReducer.productImg !== null && productDetailReducer.productImg !== '') {
            avatarUrl = "http://" + fileHost + "/api/image/" + productDetailReducer.productImg;
        } else {
            avatarUrl = "";
        }

        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/product', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">商品管理 - 商品详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* TAB 头部 */}
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s4"><a href="#tab-base" className="active">商品信息</a></li>
                            <li className="tab col s4"><a href="#tab-img">商品图片</a></li>
                            <li className="tab col s4"><a href="#tab-desc">商品介绍</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 商品信息TAB */}
                    <div id="tab-base" className="col s12">
                        <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                            {/* 商品信息：商品编号 上架时间 */}
                            {productDetailReducer.productInfo.length > 0 &&
                            <div className="row detail-box-header">
                                <div className="col s6">商品编号：{productDetailReducer.productInfo[0].id}</div>
                                {productDetailReducer.productInfo[0].show_status === sysConst.SALE_STATUS[0].value &&
                                <div className="col s6 fz14 right-align grey-text">上架时间：{formatUtil.getDateTime(productDetailReducer.productInfo[0].created_on)}</div>}
                                {productDetailReducer.productInfo[0].show_status === sysConst.SALE_STATUS[1].value &&
                                <div className="col s6 fz14 right-align grey-text">下架时间：{formatUtil.getDateTime(productDetailReducer.productInfo[0].updated_on)}</div>}
                            </div>}

                            {/* 商品信息：商品基本信息 */}
                            <div>
                                <div className="row margin-left20 margin-right20 margin-top40">
                                    <Input s={8} label="商品名称" maxLength="50" value={productDetailReducer.productName} onChange={this.changeProductName}/>
                                    <Input s={4} label="数量" type="number" className="right-align fz16 red-font" value={productDetailReducer.quantity} onChange={this.changeQuantity}/>
                                </div>

                                <div className="row margin-left20 margin-right20 margin-top20">
                                    {/* 生产日期 */}
                                    <div className="input-field col s4 custom-input-field">
                                        <Input s={12} label="生产日期" type='date' options={sysConst.DATE_PICKER_OPTION} value={productDetailReducer.productionDate} onChange={this.changeProductionDate} />
                                        <span className="mdi data-icon mdi-table-large"/>
                                    </div>

                                    {/* 查询条件：所在城市 */}
                                    <div className="input-field col s4">
                                        <Select
                                            options={commonReducer.cityList}
                                            onChange={changeProductCity}
                                            value={productDetailReducer.city}
                                            isSearchable={true}
                                            placeholder={"请选择"}
                                            styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
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
                                            value={productDetailReducer.productSaleType}
                                            isSearchable={false}
                                            placeholder={"请选择"}
                                            styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                            isClearable={false}
                                            backspaceRemovesValue={false}
                                        />
                                        <label className="active">销售类型</label>
                                    </div>
                                </div>

                                <div className="row margin-left20 margin-right20 margin-top20 margin-bottom40">
                                    <Input s={4} label="指导价（万元）" type="number" className="right-align fz16 red-font" value={productDetailReducer.originalPrice} onChange={this.changeOriginalPrice}/>
                                    <Input s={4} label="实际售价（万元）" type="number" className="right-align fz16 red-font" value={productDetailReducer.actualPrice} onChange={this.changeActualPrice}/>
                                    {productDetailReducer.productSaleType.value === sysConst.PRODUCT_SALE_TYPE[1].value &&
                                    <Input s={4} label="定金（元）" type="number" className="right-align fz16 red-font" value={productDetailReducer.earnestMoney} onChange={this.changeEarnestMoney}/>}
                                </div>
                            </div>
                        </div>

                        {/* 按钮 */}
                        {productDetailReducer.productInfo.length > 0 &&
                        <div className="col s12 right-align padding-right70">
                            {productDetailReducer.productInfo[0].status !== sysConst.PRODUCT_SALE_STATUS[0].value &&
                            <button type="button" className="btn orange-btn" onClick={changeProductStatus}>确认售罄</button>}
                            <button type="button" className="btn confirm-btn margin-left20" onClick={saveProductInfo}>保存</button>
                        </div>}
                    </div>

                    {/* TAB 2 : 商品图片TAB */}
                    <div id="tab-img" className="col s12">
                        <div className="row margin-top40 margin-left150 margin-right150">
                            <div className="col s6 padding-left150 padding-right150">
                                <div className="upload-img-box z-depth-1 detail-box right-align">
                                    <form ref="addForm" className="addForm" id="addForm" encType="multipart/form-data" method="post">
                                        <div className="upload-img vc-center white-text custom-purple">
                                            <input id="product_image" name="product_image" type="file" onChange={handleSubmit}/>
                                            <i className="mdi mdi-camera"/>
                                        </div>
                                    </form>
                                    <div className="center grey-text">上传商品照片</div>
                                </div>
                            </div>
                            <div className="col s6 padding-left55">
                                <div className="upload-img-box z-depth-1 detail-box">
                                    <ul id="viewer" className="margin-top0">
                                        <li className="picture-list vc-center"><img src={avatarUrl} className="responsive-img"/></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 按钮 */}
                        {/*<div className="col s12 right-align margin-top40 padding-right70">*/}
                        {/*    {productDetailReducer.pageType === 'new' && <button type="button" className="btn confirm-btn" onClick={this.goNextPage}>下一步</button>}*/}
                        {/*    /!*{productDetailReducer.pageType === 'edit' && productDetailReducer.productInfo.length > 0 &&*!/*/}
                        {/*        /!*<button type="button" className="btn confirm-btn margin-left20" onClick={saveProductImg}>确定</button>}*!/*/}
                        {/*</div>*/}
                    </div>

                    {/* TAB 3 : 商品介绍TAB */}
                    <div id="tab-desc" className="col s12">
                        {productDetailReducer.productInfo.length > 0 &&
                        <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50 min-height500">
                            <div className="row detail-box-header margin-bottom0">
                                {/* 商品介绍：商品名称 */}
                                <div className="col s12 no-padding">{productDetailReducer.productInfo[0].commodity_name}</div>
                            </div>
                            <div className="row margin-bottom0">
                                <ReactQuill modules={sysConst.RICH_TEXT_MODULES} value={productDetailReducer.productDes} onChange={this.changeProductDes} />
                                {/*<Input s={12} type='textarea' placeholder="请输入文字介绍" className="no-border-bottom" value={productDetailReducer.productDes} onChange={this.changeProductDes}/>*/}
                            </div>
                        </div>}
                        {/* 完成 按钮 */}
                        {productDetailReducer.productInfo.length > 0 &&
                        <div className="col s12 right-align padding-right70">
                            <button type="button" className="btn orange-btn" onClick={()=>{this.changeProductDes('')}}>清空</button>
                            <button type="button" className="btn confirm-btn margin-left20" onClick={saveProductDesc}>保存</button>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productDetailReducer: state.ProductDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getProductInfo: () => {
        // 清除新增商品编号
        dispatch(NewProductModalActionType.setNewProductId(''));
        // 取得城市列表
        dispatch(commonAction.getCityList());
        // 取得商品详情
        dispatch(productDetailAction.getProductInfo(ownProps.match.params.id));
    },
    setProductName: (value) => {
        dispatch(ProductDetailActionType.setProductName(value))
    },
    setQuantity: (value) => {
        dispatch(ProductDetailActionType.setQuantity(value))
    },
    changeProductCity: (value) => {
        dispatch(ProductDetailActionType.setProductCity(value))
    },
    setProductionDate: (value) => {
        dispatch(ProductDetailActionType.setProductionDate(value))
    },
    changeProductSaleType: (value) => {
        dispatch(ProductDetailActionType.setProductSaleType(value))
    },
    setEarnestMoney: (value) => {
        dispatch(ProductDetailActionType.setEarnestMoney(value))
    },
    setOriginalPrice: (value) => {
        dispatch(ProductDetailActionType.setOriginalPrice(value))
    },
    setActualPrice: (value) => {
        dispatch(ProductDetailActionType.setActualPrice(value))
    },
    saveProductInfo: () => {
        dispatch(productDetailAction.saveProductInfo());
    },
    changeProductStatus: () => {
        dispatch(productDetailAction.changeProductStatus());
    },
    // saveProductImg: () => {
    //     dispatch(productDetailAction.saveProductImg(formData));
    // },
    setProductDes: (value) => {
        dispatch(ProductDetailActionType.setProductDes(value))
    },
    saveProductDesc: () => {
        dispatch(productDetailAction.saveProductDesc());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
            // 必要参数，表单命名
            form: 'productDetailForm',
            // 可选参数 onSubmit : Function [optional[ : 表单提交配置，可以配置需要提交哪些参数，还有提交时触发的 dispatch等
            onSubmit: (values, dispatch, props) => {
                let formData = new FormData();
                formData.append('image', document.getElementById('product_image').files[0]);
                dispatch(productDetailAction.uploadProductImg(formData));
            }
        }
    )(ProductDetail)
);