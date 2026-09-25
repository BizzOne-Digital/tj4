"use client";

import { useState } from "react";
import { submitNewsletter } from "@/actions/public-forms";
import { Button } from "@/components/ui/Button";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  return (
    <form
      className="flex w-full max-w-full flex-col gap-3 sm:flex-row"
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await submitNewsletter({ email });
        setStatus(result.ok ? "You're on the list!" : result.error || "Error");
        if (result.ok) setEmail("");
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email for academy updates"
        className="field min-w-0 flex-1 sm:max-w-[280px]"
      />
      <Button type="submit" fullWidth className="sm:w-auto">
        Subscribe
      </Button>
      {status && <p className="text-sm text-steel sm:w-full">{status}</p>}
    </form>
  );
}
