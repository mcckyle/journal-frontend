//Filename: src/pages/CalendarPage.js

import React from 'react';
import Calendar from '../components/Calendar/Calendar.js';  // Import Calendar component.
import styled from 'styled-components';

const CalendarPage = () => {
  return (
    <Wrapper>
	  <HeaderBar>
		<h1>Gratitude Calendar</h1>
		<p>Your daily space to reflect, appreciate, and reconnect ✨</p>
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
  display: flex;
  flex-direction: column;
  padding-bottom: 4rem;
  background: linear-gradient(160deg, var(--color-bg), #fffdf4);
`;

const HeaderBar = styled.header`
  padding: 3rem 4rem 2rem;
  text-align: left;
  
  h1 {
	  font-size: 2.6rem;
	  font-weight: 700;
	  margin: 0;
	  color: var(--color-text);
  }
  
  p {
	  margin-top: 0.5rem;
	  font-size: 1.15rem;
	  color: var(--color-muted);
  }
  
  @media (max-width: 768px)
  {
	  padding: 2rem 1.5rem;
	  
	  h1 {
		font-size: 2rem;
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