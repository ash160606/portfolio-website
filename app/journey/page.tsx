'use client';
import Vert from '@/components/Timeline';
import { Route, Home } from 'lucide-react';
import Link from 'next/link';

export default function JourneyPage() {
  //   const items: TimelineItem[] = [
  //     { title: 'Sep 2024', cardTitle: 'Started Undergrad at UBC' },
  //     { title: 'Jan 2025', cardTitle: 'Built Tidal Height Regression Model' },
  //     { title: 'Mar–Apr 2025', cardTitle: 'Built MNIST Binary Classifier' },
  //   ];

  return (
    <main className="min-h-screen flex flex-col px-6 pt-10 pb-6 animate-zoomIn">
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Left icon */}
        <Link href="/" className="absolute left-0">
          <div
            className="
        p-4 rounded-xl border border-border
        bg-muted/20 hover:bg-muted/30
        transition-transform duration-300
        hover:-translate-y-1 hover:scale-[1.02]
        active:scale-[0.99]
        hover:ring-2 hover:ring-red-800 hover:ring-offset-2 hover:ring-offset-background
        flex items-center justify-center
      "
            role="button"
            aria-label="Go to home"
          >
            <Home className="w-5 h-5" />
          </div>
        </Link>

        {/* Centered heading */}
        <h1 className="text-3xl font-bold text-orange-500 text-center">
          My Journey
        </h1>
      </div>

      <div className="mt-6 flex-1 min-h-0">
        <div className="h-full w-full rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-2xl shadow-black/20 p-6">
          <Vert />
        </div>
      </div>
    </main>
  );
}
