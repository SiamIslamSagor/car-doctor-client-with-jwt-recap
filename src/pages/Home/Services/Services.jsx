import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);
  return (
    <div className="my-10">
      <div>
        <h3 className="text-center font-bold text-2xl text-orange-500">
          Our Services
        </h3>
        <h2 className="text-center text-5xl">Our Services Area</h2>
        <p className="text-center text-gray-500">
          the majority have suffered alteration in some form, by injected
          humour, or randomized <br /> words which do not look even slightly
          believable.
        </p>
      </div>
      <div className="grid justify-items-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard service={service} key={service._id}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
