import { useState } from "react";
import data from "../../static.json";

export default function UserList() {
  const { users } = data;
  const [userId, setUserId] = useState(1);

  return (
    <ul className="bookables items-list-nav">
      {users.map((user, index) => (
        <li key={user.id} className={index === userId ? "selected" : null}>
          <button className="btn" onClick={() => setUserId(index)}>
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
