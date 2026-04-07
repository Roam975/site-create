"use client";

import { useState } from "react";
import { Hero } from "@/components/blocks/Hero";
import { PainEngine } from "@/components/blocks/PainEngine";
import { About } from "@/components/blocks/About";
import { Features } from "@/components/blocks/Features";
import { Philosophy } from "@/components/blocks/Philosophy";
import { Protocol } from "@/components/blocks/Protocol";
import { Portfolio } from "@/components/blocks/Portfolio";
import { Services } from "@/components/blocks/Services";
import { FAQ } from "@/components/blocks/FAQ";
import { Footer } from "@/components/blocks/Footer";
import { ScheduleModal } from "@/components/forms/ScheduleModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main id="main-content">
      <Hero />
      <PainEngine />
      <About />
      <Features />
      <Philosophy />
      <Protocol />
      <Portfolio />
      <Services onOpenModal={() => setModalOpen(true)} />
      <FAQ />
      <Footer onOpenModal={() => setModalOpen(true)} />
      <ScheduleModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
