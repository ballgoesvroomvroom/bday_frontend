import config from "@/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  // Make the request to your backend API
  const cookieHeader = req.headers.get("cookie") || ""
  console.log("COOKIES", cookieHeader)
  const backendResponse = await fetch(`${config.BACKEND_URL}/api/events/master/${eventId}/code/create`, {
    method: "GET",
    headers: {
      "Cookie": cookieHeader
    }
  })

  // Check the backend response status
  if (backendResponse.status === 200) {
    // If successful, proxy the response data back to the client
    const responseData = await backendResponse.json();

    // Create a new response object to send to the client
    const nextResponse = NextResponse.json(responseData, { status: 200 });

    // Return the response with the Set-Cookie header
    return nextResponse;
  } else {
    // If there’s an error, handle it like this
    const errorResponse = await backendResponse.json();

    // Return error with status from backend
    return NextResponse.json({ error: errorResponse }, { status: backendResponse.status });
  }
}
