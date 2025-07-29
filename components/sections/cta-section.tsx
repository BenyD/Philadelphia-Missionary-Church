"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Heart } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-white">
      <Container className="py-12 md:py-24 lg:py-32">
        <div className="relative isolate overflow-hidden bg-gray-900 px-4 md:px-6 py-16 md:py-24 text-center shadow-2xl rounded-2xl sm:rounded-3xl sm:px-16">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Join Our Community Today
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 md:mt-6 max-w-xl text-base md:text-lg/8 text-pretty text-gray-300 px-4 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Experience the love of Christ and become part of our growing family.
            Whether you're new to faith or a long-time believer, you're welcome
            here.
          </motion.p>
          <motion.div
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              className="rounded-md bg-white px-5 md:px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 group"
            >
              <Link href="/locations">
                <MapPin className="mr-2 h-4 w-4 group-hover:scale-105 transition-transform" />
                Locations
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-sm/6 font-semibold text-white hover:text-gray-100 hover:bg-white/10 transition-all duration-200 group"
            >
              <Link href="/prayer-request">
                <Heart className="mr-2 h-4 w-4 group-hover:scale-105 transition-transform" />
                Prayer Request
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Gradient from Bottom */}
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#church-red)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="church-red">
                <stop stopColor="#DC2626" />
                <stop offset={1} stopColor="#DC2626" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </Container>
    </section>
  );
}
