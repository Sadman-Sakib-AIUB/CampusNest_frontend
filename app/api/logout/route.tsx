import { NextResponse } from "next/server";

export async function POST() {
  // clear jwt cookie
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // expire immediately
  });
  return res;
}