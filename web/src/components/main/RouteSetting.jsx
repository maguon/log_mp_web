import React from 'react';
import {connect} from 'react-redux';
import {RouteSettingActionType} from '../../actionTypes';

const routeSettingAction = require('../../actions/main/RouteSettingAction');

class RouteSetting extends React.Component {

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
        const {getAllCityList, setStartCityName} = this.props;
        $('.modal').modal();
        getAllCityList();
        setStartCityName('暂无');
    }

    /**
     * 点击左侧城市，取得路线
     */
    clickStartCity = (event, cityId, cityNm) => {
        // 设定 开始城市
        this.props.setStartCityId(cityId);
        this.props.setStartCityName(cityNm);
        // 取得 开始城市 对应的 路线
        this.props.getRouteCityList(cityId);
    };

    /**
     * 点击右侧城市，编辑路线
     */
    editRoute = (event, cityId, cityNm, routeId, distance) => {
        // 没选中 起始城市 时
        if (this.props.routeSettingReducer.startCityName === '暂无') {
            swal('请先选择起始城市！', '', 'warning');
        } else {
            // 设定 终到城市
            this.props.setEndCityId(cityId);
            this.props.setEndCityName(cityNm);

            // 存在路线ID的，则为编辑画面
            if (routeId !== '') {
                // 编辑标记
                this.props.setModifyFlag(true);
                // 设定 线路ID
                this.props.setRouteId(routeId);
                // 设定 线路公里数
                this.props.setDistance(distance);
                $('#routeModal').modal('open');
                $("#distance-label").addClass('active');
            } else {
                // 新建标记
                this.props.setModifyFlag(false);
                // 设定 线路公里数
                this.props.setDistance('');
                $('#routeModal').modal('open');
                $("#distance-label").removeClass('active');
            }
        }
    };

    /**
     * 更新线路公里数
     */
    changeDistance = (event) => {
        this.props.setDistance(event.target.value);
    };

    render() {
        const {routeSettingReducer, closeModal, modifyRoute} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        线路设置
                        <div className="divider" style={{marginTop: '10px'}}/>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12 purple-font center-align">
                        当前起始城市：{routeSettingReducer.startCityName}
                    </div>
                </div>

                {/* 数据列表 部分 */}
                <div className="row">
                    {/* 数据列表 左侧 */}
                    <div className="col s6" style={{paddingRight: '5px'}}>
                        <div className="col s12">
                            <div className="col s12 z-depth-1"
                                 style={{paddingLeft: '0', paddingRight: '0', paddingTop: '15px'}}>
                                {
                                    routeSettingReducer.startCityArray.map(function (item) {
                                        return (
                                            <div className="col s2" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                                <button className="btn route-card"
                                                        style={item.city_name === routeSettingReducer.startCityName ? {
                                                            backgroundColor: '#6E2678',
                                                            color: 'white'
                                                        } : {}}
                                                        onClick={() => {this.clickStartCity(event, item.id, item.city_name)}}>
                                                    {/*<div style={(item.city_name.length > 7) ? {height: '25px',lineHeight: '15px'}*/}
                                                    {/*: {height: '10px', lineHeight: '15px'}}>*/}
                                                    {/*{item.city_name}*/}
                                                    {/*</div>*/}
                                                    <div style={{
                                                        height: '20px',
                                                        lineHeight: '15px',
                                                        marginTop: '5px'
                                                    }}>{item.city_name}</div>
                                                </button>
                                            </div>
                                        )
                                    },this)
                                }
                            </div>
                        </div>
                    </div>

                    {/* 数据列表 右侧 */}
                    <div className="col s6" style={{paddingLeft: '5px'}}>
                        <div className="col s12">
                            <div className="col s12 z-depth-1"
                                 style={{paddingLeft: '0', paddingRight: '0', paddingTop: '15px'}}>
                                {
                                    routeSettingReducer.endCityArray.map(function (item) {
                                        return (
                                            <div className="col s2" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                                <button className="btn route-card" style={item.route_flag ? {backgroundColor: '#6E2678',color: 'white'} : {}}
                                                        onClick={() => {
                                                            this.editRoute(event, item.id, item.city_name, item.route_id, item.distance)
                                                        }}>
                                                    <div style={{
                                                        height: '20px',
                                                        lineHeight: '15px',
                                                        marginTop: '5px'
                                                    }}>{item.city_name}</div>
                                                    {item.route_flag && <div>{item.distance}公里</div>}
                                                </button>
                                            </div>
                                        )
                                    },this)
                                }
                            </div>
                        </div>
                    </div>
                    <div id="routeModal" className="modal modal-fixed-footer row">

                        {/** Modal头部：Title */}
                        <div className="modal-title center-align white-text">线路设置</div>

                        {/** Modal主体 */}
                        <div className="modal-content">
                            <div className="row">
                                <div className="input-field col s11 fz20 pink-font" style={{paddingLeft: '90px',marginTop:'40px'}}>
                                    {routeSettingReducer.startCityName}  -  {routeSettingReducer.endCityName}
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s11" style={{paddingLeft: '80px',marginTop:'20px'}}>
                                    <div className="input-field col s12">
                                        <input id="distance" type="number" value={routeSettingReducer.distance} onChange={this.changeDistance}/>
                                        <label id="distance-label" htmlFor="distance">公里数(公里)</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/** Modal固定底部：取消确定按钮 */}
                        <div className="modal-footer">
                            <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                            <button type="button" className="btn confirm-btn" onClick={modifyRoute}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        routeSettingReducer: state.RouteSettingReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAllCityList: () => {
        dispatch(routeSettingAction.getAllCityList())
    },
    getRouteCityList: (cityId) => {
        dispatch(routeSettingAction.getRouteCityList(cityId))
    },
    setStartCityId: (cityId) => {
        dispatch(RouteSettingActionType.setStartCityId(cityId))
    },
    setStartCityName: (cityName) => {
        dispatch(RouteSettingActionType.setStartCityName(cityName))
    },
    setEndCityId: (cityId) => {
        dispatch(RouteSettingActionType.setEndCityId(cityId))
    },
    setEndCityName: (cityName) => {
        dispatch(RouteSettingActionType.setEndCityName(cityName))
    },
    setRouteId: (routeId) => {
        dispatch(RouteSettingActionType.setRouteId(routeId))
    },
    setDistance: (distance) => {
        dispatch(RouteSettingActionType.setDistance(distance))
    },
    setModifyFlag: (modifyFlag) => {
        dispatch(RouteSettingActionType.setModifyFlag(modifyFlag))
    },
    modifyRoute: () => {
        dispatch(routeSettingAction.modifyRoute());
    },
    closeModal: () => {
        $('#routeModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteSetting)
