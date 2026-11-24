# Proposed changes for the POSTPEN repo's `mcp-registry/`

> Proposal only. Nothing in the POSTPEN repo was edited. Apply by hand in a PR there.

## 1. Section to append to `mcp-registry/README.md`

```markdown
## Agent skill

The public `postpen` agent skill teaches agents the safe way to use this server: discover destinations, write a version per network, save a draft, show the preview link, and schedule or publish only after the user's explicit OK on the exact text, accounts, media, format and time. It also covers Instagram Story/Reel/trial Reel, YouTube Shorts and privacy, rights reminders for music, and post-publish checks.

- Repo: https://github.com/vikashsparxit/postpen-skill (skill at `skills/postpen/SKILL.md`)
- Claude Code: `/plugin marketplace add vikashsparxit/postpen-skill` then `/plugin install postpen@postpen` (installs the skill and this MCP server)
- Cursor: install the PostPen plugin (bundles the skill, a rule, and this server)
- Other agents: copy `skills/postpen/` into the agent's skills folder and add `https://mcp.postpen.ai` as a remote MCP server

Keep the skill's `references/tools.md` in step with `supabase/functions/agent-mcp/tools.ts` whenever a tool or field changes.
```

## 2. Proposed `server.json` changes

Current (`version` 1.2.0):

```json
"description": "Schedule and publish posts to LinkedIn, X, Facebook, Instagram and Threads from AI agents.",
"version": "1.2.0",
```

Proposed:

```json
"description": "Schedule and publish posts to LinkedIn, X, Facebook, Instagram, Threads and YouTube from AI agents.",
"version": "1.3.0",
```

- The new description is 99 characters (registry limit 100; check the current schema) and adds YouTube, which the server has supported since `youtube` / `youtube_format` landed.
- **Version bump: 1.2.0 → 1.3.0** (minor). The tool surface grew without breaking changes: YouTube, `instagram` (feed/story/reel, trial Reel), `facebook` (feed), `list_posts` `network_status`. Publish after `feat/mcp-parity-ig-fb-status` is deployed so the registry entry matches the live server.
- Optional, same PR: `SERVER_INFO.version` in `agent-mcp/index.ts` is still `1.0.0`. Consider aligning it with `server.json`.
- Then run `mcp-publisher publish` as described in the README (DNS-authenticated `ai.postpen/` namespace).
