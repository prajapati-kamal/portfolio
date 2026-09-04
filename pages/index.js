import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'

const projects = [
  {
    title: 'Project Alpha',
    description: 'A short description of Project Alpha. Built with Next.js and Tailwind CSS.',
    tech: ['Next.js', 'Tailwind'],
    link: '#'
  },
  {
    title: 'Project Beta',
    description: 'A short description of Project Beta. API, scraping, automation.',
    tech: ['Node.js', 'Express'],
    link: '#'
  },
  {
    title: 'Project Gamma',
    description: 'A short description of Project Gamma. Data visualisation and charts.',
    tech: ['React', 'D3'],
    link: '#'
  }
]

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kamal Prajapati — Portfolio</title>
        <meta name="description" content="Portfolio — Kamal Prajapati. Full-stack engineer. React, Next.js, Node.js." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Hero />

        <section id="about" className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-slate-700">I’m Kamal Prajapati — a professional full-stack engineer focused on building accessible, performant web applications. I work with React, Next.js, and Node.js to deliver polished user experiences.</p>
        </section>

        <section id="projects" className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Selected Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>

        <section id="skills" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {['JavaScript','TypeScript','Next.js','React','Node.js','Tailwind CSS','Docker'].map(s => (
              <span key={s} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-sm">{s}</span>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-12 mb-20">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-slate-700">Email: <a className="text-indigo-600" href="mailto:kamal@example.com">kamal@example.com</a></p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
