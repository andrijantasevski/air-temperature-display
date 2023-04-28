import { IRequest, Router } from "itty-router";
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

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "HEAD,GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function handleOptions(request: IRequest, env: Env) {
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders,
    },
  });
}

async function handleGetCities(request: IRequest, env: Env) {
  const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const { data } = await supabase.from("city").select("*");

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handleGetCity(request: IRequest, env: Env) {
  const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const { data } = await supabase.from("city").select("*").eq("id", request.params.id);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handleGetTemperatures(request: IRequest, env: Env) {
  const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const searchParams = new URL(request.url).searchParams;

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (startDate && endDate) {
    const { data } = await supabase.from("temperature").select("*").gte("time", startDate).lte("time", endDate);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }

  const { data } = await supabase.from("temperature").select("*");

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function handlePostTemperatures(request: IRequest, env: Env) {
  const body = await request.json();

  const parsedBody = temperatureSchema.safeParse(body);

  if (!parsedBody.success) {
    return new Response(JSON.stringify(parsedBody.error), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
  }

  const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const { data, error } = await supabase.from("temperature").insert(parsedBody.data);

  if (error) {
    return new Response(JSON.stringify(error.message), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
  }

  return new Response(JSON.stringify("OK"), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

router.options("*", handleOptions).get("/api/cities", handleGetCities).get("/api/cities/:id", handleGetCity).get("/api/temperatures", handleGetTemperatures).post("/api/temperatures", handlePostTemperatures);

export default {
  fetch: router.handle,
};
