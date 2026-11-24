# Publishing checklist

Status: **nothing has been submitted.** Public repo: https://github.com/vikashsparxit/postpen-skill (GitHub is the primary home; Vikash decided 24 Nov 2026 because the devsparxit GitLab is private; no GitLab mirror). Every step marked **[Vikash]** needs the owner.

## 0. Prerequisites (all destinations)

- [x] Public GitHub repo created: https://github.com/vikashsparxit/postpen-skill (MIT).
- [ ] **[Vikash]** Add `.mcp.json` at the repo root (contents below; the agent's write was blocked by the sensitive-file permission check). In the same commit set `"mcpServers": "./.mcp.json"` in `.claude-plugin/plugin.json` and delete its inline `postpen` server, so the server is defined once. Until then the inline definition is the only one.
- [ ] **[Vikash]** Official logo file in `assets/` if a directory needs a committed image (see `assets/README.md`). Hosted: https://app.postpen.ai/icons/App-Icon.png (600×600).
- [ ] Public URLs return 200: https://postpen.ai/privacy-policy, https://postpen.ai/terms-of-service, https://postpen.ai/support, https://postpen.ai/agents (new page, copy in `postpen-agents-page.md`).
- [ ] **[Vikash]** Reviewer account (see POSTPEN `docs/mcp-marketplace-submission-plan.md` §3): Organization plan, test LinkedIn profile + test company page, and ideally test X/Facebook/Instagram/Threads/YouTube accounts. Credentials go only into private reviewer fields.
- [ ] Deploy `feat/mcp-parity-ig-fb-status` to production **before** listing, so the live server accepts `instagram`, `facebook` and returns `network_status`. The skill already copes with older servers, but listings shouldn't promise what production can't do.
- [ ] Run the evals (`evals/README.md`) against a mock server; all 15 pass.
- [ ] Tag `v0.1.0` after final review; update `CHANGELOG.md`.

`.mcp.json` contents:

```json
{
  "mcpServers": {
    "postpen": { "type": "http", "url": "https://mcp.postpen.ai" }
  }
}
```

## 1. Claude plugin directory / Claude Code marketplace

Files: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `skills/postpen/`.

- [ ] Validate locally: `claude plugin validate .` (or `/plugin validate`), then `/plugin marketplace add ./` and `/plugin install postpen@postpen` in a scratch project; confirm the skill loads and the `postpen` MCP server prompts for OAuth.
- [ ] Check the current Claude plugin directory submission process and whether it accepts GitLab URLs; use the GitHub mirror if not.
- [ ] **[Vikash]** Submit; CLEAR before final submit.
- Separate track (already planned): the PostPen **connector** in the Claude Connectors Directory (`claude.ai/directory/manage`). The skill complements it; it doesn't replace it.

## 2. Cursor plugin

Files: `.cursor-plugin/plugin.json`, `mcp.json`, `rules/postpen.mdc`, `skills/postpen/`.

- [ ] Re-check field names against https://cursor.com/docs/reference/plugins (`skills`, `rules`, `mcpServers`, `logo` are assumed).
- [ ] `logo`: Cursor may require a committed file instead of a URL (see `assets/README.md`).
- [ ] Test by loading the plugin locally in Cursor; confirm OAuth sign-in works for `https://mcp.postpen.ai`.
- [ ] **[Vikash]** Submit the public repo URL at https://cursor.com/marketplace/publish (requires public open-source repo; probably GitHub).

## 3. Grok Bot listing

File: `packaging/grokbot-listing.md`.

- [ ] Confirm whether Grok Bot has a listing/directory for skills or MCP servers and its field limits (the marketplace plan lists Grok Bot as "no public submission directory known").
- [ ] Confirm Grok Bot's OAuth redirect is allowed (`isGrokBotCursorCallbackPair` exists server-side).
- [ ] **[Vikash]** Submit / send to the Grok Bot team.

## 4. Official MCP Registry README

File: `packaging/registry-readme-section.md`.

- [ ] In the POSTPEN repo, add the "Agent skill" section to `mcp-registry/README.md`.
- [ ] Update `server.json` description (six networks incl. YouTube) and bump `version` 1.2.0 → 1.3.0.
- [ ] **[Vikash]** `mcp-publisher login dns …` + `mcp-publisher publish` (key in password manager).
- Note: the registry lists servers, not skills. The skill link lives in the README and the agents page.

## 5. postpen.ai/agents page

File: `packaging/postpen-agents-page.md`.

- [ ] Build the page in POSTPEN-MAINSITE; replace `<REPO_URL>`.
- [ ] Keep UTM tags: `utm_source` = claude | cursor | grok | mcp | mcp_registry | postpen_site, `utm_medium` = plugin | listing | docs | readme | agents_page, `utm_campaign=postpen_skill`.
- [ ] Note: the MCP server's `resource_documentation` points at `https://app.postpen.ai/agents` (the in-app setup page). Decide whether that stays or moves to `postpen.ai/agents`.
- [ ] **[Vikash]** Approve copy (especially the "never posts without your OK" promise and FAQ claims).

## Open questions for Vikash

1. (Resolved) Repo lives at https://github.com/vikashsparxit/postpen-skill; move to a PostPen GitHub org later if wanted (GitHub redirects renamed/transferred repos).
2. Should the skill version track the server (`1.3.0`) or stay independent (`0.1.0`)?
3. Claude plugin directory: submit the plugin from this repo, or only the connector?
4. Legal company name and review contact for directory forms.
5. Is a committed logo file OK to add to a public MIT repo (trademark notice in README?).
6. Facebook Reels: the branch refuses `facebook.format: "reel"`. Is Reels publishing planned? Page copy currently says "not yet".
7. `blocked` / `restricted` network_status are reserved. When detected, update `networks.md`, `troubleshooting.md` and the evals.
