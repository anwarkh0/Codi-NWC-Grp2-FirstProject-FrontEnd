import serviceModule from "./services.module.css";
import ServiceCard from "../../components/servicesCard/ServiceCard";
import vip from "../../assets/images/Vip.svg";
import PeopleIcon from '@mui/icons-material/People';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MapIcon from '@mui/icons-material/Map';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const  Service = () => {
  let serviceArr = [
    {
      icon: <AutoStoriesIcon sx={{
        width: '4rem',
        height: "4rem",
        color: "#088395"
      }}/>,
      text: "Fast booking",
    },
    {
      icon: <SupportAgentIcon sx={{
        width: '4rem',
        height: "4rem",
        color: "#088395"
      }}/>,
      text: "24/7 Service",
    },
    {
      icon: <PeopleIcon sx={{
        width: '4rem',
        height: "4rem",
        color: "#088395"
      }}/>,
      text: "Personal recommendations",
    },
    {
      icon: <MapIcon sx={{
        width: '4rem',
        height: "4rem",
        color: "#088395"
      }}/>,
      text: "Traveler's Guide",
    },
    {
      icon: <MonetizationOnIcon sx={{
        width: '4rem',
        height: "4rem",
        color: "#088395"
      }}/>,
      text: "Points system",
    },
    {
      icon: vip,
      text: "VIP treatment",
    },
  ];
  return (
    <div style={{
      marginBottom: '40px'
    }}>
      <h1 className={serviceModule.servicesHeader}>
        We do our best to provide you with the best services
      </h1>
      <section className={serviceModule.serviceList}>
        {serviceArr.map((card, index) => {
          return <ServiceCard key={index} icon={card.icon} text={card.text} />;
        })}
      </section>
    </div>
  );
}

export default Service;
