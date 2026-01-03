export default function AboutPage() {
  return (
    <div className="space-y-6">
      <section className="section pb-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
          About
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
          I work at the intersection of computer vision, sensor fusion &amp; IoT,
          XR/motion capture, and computational media, building systems that connect
          embodied perception with artistic practice.
        </p>
      </section>

      <section className="section pt-0 space-y-4">
        <h2 className="section-title">Short Bio</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-200 max-w-3xl">
          I am an MFA candidate in Interdisciplinary Media Arts at Arizona State
          University, with a background in graphic design and an M.A. in Photography
          (Media &amp; Image Theory) from Tehran University of Art. My current work
          focuses on embodied perception systems: low-cost sensor fusion platforms,
          motion capture tools, and AI-driven installations.
        </p>
      </section>

      <section className="section pt-0 space-y-4">
        <h2 className="section-title">Story</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-200 max-w-3xl">
          I grew up in a small village in central Iran, where my first experience with
          computers came through borrowed time on a banking terminal. This curiosity
          led me to astronomy internships and late nights at an observatory, capturing
          celestial images and learning to reason about distance and motion.
        </p>
        <p className="text-sm text-neutral-700 dark:text-neutral-200 max-w-3xl">
          Structural constraints and the need to avoid compulsory military service
          eventually pushed me away from a conventional STEM path. I turned to visual
          practice, studying graphic design and later completing an M.A. in Photography
          focused on media and image theory. My thesis examined how representations of
          the natural world in eco-art shape perception over time.
        </p>
        <p className="text-sm text-neutral-700 dark:text-neutral-200 max-w-3xl">
          At ASU, I began to formalize a long-standing interest in computation.
          Coursework in programming, IoT, deep learning, and computer vision, combined
          with collaborative lab work, gave me the tools to build embodied systems:
          open-source motion capture (Mesquite MoCap), solar-powered environmental
          stations (Opuntia), and multi-phone 3D capture rigs.
        </p>
      </section>

      <section className="section pt-0 space-y-3">
        <h2 className="section-title">Now &amp; Next</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-200 max-w-3xl">
          I am currently completing my MFA at ASU and preparing PhD applications in
          Media Arts &amp; Sciences / Computational Media. I am especially interested
          in embodied and agentic AI: sensing and perception systems that support
          robust action and interaction outside controlled lab conditions.
        </p>
      </section>

      <section id="cv-contact" className="section pt-0 space-y-4">
        <h2 className="section-title">CV &amp; Contact</h2>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            Download CV
          </h3>
          <a
            href="/Danyal_Khorami_CV.pdf"
            className="inline-flex items-center rounded-full bg-accent text-white px-4 py-2 text-xs font-medium hover:opacity-90"
          >
            Download PDF
          </a>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-2xl">
            The PDF includes full lists of coursework, exhibitions, technical skills,
            and fellowships.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            Contact
          </h3>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:dkhorami@asu.edu"
              className="text-accent hover:underline"
            >
              dkhorami@asu.edu
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
