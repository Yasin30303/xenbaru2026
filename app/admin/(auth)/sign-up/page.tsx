import SignUpPage from "@/features/auth/sign-up-view";
import { requireUnauth } from "@/lib/auth-utils";

export default async function Page() {
  await requireUnauth();

  return <SignUpPage />;
}
