import LineChartComponent from "../../components/LineChart/LineChartComponent";
import PieChartComponent from "../../components/PieChart/PieChartComponent";
import BarsDataset from "../../components/BarChart/BarChart";
import overview from "./overview.module.css";
import Sidebar from "../../layouts/sidebar/sidebar";
import PieChartUsers from "../../components/PieChart/PieChartUsers";
import { Helmet } from "react-helmet-async";
const OverviewDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard Overview</title>
        <meta
          name="description"
          content="Explore comprehensive insights and analytics on Hotel Xpress's 
          performance, bookings, and guest data in our intuitive dashboard overview. 
          Monitor key metrics and make data-driven decisions for your hospitality business."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hotel Xpress - Dashboard Overview" />
        <meta
          property="og:description"
          content="Explore comprehensive insights and analytics on Hotel Xpress's 
          performance, bookings, and guest data in our intuitive dashboard overview. 
          Monitor key metrics and make data-driven decisions for your hospitality business."
        />
      </Helmet>
      <Sidebar />
      <h1 className={overview.title}>Dashboard</h1>
      <div className={overview.section}>
        <LineChartComponent />
        <PieChartUsers />
      </div>
      <div className={overview.section}>
        <PieChartComponent />
        <BarsDataset />
      </div>
    </>
  );
};
export default OverviewDashboard;
