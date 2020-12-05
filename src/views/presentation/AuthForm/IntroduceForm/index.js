import React from 'react'
import styled from 'styled-components'
import strings from '~/localization'

const Container = styled.div`
  padding-top: 100px;
  div img { width: 200px; height: 150px; }
  .intro { 
    margin-top: 30px;
    margin-bottom: 100px;
    p { font-weight: 500}
  }
  .copyright{
    display:block;
    position:absolute;
    bottom:20px;
    right:0;
    width:100%;
  }


`
export default class IntroduceForm extends React.PureComponent{
  
  render(){
     return <Container className='mx-4'>
       <div className='d-flex justify-content-center'><img src={'https://vslsoft.com/wp-content/uploads/2019/09/New-VSL-logo-1-120x63.png'}/></div>
       <div className='intro' dangerouslySetInnerHTML={{__html: strings.intro}}></div>
       <div className='text-center copyright'><span className='font-weight-bold'>{strings.copy_right}</span></div>
     </Container>
  }
}