//Filename: src/components/HomePage/HomePage.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { parseLocalDate } from "../../utils/parseLocalDate";

import "./HomePage.css";

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
			  
			  //Compute the user's streak based on consecutive days with
			  //at least one entry.
			  const uniqueDates = Array.from(
			    new Set(data.map(e => parseLocalDate(e.entryDate)))
			  );
			  
			  //Sort dates from newest -> oldest.
			  uniqueDates.sort((a, b) => new Date(b) - new Date(a));
			  
			  //Start from today.
			  let streakCount = 0;
			  let currentDate = new Date();
			  let currentDateStr = currentDate.toISOString().split("T")[0];
			  
			  //If no entry today, shift starting point to yesterday.
			  if ( ! uniqueDates.includes(currentDateStr))
			  {
				  currentDate.setDate(currentDate.getDate() - 1);
			  }
			  
			  //Step through consecutive days.
			  while (true)
			  {
				  currentDateStr = currentDate.toISOString().split("T")[0];
				  
				  if (uniqueDates.includes(currentDateStr))
				  {
					  streakCount ++;
					  currentDate.setDate(currentDate.getDate() - 1);
				  }
				  else
				  {
					  break;
				  }
			  }
			  
			  setStreak(streakCount);
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
	  <div className="home-main">
	  
	  {/* Welcome Panel */}
	    <section className="hero">
			<div className="hero-overlay"></div>
			<div className="hero-content">
			  <h1>Welcome Back</h1>
			  <p>Your space to reflect, grow, and cherish the moments that matter.</p>
			  <Link to="/calendar" className="start-button">Begin Your Journey</Link>
			</div>
		</section>
		
		{/* Dashboard */}
		<section className="dashboard">
			{/* Today's Prompt */}
			<div className="card">
			  <h3>Today's Reflection Prompt</h3>
			  <p>{prompt}</p>
			  <button className="quick-add-button" onClick={handleQuickEntry}>
				Write a New Entry
			  </button>
			</div>
			
			{/* Last Three Entries */}
			<div className="card">
			  <h3>Recent Entries</h3>
			  {entries.length === 0 ? (
				<p className="empty-state">No entries yet.</p>
			  ) : (
				entries.map((e, index) => (
				  <Link key={index} to={`/entries#${e.id}`} className="entry-preview">
					<span>{parseLocalDate(e.entryDate)}</span>
					<p>{e.content.substring(0, 120)}...</p>
				  </Link>
				))
			  )}
			</div>
			
			{/* Streak */}
			<div className="card">
			  <h3>Your Current Streak</h3>
			  <div className="streak-number">{streak} days</div>
			  <p>Showing up for yourself makes all the difference!</p>
			</div>
			
			{/* Positive Affirmations */}
			<div className="card">
			  <h3>Daily Affirmation</h3>
			  <p className="affirmation">{affirmation}</p>
			</div>
	   </section>
	  </div>
	);
};

export default HomePage;