// Offline checks: JSON parses, SKILL.md frontmatter, and every relative link/path resolves.
// Usage: node scripts/validate.mjs
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'

const root = join(dirname(new URL(import.meta.url).pathname), '..')
const errors = []

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (name === '.git' || name === 'node_modules') return []
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const files = walk(root)

for (const file of files.filter((f) => f.endsWith('.json'))) {
  try {
    JSON.parse(readFileSync(file, 'utf8'))
  } catch (error) {
    errors.push(`${relative(root, file)}: invalid JSON (${error.message})`)
  }
}

const skillPath = join(root, 'skills/postpen/SKILL.md')
const skill = readFileSync(skillPath, 'utf8')
const front = skill.match(/^---\n([\s\S]*?)\n---\n/)
if (!front) errors.push('SKILL.md: missing YAML frontmatter')
else {
  if (!/^name: postpen$/m.test(front[1])) errors.push('SKILL.md: name must be postpen')
  const description = front[1].match(/^description: (.+)$/m)?.[1] ?? ''
  if (!description) errors.push('SKILL.md: missing description')
  if (description.length > 1024) errors.push(`SKILL.md: description is ${description.length} chars (max 1024)`)
}
const skillLines = skill.split('\n').length
if (skillLines > 300) errors.push(`SKILL.md: ${skillLines} lines (keep under ~300)`)

function anchorOf(heading) {
  return heading.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

for (const file of files.filter((f) => f.endsWith('.md') || f.endsWith('.mdc'))) {
  const text = readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '')
  for (const [, target] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#|<)/.test(target)) continue
    const [path, anchor] = target.split('#')
    const resolved = join(dirname(file), path)
    if (!existsSync(resolved)) {
      errors.push(`${relative(root, file)}: broken link ${target}`)
      continue
    }
    if (anchor && resolved.endsWith('.md')) {
      const headings = [...readFileSync(resolved, 'utf8').matchAll(/^#+ (.+)$/gm)].map((m) => anchorOf(m[1]))
      if (!headings.includes(anchor)) errors.push(`${relative(root, file)}: missing anchor ${target}`)
    }
  }
}

// Paths named in manifests.
for (const [manifest, keys] of [
  ['.claude-plugin/plugin.json', ['skills']],
  ['.cursor-plugin/plugin.json', ['skills', 'rules', 'mcpServers']],
]) {
  const json = JSON.parse(readFileSync(join(root, manifest), 'utf8'))
  for (const key of keys) {
    const value = json[key]
    if (typeof value === 'string' && !existsSync(join(root, value))) errors.push(`${manifest}: ${key} path ${value} missing`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`ok: ${files.length} files checked`)
