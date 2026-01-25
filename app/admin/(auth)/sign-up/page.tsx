import SignUpPage from "@/features/auth/sign-up-view";
import { requireAuth } from "@/lib/auth-utils";

export default async function Page() {
  await requireAuth();

  return <SignUpPage />;
}
