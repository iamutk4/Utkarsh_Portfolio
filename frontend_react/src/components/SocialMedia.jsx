import React, { useState } from 'react'
import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function SocialMedia() {

  const [socialLinks, setSocialLinks] = useState({
    linkedin: 'https://www.linkedin.com/in/iamutk4/',
    github: 'https://github.com/iamutk4/'
  })

  const handleClick = (socialMedia) => {
    window.open(socialLinks[socialMedia], '_blank');
  };

  return (
    <div className='app__social'>
        <div onClick={() => handleClick('linkedin')}>
          <FaLinkedin />
        </div>
        <div onClick={() => handleClick('github')}>
          <FaGithub />
        </div>
    </div>
  )
}

export default SocialMedia