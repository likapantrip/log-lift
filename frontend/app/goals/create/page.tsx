import {
  Box,
  Button,
  TextField,
} from '@mui/material';
import { ButtonColors } from '@/types/colorStyles';

export default function CreateGoal() {
  return (
    <div>
      <Box>
        <TextField label="目標名" fullWidth margin="normal" />
        <TextField label="説明" fullWidth margin="normal" multiline rows={4} />
        <TextField label="週間目標時間（分）" fullWidth margin="normal" type="number" />
        <TextField label="開始日" fullWidth margin="normal" type="date" slotProps={{ inputLabel: { shrink: true } }} />
        <TextField label="終了日" fullWidth margin="normal" type="date" slotProps={{ inputLabel: { shrink: true } }} />
      </Box>
      <Box className='flex justify-end gap-4 px-4'>
        <Button variant="outlined" sx={ButtonColors.GrayButton}>
          キャンセル
        </Button>
        <Button variant="contained" sx={ButtonColors.BlueButton}>
          作成
        </Button>
      </Box>
    </div>
  );
}
