import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  const { rows } = await pool.query(`SELECT * FROM enquiries ORDER BY created_at DESC`);
  return NextResponse.json(rows);
}

export async function POST(req) {
  const { name, email, phone, product, quantity, sample } = await req.json();

  await pool.query(
    `INSERT INTO enquiries (name, email, phone, product, quantity, sample)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [name, email, phone, product, quantity, sample]
  );

  return NextResponse.json({ success: true });
}
