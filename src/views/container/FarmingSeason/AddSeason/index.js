import React, { useState, useEffect } from "react";
import { Steps, Divider, Button, message } from "antd";
import styled from "styled-components";
import { Card } from "antd";
import Information from "./Information";
import Process from "./Process";
import Materials from "../AddSeason/Materials/index";
import Complete from "./Complete";
import strings from "~/localization";
import moment from "moment";
import _ from "lodash";
import {
  LOGIN_PATH,
  APP_DEFAULT_PATH,
  DASHBOARD_PATH,
} from "~/configs/routesConfig";
import { useHistory, withRouter } from "react-router-dom";
import "./index.scss";

import {
  getWeightUnitAction,
  getAreaUnitAction,
  getCertifycateOfLandsAction,
  getAllFarmsAction,
} from "~/state/ducks/season/actions";
import { useDispatch, useSelector } from "react-redux";

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

  @media (max-width: 1200px) {
    .container {
      max-width: 1220px;
    }
  }
  @media (max-width: 992px) {
    .container {
      max-width: 960px;
    }
  }
  @media (max-width: 768px) {
    .container {
      max-width: 720px;
    }
  }
  @media (max-width: 576px) {
    .container {
      max-width: 540px;
    }
  }
`;

function AddSection() {
  const [step, setStep] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser.user);
  const weightUnit = useSelector((state) => state.seasonData.weightUnit);
  const areaUnit = useSelector((state) => state.seasonData.areaUnit);
  const [seasonInfo, setSeasonInfo] = useState({
    farm_id: undefined,
    session_name: "",
    sowing_date: moment(),
    harvest_date: undefined,
    size_percent: undefined,
    seed_density: undefined,
    gross_area: undefined,
    unit_area: "",
    gross_productivity: undefined,
    unit_productivity: "",
    crop_info: [],
    process: [],
    materials: [],
  });

  useEffect(() => {
    dispatch(getAllFarmsAction());
    dispatch(getWeightUnitAction());
    dispatch(getAreaUnitAction());
    dispatch(getCertifycateOfLandsAction());
  }, []);

  useEffect(() => {
    if (!user) {
      message.warning("Hết phiên đăng nhập!");
      history.push(LOGIN_PATH);
    }
  }, [user]);
  useEffect(() => {
    const obj = {
      ...seasonInfo,
      unit_area:
        _.isArray(areaUnit) && areaUnit.length > 0 ? areaUnit[0].id : "",
      unit_productivity:
        _.isArray(weightUnit) && weightUnit.length > 0 ? weightUnit[0].id : "",
    };
    setSeasonInfo(obj);
  }, [weightUnit, areaUnit]);

  const updateSeasonInfo = (info) => {
    // console.log({ info });
    setSeasonInfo((prevState) => ({ ...prevState, ...info }));
  };
  // const handleAddSeason = () => {
  //   fetch(API + "api/season-processes/create" + agent._id, {
  //     method: "PUT",
  //     headers: {
  //       Accept: "application/json, text/plain",
  //       "Content-Type": "application/json;charset=UTF-8",
  //     },
  //     body: JSON.stringify({
  //       name: "Season Process 1",
  //       note: "Note Season Process",
  //       description: "Description Season Process",
  //       stepsNumber: 3,
  //       interval: 3,
  //       status: "WAITING",
  //       startDate: "2020-12-17T00:00:00.000Z",
  //       endDate: "2021-02-17T00:00:00.000Z",
  //       ratings: "EXCELLENT",
  //       steps: [
  //         {
  //           name: "Season Process Step 1",
  //           description: "Description Season Process Step",
  //           startDate: "2020-12-19T00:00:00.000Z",
  //           endDate: "2021-01-01T00:00:00.000Z",
  //           interval: 3,
  //           afterDays: 3,
  //           startHour: 3,
  //           status: "ACTIVATED",
  //           note: "Note Season Process Step",
  //         },
  //         {
  //           name: "Season Process Step 1",
  //           description: "Description Season Process Step",
  //           startDate: "2020-12-19T00:00:00.000Z",
  //           endDate: "2021-01-01T00:00:00.000Z",
  //           interval: 3,
  //           afterDays: 3,
  //           startHour: 3,
  //           status: "ACTIVATED",
  //           note: "Note Season Process Step",
  //         },
  //       ],
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {})
  //     .catch((error) => {
  //       alert("error" + error);
  //     })
  //     .done();
  // };
  const handleChange = (currentStep) => {
    if (currentStep < 3) {
      setStep(currentStep);
    }
  };

  const renderComponent = () => {
    switch (step) {
      case 0:
        return <Information info={seasonInfo} updateInfo={updateSeasonInfo} />;
      case 1:
        return <Process info={seasonInfo} updateInfo={updateSeasonInfo} />;
      case 2:
        return <Materials info={seasonInfo} updateInfo={updateSeasonInfo} />;
      case 3:
        return <Complete />;
    }
  };

  const handleOnclickNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Finish");
    }
  };
  // console.log({ step });
  // console.log({ seasonInfo });
  // console.log({ listErr });
  return (
    <Container>
      <div className="container">
        <Card title="Thêm mùa vụ" bordered={false}>
          <Steps current={step} onChange={handleChange}>
            <Step title="Thông tin chung" />
            <Step title="Quy trình" />
            <Step title="Đầu vào" />
            <Step title="Hoàn thành" />
          </Steps>
          <Divider className="" />
          {renderComponent()}
        </Card>
        <div className=" d-flex justify-content-end  mb-5 pr-5">
          <Button
            type="dashed pl-5 pr-5 mr-2"
            onClick={() => {
              history.push(DASHBOARD_PATH);
            }}
          >
            {strings.skip_setup}
          </Button>
          <Button type="primary pl-5 pr-5" onClick={handleOnclickNext}>
            {step < 3 ? strings.continue : strings.completed}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default AddSection;
