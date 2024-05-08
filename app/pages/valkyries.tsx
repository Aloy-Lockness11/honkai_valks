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

const ValkyrieComponent = () => {
    const [valkyries, setValkyries] = useState<Valkyrie[]>([]); 

    useEffect(() => {
        const loadValkyries = async () => {
            try {
                const response = await fetch('/api/valkyries');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setValkyries(data);
            } catch (error: any) { // Explicitly type 'error' as 'any'
                console.error('Failed to fetch valkyries:', error.message);
            }
        };
    
        loadValkyries();
    }, []);

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Valkyries</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {valkyries.map(valkyrie => (
                    <div key={valkyrie.ValkyrieID} className="max-w-sm rounded overflow-hidden shadow-lg">
                        <Image
                            src={`/images/valkyries/${valkyrie.ImageName}.webp`} // Adjust according to actual field name if different
                            alt={valkyrie.Name}
                            width={256}
                            height={256}
                        />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{valkyrie.Name}</div>
                            <p className="text-gray-700 text-base">{valkyrie.ShortDescription}</p>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Hire Cost: ${valkyrie.HireCost.toFixed(2)}</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Power: {valkyrie.Power}</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Defence: {valkyrie.Defence}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ValkyrieComponent;
