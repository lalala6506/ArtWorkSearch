import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);
  
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  
  const { data, error } = useSWR(
    finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null
  );
  
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  
  const nextPage = () => {
    if (page < artworkList?.length) {
      setPage(page + 1);
    }
  };
  
  useEffect(() => {
    
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);
  
  if (error) {
    //console.error('SWR Error:', error); 
    return (
        <Card>
          <Card.Body>
            <h4>404</h4>
            <p>This page could not be found.</p>
          </Card.Body>
        </Card>
      );
  }
  
  if (!artworkList) {
    return null;
  }
  
 
  if (!ArtworkCard) {
    return <div>Error: ArtworkCard component is not available</div>;
  }

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              Try searching for something else.
            </Card.Body>
          </Card>
        )}
      </Row>
      
      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}