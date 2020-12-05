import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, DatePicker , Form, Select, message } from 'antd';
import strings from '~/localization';
import moment from 'moment'
import _ from 'lodash'
import { TableEditable } from '~/views/presentation/ui/tables';
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import {getDegreeTypes, getSpecializes, getRankings} from '~/state/ducks/appApis/actions'
import { showError } from '~/configs/ServerErrors';
import { connect } from 'react-redux';
import { getArray } from '~/views/utilities/helpers/utilObject';
import UtilDate from '~/views/utilities/helpers/UtilDate';

class CertificatesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.degrees || []
    }
  }
  handleChangedData=(index, dataIndex, dataSource)=>{
    this.props.onChange && this.props.onChange(dataSource)
    if(dataIndex === 'startDate' || dataIndex === 'endDate'){
      let startDate = moment.utc(dataSource[index].startDate, UtilDate.formatDateTimeServer)
      let endDate = moment.utc(dataSource[index].endDate, UtilDate.formatDateTimeServer)
      if(startDate.isValid() && endDate.isValid() && startDate.isAfter(endDate)){
        let row = dataSource[index]
        row.endDate = undefined
        this.setState({dataSource: dataSource})
        message.error(strings.start_date_greater_than_end_date)
      }
    }
    
  }

  componentWillReceiveProps(nextProps){
    if(this.state.dataSource !== this.props.degrees){
        this.setState({dataSource: this.props.degrees || []})
    }
  }


  render() {
    let columns = [
      {
        title: strings.degree,
        dataIndex: 'typeId',
        width: '18%',
        editable: true,
        placeholder: strings.degree,
        type: 'select',
        required: true,
        options: this.props.degreeTypes || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.degree_of_the_school,
        dataIndex: 'issuedPlace',
        width: '18%',
        editable: true,
        required: true,
        placeholder: strings.degree_of_the_school,
        type: 'text',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.classification,
        dataIndex: 'rankingId',
        width: '18%',
        editable: true,
        required: true,
        placeholder: strings.classification,
        type: 'select',
        options: this.props.rankings || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.year_stared,
        dataIndex: 'startDate',
        width: '18%',
        editable: true,
        required: true,
        placeholder: strings.year_stared,
        type: 'date',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.year_ended,
        dataIndex: 'endDate',
        width: '18%',
        editable: true,
        required: true,
        placeholder: strings.year_ended,
        type: 'date',
        rules:[{
          required: true,
          message: strings.required
        }]
      },
      {
        title: strings.field,
        dataIndex: 'specializeId',
        width: '18%',
        editable: true,
        required: true,
        placeholder: strings.field,
        options: this.props.specializes || [],
        type: 'select',
        rules:[{
          required: true,
          message: strings.required
        }]
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
    getDegreeTypes,
    getSpecializes,
    getRankings
  }),
  withState('degreeTypes','setDegreeTypes',[]),
  withState('specializes','setSpecializes',[]),
  withState('rankings','setRankings',[]),
  withHandlers({
    fetchDegreeTypes: props =>()=>{
      const {getDegreeTypes, setDegreeTypes} = props
      getDegreeTypes()
      .then(({res})=>{
        setDegreeTypes(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err=> showError(err))
    },
    fetchSpecializes: props => ()=>{
      const {getSpecializes, setSpecializes} = props
      getSpecializes()
      .then(({res})=>{
        setSpecializes(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err=> showError(err))
    },
    fetchRankings: props => ()=>{
      const {getRankings, setRankings} = props
      getRankings()
      .then(({res})=>{
        setRankings(getArray(res, undefined, []).map(item=>({
          value: item.id,
          label: item.name || ''
        })))
      })
      .catch(err=> showError(err))
    }
  }),
  lifecycle({
    componentDidMount(){
      const {fetchDegreeTypes, fetchSpecializes, fetchRankings} = this.props
      fetchDegreeTypes()
      fetchSpecializes()
      fetchRankings()
    }
  })
)(CertificatesForm)