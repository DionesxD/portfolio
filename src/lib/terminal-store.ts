import { create } from 'zustand'

export type SectionId = 'about' | 'skills' | 'experience' | 'dev' | 'infra' | 'certs' | 'contact'

const ALL_SECTIONS: SectionId[] = ['about', 'skills', 'experience', 'dev', 'infra', 'certs', 'contact']

interface TerminalState {
  revealedSections: Set<SectionId>
  revealSection: (id: SectionId) => void
  revealAll: () => void
  hasAnyRevealed: () => boolean
  isRevealed: (id: SectionId) => boolean
}

export const useTerminalStore = create<TerminalState>((set, get) => ({
  revealedSections: new Set<SectionId>(),

  revealSection: (id: SectionId) =>
    set((state) => {
      const next = new Set(state.revealedSections)
      next.add(id)
      return { revealedSections: next }
    }),

  revealAll: () =>
    set({ revealedSections: new Set<SectionId>(ALL_SECTIONS) }),

  hasAnyRevealed: () => get().revealedSections.size > 0,

  isRevealed: (id: SectionId) => get().revealedSections.has(id),
}))