import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import Eyebrow from "@/components/feedback/Eyebrow";

export const metadata = { title: "Privacy Policy · Firman Furniture" };

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-12 md:px-10">
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-24">
            <Eyebrow>Contents</Eyebrow>
            <ul className="mt-4 space-y-2 text-sm text-taupe">
              {[
                "Information We Collect",
                "How We Use It",
                "Cookies",
                "Third Parties",
                "Your Rights",
                "Contact",
              ].map((s) => (
                <li key={s}>
                  <a href={`#${s.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="hover:text-ink">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <article className="md:col-span-9">
          <Eyebrow>Privacy Policy</Eyebrow>
          <h1 className="font-display mt-3 text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-taupe mt-3 text-sm">Last updated · April 1, 2026</p>
          <div className="prose mt-10 max-w-none space-y-6 text-taupe">
            <Section id="information-we-collect" title="Information We Collect">
              We collect information you provide directly — name, email, shipping
              address, payment details — and limited automatically-collected
              information like browser type and pages visited.
            </Section>
            <Section id="how-we-use-it" title="How We Use It">
              To process orders, deliver pieces, send transactional and (with
              your consent) marketing emails, and improve our store.
            </Section>
            <Section id="cookies" title="Cookies">
              We use essential cookies for cart and account functionality, and
              optional analytics cookies to understand site use.
            </Section>
            <Section id="third-parties" title="Third Parties">
              Payment processors, shipping carriers, and analytics providers
              who handle data on our behalf under strict contracts.
            </Section>
            <Section id="your-rights" title="Your Rights">
              You may access, correct, or delete your data at any time by
              contacting privacy@firman.demo or through your account.
            </Section>
            <Section id="contact" title="Contact">
              Questions? privacy@firman.demo or write to our New Bedford
              headquarters.
            </Section>
          </div>
        </article>
      </section>
    </>
  );
}

function Section({ id, title, children }) {
  return (
    <div id={id} className="border-t border-ink/10 pt-8">
      <h2 className="font-display mb-3 text-2xl text-ink">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
