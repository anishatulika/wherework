import React from 'react';
import styles from './DashboardMobile.module.css';
import BasicBurgerMenu from '../components/BasicBurgerMenu';
import Calendar from '../components/Calendar';

const img = "https://www.figma.com/api/mcp/asset/971c105e-48cb-42fa-93b4-f49e1aa54e6c";
const img1 = "https://www.figma.com/api/mcp/asset/dad25813-ea59-481b-b59f-cbbb7a2296f5";
const img2 = "https://www.figma.com/api/mcp/asset/278ac438-9b98-4f7d-bcea-d381cdfe672d";
const imgVector2581 = "https://www.figma.com/api/mcp/asset/20bd7423-26a9-44df-8c2c-f493952ca69e";
const img7 = "https://www.figma.com/api/mcp/asset/49bc480b-66ff-4c97-ac3a-df660fcde72f";
const img8 = "https://www.figma.com/api/mcp/asset/5b0275a5-5bee-4ad1-b428-a841f7bb29b1";

export default function DashboardMobile() {
  return (
    <div className={styles.dashboard} data-name="Dashboard" data-node-id="123:1588">
      <div className={styles.contentWrapper} data-node-id="127:1779">
        <div className={styles.topNavigation} data-name="Top navigation" data-node-id="123:1837">
          <div className={styles.statusBar} data-name="Status bar" data-node-id="I123:1837;124:2535">
            <div className={styles.time} data-name="Time" data-node-id="I123:1837;124:2536">
              <p className={styles.timeText} data-node-id="I123:1837;124:2537">
                9:41
              </p>
            </div>
            <div className={styles.dynamicIslandContainer} data-node-id="I123:1837;124:2594">
              <div className={styles.dynamicIslandBody} data-name="dynamic-island-body" data-node-id="I123:1837;124:2595" />
              <div className={styles.sensorInside} data-name="sensor-inside" data-node-id="I123:1837;124:2596" />
              <div className={styles.frontCamera} data-name="front-camera" data-node-id="I123:1837;124:2597">
                <img alt="" className={styles.frontCameraImg} src={img} />
              </div>
            </div>
            <div className={styles.levels} data-name="Levels" data-node-id="I123:1837;124:2538">
              <img alt="" className={styles.levelsImg} src={img1} />
            </div>
          </div>
          <div className={styles.navContent} data-node-id="I123:1837;124:2520">
            <div className={styles.navLeft} data-node-id="I123:1837;125:1478">
              <BasicBurgerMenu className={styles.burgerMenuIcon} />
              <p className={styles.dashboardTitle} data-node-id="I123:1837;125:1475">
                Dashboard
              </p>
            </div>
            <div className={styles.avatar} data-name="Avatar" data-node-id="I123:1837;119:5178">
              <p className={styles.avatarText} data-node-id="I123:1837;119:5178;126:2644">
                JH
              </p>
            </div>
          </div>
        </div>
        <div className={styles.content} data-name="Content" data-node-id="127:2242">
          <div className={styles.calendarTile} data-name="Calendar tile" data-node-id="128:2303">
            <div className={styles.greetingSection} data-node-id="136:2432">
              <p className={styles.greeting} data-node-id="136:2430">
                Hi Jane,
              </p>
              <div className={styles.status} data-name="Status" data-node-id="140:2477">
                <p className={styles.statusText} data-node-id="I140:2477;136:2425">
                  In office today
                </p>
              </div>
              <div className={styles.timeDate} data-node-id="140:2472">
                <p className={styles.timeTextSmall} data-node-id="140:2469">
                  10:00 AM
                </p>
                <div className={styles.separator} data-node-id="140:2474">
                  <div className={styles.separatorInner}>
                    <img alt="" className={styles.separatorImg} src={imgVector2581} />
                  </div>
                </div>
                <p className={styles.dateText} data-node-id="140:2470">
                  5 Jan 2025
                </p>
              </div>
            </div>
            <div className={styles.spacer} data-node-id="136:2436" />
            <div className={styles.imageContainer} data-name="web development _ tasks, teamwork, team, working together, website, webpage, people" data-node-id="140:2458">
              <div className={styles.imageInner} data-name="web development _ tasks, teamwork, team, working together, website, webpage, people" data-node-id="I140:2458;1:373">
                <div className={styles.imageWrapper}>
                  <img alt="" className={styles.image} src={img2} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.calendarTileFull} data-name="Calendar tile" data-node-id="127:1780">
            <Calendar variant="mobile" />
            <div className={styles.buttonGroup} data-node-id="128:2258">
              <div className={styles.buttonPrimary} data-name="Buttons" data-node-id="128:2258">
                <div className={styles.buttonIcon} data-name="Basic/check-circle" data-node-id="I128:2258;119:4279">
                  <div className={styles.buttonIconInner} data-name="Vector" data-node-id="I128:2258;119:4279;119:3473">
                    <div className={styles.buttonIconVector} style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                      <img alt="" className={styles.buttonIconImg} src={img7} />
                    </div>
                  </div>
                </div>
                <p className={styles.buttonText} data-node-id="I128:2258;119:4275">
                  I'm in office today
                </p>
              </div>
              <div className={styles.buttonSecondary} data-name="Buttons" data-node-id="128:2275">
                <div className={styles.buttonIcon} data-name="Basic/Calendar" data-node-id="I128:2275;126:2504">
                  <div className={styles.buttonIconInner} data-name="Calendar" data-node-id="I128:2275;126:2504;119:3293">
                    <div className={styles.buttonIconVector}>
                      <img alt="" className={styles.buttonIconImg} src={img8} />
                    </div>
                  </div>
                </div>
                <p className={styles.buttonTextSecondary} data-node-id="I128:2275;126:2505">
                  Request leave
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeIndicator} data-name="Home Indicator" data-node-id="124:2532">
        <div className={styles.homeIndicatorContainer}>
          <div className={styles.homeIndicatorRotate}>
            <div className={styles.homeIndicatorBar} data-name="Home Indicator" data-node-id="I124:2532;106:60028" />
          </div>
        </div>
      </div>
    </div>
  );
}
