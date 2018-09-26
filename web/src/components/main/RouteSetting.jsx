import React from 'react';
import {connect} from 'react-redux';
import {RouteSettingActionType} from '../../actionTypes';

const routeSettingAction = require('../../actions/main/RouteSettingAction');

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
        const {routeSettingReducer, setStartCityName, getRouteCityList} = this.props;

        const clickStartCity = (event, cityId, cityNm) => {
            setStartCityName(cityNm);
            getRouteCityList(cityId);
        };

        const editRoute = (event, cityId, cityNm) => {
            //const cityName = event.target.value;
            console.log('cityId ', cityId)
            // setStartCityName(cityNm);
            // getRouteCityList(cityId);
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
                            <div className="col s12 z-depth-1" style={{paddingLeft: '0', paddingRight: '0'}}>
                                {
                                    routeSettingReducer.startCityArray.map(function (item) {
                                        return (
                                            <div className="col s2" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                                <button className="btn route-card" style={item.city_name === routeSettingReducer.startCityName ? {backgroundColor: '#6E2678',color: 'white'} : {}}
                                                        data-index={item.id} onClick={()=>{clickStartCity(event,item.id,item.city_name)}}>
                                                    <div style={(item.city_name.length > 7) ? {height: '25px',lineHeight: '15px'}
                                                    : {height: '10px', lineHeight: '15px'}}>
                                                        {item.city_name}
                                                    </div>
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
                            <div className="col s12 z-depth-1" style={{paddingLeft: '0', paddingRight: '0'}}>
                                {
                                    routeSettingReducer.endCityArray.map(function (item) {
                                        return (
                                            <div className="col s2" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                                <a className="btn route-card" style={item.route_flag ? {backgroundColor: '#6E2678',color: 'white'} : {}}
                                                   onClick={()=>{editRoute(event,item.id,item.city_name)}}>
                                                    {/* marginTop:5px or 20px */}
                                                    <div style={{
                                                        height: '20px',
                                                        lineHeight: '15px',
                                                        marginTop: '5px'
                                                    }}>{item.city_name}</div>
                                                    {item.route_flag && <div>{item.distance}公里</div>}
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
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


    addCity: () => {
        dispatch(routeSettingAction.addCity())
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(RouteSetting)
