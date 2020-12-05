import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, DatePicker , Form, Select } from 'antd';
import strings from '~/localization';
import _ from 'lodash'
import { TableEditable } from '~/views/presentation/ui/tables';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { getBanks, getBranches} from '~/state/ducks/appApis/actions'
import { getArray } from '~/views/utilities/helpers/utilObject';
import { showError } from '~/configs/ServerErrors';

class BanksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: this.props.bankAccounts || []}
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.bankAccounts != this.state.dataSource){
      this.setState({dataSource: nextProps.bankAccounts || []})
    }
  }
  handleChangedData=(index, dataIndex, dataSource)=>{
    this.props.onChange && this.props.onChange(dataSource)
  }


  render() {
    let columns = [
      {
        title: strings.bank_name,
        dataIndex: 'bankId',
        width: '25%',
        editable: true,
        required: true,
        placeholder: strings.bank_name,
        type: 'select',
        options: this.props.banks || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.account_name,
        dataIndex: 'accountName',
        width: '25%',
        editable: true,
        required: true,
        placeholder: strings.account_name,
        type: 'text',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.account_number,
        dataIndex: 'accountNumber',
        width: '25%',
        editable: true,
        required: true,
        placeholder: strings.account_number,
        type: 'text',
        rules:[{
          pattern: /^[0-9]{1,15}$/g,
          message: strings.invalid_format
        }]
      },
      {
        title: strings.bank_branch,
        dataIndex: 'branchId',
        width: '25%',
        editable: true,
        required: true,
        placeholder: strings.bank_branch,
        type: 'select',
        options: this.props.branches || [] ,
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
    getBanks,
    getBranches
  }),
  withState('banks','setBanks',[]),
  withState('branches','setBranches',[]),
  withHandlers({
    fetchBankes: props => ()=>{
      const {getBanks, setBanks} = props
      getBanks()
      .then(({res})=>{
        setBanks(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err=> showError(err))
    },
    fetchBranches: props => ()=>{
      const {getBranches, setBranches} = props
      getBranches()
      .then(({res})=>{
        setBranches(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err=> showError(err))
    }
  }),
  lifecycle({
    componentDidMount(){
      const {fetchBankes, fetchBranches} = this.props
      fetchBankes()
      fetchBranches()
    }
  })
)(BanksForm)