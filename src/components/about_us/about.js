import React, { Component } from 'react';

class AboutUs extends Component {

    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 push-lg-6 mt-3">
                        <img className="col-12 mx-auto d-block" src="/images/college_campus.png"/>
                    </div>
                    <div className="col-sm-12 col-lg-6 pull-lg-6 mt-3">
                        <p>Every one of us is asked to come up with a huge decision when we are teenagers. That is to choose
                            a path to take for our futures. It is a rare student that knows exactly what path it is that they
                            want to take and, even after years of work experience, it is amazing how many jobs are really
                            available that especially as teens they may not even know about. With thousands of professions
                            in the work place, many professions aren't ones that you can specifically study for.
                            However, given the right kind of degree, you can be prepared for a wide range of possibilities.
                        </p>
                        <p>One of the ways of going about finding that path to take includes an understanding of
                            what subjects you are strongest in and trying to equate that to a degree. Another way of going about await
                            would be based upon a particular interest or several different interests and trying to find a way to expand
                        that into a career path.</p>
                        <p>We are offering a skills assessment that is meant to be a fun and easy way to uncover specific personality types
                            and traits in order to give some suggestions in choosing a career path that may be of interest. The assessment
                        test we are using was developed by a psychology team and was based on the same psychology as many popular traditional
                        assessments. It has also been tested using Cronbach's Alpha and received a 0.94. That said, the information we are
                        giving based upon the assessment are merely suggestions to give an idea of different possibilities that may not have
                        already been thought of.</p>
                        <p>At its core, we are also providing a college finding experience that allows you to find schools through out the
                        United States. Each school can be seen on a map and, with a basic list structure providing some of the most pertinent
                        information. Each school can also be selected giving a more in depth look.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs;
