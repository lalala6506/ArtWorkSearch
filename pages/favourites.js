import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';




export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);




  

  if (!favouritesList) {
    return null;
  }
  


  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              Try to add some to your faviorte list
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
}