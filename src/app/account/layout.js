import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/layout/AccountSidebar";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";

export default function AccountLayout({ children }) {
  return (
    <>
      <Header tone="light" />
      <main className="flex-1">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Account" }]}
        />
        <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-12 md:px-10">
          <AccountSidebar />
          <div className="md:col-span-9">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
