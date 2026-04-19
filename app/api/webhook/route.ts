import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("TikTok Webhook received:", JSON.stringify(body));
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "OK" }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Webhook endpoint active" }, { status: 200 });
}
