import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { ButtonColors } from '@/types/colorStyles';
import { GoalProps } from '@/types/goal';

export default function EditGoalModal( {open, onClose, goal}: GoalProps ) {
  useEffect(() => {
    if (open && goal) {
      setFormData({
        id: goal.id?.toString() ?? '',
        name: goal.name ?? '',
        description: goal.description ?? '',
        weekly_target_minutes: goal.weekly_target_minutes?.toString() ?? '0',
        start_date: goal.start_date ?? '',
        end_date: goal.end_date ?? '',
        status: goal.status ?? 'active',
      });
    }
  }, [open, goal]);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    weekly_target_minutes: '0',
    start_date: '',
    end_date: '',
    status: 'active',
  });

  const handleSave = async () => {
    // バリデーション
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        weekly_target_minutes: parseInt(formData.weekly_target_minutes, 10),
        start_date: formData.start_date,
        end_date: formData.end_date,
        status: formData.status,
      };
      // データ保存
      console.log('送信データ', payload);
      // 成功したらモーダルを閉じる
      onClose();
    } catch (error) {
      // エラーハンドリング
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <TextField
            label="目標名"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="説明"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            label="週間目標時間（分）"
            fullWidth
            margin="normal"
            type="number"
            value={formData.weekly_target_minutes}
            onChange={(e) => setFormData({ ...formData, weekly_target_minutes: e.target.value })}
          />
          <TextField
            label="開始日"
            fullWidth
            margin="normal"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
          />
          <TextField
            label="終了日"
            fullWidth
            margin="normal"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
          />
          <TextField
            label="ステータス"
            fullWidth
            margin="normal"
            select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <MenuItem value="active">active</MenuItem>
            <MenuItem value="archived">archived</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" sx={ButtonColors.GrayButton} onClick={onClose}>キャンセル</Button>
          <Button variant="contained" sx={ButtonColors.BlueButton} onClick={handleSave}>保存</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}