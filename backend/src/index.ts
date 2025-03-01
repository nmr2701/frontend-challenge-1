import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { type ClaimsType } from "./schemas/claimsSchema.js";
import { mrfGenerator } from "./utils/mrfGenerator.js";
import { storeMrfFiles } from "./utils/mrfStorage.js";
import { getMrfFiles } from "./utils/getMrfFiles.js";

const app = new Hono();

app.use("/*", cors());

app.post("/claims/approve", async (c) => {
    const { claims }: { claims: ClaimsType[] } = await c.req.json();

    try {
        // Generate MRFs
        const mrfData = mrfGenerator(claims);

        // Store MRFs
        storeMrfFiles(mrfData);

        return c.json({ success: true, message: "Claims processed successfully" });
    } catch (error) {
        console.error("Error processing claims:", error);
        return c.json(
            {
                success: false,
                error: "Failed to process claims",
            },
            500,
        );
    }
});

app.get("/claims/mrf-files", async (c) => {
    try {
        // Fetch MRF files
        const mrfFiles = await getMrfFiles();
        return c.json({ success: true, mrfFiles });
    } catch (error) {
        console.error("Error fetching MRF files:", error);
        return c.json(
            {
                success: false,
                error: "Failed to fetch MRF files",
            },
            500,
        );
    }
});

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
