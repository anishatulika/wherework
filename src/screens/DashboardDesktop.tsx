import React, { useState, useEffect } from 'react';
import styles from './DashboardDesktop.module.css';
import Calendar from '../components/Calendar';
import Avatar from '../components/Avatar';
import LeaveRequestModal, { LeaveRequestData } from '../components/LeaveRequestModal';

// Image URLs from Figma
const img = "https://www.figma.com/api/mcp/asset/1f2efe31-a406-495f-83df-771aa2f6ed15";
const img1 = "https://www.figma.com/api/mcp/asset/2feb91b5-851f-4b74-8dce-32e32ed87267";
const img2 = "https://www.figma.com/api/mcp/asset/d0a4e7ec-e6fe-4043-899d-bb0acfc9c826";
const img3 = "https://www.figma.com/api/mcp/asset/375cb131-8fc7-4816-9427-48bed999af13";
const img4 = "https://www.figma.com/api/mcp/asset/865ab142-c7a7-400f-9b61-0192ff0ae932";
const img5 = "https://www.figma.com/api/mcp/asset/bedfd7e7-ad78-4098-9619-42d3d53a1161";
const img6 = "https://www.figma.com/api/mcp/asset/29e50a03-b1e7-467f-8be9-8994be4171c0";
const img7 = "https://www.figma.com/api/mcp/asset/aba6b55f-0328-44f0-9f6b-a385b5eaec49";
const img8 = "https://www.figma.com/api/mcp/asset/b2172c3f-dee9-43ca-94a0-058b39069694";
const img9 = "https://www.figma.com/api/mcp/asset/a1a8a5c7-68fc-489a-9567-ecc222fad060";
const img10 = "https://www.figma.com/api/mcp/asset/be6a2750-0b52-4b97-b146-92b1ea5297fc";
const img11 = "https://www.figma.com/api/mcp/asset/76a4cd12-0e94-49f1-9068-10d86c685cae";
const img12 = "https://www.figma.com/api/mcp/asset/5bbb5013-5932-4a48-9878-ecee9d8d7951";
const img13 = "https://www.figma.com/api/mcp/asset/cff2e39f-6539-4428-b3e0-e367c0974f02";
const img14 = "https://www.figma.com/api/mcp/asset/12f91e24-04ce-4be8-b6ab-e3a09aa43511";
const img15 = "https://www.figma.com/api/mcp/asset/315b38e5-915f-49cd-9eca-78f3c408087b";
const img16 = "https://www.figma.com/api/mcp/asset/e651b024-6f79-4f09-b363-5726bcde2bdc";
const img17 = "https://www.figma.com/api/mcp/asset/04eae080-1597-4355-91b6-75c73a50c765";
const img18 = "https://www.figma.com/api/mcp/asset/34bcf4e4-0bac-4d74-8a53-678cb1adba4a";
const img19 = "https://www.figma.com/api/mcp/asset/64c03cfd-23e6-4200-9ac8-7d0e3f1f2ca6";
const imgVector2582 = "https://www.figma.com/api/mcp/asset/0fac23d4-0d10-4995-8c52-71c35f28f7b4";
const img20 = "https://www.figma.com/api/mcp/asset/fa527fd9-e127-42fe-a853-a6d4026fdf38";
const img25 = "https://www.figma.com/api/mcp/asset/55b8a8d6-0a05-46b0-b096-ba0af32984dd";
const img26 = "https://www.figma.com/api/mcp/asset/060cc8e7-1420-4aa4-a4b2-b5155cd8d4e7";

type LeaveRequest = {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
};

