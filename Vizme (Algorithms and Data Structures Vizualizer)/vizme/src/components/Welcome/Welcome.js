import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

function Welcome() {
    
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <div className="welcome">
            <h1 className="welcome--logo">Vizme</h1>
            <div className="welcome--typing">
                <TypeAnimation
                    sequence={[
                        'For Software Engineers',
                        3000, 
                        'For Data Scientists',
                        3000,
                        'For the Inquisitive',
                        3000,
                        'For fun.',
                        3000,
                        'For Problem Solvers', // Types 'Four' without deleting 'Three'
                        3000,
                        'For Innovators',
                        3000,
                        'For Lifelong Learners',
                        3000,
                        'For Tech Enthusiasts',
                        3000,
                        'For Curious Minds',
                        3000,
                        () => {
                        console.log('Sequence completed');
                        },
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                />
            </div>
        </div>
    );
}

export default Welcome;