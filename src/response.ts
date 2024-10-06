export const file = async (pathToFile: string) => {
  const path = pathToFile.startsWith("/") ? pathToFile.slice(1) : pathToFile;
  const file = Bun.file(path);
  return new Response(await file.arrayBuffer(), {
    headers: { "Content-Type": file.type },
  });
};

export const json = async (data: unknown) => {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};

export const error404 = () => {
  return new Response("Not Found", { status: 404 });
};
