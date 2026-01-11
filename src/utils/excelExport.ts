import * as XLSX from 'xlsx';
import { Influencer } from '~/models';

export const exportInfluencersToExcel = (influencers: Influencer[], filename: string = 'influencers.xlsx') => {
  // Prepare data for Excel
  const excelData = influencers.map((influencer) => ({
    ID: influencer.id,
    Name: influencer.name,
    Surname: influencer.surname,
    Email: influencer.email,
    'Main Phone': influencer.mainPhone,
    'Secondary Phone': influencer.secondaryPhone,
    'Instagram Username': influencer.snsUsername,
    Birthday: influencer.birthday,
    Gender: influencer.gender,
    Country: influencer.country,
    City: influencer.city,
    Categories: influencer.categories.map(cat => cat.name).join(', '),
    Status: influencer.profileStatus,
    'Is Active': influencer.isActive ? 'Yes' : 'No',
    'Accepted Policy': influencer.hasAcceptedUserPolicy ? 'Yes' : 'No',
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const columnWidths = [
    { wch: 8 },  // ID
    { wch: 20 }, // Name
    { wch: 20 }, // Surname
    { wch: 30 }, // Email
    { wch: 15 }, // Main Phone
    { wch: 15 }, // Secondary Phone
    { wch: 20 }, // Instagram Username
    { wch: 12 }, // Birthday
    { wch: 10 }, // Gender
    { wch: 15 }, // Country
    { wch: 15 }, // City
    { wch: 30 }, // Categories
    { wch: 12 }, // Status
    { wch: 10 }, // Is Active
    { wch: 15 }, // Accepted Policy
  ];
  worksheet['!cols'] = columnWidths;

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Influencers');

  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, filename);
};
