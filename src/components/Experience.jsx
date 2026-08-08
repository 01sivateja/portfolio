import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const experiences = [
    {
        id: 1,
        title: 'ML Engineer',
        company: 'BNY | pittsburg, PA',
        period: 'Feb 2024 - Present',
        description:
            'Built end-to-end ML pipelines for anomaly detection, LLM-powered knowledge search features, OCR document intelligence workflows, and real-time inference services.',
        technologies: ['Python', 'PyTorch', 'FastAPI', 'AWS SageMaker', 'Docker', 'Kubernetes'],
    },
    {
        id: 2,
        title: 'ML Engineer',
        company: 'Bank of Baroda | India',
        period: 'May 2021 - Jul 2023',
        description:
            'Developed ML and NLP models for credit risk and transaction analytics, fine-tuned transformer models, and deployed real-time inference services with cloud integration.',
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'AWS SageMaker', 'REST APIs'],
    },
]

const impactHighlights = [
    { label: 'Professional Experience', value: 'Since 2021', detail: 'AI/ML engineering and research-driven project delivery' },
    { label: 'Core Delivery', value: 'End-to-End ML', detail: 'From feature engineering to model serving and monitoring' },
    { label: 'Generative AI', value: 'LLMs + Prompting', detail: 'GPT APIs, transformer fine-tuning, retrieval workflows' },
    { label: 'Cloud Deployment', value: 'AWS + GCP', detail: 'SageMaker, Docker, Kubernetes, CI/CD integration' },
]

export default function Experience() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: '-100px' })

    return (
        <section id="experience" className="scroll-mt-20 py-20 px-4 min-h-screen">
            <div className="w-full" style={{ maxWidth: '1100px', margin: '0 auto' }} ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Experience
            </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6"
                >
                    <h3 className="text-lg font-semibold text-white mb-5">
                        Impact Highlights
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {impactHighlights.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-xl border border-slate-700 bg-slate-900/35 p-4"
                            >
                                <p className="text-slate-400 text-xs uppercase tracking-[0.18em] mb-2">
                                    {item.label}
                                </p>
                                <p className="text-cyan-300 text-2xl font-semibold mb-2">{item.value}</p>
                                <p className="text-slate-300 text-sm">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 hidden md:block" />

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                                className="relative md:pl-20"
                            >
                                <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-indigo-500 hidden md:block" />

                                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group">
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                                {exp.title}
                                            </h3>

                                            <div className="flex items-center gap-2 text-slate-400 mt-1">
                                                <Briefcase className="w-4 h-4" />
                                                <span>{exp.company}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full text-sm">
                                            <Calendar className="w-4 h-4" />
                                            <span>{exp.period}</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-300 mb-4">{exp.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full"
                                            >
                        {tech}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
