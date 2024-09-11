import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../styles/statistics.css'; // Import the CSS file

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    ChartDataLabels
);

const Statistics = () => {
    const [stats, setStats] = useState({
        userCount: 0,
        sinistreCount: 0,
        healthInsuranceCount: 0,
        projectInsuranceCount: 0,
        houseInsuranceCount: 0,
        carInsuranceCount: 0,
        retraiteInsuranceCount: 0,
    });

    const [insuranceStatusStats, setInsuranceStatusStats] = useState({
        paidCount: 0,
        notPaidCount: 0,
        treatmentCount: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get('http://localhost:4000/api/stats/users');
                const sinistreRes = await axios.get('http://localhost:4000/api/stats/sinistres');
                const healthInsuranceRes = await axios.get('http://localhost:4000/api/stats/health-insurances');
                const projectInsuranceRes = await axios.get('http://localhost:4000/api/stats/project-insurances');
                const houseInsuranceRes = await axios.get('http://localhost:4000/api/stats/house-insurances');
                const carInsuranceRes = await axios.get('http://localhost:4000/api/stats/car-insurances');
                const retraiteInsuranceRes = await axios.get('http://localhost:4000/api/stats/retraite-insurances');
                const insuranceStatusRes = await axios.get('http://localhost:4000/api/stats/insuranceStatistics');

                setStats({
                    userCount: userRes.data.userCount,
                    sinistreCount: sinistreRes.data.sinistreCount,
                    healthInsuranceCount: healthInsuranceRes.data.healthInsuranceCount,
                    projectInsuranceCount: projectInsuranceRes.data.projectInsuranceCount,
                    houseInsuranceCount: houseInsuranceRes.data.houseInsuranceCount,
                    carInsuranceCount: carInsuranceRes.data.carInsuranceCount,
                    retraiteInsuranceCount: retraiteInsuranceRes.data.retraiteInsuranceCount,
                });

                setInsuranceStatusStats({
                    paidCount: insuranceStatusRes.data.data.paidCount,
                    notPaidCount: insuranceStatusRes.data.data.notPaidCount,
                    treatmentCount: insuranceStatusRes.data.data.treatmentCount
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des statistiques', error);
            }
        };

        fetchData();
    }, []);

    const barData = {
        labels: ['Utilisateurs', 'Sinistres', 'Santé', 'Projet', 'Maison', 'Voiture', 'Retraite'],
        datasets: [
            {
                label: 'Nombre Total',
                data: [
                    stats.userCount,
                    stats.sinistreCount,
                    stats.healthInsuranceCount,
                    stats.projectInsuranceCount,
                    stats.houseInsuranceCount,
                    stats.carInsuranceCount,
                    stats.retraiteInsuranceCount
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    const pieData = {
        labels: ['Paid', 'Not Paid', 'Treatement'],
        datasets: [
            {
                data: [insuranceStatusStats.paidCount, insuranceStatusStats.notPaidCount, insuranceStatusStats.treatmentCount],
                backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                hoverBackgroundColor: ['#218838', '#c82333', '#e0a800']
            }
        ]
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Répartition des États des Assurances'
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                    const percentage = total ? ((value / total) * 100).toFixed(2) : 0;
                    return `${percentage}%`;
                },
                color: '#fff',
                font: {
                    weight: 'bold'
                }
            }
        }
    };

    return (
        <div className="stats-container">
            <h2>Statistiques</h2>
            <div className="chart-container">
                <Bar 
                    data={barData} 
                    options={{ 
                        responsive: true, 
                        plugins: { 
                            legend: { position: 'top' }, 
                            title: { display: true, text: 'Statistiques des Assurances' } 
                        } 
                    }} 
                />
            </div>
            <div className="chart-container">
                <Pie 
                    data={pieData}
                    options={pieOptions} 
                />
                {!insuranceStatusStats.paidCount && !insuranceStatusStats.notPaidCount && !insuranceStatusStats.treatmentCount && (
                    <p>Aucune donnée à afficher</p>
                )}
            </div>
        </div>
    );
};

export default Statistics;
