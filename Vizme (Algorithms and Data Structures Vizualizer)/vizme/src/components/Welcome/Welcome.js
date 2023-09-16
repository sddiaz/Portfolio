import React from "react";
import { TypeAnimation } from "react-type-animation";

function Welcome() {

    return (
        <div className="welcome">
            <h1 className="welcome--logo">Vizme</h1>
            <div className="welcome--typing">
                <TypeAnimation
                    sequence={[
                        'For Software Engineers...',
                        3000, 
                        'For Data Scientists..',
                        3000,
                        'For the Inquisitive...',
                        3000,
                        'For fun.. :)',
                        3000,
                        'For Problem Solvers..', // Types 'Four' without deleting 'Three'
                        3000,
                        'For Innovators...',
                        3000,
                        'For Lifelong Learners...',
                        3000,
                        'For Tech Enthusiasts...',
                        3000,
                        'For Curious Minds..',
                        3000,
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                />
            </div>
            <div>
                
            </div>
        </div>
    );
}

export default Welcome;