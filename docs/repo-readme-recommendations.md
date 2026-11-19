# README recommendations for the linked repositories

This is advice only. Nothing in the other repositories was changed. It is based on what each repository contains as of 2026-11-18.

Recruiters and engineers usually open the GitHub link right after a case study, so the README is the second page of the portfolio. Each README should match what the case study claims.

## Suggested structure

1. **Summary.** One or two sentences: what it is, who uses it, what makes it interesting.
2. **Screenshots.** Real ones only. A short GIF of the main flow is worth more than a paragraph.
3. **Architecture.** A small diagram plus three or four sentences on how the pieces fit.
4. **Features.** What works today.
5. **Tech stack.**
6. **My contributions.** Especially for team projects: what you personally built.
7. **Results and limitations.** Measured numbers with what they were measured on, then what does not work yet.
8. **Getting started.** The shortest path to running it.
9. **Testing.** The commands, and what the suites cover.

Keep "verified" and "planned" separate. A status table or two headings ("Working today", "Planned or not yet run live") is enough. Do not describe anything as live that has not been run against the real service.

## Per repository

### Jam3sl1u/NLP-Calendar (highest priority)

- The README is still the **Untitled UI starter template** ("This is an official Untitled UI starter kit for Next.js"). It says nothing about the project, which undercuts a case study that links straight to it.
- Replace it with the structure above. The material already exists in the repo: `dataset.jsonl` (the schema and example records), `evaluate.py` (exact-match scoring per field over `title`, `date`, `time`, `duration_minutes`, `location`, `recurrence`), `generate.py` (data generation), `notebooks/` (fine-tuning), and the `/api/flan` and `/api/claude` routes.
- Put the field-accuracy table in the README (recurrence 95.6%, time 93.8%, date 32.2%) with the sentence "exact match, 500 examples", and say plainly that date reasoning is the weak spot.
- State your own contribution to the 4-person team (this site currently says you helped build the evaluation harness).
- Note that the UI components come from the Untitled UI starter kit, so the template is credited rather than looking like unattributed code.

### Jam3sl1u/Chariot

- The README is detailed but reads as an internal build log. It leads with "Church Rides MVP" while the portfolio says "club rides scheduler", and it ends with a long auto-generated change history. Move the change history to `CHANGELOG.md` and keep the README to the nine sections above.
- Add a screenshot of a Discord ride post and of the weekly assignment result.
- Add a short architecture diagram: Discord, Google Sheet, Apps Script run, matcher, notifications.
- Update the status table. Chariot has run weekly since September 2026 (confirmed), but the README still says the Saturday assignment run is "not yet verified against live data" and that the pilot launch (M.8) is "not done". Those lines are out of date.
- Chariot is hosted on Render, as the portfolio says. The README, `docs/services.md`, and `railway.json` still describe Railway, so update or remove them.
- Keep the "Added beyond PRD" and "Not in the MVP" lists; they are honest scoping and help a reviewer. The long-term connectors section already says they are untested against real providers, which is the right tone.
- Confirm `service-account-key.json` is not in the repository history. It is in `.gitignore` and not tracked in the current tree, but the history is worth one check with `git log --all -- service-account-key.json`.

### Jam3sl1u/Graceful

- The README opens with "Planning Center capabilities with internal ML features". Replace this with a plain summary that matches the portfolio: scheduling, setlists, and music coordination for worship teams.
- The "Architecture rules" section is a strength (PostgREST disabled, service-role key never in `app/` or `lib/`). Move it up and keep it.
- Add the live demo link (`https://graceful-wheat.vercel.app`) and two or three screenshots: dashboard, weekly schedule, setlist.
- Add a "Working today" versus "Planned" split. The repo documents a Phase 1 scope inside a larger requirements document.
- The security documents (OWASP review, infrastructure security, performance testing) are worth linking from a "Security and testing" heading.

## One consistency check for all three

After you update the READMEs, re-read the portfolio case studies and make sure every number, hosting provider, and "live" claim appears the same way in both places.
