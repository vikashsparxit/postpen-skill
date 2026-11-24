# Networks: limits, formats and gotchas

Source of truth: the PostPen MCP tool descriptions (`save_draft`, `create_upload`, `list_posts`). If a tool result disagrees with this file, trust the tool. `network_problems` from `save_draft` is the final check.

General rules for every network:

- One post can go to any mix of destinations. At most **one LinkedIn** destination per post (the profile *or* one company page).
- Media types can't be mixed in one post (images **or** one video **or** one PDF).
- Images: jpeg, png, webp, gif, ≤5 MB each, ≤20 per post (each network then takes its own maximum).
- Video: mp4, one per post. 75 KB–200 MB from a URL or base64; larger (up to `create_upload`'s `max_bytes`, up to 5 GB) through `create_upload`.
- PDF: ≤100 MB, **LinkedIn only**.
- Alt text: up to 4,086 chars on LinkedIn, the first 1,000 elsewhere; ~120 recommended. Images only.
- Tags from `list_tags` are written `@[Name]`: @handle on X / Instagram / Threads, company tag on LinkedIn, plain name on Facebook / YouTube.
- After scheduling, a multi-destination post becomes **one post per network** (`split_posts`), each with its own id.

## LinkedIn

| | |
|---|---|
| Destinations | `personal` (profile) or a company page id (plan-dependent: Organization/Enterprise) |
| Text | 3,000 characters (longer is refused at save) |
| Media | ≤9 images, or 1 video, or 1 PDF (shown as a swipeable document carousel; `file_name` becomes its title) |
| Extras | `mentions` (company page URLs; the name must appear in the text exactly as LinkedIn spells it, and the error gives the right spelling), `auto_react`, `first_comment` |
| Stats | Full `get_post_stats`; `list_comments` only for company page posts |

Gotchas: people can't be tagged (only company pages). `mentions` aren't applied to PDF posts. Only the first ~210 characters show before "…see more", so the hook must land there.

## X

| | |
|---|---|
| Text | 280 chars; 25,000 on accounts with an X subscription (check the destination's `max_chars`). A link counts 23, an emoji 2 |
| Threads | Longer text auto-splits into up to 25 numbered posts ("1/3"), cut at paragraphs/sentences/words; media on the first, first comment under the last |
| Media | ≤4 images (extra images go to the other networks only) or 1 video; a GIF must be alone |
| First comment | Posted as a reply; ≤280 unless subscribed |
| Stats | May be `supported: false` if PostPen's X API plan can't read metrics |

Gotchas: if you want control over thread breaks, write the X version yourself in `network_text.x` with clear paragraph breaks per tweet; PostPen numbers them. Keep the first post standalone-strong.

## Facebook (Pages only)

| | |
|---|---|
| Text | 63,206 characters |
| Media | ≤10 images or 1 video |
| Format | `facebook: { "format": "feed" }` only. **Reels are not supported**: a video goes out as a regular Page video. `"reel"` is refused |
| First comment | Needs the Page connected with comment permission |

Gotchas: personal Facebook profiles and Groups are not destinations. Tags render as plain names. Copyrighted music in videos is commonly muted or blocked by Facebook's rights matching.

## Instagram

| | |
|---|---|
| Text | 2,200 characters, ≤30 hashtags |
| Media | **Required.** ≤10 JPEG images (a carousel) or 1 video |
| Format | `instagram: { "format": "feed" \| "story" \| "reel" \| null, "trial_reel": { "graduation": "manual" \| "auto" } \| null }` |
| feed | Images; several make a carousel. A video to the feed is refused |
| story | 1 image or 1 video of 3–60 s. Gone after 24 h. **Instagram-only post**: no caption, location or first comment, and no other destinations in the same post |
| reel | 1 video, up to 15 minutes |
| trial Reel | Reels only. Shown to non-followers first. `manual`: the user shares it to followers in the Instagram app; `auto`: Instagram shares it if it performs |
| null | Follows the media: images → feed, one video → Reel |

Gotchas:
- A Story mixed with other networks comes back in `network_problems`. Save it as its own post.
- Links in captions aren't clickable; put "link in bio" or use the first comment.
- After 24 h a Story's `network_status` becomes `expired`. That's normal.
- Instagram mutes or blocks Reels with unlicensed music. Use Instagram's own licensed audio in the app, or tracks the user owns.
- Older PostPen servers don't take `instagram`; see [troubleshooting.md](troubleshooting.md#older-server-or-stale-tool-list).

## Threads

| | |
|---|---|
| Text | 500 chars with media. Text-only up to 10,000: what doesn't fit in the first 500 goes out as a text attachment under the post |
| Links | ≤5 |
| Media | ≤20 images or 1 video |
| First comment | Posted as a reply; ≤500 |

Gotchas: front-load the point in the first 500 characters; the attachment is collapsed.

## YouTube

| | |
|---|---|
| Media | **Exactly one video**, nothing else |
| Title | `youtube.title` ≤100 chars, no `<` `>`. Defaults to the text's first line |
| Description | The YouTube text (`network_text.youtube` or `content`), ≤5,000 **bytes** (emoji and non-Latin chars use more), no `<` `>` |
| Format | `youtube_format`: `"video"` (default) or `"short"`: vertical/square (9:16 best), ≤3 min. A landscape or longer clip is **refused at publish**, not posted as a normal video. PostPen adds #Shorts |
| Settings | `youtube: { title, privacy: public\|unlisted\|private (default public), tags (≤500 chars total), category (id, default 22 People & Blogs), made_for_kids (default false), thumbnail_url, playlist_id }` |
| Thumbnail | Regular videos only, on channels verified at youtube.com/verify; JPEG/PNG ≤2 MB over https. If refused, the video still publishes |
| Playlist | Needs the channel connected with playlist permission; otherwise the video publishes and a note says to reconnect |
| First comment | Not supported |

Category ids: 1 Film & Animation, 2 Autos & Vehicles, 10 Music, 15 Pets & Animals, 17 Sports, 19 Travel & Events, 20 Gaming, 22 People & Blogs, 23 Comedy, 24 Entertainment, 25 News & Politics, 26 Howto & Style, 27 Education, 28 Science & Technology, 29 Nonprofits & Activism.

Gotchas: always confirm privacy (the default is public). `made_for_kids: true` disables comments and personalised ads. Content ID claims on music can block the video in some countries or demonetise it. Long uploads take a few minutes after `publish_now`.

## Copyright and music (all networks)

- The user must own or license every image, clip, font-in-image and music track.
- Copyrighted music is the most common reason posts get muted, blocked, restricted or removed, especially on Instagram, Facebook and YouTube (Content ID).
- Safer options: the network's own licensed audio added in its app, royalty-free libraries the user has a licence for, original audio.
- Never remove watermarks, crop out credits, or re-upload someone else's video or image as the user's own.
