export default function Footer(){
  return (
    <footer className="border-t mt-20">
      <div className="max-w-4xl mx-auto px-6 py-6 text-sm text-slate-600">
        © {new Date().getFullYear()} Kamal Prajapati · Built with Next.js
      </div>
    </footer>
  )
}
