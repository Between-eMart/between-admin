import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Pagination, Paper, Typography } from '@mui/material';
import { useEstablishmentCategories, useOrganizationRdos } from './hooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  BrandAddButtonView,
  BrandEditButtonView,
  EstablishmentAddButtonView,
  EstablishmentDetailDialogView,
  EstablishmentTableView,
  OrganizationAddButtonView, OrganizationEditButtonView,
  OrganizationSearchBoxView,
} from './views';
import { EstablishmentDetailRdo, QueryResponse } from '~/models';
import { useBusinessMutation } from '~/components/business/form/hooks';
import { AxiosError } from 'axios';
import { useDialog } from '~/components';

export const OrganizationList = () => {
  //
  const {
    alert,
    confirm,
  } = useDialog();

  const {
    organizationRdos,
    fetchByNewQuery,
    total,
    limit,
    offset,
    changeCurrentPage,
    query,
    changeSearchProperties,
    refetchOrganizationRdos,
  } = useOrganizationRdos();

  const {
    establishmentCategories,
  } = useEstablishmentCategories();

  const {
    mutation: {
      removeOrganization,
      removeBrand,
      removeEstablishment,
    },
  } = useBusinessMutation();

  const handleRemoveOrganization = (organizationId: number) => confirm('Do you really want to remove this organization?',
    () => removeOrganization.mutateAsync({ organizationId }, {
      onSuccess: () => refetchOrganizationRdos(),
      onError: (error) => {
        const errorMessage =
          (error as AxiosError<QueryResponse<any>, any>)?.response?.data?.failureMessage?.exceptionMessage || 'Error';
        alert(errorMessage);
      },
    }));

  const handleRemoveBrand = (brandId: number) => confirm('Do you really want to remove this brand?',
    () => removeBrand.mutateAsync({ brandId }, {
      onSuccess: () => refetchOrganizationRdos(),
      onError: (error) => {
        const errorMessage =
          (error as AxiosError<QueryResponse<any>, any>)?.response?.data?.failureMessage?.exceptionMessage || 'Error';
        alert(errorMessage);
      },
    }));

  const handleRemoveEstablishment = (establishmentId: number) => confirm('Do you really want to remove this establishment?',
    () => removeEstablishment.mutateAsync({ establishmentId }, {
      onSuccess: () => refetchOrganizationRdos(),
      onError: (error) => {
        const errorMessage =
          (error as AxiosError<QueryResponse<any>, any>)?.response?.data?.failureMessage?.exceptionMessage || 'Error';
        alert(errorMessage);
      },
    }));

  return (
    <>
      <Paper sx={{ width: '100%', p: 3, borderRadius: 2 }}>
        <OrganizationAddButtonView/>
        <OrganizationSearchBoxView
          categories={establishmentCategories}
          onChangeSearchProperties={changeSearchProperties}
          onSearch={() => fetchByNewQuery()}
          searchQuery={query}
        />
        {organizationRdos.map(organizationRdo => (
          <Accordion key={organizationRdo.organization.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography component="span"><strong>Organization:&nbsp;</strong></Typography>
              <Typography component="span">{organizationRdo.organization.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <BrandAddButtonView organizationId={organizationRdo.organization.id}/>
                <div style={{ display: 'flex', gap: 10 }}>
                  <OrganizationEditButtonView organizationId={organizationRdo.organization.id}/>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveOrganization(organizationRdo.organization.id)}><DeleteIcon/></IconButton>
                </div>
              </div>

              {organizationRdo.brandRdos.map((brandRdo) => (
                <Accordion key={brandRdo.brand.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography component="span"><strong>Brand:&nbsp;</strong></Typography>
                    <Typography component="span">{brandRdo.brand.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <EstablishmentAddButtonView brandId={brandRdo.brand.id}/>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <BrandEditButtonView brandId={brandRdo.brand.id}/>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveBrand(brandRdo.brand.id)}><DeleteIcon/></IconButton>
                      </div>
                    </div>
                    <EstablishmentTableView
                      establishmentRdos={brandRdo.establishmentRdos}
                      onDelete={establishmentId => handleRemoveEstablishment(establishmentId)}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={total}
            page={offset / limit + 1}
            onChange={(_, value) => changeCurrentPage(value)}
            color="primary"
          />
        </Box>
      </Paper>
    </>
  );
};
