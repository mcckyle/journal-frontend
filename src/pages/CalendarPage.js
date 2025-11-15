//Filename: src/pages/CalendarPage.js

import React from 'react';
import Calendar from '../components/Calendar/Calendar.js';  // Import Calendar component.
import styled from 'styled-components';

const CalendarPage = () => {
  return (
    <Wrapper>
	  <HeaderBar>
	    <div>
		  <h1>Gratitude Calendar</h1>
		  <p>Your daily space to reflect, appreciate, and reconnect ✨</p>
		</div>
	  </HeaderBar>
	  
	  <CalendarSection>
        <Calendar />  {/* Render the Calendar component */}
	  </CalendarSection>
	</Wrapper>
  );
};

export default CalendarPage;

//Styled Components.
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(160deg, #fffdf8, #fef7e8);
  display: flex;
  flex-direction: column;
  padding-bottom: 4rem;
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 3rem 4rem 2rem;
  background: transparent;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  
  h1 {
	  font-size: 2.6rem;
	  margin: 0;
	  font-weight: 700;
	  color: #1f2937;
  }
  
  p {
	  margin-top: 0.5rem;
	  font-size: 1.15rem;
	  color: #555;
  }
  
  @media (max-width: 768px)
  {
	  padding: 2rem 1.5rem;
	  
	  h1 {
		font-size: 2.1rem;
	  }
	  
	  p {
		font-size: 1rem;
	  }
  }
`;

const CalendarSection = styled.div`
  flex: 1;
  padding: 0 3rem;
  
  @media (max-width: 768px)
  {
	  padding: 0 1rem;
  }
`;