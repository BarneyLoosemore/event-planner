export async function POST(request: Request) {
  const body = await request.formData();

  // TODO: handle db insert
  // const event = Object.fromEntries(body.entries());

  return new Response("OK", {
    headers: { "content-type": "application/json" },
  });
}
