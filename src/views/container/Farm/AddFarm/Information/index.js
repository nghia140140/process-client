import React, { useState, useMemo, useEffect, useRef } from "react";
import { Select, Input, DatePicker, InputNumber, Form } from "antd";
import styled from "styled-components";
import moment from "moment";
import { useFormik, FastField } from "formik";
import _ from "lodash";
import TableEdit from "../../ShareComponent/TableEdit";
import * as Yup from "yup";
import { numberValidate } from "~/views/utilities/validation/input";
import {
  Select as SelectMt,
  Input as InputMt,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import seasonApi from "~/state/ducks/season/api";
const { Option } = Select;
const formatDate = "YYYY-MM-DD";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const Label = styled.label`
  height: 23px !important;
  font-weight: 500;
  color: gray !important;
`;
const ErrorMessage = styled.span`
  font-size: 14px;
  color: #ff7a7a;
  position: absolute;
  left: 0;
  bottom: -22px;
  text-overflow: ellipsis;
  display: block;
`;
const CustomInputNumber = styled(InputNumber)`
  height: 40px;
  line-height: 40px;
  display: block;
`;

const validationSchema = Yup.object().shape({
  farm_id: Yup.string().ensure().required("Vui lòng chọn trang trại"),
  farm_name: Yup.string().required("Vui lòng nhập tên trang trại"),
  email: Yup.string().required("Vui lòng nhập email"),
  phone: Yup.string().required("Vui lòng nhập số điện thoại"),
  sowing_date: Yup.date()
    .required("Vui lòng chọn ngày xuống giống")
    .typeError("Vui lòng chọn ngày xuống giống"),
  harvest_date: Yup.date()
    .min(
      Yup.ref("sowing_date"),
      ({ min }) =>
        `Ngày thu hoạch phải sau ngày xuống giống ${moment(min).format(
          "DD/MM/YYYY"
        )} `
    )
    .required("Vui lòng chọn ngày dự kiến thu hoạch")
    .typeError("Vui lòng chọn ngày dự kiến thu hoạch"),
  size_percent: Yup.string().required("Vui lòng nhập thông tin"),
  seed_density: numberValidate.typeError("Vui lòng nhập số"),
  gross_area: numberValidate.typeError("Vui lòng nhập số"),
  gross_productivity: numberValidate.typeError("Vui lòng nhập số"),
  unit_area: Yup.string().ensure().required("Vui lòng chọn đơn vị"),
  unit_productivity: Yup.string().ensure().required("Vui lòng chọn đơn vị"),
});

function Information(props) {
  const { updateInfo, updateErrors, listErr } = props;
  const {
    farm_id,
    farm_name,
    email,
    phone,
    // size_percent,
    // seed_density,
    // gross_area,
    // unit_area,
    // gross_productivity,
    // unit_productivity,
    crop_info,
  } = props.info;

  // const dispatch = useDispatch();
  const farms = useSelector((state) => state.seasonData.farms);
  const weightUnit = useSelector((state) => state.seasonData.weightUnit);
  const areaUnit = useSelector((state) => state.seasonData.areaUnit);

  const certifycateOfLands = useSelector(
    (state) => state.seasonData.certifycateOfLands
  );
  // data options  use for table edit
  const [lookupLands, setLookupLands] = useState({});
  const [lookupProducts, setLookupProducts] = useState({});

  const [tableInfo, setTableInfo] = useState({
    data: crop_info || [],
  });

  const initialValues = {
    farm_id: farm_id || undefined,
    farm_name: farm_name || "",
    email: email || undefined,
    phone: phone || undefined,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
  });
  const { values, touched, errors, getFieldProps, setFieldValue } = formik;

  const columns = [
    {
      title: "Cây trồng",
      field: "product_id",
      lookup: lookupProducts,
      validate: (rowData) => (rowData.product_id ? true : false),
    },
    {
      title: "DT canh tác",
      field: "cultivated_area",
      type: "numeric",
      initialEditValue: {
        area: "",
        areaUnit: areaUnit.length > 0 ? areaUnit[0].id : "",
      },

      render: (rowData) => {
        if (areaUnit.length <= 0) {
          return null;
        }
        const index = _.findIndex(
          areaUnit,
          (u) => u.id === rowData.cultivated_area.areaUnit
        );
        return (
          <span>{`${rowData.cultivated_area.area} ${areaUnit[index].shortName}`}</span>
        );
      },
      editComponent: (props) => {
        // console.log({ props });
        const { onChange, value, rowData } = props; // value: { area: 150, areaUnit: 1}
        const area = parseInt(rowData.cultivated_area.area);
        const showErr = area <= 0 || _.isNaN(area);
        return (
          <div>
            <InputMt
              className={showErr ? "Mui-error" : null}
              name="cultivated_area"
              value={value.area}
              type="number"
              onChange={(e) => onChange({ ...value, area: e.target.value })}
              endAdornment={
                <SelectMt
                  position="end"
                  value={value.areaUnit}
                  onChange={(e) =>
                    onChange({ ...value, areaUnit: e.target.value })
                  }
                >
                  {_.isArray(areaUnit) &&
                    areaUnit.map((u) => {
                      return (
                        <MenuItem key={u.id} value={u.id}>
                          {u.shortName}
                        </MenuItem>
                      );
                    })}
                </SelectMt>
              }
            />
          </div>
        );
      },
      validate: (rowData) => {
        const area = parseInt(rowData.cultivated_area.area);
        return area > 0;
      },
    },
    {
      title: "Thửa đất",
      field: "catifycate_of_land_id",
      lookup: lookupLands,
      validate: (rowData) => (rowData.catifycate_of_land_id ? true : false),
    },
    {
      title: "Số cây/trụ",
      field: "seed_density",
      type: "numeric",
      validate: (rowData) => rowData.seed_density > 0,
    },
    {
      title: "Sản lượng dự kiến",
      field: "gross_productivity",
      initialEditValue: {
        quantity: "",
        unitWeight: weightUnit.length > 0 ? weightUnit[0].id : "",
      },
      validate: (rowData) => {
        const quantity = parseInt(rowData.gross_productivity.quantity);
        return quantity > 0;
      },
      render: (rowData) => {
        const index = _.findIndex(
          weightUnit,
          (u) => u.id === rowData.gross_productivity.unitWeight
        );
        return (
          <span>
            {`${rowData.gross_productivity.quantity} ${weightUnit[index].shortName}`}{" "}
          </span>
        );
      },
      editComponent: (props) => {
        const { onChange, value, rowData } = props; // value: { quantity: 145, unitWeight: 1}
        const quantity = parseInt(rowData.gross_productivity.quantity);
        const showErr = quantity <= 0 || _.isNaN(quantity);
        return (
          <InputMt
            name="gross_productivity"
            className={showErr ? "Mui-error" : null}
            type="number"
            value={value.quantity}
            onChange={(e) => onChange({ ...value, quantity: e.target.value })}
            endAdornment={
              <SelectMt
                position="end"
                value={value.unitWeight}
                onChange={(e) =>
                  onChange({ ...value, unitWeight: e.target.value })
                }
              >
                {_.isArray(weightUnit) &&
                  weightUnit.map((u) => {
                    return (
                      <MenuItem key={u.id} value={u.id}>
                        {u.shortName}
                      </MenuItem>
                    );
                  })}
              </SelectMt>
            }
          />
        );
      },
    },
    {
      title: "Ghi chú",
      field: "note",
    },
    {
      title: "Giải pháp cải tiến",
      field: "solution",
    },
  ];

//   useEffect(() => {
//     values.unit_area = unit_area;
//     values.unit_productivity = unit_productivity;
//   }, [unit_area, unit_productivity]);

  //store data to send parent component
  const currentValue = useRef({ ...values, crop_info: [...tableInfo.data] });
  useEffect(() => {
    currentValue.current = { ...values, crop_info: [...tableInfo.data] };
  }, [values, tableInfo.data]);

  //set data for column certifycate_of_land
  useEffect(() => {
    const obj = {};
    _.isArray(certifycateOfLands) &&
      certifycateOfLands.map((lands) => {
        obj[lands.id] = lands.landLotNo;
      });
    setLookupLands(obj);
  }, [certifycateOfLands]);

  //send data to parent component before unmounted
  useEffect(() => {
    seasonApi
      .getProducts("/products")
      .then((result) => {
        const { data } = result;
        const obj = {};
        data.map((pro) => {
          obj[pro.id] = pro.name;
        });
        setLookupProducts(obj);
      })
      .catch((err) => {
        console.log("err", err);
      });
    return () => {
      updateInfo(currentValue.current);
    };
  }, []);

  const onRowAdd = (newData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        setTableInfo((prevState) => {
          const data = [...prevState.data];
          data.push(newData);
          return { ...prevState, data };
        });
      }, 600);
    });
  };

  const onRowUpdate = (newData, oldData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          setTableInfo((prevState) => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = newData;
            return { ...prevState, data };
          });
        }
      }, 600);
    });
  };

  const onRowDelete = (oldData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          setTableInfo((prevState) => {
            const data = [...prevState.data];
            console.log("index : ", data.indexOf(oldData));
            data.splice(data.indexOf(oldData), 1);
            return { ...prevState, data };
          });
        }
      }, 600);
    });
  };

  return (
    <div className="custom-form-antd">
      <div className="row mb-5">
        <div className="col-md-6 col-12 pt-3">
          <div className="mb-20px position-relative">
            <Label>Tên trang trại: </Label>
            <Input
              id="farm_name"
              name="farm_name"
              className={`${
                touched.farm_name && errors.farm_name && "invalid"
              }`}
              {...getFieldProps("farm_name")}
              placeholder="Tên mùa vụ"
            />
            {touched.farm_name && errors.farm_name && (
              <ErrorMessage>{errors.farm_name}</ErrorMessage>
            )}
          </div>
          <div className="mb-20px position-relative">
            <Label>Email: </Label>
            <Input
              id="email"
              name="email"
              className={`${
                touched.email && errors.email && "invalid"
              }`}
              {...getFieldProps("email")}
              placeholder="Email"
            />
            {touched.email && errors.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
          </div>
          <div className="mb-20px position-relative">
            <Label>Số điện thoại: </Label>
            <Input
              id="farm_name"
              name="farm_name"
              className={`${
                touched.farm_name && errors.farm_name && "invalid"
              }`}
              {...getFieldProps("farm_name")}
              placeholder="Tên mùa vụ"
            />
            {touched.farm_name && errors.farm_name && (
              <ErrorMessage>{errors.farm_name}</ErrorMessage>
            )}
          </div>
        </div>
        <div className="col-md-6 col-12 pt-3">
        </div>
      </div>
      {/* 
            <div >
                {tableEdit}
            </div> */}
    </div>
  );
}

export default Information;
