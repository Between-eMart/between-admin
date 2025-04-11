import {
  Avatar,
  Box,
  Button,
  Chip,
  Pagination,
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
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
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
      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={offset / limit + 1}
          onChange={(_, value) => onPageChange((value - 1) * limit)}
          color="primary"
        />
      </Box>
    </>
  );
};
