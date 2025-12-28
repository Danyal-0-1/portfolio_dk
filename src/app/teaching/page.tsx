export default function TeachingPage() {
  return (
    <div className="space-y-6">
      <section className="section pb-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
          Teaching
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Teaching experience across photography and digital media, combining
          technical skills with critical discussion and experimental practice.
        </p>
      </section>

      <section className="section pt-0">
        <h2 className="section-title">Courses as Instructor of Record</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="text-left py-2 pr-4 font-medium">Course</th>
                <th className="text-left py-2 pr-4 font-medium">Role</th>
                <th className="text-left py-2 pr-4 font-medium">Term</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <td className="py-2 pr-4">ART 122 – Introduction to Photography II</td>
                <td className="py-2 pr-4">Instructor of Record</td>
                <td className="py-2 pr-4">Fall 2025; Spring 2026 (two sections)</td>
              </tr>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <td className="py-2 pr-4">ART 310 – Landscape Photography</td>
                <td className="py-2 pr-4">Instructor of Record</td>
                <td className="py-2 pr-4">Fall 2025</td>
              </tr>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <td className="py-2 pr-4">ART 121 – Introduction to Photography I</td>
                <td className="py-2 pr-4">Instructor of Record</td>
                <td className="py-2 pr-4">Spring 2025</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">ART 116 – Intro to Digital Media</td>
                <td className="py-2 pr-4">Instructor of Record</td>
                <td className="py-2 pr-4">
                  Spring 2024; Summer 2025 (two sections)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section pt-0">
        <h2 className="section-title">Graduate RA &amp; TA</h2>
        <ul className="list-disc pl-4 text-sm space-y-2">
          <li>
            Northlight Gallery: curation, installation, collection handling, public
            programs.
          </li>
          <li>
            TA for introductory photography courses: demos, critiques, feedback, and
            lab support.
          </li>
        </ul>
      </section>
    </div>
  );
}
