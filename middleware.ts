const url = "https://beerlot-client.vercel.app/";
const targetAudience = "https://beerlot-client.vercel.app/";

const { GoogleAuth } = require("google-auth-library");
const auth = new GoogleAuth();

export async function request() {
  console.info(`request ${url} with target audience ${targetAudience}`);
  const client = await auth.getIdTokenClient(targetAudience);

  const res = await client.request({ url });
  console.info(res.data);
}

request().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
