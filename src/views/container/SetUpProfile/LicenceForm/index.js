import React from 'react'
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { InputField, DatePickerField, SelectField, TextAreaField } from '~/views/presentation/ui/fields';
import strings from '~/localization';
import { Tabs, Card, message } from 'antd';
import { UIButton } from '~/views/presentation/ui/buttons';
import { TableEditable } from '~/views/presentation/ui/tables';
import LicenceUploader from './LicenceUploader'
import {getCertificationTypes} from '~/state/ducks/appApis/actions'
import { showError } from '~/configs/ServerErrors';
import { getArray } from '~/views/utilities/helpers/utilObject';
import moment from 'moment'
import _ from 'lodash'
import UtilDate from '~/views/utilities/helpers/UtilDate';
import {stringRequiredField, numberValidate} from '~/views/utilities/validation/input'

const { TabPane } = Tabs;

const validationSchema =  yup.object().shape({
  "typeId": numberValidate,
  "issuedDate": stringRequiredField(),
  "expirationDate": stringRequiredField(),
  "issuedPlace": stringRequiredField()
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
class LicenceForm extends React.PureComponent{
  handleSaveValues =()=>{
    const {values, setValues, setFieldTouched, setErrors} = this.props

    let issuedDate = moment.utc(values.issuedDate)
    let expirationDate = moment.utc(values.expirationDate)
    if(issuedDate.isAfter(expirationDate)){
      message.error(strings.issue_date_greater_than_expired_date)
      return
    }


    if(values.key >= 0){
      if((this.props.info.certifications || []).length > values.key){
        let keys = Object.keys(values).filter(key => !_.isArray(values[key]) && !_.isObject(values[key]) )
        let modifyObject = keys.reduce((prev,curr)=> {
          prev[curr] = values[curr]
          return prev
        },{})
        this.props.info.certifications[values.key] = modifyObject
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
      this.props.info.certifications.push(modifyObject);
      this.props.info.certifications.forEach((item, index)=>{
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
			handleSubmit,
			values,
			handleChange,
			handleBlur,
			touched,
			errors,
			isValid,
      isSubmitting,
      setFieldValue,
      setFieldTouched,
      handleChangeIssuedDate,
      handleChangeExpirationDate,
      handleCancelChange
    } = this.props;

    let issuedDate = moment.utc(values.issuedDate, UtilDate.formatDateTimeServer).local()
    let expirationDate = moment.utc(values.expirationDate, UtilDate.formatDateTimeServer).local()

    const columns = [
      {
        title: strings.certificate_type,
        dataIndex: 'typeId',
        key: 'typeId',
        width: '15%',
        editable: false,
        placeholder: strings.certificate_type,
        type: 'select',
        options: this.props.certificationTypes || [],
        rules:[{
          required: true,
          message: strings.required
        }]
      }, 
      {
        title: strings.issued_by,
        dataIndex: 'issuedPlace',
        key: 'issuedPlace',
        width: '15%',
        editable: false,
        placeholder: strings.certificate_type,
        type: 'text'
      },  
      {
        title: strings.date_of_issue,
        dataIndex: 'issuedDate',
        key: 'issuedDate',
        width: '15%',
        editable: false,
        placeholder: strings.date_of_issue,
        type: 'date'
      },  
      {
        title: strings.expiration_date,
        dataIndex: 'expirationDate',
        key: 'expirationDate',
        width: '15%',
        editable: false,
        placeholder: strings.certificate_type,
        type: 'date'
      },  
      {
        title: strings.kyc,
        dataIndex: 'kyc',
        key: 'kyc',
        width: '15%',
        editable: false,
        placeholder: strings.certificate_type,
        type: 'select',
        options: [{ value: false , label: strings.not_authenticated}, { value: true , label: strings.endorsed}]
      },   
  ];
    
    return <div>
              <div className='row'>
                  <div className='col-12 col-md-6 mb-3'>
                    <Card >
                      <SelectField
                          validateStatus={
                              touched.typeId && errors.typeId ? "error" : undefined
                          }
                          help={touched.typeId && errors.typeId ? errors.typeId : ""}
                          data={this.props.certificationTypes || []}
                          value={values.typeId}
                          onChange={(value)=>{
                            setFieldValue('typeId',value)
                            setFieldTouched('typeId')
                          }}
                          required
                          iconEnd="caret-down"
                          placeholder={strings.certificate_type}
                          label={strings.certificate_type}
                      />
                      <InputField
                            validatestatus={touched.issuedPlace && errors.issuedPlace ? 'error' : undefined}
                            help={touched.issuedPlace && errors.issuedPlace ? errors.issuedPlace : ''}
                            name="issuedPlace"
                            type='text'
                            required
                            value={values.issuedPlace}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={strings.issued_by}
                            label={strings.issued_by}
                          />
                      <DatePickerField
                          validateStatus={
                              touched.issuedDate && errors.issuedDate ? "error" : undefined
                          }
                          help={touched.issuedDate && errors.issuedDate ? errors.issuedDate : ""}
                          name='issuedDate'
                          required
                          value={issuedDate.isValid() ? issuedDate : undefined}
                          onChange={handleChangeIssuedDate(this.props)}
                          onBlur={handleBlur}
                          label={strings.date_of_issue}
                          placeholder={strings.date_of_issue}
                      />
                      <DatePickerField
                          validateStatus={
                              touched.expirationDate && errors.expirationDate ? "error" : undefined
                          }
                          help={touched.expirationDate && errors.expirationDate ? errors.expirationDate : ""}
                          name='expirationDate'
                          required
                          value={expirationDate.isValid() ? expirationDate : undefined}
                          onChange={handleChangeExpirationDate(this.props)}
                          onBlur={handleBlur}
                          label={strings.expiration_date}
                          placeholder={strings.expiration_date}
                      />
                    </Card>
                  </div>
                  <div className='col-12 col-md-6 mb-3'>
                    <Card >
                      <LicenceUploader />
                    </Card>
                  </div>
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
          <div className='mt-3'>
            <Tabs defaultActiveKey="1" type="card" size={'middle'}>
              <TabPane tab={strings.history} key="1">
                <TableEditable addRowAble={false} selectedKey={values.key} onSelect={this.handleSelectRow} selectable={true} dataSource={this.props.info.certifications} columns={columns}/>
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
      getCertificationTypes
    }
  ),
  withState('certificationTypes','setCertificationTypes',[]),
  withHandlers({
    handleCancelChange: p => props =>()=>{
      const { setValues, setTouched } = props
      setValues({})
      setTouched({})
    },
    handleChangeIssuedDate: p =>(props) =>(value)=>{
      const {setFieldValue, setFieldTouched} = props
      setFieldTouched('issuedDate')
      if(value){
        setFieldValue('issuedDate', value.startOf('day').utc().format(UtilDate.formatDateTimeServer))
      }
      else {
        setFieldValue('issuedDate', undefined)
      }
    },
    handleChangeExpirationDate: p =>(props) =>(value)=>{
      const {setFieldValue, setFieldTouched} = props
      setFieldTouched('expirationDate')
      if(value){
        setFieldValue('expirationDate', value.endOf('day').utc().format(UtilDate.formatDateTimeServer))
      }
      else {
        setFieldValue('expirationDate', undefined)
      }
    },
    fetchCertificationTypes: props =>()=> {
      const {getCertificationTypes, setCertificationTypes} = props
      getCertificationTypes()
      .then(({res})=>{setCertificationTypes(getArray(res, undefined, []).map(item=>({ value: item.id, label: item.name || '' })))})
      .catch(err=> showError(err))
    }
  }),
	withFormik({
    displayName: 'licenceForm',
    validationSchema: validationSchema,
    mapPropsToValues: props=>({}),
		handleSubmit: async (values, { props, setSubmitting }) => {
			
		}
  }),
  lifecycle({
    componentDidMount(){
      const { fetchCertificationTypes } = this.props;
			fetchCertificationTypes()
    }
  })
)(LicenceForm)
