import { PMGrid } from "lib/pmcomponents";
import Chart from "react-apexcharts";
import { BaseWidgetProps } from "../BaseWidget";

export interface ApexChartWidgetProps {
  data?: Array<any>;
  label?: Array<any>;
  type?: any;
  legendPosition?: string;
  title?: string;
  width?: string;
  height?: string;
  x_axisLabel?: string;
  y_axisLabel?: string;
  showDataLabels?: boolean;
  titleAlignment?: string;
  colors?: Array<string>;
  strokeCurveType?: string;
  showToolbar?: boolean;
  gridRowColors?: Array<string>;
  gridRowOpacity?: any;
  legendAlignment?: string;
  strokeColors: Array<string>;
  strokeShow: boolean;
  horizontalBarAlignment: boolean;
  xaxisLabelPosition?: string;
  isXaxisLabelshow: boolean;
  xaxisLabelRotation: any;
  isAlwaysXaxisRotation: boolean;
  xaxisLabelStyleObject: Object;
  legend_offsetY: any;
  legend_offsetX: any;
  is_legend_floating: boolean;
  dataLabelPosition?: string;
  barColumnWidth: any;
  barHeight: any;
  responsiveBreakPoint: any;
  responsiveChartWidth: any;
  responsiveChartHeight: any;
  responsiveChartIsHorizontal: boolean;
  responsiveChartDataLabelPosition: string;
  isResponsivelegendFloating: boolean;
  responsiveOffsetY: any;
  responsiveOffsetX: any;
  dataLabelStyleObject: Object;
  isYaxisLabelshow: boolean;
  yaxisLabelRotation: any;
  isAlwaysYaxisRotation: any;
  yAxisLabelStyleObject: Object;
  markerSize?: any;
  markerShape?: string;
  markerColor: any;
  responsivelegendAlignment?: string;
  responsivelegendPosition: string;
  gridBorderColor: string;
  gridColumnColors: Array<string>;
  gridColumnOpacity: number;
  is_gridXaxisLineShow: boolean;
  is_gridYaxisLineShow: boolean;
  gridStrokeDashValue: number;
  chartFilterShow: boolean;
  showChartComponent: boolean;
}

