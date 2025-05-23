import { useForm } from "react-hook-form";

import { Form, Row,Col,Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";


export default function Search() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({

        
        defaultValues: {
          q: '',
          searchBy: '', 
          geoLocation: '',
          medium: '',
          isHighlight: false,
          isOnView: false
        }
      });
    async function submitForm(data) {

        //console.log(data);
        let queryString = '';
        queryString += `searchBy=true`;

        if (data.geoLocation) {
            queryString += `&geoLocation=${data.geoLocation}`;

        }

       
        if (data.medium) {
            queryString += `&medium=${data.medium}`;
        }

        
        queryString += `&isOnView=${data.isOnView}`;
        queryString += `&isHighlight=${data.isHighlight}`;
        queryString += `&q=${data.q}`;

        try {
            setSearchHistory(await addToHistory(queryString));
            router.push(`/artwork?${queryString}`);
          } catch (error) {
            console.error('Error adding to history:', error);
            
          }
          


    }

    return (
        <>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control type="text" placeholder="" name="q" 
                             {...register('q', { required: 'Search query is required' })}className={errors.q ? 'is-invalid' : ''}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select name="searchBy" className="mb-3" {...register('searchBy')}>
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" placeholder="" name="geoLocation"  {...register('geoLocation')} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" placeholder="" name="medium" {...register('medium')} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            name="isHighlight"
                            {...register('isHighlight')}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            name="isOnView"
                            {...register('isOnView')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>

        </>
    );

}