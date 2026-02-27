import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [hoveredLink, setHoveredLink] = useState(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (e, href) => {
        e.preventDefault()
        const target = document.querySelector(href)
        if (!target) return

        const navOffset = 80
        const top = target.getBoundingClientRect().top + window.scrollY - navOffset
        window.scrollTo({ top, behavior: 'smooth' })
        window.history.replaceState(null, '', href)
        setIsMobileMenuOpen(false)
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
                    : 'bg-transparent'
            }`}
        >
            <div className="w-full" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                    >
                        Portfolio
                    </motion.a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                                onFocus={() => setHoveredLink(link.name)}
                                onBlur={() => setHoveredLink(null)}
                                className={`transition-all duration-200 py-2 px-1 border-b-2 ${
                                    hoveredLink === link.name
                                        ? 'text-cyan-300 border-cyan-300'
                                        : 'text-slate-300 border-transparent'
                                }`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -1 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Mobile Button */}
                    <button
                        className="md:hidden text-white"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-slate-900/95 backdrop-blur-md"
                >
                    <div className="px-4 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="block text-slate-300 hover:text-white transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}
