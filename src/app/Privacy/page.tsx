import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Asian School of Hospitality Arts",
  description:
    "How the Asian School of Hospitality Arts collects, uses, protects, and respects your personal information.",
};

const contents = [
  { id: "who-we-are", label: "Who we are" },
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use-information", label: "How we use information" },
  { id: "legal-bases", label: "Legal bases" },
  { id: "sharing-information", label: "Sharing information" },
  { id: "cookies", label: "Cookies and analytics" },
  { id: "storage-security", label: "Storage and security" },
  { id: "retention", label: "Retention" },
  { id: "your-rights", label: "Your privacy rights" },
  { id: "children", label: "Children and minors" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

const principles = [
  {
    title: "Transparent",
    text: "We explain what information is collected and why it is needed.",
  },
  {
    title: "Protected",
    text: "We apply appropriate safeguards to personal information under our care.",
  },
  {
    title: "Purposeful",
    text: "We use personal information only for legitimate, declared purposes.",
  },
];

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 md:gap-4">
      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#921A1B]/10 md:h-6 md:w-6">
        <div className="h-1.5 w-1.5 rounded-full bg-[#921A1B] md:h-2 md:w-2" />
      </div>
      <p className="flex-1">{children}</p>
    </div>
  );
}

function SectionTitle({
  id,
  number,
  title,
}: {
  id: string;
  number: string;
  title: string;
}) {
  return (
    <div id={id} className="mb-4 flex scroll-mt-28 items-center gap-3 md:mb-5">
      <span className="font-jost text-sm font-semibold tracking-[0.18em] text-[#921A1B]">
        {number}
      </span>
      <div className="h-6 w-1 bg-[#921A1B] md:h-8" />
      <h2 className="font-jost text-2xl font-semibold leading-tight text-black sm:text-3xl md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <section className="w-full bg-white">
        <div className="group relative h-[clamp(220px,46vh,480px)] w-full overflow-hidden">
          <Image
            src="/Landing/About/3.png"
            alt="Asian School of Hospitality Arts campus"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 25px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.1) 70px)",
              }}
            />
          </div>
        </div>

        <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#921A1B] via-[#9e2a2b] to-[#726E6E] py-4 md:py-5">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)",
              }}
            />
          </div>
          <div className="absolute -top-16 -left-16 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          <div className="relative z-10 px-5 text-center md:px-6">
            <h1 className="font-jost text-3xl font-semibold leading-tight tracking-wide text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-2xl font-jost text-sm text-white/90 sm:text-base md:text-lg lg:text-xl">
              Your privacy matters
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#921A1B]/10 px-4 py-1.5 font-jost text-xs font-medium tracking-wide text-[#921A1B] sm:text-sm">
              Effective: [Month Day, Year]
            </span>
            <span className="rounded-full border border-[#921A1B]/20 px-4 py-1.5 font-jost text-xs font-medium tracking-wide text-gray-600 sm:text-sm">
              Sample for legal review
            </span>
          </div>

          <div className="border-l-4 border-[#921A1B] pl-4 sm:pl-6 md:pl-8">
            <p className="font-jost text-sm font-semibold tracking-[0.16em] text-[#921A1B] uppercase">
              Our commitment
            </p>
            <h2 className="mt-2 font-jost text-2xl font-semibold leading-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Hospitality begins with{" "}
              <span className="text-[#921A1B]">trust.</span>
            </h2>
          </div>

          <div className="mt-6 max-w-4xl space-y-4 font-jost text-sm leading-relaxed text-black sm:text-base md:text-lg">
            <p>
              A clear guide to how the Asian School of Hospitality Arts may
              collect, use, protect, and respect your personal information.
            </p>
            <p>
              ASHA values the trust placed in us by prospective students,
              learners, parents, alumni, partners, employees, and website
              visitors. This sample policy explains the privacy practices
              intended for the ASHA website and related school services.
            </p>
          </div>

          <div className="mt-6 max-w-4xl border-l-4 border-[#921A1B]/40 bg-[#921A1B]/5 px-4 py-4 font-jost text-sm leading-relaxed text-gray-700 sm:px-5 sm:text-base">
            <span className="font-semibold text-[#921A1B]">Before publishing: </span>
            Have this sample reviewed by ASHA’s Data Protection Officer and
            legal counsel. Replace all bracketed text and verify the actual
            systems, cookies, providers, retention periods, and contact details
            used by the school.
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 md:mt-12 md:gap-6">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#921A1B]/10 bg-zinc-50 px-5 py-6 md:px-6 md:py-7"
              >
                <div className="mb-4 h-1 w-10 rounded-full bg-[#921A1B]" />
                <h3 className="font-jost text-xl font-semibold text-black md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 font-jost text-sm leading-relaxed text-gray-700 md:text-base">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14 lg:px-12">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav
              aria-label="Privacy policy contents"
              className="rounded-2xl border border-[#921A1B]/10 bg-white p-5 shadow-sm"
            >
              <p className="font-jost text-sm font-semibold tracking-[0.16em] text-[#921A1B] uppercase">
                On this page
              </p>
              <ol className="mt-4 space-y-2">
                {contents.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex gap-3 font-jost text-sm text-gray-700 transition-colors hover:text-[#921A1B]"
                    >
                      <span className="w-6 shrink-0 font-semibold text-[#921A1B]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-12 font-jost text-sm leading-relaxed text-black sm:text-base md:space-y-14 md:text-lg">
            <section>
              <SectionTitle id="who-we-are" number="01" title="Who we are" />
              <div className="space-y-4">
                <p>
                  The Asian School of Hospitality Arts (“ASHA,” “we,” “us,” or
                  “our”) provides hospitality and culinary education and related
                  services in the Philippines. For activities covered by this
                  policy, ASHA acts as the personal information controller
                  unless another notice says otherwise.
                </p>
                <p>
                  Official school and Data Protection Officer details should be
                  inserted here before publication:{" "}
                  <strong>
                    [legal entity name, registered address, and DPO registration
                    or contact details].
                  </strong>
                </p>
              </div>
            </section>

            <section>
              <SectionTitle
                id="information-we-collect"
                number="02"
                title="Information we collect"
              />
              <div className="space-y-4">
                <p>
                  The information we collect depends on how you interact with
                  ASHA. It may include:
                </p>
                <div className="space-y-4">
                  <Bullet>
                    <strong>Identity and contact details,</strong> such as your
                    name, address, email address, phone number, date of birth,
                    and government-issued identifiers when required.
                  </Bullet>
                  <Bullet>
                    <strong>Inquiry and application details,</strong> including
                    your preferred program, educational background, application
                    materials, interview notes, and communications with us.
                  </Bullet>
                  <Bullet>
                    <strong>Student and education records,</strong> such as
                    enrollment information, attendance, grades, assessments,
                    payment status, certificates, and school activity records.
                  </Bullet>
                  <Bullet>
                    <strong>Website and device information,</strong> such as IP
                    address, browser type, pages visited, referral source, and
                    cookie identifiers.
                  </Bullet>
                  <Bullet>
                    <strong>Other information you choose to provide,</strong>{" "}
                    including messages, feedback, event registrations, photos,
                    or documents.
                  </Bullet>
                </div>
                <p>
                  Please provide only information that is accurate, relevant,
                  and necessary for your request.
                </p>
              </div>
            </section>

            <section>
              <SectionTitle
                id="how-we-use-information"
                number="03"
                title="How we use information"
              />
              <div className="space-y-4">
                <p>We may use personal information to:</p>
                <div className="space-y-4">
                  <Bullet>
                    respond to inquiries and provide information about ASHA
                    programs, admissions, tuition, events, and services;
                  </Bullet>
                  <Bullet>
                    process applications, enrollment, student services, academic
                    requirements, assessments, records, and certifications;
                  </Bullet>
                  <Bullet>
                    manage payments, scholarships, financial assistance, and
                    related administrative obligations;
                  </Bullet>
                  <Bullet>
                    operate, secure, maintain, and improve our website,
                    facilities, learning platforms, and communications;
                  </Bullet>
                  <Bullet>
                    meet legal, regulatory, accreditation, audit, health,
                    safety, and recordkeeping requirements; and
                  </Bullet>
                  <Bullet>
                    send relevant updates or marketing communications where
                    allowed, with a way to opt out.
                  </Bullet>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle
                id="legal-bases"
                number="04"
                title="Legal bases for processing"
              />
              <div className="space-y-4">
                <p>
                  Depending on the activity, we process personal information
                  based on your consent, the performance of a contract or steps
                  requested before a contract, compliance with a legal
                  obligation, protection of vital interests, fulfillment of a
                  public or regulatory function, or ASHA’s legitimate interests
                  when these do not override your rights.
                </p>
                <p>
                  Where sensitive personal information is involved, we rely only
                  on a basis permitted by the Data Privacy Act of 2012 and other
                  applicable law.
                </p>
              </div>
            </section>

            <section>
              <SectionTitle
                id="sharing-information"
                number="05"
                title="When we share information"
              />
              <div className="space-y-4">
                <p>
                  We do not sell personal information. We may share only what is
                  reasonably necessary with:
                </p>
                <div className="space-y-4">
                  <Bullet>
                    authorized ASHA personnel and faculty who need the
                    information for their work;
                  </Bullet>
                  <Bullet>
                    service providers supporting hosting, learning systems,
                    payments, communications, security, analytics, or records
                    management under appropriate safeguards;
                  </Bullet>
                  <Bullet>
                    government agencies, regulators, accreditation bodies,
                    banks, internship partners, or other institutions when
                    required or appropriately authorized; and
                  </Bullet>
                  <Bullet>
                    professional advisers, emergency responders, or law
                    enforcement where permitted or required by law.
                  </Bullet>
                </div>
                <p>
                  If information is transferred outside the Philippines, ASHA
                  should confirm that appropriate contractual, organizational,
                  and technical safeguards are in place.
                </p>
              </div>
            </section>

            <section>
              <SectionTitle
                id="cookies"
                number="06"
                title="Cookies and analytics"
              />
              <div className="space-y-4">
                <div className="border-l-4 border-[#921A1B]/40 bg-white px-4 py-4 text-gray-700 sm:px-5">
                  <span className="font-semibold text-[#921A1B]">
                    Website note:{" "}
                  </span>
                  This section must be matched to the cookies and analytics
                  tools actually enabled on asha.edu.ph.
                </div>
                <p>
                  Our website may use essential cookies to function and optional
                  cookies to understand site performance or remember
                  preferences. Where required, we ask for consent before setting
                  non-essential cookies. You can manage cookies through the
                  site’s consent controls, if available, and through your
                  browser settings.
                </p>
                <p>
                  Disabling some cookies may affect certain website features. A
                  current cookie inventory, provider list, duration, and purpose
                  should be added here or linked in a separate cookie notice.
                </p>
              </div>
            </section>

            <section>
              <SectionTitle
                id="storage-security"
                number="07"
                title="Storage and security"
              />
              <div className="space-y-4">
                <p>
                  ASHA uses reasonable and appropriate organizational, physical,
                  and technical measures designed to protect personal
                  information from accidental or unlawful destruction,
                  alteration, disclosure, misuse, and unauthorized access.
                  Measures may include access controls, staff confidentiality
                  duties, secure backups, system monitoring, and vendor reviews.
                </p>
                <p>
                  No system can guarantee absolute security. If a personal data
                  breach creates a material risk, ASHA will assess, document,
                  contain, and notify affected individuals and the National
                  Privacy Commission when required.
                </p>
              </div>
            </section>

            <section>
              <SectionTitle
                id="retention"
                number="08"
                title="How long we keep information"
              />
              <div className="space-y-4">
                <p>
                  We retain personal information only for as long as necessary
                  for the purpose for which it was collected, to maintain
                  legitimate school and academic records, to resolve disputes,
                  and to meet legal, regulatory, audit, and contractual
                  requirements.
                </p>
                <p>
                  Before publication, ASHA should insert or link its approved
                  retention schedule, including the periods for inquiries,
                  unsuccessful applications, student records, finance records,
                  CCTV, website logs, and marketing preferences:{" "}
                  <strong>[insert verified retention periods]</strong>.
                </p>
              </div>
            </section>

            <section>
              <SectionTitle
                id="your-rights"
                number="09"
                title="Your privacy rights"
              />
              <div className="space-y-4">
                <p>
                  Subject to the conditions and exceptions under Philippine law,
                  you may have the right to be informed, object to processing,
                  access your personal information, correct inaccurate data,
                  request erasure or blocking, obtain data portability, seek
                  damages, and file a complaint with the National Privacy
                  Commission.
                </p>
                <p>
                  To exercise a right, contact ASHA’s Data Protection Officer
                  using the details below. We may need to verify your identity
                  and clarify your request. We will respond within the period
                  required by applicable law.
                </p>
              </div>
            </section>

            <section>
              <SectionTitle
                id="children"
                number="10"
                title="Children and minors"
              />
              <div className="space-y-4">
                <p>
                  Some ASHA applicants or students may be minors. We process
                  their information with added care and obtain parent or
                  guardian involvement or consent where required. Parents and
                  guardians should help minors understand safe and responsible
                  disclosure of personal information.
                </p>
                <p>
                  If you believe a minor provided information without
                  appropriate authorization, please contact us so we can review
                  and take suitable action.
                </p>
              </div>
            </section>

            <section>
              <SectionTitle
                id="changes"
                number="11"
                title="Changes to this policy"
              />
              <p>
                We may update this policy when our practices, services, or
                legal obligations change. The latest version will be posted on
                this page with a revised effective date. For significant
                changes, we may provide an additional notice through appropriate
                ASHA channels.
              </p>
            </section>

            <section>
              <SectionTitle id="contact" number="12" title="Contact us" />
              <div className="space-y-4">
                <p>
                  Questions, concerns, or privacy-rights requests should be
                  directed to ASHA’s official Data Protection Officer.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#921A1B]/10 bg-white px-5 py-5">
                    <p className="text-xs font-semibold tracking-[0.14em] text-[#921A1B] uppercase">
                      Data Protection Officer
                    </p>
                    <p className="mt-2 text-sm font-semibold text-black md:text-base">
                      [dpo@asha.edu.ph — confirm before publishing]
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#921A1B]/10 bg-white px-5 py-5">
                    <p className="text-xs font-semibold tracking-[0.14em] text-[#921A1B] uppercase">
                      Mailing address
                    </p>
                    <p className="mt-2 text-sm font-semibold text-black md:text-base">
                      [Insert ASHA legal address and DPO office]
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#921A1B]/10 bg-white px-5 py-5">
                    <p className="text-xs font-semibold tracking-[0.14em] text-[#921A1B] uppercase">
                      Admissions contact
                    </p>
                    <a
                      href="tel:+639396334548"
                      className="mt-2 inline-block text-sm font-semibold text-black hover:text-[#921A1B] md:text-base"
                    >
                      +63 939 633 4548
                    </a>
                  </div>
                </div>
                <p>
                  You may also contact the National Privacy Commission through
                  its official website if you believe your privacy rights have
                  been violated.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-[#921A1B] via-[#9e2a2b] to-[#726E6E] py-12 text-white md:py-16">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center md:px-8 lg:px-12">
          <div>
            <p className="font-jost text-sm font-semibold tracking-[0.16em] text-white/80 uppercase">
              Questions about your data?
            </p>
            <h2 className="mt-2 font-jost text-3xl font-semibold md:text-4xl">
              We’re here to help.
            </h2>
            <p className="mt-2 max-w-xl font-jost text-sm text-white/90 md:text-base">
              Contact ASHA so the appropriate team can review your privacy
              concern.
            </p>
          </div>
          <Link
            href="mailto:admission@asha.edu.ph"
            className="inline-flex items-center rounded-full bg-white px-6 py-3 font-jost text-base font-medium text-[#921A1B] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            Contact ASHA
          </Link>
        </div>
      </section>
    </div>
  );
}
