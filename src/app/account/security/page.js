import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import FormField from "@/components/primitives/FormField";
import Button from "@/components/primitives/Button";

const HISTORY = [
  { date: "2026-05-08 09:14 ET", device: "MacBook · Safari", location: "Austin, TX" },
  { date: "2026-05-04 19:42 ET", device: "iPhone · Mobile Safari", location: "Austin, TX" },
  { date: "2026-04-29 14:08 ET", device: "iPad · Safari", location: "Greenwich, CT" },
];

export default function SecurityPage() {
  return (
    <div>
      <Eyebrow>Security</Eyebrow>
      <h1 className="font-display mt-3 text-4xl">Security.</h1>

      <section className="mt-10 max-w-xl border-t border-ink/10 pt-10">
        <h2 className="font-display text-2xl">Change password</h2>
        <form className="mt-6 space-y-5">
          <FormField label="Current password">
            <Input type="password" />
          </FormField>
          <FormField label="New password">
            <Input type="password" />
          </FormField>
          <FormField label="Confirm new password">
            <Input type="password" />
          </FormField>
          <Button variant="primary" type="submit">
            Update Password
          </Button>
        </form>
      </section>

      <section className="mt-16 border-t border-ink/10 pt-10">
        <h2 className="font-display text-2xl">Sign-in history</h2>
        <div className="mt-6 overflow-hidden border border-ink/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-bone text-xs tracking-[0.15em] uppercase">
              <tr>
                <th className="px-5 py-3">When</th>
                <th className="px-5 py-3">Device</th>
                <th className="px-5 py-3">Location</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((h, i) => (
                <tr key={i} className="border-t border-ink/10">
                  <td className="px-5 py-4">{h.date}</td>
                  <td className="px-5 py-4 text-taupe">{h.device}</td>
                  <td className="px-5 py-4 text-taupe">{h.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button variant="destructive" className="mt-6">
          Sign Out Everywhere
        </Button>
      </section>
    </div>
  );
}
