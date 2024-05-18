import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [workers, setWorkers] = useState<Array<Schema["Worker"]["type"]>>([]);

  useEffect(() => {
    client.models.Worker.observeQuery().subscribe({
      next: (data) => setWorkers([...data.items]),
    });
  }, []);

  function createWorker() {
    client.models.Worker.create({
      name: window.prompt("Name"),
      mail: window.prompt("Mail"),
    });
  }

  function deleteWoeker(id: string) {
    client.models.Worker.delete({ id });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>workers</h1>
          <div>userinfo: {JSON.stringify(user)}</div>
          <button onClick={createWorker} type="button">
            + new
          </button>
          <ul>
            {workers.map((todo) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <li key={todo.id} onClick={() => deleteWoeker(todo.id)}>
                {todo.name} - {todo.mail}
              </li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new workers.
            <br />
          </div>
          <button onClick={signOut} type="submit">
            Sign out
          </button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
