import orders from "@/lib/mock-data/orders.json";
import PageHeader from "@/components/admin/PageHeader";
import Toolbar from "@/components/admin/Toolbar";
import Select from "@/components/primitives/Select";
import { cn } from "@/lib/cn";

export const metadata = { title: "Delivery Schedule · Admin" };

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SLOTS = ["9–12", "12–3", "3–6"];
const CREWS = ["Crew A", "Crew B"];

export default function DeliverySchedulePage() {
  const wgOrders = orders.filter((o) => o.deliveryMethod === "white-glove");

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="White-Glove Delivery Schedule"
        subtitle="Drag orders into slots to assign. Filter by zone and crew."
      />
      <Toolbar>
        <div className="flex gap-3">
          <Select className="!py-2 max-w-[160px]">
            <option>All zones</option>
            <option>Northeast</option>
            <option>Mid-Atlantic</option>
            <option>Southeast</option>
          </Select>
          <Select className="!py-2 max-w-[160px]">
            <option>All crews</option>
            {CREWS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </div>
      </Toolbar>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <div className="overflow-x-auto border border-ink/10 bg-ivory">
            <table className="w-full text-left text-sm">
              <thead className="bg-bone text-[10px] tracking-[0.2em] uppercase">
                <tr>
                  <th className="px-4 py-3">Slot</th>
                  {DAYS.map((d) => (
                    <th key={d} className="px-4 py-3 text-center">
                      {d}
                      <span className="block text-[10px] text-taupe">
                        {12 + DAYS.indexOf(d)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SLOTS.map((slot, i) => (
                  <tr key={slot} className="border-t border-ink/10">
                    <td className="bg-bone/30 px-4 py-4 text-xs font-medium">
                      {slot}
                    </td>
                    {DAYS.map((d, di) => {
                      const order = wgOrders[(i + di) % wgOrders.length];
                      const filled = (i + di) % 3 === 0 && order;
                      return (
                        <td
                          key={d}
                          className={cn(
                            "border-l border-ink/10 px-2 py-2 align-top",
                            !filled && "bg-bone/10"
                          )}
                        >
                          {filled ? (
                            <div className="bg-ivory border-l-2 border-brass p-2 text-xs">
                              <p className="font-medium">{order.id}</p>
                              <p className="text-taupe">{order.customerName.split(" ")[0]}</p>
                              <p className="text-taupe text-[10px]">
                                {CREWS[di % 2]}
                              </p>
                            </div>
                          ) : (
                            <span className="text-taupe text-[10px]">
                              Available
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <aside className="lg:col-span-3">
          <div className="border border-ink/10 bg-ivory p-5">
            <span className="text-[10px] tracking-[0.2em] uppercase text-taupe">
              Unassigned
            </span>
            <ul className="mt-3 space-y-2">
              {wgOrders.slice(0, 3).map((o) => (
                <li
                  key={o.id}
                  className="cursor-grab border border-ink/10 bg-bone/30 p-3 text-xs"
                >
                  <p className="font-medium">{o.id}</p>
                  <p className="text-taupe">{o.customerName}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 border border-ink/10 bg-ivory p-5 text-xs">
            <span className="text-[10px] tracking-[0.2em] uppercase text-taupe">
              Capacity Today
            </span>
            <p className="mt-2">
              <span className="text-ink font-medium">Crew A</span> · 4 of 6
            </p>
            <p>
              <span className="text-ink font-medium">Crew B</span> · 5 of 6
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
