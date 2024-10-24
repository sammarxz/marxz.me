import { getMonthlyCommits } from "@/lib/github";

export async function MonthlyCommits() {
  const commits = await getMonthlyCommits();
  const currentMonth = new Date().toLocaleString("pt-BR", { month: "long" });

  if (commits === null) {
    return <>Nâo commitei nada ainda no Github :/</>;
  }

  return (
    <>
      No mês de {currentMonth}, fiz{" "}
      <a
        href="https://github.com/sammarxz"
        target="_blank"
        rel="noopener noreferrer"
        title="Sam Marxz's Github"
        className="hover:text-neutral-800 dark:hover:text-neutral-300 transition duration-300"
      >
        {commits} commit(s) no Github ↗
      </a>
    </>
  );
}
