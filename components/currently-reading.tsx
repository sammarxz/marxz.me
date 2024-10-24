import { getCurrentlyReading } from "@/lib/literal";

export async function CurrentlyReading() {
  const book = await getCurrentlyReading();

  if (!book) {
    return <>não estou lendo nada no momento.</>;
  }

  return (
    <>
      estou lendo{" "}
      <a
        href={book.link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-neutral-800 dark:hover:text-neutral-300 transition duration-300"
      >
        &quot;{book.title}&quot; de {book.author} ↗.
      </a>
    </>
  );
}
