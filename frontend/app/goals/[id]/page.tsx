'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from '@mui/material';
import StatisticsCard from '../../../components/StatisticsCard';
import DateCard from '../../../components/DateCard';
import MessageCard from '../../../components/MessageCard';
import GoalModal from '@/components/GoalModal';
import LearningLogModal from '@/components/LearningLogModal';
import { LearningLog } from '@/types/learningLog';
import { ButtonColors } from '@/types/colorStyles';

const totalStudyMinutes = {
  "total_study_minutes": 300
};

const latestWeeklyReportData = {
  "id": 1,
  "issue_date": "2026-03-02",
  "period_start_date": "2026-02-23",
  "period_end_date": "2026-03-01",
  "weekly_study_minutes": 150,
  "achievement_rate": 120.0,
  "ai_summary": 9,
  "ai_keep": "目標達成率が100%を超えたことは、素晴らしいです。",
  "ai_try": "学習していない日があるので、少しでも毎日学習できるとさらに素晴らしいです"
};

const learningLogs = {
  "learning_logs": [
    {
      "id": 15,
      "goal_id": 1,
      "study_date": "2026-03-03",
      "study_minutes": 35,
      "result": "chapter2を完了し、chapter3を開始",
      "reflection": "調子が良かったので、少し多めに勉強！"
    },
    {
      "id": 19,
      "goal_id": 1,
      "study_date": "2026-03-03",
      "study_minutes": 10,
      "result": "chapter3を完了",
      "reflection": "午後も勉強できた！"
    }
  ]
};

const goal = {
  "id": 1,
  "name": "英語学習",
  "description": "英検3級を取得するために、毎日20分の勉強をする",
  "weekly_target_minutes": 140,
  "start_date": "2026-02-15",
  "end_date": "2026-04-30",
  "status": "active"
};

const emptyLearningLog = {
  id: null,
  goal_id: goal.id,
  study_date: '',
  study_minutes: 0,
  result: '',
  reflection: '',
};

export default function ShowGoal() {
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isLearningLogOpen, setIsLearningLogOpen] = useState(false);
  const [selectedLearningLog, setSelectedLearningLog] = useState<LearningLog>(emptyLearningLog);

  const issue_date = new Date(latestWeeklyReportData.issue_date);
  return (
    <div>
      {/* 進捗状況 */}
      <Box className='flex justify-between items-center my-4 px-4'>
        <Box className='flex flex-col'>
          <Box className='flex justify-between items-center'>
            <Box className='font-bold '>{`目標: ${goal.name}`}</Box>
            <Box className='flex flex-col gap-2 w-fit'>
              <Button 
                variant="outlined"
                sx={ButtonColors.GrayButton}
                onClick={() => setIsGoalOpen(true)}
              >
                  目標編集
              </Button>
              <Button
                variant="contained"
                sx={ButtonColors.BlueButton}
                onClick={() => {
                  setSelectedLearningLog(emptyLearningLog);
                  setIsLearningLogOpen(true);
                }}
              >
                  新しいログを追加
              </Button>
            </Box>
          </Box>

          {/* モーダル */}
          <GoalModal 
            open={isGoalOpen}
            onClose={() => setIsGoalOpen(false)}
            goal={goal}
          />
          <LearningLogModal 
            open={isLearningLogOpen}
            onClose={() => {
              setIsLearningLogOpen(false);
              setSelectedLearningLog(emptyLearningLog);
            }}
            learningLog={selectedLearningLog}
          />

          <Box className='flex flex-col gap-4'>
            <Box className='font-bold underline'>進捗状況</Box>
            <Box className='flex gap-4'>
              <StatisticsCard label="累計学習時間" value={totalStudyMinutes.total_study_minutes} unit="分" />
              <StatisticsCard label="先週の総評" value={latestWeeklyReportData.ai_summary} unit="/10点" />
              <StatisticsCard label="先週の学習時間" value={latestWeeklyReportData.weekly_study_minutes} unit="分" />
              <StatisticsCard label="先週の達成率" value={latestWeeklyReportData.achievement_rate} unit="%" />
              <DateCard label="レポート発行日" value={issue_date} />
            </Box>
            <Box className='flex gap-4'>
              <MessageCard label="Keep" value={latestWeeklyReportData.ai_keep} />
              <MessageCard label="Try" value={latestWeeklyReportData.ai_try} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ログ一覧 */}
      <Table>
        <TableHead>
          <TableRow>
            {['学習日', '学習時間', '学習結果', '感想'].map((headerName) => (
              <TableCell key={headerName}>
                {headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {learningLogs.learning_logs.map((log) => (
            <TableRow
              key={log.id}
              onClick={() => {
                setSelectedLearningLog(log);
                setIsLearningLogOpen(true);
              }}
              sx ={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <TableCell>{log.study_date}</TableCell>
              <TableCell>{log.study_minutes}</TableCell>
              <TableCell>{log.result}</TableCell>
              <TableCell>{log.reflection}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box className='flex justify-center gap-4 px-4 mt-4'>
        <Button variant="outlined" sx={ButtonColors.GrayButton} component={Link} href="/">
          ダッシュボードへ戻る
        </Button>
      </Box>
    </div>
  );
}