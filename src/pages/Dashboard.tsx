import { useState, useEffect } from 'react';
import CardDataStats from '../components/CardDataStats';
import { getDeliveriesCount, getDriversCount, getTrucksCount, getTotalDeliveriesValue } from '../services/dashboardService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTruck, FaUsers } from 'react-icons/fa';
import { GoPackageDependents } from 'react-icons/go';
import { FaBrazilianRealSign } from 'react-icons/fa6';

const Dashboard = () => {
  const [deliveriesCount, setDeliveriesCount] = useState(0);
  const [driversCount, setDriversCount] = useState(0);
  const [trucksCount, setTrucksCount] = useState(0);
  const [totalDeliveriesValue, setTotalDeliveriesValue] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const deliveries = await getDeliveriesCount();
        setDeliveriesCount(deliveries);
        const drivers = await getDriversCount();
        setDriversCount(drivers);
        const trucks = await getTrucksCount();
        setTrucksCount(trucks);
        const totalValue = await getTotalDeliveriesValue();
        setTotalDeliveriesValue(totalValue);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error('Erro ao carregar dados do dashboard: ' + error.message);
        }
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <CardDataStats title="Total de Entregas" total={deliveriesCount.toString()} rate="0.00%" levelUp>
        <GoPackageDependents />
        </CardDataStats>
        <CardDataStats title="Total de Motoristas" total={driversCount.toString()} rate="0.00%" levelUp>
        <FaUsers />
        </CardDataStats>
        <CardDataStats title="Total de Caminhões" total={trucksCount.toString()} rate="0.00%" levelUp>
        <FaTruck />
        </CardDataStats>
        <CardDataStats title="Valor total de entregas" total={`R$ ${totalDeliveriesValue?.toFixed(2) || 0}`} rate="50.00%" levelUp>
        <FaBrazilianRealSign />
        </CardDataStats>
        
      </div>
    </>
  );
};

export default Dashboard;
