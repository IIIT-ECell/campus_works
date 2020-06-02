import React,{ Component } from "react";
import Nav1 from "./Nav1";
import {Link} from 'react-router-dom';
import {Row,Col, Card, Button} from 'react-bootstrap';
import './image.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PageNotFound extends Component{
    constructor(props){
        super(props);
        this.bluebg = {"background-color":"#1c285e"};
        this.nobg = {"background":"none", "border":"1px white solid"};
    }
    render(){
        return(
            <div>
                <Nav1/>
                <Card className="vh-100 text-white" style={this.bluebg}>
                    <Card.Img className="p-5 vh-100" style={this.bluebg} src={process.env.PUBLIC_URL + '/assets/backgrounds/image.svg'} alt="Card Image"/>
                    <Card.ImgOverlay className="d-flex">
                            <div className="my-auto container">
                            <Row>
                                <Card.Title>
                                    Error 404
                                </Card.Title>
                            </Row>
                            <Row>
                                <Card.Text>
                                    <h2>Looks like something went wrong</h2>
                                </Card.Text>
                            </Row>
                            <Row>
                                <Link to={'/login'}><Button style={this.nobg}><FontAwesomeIcon icon="long-arrow-alt-left"/> Back to Login</Button></Link>
                            </Row>
                            </div>
                    </Card.ImgOverlay>
                </Card>
            </div>
        )
    }
}
export default PageNotFound;