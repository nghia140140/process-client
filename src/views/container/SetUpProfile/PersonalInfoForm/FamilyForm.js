import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, DatePicker , Form, Select } from 'antd';
import strings from '~/localization';
import _ from 'lodash'
import { TableEditable } from '~/views/presentation/ui/tables';
import { compose, withHandlers, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import {getProvinces, getRelationShips, getIdentityTypes} from '~/state/ducks/appApis/actions'
import { getArray } from '~/views/utilities/helpers/utilObject';
import { showError } from '~/configs/ServerErrors';

class FamilyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dataSource: this.props.familyRegisters || []}
  }
  componentWillReceiveProps(nextProps){ 
    if(this.state.dataSource !== nextProps.familyRegisters){
      this.setState({dataSource: nextProps.familyRegisters || []})
    }
  }
  handleChangedData=(index, dataIndex, dataSource)=>{
    this.props.onChange && this.props.onChange(dataSource)
  }


  render() {
    let columns = [
      {
        title: strings.relation_ship,
        dataIndex: 'relationId',
        width: '10%',
        editable: true,
        placeholder: strings.relation_ship,
        type: 'select',
        required: true,
        options: this.props.relationShips || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.full_name,
        dataIndex: 'name',
        width: '15%',
        editable: true,
        required: true,
        placeholder: strings.full_name,
        type: 'text',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.year_of_birth,
        dataIndex: 'birthday',
        width: '15%',
        editable: true,
        required: true,
        placeholder: strings.year_of_birth,
        type: 'date',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.identity_papers,
        dataIndex: 'typeId',
        width: '15%',
        editable: true,
        required: true,
        placeholder: strings.identity_papers,
        type: 'select',
        options: this.props.identityTypes || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.ID_number,
        dataIndex: 'identityNumber',
        width: '15%',
        editable: true,
        required: true,
        placeholder: strings.ID_number,
        type: 'text',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.date_of_issue,
        dataIndex: 'issuedDate',
        width: '15%',
        editable: true,
        required: true,
        placeholder: strings.date_of_issue,
        type: 'date',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.place_of_issue,
        dataIndex: 'issuedPlaceId',
        width: '15%',
        editable: true,
        required: true,
        placeholder: strings.place_of_issue,
        type: 'select',
        options: this.props.provinces || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
    ];

    return (
      <div>
        <TableEditable changedData={this.handleChangedData} dataSource={this.state.dataSource || []} columns={columns}/>
      </div>
    );
  }
}

export default compose(
  connect(null,{
    getProvinces,
    getRelationShips,
    getIdentityTypes
  }),
  withState('provinces','setProvinces',[]),
  withState('identityTypes','setIdentityTypes',[]),
  withState('relationShips','setRelationShips',[]),
  withHandlers({
    fetchProvinces: props =>()=>{
      const {getProvinces, setProvinces} = props
      getProvinces()
      .then(({res})=>{
        setProvinces(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err => showError(err))
    },
    fetchIdentityTypes: props =>()=>{
      const {getIdentityTypes, setIdentityTypes} = props
      getIdentityTypes()
      .then(({res})=>{
        setIdentityTypes(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err => showError(err))
    },
    fetchRelationShips: props =>()=>{
      const {getRelationShips, setRelationShips} = props
      getRelationShips()
      .then(({res})=>{
        setRelationShips(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err => showError(err))
    }
  }),
  lifecycle({
    componentDidMount(){
      const {fetchProvinces, fetchIdentityTypes, fetchRelationShips} = this.props
      fetchProvinces()
      fetchIdentityTypes()
      fetchRelationShips()
    }
  })
)(FamilyForm)