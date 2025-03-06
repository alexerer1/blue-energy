export const mockData = {
  labels: [
    "Dec. 2023",
    "Jan. 2024",
    "Feb. 2024",
    "Mar. 2024",
    "Apr. 2024",
    "May 2024",
    "Jun. 2024",
    "Jul. 2024",
    "Aug. 2024",
    "Sep. 2024",
  ],
  datasets: [
    {
      label: "DIST 1",
      deviation: [2.79, 3.16, 1.73, 1.71, 2.49, 2.08, 2.56, 1.8, 2.03, 1.21],
      hours: [154, 205, 67, 58, 114, 98, 118, 68, 78, 32],
    },
    {
      label: "DIST 2",
      deviation: [
        6.76, 6.27, 10.09, 6.79, 7.46, 13.52, 11.79, 10.95, 8.57, 13.11,
      ],
      hours: [295, 403, 500, 459, 399, 524, 490, 504, 413, 510],
    },
    {
      label: "DIST 4",
      deviation: [1.23, 5.5, 11.07, 1.19, 1.27, 2.02, 1.77, 1.63, 2.04, 1.5],
      hours: [32, 354, 652, 41, 65, 140, 119, 113, 84, 67],
    },
    {
      label: "DIST 5",
      deviation: [2.91, 2.67, 1.76, 1.18, 2.67, 1.84, 1.27, 1.84, 1.75, 1.74],
      hours: [185, 132, 70, 24, 177, 69, 21, 83, 81, 76],
    },
    {
      label: "DIST 6",
      deviation: [7.14, 7.76, 6.32, 4.62, 5.31, 5.09, 57.37, 2.5, 1.92, 2.83],
      hours: [487, 465, 353, 301, 317, 205, 156, 138, 92, 156],
    },
    {
      label: "DIST 7",
      deviation: [5.72, 3.89, 2.8, 2.14, 2.61, 2.24, 25.17, 1.63, 2.3, 2.79],
      hours: [151, 135, 127, 92, 102, 105, 135, 44, 167, 172],
    },
  ],
};

export const summaryContent = `
# Summary Text

This report presents an overview of the data quality of DMS data of distribution zones.

---

## Key Trends

- Maximum deviation value of the month is **56.2%**.
- Maximum number of hours exceeding the threshold of the month are **510 hours**.
- Since the previous report, data quality has improved in distribution zones **1, 4, and 5**.
- Since the previous report, data quality has worsened in distribution zones **2, 6, and 7**.
- This month’s deviation is greater than the previous three months’ average in distribution zones **2 and 5**.
- The average monthly deviation is up by **52.9%** in distribution zone **2** compared to the previous report.
- The average monthly deviation is up by **47.4%** in distribution zone **6** compared to the previous report.
- The average monthly deviation is up by **21.0%** in distribution zone **7** compared to the previous report.

---

## Outliers

No outlier values outside the threshold (**100%**) have been identified in the report for **09 September 2024**. Sensitivity of the outlier threshold can be adjusted in the admin settings.

---

## Systematic Deviations

The report has identified systematic deviations in **distribution zone 2**. Systematic deviations are identified for consecutive and identical weekdays and hours for portfolios **57000860193702** and **57000928372907**. 

- The spread of the systematic deviations ranges from **10.0% to 56.2%** by hours. 
- For further information on systematic deviations, please use the report chat function to engage with background data.
  `;

export interface CardData {
  title: string;
  content: string;
  status: "success" | "warning" | "danger";
}
export const cardsData: CardData[] = [
  {
    title: "Deviation Threshold Exceeded",
    content:
      "This month's deviation is up by 31.4% compared to the three-month average in DIST 2.",
    status: "warning",
  },
  {
    title: "Outliers Detected - DIST 6",
    content: `Outlier values detected on June 25th during hours 13:00 and 14:00. Maximum daily outlier value detected is 20565%.`,
    status: "danger",
  },
  {
    title: "Outliers Detected - DIST 6",
    content: `Outlier values detected on June 10th during hours 06:00 through 21:00 and 23:00. Maximum daily outlier value detected is 2224%.`,
    status: "danger",
  },
  {
    title: "Outliers Detected - DIST 7",
    content: `Outlier values detected on June 11th during hours 00:00 through 05:00, 07:00, and 08:00. Maximum daily outlier value detected is 2356%.`,
    status: "danger",
  },
];

export const outlierFlow = [
  // Answer 1
  `The spikes identified in distribution zones 6 and 7 in June 2024 are caused by extreme values and/or outliers. 
  \nThe maximum outlier identified in distribution zone 6 is **131,000,000 kWh** on 25-06-2024 15:00 for portfolio **57000928372907**. 
  \nThe maximum outlier identified in distribution zone 7 is **27,000,000 kWh** on 10-06-2024 06:00 for portfolio **5700072555196**.`,
  // Answer 2
  `Since December 2023, the portfolio with the greatest number of instances with outliers is **5700072114611**, located in distribution zone 7, with a total of **147 outlier values**.`,

  // Answer 3
  `Omitting all outliers above the threshold of **100%** reveals the following:
  - The average deviation for **distribution zone 6** is **3.67% in June** and **4.36% for the period since December 2023**.
  - The average deviation for **distribution zone 7** is **6.64% in June** and **6.05% for the period since December 2023**.
  If you wish to adjust the filtering of outliers and thresholds, please visit the admin settings.`,
];

export const systematicDeviationFlow = [
  // Answer 1
  `In distribution zone 2, large data deviations are primarily driven by deviations on individual portfolios. The portfolio with the largest deviation identified is portfolio 57000860193702, which has a maximum deviation value of 263.0% registered on 26-06-2024 07:00. A similar trend is identified for portfolio 57000928372907, which has a maximum deviation value of 123.0% registered on 06-02-2024 06:00.`,
  // Answer 2
  `Certainly, when looking at these two portfolios specifically, the background data shows that the greatest discrepancies between valid and non-valid data are registered between the hours 06:00 – 21:00. Due to the accumulative effect of DMS data, the largest discrepancies are registered between the hours 17:00 – 21:00.
  \nThe systematic nature of the discrepancies is also registered by weekday, where background data showcase Thursday, Friday, and Saturday as having the greatest discrepancies registered. 
  \nThis pattern is registered for 10 out of the previous 10 months, indicating that data deviations are systematic across time for these two portfolios.`,
];
