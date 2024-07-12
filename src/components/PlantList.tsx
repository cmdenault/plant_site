
import { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom'

// import models
import { Plant as PlantModel} from '../models/Plant';
import LocationSection from './LocationSection';

interface OriginalPlantModel {
        id: number;
        name: string;
        species: string;
        cultivar?: string; 
        stage: string;
        location: string;
    
}

const PlantList: React.FC = () => {

    // hooks
    const [plants, setPlants] = useState<PlantModel[]>([]); // have updated list of plants
    //const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [locations, setLocations] = useState<string[]>([]); // List of available locations
  
    // Assuming you have a pre-defined constant with the S3 data URL
    const plantDataUrl = 'https://cpsc4910sq24.s3.amazonaws.com/data/plants.json';
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(plantDataUrl);
        const data: OriginalPlantModel[] = await response.json(); // will this have undefined for not included info
  
        // map species to image URLs using a separate function
        const mappedPlants : PlantModel[] = data.map((plant) => ({ // TODO: : OriginalPlantModel[] type specifier fixes error but i dont think itll include img field?
          ...plant,
          imageUrl: getImageUrl(plant.species),
        }));
  
        setPlants(mappedPlants);
        // Extract unique locations from plant data (modify as needed)
        const uniqueLocations = [...new Set(data.map((plant) => plant.location))];
        setLocations(uniqueLocations);
      };
  
      fetchData();
    }, []); // Empty dependency array to fetch data only once
  
    // assign image urls function
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

    // TODO type issues
    // const getImageUrl = (species: string, cultivar? : string) => {

    //   //  map species to image URLs
    //   const imageUrls = {
    //     'Arugula': 'https://cpsc4910sq24.s3.amazonaws.com/images/arugula.jpg',
    //     'Bell pepper': 'https://cpsc4910sq24.s3.amazonaws.com/images/bell-pepper.jpg',
    //     'Lettuce': {
    //       'Butter': 'https://cpsc4910sq24.s3.amazonaws.com/images/butter-lettuce.jpg', // a map within a map
    //       'Green Leaf Lettuce': 'https://cpsc4910sq24.s3.amazonaws.com/images/green-leaf-lettuce.jpg'
    //     },
    //     'Strawberry': 'https://cpsc4910sq24.s3.amazonaws.com/images/strawberry.jpg',
    //   };
    //   //return imageUrls[species as keyof typeof imageUrls] || 'https://cpsc4910sq24.s3.amazonaws.com/images/strawberry.jpg'; // Return strawberry for unknown species

    //   if (species === 'Lettuce' && cultivar) {
    //     return imageUrls[species as keyof typeof imageUrls][cultivar as typeof imageUrls];
    //   } else {
    //     return imageUrls[species as keyof typeof imageUrls] || 'https://cpsc4910sq24.s3.amazonaws.com/images/default-plant.jpg'; // Default image
    //   }
    // };

  
    return (

    <div className="plant-list">
        {locations.map((location) => {
            const locationPlants = plants.filter((plant) => plant.location === location);
            return (
                <LocationSection
                    key={location}
                    location={location}
                    plants={locationPlants}
                />
            );
        })}
    </div>

    );
  };
  
  export default PlantList;