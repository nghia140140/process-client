import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Select, Input, DatePicker, InputNumber, Form, Button } from "antd";
import styled from 'styled-components';
import moment from 'moment';
import _ from "lodash";
import TableEdit from './../../ShareComponent/TableEdit';
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



const initialProcess = [
    { id: 1, value: 'Xử lý đất' },
    { id: 2, value: 'Xử lý môi trường' },
]

// const initialStatus = {
//     1: 'Đang chạy',
//     2: 'Chưa chạy'
// }

const initialStatus = [
    { id: 11, name: "Đang chạy" },
    { id: 22, name: "Chưa chạy" },
    { id: 33, name: "Tạm dừng" },
    { id: 44, name: "Hoàn thành" },
]


const initialStepNumber = [
    { id: 1, value: 'Xới đất' },
    { id: 2, value: 'Làm tơi' },
    { id: 3, value: 'Tưới nước' },
]
const findAll = () => new Promise(resolve => {
    setTimeout(() => {
        resolve(initialStepNumber)
    }, 100)
});
const getProcessName = () => new Promise(resolve => {
    setTimeout(() => {
        resolve(initialProcess);
    }, 100)
})
function Process(props) {
    const { info, updateInfo, } = props;
    const { farm_id, session_name, process } = info;
    const farms = useSelector(state => state.seasonData.farms);
    const [listProcessName, setListProcessName] = useState([]);
    const stepNumber = useRef([]); // store data stepNumber current, use for add new row of table edit
    const [lookupStatus, setLookupStatus] = useState({});
    const [tableInfo, setTableInfo] = useState({
        data: process || []
    });

    const renderActions = (status) => {
        const name = lookupStatus[status];
        switch (name) {
            case "Đang chạy":
                return "Tạm dừng";
            case "Chưa chạy":
                return "Bắt đầu";
            case "Tạm dừng":
                return "Tiếp tục";
            case "Hoàn thành":
                return "";
            default:
                return;
        }
    }

    const handleActions = (status, indexRow) => {
        const name = lookupStatus[status];
        let nextStatus = "";
        switch (name) {
            case "Đang chạy":
                nextStatus = "Tạm dừng";
                break;
            case "Chưa chạy":
                nextStatus = "Đang chạy";
                break;
            case "Tạm dừng":
                nextStatus = "Đang chạy";
                break;
            case "Hoàn thành":
                nextStatus = "Kết thúc";
                break;
            default:
                break;
        }

        //get index in array data status
        const index = initialStatus.findIndex(s => s.name === nextStatus);

        // create new array with status changed
        const arr = [...tableInfo.data];
        arr[indexRow] = { ...arr[indexRow], status: initialStatus[index].id };

        setTableInfo({ ...tableInfo, data: arr });

    }
    const columns = [
        {
            title: 'Tên quy trình', field: 'name',
            validate: (rowData) => rowData.name ? true : false,
            render: (rowData) => {
                if (_.isEmpty(listProcessName)) return null;

                const index = listProcessName.findIndex(pro => pro.id === rowData.name);
                return <span>{listProcessName[index].value} </span>
            },
            editComponent: (props) => {
                const { value, onChange, rowData } = props;
                return (
                    <SelectMt
                        className={`min-w-90 ${rowData.name ? null : "Mui-error"}`}
                        value={value ? value : ''}
                        onChange={async (e) => {
                            const data = [...stepNumber.current];

                            //edit => change list step
                            if (!_.isNil(rowData.tableData)) {
                                const t = tableInfo.data.findIndex(row => row.tableData.id === rowData.tableData.id);
                                data[t] = [
                                    { id: 1, value: 'Thoong hihi' },
                                    { id: 3, value: 'tien hihi' },
                                ];
                            } else { // add => push list step
                                const result = await findAll();
                                data.push(result)
                            }
                            stepNumber.current = data;
                            return onChange(e.target.value)
                        }}>
                        {
                            listProcessName.map(pro => {
                                return <MenuItem key={pro.id} value={pro.id}>{pro.value}</MenuItem>
                            })
                        }
                    </SelectMt>
                )
            }
        },
        {
            title: 'Ngày bắt đầu',
            field: 'start_date',
            initialEditValue: moment(),
            render: (rowData) => {
                const { start_date } = rowData;
                // const date = _.isObject(start_date) ? start_date : moment(start_date);
                return <span>{start_date.format(formatDate)}</span>
            },
            editComponent: (props) => {
                const { onChange, value } = props;
                return <DatePicker id="start_date" name="start_date" format={dateFormatList}
                    value={moment(value)}
                    allowClear={false}
                    onChange={(e) => onChange(e)}
                />
            }

        },
        {
            title: 'Trạng thái', field: 'status', lookup: lookupStatus,
            validate: (rowData) => rowData.status ? true : false
        },
        {
            title: 'Giai đoạn',
            field: 'steps_number',
            // stepNumber.length > 0 ? stepNumber[0].id :
            initialEditValue: '',
            render: (rowData) => {

                let t = -1;
                if (!_.isNil(rowData.tableData)) {
                    t = tableInfo.data.findIndex(row => row.tableData.id === rowData.tableData.id);
                }
                const steps = stepNumber.current;

                if (_.isEmpty(steps[t])) return null;
                const index = steps[t].findIndex(step => step.id === rowData.steps_number);
                return <span>{steps[t][index].value} </span>
            },
            editComponent: (props) => {
                const { value, onChange, rowData } = props;
                let t = -1;
                if (!_.isNil(rowData.tableData)) {
                    t = tableInfo.data.findIndex(row => row.tableData.id === rowData.tableData.id);
                } else {
                    t = tableInfo.data.length
                }
                return <SelectMt className={`min-w-90  ${rowData.steps_number ? null : "Mui-error"}`}
                    inputProps={{ readOnly: _.isNil(rowData.name) }}
                    value={value ? value : ''}
                    onChange={(e) => onChange(e.target.value)}>
                    {
                        _.isArray(stepNumber.current[t]) && stepNumber.current[t].map(step => {
                            return <MenuItem key={step.id} value={step.id}>{step.value}</MenuItem>
                        })
                    }
                </SelectMt>

            },
            validate: (rowData) => !_.isNil(rowData.steps_number)
        },
        {
            title: 'Đánh giá',
            field: 'ratings',
            initialEditValue: ""
        },
        {
            title: 'Hành động',
            field: 'note',

            render: (rowData) => {
                const { status } = rowData;
                return <Button style={{ width: '95px' }} type="primary"
                    onClick={() => handleActions(status, rowData.tableData.id)}>
                    {
                        renderActions(status)
                    }
                </Button>
            },
            editComponent: (props) => null
        }
    ]
    // console.log(tableInfo.data);
    const currentValue = useRef({ process: [...tableInfo.data] });

    useEffect(() => {
        currentValue.current = { process: [...tableInfo.data] };
    }, [tableInfo.data]);

    useEffect(() => {
        async function fetchData() {
            const rs1 = await getProcessName();
            setListProcessName(rs1);

            if (tableInfo.data.length > 0) {
                for (let i = 0; i < tableInfo.data.length; i++) {
                    const rs2 = await findAll();
                    stepNumber.current[i] = rs2;
                }
            }
            setTableInfo({ ...tableInfo })
        }
        fetchData();

        const obj = {};
        initialStatus.map(s => {
            obj[s.id] = s.name;
        })
        setLookupStatus(obj);
        return () => {
            updateInfo(currentValue.current);
        }
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
        })
    }

    const onRowUpdate = (newData, oldData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                if (oldData) {
                    setTableInfo((prevState) => {
                        const data = [...prevState.data];
                        if (!_.isObject(newData.start_date)) {
                            newData.start_date = moment(newData.start_date)
                        }
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
            onRowUpdate={onRowUpdate} onRowDelete={onRowDelete} />)
        , [tableInfo, listProcessName, lookupStatus]);


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

export default Process
