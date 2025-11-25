//Filename: src/pages/CalendarPage.js

import React from 'react';
import Calendar from '../components/Calendar/Calendar.js';  // Import Calendar component.
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const CalendarPage = () => {
  const navigate = useNavigate();
  
  return (
    <Wrapper>
	  <HeaderBar>
		<h1>Gratitude Calendar</h1>
		<p>Your daily space to reflect, appreciate, and reconnect.</p>
	  </HeaderBar>
	  
	  <CalendarSection>
        <Calendar />  {/* Render the Calendar component */}
	  </CalendarSection>
	  
	  <FloatingButton onClick={() => navigate("/entries")}>
	    View All Entries
	  </FloatingButton>
	</Wrapper>
  );
};

export default CalendarPage;

/* --- Styled Components --- */

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 5rem;
  
  display: flex;
  flex-direction: column;
  
  background: linear-gradient(165deg, #fafbfd, #fffdf8);
`;

const HeaderBar = styled.header`
  padding: 3rem 4rem 2rem;
  
  h1 {
	  margin: 0;
	  font-size: 2.45rem;
	  font-weight: 700;
	  color: #1e293b;
  }
  
  p {
	  margin-top: 0.6rem;
	  font-size: 1.15rem;
	  color: #64748b;
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
  width: 100%;
  flex: 1;
  
  padding: 0 3rem;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px)
  {
	  padding: 0 1rem;
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  
  padding: 0.85rem 1.45rem;
  font-size: 1rem;
  font-weight: 600;
  
  border: none;
  border-radius: 12px;
  background: var(--color-primary);
  color: #fff;
  
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: 0.22s ease;
  
  &:hover {
	  transform: translateY(-2px);
	  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px)
  {
	  bottom: 1.25rem;
	  right: 1.25rem;
	  padding: 0.7rem 1.15rem;
	  font-size: 0.95rem;
  }
`;