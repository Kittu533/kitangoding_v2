import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Rekalur",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginAliasPage() {
  redirect("/admin/login");
}
