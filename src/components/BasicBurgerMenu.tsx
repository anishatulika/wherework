import React from 'react';
import styles from './BasicBurgerMenu.module.css';

const imgVector = "https://www.figma.com/api/mcp/asset/239ea7e6-5c69-4a1b-8557-3eef8fc7f34c";

type BasicBurgerMenuProps = {
  className?: string;
  state?: "outline";
};

export default function BasicBurgerMenu({ className, state = "outline" }: BasicBurgerMenuProps) {
  return (
    <div data-node-id="119:3363" className={`${styles.burgerMenu} ${className || ''}`}>
      <div className={styles.line1}>
        <div className={styles.vectorContainer}>
          <div data-node-id="119:3364" className={styles.vector} data-name="Vector">
            <div className={styles.vectorInner}>
              <img className={styles.vectorImg} alt="" src={imgVector} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.line2}>
        <div className={styles.vectorContainer}>
          <div data-node-id="119:3365" className={styles.vector} data-name="Vector">
            <div className={styles.vectorInner}>
              <img className={styles.vectorImg} alt="" src={imgVector} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.line3}>
        <div className={styles.vectorContainer}>
          <div data-node-id="119:3366" className={styles.vector} data-name="Vector">
            <div className={styles.vectorInner}>
              <img className={styles.vectorImg} alt="" src={imgVector} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
