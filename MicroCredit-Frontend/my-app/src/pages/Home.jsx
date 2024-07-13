
import React from 'react';
import { Carousel } from 'react-bootstrap';
import img1 from '../pic2.jpg';
import img2 from '../pic3.jpg'; 
import img3 from '../pic1.jpg'; 
import './Home.css';


// Define the Home component
const Home = () => {
  return (
    <>
      {/* Carousel section with images */}
      <Carousel style={{ margin: '20px auto', maxWidth: '100%' }}>
        <Carousel.Item>
          <img className="d-block w-100" src={img2} alt="First slide" style={{ maxHeight: '600px' }} />
          <Carousel.Caption style={{color:'black' , marginBottom:'300px'}} className='carousel'>
            <h3>Welcome to Our Micro Credit Application</h3>
            <p>Experience seamless loan applications.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img1} alt="Second slide" style={{ maxHeight: '600px', objectFit: 'cover' }} />
          <Carousel.Caption style={{color:'black' , marginBottom:'300px'}} className='carousel'>
          <h3>Welcome to Our Micro Credit Application</h3>
          <p>Experience seamless loan applications.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img3} alt="Third slide" style={{ maxHeight: '600px', objectFit: 'cover' }}/>
          <Carousel.Caption style={{color:'black' , marginBottom:'300px'}} className='carousel'>
          <h3>Welcome to Our Micro Credit Application</h3>
          <p>Experience seamless loan applications.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

       {/* Services section */}
      <section id="services" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2>Our Services</h2>
        <p>Explore a range of services designed to help you achieve financial stability.</p><br/>
        <div className="service-list">
          <div className="service-item">
            <h5>Micro Loans</h5>
            <p>Accessible loans to cater to your immediate needs.
            Our micro loans are designed to provide quick financial assistance with minimal hassle. Whether you need funds for emergencies or planned expenses, we offer flexible repayment options to suit your budget.</p>
          </div>
          <div className="service-item">
            <h5>Financial Advice</h5>
            <p>Expert guidance to manage your finances better.
            Our financial advisors are here to provide personalized advice to help you make informed decisions about your money. From budgeting tips to investment strategies, we're committed to your financial success.</p>
          </div>
          <div className="service-item">
            <h5>Support & Assistance</h5>
            <p>24/7 support to help you through your financial journey.
            Our customer support team is available round-the-clock to address your queries and concerns. Whether you have questions about your loan application or need assistance with account management, we're here to help.</p>
          </div>
        </div>
      </section>

    {/* Features section */}
    <section id="features" style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f8f9fa' }}>
    <h2>Features</h2>
    <p>Experience the best features designed for your convenience.</p><br/>
    <div className="feature-list">
    <div className="feature-item">
      <h5>Easy Application</h5>
      <p>Simplified loan application process with minimal paperwork.
      Our easy application process ensures that you can apply for a loan quickly and conveniently. With minimal paperwork and a user-friendly interface, you can complete your application in just a few simple steps.</p>
    </div>
    <div className="feature-item">
      <h5>Fast Approval</h5>
      <p>Quick approval process to get your funds without delay.
      Experience fast approval times with our efficient review process. Once you submit your application, our team works diligently to process it swiftly, ensuring that you receive your funds as soon as possible.</p>
    </div>
    <div className="feature-item">
      <h5>Secure Transactions</h5>
      <p>Your security is our top priority with encrypted transactions.
      Rest assured that your transactions are secure with our advanced encryption protocols. We prioritize your privacy and security, ensuring that all transactions and personal information are protected.</p>
    </div>
    </div>
    </section>

   {/* Contact section */}
   <section id="contact" style={{ textAlign: 'center', padding: '40px 20px' }}>
   <h2>Contact Us</h2>
   <p>We're here to assist you with any questions or concerns. Reach out to us through the following channels:</p>
   <ul style={{ listStyleType: 'none', padding: 0 }}>
    <li><strong>Email:</strong> shreeiswariya24@gmail.com</li>
    <li><strong>Phone:</strong> +91 8838916620</li>
    <li><strong>Visit Us:</strong> 123 Main Street, City, </li>
   </ul>
   </section>

  {/* Footer section */}
  <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: shreeiswariya24@gmail.com</p>
            <p>Phone: +91 8838916620</p>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#!">Facebook</a></li>
              <li><a href="#!">Twitter</a></li>
              <li><a href="#!">LinkedIn</a></li>
              <li><a href="#!">Instagram</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#!">Home</a></li>
              <li><a href="#!">About Us</a></li>
              <li><a href="#!">Services</a></li>
              <li><a href="#!">Contact</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <p>&copy; 2024 Micro Credit Application. All rights reserved.</p>
        <p>Designed with <span role="img" aria-label="heart">❤️</span> by Microlend</p>
      </div>
    </footer>

    </>
  );
}

export default Home;

