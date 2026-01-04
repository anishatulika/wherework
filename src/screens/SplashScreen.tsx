import React from 'react';
import styles from './SplashScreen.module.css';

const img = "https://www.figma.com/api/mcp/asset/7fe07233-4bbc-403f-9997-1eb0753ff438";
const img1 = "https://www.figma.com/api/mcp/asset/ad224cf2-bd42-49dd-ad28-6a3f2d1faacf";
const img2 = "https://www.figma.com/api/mcp/asset/58b11b2b-15fd-48f5-b919-76fe1dbcea45";
const img3 = "https://www.figma.com/api/mcp/asset/ca6610b3-16b4-477d-bd6c-65f060bd56bf";

export default function SplashScreen() {
  return (
    <div className={styles.splashScreen} data-name="Splash screen" data-node-id="126:1439">
      <div className={styles.topNavigation} data-name="Top navigation" data-node-id="126:1440">
        <div className={styles.statusBar} data-name="Status bar" data-node-id="I126:1440;126:2591">
          <div className={styles.time} data-name="Time" data-node-id="I126:1440;126:2630">
            <p className={styles.timeText} data-node-id="I126:1440;126:2631">
              9:41
            </p>
          </div>
          <div className={styles.dynamicIslandContainer} data-node-id="I126:1440;126:2594">
            <div className={styles.dynamicIslandBody} data-name="dynamic-island-body" data-node-id="I126:1440;126:2595" />
            <div className={styles.sensorInside} data-name="sensor-inside" data-node-id="I126:1440;126:2596" />
            <div className={styles.frontCamera} data-name="front-camera" data-node-id="I126:1440;126:2597">
              <img alt="" className={styles.frontCameraImg} src={img} />
            </div>
          </div>
          <div className={styles.levels} data-name="Levels" data-node-id="I126:1440;126:2633">
            <img alt="" className={styles.levelsImg} src={img1} />
          </div>
        </div>
      </div>
      <div className={styles.logoSection} data-name="Logo" data-node-id="126:1443">
        <div className={styles.logoContainer} data-name="Logo" data-node-id="I126:1443;140:2983">
          <div className={styles.logoBackground} style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <img alt="" className={styles.logoImg} src={img2} />
          </div>
          <div className={styles.logoUnion} data-name="Union" data-node-id="I126:1443;140:2983;140:2926">
            <img alt="" className={styles.logoUnionImg} src={img3} />
          </div>
        </div>
        <div className={styles.logoTextContainer} data-node-id="I126:1443;140:2984">
          <p className={styles.logoTitle} data-node-id="I126:1443;140:2985">
            <span className={styles.logoTitleSpan}>Where</span>Work
          </p>
          <p className={styles.logoSubtitle} data-node-id="I126:1443;140:2986">
            Track your hybrid schedule
          </p>
        </div>
      </div>
      <div className={styles.footerSection} data-node-id="126:1444">
        <div className={styles.studioLogo} data-name="Studio logo" data-node-id="126:1445">
          <p className={styles.studioLogoHeart} data-node-id="I126:1445;125:1559">
            ♡
          </p>
          <p className={styles.studioLogoText} data-node-id="I126:1445;125:1560">
            <span className={styles.studioLogoTextSpan}>AZ </span>Design Studios{" "}
          </p>
        </div>
        <div className={styles.homeIndicator} data-name="Home Indicator" data-node-id="126:1446">
          <div className={styles.homeIndicatorContainer}>
            <div className={styles.homeIndicatorRotate}>
              <div className={styles.homeIndicatorBar} data-name="Home Indicator" data-node-id="I126:1446;106:60028" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
