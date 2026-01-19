import React from 'react';

const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-hero">
          <h1>About XSHOP</h1>
          <p>
            Your trusted destination for the latest electronics and gadgets. We're committed to bringing you quality products at competitive prices with exceptional customer service.
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded with a vision to make cutting-edge technology accessible to everyone, XSHOP has been serving customers since 2020. We started as a small online store and have grown into one of the most trusted e-commerce platforms for electronics.
            </p>
            <p>
              Our mission is simple: to provide the best products, the best prices, and the best customer experience. We carefully curate our product selection to ensure every item meets our high standards for quality and value.
            </p>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
              alt="Our Team"
            />
          </div>
        </div>

        <div className="about-content reverse">
          <div className="about-text">
            <h2>Why Choose Us</h2>
            <p>
              At XSHOP, we understand that shopping for electronics can be overwhelming. That's why we've made it our priority to provide clear product information, honest reviews, and expert recommendations.
            </p>
            <p>
              We offer a wide range of products from top brands, competitive pricing, fast and reliable shipping, and a hassle-free return policy. Your satisfaction is our top priority.
            </p>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
              alt="Customer Service"
            />
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>We offer quick and reliable shipping options to get your products to you as fast as possible.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Secure Payment</h3>
            <p>Your transactions are protected with industry-leading security measures and encryption.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>Not satisfied? Return your purchase within 30 days for a full refund, no questions asked.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Quality Products</h3>
            <p>We only sell products from trusted brands that meet our strict quality standards.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Best Prices</h3>
            <p>We constantly monitor prices to ensure you get the best deals on all products.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>Our customer support team is always ready to help you with any questions or concerns.</p>
          </div>
        </div>

        <div className="stats-section">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', color: 'var(--text-dark)' }}>
            Our Achievements
          </h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>100K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Products Sold</p>
            </div>
            <div className="stat-item">
              <h3>4.8★</h3>
              <p>Average Rating</p>
            </div>
            <div className="stat-item">
              <h3>99%</h3>
              <p>Customer Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>Our Commitment</h2>
            <p>
              We're committed to providing an exceptional shopping experience from start to finish. Whether you're looking for the latest smartphone, gaming accessories, or home electronics, we've got you covered.
            </p>
            <p>
              Thank you for choosing XSHOP. We appreciate your trust and look forward to serving you for many years to come.
            </p>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
              alt="Our Commitment"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
