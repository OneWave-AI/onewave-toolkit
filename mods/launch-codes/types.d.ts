export type Phase = 'code' | 'armed' | 'launched' | 'aborted'

export type Alert = {
  command: string
  reason: string
  code: string
  startedAt: number
  expiresAt: number
  phase: Phase
  isDemo: boolean
}
