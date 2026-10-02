---
description: Review the current changes with the code-reviewer and test-engineer before you commit or open a pull request
argument-hint: [files, branch or PR to review; defaults to uncommitted changes]
---

Review target: $ARGUMENTS (if empty, use the uncommitted diff and the last commit).

Run in parallel:
- the **code-reviewer** agent on the target, for correctness and maintainability
- the **test-engineer** agent, to check whether the changed behavior is covered by tests and list the missing tests (do not write them yet)

Then give one combined report: blocking issues first, then suggestions, then missing tests. End with a one-line verdict: ready to merge, or what must change first.
