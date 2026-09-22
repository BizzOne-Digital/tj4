"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { submitRegistration } from "@/actions/public-forms";
import { formSubmissionSuccessCopy } from "@/lib/content/lions-copy";
import { FormSuccessPanel } from "@/components/forms/FormSuccessPanel";
import type { IProgram } from "@/models/schemas";

const fullSchema = z.object({
  parentName: z.string().min(2),
  parentEmail: z.string().email(),
  parentPhone: z.string().min(7),
  athleteName: z.string().min(2),
  athleteDob: z.string().min(4),
  grade: z.string().min(1),
  gender: z.string().optional(),
  school: z.string().optional(),
  programInterest: z.string().min(2),
  experienceLevel: z.string().optional(),
  preferredSession: z.string().optional(),
  medicalNotes: z.string().optional(),
  emergencyContact: z.string().min(2),
  emergencyPhone: z.string().min(7),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v, "Consent is required"),
});

type FormValues = z.infer<typeof fullSchema>;

const steps = [
  "Parent / Guardian",
  "Athlete",
  "Program",
  "Experience",
  "Emergency",
  "Consent",
];

export function RegistrationForm({ programs }: { programs: IProgram[] }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    defaultValues: { consent: false },
    mode: "onChange",
  });

  const fieldsByStep: (keyof FormValues)[][] = useMemo(
    () => [
      ["parentName", "parentEmail", "parentPhone"],
      ["athleteName", "athleteDob", "grade", "gender", "school"],
      ["programInterest"],
      ["experienceLevel", "preferredSession", "medicalNotes"],
      ["emergencyContact", "emergencyPhone", "message"],
      ["consent"],
    ],
    []
  );

  const next = async () => {
    const valid = await form.trigger(fieldsByStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    const result = await submitRegistration({ ...values, consent: true });
    if (result.ok) setDone(true);
    else setError(result.error || "Submission failed");
  });

  if (done) {
    return (
      <FormSuccessPanel
        title={formSubmissionSuccessCopy.title}
        body={formSubmissionSuccessCopy.body}
      />
    );
  }

  const { register, formState } = form;

  return (
    <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-4 sm:p-6 md:p-10">
      <div className="mb-6 flex flex-wrap gap-2 sm:mb-8 sm:gap-2">
        {steps.map((label, i) => (
          <div
            key={label}
            className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wide sm:px-3 sm:text-xs ${
              i === step ? "bg-electric text-white" : "bg-white/5 text-steel"
            }`}
          >
            {i + 1}. {label}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {step === 0 && (
          <>
            <Input label="Parent / Guardian Name" reg={register("parentName")} error={formState.errors.parentName?.message} />
            <Input label="Email" type="email" reg={register("parentEmail")} error={formState.errors.parentEmail?.message} />
            <Input label="Phone" reg={register("parentPhone")} error={formState.errors.parentPhone?.message} />
          </>
        )}
        {step === 1 && (
          <>
            <Input label="Athlete Name" reg={register("athleteName")} error={formState.errors.athleteName?.message} />
            <Input label="Date of Birth" type="date" reg={register("athleteDob")} error={formState.errors.athleteDob?.message} />
            <Input label="Grade" reg={register("grade")} error={formState.errors.grade?.message} />
            <Input label="Gender (optional)" reg={register("gender")} />
            <Input label="School" reg={register("school")} />
          </>
        )}
        {step === 2 && (
          <label className="block text-sm">
            <span className="mb-1 block text-steel">Program of Interest</span>
            <select {...register("programInterest")} className="field">
              <option value="">Select a program</option>
              {programs.map((p) => (
                <option key={p.slug} value={p.title}>
                  {p.title}
                </option>
              ))}
            </select>
            {formState.errors.programInterest && (
              <span className="text-xs text-red-400">{formState.errors.programInterest.message}</span>
            )}
          </label>
        )}
        {step === 3 && (
          <>
            <Input label="Experience Level" reg={register("experienceLevel")} />
            <Input label="Preferred Session" reg={register("preferredSession")} />
            <label className="block text-sm">
              <span className="mb-1 block text-steel">Medical Notes (optional)</span>
              <textarea {...register("medicalNotes")} className="field" rows={4} />
            </label>
          </>
        )}
        {step === 4 && (
          <>
            <Input label="Emergency Contact Name" reg={register("emergencyContact")} error={formState.errors.emergencyContact?.message} />
            <Input label="Emergency Contact Phone" reg={register("emergencyPhone")} error={formState.errors.emergencyPhone?.message} />
            <label className="block text-sm">
              <span className="mb-1 block text-steel">Additional Message</span>
              <textarea {...register("message")} className="field" rows={4} />
            </label>
          </>
        )}
        {step === 5 && (
          <label className="flex items-start gap-3 text-sm text-steel">
            <input type="checkbox" {...register("consent")} className="mt-1" />
            <span>
              I consent to Central PA Lions Academy storing this information for registration processing and communication.
            </span>
          </label>
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap">
          {step > 0 && (
            <Button type="button" variant="secondary" fullWidth onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button type="button" fullWidth onClick={next}>
              Continue
            </Button>
          ) : (
            <Button type="submit" fullWidth disabled={formState.isSubmitting}>
              {formState.isSubmitting ? "Submitting..." : "Submit Registration Inquiry"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  reg,
  error,
  type = "text",
}: {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reg: any;
  error?: string;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-steel">{label}</span>
      <input type={type} {...reg} className="field" />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
