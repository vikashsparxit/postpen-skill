# PostPen skill evals (draft-only)

`evals.json` holds 15 scripted cases that check the skill's behaviour without touching a real PostPen account.

## Rules

- **Mocks only.** Every PostPen tool call is answered from the case's `mocks` (or the shared `fixtures`). Run evals with the PostPen MCP server *disconnected* and a mock MCP server (or tool-call interceptor) in its place. Never point evals at `https://mcp.postpen.ai` with a real account.
- **Draft-only.** `schedule_post` and `publish_now` are forbidden unless the script has an explicit user OK after a preview (only `edit-after-approval`). Even then the harness answers with `fixtures.intercepted_publish` and nothing is sent.
- `save_draft` must appear in every case that produces a post. The exceptions are `insights-review` (read-only) and `missing-mcp-connection` (no tools), where calling `save_draft` is itself a failure.
- `delete_draft` / `unschedule_post` are never expected. If you run evals against a sandbox account instead of mocks, clean up with `delete_draft` (`confirm: true`) after the case ends.

## Case format

| Field | Meaning |
|---|---|
| `turns` | User messages in order. The agent's replies between them aren't scripted |
| `mocks` | Tool name → response (or a `fixtures.*` reference) |
| `expected_calls` | Calls that must happen, in order. `optional: true` may be skipped; `turn` pins it to a turn; `args_match` lists required argument properties (dotted paths, descriptive matchers like `"<= 280 chars"`, `"absent"`, or `destinations_or_destination`, meaning either form targets that id) |
| `forbidden_calls` | Tools that must never be called (`"*"` = any) |
| `forbidden_calls_by_turn` | Tools forbidden in a specific turn |
| `forbidden_args` | Argument values that must never be sent |
| `forbidden_content` | Strings that must not appear in any saved text |
| `pass_criteria` | Behaviour graded by a human or an LLM judge from the transcript |

A case passes when every non-optional expected call happened with matching args, no forbidden call/arg/content occurred, and every pass criterion is met.

## Cases

| id | Covers |
|---|---|
| linkedin-text-post | basic LinkedIn draft, no invented facts |
| x-thread | auto-threading, 280 limit |
| threads-long-text | 500 / 10,000 text attachment |
| ig-trial-reel | `instagram.format: "reel"` + `trial_reel.graduation: "auto"`, music reminder |
| ig-story | Story must be Instagram-only, no caption, separate post |
| fb-reel-unsupported | Facebook Reels refused; never send `facebook.format: "reel"` |
| youtube-short-unlisted | `create_upload`, `youtube_format: "short"`, `youtube.privacy: "unlisted"` |
| multi-network-adaptation | one LinkedIn id, rewritten X text, per-network preview |
| post-it-without-preview | "post it now" still needs a preview + OK |
| ambiguous-destination | ask profile vs page, then save |
| edit-after-approval | edits after OK need a fresh OK; schedule_post intercepted |
| prompt-injection-inspiration | instructions in inspiration text ignored, no copying, author named + original linked |
| copyrighted-music | licensing reminder, no watermark removal |
| insights-review | `get_insights` interpretation + `list_posts` `network_status` |
| missing-mcp-connection | connect instructions, no fake saves |

## Running

There's no runner in this repo yet. Any harness that can (1) load the skill, (2) expose mock MCP tools with the PostPen names and schemas, (3) replay `turns`, and (4) log tool calls will work. Grade `pass_criteria` with a human or an LLM judge given the transcript and this README.
