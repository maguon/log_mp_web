import React from 'react';
import {connect} from 'react-redux';
import {RouteSettingActionType} from '../../actionTypes';

const routeSettingAction = require('../../actions/main/RouteSettingAction');

class RouteSetting extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getAllCityList} = this.props;
        getAllCityList();
    }

    render() {
        const {routeSettingReducer, setStartCityName} = this.props;

        const handleClick = (event,cityId,cityNm) => {
            //const cityName = event.target.value;
            console.log( 'cityId',cityId)
            console.log( 'cityNm',cityNm)
            setStartCityName(cityNm);
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
                                    routeSettingReducer.cityArray.map(function (item) {
                                        return (
                                            <div className="col s2" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                                <button className="btn route-card" data-index={item.id} onClick={()=>{handleClick(event,item.id,item.city_name)}}>
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
                                    routeSettingReducer.cityArray.map(function (item) {
                                        return (
                                            <div className="col s2" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                                <a className="btn route-card">
                                                    {/* marginTop:5px or 20px */}
                                                    <div style={{
                                                        height: '20px',
                                                        lineHeight: '15px',
                                                        marginTop: '5px'
                                                    }}>{item.city_name}</div>
                                                    <div>1000km</div>
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
    setStartCityName: (cityName) => {
        dispatch(RouteSettingActionType.setStartCityName(cityName))
    },


    addCity: () => {
        dispatch(routeSettingAction.addCity())
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(RouteSetting)
