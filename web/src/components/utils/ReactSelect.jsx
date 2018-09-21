import React from 'react';
import Select from 'react-select';

/**
 * 自定义封装react-select组件
 */
const ReactSelect = (props) => {
    // options：下拉菜单列表数据，接受类型为，value,label
    // defaultValue：默认值
    // searchable：是否提供检索功能
    // placeholder：提示文字
    const {options, input: {onChange, value}, meta: {touched, error}, defaultValue, searchable, placeholder} = props;
    return (
        <div>
            <Select
                options={options}
                onChange={onChange}
                value={value}
                // value={selectValue}
                // onChange={(option) => {
                //     console.log('option111111++++++++++++++++++++-------------------------', option);
                //     onChange(option);
                //     onInputChange(option);
                //     }
                // }
                defaultValue={defaultValue}
                isSearchable={searchable}
                placeholder={placeholder}
                styles={singleStyles}
                isClearable={false}
                // autoFocus='true'
                // styles={error === "" ? singleStyles : singleErrStyles}
                // isRtl={true}
                // onFocus={null}
                // className="temp"
                // onBlur={onInputChange}
                // onInputChange={onInputChange}
                // onMenuClose={onInputChange}

            />
            {(touched && (error && <span className="error-msg">{error}</span>))}
        </div>
    )
};

/**
 * 单选下拉菜单样式
 */
const singleStyles = {
    control: (styles, {isFocused}) => ({
        ...styles,
        height: '46px',
        borderRadius: '0',
        boxShadow: '0',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        // borderBottom: '1px solid #26a69a',
        background: '#FAFAFA',
        // margin: "0 0 8px 0",
        margin: "0 0 20px 0",
        borderColor: isFocused ? '#26a69a' : '#ACACAC',
        ':hover': {
            borderColor: "#26a69a"
        }
    }),
    // input: styles => ({...styles, border: '2px solid #ff0000'}),
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    // singleValue: (base, state) => {
    //     return { ...base, color: state.isFocused ? 'blue' : 'red' };
    // }
    valueContainer: styles => ({...styles, paddingLeft: '0'})
};

/**
 * 单选下拉菜单样式（自定义error style，暂未使用）
 */
const singleErrStyles = {
    control: styles => ({
        ...styles,
        height: '47px',
        borderRadius: "0",
        borderTop: "0",
        borderLeft: "0",
        borderRight: "0",
        margin: "0 0 8px 0",
        borderBottom: '2px solid #ff0000'
    }),
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    valueContainer: styles => ({...styles, paddingLeft: '0'})
};

/**
 * 自定义封装react-select组件
 * @type {function(*)}
 */
module.exports = ReactSelect;