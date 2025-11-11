//Filename: src/components/HomePage/HomePage.js

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <WelcomeSection>
    <Content>
      <h1>Welcome to Your Gratitude Journal</h1>
      <p>Capture moments of appreciation, reflect on your day, and nurture a grateful mindset!</p>
      <StartButton to="/calendar">Get Started</StartButton>
    </Content>
  </WelcomeSection>
);

export default HomePage;

const WelcomeSection = styled.section`
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 80px);
	background: linear-gradient(135deg, #f8f9fa, #eef2f3);
	text-align: center;
	padding: 2rem;
`;

const Content = styled.div`
  max-width: 700px;
  
  h1 {
	  font-size: 2.5rem;
	  color: #222;
	  margin-bottom: 1rem;
  }
  
  p {
	  font-size: 1.1rem;
	  color: #555;
	  margin-bottom: 2rem;
	  line-height: 1.6;
  }
  
  @media (max-width: 768px)
  {
	  h1 {
		font-size: 2rem;
	  }
	  
	  p {
		font-size: 1rem;
	  }
`;

const StartButton = styled(Link)`
  background: #ff8c00;
  color: white;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background 0.3s ease, transform 0.2s ease;
  
  &:hover {
	  background: #e07b00;
	  transform: translateY(-2px);
  }
`;