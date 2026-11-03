import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Kitangoding",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginAliasPage() {
  redirect("/admin/login");
}
