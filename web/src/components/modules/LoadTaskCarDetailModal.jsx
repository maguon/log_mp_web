import React from 'react';
import {connect} from 'react-redux';

const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');
const commonUtil = require('../../util/CommonUtil');

class LoadTaskCarDetailModal extends React.Component {

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
        const {loadTaskCarDetailModalReducer, closeModal} = this.props;
        return (
            <div id="loadTaskCarDetailModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">车辆安排</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="modal-content-body">
                        <div className="col s12 detail-box z-depth-1 no-padding">
                            <div className="col s6 custom-grey padding-top10 padding-bottom10 border-top-line border-bottom-line purple-font">已安排车辆</div>
                            <div className="col s6 custom-grey padding-top10 padding-bottom10 border-top-line border-bottom-line pink-font right-align">
                                {formatUtil.formatNumber(loadTaskCarDetailModalReducer.scheduledCarList.length)}
                            </div>
                            {loadTaskCarDetailModalReducer.scheduledCarList.length > 0 &&
                            <table className="bordered">
                                <thead className="">
                                <tr className="grey-text text-darken-2">
                                    <th className="padding-left10">VIN</th>
                                    <th className="center">车型</th>
                                    <th className="center">品牌</th>
                                    <th className="center">型号</th>
                                    <th className="right-align">估值</th>
                                    <th className="center">新车</th>
                                    <th className="center">保险</th>
                                    <th className="right-align">供应商运费</th>
                                    <th className="right-align">供应商保费</th>
                                </tr>
                                </thead>
                                <tbody>
                                {loadTaskCarDetailModalReducer.scheduledCarList.map(function (item, key) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td className="padding-left10">{item.vin}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.CAR_MODEL, item.model_type)}</td>
                                            <td className="center">{item.brand}</td>
                                            <td className="center">{item.brand_type}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.valuation,2)}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.old_car)}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.safe_status)}</td>
                                            <td className="right-align pink-font">{formatUtil.formatNumber(item.supplier_trans_price,2)}</td>
                                            <td className="right-align pink-font">{formatUtil.formatNumber(item.supplier_insure_price,2)}</td>
                                        </tr>
                                    )
                                }, this)}
                                </tbody>
                            </table>}
                        </div>
                    </div>

                    {loadTaskCarDetailModalReducer.loadTaskInfo.length > 0 &&
                    <div className="modal-content-footer padding-top10 right-align">
                        总运输费用：
                        <span className="fz16 pink-font">
                            {formatUtil.formatNumber(loadTaskCarDetailModalReducer.loadTaskInfo[0].supplier_trans_price + loadTaskCarDetailModalReducer.loadTaskInfo[0].supplier_insure_price,2)}
                        </span> 元
                    </div>}

                </div>

                {/** Modal固定底部：确定按钮 */}
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
        loadTaskCarDetailModalReducer: state.LoadTaskCarDetailModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        $('#loadTaskCarDetailModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadTaskCarDetailModal);