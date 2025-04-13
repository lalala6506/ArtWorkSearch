import useSWR from 'swr';
import Link from "next/link";
import { Card, Button } from 'react-bootstrap'; 
import Error from 'next/error';


export default function ArtworkCard({objectID}){

    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );

    if (error) {
        // return (
        //     <Card>
        //       <Card.Body>
        //         <h4>404</h4>
        //         <p>This page could not be found.</p>
        //       </Card.Body>
        //     </Card>
        //   );
        return <Error statusCode={404} />

    }
    if (!data){
        return null;
    }
    console.log(data);

    return (
        <Card>
       
        <Card.Img
          variant="top"
          src={data.primaryImageSmall || 'https://placehold.co/375x375?text=Not+Available'}
        />
  
        <Card.Body>
        
          <Card.Title>{data.title || 'N/A'}</Card.Title>
  
         
          <Card.Text>
            <strong>Date:</strong> {data.objectDate || 'N/A'} <br />
            <strong>Classification:</strong> {data.classification || 'N/A'} <br />
            <strong>Medium:</strong> {data.medium || 'N/A'}
          </Card.Text>
  
         
          <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
            <Button variant="primary">{objectID}</Button>
          </Link>
        </Card.Body>
      </Card>
    );
}