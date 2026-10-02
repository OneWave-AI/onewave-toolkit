// Generated: the toolkit's state contract. Each mod's value types live in its namespace.

// ---- burn-meter ----

export type BurnMeterBurn = {
  /** What the odometer shows right now (tweens toward `target`). */
  shown: number
  /** The session's real cost, or the demo ramp while a demo runs. */
  target: number
  isDemo: boolean
  lifetime: number
  /** Subscription windows, 0..100, or -1 with no reading (API key, before the first response). */
  session: number
  week: number
  /** When each window resets, ISO 8601, or '' unknown. */
  sessionResets: string
  weekResets: string
}

/** One model's tokens this session: input counts cached reads and writes too. */
export type BurnMeterModelTally = { input: number; output: number; turns: number }

// ---- launch-codes ----

export type LaunchCodesPhase = 'code' | 'armed' | 'launched' | 'aborted'

export type LaunchCodesAlert = {
  command: string
  reason: string
  code: string
  startedAt: number
  expiresAt: number
  phase: LaunchCodesPhase
  isDemo: boolean
}

// ---- session-wrapped ----

export type SessionWrappedStats = {
  startedAt: number
  tools: Record<string, number>
  files: Record<string, number>
  bash: number
  tests: { pass: number; fail: number; comebacks: number; last: 'pass' | 'fail' | null }
  turns: number
  longestTurnMs: number
  usd: number
  /** Skills run this session (Skill tool calls), by name. */
  skills: Record<string, number>
  /** MCP connectors called this session, by server. */
  connectors: Record<string, number>
  /** The main loop's model when the reveal froze. */
  model: string
  /** Plan rate-limit windows when the reveal froze: percent used (-1 unknown) and ISO reset times. */
  limits?: SessionWrappedLimits
}

export type SessionWrappedLimits = { week: number; session: number; weekResets: string; sessionResets: string }

/** One window of `scripts/usage.py`'s rollup: [name, count] pairs, most first. */
export type SessionWrappedUsageWindow = {
  sessions: number
  prompts: number
  tokens: number
  out: number
  activeDays: number
  models: [string, number][]
  tools: [string, number][]
  toolKinds: number
  skills: [string, number][]
  skillKinds: number
  connectors: [string, number][]
  connectorKinds: number
}

export type SessionWrappedUsage = { week: SessionWrappedUsageWindow; month: SessionWrappedUsageWindow; at: number }

export type SessionWrappedReveal = {
  /** How many cards are showing. */
  shown: number
  isDemo: boolean
  /** The PNG written for this reveal, once it is on disk. */
  savedPath: string | null
  generation: number
  /** Frozen stats the reveal draws (demo or a snapshot of the live ones). */
  stats: SessionWrappedStats | null
  /** Week and month usage from the transcripts, or null when the scan failed. */
  usage: SessionWrappedUsage | null
  at: number
}

// ---- boss-fight ----

/** One test run as read from a runner's output. */
export type BossFightRunResult = { runner: string; failed: number; passed: number }

/** The fight on screen. `phase` drives the animation; times are epoch ms. */
export type BossFightFight = {
  /** The boss's name and look, picked when it spawns. */
  boss: string
  kind: number
  maxHp: number
  hp: number
  runner: string
  phase: 'none' | 'spawn' | 'idle' | 'hit' | 'heal' | 'ko'
  /** When the current phase began. */
  phaseAt: number
  /** The last change: damage dealt (positive) or healed (negative). */
  delta: number
  runs: number
  loot: string | null
  /** A demo fight, not a real one: kills are not counted. */
  isDemo: boolean
}

// ---- code-pet ----

export type CodePetMood = 'idle' | 'happy' | 'eating' | 'sick' | 'panic' | 'sleep' | 'sad' | 'levelup'

export type CodePetStage = 'egg' | 'blob' | 'critter' | 'crowned'

/** What lives across sessions in $.store. Times are epoch ms. */
export type CodePetPet = {
  name: string
  xp: number
  /** 0 starving, 100 full. */
  hunger: number
  /** 0 to 100. */
  hp: number
  bornAt: number
  lastFedAt: number
  /** When decay was last applied. */
  lastTickAt: number
  meals: number
}

/** A scripted look the demo forces, over the real pet. */
export type CodePetDemoView = { mood: CodePetMood; stage: CodePetStage; caption: string }

// ---- agent-narrator ----

export type AgentNarratorStep = {
  id: string
  text: string
  note: string | null
  status: 'running' | 'done' | 'failed'
  at: number
  minutes: number
}

export type AgentNarratorRun = {
  isRunning: boolean
  startedAt: number | null
  endedAt: number | null
  steps: number
  savedMinutes: number
}

// ---- agent-race ----

export type AgentRaceLane = {
  id: string
  name: string
  race: string
  tools: number
  edits: number
  testsPassed: number
  testsFailed: number
  costUsd: number
  startedAt: number
  finishedAt: number | null
  updatedAt: number
}

export type AgentRaceRaceView = {
  race: string | null
  isDemo: boolean
  lanes: AgentRaceLane[]
  winner: string | null
}

// ---- inner-monologue ----

export type InnerMonologueThought = { id: number; text: string; at: number }

// ---- inbox-alerts ----

export type InboxAlertsAlertSource = 'gmail' | 'slack'

export type InboxAlertsAlert = {
  id: string
  source: InboxAlertsAlertSource
  from: string
  where: string
  text: string
  url?: string
  at: string
}

export type InboxAlertsCalEvent = {
  id: string
  title: string
  start: string
  end: string
  /** HH:MM as the calendar wrote it (its own time zone). */
  clock: string
  endClock: string
  join?: string
  url?: string
  needsRsvp: boolean
  people: number
}

export type InboxAlertsTab = 'mail' | 'slack' | 'calendar'

export type InboxAlertsPollStatus = { lastAt: string | null; error: string | null }

declare module 'claude-code' {
  interface PluginState {
    'onewave-toolkit': { burn_burn: BurnMeterBurn; burn_isHidden: boolean; burn_fired: number[]; burn_turns: number[]; burn_turnStart: number; burn_models: Record<string, BurnMeterModelTally>; launch_alert: LaunchCodesAlert | null; wrapped_stats: SessionWrappedStats; wrapped_reveal: SessionWrappedReveal; boss_fight: BossFightFight; boss_kills: number; pet_pet: CodePetPet | null; pet_mood: CodePetMood; pet_demo: CodePetDemoView | null; narrator_feed: AgentNarratorStep[]; narrator_run: AgentNarratorRun; narrator_isSmart: boolean; narrator_isDemo: boolean; race_view: AgentRaceRaceView; monologue_thoughts: InnerMonologueThought[]; monologue_isThinking: boolean; inbox_alerts: InboxAlertsAlert[]; inbox_events: InboxAlertsCalEvent[]; inbox_poll: InboxAlertsPollStatus; inbox_tab: InboxAlertsTab }
  }
}
