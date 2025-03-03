import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { createUser, getUserByEmail } from "@/lib/dbConnect";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = await cookies(); // ✅ Call cookies() function first
  const regInfoCookie = cookieStore.get("regInfo"); // ✅ Get the cookie value

  if (!regInfoCookie) {
    return Response.json({ error: "No registration info found" }, { status: 400 });
  }

  const regInfo = JSON.parse(regInfoCookie.value);


  const body = await req.json();
  if (!body) {
    return Response.json({ error: "No body provided" }, { status: 400 });
  }
  const verification = await verifyRegistrationResponse({
    response: body,
    expectedChallenge: regInfo.challenge,
    expectedOrigin: "http://localhost:3000",
    expectedRPID: "localhost",
  });

  if (verification.verified) {
    createUser(regInfo.userId, regInfo.email, {
      id: verification.registrationInfo.credential.id,
      publicKey: verification.registrationInfo.credential.publicKey,
      counter: verification.registrationInfo.credential.counter,
      deviceType: verification.registrationInfo.credential.deviceType,
      backedUp: verification.registrationInfo.credential.backedUp,
      transport: body.transports,
    });
    (await cookies()).delete("regInfo");
    console.log("User registered successfully", getUserByEmail(regInfo.email));
    
    return Response.json({ verified: verification.verified });
  } else return Response.json({ status: 400 }, { verified: false });
}
