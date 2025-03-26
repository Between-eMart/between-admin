import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Pagination, Paper, Typography } from '@mui/material';
import { useEstablishmentCategories, useOrganizationRdos } from './hooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  BrandAddButtonView,
  EstablishmentAddButtonView,
  EstablishmentDetailDialogView,
  EstablishmentTableView,
  OrganizationAddButtonView,
  OrganizationSearchBoxView,
} from './views';
import { EstablishmentDetailRdo, QueryResponse } from '~/models';
import { useBusinessMutation } from '~/components/business/form/hooks';
import { AxiosError } from 'axios';
import { useDialog } from '~/components';

export const OrganizationList = () => {
  //
  const [selectedEstablishmentRdo, setSelectedEstablishmentRdo] = useState<EstablishmentDetailRdo>();

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
              <Typography component="span">Organization: </Typography>
              <Typography component="span">{organizationRdo.organization.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <BrandAddButtonView organizationId={organizationRdo.organization.id}/>
                <Button
                  color={'error'}
                  variant="outlined"
                  startIcon={<DeleteIcon/>}
                  onClick={() => handleRemoveOrganization(organizationRdo.organization.id)}>Delete</Button>
              </div>

              {organizationRdo.brandRdos.map((brandRdo) => (
                <Accordion key={brandRdo.brand.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography component="span">Brand: </Typography>
                    <Typography component="span">{brandRdo.brand.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <EstablishmentAddButtonView brandId={brandRdo.brand.id}/>
                      <Button
                        color={'error'}
                        variant="outlined"
                        startIcon={<DeleteIcon/>}
                        onClick={() => handleRemoveBrand(brandRdo.brand.id)}>Delete</Button>
                    </div>
                    <EstablishmentTableView
                      establishmentRdos={brandRdo.establishmentRdos}
                      onDetail={establishmentRdo => setSelectedEstablishmentRdo(establishmentRdo)}
                      onDelete={establishmentId => handleRemoveBrand(establishmentId)}
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
      {!!selectedEstablishmentRdo &&
        <EstablishmentDetailDialogView
          establishmentRdo={selectedEstablishmentRdo}
          onClose={() => setSelectedEstablishmentRdo(undefined)}
        />}
    </>
  );
};
