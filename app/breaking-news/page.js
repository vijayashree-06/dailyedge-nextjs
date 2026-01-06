export const revalidate = 60;

export default async function BreakingNews() {
  const news = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  ).then(res => res.json());

  return (
    <div>
      <h1>Breaking News</h1>
      <p>Updates every 60 seconds</p>

      {news.slice(0, 5).map(item => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
