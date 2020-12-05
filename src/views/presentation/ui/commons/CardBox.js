import React from "react";
import classNames from "classnames";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon, Button, Tooltip } from "antd";
import styled from "styled-components";
import { IMAGE_URL } from "~/configs";
import LazyLoad from 'react-lazy-load';
import { getNumber } from "~/views/utilities/helpers/utilObject";
import { ToastProvider, useToasts } from 'react-toast-notifications'

const WrapperContent= styled.div`
  width: 20%;
  flex: 0 0 20%;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
  h6,a,p,span{
    color:#454545;
  }
  a{
    &:hover{
      color: #4738bf;
    }
  }
  .card{
    &:hover{
      box-shadow: 0px 0px 29px -7px rgba(163,163,163,1);
    }
  }
  
  @media(max-width: 900px){
    width: 25%
  }
`

const UICardBox = (props) => {
  const {
    title,
    priceSell,
    originalPrice,
    handleAddProduct,
    url,
    id,
    item,
    history
  } = props;

  // console.log(title, url);
  const { addToast } = useToasts()

  return (
    <>
      <WrapperContent>
        <div className="card card-cascade narrower card-ecommerce p-3 rounded" style={{height: '100%'}}>
          <div className="view view-cascade">
            <a onClick={()=> history.push(`/shop/${id}`)}>
            <LazyLoad offsetVertical={300}>
              <img
                src={`${IMAGE_URL}${url}`}
                className="card-img-top"
                alt="sample photo"
              />
              </LazyLoad>
            </a>
          </div>
          <div className="card-body card-body-cascade p-2 pt-3">
            <h6 className="mb-1 title-product"><a href={`/shop/${id}`}>{title}</a></h6>
            <div className="card-text">
              <p className="m-0 d-flex justify-content-between">
                Giá bán:<span>{'00000'}</span>
              </p>
              <p className="d-flex justify-content-between">
                Giá PP:<span>{'00000'}</span>
              </p>
            </div>
            <div className="card-footer p-0 mt-2">
              <span className="float-right mt-2">
                <Tooltip title="Thêm vào giỏ hàng" placement="topRight">
                  <Button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      handleAddProduct({...item, quantity: 1})
                      addToast('Đã thêm 1 sản phẩm vào giỏ hàng', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 2000 })
                    }}>
                    {/* <Icon type="shopping-cart" /> */}
                  </Button>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>
    </WrapperContent>
    </>
  );
};

UICardBox.defaultProps = {
  //   bgColor: 'success',
  //   iconColor: 'success',
  //   justify: 'between',
  //   subLabel: '',
  //   subSmall: ''
};

const { string, number } = PropTypes;

UICardBox.propTypes = {
  title: string,
  url: string,
  originalPrice: number,
  priceSell: number,
};

export default UICardBox;
