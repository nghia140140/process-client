import React from 'react'
import MaterialTable from 'material-table';
import "./index.scss";


function TableEdit(props) {
    const { tableInfo, onRowAdd, onRowUpdate, onRowDelete, title, columns, options } = props;

    return (
        <div>
            <MaterialTable
                title={title}
                columns={columns}
                data={tableInfo.data}

                localization={{
                    body: {
                        emptyDataSourceMessage: "Không có dữ liệu để hiển thị",
                        addTooltip: "Thêm",
                        deleteTooltip: "Xóa",
                        editTooltip: "Sửa",
                        editRow: {
                            deleteText: "Bạn có chắc muốn xóa?",
                            cancelTooltip: "Hủy",
                            saveTooltip: "Lưu"
                        }
                    }
                }}

                options={{
                    ...options,
                    pageSize: 3
                }}
                editable={{
                    onRowAdd: (newData) => onRowAdd(newData),
                    onRowUpdate: (newData, oldData) => onRowUpdate(newData, oldData),
                    onRowDelete: (oldData) => onRowDelete(oldData),
                }}
            />
        </div>
    )
}

export default TableEdit
