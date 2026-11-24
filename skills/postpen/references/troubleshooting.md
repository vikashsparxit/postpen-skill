# Troubleshooting

## Not connected

Symptom: no PostPen tools (`list_destinations`, `save_draft`, …) are available.

Tell the user to add the remote MCP server and stop. Don't simulate saving or scheduling.

| Client | How |
|---|---|
| Claude (claude.ai / Desktop) | Settings → Connectors → Add custom connector → `https://mcp.postpen.ai` → Connect → sign in → **Allow** |
| Claude Code | `claude mcp add --transport http postpen https://mcp.postpen.ai`, then `/mcp` → authenticate. Or install the `postpen` plugin, which bundles it |
| Cursor | Install the PostPen plugin, or Settings → MCP → add `https://mcp.postpen.ai` → Authenticate |
| Grok Bot and other MCP clients | Add a remote (streamable HTTP) server at `https://mcp.postpen.ai`; sign in when the browser opens |

Setup help for every client: https://app.postpen.ai/agents

## Sign-in / auth errors

| Message | Meaning | Fix |
|---|---|---|
| "Sign in to PostPen to use this MCP server" / HTTP 401 | No or expired token | Reconnect / re-authenticate the connector in the client |
| "This agent was disconnected in PostPen" | User disconnected this agent on the Agents page | Connect it again from the client |
| "This connection was not approved for schedule/publish/…" | Token lacks that OAuth scope | Reconnect and approve all permissions |
| "Do not send a network token" | An argument named like a token was sent | Remove it. PostPen never takes network tokens |

Never ask the user for a password, API key or token in chat.

## Tools missing or fields rejected (stale schema) {#older-server}

PostPen's server advertises `tools.listChanged: false`, so clients cache the tool list from when they connected and won't see new tools or fields until they reconnect.

Symptoms:
- A tool listed in this skill doesn't exist (e.g. no `list_tags`, `get_prompt`).
- `save_draft` / `schedule_post` reject `instagram`, `facebook` or `youtube_format` as unknown/additional properties.

Fix:
1. Ask the user to disconnect and reconnect the PostPen connector (or restart the client) to refresh the tool list.
2. If it still fails, the server is older than this skill. Save the draft without those fields and tell the user: *"Your PostPen server doesn't accept the Instagram/Facebook/YouTube format option yet. Open the draft at the preview link and choose the format in app.postpen.ai before it goes out."* Don't schedule until they confirm they've set it (or accept the default: images → feed, video → Reel, YouTube → regular video).

## network_problems

`save_draft` returns `network_problems` when a network can't take the post yet; `schedule_post`/`publish_now` refuse until they're fixed. Common ones:

| Problem | Fix |
|---|---|
| Instagram without media | add an image/video, or drop Instagram |
| Too long for X / Threads / Instagram | write `network_text.<network>` |
| Too many images (X 4, LinkedIn 9, FB/IG 10) | reduce, or accept that X gets the first 4 |
| YouTube without exactly one video | attach one video or drop YouTube |
| `<` or `>` in YouTube title/description | remove them |
| Story with several files or other networks | separate Instagram Story post |
| Reel with images / video to IG feed | change `instagram.format` or media |
| PDF to a non-LinkedIn destination | PDF is LinkedIn-only |
| `needs_reconnect` destination | user reconnects in app.postpen.ai |

`unknown_tags`: a `@[Name]` not in `list_tags`. It publishes as plain text. Tell the user, or ask them to add the tag in PostPen.

## Media errors

| Symptom | Fix |
|---|---|
| Upload URL expired | call `create_upload` again and PUT immediately |
| File too large | images ≤5 MB; video >200 MB needs `create_upload` (up to `max_bytes`); compress/trim otherwise |
| Video too small (<75 KB) | not a real video; check the file |
| URL can't be fetched | must be public HTTPS (no private/localhost hosts, no login walls) |
| Mixed types | one type per post |
| `alt_text` on a video/PDF | images only |
| Short refused at publish | clip is landscape or >3 min; use `youtube_format: "video"` or a vertical ≤3 min edit |
| Thumbnail refused | channel not verified, or used on a Short; video still published |

## After publishing

- `networks[].status: failed` with `error`: report the error verbatim, then suggest fixing and re-saving (a failed network isn't retried automatically).
- `network_status: deleted`: removed on the network (by the user or the platform); `network_status_reason` says which.
- `network_status: expired`: an Instagram Story after 24 h, which is normal.
- Muted/blocked for music or copyright: `blocked`/`restricted` aren't detected by PostPen yet; if the user reports it, explain the likely music/copyright cause and suggest licensed audio.
- `get_post_stats` `needs_reconnect: true` or `supported: false`: analytics permission missing (reconnect) or the network/plan doesn't expose metrics.
