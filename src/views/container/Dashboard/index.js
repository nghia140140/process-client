import React from "react";
import { ContentWrapper } from "~/views/presentation/ui/container";
import _ from "lodash";
import { PageTitle } from '~/views/presentation/ui/commons';

export default class Dashboard extends React.Component {
  render() {
    const {} = this.props;
    return (
        <ContentWrapper>
          <PageTitle title='Dashboard' subTitle='Sub Title' breadcrumb={[{title: 'Dashboard'}]}></PageTitle>
          {/* cards row */}
          <div className="row">
            {/* col */}
            <div className="card-container col-lg-3 col-sm-6 col-sm-12">
              <div className="card">
                <div className="front bg-greensea">
                  {/* row */}
                  <div className="row">
                    {/* col */}
                    <div className="col-xs-4">
                      <i className="fa fa-users fa-4x" />
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-8">
                      <p className="text-elg text-strong mb-0">3 659</p>
                      <span>New Users</span>
                    </div>
                    {/* /col */}
                  </div>
                  {/* /row */}
                </div>
                <div className="back bg-greensea">
                  {/* row */}
                  <div className="row">
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-cog fa-2x" /> Settings
                      </a>
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-chain-broken fa-2x" /> Content
                      </a>
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-ellipsis-h fa-2x" /> More
                      </a>
                    </div>
                    {/* /col */}
                  </div>
                  {/* /row */}
                </div>
              </div>
            </div>
            {/* /col */}
            {/* col */}
            <div className="card-container col-lg-3 col-sm-6 col-sm-12">
              <div className="card">
                <div className="front bg-lightred">
                  {/* row */}
                  <div className="row">
                    {/* col */}
                    <div className="col-xs-4">
                      <i className="fa fa-shopping-cart fa-4x" />
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-8">
                      <p className="text-elg text-strong mb-0">19 364</p>
                      <span>New Orders</span>
                    </div>
                    {/* /col */}
                  </div>
                  {/* /row */}
                </div>
                <div className="back bg-lightred">
                  {/* row */}
                  <div className="row">
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-cog fa-2x" /> Settings
                      </a>
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-chain-broken fa-2x" /> Content
                      </a>
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-ellipsis-h fa-2x" /> More
                      </a>
                    </div>
                    {/* /col */}
                  </div>
                  {/* /row */}
                </div>
              </div>
            </div>
            {/* /col */}
            {/* col */}
            <div className="card-container col-lg-3 col-sm-6 col-sm-12">
              <div className="card">
                <div className="front bg-blue">
                  {/* row */}
                  <div className="row">
                    {/* col */}
                    <div className="col-xs-4">
                      <i className="fa fa-usd fa-4x" />
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-8">
                      <p className="text-elg text-strong mb-0">165 984</p>
                      <span>Sales</span>
                    </div>
                    {/* /col */}
                  </div>
                  {/* /row */}
                </div>
                <div className="back bg-blue">
                  {/* row */}
                  <div className="row">
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-cog fa-2x" /> Settings
                      </a>
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-chain-broken fa-2x" /> Content
                      </a>
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-ellipsis-h fa-2x" /> More
                      </a>
                    </div>
                    {/* /col */}
                  </div>
                  {/* /row */}
                </div>
              </div>
            </div>
            {/* /col */}
            {/* col */}
            <div className="card-container col-lg-3 col-sm-6 col-sm-12">
              <div className="card">
                <div className="front bg-slategray">
                  {/* row */}
                  <div className="row">
                    {/* col */}
                    <div className="col-xs-4">
                      <i className="fa fa-eye fa-4x" />
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-8">
                      <p className="text-elg text-strong mb-0">29 651</p>
                      <span>Visits</span>
                    </div>
                    {/* /col */}
                  </div>
                  {/* /row */}
                </div>
                <div className="back bg-slategray">
                  {/* row */}
                  <div className="row">
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-cog fa-2x" /> Settings
                      </a>
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-chain-broken fa-2x" /> Content
                      </a>
                    </div>
                    {/* /col */}
                    {/* col */}
                    <div className="col-xs-4">
                      <a href="#">
                        <i className="fa fa-ellipsis-h fa-2x" /> More
                      </a>
                    </div>
                    {/* /col */}
                  </div>
                  {/* /row */}
                </div>
              </div>
            </div>
            {/* /col */}
          </div>
          {/* /row */}
       
        
         
     
        </ContentWrapper>
    );
  }
}

