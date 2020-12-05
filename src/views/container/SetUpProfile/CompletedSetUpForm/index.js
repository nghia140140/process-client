import React from 'react'
import styled from 'styled-components'
import strings from '~/localization'


const CompletedStyled = styled.div`
  h4 {text-align: center; margin-bottom: 40px;}
  div div { font-weight: 500; margin-bottom: 100px;}
  min-height: 50vh;
`

const CompletedSetUpForm =()=>{
  return <CompletedStyled >
    <h4>{strings.completed_setup}</h4>
    <div className='row d-flex justify-content-center'>
      <div className='col-12 col-md-8' dangerouslySetInnerHTML={{__html: strings.completed_setup_description}}></div>
    </div>
    
  </CompletedStyled>
}
export default CompletedSetUpForm;