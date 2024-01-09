export async function POST(request: Request): Promise<Response> {
  const body = await request.json();
  console.log(body);

  return new Response(JSON.stringify({ message: "OK" }), {
    headers: { "content-type": "application/json" },
  });
}
