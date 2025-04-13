import React from 'react';
import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState,useEffect } from 'react';
import { addToFavourites,removeFromFavourites } from '@/lib/userData';






export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  //const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));
  const [showAdded, setShowAdded] = useState(false);
  const { data, error } = useSWR(
  
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` :null

  );

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList])
  //conole.log(data);
  // Handle error state
  if (error) {
    return (
      <Card>
        <Card.Body>
          <h4>404</h4>
          <p>This page could not be found.</p>
        </Card.Body>
      </Card>
    );
  }

  // No data
  if (!data) {
    return null;
  }
/* 
  function favouritesClicked(){
    
    if (showAdded){
      setFavouritesList(current => current.filter(fav => fav != objectID));
      setShowAdded(false);
    }
    else{
      setFavouritesList(current => [...current, objectID]);
      setShowAdded(true);
    }

  }
*/
  async function favouritesClicked() {
    try {
    
      if (showAdded) {
        // Remove from favorites
        setFavouritesList(await removeFromFavourites(objectID));
        setShowAdded(false);
      } else {
        // Add to favorites
        setFavouritesList(await addToFavourites(objectID));
        setShowAdded(true);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    
    }
  }

  // Render card with data
  return (
    <Card>
      {data.primaryImage && (
        <Card.Img
          variant="top"
          src={data.primaryImage || 'https://placehold.co/375x375?text=Not+Available'}
        />
      )}
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          {data.objectDate || 'N/A'}<br />
          {data.classification || 'N/A'}<br />
          {data.medium || 'N/A'}
          <br />
          <br />
          {data.artistDisplayName || 'N/A'}
          {data.artistDisplayName && data.artistWikidata_URL && (
            <>
              {' '}
              <a
                href={data.artistWikidata_URL}
                target="_blank"
                rel="noreferrer"
              >
                wiki
              </a>
            </>
          )}
          <br />
          {data.creditLine || 'N/A'}<br />
          {data.dimensions || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">{objectID}</Button>
        </Link>
        <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>{showAdded ? "+ Favourites(added)" : "+ Favourites"}</Button>
      </Card.Body>
    </Card>
  );
}