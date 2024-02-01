import { useLocation } from "@solidjs/router";
import { AuthenticationModal } from "./authentication-modal";

export default function Nav() {
  return (
    <nav class="bg-secondary container flex items-center justify-between">
      <ul class="container flex items-center p-3">
        <NavLink text={"Home"} path={"/"} />
      </ul>
      <div class="">
        {/* @TODO: Check if user is logged-in*/}
        <AuthenticationModal purpose={"sign-up"} />
        <AuthenticationModal purpose={"sign-in"} />
      </div>
    </nav>
  );
}

function NavLink({ text, path }: { text: string; path: string }) {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-rose-600"
      : "border-transparent hover:border-rose-600";
  return (
    <>
      <li class={`border-b-2 ${active(path)} mx-1.5 sm:mx-6`}>
        <a href={path}>{text}</a>
      </li>
    </>
  );
}
