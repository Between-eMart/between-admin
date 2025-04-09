import {
  Avatar,
  Box,
  Chip, ChipProps,
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
    onDetail,
    searchQuery,
    onChangeSearchProperties,
    onSearch,
    categories,
  }: {
    influencers: Influencer[];
    total: number;
    offset: number;
    limit: number;
    onPageChange: (offset: number) => void;
    onDetail: (influencer: Influencer) => void;
    searchQuery: FindActiveInfluencersQuery;
    onChangeSearchProperties: (
      key: keyof FindActiveInfluencersQuery,
      value: string | number | number[] | boolean | undefined
    ) => void;
    onSearch: () => void;
    categories: InfluencerCategory[];
  },
) => {
  //
  return (
    <>
      <ActiveInfluencerSearchBoxView
        categories={categories}
        onChangeSearchProperties={onChangeSearchProperties}
        onSearch={onSearch}
        searchQuery={searchQuery}
      />
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
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
      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={offset / limit + 1}
          onChange={(_, value) => changeCurrentPage((value - 1) * limit)}
          color="primary"
        />
      </Box>
    </>
  );
};
