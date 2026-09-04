import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-8"
    >
      <div className="flex items-center gap-6">
        <img src="https://api.dicebear.com/6.x/identicon/svg?seed=Kamal" alt="avatar" className="w-24 h-24 rounded-full shadow" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Kamal Prajapati</h1>
          <p className="text-slate-600 mt-1">Full-stack engineer • React, Next.js & Node.js</p>
          <div className="mt-4">
            <a href="#projects" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700">See my work</a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
