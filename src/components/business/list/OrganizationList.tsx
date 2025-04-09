import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Pagination,
  Paper,
  Typography,
} from '@mui/material';
import { useEstablishmentCategories, useOrganizationRdos } from './hooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  BrandAddButtonView,
  BrandEditButtonView,
  EstablishmentAddButtonView,
  EstablishmentTableView,
  OrganizationAddButtonView,
  OrganizationEditButtonView,
  OrganizationSearchBoxView,
} from './views';
import { useBusinessMutation } from '~/components/business/form/hooks';
import { useDialog } from '~/components';

export const OrganizationList = () => {
  //
  const {
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

  const handleSuccess = () => {
    //
    refetchOrganizationRdos();
  };

  const handleRemoveOrganization = (organizationId: number) => confirm('Do you really want to remove this organization?',
    () => removeOrganization.mutateAsync({ organizationId }, {
      onSuccess: handleSuccess,
    }));

  const handleRemoveBrand = (brandId: number) => confirm('Do you really want to remove this brand?',
    () => removeBrand.mutateAsync({ brandId }, {
      onSuccess: handleSuccess,
    }));

  const handleRemoveEstablishment = (establishmentId: number) => confirm('Do you really want to remove this establishment?',
    () => removeEstablishment.mutateAsync({ establishmentId }, {
      onSuccess: handleSuccess,
    }));

  return (
    <>
      <Paper sx={{ width: '100%', p: 3, borderRadius: 2 }}>
        <OrganizationAddButtonView onSuccess={handleSuccess} />
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
                <BrandAddButtonView organizationId={organizationRdo.organization.id}  onSuccess={handleSuccess} />
                <div style={{ display: 'flex', gap: 10 }}>
                  <OrganizationEditButtonView organizationId={organizationRdo.organization.id} onSuccess={handleSuccess} />
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
                      <EstablishmentAddButtonView brandId={brandRdo.brand.id} onSuccess={handleSuccess} />
                      <div style={{ display: 'flex', gap: 10 }}>
                        <BrandEditButtonView brandId={brandRdo.brand.id} onSuccess={handleSuccess} />
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveBrand(brandRdo.brand.id)}><DeleteIcon/></IconButton>
                      </div>
                    </div>
                    <EstablishmentTableView
                      establishmentRdos={brandRdo.establishmentRdos}
                      onDelete={establishmentId => handleRemoveEstablishment(establishmentId)}
                      onSuccess={handleSuccess}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(total / limit)}
            page={offset / limit + 1}
            onChange={(_, value) => changeCurrentPage((value - 1) * limit)}
            color="primary"
          />
        </Box>
      </Paper>
    </>
  );
};
