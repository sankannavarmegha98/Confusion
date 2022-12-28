import { Component, React } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

function RenderComments({comments}) {
        if (comments != null)
            return (
                <div>
                    <h4>Comments</h4>      
                    <ul className='list-unstyled'>
                        {comments.map((comment) => {
                            return (
                                <li>
                                    <p>{comment.comment}</p>
                                    <p>{comment.author}, {new Intl.DateTimeFormat('en-US', {year : 'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <CommentForm />
                </div>  
            );
        else
            return (
                <div></div>
            );
    }

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            isModalOpen: false,
            author: '',
            touched: {
                author: false
            }
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
        }
    
    validate(author) {
        const errors = {
            author: ''
        };

        if (this.state.touched.author && author.length < 3)
            errors.author = 'Author should be >= 3 characters';
        else if (this.state.touched.author && author.length > 10)
            errors.author = 'Author should be <= 10 characters';

        return errors;
    }

    render() {
        const errors = this.validate(this.state.author);

        return(
            <div>
                <Button className="btn btn-outline-secondary" onClick={this.toggleModal}>
                    <span className='fa fa-pencil fa-lg'></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm>
                            <Row className='form-group'>
                                <Label>Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>

                            <Row className='form-group'>
                                <Label>Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                placeholder='Your Name' className='form-control' 
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }} />
                                <Errors className='text-danger'
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                                />
                            </Row>

                            <Row className="form-group">
                            <Label htmlfor='comment'>Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                rows="6"
                                className="form-control" />
                            </Row>

                            <Row className="form-group">
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Row>
                    </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const DishDetail = (props) => {
    if (props.dish != null) {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    <RenderDish dish={props.dish} />
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
        
    );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;