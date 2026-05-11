"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StepIndicator from "@/components/checkout/StepIndicator";
import OrderSummary from "@/components/checkout/OrderSummary";
import Button from "@/components/primitives/Button";
import Input from "@/components/primitives/Input";
import Select from "@/components/primitives/Select";
import Checkbox from "@/components/primitives/Checkbox";
import Radio from "@/components/primitives/Radio";
import FormField from "@/components/primitives/FormField";
import Eyebrow from "@/components/feedback/Eyebrow";
import DeliverySchedulerModal from "@/components/modals/DeliverySchedulerModal";

const STEPS = [
  { key: "address", label: "Address" },
  { key: "delivery", label: "Delivery" },
  { key: "payment", label: "Payment" },
  { key: "review", label: "Review" },
];

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutSkeleton() {
  return (
    <section className="mx-auto w-full max-w-screen-2xl px-6 py-20 md:px-10">
      <div className="h-2 w-full bg-bone animate-pulse" />
      <div className="mt-12 h-64 w-full bg-bone/60 animate-pulse" />
    </section>
  );
}

function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepKey = searchParams.get("step") || "address";
  const stepIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.key === stepKey)
  );
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const [window, setWindow] = useState(null);
  const [delivery, setDelivery] = useState("white-glove");
  const [payment, setPayment] = useState("card");

  const goto = (idx) =>
    router.push(`/checkout?step=${STEPS[idx].key}`, { scroll: true });

  return (
    <>
      <section className="mx-auto w-full max-w-screen-2xl px-6 pt-10 md:px-10">
        <StepIndicator steps={STEPS} current={stepIndex} />
      </section>

      <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-12 px-6 py-10 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          {stepKey === "address" && <AddressStep onContinue={() => goto(1)} />}
          {stepKey === "delivery" && (
            <DeliveryStep
              delivery={delivery}
              setDelivery={setDelivery}
              window={window}
              onSchedule={() => setSchedulerOpen(true)}
              onContinue={() => goto(2)}
              onBack={() => goto(0)}
            />
          )}
          {stepKey === "payment" && (
            <PaymentStep
              payment={payment}
              setPayment={setPayment}
              onContinue={() => goto(3)}
              onBack={() => goto(1)}
            />
          )}
          {stepKey === "review" && (
            <ReviewStep
              window={window}
              delivery={delivery}
              payment={payment}
              onBack={() => goto(2)}
              onPlace={() => router.push("/checkout/confirmation")}
            />
          )}
        </div>
        <OrderSummary />
      </section>

      <DeliverySchedulerModal
        open={schedulerOpen}
        onClose={() => setSchedulerOpen(false)}
        onConfirm={(w) => setWindow(w)}
      />
    </>
  );
}

function AddressStep({ onContinue }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
    >
      <Eyebrow>Step 1 of 4</Eyebrow>
      <h1 className="font-display mt-3 text-3xl">Shipping address</h1>
      <div className="mt-8 grid grid-cols-1 gap-5">
        <FormField label="Email">
          <Input type="email" required placeholder="you@example.com" />
        </FormField>
        <Checkbox label="Subscribe to the Firman journal" />
        <hr className="border-t border-ink/10 my-2" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label="First name">
            <Input required />
          </FormField>
          <FormField label="Last name">
            <Input required />
          </FormField>
        </div>
        <FormField label="Address">
          <Input required placeholder="Street address" />
        </FormField>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <FormField label="City">
            <Input required />
          </FormField>
          <FormField label="State">
            <Select>
              <option>State</option>
              <option>NY</option>
              <option>CT</option>
              <option>TX</option>
              <option>CA</option>
            </Select>
          </FormField>
          <FormField label="ZIP">
            <Input required maxLength={5} />
          </FormField>
        </div>
        <FormField label="Phone">
          <Input type="tel" />
        </FormField>
        <Checkbox label="Use this address for billing too" defaultChecked />
      </div>
      <div className="mt-10 flex justify-end">
        <Button type="submit" variant="primary">
          Continue to Delivery
        </Button>
      </div>
    </form>
  );
}

