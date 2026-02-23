'use client';

export default function JourneyPage() {
  return (
    <main className="min-h-screen px-6 py-10 animate-zoomIn">
      <h1 className="text-3xl font-bold">My Journey</h1>
      <p className="mt-2 text-muted-foreground">Timeline goes here.</p>

      {/* Later: timeline library component */}
      <div className="mt-8 h-[70vh] overflow-y-auto rounded-xl border border-border bg-card/40 p-6">
        <p className="text-muted-foreground">Scrollable timeline container…</p>
      </div>
    </main>
  );
}
