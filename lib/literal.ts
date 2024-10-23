const LITERAL_TOKEN = process.env.LITERAL_TOKEN;
const LITERAL_ENDPOINT = "https://literal.club/graphql/";

interface Author {
  name: string;
}

interface Book {
  title: string;
  slug: string;
  authors: Author[];
}

interface ReadingStateResponse {
  status: string;
  book: Book;
}

export interface BookResult {
  reading: boolean;
  title?: string;
  author?: string;
  link?: string;
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${LITERAL_TOKEN}`,
};

const graphqlQuery = {
  "operationName": "myReadingStates",
  "query": `query myReadingStates {
    myReadingStates {
      status
      book {
        title
        slug
        authors {
          name
        }
      }
    }
  }`,
  "variables": {},
};

const options = {
  "method": "POST",
  "headers": headers,
  "body": JSON.stringify(graphqlQuery),
};

export async function getCurrentlyReading(): Promise<BookResult | null> {
  try {
    const response = await fetch(LITERAL_ENDPOINT, options);

    if (!response.ok) {
      throw new Error('Failed to fetch from Literal Club API');
    }

    const data = await response.json() as {
      data: { myReadingStates: ReadingStateResponse[] };
    };

    const firstReadingBook = data.data.myReadingStates.filter((item) =>
      item.status === "IS_READING"
    )[0];

    const { title, slug, authors } = firstReadingBook.book;

    const result: BookResult = {
      reading: true,
      title,
      link: `https://literal.club/sammarxz/book/${slug}`,
      author: authors.map((author) =>
        author.name
      ).join(", "),
    };

    return result;
  } catch (error) {
    console.error('Error fetching from Literal Club:', error);
    return null;
  }
}