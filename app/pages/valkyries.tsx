import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Valkyrie {
    ValkyrieID: string;
    Name: string;
    ShortDescription: string;
    HireCost: number;
    Power: number;
    Defence: number;
    ImageName: string;
}

const defaultValkyries: Valkyrie[] = [
    { ValkyrieID: '1', Name: 'Kiana Kaslana', ShortDescription: 'Schicksal Valkyrie uniform, Far East Branch. To increase student spirits.', HireCost: 100000, Power: 8, Defence: 3, ImageName: 'Valkyrie_Ranger' },
    { ValkyrieID: '2', Name: 'Raiden Mei', ShortDescription: 'Mei wears the exclusive Schicksal Far East Branch Valkyrie outfit, the Valkyrie Bladestrike battlesuit.', HireCost: 200000, Power: 7, Defence: 5, ImageName: 'Valkyrie_Bladestrike' },
    { ValkyrieID: '3', Name: 'Bronya Zaichik', ShortDescription: 'The unique Schicksal Far East Branch Valkyrie costume that Bronya wears is called Valkyrie Chariot.', HireCost: 150000, Power: 6, Defence: 4, ImageName: 'Valkyrie_Chariot' },
    { ValkyrieID: '4', Name: 'Sirin', ShortDescription: 'A sorceress from a different bubble universe.', HireCost: 500000, Power: 9, Defence: 2, ImageName: 'Miracle_Magical_Girl' },
    { ValkyrieID: '5', Name: 'Herrscher of the void', ShortDescription: 'The Second Herrscher was ultimately vanquished as humanity launched a coordinated counterattack.', HireCost: 750000, Power: 10, Defence: 1, ImageName: 'Herrscher_of_the_Void' },
    { ValkyrieID: '6', Name: 'Herrscher of Sentience', ShortDescription: 'The founder, CEO, and owner of School of Taixuan, the Herrscher of Sentience, has had a significant impact on the world.', HireCost: 1000000, Power: 8, Defence: 7, ImageName: 'Herrscher_of_Sentience' }
];

const ValkyrieComponent = () => {
    const [valkyries, setValkyries] = useState<Valkyrie[]>(defaultValkyries);

    useEffect(() => {
        const loadValkyries = async () => {
            try {
                const response = await fetch("./api/connection");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setValkyries(data);
            } catch (error: any) { // Explicitly type 'error' as 'any'
                console.error('Failed to fetch valkyries:', error.message);
                // Keep the default valkyries if the fetch fails
            }
        };
    
        loadValkyries();
    }, []);

    return (
        <div className="bg-white bg-opacity-80 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Valkyries</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {valkyries.map(valkyrie => (
                <div key={valkyrie.ValkyrieID} className="max-w-xs rounded overflow-hidden shadow-lg bg-black text-white">
                    <Image
                        src={`/images/valkyries/${valkyrie.ImageName}.webp`}
                        alt={valkyrie.Name}
                        width={200}
                        height={200}
                        className="w-full"
                    />
                    <div className="px-4 py-2">
                        <div className="font-bold text-lg mb-1">{valkyrie.Name}</div>
                        <p className="text-sm">{valkyrie.ShortDescription}</p>
                        <div className="px-4 pt-2 pb-1">
                            <span className="inline-block bg-gray-200 bg-opacity-50 rounded-full px-2 py-1 text-xs font-semibold mr-1 mb-1">Hire Cost: ${valkyrie.HireCost.toFixed(2)}</span>
                            <span className="inline-block bg-gray-200 bg-opacity-50 rounded-full px-2 py-1 text-xs font-semibold mr-1 mb-1">Power: {valkyrie.Power}</span>
                            <span className="inline-block bg-gray-200 bg-opacity-50 rounded-full px-2 py-1 text-xs font-semibold mb-1">Defence: {valkyrie.Defence}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}
export default ValkyrieComponent;
