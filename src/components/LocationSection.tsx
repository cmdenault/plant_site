
import { Plant as PlantModel} from '../models/Plant';
import PlantCard from './PlantCard';

interface LocationSectionProps {
    location: string;
    plants: PlantModel[]; // Array of plants belonging to the location
}

const LocationSection: React.FC<LocationSectionProps> = ({
    location,
    plants,
}) => {
    return (
        <details className="plant-location-section" open={true}>
            <summary>{location}</summary>
            <div className='plant-location-section-container'>
                <div className="plant-cards">
                    {plants.map((plant: PlantModel) => (
                    <PlantCard key={plant.id} plant={plant} /> // passing in the plant object as a prop
                    ))}
                </div>
            </div>
            
        </details>
    );
};

  export default LocationSection;