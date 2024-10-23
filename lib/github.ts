const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

export async function getMonthlyCommits() {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Format dates as YYYY-MM-DD
  const since = firstDayOfMonth.toISOString().split('T')[0];
  const until = lastDayOfMonth.toISOString().split('T')[0];

  try {
    const response = await fetch(
      `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}+author-date:${since}..${until}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.cloak-preview+json',
        },
        next: {
          revalidate: 3600 // Revalidate every hour
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub commits');
    }

    const data = await response.json();
    return data.total_count;
  } catch (error) {
    console.error('Error fetching GitHub commits:', error);
    return null;
  }
}