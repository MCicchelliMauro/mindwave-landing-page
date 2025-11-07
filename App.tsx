import Navbar from './src/components/Navbar'
import HeroSection from './src/components/HeroSection'
import Services from './src/components/Services'
import ContactSection from './src/components/ContactSection'

function App() {
  return (
    <main className="min-h-screen bg-mindwave-navy overflow-hidden">
      <Navbar />
      <HeroSection />
      <Services />
      <ContactSection />
    </main>
  )
}

export default App