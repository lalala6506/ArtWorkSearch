import { useRouter } from 'next/router';
import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { Card } from "react-bootstrap";
import { Row, Col } from 'react-bootstrap';


export default function Handler() {
    const router = useRouter();
    const { objectID } = router.query;


    if (!objectID) {
        //console.log("error");
        return (
        <Card>
            <Card.Body>
                <h4>404</h4>
                <p>Unknow Id {objectID}</p>
            </Card.Body>
        </Card>);

    }

    return (
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>

    );
}