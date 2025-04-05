import config from "@/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const store = await cookies();
  const sid = store.get(config.COOKIE_NAME);

  // Parse the request body
  const { domain, password } = await req.json();

  // Make the request to your backend API
  const backendResponse = await fetch(`${config.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      domain,
      password,
    }),
  });

  // Check the backend response status
  if (backendResponse.status === 200) {
    // If successful, proxy the response data back to the client
    const responseData = await backendResponse.json();

    // Create a new response object to send to the client
    const nextResponse = NextResponse.json(responseData, { status: 200 });

    // Forward the Set-Cookie header from the backend response to the client
    const setCookieHeader = backendResponse.headers.get("Set-Cookie");
    if (setCookieHeader) {
      nextResponse.headers.set("Set-Cookie", setCookieHeader);
    }

    // Return the response with the Set-Cookie header
    return nextResponse;
  } else {
    // If there’s an error, handle it like this
    const errorResponse = await backendResponse.json();

    // Return error with status from backend
    return NextResponse.json({ error: errorResponse }, { status: backendResponse.status });
  }
}
