import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Gauge, Rocket, BarChart3, Download } from 'lucide-react'

export default function Hero() {
    const ref = useRef(null)
    const [photoIndex, setPhotoIndex] = useState(0)
    const [tossCycle, setTossCycle] = useState(0)
    const prefersReducedMotion = useReducedMotion()

    const photos = ['/your-photo.jpg', '/your-photo-2.jpg']
    const socialEntry = [
        { x: -90, y: -90 },
        { x: 90, y: -90 },
        { x: 90, y: 90 },
    ]
    const highlights = [
        { icon: Rocket, label: 'Open to Full-time AI/ML Engineer roles' },
        { icon: BarChart3, label: 'AI/ML experience since 2021' },
        { icon: Gauge, label: 'LLM, NLP, OCR, anomaly detection systems' },
    ]

    useEffect(() => {
        if (prefersReducedMotion) return undefined

        const intervalId = setInterval(() => {
            setTossCycle((prev) => prev + 1)
        }, 5000)

        return () => clearInterval(intervalId)
    }, [prefersReducedMotion])

    useEffect(() => {
        if (prefersReducedMotion || tossCycle === 0) return undefined

        const swapTimeout = setTimeout(() => {
            setPhotoIndex((prev) => (prev + 1) % photos.length)
        }, 520)

        return () => clearTimeout(swapTimeout)
    }, [prefersReducedMotion, tossCycle, photos.length])

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section
            ref={ref}
            id="home"
            className="min-h-screen pt-18 pb-16 md:pt-24 md:pb-24 flex items-center justify-center relative overflow-hidden"
        >
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 text-center px-4 w-full max-w-4xl"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-5 md:mb-6 md:translate-x-10 translate-y-3 md:translate-y-6"
                >
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto" style={{ perspective: '1000px' }}>
                        <motion.div
                            key={tossCycle}
                            className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 p-1"
                            style={{ transformStyle: 'preserve-3d' }}
                            initial={{ rotateY: 0, rotateX: 0, y: 0, scale: 1, filter: 'brightness(1)' }}
                            animate={
                                prefersReducedMotion
                                    ? { rotateY: 0, rotateX: 0, y: 0, scale: 1, filter: 'brightness(1)' }
                                    : {
                                        rotateY: [0, 220, 520, 900],
                                        rotateX: [0, 18, -12, 0],
                                        y: [0, -38, -10, 0],
                                        scale: [1, 1.05, 1.02, 1],
                                        filter: ['brightness(1)', 'brightness(1.15)', 'brightness(1.05)', 'brightness(1)'],
                                    }
                            }
                            transition={{ duration: 1.05, ease: 'easeInOut' }}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img
                                    src={photos[photoIndex]}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.55, once: false }}
                    transition={{ delay: 0.2, duration: 1.05, ease: 'easeOut' }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Sivateja Pinninti
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, x: -70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.55, once: false }}
                    transition={{ delay: 0.45, duration: 0.9, ease: 'easeOut' }}
                    className="text-lg md:text-2xl text-slate-400 mb-7"
                >
                    <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                        AI/ML Software Engineer
                    </span>
                    <span className="mx-3"> | </span>
                    <span>Generative AI Applications</span>
                    <span className="mx-3"> | </span>
                    <span>LLMs | NLP | MLOps</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -85 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.55, once: false }}
                    transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                    className="mb-9 w-full flex justify-center"
                >
                    <p
                        className="text-base md:text-lg text-slate-400 max-w-2xl w-full mx-auto leading-relaxed text-center"
                        style={{ textAlign: 'center' }}
                    >
                        AI/ML Engineer with 3+ years of experience building and deploying Generative AI, NLP, and Machine Learning solutions in financial services and enterprise environments.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.55, once: false }}
                    transition={{ delay: 0.72, duration: 0.75, ease: 'easeOut' }}
                    className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-8 md:mb-9 max-w-3xl mx-auto"
                >
                    {highlights.map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-slate-700 bg-slate-900/45 px-2.5 md:px-3 py-1.5 text-[11px] md:text-xs text-slate-300"
                        >
                            <Icon className="w-3.5 h-3.5 text-cyan-300" />
                            <span>{label}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.55, once: false }}
                    transition={{ delay: 0.84, duration: 0.65 }}
                    className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-10"
                >
                    {[
                        { icon: Github, href: 'https://github.com/01sivateja', label: 'GitHub' },
                        { icon: Linkedin, href: 'https://www.linkedin.com/in/sivatejap/', label: 'LinkedIn' },
                        { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&to=sivateja1usadreams@gmail.com', label: 'Email' },
                    ].map(({ icon: Icon, href, label }, index) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="p-3 rounded-full bg-slate-800/50 border border-slate-700 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all"
                            initial={{
                                opacity: 0,
                                x: socialEntry[index]?.x ?? 0,
                                y: socialEntry[index]?.y ?? 0,
                                scale: 0.7,
                            }}
                            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={{ amount: 0.55, once: false }}
                            transition={{
                                delay: 0.85 + index * 0.12,
                                type: 'spring',
                                stiffness: 150,
                                damping: 18,
                            }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-300" />
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.55, once: false }}
                    transition={{ delay: 0.95, duration: 0.65 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
                >
                    <motion.a
                        href="/resume.docx"
                        download="Sivateja_Pinninti_Resume.docx"
                        className="w-44 h-10 flex items-center justify-center gap-2 rounded-lg bg-cyan-200/20 text-cyan-100 font-semibold border border-cyan-300/30 hover:bg-cyan-200/30 hover:border-cyan-300/50 transition-all text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Download className="w-4 h-4" />
                        Download Resume
                    </motion.a>

                    <motion.a
                        href="#projects"
                        className="w-32 h-10 flex items-center justify-center rounded-lg bg-rose-200/20 text-rose-100 font-semibold border border-rose-300/30 hover:bg-rose-200/30 hover:border-rose-300/50 transition-all text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View My Work
                    </motion.a>

                    <motion.a
                        href="#contact"
                        className="w-32 h-10 flex items-center justify-center rounded-lg bg-orange-200/20 text-orange-100 font-semibold border border-orange-300/30 hover:bg-orange-200/30 hover:border-orange-300/50 transition-all text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get In Touch
                    </motion.a>
                </motion.div>
            </motion.div>

            <motion.a
                href="#about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ChevronDown className="w-8 h-8 text-slate-400" />
                </motion.div>
            </motion.a>
        </section>
    )
}
