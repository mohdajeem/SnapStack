import React, {useState, useEffect} from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const images = [
    "/images/Gemini_Generated_Image_o6l7clo6l7clo6l7.png",
    "/images/Gemini_Generated_Image_o6l7clo6l7clo6l71.png",
    "/images/Gemini_Generated_Image_y2tio1y2tio1y2ti.png"
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // change every 1 second

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-headline">
            Build React Components at the Speed of Thought ⚡
          </h1>
          <p className="hero-subheading">
            Go from a simple text prompt to a fully functional, production-ready React component in seconds. Describe, generate, and export—it's that simple.
          </p>
          <button className="home-cta-button" onClick={() => navigate('/dashboard')}>
            Start Generating for Free
          </button>
        </div>
      </section>

      {/* 2. "How It Works" Section */}
      <section className="how-it-works">
        <h2>From Prompt to Product in Three Steps</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">✍️</div>
            <h3>Describe</h3>
            <p>
              Use natural language (and even upload images) to describe the component you need. From a simple button to a complex data grid, just type it out.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon">🤖</div>
            <h3>Generate & Preview</h3>
            <p>
              Our AI instantly writes the JSX/TSX and CSS, rendering a live, interactive preview right in your browser. No setup required.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon">🚀</div>
            <h3>Refine & Export</h3>
            <p>
              Tweak your component with follow-up prompts or our visual editor. When you're happy, copy the code or download a .zip file to drop into your project.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visual Showcase Section */}
      <section className="visual-showcase">
        <h2>See Your Ideas Come to Life. Instantly.</h2>
        <p className="showcase-subheading">
          Our AI doesn't just write code—it builds a live, sandboxed micro-frontend for you to interact with. Edit with chat, see changes in real-time, and inspect the code without ever leaving your browser.
        </p>
        <div className="app-mockup slider">
          <img src={images[currentIndex]} alt={`slide-${currentIndex}`} />
        </div>

      </section>

      {/* 4. Final Call to Action Section */}
      <section className="final-cta">
        <h2>Ready to Accelerate Your Workflow?</h2>
        <p>
          Stop writing boilerplate. Start creating. Sign up and get full access to your persistent session history, code generation, and export features.
        </p>
        <button className="home-cta-button" onClick={() => navigate("/register")}>
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Component Generator. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;