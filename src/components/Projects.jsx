import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Folder } from 'lucide-react'

const projects = [
    {
        id: 1,
        title: 'LLM-Powered Chatbot & Knowledge Assistant',
        description:
            'Built an LLM-based application to handle conversational enterprise queries with coherent multi-turn responses.',
        impact: 'Improved internal knowledge accessibility and reduced manual query handling.',
        skillsUsed: ['Prompt Engineering', 'Conversation Memory', 'FastAPI Inference APIs'],
        image:
            'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        technologies: ['Python', 'GPT APIs', 'FastAPI', 'Docker'],
        live: null,
        featured: true,
    },
    {
        id: 2,
        title: 'Transaction Anomaly Detection System',
        description:
            'Developed an ML pipeline for anomaly detection in financial transactions with feature engineering and model evaluation workflows.',
        impact: 'Enabled earlier anomaly detection for transaction risk analysis scenarios.',
        skillsUsed: ['Feature Engineering', 'Model Evaluation', 'Cloud Model Deployment'],
        image:
            'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=400&fit=crop',
        technologies: ['Python', 'PyTorch', 'Scikit-learn', 'AWS SageMaker'],
        live: null,
        featured: true,
    },
    {
        id: 3,
        title: 'Document Intelligence Pipeline',
        description:
            'Built OCR-based document processing pipeline to extract and structure information from scanned financial documents.',
        impact: 'Reduced manual data extraction effort and improved document processing consistency.',
        skillsUsed: ['OCR Pipelines', 'Entity Extraction', 'Search Indexing'],
        image:
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
        technologies: ['Python', 'OCR', 'NLP', 'Elasticsearch'],
        live: null,
        featured: true,
    },
    {
        id: 4,
        title: 'Real-time Inference Service',
        description:
            'Designed and deployed inference endpoints for enterprise integration using containerized model services.',
        impact: 'Supported near real-time model predictions for internal business teams.',
        skillsUsed: ['FastAPI', 'Docker', 'Kubernetes'],
        technologies: ['FastAPI', 'Docker', 'Kubernetes', 'REST APIs'],
        featured: false,
    },
    {
        id: 5,
        title: 'NLP Credit Risk Modeling',
        description:
            'Built NLP-assisted analysis flows for credit-risk and transaction analytics use cases.',
        impact: 'Improved structured decision support with language-driven insight extraction.',
        skillsUsed: ['Transformer Fine-tuning', 'Sentiment Analysis', 'Text Classification'],
        technologies: ['Python', 'TensorFlow', 'NLP', 'SQL'],
        live: null,
        featured: false,
    },
    {
        id: 6,
        title: 'ML CI/CD Automation',
        description:
            'Implemented automated build, test, and deployment workflows for model iteration and release.',
        impact: 'Improved reliability and repeatability of model delivery workflows.',
        skillsUsed: ['CI/CD Pipelines', 'Model Versioning', 'Deployment Automation'],
        technologies: ['CI/CD', 'MLflow', 'Docker', 'AWS'],
        featured: false,
    },
]

