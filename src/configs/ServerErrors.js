import React, { PureComponent } from 'react';
import { message } from "antd";
import _ from 'lodash';
import { getString } from "~/views/utilities/helpers/utilObject";
import strings from '~/localization';



export default class ServerError extends PureComponent {

  static fMsg = undefined;

  static getServerError(res){
    if(`${res}` === 'TypeError: Failed to fetch'){
        return { localizedMessage: 'Đang bảo trì...'}
    }
    
    let errorCode  = 'server_' + (getString(res, 'message') || '').replace(/\./g, '_')  
    let serverErrorMessage = strings.getString(errorCode);

    if(serverErrorMessage){
        return {
          message: getString(res, 'message') ,
          localizedMessage: serverErrorMessage
        } 
    }
    return {
      message: getString(res, 'message') ,
      localizedMessage: errorCode
    } 
  }
  
  static getMessage(msg){
    if(_.isString(msg)){
       return msg;
    }
    else if(_.isObject(msg)){
      return getString(msg, 'message')
    }
    return ''
  }
}

export const showError = (error) =>  {
  console.log(error);
  message.error(getString(error,'localizedMessage') || strings.server_can_not_connect);
}