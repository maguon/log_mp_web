import React from 'react';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
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
        this.props.initProductInfo();
        this.props.getProductInfo();
        $('ul.tabs').tabs();
        let viewer = new Viewer(document.getElementById('viewer'), {
            url: 'data-original'
        });
    }

    // 商品描述照片 使用 Viewer.js 组件
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.productDetailReducer.productDescImgList.length > 0 &&
            this.props.productDetailReducer.productDescImgList !== prevProps.productDetailReducer.productDescImgList) {
            let viewer_desc = new Viewer(document.getElementById('viewer_desc'), {
                show: function (){  // 动态加载图片后，更新实例
                    viewer_desc.update();
                },
            });
        }
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

    render() {
        const {
            productDetailReducer,
            commonReducer,
            getProductInfo,
            changeProductCity,
            changeProductSaleType,
            saveProductInfo,
            changeProductStatus,
            uploadProductImg,
            uploadProductDescImg,
            delCurrentImg,
            saveProductDesc
        } = this.props;

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
                            <li className="tab col s3"><a href="#tab-base" className="active" onClick={getProductInfo}>商品信息</a></li>
                            <li className="tab col s3"><a href="#tab-img">商品图片</a></li>
                            <li className="tab col s3"><a href="#tab-desc">商品介绍</a></li>
                            <li className="tab col s3"><a href="#tab-we">微信推广</a></li>
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
                                    <Input s={4} label="指导价 (元)" type="number" className="right-align fz16 red-font" value={productDetailReducer.originalPrice} onChange={this.changeOriginalPrice}/>
                                    <Input s={4} label="实际售价 (元)" type="number" className="right-align fz16 red-font" value={productDetailReducer.actualPrice} onChange={this.changeActualPrice}/>
                                    {productDetailReducer.productSaleType.value === sysConst.PRODUCT_SALE_TYPE[1].value &&
                                    <Input s={4} label="定金 (元)" type="number" className="right-align fz16 red-font" value={productDetailReducer.earnestMoney} onChange={this.changeEarnestMoney}/>}
                                </div>
                            </div>
                        </div>

                        {/* 按钮 */}
                        {productDetailReducer.productInfo.length > 0 &&
                        <div className="col s12 right-align padding-right70">
                            {productDetailReducer.productInfo[0].status !== sysConst.PRODUCT_SALE_STATUS[2].value &&
                            <button type="button" className="btn orange-btn" onClick={changeProductStatus}>确认售罄</button>}
                            <button type="button" className="btn confirm-btn margin-left20" onClick={saveProductInfo}>保存</button>
                        </div>}
                    </div>

                    {/* TAB 2 : 商品图片TAB */}
                    <div id="tab-img" className="col s12">
                        {/* 上部：商品基本照片 */}
                        <div className="row margin-top40 margin-left50 margin-right50">
                            {/* 上传控件 */}
                            <div className="col s4">
                                <div className="upload-img-box z-depth-1 detail-box right-align">
                                    <form ref="addForm" id="addForm" encType="multipart/form-data" method="post">
                                        <div className="upload-img vc-center white-text custom-purple">
                                            <input id="product_image" name="product_image" type="file" onChange={uploadProductImg}/>
                                            <i className="mdi mdi-camera"/>
                                        </div>
                                    </form>
                                    <div className="center grey-text">上传商品基本照片</div>
                                </div>
                            </div>
                            {/* 图片展示 */}
                            <div className="col s4">
                                <div className="upload-img-box z-depth-1 detail-box">
                                    <ul id="viewer" className="margin-top0">
                                        <li className="picture-list vc-center">
                                            <img src={(productDetailReducer.productImg !== null && productDetailReducer.productImg !== '') ? "http://" + fileHost + "/api/image/" + productDetailReducer.productImg : "/assets/images/no_pic.png"}
                                                 className="responsive-img"/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 下部：商品描述照片(多张) */}
                        <div className="row margin-left50 margin-right50">
                            {/* 上传控件 */}
                            <div className="col s4 margin-top40">
                                <div className="upload-img-box z-depth-1 detail-box right-align">
                                    <form ref="addProductDescImg" id="addProductDescImg" encType="multipart/form-data" method="post">
                                        <div className="upload-img vc-center white-text custom-purple">
                                            <input id="product_desc_image" name="product_desc_image" type="file" onChange={uploadProductDescImg}/>
                                            <i className="mdi mdi-camera"/>
                                        </div>
                                    </form>
                                    <div className="center grey-text">上传商品描述照片</div>
                                </div>
                            </div>
                            {/* 图片展示 */}
                            <ul id="viewer_desc" className="margin-top0">
                            {productDetailReducer.productDescImgList.map(function (item) {
                                return (
                                    <div className="col s4 margin-top40">
                                        <div className="upload-img-box z-depth-1 detail-box">
                                            <li className="picture-list vc-center">
                                                <img src={item !== '' ? "http://" + fileHost + "/api/image/" + item : ""} className="responsive-img"/>
                                                <b className="img_close vc-center" onClick={() => {delCurrentImg(item)}}><i className="mdi mdi-close"/></b>
                                            </li>
                                        </div>
                                    </div>
                                )
                            },this)}
                            </ul>
                        </div>
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

                    {/* TAB 4 : 微信推广  有加号，可以加 推广数据(名称，推广人小程序码，备注) */}
                    <div id="tab-we" className="col s12">

                        {/** 新建按钮 */}
                        <div className="row margin-top40 margin-left50 margin-right50 right-align">
                            <a className="btn-floating btn-large waves-light waves-effect btn add-btn" onClick={() => {this.showEditCouponModal('new',null)}}>
                                <i className="mdi mdi-plus"/>
                            </a>
                        </div>


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
    // 画面初期化
    initProductInfo: () => {
        // 清除新增商品编号
        dispatch(NewProductModalActionType.setNewProductId(''));
        // 取得城市列表
        dispatch(commonAction.getCityList());
    },
    // 取得商品详情
    getProductInfo: () => {
        dispatch(productDetailAction.getProductInfo(ownProps.match.params.id));
    },

    // TAB1 商品基本信息
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

    // TAB2 商品图片
    uploadProductImg: () => {
        let formData = new FormData();
        formData.append('image', document.getElementById('product_image').files[0]);
        dispatch(productDetailAction.uploadProductImg('base',formData));
    },
    uploadProductDescImg: () => {
        let formData = new FormData();
        formData.append('image', document.getElementById('product_desc_image').files[0]);
        dispatch(productDetailAction.uploadProductImg('desc',formData));
    },
    delCurrentImg: (imageId) => {
        dispatch(productDetailAction.saveProductDescImg('del', imageId));
    },

    // TAB3 商品介绍
    setProductDes: (value) => {
        dispatch(ProductDetailActionType.setProductDes(value))
    },
    saveProductDesc: () => {
        dispatch(productDetailAction.saveProductDesc());
    },

    // TAB4 微信推广

});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)