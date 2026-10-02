#!/bin/sh
# Tests for scripts/secret-guard.sh. Run: sh tests/secret-guard.test.sh
# Fake keys are assembled at runtime so no key-shaped string sits in this file.

cd "$(dirname "$0")/.." || exit 1
pass=0; fail=0

check() {
  want=$1; json=$2; label=$3
  printf '%s' "$json" | sh scripts/secret-guard.sh >/dev/null 2>&1
  got=$?
  if [ "$got" = "$want" ]; then pass=$((pass + 1)); echo "ok    $label"
  else fail=$((fail + 1)); echo "FAIL  $label (wanted $want, got $got)"; fi
}

D='$'
A40=$(printf 'a%.0s' 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40)
FAKE_ANTHROPIC="sk-ant-api03-$A40"
FAKE_AWS="AKIA$(printf 'X%.0s' 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16)"
PEM="-----BEGIN RSA PRIVATE""$(printf ' ')KEY-----"

# Blocked
check 2 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"echo ${D}OPENAI_API_KEY\"}}" "echo of a secret variable"
check 2 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"printf %s ${D}{STRIPE_SECRET_KEY} > k.txt\"}}" "printf of a secret into a file"
check 2 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"printenv GITHUB_TOKEN\"}}" "printenv of a secret"
check 2 '{"tool_name":"Bash","tool_input":{"command":"env"}}' "whole environment dump"
check 2 '{"tool_name":"Bash","tool_input":{"command":"printenv | sort"}}' "printenv dump piped"
check 2 "{\"tool_name\":\"Write\",\"tool_input\":{\"file_path\":\"a.ts\",\"content\":\"const k = '$FAKE_ANTHROPIC'\"}}" "Anthropic key written to a file"
check 2 "{\"tool_name\":\"Edit\",\"tool_input\":{\"new_string\":\"aws_key = $FAKE_AWS\"}}" "AWS key in an edit"
check 2 "{\"tool_name\":\"Write\",\"tool_input\":{\"content\":\"$PEM\"}}" "private key block"
check 2 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"curl -H 'x-api-key: $FAKE_ANTHROPIC' https://api.example.com\"}}" "literal key in a command"

# Allowed
check 0 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"echo ${D}DOCKER_TOKEN | docker login --password-stdin\"}}" "secret piped into a program"
check 0 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"[ -n \\\"${D}SUPABASE_TOKEN\\\" ] && echo set\"}}" "presence check"
check 0 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"echo ${D}{#API_KEY}\"}}" "length check"
check 0 '{"tool_name":"Bash","tool_input":{"command":"grep -r TOKEN src/"}}' "grep for the word TOKEN"
check 0 '{"tool_name":"Bash","tool_input":{"command":"npm test"}}' "ordinary command"
check 0 '{"tool_name":"Bash","tool_input":{"command":"env NODE_ENV=test npm test"}}' "env used as a prefix"
check 0 '{"tool_name":"Write","tool_input":{"file_path":"a.ts","content":"const key = process.env.ANTHROPIC_API_KEY"}}' "reading a key from the environment"
check 0 '{"tool_name":"Write","tool_input":{"content":"ANTHROPIC_API_KEY=sk-ant-your-key-here"}}' "placeholder in an example file"
check 0 '{"tool_name":"Read","tool_input":{"file_path":"README.md"}}' "other tools"

echo "$pass passed, $fail failed"
[ "$fail" = 0 ]
