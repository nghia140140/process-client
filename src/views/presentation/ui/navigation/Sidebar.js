import React, { Fragment } from "react";
import enhance from "~/views/presentation/ui/navigation/withMenuEnhancer";
import { getArray } from "~/views/utilities/helpers/utilObject";
import strings from '../../../../localization/index'
import _ from 'lodash'

const MenuItems = [
  {
    name: strings.dashboard,
    classIcon: 'fa fa-dashboard',
    path: 'path_0'
  },
  {
    name: strings.profiles_management,
    classIcon: 'fa fa-user',
    path: 'path_1'
  },
  {
    name: strings.farmings_management,
    classIcon: 'fa fa-inbox',
    path: 'path_2'
  },
  {
    name: strings.purchasing_management,
    classIcon: 'fa fa-shopping-basket',
    path: 'path_3',
  },
  {
    name: strings.goods_management,
    classIcon: 'fa fa-envira',
    path: 'path_4'
  },
  {
    name: strings.comercial_management,
    classIcon: 'fa fa-shopping-cart',
    path: 'path_5'
  },
  {
    name: strings.orders_management,
    classIcon: 'fa fa-file-text',
    path: 'path_6'
  },
  {
    name: strings.partners_management,
    classIcon: 'fa fa-address-card',
    path: 'path_7'
  },
  {
    name: strings.logistics_management,
    classIcon: 'fa fa-truck',
    path: 'path_8'
  },
  {
    name: strings.human_resources_management,
    classIcon: 'fa fa-user-plus',
    path: 'path_9'
  },
  {
    name: strings.financial_management,
    classIcon: 'fa fa-line-chart',
    path: 'path_10'
  },
  {
    name: strings.messages_management,
    classIcon: 'fa fa-commenting',
    path: 'path_11'
  },
  {
    name: strings.reports,
    classIcon: 'fa fa-bar-chart',
    path: 'path_12'
  },
  {
    name: strings.configuration,
    classIcon: 'fa fa-cog',
    path: 'path_13'
  },
]
   
class Sidebar extends React.Component{


  state = {
    openPath : '',
    activePath : ''
  }

getSubPath =(item, curPath)=>{
    if(item.path == curPath) return [item.path]
    let subPath = []
    if((getArray(item,'subs') || []).length > 0){
      (getArray(item,'subs') || []).forEach(subItem=>{
          let paths = this.getSubPath(subItem, curPath)
          if(paths.length > 0){
            subPath = _.concat(paths,[item.path])                 
          }
      })
    }
    return subPath
}

checkMatchedPath=(path1, path2)=>{
  return path1 === path2
}

renderItem = (item)=>{
    let openPaths = this.getSubPath(item, this.state.openPath)
    let isOpenMenu = _.includes(openPaths, this.state.openPath)
    
    let activePaths = this.getSubPath(item, this.state.activePath)
    let isActiveMenu = _.includes(activePaths, this.state.activePath)

   
    return (
      <li className={(getArray(item,'subs') || []).length > 0 ? ` dropdown ${isActiveMenu ?'active': ''} ${isOpenMenu? 'open': ''} submenu `: `${isActiveMenu ?'active': ''} `}>
          <a onClick={()=>{this.setState({
        openPath: item.path,
        activePath: (getArray(item,'subs') || []).length > 0 ? this.state.activePath : item.path
      })}}>
              <i className={item.classIcon ? item.classIcon : 'fa fa-caret-right'} />
              <span>{item.name}</span>
              { (getArray(item,'subs') || []).length > 0 && <i className="fa fa-plus" />}
          </a>
          { (getArray(item,'subs') || []).length > 0 && (<ul style={{ display: isOpenMenu ? 'block': 'none'}}>{ item.subs.map(this.renderItem)}</ul>)}
      </li>
    )
}
  render(){

    return (
      <ul id="navigation">
        { MenuItems.map(this.renderItem) }
      </ul>
    )

    
  }

}


export default enhance(Sidebar);
