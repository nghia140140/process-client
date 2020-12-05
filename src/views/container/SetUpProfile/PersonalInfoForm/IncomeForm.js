import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, DatePicker , Form, Select } from 'antd';
import strings from '~/localization';
import _ from 'lodash'
import { TableEditable } from '~/views/presentation/ui/tables';
import { compose, withHandlers, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import {getIncomes} from '~/state/ducks/appApis/actions'
import { showError } from '~/configs/ServerErrors';
import { getArray } from '~/views/utilities/helpers/utilObject';

class IncomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: this.props.incomes || []}
  }

  componentWillReceiveProps(nextProps){ 
    if(this.state.dataSource !== nextProps.incomes){
      this.setState({dataSource: nextProps.incomes || []})
    }
  }
  handleChangedData=(index, dataIndex, dataSource)=>{
    this.props.onChange && this.props.onChange(dataSource)
  }


  render() {
    let columns = [
      {
        title: strings.income_type,
        dataIndex: 'typeId',
        width: '18%',
        editable: true,
        required: true,
        placeholder: strings.income_type,
        type: 'select',
        options: this.props.incomeTypes || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.description,
        dataIndex: 'description',
        width: '18%',
        editable: true,
        placeholder: strings.description,
        type: 'text',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.amount_of_money,
        dataIndex: 'incomeValue',
        width: '18%',
        editable: true,
        required: true,
        placeholder: strings.amount_of_money,
        type: 'number'
      },
    ];

    return (
      <div>
        <TableEditable changedData={this.handleChangedData} dataSource={this.state.dataSource} columns={columns}/>
      </div>
    );
  }
}

export default compose(
  connect(null,{
    getIncomes
  }),
  withState('incomeTypes','setIncomeTypes',[]),
  withHandlers({
    fetchIncomes: props =>()=>{
      const {getIncomes, setIncomeTypes} = props
      getIncomes()
      .then(({res})=>{
        setIncomeTypes(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err => showError(err))
    }
  }),
  lifecycle({
    componentDidMount(){
      const {fetchIncomes} = this.props
      fetchIncomes()
    }
  })
)(IncomeForm)