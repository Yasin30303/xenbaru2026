import SignInPage from "@/features/auth/sign-in-view";
import { requireUnauth } from "@/lib/auth-utils";

export default async function Page() {
  await requireUnauth();

  return <SignInPage />;
}
