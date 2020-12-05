import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Badge } from "antd";
import { IMAGE_URL } from "~/configs";
import logo from "~/static/images/logo.png";
import logomini from "~/static/images/logo-wbg.png";
import Avatar from "~/static/images/logo.png";
import { getAuthUser } from "~/state/ducks/authUser/selectors";
import { authActions } from "~/state/ducks/authUser";

import styled from "styled-components";

export const MenuSize = {
  'small': 'small',
  'medium': 'medium',
  'large': 'large'
}

function Navbar(props) {
  const {
    toViewProfile,
    size,
    handleChangeSize
  } = props;

  return (
    <header className="clearfix">
      <div className="branding">
        <a className="brand" href="index.html">
          <span>
            <strong>MIN</strong>OVATE
          </span>
        </a>
        <a
          role="button"
          tabIndex={0}
          className="offcanvas-toggle visible-xs-inline"
        >
          <i className="fa fa-bars" />
        </a>
      </div>
      {/* Branding end */}
      {/* Left-side navigation */}
      <ul className="nav-left pull-left list-unstyled list-inline">
        <li className="sidebar-collapse divided-right">
          <a role="button" tabIndex={0} className="collapse-sidebar" onClick={handleChangeSize(props)}>
            <i className="fa fa-outdent" />
          </a>
        </li>
        <li className="dropdown divided-right settings">
          <a
            role="button"
            tabIndex={0}
            className="dropdown-toggle"
            data-toggle="dropdown"
          >
            <i className="fa fa-cog" />
          </a>
          <ul
            className="dropdown-menu with-arrow animated littleFadeInUp"
            role="menu"
          >
            <li>
              <ul className="color-schemes list-inline">
                <li className="title">Header Color:</li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-drank header-scheme"
                    data-scheme="scheme-default"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-black header-scheme"
                    data-scheme="scheme-black"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-greensea header-scheme"
                    data-scheme="scheme-greensea"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-cyan header-scheme"
                    data-scheme="scheme-cyan"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-lightred header-scheme"
                    data-scheme="scheme-lightred"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-light header-scheme"
                    data-scheme="scheme-light"
                  />
                </li>
                <li className="title">Branding Color:</li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-drank branding-scheme"
                    data-scheme="scheme-default"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-black branding-scheme"
                    data-scheme="scheme-black"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-greensea branding-scheme"
                    data-scheme="scheme-greensea"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-cyan branding-scheme"
                    data-scheme="scheme-cyan"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-lightred branding-scheme"
                    data-scheme="scheme-lightred"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-light branding-scheme"
                    data-scheme="scheme-light"
                  />
                </li>
                <li className="title">Sidebar Color:</li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-drank sidebar-scheme"
                    data-scheme="scheme-default"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-black sidebar-scheme"
                    data-scheme="scheme-black"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-greensea sidebar-scheme"
                    data-scheme="scheme-greensea"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-cyan sidebar-scheme"
                    data-scheme="scheme-cyan"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-lightred sidebar-scheme"
                    data-scheme="scheme-lightred"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-light sidebar-scheme"
                    data-scheme="scheme-light"
                  />
                </li>
                <li className="title">Active Color:</li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-drank color-scheme"
                    data-scheme="drank-scheme-color"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-black color-scheme"
                    data-scheme="black-scheme-color"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-greensea color-scheme"
                    data-scheme="greensea-scheme-color"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-cyan color-scheme"
                    data-scheme="cyan-scheme-color"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-lightred color-scheme"
                    data-scheme="lightred-scheme-color"
                  />
                </li>
                <li>
                  <a
                    role="button"
                    tabIndex={0}
                    className="scheme-light color-scheme"
                    data-scheme="light-scheme-color"
                  />
                </li>
              </ul>
            </li>
            <li>
              <div className="form-group">
                <div className="row">
                  <label className="col-xs-8 control-label">Fixed header</label>
                  <div className="col-xs-4 control-label">
                    <div className="onoffswitch lightred small">
                      <input
                        type="checkbox"
                        name="onoffswitch"
                        className="onoffswitch-checkbox"
                        id="fixed-header"
                        defaultChecked
                      />
                      <label
                        className="onoffswitch-label"
                        htmlFor="fixed-header"
                      >
                        <span className="onoffswitch-inner" />
                        <span className="onoffswitch-switch" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="form-group">
                <div className="row">
                  <label className="col-xs-8 control-label">Fixed aside</label>
                  <div className="col-xs-4 control-label">
                    <div className="onoffswitch lightred small">
                      <input
                        type="checkbox"
                        name="onoffswitch"
                        className="onoffswitch-checkbox"
                        id="fixed-aside"
                        defaultChecked
                      />
                      <label
                        className="onoffswitch-label"
                        htmlFor="fixed-aside"
                      >
                        <span className="onoffswitch-inner" />
                        <span className="onoffswitch-switch" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      {/* Left-side navigation end */}
      {/* Search */}
      <div className="search" id="main-search">
        <input
          type="text"
          className="form-control underline-input"
          placeholder="Search..."
        />
      </div>
      {/* Search end */}
      {/* Right-side navigation */}
      <ul className="nav-right pull-right list-inline">
        <li className="dropdown users">
          <a  className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-user" />
            <span className="badge bg-lightred">2</span>
          </a>
          <div
            className="dropdown-menu pull-right with-arrow panel panel-default animated littleFadeInUp"
            role="menu"
          >
            <div className="panel-heading">
              You have <strong>2</strong> requests
            </div>
            <ul className="list-group">
              <li className="list-group-item">
                <a role="button" tabIndex={0} className="media">
                  <span className="pull-left media-object thumb thumb-sm">
                    <img
                      src="./static/images/arnold-avatar.jpg"
                      alt
                      className="img-circle"
                    />
                  </span>
                  <div className="media-body">
                    <span className="block">Arnold sent you a request</span>
                    <small className="text-muted">15 minutes ago</small>
                  </div>
                </a>
              </li>
              <li className="list-group-item">
                <a role="button" tabIndex={0} className="media">
                  <span className="pull-left media-object  thumb thumb-sm">
                    <img
                      src="./static/images/george-avatar.jpg"
                      alt
                      className="img-circle"
                    />
                  </span>
                  <div className="media-body">
                    <span className="block">George sent you a request</span>
                    <small className="text-muted">5 hours ago</small>
                  </div>
                </a>
              </li>
            </ul>
            <div className="panel-footer">
              <a role="button" tabIndex={0}>
                Show all requests <i className="fa fa-angle-right pull-right" />
              </a>
            </div>
          </div>
        </li>
        <li className="dropdown messages">
          <a className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-envelope" />
            <span className="badge bg-lightred">4</span>
          </a>
          <div
            className="dropdown-menu pull-right with-arrow panel panel-default animated littleFadeInDown"
            role="menu"
          >
            <div className="panel-heading">
              You have <strong>4</strong> messages
            </div>
            <ul className="list-group">
              <li className="list-group-item">
                <a role="button" tabIndex={0} className="media">
                  <span className="pull-left media-object thumb thumb-sm">
                    <img
                      src="./static/images/ici-avatar.jpg"
                      alt
                      className="img-circle"
                    />
                  </span>
                  <div className="media-body">
                    <span className="block">Imrich sent you a message</span>
                    <small className="text-muted">12 minutes ago</small>
                  </div>
                </a>
              </li>
              <li className="list-group-item">
                <a role="button" tabIndex={0} className="media">
                  <span className="pull-left media-object  thumb thumb-sm">
                    <img
                      src="./static/images/peter-avatar.jpg"
                      alt
                      className="img-circle"
                    />
                  </span>
                  <div className="media-body">
                    <span className="block">Peter sent you a message</span>
                    <small className="text-muted">46 minutes ago</small>
                  </div>
                </a>
              </li>
              <li className="list-group-item">
                <a role="button" tabIndex={0} className="media">
                  <span className="pull-left media-object  thumb thumb-sm">
                    <img
                      src="./static/images/random-avatar1.jpg"
                      alt
                      className="img-circle"
                    />
                  </span>
                  <div className="media-body">
                    <span className="block">Bill sent you a message</span>
                    <small className="text-muted">1 hour ago</small>
                  </div>
                </a>
              </li>
              <li className="list-group-item">
                <a role="button" tabIndex={0} className="media">
                  <span className="pull-left media-object  thumb thumb-sm">
                    <img
                      src="./static/images/random-avatar3.jpg"
                      alt
                      className="img-circle"
                    />
                  </span>
                  <div className="media-body">
                    <span className="block">Ken sent you a message</span>
                    <small className="text-muted">3 hours ago</small>
                  </div>
                </a>
              </li>
            </ul>
            <div className="panel-footer">
              <a role="button" tabIndex={0}>
                Show all messages <i className="pull-right fa fa-angle-right" />
              </a>
            </div>
          </div>
        </li>
        <li className="dropdown notifications">
          <a className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-bell" />
            <span className="badge bg-lightred">3</span>
          </a>
          <div className="dropdown-menu pull-right with-arrow panel panel-default animated littleFadeInLeft">
            <div className="panel-heading">
              You have <strong>3</strong> notifications
            </div>
            <ul className="list-group">
              <li className="list-group-item">
                <a role="button" tabIndex={0} className="media">
                  <span className="pull-left media-object media-icon bg-danger">
                    <i className="fa fa-ban" />
                  </span>
                  <div className="media-body">
                    <span className="block">User Imrich cancelled account</span>
                    <small className="text-muted">6 minutes ago</small>
                  </div>
                </a>
              </li>
              <li className="list-group-item">
                <a role="button" tabIndex={0} className="media">
                  <span className="pull-left media-object media-icon bg-primary">
                    <i className="fa fa-bolt" />
                  </span>
                  <div className="media-body">
                    <span className="block">New user registered</span>
                    <small className="text-muted">12 minutes ago</small>
                  </div>
                </a>
              </li>
              <li className="list-group-item">
                <a role="button" tabIndex={0} className="media">
                  <span className="pull-left media-object media-icon bg-greensea">
                    <i className="fa fa-lock" />
                  </span>
                  <div className="media-body">
                    <span className="block">User Robert locked account</span>
                    <small className="text-muted">18 minutes ago</small>
                  </div>
                </a>
              </li>
            </ul>
            <div className="panel-footer">
              <a role="button" tabIndex={0}>
                Show all notifications{" "}
                <i className="fa fa-angle-right pull-right" />
              </a>
            </div>
          </div>
        </li>
        <li className="dropdown nav-profile">
          <a className="dropdown-toggle" data-toggle="dropdown">
            <img
              src="./static/images/profile-photo.jpg"
              alt
              className="img-circle size-30x30"
            />
            <span>
              John Douey <i className="fa fa-angle-down" />
            </span>
          </a>
          <ul className="dropdown-menu animated littleFadeInRight" role="menu">
            <li>
              <a role="button" tabIndex={0}>
                <span className="badge bg-greensea pull-right">86%</span>
                <i className="fa fa-user" />
                Profile
              </a>
            </li>
            <li>
              <a role="button" tabIndex={0}>
                <span className="label bg-lightred pull-right">new</span>
                <i className="fa fa-check" />
                Tasks
              </a>
            </li>
            <li>
              <a role="button" tabIndex={0}>
                <i className="fa fa-cog" />
                Settings
              </a>
            </li>
            <li className="divider" />
            <li>
              <a role="button" tabIndex={0}>
                <i className="fa fa-lock" />
                Lock
              </a>
            </li>
            <li>
              <a role="button" tabIndex={0}>
                <i className="fa fa-sign-out" />
                Logout
              </a>
            </li>
          </ul>
        </li>
        <li className="toggle-right-sidebar">
          <a role="button" tabIndex={0}>
            <i className="fa fa-comments" />
          </a>
        </li>
      </ul>
      {/* Right-side navigation end */}
    </header>
  );
}

export default compose(
  withRouter,
  connect(
    (state) => ({
      user: getAuthUser(state)
    }),
    {
      logout: authActions.logout,
    }
  ),
  withHandlers({
    handleLogout: ({ logout }) => () => {
      logout();
    },
    handleChangeSize: ()=> ({ onResize, size })=> ()=>{
       switch(size){
         case MenuSize.large : { onResize && onResize(MenuSize.medium)} break
         case MenuSize.medium : { onResize && onResize(MenuSize.small)} break
         case MenuSize.small : { onResize && onResize(MenuSize.large)} break
       }
    },
  }),

)(Navbar);
