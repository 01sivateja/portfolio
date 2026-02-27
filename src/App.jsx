import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import CursorFollower from './components/CursorFollower'

function App() {
    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash
            if (!hash) return
            const target = document.querySelector(hash)
            if (!target) return

            const navOffset = 80
            const top = target.getBoundingClientRect().top + window.scrollY - navOffset
            window.scrollTo({ top, behavior: 'auto' })
        }

        const timer = setTimeout(scrollToHash, 0)
        window.addEventListener('hashchange', scrollToHash)
        return () => {
            clearTimeout(timer)
            window.removeEventListener('hashchange', scrollToHash)
        }
    }, [])

    return (
        <div className="min-h-screen">
            <CursorFollower />
            <ParticleBackground />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
}

export default App
