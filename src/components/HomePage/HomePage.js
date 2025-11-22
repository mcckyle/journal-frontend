//Filename: src/components/HomePage/HomePage.js

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { parseLocalDate } from "../../utils/parseLocalDate";

//Small built-in list of positive affirmations.
const affirmations = [
  "You are growing in ways you can't yet see.",
  "Small steps count just as much as big ones.",
  "You deserve moments of peace and clarity.",
  "Your gratitude shapes the way you see the world.",
  "Today is a new chance to notice something good."
];

//Daily gratitude prompts.
const prompts = [
  "What made today feel a little brighter?",
  "Who showed you kindness recently?",
  "What small comfort are you thankful for right now?",
  "What's something in your routine that brings you peace?",
  "What did you learn about yourself today?"
];

const HomePage = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [affirmation, setAffirmation] = useState("");
  
  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).sub;
  
  useEffect(() => {
	  setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
	  setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);
  
  useEffect(() => {
	  const fetchEntries = async () => {
		  try
		  {
			  const token = localStorage.getItem("token");
			  if ( ! token)
			  {
				  return;
			  }
			  
			  const response = await fetch(`http://localhost:8080/api/calendar/user/${userId}`, {
				  headers: { Authorization: `Bearer ${token}` }
			  });
			  
			  if ( ! response.ok)
			  {
				  return;
			  }
			  
			  const data = await response.json();
			  setEntries(data.slice(-3).reverse());
			  
			  //Compute the user's streak.
			  const dates = data.map(e => e.entryDate);
			  const today = new Date().toISOString().split("T")[0];
			  
			  let count = 0;
			  let current = new Date(today);
			  
			  while (dates.includes(current.toISOString().split("T")[0]))
			  {
				  count ++;
				  current.setDate(current.getDate() - 1);
			  }
			  
			  setStreak(count);
		  }
		  catch (error)
		  {
			  console.error(error);
		  }
	  };
	  
	  fetchEntries();
  }, []);
  
  const handleQuickEntry = () => navigate("/calendar?new-entry=true");
  
  return (
	  <MainContainer>
	  
	  {/* Welcome Panel */}
	    <HeroSection>
			<Overlay />
			<Content>
			  <h1>Welcome Back</h1>
			  <p>Your space to reflect, grow, and cherish the moments that matter.</p>
			  <StartButton to="/calendar">Begin Your Journey</StartButton>
			</Content>
		</HeroSection>
		
		{/* Dashboard */}
		<DashboardSection>
		
		{/* Today's Prompt */}
		<Card>
		  <h3>Today's Reflection Prompt</h3>
		  <p>{prompt}</p>
		  <QuickAddButton onClick={handleQuickEntry}>
		    Write a New Entry
          </QuickAddButton>
        </Card>
		
		{/* Last Three Entries */}
		<Card>
		  <h3>Recent Entries</h3>
		  {entries.length === 0 ? (
		    <EmptyState>No entries yet.</EmptyState>
		  ) : (
		    entries.map((e, index) => (
			  <EntryPreview key={index} to={`/entries#${e.id}`}>
			    <span>{parseLocalDate(e.entryDate)}</span>
				<p>{e.content.substring(0, 120)}...</p>
			  </EntryPreview>
			))
          )}
		</Card>
		
		{/* Streak */}
		<Card>
		  <h3>Your Current Streak</h3>
		  <StreakNumber>{streak} days</StreakNumber>
		  <p>Showing up for yourself makes all the difference!</p>
		</Card>
		
		{/* Positive Affirmations */}
		<Card>
		  <h3>Daily Affirmation</h3>
		  <Affirmation>{affirmation}</Affirmation>
		</Card>
		
	   </DashboardSection>
	  </MainContainer>
	);
};

export default HomePage;

/* --- Styled Components --- */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MainContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
    position: relative;
	height: 50vh;
    display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(135deg, #fdfbfb 0%, #ebf0f4 100%);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.6), transparent 60%),
              radial-gradient(circle at 75% 75%, rgba(170, 205, 230, 0.3), transparent 70%);
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  animation: ${fadeIn} 1s ease both;
  
  h1 {
	  font-size: clamp(2.5rem, 5vw, 3.5rem);
	  font-weight: 700;
	  color: #1e293b;
  }
  
  p {
	  font-size: 1.2rem;
	  color: #475569;
	  margin-bottom: 3rem;
	  max-width: 700px;
	  margin-inline: auto;
  }
  
  @media (max-width: 768px)
  {
	  p {
		font-size: 1.05rem;
		margin-bottom: 2rem;
	  }
  }
`;

const DashboardSection = styled.section`
  padding: 4rem 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  
  &:hover {
	  transform: translateY(-3px);
	  box-shadow: var(--shadow-lg);
  }
  
  h3 {
	 margin-bottom: 0.8rem;
	 color: #1e293b;
	 font-weight: 600;
  }
  
  p {
	color: #475569;
	line-height: 1.7;
  }
`;

const BaseButton = styled.button`
  display: inline-block;
  font-weight: 600;
  border-radius: var(--radius);
  padding: 0.85rem 1.75rem;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.18);
  
  transition: transform 0.2s ease, background 0.2s ease;
`;

const QuickAddButton = styled(BaseButton)`
  background: var(--color-primary);
  color: white;
  
  &:hover {
	  background: var(--color-primary-dark);
	  transform: translateY(-2px);
  }
  
`;

const EntryPreview = styled(Link)`
  display: block;
  margin: 0.65rem 0;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(0, 0, 0, 0.08);
  text-decoration: none;
  
  transition: 0.2s ease;
  
  span {
	  font-size: 0.85rem;
	  color: #64748b;
  }
  
  p {
	  color: #334155;
	  margin-top: 0.25rem;
  }
  
  &:hover {
	  background: rgba(255, 255, 255, 0.85);
	  transform: translateY(-2px);
  }
`;

const EmptyState = styled.p`
  color: #94a3b8;
  font-style: italic;
`;

const StreakNumber = styled.div`
  font-size: 2.75rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0.5rem 0 0.75rem 0;
`;

const Affirmation = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  font-style: italic;
  opacity: 0.9;
`;

const StartButton = styled(Link)`
  ${BaseButton}
  background: var(--color-primary);
  color: #fff;
  font-size: 1.15rem;
  text-decoration: none;
  
  &:hover {
	  background: var(--color-primary-dark);
	  transform: translateY(-2px);
	  color: #fff;
  }
`;

const InfoPanel = styled.section`
  width: 100%;
  background: linear-gradient(120deg, #ffffff, #f9fafc);
  padding: 4rem 1.5rem;
  display: flex;
  justify-content: center;
`;

const PanelContent = styled.div`
  max-width: 900px;
  text-align: center;
  
  h2 {
	  font-size: 2rem;
	  color: #1e293b;
	  margin-bottom: 1rem;
	  font-weight: 600;
  }
  
  p {
	  color: #475569;
	  font-size: 1.1rem;
	  line-height: 1.75;
	  max-width: 650px;
	  margin: 0 auto;
  }
`;