export default function DashboardDesktop() {
  const [activePage, setActivePage] = useState<'dashboard' | 'rewards'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [officeMarkedDates, setOfficeMarkedDates] = useState<Set<string>>(new Set());
  const [redeemedRewards, setRedeemedRewards] = useState<Set<string>>(new Set());
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      leaveType: 'casual',
      startDate: '2026-01-10',
      endDate: '2026-01-12',
      reason: '',
      status: 'pending',
    },
    {
      id: '2',
      leaveType: 'sick',
      startDate: '2026-01-05',
      endDate: '2026-01-05',
      reason: '',
      status: 'pending',
    },
  ]);

  // Real-time date & time updates
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Format time and date
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const getLocation = () => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Format timezone to a more readable location format
      const parts = timeZone.split('/');
      if (parts.length > 1) {
        return parts[parts.length - 1].replace(/_/g, ' ');
      }
      return timeZone;
    } catch {
      return 'London, UK';
    }
  };

  // Calculate stats
  const getCurrentWeekStats = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    let officeDays = 0;
    let wfhDays = 0;
    let officeStreak = 0;

    // Count office days this week
    for (let d = new Date(startOfWeek); d <= endOfWeek; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      if (officeMarkedDates.has(dateStr)) {
        officeDays++;
      }
    }

    // Calculate office streak (consecutive office days from today backwards)
    const todayStr = today.toISOString().split('T')[0];
    if (officeMarkedDates.has(todayStr)) {
      const checkDate = new Date(today);
      while (officeMarkedDates.has(checkDate.toISOString().split('T')[0])) {
        officeStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }

    return { officeDays, wfhDays, officeStreak };
  };

  const getMonthlyStats = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    let officeDays = 0;
    let wfhDays = 0;

    for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      if (officeMarkedDates.has(dateStr)) {
        officeDays++;
      }
    }

    return { officeDays, wfhDays };
  };

  const weekStats = getCurrentWeekStats();
  const monthlyStats = getMonthlyStats();
  const pendingLeaveRequests = leaveRequests.filter(lr => lr.status === 'pending');

  const handleRequestLeave = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (data: LeaveRequestData) => {
    const newLeaveRequest: LeaveRequest = {
      id: Date.now().toString(),
      leaveType: data.leaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
      status: 'pending',
    };
    setLeaveRequests([...leaveRequests, newLeaveRequest]);
    setIsModalOpen(false);
  };

  const handleOfficeToggle = () => {
    if (!selectedDate) return;
    if (officeMarkedDates.has(selectedDate)) return; // Already marked
    
    setOfficeMarkedDates(new Set([...officeMarkedDates, selectedDate]));
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  const isSelectedDateMarked = () => {
    return selectedDate ? officeMarkedDates.has(selectedDate) : false;
  };

  const handleCancelLeave = (id: string) => {
    setLeaveRequests(leaveRequests.filter(lr => lr.id !== id));
  };

  const handleRedeemReward = (rewardId: string) => {
    if (redeemedRewards.has(rewardId)) return;
    setRedeemedRewards(new Set([...redeemedRewards, rewardId]));
    alert('Reward redeemed successfully!');
  };

  // Avatar component - STRICT rendering: avatarImage exists → render it, missing → initials only
  // NO inference, NO randomization, NO index-based logic
  const IllustratedAvatar = ({ avatarImage, initials, className }: { avatarImage?: string; initials: string; className?: string }) => {
    const [avatarError, setAvatarError] = useState(false);
    
    // STRICT RULE: If avatarImage exists and hasn't errored → render it
    if (avatarImage && !avatarError) {
      return (
        <img 
          src={avatarImage} 
          alt={initials}
          className={className}
          onError={() => setAvatarError(true)}
        />
      );
    }
    
    // STRICT RULE: If avatarImage is missing or failed → render initials only
    // NO guessing, NO mapping, NO inference
    return <span className={className}>{initials}</span>;
  };

  const formatLeaveDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formatDate = (d: Date) => {
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(d);
    };
    if (startDate === endDate) {
      return formatDate(start);
    }
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const getLeaveTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      casual: 'Casual leave',
      sick: 'Sick leave',
      vacation: 'Vacation',
      personal: 'Personal Leave',
    };
    return labels[type] || type;
  };

  const getDaysBetween = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className={styles.dashboard} data-name="Dashboard" data-node-id="198:2776">
      <div className={styles.dashboardContainer}>
        <div className={styles.topNavigation} data-name="Top navigation" data-node-id="165:2169">
          <div className={styles.navLeft} data-node-id="I165:2169;140:2831">
            <div className={styles.logo} data-name="Logo" data-node-id="I165:2169;140:2921">
              <img alt="" className={styles.logoImg} src={img} />
              <div className={styles.logoUnion} data-name="Union" data-node-id="I165:2169;140:2921;140:2926">
                <img alt="" className={styles.logoUnionImg} src={img1} />
              </div>
            </div>
            <div className={styles.navTabs} data-node-id="I165:2169;140:2834">
              <div 
                className={activePage === 'dashboard' ? styles.navTabActive : styles.navTab} 
                data-name="Top navigation / Sub-elements" 
                data-node-id="I165:2169;140:2835"
                onClick={() => setActivePage('dashboard')}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.navTabContent} data-name="Navigation tab" data-node-id="I165:2169;140:2835;119:4437">
                  <p className={activePage === 'dashboard' ? styles.navTabText : styles.navTabTextInactive} data-node-id="I165:2169;140:2835;119:4438">
                    Dashboard
                  </p>
                </div>
                {activePage === 'dashboard' && (
                  <div className={styles.selectedIndicator} data-node-id="I165:2169;140:2835;119:4439">
                    <div className={styles.selectedIndicatorBar} data-name="Selected indicator" data-node-id="I165:2169;140:2835;119:4440" />
                  </div>
                )}
              </div>
            <div 
              className={activePage === 'rewards' ? styles.navTabActive : styles.navTab} 
              data-name="Top navigation / Sub-elements" 
              data-node-id="I198:2777;140:2838"
              onClick={() => setActivePage('rewards')}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.navTabContent} data-name="Navigation tab" data-node-id="I198:2777;140:2838;119:4427">
                <p className={activePage === 'rewards' ? styles.navTabText : styles.navTabTextInactive} data-node-id="I198:2777;140:2838;119:4428">
                  Rewards
                </p>
              </div>
              {activePage === 'rewards' && (
                <div className={styles.selectedIndicator} data-node-id="I198:2777;140:2838;119:4439">
                  <div className={styles.selectedIndicatorBar} data-name="Selected indicator" data-node-id="I198:2777;140:2838;119:4440" />
                </div>
              )}
            </div>
          </div>
          </div>
          <div className={styles.navRight} data-node-id="I165:2169;140:2839">
            <button className={styles.buttonRequest} onClick={handleRequestLeave} data-name="Buttons" data-node-id="I165:2169;165:2159">
            <div className={styles.buttonIcon} data-name="Basic/plus-add-circle" data-node-id="I165:2169;165:2159;119:4279">
              <div className={styles.buttonIconInner} data-name="Vector" data-node-id="I165:2169;165:2159;119:4279;119:3463">
                <div className={styles.buttonIconVector} style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                  <img alt="" className={styles.buttonIconImg} src={img2} />
                </div>
              </div>
            </div>
            <p className={styles.buttonText} data-node-id="I165:2169;165:2159;119:4275">
              Request leave
            </p>
            </button>
            <Avatar className={styles.avatarDesktop} />
          </div>
        </div>
        {activePage === 'dashboard' ? (
        <div className={styles.mainContentWrapper} data-node-id="165:2170">
          <div className={styles.leftColumn}>
          <div className={styles.greetingSection} data-node-id="165:2504">
            <p className={styles.greetingLarge} data-node-id="165:2490">
              Hi Jane,
            </p>
            <p className={styles.welcomeText} data-node-id="165:2501">
              Welcome to your WhereWork dashboard.
            </p>
          </div>
          <div className={styles.statsCard} data-name="Calendar tile" data-node-id="165:2171">
          <div className={styles.statsContent} data-node-id="165:2172">
            <div className={styles.statsSection} data-node-id="165:2181">
              <p className={styles.statsTitle} data-node-id="165:2182">
                Your statistics this week
              </p>
              <div className={styles.statsGrid} data-node-id="165:2183">
                <div className={styles.statItem} data-node-id="165:2184">
                  <div className={styles.statValueRow} data-node-id="165:2185">
                    <p className={styles.statValue} data-node-id="165:2186">
                      {weekStats.officeDays}
                    </p>
                    <div className={styles.buildingIcon} data-name="Basic/company-bilding" data-node-id="165:2187">
                      <div className={styles.buildingIconPart1} data-name="Vector" data-node-id="I165:2187;119:3946">
                        <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                          <img alt="" className={styles.buildingIconImg} src={img4} />
                        </div>
                      </div>
                      <div className={styles.buildingIconPart2} data-name="Vector" data-node-id="I165:2187;119:3947">
                        <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                          <img alt="" className={styles.buildingIconImg} src={img5} />
                        </div>
                      </div>
                      <div className={styles.buildingIconPart3} data-name="Vector" data-node-id="I165:2187;119:3948">
                        <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                          <img alt="" className={styles.buildingIconImg} src={img6} />
                        </div>
                      </div>
                      <div className={styles.buildingIconPart4} data-name="Vector" data-node-id="I165:2187;119:3949">
                        <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                          <img alt="" className={styles.buildingIconImg} src={img7} />
                        </div>
                      </div>
                      <div className={styles.buildingIconPart5} data-name="Vector" data-node-id="I165:2187;119:3950">
                        <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                          <img alt="" className={styles.buildingIconImg} src={img8} />
                        </div>
                      </div>
                      <div className={styles.buildingIconPart6} data-name="Vector" data-node-id="I165:2187;119:3951">
                        <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                          <img alt="" className={styles.buildingIconImg} src={img8} />
                        </div>
                      </div>
                      <div className={styles.buildingIconPart7} data-name="Vector" data-node-id="I165:2187;119:3952">
                        <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                          <img alt="" className={styles.buildingIconImg} src={img8} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.statLabel} data-node-id="165:2188">
                    <p className={styles.statLabelText} data-node-id="165:2189">
                      Office days
                    </p>
                    <p className={styles.statLabelSubtext} data-node-id="165:2190">
                      Required: 3 days
                    </p>
                  </div>
                </div>
                  <div className={styles.statItem} data-node-id="165:2191">
                    <div className={styles.statValueRow} data-node-id="165:2192">
                      <p className={styles.statValue} data-node-id="165:2193">
                        {weekStats.wfhDays}
                      </p>
                    <div className={styles.homeIcon} data-name="Basic/Home2" data-node-id="165:2194">
                      <div className={styles.homeIconInner} data-name="Vector" data-node-id="I165:2194;119:3288">
                        <div className={styles.homeIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                          <img alt="" className={styles.homeIconImg} src={img9} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.statLabel} data-node-id="165:2195">
                    <p className={styles.statLabelText} data-node-id="165:2196">
                      WFH day
                    </p>
                    <p className={styles.statLabelSubtext} data-node-id="165:2197">
                      Required: 2 days
                    </p>
                  </div>
                </div>
                  <div className={styles.statItem} data-node-id="165:2198">
                    <div className={styles.statValueRow} data-node-id="165:2199">
                      <p className={styles.statValue} data-node-id="165:2200">
                        {weekStats.officeStreak}
                      </p>
                    <div className={styles.fireIcon} data-name="Basic/fire" data-node-id="165:2201">
                      <div className={styles.fireIconInner} data-name="Vector" data-node-id="I165:2201;119:4041">
                        <div className={styles.fireIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                          <img alt="" className={styles.fireIconImg} src={img10} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.statLabel} data-node-id="165:2202">
                    <p className={styles.statLabelText} data-node-id="165:2203">
                      Office streak
                    </p>
                    <p className={styles.statLabelSubtext} data-node-id="165:2204">
                      Wow! Going strong ✨
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.statsImage} data-name="web development _ tasks, teamwork, team, working together, website, webpage, people" data-node-id="165:2205">
            <div className={styles.statsImageInner} data-name="web development _ tasks, teamwork, team, working together, website, webpage, people" data-node-id="I165:2205;1:373">
              <div className={styles.statsImageWrapper}>
                <img alt="" className={styles.statsImageImg} src={img11} />
              </div>
            </div>
          </div>
        </div>

          {/* Monthly Stats Card */}
          <div className={styles.monthlyStatsCard} data-name="Stats" data-node-id="202:8325">
            <div className={styles.monthlyStatsContent} data-node-id="202:8326">
              <div className={styles.monthlyStatsRow} data-node-id="202:8327">
                <div className={styles.attendanceCard} data-node-id="202:8328">
                  <p className={styles.attendanceTitle} data-node-id="202:8329">
                    This month's attendance
                  </p>
                  <div className={styles.attendanceStats} data-node-id="202:8330">
                    <div className={styles.attendanceStatItem} data-node-id="202:8331">
                      <div className={styles.statValueRow} data-node-id="202:8332">
                        <p className={styles.statValue} data-node-id="202:8333">
                          {monthlyStats.officeDays}
                        </p>
                        <div className={styles.buildingIcon} data-name="Basic/company-bilding" data-node-id="202:8334">
                          <div className={styles.buildingIconPart1} data-name="Vector" data-node-id="I202:8334;119:3946">
                            <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                              <img alt="" className={styles.buildingIconImg} src={img4} />
                            </div>
                          </div>
                          <div className={styles.buildingIconPart2} data-name="Vector" data-node-id="I202:8334;119:3947">
                            <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                              <img alt="" className={styles.buildingIconImg} src={img5} />
                            </div>
                          </div>
                          <div className={styles.buildingIconPart3} data-name="Vector" data-node-id="I202:8334;119:3948">
                            <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                              <img alt="" className={styles.buildingIconImg} src={img6} />
                            </div>
                          </div>
                          <div className={styles.buildingIconPart4} data-name="Vector" data-node-id="I202:8334;119:3949">
                            <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                              <img alt="" className={styles.buildingIconImg} src={img7} />
                            </div>
                          </div>
                          <div className={styles.buildingIconPart5} data-name="Vector" data-node-id="I202:8334;119:3950">
                            <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                              <img alt="" className={styles.buildingIconImg} src={img8} />
                            </div>
                          </div>
                          <div className={styles.buildingIconPart6} data-name="Vector" data-node-id="I202:8334;119:3951">
                            <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                              <img alt="" className={styles.buildingIconImg} src={img8} />
                            </div>
                          </div>
                          <div className={styles.buildingIconPart7} data-name="Vector" data-node-id="I202:8334;119:3952">
                            <div className={styles.buildingIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                              <img alt="" className={styles.buildingIconImg} src={img8} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.statLabel} data-node-id="202:8335">
                        <p className={styles.statLabelText} data-node-id="202:8336">
                          Office days
                        </p>
                      </div>
                    </div>
                    <div className={styles.attendanceStatItem} data-node-id="202:8337">
                      <div className={styles.statValueRow} data-node-id="202:8338">
                        <p className={styles.statValue} data-node-id="202:8339">
                          {monthlyStats.wfhDays}
                        </p>
                        <div className={styles.homeIcon} data-name="Basic/Home2" data-node-id="202:8340">
                          <div className={styles.homeIconInner} data-name="Vector" data-node-id="I202:8340;119:3288">
                            <div className={styles.homeIconVector} style={{ "--stroke-0": "rgba(231, 116, 121, 1)" } as React.CSSProperties}>
                              <img alt="" className={styles.homeIconImg} src={img9} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.statLabel} data-node-id="202:8341">
                        <p className={styles.statLabelText} data-node-id="202:8342">
                          WFH day
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.leaveRequestsCard} data-node-id="202:8343">
                  <p className={styles.leaveRequestsTitle} data-node-id="202:8344">
                    Leave requests
                  </p>
                  <div className={styles.leaveRequestsStats} data-node-id="202:8345">
                    <div className={styles.leaveRequestStatItem} data-node-id="202:8346">
                      <div className={styles.statValueRow} data-node-id="202:8347">
                        <p className={styles.statValue} data-node-id="202:8348">
                          {leaveRequests.length}
                        </p>
                        <div className={styles.bookmarkIcon} data-name="Basic/bookmark" data-node-id="202:8349">
                          <div className={styles.bookmarkIconInner} data-name="Bookmark" data-node-id="I202:8349;119:4046">
                            <div className={styles.bookmarkIconVector}>
                              <img alt="" className={styles.bookmarkIconImg} src={img12} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.statLabel} data-node-id="202:8350">
                        <p className={styles.statLabelText} data-node-id="202:8351">
                          Total requests
                        </p>
                      </div>
                    </div>
                    <div className={styles.leaveRequestStatItem} data-node-id="202:8352">
                      <div className={styles.statValueRow} data-node-id="202:8353">
                        <p className={styles.statValue} data-node-id="202:8354">
                          {pendingLeaveRequests.length}
                        </p>
                        <div className={styles.clockIconSmall} data-name="Basic/Clock" data-node-id="202:8355">
                          <div className={styles.clockIconInner} data-name="Vector" data-node-id="I202:8355;119:3308">
                            <div className={styles.clockIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                              <img alt="" className={styles.clockIconImg} src={img13} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.statLabel} data-node-id="202:8356">
                        <p className={styles.statLabelText} data-node-id="202:8357">
                          Pending
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Request List Card */}
          <div className={styles.leaveRequestCard} data-name="Leave request" data-node-id="202:8373">
            <div className={styles.leaveRequestContent} data-node-id="202:8374">
              <div className={styles.leaveRequestHeader} data-node-id="202:8375">
                <p className={styles.leaveRequestTitle} data-node-id="202:8376">
                  My leave requests
                </p>
              </div>
              <div className={styles.leaveRequestList} data-node-id="202:8378">
                {leaveRequests.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
                    <p>No leave requests yet</p>
                  </div>
                ) : (
                  leaveRequests.map((request, index) => {
                  const days = getDaysBetween(request.startDate, request.endDate);
                  const isCasual = request.leaveType === 'casual';
                  const isSick = request.leaveType === 'sick';
                  return (
                    <React.Fragment key={request.id}>
                      {index > 0 && (
                        <div className={styles.divider} data-node-id="202:8387">
                          <div className={styles.dividerInner} style={{ "--stroke-0": "rgba(225, 229, 235, 1)" } as React.CSSProperties}>
                            <img alt="" className={styles.dividerImg} src={imgVector2582} />
                          </div>
                        </div>
                      )}
                      <div className={styles.leaveRequestItem} data-node-id={`202:${8379 + index}`}>
                        <div className={styles.leaveRequestItemContent} data-node-id={`202:${8380 + index}`}>
                          <div className={styles.leaveRequestValueRow} data-node-id={`202:${8380 + index}`}>
                            <p className={styles.leaveRequestValue} data-node-id={`202:${8381 + index}`}>
                              {days} {days === 1 ? 'day' : 'days'}
                            </p>
                            {isCasual && (
                              <div className={styles.sunIcon} data-name="Basic/sun-mod" data-node-id={`202:${8382 + index}`}>
                                <div className={styles.sunIconPart1} data-name="Vector" data-node-id={`I202:${8382 + index};119:4053`}>
                                  <div className={styles.sunIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.sunIconImg} src={img15} />
                                  </div>
                                </div>
                                <div className={styles.sunIconPart2} data-name="Vector" data-node-id={`I202:${8382 + index};119:4054`}>
                                  <div className={styles.sunIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.sunIconImg} src={img16} />
                                  </div>
                                </div>
                                <div className={styles.sunIconPart3} data-name="Vector" data-node-id={`I202:${8382 + index};119:4055`}>
                                  <div className={styles.sunIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.sunIconImg} src={img16} />
                                  </div>
                                </div>
                                <div className={styles.sunIconPart4} data-name="Vector" data-node-id={`I202:${8382 + index};119:4056`}>
                                  <div className={styles.sunIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.sunIconImg} src={img17} />
                                  </div>
                                </div>
                                <div className={styles.sunIconPart5} data-name="Vector" data-node-id={`I202:${8382 + index};119:4057`}>
                                  <div className={styles.sunIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.sunIconImg} src={img17} />
                                  </div>
                                </div>
                                <div className={styles.sunIconPart6} data-name="Vector" data-node-id={`I202:${8382 + index};119:4058`}>
                                  <div className={styles.sunIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.sunIconImg} src={img18} />
                                  </div>
                                </div>
                                <div className={styles.sunIconPart7} data-name="Vector" data-node-id={`I202:${8382 + index};119:4059`}>
                                  <div className={styles.sunIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.sunIconImg} src={img18} />
                                  </div>
                                </div>
                                <div className={styles.sunIconPart8} data-name="Vector" data-node-id={`I202:${8382 + index};119:4060`}>
                                  <div className={styles.sunIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.sunIconImg} src={img19} />
                                  </div>
                                </div>
                                <div className={styles.sunIconPart9} data-name="Vector" data-node-id={`I202:${8382 + index};119:4061`}>
                                  <div className={styles.sunIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.sunIconImg} src={img19} />
                                  </div>
                                </div>
                              </div>
                            )}
                            {isSick && (
                              <div className={styles.sirenIcon} data-name="Basic/siren alarm" data-node-id={`202:${8392 + index}`}>
                                <div className={styles.sirenIconInner} data-name="Vector" data-node-id={`I202:${8392 + index};119:3983`}>
                                  <div className={styles.sirenIconVector} style={{ "--stroke-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.sirenIconImg} src={img20} />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={styles.leaveRequestLabel} data-node-id={`202:${8383 + index}`}>
                            <p className={styles.leaveRequestLabelText} data-node-id={`202:${8384 + index}`}>
                              {getLeaveTypeLabel(request.leaveType)}
                            </p>
                            <p className={styles.leaveRequestLabelSubtext} data-node-id={`202:${8385 + index}`}>
                              {formatLeaveDateRange(request.startDate, request.endDate)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.leaveRequestActions}>
                          {request.status === 'pending' && (
                            <div className={styles.pendingTag} data-name="<arc-Tag>" data-node-id={`202:${8386 + index}`}>
                              <div className={styles.tagText} data-name="_<arc-TagText>" data-node-id={`I202:${8386 + index};4553:6917`}>
                                <p className={styles.tagTextContent}>pending</p>
                              </div>
                            </div>
                          )}
                          {request.status === 'pending' && (
                            <div className={styles.cancelTag} data-name="<arc-Tag>" data-node-id={`202:${8387 + index}`} onClick={() => handleCancelLeave(request.id)} style={{ cursor: 'pointer' }}>
                              <div className={styles.tagText} data-name="_<arc-TagText>" data-node-id={`I202:${8387 + index};4553:6937`}>
                                <p className={styles.tagTextContent}>Cancel request</p>
                              </div>
                              <div className={styles.tagIcon} data-name="<arc-Icon Cross Alt 2px>" data-node-id={`I202:${8387 + index};4553:6940`}>
                                <div className={styles.tagIconInner} data-name="Vector" data-node-id={`I202:${8387 + index};4553:6940;4337:2998`}>
                                  <div className={styles.tagIconVector} style={{ "--fill-0": "rgba(238, 115, 112, 1)" } as React.CSSProperties}>
                                    <img alt="" className={styles.tagIconImg} src={img14} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.timeCard} data-node-id="165:2503">
            <div className={styles.clockIcon} data-name="Basic/Clock" data-node-id="165:2505">
              <div className={styles.clockIconInner} data-name="Vector" data-node-id="I165:2505;119:3308">
                <div className={styles.clockIconVector} style={{ "--stroke-0": "rgba(119, 104, 155, 1)" } as React.CSSProperties}>
                  <img alt="" className={styles.clockIconImg} src={img3} />
                </div>
              </div>
            </div>
            <div className={styles.timeCardContent} data-node-id="165:2509">
              <p className={styles.locationText} data-node-id="165:2510">
                Currently in {getLocation()}
              </p>
              <p className={styles.timeLarge} data-node-id="165:2498">
                {formatTime(currentTime)}
              </p>
              <p className={styles.dateText} data-node-id="165:2499">
                {formatDate(currentTime)}
              </p>
            </div>
          </div>
          <div className={styles.calendarCard} data-name="Calendar tile" data-node-id="165:2206">
            <Calendar variant="desktop" markedDates={officeMarkedDates} selectedDate={selectedDate} onDateClick={handleDateSelect} />
            <div className={styles.buttonGroup} data-node-id="165:2208">
              <button 
                className={`${styles.buttonPrimary} ${isSelectedDateMarked() ? styles.buttonPrimaryDisabled : ''}`}
                onClick={handleOfficeToggle}
                disabled={isSelectedDateMarked()}
                data-name="Buttons" 
                data-node-id="165:2209"
              >
                <div className={styles.buttonIcon} data-name="Basic/check-circle" data-node-id="I165:2209;119:4279">
                  <div className={styles.buttonIconInner} data-name="Vector" data-node-id="I165:2209;119:4279;119:3473">
                    <div className={styles.buttonIconVector} style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                      <img alt="" className={styles.buttonIconImg} src={img25} />
                    </div>
                  </div>
                </div>
                <p className={styles.buttonText} data-node-id="I165:2209;119:4275">
                  {isSelectedDateMarked() ? "Office marked" : "I'm in office today"}
                </p>
              </button>
              <button className={styles.buttonSecondary} onClick={handleRequestLeave} data-name="Buttons" data-node-id="165:2210">
                <div className={styles.buttonIcon} data-name="Basic/Calendar" data-node-id="I165:2210;126:2504">
                  <div className={styles.buttonIconInner} data-name="Calendar" data-node-id="I165:2210;126:2504;119:3293">
                    <div className={styles.buttonIconVector}>
                      <img alt="" className={styles.buttonIconImg} src={img26} />
                    </div>
                  </div>
                </div>
                <p className={styles.buttonTextSecondary} data-node-id="I165:2210;126:2505">
                  Request leave
                </p>
              </button>
            </div>
          </div>
        </div>
        </div>
        ) : (
        <div className={styles.rewardsPage}>
          <div className={styles.rewardsContent}>
            {/* Leaderboard Section */}
            <div className={styles.leaderboardCard}>
              <h2 className={styles.leaderboardTitle}>Leaderboard</h2>
              
              {/* Top 3 Podium */}
              <div className={styles.podiumContainer}>
                {[
                  { 
                    rank: 2, 
                    name: 'Michael Park', 
                    descriptor: '12 office days', 
                    score: '1,100', 
                    avatar: 'MP', 
                    avatarImage: 'https://api.dicebear.com/7.x/personas/svg?seed=michael-park-001&backgroundColor=f0f0f0&clothingColor=77689b&gender=male'
                  },
                  { 
                    rank: 1, 
                    name: 'Sarah Chen', 
                    descriptor: '14 office days', 
                    score: '1,250', 
                    avatar: 'SC', 
                    avatarImage: 'https://api.dicebear.com/7.x/personas/svg?seed=sarah-chen-002&backgroundColor=f0f0f0&clothingColor=77689b&gender=female'
                  },
                  { 
                    rank: 3, 
                    name: 'Emma Wilson', 
                    descriptor: '10 office days', 
                    score: '950', 
                    avatar: 'EW', 
                    avatarImage: 'https://api.dicebear.com/7.x/personas/svg?seed=emma-wilson-003&backgroundColor=f0f0f0&clothingColor=77689b&gender=female'
                  },
                ].map((performer) => (
                  <div 
                    key={performer.rank} 
                    className={`${styles.podiumCard} ${performer.rank === 1 ? styles.podiumCardFirst : styles.podiumCardSide}`}
                    style={performer.rank === 1 ? { order: 2 } : performer.rank === 2 ? { order: 1 } : { order: 3 }}
                  >
                    <div className={styles.podiumRankBadge}>{performer.rank}</div>
                    <div className={`${styles.podiumAvatar} ${performer.rank === 1 ? styles.podiumAvatarFirst : ''}`}>
                      <IllustratedAvatar 
                        avatarImage={performer.avatarImage}
                        initials={performer.avatar}
                        className={styles.podiumAvatarText}
                      />
                    </div>
                    <div className={styles.podiumInfo}>
                      <p className={styles.podiumName}>{performer.name}</p>
                      <p className={styles.podiumDescriptor}>{performer.descriptor}</p>
                    </div>
                    <div className={styles.podiumScore}>
                      <p className={styles.podiumScoreValue}>{performer.score}</p>
                      <p className={styles.podiumScoreLabel}>points</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ranks 4-5 List */}
              <div className={styles.leaderboardList}>
                {[
                  { 
                    rank: 4, 
                    name: 'David Lee', 
                    descriptor: '8 office days', 
                    score: '780', 
                    avatar: 'DL', 
                    avatarImage: 'https://api.dicebear.com/7.x/personas/svg?seed=david-lee-004&backgroundColor=f0f0f0&clothingColor=77689b&gender=male'
                  },
                  { 
                    rank: 5, 
                    name: 'Lisa Brown', 
                    descriptor: '7 office days', 
                    score: '650', 
                    avatar: 'LB', 
                    avatarImage: 'https://api.dicebear.com/7.x/personas/svg?seed=lisa-brown-005&backgroundColor=f0f0f0&clothingColor=77689b&gender=female'
                  },
                ].map((performer) => (
                  <div 
                    key={performer.rank} 
                    className={styles.leaderboardItem}
                  >
                    <div className={styles.leaderboardRank}>{performer.rank}</div>
                    <div className={styles.leaderboardAvatar}>
                      <IllustratedAvatar 
                        avatarImage={performer.avatarImage}
                        initials={performer.avatar}
                        className={styles.leaderboardAvatarText}
                      />
                    </div>
                    <div className={styles.leaderboardInfo}>
                      <p className={styles.leaderboardName}>{performer.name}</p>
                      <p className={styles.leaderboardDescriptor}>{performer.descriptor}</p>
                    </div>
                    <div className={styles.leaderboardScore}>
                      <p className={styles.leaderboardScoreValue}>{performer.score}</p>
                      <p className={styles.leaderboardScoreLabel}>points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Position Card */}
            <div className={styles.yourPositionCard}>
              <div className={styles.yourPositionHeader}>
                <h3 className={styles.yourPositionTitle}>Your position</h3>
                <div className={styles.yourPositionRank}>#8</div>
              </div>
              <div className={styles.yourPositionContent}>
                <div className={styles.yourPositionStats}>
                  <div className={styles.yourPositionStatItem}>
                    <p className={styles.yourPositionStatValue}>{monthlyStats.officeDays}</p>
                    <p className={styles.yourPositionStatLabel}>Office days</p>
                  </div>
                  <div className={styles.yourPositionStatItem}>
                    <p className={styles.yourPositionStatValue}>{weekStats.officeStreak}</p>
                    <p className={styles.yourPositionStatLabel}>Week streak</p>
                  </div>
                  <div className={styles.yourPositionStatItem}>
                    <p className={styles.yourPositionStatValue}>420</p>
                    <p className={styles.yourPositionStatLabel}>Total points</p>
                  </div>
                </div>
                <p className={styles.yourPositionMessage}>You're climbing the ranks! Keep it up ✨</p>
              </div>
            </div>

            {/* Available Rewards */}
            <div className={styles.rewardsSection}>
              <h2 className={styles.rewardsSectionTitle}>Available rewards</h2>
              <div className={styles.rewardsGrid}>
                {[
                  { id: '1', title: 'Amazon voucher', points: '500 points', available: true, iconType: 'card' },
                  { id: '2', title: 'Coffee shop gift card', points: '300 points', available: true, iconType: 'coffee' },
                  { id: '3', title: 'Extra day off', points: '1000 points', available: false, iconType: 'calendar' },
                  { id: '4', title: 'Lunch voucher', points: '200 points', available: true, iconType: 'food' },
                  { id: '5', title: 'Book store credit', points: '400 points', available: true, iconType: 'book' },
                  { id: '6', title: 'Wellness session', points: '600 points', available: false, iconType: 'wellness' },
                ].map((reward) => {
                  const isRedeemed = redeemedRewards.has(reward.id);
                  const isAvailable = reward.available && !isRedeemed;
                  
                  // Render contextual icon based on reward type
                  const renderRewardIcon = () => {
                    const iconColor = '#77689b';
                    const iconSize = 24;
                    switch (reward.iconType) {
                      case 'card':
                        return (
                          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="5" width="20" height="14" rx="2" stroke={iconColor} strokeWidth="2" fill="none"/>
                            <line x1="2" y1="10" x2="22" y2="10" stroke={iconColor} strokeWidth="2"/>
                            <circle cx="6" cy="15" r="1.5" fill={iconColor}/>
                            <circle cx="9" cy="15" r="1.5" fill={iconColor}/>
                            <circle cx="12" cy="15" r="1.5" fill={iconColor}/>
                          </svg>
                        );
                      case 'coffee':
                        return (
                          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 2v6h10V2" stroke={iconColor} strokeWidth="2" strokeLinecap="round" fill="none"/>
                            <path d="M4 8h14c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4" stroke={iconColor} strokeWidth="2" fill="none"/>
                            <line x1="6" y1="14" x2="6" y2="20" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
                            <line x1="10" y1="14" x2="10" y2="20" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        );
                      case 'calendar':
                        return (
                          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="5" width="16" height="16" rx="2" stroke={iconColor} strokeWidth="2" fill="none"/>
                            <line x1="4" y1="10" x2="20" y2="10" stroke={iconColor} strokeWidth="2"/>
                            <line x1="9" y1="3" x2="9" y2="7" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
                            <line x1="15" y1="3" x2="15" y2="7" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
                            <circle cx="8" cy="15" r="1" fill={iconColor}/>
                            <circle cx="12" cy="15" r="1" fill={iconColor}/>
                            <circle cx="16" cy="15" r="1" fill={iconColor}/>
                          </svg>
                        );
                      case 'food':
                        return (
                          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="12" cy="16" rx="8" ry="2" stroke={iconColor} strokeWidth="2" fill="none"/>
                            <path d="M12 4v12M8 8h8M8 12h8" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
                            <circle cx="10" cy="6" r="1" fill={iconColor}/>
                            <circle cx="14" cy="6" r="1" fill={iconColor}/>
                          </svg>
                        );
                      case 'book':
                        return (
                          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={iconColor} strokeWidth="2" fill="none"/>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={iconColor} strokeWidth="2" fill="none"/>
                            <line x1="9" y1="7" x2="15" y2="7" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
                            <line x1="9" y1="11" x2="15" y2="11" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        );
                      case 'wellness':
                        return (
                          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8" stroke={iconColor} strokeWidth="2" fill="none"/>
                            <path d="M12 4v4M12 16v4M4 12h4M16 12h4" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
                            <circle cx="12" cy="12" r="2" fill={iconColor}/>
                          </svg>
                        );
                      default:
                        return null;
                    }
                  };
                  
                  return (
                    <div key={reward.id} className={styles.rewardCard}>
                      <div className={styles.rewardIcon}>
                        {renderRewardIcon()}
                      </div>
                      <h3 className={styles.rewardTitle}>{reward.title}</h3>
                      <p className={styles.rewardPoints}>{reward.points}</p>
                      <button
                        className={`${styles.rewardButton} ${!isAvailable ? styles.rewardButtonDisabled : ''}`}
                        onClick={() => handleRedeemReward(reward.id)}
                        disabled={!isAvailable}
                      >
                        {isRedeemed ? 'Redeemed' : 'Redeem'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <div className={styles.footerHeart}>♥</div>
            <div className={styles.footerText}>
              <span className={styles.footerAZ}>AZ</span>
              <span className={styles.footerDesignStudios}> Design Studios</span>
            </div>
          </div>
          <p className={styles.footerCredit}>Designed by AZ Design Studios</p>
        </div>
      </footer>
      <LeaveRequestModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}