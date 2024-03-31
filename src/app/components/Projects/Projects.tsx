import React, { FC } from 'react';
import styles from './Projects.module.scss';

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = () => (
  <div className={styles.Projects}>
    Projects Component
  </div>
);

export default Projects;
