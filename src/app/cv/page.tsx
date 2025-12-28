export default function CvPage() {
  return (
    <div className="space-y-6">
      {/* <section className="section pb-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
          CV &amp; Contact
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
          A concise CV is available as a PDF; the sections below summarize key
          education, research, and teaching details.
        </p>
      </section> */}

      <section className="section pt-0 space-y-3">
        <h2 className="section-title">Download CV</h2>
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
      </section>

      <section className="section pt-0 space-y-3">
        <h2 className="section-title">Contact</h2>
        <p className="text-sm">
          Email:{" "}
          <a
            href="mailto:dkhorami@asu.edu"
            className="text-accent hover:underline"
          >
            dkhorami@asu.edu
          </a>
        </p>
      </section>
    </div>
  );
}
