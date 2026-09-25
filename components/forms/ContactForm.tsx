"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/actions/public-forms";
import { contactFormSuccessCopy } from "@/lib/content/lions-copy";
import { FormSuccessPanel } from "@/components/forms/FormSuccessPanel";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  inquiryType: z.string().min(2, "Select inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({
  showInquiryType = true,
  submitLabel = "Send Message",
  placeholders,
}: {
  showInquiryType?: boolean;
  submitLabel?: string;
  placeholders?: {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: showInquiryType ? undefined : { inquiryType: "general" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitContact(values);
    if (result.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  });

  if (status === "success") {
    return <FormSuccessPanel title={contactFormSuccessCopy.title} body={contactFormSuccessCopy.body} />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} className="field" placeholder={placeholders?.name} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register("email")} className="field" placeholder={placeholders?.email} />
        </Field>
      </div>
      <Field label="Phone" error={errors.phone?.message}>
        <input {...register("phone")} className="field" placeholder={placeholders?.phone} />
      </Field>
      {!showInquiryType && <input type="hidden" {...register("inquiryType")} />}
      <div className={showInquiryType ? "grid gap-4 md:grid-cols-2" : ""}>
        <Field label="Subject" error={errors.subject?.message}>
          <input {...register("subject")} className="field" placeholder={placeholders?.subject} />
        </Field>
        {showInquiryType ? (
          <Field label="Inquiry Type" error={errors.inquiryType?.message}>
            <select {...register("inquiryType")} className="field">
              <option value="">Select</option>
              <option value="registration">Registration</option>
              <option value="programs">Programs</option>
              <option value="donations">Donations</option>
              <option value="general">General</option>
            </select>
          </Field>
        ) : null}
      </div>
      <Field label="Message" error={errors.message?.message}>
        <textarea rows={5} {...register("message")} className="field" placeholder={placeholders?.message} />
      </Field>
      {status === "error" && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
      <Button type="submit" disabled={isSubmitting} fullWidth className="sm:w-auto">
        {isSubmitting ? "Sending..." : submitLabel}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-steel">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

// shared input styles via global class
export const fieldClass = "field";
