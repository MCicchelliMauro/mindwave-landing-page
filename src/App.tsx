import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import Services from './components/Services'
import ContactSection from './components/ContactSection'

function App() {
  return (
    // Añadimos 'bg-tech-grid' aquí
    <main className="min-h-screen bg-mindwave-navy bg-tech-grid">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <Services />
      <ContactSection />
    </main>
  )
}

export default App;