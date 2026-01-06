export default async function HomePage() {
  const data = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    { cache: 'force-cache' }
  ).then(res => res.json());

  return (
    <main>
      <h1>DailyEdge</h1>
      <p>Static Home Page</p>

      <ul>
        {data.slice(0, 5).map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
