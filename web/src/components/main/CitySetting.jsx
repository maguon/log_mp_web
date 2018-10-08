import React from 'react';
import {CitySettingActionType} from '../../actionTypes';
import {connect} from 'react-redux';

const citySettingAction = require('../../actions/main/CitySettingAction');

class CitySetting extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getCityList, setCityFormFlag, setCityName} = this.props;
        getCityList();
        setCityFormFlag(false);
        setCityName('');
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
                        城市设置
                        <div className="divider" style={{marginTop:'10px'}}/>
                    </div>
                </div>

                {/* 操作按钮 部分 */}
                <div className="row">
                    {citySettingReducer.cityFormFlag ?
                        <form>
                            <div className="col s12">
                                <div className="input-field col s8">
                                    <input id="city_name" type="text" value={citySettingReducer.cityName} onChange={changeCityName}/>
                                    <label htmlFor="city_name">城市</label>
                                </div>

                                <div className="col s3 right-align">
                                      <btn className="btn-floating waves-effect waves-light pink lighten-3" onClick={hideCityForm}>
                                        <i className="mdi mdi-close"/>
                                    </btn>
                                </div>
                                <div className="col s1 right-align">
                                    <btn className="btn-floating waves-effect waves-light custom-purple" onClick={addCity}>
                                        <i className="mdi mdi-check"/>
                                    </btn>
                                </div>
                            </div>
                        </form>
                        :
                        <div className="col s12">
                            <div className="col s12 right-align">
                                <btn className="btn-floating waves-effect waves-light custom-purple" onClick={showCityForm}>
                                    <i className="mdi mdi-plus"/>
                                </btn>
                                <div className="divider" style={{marginTop:'20px'}}/>
                            </div>
                        </div>
                    }
                </div>


                {/* 数据列表 部分 */}
                <div className="row">
                    <div className="col s12">
                        {
                            citySettingReducer.cityArray.map(function (item) {
                                return (
                                    <div className="col s2">
                                        <div className="col s12 card-unit z-depth-1 center-align">
                                            <div style={(item.city_name.length>8) ? {marginTop:'8px',marginBottom:'8px',fontSize:'12px'} : {marginTop:'8px',marginBottom:'8px'}}>
                                                {item.id} - {item.city_name}
                                                </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(CitySetting)
