import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, DatePicker , Form, Select } from 'antd';
import strings from '~/localization';
import _ from 'lodash'
import { TableEditable } from '~/views/presentation/ui/tables';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import {getAddressTypes, getProvinces, getDistrict} from '~/state/ducks/appApis/actions'
import { showError } from '~/configs/ServerErrors';
import { getArray } from '~/views/utilities/helpers/utilObject';
import { FastBackwardFilled } from '@ant-design/icons';

class AddressesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource : (this.props.addresses || []).map(item=>({
      ...item,
      countryName: strings.vietnam
    }))} 
  }

  componentWillReceiveProps(nextProps){
    if(this.state.dataSource !== nextProps.addresses){
      this.setState({dataSource: (nextProps.addresses || []).map(item=>({
        ...item,
        countryName: strings.vietnam
      }))})
    }
  }

  handleAddRow=()=>{
    return {
      countryName: strings.vietnam
    }
  }
  handleChangedData=(index, dataIndex, dataSource)=>{
    const {getDistrict} = this.props
    this.props.onChange && this.props.onChange(dataSource)
    if(dataIndex == 'provinceId'){
      let provinceId = dataSource[index][dataIndex]
      if(provinceId){
        getDistrict(provinceId)
        .then(({res})=>{
          let row = dataSource[index]
          row.districts = getArray(res, undefined, []).map(item=>({
            value: item.id,
            label: item.name || ''
          }))
          row.districtId = undefined;
          this.setState({dataSource: dataSource})
          
        })
        .catch(err=>{ showError(err)})
      }
    }
  }
  render() {

    let columns = [
      {
        title: strings.address_type,
        dataIndex: 'typeId',
        editable: true,
        width: '18%',
        required: true,
        placeholder: strings.address_type,
        type: 'select',
        options: this.props.addressType || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.address,
        dataIndex: 'address1',
        width: '18%',
        editable: true,
        required: true,
        placeholder: strings.address,
        type: 'text',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.country,
        dataIndex: 'countryName',
        editable: false,
        required: true,
        width: '18%',
        placeholder: strings.country,
        type: 'text'
      },
      {
        title: strings.city_or_province,
        dataIndex: 'provinceId',
        editable: true,
        required: true,
        width: '18%',
        placeholder: strings.city_or_province,
        type: 'select',
        options: this.props.provinces || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.district,
        dataIndex: 'districtId',
        editable: true,
        required: true,
        width: '18%',
        placeholder: strings.district,
        type: 'select',
        optionIndex: 'districts',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.postcode,
        dataIndex: 'areaCode',
        width: '18%',
        editable: true,
        required: true,
        placeholder: strings.postcode,
        type: 'text',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
    ];

    return (
      <div>
        <TableEditable changedData={this.handleChangedData} handleAddRow={this.handleAddRow} dataSource={this.state.dataSource} columns={columns}/>
      </div>
    );
  }
}

export default compose(
  connect(null,{
    getAddressTypes,
    getProvinces,
    getDistrict
  }),
  withState('addressType','setAddressType',[]),
  withState('provinces','setProvinces',[]),
  withHandlers({
    /**
     * address types
     */
    fetchAddressTypes: props =>()=>{
      const {getAddressTypes, setAddressType} = props
      getAddressTypes()
      .then(({res})=>{
        setAddressType(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err=>{
        showError(err)
      })
    },
    /**
     * locations
     */
    fetchProvinces: props => ()=>{
      const {getProvinces, setProvinces} = props
      getProvinces()
      .then(({res})=>{
        setProvinces(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err=> showError(err))
    }
  }),
  lifecycle({
    componentDidMount(){
      const {fetchAddressTypes, fetchProvinces} = this.props
      fetchAddressTypes()
      fetchProvinces()
    }
  })
)(AddressesForm)