import React, { useState } from 'react';
import Header from './landing/Header';
import SynthwaveBackground from './landing/SynthwaveBackground';
import LoadingScreen from './landing/LoadingScreen';
import AboutSection from './landing/AboutSection';
import SkillsSection from './landing/SkillsSection';
import ProjectsSection from './landing/ProjectsSection';
import { useActiveSection } from './hooks/useActiveSection';
import RotatingTagline from './landing/RotatingTagline';
import ContactSection from './landing/ContactSection';
import CursorTrail from './landing/CursorTrail';
import NavDots from './landing/NavDots';
import Footer from './landing/Footer';
import myPortraitImage from './assets/image.png';

// 1. Define the array for both the hook and the NavDots
const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];

// Define your color shifts here! 
const sectionHues = {
  home: 0, 
  about: -15,  
  skills: -25,  
  projects: -40, 
  contact: 20, 
};

function App() {
  const [loading, setLoading] = useState(true);

  // FIXED: Added 'skills' to the array of watched sections
  const activeSection = useActiveSection(['home', 'about', 'skills', 'projects', 'contact']);
  
  // Look up the hue for the active section, default to 0
  const activeHue = sectionHues[activeSection] || 0;

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-transparent">
      
      {/* Background layer now receives the dynamic hue */}
      <SynthwaveBackground hue={activeHue} />

      {/* FIXED: Added the CursorTrail right above the main content! */}
      <CursorTrail maxPoints={30} fadeSpeed={0.04} baseWidth={6} />

      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      {/* 2. The Inner Snap-Scroll Container */}
      <div className={`relative z-10 h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}>        
        <Header />

        
       
        <NavDots activeId={activeSection} sectionIds={sectionIds} />
        
        {/* HERO SECTION */}
        <section id="home" className="snap-start flex flex-col items-center justify-center min-h-screen w-full text-center space-y-6 pt-24">
          <h2 className="-translate-y-9 font-airstrike text-synth-cyan text-2xl tracking-[0.3em] uppercase">
            Hi! I'm 
          </h2>
          
          <h1 className="-translate-y-6 font-airstrike text-6xl md:text-8xl mb-2 z-10 tracking-wide drop-shadow-2xl bg-linear-to-b from-synth-yellow to-synth-pink text-transparent bg-clip-text italic">
            BINUTH RANSANA
          </h1>
          
          <RotatingTagline />
          
        </section>
        
        {/* ABOUT SECTION */}
        <div className="snap-start"><AboutSection photo={myPortraitImage}/></div>

        {/* SKILLS SECTION */}
        <div className="snap-start"><SkillsSection /></div>

        {/* PROJECTS SECTION */}
        <div className="snap-start"><ProjectsSection /></div>

        {/* CONTACT SECTION */}
        <div className="snap-start">
          <ContactSection 
            email="binuthran@gmail.com"
            phone="+94 71 571 1322"
            socials={{
              github: "https://github.com/yourhandle",
              linkedin: "https://linkedin.com/in/yourhandle",
              twitter: "https://x.com/yourhandle",
            }}
          />
          <Footer/>
        </div>
        
      </div>
    </div>
  );
}

export default App;