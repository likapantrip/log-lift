'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Link,
} from '@mui/material';
import { ButtonColors } from '@/types/colorStyles';

type CreateGoalProps = {
  goal: {
    id: number;
    name: string;
    description: string;
    weekly_target_minutes: number;
    start_date: string;
    end_date: string;
    status: string;
  };
};

export default function CreateGoal() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    weekly_target_minutes: '0',
    start_date: '',
    end_date: '',
    status: 'active',
  });
  
  const router = useRouter();
  const handleSave = () => {
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
      console.log('新規作成データ', payload);
      // 成功したら画面遷移
      router.push('/');
    } catch (error) {
      // エラーハンドリング
    }
  };
  return (
    <div>
      <Box>
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
          multiline rows={4} 
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
      </Box>
      <Box className='flex justify-end gap-4 px-4'>
        <Button variant="outlined" sx={ButtonColors.GrayButton} component={Link} href="/">
          キャンセル
        </Button>
        <Button variant="contained" sx={ButtonColors.BlueButton} onClick={handleSave}>
          作成
        </Button>
      </Box>
    </div>
  );
}
