import { Router } from "itty-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { Database } from "./types/supabase";

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

const temperatureSchema = z.object({
  location: z.number(),
  time: z.number(),
  temperature: z.number(),
});

const router = Router();

router.get("/api/cities", async (request, { SUPABASE_URL, SUPABASE_ANON_KEY }: Env) => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data } = await supabase.from("city").select("*");

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});

router.get("/api/cities/:id", async (request, { SUPABASE_URL, SUPABASE_ANON_KEY }: Env) => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data } = await supabase.from("city").select("*").eq("id", request.params.id);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});

router.get("/api/temperatures", async (request, { SUPABASE_URL, SUPABASE_ANON_KEY }: Env) => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data } = await supabase.from("temperature").select("*");

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});

router.post("/api/temperatures", async (request, { SUPABASE_URL, SUPABASE_ANON_KEY }: Env) => {
  const body = await request.json();

  const parsedBody = temperatureSchema.safeParse(body);

  if (!parsedBody.success) {
    return new Response(JSON.stringify(parsedBody.error), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data, error } = await supabase.from("temperature").insert(parsedBody.data);

  if (error) {
    return new Response(JSON.stringify(error.message), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});

export default {
  fetch: router.handle,
};
