const GITHUB_USERNAME = 'htomoya16'

interface ContributionDay {
  date: string
  contributionCount: number
}

async function fetchYearContributions(
  year: number,
  token: string,
): Promise<{ total: number; days: ContributionDay[] }> {
  const from = `${year}-01-01T00:00:00Z`
  const to =
    year === new Date().getFullYear()
      ? new Date().toISOString()
      : `${year}-12-31T23:59:59Z`

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME, from, to } }),
    next: { revalidate: 3600 },
  })

  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`)

  const json = await res.json()
  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar

  return {
    total: (calendar?.totalContributions as number) ?? 0,
    days: ((calendar?.weeks ?? []) as { contributionDays: ContributionDay[] }[])
      .flatMap((w) => w.contributionDays),
  }
}

function calcLongestStreak(days: ContributionDay[]): number {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  let best = 0
  let cur = 0
  for (const d of sorted) {
    if (d.contributionCount > 0) {
      cur++
      if (cur > best) best = cur
    } else {
      cur = 0
    }
  }
  return best
}

export interface GitHubStats {
  totalContributions: number
  publicRepos: number
  longestStreak: number
}

export async function getGitHubStats(): Promise<GitHubStats | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.warn('[github-stats] GITHUB_TOKEN not set — skipping fetch')
    return null
  }

  try {
    const currentYear = new Date().getFullYear()
    const START_YEAR = 2022

    // 年ごとに並列取得
    const years = Array.from(
      { length: currentYear - START_YEAR + 1 },
      (_, i) => START_YEAR + i,
    )
    const results = await Promise.all(
      years.map((y) => fetchYearContributions(y, token)),
    )

    const totalContributions = results.reduce((sum, r) => sum + r.total, 0)
    const allDays = results.flatMap((r) => r.days)
    const longestStreak = calcLongestStreak(allDays)

    // 公開リポジトリ数は REST API で取得
    const userRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      },
    )
    const userData = await userRes.json()
    const publicRepos = (userData.public_repos as number) ?? 0

    return { totalContributions, publicRepos, longestStreak }
  } catch (err) {
    console.error('[github-stats] fetch failed:', err)
    return null
  }
}
