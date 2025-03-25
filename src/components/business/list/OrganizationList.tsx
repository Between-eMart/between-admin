import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Pagination, Paper, Typography } from '@mui/material';
import { useEstablishmentCategories, useOrganizationRdos } from './hooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  EstablishmentDetailDialogView,
  EstablishmentTableView,
  OrganizationAddButtonView,
  OrganizationSearchBoxView,
} from './views';
import { EstablishmentDetailRdo } from '~/models';
import AddIcon from '@mui/icons-material/Add';

export const OrganizationList = () => {
  //
  const [selectedEstablishmentRdo, setSelectedEstablishmentRdo] = useState<EstablishmentDetailRdo>();

  const {
    organizationRdos,
    fetchByNewQuery,
    total,
    limit,
    offset,
    changeCurrentPage,
    query,
    changeSearchProperties,
  } = useOrganizationRdos();

  const {
    establishmentCategories,
  } = useEstablishmentCategories();

  return (
    <>
      <Paper sx={{ width: '100%', p: 3, borderRadius: 2 }}>
        <OrganizationAddButtonView/>
        <OrganizationSearchBoxView
          categories={establishmentCategories}
          onChangeSearchProperties={changeSearchProperties}
          onSearch={()=>fetchByNewQuery()}
          searchQuery={query}
        />
        {organizationRdos.map(organizationRdo => (
          <Accordion key={organizationRdo.organization.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography component="span">Organization: </Typography>
              <Typography component="span">{organizationRdo.organization.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button variant="outlined" startIcon={<AddIcon/>}>Brand</Button>
              {organizationRdo.brandRdos.map((brandRdo) => (
                <Accordion key={brandRdo.brand.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography component="span">Brand: </Typography>
                    <Typography component="span">{brandRdo.brand.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Button variant="outlined" startIcon={<AddIcon/>}>Establishment</Button>
                    <EstablishmentTableView
                      establishmentRdos={brandRdo.establishmentRdos}
                      onDetail={establishmentRdo => setSelectedEstablishmentRdo(establishmentRdo)}
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
