import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as d3 from 'd3'
import SkillGlobe from './SkillGlobe'
import InteractiveCard from './InteractiveCard'

const capabilityLanes = [
    {
        title: 'Generative AI Systems',
        outcome: 'Designing LLM workflows that are production-focused, measurable, and fast to iterate.',
        tools: ['Prompt Engineering', 'RAG', 'LangChain', 'Model Routing'],
        accent: 'from-indigo-500/30 to-cyan-500/20',
    },
    {
        title: 'ML Product Engineering',
        outcome: 'Building model-backed features end-to-end from experimentation through deployment.',
        tools: ['Python', 'FastAPI', 'Vector DBs', 'Evaluation Loops'],
        accent: 'from-cyan-500/30 to-blue-500/20',
    },
    {
        title: 'Cloud & MLOps Execution',
        outcome: 'Shipping scalable services with clean APIs, monitoring, and cost-aware infrastructure.',
        tools: ['AWS', 'Docker', 'CI/CD', 'Observability'],
        accent: 'from-rose-500/30 to-orange-500/20',
    },
]

const deliverySignals = [
    { label: 'LLM + NLP Focus', value: 'Primary Domain' },
    { label: 'Production Mindset', value: 'High' },
    { label: 'Backend + AI Integration', value: 'Strong' },
    { label: 'System Design for AI', value: 'Advanced' },
]

const motionTokens = [
    'RAG',
    'Prompt Design',
    'LLM Ops',
    'Evaluation',
    'Embeddings',
    'Guardrails',
    'Inference',
    'Latency',
]

const radarData = [
    { axis: 'LLM Apps', value: 0.95 },
    { axis: 'Backend AI', value: 0.9 },
    { axis: 'Data/Embeddings', value: 0.86 },
    { axis: 'MLOps', value: 0.78 },
    { axis: 'Frontend Delivery', value: 0.8 },
    { axis: 'Research Velocity', value: 0.84 },
]

