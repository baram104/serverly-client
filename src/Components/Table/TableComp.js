import { useEffect, useState } from "react";
import { Form, Spinner, Table } from "react-bootstrap";
import { TableRowComp } from "./TableRowComp";
import { deleteServer, getCurrencies, toggleServer } from "../../DAL/api";
import { currenciesData } from "../../DAL/currenciesData";

export default function TableComp({ servers, setServers }) {
  const [currencyRates, setCurrencyRates] = useState(null);
  const [selectedCurrencyRate, setSelectedCurrencyRate] = useState(1);
  const [isToggleServerLoading, setIsToggleServerLoading] = useState(false);

  useEffect(() => {
    getCurrencies(currenciesData).then((data) => setCurrencyRates(data));
  }, []);

  const handleOnDeleteServer = async (id) => {
    await deleteServer(id);
    const filteredServers = servers.filter((server) => server.id !== id);
    setServers(filteredServers);
  };

  const handleOnToggleServer = async (id) => {
    setIsToggleServerLoading(true);
    await toggleServer(id);
    const affectedServer = servers.find((server) => server.id === id);
    const isRunning = affectedServer.is_running;
    const unaffectedServers = servers.filter((server) => server.id !== id);
    setServers([
      ...unaffectedServers,
      { ...affectedServer, is_running: !isRunning },
    ]);
    setIsToggleServerLoading(false);
  };

  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>IP</th>
          <th>Server Name</th>
          <th>Time Running</th>
          <th>Toggle</th>
          <th>Type</th>
          <th>
            <span className="d-inline mx-2">Price</span>
            {currencyRates ? (
              <Form.Select
                onChange={({ target }) => {
                  setSelectedCurrencyRate(currencyRates[target.value]);
                }}
                size="sm"
                className="d-inline w-50"
              >
                {currenciesData.map((curr, i) => (
                  <option key={i} value={curr.name}>
                    {curr.sign}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Spinner />
            )}
          </th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {servers.map((row, i) => (
          <TableRowComp
            key={i}
            onDelete={handleOnDeleteServer}
            currencyRate={selectedCurrencyRate}
            {...row}
            isToggleServerLoading={isToggleServerLoading}
            onToggle={handleOnToggleServer}
          />
        ))}
      </tbody>
    </Table>
  );
}
