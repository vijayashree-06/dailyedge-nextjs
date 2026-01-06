export const revalidate = 300;

export default async function NewsArticle({ params }) {
  const article = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.slug}`
  ).then(res => res.json());

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
    </div>
  );
}
