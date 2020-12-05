import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, DatePicker , Form, Select } from 'antd';
import strings from '~/localization';
import _ from 'lodash'
import { TableEditable } from '~/views/presentation/ui/tables';
import { compose, withHandlers, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import {getIdentityTypes, getProvinces} from '~/state/ducks/appApis/actions'
import { getArray } from '~/views/utilities/helpers/utilObject';
import { showError } from '~/configs/ServerErrors';


class DocumentsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dataSource: this.props.identityPapers || []}

  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.identityPapers != this.state.dataSource){
      this.setState({dataSource: nextProps.identityPapers || []})
    }
  }
  handleAddRow=()=>{
    return {
      kyc: false
    }
  }

  handleChangedData=(index, dataIndex, dataSource)=>{
    this.props.onChange && this.props.onChange(dataSource)
  }


  render() {
    let columns = [
      {
        title: strings.document_type,
        dataIndex: 'typeId',
        width: '20%',
        editable: true,
        required: true,
        placeholder: strings.document_type,
        type: 'select',
        options: this.props.identityTypes || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.identity_number,
        dataIndex: 'number',
        width: '20%',
        editable: true,
        required: true,
        placeholder: strings.identity_number,
        type: 'text',
        rules:[{
          pattern: /^[0-9]{1,15}$/g,
          message: strings.invalid_format
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
      {
        title: strings.identification,
        dataIndex: 'images',
        width: '15%',
        editable: true,
        placeholder: strings.identification,
        type: 'images',
        rules:[{
          len: 1,
          message: strings.required
        }]
      },
      {
        title: strings.kyc,
        dataIndex: 'kyc',
        width: '15%',
        editable: false,
        placeholder: strings.kyc,
        type: 'select',
        options: [{ value: false , label: strings.not_authenticated}, { value: true , label: strings.endorsed}],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
    ];

    return (
      <div>
        <TableEditable handleAddRow={this.handleAddRow} changedData={this.handleChangedData} dataSource={this.state.dataSource} columns={columns}/>
      </div>
    );
  }
}

export default compose(
  connect(null,{
    getIdentityTypes,
    getProvinces
  }),
  withState('identityTypes', 'setIdentityTypes', []),
  withState('provinces','setProvinces',[]),
  withHandlers({
    /**
     * provinces
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
      .catch(err=>{
        showError(err)
      })
    },
    /**
     * identity types
     */
    fetchIdentityType: props => ()=>{
      const {getIdentityTypes, setIdentityTypes} = props
      getIdentityTypes()
      .then(({res})=>{
        setIdentityTypes(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err=> showError(err))
    }
  }),
  lifecycle({
    componentDidMount(){
      const {fetchIdentityType, fetchProvinces} = this.props
      fetchIdentityType()
      fetchProvinces()
    }
  })
)(DocumentsForm)