import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import ChartCard from "@/components/admin/ChartCard";
import Button from "@/components/primitives/Button";
import Select from "@/components/primitives/Select";

export const metadata = { title: "Reports · Admin" };

const REPORTS = [
  { title: "Revenue", value: "$1.42M", delta: "+18.2% YoY", hint: "All-time" },
  { title: "Orders", value: "2,184", delta: "+12.0%", hint: "All-time" },
  { title: "Avg Order Value", value: "$3,420", delta: "+5.4%", hint: "Last 90d" },
  { title: "Returns Rate", value: "2.3%", delta: "-0.4pp", hint: "Last 90d" },
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reports"
        title="Performance"
        subtitle="At-a-glance metrics with drill-downs"
        actions={
          <>
            <Select className="!py-2 max-w-[180px]">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
              <option>All time</option>
            </Select>
            <Button variant="secondary" size="sm">
              Export CSV
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {REPORTS.map((r) => (
          <StatCard
            key={r.title}
            label={r.title}
            value={r.value}
            delta={r.delta}
            hint={r.hint}
          />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ChartCard title="Revenue · Daily" subtitle="Last 30 days" />
        <ChartCard title="AOV · Trend" subtitle="Last 30 days" />
        <ChartCard title="Top Products" subtitle="By revenue" />
        <ChartCard title="Customer Cohorts" subtitle="Retention by month joined" />
      </div>
    </>
  );
}
