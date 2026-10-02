# Security Policy

## Reporting a vulnerability

Please do not open a public issue for a security problem. Report it privately through GitHub's
[private vulnerability reporting](https://github.com/OneWave-AI/onewave-toolkit/security/advisories/new)
for this repository. We aim to reply within three business days.

Useful to include: the mod, the Claude Code version (`claude --version`), and the steps that
reproduce the problem.

## Scope

In scope: anything in this toolkit that leaks data, runs a command or makes a request the README
does not describe, or lets text from an email, Slack message, web page, or file steer Claude
into an action the user did not ask for.

Out of scope: Claude Code itself, and the third-party services you connect. Report those to their owners.

## Before you install any plugin

Plugin hooks run on your machine with your permissions. Before you install a plugin, from this repository or anywhere else, run `claude plugin validate <folder>` and read every script its hooks run. This toolkit's only script is [scripts/secret-guard.sh](scripts/secret-guard.sh).
