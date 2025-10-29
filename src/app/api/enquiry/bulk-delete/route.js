import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req) {
  const { ids } = await req.json();
  await pool.query(`DELETE FROM enquiries WHERE id = ANY($1)`, [ids]);
  return NextResponse.json({ success: true });
}
