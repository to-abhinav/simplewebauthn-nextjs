import { getUserByEmail } from "@/lib/dbConnect";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { cookies } from "next/headers";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  console.log("this is the email at init auth", email);
  
  const user = await getUserByEmail(email);
  if (!user) {
    return Response.json({ error: "User does not exist" }, { status: 400 });
  }
  console.log("this is the user at init auth", user);
  
  const options = await generateAuthenticationOptions({
    rpID: "localhost",
    rpName: "simpleWebAuthn example",
    allowCredentials: [
      {
        id: user.passKey.id,
        type: "public-key",
        transports: user.passKey.transports,
      },
    ],
  });
  (await cookies()).set('authInfo',JSON.stringify({userId: user.id,challenge: options.challenge}),{httpOnly: true,secure: true,maxAge: 60000});
    return Response.json(options);
}
