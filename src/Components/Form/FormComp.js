import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { IP_REGEX } from "../../constants";
import { serverTypesData } from "../../DAL/serverTypesData";

function FormComp({ handleAddServer }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit((data) => handleAddServer(data))}>
      <Container className="col-xl-6 col-lg-8 col-sm-12">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Server Name</Form.Label>
              <Form.Control
                isInvalid={errors.serverName}
                {...register("serverName", {
                  required: "Server name is required",
                })}
                type="text"
                placeholder="Server1"
              />
              <Form.Control.Feedback type="invalid">
                {errors.serverName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 mx-4">
              <Form.Label>Server IP</Form.Label>
              <Form.Control
                {...register("ip", {
                  required: "IP is required",
                  pattern: {
                    value: IP_REGEX,
                    message: "IP is invalid",
                  },
                })}
                type="text"
                placeholder="127.0.0.1"
                isInvalid={errors.ip}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ip?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Server Type</Form.Label>
              <Form.Select className="d-block" {...register("serverType")}>
                {serverTypesData.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="align-items-end d-flex">
            <Button type="submit" variant="dark" className="mx-4">
              Add Server
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default FormComp;
