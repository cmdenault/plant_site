// functions and libraries
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// models
import { Plant as PlantModel } from '../models/Plant';

interface PlantModelProps { // type prop should be
    plant: PlantModel // instead of manually, use the Model     
}

interface HarvestDataModel { // type the harvest data should be
    Date: string
    Amount: string
}

const PlantDetails: React.FC<PlantModelProps> = ( {plant} ) => {

    // hooks
    const { id } = useParams(); // Access plant ID from URL parameters

    // plant detail info from link
    const [plantInfo, setPlant] = useState<PlantModel | null>(null);

    const [harvests, setHarvests] = useState<HarvestDataModel[] | null>(null);

    // base URL for plant details
    const plantDetailsUrl = `https://cpsc4910sq24.s3.amazonaws.com/data/plants/${id}.json`;
    const plantHarvestUrl = `https://cpsc4910sq24.s3.amazonaws.com/data/plants/${id}/harvests.json`;

    useEffect(() => {

        // functions for fetching info
        const fetchPlantDetails = async () => {
            try {

                const response = await fetch(plantDetailsUrl); // get the info from link (json respons)
                
                // error handling
                if (!response.ok) {
                    throw new Error(`Failed to fetch plant details: ${response.statusText}`);
                }

                // put the info in a good form in plantData
                const plantData: PlantModel = await response.json();
                setPlant(plantData)              

            } catch (error) {
                console.error('Error fetching plant details:', error);
            }
        };


        const fetchPlantHarvest = async () => {
            const response = await fetch(plantHarvestUrl);

            // error handling
            if (!response.ok) {
                throw new Error(`Failed to fetch plant details: ${response.statusText}`);
            }

            const harvestData: HarvestDataModel[] = await response.json();
            setHarvests(harvestData)

        }

        // get the info
        fetchPlantDetails();
        fetchPlantHarvest();

    }, [plantDetailsUrl, plantHarvestUrl]); // if these change, run this again

    if (!plantInfo) {
        return <div>Loading plant details...</div>;
    }

    const getImageUrl = (species: string) => {

      //  map species to image URLs
      const imageUrls = {
        'Arugula': 'https://cpsc4910sq24.s3.amazonaws.com/images/arugula.jpg',
        'Bell pepper': 'https://cpsc4910sq24.s3.amazonaws.com/images/bell-pepper.jpg',
        'Lettuce': 'https://cpsc4910sq24.s3.amazonaws.com/images/butter-lettuce.jpg', // do a map within a map her
        'Green Leaf Lettuce': 'https://cpsc4910sq24.s3.amazonaws.com/images/green-leaf-lettuce.jpg',
        'Strawberry': 'https://cpsc4910sq24.s3.amazonaws.com/images/strawberry.jpg',
      };
      return imageUrls[species as keyof typeof imageUrls] || 'https://cpsc4910sq24.s3.amazonaws.com/images/strawberry.jpg'; // Return strawberry for unknown species
    };


    // break down plantInfo
    const { name, species, cultivar, stage  } = plantInfo;

    // have a variable hold the image URL
    const imageUrl = getImageUrl(plantInfo.species)
    

    return (
        <div className='plant-detals-fullpg'>
            <h2>{name}</h2>

            {/* photo and info  */}
            <div className='plant-details'>
                <div className='details-info' >
                    <div className='plant-details-img'>
                        <img  sizes=''
                        src={imageUrl || 'https://cpsc4910sq24.s3.amazonaws.com/images/strawberry.jpg'} // replace with default image path
                        alt={name}
                        style={{ width: '300px', height: 'auto' }}
                        />
                    </div>

                    <p>Species: {species}</p>
                    {cultivar ? <p>Cultivar: {cultivar}</p> : null} {/* If species is null or undefined, the JSX fragment is not rendered, and no species information is displayed */}
                    <p>Stage: {stage}</p>
                </div>
                

                {/* harvest table */}
                <div className='details-table' >
                    {/* display the harvest table if not null */}
                    {harvests ? <div>
                        <h2>Harvests</h2>
                        <table className='harvest-table'>
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {harvests.map((harvest) => (
                                <tr key={harvest.Date}> {/* a unique key */} {/* allows React to identify specific rows that have changed, added, or removed and determine the minimal set of updates needed*/}
                                <td>{harvest.Date}</td>
                                <td>{harvest.Amount}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div> : null}
                </div>
                

            </div>
            
            
            




            
        </div>

    
    );
};

export default PlantDetails

/* 

retrive url using id
print it out in a table?

*/