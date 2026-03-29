import { Box } from '@mui/material';

type Props = {
  label: string;
  value: string;
}

export default function MessageCard({ label, value}:Props) {
  return (
    <Box
      height={150}
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
      <Box fontSize={16}>{label}</Box>
      <Box flexDirection="row" alignItems="center" display="flex">
        <Box fontSize={20}>{value}</Box>
      </Box>
    </Box>
  );
}