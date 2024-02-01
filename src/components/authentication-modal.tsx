import { Button } from "@/components/ui/button";
import { TextField, TextFieldInput } from "@/components/ui/textfield";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createStore } from "solid-js/store";

// ---- TYPES
type BaseUrlType = `http://localhost:5000` | `https://ticketing.dev`;
type PathAuthParamsType = "sign-in" | "sign-up";
type PathType = `${BaseUrlType}/api/users/${PathAuthParamsType}`;
type AuthConfigPathType = `/api/users/${PathAuthParamsType}`;
type AuthDialogConfigTable = {
  [Property in PathAuthParamsType]: {
    path: AuthConfigPathType;
    title: string;
    description: string;
  };
};

// ---- CONSTS
const BASE_URL: BaseUrlType = process.env.NODE_ENV === "development"
  ? `http://localhost:5000`
  : `https://ticketing.dev`;

const AuthConfigTable: AuthDialogConfigTable = {
  "sign-in": {
    path: `/api/users/sign-in`,
    title: `Login`,
    description: `Login to your account.`,
  },
  "sign-up": {
    path: `/api/users/sign-up`,
    title: `Register`,
    description: `Sign up for Ticketing.`,
  },
};

// ---- COMPONENT
export const AuthenticationModal = (
  { purpose }: { purpose: PathAuthParamsType },
) => {
  const [authObj, setAuthObj] = createStore({
    email: "",
    password: "",
  });
  const [result, setResult] = createStore({
    success: false,
    message: "",
  });
  const URL: PathType = `${BASE_URL}${AuthConfigTable[purpose].path}`;

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    const signUpFormData = {
      email: authObj.email,
      password: authObj.password,
    };

    console.log(`Sending form to ${URL}`);

    const res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(signUpFormData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    console.log(result);

    setResult(result);
  };
  return (
    <div class="w-max">
      <Dialog>
        <DialogTrigger>{purpose}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{purpose}</DialogTitle>
            <DialogDescription>Sign in to your account.</DialogDescription>
          </DialogHeader>
          <div>
            <form
              onSubmit={onSubmit}
              method="post"
              class="flex flex-col gap-2 max-w-md"
            >
              <TextField>
                <TextFieldInput
                  onInput={(e: any) =>
                    setAuthObj(
                      {
                        ...authObj,
                        email: e?.currentTarget
                          ?.value as HTMLInputElement["value"],
                      },
                    )}
                  type="email"
                  placeholder="Email"
                />
              </TextField>

              <TextField>
                <TextFieldInput
                  onInput={(e: any) =>
                    setAuthObj({
                      ...authObj,
                      password: e?.currentTarget
                        ?.value as HTMLInputElement["value"],
                    })}
                  type="password"
                  placeholder="Password123"
                />
              </TextField>

              <Button type="submit" size={"lg"} variant={"default"}>
                Submit
              </Button>
            </form>
            <div>
              {result.success && result.message}
              <p class="text-red-400">{!result.success && result.message}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
