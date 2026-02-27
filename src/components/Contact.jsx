import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Linkedin, Github } from 'lucide-react'

const contactInfo = [
    {
        icon: Mail,
        label: 'Email',
        value: 'sivateja1usadreams@gmail.com',
        href: 'mailto:sivateja1usadreams@gmail.com',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: 'Available upon request',
        href: null,
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Kent, OH',
        href: null,
    },
]

const socialLinks = [
    { icon: Github, href: 'https://github.com/01sivateja', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sivatejap/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:sivateja1usadreams@gmail.com', label: 'Email' },
]

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: '-100px' })
    const [formData, setFormData] = useState({ name: '', email: '', message: ''})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        alert('Message sent! (This is a demo)')
        setFormData({ name: '', email: '', message: '' })
        setIsSubmitting(false)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <section id="contact" className="scroll-mt-20 py-24 px-4">
            <div className="w-full" style={{ maxWidth: '1100px', margin: '0 auto' }} ref={ref}>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
                    </h2>

                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full mb-6"/>
                    <div className="w-full flex justify-center">
                        <p
                            className="text-slate-400 max-w-2xl w-full mx-auto text-center leading-relaxed"
                            style={{ textAlign: 'center' }}
                        >
                            Open to entry-level and early-career AI/ML Engineer roles. Reach out for interviews, project discussions, or collaboration opportunities.
                        </p>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-14">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-6">
                                Contact Information
                            </h3>

                            <div className="space-y-6 mb-8">
                                {contactInfo.map((item) => (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>

                                        <div>
                                            <p className="text-sm text-slate-400">{item.label}</p>

                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="text-white hover:text-indigo-400 transition-colors"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-white">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-slate-400 mb-4">
                                    Follow Me
                                </h4>

                                <div className="flex gap-4">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
                        >
                            <h3 className="text-xl font-semibold text-white mb-6">
                                Send a Message
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold  rounded-lg  flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <span>Sending...</span>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
