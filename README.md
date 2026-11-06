# Trajectory — MIT Solve web demonstration

This is a mobile-friendly, deployable Next.js prototype for the Trajectory mathematics learning-diagnostics concept.

## Deploy quickly

1. Create a GitHub repository and upload the contents of this folder (not the ZIP itself).
2. At https://vercel.com/new, import the repository.
3. Framework preset: Next.js. Root directory: repository root.
4. Click Deploy. No environment variables or API keys are required.

## Local development

`npm install`
`npm run dev`

## Scope and limitations

- Deterministic checks for simple linear equations (`2x+5=17`) and arithmetic (`8 + 3 * 4`).
- Severity estimate is heuristic, not validated; reasoning text is collected but not interpreted.
- Practice examples and in-memory session history; history resets on refresh.
- No Nebius API calls, backend, authentication, RevenueCat, or persistent storage.
- This is a demo, not a production learning tool. Do not claim AI reasoning is operational.

## Demo video script (45–60 seconds)

“Trajectory is designed to help students understand not only whether an answer is wrong, but where improvement can begin. Here is the functional web prototype. I can enter a mathematical problem and a student answer. For this arithmetic example, the student answers 44 instead of 20. Trajectory checks the result, shows a severity estimate, and gives a hint about order of operations. The Practice tab provides sample questions, while Progress summarizes checks from this session. This is an early deterministic prototype. The next development stage is Nebius-powered reasoning-path diagnostics with independent mathematical verification, adaptive practice, and persistent learning trends.”
