import LineChartComponent from "../../components/LineChart/LineChartComponent"
import PieChartComponent from "../../components/PieChart/PieChartComponent"
import BarsDataset from "../../components/BarChart/BarChart"
import overview from "./overview.module.css";
import Sidebar from "../../layouts/sidebar/sidebar";
import PieChartUsers from "../../components/PieChart/PieChartUsers";
const OverviewDashboard = () => {
  return (
    <>
    <Sidebar/>
    <h1 className={overview.title}>Dashboard</h1>
    <div className={overview.section}>
      <LineChartComponent/>
      <PieChartUsers/>
      </div>
      <div className={overview.section}>
      <PieChartComponent/>
      <BarsDataset/>
      </div>
    </>
  )
}
export default OverviewDashboard