// libraries and such
// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

// import models
import { Plant as PlantModel} from '../models/Plant';


// specify shape of the props
interface PlantModelProps {
        plant: PlantModel // instead of manually, use the Model 
        
}


const PlantCard: React.FC<PlantModelProps> = ({ plant }) => {
    
    // destructure plant data
    const { name, species, imageUrl, cultivar, stage  } = plant;
  
    return (
      <div className="plant-card">
        {/* image */}
        <div className='plant-card-img'> 
            <img  sizes=''
            src={imageUrl || 'https://cpsc4910sq24.s3.amazonaws.com/images/strawberry.jpg'} 
            style={{ width: '200px', height: 'auto' }}
            />
        </div>

        {/* plant card text */}
        <div className='plant-card-text'>
            <Link to={`/plants/${plant.id}`} state={{ plant }}>  {/* name links to details page */}
                <h3>{name}</h3>
            </Link>
            <p>Species: {species}</p>
            {cultivar ? <p>Cultivar: {cultivar}</p> : null} {/* if species is null or undefined, the JSX fragment is not rendered, and no species information is displayed */}
            <p>Stage: {stage}</p>
        </div>
        
        
      </div>
    );
  };
  
  export default PlantCard;