function DeliveryStep({
  delivery,
  setDelivery,
  window,
  onSchedule,
  onContinue,
  onBack,
}) {
  return (
    <div>
      <Eyebrow>Step 2 of 4</Eyebrow>
      <h1 className="font-display mt-3 text-3xl">Delivery method</h1>
      <div className="mt-8 space-y-4">
        <label
          className={
            "block border p-6 cursor-pointer " +
            (delivery === "white-glove"
              ? "border-ink bg-bone"
              : "border-ink/20")
          }
        >
          <Radio
            id="dm-wg"
            name="delivery"
            checked={delivery === "white-glove"}
            onChange={() => setDelivery("white-glove")}
            label={
              <span className="ml-1">
                <span className="font-display block text-xl">
                  White-Glove Delivery
                </span>
                <span className="text-taupe block text-sm">
                  Two-person crew · in-room placement · packaging removed
                </span>
                <span className="block mt-2 text-sm">Included</span>
              </span>
            }
          />
        </label>
        <label
          className={
            "block border p-6 cursor-pointer " +
            (delivery === "standard"
              ? "border-ink bg-bone"
              : "border-ink/20")
          }
        >
          <Radio
            id="dm-std"
            name="delivery"
            checked={delivery === "standard"}
            onChange={() => setDelivery("standard")}
            label={
              <span className="ml-1">
                <span className="font-display block text-xl">
                  Standard Delivery
                </span>
                <span className="text-taupe block text-sm">
                  Curbside · 5–7 business days
                </span>
                <span className="block mt-2 text-sm">Free</span>
              </span>
            }
          />
        </label>
      </div>

      {delivery === "white-glove" && (
        <div className="mt-8 border border-ink/10 bg-bone/30 p-6">
          <Eyebrow>Delivery Window</Eyebrow>
          {window ? (
            <p className="mt-3">
              {new Date(window.day).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}{" "}
              · {window.window}
            </p>
          ) : (
            <p className="text-taupe mt-3 text-sm">
              Select a delivery date and time window.
            </p>
          )}
          <button
            type="button"
            onClick={onSchedule}
            className="mt-3 text-xs tracking-[0.2em] uppercase text-brass-deep underline underline-offset-4 hover:text-ink"
          >
            {window ? "Change window" : "Schedule white-glove delivery"}
          </button>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" onClick={onContinue}>
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}

function PaymentStep({ payment, setPayment, onContinue, onBack }) {
  return (
    <div>
      <Eyebrow>Step 3 of 4</Eyebrow>
      <h1 className="font-display mt-3 text-3xl">Payment</h1>
      <div className="mt-8 space-y-3">
        {[
          { value: "card", label: "Credit / debit card" },
          { value: "klarna", label: "Klarna · 4 interest-free payments" },
          { value: "affirm", label: "Affirm · monthly financing" },
        ].map((p) => (
          <label
            key={p.value}
            className={
              "block border p-5 cursor-pointer " +
              (payment === p.value ? "border-ink bg-bone" : "border-ink/20")
            }
          >
            <Radio
              id={`pm-${p.value}`}
              name="payment"
              checked={payment === p.value}
              onChange={() => setPayment(p.value)}
              label={p.label}
            />
          </label>
        ))}
      </div>

      {payment === "card" && (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-6">
          <FormField label="Card number" className="md:col-span-6">
            <Input placeholder="1234 5678 9012 3456" />
          </FormField>
          <FormField label="Expiration" className="md:col-span-2">
            <Input placeholder="MM/YY" />
          </FormField>
          <FormField label="CVC" className="md:col-span-2">
            <Input placeholder="123" />
          </FormField>
          <FormField label="ZIP" className="md:col-span-2">
            <Input placeholder="12345" />
          </FormField>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" onClick={onContinue}>
          Review Order
        </Button>
      </div>
    </div>
  );
}

function ReviewStep({ window, delivery, payment, onBack, onPlace }) {
  return (
    <div>
      <Eyebrow>Step 4 of 4</Eyebrow>
      <h1 className="font-display mt-3 text-3xl">Review & place order</h1>
      <div className="mt-8 space-y-4">
        <ReviewCard label="Shipping" body="Christian Genus · 127 West Loop Drive · Austin, TX 78703" />
        <ReviewCard
          label="Delivery"
          body={
            delivery === "white-glove" && window
              ? `White-glove · ${new Date(window.day).toLocaleDateString(
                  "en-US",
                  { weekday: "long", month: "long", day: "numeric" }
                )} · ${window.window}`
              : delivery === "white-glove"
                ? "White-glove · window pending"
                : "Standard · 5–7 business days"
          }
        />
        <ReviewCard
          label="Payment"
          body={
            payment === "card"
              ? "Visa ···· 4242"
              : payment === "klarna"
                ? "Klarna · 4 interest-free payments"
                : "Affirm · monthly financing"
          }
        />
      </div>
      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" onClick={onPlace}>
          Place Order
        </Button>
      </div>
    </div>
  );
}

function ReviewCard({ label, body }) {
  return (
    <div className="flex items-start justify-between gap-6 border border-ink/10 p-5">
      <div>
        <span className="block text-xs tracking-[0.2em] uppercase text-taupe">
          {label}
        </span>
        <p className="mt-1 text-sm">{body}</p>
      </div>
      <button className="shrink-0 text-xs tracking-[0.2em] uppercase text-brass-deep underline underline-offset-4 hover:text-ink">
        Edit
      </button>
    </div>
  );
}
