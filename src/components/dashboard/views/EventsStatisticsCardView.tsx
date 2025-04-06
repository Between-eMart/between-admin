import { Box, Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

export const EventsStatisticsCardView = (
  {
    draftedQty,
    publishedQty,
    postponedQty,
  }: {
    draftedQty: number;
    publishedQty: number;
    postponedQty: number;
  },
) => {
  //
  const series = [draftedQty, publishedQty, postponedQty]; // Actual numbers for each category
  const totalEvents = series.reduce((a, b) => a + b, 0); // Calculate total sum
  const labels = [ 'Drafted', 'Published', 'Postponed']; // Custom labels
  const colors = ['#D460CD', '#EBE420', '#2060EB']; // Colors for dots & chart

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
              label: 'QTY of Events',
              color: '#828282',
              //@ts-ignore
              formatter: function () {
                return totalEvents; // Show total number of users
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
            Events
          </Typography>
        </Box>
        <div style={{ display: 'flex', alignItems: 'center', gap: 100 }}>
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
                  <Typography variant="body2" color="textSecondary">{label} Events</Typography>
                </Box>
                {/* Value */}
                <Typography variant="h6" fontWeight="bold">{series[index]}</Typography>
              </Box>
            ))}
          </Box>

          {/* Chart */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: 300 }}>
            <Chart options={options} series={series} type="donut" height={500} width={500}/>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
};
