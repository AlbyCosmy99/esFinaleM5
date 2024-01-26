import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './CommentArea.css'

export default function CommentArea({book}) {
    const [comment,setComment] = useState('')
    const [finishedComment, setFinishedComment] = useState(false)
    const [showCommentError, setShowCommentError] = useState(false)
    const {dbComments, setDbComments} = useState([])

    useEffect(() => {
        fetch("https://striveschool-api.herokuapp.com/api/books/" + book.asin + "/comments/", {
            headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFkYTJhMDk1ODFjYjAwMTg2ODdlZjIiLCJpYXQiOjE3MDU4NzgxNzYsImV4cCI6MTcwNzA4Nzc3Nn0.d11txtr-kbRiQ4SBvVaShCtSm79zbu5JfjAdkk3QdNQ"
            }
        })
        .then((res) => res.json())
        .then(setDbComments) 
        .catch(err => {
            console.log(err)
        })
    },[dbComments, book.asin, setDbComments])

    const handleSubmit = (event) => {
        if(!comment) {
            setShowCommentError(true)
        }
        else {
            setShowCommentError(false)
            setFinishedComment(true);
            let elem = {
                "comment": comment,
                "rate": 5,
                "elementId": book.asin
            }
            fetch("https://striveschool-api.herokuapp.com/api/books/" + book.asin + "/comments/", {
                method: 'POST',
                headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFkYTJhMDk1ODFjYjAwMTg2ODdlZjIiLCJpYXQiOjE3MDU4Nzk2NzEsImV4cCI6MTcwNzA4OTI3MX0.Uw_P4N5szGtKzcbI427OThK72qriISnLSJADg9KixUE"
                },
                body: JSON.stringify(elem)
            })
            .then(() => {
                setDbComments(null)
            })
            .catch(err => {
                console.log(err)
            })
        }
        event.preventDefault();
        
    };

    return (
        <form onSubmit={handleSubmit}>
            {
                <Container>
                    <Row>
                        <Col sm={6} className="center">
                            <Form.Group className="mb-3" controlId="formBasicComment">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter comment"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    style={{margin: '1rem'}}
                                />   
                            </Form.Group>
                        </Col>
                        <Col sm={6} className="center">
                            <Button type="submit" variant="primary">SEND</Button>
                        </Col>
                        {
                            dbComments ? dbComments.map((elem, index) => {
                                return (
                                    <Col sm= {12}>
                                        <p>
                                            {elem}
                                        </p>
                                    </Col>
                                )
                            }) : ''
                        }
                    </Row>
                    {!showCommentError ? '' : (
                        <Form.Text className="text-muted text-danger">
                            Insert comment
                        </Form.Text>
                    )}
                </Container>
            }      
        </form>
    )
}