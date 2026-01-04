import React, { useState } from 'react';
import styles from './LeaveRequestModal.module.css';

type LeaveRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeaveRequestData) => void;
};

export type LeaveRequestData = {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
};

export default function LeaveRequestModal({ isOpen, onClose, onSubmit }: LeaveRequestModalProps) {
  const [formData, setFormData] = useState<LeaveRequestData>({
    leaveType: 'casual',
    startDate: '',
    endDate: '',
    reason: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ leaveType: 'casual', startDate: '', endDate: '', reason: '' });
    onClose();
  };

  const handleCancel = () => {
    setFormData({ leaveType: 'casual', startDate: '', endDate: '', reason: '' });
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Request Leave</h2>
          <button className={styles.closeButton} onClick={handleCancel} aria-label="Close">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="leaveType" className={styles.label}>
              Leave Type
            </label>
            <select
              id="leaveType"
              className={styles.select}
              value={formData.leaveType}
              onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
              required
            >
              <option value="casual">Casual leave</option>
              <option value="sick">Sick leave</option>
              <option value="vacation">Vacation</option>
              <option value="personal">Personal leave</option>
            </select>
          </div>
          <div className={styles.dateRow}>
            <div className={styles.formGroup}>
              <label htmlFor="startDate" className={styles.label}>
                Start date
              </label>
              <input
                type="date"
                id="startDate"
                className={styles.input}
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endDate" className={styles.label}>
                End date
              </label>
              <input
                type="date"
                id="endDate"
                className={styles.input}
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="reason" className={styles.label}>
              Reason
            </label>
            <textarea
              id="reason"
              className={styles.textarea}
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Reason for leave"
              rows={4}
              required
            />
          </div>
          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Request leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
