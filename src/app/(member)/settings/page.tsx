import { getUser } from '@/services/auth';

export default async function page() {
  const { user, success, message } = await getUser();
  console.log('success, message?', success, message);
  return (
    <form>
      <h1>settings</h1>
      {/* <input value={}/> */}
      <div>유저 이름 : {user?.name}</div>
    </form>
  );
}
