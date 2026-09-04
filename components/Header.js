import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-lg font-semibold">Kamal Prajapati</a>
        </Link>
        <nav className="space-x-4 text-sm text-slate-600">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
