import React, { useState, useEffect } from 'react'
import { Steps, Divider, Button, message } from 'antd';
import styled from "styled-components"
import { Card } from 'antd';
import Information from './Information';
import Complete from './Complete';
import strings from "~/localization";
import moment from "moment";
import _ from 'lodash'
import { LOGIN_PATH, APP_DEFAULT_PATH, DASHBOARD_PATH } from '~/configs/routesConfig'
import { useHistory, withRouter } from "react-router-dom";
import "./index.scss"

import {
    getWeightUnitAction,
    getAreaUnitAction,
    getCertifycateOfLandsAction,
    getAllFarmsAction
} from '~/state/ducks/season/actions'
import { useDispatch, useSelector } from 'react-redux';


const { Step } = Steps;

const Container = styled.div`
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


    @media (max-width: 1200px){ .container { max-width: 1220px; } }
    @media (max-width: 992px) { .container { max-width: 960px; } }
    @media (max-width: 768px) { .container { max-width: 720px; } }
    @media (max-width: 576px) { .container { max-width: 540px; } }
`

function AddFarm() {
    const [step, setStep] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.authUser.user);
    const weightUnit = useSelector(state => state.seasonData.weightUnit);
    const areaUnit = useSelector(state => state.seasonData.areaUnit);
    const [seasonInfo, setSeasonInfo] = useState({
        farm_id: undefined,
        farm_name: "",
        email: "",
        phone: "",
        
        crop_info: [],
    })

    useEffect(() => {

        dispatch(getAllFarmsAction());
        dispatch(getWeightUnitAction());
        dispatch(getAreaUnitAction());
        dispatch(getCertifycateOfLandsAction());
    }, [])

    useEffect(() => {
        if (!user) {
            message.warning("Hết phiên đăng nhập!")
            history.push(LOGIN_PATH);
        }
    }, [user])
    useEffect(() => {
        const obj = {
            ...seasonInfo,
            unit_area: _.isArray(areaUnit) && areaUnit.length > 0 ? areaUnit[0].id : '',
            unit_productivity: _.isArray(weightUnit) && weightUnit.length > 0 ? weightUnit[0].id : ''
        }
        setSeasonInfo(obj);
    }, [weightUnit, areaUnit])



    const updateSeasonInfo = (info) => {
        // console.log({ info });
        setSeasonInfo((prevState) => ({ ...prevState, ...info }));
    }

    const handleChange = (currentStep) => {
        if (currentStep < 3) {
            setStep(currentStep);
        }
    }

    const renderComponent = () => {
        switch (step) {
            case 0:
                return <Information info={seasonInfo} updateInfo={updateSeasonInfo} />;
            case 1:
                return <Complete />
        }
    }

    const handleOnclickNext = () => {
        if (step < 1) {
            setStep(step + 1);
        } else {
            console.log('Finish');
        }
    }
    // console.log({ step });
    // console.log({ seasonInfo });
    // console.log({ listErr });
    return (
        <Container>
            <div className="container">
                <Card title="Thêm Trang trại" bordered={false}>
                    <Steps current={step} onChange={handleChange}>
                        <Step title="Thông tin chung" />
                        {/* <Step title="Quy trình" />
                        <Step title="Đầu vào" /> */}
                        <Step title="Hoàn thành" />
                    </Steps>
                    <Divider className="" />
                    {
                        renderComponent()
                    }

                </Card>
                <div className=" d-flex justify-content-end  mb-5 pr-5">
                    <Button type="dashed pl-5 pr-5 mr-2" onClick={() => { history.push(DASHBOARD_PATH) }}>{strings.skip_setup}</Button>
                    <Button type="primary pl-5 pr-5" onClick={handleOnclickNext}>
                        {step < 1 ? strings.continue : strings.completed}
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default AddFarm;
