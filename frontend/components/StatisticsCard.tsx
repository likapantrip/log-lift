import { Box } from '@mui/material';

type Props = {
  label: string;
  value: number;
  unit: string;
}

export default function StatisticsCard({ label, value, unit}:Props) {
  return (
    <Box
      height={120}
      width={120}
      border={1}
      borderColor="lightgrey"
      borderRadius={2}
      px={1}
      py={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box>{label}</Box>
      <Box flexDirection="row" alignItems="center" display="flex">
        <Box fontSize={36}>{value}</Box>
        <Box>{unit}</Box>
      </Box>
    </Box>
  );
}