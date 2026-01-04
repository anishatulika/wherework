import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';

const img3 = "https://www.figma.com/api/mcp/asset/eab8fac1-b0aa-466c-a736-860e10cbe34d";
const img4 = "https://www.figma.com/api/mcp/asset/c69ff3fb-9c5b-494f-ab58-81a65481ea5a";
const img5 = "https://www.figma.com/api/mcp/asset/d1497dcf-102b-494f-b890-dc8c4ad2c414";
const img6 = "https://www.figma.com/api/mcp/asset/5303226d-0ea0-4cc6-9b75-f040672f61cf";

type CalendarProps = {
  variant?: 'mobile' | 'desktop';
  markedDates?: Set<string>;
  selectedDate?: string;
  onDateClick?: (dateStr: string) => void;
};

export default function Calendar({ variant = 'mobile', markedDates = new Set(), selectedDate, onDateClick }: CalendarProps) {
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Sync view with selectedDate when it changes
  useEffect(() => {
    if (selectedDate) {
      const selected = new Date(selectedDate);
      setViewYear(selected.getFullYear());
      setViewMonth(selected.getMonth());
    }
  }, [selectedDate]);

  const currentYear = viewYear;
  const currentMonth = viewMonth;
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Monday = 0

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setViewMonth(11);
      setViewYear(currentYear - 1);
    } else {
      setViewMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setViewMonth(0);
      setViewYear(currentYear + 1);
    } else {
      setViewMonth(currentMonth + 1);
    }
  };

  const handlePrevYear = () => {
    setViewYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setViewYear(currentYear + 1);
  };
  
  const days = Array.from({ length: 35 }, (_, i) => {
    if (i < adjustedFirstDay) return null; // Empty cells before month starts
    const dayNum = i - adjustedFirstDay + 1;
    if (dayNum > lastDayOfMonth.getDate()) return null; // Empty cells after month ends
    return dayNum;
  });

  const isDateMarked = (day: number) => {
    if (day === null) return false;
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = date.toISOString().split('T')[0];
    return markedDates.has(dateStr);
  };

  const isCurrentDate = (day: number) => {
    if (day === null) return false;
    const today = new Date();
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  const isSelected = (day: number) => {
    if (day === null || !selectedDate) return false;
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === selectedDate;
  };

  const handleDateClick = (day: number) => {
    if (day === null || !onDateClick) return;
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = date.toISOString().split('T')[0];
    onDateClick(dateStr);
  };

  return (
    <div className={styles.calendar} data-name="calendar">
      <div className={styles.calendarHeader} data-name="header">
        <div className={styles.chevronLeft} onClick={handlePrevMonth} style={{ cursor: 'pointer' }}>
          <div className={styles.chevronContainer} data-name="Arrows/chevron">
            <div className={styles.chevronInner}>
              <div className={styles.chevronVector}>
                <div className={styles.chevronVectorInner} style={{ "--stroke-0": "rgba(119, 104, 155, 1)" } as React.CSSProperties}>
                  <img alt="" className={styles.chevronImg} src={img3} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.monthYear} data-name="Month Year">
          <div className={styles.month} data-name="_<arc-CalendarMonth>">
            <div className={styles.monthInner}>
              <div className={styles.monthText}>
                <p className={styles.monthTextP}>
                  {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(currentYear, currentMonth, 1)).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.year} data-name="<arc-Calendar>/_<arc-CalendarYear>/Default" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div className={styles.chevronLeft} onClick={handlePrevYear} style={{ cursor: 'pointer', width: '16px', height: '16px' }}>
              <div className={styles.chevronContainer} data-name="Arrows/chevron">
                <div className={styles.chevronInner}>
                  <div className={styles.chevronVector}>
                    <div className={styles.chevronVectorInner} style={{ "--stroke-0": "rgba(119, 104, 155, 1)" } as React.CSSProperties}>
                      <img alt="" className={styles.chevronImg} src={img3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.yearText}>
              <p className={styles.yearTextP}>{currentYear}</p>
            </div>
            <div className={styles.chevronRight} onClick={handleNextYear} style={{ cursor: 'pointer', width: '16px', height: '16px' }}>
              <div className={styles.chevronContainer} data-name="Arrows/chevron">
                <div className={styles.chevronInner}>
                  <div className={styles.chevronVector}>
                    <div className={styles.chevronVectorInner} style={{ "--stroke-0": "rgba(119, 104, 155, 1)" } as React.CSSProperties}>
                      <img alt="" className={styles.chevronImg} src={img4} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chevronRight} onClick={handleNextMonth} style={{ cursor: 'pointer' }}>
          <div className={styles.chevronContainer} data-name="Arrows/chevron">
            <div className={styles.chevronInner}>
              <div className={styles.chevronVector}>
                <div className={styles.chevronVectorInner} style={{ "--stroke-0": "rgba(119, 104, 155, 1)" } as React.CSSProperties}>
                  <img alt="" className={styles.chevronImg} src={img4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.calendarGrid} data-name="_sub_<arc-Calendar-48pxTapArea>">
        <div className={styles.calendarSkeleton} data-name="_<arc-CalendarSkeleton-48pxTapArea>">
          {dayLabels.map((day, idx) => (
            <div key={`day-${idx}`} className={styles.calendarDay} data-name="_sub_<arc-CalendarDay>">
              <div className={styles.contentContainer}>
                <div className={styles.dayLabel}>
                  <p className={styles.dayLabelText}>{day}</p>
                </div>
              </div>
            </div>
          ))}
          {days.map((day, idx) => {
            if (day === null) {
              return (
                <div key={`empty-${idx}`} className={styles.calendarNumberEmpty} data-name="_sub_<arc-CalendarNumbers>">
                  <div className={styles.contentContainerEmpty} />
                </div>
              );
            }
            const isOfficeDay = isDateMarked(day);
            const isCurrentDay = isCurrentDate(day);
            const isSelectedDay = isSelected(day);
            return (
              <div 
                key={`day-${day}`} 
                className={styles.calendarNumber} 
                data-name="_sub_<arc-CalendarNumbers"
                onClick={() => handleDateClick(day)}
                style={{ cursor: onDateClick ? 'pointer' : 'default' }}
              >
                {isOfficeDay && (
                  <div className={styles.circle} data-name="Circle">
                    <div className={styles.circleInner} style={{ "--stroke-0": "rgba(232, 134, 134, 1)" } as React.CSSProperties}>
                      <img alt="" className={styles.circleImg} src={img5} />
                    </div>
                  </div>
                )}
                <div className={styles.contentContainer}>
                  <div className={isOfficeDay ? styles.dayNumberSemibold : styles.dayNumber} style={isSelectedDay && !isOfficeDay ? { 
                    backgroundColor: 'rgba(119, 104, 155, 0.1)', 
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  } : {}}>
                    <p className={styles.dayNumberText}>{day}</p>
                  </div>
                </div>
                {isCurrentDay && (
                  <div className={styles.currentDateDot} data-name="Current date dot">
                    <div className={styles.currentDateDotInner} style={{ "--fill-0": "rgba(119, 104, 155, 1)" } as React.CSSProperties}>
                      <img alt="" className={styles.currentDateDotImg} src={img6} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
