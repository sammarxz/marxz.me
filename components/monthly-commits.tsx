import { getMonthlyCommits } from "@/lib/github";

export async function MonthlyCommits() {
  const commits = await getMonthlyCommits();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  if (commits === null) {
    return <>Unable to fetch Github commits</>;
  }

  return (
    <>
      In {currentMonth},{" "}
      <a
        href="https://github.com/sammarxz"
        target="_blank"
        rel="noopener noreferrer"
        title="Sam Marxz's Github"
        className="hover:text-neutral-800 dark:hover:text-neutral-300 transition duration-300"
      >
        I made {commits} commit(s) on Github ↗
      </a>
    </>
  );
}
