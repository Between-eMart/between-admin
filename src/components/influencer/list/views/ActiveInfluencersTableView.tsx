import {
  Avatar,
  Box,
  Button,
  Chip, ChipProps,
  CircularProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Influencer, InfluencerCategory, ProfileStatus } from '~/models';
import { ActiveInfluencerSearchBoxView } from './ActiveInfluencerSeachBoxView';
import { FindActiveInfluencersQuery } from '~/apis';

const statusColorMap: Record<string, ChipProps['color']> = {
  [`${ProfileStatus.CREATED}`]: 'default',
  [`${ProfileStatus.REQUESTED}`]: 'info',
  [`${ProfileStatus.VERIFIED}`]: 'success',
  [`${ProfileStatus.REJECTED}`]: 'warning',
  [`${ProfileStatus.BLOCKED}`]: 'error',
};


export const ActiveInfluencersTableView = (
  {
    influencers,
    total,
    offset,
    limit,
    onPageChange,
    onPageLimitChange,
    onDetail,
    searchQuery,
    onChangeSearchProperties,
    onSearch,
    categories,
    onDownloadAll,
  }: {
    influencers: Influencer[];
    total: number;
    offset: number;
    limit: number;
    onPageChange: (offset: number) => void;
    onPageLimitChange: (limit: number) => void;
    onDetail: (influencer: Influencer) => void;
    searchQuery: FindActiveInfluencersQuery;
    onChangeSearchProperties: (
      key: keyof FindActiveInfluencersQuery,
      value: string | number | number[] | boolean | undefined
    ) => void;
    onSearch: () => void;
    categories: InfluencerCategory[];
    onDownloadAll: () => Promise<void>;
  },
) => {
  //
  const perPageOptions = [10, 25, 50, 100];
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownloadAll();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <ActiveInfluencerSearchBoxView
        categories={categories}
        onChangeSearchProperties={onChangeSearchProperties}
        onSearch={onSearch}
        searchQuery={searchQuery}
      />

      {/* Download Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="success"
          startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download All as Excel'}
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Instagram</b></TableCell>
              <TableCell><b>Contact</b></TableCell>
              <TableCell><b>Gender</b></TableCell>
              <TableCell><b>Location</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {influencers.map((influencer, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => onDetail(influencer)}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: '#ccc' }}>{influencer.name[0]}</Avatar>
                    <Box>
                      <Typography color="primary" fontWeight="medium">{influencer.name}</Typography>
                      <Chip label={influencer.profileStatus} color={statusColorMap[influencer.profileStatus]}/>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{influencer.snsUsername}</TableCell>
                <TableCell>{influencer.mainPhone || influencer.secondaryPhone}</TableCell>
                <TableCell>{influencer.gender}</TableCell>
                <TableCell>{influencer.country} {influencer.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        {/* Per Page Selector */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Per page:
          </Typography>
          {perPageOptions.map((option) => (
            <Button
              key={option}
              size="small"
              variant={limit === option ? 'contained' : 'outlined'}
              onClick={() => onPageLimitChange(option)}
              sx={{
                minWidth: '48px',
                fontWeight: limit === option ? 'bold' : 'normal',
              }}
            >
              {option}
            </Button>
          ))}
        </Stack>

        {/* Pagination */}
        <Pagination
          count={Math.ceil(total / limit)}
          page={offset / limit + 1}
          onChange={(_, value) => onPageChange((value - 1) * limit)}
          color="primary"
          showFirstButton
          showLastButton
          siblingCount={3}
          boundaryCount={2}
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '0.875rem',
              fontWeight: 500,
              minWidth: '36px',
              height: '36px',
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            },
            '& .MuiPaginationItem-ellipsis': {
              fontSize: '1rem',
            },
          }}
        />

        {/* Total Count */}
        <Typography variant="body2" color="text.secondary" sx={{ minWidth: '120px', textAlign: 'right' }}>
          Total: {total}
        </Typography>
      </Box>
    </>
  );
};
