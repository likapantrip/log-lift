'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import StatisticsCard from '../components/StatisticsCard';
import { ButtonColors } from '@/types/colorStyles';
import GoalModal from '@/components/GoalModal';
import { GoalStatus } from '@/types/goal';

const dashboardData = {
  "week_start": "2026-03-02",
  "week_end": "2026-03-08",
  "weekly_study_minutes": 300,
  "weekly_target_minutes": 280,
  "weekly_achievement_rate": 107.1
};

const goalsData = [
  {
    "id": 1,
    "name": "英語学習",
    "description": "英検3級を取得するために、毎日20分の勉強をする",
    "weekly_target_minutes": 140,
    "start_date": "2026-02-15",
    "end_date": "2026-04-30",
    "status": "active" as GoalStatus,
  },
  {
    "id": 2,
    "name": "Python学習",
    "description": "PythonコードでAPI作成ができるようになる",
    "weekly_target_minutes": 210,
    "start_date": "2026-02-10",
    "end_date": "2026-05-31",
    "status": "active" as GoalStatus,
  }
];

export default function Home() {
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  const router = useRouter();
  const handleGoalShow = (id: number) => {
    router.push(`/goals/${id}`);
  };
  return (
    <div>
      {/* ダッシュボード */}
      <Box className='flex justify-between items-center my-4 px-4'>
        <Box className='flex flex-col gap-4'>
          <Box className='font-bold underline'>今週の進捗状況</Box>
          <Box className='flex gap-4'>
            <StatisticsCard label="達成率" value={dashboardData.weekly_achievement_rate} unit="%" />
            <StatisticsCard label="学習時間" value={dashboardData.weekly_study_minutes} unit="分" />
            <StatisticsCard label="目標時間" value={dashboardData.weekly_target_minutes} unit="分" />
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={ButtonColors.BlueButton}
          onClick={() => setIsGoalOpen(true)}
        >
          新しい目標を追加
        </Button>
      </Box>

      {/* モーダル */}
      <GoalModal 
        open={isGoalOpen}
        onClose={() => setIsGoalOpen(false)}
        goal={null}
      />

      {/* 目標一覧 */}
      <Table>
        <TableHead>
          <TableRow>
            {['目標名', '開始日', '終了日', '状態'].map((headerName) => (
              <TableCell key={headerName}>
                {headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {goalsData.map((goal) => (
            <TableRow 
              key={goal.id}
              onClick={() => handleGoalShow(goal.id)}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
               }}
            >
              <TableCell>{goal.name}</TableCell>
              <TableCell>{goal.start_date}</TableCell>
              <TableCell>{goal.end_date}</TableCell>
              <TableCell>{goal.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
