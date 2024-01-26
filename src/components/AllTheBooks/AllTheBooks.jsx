import {Container, Row, Col} from 'react-bootstrap';
import SingleBook from '../SingleBook/SingleBook';


import scifiBooks from './books.js'

export default function AllTheBooks({filter}) { 
    return (
        <Container style={{textAlign: 'center'}}>
            <Row>
                {
                    scifiBooks.filter(elem => !filter || elem.title.toLowerCase().includes(filter.toLowerCase())).map((item, index) => (
                        <Col md={4} sm={6} key={index} className='scifi-book-container' style={{marginBottom: '1rem'}}>
                            <SingleBook book={item}/>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}