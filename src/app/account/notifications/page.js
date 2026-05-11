import Eyebrow from "@/components/feedback/Eyebrow";
import Placeholder from "@/components/feedback/Placeholder";

const SUBS = [
  {
    name: "Mayfair Dining Table",
    variant: "Walnut",
    since: "2026-04-12",
    channel: "Email",
  },
  {
    name: "Ascot Floor Lamp",
    variant: "Antique Brass",
    since: "2026-03-30",
    channel: "Email + SMS",
  },
];

export default function NotificationsPage() {
  return (
    <div>
      <Eyebrow>Notifications</Eyebrow>
      <h1 className="font-display mt-3 text-4xl">Back-in-stock alerts.</h1>
      <p className="text-taupe mt-3 max-w-xl text-sm">
        We'll notify you the moment any of these are restocked.
      </p>

      <div className="mt-10 overflow-hidden border border-ink/10">
        <table className="w-full text-left">
          <thead className="bg-bone text-xs tracking-[0.15em] uppercase">
            <tr>
              <th className="px-5 py-3">Item</th>
              <th className="px-5 py-3 hidden md:table-cell">Variant</th>
              <th className="px-5 py-3 hidden md:table-cell">Since</th>
              <th className="px-5 py-3">Channel</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {SUBS.map((s, i) => (
              <tr key={i} className="border-t border-ink/10">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Placeholder
                      ratio="1/1"
                      label=""
                      className="w-12 shrink-0"
                    />
                    <span className="font-display">{s.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-taupe hidden md:table-cell">
                  {s.variant}
                </td>
                <td className="px-5 py-4 text-taupe hidden md:table-cell text-sm">
                  {s.since}
                </td>
                <td className="px-5 py-4 text-sm">{s.channel}</td>
                <td className="px-5 py-4 text-right">
                  <button className="text-xs tracking-[0.2em] uppercase text-brass-deep underline underline-offset-4 hover:text-oxblood">
                    Unsubscribe
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
