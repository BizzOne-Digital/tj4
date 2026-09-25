"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitTestimonial } from "@/actions/public-forms";

const schema = z.object({
  name: z.string().min(2),
  relationship: z.string().min(2),
  type: z.enum(["parent", "athlete", "alumni"]),
  content: z.string().min(20),
  rating: z.number().min(1).max(5),
});

type Values = z.infer<typeof schema>;

export function TestimonialSubmitForm() {
  const [msg, setMsg] = useState<string | null>(null);
  const { register, handleSubmit, formState, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 5, type: "parent" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitTestimonial(values);
    setMsg(result.ok ? result.message || "Submitted" : result.error || "Error");
    if (result.ok) reset();
  });

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-xl border border-white/10 p-4 sm:p-6">
      <h3 className="text-xl uppercase sm:text-2xl">Share Your Story</h3>
      <input {...register("name")} placeholder="Name" className="field" />
      <input {...register("relationship")} placeholder="Relationship to academy" className="field" />
      <select {...register("type")} className="field">
        <option value="parent">Parent</option>
        <option value="athlete">Athlete</option>
        <option value="alumni">Alumni</option>
      </select>
      <textarea {...register("content")} rows={5} placeholder="Your testimonial" className="field" />
      <input type="number" min={1} max={5} {...register("rating")} className="field" />
      {msg && <p className="text-sm text-steel">{msg}</p>}
      <Button type="submit" disabled={formState.isSubmitting} fullWidth className="sm:w-auto">
        Submit Testimonial
      </Button>
    </form>
  );
}
