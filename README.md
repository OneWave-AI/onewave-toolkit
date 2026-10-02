# OneWave AI Toolkit

A coding, marketing and sales team in one Claude plugin: **12 specialist agents, 15 skills, 4 team commands and a secret guard** that stops Claude from leaking your API keys.

Install it once and you can plan and review code, write and test it, build a launch kit, research a prospect and draft the outreach, all from the same session.

## Install

In Claude Code:

```
/plugin marketplace add OneWave-AI/onewave-toolkit
/plugin install onewave-toolkit@onewave-toolkit
```

Then try `/onewave-toolkit:team plan and build a pricing page`, or just describe a task and Claude will pick the right agent.

## The team: 12 agents

| Discipline | Agent | What it does | Can change files? |
| --- | --- | --- | --- |
| Coding | **architect** | Maps the codebase, proposes an approach, breaks work into ordered steps and flags risks | No, read-only |
| Coding | **code-reviewer** | Reviews a diff or files for correctness, readability and maintainability, ranked by severity | No, read-only |
| Coding | **test-engineer** | Writes, fixes and extends tests in your existing framework, and runs them | Yes |
| Coding | **debugger** | Reproduces a failure, proves the root cause and applies the smallest fix | Yes |
| Marketing | **content-strategist** | Plans topics, formats, channels and a calendar tied to a business goal | Writes plan files |
| Marketing | **seo-specialist** | Audits pages for search intent, titles, meta descriptions, headings, links and technical issues | No, read-only |
| Marketing | **copywriter** | Landing pages, headlines, ads and emails that are specific and on-brand | Writes copy files |
| Marketing | **social-media-manager** | Turns any source into platform-native posts for LinkedIn, X and others | Writes post files |
| Sales | **prospect-researcher** | Builds a public-source brief on a company or contact, with every fact cited | Writes brief files |
| Sales | **outreach-writer** | Drafts personalized cold emails and follow-up sequences. It drafts, never sends | Writes draft files |
| Sales | **deal-coach** | Finds qualification gaps and risks in a deal and plans the next move | Writes notes |
| Sales | **proposal-writer** | Turns call notes into a proposal or recap with scope, timeline and next steps | Writes proposal files |

Agents that research use web search. Agents that work on code use your normal Claude Code permissions, so you still approve anything your settings ask you to approve.

## 15 skills

**Coding**
- `agent-army`: run a 2-layer army of parallel agents on big refactors, migrations, audits and bulk generation
- `scout`: tells you which skill or agent fits the task you are on
- `code-review-pro`: a deep review covering security (OWASP Top 10), correctness, performance and maintainability
- `test-coverage-improver`: finds untested code and writes the missing tests
- `plan-in-files`: keeps a multi-step plan in files so long work survives a context reset
- `session-handoff`: writes a clean handoff when a session ends or work passes to someone else
- `before-you-build`: finds the biggest risk in a build before you start and the smallest way to test it

**Marketing**
- `landing-page-copywriter`: full landing page copy using proven frameworks such as PAS, AIDA and StoryBrand
- `seo-optimizer`: keyword analysis, readability scoring, meta descriptions and competitor comparison
- `content-repurposer`: turns any piece into 8+ formats, from social posts and an email series to slides, a video script and a one-pager
- `linkedin-post-optimizer`: hooks that survive truncation, readable line breaks and a hashtag strategy for LinkedIn

**Sales**
- `cold-email-sequence-generator`: 7 to 14 email sequences with A/B subject lines and follow-up timing
- `prospect-research-compiler`: prospect intelligence from news, company websites, social profiles and financial data
- `sales-call-prep-assistant`: pre-call briefs with company news, stakeholder backgrounds and discovery questions
- `objection-pattern-detector`: mines lost-deal notes for recurring objections and builds a response playbook from won deals

## 4 commands

| Command | What it runs |
| --- | --- |
| `/onewave-toolkit:team <task>` | Picks the smallest set of agents for the task, runs independent ones in parallel and combines the results |
| `/onewave-toolkit:review [target]` | code-reviewer and test-engineer on your current changes, with a merge verdict |
| `/onewave-toolkit:launch <product>` | content-strategist, then copywriter, seo-specialist and social-media-manager in parallel, combined into one launch kit |
| `/onewave-toolkit:prospect <company>` | prospect-researcher, then outreach-writer, then deal-coach: a cited brief, drafted emails and call prep |

## Secret guard (hook)

The toolkit includes one hook that runs before Claude uses Bash, Write or Edit. It blocks three things:

1. **A real API key or private key** in a command or in a file Claude is about to write: Anthropic, OpenAI, Stripe, GitHub, GitLab, Slack, AWS and Google key formats, plus PEM private keys.
2. **Printing a secret variable**, such as `echo $OPENAI_API_KEY` or `printenv GITHUB_TOKEN`, which would put the value in your transcript. Piping it into a program (`echo "$T" | docker login --password-stdin`) and presence checks (`[ -n "$TOKEN" ]`) are allowed.
3. **Dumping the whole environment** with a bare `env` or `printenv`.

When it blocks something, Claude sees the reason and takes a safer route. The hook is [one readable shell script](scripts/secret-guard.sh) with no dependencies. It reads only the tool call it is checking, writes nothing, and makes no network requests. Its test suite runs with `sh tests/secret-guard.test.sh`.

## Privacy and data

- The skills, agents and commands are instructions only. They ship no code.
- The only code is the secret guard hook described above. It never sends data anywhere.
- Research agents use web search through your Claude session. Nothing else leaves your machine except your conversation with Claude itself.
- The toolkit stores no data and collects no analytics.
- Sales agents work from public sources and never send messages for you: every email and post is a draft you review.

## Where it works

| Surface | Skills | Agents | Commands | Secret guard hook |
| --- | --- | --- | --- | --- |
| Claude Code (terminal, IDE and the Desktop app's Code tab) | Yes | Yes | Yes | Yes |
| Cowork | Yes | Yes | Yes, as `/onewave-toolkit:<command>` | Yes |
| Claude chat (web, desktop, mobile) | Yes | No | Claude applies them like skills | No |

## Support

- Questions: [onewave-ai.com/contact](https://www.onewave-ai.com/contact)
- Bugs and ideas: [GitHub issues](https://github.com/OneWave-AI/onewave-toolkit/issues)
- Security issues: see [SECURITY.md](SECURITY.md)

Built by [OneWave AI](https://www.onewave-ai.com), an Anthropic Partner Network firm that trains teams on Claude and builds with it. MIT licensed.
