import React from 'react'
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { withFormik, validateYupSchema } from 'formik';
import { withRouter } from 'react-router-dom';
import { InputField, DatePickerField, SelectField, TextAreaField } from '~/views/presentation/ui/fields';
import strings from '~/localization';
import { Tabs, Card, Button, Form, message } from 'antd';
import { UIButton } from '~/views/presentation/ui/buttons';
import {getUnits, getAgricultureTypes, getQuanlities, getProductTypes} from '~/state/ducks/appApis/actions'
import { showError } from '~/configs/ServerErrors';
import { getArray } from '~/views/utilities/helpers/utilObject';
import UtilDate from '~/views/utilities/helpers/UtilDate';
import moment from 'moment'
import { TableEditable } from '~/views/presentation/ui/tables';
import {stringRequiredField, numberValidate} from '~/views/utilities/validation/input'
import _ from 'lodash';
const { TabPane } = Tabs;

const validationSchema =  yup.object().shape({
  "cultivationTypeId": numberValidate,
  "productTypeId": numberValidate,
  "qualityTypeId": numberValidate,
  "startDate": stringRequiredField(),
  "endDate": stringRequiredField(),
  "quantity": numberValidate,
  "unitId": numberValidate
})

const scrollToBottom=()=>{
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });
}

const scrollToTop=()=>{
  window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
}
class FarmingExperienceForm extends React.PureComponent{

