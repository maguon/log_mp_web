import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {UserManagerActionType} from '../../actionTypes';

const userManagerAction = require('../../actions/main/UserManagerAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class UserManager extends React.Component {

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
            this.props.setConditionWeChatNm('');
            this.props.setConditionPhone('');
            this.props.changeConditionWeStatus(null);
            this.props.changeConditionAuthStatus(null);
            // this.props.setConditionUser('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.setConditionAuthTimeStart('');
            this.props.setConditionAuthTimeEnd('');
        }
        this.props.getUserList();
    }

    /**
     * 更新 检索条件：用户ID
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：微信昵称
     */
    changeConditionWeChatNm = (event) => {
        this.props.setConditionWeChatNm(event.target.value);
    };

    /**
     * 更新 检索条件：手机
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    // /**
    //  * 更新 检索条件：姓名
    //  */
    // changeConditionUser = (event) => {
    //     this.props.setConditionUser(event.target.value);
    // };

    /**
     * 更新 检索条件：授权时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：授权时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 更新 检索条件：认证时间(始)
     */
    changeConditionAuthTimeStart = (event, value) => {
        this.props.setConditionAuthTimeStart(value);
    };

    /**
     * 更新 检索条件：认证时间(始)
     */
    changeConditionAuthTimeEnd = (event, value) => {
        this.props.setConditionAuthTimeEnd(value);
    };

    /**
     * 查询用户列表
     */
    queryUserList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getUserList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.userManagerReducer.start - (this.props.userManagerReducer.size - 1));
        this.props.getUserList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.userManagerReducer.start + (this.props.userManagerReducer.size - 1));
        this.props.getUserList();
    };

    render() {
        const {userManagerReducer, changeConditionAuthStatus, changeConditionWeStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">用户管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：用户ID */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="用户ID" value={userManagerReducer.conditionNo} onChange={this.changeConditionNo}/>
                            </div>

                            {/* 查询条件：昵称 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="昵称" value={userManagerReducer.conditionWeChatNm} onChange={this.changeConditionWeChatNm}/>
                            </div>

                            {/* 查询条件：手机号码 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="手机号码" value={userManagerReducer.conditionPhone} onChange={this.changeConditionPhone}/>
                            </div>

                            {/* 查询条件：微信状态 */}
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.WE_CHAT_STATUS}
                                    onChange={changeConditionWeStatus}
                                    value={userManagerReducer.conditionWeStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">微信状态</label>
                            </div>

                            {/* 查询条件：认证状态 */}
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.AUTH_STATUS}
                                    onChange={changeConditionAuthStatus}
                                    value={userManagerReducer.conditionAuthStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">认证状态</label>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：授权时间(始) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="授权时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={userManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：授权时间(终) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="授权时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={userManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：认证时间(始) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="认证时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={userManagerReducer.conditionAuthTimeStart} onChange={this.changeConditionAuthTimeStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：认证时间(终) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="认证时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={userManagerReducer.conditionAuthTimeEnd} onChange={this.changeConditionAuthTimeEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryUserList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">

                        <div className="divider custom-divider"/>
                        <table className="bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>用户ID</th>
                                <th>昵称</th>
                                <th className="center">性别</th>
                                <th>手机</th>
                                <th className="center">授权时间</th>
                                <th className="center">认证时间</th>
                                <th className="center">最后登录时间</th>
                                <th className="center">微信状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userManagerReducer.userArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.wechat_name}</td>
                                        <td className="center">{(item.gender !== 0 && item.gender !== 1) ? '未知' : sysConst.GENDER[item.gender].label}</td>
                                        <td>{item.phone}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="center">{formatUtil.getDateTime(item.auth_time)}</td>
                                        <td className="center">{formatUtil.getDateTime(item.last_login_on)}</td>
                                        <td className="center">{sysConst.WE_CHAT_STATUS[item.wechat_status].label}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/user/' + item.id}}>
                                                <i className="mdi mdi-table-search light-blue-text"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            {userManagerReducer.userArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="9">暂无数据</td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {userManagerReducer.start > 0 && userManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {userManagerReducer.dataSize >= userManagerReducer.size &&
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
        userManagerReducer: state.UserManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserList: () => {
        dispatch(userManagerAction.getUserList())
    },
    setStartNumber: (start) => {
        dispatch(UserManagerActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(UserManagerActionType.setConditionNo(value))
    },
    setConditionWeChatNm: (value) => {
        dispatch(UserManagerActionType.setConditionWeChatNm(value))
    },
    // setConditionUser: (userNm) => {
    //     dispatch(UserManagerActionType.setConditionUser(userNm))
    // },
    setConditionPhone: (value) => {
        dispatch(UserManagerActionType.setConditionPhone(value))
    },
    changeConditionWeStatus: (status) => {
        dispatch(UserManagerActionType.setConditionWeStatus(status))
    },
    changeConditionAuthStatus: (status) => {
        dispatch(UserManagerActionType.setConditionAuthStatus(status))
    },
    setConditionAuthTimeStart: (time) => {
        dispatch(UserManagerActionType.setConditionAuthTimeStart(time))
    },
    setConditionAuthTimeEnd: (time) => {
        dispatch(UserManagerActionType.setConditionAuthTimeEnd(time))
    },
    setConditionCreatedOnStart: (time) => {
        dispatch(UserManagerActionType.setConditionCreatedOnStart(time))
    },
    setConditionCreatedOnEnd: (time) => {
        dispatch(UserManagerActionType.setConditionCreatedOnEnd(time))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)