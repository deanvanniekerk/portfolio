import { Background } from './components/Background'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { AiWorkflow } from './components/AiWorkflow'
import { Projects } from './components/Projects'
import { Activity } from './components/Activity'
import { Connect } from './components/Connect'
import { Footer } from './components/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  useScrollReveal()

  return (
    <>
      <Background />
      <Nav />
      <Hero />
      <Skills />
      <AiWorkflow />
      <Projects />
      <Activity />
      <Connect />
      <Footer />
    </>
  )
}

export default App
