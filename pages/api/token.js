// /pages/api/token.js
export default async function handler(req, res) {
  const { GoogleAuth } = await import("google-auth-library");

  const targetAudience = "https://beerlot-client.vercel.app/";

  const auth = new GoogleAuth();
  const client = await auth.getIdTokenClient(targetAudience);

  try {
    const idToken = await client.idTokenProvider.fetchIdToken(targetAudience);
    res.status(200).json({ idToken: idToken });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
