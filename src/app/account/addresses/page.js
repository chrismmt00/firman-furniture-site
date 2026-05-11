import Eyebrow from "@/components/feedback/Eyebrow";
import Button from "@/components/primitives/Button";

const ADDRESSES = [
  {
    id: "a-1",
    label: "Home",
    name: "Christian Genus",
    street: "127 West Loop Drive",
    city: "Austin",
    state: "TX",
    zip: "78703",
    isDefault: true,
  },
  {
    id: "a-2",
    label: "Work",
    name: "Christian Genus",
    street: "1100 Congress Ave, Suite 400",
    city: "Austin",
    state: "TX",
    zip: "78701",
  },
];

export default function AddressesPage() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <Eyebrow>Saved Addresses</Eyebrow>
          <h1 className="font-display mt-3 text-4xl">Addresses.</h1>
        </div>
        <Button variant="primary">+ Add New</Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {ADDRESSES.map((a) => (
          <div key={a.id} className="border border-ink/10 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-taupe">
                  {a.label}
                </span>
                {a.isDefault && (
                  <span className="ml-2 bg-brass px-2 py-0.5 text-[10px] tracking-[0.2em] uppercase text-ink">
                    Default
                  </span>
                )}
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              {a.name}
              <br />
              {a.street}
              <br />
              {a.city}, {a.state} {a.zip}
            </p>
            <div className="mt-6 flex gap-3 text-xs tracking-[0.15em] uppercase">
              <button className="text-brass-deep underline underline-offset-4 hover:text-ink">
                Edit
              </button>
              <button className="text-brass-deep underline underline-offset-4 hover:text-ink">
                Delete
              </button>
              {!a.isDefault && (
                <button className="text-brass-deep underline underline-offset-4 hover:text-ink">
                  Set Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
