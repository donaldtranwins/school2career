import React, { Component } from 'react';

class AboutUs extends Component {
    //creates the about us page with photo and text.
    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 push-lg-6 mt-3">
                        <img className="col-12 mx-auto d-block" src="/images/college_campus.png"/>
                    </div>
                    <div className="col-sm-12 col-lg-6 pull-lg-6 mt-3">
                        <p>
                            Every one of us has to come up with a huge decision when we are teenagers: to choose our future career path.  
                            Rarely does a student know exactly what path in life they want to take.  
                            With thousands of professions to choose from, it is amazing how many jobs remain unknown.  
                            But, given the right kind of degree, you can prepare for a wide range of possibilities.  
                            And that all begins with school.
                        </p>
                        <p>
                            At its core, School2Career provides a college finding experience that allows you to find schools throughout the United States.
                            Schools that match your search criteria display on a map with a list structure showing the most pertinent information. 
                            Each school can then be selected, giving you a more in depth look at what the school offers.  
                            School2Career provides the tools to help you make the most informed decisions about your future.
                        </p>
                        <p>
                            One way to find the path to your future is to understand what subjects you are strong in and equate that to a degree.
                            Another way would be to start with a particular interest and expand that into a career path. Regardless of your chosen
                            path, let School2Career help you find the school to start your career.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs;
