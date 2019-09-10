import React from 'react';
import {connect} from 'react-redux';

const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

/**
 * UI组件：商品详情 模块。
 */
class ProductInfoModal extends React.Component {

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
     * 渲染(挂载)画面。
     */
    render() {
        const {productInfoModalReducer, closeModal} = this.props;
        return (
            <div id="productInfoModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">商品详情</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    {productInfoModalReducer.productInfo.length > 0 &&
                    <div className="row margin-top30 left-align">
                        <div className="col s12">商品编号：{productInfoModalReducer.productInfo[0].id}</div>
                        <div className="col s12 fz16 bold-font margin-top10">{productInfoModalReducer.productInfo[0].commodity_name}</div>
                        <div className="col s5 margin-top10 grey-text">
                            城市：{productInfoModalReducer.productInfo[0].city_name}
                            <span className="margin-left30">销售类型：{commonUtil.getJsonValue(sysConst.PRODUCT_SALE_TYPE,productInfoModalReducer.productInfo[0].type)}</span>
                        </div>
                        <div className="col s12 margin-top10 grey-text">出厂日期：{productInfoModalReducer.productInfo[0].production_date}</div>

                        {/* 分割线 */}
                        <div className="col s12"><div className="col s12 margin-top20 divider"/></div>

                        <div className="col s12 margin-top20 grey-text fz14">指导价：{formatUtil.formatNumber(productInfoModalReducer.productInfo[0].ora_trans_price/10000,2)}万元</div>

                        <div className="col s6 margin-top10">
                            实际售价：<span className="red-text fz18">{formatUtil.formatNumber(productInfoModalReducer.productInfo[0].act_trans_price/10000,2)}</span>万元
                        </div>
                        <div className="col s6 margin-top10">
                            定金：<span className="red-text fz18">{formatUtil.formatNumber(productInfoModalReducer.productInfo[0].earnest_money)}</span>元
                        </div>

                        {/* 分割线 */}
                        <div className="col s12"><div className="col s12 margin-top20 divider"/></div>

                        <div className="col s12 margin-top20 fz16 bold-font">商品描述</div>
                        <div className="col s12 margin-top10 ql-editor" dangerouslySetInnerHTML = {{ __html: productInfoModalReducer.productInfo[0].info }} />
                    </div>}
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn confirm-btn" onClick={closeModal}>确定</button>
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
        productInfoModalReducer: state.ProductInfoModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        $('#productInfoModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoModal);