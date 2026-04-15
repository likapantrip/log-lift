import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { ButtonColors } from '@/styles/colorStyles';
import { emptyLearningLog } from '@/features/learning-log/form';
import { LearningLogProps } from '@/features/learning-log/types';

export default function LearningLogModal({ open, onClose, learningLog }: LearningLogProps) {
  const isEdit = learningLog?.id != null; // IDがあれば編集モード、なければ新規作成モード

  useEffect(() => {
    if (!open) return; // モーダルが開いていないときは何もしない

    if (learningLog && learningLog.id != null) {
      //編集モードの場合のみフォームに値をセット
      setFormData({
        id: learningLog.id?.toString(),
        goal_id: learningLog.goal_id?.toString(),
        study_date: learningLog.study_date ?? '',
        study_minutes: learningLog.study_minutes?.toString(),
        result: learningLog.result ?? '',
        reflection: learningLog.reflection ?? '',
      });
    } else {
      setFormData(emptyLearningLog(learningLog.goal_id));
    }
  }, [open, learningLog]);

  const [formData, setFormData] = useState({
    id: '',
    goal_id: '',
    study_date: '',
    study_minutes: '',
    result: '',
    reflection: '',
  });

  const handleDelete = async () => {
    try {
      // APIリクエスト
      console.log('削除するID', formData.id);
      onClose();
    } catch (error) {
      // エラーハンドリング
    }
  };

  const handleSave = async () => {
    // バリデーション
    try {
      const payload = {
        id: formData.id,
        goal_id: formData.goal_id,
        study_date: formData.study_date,
        study_minutes: parseInt(formData.study_minutes, 10),
        result: formData.result,
        reflection: formData.reflection,
      };
      // APIリクエスト
      console.log('保存するデータ', payload);
      onClose();
    } catch (error) {
      // エラーハンドリング
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} >
        <DialogContent>
          <TextField
            label="学習日"
            fullWidth
            margin="normal"
            type='date'
            slotProps={{ inputLabel: { shrink: true } }}
            value={formData.study_date}
            onChange={(e) => setFormData({ ...formData, study_date: e.target.value })}
          />
          <TextField
            label="学習時間"
            fullWidth
            margin="normal"
            type='number'
            value={formData.study_minutes}
            onChange={(e) => setFormData({ ...formData, study_minutes: e.target.value })}
          />
          <TextField
            label="学習結果"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.result}
            onChange={(e) => setFormData({ ...formData, result: e.target.value })}
          />
          <TextField
            label="感想"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.reflection}
            onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          {isEdit && <Button variant='outlined' sx={{...ButtonColors.GrayButton, mr: 'auto'}} onClick={handleDelete}>削除</Button>}
          <Box className='flex gap-2'>
            <Button variant="outlined" sx={ButtonColors.GrayButton} onClick={onClose}>キャンセル</Button>
            <Button variant="contained" sx={ButtonColors.BlueButton} onClick={handleSave}>保存</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
