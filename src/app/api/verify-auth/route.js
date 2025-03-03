import { getUserById, updateUserCounter } from "@/lib/dbConnect";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { cookies } from "next/headers";


export async function POST(req) {
  const cookieStore = await cookies();
  const authInfoCookie = cookieStore.get("authInfo");
  const authInfo = JSON.parse(authInfoCookie.value);

  if (!authInfo) {
    return Response.json(
      { error: "No auth info found in cookies" },
      { status: 400 }
    );
  }

  const body = await req.json();

  const user = await getUserById(authInfo.userId);

  console.log("this is the user at verify auth", user);
  console.log("this is the body at verify auth", body);

  if (!user || user.passKey.id != body.id) {
    return Response.json(
      { error: "User not found or invalid credentials" },
      { status: 400 }
    );
  }

  function objectToUint8Array(obj) {
    return new Uint8Array(Object.values(obj));
  }

  const verification = await verifyAuthenticationResponse({
    response: body,
    expectedChallenge: authInfo.challenge,
    expectedOrigin: "http://localhost:3000",
    expectedRPID: "localhost",
    credential: {
      id: user.passKey.id,
      publicKey: objectToUint8Array(user.passKey.publicKey),
      counter: user.passKey.counter,
      transports: user.passKey.transports,
    },
  });

  if (verification.verified) {
    updateUserCounter(user.id, verification.authenticationInfo.newCounter);
    (await cookies()).delete("authInfo");
    // Save user in a session cookie
    return Response.json({ verified: true, user: user });
  } else {
    return Response.json({ verified: false }, { status: 400 });
  }
}
