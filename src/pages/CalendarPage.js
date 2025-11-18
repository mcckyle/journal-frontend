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
		<p>Your daily space to reflect, appreciate, and reconnect ✨</p>
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

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2.2rem;
  right: 2.2rem;
  padding: 0.9rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  
  border: none;
  border-radius: 12px;
  background: var(--color-accent);
  color: white;
  
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  
  &:hover {
	  transform: translateY(-2px);
	  box-shadow: 0px 12px 26px rgba(0, 0, 0, 0.12);
  }
  
  &:active {
	transform: translateY(0);
	box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 768px)
  {
	  bottom: 1.4rem;
	  right: 1.4rem;
	  padding: 0.75rem 1.2rem;
	  font-size: 0.95rem;
	  border-radius: 10px;
  }
`;