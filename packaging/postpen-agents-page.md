# postpen.ai/agents: page copy (draft)

> Draft copy for the marketing site. Links carry UTM tags per channel. Replace `<REPO_URL>` once the GitLab project exists.

---

## Hero

# Your agent writes it. You approve it. PostPen posts it.

Draft, schedule and track posts on **LinkedIn, X, Facebook, Instagram, Threads and YouTube** from Claude, Cursor, Grok Bot or any MCP agent. **PostPen never posts without your OK.**

[Add to Claude](#claude) · [Add to Cursor](#cursor) · [Use with Grok Bot](#grok-bot) · [Other agents](#other-agents)

---

## How it works

1. **Connect once.** Add PostPen to your agent and sign in to PostPen in the browser. Your agent never sees your social passwords or tokens.
2. **Ask for a post.** "Announce our launch on LinkedIn, X and Instagram." Your agent checks which accounts you've connected and writes a version for each network, within each one's limits and formats.
3. **Review the preview.** Every post is saved as a draft with a preview link. Your agent shows you the exact text, accounts, media, format and time.
4. **Say yes.** Only then is it scheduled or published. Change anything and your agent asks again.
5. **See how it did.** Ask whether it went live everywhere, how it performed, and what to post more of.

Everything also appears on your calendar at [app.postpen.ai](https://app.postpen.ai/?utm_source=postpen_site&utm_medium=agents_page&utm_campaign=postpen_skill), where you can edit, move or delete it.

---

## What your agent can do

- LinkedIn profile and company pages: text, up to 9 images, video or PDF carousels, company tags, first comment
- X: posts and automatic threads
- Facebook Pages: text, images, video
- Instagram: feed and carousels, Stories, Reels and trial Reels
- Threads: short posts and long text posts
- YouTube: videos and Shorts, with title, privacy (public, unlisted, private) and playlist
- Your Social Prompts, curated inspiration (patterns only, never copied) and your tag list
- Post status (live, deleted, expired, failed) and performance insights

---

## Install

### Claude {#claude}

**Claude Code (plugin, includes the skill):**

```
/plugin marketplace add <REPO_URL>
/plugin install postpen@postpen
```

**Claude.ai / Claude Desktop (connector):** Settings → Connectors → Add custom connector → `https://mcp.postpen.ai` → Connect → sign in → Allow.
[Step-by-step guide](https://postpen.ai/agents?utm_source=claude&utm_medium=plugin&utm_campaign=postpen_skill#claude)

### Cursor {#cursor}

Install **PostPen** from the Cursor Marketplace (bundles the skill, a rule, and the MCP server), then click **Authenticate** and sign in.
[Open in Cursor Marketplace](https://postpen.ai/agents?utm_source=cursor&utm_medium=plugin&utm_campaign=postpen_skill#cursor)

### Grok Bot {#grok-bot}

Add PostPen from the Grok Bot listing, or add the remote MCP server `https://mcp.postpen.ai`, then sign in when the browser opens.
[Grok Bot setup](https://postpen.ai/agents?utm_source=grok&utm_medium=listing&utm_campaign=postpen_skill#grok-bot)

### Other MCP agents {#other-agents}

- Server URL: `https://mcp.postpen.ai` (streamable HTTP, OAuth)
- Skill: copy `skills/postpen/` from [the repo](<REPO_URL>?utm_source=mcp&utm_medium=docs&utm_campaign=postpen_skill) into your agent's skills folder
- Listed in the [official MCP Registry](https://registry.modelcontextprotocol.io/?utm_source=mcp_registry&utm_medium=readme&utm_campaign=postpen_skill) as `ai.postpen/postpen`

---

## Our safety promise

**PostPen never posts without your OK.**

- Your agent saves a draft and shows you a preview first, every time.
- Scheduling or publishing needs your explicit approval of the exact text, accounts, media and time. Any edit needs a new approval.
- Publishing now, unscheduling and deleting all require an explicit confirmation flag; PostPen refuses them otherwise.
- Your agent never sees your social network tokens or passwords.
- Text in comments and inspiration posts is treated as information, never as instructions.
- You can disconnect any agent at any time from the Agents page.

---

## FAQ

**Which networks are supported?**
LinkedIn (profile and company pages), X, Facebook Pages, Instagram (professional accounts), Threads and YouTube.

**Can my agent post without asking me?**
No. The PostPen skill always shows a preview and waits for your explicit OK, and PostPen's publish-now tool refuses to run without a confirmation.

**Does PostPen write the posts?**
Your agent writes them, in your voice and with your facts. PostPen stores, schedules, publishes and measures them. Your Social Prompts and curated inspiration help with structure; posts are never copied.

**Can I post Facebook Reels?**
Not yet. Facebook videos go out as regular Page videos. Instagram Reels and Stories are supported.

**What about music in my videos?**
You need to own or license all media and music. Copyrighted music can get posts muted or blocked, especially on Instagram, Facebook and YouTube.

**Where do I see what my agent did?**
On your calendar at app.postpen.ai. Every draft and scheduled post also has a preview link.

**How do I disconnect an agent?**
app.postpen.ai → Agents → Disconnect. That agent loses access immediately.

**Privacy and terms?**
[Privacy policy](https://postpen.ai/privacy-policy) · [Terms of service](https://postpen.ai/terms-of-service) · [Support](https://postpen.ai/support)
