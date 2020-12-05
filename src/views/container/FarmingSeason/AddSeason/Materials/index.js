import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Select, Input, DatePicker, InputNumber, Form, Button } from "antd";
import styled from 'styled-components';
import moment from 'moment';
import _ from "lodash";
import TableEdit from '../../ShareComponent/TableEdit';
import * as Yup from "yup";
import { Select as SelectMt, Input as InputMt, MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux';

const { Option } = Select;
const formatDate = "DD/MM/YYYY";
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const Label = styled.label`
    height: 23px !important;
    font-weight: 500;
    color: gray !important;
`



function Materials(props) {

    const { info, updateInfo, } = props;
    const { farm_id, session_name, materials } = info;

    const farms = useSelector(state => state.seasonData.farms);

    const [tableInfo, setTableInfo] = useState({
        data: materials || []
    });


    const columns = [
        {
            title: 'Loại đầu vào',
            field: 'type',
            width: 150
        },
        {
            title: 'Nhà CC',
            field: 'supplier',
            width: 150
        },
        {
            title: 'Sản phẩm',
            field: 'name',
            width: 150
        },
        {
            title: 'Số lượng',
            field: 'quantity',
            width: 150
        },
        {
            title: 'ĐVT',
            field: 'unit',
            width: 150
        },
        {
            title: 'Đơn giá',
            field: 'amount',
            width: 150
        },
        {
            title: 'Thành tiền',
            field: 'total',
            width: 150
        },
        {
            title: 'Ngày đặt',
            field: 'register_date',
            width: 150
        },
        {
            title: 'Ngày nhận',
            field: 'receive_date',
            width: 150
        },
        {
            title: 'Trạng thái',
            field: 'status',
            width: 150
        },
        {
            title: 'Hành động',
            field: 'action',
            width: 150
        },

    ]
    const options = {
        // fixedColumns: {
        //     left: 1,
        //     right: 1
        // }
    }
    // console.log(tableInfo.data);
    const currentValue = useRef({ materials: [...tableInfo.data] });

    useEffect(() => {
        currentValue.current = { materials: [...tableInfo.data] };
    }, [tableInfo.data]);

    useEffect(() => {

        return () => {
            updateInfo(currentValue.current);
        }
    }, []);

    const onRowAdd = (newData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                setTableInfo((prevState) => {
                    console.log('newData', newData);
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                });
            }, 600);
        })
    }

    const onRowUpdate = (newData, oldData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                if (oldData) {
                    setTableInfo((prevState) => {
                        const data = [...prevState.data];
                        // if (!_.isObject(newData.start_date)) {
                        //     newData.start_date = moment(newData.start_date)
                        // }
                        console.log(newData);
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                    });
                }
            }, 600);
        })
    }

    const onRowDelete = (oldData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                if (oldData) {
                    setTableInfo((prevState) => {
                        const data = [...prevState.data];
                        console.log('index : ', data.indexOf(oldData));
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                    });
                }
            }, 600);
        })


    }
    const tableEdit = useMemo(() => (
        <TableEdit tableInfo={tableInfo} onRowAdd={onRowAdd} columns={columns}
            title="Thông tin quy trình"
            options={options}
            onRowUpdate={onRowUpdate} onRowDelete={onRowDelete} />)
        , [tableInfo]);
    return (
        <div className="custom-form-antd" >
            <div className="row mb-5">
                <div className="col-md-6 col-12 pt-3">
                    <div className="mb-20px position-relative">
                        <Label htmlFor="farm_id">Trang trại: </Label>
                        <Select id="farm_id" name="farm_id" placeholder="Chọn trang trại"
                            value={farm_id}
                        // inputProps={{ readOnly: true }}
                        >
                            {_.isArray(farms) && farms.map((f) => <Option key={f.id} value={f.id}>{f.name}</Option>)}
                        </Select>
                    </div>

                </div>
                <div className="col-md-6 col-12 pt-3">
                    <div className="mb-20px position-relative" >
                        <Label>Tên mùa vụ: </Label>
                        <Input id="session_name" name="session_name" value={session_name} readOnly
                            placeholder="Tên mùa vụ" />

                    </div>

                </div>

            </div>
            <div>
                {tableEdit}
            </div>
        </div>
    )
}

export default Materials