const comprehensiveSkillMap = [
    {
        category: 'Programming',
        skills: ['Python', 'SQL', 'Java', 'Shell Scripting'],
    },
    {
        category: 'Data & ML Libraries',
        skills: ['NumPy', 'Pandas', 'Scikit-learn'],
    },
    {
        category: 'Machine Learning & AI',
        skills: ['Machine Learning', 'Deep Learning', 'Feature Engineering', 'Model Training', 'Hyperparameter Tuning'],
    },
    {
        category: 'Generative AI',
        skills: ['LLMs', 'Prompt Engineering', 'LLM Fine-Tuning', 'GPT-4 / OpenAI APIs', 'HuggingFace Transformers', 'GANs'],
    },
    {
        category: 'Natural Language Processing',
        skills: ['Text Classification', 'Text Generation', 'Sentiment Analysis', 'Named Entity Recognition', 'Information Extraction'],
    },
    {
        category: 'Computer Vision',
        skills: ['OCR', 'Image Classification', 'Anomaly Detection', 'Image Generation'],
    },
    {
        category: 'Cloud & MLOps',
        skills: ['AWS SageMaker', 'AWS Lambda', 'AWS S3', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Model Deployment', 'Model Monitoring', 'MLflow'],
    },
    {
        category: 'Databases',
        skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Elasticsearch'],
    },
    {
        category: 'APIs & Backend',
        skills: ['RESTful APIs', 'FastAPI', 'Microservices'],
    },
    {
        category: 'Visualization',
        skills: ['Tableau', 'Power BI', 'Matplotlib', 'Seaborn'],
    },
    {
        category: 'Automation & Integration',
        skills: ['RPA', 'Workflow Automation'],
    },
    {
        category: 'Responsible AI',
        skills: ['Model Explainability', 'Ethical AI', 'Data Privacy', 'GDPR', 'CCPA'],
    },
]

function FeaturedProject({ project, index, hoveredId, setHoveredId }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false })
    const isActive = hoveredId === project.id
    const isDimmed = hoveredId !== null && hoveredId !== project.id

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`h-full transition-opacity duration-200 ${isDimmed ? 'opacity-65' : 'opacity-100'}`}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
        >
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.8 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{
                    y: -16,
                    scale: 1.03,
                    boxShadow: '0 20px 45px rgba(34, 211, 238, 0.30)',
                }}
                className="h-full"
            >
                <div className={`group relative bg-slate-800/30 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all h-full flex flex-col ${
                    isActive
                        ? 'border-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.28)]'
                        : 'border-slate-700 hover:border-cyan-400/70 hover:shadow-[0_0_24px_rgba(34,211,238,0.20)]'
                }`}>
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/8 via-transparent to-indigo-500/10" />

                    <div className="h-52 overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-transform duration-500"
                        />
                    </div>

                    <div className="p-5 flex-1 flex flex-col relative">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-slate-400 text-sm mb-4 min-h-[4.5rem]">
                            {project.description}
                        </p>

                        <p className="text-cyan-300/90 text-xs mb-3 leading-relaxed">
                            {project.impact}
                        </p>

                        <p className="text-slate-300 text-xs mb-4 leading-relaxed">
                            <span className="text-slate-400">Interesting skills used:</span> {project.skillsUsed.join(' | ')}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 4).map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-300 rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {project.live && (
                            <div className="flex gap-4 mt-auto">
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    <span className="text-sm">Live Demo</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

function SmallProject({ project, index, hoveredId, setHoveredId }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false })
    const isActive = hoveredId === project.id
    const isDimmed = hoveredId !== null && hoveredId !== project.id

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="min-h-60"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
        >
            <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.2 + index * 0.28, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{
                    y: -14,
                    scale: 1.03,
                    boxShadow: '0 18px 40px rgba(34, 211, 238, 0.26)',
                }}
                className={`group relative backdrop-blur-sm border rounded-xl p-6 transition-all h-full ${
                    isActive
                        ? 'bg-slate-800/60 border-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.24)]'
                        : 'bg-slate-800/30 border-slate-700 hover:border-cyan-400/70 hover:bg-slate-800/55 hover:shadow-[0_0_22px_rgba(34,211,238,0.16)]'
                } ${isDimmed ? 'opacity-65' : 'opacity-100'}`}
            >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/8 via-transparent to-indigo-500/10 rounded-xl" />
                <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                        <Folder className="w-10 h-10 text-indigo-400 group-hover:text-cyan-300 transition-colors" />

                        <div className="flex gap-3">
                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-indigo-400 transition-colors"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 min-h-[4.5rem]">
                        {project.description}
                    </p>

                    <p className="text-cyan-300/90 text-xs mb-3 leading-relaxed">
                        {project.impact}
                    </p>

                    <p className="text-slate-300 text-xs mb-4 leading-relaxed">
                        <span className="text-slate-400">Interesting skills used:</span> {project.skillsUsed.join(' | ')}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span key={tech} className="text-xs text-slate-500">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: '-100px' })
    const [hoveredId, setHoveredId] = useState(null)

    const featuredProjects = projects.filter((p) => p.featured)
    const otherProjects = projects.filter((p) => !p.featured)

    return (
        <section id="projects" className="scroll-mt-20 py-20 px-4 bg-slate-900/50">
            <div className="w-full" style={{ maxWidth: '1100px', margin: '0 auto' }} ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
                    </h2>

                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {featuredProjects.map((project, index) => (
                        <FeaturedProject
                            key={project.id}
                            project={project}
                            index={index}
                            hoveredId={hoveredId}
                            setHoveredId={setHoveredId}
                        />
                    ))}
                </div>

                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-2xl font-semibold text-white text-center mb-8"
                >
                    Other Noteworthy Projects
                </motion.h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherProjects.map((project, index) => (
                        <SmallProject
                            key={project.id}
                            project={project}
                            index={index}
                            hoveredId={hoveredId}
                            setHoveredId={setHoveredId}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.75 }}
                    className="mt-12 rounded-2xl border border-slate-700 bg-slate-900/35 p-6"
                >
                    <h3 className="text-xl font-semibold text-white mb-2 text-center">
                        Skills Applied Across Projects
                    </h3>
                    <p className="text-slate-400 text-sm text-center mb-6">
                        Comprehensive stack from my resume, mapped to project and delivery workflows.
                    </p>

                    <div className="space-y-4">
                        {comprehensiveSkillMap.map((group) => (
                            <div key={group.category}>
                                <h4 className="text-sm font-semibold text-cyan-300 mb-2 uppercase tracking-[0.14em]">
                                    {group.category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2.5 py-1 text-xs rounded-full border border-slate-600 bg-slate-800/60 text-slate-200"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
