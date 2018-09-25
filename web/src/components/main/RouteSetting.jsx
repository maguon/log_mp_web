import React from 'react';

import {connect} from 'react-redux';

const citySettingAction = require('../../actions/main/CitySettingAction');
import {CitySettingActionType} from '../../actionTypes';

class RouteSetting extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getCityList, setCityFormFlag} = this.props;
        getCityList();
        setCityFormFlag(false);
    }

    render() {
        const {citySettingReducer, setCityFormFlag, setCityName, addCity} = this.props;

        const showCityForm = () => {
            setCityFormFlag(true);
        };
        const hideCityForm = () => {
            setCityFormFlag(false);
            setCityName('');
        };
        const changeCityName = (event) => {
            setCityName(event.target.value);
        };

        return (

            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        线路设置
                        <div className="divider" style={{marginTop:'10px'}}/>
                    </div>
                </div>

                {/* 数据列表 部分 */}
                <div className="row">
                    {/* 数据列表 左侧 */}
                    <div className="col s6" style={{paddingRight:'5px'}}>
                        <div className="col s12">
                            <div className="col s12 z-depth-1" style={{paddingLeft:'0',paddingRight:'0'}}>
                                <div className="input-field col s12 route-city-header" style={{marginTop:'0'}}>
                                    <input type="text" placeholder="输入城市" value={citySettingReducer.cityName} onChange={changeCityName} />
                                </div>
                            {
                                citySettingReducer.cityArray.map(function (item) {
                                    return (
                                        <div className="col s2" style={{paddingLeft:'10px',paddingRight:'10px'}}>
                                            <a className="btn route-card">
                                                <div style={(item.city_name.length > 7) ? {height: '20px',lineHeight: '15px',marginTop:'16px'} :{height: '20px',lineHeight: '15px',marginTop:'20px'}}>
                                                    {item.city_name}
                                                </div>
                                            </a>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>

                    {/* 数据列表 右侧 */}
                    <div className="col s6" style={{paddingLeft:'5px'}}>
                        <div className="col s12">
                            <div className="col s12 z-depth-1" style={{paddingLeft:'0',paddingRight:'0'}}>
                                <div className="input-field col s12 route-city-header" style={{marginTop:'0'}}>
                                    <span className="input-field col s6 left-align context-title">大连</span>
                                    <span className="input-field col s6 right-align grey-text" style={{fontSize:'13px'}}>
                                        已设置线路：<span style={{fontSize:'15px',color:'#B6598F'}}>99</span>
                                    </span>
                                </div>
                            {
                                citySettingReducer.cityArray.map(function (item) {
                                    return (
                                        <div className="col s2" style={{paddingLeft:'10px',paddingRight:'10px'}}>
                                            <a className="btn route-card">
                                                {/* marginTop:5px or 20px */}
                                                <div style={{height: '20px',lineHeight: '15px',marginTop:'5px'}}>{item.city_name}</div>
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
        citySettingReducer: state.CitySettingReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCityList: () => {
        dispatch(citySettingAction.getCityList())
    },
    addCity: () => {
        dispatch(citySettingAction.addCity())
    },
    setCityFormFlag: (flag) => {
        dispatch(CitySettingActionType.setCityFormFlag(flag))
    },
    setCityName: (cityName) => {
        dispatch(CitySettingActionType.setCityName(cityName))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteSetting)
