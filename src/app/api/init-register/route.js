import { generateRegistrationOptions } from "@simplewebauthn/server";
import { cookies } from "next/headers";
import { getUserByEmail } from "@/lib/dbConnect";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await getUserByEmail(email);
  if (user) {
    return Response.json({ error: "User already exists" }, { status: 400 });
  }

  const options = await generateRegistrationOptions({
    rpID: "localhost",
    rpName: "simpleWebAuthn example",
    userName: email,
  });

  (await cookies()).set(
    "regInfo",
    JSON.stringify({
      userId: options.user.id,
      email,
      challenge: options.challenge,
    }),
    { httpOnly: true, secure: true, maxAge: 60000 }
  );

  return Response.json(options);
}
