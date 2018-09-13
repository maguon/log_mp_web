import React from 'react';

import { connect } from 'react-redux';
const citySettingAction = require('../../actions/main/CitySettingAction');
import {CitySettingActionType} from '../../actionTypes';
class CitySetting extends React.Component {

    constructor(props) {
        super(props);

    }
    componentDidMount(){
        const {getCityList,setCityFormFlag} = this.props;
        getCityList();
        setCityFormFlag(false);
    }
    render() {
        const {citySettingReducer,setCityFormFlag,setCityName} = this.props;

        const showCityForm = ()=>{
            setCityFormFlag(true);
        };
        const hideCityForm =()=>{
            setCityFormFlag(false);
            setCityName('');
        };
        const changeCityName = (event) => {
            console.log(citySettingReducer)
            setCityName(event.target.value);
        }
        return (

            <div>
                <div className="row">
                    { citySettingReducer.cityFormFlag ?
                        <form>
                            <div className="input-field inline">
                                <input id="city_name" type="text" value={citySettingReducer.cityName} onChange={changeCityName}/>
                                <label for="city_name">城市</label>
                            </div>
                            <btn className="btn-floating waves-effect waves-light orange" onClick={hideCityForm}><i class="mdi mdi-cancel"></i></btn>
                            <btn className="btn-floating waves-effect waves-light purple"><i class="mdi mdi-check"></i></btn>
                        </form>
                        :
                        <btn class="right  btn btn-large btn-floating waves-effect purple lighten-1 waves-light" onClick={showCityForm}><i class="mdi mdi-plus"></i></btn>
                    }


                </div>
                <div class="divider"></div>
                <div className="row">
                    <div className="col s12">
                        {
                            citySettingReducer.cityArray.map(function (item) {
                                return (
                                    <div className="col s2">
                                        <div className="col s12 city_model_panel z-depth-1 center-align">{item.id}-{item.city_name}</div>
                                    </div>
                                )})
                        }
                    </div>
                </div>
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        citySettingReducer : state.CitySettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCityList: () => {
        dispatch(citySettingAction.getCityList())
    },
    setCityFormFlag: (flag) => {
        dispatch(CitySettingActionType.setCityFormFlag(flag))
    },
    setCityName :(cityName) => {
        dispatch(CitySettingActionType.setCityName(cityName))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CitySetting)
