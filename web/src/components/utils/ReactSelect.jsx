import React from 'react';
import Select from 'react-select';

const sysConst = require('../../util/SysConst');

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
                defaultValue={defaultValue}
                isSearchable={searchable}
                placeholder={placeholder}
                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                isClearable={false}
            />
            {(touched && (error && <span className="error-msg">{error}</span>))}
        </div>
    )
};

/**
 * 自定义封装react-select组件
 */
module.exports = ReactSelect;