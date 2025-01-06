"use client";

import FAQs from "@/components/landing/faqs";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Launch from "@/components/landing/launch";
import LoomSection from "@/components/landing/loom-section";
import Navbar from "@/components/landing/navbar";
import SpecialMessage from "@/components/landing/special-message";
import WelcomeContributors from "@/components/landing/welcome-contributors";
import WhySection from "@/components/landing/why-section";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhySection />
      <LoomSection />
      <Features />
      <Launch />
      <FAQs />
      <WelcomeContributors />
      <SpecialMessage />
      <Footer />
    </div>
  );
}
