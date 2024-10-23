import { getCurrentlyReading } from "@/lib/literal";

export async function CurrentlyReading() {
  const book = await getCurrentlyReading();

  if (!book) {
    return <>I&apos;m not reading anything at the moment.</>;
  }

  return (
    <>
      I&apos;m reading{" "}
      <a
        href={book.link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-neutral-800 dark:hover:text-neutral-300 transition duration-300"
      >
        &quot;{book.title}&quot; by {book.author} ↗.
      </a>
    </>
  );
}
