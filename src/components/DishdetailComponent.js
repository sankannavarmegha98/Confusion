import React, { Component, Fragment } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}
function RenderComments({ comments }) {
  if (comments != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <card>
          <h4>comments</h4>
          <ul class="list-unstyled">
            {comments.map((comment) => {
              return (
                <li key={comments.id}>
                  <p>{comment.comment}</p>
                  <p>
                    -- {comment.author} ,{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </li>
              );
            })}
          </ul>
        </card>
      </div>
    );
  else return <div></div>;
}
class DishdetailComponent extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <RenderDish dish={this.props.dish} />
          <RenderComments
            comments={this.props.dish ? this.props.dish.comments : null}
          />
        </div>
      </div>
    );
  }
}
export default DishdetailComponent;



