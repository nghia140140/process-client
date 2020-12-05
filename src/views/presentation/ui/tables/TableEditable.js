import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, DatePicker , Form, Select, Modal } from 'antd';
import strings from '~/localization';
import _ from 'lodash'
import moment from 'moment'
import { isNullOrEmpty, getArray, getString } from '~/views/utilities/helpers/utilObject';
import UtilDate from '~/views/utilities/helpers/UtilDate';
import ModelImages from './ModelImages'
import styled from 'styled-components'



const EditableContext = React.createContext();

const { Option } = Select;

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  placeholder,
  type,
  options,
  optionIndex,  
  rules,
  ...restProps
}) => {

  let dataOptions = optionIndex? (record[optionIndex] || [])  :options

  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      if(type === 'text'){inputRef.current.focus();}
      else if(type === 'date'){ inputRef.current.focus(); }
      else if(type === 'select'){ inputRef.current.focus(); }
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    if(type === 'text' || type === 'select'){
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    }
    else if(type === 'date'){
      let date = undefined
      if(!editing){
        date = moment.utc(record[dataIndex],UtilDate.formatDateTimeServer)
        form.setFieldsValue({
          [dataIndex]: date.isValid() ? date : undefined
        }); 
        console.log('****')
      }
    }
    
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      if(type === 'number'){
        let intValue = +values[dataIndex]
        if(!_.isNaN(intValue) && record[dataIndex] !== intValue){
          handleSave({ ...record, [dataIndex]: intValue }, dataIndex);
        }
      }
      else if(type === 'text' || type === 'select' ){
        if(record[dataIndex] !== values[dataIndex]){
          handleSave({ ...record, ...values }, dataIndex);
        }
      }
      else if(type === 'date'){
        let date = values[dataIndex]
        handleSave({ ...record, ...{[dataIndex]: date.isValid() ? date.format(UtilDate.formatDateTimeServer) : undefined} }, dataIndex);
      }
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
      toggleEdit();
      if(type === 'text' || type === 'select'){
        handleSave({ ...record},dataIndex);
      }
      else if(type === 'date'){
        handleSave({ ...record },dataIndex);
      }
    }
  };

  const saveImages =(updateImages)=>{
    try {
      toggleEdit();
      handleSave({ ...record, ...{[dataIndex]: updateImages} }, dataIndex);
    } catch (error) {
      handleSave({ ...record }, dataIndex);
    }
  }



  let childNode = children;

  const renderEditChildren = ()=> {
    if(type === 'text'){ 
      return <Input ref={inputRef} placeholder={placeholder} onPressEnter={save} onBlur={save} /> 
    }
    else if(type === 'number'){
      return <Input ref={inputRef} type='number' placeholder={placeholder} onPressEnter={save} onBlur={save} /> 
    }
    else if(type === 'date'){ 
      return <DatePicker showAction="focus"  ref={inputRef} onChange={save} onBlur={save} placeholder={placeholder} format={UtilDate.formatDateLocal} />
    } 
    else if(type === 'select'){
      return  <Select size='middle' placeholder={placeholder} showAction="focus" ref={inputRef} openOnFocus defaultValue={record[dataIndex]} onChange={save} onBlur={save}  style={{ width: '100%' }}>
        { getArray(dataOptions, undefined, []).map(item=> (<Option key={item.value} value={item.value}>{item.label}</Option>)) }
      </Select>
    }
    else if(type === 'images'){
      return <><ModelImages title={title} images={record[dataIndex]} onChange={saveImages} /><i className='fa fa-spinner' style={{fontSize: '20px'}}/></>
    }
  }

  const renderChildren=()=>{
    if(type === 'images'){
      if(getArray(record[dataIndex], undefined,[]).length > 0){
        return <i className='fa fa-edit' style={{fontSize: '20px'}}/>
      }
      else{
        return <span className='placeholder'>{placeholder}</span>
      }
    }
    else if(type === 'number'){
      return typeof record[dataIndex] !== 'number' ? <span className='placeholder'>{placeholder}</span> : <span>{record[dataIndex]}</span>
    }
    else if(isNullOrEmpty(children[1])){
       return <span className='placeholder'>{placeholder}</span>
    }
    else {
      if(type === 'text'){
         return children
      }
      else if(type === 'select'){
        let selectedObject = getArray(dataOptions,undefined,[]).find(item=> item.value + '' === record[dataIndex] + '')
        return selectedObject ?  [null, getString(selectedObject,'label')] : [null, record[dataIndex]]
      }
      else if(type === 'date'){
        let date = moment.utc(record[dataIndex],UtilDate.formatDateTimeServer)
        return date.isValid() ? [null,date.format(UtilDate.formatDateLocal)] : [null,]
      }
    }
    return null
  }

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={ type !== 'images' ? rules : []}
      >
        {renderEditChildren()}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}>
        { renderChildren()}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};