export const ApexChartWidget = (
  props: ApexChartWidgetProps & BaseWidgetProps
) => {
  const {
    data,
    label,
    legendPosition,
    type,
    title,
    x_axisLabel,
    y_axisLabel,

    ...baseProps
  } = props;

  let series;
  let options;
  if (type === "line") {
    if (typeof data[0] == "object") {
      if (data[0]["data"]) {
        series = data;
      } else {
        series = [
          {
            name: title,
            data: data,
          },
        ];
      }
    } else {
      series = [
        {
          name: title,
          data: data,
        },
      ];
    }

    options = {
      chart: {
        height: props.height,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: props?.horizontalBarAlignment,

          columnWidth: props?.barColumnWidth,
          barHeight: props?.barHeight,
        },
      },

      tooltip: {
        enabled: true,
        shared: false,
        intersect: true,

        x: {
          show: true,
        },
      },
      markers: {
        size: props?.markerSize,
        shape: props?.markerShape,
        colors: props?.markerColor,
      },
      colors: props?.colors,
      dataLabels: {
        enabled: props?.showDataLabels,
      },
      toolbar: {
        show: props.showToolbar,
      },
      stroke: {
        curve: props?.strokeCurveType,
        show: true,

        // lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0,
      },
      title: {
        text: title,
        align: props?.titleAlignment,
      },
      grid: {
        borderColor: props?.gridBorderColor,
        strokeDashArray: props?.gridStrokeDashValue,
        row: {
          colors: props.gridRowColors,
          opacity: props?.gridRowOpacity,
        },
        column: {
          // colors: ["#f8f8f8", "transparent"],
          // opacity: 0.2,
          colors: props.gridColumnColors,
          opacity: props?.gridColumnOpacity,
        },
        xaxis: {
          lines: {
            show: props?.is_gridXaxisLineShow,
          },
        },
        yaxis: {
          lines: {
            show: props?.is_gridYaxisLineShow,
          },
        },
      },

      xaxis: {
        categories: label,
        title: {
          text: x_axisLabel,
        },
        position: props?.xaxisLabelPosition,
        labels: {
          show: props?.isXaxisLabelshow,
          rotate: props?.xaxisLabelRotation,
          rotateAlways: props?.isAlwaysXaxisRotation,
          style: { ...props?.xaxisLabelStyleObject },
        },
      },
      yaxis: {
        title: {
          text: y_axisLabel,
        },
        min: 0,
      },
      legend: {
        position: legendPosition,
        horizontalAlign: props?.legendAlignment,
        floating: props?.is_legend_floating,
        offsetY: props?.legend_offsetY,
        offsetX: props?.legend_offsetX,
      },
    };
  } else if (type === "pie") {
    series = data;
    options = {
      chart: {
        // width: props.width,
        type: "pie",
      },
      legend: {
        position: legendPosition,

        horizontalAlign: props?.legendAlignment,
        floating: props?.is_legend_floating,
        offsetY: props?.legend_offsetY,
        offsetX: props?.legend_offsetX,
      },
      dataLabels: {
        enabled: props?.showDataLabels,
      },
      labels: label,
      title: {
        text: title,
        align: props?.titleAlignment,
      },
      colors: props?.colors,
      responsive: [
        {
          breakpoint: props?.responsiveBreakPoint,
          options: {
            chart: {
              width: props?.responsiveChartWidth,
              height: props?.responsiveChartHeight,
            },
            legend: {
              position: props?.responsivelegendPosition,

              horizontalAlign: props?.responsivelegendAlignment,
              floating: props?.isResponsivelegendFloating,
              offsetY: props?.responsiveOffsetY,
              offsetX: props?.responsiveOffsetX,
            },
          },
        },
      ],
    };
  } else if (type === "bar") {
    series = data;
    options = {
      chart: {
        type: "bar",
        height: props?.height,
      },
      plotOptions: {
        bar: {
          horizontal: props?.horizontalBarAlignment,

          dataLabels: {
            position: props?.dataLabelPosition,
          },
          columnWidth: props?.barColumnWidth,
          barHeight: props?.barHeight,
        },
      },
      dataLabels: {
        enabled: props?.showDataLabels,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,

        style: {
          ...props?.dataLabelStyleObject,
        },
      },

      responsive: [
        {
          breakpoint: props?.responsiveBreakPoint,
          options: {
            chart: {
              width: props?.responsiveChartWidth,
              height: props?.responsiveChartHeight,
            },
            plotOptions: {
              bar: {
                horizontal: props?.responsiveChartIsHorizontal,

                dataLabels: {
                  position: props?.responsiveChartDataLabelPosition,
                },
              },
            },
            legend: {
              position: props?.responsivelegendPosition,
              horizontalAlign: props?.responsivelegendAlignment,
              floating: props?.isResponsivelegendFloating,
              offsetY: props?.responsiveOffsetY,
              offsetX: props?.responsiveOffsetX,
            },
          },
        },
      ],
      title: {
        text: title,
        align: props?.titleAlignment,
      },
      colors: props?.colors,
      legend: {
        position: legendPosition,
        horizontalAlign: props?.legendAlignment,
        floating: props?.is_legend_floating,
        offsetY: props?.legend_offsetY,
        offsetX: props?.legend_offsetX,
      },

      stroke: {
        show: props?.strokeShow,

        width: 1,
        colors: props?.strokeColors,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      grid: {
        borderColor: props?.gridBorderColor,
        strokeDashArray: props?.gridStrokeDashValue,
        row: {
          colors: props.gridRowColors,
          opacity: props?.gridRowOpacity,
        },
        column: {
          colors: props.gridColumnColors,
          opacity: props?.gridColumnOpacity,
        },
        xaxis: {
          lines: {
            show: props?.is_gridXaxisLineShow,
          },
        },
        yaxis: {
          lines: {
            show: props?.is_gridYaxisLineShow,
          },
        },
      },

      xaxis: {
        categories: label,
        position: props?.xaxisLabelPosition,

        labels: {
          show: props?.isXaxisLabelshow,
          rotate: props?.xaxisLabelRotation,
          rotateAlways: props?.isAlwaysXaxisRotation,
          style: { ...props?.xaxisLabelStyleObject },
        },
      },
      yaxis: {
        labels: {
          show: props?.isYaxisLabelshow,
          showAlways: props?.yaxisLabelRotation,
          showForNullSeries: props?.isAlwaysYaxisRotation,
          align: "right",

          style: { ...props?.yAxisLabelStyleObject },
        },
      },
    };
  }

  return (
    <PMGrid>
      {props?.showChartComponent ? (
        <PMGrid
          sx={{
            boxShadow: "1px 2px 9px #e5e5e5",
            padding: 5,
            borderRadius:3,
          }}
        >
          <Chart
            options={options}
            series={series}
            type={type}
            width={props.width}
            height={props.height}
          />
        </PMGrid>
      ) : (
        ""
      )}
    </PMGrid>
  );
};

export default ApexChartWidget;
