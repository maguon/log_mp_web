import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {NewProductRecommendModalActionType} from "../../actionTypes";
import Select from "react-select";

const newProductRecommendModalAction = require('../../actions/modules/NewProductRecommendModalAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

/**
 * UI组件：新增/修改 商品微信推广 模块。
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
     * 更新 推广名称
     */
    changeProductRecommendName = (event, value) => {
        this.props.setProductRecommendName(value);
    };

    /**
     * 更新 备注
     */
    changeProductRecommendRemark = (event, value) => {
        this.props.setProductRecommendRemark(value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newProductRecommendModalReducer, commonReducer, changeRecommend, closeModal, saveProductRecommend} = this.props;

        return (
            <div id="newProductRecommendModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">{newProductRecommendModalReducer.pageType === 'new' ? '新增商品微信推广' : '修改商品微信推广'}</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    <div className="row margin-top20">
                        <Input s={12} label="推广名称" maxLength="50" value={newProductRecommendModalReducer.title} onChange={this.changeProductRecommendName}/>
                        <div className="input-field col s12">
                            <Select
                                options={commonReducer.recommendList}
                                onChange={changeRecommend}
                                value={newProductRecommendModalReducer.recommend}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE_FOR_MODAL}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">推广人</label>
                        </div>

                        <Input s={12} label="备注" maxLength="80" value={newProductRecommendModalReducer.remark} onChange={this.changeProductRecommendRemark}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveProductRecommend}>确定</button>
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
        newProductRecommendModalReducer: state.NewProductRecommendModalReducer,
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setProductRecommendName: (value) => {
        dispatch(NewProductRecommendModalActionType.setTitle(value))
    },
    changeRecommend: (value) => {
        dispatch(NewProductRecommendModalActionType.setRecommend(value))
    },
    setProductRecommendRemark: (value) => {
        dispatch(NewProductRecommendModalActionType.setRemark(value))
    },
    saveProductRecommend: () => {
        dispatch(newProductRecommendModalAction.saveProductRecommend());
    },
    closeModal: () => {
        $('#newProductRecommendModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProductRecommendModal);