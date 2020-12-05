import styled from 'styled-components';
import COLOR from '~/views/utilities/layout/color';

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export const LogoWrapper = styled.div`
  text-align: center;
  padding: 20px 0;
  a svg {
    color: ${COLOR.red};
    width: 153px;
    height: 45px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
`;

export const Content = styled.div`
  width: 450px;
  padding: 20px;
`;

export const Footer = styled.footer`
  text-align: center;
  color: #828384;
  padding: 20px;
`;
