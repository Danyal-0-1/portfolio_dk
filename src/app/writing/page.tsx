export default function WritingPage() {
  return (
    <div className="space-y-6">
      <section className="section pb-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
          Writing &amp; Talks
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Selected publications, theses, and talks at the intersection of media
          theory, computational systems, and embodied perception.
        </p>
      </section>

      <section className="section pt-0">
        <h2 className="section-title">Publications &amp; Manuscripts</h2>
        <ul className="list-disc pl-4 text-sm space-y-2">
          <li>
            Mesquite MoCap: Democratizing Real-Time Motion Capture with Affordable,
            Open-Source, Networked IMU Hardware and WebXR. (co-author, manuscript
            under review).
          </li>
        </ul>
      </section>

      <section className="section pt-0">
        <h2 className="section-title">Theses &amp; Long-form</h2>
        <ul className="list-disc pl-4 text-sm space-y-2">
          <li>
            <strong>M.A. Thesis:</strong> A Study and Analysis on the Place of
            Photography in Eco-Art (Tehran University of Art, 2023).
          </li>
          <li>
            MFA Thesis text for <em>To Wilt</em> (in progress) – installation
            exploring LLMs, love, and environmental change.
          </li>
        </ul>
      </section>

      <section className="section pt-0">
        <h2 className="section-title">Talks</h2>
        <ul className="list-disc pl-4 text-sm space-y-2">
          <li>
            Artist Talk, ASU Herberger Institute for Design and the Arts – Spring
            2024.
          </li>
          <li>
            Artist Talk, ASU Herberger Institute for Design and the Arts – Fall
            2025.
          </li>
        </ul>
      </section>
    </div>
  );
}
