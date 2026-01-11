import {
  Avatar,
  Box,
  Button,
  Chip,
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
import React from 'react';
import { Influencer, InfluencerCategory, ProfileStatus } from '~/models';
import { FindPreActiveInfluencersQuery } from '~/apis';
import { PreActiveInfluencerSearchBoxView } from '~/components';
import { useInfluencerMutation } from '~/hooks';

export const PreActiveInfluencersTableView = ({
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
  onAccept,
  onReject,
}: {
  influencers: Influencer[];
  total: number;
  offset: number;
  limit: number;
  onPageChange: (offset: number) => void;
  onPageLimitChange: (limit: number) => void;
  onDetail: (influencer: Influencer) => void;
  searchQuery: FindPreActiveInfluencersQuery;
  onChangeSearchProperties: (
    key: keyof FindPreActiveInfluencersQuery,
    value: string | number | number[] | boolean | undefined,
  ) => void;
  onSearch: () => void;
  categories: InfluencerCategory[];
  onAccept: (influencerId: number) => Promise<void>;
  onReject: (influencerId: number) => Promise<void>;
}) => {
  //
  const perPageOptions = [10, 25, 50, 100];

  return (
    <>
      <PreActiveInfluencerSearchBoxView
        categories={categories}
        onChangeSearchProperties={onChangeSearchProperties}
        onSearch={onSearch}
        searchQuery={searchQuery}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Instagram</b>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {influencers.map((influencer, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => onDetail(influencer)}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: '#ccc' }}>{influencer.name[0]}</Avatar>
                    <Box>
                      <Typography color="primary" fontWeight="medium">
                        {influencer.name}
                      </Typography>
                      <Chip label={influencer.profileStatus} color={'secondary'} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{influencer.snsUsername}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Button
                      fullWidth
                      variant={'contained'}
                      color={'error'}
                      onClick={() => onReject(influencer.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      fullWidth
                      variant={'contained'}
                      color={'success'}
                      onClick={() => onAccept(influencer.id)}
                    >
                      Accept
                    </Button>
                  </Box>
                </TableCell>
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
