import React from 'react';
import styles from './Avatar.module.css';

type AvatarProps = {
  className?: string;
  property1?: "Light";
};

export default function Avatar({ className, property1 = "Light" }: AvatarProps) {
  return (
    <div data-node-id="126:2645" className={`${styles.avatar} ${className || ''}`}>
      <p data-node-id="126:2644" className={styles.avatarText}>
        JH
      </p>
    </div>
  );
}
