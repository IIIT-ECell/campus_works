import React, { Component} from 'react';
import Landing from "./Landing";

class Home extends Component{
    render(){
        return (
            <div>
                <Landing></Landing>
                <div className="container vh-100 d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-md-4">
                            <h1>Connecting IIIT's smartest with innovation</h1>
                        </div>
                        <div className="col-md-8">
                            <p>Campus Works is a portal for students and companies alike to communicate with one another and reach new heights. Through job and internship postings, companies can now easily and directly hire from India's premier technological research institute.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Home;