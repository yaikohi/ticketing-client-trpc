import { api } from "@/lib/api";
import { createAsync } from "@solidjs/router";

export default function Home() {
  // const hello = createAsync(() => api.example.hello.query("tickets!"));
  const user = createAsync(() => api.user.get.query("user"));
  return (
    <main class="text-center mx-auto p-4">
      <h1 class="font-bold text-sky-700">Ticketing client</h1>
      <pre>
        <code>
          {JSON.stringify(user(), null, 2)}
        </code>
      </pre>
    </main>
  );
}
