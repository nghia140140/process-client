import React from 'react';
import styled from "styled-components";
import { Pagination } from "antd";
import Color from '~/views/utilities/layout/color';

const PaginationStyle = styled.div`
  text-align: right;
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

const UIPagination = props => {
  return (
    <PaginationStyle>
      <Pagination {...props} />
    </PaginationStyle>
  );
};

export default UIPagination;
