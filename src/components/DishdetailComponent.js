import React, { Component,Fragment} from "react";
import { card, CardImg, cardText, cardBody, cardTitle} from "reactstrap";

function RenderDish({ dish }) {
    if (dish != null){
        return (
            <div className="col-12 col-md-5 m-1">
                <card>
                    <cardImg width="100%" top src={dish.image} alt={dish.name} />
                    <cardBody>
                        <cardTitle>{dish.name}</cardTitle>
                        <cardText>{dish.description}</cardText>
                    </cardBody>
                </card>
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
                     {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            );
        })}
        </ul>
    </card>
        </div>
    );
    else return <div></div>
}

class DishdetailComponent extends Component {
    render() {
        return (
            <Fragment>
                <RenderDish dish={this.props.dish} />
                <RenderComments comments={this.props.dish.comments} />
            </Fragment>
        );
    }
}

export default DishdetailComponent;