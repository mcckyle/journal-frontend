//Filename: src/components/Calendar/CalendarPage.js

import React from "react";
import Calendar from "./Calendar.js";  // Import Calendar component.
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CalendarPage = () => {
  const navigate = useNavigate();
  
  return (
    <Wrapper>
	  <Header>
		<h1>Gratitude Calendar</h1>
		<p>A gentle place to mark moments that mattered.</p>
	  </Header>
	  
	  <CalendarContainer>
        <Calendar />  {/* Render the Calendar component */}
	  </CalendarContainer>
	  
	  <FloatingButton onClick={() => navigate("/entries")}>
	    View All Entries
	  </FloatingButton>
	</Wrapper>
  );
};

export default CalendarPage;

/* --- Styled Components. --- */

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  background: linear-gradient(
    155deg,
	#f8fafc 0%,
	#fdfcf7 50%,
	#faf9ff 100%
  );
`;

const Header = styled.header`
  padding: var(--space-lg) var(--space-xl) var(--space-md);
  text-align: left;
  
  h1 {
	  font-size: 2.6rem;
	  font-weight: 700;
	  color: var(--color-text);
  }
  
  p {
	  margin-top: 0.6rem;
	  font-size: 1.2rem;
	  color: #64748b;
  }
  
  @media (max-width: 768px)
  {
	  padding: var(--space-md);
	  
	  h1 {
		font-size: 2rem;
	  }
	  
	  p {
		font-size: 1rem;
	  }
  }
`;

const CalendarContainer = styled.div`
  flex: 1;
  padding: 0 var(--space-xl);
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px)
  {
	  padding: 0 var(--space-md);
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: var(--space-md);
  right: var(--space-md);
  
  background: var(--color-primary);
  color: white;
  font-weight: 600;
  border-radius: var(--radius);
  padding: 0.9rem 1.6rem;
  font-size: 1rem;
  box-shadow: var(--shadow-md);
  
  transition: var(--transition);
  
  &:hover {
	  transform: translateY(-2px);
	  box-shadow: var(--shadow-lg);
  }

  @media (max-width: 768px)
  {
	  bottom: 1.25rem;
	  right: 1.25rem;
	  padding: 0.7rem 1.15rem;
	  font-size: 0.95rem;
  }
`;