const generateAutoKey=(dataSource)=>{ 
   return getArray(dataSource, undefined, []).map((item, index)=>({...item, key: index }))
}

class TableEditable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: generateAutoKey(this.props.dataSource)
    };
  }
  componentWillReceiveProps(nextProps){
    if(this.state.dataSource !== nextProps.dataSource){
      this.setState({dataSource: generateAutoKey(nextProps.dataSource)})
    }
  }
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count } = this.state;
    
    const newData = this.props.handleAddRow ? this.props.handleAddRow() : {};
    this.state.dataSource.push(newData)
    
    this.setState({
      dataSource: generateAutoKey(this.state.dataSource),
      count: count + 1,
    });
  };

  handleSave = (row, dataIndex) => {
    const newData = [...this.state.dataSource];
    const index = row.key;
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({ dataSource: newData},()=>{
        const {changedData} = this.props
        /**
         * index : Số thứ tự của dòng có data thay đổi
         * dataIndex: Tên field dữ liệu thay đổi
         */
        changedData && changedData(index, dataIndex, this.state.dataSource)
    });
  };

  render() {
    const { dataSource  } = this.state;
    const { selectable = false, onSelect, selectedKey, addRowAble = true} = this.props

    const checkFilledRow =(val)=>{
      var filled = true
      for(var i =0; i< (this.props.columns || []).length; i++){
        if(this.props.columns[i].required === true & isNullOrEmpty(val[this.props.columns[i].dataIndex])){
          filled = false
        }
      }
      return filled
    }

    let notFilledRow = (dataSource || []).filter(item=>{
        return !checkFilledRow(item)
    })


    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.props.columns.map(col => {
      if (!col.editable) {
        return {
          ...col,
          render: record =>{
            if(col.type === 'date'){
               let date = moment.utc(record, UtilDate.formatDateTimeServer)
               return date.isValid() ? date.format(UtilDate.formatDateLocal): ''
            }
            else if(col.type === 'select'){
              let selectOption = _.find(col.options,(item)=>{ return item.value === record})
              return getString(selectOption, 'label', '')
            }
            return record
          }
        };
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          placeholder: col.placeholder,
          type:  col.type,
          options: col.options,
          rules: col.rules,
          optionIndex: col.optionIndex,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div className='w-100'>
        {addRowAble && <div className='d-flex justify-content-end'><Button
          onClick={this.handleAdd}
          type="primary"
          disabled={(notFilledRow || []).length !== 0}
          style={{
            marginBottom: 16,
          }}
        >
          <i className='fa fa-plus-circle'/><span className='ml-2'>{strings.add_row}</span>
        </Button></div>}
        <div className='overflow-auto'>
          <Table
            components={components}
            rowClassName={r => `editable-row ${selectedKey === r.key ? 'selected-row': ''} ${selectable ? 'selectable-row': ''}`}
            dataSource={dataSource}
            columns={columns}
            onRow={r=>({
              onClick:()=> onSelect && onSelect(r)
            })}
            pagination={false}
          />
        </div>
      </div>
    );
  }
}

export default TableEditable