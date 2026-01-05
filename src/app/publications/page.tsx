export default function PublicationsPage() {
  return (
    <div className="space-y-6">
      <section className="section pb-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
          Selected Publications
        </h1>
      </section>

<section className="section pt-0">
  <h2 className="section-title">Publications &amp; Manuscripts</h2>

  <ul className="list-disc pl-4 text-sm space-y-2">
    <li>
      <a
        href="https://arxiv.org/abs/2512.22690"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:opacity-80"
      >
        Mesquite MoCap: Democratizing Real-Time Motion Capture with Affordable,
        Open-Source, Networked IMU Hardware and WebXR
      </a>
      . (co-author, submitted to IEEE Journal of IoT; arXiv:2512.22690).
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
            MFA Thesis text for <em>To Wilt</em> (in progress) - installation
            exploring LLMs, love, and environmental change.
          </li>
        </ul>
      </section>

      <section className="section pt-0">
        <h2 className="section-title">Talks</h2>
        <ul className="list-disc pl-4 text-sm space-y-2">
          <li>
            Artist Talk, ASU Herberger Institute for Design and the Arts - Spring
            2024.
          </li>
          <li>
            Artist Talk, ASU Herberger Institute for Design and the Arts - Fall
            2025.
          </li>
        </ul>
      </section>
    </div>
  );
}
