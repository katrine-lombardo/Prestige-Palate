import React from 'react';
import './About.css';
import erin from './imgs/erin.jpg'
import trejon from './imgs/trejon.jpg'
import michael from './imgs/michael.jpg'

const About = () => {
    return (
        <>
            <div className="py-5 bg-light team1">
                <div className="container">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-7 text-center">
                            <h3 className="mb-3">About Us: Prestige Palate</h3>
                            <h6 className="subtitle font-weight-normal">Get to know our team</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card card-shadow border-0 mb-4">
                                <div className="row no-gutters">
                                    <div className="col-md-5">
                                        <img src={erin} alt="Team Member" className="pro-pic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div className="card-img-overlay d-flex justify-content-end align-items-start">
                                            <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://www.linkedin.com/in/erinyahn/" role="button" data-mdb-ripple-color="dark">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-7 bg-white">
                                        <div className="p-4">
                                            <h6 className="mb-3 font-weight-medium">ERIN AHN</h6>
                                            <p style={{ fontSize: '11px' }}>
                                                Hey there! As a software engineer with a unique background in speech-language pathology, I bring a fresh perspective to the world of coding.
                                                With my experience in helping individuals communicate effectively, I've developed a knack for problem-solving and attention to detail that translates
                                                seamlessly into my software development skills. I'm thrilled to combine my passion for technology with my understanding of language and
                                                communication to create innovative solutions that bridge the gap between the two fields.
                                                I'm excited to use my diverse background to build software that not only functions
                                                flawlessly but also enhances the way we connect and communicate.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card card-shadow border-0 mb-4">
                                <div className="row no-gutters card-shadow">
                                    <div className="col-md-5">
                                        <img src={michael} alt="Team Member" className="pro-pic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div className="card-img-overlay d-flex justify-content-end align-items-start">
                                            <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://www.linkedin.com/in/michael-boateng-27098a50/" role="button" data-mdb-ripple-color="dark">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-7 bg-white">
                                        <div className="p-4">
                                            <h6 className="mb-3 font-weight-medium">MICHAEL BOATENG</h6>
                                            <p style={{ fontSize: '11px' }}>
                                                Hi! My journey into software engineering is driven by an interest in developing user-friendly and efficient solutions.
                                                Intrigued by the potential of tech, I focus on building practical and innovative applications.
                                                I relish the opportunity to tackle complex challenges and contribute to creative projects.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card card-shadow border-0 mb-4">
                                <div className="row no-gutters card-shadow">
                                    <div className="col-md-5">
                                        <img src="CHANGETHIS" alt="Team Member" className="pro-pic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div className="card-img-overlay d-flex justify-content-end align-items-start">
                                            <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://www.linkedin.com/in/katrine-lombardo/" role="button" data-mdb-ripple-color="dark">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-7 bg-white">
                                        <div className="p-4">
                                            <h6 className="mb-3 font-weight-medium">KATRINE LOMBARDO</h6>
                                            <p style={{ fontSize: '11px' }}>EDIT YOUR DESCRIPTION</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card card-shadow border-0 mb-4">
                                <div className="row no-gutters card-shadow">
                                    <div className="col-md-5">
                                        <img src={trejon} alt="Team Member" className="pro-pic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div className="card-img-overlay d-flex justify-content-end align-items-start">
                                            <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://www.linkedin.com/in/trejonmcgee/" role="button" data-mdb-ripple-color="dark">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-7 bg-white">
                                        <div className="p-4">
                                            <h6 className="mb-3 font-weight-medium">TREJON MCGEE</h6>
                                            <p style={{ fontSize: '11px' }}>
                                                Hello! My name is Trejon. I'm a highly motivated software engineer with a strong background in Python, JavaScript, and React.
                                                My technical expertise is complemented by my proficiency in efficiently solving intricate problems through a blend of creative and analytical thinking.
                                                My inherent curiosity and passion for bringing concepts to life drive me to remain current with the latest advancements in technology.
                                                Moving forward, I am eager to leverage my skill set in contributing to cutting-edge innovations and addressing the evolving challenges in software development.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card card-shadow border-0 mb-4">
                                <div className="row no-gutters card-shadow">
                                    <div className="col-md-5">
                                        <img src="CHANGETHIS" alt="Team Member" className="pro-pic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div className="card-img-overlay d-flex justify-content-end align-items-start">
                                            <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://www.linkedin.com/in/yaoshengyin/" role="button" data-mdb-ripple-color="dark">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-7 bg-white">
                                        <div className="p-4">
                                            <h6 className="mb-3 font-weight-medium">YAOSHENG YIN</h6>
                                            <p style={{ fontSize: '11px' }}>EDIT YOUR DESCRIPTION</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};


export default About;
