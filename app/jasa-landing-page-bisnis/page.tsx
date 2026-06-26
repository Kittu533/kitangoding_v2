import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/templates/ServiceLandingPage";
import {
  createServiceLandingMetadata,
  getServiceLandingPage,
} from "@/lib/service-landing-pages";

const page = getServiceLandingPage("/jasa-landing-page-bisnis")!;

export const metadata: Metadata = createServiceLandingMetadata(page);

export default function Page() {
  return <ServiceLandingPage page={page} />;
}
