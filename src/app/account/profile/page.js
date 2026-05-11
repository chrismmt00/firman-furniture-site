import Eyebrow from "@/components/feedback/Eyebrow";
import Input from "@/components/primitives/Input";
import FormField from "@/components/primitives/FormField";
import Button from "@/components/primitives/Button";
import Checkbox from "@/components/primitives/Checkbox";

export default function ProfilePage() {
  return (
    <div>
      <Eyebrow>Profile</Eyebrow>
      <h1 className="font-display mt-3 text-4xl">Your details.</h1>

      <form className="mt-10 max-w-xl space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label="First name">
            <Input defaultValue="Christian" />
          </FormField>
          <FormField label="Last name">
            <Input defaultValue="Genus" />
          </FormField>
        </div>
        <FormField label="Email">
          <Input type="email" defaultValue="christian@firman.demo" />
        </FormField>
        <FormField label="Phone">
          <Input type="tel" defaultValue="+1 415 555 0101" />
        </FormField>
        <FormField label="Birthday">
          <Input type="date" />
        </FormField>

        <div>
          <Eyebrow>Style Preferences</Eyebrow>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              "Modern",
              "Heritage",
              "Coastal",
              "Industrial",
              "Mid-century",
              "Contemporary",
            ].map((s) => (
              <Checkbox key={s} label={s} id={`style-${s}`} />
            ))}
          </div>
        </div>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
