import { Card, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";

function Post({postData = {title:"This is default title",content : "This is default content"}}) {
    return(

        <Card className="border-0 shadow mt-3">
            <CardBody>
                <h1>{postData.title}</h1>
                <CardText dangerouslySetInnerHTML={{__html :postData.content}}>
                </CardText>
                <div>
                    <Link className="btn btn-dark"  to ={'/readMore/'+postData.postId}>Read more</Link>
                </div>
            </CardBody>
        
        </Card>

    )
}

export default Post;