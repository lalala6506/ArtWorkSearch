import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";


import styles from '@/styles/History.module.css';

export default function Historys(){

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    if(!searchHistory) return null; 

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e,index){
        e.preventDefault(); // Prevent default action if inside a link/button
        const searchQuery = searchHistory[index];

        router.push(`/artwork?${searchQuery}`);

    }
  async function removeHistoryClicked(e, index) {

    e.stopPropagation(); // stop the event from trigging other events
    try {
      setSearchHistory(await removeFromHistory(searchHistory[index]))
    } catch (error) {
      console.error('Error delete to history item:', error);

    }


  }

    return (
        <div>
          {parsedHistory.length === 0 ? (
            <Card className="text-center p-3">
              <Card.Body>Nothing Here. Try searching for some artwork.</Card.Body>
            </Card>
          ) : (
            <ListGroup>
              {parsedHistory.map((historyItem, index) => (
                <ListGroup.Item className={styles.historyListItem} key={index} action onClick={(e) => historyClicked(e, index)} >

                  {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                  <Button className="float-end" variant="danger" size="sm" onClick={(e) => removeHistoryClicked(e, index)}>
                    &times;
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      );
    



}