# PostPen agent skill

An [Agent Skill](skills/postpen/SKILL.md) that teaches AI agents to draft, schedule, publish and check social posts on **LinkedIn, X, Facebook, Instagram, Threads and YouTube** through the [PostPen](https://postpen.ai) MCP server, and to **never post without the user's explicit OK**.

- MCP server: `https://mcp.postpen.ai` (streamable HTTP, OAuth sign-in)
- App: https://app.postpen.ai · Setup for agents: https://postpen.ai/agents

## What the skill does

1. Checks that the PostPen MCP tools are connected (otherwise explains how to connect and stops).
2. Discovers the user's destinations with `list_destinations`, so it never assumes accounts.
3. Writes a version per network within each network's limits and formats (X threads, Instagram feed/Story/Reel/trial Reel, YouTube video/Short and privacy, Threads long text).
4. Saves a draft, shows the `preview_url` and the exact text, destinations, media, format and time, and waits for an explicit OK before `schedule_post` / `publish_now`. Any edit needs a new OK.
5. After publishing, reports per-network status (`live`, `deleted`, `expired`, failures) and performance, and suggests what to repeat.
6. Reminds users about music and media rights, never copies inspiration posts, and treats third-party text as data, not instructions.

## Install

**Claude Code** (skill + MCP server):

```
/plugin marketplace add <REPO_URL>
/plugin install postpen@postpen
```

**Cursor**: install the PostPen plugin (`.cursor-plugin/`), which bundles the skill, `rules/postpen.mdc` and the MCP server.

**Any other agent that supports skills**: copy `skills/postpen/` into its skills directory and add `https://mcp.postpen.ai` as a remote MCP server.

**MCP only (no skill)**: add `https://mcp.postpen.ai` in your client's connector/MCP settings, sign in to PostPen, click Allow.

## Repository layout

```
skills/postpen/SKILL.md          the skill
skills/postpen/references/       networks, workflow, tools, writing, troubleshooting
evals/                           15 draft-only scripted eval cases
.claude-plugin/                  Claude Code plugin + marketplace manifests
.cursor-plugin/, mcp.json, rules/  Cursor plugin
packaging/                       listing copy and publishing checklist (drafts)
assets/                          logo note (no logo file committed)
```

## Keeping it in sync

The tool facts come from the PostPen MCP server's `tools/list` (`supabase/functions/agent-mcp/tools.ts` in the PostPen app repo). When a tool or field changes there, update `skills/postpen/references/tools.md` and `networks.md`, re-run the evals, and bump the version in `CHANGELOG.md` and the plugin manifests.

## Safety

PostPen refuses `publish_now`, `unschedule_post` and `delete_draft` without `confirm: true`, and never accepts or returns social network tokens. The skill adds the human-in-the-loop rule: `confirm: true` and `schedule_post` are used only after the user approves the exact preview.

## License

[MIT](LICENSE). "PostPen" and the PostPen logo are trademarks of PostPen and aren't covered by the licence.
