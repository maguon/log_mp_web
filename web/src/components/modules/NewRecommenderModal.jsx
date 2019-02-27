import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NewRecommenderModalActionType} from "../../actionTypes";

const newRecommenderModalAction = require('../../actions/modules/NewRecommenderModalAction');

/**
 * UI组件：新增推荐人 模块。
 */
class NewRecommenderModal extends React.Component {

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
     * 更新 推荐人名称
     */
    changeCommendName = (event) => {
        this.props.setCommendName(event.target.value);
    };

    /**
     * 更新 推荐人简介
     */
    changeCommendIntroduction = (event) => {
        this.props.setCommendIntroduction(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newRecommenderModalReducer, closeModal, addReCommend} = this.props;
        if (newRecommenderModalReducer.newRecommendId !== '') {
            return <Redirect push to={{pathname: '/recommend_setting/' + newRecommenderModalReducer.newRecommendId}}/>;
        }
        return (
            <div id="newReCommendModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">新增推荐人</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    <div className="row margin-top20">
                        <Input s={12} label={<span><span className="must-input">*</span>推荐人名称</span>} maxLength="20" value={newRecommenderModalReducer.recommendName} onChange={this.changeCommendName}/>
                        <Input s={12} label="推荐人简介" maxLength="50" value={newRecommenderModalReducer.introduction} onChange={this.changeCommendIntroduction}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={addReCommend}>确定</button>
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
        newRecommenderModalReducer: state.NewRecommenderModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setCommendName: (value) => {
        dispatch(NewRecommenderModalActionType.setCommendName(value));
    },
    setCommendIntroduction: (value) => {
        dispatch(NewRecommenderModalActionType.setCommendIntroduction(value));
    },
    addReCommend: () => {
        // 设置保存成功后的推荐人编号，默认值：空
        dispatch(NewRecommenderModalActionType.setNewRecommendId(''));
        dispatch(newRecommenderModalAction.addReCommend());
    },
    closeModal: () => {
        $('#newReCommendModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRecommenderModal);