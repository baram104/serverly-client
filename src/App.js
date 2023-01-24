import { Container, Spinner } from "react-bootstrap";
import FormComp from "./Components/Form/FormComp";
import "bootstrap/dist/css/bootstrap.min.css";
import TableComp from "./Components/Table/TableComp";
import { useEffect, useState } from "react";
import { createServer, getServers } from "./DAL/api";

function App() {
  const [servers, setServers] = useState([]);
  const [isLoadingServers, setIsLoadingServers] = useState(false);

  useEffect(() => {
    setIsLoadingServers(true);
    getServers().then((data) => {
      setServers(data);
      setIsLoadingServers(false);
    });
  }, []);

  const handleAddServer = async (data) => {
    await createServer(data);
    const serversData = await getServers();
    setServers(serversData);
  };

  if (isLoadingServers) {
    return (
      <Container className="text-center">
        <h1>Loading servers</h1>
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5 shadow-lg p-5 rounded-2">
      <h1 className="mb-5 text-center">Serverly</h1>
      {servers.length ? (
        <TableComp servers={servers} setServers={setServers} />
      ) : (
        <h3 className="text-center my-5">
          You don't have any servers <br />
          Add your first server!
        </h3>
      )}
      <FormComp handleAddServer={handleAddServer} />
    </Container>
  );
}

export default App;
