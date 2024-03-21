import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { Tooltip as ReactTooltip } from 'react-tooltip'
import { Tooltip } from 'react-tooltip'

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {

  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query)
      .then((data) => {

        setExperience(data);
      })
    
    client.fetch(skillsQuery)
      .then((data) => {
        setSkills(data);
      })
  }, [])

  return (
    <>
      <h2 className='head-text'>Skills & <span>Experience</span></h2>

      <div className='app__skills-container'>
        <motion.div className='app__skills-list'>
          {skills?.map((skill) => (
            <motion.div
              whileInView={{opacity: [0, 1]}}
              transition={{ duration: 0.5 }}
              className='app__skills-item app__flex'
              key={skill.name}
            >
              <div className='app__flex' style={{ backgroundColor: skill.bgColor }}>
                <img src={urlFor(skill.icon)} alt={skill.name}/>
              </div>
              <p className='p-text'>{skill.name}</p>
            </motion.div>

          ))}
        </motion.div>

        <motion.div className='app__skills-exp'>
          {experience?.sort((a, b) => {
          const yearA = parseInt(a.year.split('-')[0]);
          const yearB = parseInt(b.year.split('-')[0]);
          return yearB - yearA; // Sort based on the starting year, with the latest on top
        }).map((experience) => (
            <motion.div
            className='app__skills-exp-item'
            key={experience.year}
            >
              <div className='app__skills-exp-year'>
                <p className='bold-text'>{experience.year}</p>
              </div>
              <motion.div className='app__skills-exp-works'>
                {experience.works.map((work) => (
                  <React.Fragment key={work.name}>
                    <motion.div
                    whileInView={{opacity: [0, 1]}}
                    transition={{ duration: 0.5 }}
                    className='app__skills-exp-work'
                    data-tip
                    data-tooltip-id={work.name}
                    key={work.name}
                    >
                      <h4 className='bold-text'>{work.name}</h4>
                      <p className='p-text'>{work.company}</p>
                      <ul className='work-details'>
                        {work.desc.split('*').map((detail, index) => (
                          detail.trim() !== '' && (
                            <li key={index}>{detail.trim()}</li>
                          )
                        ))}
                </ul>
                    </motion.div>
                    {/* <Tooltip
                    id={work.name}
                    effect="solid"
                    arrowColor="#fff"
                    className='skills-tooltip'
                    >
                      {work.desc}
                    </Tooltip> */}
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, 'app__skills'), 
  'skills',
  'app__whitebg'
);