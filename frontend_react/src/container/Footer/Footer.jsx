import React, { useState, useEffect } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
// import { client } from '../../client';
import { urlFor, client } from '../../client';
import './Footer.scss';
import { motion } from 'framer-motion';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState([]);
  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const query = '*[_type == "resume"]';
    client.fetch(query)
      .then((data) => {
        setResume(data);
      })
  }, [])

  /* Every time I upload a new resume, I need to updaet following URL.
      To get the new URL, go to sanity, go to Vision Mode, after upload the new resume
        run following query:
          *[_type == "resume"] {
          title,
         "resumeURL": file.asset->url
          }
      This will generate a new resumeURL, which I can use to update the resumeURL below.
   */

  const resumeURL = 'https://cdn.sanity.io/files/t0b1pc8h/production/189b102420b0a9766ef94a64b62b9fc6b1d647b7.pdf'

  // useEffect(() => {
  //   const query = '*[_type == "resume"]{ title, "manuscriptURL": manuscript.asset->url { asset->url } }'; // Adjust the query to fetch the asset URL
  //   client.fetch(query)
  //     .then((data) => {
  //       setResume(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching resume data:', error);
  //     });
  // }, []);

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email3} alt="email" />
          <a href="mailto:utkarsh_jadon@hotmail.com" className="p-text">utkarsh_jadon@hotmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+1 (614) 779-5974" className="p-text">+1 (614) 779-5974</a>
        </div>

        {resume?.map((resume) => (
          <div className='app__footer-card'>
            <img src={images.cv} alt={'resume'}/>
            {console.log(resume.file.asset._ref)}
            <a href={`${resumeURL}?dl=`} 
              download="Utkarsh_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-text">
              Resume
            </a>
          </div>

          ))}

        

      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);