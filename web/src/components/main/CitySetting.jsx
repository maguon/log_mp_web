import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {CitySettingActionType} from '../../actionTypes';

const citySettingAction = require('../../actions/main/CitySettingAction');

class CitySetting extends React.Component {

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
        this.props.getCityList();
        this.props.setCityFormFlag(false);
        this.props.setCityName('');
    }

    /**
     * 显示追加城市画面
     */
    showAddCityDiv = () => {
        this.props.setCityFormFlag(true);
    };

    /**
     * 隐藏追加城市画面
     */
    hideAddCityDiv = () => {
        this.props.setCityFormFlag(false);
        this.props.setCityName('');
    };

    /**
     * 更新追加城市名称
     */
    changeCityName = (event) => {
        this.props.setCityName(event.target.value);
    };

    render() {
        const {citySettingReducer, addCity} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        城市设置
                        <div className="divider margin-top10"/>
                    </div>
                </div>

                {/* 操作按钮 部分 */}
                <div className="row">
                    {citySettingReducer.cityFormFlag ?
                        <form>
                            <div className="col s12">
                                <div className="custom-input-field col s8">
                                    <Input s={12} label="城市" maxLength="16" value={citySettingReducer.cityName} onChange={this.changeCityName}/>
                                </div>

                                <div className="col s3 right-align">
                                      <btn className="btn-floating waves-effect waves-light pink lighten-3" onClick={this.hideAddCityDiv}>
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
                                <btn className="btn-floating waves-effect waves-light custom-purple" onClick={this.showAddCityDiv}>
                                    <i className="mdi mdi-plus"/>
                                </btn>
                                <div className="divider margin-top20"/>
                            </div>
                        </div>
                    }
                </div>

                {/* 数据列表 部分 */}
                <div className="row">
                    <div className="col s12">
                        {citySettingReducer.cityArray.map(function (item) {
                            return (
                                <div className="col s2">
                                    <div className="col s12 card-unit z-depth-1 center-align">
                                        <div className={`margin-top8 margin-bottom8 ${item.city_name.length > 8 ? "fz12" : ""}`}>
                                            {item.id} - {item.city_name}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
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