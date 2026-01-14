/**
 * Footer Component
 * Creates the site footer
 */
class Footer {
  render() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    
    footer.innerHTML = `
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">About XSHOP</h3>
            <p>Your trusted destination for the latest electronics and gadgets. We offer quality products at competitive prices.</p>
            <div class="social-links">
              <a href="#" class="social-link">Facebook</a>
              <a href="#" class="social-link">Twitter</a>
              <a href="#" class="social-link">Instagram</a>
            </div>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Customer Service</h3>
            <ul class="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Contact Info</h3>
            <ul class="footer-links">
              <li>Email: support@xshop.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: 123 Shopping Street, City, State</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 XSHOP. All rights reserved.</p>
        </div>
      </div>
    `;

    return footer;
  }

  static create() {
    const footer = new Footer();
    return footer.render();
  }
}

export { Footer };
