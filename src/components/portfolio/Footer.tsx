'use client'

export default function Footer() {
  return (
    <footer id="footer" className="py-8 mt-auto">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#b97aff]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#6b5f80]/40">
          © {new Date().getFullYear()} Johnny Alejandro. Todos os direitos reservados.
        </p>
        <p className="text-xs text-[#6b5f80]/40">
          xD
        </p>
      </div>
    </footer>
  )
}