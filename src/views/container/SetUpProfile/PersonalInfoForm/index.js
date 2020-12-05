import React from 'react'
import { compose, withHandlers, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import * as yup from 'yup';
import moment from 'moment'
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { InputField, DatePickerField, SelectField } from '~/views/presentation/ui/fields';
import strings from '~/localization';
import UtilDate from '~/views/utilities/helpers/UtilDate';
import AvatarUpload from '~/views/presentation/ui/upload/AvatarUpload';
import DocumentsForm from './DocumentsForm'
import AddressesForm from './AddressesForm'
import CertificatesForm from './CertificatesForm'
import IncomeForm from './IncomeForm'
import BanksForm from './BanksForm'
import FamilyForm from './FamilyForm'
import { Tabs, Form } from 'antd';
import _, { values } from 'lodash'
import { phoneNRValidate, emailNRValidate, stringRequiredField, emailValidate } from '~/views/utilities/validation/input'
import { getLiteracies, getProfessions } from '~/state/ducks/appApis/actions'
import { showError } from '~/configs/ServerErrors';
import { getArray } from '~/views/utilities/helpers/utilObject';
const { TabPane } = Tabs;


const validationSchema = yup.object().shape({
  phone: phoneNRValidate,
  email: emailNRValidate,
});

class PersonalInfoForms extends React.PureComponent {
  componentWillUnmount() {
    const { values, errors } = this.props
    let keys = Object.keys(values).filter(key => !_.isArray(values[key]) && !_.isObject(values[key]) && !errors[key])
    let modifyObject = keys.reduce((prev, curr) => {
      prev[curr] = values[curr]
      return prev
    }, {})

    Object.keys(modifyObject).map(key => {
      this.props.info[key] = modifyObject[key]
    })

  }
  /**
   * 
   * @param {*} prvDataSource - the dataSource will be updated
   */
  updateDataSource = (prvDataSource) => (dataSource) => {
    while (prvDataSource.length) {
      prvDataSource.shift()
    }
    dataSource.forEach(item => {
      prvDataSource.push(item)
    })
  }
  render() {
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
      handleChangeDate,
      literacies,
      professions
    } = this.props;
    console.log('props: ', this.props);

    let birthday = moment.utc(values.birthday, UtilDate.formatDateTimeServer).local()

    return <div >
      <Form className='row d-flex flex-row-reverse' >
        <div className='col-12 col-md-6 d-flex justify-content-center'>
          <AvatarUpload />
        </div>
        <div className='col-12 col-md-6'>
          <InputField
            validatestatus={touched.name && errors.name ? 'error' : undefined}
            help={touched.name && errors.name ? errors.name : ''}
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={strings.full_name}
            label={strings.full_name}
          />
          <DatePickerField
            mode='date'
            name="birthday"
            value={birthday.isValid() ? birthday : undefined}
            format={UtilDate.formatDateLocal}
            label={strings.birthday_placeholder}
            placeholder={UtilDate.formatDateLocal}
            onChange={handleChangeDate(this.props)}
          />
        </div>
      </Form>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <InputField
            validatestatus={touched.phone && errors.phone ? 'error' : undefined}
            help={touched.phone && errors.phone ? errors.phone : ''}
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={strings.phone}
            label={strings.phone}
          />
          <InputField
            validatestatus={touched.email && errors.email ? 'error' : undefined}
            help={touched.email && errors.email ? errors.email : ''}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={strings.email}
            label={strings.email}
          />
        </div>
        <div className='col-12 col-md-6'>
          <SelectField
            data={literacies}
            value={values.literacyId}
            onChange={(value) => { setFieldValue('literacyId', value) }}
            iconEnd="caret-down"
            placeholder={strings.level}
            label={strings.level}
          />
          <SelectField
            data={professions}
            value={values.professionId}
            onChange={(value) => { setFieldValue('professionId', value) }}
            iconEnd="caret-down"
            placeholder={strings.career}
            label={strings.career}
          />
        </div>
      </div>
      <div className='mt-4'>
        <Tabs defaultActiveKey="1" type="card" size={'middle'}>
          <TabPane tab={strings.identification_documents} key="1">
            <DocumentsForm onChange={this.updateDataSource(this.props.info.identityPapers)} identityPapers={this.props.info.identityPapers || []} />
          </TabPane>
          <TabPane tab={strings.address} key="2">
            <AddressesForm onChange={this.updateDataSource(this.props.info.addresses)} addresses={this.props.info.addresses || []} />
          </TabPane>
          <TabPane tab={strings.degree} key="3">
            <CertificatesForm onChange={this.updateDataSource(this.props.info.degrees)} degrees={this.props.info.degrees} />
          </TabPane>
          <TabPane tab={strings.income} key="4">
            <IncomeForm onChange={this.updateDataSource(this.props.info.incomes)} incomes={this.props.info.incomes} />
          </TabPane>
          <TabPane tab={strings.family} key="5">
            <FamilyForm onChange={this.updateDataSource(this.props.info.familyRegisters)} familyRegisters={this.props.info.familyRegisters} />
          </TabPane>
          <TabPane tab={strings.bank} key="6">
            <BanksForm onChange={this.updateDataSource(this.props.info.bankAccounts)} bankAccounts={this.props.info.bankAccounts} />
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
      getLiteracies,
      getProfessions
    }
  ),
  withState('literacies', 'setLiteracies', []),
  withState('professions', 'setProfessions', []),
  withHandlers({
    handleChangeDate: p => props => date => {
      const { setFieldValue } = props
      if (!_.isNil(date)) { setFieldValue('birthday', date.format(UtilDate.formatDateTimeServer)) }
      else { setFieldValue('birthday', undefined) }
    },
    fetchLiteracies: props => () => {
      const { getLiteracies, setLiteracies } = props
      getLiteracies()
        .then(({ res }) => {
          setLiteracies(getArray(res, undefined, []).map(item => ({
            value: item.id,
            label: item.name || ''
          })))
        })
        .catch(err => showError(err))
    },
    fetchProfessions: props => () => {
      const { getProfessions, setProfessions } = props
      getProfessions()
        .then(({ res }) => {
          setProfessions(getArray(res, undefined, []).map(item => ({
            value: item.id,
            label: item.name || ''
          })))
        })
        .catch(err => showError(err))
    }
  }),
  withFormik({
    displayName: 'personalInfoForm',
    validationSchema: validationSchema,
    mapPropsToValues: props => ({}),
    // handleSubmit: async (values, { props, setSubmitting }) => {}
  }),
  lifecycle({
    componentDidMount() {
      const { fetchLiteracies, fetchProfessions } = this.props
      fetchLiteracies()
      fetchProfessions()
    }
  })
)(PersonalInfoForms)
