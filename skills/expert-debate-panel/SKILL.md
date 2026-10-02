---
name: expert-debate-panel
description: Convene a panel of 4-5 domain experts for a structured debate (Opening, Cross-examination, Synthesis) led by a neutral moderator. Use when the user wants to stress-test an idea, weigh a tradeoff, get multi-perspective feedback on a decision, poke holes in a proposal, or hear opposing expert viewpoints. Triggers include "convene a panel", "expert debate", "poke holes in this idea", "debate this", "weigh X vs Y", "stress-test this proposal", "what would experts say about", "multiple perspectives on", "panel of experts", "devil's advocate", "critique my plan", "X vs Y tradeoff", or any request for structured multi-disciplinary critique.
---

# Expert Debate Panel

Convene a panel of 4-5 domain experts to conduct a structured debate on any topic. The debate follows a three-act format (Opening, Cross-examination, Synthesis), guided by a neutral moderator. Experts are identified by role labels (no fictional names). Designed for idea critique and tradeoff analysis above all else.

## When to use this skill

Use whenever the user wants:

- An idea or proposal stress-tested from multiple disciplinary angles
- A tradeoff analyzed (X vs Y, build vs buy, ship vs delay, hire vs outsource)
- Multi-perspective feedback on a decision or strategy
- Devil's advocate critique with real structured disagreement rather than a bullet list of pros and cons

Do not use this skill for simple factual questions, single-domain technical lookups, or when the user clearly just wants one expert opinion.

## Workflow

### Step 1: Intake (always run)

Before convening the panel, call AskUserQuestion with up to 4 questions. Skip any question the user has already answered in their prompt. The four intake questions are:

1. Topic framing: "Is this a decision to make, an idea to critique, a tradeoff to weigh, or open exploration?"
2. Stakes and constraints: "What's the decision horizon, who's affected, and what constraints matter (budget, timeline, reversibility)?"
3. Output formats: "Where do you want the debate delivered: inline chat, a document, an interactive HTML page, or a combination?"
4. Panel preview: After you've drafted the 4-5 expert roles (Step 2), show them and ask the user to confirm or swap any before the debate starts.

Use one AskUserQuestion call with multiple questions where possible. Keep options crisp. If the question tool is not available, ask the same questions in one short message.

### Step 2: Assemble the panel

Pick 4-5 expert roles that maximize diverse, relevant disciplinary coverage on the topic. Use role labels only (no names). Examples of role labels to draw from:

- The Economist, The Behavioral Scientist, The Ethicist, The Operator, The Skeptic, The Optimist
- The Strategist, The Engineer, The Designer, The Lawyer, The Historian, The Anthropologist
- The Investor, The Founder, The Customer Advocate, The Regulator, The Futurist, The Stoic
- The Risk Manager, The Marketer, The Data Scientist, The Policy Expert, The Practitioner

For each role, write a 2-sentence stance bio describing their disciplinary lens and the worldview they bring to this specific topic.

Critical rule: aim for productive disagreement, not parallel agreement. Pick roles whose priors actually conflict on the topic. If three of your four experts would all reach the same conclusion, swap one.

After drafting the panel, present it to the user for confirmation (part of Step 1's intake question 4).

### Step 3: Pick the tone

Adapt the debate's tone to the topic:

- Technical or operational decision: pragmatic, operator-style, focus on what to do Monday morning
- Ethical, policy, or societal question: academic, careful qualifications, citations-aware
- Business strategy, creative, or contested topic: sharp and punchy, real disagreement, minimal hedging
- When uncertain: default to sharp and punchy with rigor underneath

State the chosen tone in one line at the top of the debate so the user knows the register.

### Step 4: Run the debate

A neutral moderator persona frames each act and surfaces tensions. The moderator does not take positions during the debate; they only structure and synthesize.

**Act 1: Opening Statements** (each expert, 3 to 5 sentences each)

Each expert states their position, identifies what they think matters most about the topic, and presents the strongest version of their view. No hedging in openings. Each expert takes a clear stance.

**Act 2: Cross-examination** (3 to 5 exchanges, moderator-prompted)

The moderator identifies the sharpest disagreements between experts and prompts them to directly challenge each other's specific claims. Each rebuttal must:

1. Name the expert being responded to
2. Quote or paraphrase the specific claim being contested
3. Steel-man the opposing view in one sentence before attacking it
4. Offer counter-evidence, a counter-frame, or a better mechanism
5. Concede when an opposing point genuinely lands (concessions are signal, not weakness)

Push for concrete examples, named mechanisms, and numbers where possible. Vague disagreement is a failure mode.

**Act 3: Synthesis** (moderator-led)

The moderator produces a synthesis containing four sections:

1. Points of consensus across the panel
2. Genuine unresolved disagreement (do not paper over it; name who disagrees and why)
3. The 2-3 sharpest questions the user should sit with before deciding
4. A recommended decision frame (a way to think about the choice), not a recommendation itself

The user gets a frame, not a verdict. They decide.

### Step 5: Deliver in the requested formats

**Inline chat output**

Format as a readable transcript. Use clear act headers, bold role labels, and short paragraphs. Keep it scannable.

**Document output**

Use `assets/debate_template.md` as the starting structure. Include a cover section with topic, panel roster (role + 2-sentence bio), date, and chosen tone. If a Word or PDF skill is installed, use it to produce that format; otherwise save the debate as a Markdown file. Tell the user where the file is.

**Interactive HTML page**

Start from `assets/artifact_template.html` and write one self-contained HTML file (no external scripts or fonts). Where the app offers an artifact or file-preview tool, open the page with it; otherwise save the file and tell the user where it is. The page should include:

- Header with the topic and chosen tone
- Expandable cards for each expert (click to reveal full bio and that expert's full positions across acts)
- Tabbed view for Act 1, Act 2, Act 3
- A "Key Tensions" sidebar listing the 2-3 sharpest unresolved disagreements with one-line summaries

## Best practices

1. Make them disagree. A panel where all experts mostly agree is a failure. Pick conflicting priors and let the disagreement surface.
2. Steel-man, then attack. Every rebuttal in cross-examination must state the opposing view at its strongest before contesting it.
3. No fence-sitting in opening statements. Hedging belongs in synthesis, not opening.
4. Concrete beats abstract. Push experts to cite examples, name mechanisms, give numbers.
5. The user gets a decision frame, not a verdict. Synthesis ends with how to think about the choice, not what to do.
6. Role labels only. No fictional names, no celebrity stand-ins, no real-person impersonations.

## Example trigger phrases

- "Convene a panel of experts to critique my pricing model"
- "Poke holes in this idea: launch in Europe before product-market fit"
- "Weigh hiring one senior engineer vs two juniors"
- "Debate this: we should switch from Postgres to DynamoDB"
- "Stress-test my Q3 strategy from multiple expert angles"
- "Get me an expert debate on whether AI agents will replace SaaS"
- "Devil's advocate this proposal across disciplines"

## Output format reference

See `assets/debate_template.md` for the document structure and `assets/artifact_template.html` for the HTML page starting point.
