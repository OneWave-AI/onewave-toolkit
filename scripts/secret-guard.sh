#!/bin/sh
# Secret guard: a PreToolUse hook that stops Claude from printing a secret to the
# transcript or writing a literal credential into a file.
#
# Reads the hook's JSON event on stdin. Exits 0 to allow the tool call, or 2 with a
# reason on stderr to block it. Plain POSIX sh and grep: no network, no files written.

input=$(cat)

block() {
  echo "secret-guard: $1" >&2
  exit 2
}

# 1. Literal credentials in a command, a file being written, or an edit.
#    Known key formats only, so ordinary code and placeholders pass.
KEYS='sk-ant-[A-Za-z0-9_-]{20,}|sk-(proj-)?[A-Za-z0-9]{32,}|sk_live_[A-Za-z0-9]{24,}|rk_live_[A-Za-z0-9]{24,}|ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{40,}|gho_[A-Za-z0-9]{36}|glpat-[A-Za-z0-9_-]{20}|xox[abprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|-----BEGIN ([A-Z]+ )?PRIVATE KEY-----'
if printf '%s' "$input" | grep -Eq "$KEYS"; then
  block "this contains what looks like a real API key or private key. Keep secrets in environment variables or a secrets manager and reference them by name instead of pasting the value."
fi

# The rest only applies to shell commands.
printf '%s' "$input" | grep -Eq '"tool_name" *: *"Bash"' || exit 0

SECRET_VAR='[A-Z0-9_]*(TOKEN|SECRET|PASSWORD|PASSWD|API_KEY|APIKEY|PRIVATE_KEY|ACCESS_KEY|CREDENTIALS)[A-Z0-9_]*'

# 2. echo/printf of a secret variable that would land on screen or in a file.
#    Piping it into another program (echo "$T" | docker login --password-stdin) is allowed.
if printf '%s' "$input" | grep -Eq "(echo|printf)[^|;&]*\\\$\\{?$SECRET_VAR"; then
  if ! printf '%s' "$input" | grep -Eq "(echo|printf)[^|;&]*\\\$\\{?$SECRET_VAR[^|;&]*\\|"; then
    block "this would print a secret environment variable to the transcript. To check that it is set, use [ -n \"\$NAME\" ] instead."
  fi
fi

# 3. printenv of a secret variable, or dumping the whole environment.
if printf '%s' "$input" | grep -Eq "printenv +$SECRET_VAR"; then
  block "this would print a secret environment variable to the transcript."
fi
if printf '%s' "$input" | grep -Eq '"command" *: *"(env|printenv|export -p|set)( *[|>][^"]*)?"'; then
  block "dumping the whole environment would print every secret in it. Print only the specific non-secret variable you need."
fi

exit 0
