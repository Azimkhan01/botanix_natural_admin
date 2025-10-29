import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  const { rows } = await pool.query("SELECT * FROM contact_requests ORDER BY id DESC");
  return NextResponse.json(rows);
}

export async function DELETE(req) {
  const { ids } = await req.json();
  await pool.query(`DELETE FROM contact_requests WHERE id = ANY($1::int[])`, [ids]);
  return NextResponse.json({ success: true });
}
