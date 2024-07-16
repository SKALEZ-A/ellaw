"use client";
import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import shoe from "@/public/walle-shoe.png"

const Particle = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    return init ? (
        <div className="particle-section">

        
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={{
                fullScreen:{
                    enable: true,
                    zIndex: -1
                },
                // style: {
                //     position: "absolute",
                // },
                background: {
                    color: {
                        value: "black",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 200,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.3,
                    },
                    shape: {
                        type: "images",
                        options: {
                            images: [ 
                            //     {
                            //     src: "https://i.postimg.cc/02sJLC71/walle-shoe-1.png",
                            //     width: 205,
                            //     height: 265
                            //   },
                              {
                                src: "https://cryptologos.cc/logos/toncoin-ton-logo.png?v=032",
                                width: 267,
                                height: 267
                              },
                              ],
                        }
                    },
                    size: {
                        value: { min: 10, max: 15 },
                    },
                },
                poisson: {
                    enable: false
                  },
                detectRetina: true,
            }
        }
        /> 
        </div>
    ) : null;
};

export default Particle;
