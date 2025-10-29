import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PATCH(req, { params }) {
  await pool.query(
    `UPDATE contact_requests SET completed = TRUE WHERE id = $1`,
    [params.id]
  );

  return NextResponse.json({ success: true });
}
