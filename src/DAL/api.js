export const createServer = async ({ serverName, ip, serverType }) => {
  await fetch("http://localhost:3000/api/servers", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: serverName, ip, type: serverType }),
  });
};

export const getServers = async () => {
  const res = await fetch("http://localhost:3000/api/servers");
  return await res.json();
};

export const deleteServer = async (id) => {
  await fetch(`http://localhost:3000/api/servers/${id}`, { method: "DELETE" });
};

export const toggleServer = async (id) => {
  await fetch(`http://localhost:3000/api/servers/${id}`, {
    method: "PATCH",
  });
};

export const getCurrencies = async (currencies) => {
  const currenciesStr = currencies.reduce(
    (acc, curr) => acc + curr.name + ",",
    ""
  );
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=USD&symbols=${currenciesStr}}`
  );
  const data = await res.json();
  return data.rates;
};
