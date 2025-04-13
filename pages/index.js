/********************************************************************************* * BTI425 – Assignment 5
* * I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* * Name: Cha Li Student ID: 046626131 Date: April 13,2025

Vercel App (Deployed) Link: 
* ********************************************************************************/
import { Pagination, Accordion, Row, Image,Col } from "react-bootstrap";


export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid
        rounded
        alt="The Metropolitan Museum of Art"
      />
      <Row className="mt-4">
        <Col lg={6}>
          <p>The Metropolitan Museum of Art of New York City, colloquially "the Met", is the largest art museum in the Americas. Its permanent collection contains over two million works, divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan's Upper East Side, is by area one of the world's largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.</p>
        </Col>
        <Col lg={6}>
          <p>
            For more information, visit the{' '}
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art
            </a>.
          </p>
        </Col>
      </Row>
    </>
  );
}
