import { Box, Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const InfluencerStatisticsCardView = (
  {
    confirmedQty,
    bannedQty,
    rejectedQty,
    requestedQty,
  }: {
    confirmedQty: number;
    bannedQty: number;
    rejectedQty: number;
    requestedQty: number;
  }
) => {
  //
  const series = [confirmedQty, bannedQty, rejectedQty, requestedQty]; // Actual numbers for each category
  const totalUsers = series.reduce((a, b) => a + b, 0); // Calculate total sum
  const labels = ['Confirmed', 'Banned', 'Rejected', 'Requested']; // Custom labels
  const colors = ['#65D460', '#CF484A', '#DEA241', '#6089D4']; // Colors for dots & chart

  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: labels,
    colors: colors,
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: {
          size: '80%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'QTY of Influencers',
              color: '#828282',
              // @ts-ignore
              formatter: function () {
                return totalUsers; // Show total number of users
              },
            },
          },
        },
      },
    },
    legend: {
      show: false, // Hide default legend
    },
    dataLabels: {
      enabled: false,
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex]; // Show actual numbers
      },
    },
  };


  return (
    <Card>
      <CardContent style={{ padding: 25 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography gutterBottom variant="h5" component="div"
                      style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={'/icon-check.svg'} alt="check" height={30}/>
            Influencers
          </Typography>
        </Box>
        <div style={{ display: 'flex', alignItems: 'center', gap: 100 }}>
          {/* Chart */}
          <Box sx={{ display: 'flex', height: 300 }}>
            <Chart options={options} series={series} type="donut" height={500} width={500}/>
          </Box>

          {/* Legend */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {labels.map((label, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                {/* Color Dot + Label */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: colors[index],
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2" color="textSecondary">{label} Influencers</Typography>
                </Box>
                {/* Value */}
                <Typography variant="h6" fontWeight="bold">{series[index]}</Typography>
              </Box>
            ))}
          </Box>
        </div>
      </CardContent>
    </Card>
  );
};
