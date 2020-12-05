import styled from "styled-components";
import { Table } from "antd";
import { Color } from "~/views/utilities/layout";

export const TableStyle = styled(Table)`
  thead {
    font-weight: bold;
    color: ${Color.gray};
    th {
      /* background-color: ${Color.white}; */
      color: ${Color.gray};
      font-weight: bold;
    }
    th.ant-table-column-sort {
      background-color: ${Color.white};
    }
  }
  tbody {
    background-color: ${Color.white};
    td.ant-table-column-sort {
      background-color: ${Color.white};
    }
  }
  .ant-pagination-item {
    border: none;
    border-radius: 2px;
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    margin-right: 12px;
    &:hover {
      a {
        color: ${Color.red};
      }
    }
  }
  .ant-pagination {
    border-top: none !important;
  }
  .ant-pagination-item-active {
    background-color: ${Color.red};
    font-weight: bold;
    a,
    &:hover a {
      color: ${Color.white};
    }
  }
  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      border: none;
    }
    &:hover {
      .ant-pagination-item-link {
        color: ${Color.red};
      }
    }
  }
  .ant-pagination-item-container .ant-pagination-item-link-icon {
    color: ${Color.red};
  }
`;
