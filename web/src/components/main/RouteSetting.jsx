import React from 'react';
import {connect} from 'react-redux';
import {RouteSettingActionType} from '../../actionTypes';
import { Modal } from 'react-materialize';
import {Enquiry} from '../main/index';

const routeSettingAction = require('../../actions/main/RouteSettingAction');
const enquiryAction = require('../../actions/main/EnquiryAction');

class RouteSetting extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getAllCityList,setStartCityName} = this.props;
        getAllCityList();
        setStartCityName('暂无');
    }

    render() {
        const {routeSettingReducer, setStartCityName,setEndCityName,setDistance, getRouteCityList, closeModal} = this.props;

        const clickStartCity = (event, cityId, cityNm) => {
            setStartCityName(cityNm);
            getRouteCityList(cityId);
        };

        const editRoute = (event, cityId, cityNm, distance) => {
            setEndCityName(cityNm);
            setDistance(distance);
            $('#routeModal').modal('open');
            // getRouteCityList(cityId);
        };

        const changeDistance = (event) => {
            setDistance(event.target.value);
        };

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
                    <div className="input-field col s12 center-align">
                        当前起始城市：{routeSettingReducer.startCityName}
                    </div>
                </div>

                {/* 数据列表 部分 */}
                <div className="row">
                    {/* 数据列表 左侧 */}
                    <div className="col s6" style={{paddingRight: '5px'}}>
                        <div className="col s12">
                            <div className="col s12 z-depth-1" style={{paddingLeft: '0', paddingRight: '0',paddingTop: '15px'}}>
                                {
                                    routeSettingReducer.startCityArray.map(function (item) {
                                        return (
                                            <div className="col s2" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                                <button className="btn route-card" style={item.city_name === routeSettingReducer.startCityName ? {backgroundColor: '#6E2678',color: 'white'} : {}}
                                                        data-index={item.id} onClick={()=>{clickStartCity(event,item.id,item.city_name)}}>
                                                    {/*<div style={(item.city_name.length > 7) ? {height: '25px',lineHeight: '15px'}*/}
                                                    {/*: {height: '10px', lineHeight: '15px'}}>*/}
                                                        {/*{item.city_name}*/}
                                                    {/*</div>*/}
                                                    <div style={{height: '20px',lineHeight: '15px',marginTop: '5px'}}>{item.city_name}</div>
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {/* 数据列表 右侧 */}
                    <div className="col s6" style={{paddingLeft: '5px'}}>
                        <div className="col s12">
                            <div className="col s12 z-depth-1" style={{paddingLeft: '0', paddingRight: '0',paddingTop: '15px'}}>
                                {
                                    routeSettingReducer.endCityArray.map(function (item) {
                                        return (
                                            <div className="col s2" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                                <button className="btn route-card" style={item.route_flag ? {backgroundColor: '#6E2678',color: 'white'} : {}}
                                                   onClick={()=>{editRoute(event,item.id,item.city_name,item.distance)}}>
                                                    {/*<i className="mdi mdi-home-currency-usd mdi-36px modal-trigger" data-target="enquiryModal" onClick={openEnquiryModal}/>*/}
                                                    <div style={{height: '20px',lineHeight: '15px',marginTop: '5px'}}>{item.city_name}</div>
                                                    {item.route_flag && <div>{item.distance}公里</div>}
                                                </button>
                                            </div>
                                        )
                                    })
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
                                <div className="input-field col s12">
                                   {routeSettingReducer.startCityName} - {routeSettingReducer.endCityName}
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="distance" type="number" value={routeSettingReducer.distance} onChange={changeDistance}/>
                                    <label htmlFor="distance">公里数(公里)</label>
                                </div>
                            </div>
                        </div>

                        {/** Modal固定底部：取消确定按钮 */}
                        <div className="modal-footer">
                            <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                            <button type="button" className="btn confirm-btn" onClick={closeModal}>确定</button>
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
    setStartCityName: (cityName) => {
        dispatch(RouteSettingActionType.setStartCityName(cityName))
    },
    setEndCityName: (cityName) => {
        dispatch(RouteSettingActionType.setEndCityName(cityName))
    },
    setDistance: (distance) => {
        dispatch(RouteSettingActionType.setDistance(distance))
    },
    // openRouteModal: () => {
    //     dispatch(enquiryAction.getCityList());
    //     dispatch(enquiryAction.openEnquiryModal());
    // },


    addCity: () => {
        dispatch(routeSettingAction.addCity())
    },


    closeModal: () => {
        $('#routeModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteSetting)
