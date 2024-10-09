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

export const error = (status: number, message?: string) => {
  if (message) {
    return new Response(message, { status });
  }

  switch (status) {
    case 400:
      return new Response("Bad Request", { status });
    case 401:
      return new Response("Unauthorized", { status });
    case 402:
      return new Response("Payment Required", { status });
    case 403:
      return new Response("Forbidden", { status });
    case 404:
      return new Response("Not Found", { status });
    case 405:
      return new Response("Method Not Allowed", { status });
    case 406:
      return new Response("Not Acceptable", { status });
    case 407:
      return new Response("Proxy Authentication Required", { status });
    case 408:
      return new Response("Request Timeout", { status });
    case 409:
      return new Response("Conflict", { status });
    case 410:
      return new Response("Gone", { status });
    case 411:
      return new Response("Length Required", { status });
    case 412:
      return new Response("Precondition Failed", { status });
    case 413:
      return new Response("Payload Too Large", { status });
    case 414:
      return new Response("URI Too Long", { status });
    case 415:
      return new Response("Unsupported Media Type", { status });
    case 416:
      return new Response("Range Not Satisfiable", { status });
    case 417:
      return new Response("Expectation Failed", { status });
    case 418:
      return new Response("I'm a teapot", { status });
    case 421:
      return new Response("Misdirected Request", { status });
    case 422:
      return new Response("Unprocessable Entity", { status });
    case 423:
      return new Response("Locked", { status });
    case 424:
      return new Response("Failed Dependency", { status });
    case 425:
      return new Response("Too Early", { status });
    case 426:
      return new Response("Upgrade Required", { status });
    case 428:
      return new Response("Precondition Required", { status });
    case 429:
      return new Response("Too Many Requests", { status });
    case 431:
      return new Response("Request Header Fields Too Large", { status });
    case 451:
      return new Response("Unavailable For Legal Reasons", { status });
    case 500:
      return new Response("Internal Server Error", { status });
    case 501:
      return new Response("Not Implemented", { status });
    case 502:
      return new Response("Bad Gateway", { status });
    case 503:
      return new Response("Service Unavailable", { status });
    case 504:
      return new Response("Gateway Timeout", { status });
    case 505:
      return new Response("HTTP Version Not Supported", { status });
    case 506:
      return new Response("Variant Also Negotiates", { status });
    case 507:
      return new Response("Insufficient Storage", { status });
    case 508:
      return new Response("Loop Detected", { status });
    case 510:
      return new Response("Not Extended", { status });
    case 511:
      return new Response("Network Authentication Required", { status });

    default:
      return new Response("Unknown Error", { status });
  }
};