  handleSaveValues =()=>{
    const {values, setValues, setFieldTouched, setErrors} = this.props

    let startDate = moment.utc(values.startDate)
    let endDate = moment.utc(values.endDate)
    if(startDate.isAfter(endDate)){
      message.error(strings.start_date_greater_than_end_date)
      return
    }


    if(values.key >= 0){
      if((this.props.info.farmingExperiences || []).length > values.key){
        let keys = Object.keys(values).filter(key => !_.isArray(values[key]) && !_.isObject(values[key]) )
        let modifyObject = keys.reduce((prev,curr)=> {
          prev[curr] = values[curr]
          return prev
        },{})
        this.props.info.farmingExperiences[values.key] = modifyObject
      }
      Object.keys(values).map(key=> setFieldTouched(key,false))
      setValues({})
      scrollToBottom()
    }
    else{
      let keys = Object.keys(values).filter(key => !_.isArray(values[key]) && !_.isObject(values[key]) )
      let modifyObject = keys.reduce((prev,curr)=> {
        prev[curr] = values[curr]
        return prev
      },{})
      this.props.info.farmingExperiences.push(modifyObject);
      this.props.info.farmingExperiences.forEach((item, index)=>{
        item.key = index
      })
      Object.keys(values).map(key=> setFieldTouched(key,false))
      setValues({})
      scrollToBottom()
    }
  }
  handleSelectRow=(r)=>{
    const {setValues} = this.props
    setValues(r)
    scrollToTop()
  }
  handleChange = event =>{
    const {
      handleChange, setFieldTouched
    } = this.props;
    setFieldTouched(event.target.name, true);
    handleChange(event);
  }
  render(){
    const {
			values,
			handleChange,
			handleBlur,
			touched,
      errors,
      handleChangeStartDate,
      handleChangeEndDate,
			isValid,
			isSubmitting,
      history,
      setFieldValue,
      setFieldTouched,
      handleCancelChange
    } = this.props;

    let startDate = moment.utc(values.startDate, UtilDate.formatDateTimeServer).local()
    let endDate = moment.utc(values.endDate, UtilDate.formatDateTimeServer).local()

    const columns = [
      {
        title: strings.type_of,
        dataIndex: 'cultivationTypeId',
        width: '10%',
        editable: false,
        placeholder: strings.type_of,
        type: 'select',
        options: this.props.agricultureTypes || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      }, 
      {
        title: strings.product,
        placeholder: strings.product,
        dataIndex: 'productTypeId',
        key: 'productTypeId',
        width: '15%',
        type: 'select',
        options: this.props.productTypes || []
      },  
      {
        title: strings.start_date,
        dataIndex: 'startDate',
        key: 'startDate',
        placeholder: strings.start_date,
        type: 'date',
        width: '15%',
      },  
      {
        title: strings.end_date,
        dataIndex: 'endDate',
        key: 'endDate',
        placeholder: strings.end_date,
        type: 'date',
        width: '15%',
      },  
      {
        title: strings.yield,
        dataIndex: 'quantity',
        placeholder: strings.yield,
        key: 'quantity',
        width: '15%',
      },  
      {
        title: strings.quanlity,
        dataIndex: 'qualityTypeId',
        key: 'qualityTypeId',
        placeholder: strings.quanlity,
        type: 'select',
        options: this.props.quanlities || [],
        width: '15%',
      },   
  ];

    
    return <div>
          <Form >
          <div className='row'>
                  <div className='col-12 col-md-6 mb-3'>
                    <Card >
                      <SelectField
                          validateStatus={
                              touched.cultivationTypeId && errors.cultivationTypeId ? "error" : undefined
                          }
                          help={touched.cultivationTypeId && errors.cultivationTypeId ? errors.cultivationTypeId : ""}
                          data={this.props.agricultureTypes || []}
                          value={values.cultivationTypeId}
                          onChange={(value)=>{
                            setFieldValue('cultivationTypeId',value)
                            setFieldTouched('cultivationTypeId')
                          }}
                          iconEnd="caret-down"
                          required
                          placeholder={strings.type_of}
                          label={strings.type_of}
                      />
                      <DatePickerField
                          validateStatus={
                              touched.startDate && errors.startDate ? "error" : undefined
                          }
                          help={touched.startDate && errors.startDate ? errors.startDate : ""}
                          name='startDate'
                          required
                          value={startDate.isValid() ? startDate : undefined}
                          onChange={handleChangeStartDate(this.props)}
                          onBlur={handleBlur}
                          label={strings.start_date}
                          placeholder={strings.start_date}
                      />
                      <DatePickerField
                          validateStatus={
                              touched.endDate && errors.endDate ? "error" : undefined
                          }
                          help={touched.endDate && errors.endDate ? errors.endDate : ""}
                          name='endDate'
                          required
                          value={endDate.isValid() ? endDate : undefined}
                          onChange={handleChangeEndDate(this.props)}
                          onBlur={handleBlur}
                          label={strings.end_date}
                          placeholder={strings.end_date}
                      />
                    </Card>
                  </div>
                  <div className='col-12 col-md-6 mb-3'>
                    <Card >
                      <SelectField
                            validateStatus={
                                touched.productTypeId && errors.productTypeId ? "error" : undefined
                            }
                            help={touched.productTypeId && errors.productTypeId ? errors.productTypeId : ""}
                            data={this.props.productTypes  || []}
                            value={values.productTypeId}
                            required
                            onChange={(value)=>{
                              setFieldValue('productTypeId',value)
                              setFieldTouched('productTypeId')
                            }}
                            iconEnd="caret-down"
                            placeholder={strings.product_type}
                            label={strings.product_type}
                        />
                       <div className='row'>
                         <div className='col-8 pr-2'>
                         <InputField
                            validatestatus={touched.quantity && errors.quantity ? 'error' : undefined}
                            help={touched.quantity && errors.quantity ? errors.quantity : ''}
                            name="quantity"
                            type='number'
                            required
                            value={values.quantity}
                            onChange={this.handleChange}
                            onBlur={handleBlur}
                            placeholder={strings.yield}
                            label={strings.yield}
                          />
                         </div>
                         <div className='col-4 pl-2'>
                         <SelectField
                            validateStatus={
                              touched.unitId && errors.unitId ? "error" : undefined
                            }
                            help={touched.unitId && errors.unitId ? errors.unitId : ""}
                            data={this.props.units || []}
                            value={ values.unitId }
                            required
                            onChange={value=> {
                              setFieldValue('unitId',value)
                              setFieldTouched('unitId')
                            }}
                            iconEnd="caret-down"
                            placeholder={strings.unit}
                            label={strings.unit}
                        />
                         </div>
                       </div>
                       <SelectField
                          data={this.props.quanlities || []}
                          value={values.qualityTypeId}
                          required
                          onChange={(value)=>{setFieldValue('qualityTypeId', value)}}
                          iconEnd="caret-down"
                          placeholder={strings.quanlity}
                          label={strings.quanlity}
                      />
                    </Card>
                  </div>
              </div>
              <div >
                <TextAreaField
                      validateStatus={
                          touched.description && errors.description ? "error" : undefined
                      }
                      help={touched.description && errors.description ? errors.description : ""}
                      name='description'
                      type="text"
                      autoSize={{ minRows: 4, maxRows: 6 }}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label={strings.description}
                      placeholder={strings.more_description}
                  />
              </div>
          <div>
            <UIButton
                type="primary"
                htmlType="submit"
                disabled={!isValid}
                onClick={this.handleSaveValues}>
                <span>{strings.save}</span>
            </UIButton>
            <UIButton
                type="secondary"
                className='ml-2'
                htmlType="button"
                onClick={handleCancelChange(this.props)}>
                <span>{strings.cancel}</span>
            </UIButton>      
          </div>
          </Form>
          <div className='mt-3'>
            <Tabs defaultActiveKey="1" type="card" size={'middle'}>
              <TabPane tab={strings.history} key="1">
                <TableEditable addRowAble={false} selectedKey={values.key} onSelect={this.handleSelectRow} selectable={true} dataSource={this.props.info.farmingExperiences} columns={columns} />
              </TabPane>       
            </Tabs>
          </div>
    </div>
  }
}
export default compose(
	withRouter,
	connect(
		null,
		{
      getUnits,
      getAgricultureTypes,
      getProductTypes,
      getQuanlities
    }
  ),
  withState('units','setUnits',[]),
  withState('productTypes','setProductTypes',[]),
  withState('quanlities','setQuanlities',[]),
  withState('agricultureTypes','setAgricultureTypes',[]),
  withHandlers({
    handleCancelChange: p => props =>()=>{
        const { setValues, setTouched } = props
        setValues({})
        setTouched({})
    },
    handleChangeStartDate: p =>(props) =>(value)=>{
      const {setFieldValue, setFieldTouched} = props
      setFieldTouched('startDate')
      if(value){
        setFieldValue('startDate', value.startOf('day').utc().format(UtilDate.formatDateTimeServer))
      }
      else {
        setFieldValue('startDate', undefined)
      }
    },
    handleChangeEndDate: p =>(props) =>(value)=>{
      const {setFieldValue, setFieldTouched} = props
      setFieldTouched('endDate')
      if(value){
        setFieldValue('endDate', value.endOf('day').utc().format(UtilDate.formatDateTimeServer))
      }
      else {
        setFieldValue('endDate', undefined)
      }
    },
    /**
     * Get unit lists
     */
    fetchUnits: props =>()=>{
      const {getUnits, setUnits} = props
      getUnits()
      .then(({res})=>{ setUnits(getArray(res, undefined, []).map(item=>({ value: item.id , label: item.name || '' }))) })
      .catch(err=> showError(err))
    },
    /**
     * Get product lists
     */
    fetchProductTypes: props =>()=>{
      const {getProductTypes, setProductTypes} = props
      getProductTypes()
      .then(({res})=>{ setProductTypes(getArray(res, undefined, []).map(item=>({ value: item.id, label: item.name || '' }))) })
      .catch(err=> showError(err))
    },
  /**
   * Get quanlity lists
   */
    fetchQuanlities: props =>()=>{
      const {getQuanlities, setQuanlities} = props
      getQuanlities()
      .then(({res})=>{ setQuanlities(getArray(res, undefined, []).map(item=>({ value: item.id, label: item.name || '' }))) })
      .catch(err=> showError(err))
    },
    /**
     * Get Agriculture Types
     */
    fetchAgricultureTypes: props =>()=>{
      const {getAgricultureTypes, setAgricultureTypes} = props
      getAgricultureTypes()
      .then(({res})=>{ setAgricultureTypes(getArray(res, undefined, []).map(item=>({ value: item.id, label: item.name || '' }))) })
      .catch(err=> showError(err))
    }
  }),
	withFormik({
    displayName: 'farmingExperienceForm',
    validationSchema: validationSchema,
  }),
  lifecycle({
    componentDidMount(){
      const {fetchUnits, fetchAgricultureTypes, fetchProductTypes, fetchQuanlities} = this.props
      fetchUnits()
      fetchAgricultureTypes()
      fetchProductTypes()
      fetchQuanlities()
    }
  })
)(FarmingExperienceForm)
