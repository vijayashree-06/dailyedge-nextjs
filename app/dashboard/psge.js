export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const user = await fetch(
    'https://jsonplaceholder.typicode.com/users/1',
    { cache: 'no-store' }
  ).then(res => res.json());

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
