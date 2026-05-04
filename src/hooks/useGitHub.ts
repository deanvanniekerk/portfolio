import { useEffect, useState } from 'react'

const USERNAME = 'deanvanniekerk'

export interface ContribDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubData {
  commits: number
  yearsOnGitHub: number
  followers: number
  contributions: ContribDay[]  // 364 days (52 weeks), oldest → newest
  loading: boolean
  error: string | null
}

export function useGitHub(): GitHubData {
  const [data, setData] = useState<GitHubData>({
    commits: 0,
    yearsOnGitHub: 0,
    followers: 0,
    contributions: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const thisYear = new Date().getFullYear()
    const lastYear = thisYear - 1
    const today = new Date().toISOString().slice(0, 10)

    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then((r) => r.json()),
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${lastYear}`).then((r) => r.json()),
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${thisYear}`).then((r) => r.json()),
    ])
      .then(([profile, lastYearData, thisYearData]) => {
        const contributions: ContribDay[] = [
          ...(lastYearData.contributions ?? []),
          ...(thisYearData.contributions ?? []),
        ]
          .filter((d) => d.date <= today)
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(-364)

        const commits = contributions.reduce((s, d) => s + d.count, 0)
        const yearsOnGitHub = new Date().getFullYear() - new Date(profile.created_at).getFullYear()

        console.log('[useGitHub] contributions:', contributions[0], '→', contributions.at(-1))
        console.log('[useGitHub] commits:', commits, '| years:', yearsOnGitHub, '| followers:', profile.followers)

        setData({
          commits,
          yearsOnGitHub,
          followers: profile.followers ?? 0,
          contributions,
          loading: false,
          error: null,
        })
      })
      .catch((err) => {
        console.error('[useGitHub] fetch error:', err)
        setData((prev) => ({ ...prev, loading: false, error: String(err) }))
      })
  }, [])

  return data
}
