import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Award, GraduationCap, Briefcase } from 'lucide-react'

const flashcards = [
    {
        icon: GraduationCap,
        title: 'Education & Knowledge',
        image: '/card1.jpg',
        lines: [
            'M.S. in Computer Science (Kent State University) with focus on AI systems, data mining, and secure architectures.',
            'Designed an LLM-powered retrieval application using embeddings + semantic search for contextual knowledge generation.',
            'Developed scalable anomaly detection pipelines with advanced feature engineering and hyperparameter tuning.',
            'Integrated ML models into backend systems (Appify) with real-time inference endpoints.',
            'Built AI-driven conversational workflows for Happify mental health companion experiences.',
        ],
        color: 'from-indigo-500 to-purple-500',
    },
    {
        icon: Award,
        title: 'Research & Certifications',
        image: '/card2.jpg',
        lines: [
            'Published peer-reviewed research on ML-based CSRF vulnerability detection (European Chemical Bulletin, Vol. 12, Issue 10).',
            'Research link: https://www.eurchembull.com/archives/volume-12/issue-10/11844',
            'Programming: Cisco Programming Essentials in Python and C.',
            'Networking: Cisco CCNA (Introduction to Networks, Switching/Routing/Wireless Essentials).',
            'Security & Cloud: Palo Alto Fundamentals of Cloud Security and SOC.',
            'Process Mining & AI: Celonis Foundations + Academic Process Mining Fundamentals + AWS AI/ML Virtual Internship.',
        ],
        color: 'from-cyan-500 to-blue-500',
    },
    {
        icon: Briefcase,
        title: 'Expertise & Strength',
        image: '/card3.jpg',
        lines: [
            'Specialized in Generative AI, LLM applications, NLP pipelines, and scalable ML system design.',
            'Strong in prompt engineering, semantic retrieval, model optimization, and production deployment.',
            'Hands-on with end-to-end delivery: data ingestion, model serving, monitoring, and iteration.',
            'Executes effectively in high-pressure environments with structured analytical decision-making.',
            'Combines research depth with execution rigor to deliver measurable business outcomes.',
        ],
        color: 'from-rose-500 to-orange-500',
    },
]

function FlipCard({ card }) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div
            className="relative h-[28rem] md:h-[30rem] cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped((prev) => !prev)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setIsFlipped((prev) => !prev)
                }
            }}
            style={{ perspective: '1000px' }}
        >
            <div
                className="relative w-full h-full transition-transform duration-700"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                <div
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div
                        className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}
                    >
                        <card.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                        <p className="text-slate-300 text-sm">Hover to explore -&gt;</p>
                    </div>
                </div>

                <div
                    className="absolute inset-0 w-full h-full rounded-2xl"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div
                        className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-2xl blur-xl opacity-30`}
                    />

                    <div className="relative h-full bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-2xl p-6 overflow-auto">
                        <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}
                        >
                            <card.icon className="w-5 h-5 text-white" />
                        </div>

                        <h3
                            className={`text-xl font-bold mb-4 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}
                        >
                            {card.title}
                        </h3>

                        <ul className="space-y-3">
                            {card.lines.map((line, i) => (
                                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${card.color} mt-1.5 flex-shrink-0`}
                                    />
                                    {(() => {
                                        const urlMatch = line.match(/https?:\/\/\S+/)
                                        if (!urlMatch) return line

                                        const url = urlMatch[0]
                                        const prefix = line.replace(url, '').trim()
                                        return (
                                            <span>
                                                {prefix ? `${prefix} ` : ''}
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 break-all"
                                                >
                                                    {url}
                                                </a>
                                            </span>
                                        )
                                    })()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: '-35% 0px -35% 0px' })

    return (
        <section id="about" className="relative z-10 scroll-mt-20 py-20 px-4 min-h-screen">
            <div className="w-full" style={{ maxWidth: '1100px', margin: '0 auto' }} ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                            About Me
                        </span>
                    </h2>

                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {flashcards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{
                                opacity: 0,
                                y: 120,
                                x: index === 0 ? -120 : index === 2 ? 120 : 0,
                                scale: 0.88,
                                rotate: index === 0 ? -8 : index === 2 ? 8 : 0,
                            }}
                            animate={
                                isInView
                                    ? { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }
                                    : {
                                        opacity: 0,
                                        y: 120,
                                        x: index === 0 ? -120 : index === 2 ? 120 : 0,
                                        scale: 0.88,
                                        rotate: index === 0 ? -8 : index === 2 ? 8 : 0,
                                    }
                            }
                            transition={{
                                type: 'spring',
                                stiffness: 85,
                                damping: 16,
                                delay: isInView ? 0.12 + index * 0.18 : 0,
                            }}
                        >
                            <FlipCard card={card} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
