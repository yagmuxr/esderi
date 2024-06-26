import "./Contact.css";

const Contact = () => {
    return (
        <section className="contact">
            <div className="contact-top">
                <div className="contact-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.1535259516096!2d6.895469215912978!3d52.22668757976121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b81385b7dc63f7%3A0xcc62e31532bd5fa1!2sPathmossingel%2047%2C%207513%20CB%20Enschede%2C%20Netherlands!5e0!3m2!1sen!2str!4v1620396480835!5m2!1sen!2str"
                        width="100%" height="500" style={{ border: "0" }}
                        allowFullScreen loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className="about-section">
                <div className="container">
                    <div className="about-content">
                        <h2>About Us</h2>
                        <p>
                            Starting as an indie brand in Turkey, we are now continuing our journey in the Netherlands.
                            You can reach out to us with any questions about our lovingly handmade products.
                        </p>
                    </div>
                </div>
            </div>
            <div className="contact-bottom">
                <div className="container">
                    <div className="contact-titles">
                        <h4>Contact with us</h4>
                        <h2>Get In Touch</h2>
                    </div>
                    <div className="contact-elements">
                        <form className="contact-form">
                            <div className="form-group">
                                <label>Your Name<span>*</span></label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Your email<span>*</span></label>
                                <input type="email" required />
                            </div>
                            <div className="form-group">
                                <label>Subject<span>*</span></label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Your message<span>*</span></label>
                                <textarea id="author" name="author" required></textarea>
                            </div>
                            <button className="btn btn-sm form-button">Send Message</button>
                        </form>
                        <div className="contact-info">
                            <div className="contact-info-item">
                                <div className="contact-info-texts">
                                    <strong>EsDeri Store</strong>
                                    <p>Netherlands — Pathmossingel 47,7513 CB- Enschede</p>
                                    <a href="tel:+1123456788">Phone: +1 1234 567 88</a>
                                    <a href="mailto:contact@example.com">Email: contact@example.com</a>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <strong> Opening Hours</strong>
                                <p>Monday - Friday : 9am - 5pm</p>
                                <p>Weekend Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
