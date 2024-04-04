import React, { FC } from 'react';
import styles from './ProjectPageComponent.module.scss';

interface ProjectPageComponentProps {}

const ProjectPageComponent: FC<ProjectPageComponentProps> = () => (
  <div className={styles.ProjectPageComponent}>
    ProjectPageComponent Component
  </div>
);

export default ProjectPageComponent;
