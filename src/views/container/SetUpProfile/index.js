import React from 'react'
import styled from 'styled-components'
import { Card, Steps, Divider, Button, message } from 'antd';
import strings from '~/localization';
import PersonalInfoForms from './PersonalInfoForm'
import FarmingExperienceForm from './FarmingExperienceForm'
import LicenceForm from './LicenceForm'
import { UIButton } from '~/views/presentation/ui/buttons';
import { compose, withState, withHandlers } from 'recompose';
import sampleData from './sampleData'
import { withRouter } from 'react-router-dom';
import CompletedSetUpForm from './CompletedSetUpForm';
import { connect } from 'react-redux';
import { LOGIN_PATH, APP_DEFAULT_PATH, DASHBOARD_PATH } from '~/configs/routesConfig'
import { updateProfile } from '~/state/ducks/authUser/actions'
import { showError } from '~/configs/ServerErrors';
const { Step } = Steps;

const ContainerStyle = styled.div`
  justify-content: center;
  display: flex;
  // min-height: 100vh;
  padding-top: 20px;
  padding-bottom: 20px;
  .container {
    max-width: 1220px !important;
    background: #fff;
    border-radius: 5px;
  }
  .title-value{
    font-weight: bold;
    color:rgb(102, 102, 102);
    font-size: 16px
  }
  .thermometer__statistics{
    li{
      font-style:normal;
    }
  }
  @media (min-width: 1200px){ .container { max-width: 1220px; } }
  @media (min-width: 1200px) { .container { max-width: 1140px; } }
  @media (min-width: 992px) { .container { max-width: 960px; } }
  @media (min-width: 768px) { .container { max-width: 720px; } }
  @media (min-width: 576px) { .container { max-width: 540px; } }
`

class SetUpProfile extends React.PureComponent {
  state = {
    current: 0,
  }
  onChange = current => {
    console.log('onChange:', current);
    if (current < 3) {
      this.setState({ current });
    }


  }
  renderStepContent = () => {
    const { persionalInfo } = this.props
    // console.log("tesst", persionalInfo);
    switch (this.state.current) {
      case 0: return <PersonalInfoForms info={persionalInfo} />
      case 1: return <FarmingExperienceForm info={persionalInfo} />
      case 2: return <LicenceForm info={persionalInfo} />
      case 3: return <CompletedSetUpForm />
    }
  }


  componentDidMount() {
    if (!this.props.user) { this.props.history.push(LOGIN_PATH) }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) { this.props.history.push(LOGIN_PATH) }
  }

  handleNext = () => {
    if (this.state.current === 3) {
      this.props.handleUpdateProfile()
    } else { this.setState({ current: this.state.current + 1 }) }

  }

  render() {
    const { current } = this.state;
    return <ContainerStyle>
      <div className="container">
        <Card title={strings.setup_profile} bordered={false} >
          <Steps current={current} onChange={this.onChange} >
            <Step title={strings.personal_info} />
            <Step title={strings.farming_experience} />
            <Step title={strings.certificate} />
            <Step title={strings.completed} />
          </Steps>
          <Divider className='mb-5' />
          {this.renderStepContent()}
        </Card>
        <div className='d-flex justify-content-end mb-5' style={{ paddingRight: '24px' }}>
          {this.state.current !== 3 && <Button type='dashed' onClick={() => this.props.history.push(APP_DEFAULT_PATH)}>{strings.skip_setup}</Button>}
          <UIButton
            type="secondary"
            className='ml-2'
            onClick={this.handleNext}
            htmlType="button">
            <span>{this.state.current === 3 ? strings.completed : strings.continue}</span>
          </UIButton>
        </div>
      </div>
    </ContainerStyle>
  }
}

export default compose(
  connect((state) => ({
    user: state['authUser'].user
  }), {
    updateProfile
  }),
  withRouter,
  withState('persionalInfo', 'setPersionalInfo', {
    "name": undefined,
    "shortName": undefined,
    "birthday": undefined,
    "phone": undefined,
    "email": undefined,
    "profession": undefined,
    "gender": undefined,
    "avatar": undefined,
    "logo": undefined,
    "website": undefined,
    "description": undefined,
    "professionId": undefined,
    "literacyId": undefined,
    "addresses": [],
    "familyRegisters": [],
    "identityPapers": [],
    "degrees": [],
    "farmingExperiences": [],
    "incomes": [],
    "certifications": [],
    "bankAccounts": []
  }),
  withHandlers({
    handleUpdateProfile: props => () => {
      const { updateProfile, persionalInfo, history } = props
      updateProfile(persionalInfo)
        .then(({ res }) => {
          message.success(strings.update_profile_successful)
          history.push(DASHBOARD_PATH)
        })
        .catch(err => showError(err))
    }
  })
)(SetUpProfile)