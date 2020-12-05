import React, { useLayoutEffect, useRef } from 'react';
import { compose, withState, lifecycle } from 'recompose';
import { Navbar, Sidebar } from '../navigation';
import { Layout } from 'antd';
import {  last, _ } from 'lodash';
import { getBool } from '~/views/utilities/helpers/utilObject';
import { MenuSize } from '../navigation/Navbar';
import 'jquery-slimscroll/jquery.slimscroll.min';
import $ from 'jquery';
export default class AppContentWrapper extends React.PureComponent{

  state = {
    isCollapsed: true,
    isToggled: false,
    menuSize: MenuSize.small,
    pageWidth : 0
  }
  // shouldComponentUpdate(nextProps) {
  //   // set toggle on state change (mobile only)
  //   if(nextProps.isToggled && nextProps.location.pathname !== this.props.location.pathname){
  //    this.setState({isToggled:nextProps.isCollapsed})
  //   }
  //   return true;
  // }
  componentDidMount(){
    this.setState({pageWidth: window.innerHeight})
    window.addEventListener('resize', () => {
        if(window.innerWidth < 600){
          this.setState({ menuSize: MenuSize.small  });
        } else if(window.innerWidth < 1200 && (this.state.menuSize === MenuSize.large)){
          this.setState({ menuSize: MenuSize.medium});
        } 
        this.setState({pageWidth: window.innerHeight})
        
    }, false);
 
  
   
  }

  getMenuSize=(size)=>{
    switch(size){
      case MenuSize.small:{ return 'appWrapper scheme-default default-scheme-color header-fixed aside-fixed rightbar-hidden device-lg sidebar-xs'} break
      case MenuSize.medium:{ return 'appWrapper scheme-default default-scheme-color header-fixed aside-fixed rightbar-hidden device-sm sidebar-sm'} break
      default: return 'appWrapper'
    }
  }
  

  render(){
    const {
      children,
      sidebarMenu,
    } = this.props
    
    return (
        <div id="minovate" className={this.getMenuSize(this.state.menuSize)}>
            <div id="wrap" className="animsition" style={{animationDuration: '1.5s', opacity: 1}}>
              <section id="header" style={{position: 'fixed', width: '100%'}} className='scheme-default'>
                <Navbar size={this.state.menuSize} onResize={size => this.setState({menuSize: size})}/>
              </section>
        {/*/ HEADER Content  */}
        {/* =================================================
            ================= CONTROLS Content ===================
            ================================================== */}
        <div id="controls" >
          {/* ================================================
                ================= SIDEBAR Content ===================
                ================================================= */}
          <aside id="sidebar" className="scheme-default aside-fixed dropdown-open">
            <div id="sidebar-wrap">
              <div className="slimScrollDiv">
                <div
                  className="panel-group slim-scroll"
                  role="tablist"
                >
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab">
                      <h4 className="panel-title">
                        <a data-toggle="collapse" href="#sidebarNav">
                          Navigation <i className="fa fa-angle-up" />
                        </a>
                      </h4>
                    </div>
                    <div
                      id="sidebarNav"
                      className="panel-collapse collapse in hide-scrollbar"
                      role="tabpanel"
                      style={{ height: this.state.pageWidth - 45, overflowY: 'scroll'}}>
                      <div className="panel-body">
                        <Sidebar />
                      </div>
                    </div>
                  </div>
                  </div>
                
              </div>
            </div>
          </aside>

          {/*/ SIDEBAR Content */}
          {/* =================================================
                ================= RIGHTBAR Content ===================
                ================================================== */}
          
          {/*/ RIGHTBAR Content */}
        </div>
        {/*/ CONTROLS Content */}
        {/* ====================================================
            ================= CONTENT ===============================
            ===================================================== */}
        <section id="content">{children}</section>
      </div>;
    </div>
    );
  }
}
