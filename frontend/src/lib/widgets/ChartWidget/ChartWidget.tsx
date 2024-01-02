import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, ChartType, Legend, LinearScale, LineElement, PointElement, registerables, Tooltip } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";

ChartJS.register(ArcElement, PointElement, LineElement, BarElement, CategoryScale, LinearScale, ...registerables);

export interface ChartWidgetProps {
    type?: ChartType
    datasets: Array<any>
    datakey?:string
    labels?: Array<any>
    showLegend: boolean
    showTooltip: boolean
    legendPosition: string
    options?: any
    legendText?: string
}

export const ChartWidget = (props: ChartWidgetProps & BaseWidgetProps) => {
    const {showLegend, showTooltip, ...baseProps } = props;

    let baseColors: Array<string> = [
        '#227fd2',
        '#e75454',
        '#e8a548',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#d7b088'
    ]
    var numColors: number = baseColors.length;

    var borderColors: string|Array<string> = baseColors[0];
    var backgroundColors: string|Array<string> = borderColors + "CC";

    if (!props.type) {
        return (
            <BaseWidget {...baseProps}>
                {"Invalid Chart Type"}
            </BaseWidget>
        )
    }


    // Register plugins
    if (!props.options.plugins) {
        props.options.plugins = {}
    }

    if (props.showLegend) {
        ChartJS.register(Legend);
        props.options.plugins["legend"] = {
            position: props?.legendPosition || "chartArea",
        }
        if(["pie", "doughnut"].includes(props.type)){
            props.options.plugins.legend.labels = {
                usePointStyle: true,
                pointStyle: "rectRounded",
                generateLabels: (chart) => {
                    const datasets = chart.data.datasets;
                    return datasets[0]?.data.map((data, i) => ({
                      text: `${chart.data.labels[i]} (${data})`,
                      fillStyle: datasets[0].backgroundColor[i],
                    }))
                  }
            }
        }
    }

    if (props.showTooltip) {
        ChartJS.register(Tooltip);    
    }


    // If labels are not defined, autogenerate them using number of datapoints
    var labels = props.labels;
    if (!labels) {
        labels = props.datasets[0].map((value, index) => index + 1);  
    }
    
    // Create datasets in chartsjs format
    var datasetCopy = JSON.parse(JSON.stringify(props.datasets[0]))
    var datasetsLabels = [] 
    datasetCopy.forEach(element => {
        Object.keys(element).forEach((item)=>{
            if(!datasetsLabels.includes(item)){
                datasetsLabels.push(item)
            }
        })
    })
    var datasets = datasetsLabels.map((label, index)=>{
        
        if (["pie", "doughnut"].includes(props.type)) {
            // Use multiple colors for some chart types
            backgroundColors = props?.labels.map((value, innerIndex) => baseColors[innerIndex % numColors] + "CC") // Add 80% alpha in background color
            borderColors = props.labels.map((value, innerIndex) => baseColors[innerIndex % numColors])
        } else if(props.type=="line"){
            // Use single color for some types like line chart
            borderColors = baseColors[0];
            backgroundColors = borderColors + "CC";
        
        } else{
            // Use single color for some types like line chart
            borderColors = '#e8a548';
            backgroundColors = borderColors + "CC";
        }
        // Cycle colors for multiple datasets
        baseColors.push(baseColors.shift());
        return {
            label: props?.legendText ? props?.legendText : (["COUNT","SUM"].includes(label)?"":label|| "Dataset " + (index + 1)),
            data: props.datasets[0].map((element,index)=>{
                return  (element[label] ? typeof element[label] == "object" ? element[label][props?.datakey] || 0 : element[label] : 0)
            })||0,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWith: 1
        }
    })
    var chartData = {
        labels: labels,
        datasets: datasets
    }
  
    return (
        <BaseWidget {...baseProps}>
            <Chart type={props.type} options={props.options} data={chartData} />
        </BaseWidget>
    );
};

ChartWidget.defaultProps = {
    showLegend: false,
    showTooltip: false,
    options: {}
}

export default ChartWidget;



