import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { ButtonColors } from '@/types/colorStyles';
import { GoalProps, GoalStatus, emptyGoalForm } from '@/types/goal';

export default function GoalModal( {open, onClose, goal}: GoalProps ) {
  const isCreateMode = goal === null; // goalがnullの場合は作成モード
  const isArchived = goal?.status === 'archived'; // 目標がアーカイブされているかどうか

  useEffect(() => {
    if (!open) return; // モーダルが開いていないときは何もしない

    if (goal) {
      setFormData({
        id: goal.id?.toString() ?? '',
        name: goal.name ?? '',
        description: goal.description ?? '',
        weekly_target_minutes: goal.weekly_target_minutes?.toString() ?? '0',
        start_date: goal.start_date ?? '',
        end_date: goal.end_date ?? '',
        status: goal.status ?? 'active' as GoalStatus,
      });
    } else {
      setFormData(emptyGoalForm);
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

  const handleStatusChange = async () => {
    try {
      const payload = {
        id: formData.id,
        status: formData.status === 'archived' ? 'active' : 'archived',
      };
      // APIリクエスト
      console.log('送信データ', payload);
      onClose();
    } catch (error) {
      // エラーハンドリング
    }
  };

  const handleSave = async () => {
    // バリデーション
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        weekly_target_minutes: parseInt(formData.weekly_target_minutes, 10),
        start_date: formData.start_date,
        end_date: formData.end_date,
        status: 'active',
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
            disabled={isArchived}
          />
          <TextField
            label="説明"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={isArchived}
          />
          <TextField
            label="週間目標時間（分）"
            fullWidth
            margin="normal"
            type="number"
            value={formData.weekly_target_minutes}
            onChange={(e) => setFormData({ ...formData, weekly_target_minutes: e.target.value })}
            disabled={isArchived}
          />
          <TextField
            label="開始日"
            fullWidth
            margin="normal"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            disabled={isArchived}
          />
          <TextField
            label="終了日"
            fullWidth
            margin="normal"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            disabled={isArchived}
          />
        </DialogContent>
        <DialogActions>
          {!isCreateMode &&
            <Button
              variant='outlined'
              sx={{...ButtonColors.GrayButton, mr: 'auto'}}
              onClick={handleStatusChange}
            >
              {isArchived ? 'アクティブに戻す' : 'アーカイブ'}
            </Button>
          }
          {!isArchived &&
            <Box className='flex gap-2'>
              <Button variant="outlined" sx={ButtonColors.GrayButton} onClick={onClose}>キャンセル</Button>
              <Button variant="contained" sx={ButtonColors.BlueButton} onClick={handleSave}>保存</Button>
            </Box>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}