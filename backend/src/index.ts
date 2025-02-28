import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from 'hono/cors';



const app = new Hono();

app.use('/*', cors());

app.post("/claims/approve", async (c) => {
  const { claims } = await c.req.json();
  
  try {
    const mrfData = generateMrfs(claims);

  } catch (error) {
    console.error('Error processing claims:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to process claims' 
    }, 500);
  }

});

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
