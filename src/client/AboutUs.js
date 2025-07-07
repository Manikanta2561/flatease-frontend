import React, { useState, useEffect } from "react";
import { 
  FaEnvelope, FaCheckCircle, FaLightbulb, FaHandsHelping, 
  FaLinkedin, FaGithub, FaUserTie, FaCode, FaUniversity,
  FaChartLine, FaMobileAlt, FaShieldAlt, FaCalendarAlt,
  FaSmile, FaTools, FaFileAlt, FaUsers
} from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Container, Row, Col, Card, Badge, Carousel, ProgressBar } from "react-bootstrap";
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

// Updated working Lottie Animation URLs
const LOTTIE_ANIMATIONS = {
  mission: "https://lottie.host/8396cf71-7103-4d07-80e4-782ab9dff166/2eaJ7QmcLC.lottie",
  innovation: "https://lottie.host/023f6140-d8fc-4563-a1e7-071e17af8eb8/1bcrGumJfZ.lottie",
  contact: "https://lottie.host/07028139-1f27-4a2f-bf09-b65e56ea24d3/DfmGuq1tKb.lottie",
  features: "https://lottie.host/fa2065b9-240b-47a0-98a8-e6053ba87bc6/bYaLuhoUTa.lottie",
  developer: "https://lottie.host/0a5b0e5e-1b1e-4a5e-9b0e-5e1b1e4a5e9e/3qY7Z8X9vW.lottie",
  stats: "https://lottie.host/8b5a7e9d-9e9d-4b9d-8e9d-9e9d4b9d8e9d/4x5y6z7w8v.lottie"
};

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      quote: "FlatEase transformed our apartment complex from chaotic to organized in just 2 weeks!",
      author: "Rahul Sharma, Property Manager",
      role: "Bangalore Apartments"
    },
    {
      quote: "As a tenant, I love how easy it is to report issues and track their resolution.",
      author: "Priya Patel",
      role: "Resident for 3 years"
    },
    {
      quote: "The community features helped us organize successful events for the first time in years.",
      author: "Community Committee",
      role: "Hyderabad Greens"
    }
  ];

  const stats = [
    { value: 90, label: "Faster Complaint Resolution", icon: <FaTools className="text-primary" size={24} /> },
    { value: 24, label: "Hour Access", icon: <FaMobileAlt className="text-info" size={24} /> },
    { value: 75, label: "Reduction in Paperwork", icon: <FaFileAlt className="text-warning" size={24} /> },
    { value: 100, label: "Happy Communities", icon: <FaSmile className="text-success" size={24} /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-us-page" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Animated Hero Banner */}
      <div className="hero-banner position-relative overflow-hidden" style={{ 
        background: "linear-gradient(135deg, #2d4059 0%, #1e3a8a 100%)",
        color: "white",
        padding: "5rem 0",
        marginBottom: "4rem"
      }}>
        <div className="position-absolute top-0 end-0 w-50 h-100 d-none d-lg-block">
          <DotLottieReact
            src={LOTTIE_ANIMATIONS.mission}
            loop
            autoplay
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-4">
                <TypeAnimation
                  sequence={[
                    'About FlatEase',
                    1000,
                    'Smart Living Solutions',
                    1000,
                    'Community First',
                    1000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </h1>
              <p className="lead mb-4" style={{ fontSize: "1.25rem" }}>
                Revolutionizing apartment living through <span className="text-warning fw-bold">innovative technology</span> and 
                <span className="text-info fw-bold"> community-focused</span> solutions
              </p>
              <div className="d-flex gap-3">
                <button className="btn btn-light btn-lg px-4 py-2 rounded-pill fw-bold">
                  Explore Features
                </button>
                <button className="btn btn-outline-light btn-lg px-4 py-2 rounded-pill fw-bold">
                  Watch Demo
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        {/* Mission Section with Animated Stats */}
        <section className="py-5 mb-5">
          <Row className="g-4">
            <Col lg={6}>
              <div className="pe-lg-4">
                <Badge pill bg="primary" className="mb-3 px-3 py-2">
                  <FaChartLine className="me-2" /> Our Vision
                </Badge>
                <h2 className="fw-bold mb-4 display-5" style={{ color: "#2d4059" }}>
                  Building <span className="text-primary">Smarter</span> Communities
                </h2>
                <p className="lead text-muted mb-4">
                  At FlatEase, we're committed to transforming residential management by bridging 
                  the gap between tenants and property managers through cutting-edge digital solutions.
                </p>
                
                <div className="d-flex align-items-start mb-4">
                  <div className="me-4">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                      <FaCheckCircle className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold">Streamlined Processes</h4>
                    <p className="text-muted">
                      Automated workflows reduce administrative overhead by 60% with our intelligent routing system
                    </p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-4">
                  <div className="me-4">
                    <div className="bg-info bg-opacity-10 p-3 rounded-circle">
                      <FaShieldAlt className="text-info" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold">Transparent Communication</h4>
                    <p className="text-muted">
                      Real-time updates and centralized information hub with end-to-end encryption
                    </p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start">
                  <div className="me-4">
                    <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                      <FaUsers className="text-success" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold">Community Building</h4>
                    <p className="text-muted">
                      Tools designed to foster neighbor connections and engagement with event management
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="bg-white p-4 rounded-4 shadow-lg h-100">
                <h3 className="h4 fw-bold mb-4 text-center">Our Impact in Numbers</h3>
                <Row className="g-4">
                  {stats.map((stat, index) => (
                    <Col md={6} key={index}>
                      <div className="p-4 rounded-4 h-100" style={{ 
                        background: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
                      }}>
                        <div className="d-flex align-items-center mb-3">
                          {stat.icon}
                          <h4 className="ms-3 mb-0 display-6 fw-bold">
                            <VisibilitySensor partialVisibility offset={{ top: 10 }}>
                              {({ isVisible }) => (
                                <span style={{ color: "#2d4059" }}>
                                  {isVisible ? <CountUp end={stat.value} suffix={stat.value === 24 ? "/7" : "%"} duration={2} /> : 0}
                                </span>
                              )}
                            </VisibilitySensor>
                          </h4>
                        </div>
                        <p className="mb-0 small text-muted">{stat.label}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
                <div className="mt-4 text-center">
                  <DotLottieReact
                    src={LOTTIE_ANIMATIONS.stats}
                    loop
                    autoplay
                    style={{ height: 150, width: "100%" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* Features Section with Tabs */}
        <section className="py-5 mb-5 bg-white rounded-4 shadow-sm">
          <div className="text-center mb-5">
            <Badge pill bg="info" className="mb-3 px-3 py-2">
              <FaLightbulb className="me-2" /> Why Choose Us
            </Badge>
            <h2 className="fw-bold display-5 mb-3" style={{ color: "#2d4059" }}>
              Powerful Features for <span className="text-primary">Modern Living</span>
            </h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Designed to make apartment living seamless, efficient, and enjoyable
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-hover" style={{ transition: "all 0.3s" }}>
                <Card.Body className="p-4 text-center">
                  <div className="icon-wrapper bg-primary bg-opacity-10 rounded-3 p-4 mb-4 d-inline-flex">
                    <FaLightbulb className="text-primary" size={32} />
                  </div>
                  <h3 className="h4 fw-bold mb-3">Smart Complaint System</h3>
                  <p className="text-muted mb-4">
                    AI-powered routing, priority tagging, and real-time tracking for all maintenance requests
                  </p>
                  <ProgressBar now={90} label="90% Faster" variant="primary" className="mb-3" style={{ height: "8px" }} />
                  <small className="text-muted">Average resolution time improvement</small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 border-0 shadow-hover" style={{ transition: "all 0.3s" }}>
                <Card.Body className="p-4 text-center">
                  <div className="icon-wrapper bg-info bg-opacity-10 rounded-3 p-4 mb-4 d-inline-flex">
                    <FaCalendarAlt className="text-info" size={32} />
                  </div>
                  <h3 className="h4 fw-bold mb-3">Community Hub</h3>
                  <p className="text-muted mb-4">
                    Event management, voting systems, and neighbor communication tools in one place
                  </p>
                  <ProgressBar now={75} label="75% More" variant="info" className="mb-3" style={{ height: "8px" }} />
                  <small className="text-muted">Community engagement increase</small>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 border-0 shadow-hover" style={{ transition: "all 0.3s" }}>
                <Card.Body className="p-4 text-center">
                  <div className="icon-wrapper bg-success bg-opacity-10 rounded-3 p-4 mb-4 d-inline-flex">
                    <FaFileAlt className="text-success" size={32} />
                  </div>
                  <h3 className="h4 fw-bold mb-3">Document Management</h3>
                  <p className="text-muted mb-4">
                    Secure cloud storage with version control for all property documents and agreements
                  </p>
                  <ProgressBar now={85} label="85% Less" variant="success" className="mb-3" style={{ height: "8px" }} />
                  <small className="text-muted">Paperwork reduction</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-5 mb-5 bg-light rounded-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 mb-3" style={{ color: "#2d4059" }}>
              What Our <span className="text-primary">Community</span> Says
            </h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Hear from the people who use FlatEase every day
            </p>
          </div>
          
          <Row className="justify-content-center">
            <Col lg={8}>
              <Carousel activeIndex={activeIndex} onSelect={setActiveIndex} indicators={false} controls={false}>
                {testimonials.map((testimonial, index) => (
                  <Carousel.Item key={index} interval={5000}>
                    <div className="bg-white p-5 rounded-4 shadow-sm text-center" style={{ minHeight: "300px" }}>
                      <div className="mb-4">
                        {[...Array(5)].map((_, i) => (
                          <FaSmile key={i} className="text-warning mx-1" size={24} />
                        ))}
                      </div>
                      <p className="lead fst-italic mb-4" style={{ fontSize: "1.25rem" }}>
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <h5 className="fw-bold mb-1">{testimonial.author}</h5>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
              
              <div className="d-flex justify-content-center mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`btn btn-sm mx-1 rounded-circle ${activeIndex === index ? 'btn-primary' : 'btn-outline-primary'}`}
                    style={{ width: "12px", height: "12px" }}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </section>

        {/* Developer Section with Animation */}
        <section className="py-5 mb-5 bg-white rounded-4 shadow-lg overflow-hidden">
          <Row className="align-items-center">
            <Col lg={5} className="mb-4 mb-lg-0">
              <div className="position-relative">
                <div className="developer-image-wrapper rounded-4 overflow-hidden shadow-lg">
                  <img
                    src={require("../client/photo3.jpeg")}
                    alt="Manikanta D S"
                    className="img-fluid w-100"
                    style={{
                      height: "500px",
                      objectFit: "cover",
                      transform: "scale(1.03)",
                      transition: "transform 0.5s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                  />
                </div>
                <div className="position-absolute bottom-0 start-0 bg-primary text-white p-3 rounded-end-top">
                  <FaUserTie size={24} className="me-2" />
                  <span className="fw-bold">Creator Spotlight</span>
                </div>
              </div>
            </Col>
            
            <Col lg={7}>
              <div className="ps-lg-5">
                <Badge pill bg="dark" className="mb-3 px-3 py-2">
                  <FaCode className="me-2" /> Full-Stack Developer
                </Badge>
                <h2 className="fw-bold mb-3 display-5" style={{ color: "#2d4059" }}>
                  Meet <span className="text-primary">Manikanta Naga Datta Sai Srinivas Yanamandra</span>
                </h2>
                <p className="lead text-muted mb-4">
                   About the Developer
                </p>
                
                <div className="d-flex flex-wrap gap-4 mb-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <FaUniversity className="text-primary" size={20} />
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">MCA Graduate</h6>
                      <small className="text-muted">Jawaharlal Nehru Technological University</small>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                      <FaCode className="text-info" size={20} />
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">MERN Stack Certified</h6>
                      <small className="text-muted">Full-Stack Developer</small>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
                  As the creator of FlatEase, I combined my passion for problem-solving with technical 
                  expertise to develop a platform that simplifies apartment living. My experience as 
                  coordinator of AKNU's Yantrik Club honed both my leadership skills and technical vision.
                </p>
                
                <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
                  FlatEase represents my commitment to creating solutions that bridge technology with 
                  everyday needs, making community living more efficient and enjoyable for everyone involved.
                </p>
                
                <div className="d-flex flex-wrap gap-3">
                  <a 
                    href="mailto:ymnds256@gmail.com" 
                    className="btn btn-primary btn-lg px-4 py-2 rounded-pill fw-bold d-flex align-items-center"
                  >
                    <FaEnvelope className="me-2" />
                    Contact Me
                  </a>
                  <a 
                    href="https://linkedin.com/in/y-manikanta-b0b940220" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-lg px-4 py-2 rounded-pill fw-bold d-flex align-items-center"
                  >
                    <FaLinkedin className="me-2" />
                    LinkedIn Profile
                  </a>
                  
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* Final CTA Section */}
        <section className="py-5 mb-5 rounded-4" style={{
          background: "linear-gradient(135deg, #2d4059 0%, #1e3a8a 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden"
        }}>
          <div className="position-absolute top-0 end-0 w-50 h-100 d-none d-lg-block">
            <DotLottieReact
              src={LOTTIE_ANIMATIONS.contact}
              loop
              autoplay
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <h2 className="fw-bold display-5 mb-3">Ready to Transform Your Community?</h2>
                <p className="lead mb-4" style={{ opacity: 0.9 }}>
                  Join hundreds of happy communities using FlatEase to simplify their daily operations
                  and enhance resident satisfaction.
                </p>
                
                <div className="d-flex flex-wrap gap-3">
                  <a 
                    href="mailto:flateaseservices@gmail.com" 
                    className="btn btn-light btn-lg px-4 py-2 rounded-pill fw-bold d-flex align-items-center"
                  >
                    <FaEnvelope className="me-2" />
                    Contact Our Team
                  </a>
                  <a 
                    href="#demo" 
                    className="btn btn-outline-light btn-lg px-4 py-2 rounded-pill fw-bold"
                  >
                    Request a Demo
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
      
      {/* Custom CSS for hover effects */}
      <style jsx>{`
        .shadow-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        }
        .developer-image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .developer-image-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(45, 64, 89, 0.1) 0%, rgba(45, 64, 89, 0.3) 100%);
          z-index: 1;
        }
        .hero-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;