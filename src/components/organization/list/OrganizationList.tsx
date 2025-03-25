import React, {useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Pagination,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import {useEstablishmentCategories, useOrganizationRdos} from './hooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {EstablishmentDetailDialogView, EstablishmentTableView, OrganizationFilterPanelView} from './views';
import {EstablishmentDetailRdo} from "~/models";

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
      <Paper sx={{width: '100%', p: 3, borderRadius: 2}}>
        <Box display="flex" gap={2} mt={2} mb={3}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={query.searchKey}
            onChange={(e) => changeSearchProperties('searchKey', e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon onClick={() => fetchByNewQuery()} color="disabled" sx={{mr: 1}}/>,
            }}
            fullWidth
            onKeyDown={event => {
              ('Enter' == event.key) && fetchByNewQuery()
            }}
          />
          <OrganizationFilterPanelView
            categories={establishmentCategories}
            onChangeSearchProperties={changeSearchProperties}
            onSearch={fetchByNewQuery}
            searchQuery={query}
          />
        </Box>

        {organizationRdos.map(organizationRdo => (
          <Accordion key={organizationRdo.organization.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography component="span">Organization: </Typography>
              <Typography component="span">{organizationRdo.organization.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {organizationRdo.brandRdos.map((brandRdo) => (
                <Accordion key={brandRdo.brand.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography component="span">Brand: </Typography>
                    <Typography component="span">{brandRdo.brand.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
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