function RadarChart() {
    const svgRef = useRef(null)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: false })

    useEffect(() => {
        if (!isInView || !svgRef.current) return

        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove()

        const width = 320
        const height = 320
        const margin = 58
        const radius = Math.min(width, height) / 2 - margin

        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`)

        const angleSlice = (Math.PI * 2) / radarData.length
        const levels = 5
        const rScale = d3.scaleLinear().domain([0, 1]).range([0, radius])

        for (let level = 1; level <= levels; level++) {
            g.append('circle')
                .attr('r', radius * (level / levels))
                .attr('fill', 'none')
                .attr('stroke', '#334155')
                .attr('stroke-width', 1)
                .attr('opacity', 0.45)
        }

        radarData.forEach((d, i) => {
            const angle = angleSlice * i - Math.PI / 2

            g.append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', radius * Math.cos(angle))
                .attr('y2', radius * Math.sin(angle))
                .attr('stroke', '#334155')
                .attr('stroke-width', 1)

            g.append('text')
                .attr('x', (radius + 24) * Math.cos(angle))
                .attr('y', (radius + 24) * Math.sin(angle))
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('fill', '#94a3b8')
                .attr('font-size', '12px')
                .attr('font-weight', '500')
                .text(d.axis)
        })

        const lineGenerator = d3
            .lineRadial()
            .radius((d) => rScale(d.value))
            .angle((_, i) => i * angleSlice)
            .curve(d3.curveLinearClosed)

        const gradient = svg
            .append('defs')
            .append('linearGradient')
            .attr('id', 'skillsRadarGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '100%')

        gradient.append('stop').attr('offset', '0%').attr('stop-color', '#6366f1').attr('stop-opacity', 0.85)
        gradient.append('stop').attr('offset', '100%').attr('stop-color', '#06b6d4').attr('stop-opacity', 0.85)

        g.append('path')
            .datum(radarData)
            .attr('d', lineGenerator)
            .attr('fill', 'url(#skillsRadarGradient)')
            .attr('fill-opacity', 0.3)
            .attr('stroke', '#6366f1')
            .attr('stroke-width', 2)

        radarData.forEach((d, i) => {
            const angle = angleSlice * i - Math.PI / 2

            g.append('circle')
                .attr('cx', rScale(d.value) * Math.cos(angle))
                .attr('cy', rScale(d.value) * Math.sin(angle))
                .attr('r', 5)
                .attr('fill', '#6366f1')
                .attr('stroke', '#fff')
                .attr('stroke-width', 2)
        })
    }, [isInView])

    return (
        <div ref={containerRef} className="flex justify-center">
            <svg ref={svgRef} />
        </div>
    )
}

function CapabilityCard({ lane, index, isInView }) {
    const stackFromCenterX = [220, 0, -220]

    return (
        <motion.div
            initial={{ opacity: 0, x: stackFromCenterX[index], scale: 0.92 }}
            animate={
                isInView
                    ? { opacity: 1, x: [stackFromCenterX[index], stackFromCenterX[index], 0], scale: [0.92, 1, 1] }
                    : { opacity: 0, x: stackFromCenterX[index], scale: 0.92 }
            }
            transition={{
                duration: 1.25,
                delay: 0.4,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
            }}
            className="w-full"
        >
            <motion.div
                animate={isInView ? { y: [0, -5, 0] } : { y: 0 }}
                transition={{
                    duration: 4.2 + index * 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.3 + index * 0.15,
                }}
            >
                <InteractiveCard>
                    <article className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/35 p-6 backdrop-blur-sm">
                        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${lane.accent}`} />
                        <div className="relative">
                            <h3 className="text-xl font-semibold text-white mb-2">{lane.title}</h3>
                            <p className="text-slate-300 leading-relaxed mb-4">{lane.outcome}</p>
                            <div className="flex flex-wrap gap-2">
                                {lane.tools.map((tool) => (
                                    <span
                                        key={tool}
                                        className="rounded-full border border-slate-600 bg-slate-800/60 px-3 py-1 text-xs text-slate-200"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                </InteractiveCard>
            </motion.div>
        </motion.div>
    )
}

export default function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: '-120px' })

    return (
        <section id="skills" className="scroll-mt-20 py-24 px-4 bg-slate-900/45">
            <div className="w-full relative overflow-hidden" style={{ maxWidth: '1100px', margin: '0 auto' }} ref={ref}>
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -top-8 -left-10 w-52 h-52 rounded-full bg-cyan-500/10 blur-3xl"
                    animate={{ x: [0, 26, 0], y: [0, -18, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute top-30 -right-10 w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl"
                    animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-12 relative z-10"
                >
                    <p className="text-xs tracking-[0.35em] uppercase text-slate-400 mb-3">Capability Design</p>
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                        <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-500 bg-clip-text text-transparent">
                            Skills That Ship
                        </span>
                    </h2>
                    <div className="mt-4 flex justify-center w-full">
                        <p className="text-slate-400 max-w-2xl w-full text-center" style={{ textAlign: 'center' }}>
                            I focus on practical AI engineering: model intelligence, system reliability, and product impact.
                        </p>
                    </div>
                </motion.div>

                <div className="relative z-10 overflow-hidden mb-6 rounded-full border border-slate-700 bg-slate-900/45">
                    <motion.div
                        className="flex items-center gap-5 py-2 px-3"
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    >
                        {[...motionTokens, ...motionTokens].map((token, i) => (
                            <span
                                key={`${token}-${i}`}
                                className="text-xs uppercase tracking-[0.22em] text-slate-300 whitespace-nowrap"
                            >
                                {token}
                            </span>
                        ))}
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 items-start relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -120 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="rounded-2xl border border-slate-700 bg-slate-900/35 p-6 backdrop-blur-sm"
                    >
                        <h3 className="text-xl font-semibold text-white mb-2 text-center">Interactive 3D Skill Cloud</h3>
                        <p className="text-slate-400 text-sm text-center mb-6">
                            Drag to rotate | Scroll to explore
                        </p>
                        <div className="rounded-2xl border border-slate-700 bg-slate-900/35 overflow-hidden">
                            <SkillGlobe />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 120 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 120 }}
                        transition={{ duration: 0.8, delay: 0.28, ease: 'easeOut' }}
                        className="rounded-2xl border border-slate-700 bg-slate-900/35 p-6 backdrop-blur-sm"
                    >
                        <h3 className="text-xl font-semibold text-white mb-2 text-center">Capability Shape</h3>
                        <p className="text-slate-400 text-sm text-center mb-6">A quick view of where I create the most leverage.</p>
                        <RadarChart />
                    </motion.div>
                </div>

                <div className="mt-8 grid lg:grid-cols-3 gap-5 relative z-10 overflow-hidden">
                    {capabilityLanes.map((lane, index) => (
                        <CapabilityCard key={lane.title} lane={lane} index={index} isInView={isInView} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
                    className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/35 p-6 backdrop-blur-sm relative z-10"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Delivery Signals</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {deliverySignals.map((signal) => (
                            <div key={signal.label} className="flex items-center justify-between border-b border-slate-700/70 pb-2">
                                <span className="text-slate-300">{signal.label}</span>
                                <span className="text-cyan-300 text-sm font-medium">{signal.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
