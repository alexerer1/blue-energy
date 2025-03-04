import React, { FC, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { FiMap, FiBarChart2 } from "react-icons/fi";
import { mockData } from "../data/mockData";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LegendItem,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  UpdateMode,
  ChartOptions,
  ChartData,
  ChartDataset,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartProps {
  showHours: boolean;
  hoveredColumn: number | null;
  showLegend?: boolean;
  // Add these two props to handle graph/map toggle:
  showGraph?: boolean;
  toggleGraphView?: () => void;
}

const getOrCreateLegendList = (chart: Chart, id: string): HTMLUListElement => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer?.querySelector("ul");
  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = "5px 0 0";
    listContainer.style.padding = "0";
    listContainer.style.listStyle = "none";

    legendContainer?.appendChild(listContainer);
  }
  return listContainer;
};

const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(
    chart: Chart,
    args: { mode: UpdateMode },
    options: { containerID: string },
  ) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    const items =
      chart.options.plugins?.legend?.labels?.generateLabels?.(chart) || [];

    items.forEach((item: LegendItem) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.marginRight = "8px";

      li.onclick = () => {
        const datasetIndex = item.datasetIndex ?? 0;
        chart.setDatasetVisibility(
          datasetIndex,
          !chart.isDatasetVisible(datasetIndex),
        );
        chart.update();
      };

      const dataset = chart.data.datasets[item.datasetIndex ?? 0];
      const borderColor = dataset.borderColor as string;

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = borderColor || "";
      boxSpan.style.display = "inline-block";
      boxSpan.style.height = "10px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";
      boxSpan.style.borderRadius = "4px";

      // Text
      const textContainer = document.createElement("span");
      textContainer.style.color = borderColor || "";
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";
      textContainer.style.fontSize = "14px";
      textContainer.appendChild(document.createTextNode(item.text || ""));

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

const ChartComponent: FC<ChartProps> = ({
  showHours,
  hoveredColumn,
  showLegend = false,
  showGraph,
  toggleGraphView,
}) => {
  useEffect(() => {
    if (showLegend) {
      Chart.register(htmlLegendPlugin);
    }
  }, [showLegend]);

  const titleText = showHours
    ? "Total monthly threshold exceedance [hours]"
    : "DMS data deviations [%]";

  const colorPalette = [
    "#047783",
    "#006c5f",
    "#00a58c",
    "#0a515d",
    "#ffd424",
    "#a0cd92",
    "#00837c",
    "#699e9f",
    "#000000",
  ];

  const data: ChartData<"line", (number | null)[], string> = {
    labels: mockData.labels,
    datasets: mockData.datasets.map(
      (dataset, index): ChartDataset<"line", (number | null)[]> => {
        const isHovered = hoveredColumn === null || hoveredColumn === index;
        const borderColor = colorPalette[index % colorPalette.length];
        const backgroundColor = isHovered ? borderColor : `${borderColor}80`; // Add transparency to non-hovered lines

        return {
          label: dataset.label,
          data: (showHours ? dataset.hours : dataset.deviation) as (
            | number
            | null
          )[],
          borderColor,
          backgroundColor,
          borderWidth: isHovered ? 3 : 0.5,
          tension: 0.1,
          borderJoinStyle: "round",
          borderCapStyle: "round",
          pointRadius: 0,
          pointHoverRadius: 0,
        };
      },
    ),
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#02525e", // Updated tick color for the x-axis
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#02525e", // Updated tick color for the y-axis
        },
        // Set max to 30 if it's the percentage graph
        max: showHours ? undefined : 30,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      ...(showLegend && {
        htmlLegend: {
          containerID: "legend-container",
        } as const,
      }),
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full h-full" style={{ position: "relative" }}>
      {/* Title above the chart */}
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <h2 className="text-primary overflow-hidden text-ellipsis m-0">
          {titleText}
        </h2>
      </div>
      {showLegend && (
        <div
          id="legend-container"
          style={{ marginBottom: "10px", textAlign: "center" }}
          className="ml-3"
        ></div>
      )}

      {/* Move the Show Map/Show Graph button here (top right corner) */}
      {toggleGraphView && typeof showGraph !== "undefined" && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10,
          }}
        >
          <button
            onClick={toggleGraphView}
            className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded-full text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm"
          >
            {showGraph ? <FiMap size={16} /> : <FiBarChart2 size={16} />}
            <span className="text-xs font-medium">
              {showGraph ? "Show Map" : "Show Graph"}
            </span>
          </button>
        </div>
      )}

      <div style={{ height: "calc(100% - 50px)", position: "relative" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
