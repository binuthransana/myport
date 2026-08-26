import React, { useState } from 'react';
import Header from './landing/Header';
import SynthwaveBackground from './landing/SynthwaveBackground';
import LoadingScreen from './landing/LoadingScreen';
import ProjectsSection from './landing/ProjectsSection';
import { useActiveSection } from './landing/useActiveSection'; // Import your new hook
import AboutSection from './landing/AboutSection';

// Define your color shifts here! 
// 0 is default (pink/cyan), -40 shifts to purple/blue, 30 shifts to orange/gold
const sectionHues = {
  home: 0, 
  about: -15,      
  projects: -40, 
  // contact: 30, // We will uncomment this when we build the contact section!
};

function App() {
  const [loading, setLoading] = useState(true);

  // Watch these specific IDs on the page
  const activeSection = useActiveSection(['home', 'about', 'projects']);

  
  // Look up the hue for the active section, default to 0
  const activeHue = sectionHues[activeSection] || 0;

  

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-transparent">
      
      {/* Background layer now receives the dynamic hue */}
      <SynthwaveBackground hue={activeHue} />

      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <div className={`relative z-10 flex flex-col items-center min-h-screen transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}>
        
        <Header />
        
        {/* HERO SECTION - Now wrapped in an ID so the observer can see it */}
        <section id="home" className="flex flex-col items-center justify-center min-h-screen w-full text-center space-y-6 pt-24">
          <h2 className="font-airstrike text-synth-cyan text-2xl tracking-[0.3em] uppercase">
            Welcome 
          </h2>
          
          <h1 className="font-airstrike text-6xl md:text-8xl mb-2 z-10 tracking-wide drop-shadow-2xl bg-gradient-to-b from-synth-yellow to-synth-pink text-transparent bg-clip-text italic">
  BINUTH RANSANA
</h1>
          
          <p className="font-orbitron text-gray-300 text-lg md:text-xl max-w-lg mx-auto">
            Full Stack Developer // Cybernetic Architect // Synthwave Enthusiast
          </p>

          
        </section>

        {/* PROJECTS SECTION */}
        <AboutSection/>

        <ProjectsSection />

      </div>
    </div>
  );
}

export default App;