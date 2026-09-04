import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.a
      href={project.link}
      className="block p-5 border rounded-lg hover:shadow-lg transition-shadow bg-white"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
    >
      <h3 className="text-lg font-medium">{project.title}</h3>
      <p className="text-slate-600 mt-2 text-sm">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span key={t} className="text-xs bg-slate-100 px-2 py-1 rounded">{t}</span>
        ))}
      </div>
    </motion.a>
  )
}
